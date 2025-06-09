import React from 'react'

export const runtime = 'edge'

type WPPost = {
  id: number
  title: { rendered: string }
  content: { rendered: string }
}

// `params` comes from Next.js routing for dynamic segments
interface PageProps {
  params: Promise<{ id: string }>
}

const Page = async ({ params }: PageProps) => {
  const { id } = await params
  const res = await fetch(
    `https://lightblue-goat-212889.hostingersite.com/wp-json/wp/v2/posts/${encodeURIComponent(id)}`,
    {
      next: { revalidate: 60 }, // optional ISR
    }
  )

  if (!res.ok) {
    return <div>Failed to fetch post</div>
  }

  const post: WPPost = await res.json()

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
