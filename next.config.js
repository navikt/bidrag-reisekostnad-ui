/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  rules: [{test: /\.svg$/,
  use: ["@svgr/webpack"],}]
}


module.exports = nextConfig
