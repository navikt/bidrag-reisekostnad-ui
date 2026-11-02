import {
    ClientError,
    Configuration,
    genericGrantRequest,
    modifyAssertion,
    PrivateKeyJwt,
    ResponseBodyError,
    WWWAuthenticateChallengeError,
} from 'openid-client';
import { importJWK, JWK } from 'jose';
import { logger } from '../../logging/logger';

export type OboProvider = (subject_token: string, audience: string) => Promise<string | null>;

export interface ITokenIssuer {
    exchangeToken: () => OboProvider;
}

export interface IClientConfig {
    issuer: string;
    tokenEndpoint: string;
    clientId: string;
    privateJWK: JWK;
}

export default class TokenExchangeClient {
    protected _config: IClientConfig;

    constructor(config: IClientConfig) {
        this._config = config;
    }

    private async getClient(): Promise<Configuration> {
        const key = await importJWK(this._config.privateJWK, 'RS256');
        if (key instanceof Uint8Array) {
            throw new TypeError('Token exchange requires an asymmetric private key');
        }
        return new Configuration(
            {
                issuer: this._config.issuer,
                token_endpoint: this._config.tokenEndpoint,
                token_endpoint_auth_signing_alg_values_supported: ['RS256'],
            },
            this._config.clientId,
            {
                token_endpoint_auth_method: 'private_key_jwt',
            },
            PrivateKeyJwt(
                { key, kid: this._config.privateJWK.kid },
                {
                    [modifyAssertion]: (_header, payload) => {
                        payload.aud = this._config.tokenEndpoint;
                    },
                }
            )
        );
    }

    private grantBody(audience: string, subject_token: string): Record<string, string> {
        return {
            subject_token_type: 'urn:ietf:params:oauth:token-type:jwt',
            audience,
            subject_token,
        };
    }

    async getToken(subject_token: string, audience: string): Promise<string | null> {
        try {
            const tokenset = await genericGrantRequest(
                await this.getClient(),
                'urn:ietf:params:oauth:grant-type:token-exchange',
                this.grantBody(audience, subject_token)
            );
            return tokenset.access_token ?? null;
        } catch (e) {
            const error = new Error('Token exchange failed');
            logger.error(
                {
                    httpStatus:
                        e instanceof ResponseBodyError || e instanceof WWWAuthenticateChallengeError
                            ? e.status
                            : e instanceof ClientError && e.cause instanceof Response
                              ? e.cause.status
                              : undefined,
                },
                error.message
            );
            throw error;
        }
    }
}
