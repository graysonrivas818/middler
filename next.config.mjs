/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
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