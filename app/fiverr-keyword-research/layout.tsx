import { pageMetadata, pages } from '@/lib/seo';
import { keywordToolSchema } from '@/lib/schema';
import StructuredData from '../components/StructuredData';

export const metadata = pageMetadata(pages.fiverr);

export default function FiverrKeywordResearchLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <StructuredData data={keywordToolSchema} />
      {children}
    </>
  );
}
