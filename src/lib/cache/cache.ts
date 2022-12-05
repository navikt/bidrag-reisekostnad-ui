import { createRedisInstance } from "./redis";
import { getLocalCache } from "./localcache";
import { TCache } from "./types";
import environment from "../../environment";

async function getCache() {
  if (environment.redis.enabled) {
    return createRedisInstance();
  }

  return getLocalCache();
}

let cache: TCache = await getCache();

export async function initCacheWithContext() {
  cache = await getCache();
}
export default cache;
