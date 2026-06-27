import { readData, send, writeData } from './_store.js';

export default async function handler(req, res) {
  try {
    const pin = req.headers['x-admin-pin'] || req.query?.pin;
    if (!process.env.ADMIN_PIN || pin !== process.env.ADMIN_PIN) return send(res, 401, { error: 'Unauthorized' });
    const data = await readData();
    if (req.method === 'GET') return send(res, 200, data);
    if (req.method === 'DELETE') {
      data.votes = [];
      await writeData(data);
      return send(res, 200, { ok: true });
    }
    return send(res, 405, { error: 'Method not allowed' });
  } catch (error) {
    console.error(error);
    send(res, 500, { error: 'Admin request failed' });
  }
}
