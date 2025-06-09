import Image from 'next/image';
// import Link from 'next/link';
import sanitizeHtml from 'sanitize-html';

type BlogpostCardProps = {
  title: string;
  excerpt: string;
  image?: string;
  slug: string;
};

// Helper function to strip HTML tags and return plain text
const stripHtml = (html: string) => {
  const clean = sanitizeHtml(html, {
    allowedTags: [],
    allowedAttributes: {},
  });
  return clean;
};

const BlogpostCard = ({ title, excerpt, image, slug }: BlogpostCardProps) => {
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
          />
        ) : (
          <div className="w-full h-48 bg-gray-300" />
        )}
      </figure>

      <div className="card-body">
        <h2 className="card-title">
          <a href={`/blog/${slug}`}>{title}</a>
          <div className="badge badge-secondary">NEW</div>
        </h2>
        <a href={`/blog/${slug}`}>
          <p>{stripHtml(excerpt || 'No summary available.')}</p>
        </a>
        <div className="card-actions justify-end">
          <div className="badge badge-outline">Blog</div>
        </div>
      </div>
    </div>
  );
};

export default BlogpostCard;
