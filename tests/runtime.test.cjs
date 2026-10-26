const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');

function runtime(navigator = {}) {
  const window = { navigator };
  vm.runInNewContext(fs.readFileSync('dist/atelier.js', 'utf8'), {
    window,
    document: { readyState: 'loading', addEventListener() {} }
  });
  return window.SwissAtelier;
}

function textOf(html) {
  return html.replace(/<[^>]*>/g, '').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&');
}

test('highlighting preserves source, including strings, URLs, and HTML', () => {
  const api = runtime();
  for (const [lang, source] of [
    ['js', 'const url = "https://host/if/true"; // return 42'],
    ['js', 'const html = "<img src=x onerror=alert(1)>";'],
    ['js', String.raw`const message = "say \"hello\"";`],
    ['rust', 'pub fn read() -> Result<Arc<Page>, Error> { Ok(page) }'],
    ['rust', '#[inline(always)]'],
    ['rust', "fn read<'a>(value: &'a str) -> &'a str { value }"],
    ['toml', 'url = "https://host/#fragment" # comment'],
    ['sql', "SELECT '--quoted' FROM source -- comment"],
    ['py', 'value = "# if True" # comment'],
    ['sh', 'echo "Grüße 世界 <tag>" # comment']
  ]) {
    const html = api.highlightLine(source, lang);
    assert.equal(textOf(html), source, lang);
    assert.doesNotMatch(html, /<img|<script|class="<span/);
  }
});

test('strings and comments remain atomic; HTML entities are not re-tokenized', () => {
  const api = runtime();
  const html = api.highlightLine('const x = "https://if/true"; // fn 42', 'js');
  assert.ok(html.includes('<span class="syn-st">"https://if/true"</span>'));
  assert.ok(html.endsWith('<span class="syn-cm">// fn 42</span>'));
  assert.ok(api.highlightLine('x < 3 && y > 2', 'js').includes('&lt;</span>'));
});

test('clipboard resolves after success and rejects without calling success callback', async () => {
  let copied;
  let done = false;
  const api = runtime({ clipboard: { async writeText(text) { copied = text; } } });
  await api.copyToClipboard('source', () => { done = true; });
  assert.equal(copied, 'source');
  assert.equal(done, true);
  done = false;
  const denied = runtime({ clipboard: { async writeText() { throw new Error('denied'); } } });
  await assert.rejects(denied.copyToClipboard('source', () => { done = true; }), /denied/);
  assert.equal(done, false);
});
