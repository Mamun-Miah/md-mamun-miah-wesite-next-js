import Image from 'next/image';
import Link from 'next/link';
import LoadingIndicator from '../ui/loading-indicator';
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
    <section className='flex min-h-[50svh] lg:min-h-[60svh] flex-col justify-center items-center gap-6 px-5 pt-36 pb-12 sm:pt-40 sm:pb-16 lg:pt-44 mt-[-90px] lg:mt-[-100px] bg-amber-950'>
    <h1 className="max-w-4xl text-3xl sm:text-4xl lg:text-5xl leading-tight break-words text-center font-bold text-gray-200">{title}</h1>
    <Link href="/blog" className='btn btn-md text-gray-900 btn-warning max-w-full whitespace-normal h-auto min-h-12 px-5 py-3 text-center'>Back to Blog Page<LoadingIndicator /></Link>

    </section>
        <article className="w-full max-w-[75ch] mx-auto px-5 sm:px-8 py-8 sm:py-10 bg-gray-50">
        <h2 className="text-2xl sm:text-3xl leading-tight break-words text-gray-900 font-bold mb-4">{title}</h2>

        {image && (
            <div className="relative w-full aspect-video mb-6">
            <Image
                src={image}
                alt={title}
                fill
                className="object-cover rounded-lg shadow"
                unoptimized
            />
            </div>
        )}
        <div className="card-actions my-4 justify-start">
          <div className="badge text-gray-800 badge-outline">{formattedDate}</div>
        </div>
        <div className='blog-content min-w-0 text-gray-800' dangerouslySetInnerHTML={{ __html: content }} />
        </article>
    </>
    
  );
}
