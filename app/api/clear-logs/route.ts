// /functions/api/clear-logs.js
export const runtime = 'edge';
import domainList from '../domainlist.json';

export async function GET() {
  await fetch(`${domainList.upstash_url}/del/plugin-logs`, {
    headers: {
      Authorization: `Bearer ${domainList.upstash_token}`,
    },
  });

  return Response.json({ success: true, cleared_at: new Date().toISOString() });
}