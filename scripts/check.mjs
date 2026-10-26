import assert from 'node:assert/strict';
import { readFile, readdir, stat } from 'node:fs/promises';
import { resolve, dirname } from 'node:path';

const root = resolve('_site');
async function walk(folder) {
  const result = [];
  for (const entry of await readdir(folder, { withFileTypes: true })) {
    const path = resolve(folder, entry.name);
    if (entry.isDirectory()) result.push(...await walk(path));
    else result.push(path);
  }
  return result;
}
const files = await walk(root);
for (const file of files.filter(path => /\.(html|md|txt)$/.test(path))) {
  const source = await readFile(file, 'utf8');
  assert.doesNotMatch(source, /YOUR_GITHUB|YOUR_HOSTED|YOUR_REPO|YOUR_GCS|<username>|<repo>/, `Placeholder in ${file}`);
  if (!file.endsWith('.html')) continue;
  const ids = [...source.matchAll(/\bid="([^"]+)"/g)].map(match => match[1]);
  assert.equal(new Set(ids).size, ids.length, `Duplicate IDs in ${file}`);
  for (const [, target] of source.matchAll(/\b(?:href|src)="([^"<>]+)"/g)) {
    if (/^(https?:|mailto:|data:)/.test(target)) continue;
    const [path, fragment] = target.split('#');
    const local = path ? resolve(dirname(file), path) : file;
    assert.ok(local === root || local.startsWith(root + '/'), `Link escapes site: ${target}`);
    assert.ok(await stat(local).catch(() => false), `Broken link in ${file}: ${target}`);
    if (fragment && local.endsWith('.html')) {
      assert.ok((await readFile(local, 'utf8')).includes(`id="${fragment}"`), `Missing anchor ${target}`);
    }
  }
}
for (const privatePath of ['node_modules', '.git', '.github', 'deploy', 'scripts', 'tests']) {
  assert.equal(await stat(resolve(root, privatePath)).catch(() => null), null, `Unexpected deployed directory: ${privatePath}`);
}
const tokens = JSON.parse(await readFile('dist/tokens.json', 'utf8'));
const css = await readFile('dist/atelier.css', 'utf8');
for (const token of Object.values(tokens)) {
  if (token && typeof token === 'object' && '$value' in token) {
    assert.ok(token.$type, 'Untyped token');
    assert.ok(css.includes(token.$extensions['org.swiss-atelier.css'].name + ':'), 'Token missing from CSS');
  }
}
console.log(`Checked ${files.length} public files, local HTML links, anchors, token coverage, and deployment exclusions.`);
