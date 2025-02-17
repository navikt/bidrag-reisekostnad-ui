import Redis, { RedisOptions } from 'iovalkey';
import { TCache } from './types';
import environment from '../../environment';
import { logger } from '../logging/logger';

export const createRedisInstance: () => TCache = () => {
    logger.info('Creating redis instance');
    try {
        const options: RedisOptions = {
            username: environment.valkey.username,
            password: environment.valkey.password,
            port: parseInt(environment.valkey.port),
            showFriendlyErrorStack: true,
            enableAutoPipelining: true,
            maxRetriesPerRequest: 0,
            enableReadyCheck: false,
            retryStrategy: (times: number) => {
                if (times > 3) {
                    throw new Error(`[Valkey] Could not connect after ${times} attempts`);
                }

                return Math.min(times * 200, 1000);
            },
        };

        const redis = new Redis(environment.valkey.url, options);

        redis.on('error', (error: unknown) => {
            logger.warn('[Valkey] Error connecting', error);
        });

        redis.on('ready', () => {
            logger.info('Valkey cache initialized');
        });

        return {
            get: (key: string) => redis.get(key),
            set: (key: string, value: string, ttlSeconds: number) =>
                redis.set(key, value, 'EX', ttlSeconds),
            isReady: () => redis.status == 'ready',
        };
    } catch (e) {
        throw new Error(`[Valkey] Could not create a Valkey instance`);
    }
};
