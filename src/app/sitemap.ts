import { PARKS } from "zitnr-utils";
import type { MetadataRoute } from 'next'

export default function sitemap() : MetadataRoute.Sitemap {
  const staticUrls: MetadataRoute.Sitemap = [
    {
      url: 'https://www.zitnr.com/',
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: 'https://www.zitnr.com/donate',
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: 'https://zitnr.com/map',
      changeFrequency: 'weekly',
      priority: 0.9,
    },
  ];

  PARKS.forEach(park => {
    staticUrls.push({
      url: `https://www.zitnr.com/calendar/${park.slug}`,
      changeFrequency: 'daily',
      priority: 0.8,
    });
  });

  return [...staticUrls];
}
