# Accessibility guidance

Swiss is a web-first starting point, with no full independent WCAG audit or AA/AAA conformance claim. Agent reader checks and deterministic contrast calculations are separate from human usability and assistive-technology testing.

## Actual foreground/surface roles

Keep brand orange `--accent-primary` and teal `--accent-secondary` for focal fills/strokes. Small colored text on paper or tinted surfaces uses `--ink-focal` (#B82D16) or `--ink-positive` (#0D635C). Orange badges and focal inline code use the former; teal badges use the latter. Comments on paper and tinted code lines use `--ink-code` (#57534E); ordinary `.syn-cm` text on white continues to consume the original `--syn-comment`, preserving existing overrides.

The regression suite calculates opaque sRGB pairings from actual tokens, including white/paper/subtle surfaces, badge fills, and composited 75% code highlights. It requires at least 4.5:1 for approved small-text pairs and 3:1 for essential arrows and focus cues. It does not model anti-aliasing, arbitrary consumer overrides, or every possible token combination. Hairline card borders are decorative; do not use their low contrast as the only cue identifying a control or meaningful relationship.

Approved contextual pair ratios (rounded for reporting; tests use unrounded values): focal/accent-soft 5.35:1, focal/paper 5.58:1, positive/subtle 5.60:1, positive/teal-soft 6.30:1, code-comment/paper 6.95:1.

Normal text requires 4.5:1, with defined exceptions such as large text; see [W3C contrast guidance](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html). Check the actual cascade and surface. Do not round a failing ratio up to a pass. Pair color with a factual label; a teal component or `data-verified-lines` attribute does not establish verification.

## Diagrams and equivalents

Each shipped SVG has a useful title, description, and associated nearby equivalent. The equivalent states entities, directed relationships, guards, notation, scope, deliberate omissions, and takeaway. It must work independently of the image; a repeated title is insufficient. See [complex-image guidance](https://www.w3.org/WAI/tutorials/images/complex/).

The three large specimen figures and diagram starter use a 960px minimum canvas with labels of at least 14 CSS pixels; the qualitative map uses 640px with the same label floor. This is a project choice, not a WCAG minimum font size. Named focusable scroll regions preserve essential two-dimensional layouts. Scroll guidance and the text equivalent remain in normal reading flow. Long labels wrap inside nodes; enlarge or split a figure when needed.

Inspect at a 320px viewport, 200% and 400% browser zoom, and with user text spacing (line-height 1.5, paragraph spacing 2em, letter spacing .12em, word spacing .16em). Check page reflow separately from local diagram/table/code scrolling. Test loaded and blocked external fonts. See [reflow](https://www.w3.org/WAI/WCAG22/Understanding/reflow.html) and [text spacing](https://www.w3.org/WAI/WCAG22/Understanding/text-spacing.html). Spacing values are test overrides, not required defaults.

## Interaction and delivery checks

- Logical heading order, descriptive links, named controls, visible keyboard focus, and a skip link.
- Arrow/Home/End tab navigation, tab/panel associations, accordion expanded state, and filter pressed state.
- Local code/table/diagram scrolling by keyboard; no page-wide overflow.
- Table headers and captions; text labels for semantic colors.
- Clipboard success and failure announcements; copied source excludes line gutters.
- Reduced-motion behavior, font fallbacks, and absence of clipped text after zoom/spacing.

The highlighter is line-oriented, not a parser or source-code validator. Print, no-JS tab reading, fully offline typography, and multilingual/CJK delivery extensions remain deferred. Do not infer support for those modes from web checks.
