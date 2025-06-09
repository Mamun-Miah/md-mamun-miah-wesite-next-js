'use client';

import { useEffect, useState } from 'react';
import BlogPost from './BlogPost';

type PostData = {
  title: { rendered: string };
  content: { rendered: string };
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
          `https://lightblue-goat-212889.hostingersite.com/wp-json/wp/v2/posts?slug=${slug}`
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

  if (loading) return <p>Loading...</p>;
  if (!post) return <p>Post not found.</p>;

  return (
    <BlogPost
      title={post.title.rendered}
      content={post.content.rendered}
    />
  );
}
