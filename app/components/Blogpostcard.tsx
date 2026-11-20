import Image from 'next/image';
import Link from 'next/link';
import sanitizeHtml from 'sanitize-html';
import LoadingIndicator from '../ui/loading-indicator';


// Inside layout:

type BlogpostCardProps = {
  title: string;
  excerpt: string;  
  image?: string;
  slug: string;
  date: string;
};

const stripHtml = (html: string) => {
  const clean = sanitizeHtml(html, {
    allowedTags: [],
    allowedAttributes: {},
  });
  return clean;
};

const BlogpostCard = ({ title, excerpt, image, slug, date }: BlogpostCardProps) => {
  const formattedDate = new Date(date).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="card min-w-0 bg-base-100 w-full max-w-sm mx-auto shadow-sm">
      <figure>
        {image ? (
          <Image
            src={image}
            alt={title}
            width={384}
            height={200}
            className="w-full h-48 object-cover"
            unoptimized
          />
        ) : (
          <div className="w-full h-48 bg-gray-300" />
        )}
      </figure>

      <div className="card-body min-w-0">
        <h2 className="card-title items-start">
          <Link href={`/blog/${slug}`} className="min-w-0 [overflow-wrap:anywhere]">{title} <LoadingIndicator />  </Link>
          <div className="badge badge-secondary shrink-0">NEW</div>
        </h2>

        <div className="card-actions justify-start">
          <div className="badge badge-outline">{formattedDate}</div>
        </div>

        <Link href={`/blog/${slug}`}><LoadingIndicator />
          <p>{stripHtml(excerpt || 'No summary available.')} </p>
        </Link>

        
      </div>
    </div>
  );
};

export default BlogpostCard;
