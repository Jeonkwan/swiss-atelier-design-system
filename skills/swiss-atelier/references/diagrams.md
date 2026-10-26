# Choose and explain a representation

Write the reader's question and takeaway before drawing. A picture is useful only if its organization helps answer that question.

| Reader question | Use | Semantic contract |
| --- | --- | --- |
| What is the single conclusion? | Prose | State the claim, reason, and uncertainty directly. |
| Which option has exactly which properties? | Table | Named rows/columns, units, definitions, sources, missing values. |
| What exists and how is it connected? | Architecture/topology | Name scope and abstraction; boxes are entities at that level; directed labeled edges assert a specific dependency or flow. Boundaries mean named ownership, trust, deployment, or scope only when stated. |
| Who sends what, in what order? | Sequence | Actors/lifelines, top-to-bottom ordering; arrows name messages and their direction; declare request/return styles. Vertical distance is not elapsed time unless scaled. |
| What can change and under which event/guard? | State | One entity's legal states; directed transitions labeled `event [guard] / action` as applicable; define initial/terminal states if known. No arrow means no asserted transition in the declared scope. |
| How do numerical values compare or change? | Chart, if data exists | Identify the numerical task, units, domain, scale, baseline, period, source, and uncertainty. Status colors are not automatically an appropriate data palette. |

## Before layout

Declare actual versus proposed/illustrative, audience, system/entity, scope, abstraction, source facts, and unknowns. List entities and meaningful relationships before styling. Label the intent of every arrow; name boundary, direction, color, line style, and size semantics in a key when they carry meaning. Decorative frames are not implicitly security boundaries. Do not invent services, retry policies, timings, or arrows to complete a shape.

For a **retry/timeout sequence**, establish initiator, receiver, request/response, timeout event, retry eligibility, attempt limit, and final failure behavior. If any is unknown, name it; use a note or a separate unresolved branch instead of inventing a duration or an extra service. Distinguish a return from another request, show conditional/repeated paths explicitly, and say which failures are omitted. Sequence communicates interaction order; use a state view when the question is which transitions are legal.

For a **lifecycle**, name the entity and event/guard for each transition. Define the time variable (age, remaining TTL, or replication lag) before writing thresholds. Preserve exact inequality boundaries across prose, configuration, code, and tables. If the source specifies only selected transitions, mark that scope rather than presenting an incomplete view as a full state model.

For a **system overview**, keep one abstraction per view, identify ownership/trust boundaries only if known, and separate message order into a linked sequence. Counts, legend, caption, and relationship summary must agree.

## Layout and equivalent explanation

Use Swiss typography and hairline surfaces. The 4px grid controls structural coordinates, not font sizes or a rigid node/label count. Route off-axis connectors orthogonally with 8px elbows; draw connectors before nodes and use opaque masks behind labels. Fit boxes to labels, wrap long text, and prefer overview + detail when a single canvas becomes dense. Report every material simplification and where the omitted detail or unknown is recorded.

Choose label size from the destination. The shipped examples use at least 14 CSS pixels at their minimum canvas width; this is a local starting point, not a WCAG minimum. Do not shrink a 960-unit canvas into a phone width. Use a named, keyboard-focusable local scrolling region, visible scroll guidance, and inspect loaded/fallback fonts, narrow screens, zoom, and user spacing. Split a diagram if scrolling obscures its reading path.

Give SVG a useful `<title>` and `<desc>` with resolvable IDs. Add nearby structured text containing the same entities, directed relationships, guards, scope, omissions, and takeaway. Associate it using `aria-describedby` when appropriate. A generic name or repeated title is not a complex-image equivalent.

Read the figure without oral narration, then read its text equivalent without the figure. Can both answer the same task? See the portable `templates/starter-diagram.html` in a checkout or its matching hosted copy via [distribution](distribution.md).

This method borrows clarity checks from the [C4 checklist](https://c4model.com/diagrams/checklist), without requiring C4 for every diagram, and text alternatives from [W3C complex-image guidance](https://www.w3.org/WAI/tutorials/images/complex/). Swiss geometry and typography remain local brand choices.
