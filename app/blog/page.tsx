import Blogpostcard from '../components/Blogpostcard';
import { notFound } from 'next/navigation';
export const runtime = 'edge';
type WPPost = {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  featured_image?: string;
};

export const metadata = {
  title: 'Blog - Mamun Miah',
};

const POSTS_PER_PAGE = 12;

type Props = {
  searchParams?: Promise<{
    page?: string;
  }>;
};

export default async function BlogPage({ searchParams }: Props) {
  // Await the searchParams promise
  const params = await searchParams;
  const currentPage = parseInt(params?.page || '1', 10);
  
  const res = await fetch('https://raw.githubusercontent.com/Mamun-Miah/WordPress-API-Automation-to-Github/refs/heads/main/posts.json');

  if (!res.ok) {
    throw new Error('Failed to fetch posts');
  }

  const allPosts: WPPost[] = await res.json();
  const totalPosts = allPosts.length;
  const totalPages = Math.ceil(totalPosts / POSTS_PER_PAGE);

  if (currentPage < 1 || currentPage > totalPages) {
    notFound(); // 404 if page out of range
  }

  const start = (currentPage - 1) * POSTS_PER_PAGE;
  const paginatedPosts = allPosts.slice(start, start + POSTS_PER_PAGE);

  return (
    <>
      <div className="pt-24 flex justify-center items-center lg:h-[60vh] h-[60vh] pb-24 mt-[-90px] lg:mt-[-100px] bg-[#4B4B4B]">
        <h1 className="text-center text-7xl text-gray-200 font-bold pt-12">Blog Post</h1>
      </div>

      <div className="flex flex-wrap gap-6 justify-center p-6">
        {paginatedPosts.map((post) => (
          <Blogpostcard
            key={post.id}
            slug={post.slug}
            title={post.title}
            excerpt={post.excerpt}
            image={post.featured_image}
            date={post.date}
          />
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center gap-2 pb-8 mt-8">
        {Array.from({ length: totalPages }).map((_, index) => {
          const page = index + 1;
          return (
            <a
              key={page}
              href={`?page=${page}`}
              className={`px-4 py-2 border rounded ${
                page === currentPage ? 'bg-black text-white' : 'bg-white text-black'
              }`}
            >
              {page}
            </a>
          );
        })}
      </div>
    </>
  );
}
