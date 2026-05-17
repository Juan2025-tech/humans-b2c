/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl:         process.env.NEXTAUTH_URL || "https://humans-tech.com",
  generateRobotsTxt: true,
  exclude:         ["/admin", "/admin/*"],
  robotsTxtOptions: {
    policies: [
      { userAgent: "*", allow: "/" },
      { userAgent: "*", disallow: ["/admin", "/admin/"] },
    ],
  },
};
