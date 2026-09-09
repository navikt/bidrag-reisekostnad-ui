import {
    Configuration,
    genericGrantRequest,
    modifyAssertion,
    PrivateKeyJwt,
    ResponseBodyError,
    ServerMetadata,
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

const TOKEN_EXCHANGE_GRANT_TYPE = 'urn:ietf:params:oauth:grant-type:token-exchange';

export default class TokenExchangeClient {
    protected _config: IClientConfig;
    private _configuration?: Configuration;

    constructor(config: IClientConfig) {
        this._config = config;
    }

    private async getConfiguration(): Promise<Configuration> {
        if (this._configuration) {
            return this._configuration;
        }

        const server: ServerMetadata = {
            issuer: this._config.issuer,
            token_endpoint: this._config.tokenEndpoint,
            token_endpoint_auth_signing_alg_values_supported: ['RS256'],
        };
        const privateKey = await importJWK(this._config.privateJWK, 'RS256');

        this._configuration = new Configuration(
            server,
            this._config.clientId,
            { token_endpoint_auth_method: 'private_key_jwt' },
            PrivateKeyJwt(privateKey as CryptoKey, {
                [modifyAssertion]: (_header, payload) => {
                    payload.nbf = Math.floor(Date.now() / 1000);
                    payload.aud = this._config.tokenEndpoint;
                },
            })
        );

        return this._configuration;
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
            const configuration = await this.getConfiguration();
            const tokenset = await genericGrantRequest(
                configuration,
                TOKEN_EXCHANGE_GRANT_TYPE,
                this.grantBody(audience, subject_token)
            );
            return tokenset.access_token ?? null;
        } catch (e) {
            if (e instanceof ResponseBodyError) {
                logger.error(
                    'Token error message:' + e.error + e.error_description + e.status || ''
                );
            } else {
                logger.error('Token error unknown:' + e);
            }
            throw e;
        }
    }
}
