/** @type {import('next').NextConfig} */

const nextTranslate = require("next-translate-plugin")
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true"
})

const nextConfig = withBundleAnalyzer(
  nextTranslate({
    experimental: { appDir: true },
    reactStrictMode: true,
    async redirects() {
      return [
        {
          source: "/",
          destination: "/admin",
          permanent: true
        }
      ]
    },
    images: {
      dangerouslyAllowSVG: true,
      domains: ["api.dicebear.com"]
    }
  })
)

module.exports = nextConfig
