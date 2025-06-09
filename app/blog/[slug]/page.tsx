import Image from 'next/image';
import { getPostBySlug } from '@/lib/wordpress';
import { notFound } from 'next/navigation';

export const dynamic = 'force-dynamic';
export const runtime = 'edge';

interface BlogPostProps {
  params: Promise< { slug: string }>;
}

export default async function BlogPost({ params }: BlogPostProps) {
  const { slug } = await params;

  const post = await getPostBySlug(slug);

  if (!post) return notFound();

  const imageUrl = post._embedded?.['wp:featuredmedia']?.[0]?.source_url || null;

  const publishedDate = new Date(post.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <>
      <div className="pt-24 flex justify-center items-center lg:h-[60vh] h-[60vh] pb-24 mt-[-90px] lg:mt-[-100px] bg-[#4B4B4B]">
        <h1 className="text-center text-5xl text-gray-200 font-bold pt-12 mx-3">
          {post.title.rendered}
        </h1>
      </div>

      <div className="py-16 mx-8">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={post.title.rendered}
            width={800}
            height={450}
            className="w-full h-auto object-cover"
            priority
          />
        ) : (
          <p>No featured image available.</p>
        )}

        <h2 className="text-3xl text-black font-bold py-10">
          {post.title.rendered}
        </h2>

        <p className="mt-4 text-gray-900 font-bold text-lg mb-4">
          Date: {publishedDate}
        </p>

        <div
          className="prose text-gray-900"
          dangerouslySetInnerHTML={{ __html: post.content.rendered }}
        />
      </div>
    </>
  );
}
