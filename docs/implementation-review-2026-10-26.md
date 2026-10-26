# Swiss Atelier implementation review

Date: 2026-10-26 (Asia/Shanghai). Scope: authorized R01–R09 implementation; R10 delivery extensions deferred. Release preparation: **1.1.0**, following the user's authorization to push and publish. Deployment and release results are verified separately through GitHub Actions and live asset checks.

## Baseline and preservation

The checkout was `main` at `d69be22e3fd6a88c1cfbd4ccc1ba96723da32119`, matching the evaluation and immutable `v1.0.0` tag. Initial status contained only untracked `docs/research/`. Baseline `npm ci`, build, three runtime tests, and public-file checks passed. The reported authoring, diagram, contrast, metric, starter, numbering, and mixed-release gaps were rechecked before editing.

The five existing research files are preserved byte-for-byte, including their historical proposal/authorization wording. They remain local and uncommitted, outside both the release commit and the Pages allowlist. No framework or sibling-project edit was made. The later user instruction authorizes committing, pushing, and publishing the implementation as a new release; the existing `v1.0.0` tag remains untouched.

## Completed recommendations and changed files

| ID | Result | Files |
| --- | --- | --- |
| R01 | Reuse audience/task/context; establish facts and unknowns; choose an appropriate outline; verify conclusion, reasoning, consequences, uncertainty, and next action. No compulsory interview for supplied facts. | `skills/swiss-atelier/SKILL.md`, new `references/authoring.md` within that skill, `README.md`, `CONTRIBUTING.md` |
| R02 | Prose/table/topology/sequence/state/chart selector; scope, direction, boundary, notation, omission and source contracts; retry/timeout unknowns; corrected four-entity topology. | New skill `references/diagrams.md`, `index.html`, new `templates/starter-diagram.html` |
| R03 | Add contextual focal/positive/comment ink while retaining brand hues and existing token names. Rework four SVGs with readable labels, names/descriptions, complete associated equivalents, and keyboard-scrollable local regions. Header becomes static in short viewports so high zoom leaves a reading area. | `dist/tokens.json`, `styles/atelier.css`, `styles/site.css`, `index.html`, diagram starter, `docs/accessibility.md`; generated `dist/atelier.css` and `dist/site.css` |
| R04 | Label synthetic evidence where copied, remove unsupported verified/SLA claims, remove three undefined bars, define the hit-ratio bar, separate lease age and replication lag with exact inequalities, label the map as qualitative. | `index.html`, ADR/integration starters, authoring reference |
| R05 | Genuine draft ADR with context, decision/reasons, alternatives, consequences, evidence/unknowns, and next action. Preserve the original integration example separately. Add one portable conceptual topology with an independent equivalent. | Revised `templates/starter-adr.html`; new `templates/starter-integration.html`, `templates/starter-diagram.html` |
| R06 | Early human/agent/template/contributor paths; clear fictional specimen boundary; aligned module/figure numbering. | `README.md`, `index.html`, `llms.txt` |
| R07 | Optional authoring/diagram companions with Swiss branding and user constraints retained. Self-contained references work without companions; no global skill changes or external-script dependencies. | Swiss skill/references, `README.md`, `AGENTS.md`, `CONTRIBUTING.md`, `llms.txt` |
| R08 | Distinguish identity, calibration defaults, and delivery adaptations. Explain fixed-brand token coverage. Use coherent current-main, vendored, or complete release recipes. Promote the reviewed minor candidate to 1.1.0 for authorized publication. | New skill `references/distribution.md`, `AGENTS.md`, `CLAUDE.md`, `README.md`, `CONTRIBUTING.md`, `llms.txt`, `CHANGELOG.md`, `package.json`, `package-lock.json`, token metadata, `dist/atelier.js`, `scripts/build.mjs`, `index.html`; `scripts/site.js` and generated `dist/site.js` expose new text-role swatches |
| R09 | Actual approved contrast pairs, essential cues, SVG associations, public Markdown/HTML/project links, release coherence, public-only templates, preserved source, saved reader cases and rendered results. | New `tests/presentation.test.cjs`, `tests/reader-cases.md`, revised `scripts/check.mjs`, this report; existing runtime tests retained |

The portable skill entry point is 35 lines, with three focused references. Following the user's invocation clarification, `agents/openai.yaml` disables implicit invocation; the skill and consumer guides require an explicit `$swiss-atelier` or request to use Swiss Atelier, preserve the requested format, and require an HTML/web-page request before creating HTML. Original public classes, tokens, runtime methods, typography families, hairline surfaces, orange/teal brand hues, and static HTML/CSS/JS architecture remain.

## Deterministic validation

- `npm ci`: passed, with existing dependency install-script notices. No dependency version was changed.
- `npm run build`: passed. CSS and site JS regenerated from their documented sources.
- `npm test`: seven tests passed (four presentation/compatibility checks plus three existing runtime regressions), followed by public-file validation.
- Public-file validation resolves local and canonical Pages project links in HTML/Markdown, checks HTML fragments and SVG description IDs, requires nearby SVG equivalents, checks generated token coverage, and excludes private deployment directories. Domain-root links are rejected because they break project-subpath hosting.
- Approved normal-text pairs pass unrounded ≥4.5:1; essential arrows/focus cues pass ≥3:1. Examples: focal/accent-soft **5.35:1**, focal/paper **5.58:1**, positive/subtle **5.60:1**, positive/teal-soft **6.30:1**, comment/paper **6.95:1**. Syntax colors are checked on white, paper, and the actual composited 75% white-backed highlights.
- Skill Creator's `quick_validate.py`: passed using an existing local PyYAML installation. It validates skill structure/frontmatter, not behavior.
- `git diff --check`: passed. Existing token keys, public CSS selectors, runtime API, and the original release target were checked for preservation.
- Release preparation: clean offline dependency installation, 1.1.0 build, seven tests and 26 public-file checks passed. The specimen and all three templates were checked again at 1440px and 320px with no page overflow or JavaScript errors. Research hashes and every existing locked dependency record matched the originals; the packaged invocation policy remains explicit-only.

The build reports its pre-existing stale Browserslist database notice. Updating dependency metadata was outside this implementation.

## Rendered and interaction checks

Playwright CLI drove a real Chromium browser against the built artifact under `/swiss-atelier-design-system/`, exercising project-subpath imports. Browser automation used an existing cached CLI after the registry fetch failed in the restricted environment; a loopback-only preview server was used.

| Check | Observation |
| --- | --- |
| Specimen + all three templates at 1440, 640, 390, and 320 CSS px | Document scroll width equals viewport width. Wide figures/code/tables scroll locally. |
| Diagram label scale | Minimum rendered SVG label size is 14 CSS px on the specimen figures and starter, with 960px canvases (640px qualitative map). This is local calibration, not a WCAG minimum. |
| Loaded fonts | Fraunces, Literata, Geist, and Geist Mono loaded. Diagram label bounds checked in all three tab views and the starter. |
| Blocked font hosts | Separate pages blocked Google Fonts CSS/fonts; system fallbacks rendered. Diagram label bounds and page width remained within the intended layouts. |
| User spacing | Line-height 1.5, paragraph spacing 2em, letter spacing .12em, word spacing .16em: no page overflow. A long gateway label initially exceeded its node with the loaded font; splitting it into “Documentation” / “request gateway” resolved the finding. All diagram views were rechecked with loaded/fallback fonts and spacing. |
| Zoom | Native Chrome zoom was explicitly confirmed at 200% and 400% for the diagram starter and all three specimen views (topology, sequence, state). At 200%: 600×398 CSS-pixel viewport and 600px page scroll width. At 400%: 300×199 CSS-pixel viewport and 300px page scroll width. All views retained 14px minimum SVG labels and working local keyboard scrolling. A 320×213px check found the sticky header occupied 195px; short-view header positioning was corrected and rechecked. The preview was reset to 100% and its temporary tab closed. |
| Keyboard | Skip link visible on first Tab; diagram/code/guide tabs including arrows/Home/End; matrix filter state; accordion expanded state; named diagram region scrolls with ArrowRight. |
| Clipboard | Browser copy preserved source without gutters; forced rejection announced failure. Runtime promise success/rejection tests also pass. |
| Standalone integration | Only public CSS/runtime loaded; automatic highlighting preserved literal Rust generics. |
| Reduced motion | Computed document scroll behavior becomes `auto`. |

Screenshots and browser check scripts are saved locally in ignored `output/playwright/`. Relevant images include `desktop.png`, the three `*-desktop.png` diagram captures, `specimen-320.png`, the three `starter-*-320.png` captures, and loaded/fallback spacing captures. These are review artifacts, excluded from the published site. Some element screenshots clip content to the current browser view; use full-page starter captures and scroll the live preview for complete figures.

Follow-up browser-tab inspection resolved the app-level blank capture and confirmed the specimen was loaded. After the Mac was unlocked, native 200% and 400% checks passed for all three diagram views. Metrics and screenshots are saved in `output/playwright/native-zoom-results.json`, `native-200-*.jpg`, and `native-400-*.jpg`. Reset was verified at 100% (1200×797 CSS-pixel viewport, 1200px page scroll width, device-pixel ratio 2); the temporary native preview tab was closed. No native zoom check remains pending.

## Saved reader checks

Inputs, allowed references, and separate expected outcomes are saved in repository `tests/reader-cases.md` (tests are excluded from Pages). An independent context-isolated agent received only the task inputs and permitted consumer guidance. It did not receive the expected answers, evaluation, research packet, or implementation diff.

| Case | Actual reader answer | Ambiguity/resolution |
| --- | --- | --- |
| ADR with missing evidence | Produced a proposed vendoring ADR for maintainers, with reproducibility reason, manual-update cost, unknown performance/owner/date, and next action to record a commit and assign ownership. Distinguished acceptance from performance verification. | Added update cadence/offline typography as explicit unknowns, with no invented benchmark. |
| Representation choices | Chose topology for conceptual dependencies, sequence for ordered retry/timeout messages, scoped state for queued → running → failed, and a table for exact comparison. Did not add timings, retries, success/cancellation states, or trust boundaries. | Correctly treated omitted lifecycle transitions as unspecified, not impossible. |
| Text equivalent alone | Recovered reader → gateway → store, three conceptual entities, request direction, decorative frame, no capacity meaning, omitted response/auth/cache/retry/deployment behavior, and the mediation takeaway. | No material guidance gap found; SVG was excluded for this case. |
| Evidence and thresholds | Identified synthetic data, all units/denominators, missing period/sample/uncertainty, fictional source, percentage-width mapping, and separate >1,500 / <1,800 / >2,000ms quantities. No empirical verification inferred. | First reader's locating search exposed four non-note code lines. A second fresh agent received only the three exact notes; it independently recovered the same answers and distinguished lease age 1,800ms from replication lag 1,800ms. |
| Portability and composition | Explained complete skill-folder copying plus matching bundle/tokens/templates; no Tailwind or mandatory companions; Swiss identity retained; dimensions/density adaptable; whole checkout/release consumption. | Composition was evaluated through the written contract, not a companion tool's export pipeline. |
| Long labels and delivery | Required actual font/viewport/spacing/zoom/keyboard checks and independent equivalents. Explicitly refused to infer successful rendering from CSS/source alone. | Browser work above independently exercised these requirements. |

These are agent inspection/forward-tests, not representative human comprehension tests. No full assistive-technology or cross-browser accessibility audit was performed.

## Compatibility, limits, and publication implications

Version **1.1.0** is a compatible minor release because it adds public token roles, diagram classes, templates, and guidance. Runtime signatures and original token/class names remain. Intentional visual corrections change small-text colors, diagram layout, and short-viewport header positioning. Consumers with overrides should review those contexts. The skill now requires explicit user invocation and preserves the requested format; HTML requires an HTML/web-page request.

No numerical storage-engine or concurrency guarantee is established by the specimen. Its Rust/SQL/TOML fragments remain illustrative and incomplete. Human reader studies, full screen-reader/cross-browser testing, and actual companion export workflows remain outside the evidence collected here.

R10 print/no-JS/offline typography/CJK extensions remain deferred. External fonts still require connectivity; fallback rendering is checked but does not promise identical offline typography. Fixed-brand token roles do not imply complete arbitrary re-theming.

For the authorized publication, version references and complete pinned recipes use `v1.1.0`. The packager now lists individual public documentation files and the checker rejects `docs/research/` in the artifact. The five original research documents remain uncommitted and unchanged. Release review also restored an existing dependency's original lockfile version label; no dependency versions were upgraded. Build/tests and generated-asset checks precede the push; GitHub Actions and live Pages/CDN assets are checked afterward. Preserve `v1.0.0` unchanged.
