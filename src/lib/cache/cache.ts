import { createRedisInstance } from './redis';
import { getLocalCache } from './localcache';
import { TCache } from './types';
import environment from '../../environment';

async function getCache() {
    if (environment.valkey.enabled) {
        return createRedisInstance();
    }

    return getLocalCache();
}

const cache: TCache = await getCache();
export default cache;
