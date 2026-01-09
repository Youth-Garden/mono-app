import { MetadataRoute } from 'next';
import { routing } from '../i18n/routing';
import { source } from '../source';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://scroll-trigger.com';

  const result: MetadataRoute.Sitemap = [];

  for (const locale of routing.locales) {
    result.push({
      url: `${baseUrl}/${locale}`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    });

    // Docs pages
    for (const page of source.getPages()) {
      if (page.file.locale && page.file.locale !== locale) continue;
      if (!page.file.locale && locale !== routing.defaultLocale) continue;

      result.push({
        url: `${baseUrl}/${locale}/docs/${page.slugs.join('/')}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.8,
      });
    }
  }

  return result;
}
