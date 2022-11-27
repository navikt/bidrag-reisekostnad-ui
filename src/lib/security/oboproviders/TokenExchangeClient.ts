import { Client as OpenIdClient, errors, GrantBody, GrantExtras, Issuer } from "openid-client";
import { JWK } from "jose/dist/types/types";
import OPError = errors.OPError;
import { logger } from "../../logging/logger";

export type OboProvider = (subject_token: string, audience: string) => Promise<string | null>;

export interface ITokenIssuer {
  exchangeToken: () => OboProvider;
}

export interface ClientConfig {
  issuer: string;
  tokenEndpoint: string;
  clientId: string;
  privateJWK: JWK;
}

export default class TokenExchangeClient {
  protected _config: ClientConfig;

  constructor(config: ClientConfig) {
    this._config = config;
  }

  private getClient(): OpenIdClient {
    const issuer = new Issuer({
      issuer: this._config.issuer,
      token_endpoint: this._config.tokenEndpoint,
      token_endpoint_auth_signing_alg_values_supported: ["RS256"],
    });
    const jwk = this._config.privateJWK;
    return new issuer.Client(
      {
        client_id: this._config.clientId,
        token_endpoint_auth_method: "private_key_jwt",
      },
      { keys: [jwk] }
    );
  }

  private grantBody(audience: string, subject_token: string): GrantBody {
    return {
      grant_type: "urn:ietf:params:oauth:grant-type:token-exchange",
      client_assertion_type: "urn:ietf:params:oauth:client-assertion-type:jwt-bearer",
      subject_token_type: "urn:ietf:params:oauth:token-type:jwt",
      audience,
      subject_token,
    };
  }

  private additionalClaims(): GrantExtras {
    const now = Math.floor(Date.now() / 1000);
    return {
      clientAssertionPayload: {
        nbf: now,
        aud: this._config.tokenEndpoint,
      },
    };
  }

  async getToken(subject_token: string, audience: string): Promise<string | null> {
    try {
      const tokenset = await this.getClient().grant(
        this.grantBody(audience, subject_token),
        this.additionalClaims()
      );
      return tokenset.access_token ?? null;
    } catch (e) {
      if (e instanceof OPError) logger.warn(e.message, e.response?.body || "");
      throw e;
    }
  }
}
