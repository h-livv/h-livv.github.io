import type { Metadata } from 'next';

const siteName = 'Harliv Singh';
const socialImage = '/images/social-card.png';

type PageMetadataInput = {
  title: string;
  description: string;
  path: string;
};

export function pageMetadata({ title, description, path }: PageMetadataInput): Metadata {
  const url = new URL(path, 'https://harliv.dev').toString();

  return {
    title: path === '/' ? { absolute: title } : title,
    description,
    alternates: { canonical: path === '/' ? 'https://harliv.dev/' : path },
    openGraph: {
      title,
      description,
      url,
      siteName,
      type: 'website',
      images: [{ url: socialImage, width: 1200, height: 630, alt: 'Harliv Singh — Mathematics, AI & Computational Research' }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [socialImage],
    },
  };
}
