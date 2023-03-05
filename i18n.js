module.exports = {
  locales: ["en", "fa"], // Array with the languages that you want to use
  defaultLocale: "fa", // Default language of your website
  pages: {
    "*": ["common"], // Namespaces that you want to import per page (we stick to one namespace for all the application in this tutorial)
  },
};
