export async function GET(request: Request, context: { params: { slug: string } }) {
  const { slug } = context.params;

  const wpRes = await fetch(
    `https://lightblue-goat-212889.hostingersite.com/wp-json/wp/v2/posts?slug=${slug}&_embed`
  );

  if (!wpRes.ok) {
    return new Response(`Failed to fetch WordPress post: ${wpRes.status}`, {
      status: wpRes.status,
    });
  }

  const data = await wpRes.json();
  return Response.json(data);
}
