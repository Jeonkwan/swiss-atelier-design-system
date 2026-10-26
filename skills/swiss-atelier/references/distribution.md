# Keep guidance and assets together

Choose one source for the whole recipe. Local relative references in the skill folder resolve after copying that entire folder; repository templates and tokens must be copied/vendored separately or fetched from the same chosen source. This checkout contains 1.1.0; its additions are not in v1.0.0.

## Current-main consumption

The [site](https://jeonkwan.github.io/swiss-atelier-design-system/) and all Pages paths track the deployed `main` build. Fetch its [skill](https://jeonkwan.github.io/swiss-atelier-design-system/skills/swiss-atelier/SKILL.md), [tokens](https://jeonkwan.github.io/swiss-atelier-design-system/dist/tokens.json), [ADR template](https://jeonkwan.github.io/swiss-atelier-design-system/templates/starter-adr.html), and [diagram template](https://jeonkwan.github.io/swiss-atelier-design-system/templates/starter-diagram.html) from that same build. It is a moving target.

```html
<link rel="stylesheet" href="https://jeonkwan.github.io/swiss-atelier-design-system/dist/atelier.css">
<script src="https://jeonkwan.github.io/swiss-atelier-design-system/dist/atelier.js" defer></script>
```

## Immutable release consumption

Use the [entire v1.1.0 tree](https://github.com/Jeonkwan/swiss-atelier-design-system/tree/v1.1.0), including its complete skill folder (`agents/openai.yaml` and `references/`), templates, accessibility guide, and tokens. The skill requires explicit user invocation and preserves the requested output format.

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/Jeonkwan/swiss-atelier-design-system@v1.1.0/dist/atelier.css">
<script src="https://cdn.jsdelivr.net/gh/Jeonkwan/swiss-atelier-design-system@v1.1.0/dist/atelier.js" defer></script>
```

Matching tokens: https://cdn.jsdelivr.net/gh/Jeonkwan/swiss-atelier-design-system@v1.1.0/dist/tokens.json .

## Historical v1.0.0 consumption

For v1.0.0 use the [entire v1.0.0 tree](https://github.com/Jeonkwan/swiss-atelier-design-system/tree/v1.0.0), including that release's skill, template, accessibility guide, and tokens. It does not contain the newer authoring references, diagram starter, explicit-only invocation policy, or contextual text tokens. Do not apply 1.1.0 recipes to that old CSS.

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/Jeonkwan/swiss-atelier-design-system@v1.0.0/dist/atelier.css">
<script src="https://cdn.jsdelivr.net/gh/Jeonkwan/swiss-atelier-design-system@v1.0.0/dist/atelier.js" defer></script>
```

Matching tokens: https://cdn.jsdelivr.net/gh/Jeonkwan/swiss-atelier-design-system@v1.0.0/dist/tokens.json . For a future release, replace the ref consistently throughout the complete recipe only after that tag exists.

## Vendor a checkout

Copy `dist/atelier.css`, optional `dist/atelier.js`, `dist/tokens.json`, the chosen template, and matching guidance from one commit; record the commit. Template imports are relative to `../dist/`; adjust both when moving a page. Do not import raw GitHub CSS URLs. For single-file HTML inline the shared CSS and necessary runtime; the Google Fonts import still requires connectivity. The system has fallback fonts but does not promise identical offline typography.

The JSON generates shared CSS custom properties; `styles/atelier.css` consumes many of them. Changing `ink-focal`, for example, updates shared orange badge/code text and the specimen's contextual text roles, not orange brand strokes/fills. Some specimen colors, syntax demonstrations, layout coordinates, and treatment values are literal. This is a fixed-brand system with reusable roles, not a complete arbitrary-theme engine. Inspect affected contexts after changing a token.
