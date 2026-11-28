import { notFound } from 'next/navigation';
import sanitizeHtml from 'sanitize-html';
import { getPosts, postShareImage } from '@/lib/blog';
import { pageMetadata, pages, SITE_NAME } from '@/lib/seo';
import BlogPost from '../../components/BlogPost';

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

async function getPost(slug: string) {
  const post = (await getPosts()).find((post) => post.slug === slug);
  if (!post) notFound();
  return post;
}

function plainText(html: string) {
  return sanitizeHtml(html, { allowedTags: [], allowedAttributes: {} })
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&')
    .normalize('NFKC')
    .replace(/\s+/g, ' ')
    .trim();
}

export async function generateStaticParams() {
  return (await getPosts()).map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props) {
  const post = await getPost((await params).slug);
  const excerpt = plainText(post.excerpt ?? '') || pages.blog.description;

  return pageMetadata(
    {
      path: `/blog/${encodeURIComponent(post.slug)}`,
      title: `${plainText(post.title).replace(/:$/, '')} | ${SITE_NAME}`,
      description: excerpt.length > 155 ? `${excerpt.slice(0, 152).replace(/\s+\S*$/, '')}...` : excerpt,
      index: false,
      image: postShareImage(post.slug),
    },
    { publishedTime: Number.isFinite(Date.parse(post.date)) ? post.date : undefined },
  );
}

export default async function BlogPage({ params }: Props) {
  const post = await getPost((await params).slug);

  return (
    <BlogPost
      title={post.title}
      content={post.content}
      image={postShareImage(post.slug).url}
      date={post.date}
    />
  );
}
