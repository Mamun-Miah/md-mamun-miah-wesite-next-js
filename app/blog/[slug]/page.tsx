// app/blog/[slug]/page.tsx
import BlogPost from '../../components/BlogPost';
import { notFound } from 'next/navigation';

type Props = {
  params: Promise< {
    slug: string;
  }>
};

export default async function BlogPage({ params }: Props) {
    const {slug} = await params;
  const res = await fetch(
    `https://lightblue-goat-212889.hostingersite.com/wp-json/wp/v2/posts?slug=${slug}`,
    { next: { revalidate: 60 } } // Optional: ISR
  );

  if (!res.ok) {
    notFound();
  }

  const posts = await res.json();

  if (posts.length === 0) {
    notFound();
  }

  const post = posts[0];

  return (
    <BlogPost
      title={post.title.rendered}
      content={post.content.rendered}
    />
  );
}
