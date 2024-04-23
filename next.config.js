/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
  },
  pageExtensions: ['mdx', 'md', 'jsx', 'tsx'],
  images: {
    domains: ['source.unsplash.com'],
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/wrapeth',
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig
