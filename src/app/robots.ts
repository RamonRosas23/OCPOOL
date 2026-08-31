import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: 'https://www.ocpool.com/sitemap.xml',
    host: 'https://www.ocpool.com',
  };
}
