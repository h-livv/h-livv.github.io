import fs from 'fs';
import path from 'path';

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  content: string;
  href: string;
}

const BLOG_DIR = path.join(process.cwd(), 'blog');

function extractTitle(markdown: string, fallback: string): string {
  const match = markdown.match(/^#\s+(.+)$/m);
  return match ? match[1].trim() : fallback;
}

function extractDescription(markdown: string): string {
  const withoutHeading = markdown.replace(/^#\s+.+$/m, '').trim();
  const paragraphs = withoutHeading
    .split(/\n\s*\n/)
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
    const slug = folder !== '.' && (name === path.basename(folder) || name === 'index')
      ? folder.replace(/\\/g, '/')
      : relativePath.replace(/\.md$/, '').replace(/\\/g, '/');

    files.push({ relativePath, slug });
  }

  return files;
}

export function getAllPosts(): BlogPost[] {
  return discoverMarkdownFiles(BLOG_DIR)
    .map(({ relativePath, slug }) => {
      const content = fs.readFileSync(path.join(BLOG_DIR, relativePath), 'utf8');
      const title = extractTitle(content, slug);
      return {
        slug,
        title,
        description: extractDescription(content),
        content,
        href: `/blog/${slug}`,
      };
    })
    .sort((a, b) => a.title.localeCompare(b.title));
}

export function getPostBySlug(slug: string): BlogPost | null {
  return getAllPosts().find((post) => post.slug === slug) ?? null;
}

export function getAllPostSlugs(): string[] {
  return getAllPosts().map((post) => post.slug);
}
