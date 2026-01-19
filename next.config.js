/** @type {import('next').NextConfig} */
// eslint-disable-next-line @typescript-eslint/no-require-imports
const { i18n } = require('./next-i18next.config');

const nextConfig = {
    reactStrictMode: true,
};

module.exports = () => {
    return {
        turbopack: (config) => {
            return config;
        },
        i18n,
        ...nextConfig,
    };
};
