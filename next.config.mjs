/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'deckofcardsapi.com',
        port: '',
        pathname: '/static/img/**',
      },
    ],
  },
  reactStrictMode: false,
};

export default nextConfig;
