import Image from 'next/image';
import Link from 'next/link';
type Props = {
  title: string;
  content: string;
  image?: string;
  date: string;
};


export default function BlogPost({ title, content, image, date }: Props) {
  const formattedDate = new Date(date).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  return (
    <>
    <section className=' flex flex-col justify-center items-center pt-28 lg:h-[60vh] h-[60vh] pb-24 mt-[-90px] lg:mt-[-100px] bg-amber-950'>
    <h1 className="lg:text-5xl text-3xl mx-3 pb-3 text-center my-3 font-bold text-gray-200 mb-4">{title}</h1>
    <Link href="/blog"><button className='btn btn-md text-gray-900 btn-warning'>Back to Blog Page</button></Link>

    </section>
        <article className="prose px-3 lg:prose-xl max-w-4xl mx-auto py-10">
        <h2 className="text-3xl font-bold mb-4">{title}</h2>

        {image && (
            <div className="relative w-full h-96 mb-6">
            <Image
                src={image}
                alt={title}
                fill
                className="object-cover rounded-lg shadow"
                priority
                unoptimized
            />
            </div>
        )}
        <div className="card-actions my-4 justify-start">
          <div className="badge badge-outline">{formattedDate}</div>
        </div>
        <div dangerouslySetInnerHTML={{ __html: content }} />
        </article>
    </>
    
  );
}
