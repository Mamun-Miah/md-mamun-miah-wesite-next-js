// app/blog/[slug]/page.tsx - Hybrid Server + Client
import { Suspense } from 'react';
import BlogClient from '../../components/BlogClient';
export const runtime = 'edge';
type Props = {
  params: Promise<{
    slug: string;
  }>;
};

// Server component that tries to fetch data
async function ServerBlogPost({ slug }: { slug: string }) {
  try {
    const res = await fetch(
      `https://lightblue-goat-212889.hostingersite.com/wp-json/wp/v2/posts?slug=${slug}&_embed`,
      {
        next: { revalidate: 300 }, // Cache for 5 minutes
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    if (!res.ok) throw new Error('Failed to fetch');
    
    const data = await res.json();
    if (data.length === 0) throw new Error('Post not found');

    const post = data[0];
    const imageUrl = post._embedded?.['wp:featuredmedia']?.[0]?.source_url ?? '';

    // Import and use BlogPost directly for server rendering
    const { default: BlogPost } = await import('../../components/BlogPost');
    
    return (
      <BlogPost
        title={post.title.rendered}
        content={post.content.rendered}
        image={imageUrl}
        date={post.date}
      />
    );
  } catch (error) {
    // Fallback to client component if server fetch fails
    console.log('Server fetch failed, using client component:', error);
    return <BlogClient slug={slug} />;
  }
}

function LoadingFallback() {
  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="text-center">
        <div className="loading loading-ring w-12 h-12 text-blue-500 mx-auto"></div>
        <p className="mt-4 text-gray-600">Loading post...</p>
      </div>
    </div>
  );
}

export default async function BlogPage({ params }: Props) {
  const { slug } = await params;
  
  return (
    <Suspense fallback={<LoadingFallback />}>
      <ServerBlogPost slug={slug} />
    </Suspense>
  );
}

// Enable dynamic rendering for non-cached posts
export const dynamic = 'auto';
export const dynamicParams = true;