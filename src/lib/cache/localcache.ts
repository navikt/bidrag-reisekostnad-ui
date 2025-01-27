import NodeCache from 'node-cache';
import { TCache } from './types';
import { logger } from '../logging/logger';

export function getLocalCache(): TCache {
    const cache = new NodeCache();

    return {
        get: async (key: string) => {
            logger.info('Fetching from local cache');
            return cache.get(key) ?? null;
        },
        set: async (key: string, value: string, ttlSeconds: number) => {
            cache.set(key, value, ttlSeconds);
            return Promise.resolve('OK');
        },
        isReady: () => true,
    };
}
