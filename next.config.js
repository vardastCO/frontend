/** @type {import('next').NextConfig} */

const withPlugins = require("next-compose-plugins")
const nextTranslate = require("next-translate-plugin")
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true"
})

const nextConfig = {
  reactStrictMode: true,
  webpack: (config) => {
    config.resolve.alias.canvas = false

    return config
  },
  productionBrowserSourceMaps: true,

  images: {
    dangerouslyAllowSVG: true,
    domains: [
      "api.dicebear.com",
      "localhost",
      "static.vardast.com",
      "stage.vardast.com",
      "vardast.com",
      "blog.vardast.com",
      "storage"
    ]
    // path: process.env.NEXT_PUBLIC_IMAGE_DOMAIN
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
        destination: "/products",
        permanent: true
      },
      {
        source: "/categories",
        destination: "/categories/vocabularies",
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
