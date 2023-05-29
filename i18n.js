module.exports = {
  locales: ["en", "fa"],
  defaultLocale: "fa",
  pages: {
    "*": ["common", "zod"],
    "rgx:^/dashboard/products": ["product"]
  }
}
