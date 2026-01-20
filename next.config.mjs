import i18nInt from './next-i18next.config.js';
const { i18n } = i18nInt;

/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    // Exclude packages from bundling, i.e. exclude bundling libraries
    // into server-side code. Instead, Next.js will use the native Node.js
    // require() to load them directly from node_modules at runtime.
    serverExternalPackages: ['jsdom', 'msw'],
    i18n,
};

export default nextConfig;