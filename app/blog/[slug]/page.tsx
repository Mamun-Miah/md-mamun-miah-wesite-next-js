import BlogClient from '../../components/BlogClient';

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function BlogPage({ params }: Props) {
  const { slug } = await params; // Await the params to resolve the Promise
  return <BlogClient slug={slug} />;
}