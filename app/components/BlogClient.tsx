'use client';

import { useEffect, useState } from 'react';
import BlogPost from './BlogPost';

type PostData = {
  title: { rendered: string };
  content: { rendered: string };
  _embedded?: {
    'wp:featuredmedia'?: {
      source_url: string;
    }[];
  };
};

type Props = {
  slug: string;
};

export default function BlogClient({ slug }: Props) {
  const [post, setPost] = useState<PostData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await fetch(
          `https://lightblue-goat-212889.hostingersite.com/wp-json/wp/v2/posts?slug=${slug}&_embed`
        );
        const data = await res.json();
        if (data.length > 0) {
          setPost(data[0]);
        }
      } catch (error) {
        console.error('Error fetching post:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [slug]);

  if (loading) return <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-white bg-opacity-70 z-50">
      <span className="loading loading-ring w-24 text-warning"></span>
    </div>;
  if (!post) return <p>Post not found.</p>;

  const imageUrl = post._embedded?.['wp:featuredmedia']?.[0]?.source_url ?? '';

  return (
    <BlogPost
      title={post.title.rendered}
      content={post.content.rendered}
      image={imageUrl}
    />
  );
}
