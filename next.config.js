/** @type {import('next').NextConfig} */
const {
  PHASE_DEVELOPMENT_SERVER,
} = require('next/constants')

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true
}


module.exports = (phase) => {
  const isDev = phase === PHASE_DEVELOPMENT_SERVER
  return {
    webpack: (config) => {
      // this will override the experiments
      config.experiments = { ...config.experiments, ...{ topLevelAwait: true }};
      // this will just update topLevelAwait property of config.experiments
      // config.experiments.topLevelAwait = true
      return config;
    },
    env: {
      IS_DEVELOPMENT: isDev,
      IS_PRODUCTION: !isDev
    },
    ...nextConfig
  }
}
