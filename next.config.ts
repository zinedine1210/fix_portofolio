import type { NextConfig } from 'next'
import createNextIntlPlugin from 'next-intl/plugin'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [{ protocol: 'https', hostname: 'images.unsplash.com' }],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: '2mb'
    }
  }
}
const withNextIntl = createNextIntlPlugin();

export default withNextIntl(nextConfig)
