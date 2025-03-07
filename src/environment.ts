import env from 'env-var';

// @ts-nocheck
const system = {
    isDevelopment: process.env.NODE_ENV === 'development',
    isProduction: process.env.NODE_ENV === 'production',
    isClusterProduction: process.env.NAIS_CLUSTER_NAME == 'prod-gcp',
};

const url = {
    bidragReisekostnad: env.get('BIDRAG_REISEKOSTNAD_API_URL').required().asString(),
};

const audiences = {
    bidrag_reisekostnad_api: env.get('BIDRAG_REISEKOSTNAD_API_SCOPE').required().asString(),
};

const valkey = {
    enabled: env.get('ENABLE_VALKEY').required(false).default('true').asBool(),
    port: env.get('VALKEY_PORT_REISEKOSTNAD').required(false).asPortNumber(),
    url: env.get('VALKEY_URI_REISEKOSTNAD').required(false).asString(),
    host: env.get('VALKEY_HOST_REISEKOSTNAD').required(false).asString(),
    username: env.get('VALKEY_USERNAME_REISEKOSTNAD').required(false).asString(),
    password: env.get('VALKEY_PASSWORD_REISEKOSTNAD').required(false).asString(),
};
/* eslint import/no-anonymous-default-export: [2, {"allowObject": true}] */
export default { url, system, audiences, valkey };
