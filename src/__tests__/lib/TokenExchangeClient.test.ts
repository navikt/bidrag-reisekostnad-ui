// @vitest-environment node
import { exportJWK, generateKeyPair, JWK, jwtVerify } from 'jose';
import { afterEach, beforeAll, beforeEach, expect, it, vi } from 'vitest';
import TokenExchangeClient from '../../lib/security/oboproviders/TokenExchangeClient';
import { logger } from '../../lib/logging/logger';

vi.mock('../../lib/logging/logger', () => ({
    logger: { error: vi.fn() },
}));

const tokenEndpoint = 'https://issuer.example/token';
let privateJWK: JWK;
let publicKey: CryptoKey;

beforeAll(async () => {
    const keyPair = await generateKeyPair('RS256', { extractable: true });
    publicKey = keyPair.publicKey;
    privateJWK = { ...(await exportJWK(keyPair.privateKey)), kid: 'key-id' };
});

beforeEach(() => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue(
        Response.json({ access_token: 'new-access-token', token_type: 'Bearer' })
    );
});

afterEach(() => {
    vi.restoreAllMocks();
    vi.clearAllMocks();
});

function createTokenExchangeClient() {
    return new TokenExchangeClient({
        issuer: 'https://issuer.example',
        tokenEndpoint,
        clientId: 'our-client',
        privateJWK,
    });
}

it.each(['Bearer', 'N_A'])(
    'exchanges the subject token using an RS256 assertion and accepts token type %s',
    async (tokenType) => {
        vi.mocked(fetch).mockResolvedValue(
            Response.json({ access_token: 'new-access-token', token_type: tokenType })
        );
        const tokenExchangeClient = createTokenExchangeClient();
        const now = Math.floor(Date.now() / 1000);

        const accessToken = await tokenExchangeClient.getToken('user-token', 'target-api');

        expect(accessToken).toBe('new-access-token');
        expect(fetch).toHaveBeenCalledOnce();
        const [url, options] = vi.mocked(fetch).mock.calls[0];
        expect(url.toString()).toBe(tokenEndpoint);
        expect(options?.method).toBe('POST');
        const parameters = new URLSearchParams(options?.body?.toString());
        expect(Object.fromEntries(parameters)).toEqual({
            grant_type: 'urn:ietf:params:oauth:grant-type:token-exchange',
            subject_token_type: 'urn:ietf:params:oauth:token-type:jwt',
            subject_token: 'user-token',
            audience: 'target-api',
            client_id: 'our-client',
            client_assertion_type: 'urn:ietf:params:oauth:client-assertion-type:jwt-bearer',
            client_assertion: expect.any(String),
        });
        const { payload, protectedHeader } = await jwtVerify(
            parameters.get('client_assertion')!,
            publicKey,
            { algorithms: ['RS256'], issuer: 'our-client', audience: tokenEndpoint }
        );
        expect(protectedHeader).toMatchObject({ alg: 'RS256', kid: 'key-id' });
        expect(payload).toMatchObject({
            sub: 'our-client',
            jti: expect.any(String),
            nbf: expect.any(Number),
            iat: expect.any(Number),
            exp: expect.any(Number),
        });
        expect(payload.nbf).toBeGreaterThanOrEqual(now);
        expect(payload.nbf).toBeLessThanOrEqual(Math.floor(Date.now() / 1000));
        expect(payload.exp).toBeGreaterThan(payload.nbf!);
    }
);

it('does not log or propagate private key import errors', async () => {
    const tokenExchangeClient = new TokenExchangeClient({
        issuer: 'https://issuer.example',
        tokenEndpoint,
        clientId: 'our-client',
        privateJWK: { kty: 'RSA', d: 'sensitive-private-key' },
    });

    await expect(tokenExchangeClient.getToken('user-token', 'target-api')).rejects.toThrow(
        'Token exchange failed'
    );
    expect(fetch).not.toHaveBeenCalled();
    expect(logger.error).toHaveBeenCalledExactlyOnceWith(
        { httpStatus: undefined },
        'Token exchange failed'
    );
});

it('does not log or propagate tokens echoed in an OAuth error description', async () => {
    vi.mocked(fetch).mockResolvedValue(
        Response.json(
            {
                error: 'invalid_grant',
                error_description: 'Rejected sensitive-user-token',
            },
            { status: 400 }
        )
    );

    const result = createTokenExchangeClient().getToken('sensitive-user-token', 'target-api');

    await expect(result).rejects.toThrow('Token exchange failed');
    expect(logger.error).toHaveBeenCalledExactlyOnceWith(
        { httpStatus: 400 },
        'Token exchange failed'
    );
});

it('does not log or propagate tokens included in other exchange errors', async () => {
    vi.mocked(fetch).mockRejectedValue(new Error('Response body: sensitive-access-token'));

    const result = createTokenExchangeClient().getToken('user-token', 'target-api');

    await expect(result).rejects.toThrow('Token exchange failed');
    expect(logger.error).toHaveBeenCalledExactlyOnceWith(
        { httpStatus: undefined },
        'Token exchange failed'
    );
});

it('logs the upstream HTTP status without logging its response body', async () => {
    vi.mocked(fetch).mockResolvedValue(
        Response.json(
            { error: 'server_error', error_description: 'sensitive-access-token' },
            { status: 502 }
        )
    );

    const result = createTokenExchangeClient().getToken('user-token', 'target-api');

    await expect(result).rejects.toThrow('Token exchange failed');
    expect(logger.error).toHaveBeenCalledExactlyOnceWith(
        { httpStatus: 502 },
        'Token exchange failed'
    );
});

it('logs the upstream HTTP status for non-JSON errors without logging the response body', async () => {
    vi.mocked(fetch).mockResolvedValue(new Response('sensitive-access-token', { status: 502 }));

    const result = createTokenExchangeClient().getToken('user-token', 'target-api');

    await expect(result).rejects.toThrow('Token exchange failed');
    expect(logger.error).toHaveBeenCalledExactlyOnceWith(
        { httpStatus: 502 },
        'Token exchange failed'
    );
});

it('logs authentication challenge status without logging the challenge', async () => {
    vi.mocked(fetch).mockResolvedValue(
        new Response(null, {
            status: 401,
            headers: {
                'www-authenticate':
                    'Bearer error="invalid_token", error_description="sensitive-access-token"',
            },
        })
    );

    const result = createTokenExchangeClient().getToken('user-token', 'target-api');

    await expect(result).rejects.toThrow('Token exchange failed');
    expect(logger.error).toHaveBeenCalledExactlyOnceWith(
        { httpStatus: 401 },
        'Token exchange failed'
    );
});

it('does not return or log a malformed token response', async () => {
    vi.mocked(fetch).mockResolvedValue(
        Response.json({ token_type: 'Bearer', error_description: 'sensitive-access-token' })
    );

    const result = createTokenExchangeClient().getToken('user-token', 'target-api');

    await expect(result).rejects.toThrow('Token exchange failed');
    expect(logger.error).toHaveBeenCalledExactlyOnceWith(
        { httpStatus: undefined },
        'Token exchange failed'
    );
});
