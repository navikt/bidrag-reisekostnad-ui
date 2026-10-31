import type { NextApiRequest, NextApiResponse } from 'next';
import { errors } from 'jose';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { withErrorHandler } from '../../lib/errorhandling/withErrorHandler';

vi.mock('../../lib/logging/logger', () => ({
    logger: { error: vi.fn() },
}));

vi.mock('../../lib/logging/secureLogger', () => ({
    secureLogger: { child: vi.fn(() => ({ error: vi.fn() })) },
}));

afterEach(() => {
    vi.resetAllMocks();
});

async function serializeError(error: Error) {
    const send = vi.fn((body: unknown) => JSON.stringify(body));
    const status = vi.fn(() => ({ send }));
    const handler = withErrorHandler(async () => {
        throw error;
    });

    await handler({ url: '/api/auth' } as NextApiRequest, { status } as unknown as NextApiResponse);

    return JSON.parse(send.mock.calls[0][0] as string);
}

describe('withErrorHandler authentication error responses', () => {
    it('does not serialize claims from an expired token', async () => {
        const error = new errors.JWTExpired(
            'JWT expired',
            { pid: 'sensitive-person-id', sub: 'sensitive-subject', exp: 1 },
            'exp'
        );

        const response = await serializeError(error);

        expect(response).toEqual({
            name: error.name,
            code: error.code,
            claim: error.claim,
            reason: error.reason,
        });
        expect(JSON.stringify(response)).not.toContain('sensitive-person-id');
        expect(JSON.stringify(response)).not.toContain('sensitive-subject');
    });

    it('does not serialize claims from a rejected token claim', async () => {
        const error = new errors.JWTClaimValidationFailed(
            'unexpected client_id claim value',
            { pid: 'sensitive-person-id', client_id: 'another-client' },
            'client_id',
            'check_failed'
        );

        const response = await serializeError(error);

        expect(response).toEqual({
            name: error.name,
            code: error.code,
            claim: error.claim,
            reason: error.reason,
        });
        expect(JSON.stringify(response)).not.toContain('sensitive-person-id');
        expect(JSON.stringify(response)).not.toContain('another-client');
    });
});
