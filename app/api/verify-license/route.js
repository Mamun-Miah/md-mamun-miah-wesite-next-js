export const runtime = 'edge';
import domainList from '../domainlist.json';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const domain = searchParams.get('domain');

  if (!domain) {
    return Response.json({ status: 'error', message: 'Domain is required' });
  }

  // Clean the domain
  const cleanDomain = domain
    .replace(/^https?:\/\//, '')
    .replace(/^www\./, '')
    .split('/')[0]
    .toLowerCase()
    .trim();

  const isAllowed = domainList.domains.includes(cleanDomain);

  return Response.json({
    status: isAllowed ? 'active' : 'inactive',
  });
}