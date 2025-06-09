
type Props = {
  params: Promise<{ slug: string }>
}

const Page = async ({ params }: Props) => {
  const { slug } = await params
  
  return (
    <div>
      <h1>Blog Post</h1>
      <p>Slug: {slug}</p>
    </div>
  )
}

export default Page