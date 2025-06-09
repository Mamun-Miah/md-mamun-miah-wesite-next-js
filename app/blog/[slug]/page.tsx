// app/blog/[slug]/page.tsx - Edge Runtime Compatible
// import Image from 'next/image';
import { notFound } from 'next/navigation';

export const runtime = 'edge';
export const dynamic = 'force-dynamic';

// type WPPost = {
//   id: number;
//   slug: string;
//   title: { rendered: string };
//   content: { rendered: string };
//   date: string;
//   _embedded?: {
//     'wp:featuredmedia'?: Array<{
//       source_url: string;
//     }>;
//   };
// };

// If you need authenticated access, create application password in WordPress
// Go to: WordPress Admin > Users > Your Profile > Application Passwords

// Then use this approach:
export default async function BlogPost({ params }: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  try {
    // Option 1: Try without auth first
    let response = await fetch(
      `https://lightblue-goat-212889.hostingersite.com/wp-json/wp/v2/posts?slug=${encodeURIComponent(slug)}&_embed=1`,
      {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        },
        cache: 'no-store',
      }
    );

    // Option 2: If 403, try with basic auth (if you have app password)
    if (response.status === 403) {
      // You'll need to set these as environment variables
      const username = process.env.WP_USERNAME; // Your WordPress username
      const appPassword = process.env.WP_APP_PASSWORD; // Application password from WordPress
      
      if (username && appPassword) {
        const credentials = btoa(`${username}:${appPassword}`);
        
        response = await fetch(
          `https://lightblue-goat-212889.hostingersite.com/wp-json/wp/v2/posts?slug=${encodeURIComponent(slug)}&_embed=1`,
          {
            method: 'GET',
            headers: {
              'Accept': 'application/json',
              'Authorization': `Basic ${credentials}`,
              'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
            },
            cache: 'no-store',
          }
        );
      }
    }

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const posts = await response.json();
    
    if (!posts || posts.length === 0) {
      return notFound();
    }

    // Rest of your component code...
    const post = posts[0];
    
    return (
      <div>
        <h1>{post.title.rendered}</h1>
        <div dangerouslySetInnerHTML={{ __html: post.content.rendered }} />
      </div>
    );
    
  } catch (error) {
    console.error('Error:', error);
    return <div>Error loading post</div>;
  }
}