import { decodeJwt, JWTPayload } from "jose";
import { OboProvider } from "../oboproviders/TokenExchangeClient";
import { secondsUntil } from "../../time.util";
import { logger } from "../../logging/logger";
import cache from "../../cache/cache";
const NO_CACHE_TTL = 0;

function getSecondsToExpire(payload: JWTPayload) {
  return Math.max(payload.exp ? secondsUntil(payload.exp) : NO_CACHE_TTL, NO_CACHE_TTL);
}

export interface ICacheOptions {
  expireOffsetInSeconds?: number;
}

export async function withOboTokenCache(
  oboProvider: OboProvider,
  { expireOffsetInSeconds }: ICacheOptions = {}
): Promise<OboProvider> {
  return async (token: string, audience: string) => {
    const key = `${token}-${audience}`;
    const cachedToken = await cache.get(key);
    if (cachedToken) {
      logger.info(`Fetching OBO token for audience ${audience} from cache`);
      return cachedToken;
    }
    logger.info(`Generating OBO token for audience ${audience}`);
    const oboToken = await oboProvider(token, audience);
    if (!oboToken) return null;

    const payload = decodeJwt(oboToken);
    const ttl = getSecondsToExpire(payload);
    if (ttl > (expireOffsetInSeconds ?? 0)) {
      await cache.set(key, oboToken, ttl);
    }

    return oboToken;
  };
}
