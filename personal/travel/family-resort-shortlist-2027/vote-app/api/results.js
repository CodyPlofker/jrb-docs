import { readData, send, summarize } from './_store.js';

export default async function handler(req, res) {
  if (req.method !== 'GET') return send(res, 405, { error: 'Method not allowed' });
  try {
    const data = await readData();
    send(res, 200, summarize(data));
  } catch (error) {
    console.error(error);
    send(res, 500, { error: 'Could not load results' });
  }
}
