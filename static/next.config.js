/** @type {import('next').NextConfig} */
const isLocal = process.env.NODE_ENV === 'local'

const nextConfig = {
  reactStrictMode: true,
  assetPrefix: !isLocal ? 'https://cdn.handle.me' : '',
}

module.exports = nextConfig
