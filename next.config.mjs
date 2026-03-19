/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack(config, { dev }) {
    if (dev) {
      config.cache = false;
      config.parallelism = 1;
    }
    return config;
  },
  async rewrites() {
    return [
      {
        source: '/blog/:slug*',
        destination: 'https://primary-production-bf78.up.railway.app/:slug*',
      },
    ];
  },
};

export default nextConfig;
