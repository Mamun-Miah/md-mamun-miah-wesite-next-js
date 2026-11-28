import type { MetadataRoute } from 'next';
import { pages, siteUrl, type SeoPage } from '@/lib/seo';

export default function sitemap(): MetadataRoute.Sitemap {
  return Object.values(pages)
    .filter((page: SeoPage) => page.index !== false)
    .map(({ path }) => ({ url: siteUrl(path) }));
}
