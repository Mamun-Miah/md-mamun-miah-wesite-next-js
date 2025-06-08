// app/blog/[slug]/page.tsx
type Params = {
  params: { slug: string };
};

export default async function BlogPost({ params }: Params) {
  const res = await fetch(`https://lightblue-goat-212889.hostingersite.com/wp-json/wp/v2/posts?slug=${params.slug}`);
  const post = await res.json();

  if (!post || post.length === 0) return <div>Post not found</div>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">{post[0].title.rendered}</h1>
      <div
        className="prose"
        dangerouslySetInnerHTML={{ __html: post[0].content.rendered }}
      />
    </div>
  );
}
