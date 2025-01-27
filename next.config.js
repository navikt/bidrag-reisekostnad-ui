/** @type {import('next').NextConfig} */
const { i18n } = require('./next-i18next.config');

const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
};

module.exports = (phase) => {
    return {
        webpack: (config) => {
            // this will override the experiments
            config.experiments = { ...config.experiments, ...{ topLevelAwait: true } };
            // this will just update topLevelAwait property of config.experiments
            // config.experiments.topLevelAwait = true
            return config;
        },
        i18n,
        ...nextConfig,
    };
};
