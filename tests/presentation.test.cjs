const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const tokens = require('../dist/tokens.json');
const color = name => tokens[name].$value.components;
function luminance(rgb) {
  return rgb.map(v => v <= .04045 ? v / 12.92 : ((v + .055) / 1.055) ** 2.4)
    .reduce((sum, v, i) => sum + v * [.2126, .7152, .0722][i], 0);
}
function contrast(a, b) {
  const values = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (values[0] + .05) / (values[1] + .05);
}
const blend = (foreground, background, alpha) => foreground.map((v, i) => v * alpha + background[i] * (1 - alpha));

test('actual contextual badge/code/link text roles meet normal-text contrast', () => {
  const css = fs.readFileSync('dist/atelier.css', 'utf8');
  function rule(selector) {
    return [...css.matchAll(/([^{}]+)\{([^{}]*)\}/g)].find(([, selectors]) => selectors.split(',').map(s => s.trim()).includes(selector))?.[2];
  }
  for (const selector of ['.atelier-badge-orange', '.atelier-code-focal', '.toc-link.active']) {
    assert.match(rule(selector), /color: var\(--ink-focal\)/);
  }
  assert.match(rule('.atelier-badge-teal'), /color: var\(--ink-positive\)/);
  assert.match(rule('.syn-cm'), /color: var\(--syn-comment\)/);
  assert.ok(contrast(color('syn-comment'), color('bg-surface')) >= 4.5);
  for (const foreground of ['ink-focal', 'ink-positive', 'ink-muted', 'ink-code']) {
    for (const background of ['bg-surface', 'bg-paper', 'bg-subtle', 'accent-soft', 'teal-soft']) {
      const value = contrast(color(foreground), color(background));
      assert.ok(value >= 4.5, `${foreground}/${background}: ${value}`);
    }
  }
  // Syntax legend is on paper; code blocks use white and 75% highlight overlays.
  for (const foreground of ['syn-keyword', 'syn-type', 'syn-fn', 'syn-const', 'syn-string', 'syn-attr', 'syn-punct', 'ink-code']) {
    for (const background of [color('bg-surface'), color('bg-paper'), blend(color('accent-soft'), color('bg-surface'), .75), blend(color('teal-soft'), color('bg-surface'), .75)]) {
      const value = contrast(color(foreground), background);
      assert.ok(value >= 4.5, `${foreground} on approved code surface: ${value}`);
    }
  }
});

test('essential arrows and focus cues remain distinct from their surfaces', () => {
  for (const foreground of ['accent-primary', 'accent-secondary', 'ink-muted']) {
    for (const background of ['bg-surface', 'bg-paper', 'bg-subtle']) {
      assert.ok(contrast(color(foreground), color(background)) >= 3, `${foreground}/${background}`);
    }
  }
});

test('working package, lock, runtime, generated CSS, and guides identify the same version', () => {
  const { version } = require('../package.json');
  const lock = require('../package-lock.json');
  assert.equal(lock.version, version);
  assert.equal(lock.packages[''].version, version);
  const window = {};
  vm.runInNewContext(fs.readFileSync('dist/atelier.js', 'utf8'), { window, document: { readyState: 'loading', addEventListener() {} } });
  assert.equal(window.SwissAtelier.version, version);
  for (const file of ['dist/atelier.css', 'dist/tokens.json', 'README.md', 'AGENTS.md', 'CLAUDE.md', 'CONTRIBUTING.md', 'CHANGELOG.md', 'llms.txt', 'index.html', 'templates/starter-integration.html', 'skills/swiss-atelier/references/distribution.md']) {
    assert.ok(fs.readFileSync(file, 'utf8').includes(version), `Version missing in ${file}`);
  }
  const distribution = fs.readFileSync('skills/swiss-atelier/references/distribution.md', 'utf8');
  const pinned = [...distribution.matchAll(/cdn\.jsdelivr\.net\/gh\/Jeonkwan\/swiss-atelier-design-system@([^/]+)\/(dist\/[^\s"<]+)/g)];
  assert.deepEqual(new Set(pinned.map(match => match[1])), new Set(['v1.0.0', `v${version}`]));
  for (const ref of ['v1.0.0', `v${version}`]) {
    for (const asset of ['dist/atelier.css', 'dist/atelier.js', 'dist/tokens.json']) assert.ok(pinned.some(match => match[1] === ref && match[2] === asset));
    assert.ok(distribution.includes(`/tree/${ref}`), 'Pinned guidance must use the same release tree');
  }
});

test('consumer templates load only the shared bundle and preserve literal code source', () => {
  for (const name of fs.readdirSync('templates').filter(name => name.endsWith('.html'))) {
    const html = fs.readFileSync(`templates/${name}`, 'utf8');
    assert.doesNotMatch(html, /(?:site\.(?:css|js)|tailwind)/i, name);
    const imports = [...html.matchAll(/<(?:link|script)\b[^>]*(?:href|src)="([^"]+)"/g)].map(match => match[1]);
    assert.ok(imports.includes('../dist/atelier.css'), name);
    assert.ok(imports.every(path => ['../dist/atelier.css', '../dist/atelier.js'].includes(path)), name);
  }
  const integration = fs.readFileSync('templates/starter-integration.html', 'utf8');
  assert.ok(integration.includes('Result&lt;Arc&lt;SnapshotPage&gt;, ReadFallback&gt;'));
});
