import React from 'react'

type WPPost = {
  id: number
  title: { rendered: string }
  content: { rendered: string }
}

const Page = async () => {
  const res = await fetch(
    'https://lightblue-goat-212889.hostingersite.com/wp-json/wp/v2/posts?slug=architecto-ut-ut-rerum-architecto',
    {
      next: { revalidate: 60 }, // optional: enables ISR
    }
  )

  if (!res.ok) {
    throw new Error('Failed to fetch post')
  }

  const posts: WPPost[] = await res.json()
  const post = posts[0]

  if (!post) {
    return <div>Post not found</div>
  }

  return (
    <div>
      <h1 dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
      <article dangerouslySetInnerHTML={{ __html: post.content.rendered }} />
    </div>
  )
}

export default Page
