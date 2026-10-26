# Contributing

Swiss Atelier is maintained as a small static site and a reusable CSS/JS bundle. Keep changes focused and preserve its visual contract.

1. Read `AGENTS.md`. Open the living specimen and the starter to understand public usage.
2. Edit `dist/tokens.json` for tokens, `styles/atelier.css` for shared components, or `dist/atelier.js` for the runtime. Specimen-only work belongs in `index.html`, `styles/site.css`, or `scripts/site.js`.
3. Run `npm ci`, `npm run build`, and `npm test`. Commit generated `dist/` assets with their source changes. Never edit generated CSS as the primary source.
4. Check desktop and narrow mobile layouts, 200%/400% browser zoom, user spacing, loaded/fallback fonts, and diagram text equivalents, keyboard focus, tab arrows, accordions, matrix filters, and copy buttons. Test the starter separately: consumers do not import the site's utility stylesheet.
5. Recheck the reader task, evidence/status, numerical mappings, scope, arrows, boundaries, and omissions. Repeat `tests/reader-cases.md`, saving expected and actual answers separately. Agent checks do not establish human comprehension.
6. Update the skill, examples, and prose when the public contract changes. Record user-facing changes in `CHANGELOG.md`.
7. When requested, open a pull request describing the problem, resulting behavior, and validation. CI checks changes before deployment from `main`.

The skill entry point stays concise; put conditional authoring/diagram/distribution detail in linked references and copy the entire skill directory when testing portability. Companions are optional and Swiss branding takes precedence. Preserve local research and unrelated work.

## Compatibility and releases

Use semantic versioning for public class names, token names, runtime methods, and visual behavior. Breaking changes need a major release and migration guidance. Small compatible additions use a minor version; fixes use a patch version. Explain deliberate visual changes with before/after screenshots where useful.

The current version is `1.1.0`, a compatible minor release: additive public tokens/diagram classes/templates and intentional accessibility corrections. No existing class, token, or runtime method is removed. Visual corrections change small-text color and SVG layouts; inspect affected consumers when upgrading.

A release tag is immutable. Do not move it to include later fixes. Update package/runtime/documentation versions together and create a new tag after checks pass; see `docs/publishing.md`.

## Public boundary

`_site/` is generated from an explicit allowlist in `scripts/package-site.mjs`, including individual public documentation files. Add a file there only if humans or agents need to fetch it. Keep local research, output, dependencies, credentials, and deployment machinery out of the published artifact. A new public asset should be linked from the specimen or `llms.txt` and checked under a project URL, not only at a domain root.

Do not copy full token tables into new guides. The typed JSON file generates the CSS custom properties; reference it to prevent drift. Examples may quote a small number of values when explaining their meaning.
