import { pages, shareCard } from './seo';

type Post = {
  id: number;
  slug: string;
  title: string;
  excerpt?: string;
  content: string;
  date: string;
};

const postCards = new Map([
  ['importance-of-a-domain-name-for-a-website', shareCard('blog-domain-names', 'Why domain names matter for your website')],
  ['the-critical-role-of-speed-optimization-in-seo-and-user-experience-ux', shareCard('blog-web-speed', 'Website speed for SEO and user experience')],
]);

export function postShareImage(slug: string) {
  return postCards.get(slug) ?? pages.blog.image;
}

export async function getPosts(): Promise<Post[]> {
  const res = await fetch('https://raw.githubusercontent.com/Mamun-Miah/WordPress-API-Automation-to-Github/refs/heads/main/posts.json');

  if (!res.ok) {
    throw new Error('Failed to fetch blog posts');
  }

  return res.json();
}
