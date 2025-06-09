export const runtime = 'edge';

interface PostData {
  id: number;
  title: string;
  description: string;
  slug: string;
  content: string;
}

// type Props = {
//   params: Promise<{ slug: string }>
// }

const Page = async () => {
  // const { slug } = await params;
  
  try {
    // Fetch post data from your API route
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/api/posts/architecto-ut-ut-rerum-architecto`,
      {
        // Cache for 60 seconds
        next: { revalidate: 60 }
      }
    );

    if (!response.ok) {
      if (response.status === 404) {
        return (
          <div className="container mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold text-red-600">Post Not Found</h1>
            <p>The requested blog post could not be found.</p>
          </div>
        );
      }
      throw new Error('Failed to fetch post');
    }

    const post: PostData = await response.json();

    return (
      <div className="container mx-auto px-4 py-8">
        <article>
          <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
          <p className="text-gray-600 mb-6">{post.description}</p>
          <div 
            className="prose max-w-none"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </article>
      </div>
    );

  } catch (error) {
    console.error('Error loading post:', error);
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-red-600">Error</h1>
        <p>Failed to load the blog post. Please try again later.</p>
      </div>
    );
  }
}

export default Page;