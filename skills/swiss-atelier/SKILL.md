---
name: swiss-atelier
description: Create or edit technical explainers, ADRs, and editorial diagrams with Swiss Atelier only when the user explicitly invokes $swiss-atelier or asks to use Swiss Atelier. Generic writing, diagram, or visual-style requests do not activate this skill.
---
# Swiss Atelier

Apply this skill only after an explicit user invocation, such as `$swiss-atelier` or “use Swiss Atelier.” Installation, discovery, a reference mention, or matching visual preferences does not activate it. Preserve the requested output format; if unspecified, retain the current conversation/document format. Create HTML only when the user requests HTML or a web page. Swiss supplies visual identity and an authoring method, not domain facts or permission to change formats.

## Establish the explanation

Reuse known audience, reader task, conclusion/decision, sources, unknowns, and delivery constraints. Ask only unresolved questions that would change the result. For drafting and reader checks, read [authoring](references/authoring.md). For any diagram, first choose its representation and define its semantics using [diagrams](references/diagrams.md). Missing evidence stays unknown.

## Load one coherent asset set

In this checkout, copy `templates/starter-adr.html` or `templates/starter-diagram.html`; both use the adjacent `dist/` bundle. Copy this entire skill directory, including `references/`, when installing it elsewhere.

For hosted use, see [distribution](references/distribution.md): choose current-main assets/guidance together, a complete immutable release, or a vendored checkout. Do not combine pinned CSS with later tokens or templates. Consumers need `atelier.css` and optionally `atelier.js`, never Tailwind or the specimen's `site.css`/`site.js`.

## Preserve the identity; adapt the layout

- **Identity:** Gallery Stone paper, white cards, Subtle Zinc wells, 1px hairlines, 4px radii, no shadows/blur. Fraunces display, Literata prose, Geist UI/tables, Geist Mono technical text. Use explicit `atelier-h1`/`h2`/`h3` classes.
- **Defaults:** Fraunces 500, tracking −0.02em; Literata 440, 0.98rem, line-height 1.68, tracking −0.005em, measure 60–68ch. Adapt size, measure, wrapping, and density for the reader and delivery surface; these are brand calibration, not universal readability evidence.
- **Signals:** Orange `--accent-primary` for one or two focal elements; teal `--accent-secondary` for recommendations or supported verification. State proposed/accepted/verified/unknown in words; acceptance is not empirical verification. Use `--ink-focal` / `--ink-positive` for small colored text on paper/tints. Check actual pairings.
- **Components:** `atelier-card`, `atelier-well`, `atelier-callout-focal`, `atelier-callout-verified`, `atelier-callout-note`, `atelier-badge-orange`/`teal`/`neutral`, `atelier-code-inline`/`focal`, `atelier-table`. Add document-local layout CSS. Tokens specify shared roles, not complete specimen re-theming.
- **Diagrams:** Structural 4px grid, orthogonal off-axis connectors with 8px elbows, connectors before nodes, opaque label masks. Font sizes need not follow the grid. Preserve readable labels at the rendered scale and local scrolling for essential two-dimensional views; provide a complete nearby text equivalent.

## Code and delivery

Use `<pre data-atelier-code data-lang="rust">`; escape source HTML (`&lt;`, `&amp;`). Common token sets: Rust, TOML, SQL, JS/TS, Python, shell. One-based `data-focal-lines="3,5"` and `data-verified-lines="7"` add styling, never evidence. `SwissAtelier.initAll()` processes new blocks; the highlighter is line-oriented, not a parser. For complex constructs use a dedicated tokenizer with `.syn-*` classes. Await `SwissAtelier.copyToClipboard(text)` and handle rejection.

Optional companions: doc-coauthoring can help with audience/structure/review; diagram-design with representation/semantics/layout. Keep Swiss fonts, colors, surfaces, and geometry; the user's format and constraints govern delivery. No companion installation, global edits, or external scripts are required. The linked methods work on their own.

Check the reader's conclusion, rationale, uncertainty, and next action; then inspect desktop/narrow layout, zoom/spacing, fallback fonts, keyboard focus, diagram equivalents, tables, and copy success/failure. Use the matching accessibility guide from your chosen checkout/release. This is a web-first system; print, no-JS, offline typography, and CJK extensions are outside the verified delivery scope.

For system changes, read repository `AGENTS.md` and `CONTRIBUTING.md`; build and test generated assets.
