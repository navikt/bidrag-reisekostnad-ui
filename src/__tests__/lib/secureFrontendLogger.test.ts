import { afterEach, expect, it, vi } from 'vitest';
import { secureFrontendLogger } from '../../lib/logging/secureFrontendLogger';

vi.mock('pino', async () => ({
    default: (await import('pino/browser')).default,
}));

afterEach(() => {
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
});

it('sends sensitive frontend records without writing them to the browser console', async () => {
    const fetch = vi.fn().mockResolvedValue({ ok: true });
    vi.stubGlobal('fetch', fetch);
    const consoleError = vi.spyOn(console, 'error');

    secureFrontendLogger().error({ requestBody: 'sensitive payload' }, 'request failed');
    await vi.waitFor(() => expect(fetch).toHaveBeenCalledOnce());

    expect(fetch).toHaveBeenCalledWith(
        '/api/log/secure',
        expect.objectContaining({
            method: 'POST',
            body: expect.stringContaining('sensitive payload'),
            keepalive: true,
        })
    );
    expect(consoleError).not.toHaveBeenCalled();
});

it.each([
    () => Promise.reject(new Error('sensitive transport failure')),
    () => Promise.resolve({ ok: false }),
])('reports delivery failure without echoing sensitive data', async (response) => {
    vi.stubGlobal('fetch', vi.fn().mockImplementation(response));
    const warning = vi.spyOn(console, 'warn').mockImplementation(() => {});

    secureFrontendLogger().error({ requestBody: 'sensitive payload' }, 'request failed');

    await vi.waitFor(() =>
        expect(warning).toHaveBeenCalledExactlyOnceWith('Unable to send sensitive log to backend')
    );
});
