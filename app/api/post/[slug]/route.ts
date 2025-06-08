export const runtime = 'edge';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;

  const wpRes = await fetch(
    `https://lightblue-goat-212889.hostingersite.com/wp-json/wp/v2/posts?slug=${slug}&_embed`,
    {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; EdgeRuntime/1.0)',
        Accept: 'application/json',
      },
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
}
