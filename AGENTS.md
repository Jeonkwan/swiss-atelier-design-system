# Agent guide — Swiss Atelier 1.0.0

This folder is the repository root. It contains the living specimen, redistributable CSS/JS bundle, and portable agent skill. Other design systems in the parent folder are separate projects.

## Start here

- Creating a page with Swiss Atelier: read `skills/swiss-atelier/SKILL.md` and copy `templates/starter-adr.html`.
- Changing the design system: read `CONTRIBUTING.md` and the public contract below.
- Publishing: read `docs/publishing.md`. Pages deploys the `_site/` allowlist, never the checkout.

## Sources and generated files

- `dist/tokens.json`: editable typed design tokens. CSS custom-property names live in each token's `org.swiss-atelier.css` extension.
- `styles/atelier.css`: editable shared components. `npm run build` generates `dist/atelier.css` from these styles and the tokens.
- `dist/atelier.js`: directly maintained zero-dependency runtime; public API is `SwissAtelier.version`, `initAll()`, `highlightLine(source, lang)`, and async `copyToClipboard(text, onDone)`. The callback runs only after success; callers must handle rejection.
- `index.html`, `styles/site.css`, `scripts/site.js`: editable specimen sources. The last two generate `dist/site.css` and `dist/site.js`; consumers only need `atelier.css` and optionally `atelier.js`.
- `skills/swiss-atelier/`, `templates/`, `llms.txt`: public consumption guidance. Keep their links and examples working under the repository's Pages subpath.
- `.github/workflows/deploy.yml`: build/test on PRs; build/test and deploy on `main`.

## Public design contract

- Quiet Hairline surfaces: Gallery Stone `#F4F4F6`, white cards, Subtle Zinc `#E4E4E7`, `1px solid #CBD5E1`, `4px` radii, no shadows or blur filters.
- Display: Fraunces 500, tracking `-0.02em`. Body: Literata 440, `0.98rem`, line-height `1.68`, tracking `-0.005em`, measure `60ch–68ch`. Geist for UI/tables; Geist Mono for technical text.
- Orange `#D9381E`: one or two focal elements per view. Teal `#0F766E`: verified states and recommendations. Pair color with words/icons.
- SVGs: `4px` layout grid; orthogonal off-axis connectors with `8px` rounded elbows; connectors before nodes and opaque masks behind connector labels. Provide accessible names.
- Syntax palette is defined by `--syn-*` tokens. Highlighter output must preserve source text, escape HTML, and avoid re-tokenizing generated markup. It is line-oriented and does not promise full language parsing.

## Validation and maintenance

Run `npm ci`, `npm run build`, and `npm test`. Commit generated `dist/` changes. Verify desktop/mobile, keyboard controls, copy success/failure, and the starter with only the shared bundle. Never claim accessibility conformance from token colors alone; see `docs/accessibility.md`.

Pages: https://jeonkwan.github.io/swiss-atelier-design-system/
Repository: https://github.com/Jeonkwan/swiss-atelier-design-system
Pinned release assets: https://cdn.jsdelivr.net/gh/Jeonkwan/swiss-atelier-design-system@v1.0.0/dist/atelier.css

Preserve immutable release tags. Document user-visible changes in `CHANGELOG.md`; do not add unrelated infrastructure or modify sibling folders.
