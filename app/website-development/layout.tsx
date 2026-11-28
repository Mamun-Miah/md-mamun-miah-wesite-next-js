import { pageMetadata, pages } from '@/lib/seo';
import { serviceSchema } from '@/lib/schema';
import StructuredData from '../components/StructuredData';

export const metadata = pageMetadata(pages.web);

export default function WebsiteDevelopmentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <StructuredData data={serviceSchema(pages.web, 'Custom Website Development')} />
      {children}
    </>
  );
}
