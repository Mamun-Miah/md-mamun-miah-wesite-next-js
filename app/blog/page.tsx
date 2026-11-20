import Link from 'next/link';
import Blogpostcard from '../components/Blogpostcard';
import { notFound } from 'next/navigation';
import LoadingIndicator from '../ui/loading-indicator';
import type { Metadata } from "next";
export const runtime = 'edge';

type WPPost = {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  featured_image?: string;
};

export const metadata: Metadata = {
  title: 'Blog - Mamun Miah',
  robots: {
index: false,
follow: true,
},
};

const POSTS_PER_PAGE = 12;

type Props = {
  searchParams?: Promise<{
    page?: string;
    search?: string;
  }>;
};

export default async function BlogPage({ searchParams }: Props) {
  const params = await searchParams;
  const currentPage = parseInt(params?.page || '1', 10);
  const searchQuery = params?.search?.toLowerCase() || '';

  

  const res = await fetch(
    'https://raw.githubusercontent.com/Mamun-Miah/WordPress-API-Automation-to-Github/refs/heads/main/posts.json'
  );//github api url
  if (!res.ok) {
    throw new Error('Failed to fetch posts');
  }

  const allPosts: WPPost[] = await res.json();
//search query
  // Filter posts based on search query
  let filteredPosts = allPosts;

  if (searchQuery) {
    filteredPosts = allPosts.filter(post =>
      post.title.toLowerCase().includes(searchQuery)
    );
  }

  const totalPosts = filteredPosts.length;
  const totalPages = Math.ceil(totalPosts / POSTS_PER_PAGE);

  if (currentPage < 1 || currentPage > totalPages) {
    notFound();
  }

  const start = (currentPage - 1) * POSTS_PER_PAGE;
  const paginatedPosts = filteredPosts.slice(start, start + POSTS_PER_PAGE);

  return (
    <>
      <div className="flex min-h-[50svh] lg:min-h-[60svh] justify-center items-center px-5 pt-36 pb-12 sm:pt-40 sm:pb-16 lg:pt-44 mt-[-90px] lg:mt-[-100px] bg-[#4B4B4B]">
        <h1 className="max-w-4xl text-center text-4xl sm:text-5xl lg:text-7xl leading-tight break-words text-gray-200 font-bold">Blog Post</h1>
      </div>
    <form method="GET" className="flex justify-center mt-5 p-4">
  <label className="input min-w-0 flex items-center gap-2 border px-4 py-2 rounded w-full max-w-md">
    <svg className="h-[1em] shrink-0 opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
      <g
        strokeLinejoin="round"
        strokeLinecap="round"
        strokeWidth="2.5"
        fill="none"
        stroke="currentColor"
      >
        <circle cx="11" cy="11" r="8"></circle>
        <path d="m21 21-4.3-4.3"></path>
      </g>
    </svg>
    <input
      type="search"
      name="search"
      className="min-w-0 w-full grow text-base bg-transparent outline-none"
      placeholder="Search"
      defaultValue={searchQuery}
    />
  </label>
</form>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 px-5 py-6 sm:px-6 lg:px-8">
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

      <div className="max-w-7xl mx-auto flex flex-wrap justify-center gap-2 px-5 pb-8 mt-8">
        {Array.from({ length: totalPages }).map((_, index) => {
          const page = index + 1;
          return (
            <Link
              key={page}
              href={`?page=${page}${searchQuery ? `&search=${encodeURIComponent(searchQuery)}` : ''}`}
              className={`px-4 py-2 border rounded ${
                page === currentPage ? 'bg-black text-white' : 'bg-white text-black'
              }`}
            >
              {page}<LoadingIndicator />
            </Link>
          );
        })}
      </div>
    </>
  );
}
