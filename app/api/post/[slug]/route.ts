import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest, { params }: { params: { slug: string } }) {
  const { slug } = params;

  const wpRes = await fetch(
    `https://lightblue-goat-212889.hostingersite.com/wp-json/wp/v2/posts?slug=${slug}&_embed`
  );

  if (!wpRes.ok) {
    return new NextResponse(`Failed to fetch WordPress post: ${wpRes.status}`, {
      status: wpRes.status,
    });
  }

  const data = await wpRes.json();
  return NextResponse.json(data);
}