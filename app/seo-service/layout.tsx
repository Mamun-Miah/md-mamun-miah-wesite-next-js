import { pageMetadata, pages } from '@/lib/seo';
import { serviceSchema } from '@/lib/schema';
import StructuredData from '../components/StructuredData';

export const metadata = pageMetadata(pages.seo);

export default function SeoServiceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <StructuredData data={serviceSchema(pages.seo, 'Technical SEO and Web Performance')} />
      {children}
    </>
  );
}
