export const runtime = 'edge';
import domainList from '../domainlist.json';

async function saveLog(domain, status, ip) {
  const key = `plugin-log:${domain}`;

  // Check if this domain key already exists
  const checkRes = await fetch(`${domainList.upstash_url}/exists/${key}`, {
    headers: {
      Authorization: `Bearer ${domainList.upstash_token}`,
    },
  });

  const checkData = await checkRes.json();

  // If exists (1), skip entirely — no write needed
  if (checkData.result === 1) return;

  // First time — save log for this domain
  const newLog = {
    domain,
    status,
    ip,
    time: new Date().toUTCString(),
  };

  await fetch(`${domainList.upstash_url}/set/${key}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${domainList.upstash_token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newLog),
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