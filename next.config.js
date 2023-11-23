/** @type {import('next').NextConfig} */
const nextConfig = {
    async redirects() {
        return [
          {
            source: '/profile',
            destination: '/',
            permanent: false,
          },
        ]
      },
}

module.exports = nextConfig

