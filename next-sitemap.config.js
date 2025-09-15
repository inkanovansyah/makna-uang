// const siteMetadata = require("./src/utils/siteMetaData");


// module.exports = {
//     siteUrl: siteMetadata.siteUrl,
//     generateRobotsTxt: true,
//   }
const siteMetadata = require("./src/utils/siteMetaData");

/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: siteMetadata.siteUrl || "https://maknauang.com",
  generateRobotsTxt: true, // generate robots.txt otomatis
  changefreq: "daily", // default untuk semua halaman
  priority: 0.7, // default priority
  sitemapSize: 5000,
  exclude: [
    "/manifest.webmanifest",
    "/apple-icon.png",
    "/favicon.ico",
    "/404",
    "/500",
  ],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        allow: "/", // izinkan semua halaman frontend
      },
    ],
  },
};
