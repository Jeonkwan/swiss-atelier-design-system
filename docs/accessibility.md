# Accessibility guidance

The specimen includes visible focus outlines, a skip link, arrow/Home/End navigation for tabs, tab/panel associations, accordion expanded state, filter pressed state, and clipboard status announcements. Reduced-motion preferences disable smooth scrolling and transitions. Wide code, tables, and diagrams scroll inside their containers.

Treat these as a starting point. The project has not received a full independent WCAG audit and does not claim AA or AAA conformance. Check text contrast against the actual surface and highlight fill at its rendered size. The original warm-stone comment color can fall below normal-text AA contrast on tinted highlights, so code-line highlights use the darker muted-ink color for comments. Recheck any new surface pairings. Do not convey status only through orange or teal.

When creating a page:

- Use a logical heading order and descriptive links; label interactive controls.
- Give SVG diagrams accessible titles, descriptions, or a nearby text explanation.
- Preserve table headers and add a caption explaining the comparison.
- Check keyboard operation, focus visibility, 200% zoom, and narrow screens.
- Copy code without decorative gutters; escape source before inserting HTML.
- Verify font fallbacks when Google Fonts is unavailable.

The lightweight highlighter operates line by line. Complex multiline language constructs need a dedicated tokenizer or manual markup. It does not validate the correctness of example source code.
