export const runtime = 'edge';
import domainList from '../domainlist.json';

async function saveLog(domain, status, ip) {
  const newLog = {
    domain,
    status,
    ip,
    time: new Date().toUTCString(),
  };

  // Get existing logs
  const getRes = await fetch(`${domainList.upstash_url}/get/plugin-logs`, {
    headers: {
      Authorization: `Bearer ${domainList.upstash_token}`,
    },
  });

  const getData = await getRes.json();
  let logs = [];

  try {
    if (getData.result) {
      const parsed = typeof getData.result === 'string' 
        ? JSON.parse(getData.result) 
        : getData.result;
      logs = Array.isArray(parsed) ? parsed : [];
    }
  } catch {
    logs = [];
  }

  // Add new log
  logs.push(newLog);

  // Save back — single JSON.stringify only!
  await fetch(`${domainList.upstash_url}/set/plugin-logs`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${domainList.upstash_token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(logs), //  single stringify
  });
}

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const domain = searchParams.get('domain');
  const key = searchParams.get('key');
  const ip = request.headers.get('x-forwarded-for') || 'unknown';

  // Check key first
  if (!key || key !== domainList.key) {
    await saveLog(domain || 'unknown', 'unauthorized', ip);
    return Response.json({ status: 'unauthorized', message: 'Invalid key' }, { status: 401 });
  }

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
  const status = isAllowed ? 'active' : 'inactive';

  await saveLog(cleanDomain, status, ip);

  return Response.json({ status });
}