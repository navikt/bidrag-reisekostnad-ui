import env from 'env-var';
import { JWK } from 'jose';
import TokenExchangeClient, { ITokenIssuer } from './TokenExchangeClient';
import memoize from 'lodash.memoize';

const options = memoize(() => ({
    clientId: env.get('TOKEN_X_CLIENT_ID').required().asString(),
    privateJWK: env.get('TOKEN_X_PRIVATE_JWK').required().asJsonObject() as JWK,
    tokenEndpoint: env.get('TOKEN_X_TOKEN_ENDPOINT').required().asUrlString(),
    issuer: env.get('TOKEN_X_ISSUER').required().asString(),
}));

const exchangeToken = memoize(() => {
    const client = new TokenExchangeClient(options());
    return client.getToken.bind(client);
});

const tokenx: ITokenIssuer = { exchangeToken };

export default tokenx;
