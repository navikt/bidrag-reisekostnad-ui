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
    env: {
      IS_DEVELOPMENT: isDev
    },
    ...nextConfig
  }
}
