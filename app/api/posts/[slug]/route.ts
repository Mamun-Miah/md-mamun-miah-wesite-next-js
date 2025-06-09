export const runtime = 'edge';

interface WordPressPost {
  id: number;
  title: {
    rendered: string;
  };
  excerpt: {
    rendered: string;
  };
  content: {
    rendered: string;
  };
  slug: string;
}

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    
    // Fetch post by slug from WordPress REST API
    const response = await fetch(
      `https://lightblue-goat-212889.hostingersite.com/wp-json/wp/v2/posts?slug=${slug}`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
        // Cache for 60 seconds
        next: { revalidate: 60 }
      }
    );

    if (!response.ok) {
      return Response.json(
        { error: 'Failed to fetch post' },
        { status: response.status }
      );
    }

    const posts: WordPressPost[] = await response.json();
    
    // WordPress returns an array, check if post exists
    if (!posts || posts.length === 0) {
      return Response.json(
        { error: 'Post not found' },
        { status: 404 }
      );
    }

    const post = posts[0];
    
    // Return clean data
    return Response.json({
      id: post.id,
      title: post.title.rendered,
      description: post.excerpt.rendered.replace(/<[^>]*>/g, ''), // Strip HTML tags
      slug: post.slug,
      content: post.content.rendered
    });

  } catch (error) {
    console.error('Error fetching WordPress post:', error);
    return Response.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}