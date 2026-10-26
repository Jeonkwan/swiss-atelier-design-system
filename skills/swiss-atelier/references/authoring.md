# From facts to an explanation

Use this method for an explainer or decision record. Reuse supplied answers; a filled brief is useful working context, not a compulsory interview or a required section in every output.

## Brief and evidence

Establish who is reading and what they already know; the question they must answer or action/decision they must take; the document kind and main conclusion; source facts with provenance; assumptions, conflicting accounts, and unknowns; and output constraints such as format, viewport, available assets/tools, and deadline. Infer routine layout choices. Ask only when an unresolved issue changes content or acceptance; otherwise state the assumption and proceed.

Separate observed, estimated, synthetic, and proposed claims. A recommendation or accepted decision does not prove its effect. Attach source/status to claims near where they may be copied. For a measurement record its value, units, definition/denominator, observation period, baseline/comparator, source, and uncertainty where relevant. If unavailable, say unknown; do not fill a metric component with invented data. Synthetic examples must say synthetic at the point of use. A quantitative mark needs a defined scale and mapping; remove decorative progress bars that look measured. A qualitative map must not imply measured distances or a numerical ordering of categorical guarantees.

## Outline and draft

- **Explanation:** answer/takeaway → context and terms needed by this audience → causal reasoning or worked example → limitations and next action. Adjust for the task; do not force a decision record onto an explanation.
- **ADR:** title + lifecycle status → decision in brief → context/forces → decision and reasons → consequences (benefits, costs, risks). Add alternatives, evidence, owner/date, and supersession links when useful. Keep unknown evidence visible. Draft/proposed, accepted, rejected, and superseded describe decision lifecycle; verified describes a specific supported claim, never the whole document by default. Copy the repository's `templates/starter-adr.html` or the matching hosted template from [distribution](distribution.md).
- Choose prose, table, or a scoped diagram for each question using [diagrams](diagrams.md). Introduce unfamiliar terms and put the explanation next to the relevant figure. Disclose supporting detail without hiding the main conclusion.

## Reader check and refinement

Give a reader only the draft and necessary task context. Ask them to state the conclusion/decision, why it follows, a material consequence or alternative, what remains uncertain, and what to do next. For diagrams ask them to explain scope, each relationship/direction/condition, a deliberate omission, and the takeaway. Try the text equivalent without the image. Correct the output where an answer cannot be traced to it; correct admissions of missing information count as success.

For a repeatable evaluation save the input, allowed references, expected answers separately from the reader prompt, actual answers, ambiguities, and resolutions. Label agent inspection as agent inspection. Use representative humans before claiming human comprehension; an agent check is not a usability study or accessibility audit.

This local method adapts [Google's audience guidance](https://developers.google.com/tech-writing/one/audience), [Diátaxis](https://www.diataxis.fr/start-here/), and [Nygard's ADR proposal](https://www.cognitect.com/blog/2011/11/15/documenting-architecture-decisions). These are practitioner frameworks, not proof of one ideal outline or font size.
