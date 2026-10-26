# Agent guide — Swiss Atelier 1.1.0

This folder is the repository root. It contains the living specimen, redistributable CSS/JS bundle, and portable agent skill. Other design systems in the parent folder are separate projects.

## Start here

- Applying Swiss Atelier: only when the user explicitly invokes `$swiss-atelier` or asks to use Swiss Atelier, read `skills/swiss-atelier/SKILL.md`. Preserve their output format; create HTML only for an explicit HTML/web-page request. For that delivery, establish audience, task, sources and unknowns; copy `templates/starter-adr.html` or `templates/starter-diagram.html`. Use `templates/starter-integration.html` for the original bundle example.
- Changing the design system: read `CONTRIBUTING.md` and the public contract below.
- Publishing: read `docs/publishing.md`. Pages deploys the `_site/` allowlist, never the checkout.

## Sources and generated files

- `dist/tokens.json`: editable typed design tokens. CSS custom-property names live in each token's `org.swiss-atelier.css` extension.
- `styles/atelier.css`: editable shared components. `npm run build` generates `dist/atelier.css` from these styles and the tokens.
- `dist/atelier.js`: directly maintained zero-dependency runtime; public API is `SwissAtelier.version`, `initAll()`, `highlightLine(source, lang)`, and async `copyToClipboard(text, onDone)`. The callback runs only after success; callers must handle rejection.
- `index.html`, `styles/site.css`, `scripts/site.js`: editable specimen sources. The last two generate `dist/site.css` and `dist/site.js`; consumers only need `atelier.css` and optionally `atelier.js`.
- `skills/swiss-atelier/`, `templates/`, `llms.txt`: public consumption guidance. Keep their links and examples working under the repository's Pages subpath.
- `.github/workflows/deploy.yml`: build/test on PRs; build/test and deploy on `main`.

## Identity and defaults

- Quiet Hairline surfaces: Gallery Stone `#F4F4F6`, white cards, Subtle Zinc `#E4E4E7`, `1px solid #CBD5E1`, `4px` radii, no shadows or blur filters.
- Adaptable calibration: Display: Fraunces 500, tracking `-0.02em`. Body: Literata 440, `0.98rem`, line-height `1.68`, tracking `-0.005em`, measure `60ch–68ch`. Geist for UI/tables; Geist Mono for technical text.
- Orange `#D9381E`: one or two focal elements per view. Teal `#0F766E`: supported verification and recommendations. Use `--ink-focal` / `--ink-positive` on tinted surfaces. Pair color with explicit factual status; acceptance does not verify a measurement.
- SVGs: `4px` layout grid; orthogonal off-axis connectors with `8px` rounded elbows; connectors before nodes and opaque masks behind connector labels. Provide accessible names and a complete nearby text equivalent. The grid governs structural geometry, not type sizes; enlarge/wrap/split figures to keep labels readable.
- Syntax hues use `--syn-*` tokens; comments on paper/tints use contextual `--ink-code`, while ordinary `.syn-cm` on white still consumes `--syn-comment` for compatible overrides. Highlighter output must preserve source text, escape HTML, and avoid re-tokenizing generated markup. It is line-oriented and does not promise full language parsing.

Retain typography roles, palette roles, and quiet surfaces. Adapt type size, measure, spacing, wrapping, and density for accessibility and the reader's task. This fixed-brand system does not promise full re-theming: tokens generate shared custom properties; specimen literals, treatment values, and SVG geometry remain partly local. See the skill's distribution reference for a concrete token-change example and release-coherent consumption. Companion authoring/diagram skills are optional and must preserve Swiss identity.

## Validation and maintenance

Run `npm ci`, `npm run build`, and `npm test`. Commit generated `dist/` changes. Use `tests/reader-cases.md` for repeatable content checks; save input, allowed references, expected/actual answers and ambiguities. Label agent inspection honestly. Verify desktop/mobile, 200%/400% zoom, user spacing, loaded/fallback fonts, text equivalents, keyboard controls, copy success/failure, and the starter with only the shared bundle. Never claim accessibility conformance from token colors alone; see `docs/accessibility.md`.

Pages: https://jeonkwan.github.io/swiss-atelier-design-system/
Repository: https://github.com/Jeonkwan/swiss-atelier-design-system
Current release: `v1.1.0`; use its complete tree and matching assets/guidance. Historical `v1.0.0` remains immutable. Do not create development-tag CDN URLs.

Preserve immutable release tags. Document user-visible changes in `CHANGELOG.md`; do not add unrelated infrastructure or modify sibling folders.
