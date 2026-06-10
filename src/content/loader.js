import { marked } from 'marked';

// Eagerly pull every markdown file under src/content/<category>/*.md as a raw
// string. Vite inlines these at build time, so no runtime fetching is needed.
const files = import.meta.glob('./**/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
});

marked.setOptions({ gfm: true, breaks: false });

/**
 * Minimal YAML-ish frontmatter parser. Supports strings, numbers, booleans,
 * inline arrays ([a, b]) and block lists (- item). Enough for our post schema
 * without pulling in a Buffer-dependent parser that breaks in the browser.
 */
function parseFrontmatter(raw) {
  const match = /^---\s*\n([\s\S]*?)\n---\s*\n?([\s\S]*)$/.exec(raw);
  if (!match) return { data: {}, body: raw.trim() };

  const [, fm, body] = match;
  const data = {};
  const lines = fm.split('\n');
  let key = null;

  for (const line of lines) {
    if (!line.trim()) continue;

    // Block-list item belonging to the previous key
    const listItem = /^\s*-\s+(.*)$/.exec(line);
    if (listItem && key) {
      if (!Array.isArray(data[key])) data[key] = [];
      data[key].push(unquote(listItem[1]));
      continue;
    }

    const kv = /^([A-Za-z0-9_]+):\s*(.*)$/.exec(line);
    if (!kv) continue;
    key = kv[1];
    const value = kv[2].trim();

    if (value === '') {
      data[key] = []; // expect a block list to follow
    } else if (value.startsWith('[') && value.endsWith(']')) {
      data[key] = value
        .slice(1, -1)
        .split(',')
        .map((v) => unquote(v.trim()))
        .filter(Boolean);
    } else {
      data[key] = coerce(unquote(value));
    }
  }

  return { data, body: body.trim() };
}

function unquote(v) {
  return v.replace(/^['"]|['"]$/g, '');
}

function coerce(v) {
  if (v === 'true') return true;
  if (v === 'false') return false;
  return v;
}

function buildPosts() {
  const posts = Object.entries(files).map(([path, raw]) => {
    const segments = path.replace('./', '').split('/');
    const category = segments[0];
    const slug = segments[segments.length - 1].replace(/\.md$/, '');
    const { data, body } = parseFrontmatter(raw);

    return {
      slug,
      category,
      title: data.title || slug,
      date: data.date || '',
      excerpt: data.excerpt || '',
      cover: data.cover || '',
      tags: data.tags || [],
      images: data.images || [],
      video: data.video || '',
      featured: data.featured === true,
      readTime: estimateReadTime(body),
      body,
      html: marked.parse(body),
    };
  });

  // Newest first
  return posts.sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0));
}

function estimateReadTime(body) {
  const words = body.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

const POSTS = buildPosts();

export function getAllPosts() {
  return POSTS;
}

export function getPostsByCategory(category) {
  return POSTS.filter((p) => p.category === category);
}

export function getPost(category, slug) {
  return POSTS.find((p) => p.category === category && p.slug === slug) || null;
}

export function formatDate(iso) {
  if (!iso) return '';
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
}
