import Image from 'next/image';
import Link from 'next/link';
import sanitizeHtml from 'sanitize-html';
import LoadingIndicator from '../ui/loading-indicator';

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
    <div className="card bg-base-100 w-96 shadow-sm">
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

      <div className="card-body">
        <h2 className="card-title">
          <Link href={`/blog/${slug}`}>{title} <LoadingIndicator />  </Link>
          <div className="badge badge-secondary">NEW</div>
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
