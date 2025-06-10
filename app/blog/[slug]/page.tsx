// app/blog/[slug]/page.tsx (or your relevant path)

import BlogPost from '../../components/BlogPost';

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

export const runtime = 'edge';

export default async function BlogPage({ params }: Props) {
  const { slug } = await params;

  const res = await fetch(
    'https://linen-squirrel-954851.hostingersite.com/posts.json',
    { next: { revalidate: 60 } } // cache for 60 seconds, optional
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
