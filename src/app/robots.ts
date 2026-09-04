import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/dashboard/', '/login/'], // অ্যাডমিন প্যানেল গুগলে দেখাবে না
    },
    sitemap: 'https://taj-uddin-rashed.vercel.app/sitemap.xml',
  };
}