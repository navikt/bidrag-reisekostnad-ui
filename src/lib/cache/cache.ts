import { getLocalCache } from './localcache';
import { TCache } from './types';
import environment from '../../environment';
import { createValkeyInstance } from './valkey';

async function getCache() {
    if (environment.valkey.enabled) {
        return createValkeyInstance();
    }

    return getLocalCache();
}

const cache: TCache = await getCache();
export default cache;
