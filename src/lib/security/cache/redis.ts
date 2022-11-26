import Redis, { RedisOptions } from 'ioredis';
import environment from "../../../environment";
import {logger} from "../../logging/logger";
import memoize from "lodash.memoize";
import {TCache} from "./types";

export const createRedisInstance: ()=>TCache = memoize(() =>{
  try {
    const options: RedisOptions = {
      host: environment.redis.host,
      port: environment.redis.port,
      showFriendlyErrorStack: true,
      enableAutoPipelining: true,
      maxRetriesPerRequest: 0,
      retryStrategy: (times: number) => {
        if (times > 3) {
          throw new Error(`[Redis] Could not connect after ${times} attempts`);
        }

        return Math.min(times * 200, 1000);
      },
    };

    if (environment.redis.password) {
      options.password = environment.redis.password
    }

    const redis = new Redis(options);

    redis.on('error', (error: unknown) => {
      logger.warn('[Redis] Error connecting', error);
    });

    return {
      get: (key: string) => redis.get(key),
      set: (key: string, value: string, ttlSeconds: number) => redis.set(key, value, "EX", ttlSeconds)
    };
  } catch (e) {
    throw new Error(`[Redis] Could not create a Redis instance`);
  }
})