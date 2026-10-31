import { errors, jwtVerify, type JWTPayload } from 'jose';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import idporten from '../../lib/security/providers/idporten';

vi.mock('jose', async (importOriginal) => ({
    ...(await importOriginal<typeof import('jose')>()),
    jwtVerify: vi.fn(),
    createRemoteJWKSet: vi.fn(),
}));

function mockVerifiedToken(payload: JWTPayload) {
    const verifiedToken = {
        payload,
        protectedHeader: { alg: 'RS256' },
        key: { type: 'public' },
    };
    vi.mocked(jwtVerify).mockResolvedValue(verifiedToken);
    return verifiedToken;
}

beforeEach(() => {
    vi.stubEnv('IDPORTEN_CLIENT_ID', 'our-client');
    vi.stubEnv('IDPORTEN_JWKS_URI', 'https://issuer.example/jwks');
});

afterEach(() => {
    vi.unstubAllEnvs();
    vi.resetAllMocks();
});

describe('ID-porten token validation', () => {
    it('accepts a token for our client with a high authentication level', async () => {
        const verifiedToken = mockVerifiedToken({
            client_id: 'our-client',
            acr: 'idporten-loa-high',
        });

        const result = await idporten.verifyToken('token');

        expect(result).toBe(verifiedToken);
    });

    it('also accepts the older level4 authentication level', async () => {
        const verifiedToken = mockVerifiedToken({
            client_id: 'our-client',
            acr: 'level4',
        });

        const result = await idporten.verifyToken('token');

        expect(result).toBe(verifiedToken);
    });

    it('accepts an authentication level written in uppercase', async () => {
        const verifiedToken = mockVerifiedToken({
            client_id: 'our-client',
            acr: 'LEVEL4',
        });

        const result = await idporten.verifyToken('token');

        expect(result).toBe(verifiedToken);
    });

    it('rejects a token intended for another client', async () => {
        const payload = { client_id: 'another-client', acr: 'level4' };
        mockVerifiedToken(payload);

        const result = idporten.verifyToken('token');

        await expect(result).rejects.toBeInstanceOf(errors.JWTClaimValidationFailed);
        await expect(result).rejects.toMatchObject({
            payload,
            claim: 'client_id',
            reason: 'check_failed',
        });
    });

    it('rejects an authentication level that is too low', async () => {
        const payload = { client_id: 'our-client', acr: 'level3' };
        mockVerifiedToken(payload);

        const result = idporten.verifyToken('token');

        await expect(result).rejects.toBeInstanceOf(errors.JWTClaimValidationFailed);
        await expect(result).rejects.toMatchObject({
            payload,
            claim: 'acr',
            reason: 'check_failed',
        });
    });

    it('rejects a token without an authentication level', async () => {
        const payload = { client_id: 'our-client' };
        mockVerifiedToken(payload);

        const result = idporten.verifyToken('token');

        await expect(result).rejects.toBeInstanceOf(errors.JWTClaimValidationFailed);
        await expect(result).rejects.toMatchObject({
            payload,
            claim: 'acr',
            reason: 'check_failed',
        });
    });

    it('returns the same error when jose rejects the token signature', async () => {
        const signatureError = new errors.JWSSignatureVerificationFailed();
        vi.mocked(jwtVerify).mockRejectedValue(signatureError);

        const result = idporten.verifyToken('token');

        await expect(result).rejects.toBe(signatureError);
    });
});
