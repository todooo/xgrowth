// POST {handle, plan}  -> saves the signup to Vercel Blob (waitlist/<plan>/<handle>.json)
// GET  ?key=WAITLIST_KEY -> lists all signups (newest first) as JSON
import { put, list } from '@vercel/blob';

const PLANS = new Set(['starter', 'coach', 'personal']);

function clean(handle) {
  return String(handle || '').trim().replace(/^@/, '').replace(/^https?:\/\/(www\.)?(x|twitter)\.com\//i, '').replace(/[?#/].*$/, '').toLowerCase();
}

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  if (req.method === 'POST') {
    let body = req.body;
    if (typeof body === 'string') { try { body = JSON.parse(body); } catch { body = {}; } }
    const handle = clean(body?.handle);
    const plan = String(body?.plan || '').toLowerCase();
    if (!/^[a-z0-9_]{1,15}$/.test(handle)) return res.status(400).json({ ok: false, error: 'handle' });
    if (!PLANS.has(plan)) return res.status(400).json({ ok: false, error: 'plan' });
    const record = {
      handle, plan, at: new Date().toISOString(),
      ref: req.headers.referer || '', ua: req.headers['user-agent'] || '',
      country: req.headers['x-vercel-ip-country'] || '',
    };
    await put(`waitlist/${plan}/${handle}.json`, JSON.stringify(record), {
      access: 'private', contentType: 'application/json', addRandomSuffix: false, allowOverwrite: true,
    });
    return res.status(200).json({ ok: true });
  }
  if (req.method === 'GET') {
    const key = process.env.WAITLIST_KEY;
    if (!key || req.query.key !== key) return res.status(401).json({ ok: false });
    const out = [];
    let cursor;
    do {
      const page = await list({ prefix: 'waitlist/', cursor, limit: 1000 });
      for (const b of page.blobs) {
        const m = b.pathname.match(/^waitlist\/([^/]+)\/([^/]+)\.json$/);
        if (m) out.push({ plan: m[1], handle: m[2], at: b.uploadedAt, url: `https://x.com/${m[2]}` });
      }
      cursor = page.hasMore ? page.cursor : undefined;
    } while (cursor);
    out.sort((a, b) => (a.at < b.at ? 1 : -1));
    if (req.query.format === 'csv') {
      res.setHeader('Content-Type', 'text/csv');
      return res.status(200).send('at,plan,handle\n' + out.map(r => `${r.at},${r.plan},${r.handle}`).join('\n'));
    }
    return res.status(200).json({ ok: true, count: out.length, signups: out });
  }
  res.setHeader('Allow', 'GET, POST');
  return res.status(405).json({ ok: false });
}
