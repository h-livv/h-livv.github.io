import type { MetadataRoute } from 'next';
import { getAllPostSlugs } from '@/lib/blog';

const siteUrl = 'https://harliv.dev';

export const dynamic = 'force-static';

const staticRoutes = [
  '/',
  '/blog',
  '/projects/geantpy',
  '/projects/janus',
  '/projects/penrose',
  '/projects/tempest',
];

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    ...staticRoutes,
    ...getAllPostSlugs().map((slug) => `/blog/${slug}`),
  ];

  return routes.map((route) => ({
    url: new URL(route, siteUrl).toString(),
  }));
}
