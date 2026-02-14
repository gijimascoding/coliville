import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import remarkGfm from "remark-gfm";
import remarkHtml from "remark-html";

export interface BlogPost {
  slug: string;
  seoTitle: string;
  metaDescription: string;
  primaryKeyword: string;
  supportingKeywords: string[];
  publishedAt: string;
  wordCount: number;
  featuredImage: string;
  featuredImageAlt: string;
  content: string; // processed HTML
}

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

function processMarkdown(markdown: string): string {
  // Synchronous remark processing via .processSync()
  const result = remark().use(remarkGfm).use(remarkHtml).processSync(markdown);
  return String(result);
}

function parsePost(filePath: string): BlogPost | null {
  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);

  // Only include published posts
  if (data.status !== "published") {
    return null;
  }

  const html = processMarkdown(content);

  return {
    slug: data.slug || path.basename(filePath, ".md"),
    seoTitle: data.seo_title || data.seoTitle || "",
    metaDescription: data.meta_description || data.metaDescription || "",
    primaryKeyword: data.primary_keyword || data.primaryKeyword || "",
    supportingKeywords: data.supporting_keywords || data.supportingKeywords || [],
    publishedAt: data.published_at || data.publishedAt || data.generated_at || "",
    wordCount: data.word_count || data.wordCount || 0,
    featuredImage: data.featured_image || data.featuredImage || "",
    featuredImageAlt: data.featured_image_alt || data.featuredImageAlt || "",
    content: html,
  };
}

export function getAllPosts(): BlogPost[] {
  if (!fs.existsSync(BLOG_DIR)) {
    return [];
  }

  const files = fs
    .readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith(".md"));

  const posts = files
    .map((f) => parsePost(path.join(BLOG_DIR, f)))
    .filter((p): p is BlogPost => p !== null);

  // Sort by publishedAt descending (newest first)
  posts.sort((a, b) => {
    const dateA = new Date(a.publishedAt).getTime() || 0;
    const dateB = new Date(b.publishedAt).getTime() || 0;
    return dateB - dateA;
  });

  return posts;
}

export function getPostBySlug(slug: string): BlogPost | null {
  const filePath = path.join(BLOG_DIR, `${slug}.md`);

  if (!fs.existsSync(filePath)) {
    return null;
  }

  return parsePost(filePath);
}

export function getRecentPosts(count: number): BlogPost[] {
  return getAllPosts().slice(0, count);
}

export function getAllSlugs(): string[] {
  if (!fs.existsSync(BLOG_DIR)) {
    return [];
  }

  return fs
    .readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith(".md"))
    .map((f) => {
      const raw = fs.readFileSync(path.join(BLOG_DIR, f), "utf-8");
      const { data } = matter(raw);
      // Include all posts (even drafts) for static generation
      return data.slug || path.basename(f, ".md");
    });
}
