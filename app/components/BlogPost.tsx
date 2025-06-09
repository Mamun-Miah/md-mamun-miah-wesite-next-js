// components/BlogPost.tsx
type Props = {
  title: string;
  content: string;
};

export default function BlogPost({ title, content }: Props) {
  return (
    <article className="prose lg:prose-xl max-w-4xl mx-auto py-10">
      <h1 className="text-3xl font-bold mb-4">{title}</h1>
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </article>
  );
}
