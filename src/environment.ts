import env from "env-var";

// @ts-nocheck
const system = {
  isDevelopment: process.env.NODE_ENV === "development",
  isProduction: process.env.NODE_ENV === "production",
};

const url = {
  bidragReisekostnad: env.get("BIDRAG_REISEKOSTNAD_API_URL").required().asString(),
};

const audiences = {
  bidrag_reisekostnad_api: env.get("BIDRAG_REISEKOSTNAD_API_SCOPE").required().asString(),
};

const redis = {
  enabled: env.get("ENABLE_REDIS").required(false).default("true").asBool(),
  host: env.get("REDIS_HOST").required().asString(),
  port: env.get("REDIS_PORT").required().asPortNumber(),
  password: env.get("REDIS_PASSWORD").required(false).asString(),
};

export default { url, system, audiences, redis };
