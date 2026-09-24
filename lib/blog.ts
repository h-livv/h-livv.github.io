import fs from 'fs';
import path from 'path';

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  content: string;
  href: string;
  lastModified: number;
}

const BLOG_DIR = path.join(process.cwd(), 'blog');

const listingDescriptions: Record<string, string> = {
  tempest: 'Retrospective',
  'what-are-derivatives': 'First Principles',
};

function extractTitle(markdown: string, fallback: string): string {
  const match = markdown.match(/^#\s+(.+)$/m);
  return match ? match[1].trim() : fallback;
}

function extractDescription(markdown: string): string {
  const withoutHeading = markdown.replace(/^#\s+.+$/m, '').trim();
  const paragraphs = withoutHeading
    .split(/\n\s*\n/)
    .filter((block) => !/^#+\s+/.test(block.trim()))
    .map((block) =>
      block
        .replace(/^#+\s+/gm, '')
        .replace(/!\[[^\]]*\]\([^)]+\)/g, '')
        .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
        .replace(/[*_`]/g, '')
        .replace(/\s+/g, ' ')
        .trim()
    )
    .filter(Boolean);

  const first = paragraphs[0] ?? '';
  if (first.length <= 160) return first;
  return `${first.slice(0, 157).trimEnd()}...`;
}

function discoverMarkdownFiles(dir: string, base = ''): { relativePath: string; slug: string }[] {
  if (!fs.existsSync(dir)) return [];

  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files: { relativePath: string; slug: string }[] = [];

  for (const entry of entries) {
    const relativePath = base ? `${base}/${entry.name}` : entry.name;

    if (entry.isDirectory()) {
      files.push(...discoverMarkdownFiles(path.join(dir, entry.name), relativePath));
      continue;
    }

    if (!entry.name.endsWith('.md')) continue;

    const folder = path.dirname(relativePath);
    const name = entry.name.replace(/\.md$/, '');
    // Prefer folder slug when file matches folder (e.g. tempest/tempest.md → tempest)
    const rawSlug = folder !== '.' && (name === path.basename(folder) || name === 'index')
      ? folder.replace(/\\/g, '/')
      : relativePath.replace(/\.md$/, '').replace(/\\/g, '/');

    const slug = rawSlug.split('/').map(part => part.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')).join('/');

    files.push({ relativePath, slug });
  }

  return files;
}

export function getAllPosts(): BlogPost[] {
  return discoverMarkdownFiles(BLOG_DIR)
    .map(({ relativePath, slug }) => {
      const filePath = path.join(BLOG_DIR, relativePath);
      const content = fs.readFileSync(filePath, 'utf8');
      const stat = fs.statSync(filePath);
      const title = extractTitle(content, slug);
      return {
        slug,
        title,
        description: listingDescriptions[slug] ?? extractDescription(content),
        content,
        href: `/blog/${slug}`,
        lastModified: stat.mtimeMs,
      };
    })
    .sort((a, b) => b.lastModified - a.lastModified);
}

export function getPostBySlug(slug: string): BlogPost | null {
  return getAllPosts().find((post) => post.slug === slug) ?? null;
}

export function getAllPostSlugs(): string[] {
  return getAllPosts().map((post) => post.slug);
}
