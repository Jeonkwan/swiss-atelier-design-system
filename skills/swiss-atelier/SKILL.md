---
name: swiss-atelier
description: Create or edit technical explainers, architecture decision records, and editorial SVG diagrams using the Swiss Atelier design system. Use when the user requests Swiss Atelier or explicitly chooses its serif typography, hairline surfaces, and orange/teal semantics.
---
# Swiss Atelier

Build clear technical documents with Swiss grid discipline and warm editorial typography. Keep the user's subject and requested output format; this skill supplies the visual system.

## Load the maintained assets

Canonical site: https://jeonkwan.github.io/swiss-atelier-design-system/

1. Read the [discovery index](https://jeonkwan.github.io/swiss-atelier-design-system/llms.txt) and [starter](https://jeonkwan.github.io/swiss-atelier-design-system/templates/starter-adr.html). In this repository use `templates/starter-adr.html` directly.
2. Use the shared stylesheet and optional runtime; consuming pages do not need Tailwind or the specimen's `site.css` / `site.js`:

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/Jeonkwan/swiss-atelier-design-system@v1.0.0/dist/atelier.css">
<script src="https://cdn.jsdelivr.net/gh/Jeonkwan/swiss-atelier-design-system@v1.0.0/dist/atelier.js" defer></script>
```

3. Use [typed tokens](https://jeonkwan.github.io/swiss-atelier-design-system/dist/tokens.json) for exact values and the [stylesheet](https://jeonkwan.github.io/swiss-atelier-design-system/dist/atelier.css) for supported classes. If hosting locally, vendor these two assets and update paths. Do not use raw GitHub URLs as CSS/JS imports.
4. For single-file delivery, inline the shared CSS and needed runtime. Google Fonts still requires a network connection; use system fallbacks or appropriately licensed local fonts for fully offline delivery.

## Visual contract

- **Surfaces:** Gallery Stone `#F4F4F6` page, white `#FFFFFF` cards, Subtle Zinc `#E4E4E7` wells. Borders `1px solid #CBD5E1`, radius `4px`, no shadows or blur.
- **Display:** Fraunces 500, tracking `-0.02em`, for headings, section numerals, and headline metrics. Apply `atelier-h1`, `atelier-h2`, or `atelier-h3` explicitly.
- **Prose:** Literata 440, size `0.98rem`, line-height `1.68`, tracking `-0.005em`, measure `60ch–68ch`; use `atelier-prose`.
- **Chrome:** Geist for UI, tables, navigation, and sidenotes (`atelier-ui`); Geist Mono for code, ports, and badges (`atelier-mono`).
- **Meaning:** Orange `#D9381E` for one or two focal elements per view. Teal `#0F766E` for verified states, recommendations, and compliance. Muted `#57534E` for secondary metadata. Add labels, not just color.
- **Components:** `atelier-card`, `atelier-well`, `atelier-callout-focal`, `atelier-callout-verified`, `atelier-callout-note`, `atelier-badge-orange`, `atelier-badge-teal`, `atelier-badge-neutral`, `atelier-code-inline`, and `atelier-table` are public classes. Add layout CSS for the particular document.

## Diagrams and code

Place SVG nodes on a `4px` grid. Route off-axis connectors orthogonally with `8px` rounded elbows. Draw connectors before nodes and put labels on opaque masks so lines cannot cross text. Give each diagram an accessible title/description; allow horizontal scrolling inside its container on narrow screens.

Use `<pre data-atelier-code data-lang="rust">` for automatic line numbers and syntax highlighting. Supported common token sets include `rust`, `toml`, `sql`, `js`/`ts`, `py`/`python`, and `sh`/`shell`. Set one-based `data-focal-lines="3,5"` or `data-verified-lines="7"` when it adds meaning. Escape HTML source inside `<pre>`: `&lt;` for `<` and `&amp;` for `&`, including Rust generic types. For dynamically added blocks call `SwissAtelier.initAll()`; it skips processed blocks.

The highlighter is line-oriented, not a parser. For complex multiline strings/comments use a dedicated tokenizer with the public `.syn-*` classes, or manually mark tokens. Clipboard helper `SwissAtelier.copyToClipboard(text)` returns a promise: await it and show a failure message if it rejects.

## Verify delivery

Open the output at desktop and narrow mobile widths. Confirm the four typography roles, readable prose measure, and hairline surfaces. Check keyboard focus, meaningful heading order, named diagrams, table headers, labels for semantic colors, and reduced-motion behavior. Code should copy without line numbers and keep its original text. Color tokens alone do not establish WCAG conformance; check the actual text/background pair at the rendered size.

For changes to the system itself, read the repository's `AGENTS.md` and `CONTRIBUTING.md`. Build and validate before committing generated assets.
