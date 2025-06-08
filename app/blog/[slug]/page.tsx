import Image from 'next/image';
type Params = {
  params: { slug: string };
};

export default async function BlogPost({ params }: Params) {
    const { slug } = await params;
  const res = await fetch(`https://lightblue-goat-212889.hostingersite.com/wp-json/wp/v2/posts?slug=${slug}&_embed`);
  const post = await res.json();

  if (!post || post.length === 0) return <div>Post not found</div>;
 const imageUrl =
    post[0]._embedded?.['wp:featuredmedia']?.[0]?.source_url || null;

  return (
    <>
    <div className='pt-24 flex justify-center items-center lg:h-[60vh] h-[60vh] pb-24 mt-[-90px] lg:mt-[-100px] bg-[#4B4B4B]'>
        <h1 className='text-center text-5xl text-gray-200 font-bold pt-12 mx-3'>{post[0].title.rendered}</h1>
    </div>
        <div className="py-16 mx-8">
         {imageUrl ? (
          <Image
            src={imageUrl}
            alt={post[0].title.rendered}
            width={800}
            height={450}
            className="w-full h-auto object-cover"
            priority
          />
        ) : (
          <p>No featured image available.</p>
        )}

        <h2 className=' text-3xl text-black font-bold py-12'>{post[0].title.rendered}</h2>
      <div
        className="prose"
        dangerouslySetInnerHTML={{ __html: post[0].content.rendered }}
      />
    </div>
    </>
    
  );
}
