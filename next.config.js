/** @type {import('next').NextConfig} */
const nextConfig = {
    async redirects() {
        return [
          {
            source: '/profile',
            destination: '/profile',
            permanent: false,
          },
        ]
      },
}

module.exports = nextConfig

