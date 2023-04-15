/** @type {import('next').NextConfig} */
const { i18n } = require("./next-i18next.config");
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

const nextConfig = withBundleAnalyzer({
  i18n,
  reactStrictMode: true,
  images: {
    dangerouslyAllowSVG: true,
    domains: ["api.dicebear.com"],
  },
});

module.exports = nextConfig;
