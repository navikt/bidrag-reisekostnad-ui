import type { NextApiRequest, NextApiResponse } from 'next';
import { afterEach, expect, it, vi } from 'vitest';
import { DefaultConsumer } from '../../service/DefaultConsumer';
import { logger } from '../../lib/logging/logger';
import { withErrorHandler } from '../../lib/errorhandling/withErrorHandler';

vi.mock('../../lib/logging/logger', () => ({
    logger: { error: vi.fn() },
}));

vi.mock('../../lib/logging/secureLogger', () => ({
    secureLogger: { child: vi.fn() },
}));

vi.mock('../../lib/logging/als', () => ({
    getCorrelationIdFromContext: () => 'request-id',
}));

afterEach(() => {
    vi.unstubAllGlobals();
    vi.clearAllMocks();
});

function createConsumer() {
    return new DefaultConsumer('target-api', 'https://backend.example', {
        token: 'sensitive-user-token',
        user: { sub: 'test-user', fnr: 'test-user' },
        expires_in: 300,
        getOBOToken: async () => 'sensitive-access-token',
    });
}

it('does not expose a backend error body or status text in logs or the API error response', async () => {
    vi.stubGlobal(
        'fetch',
        vi.fn().mockResolvedValue(
            new Response('Backend echoed sensitive-access-token', {
                status: 500,
                statusText: 'Rejected sensitive-user-token',
                headers: { 'x-correlation-id': 'backend-request-id' },
            })
        )
    );
    const consumer = createConsumer();
    const send = vi.fn();
    const status = vi.fn().mockReturnValue({ send });
    const handler = withErrorHandler(async () => {
        await consumer.fetchResponse('/resource', 'GET');
    });

    await handler({ url: '/api/resource' } as NextApiRequest, { status } as NextApiResponse);

    expect(status).toHaveBeenCalledWith(500);
    expect(send).toHaveBeenCalledWith(
        expect.objectContaining({ status: 500, correlationId: 'backend-request-id' })
    );
    expect(logger.error).toHaveBeenCalledTimes(2);
    for (const [error, message] of vi.mocked(logger.error).mock.calls) {
        const output = `${JSON.stringify(error)} ${error instanceof Error ? error.stack : ''} ${message}`;
        expect(output).not.toContain('sensitive-access-token');
        expect(output).not.toContain('sensitive-user-token');
    }
    const [errorResponse] = send.mock.calls[0];
    expect(errorResponse.stack).not.toContain('sensitive-access-token');
    expect(errorResponse.stack).not.toContain('sensitive-user-token');
});

it('preserves a backend HTTP status without retaining the response body', async () => {
    vi.stubGlobal(
        'fetch',
        vi.fn().mockResolvedValue(new Response('sensitive-access-token', { status: 403 }))
    );
    const consumer = createConsumer();

    const result = consumer.fetchResponse('/resource', 'GET');

    await expect(result).rejects.toMatchObject({ status: 403, correlationId: 'request-id' });
    expect(logger.error).toHaveBeenCalledOnce();
});

it('does not retain a network error message containing a token', async () => {
    vi.stubGlobal(
        'fetch',
        vi.fn().mockRejectedValue(new Error('Network failure: sensitive-access-token'))
    );
    const consumer = createConsumer();

    const result = consumer.fetchResponse('/resource', 'GET');

    await expect(result).rejects.toMatchObject({ status: 500 });
    const [error] = vi.mocked(logger.error).mock.calls[0];
    expect(error).toBeInstanceOf(Error);
    expect(JSON.stringify(error)).not.toContain('sensitive-access-token');
    expect(error instanceof Error ? error.stack : '').not.toContain('sensitive-access-token');
});

it('reports invalid JSON without logging response text from the parser error', async () => {
    vi.stubGlobal(
        'fetch',
        vi.fn().mockResolvedValue(new Response('sensitive-access-token', { status: 200 }))
    );
    const consumer = createConsumer();

    const result = await consumer.fetchResponse<string>('/resource', 'GET');

    expect(result.data).toBe('sensitive-access-token');
    expect(logger.error).toHaveBeenCalledExactlyOnceWith('Backend response is not valid JSON');
});

it('still returns successful JSON responses', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(Response.json({ result: 'ok' })));
    const consumer = createConsumer();

    const result = await consumer.fetchResponse('/resource', 'GET');

    expect(result).toMatchObject({ ok: true, status: 200, data: { result: 'ok' } });
    expect(logger.error).not.toHaveBeenCalled();
});
