export const runtime = 'edge';
import domainList from '../domainlist.json';

const LOG_TTL_MS = 5 * 60 * 1000; // 5 minutes

export async function GET() {
  const baseUrl = domainList.upstash_url;
  const headers = {
    Authorization: `Bearer ${domainList.upstash_token}`,
  };

  // Fetch logs and timestamp in parallel
  const [logsRes, timestampRes] = await Promise.all([
    fetch(`${baseUrl}/get/plugin-logs`, { headers }),
    fetch(`${baseUrl}/get/plugin-logs-timestamp`, { headers }),
  ]);

  const [logsData, timestampData] = await Promise.all([
    logsRes.json(),
    timestampRes.json(),
  ]);

  const now = Date.now();
  const lastCleared = timestampData.result ? parseInt(timestampData.result) : 0;

  // If 5 minutes have passed, clear the logs
  if (now - lastCleared >= LOG_TTL_MS) {
    await Promise.all([
      fetch(`${baseUrl}/set/plugin-logs`, {
        method: 'POST',
        headers,
        body: JSON.stringify({ value: JSON.stringify([]) }),
      }),
      fetch(`${baseUrl}/set/plugin-logs-timestamp`, {
        method: 'POST',
        headers,
        body: JSON.stringify({ value: String(now) }),
      }),
    ]);

    return Response.json({ logs: [] });
  }

  const logs = logsData.result ? JSON.parse(logsData.result) : [];
  return Response.json({ logs });
}