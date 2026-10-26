# Reproducible reader cases

Run in an isolated reader context with only README, AGENTS, CONTRIBUTING, the complete Swiss skill folder, templates, llms.txt, accessibility guidance, and shared CSS/tokens as needed. Do not provide expected answers to the reader. Save actual output and distinguish agent inspection from human testing.

## Inputs for the reader

1. Draft a short ADR for maintainers: proposal is to vendor the Swiss bundle rather than depend on moving Pages assets. Supplied reason: reproducible presentation without Tailwind. Cost: manually updating vendored assets. Runtime performance has not been measured. Owner/date are unspecified. State audience, outcome, source facts, unknowns, outline, decision, rationale, consequences, and next action. Do not ask again for supplied context.
2. Choose representations for (a) conceptual service dependencies, (b) ordered request/retry/timeout messages between client and service with timeout duration and retry limit unknown, (c) a job lifecycle with queued → running on start and running → failed on error, other transitions unspecified, and (d) exact price/latency/features comparison. Explain arrow/boundary semantics and missing facts.
3. Use only the text equivalent in the portable diagram starter to recover its scope, entities, relationship directions, notation, omissions, and takeaway. Do not inspect its SVG.
4. Read the specimen's synthetic-metric note, shared parameter note, and table caption. Distinguish synthetic from observed/estimated data; explain units, denominator, period/source/uncertainty, hit-bar mapping, 1,500/1,800/2,000ms meanings and exact boundaries. Is any empirical claim verified?
5. Describe how to use the copied Swiss skill folder without Tailwind or companions, then with doc-coauthoring and diagram-design available. Which branding rules remain? What may adapt? How avoid mixing old CSS with new tokens?
6. Inspect the standalone diagram's long gateway/store names and describe the rendered checks required for narrow/zoomed layouts, fallback fonts, equivalents, and keyboard scrolling. Do not infer successful rendering from source alone.

## Expected outcomes (keep separate from reader prompt)

1. Draft/proposed status, maintainers as audience, vendoring decision and reproducibility reason, manual-update cost, unknown performance/owner/date, evidence request/assignment as next action; no invented benchmark or default verification.
2. Topology, sequence, state, table respectively; no made-up retry durations/limits or lifecycle edges. Named direction/guard and scope, no inferred security boundary. Prose for a single claim and numerical chart only with a numerical task/data.
3. Reader → gateway requests document; gateway → store fetches it. Three conceptual entities in an illustrative proposal, solid focal arrows, no trust boundary/capacity encoding; responses/auth/cache/retry/timeouts/deployment omitted; gateway mediates path.
4. Synthetic values, no empirical verification or observations. Latency in ms, hit fraction hits/all reads, blocked-read fraction for contention; period/sample/uncertainty unspecified; source fictional inputs; 94.6% width on 0–100%. Lease age >1,500 soft hedge, >2,000 expiry; exactly those boundaries excluded; independent replication-lag target <1,800. Rust excerpt incomplete.
5. Entire skill folder plus matching assets/templates or hosted build, public CSS and optional JS, no site/Tailwind dependencies; companions optional, Swiss visual identity wins, supplied user format respected. Size/measure/density adapt; whole historical release or one checkout, never mixed.
6. Wrap long names and retain readable minimum canvas with local named focusable scrolling; inspect actual desktop/320px/zoom/spacing/loaded+fallback rendering. Agent source inspection is no rendering or human/AT certification.
