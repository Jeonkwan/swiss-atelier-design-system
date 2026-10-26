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
const canonical = 'https://jeonkwan.github.io/swiss-atelier-design-system/';
async function checkLink(file, target) {
  // Hosted project links are checked against this build, including Markdown guides.
  const hosted = target.startsWith(canonical);
  if (hosted) target = target.slice(canonical.length);
  if (/^(https?:|mailto:|data:)/.test(target)) return;
  const [path, fragment] = target.split('#');
  assert.ok(!path?.startsWith('/'), `Domain-root link breaks project hosting in ${file}: ${target}`);
  const local = hosted ? resolve(root, decodeURIComponent(path)) : path ? resolve(dirname(file), decodeURIComponent(path)) : file;
  assert.ok(local === root || local.startsWith(root + '/'), `Link escapes site: ${target}`);
  assert.ok(await stat(local).catch(() => false), `Broken link in ${file}: ${target}`);
  if (fragment && local.endsWith('.html')) {
    assert.ok((await readFile(local, 'utf8')).includes(`id="${fragment}"`), `Missing anchor ${target}`);
  }
}
for (const file of files.filter(path => /\.(html|md|txt)$/.test(path))) {
  const source = await readFile(file, 'utf8');
  assert.doesNotMatch(source, /YOUR_GITHUB|YOUR_HOSTED|YOUR_REPO|YOUR_GCS|<username>|<repo>/, `Placeholder in ${file}`);
  if (!file.endsWith('.html')) {
    const prose = source.replace(/```[\s\S]*?```/g, '').replace(/`[^`\n]*`/g, '');
    for (const match of prose.matchAll(/\[[^\]\n]*\]\((?:<([^>]+)>|([^\s)]+))\)/g)) {
      await checkLink(file, match[1] || match[2]);
    }
    continue;
  }
  const ids = [...source.matchAll(/\bid="([^"]+)"/g)].map(match => match[1]);
  assert.equal(new Set(ids).size, ids.length, `Duplicate IDs in ${file}`);
  for (const [, target] of source.matchAll(/\b(?:href|src)="([^"<>]+)"/g)) {
    await checkLink(file, target);
  }
  for (const [svg] of source.matchAll(/<svg\b[^>]*role="img"[\s\S]*?<\/svg>/g)) {
    const name = svg.match(/aria-labelledby="([^"]+)"/)?.[1];
    const description = svg.match(/aria-describedby="([^"]+)"/)?.[1];
    assert.ok(name && description, `Unnamed or undescribed SVG in ${file}`);
    assert.match(svg, /<title\b[^>]*>[^<]+<\/title>/, `Missing SVG title in ${file}`);
    assert.match(svg, /<desc\b[^>]*>[^<]+<\/desc>/, `Missing SVG description in ${file}`);
    for (const id of `${name} ${description}`.split(/\s+/)) {
      assert.ok(ids.includes(id), `Unresolved SVG description ${id} in ${file}`);
    }
    assert.ok(description.split(/\s+/).some(id => !svg.includes(`id="${id}"`)), `SVG needs a nearby independent equivalent in ${file}`);
  }
}
for (const privatePath of ['node_modules', '.git', '.github', 'deploy', 'scripts', 'tests', 'docs/research']) {
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
console.log(`Checked ${files.length} public files, HTML/Markdown/project links, SVG associations, token coverage, and deployment exclusions.`);
