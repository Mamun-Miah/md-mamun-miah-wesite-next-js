import Image from "next/image";

// Add runtime export for Cloudflare Edge
export const runtime = 'edge';

interface Post {
  id: number;
  title: { rendered: string };
  content: { rendered: string };
  date: string;
  featured_media: number;
}

interface Media {
  source_url: string;
}

async function fetchPostBySlug(slug: string): Promise<Post | null> {
  try {
    const res = await fetch(
      `https://lightblue-goat-212889.hostingersite.com/wp-json/wp/v2/posts?slug=${slug}`,
      { 
        next: { revalidate: 60 }, // ISR: revalidate every 60 seconds
        headers: {
          'User-Agent': 'Mozilla/5.0 (compatible; Next.js Edge Runtime)'
        }
      }
    );
    
    if (!res.ok) {
      console.error('Failed to fetch post:', res.status);
      return null;
    }
    
    const posts = await res.json();
    if (!posts || posts.length === 0) return null;
    return posts[0];
  } catch (error) {
    console.error('Error fetching post:', error);
    return null;
  }
}

async function fetchMedia(mediaId: number): Promise<Media | null> {
  if (!mediaId) return null;
  
  try {
    const res = await fetch(
      `https://lightblue-goat-212889.hostingersite.com/wp-json/wp/v2/media/${mediaId}`,
      { 
        next: { revalidate: 60 },
        headers: {
          'User-Agent': 'Mozilla/5.0 (compatible; Next.js Edge Runtime)'
        }
      }
    );
    
    if (!res.ok) return null;
    const media = await res.json();
    return media;
  } catch (error) {
    console.error('Error fetching media:', error);
    return null;
  }
}

// Fix for Next.js 15: params is now a Promise
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params; // Await the params Promise
  const post = await fetchPostBySlug(slug);
  if (!post) {
    return {
      title: "Post Not Found",
    };
  }
  return {
    title: post.title.rendered,
    description: post.content.rendered.replace(/<[^>]+>/g, "").slice(0, 160), // strip HTML tags for description
  };
}

// Fix for Next.js 15: params is now a Promise
export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params; // Await the params Promise
  const post = await fetchPostBySlug(slug);
  
  if (!post) {
    // Next.js 13+ way to throw 404 inside server components
    // You can also create a custom not-found.tsx page inside /blog/[slug]/ folder
    return (
      <div className="p-12 text-center text-2xl font-bold">
        Post not found
      </div>
    );
  }

  const media = await fetchMedia(post.featured_media);
  const imageUrl = media?.source_url || null;
  
  // Use Intl.DateTimeFormat for better Edge runtime compatibility
  const publishedDate = new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(new Date(post.date));

  return (
    <>
      <div className="pt-24 flex justify-center items-center lg:h-[60vh] h-[60vh] pb-24 mt-[-90px] lg:mt-[-100px] bg-[#4B4B4B]">
        <h1 className="text-center text-5xl text-gray-200 font-bold pt-12 mx-3" dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
      </div>

      <div className="py-16 mx-8">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={post.title.rendered.replace(/<[^>]+>/g, "")}
            width={800}
            height={450}
            className="w-full h-auto object-cover rounded-xl shadow-lg"
            priority
          />
        ) : (
          <p className="text-gray-600 italic">No featured image available.</p>
        )}

        <h2 className="text-3xl text-black font-bold py-10" dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
        <p className="mt-4 text-gray-900 font-bold text-lg mb-4">Date: {publishedDate}</p>
        <div
          className="prose text-gray-900 max-w-none"
          dangerouslySetInnerHTML={{ __html: post.content.rendered }}
        />
      </div>
    </>
  );
}