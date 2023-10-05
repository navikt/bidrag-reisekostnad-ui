import Redis, { RedisOptions } from "ioredis";
import { TCache } from "./types";
import environment from "../../environment";
import { logger } from "../logging/logger";

export const createRedisInstance: () => TCache = () => {
  logger.info("Creating redis instance");
  try {
    var redisUrl = new URL(environment.redis.url as string);
    const options: RedisOptions = {
      host: redisUrl.host,
      port: redisUrl.port,
      username: environment.redis.username,
      password: environment.redis.password,
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
      options.password = environment.redis.password;
    }

    const redis = new Redis(options);

    redis.on("error", (error: unknown) => {
      logger.warn("[Redis] Error connecting", error);
    });

    redis.on("ready", () => {
      logger.info("Redis cache initialized");
    });

    return {
      get: (key: string) => redis.get(key),
      set: (key: string, value: string, ttlSeconds: number) =>
        redis.set(key, value, "EX", ttlSeconds),
      isReady: () => redis.status == "ready",
    };
  } catch (e) {
    throw new Error(`[Redis] Could not create a Redis instance`);
  }
};
