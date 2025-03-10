/** @type {import('next').NextConfig} */
// eslint-disable-next-line @typescript-eslint/no-require-imports
const { i18n } = require('./next-i18next.config');

const nextConfig = {
    reactStrictMode: true,
};

module.exports = () => {
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
