module.exports = {
  locales: ["en", "fa"],
  defaultLocale: "fa",
  pages: {
    "*": ["common", "zod"],
    "rgx:^/admin/products": ["product"]
  }
}
