// app/blog/[slug]/page.tsx - Edge Runtime Compatible
import Image from 'next/image';
import { notFound } from 'next/navigation';

export const runtime = 'edge';
export const dynamic = 'force-dynamic';

type WPPost = {
  id: number;
  slug: string;
  title: { rendered: string };
  content: { rendered: string };
  date: string;
  _embedded?: {
    'wp:featuredmedia'?: Array<{
      source_url: string;
    }>;
  };
};

export default async function BlogPost({ params }: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  try {
    // Use absolute URL and proper headers for Edge runtime
    const response = await fetch(
      `https://lightblue-goat-212889.hostingersite.com/wp-json/wp/v2/posts?slug=${encodeURIComponent(slug)}&_embed=1`,
      {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'User-Agent': 'Mozilla/5.0 (compatible; NextJS-Blog/1.0)',
          // Add CORS headers that might help
          'Access-Control-Allow-Origin': '*',
          'Cache-Control': 'no-cache, no-store, must-revalidate',
        },
        // Edge runtime compatible cache settings
        cache: 'no-store',
      }
    );

    // More detailed error handling
    if (!response.ok) {
      console.error(`Fetch failed: ${response.status} ${response.statusText}`);
      console.error('Response headers:', Object.fromEntries(response.headers.entries()));
      
      if (response.status === 403) {
        throw new Error('Access forbidden - check WordPress API permissions');
      } else if (response.status === 404) {
        return notFound();
      } else {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
    }

    const posts: WPPost[] = await response.json();

    if (!posts || posts.length === 0) {
      return notFound();
    }

    const post = posts[0];
    const imageUrl = post._embedded?.['wp:featuredmedia']?.[0]?.source_url ?? null;

    // Safe date formatting for Edge runtime
    const publishedDate = new Intl.DateTimeFormat('en-GB', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(new Date(post.date));

    return (
      <>
        <header className="pt-24 flex justify-center items-center lg:h-[60vh] h-[60vh] pb-24 mt-[-90px] lg:mt-[-100px] bg-[#4B4B4B]">
          <h1 className="text-center text-5xl text-gray-200 font-bold pt-12 mx-3">
            {post.title.rendered}
          </h1>
        </header>

        <main className="py-16 mx-8">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={post.title.rendered}
              width={800}
              height={450}
              className="w-full h-auto object-cover rounded-xl shadow-lg"
              priority
            />
          ) : (
            <p className="text-gray-600 italic">No featured image available.</p>
          )}

          <h2 className="text-3xl text-black font-bold py-10">
            {post.title.rendered}
          </h2>

          <p className="mt-4 text-gray-900 font-bold text-lg mb-4">
            Date: {publishedDate}
          </p>

          <article
            className="prose text-gray-900 max-w-none"
            dangerouslySetInnerHTML={{ __html: post.content.rendered }}
          />
        </main>
      </>
    );
  } catch (error) {
    console.error('Blog post fetch error:', error);

    return (
      <div className="text-red-600 p-6">
        <h2 className="text-xl font-bold mb-2">Unable to Load Blog Post</h2>
        <p>The blog post could not be loaded at this time.</p>
        <details className="mt-4 text-sm">
          <summary className="cursor-pointer font-medium">Error Details</summary>
          <div className="mt-2 p-3 bg-gray-100 rounded text-gray-800">
            <p><strong>Error:</strong> {error instanceof Error ? error.message : 'Unknown error'}</p>
            <p><strong>Slug:</strong> {slug}</p>
            <p><strong>Timestamp:</strong> {new Date().toISOString()}</p>
          </div>
        </details>
      </div>
    );
  }
}