/** @type {import('next').NextConfig} */
const { i18n } = require("./next-i18next.config");

const nextConfig = {
  i18n,
  reactStrictMode: true,
  images: {
    dangerouslyAllowSVG: true,
    domains: ["api.dicebear.com"],
  },
};

module.exports = nextConfig;
