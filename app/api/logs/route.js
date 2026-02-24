export const runtime = 'edge';
import domainList from '../domainlist.json';

export async function GET() {
  const res = await fetch(`${domainList.upstash_url}/get/plugin-logs`, {
    headers: {
      Authorization: `Bearer ${domainList.upstash_token}`,
    },
  });

  const data = await res.json();
  const logs = data.result ? JSON.parse(data.result) : [];

  return Response.json({ logs });
}