export interface WPPost {
  id: number;
  slug: string;
   date: string;
  title: { rendered: string };
  content: { rendered: string };
  excerpt: { rendered: string };
  _embedded?: {
    'wp:featuredmedia'?: Array<{
      source_url: string;
    }>;
  };
}

export async function getPostBySlug(slug: string): Promise<WPPost | null> {
  const res = await fetch(
    `https://lightblue-goat-212889.hostingersite.com/wp-json/wp/v2/posts?slug=${slug}&_embed`
  );

  const data = await res.json();
  if (!data || data.length === 0) return null;

  return data[0];
}
