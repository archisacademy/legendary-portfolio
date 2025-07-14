/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://legendary-portfolio.vercel.app',
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
      },
    ],
    additionalSitemaps: [
      'https://legendary-portfolio.vercel.app/sitemap.xml',
    ],
  },
  exclude: ['/404', '/500'],
  changefreq: 'weekly',
  priority: 0.7,
} 