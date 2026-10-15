/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'rasheed-systems.vercel.app',
          },
        ],
        destination: 'https://www.rasheedsystems.com/:path*',
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig
