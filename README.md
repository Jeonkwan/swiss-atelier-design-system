# Swiss Atelier

A living information design system for technical explainers, architecture decision records, and editorial SVG diagrams. Swiss grid discipline meets Fraunces headings, Literata prose, and Geist UI and code.

**[Explore the living system](https://jeonkwan.github.io/swiss-atelier-design-system/)** · **[Open the starter](https://jeonkwan.github.io/swiss-atelier-design-system/templates/starter-adr.html)** · **[Agent skill](skills/swiss-atelier/SKILL.md)** · **[Contribute](CONTRIBUTING.md)**

## Use it in a page

Import the shared stylesheet and optional syntax-highlighting runtime. No framework or Tailwind dependency is required by consuming pages.

```html
<link rel="stylesheet" href="https://jeonkwan.github.io/swiss-atelier-design-system/dist/atelier.css">
<script src="https://jeonkwan.github.io/swiss-atelier-design-system/dist/atelier.js" defer></script>

<article class="atelier-card" style="padding: 2rem;">
  <h1 class="atelier-h1">A clear technical decision</h1>
  <p class="atelier-prose">Describe the context, tradeoffs, and outcome.</p>
  <pre data-atelier-code data-lang="js" data-focal-lines="1">const decision = "adopt";</pre>
</article>
```

Start with [templates/starter-adr.html](templates/starter-adr.html), which demonstrates the public classes. When copying it into another project, update its two relative imports to the absolute URLs above or vendor `dist/atelier.css` and `dist/atelier.js` alongside your page. Use `atelier-h1` / `atelier-h2` / `atelier-h3` for headings; the bundle deliberately does not restyle every heading automatically.

The Pages URLs follow `main`. For a fixed release, use:

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/Jeonkwan/swiss-atelier-design-system@v1.0.0/dist/atelier.css">
<script src="https://cdn.jsdelivr.net/gh/Jeonkwan/swiss-atelier-design-system@v1.0.0/dist/atelier.js" defer></script>
```

Fonts load from Google Fonts through CSS. System fallbacks remain available if the network is blocked. For a fully offline page, vendor appropriately licensed font files and replace the Google Fonts import. The line-oriented highlighter supports common Rust, TOML, SQL, JavaScript/TypeScript, Python, and shell tokens; it is a display helper, not a language parser. Dynamic code blocks can be formatted by calling `SwissAtelier.initAll()` again.

## Use it with an agent

Give an agent the [hosted skill](https://jeonkwan.github.io/swiss-atelier-design-system/skills/swiss-atelier/SKILL.md), [token file](https://jeonkwan.github.io/swiss-atelier-design-system/dist/tokens.json), and [starter](https://jeonkwan.github.io/swiss-atelier-design-system/templates/starter-adr.html), or use this prompt:

> Use Swiss Atelier for this page. Read https://jeonkwan.github.io/swiss-atelier-design-system/llms.txt and follow its linked skill. Import the shared CSS and runtime, preserve the typography and semantic colors, and verify keyboard access and mobile layout.

For an agent that supports local skills, copy `skills/swiss-atelier/` into its skill directory. For example, from this checkout into another project's `.agents/skills/`:

```sh
mkdir -p /path/to/project/.agents/skills
cp -R skills/swiss-atelier /path/to/project/.agents/skills/
```

Use the directory supported by your agent. A hosted `SKILL.md` or `llms.txt` helps discovery; it does not automatically install or activate a skill. Repository contributors should read [AGENTS.md](AGENTS.md).

## Run and maintain locally

Requires Node.js 22+ and Python 3 for the preview server.

```sh
npm ci
npm run build
npm test
npm run preview
```

Open [localhost:4173](http://localhost:4173). Built output lives in `_site/`. Pull requests run build and validation; pushes to `main` also publish GitHub Pages. Pages must use **Settings → Pages → Source → GitHub Actions**. See [the publishing guide](docs/publishing.md).

| Location | Purpose |
| --- | --- |
| `index.html` | Nine-module living specimen and interactive documentation |
| `dist/tokens.json` | Editable DTCG 2025.10 typed design tokens and CSS-name extensions |
| `styles/atelier.css` | Editable shared component styles |
| `styles/site.css`, `scripts/site.js` | Specimen-only styles and interactions |
| `dist/atelier.css`, `dist/atelier.js` | Public stylesheet and browser runtime; CSS is generated, JS is maintained directly |
| `dist/site.css`, `dist/site.js` | Generated specimen assets; not required by consumers |
| `templates/` | Working examples using only the public bundle |
| `skills/swiss-atelier/` | Portable agent skill and UI metadata |
| `scripts/`, `tests/` | Build, public-file packaging, link checks, runtime regressions |
| `docs/`, `CONTRIBUTING.md` | Human guidance, release process, and initial review |
| `deploy/` | Optional legacy GCS deployment; not used for Pages |

## Design contract

Gallery Stone paper `#F4F4F6`, white cards, `1px` hairline borders, `4px` radii, no shadows. Fraunces 500 headings, Literata 440 prose, Geist UI, Geist Mono code. Reserve orange `#D9381E` for one or two focal elements; use teal `#0F766E` for verified states. Diagrams use a `4px` grid and orthogonal connectors with rounded elbows. Communicate state in labels as well as color. See the [accessibility guidance](docs/accessibility.md).

## License and provenance

MIT; see [LICENSE](LICENSE). This project began as a Gemini-generated design-system export and was reviewed and prepared for public maintenance. Font software is provided separately by Google Fonts under its respective licenses. Tailwind is a development dependency, not a runtime requirement.
