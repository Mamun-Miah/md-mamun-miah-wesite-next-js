import Image from 'next/image';
import Link from 'next/link';
import sanitizeHtml from 'sanitize-html';

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

  // Replace WordPress image host with your domain to match middleware
  const proxiedImage = image?.replace(
    'https://linen-squirrel-954851.hostingersite.com',
    'https://mdmamunmiah.com'
  );

  return (
    <div className="card bg-base-100 w-96 shadow-sm">
      <figure>
        {proxiedImage ? (
          <Image
            src={proxiedImage}
            alt={title}
            width={384}
            height={200}
            className="w-full h-48 object-cover"
            unoptimized // because it’s remote and proxied
          />
        ) : (
          <div className="w-full h-48 bg-gray-300" />
        )}
      </figure>

      <div className="card-body">
        <h2 className="card-title">
          <Link href={`/blog/${slug}`}>{title}</Link>
          <div className="badge badge-secondary">NEW</div>
        </h2>

        <div className="card-actions justify-start">
          <div className="badge badge-outline">{formattedDate}</div>
        </div>

        <Link href={`/blog/${slug}`}>
          <p>{stripHtml(excerpt || 'No summary available.')}</p>
        </Link>
      </div>
    </div>
  );
};

export default BlogpostCard;
