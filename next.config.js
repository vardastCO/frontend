/** @type {import('next').NextConfig} */

const withPlugins = require("next-compose-plugins")
const nextTranslate = require("next-translate-plugin")
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true"
})
const withPWA = require("next-pwa")({
  dest: "public",
  // Solution: https://github.com/shadowwalker/next-pwa/issues/424#issuecomment-1399683017
  buildExcludes: ["app-build-manifest.json"]
})

const nextConfig = {
  reactStrictMode: true,
  images: {
    dangerouslyAllowSVG: true,
    domains: ["api.dicebear.com", "localhost", "static.vardast.com"]
  }
}

module.exports = withPlugins(
  [withPWA, nextTranslate, withBundleAnalyzer],
  nextConfig
)
