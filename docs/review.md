# Initial repository review — 2026-10-26

The Gemini export had a useful small-project structure: a specimen, distributable assets, portable skill, starter, and deployment files. The visual system was coherent, but several implementation and maintenance claims needed correction before publication.

| Finding | Resolution |
| --- | --- |
| Copyable imports and agent prompts contained host/user placeholders | Replaced with canonical repository, Pages, and pinned CDN URLs |
| Specimen compiled utility CSS in the browser from a third-party CDN | Added pinned build dependency and committed local generated CSS |
| Tokens were copied in CSS, inline specimen styles, guides, and a clipboard string | Typed token source now generates shared CSS; clipboard copies the actual stylesheet |
| JSON was described as W3C format but mixed untyped values with older color strings | Converted to DTCG 2025.10 typed values, with CSS mapping extensions; added spacing tokens |
| Regex replacements re-tokenized generated markup and split strings at URL/comment markers | Tokenize escaped source once; regression checks preserve exact text and inert HTML |
| Starter's Rust generic types were unescaped HTML | Escaped them so the runtime receives the complete example |
| Copy buttons reported success before the clipboard promise completed | Await successful copying and show failures; omit code line numbers from copied source |
| Tabs, accordions, filters lacked programmatic state and keyboard tab navigation | Added tab roles/associations, arrow keys, expanded/pressed state, focus styles, and status announcements |
| Runtime claimed tabs/accordions it did not implement | Documented the runtime's actual API and kept specimen interactions separate |
| Pages/GCS uploads copied the checkout indiscriminately | Added public-file allowlist and deploy only `_site/` |
| Public usage had no license, contributor workflow, or release guidance | Added MIT license, human/agent guides, contribution and release procedures |
| Broad AA/AAA claims were not backed by a complete audit | Removed blanket claims and documented contrast and accessibility limitations |

## Validation

Run `npm run build` and `npm test` to reproduce automated checks. Browser inspection covers the specimen, starter, narrow layouts, tabs, filters, accordions, clipboard behavior, and shared-bundle rendering. Deployment status and hosted endpoints are checked separately when publishing.

## Intentional limits

This is a static HTML/CSS/JS system, not a framework component library. There is no need to add React, a package registry, a documentation framework, or GCS infrastructure to meet the current goal. The runtime is a line-oriented display highlighter. Google Fonts remains an external typography dependency. Accessibility needs to be verified for each consuming document.

References: [DTCG format 2025.10](https://www.designtokens.org/tr/2025.10/format/) and [GitHub Pages custom workflows](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages).
