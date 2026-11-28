import { pageMetadata, pages } from '@/lib/seo';
import { serviceSchema } from '@/lib/schema';
import StructuredData from '../components/StructuredData';

export const metadata = pageMetadata(pages.backend);

export default function BackendDevelopmentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <StructuredData data={serviceSchema(pages.backend, 'Backend and API Development')} />
      {children}
    </>
  );
}
