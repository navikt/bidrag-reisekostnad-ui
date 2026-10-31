import { IncomingMessage } from 'node:http';
import { Socket } from 'node:net';
import { errors } from 'openid-client';
import { afterEach, beforeEach, expect, it, vi } from 'vitest';
import TokenExchangeClient from '../../lib/security/oboproviders/TokenExchangeClient';
import { logger } from '../../lib/logging/logger';

const createOpenIdClient = vi.hoisted(() => vi.fn());
const requestTokens = vi.hoisted(() => vi.fn());

vi.mock('openid-client', async (importOriginal) => ({
    ...(await importOriginal<typeof import('openid-client')>()),
    Issuer: vi.fn(function () {
        return { Client: createOpenIdClient };
    }),
}));

vi.mock('../../lib/logging/logger', () => ({
    logger: { error: vi.fn() },
}));

afterEach(() => {
    vi.resetAllMocks();
});

beforeEach(() => {
    createOpenIdClient.mockImplementation(function () {
        return { grant: requestTokens };
    });
});

function createTokenExchangeClient() {
    return new TokenExchangeClient({
        issuer: 'https://issuer.example',
        tokenEndpoint: 'https://issuer.example/token',
        clientId: 'our-client',
        privateJWK: { kty: 'RSA', kid: 'key-id', d: 'fake-private-key-for-testing' },
    });
}

it('passes the private key unchanged to openid-client and returns the access token', async () => {
    const privateKey = {
        kty: 'RSA',
        kid: 'key-id',
        d: 'fake-private-key-for-testing',
    };
    requestTokens.mockResolvedValue({ access_token: 'new-access-token' });

    const tokenExchangeClient = new TokenExchangeClient({
        issuer: 'https://issuer.example',
        tokenEndpoint: 'https://issuer.example/token',
        clientId: 'our-client',
        privateJWK: privateKey,
    });

    const accessToken = await tokenExchangeClient.getToken('user-token', 'target-api');

    expect(accessToken).toBe('new-access-token');
    expect(createOpenIdClient).toHaveBeenCalledWith(
        { client_id: 'our-client', token_endpoint_auth_method: 'private_key_jwt' },
        { keys: [privateKey] }
    );
});

it('does not log or propagate tokens echoed in an OAuth error description', async () => {
    requestTokens.mockRejectedValue(
        new errors.OPError({
            error: 'invalid_grant',
            error_description: 'Rejected sensitive-user-token',
        })
    );
    const tokenExchangeClient = createTokenExchangeClient();

    const result = tokenExchangeClient.getToken('sensitive-user-token', 'target-api');

    await expect(result).rejects.toThrow('Token exchange failed');
    expect(logger.error).toHaveBeenCalledExactlyOnceWith(
        { httpStatus: undefined },
        'Token exchange failed'
    );
});

it('does not log or propagate tokens included in other exchange errors', async () => {
    requestTokens.mockRejectedValue(new Error('Response body: sensitive-access-token'));
    const tokenExchangeClient = createTokenExchangeClient();

    const result = tokenExchangeClient.getToken('user-token', 'target-api');

    await expect(result).rejects.toThrow('Token exchange failed');
    expect(logger.error).toHaveBeenCalledExactlyOnceWith(
        { httpStatus: undefined },
        'Token exchange failed'
    );
});

it('logs the upstream HTTP status without logging its response body', async () => {
    const response = Object.assign(new IncomingMessage(new Socket()), {
        statusCode: 502,
        body: Buffer.from('sensitive-access-token'),
    });
    requestTokens.mockRejectedValue(new errors.OPError({ error: 'server_error' }, response));
    const tokenExchangeClient = createTokenExchangeClient();

    const result = tokenExchangeClient.getToken('user-token', 'target-api');

    await expect(result).rejects.toThrow('Token exchange failed');
    expect(logger.error).toHaveBeenCalledExactlyOnceWith(
        { httpStatus: 502 },
        'Token exchange failed'
    );
});
