import { cp, mkdir, rm, writeFile } from 'node:fs/promises';

// Publish only the explicit public surface, never the checkout or dependencies.
await rm('_site', { recursive: true, force: true });
await mkdir('_site');
await mkdir('_site/docs');
for (const path of ['index.html', 'favicon.svg', 'dist', 'templates', 'skills', 'docs/accessibility.md', 'docs/publishing.md', 'docs/implementation-review-2026-10-26.md', 'AGENTS.md', 'CLAUDE.md', 'README.md', 'CONTRIBUTING.md', 'CHANGELOG.md', 'LICENSE', 'llms.txt']) {
  await cp(path, `_site/${path}`, { recursive: true });
}
await writeFile('_site/.nojekyll', '');
