export const runtime = 'edge';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;

  try {
    const wpRes = await fetch(
      `https://lightblue-goat-212889.hostingersite.com/wp-json/wp/v2/posts?slug=${slug}&_embed`,
      {
        headers: {
          'User-Agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/113.0.0.0 Safari/537.36',
          'Accept': 'application/json',
          'Referer': 'https://lightblue-goat-212889.hostingersite.com/', // helps with some CDNs
        },
        cache: 'no-store', // avoid caching issues during development
      }
    );

    if (!wpRes.ok) {
      return new Response(`Failed to fetch WordPress post: ${wpRes.status}`, {
        status: wpRes.status,
      });
    }

    const data = await wpRes.json();

    return new Response(JSON.stringify(data), {
      headers: { 'Content-Type': 'application/json' },
      status: 200,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    return new Response(`Internal Error: ${message}`, { status: 500 });
  }
}
