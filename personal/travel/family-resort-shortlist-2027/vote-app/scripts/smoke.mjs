import fs from 'node:fs';
const html = fs.readFileSync('public/index.html', 'utf8');
if (!html.includes('Vote for the trip everyone will actually enjoy')) throw new Error('missing headline');
for (const route of ['api/vote.js', 'api/results.js', 'api/admin.js', 'api/_store.js']) {
  if (!fs.existsSync(route)) throw new Error(`missing ${route}`);
}
const store = fs.readFileSync('api/_store.js', 'utf8');
if (!store.includes("['Bearer', token].join(' ')")) throw new Error('missing github auth header');
console.log('smoke ok');
