/** @type {import('next').NextConfig} */

const withPlugins = require("next-compose-plugins")
const nextTranslate = require("next-translate-plugin")
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true"
})

const nextConfig = {
  reactStrictMode: true,
  productionBrowserSourceMaps: true,
  experimental: {
    serverActions: true
  },
  images: {
    dangerouslyAllowSVG: true,
    domains: [
      "api.dicebear.com",
      "localhost",
      "static.vardast.com",
      "vardast.com",
      "storage"
    ]
  },
  async redirects() {
    return [
      {
        source: "/my-api",
        destination: "https://dev.api.vardast.ir/graphql",
        permanent: true
      },
      {
        source: "/p",
        destination: "/search",
        permanent: true
      },
      {
        source: "/brand",
        destination: "/brands",
        permanent: true
      },
      {
        source: "/seller",
        destination: "/sellers",
        permanent: true
      }
    ]
  },
  poweredByHeader: false
}

module.exports = withPlugins([nextTranslate, withBundleAnalyzer], nextConfig)
