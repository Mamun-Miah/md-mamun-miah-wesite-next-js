
export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  const { slug } = params;

  const res = await fetch(
    `https://lightblue-goat-212889.hostingersite.com/wp-json/wp/v2/posts?slug=${slug}&_embed`
  );

  if (!res.ok) {
    return new Response('Failed to fetch post', { status: res.status });
  }

  const data = await res.json();
  return Response.json(data);
}
