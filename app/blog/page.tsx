import Blogpostcard from '../components/Blogpostcard';

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

export default async function BlogPage() {
  const res = await fetch(
    'https://linen-squirrel-954851.hostingersite.com/posts.json'
  );

  if (!res.ok) {
    throw new Error('Failed to fetch posts');
  }

  const posts: WPPost[] = await res.json();

  return (
    <>
      <div className="pt-24 flex justify-center items-center lg:h-[60vh] h-[60vh] pb-24 mt-[-90px] lg:mt-[-100px] bg-[#4B4B4B]">
        <h1 className="text-center text-7xl text-gray-200 font-bold pt-12">Blog Post</h1>
      </div>

      <div className="flex flex-wrap gap-6 justify-center p-6">
        {posts.map((post) => (
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
    </>
  );
}
