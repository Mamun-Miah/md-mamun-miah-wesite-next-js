'use client';

import { useEffect, useState } from 'react';
import BlogPost from './BlogPost';

type PostData = {
  title: string;
  content: string;
  date: string;
  featured_image?: string;
  slug: string;
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
          'https://raw.githubusercontent.com/Mamun-Miah/WordPress-API-Automation-to-Github/refs/heads/main/posts.json'
        );

        if (!res.ok) {
          throw new Error('Failed to fetch posts');
        }

        const data: PostData[] = await res.json();

        const matchedPost = data.find((p) => p.slug === slug);

        if (matchedPost) {
          setPost(matchedPost);
        } else {
          setPost(null);
        }
      } catch (error) {
        console.error('Error fetching post:', error);
        setPost(null);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [slug]);

  if (loading) {
    return (
      <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-white bg-opacity-70 z-50">
        <span className="loading loading-ring w-24 text-warning"></span>
      </div>
    );
  }

  if (!post) return <p>Post not found.</p>;

  return (
    <BlogPost
      title={post.title}
      content={post.content}
      image={post.featured_image ?? ''}
      date={post.date}
    />
  );
}
