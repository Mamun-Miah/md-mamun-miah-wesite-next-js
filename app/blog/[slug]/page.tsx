// app/blog/[slug]/page.tsx
import Image from 'next/image';
import { notFound } from 'next/navigation';

export const dynamic = 'force-dynamic'; // or 'auto' if you prefer
export const runtime = 'edge';

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



export default async function BlogPost({ params }:{
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  try {
    const res = await fetch(
      `https://lightblue-goat-212889.hostingersite.com/wp-json/wp/v2/posts?slug=${slug}&_embed=1`,
      {
        // ISR: Revalidate after 60 seconds
        next: { revalidate: 60 },
        // Cache-friendly deployment behavior
        cache: 'force-cache',
      }
    );

    if (!res.ok) throw new Error('Post fetch failed');

    const posts: WPPost[] = await res.json();

    if (!posts || posts.length === 0) {
      return notFound();
    }

    const post = posts[0];

    const imageUrl =
      post._embedded?.['wp:featuredmedia']?.[0]?.source_url ?? null;

    const publishedDate = new Date(post.date).toLocaleDateString('en-GB', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

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
        An error occurred while loading the blog post. Please try again later.
      </div>
    );
  }
}
