const FILE = 'votes.json';
const GITHUB_API = 'https://api.github.com';

function requiredEnv(name) {
  const value = process.env[name];
  if (!value) throw new Error(`Missing ${name}`);
  return value;
}

async function github(path, options = {}) {
  const token = requiredEnv('GITHUB_TOKEN');
  const res = await fetch(`${GITHUB_API}${path}`, {
    ...options,
    headers: {
      Accept: 'application/vnd.github+json',
      Authorization: ['Bearer', token].join(' '),
      'X-GitHub-Api-Version': '2022-11-28',
      'Content-Type': 'application/json',
      ...(options.headers || {})
    }
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`GitHub ${res.status}: ${text.slice(0, 300)}`);
  }
  return res.json();
}

export async function readData() {
  const gistId = requiredEnv('GIST_ID');
  const gist = await github(`/gists/${gistId}`);
  const content = gist.files?.[FILE]?.content;
  if (!content) throw new Error(`Missing ${FILE} in gist`);
  return JSON.parse(content);
}

export async function writeData(data) {
  const gistId = requiredEnv('GIST_ID');
  data.updatedAt = new Date().toISOString();
  await github(`/gists/${gistId}`, {
    method: 'PATCH',
    body: JSON.stringify({ files: { [FILE]: { content: JSON.stringify(data, null, 2) } } })
  });
  return data;
}

export function summarize(data) {
  const resortMap = new Map(data.resorts.map(r => [r.id, { ...r, firsts: 0, points: 0, votes: 0, avgRank: null }]));
  const vibeCounts = {};
  const laneCounts = {};
  for (const vote of data.votes || []) {
    if (vote.vibe) vibeCounts[vote.vibe] = (vibeCounts[vote.vibe] || 0) + 1;
    if (vote.lane) laneCounts[vote.lane] = (laneCounts[vote.lane] || 0) + 1;
    (vote.ranks || []).forEach((id, index) => {
      const row = resortMap.get(id);
      if (!row) return;
      row.votes += 1;
      row.points += Math.max(0, 6 - index);
      if (index === 0) row.firsts += 1;
    });
  }
  const leaderboard = [...resortMap.values()].map(r => ({
    ...r,
    avgRank: r.votes ? Number(((r.votes * 6 - r.points) / r.votes + 1).toFixed(2)) : null
  })).sort((a, b) => b.points - a.points || b.firsts - a.firsts || a.name.localeCompare(b.name));
  return { count: (data.votes || []).length, leaderboard, vibeCounts, laneCounts, updatedAt: data.updatedAt };
}

export function send(res, status, body) {
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.setHeader('Cache-Control', 'no-store');
  res.end(JSON.stringify(body));
}
