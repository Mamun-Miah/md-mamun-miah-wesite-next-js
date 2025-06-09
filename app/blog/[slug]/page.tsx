import Image from 'next/image';
export const dynamic = 'force-dynamic';

    export const runtime = 'edge';

export default async function BlogPost({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SITE_URL}/api/post/${slug}`
    );

    if (!res.ok) {
      throw new Error(`Failed to fetch post: ${res.status}`);
    }

    const post = await res.json();

    if (!post || post.length === 0) {
      return <div>Post not found</div>;
    }

    const imageUrl =
      post[0]._embedded?.['wp:featuredmedia']?.[0]?.source_url || null;

    const publishedDate = new Date(post[0].date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

    return (
      <>
        <div className='pt-24 flex justify-center items-center lg:h-[60vh] h-[60vh] pb-24 mt-[-90px] lg:mt-[-100px] bg-[#4B4B4B]'>
          <h1 className='text-center text-5xl text-gray-200 font-bold pt-12 mx-3'>
            {post[0].title.rendered}
          </h1>
        </div>

        <div className='py-16 mx-8'>
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={post[0].title.rendered}
              width={800}
              height={450}
              className='w-full h-auto object-cover'
              priority
            />
          ) : (
            <p>No featured image available.</p>
          )}

          <h2 className='text-3xl text-black font-bold py-10'>
            {post[0].title.rendered}
          </h2>
          <p className='mt-4 text-gray-900 font-bold text-lg mb-4'>
            Date: {publishedDate}
          </p>
          <div
            className='prose text-gray-900'
            dangerouslySetInnerHTML={{ __html: post[0].content.rendered }}
          />
        </div>
      </>
    );
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : 'Unknown error';
    const errorStack = error instanceof Error ? error.stack : undefined;

    console.error('Error loading blog post:', {
      message: errorMessage,
      stack: errorStack,
      slug,
    });

    return (
      <div className='text-red-600 p-6'>
        An error occurred while loading the blog post: {errorMessage}
        <p>Please contact support with this error code: {slug}</p>
      </div>
    );
  }
}
