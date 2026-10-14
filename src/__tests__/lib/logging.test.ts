import type { NextApiRequest, NextApiResponse } from 'next';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { backendLogger } from '../../lib/logging/backendLogger';
import { getAsyncStorage } from '../../lib/logging/als';
import { withLoggerContext } from '../../lib/logging/withLoggerContext';
import { secureBackendLogger } from '../../lib/logging/secureBackendLogger';
import { teamLogsDestination } from '../../lib/logging/teamLogsDestination';

vi.mock('../../lib/logging/teamLogsDestination', () => ({
    teamLogsDestination: { write: vi.fn() },
}));

afterEach(() => {
    vi.unstubAllEnvs();
    vi.restoreAllMocks();
    vi.clearAllMocks();
});

describe('backend logging lifecycle', () => {
    it('reads context at log time without leaking it across overlapping requests', async () => {
        const records: Record<string, unknown>[] = [];
        const logger = backendLogger({
            hooks: {
                streamWrite: (record) => {
                    records.push(JSON.parse(record));
                    return '';
                },
            },
        });
        let releaseFirst: () => void = () => {};
        const firstReady = new Promise<void>((resolve) => {
            releaseFirst = resolve;
        });
        const first = getAsyncStorage().run(
            { correlationId: 'first', eid: 1, tid: 2 },
            async () => {
                await firstReady;
                logger.info('first request');
            }
        );
        await getAsyncStorage().run({ correlationId: 'second', eid: 3, tid: 4 }, async () => {
            logger.info('second request');
            releaseFirst();
            await first;
            logger.info('second request again');
        });
        logger.info('outside request');

        expect(records.map((record) => record.correlationId)).toEqual([
            'second',
            'first',
            'second',
            undefined,
        ]);
        expect(records.map((record) => record.transactionId)).toEqual([
            'tx_3_4',
            'tx_1_2',
            'tx_3_4',
            undefined,
        ]);
    });

    it('propagates asynchronous handler failures instead of leaving a pending promise', async () => {
        const failure = new Error('handler failed');
        const handler = withLoggerContext(async () => {
            await Promise.resolve();
            expect(getAsyncStorage().getStore()?.correlationId).toBe('request-id');
            throw failure;
        });

        await expect(
            handler(
                { cookies: { correlationId: 'request-id' } } as NextApiRequest,
                {} as NextApiResponse
            )
        ).rejects.toBe(failure);
        expect(getAsyncStorage().getStore()).toBeUndefined();
    });
});

describe('sensitive backend logging', () => {
    function configureCluster() {
        vi.stubEnv('NAIS_CLUSTER_NAME', 'dev-gcp');
        vi.stubEnv('GOOGLE_CLOUD_PROJECT', 'team-project');
        vi.stubEnv('NAIS_NAMESPACE', 'bidrag');
        vi.stubEnv('NAIS_POD_NAME', 'pod-name');
        vi.stubEnv('NAIS_APP_NAME', 'bidrag-reisekostnad-ui');
    }

    it('routes sensitive records exclusively to Team Logs with metadata and request context', () => {
        configureCluster();
        const stdout = vi.spyOn(process.stdout, 'write');
        const logger = secureBackendLogger();

        getAsyncStorage().run({ correlationId: 'request-id', eid: 1, tid: 2 }, () => {
            logger.child({ requestBody: 'sensitive payload' }).error('request failed');
        });

        expect(teamLogsDestination.write).toHaveBeenCalledOnce();
        const [record] = vi.mocked(teamLogsDestination.write).mock.calls[0];
        expect(JSON.parse(record)).toMatchObject({
            google_cloud_project: 'team-project',
            nais_namespace_name: 'bidrag',
            nais_pod_name: 'pod-name',
            nais_container_name: 'bidrag-reisekostnad-ui',
            correlationId: 'request-id',
            transactionId: 'tx_1_2',
            level: 'ERROR',
            message: 'request failed',
            requestBody: 'sensitive payload',
            isSecure: true,
        });
        expect(stdout).not.toHaveBeenCalled();
    });

    it('fails explicitly when cluster routing metadata is missing', () => {
        configureCluster();
        vi.stubEnv('GOOGLE_CLOUD_PROJECT', '');

        expect(() => secureBackendLogger()).toThrow(
            'Missing required Team Logs environment variable: GOOGLE_CLOUD_PROJECT'
        );
        expect(teamLogsDestination.write).not.toHaveBeenCalled();
    });

    it('uses stdout in local development when pod metadata is unavailable', () => {
        vi.stubEnv('NAIS_CLUSTER_NAME', 'dev-gcp');
        vi.stubEnv('NAIS_POD_NAME', '');
        const stdout = vi.spyOn(process.stdout, 'write').mockReturnValue(true);

        secureBackendLogger().info('local log');

        expect(stdout).toHaveBeenCalledOnce();
        expect(teamLogsDestination.write).not.toHaveBeenCalled();
    });
});
