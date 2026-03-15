export const runtime = 'edge';
import domainList from '../domainlist.json';

export async function GET() {
  const res = await fetch(`${domainList.upstash_url}/get/plugin-logs`, {
    headers: {
      Authorization: `Bearer ${domainList.upstash_token}`,
    },
  });

  const data = await res.json();
  const rawLogs = data.result ? JSON.parse(data.result) : [];

  // Always return unique domains only
  const seen = new Set();
  const uniqueLogs = rawLogs.filter(log => {
    if (seen.has(log.domain)) return false;
    seen.add(log.domain);
    return true;
  });

  return Response.json({ logs: uniqueLogs });
}