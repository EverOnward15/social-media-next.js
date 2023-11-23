/** @type {import('next').NextConfig} */
const nextConfig = {
    async redirects() {
        return [
          {
            source: '/profile',
            destination: '/',
            permanent: true,
          },
          {
            source: '/profile/undefined',
            destination: '/',
            permanent: true,
          },
        ]
      },
}

module.exports = nextConfig

