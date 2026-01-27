// app/blog/[slug]/page.tsx (or your relevant path)

import BlogPost from '../../components/BlogPost';
import type { Metadata } from "next";
type PostData = {
  title: string;
  content: string;
  date: string;
  featured_image?: string;
  slug: string;
};

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

// export const runtime = 'edge';

export const metadata: Metadata = {
robots: {
index: false,
follow: true,
},
};
export async function generateStaticParams() {
  const res = await fetch(
    'https://raw.githubusercontent.com/Mamun-Miah/WordPress-API-Automation-to-Github/refs/heads/main/posts.json'
  );

  if (!res.ok) {
    throw new Error('Failed to fetch posts for static generation');
  }

  const posts: PostData[] = await res.json();

  return posts.map((post) => ({
    slug: post.slug,
  }));
}


export default async function BlogPage({ params }: Props) {
  const { slug } = await params;

  const res = await fetch(
    'https://raw.githubusercontent.com/Mamun-Miah/WordPress-API-Automation-to-Github/refs/heads/main/posts.json'
  );

  if (!res.ok) {
    // Handle error or fallback UI
    return <p>Failed to load post.</p>;
  }

  const posts: PostData[] = await res.json();

  const post = posts.find((p) => p.slug === slug);

  if (!post) {
    return <p>Post not found.</p>;
  }

  return (
    <BlogPost
      title={post.title}
      content={post.content}
      image={post.featured_image ?? ''}
      date={post.date}
    />
  );
}
