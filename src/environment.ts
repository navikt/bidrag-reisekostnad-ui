import env from "env-var";

// @ts-nocheck
const system = {
  isDevelopment: process.env.NODE_ENV === "development",
  isProduction: process.env.NODE_ENV === "production",
  isClusterProduction: process.env.NAIS_CLUSTER_NAME == "prod-gcp",
};

const url = {
  bidragReisekostnad: env.get("BIDRAG_REISEKOSTNAD_API_URL").required().asString(),
};

const audiences = {
  bidrag_reisekostnad_api: env.get("BIDRAG_REISEKOSTNAD_API_SCOPE").required().asString(),
};

const redis = {
  enabled: env.get("ENABLE_REDIS").required(false).default("true").asBool(),
  url: env.get("REDIS_URI_REISEKOSTNAD").required().asString(),
  username: env.get("REDIS_USERNAME_REISEKOSTNAD").required().asPortNumber(),
  password: env.get("REDIS_PASSWORD_REISEKOSTNAD").required(false).asString(),
};

export default { url, system, audiences, redis };
