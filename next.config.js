/** @type {import('next').NextConfig} */
// eslint-disable-next-line @typescript-eslint/no-require-imports
const { i18n } = require('./next-i18next.config');

const nextConfig = {
    reactStrictMode: true,
    // Exclude packages from bundling, i.e. exclude bundling libraries
    // into server-side code. Instead, Next.js will use the native Node.js
    // require() to load them directly from node_modules at runtime.
    serverExternalPackages: ['jsdom', 'msw'],
    i18n,
};

module.exports = nextConfig;
