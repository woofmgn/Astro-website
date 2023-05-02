import type { MarkdownInstance } from 'astro';

interface formatOptions {
  filterOutDrafts?: boolean;
  filterOutFuturePosts?: boolean;
  sortByDate?: boolean;
  limit?: number | undefined;
}

export function slugify(text: string) {
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
}

export function formatDate(date: string) {
  return new Date(date).toLocaleDateString('en-US', {
    timeZone: "UTC",
  })
}

export function formatBlogPosts(posts: MarkdownInstance<Record<string, any>>[], {
  filterOutDrafts = true,
  filterOutFuturePosts = true,
  sortByDate = true,
  limit = undefined,
}: formatOptions = {}) {

  const filteredPosts = posts.reduce((acc, post) => {
    const { date, draft } = post.frontmatter;

    if (filterOutDrafts && draft) return acc;

    if (filterOutFuturePosts && new Date(date) > new Date()) return acc;

    acc.push(post)

    return acc;
  }, [] as MarkdownInstance<Record<string, any>>[])

  if (sortByDate) {
    // @ts-ignore
    filteredPosts.sort((a, b) => new Date(b.frontmatter.date) - new Date(a.frontmatter.date))
  } else {
    filteredPosts.sort(() => Math.random() - 0.5)
  }

  if (typeof limit === "number") {
    return filteredPosts.slice(0, limit);
  }
  return filteredPosts;
}