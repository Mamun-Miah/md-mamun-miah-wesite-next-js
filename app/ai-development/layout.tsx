import { pageMetadata, pages } from '@/lib/seo';
import { serviceSchema } from '@/lib/schema';
import StructuredData from '../components/StructuredData';

export const metadata = pageMetadata(pages.ai);

export default function AiDevelopmentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <StructuredData data={serviceSchema(pages.ai, 'AI and LLM Engineering')} />
      {children}
    </>
  );
}
