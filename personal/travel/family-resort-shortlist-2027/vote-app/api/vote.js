import { readData, send, summarize, writeData } from './_store.js';

const clean = value => String(value || '').trim().slice(0, 80);

export default async function handler(req, res) {
  if (req.method !== 'POST') return send(res, 405, { error: 'Method not allowed' });
  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : (req.body || {});
    const data = await readData();
    const allowed = new Set(data.resorts.map(r => r.id));
    const ranks = Array.isArray(body.ranks)
      ? body.ranks.filter((id, index, arr) => allowed.has(id) && arr.indexOf(id) === index).slice(0, 6)
      : [];
    if (ranks.length < 3) return send(res, 400, { error: 'Pick at least 3 resorts.' });
    const voterToken = clean(body.voterToken) || crypto.randomUUID();
    const vote = {
      voterToken,
      name: clean(body.name) || 'Anonymous family',
      lane: clean(body.lane),
      vibe: clean(body.vibe),
      budget: clean(body.budget),
      travel: clean(body.travel),
      ranks,
      submittedAt: new Date().toISOString()
    };
    data.votes = (data.votes || []).filter(v => v.voterToken !== voterToken);
    data.votes.push(vote);
    await writeData(data);
    send(res, 200, { ok: true, voterToken, summary: summarize(data) });
  } catch (error) {
    console.error(error);
    send(res, 500, { error: 'Could not save vote.' });
  }
}
