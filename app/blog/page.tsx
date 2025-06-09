import Blogpostcard from '../components/Blogpostcard';

type WPPost = {
  id: number;
  slug: string;
  title: { rendered: string };
  excerpt: { rendered: string };
  date: string;
  _embedded?: {
    'wp:featuredmedia'?: [
      {
        source_url: string;
      }
    ];
  };
};
export const metadata = {
  title: 'Blog - Mamun Miah',
};
export default async function BlogPage() {
  const res = await fetch(
    'https://lightblue-goat-212889.hostingersite.com/wp-json/wp/v2/posts?_embed=1&per_page=10'
  );
  const posts: WPPost[] = await res.json();

  return (
    <>
      <div className='pt-24 flex justify-center items-center lg:h-[60vh] h-[60vh] pb-24 mt-[-90px] lg:mt-[-100px] bg-[#4B4B4B]'>
        <h1 className='text-center text-7xl text-gray-200 font-bold pt-12'>Blog Post</h1>
      </div>

      <div className="flex flex-wrap gap-6 justify-center p-6">
        {posts.map((post) => (
          <Blogpostcard
            key={post.id}
            slug={post.slug}
            title={post.title.rendered}
            excerpt={post.excerpt.rendered}
            image={post._embedded?.['wp:featuredmedia']?.[0]?.source_url}
            date={post.date}
          />
        ))}
      </div>
    </>
  );
}
