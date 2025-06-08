export const runtime = 'edge';
export async function GET() {
  const data = await fetch('https://lightblue-goat-212889.hostingersite.com/wp-json/wp/v2/posts?slug=${slug}&_embed')
  const posts = await data.json()
 
  return Response.json(posts)
}