import Image from "next/image";
import { notFound } from 'next/navigation';

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
  alt_text?: string;
}

async function fetchPostBySlug(slug: string): Promise<Post | null> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout
    
    const res = await fetch(
      `https://lightblue-goat-212889.hostingersite.com/wp-json/wp/v2/posts?slug=${encodeURIComponent(slug)}`,
      { 
        signal: controller.signal,
        headers: {
          'Accept': 'application/json',
          'User-Agent': 'Mozilla/5.0 (compatible; Next.js Edge Runtime)'
        },
        cache: 'force-cache'
      }
    );
    
    clearTimeout(timeoutId);
    
    if (!res.ok) {
      console.error('Failed to fetch post:', res.status, res.statusText);
      return null;
    }
    
    const posts = await res.json();
    if (!Array.isArray(posts) || posts.length === 0) return null;
    return posts[0];
  } catch (error) {
    console.error('Error fetching post:', error);
    return null;
  }
}

async function fetchMedia(mediaId: number): Promise<Media | null> {
  if (!mediaId || mediaId <= 0) return null;
  
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 8000); // 8 second timeout
    
    const res = await fetch(
      `https://lightblue-goat-212889.hostingersite.com/wp-json/wp/v2/media/${mediaId}`,
      { 
        signal: controller.signal,
        headers: {
          'Accept': 'application/json',
          'User-Agent': 'Mozilla/5.0 (compatible; Next.js Edge Runtime)'
        },
        cache: 'force-cache'
      }
    );
    
    clearTimeout(timeoutId);
    
    if (!res.ok) {
      console.error('Failed to fetch media:', res.status, res.statusText);
      return null;
    }
    
    const media = await res.json();
    return media;
  } catch (error) {
    console.error('Error fetching media:', error);
    return null;
  }
}

function stripHtmlTags(html: string): string {
  try {
    return html.replace(/<[^>]*>/g, '').trim();
  } catch (error) {
    console.error('Error stripping HTML tags:', error);
    return '';
  }
}

function formatDate(dateString: string): string {
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      return 'Invalid Date';
    }
    
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date);
  } catch (error) {
    console.error('Error formatting date:', error);
    return 'Invalid Date';
  }
}

// Fix for Next.js 15: params is now a Promise
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  try {
    const resolvedParams = await params;
    if (!resolvedParams?.slug) {
      return {
        title: "Post Not Found",
        description: "The requested blog post could not be found."
      };
    }
    
    const post = await fetchPostBySlug(resolvedParams.slug);
    if (!post || !post.title?.rendered) {
      return {
        title: "Post Not Found",
        description: "The requested blog post could not be found."
      };
    }
    
    const title = stripHtmlTags(post.title.rendered);
    const description = post.content?.rendered 
      ? stripHtmlTags(post.content.rendered).slice(0, 160)
      : "Blog post content";
    
    return {
      title: title || "Blog Post",
      description: description || "Read this blog post"
    };
  } catch (error) {
    console.error('Error in generateMetadata:', error);
    return {
      title: "Blog Post",
      description: "Blog post content"
    };
  }
}

// Fix for Next.js 15: params is now a Promise
export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  try {
    const resolvedParams = await params;
    if (!resolvedParams?.slug) {
      notFound();
    }
    
    const post = await fetchPostBySlug(resolvedParams.slug);
    
    if (!post || !post.title?.rendered) {
      notFound();
    }

    // Fetch media in parallel but don't block if it fails
    const media = post.featured_media ? await fetchMedia(post.featured_media) : null;
    const imageUrl = media?.source_url || null;
    const imageAlt = media?.alt_text || stripHtmlTags(post.title.rendered) || 'Blog post image';
    
    const publishedDate = formatDate(post.date);
    const postTitle = post.title.rendered || 'Untitled Post';
    const postContent = post.content?.rendered || '<p>No content available.</p>';

    return (
      <>
        <div className="pt-24 flex justify-center items-center lg:h-[60vh] h-[60vh] pb-24 mt-[-90px] lg:mt-[-100px] bg-[#4B4B4B]">
          <h1 
            className="text-center text-5xl text-gray-200 font-bold pt-12 mx-3" 
            dangerouslySetInnerHTML={{ __html: postTitle }} 
          />
        </div>

        <div className="py-16 mx-8">
          {imageUrl ? (
            <div className="relative w-full h-auto mb-8">
              <Image
                src={imageUrl}
                alt={imageAlt}
                width={800}
                height={450}
                className="w-full h-auto object-cover rounded-xl shadow-lg"
                priority
                unoptimized // Add this for Edge runtime compatibility
              />
            </div>
          ) : (
            <p className="text-gray-600 italic mb-8">No featured image available.</p>
          )}

          <h2 
            className="text-3xl text-black font-bold py-10" 
            dangerouslySetInnerHTML={{ __html: postTitle }} 
          />
          <p className="mt-4 text-gray-900 font-bold text-lg mb-4">
            Date: {publishedDate}
          </p>
          <div
            className="prose text-gray-900 max-w-none"
            dangerouslySetInnerHTML={{ __html: postContent }}
          />
        </div>
      </>
    );
  } catch (error) {
    console.error('Error in BlogPostPage:', error);
    // Return a fallback UI instead of throwing
    return (
      <div className="p-12 text-center">
        <h1 className="text-2xl font-bold text-red-600 mb-4">Something went wrong</h1>
        <p className="text-gray-600">
          We encountered an error while loading this blog post. Please try again later.
        </p>
      </div>
    );
  }
}