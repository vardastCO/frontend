/** @type {import('next').NextConfig} */

// const path = require("path")
const withPlugins = require("next-compose-plugins")
const nextTranslate = require("next-translate-plugin")
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true"
})
// const withPWA = require("next-pwa")({
//   dest: "public",
//   // Solution: https://github.com/shadowwalker/next-pwa/issues/424#issuecomment-1399683017
//   buildExcludes: ["app-build-manifest.json"]
// })

// const generateAppDirEntry = (entry) => {
//   const packagePath = require.resolve("next-pwa")
//   const packageDirectory = path.dirname(packagePath)
//   const registerJs = path.join(packageDirectory, "register.js")

//   return entry().then((entries) => {
//     // Register SW on App directory, solution: https://github.com/shadowwalker/next-pwa/pull/427
//     if (entries["main-app"] && !entries["main-app"].includes(registerJs)) {
//       if (Array.isArray(entries["main-app"])) {
//         entries["main-app"].unshift(registerJs)
//       } else if (typeof entries["main-app"] === "string") {
//         entries["main-app"] = [registerJs, entries["main-app"]]
//       }
//     }
//     return entries
//   })
// }

const nextConfig = {
  reactStrictMode: true,
  experimental: {
    serverActions: true
  },
  images: {
    dangerouslyAllowSVG: true,
    domains: ["api.dicebear.com", "localhost", "static.vardast.com"]
  }
  // webpack: (config) => {
  //   const entry = generateAppDirEntry(config.entry)
  //   config.entry = () => entry

  //   return config
  // }
}

module.exports = withPlugins([nextTranslate, withBundleAnalyzer], nextConfig)
