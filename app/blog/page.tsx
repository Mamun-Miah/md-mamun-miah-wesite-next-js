import React from 'react'

const page = async () => {
    const res = await fetch('https://lightblue-goat-212889.hostingersite.com//wp-json/wp/v2/posts');
    const posts = await res.json();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Blog Posts</h1>
      <ul>
        {posts.map((post: any) => (
          <li key={post.id}>
            <a href={`/blog/${post.slug}`} className="text-blue-600 underline">
              {post.title.rendered}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default page