import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  return [{
    url: 'https://www.ocpool.com/',
    lastModified: new Date('2026-08-29'),
    changeFrequency: 'monthly',
    priority: 1,
  }];
}
