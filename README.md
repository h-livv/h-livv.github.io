# Harliv Singh — Website

My personal website and project portfolio. It brings together current work,
selected projects, earlier computational physics experiments, writing, and
contact links.

**Live site:** [harliv.dev](https://harliv.dev/)

## Development

Requires Node.js 22 or later.

```bash
npm ci
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site locally.

## Build

```bash
npm run build
```

The build exports the static website to `out/` for hosting on GitHub Pages.
Use `npm run dev` for a local preview.

## Project structure

- `app/` — Next.js routes and page entry points
- `components/` — page sections and shared interface components
- `data/` — project and social-link content
- `blog/` — Markdown posts
- `lib/` — shared metadata and blog utilities
- `public/` — images and other static assets
- `.github/workflows/` — GitHub Pages build and deployment

## Search metadata

- Set route titles, descriptions, canonical URLs, and social cards with
  `pageMetadata` from `lib/metadata.ts` for pages that define their own metadata.
- Blog routes are discovered from Markdown files in `blog/` by `lib/blog.ts`.
- `app/sitemap.ts` combines the public static routes with discovered blog routes,
  so new posts are included in the generated `/sitemap.xml` at build time.
- `app/robots.ts` publishes the crawl policy and sitemap location in
  `/robots.txt`.
- The site is a static export. After deploying changes, submit
  `https://harliv.dev/sitemap.xml` in Google Search Console and review indexing
  there; sitemap inclusion does not guarantee indexing or ranking.

The site is built with Next.js, TypeScript, and Tailwind CSS.
