// BlogServer.tsx - Server Component with SSG Support
import BlogPost from './BlogPost';

type PostData = {
  title: { rendered: string };
  content: { rendered: string };
  date: string;
  _embedded?: {
    'wp:featuredmedia'?: {
      source_url: string;
    }[];
  };
};

type WordPressPost = {
  slug: string;
  title: { rendered: string };
  content: { rendered: string };
  date: string;
  _embedded?: {
    'wp:featuredmedia'?: {
      source_url: string;
    }[];
  };
};

type Props = {
  slug: string;
};

async function fetchPost(slug: string): Promise<PostData | null> {
  try {
    const res = await fetch(
      `https://lightblue-goat-212889.hostingersite.com/wp-json/wp/v2/posts?slug=${slug}&_embed`,
      {
        // Enable caching for SSG
        next: { revalidate: 3600 }, // Revalidate every hour
        // Alternative: { cache: 'force-cache' } for pure SSG
      }
    );

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const data = await res.json();
    return data.length > 0 ? data[0] : null;
  } catch (error) {
    console.error('Error fetching post:', error);
    return null;
  }
}

export default async function BlogServer({ slug }: Props) {
  const post = await fetchPost(slug);

  if (!post) {
    return <p>Post not found.</p>;
  }

  const imageUrl = post._embedded?.['wp:featuredmedia']?.[0]?.source_url ?? '';

  return (
    <BlogPost
      title={post.title.rendered}
      content={post.content.rendered}
      image={imageUrl}
      date={post.date}
    />
  );
}

// SSG Support - generateStaticParams function
export async function generateStaticParams() {
  try {
    // Fetch all posts to get slugs for pre-generation
    const res = await fetch(
      'https://lightblue-goat-212889.hostingersite.com/wp-json/wp/v2/posts?per_page=100'
    );
    const posts: WordPressPost[] = await res.json();
    
    return posts.map((post) => ({
      slug: post.slug,
    }));
  } catch (error) {
    console.error('Error generating static params:', error);
    return [];
  }
}

