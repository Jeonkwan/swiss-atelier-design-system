/**
 * Swiss Atelier Design System Runtime (v1.0.0)
 * Provides automatic client-side syntax highlighting, line-number gutters,
 * focal/verified line callouts and clipboard helpers.
 */
(function (window, document) {
  'use strict';

  function escapeHtml(str) {
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
  }

  /** Line-oriented, best-effort tokenizer. Escape source once, never re-tokenize HTML. */
  function highlightLine(rawLine, lang) {
    const hashComments = ['toml', 'py', 'python', 'sh', 'shell', 'bash'].includes(lang);
    const keyword = /^(pub|fn|let|mut|return|if|else|match|unsafe|impl|struct|enum|use|async|await|const|where|for|in|function|export|import|def|class|self|try|catch|throw|var|while|from|as|pass|and|or|not|SELECT|FROM|WHERE|AND|OR|GROUP|BY|ORDER|HAVING|AS|WITHIN)$/;
    const types = /^(Result|Option|Arc|Box|Vec|String|SnapshotPage|HlcTimestamp|ReadFallback|Instant|Ordering|Self|u64|usize|bool)$/;
    const constants = /^(Ok|Err|Some|None|Acquire|Release|SeqCst|RouteToQuorum|[A-Z][A-Z0-9_]+|true|false|True|False|None|null)$/;
    if ((lang === 'rust' && /^\s*#\[.*\]\s*$/.test(rawLine)) || (lang === 'toml' && /^\s*\[\[?[^\]]+\]\]?\s*(#.*)?$/.test(rawLine))) {
      return '<span class="syn-at">' + escapeHtml(rawLine) + '</span>';
    }
    const pattern = /"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|`(?:\\.|[^`\\])*`|\/\/.*|--.*|#.*|[A-Za-z_][A-Za-z0-9_]*|\d+(?:\.\d+)?|[^\w\s]|\s+/g;
    let html = '';
    let match;
    // Tokenize raw source; quoted strings consume comment markers and keywords.
    while ((match = pattern.exec(rawLine))) {
      let text = match[0];
      let cls = '';
      if ((hashComments && text.startsWith('#')) || (lang === 'sql' && text.startsWith('--')) || (!hashComments && lang !== 'sql' && text.startsWith('//'))) {
        html += '<span class="syn-cm">' + escapeHtml(rawLine.slice(match.index)) + '</span>';
        break;
      }
      // A marker from another language is punctuation, not a trailing comment.
      if (/^(#|--|\/\/)/.test(text)) {
        pattern.lastIndex = match.index + (text.startsWith('#') ? 1 : 2);
        text = text.startsWith('#') ? '#' : text.slice(0, 2);
        cls = 'syn-op';
      } else if (/^["'`]/.test(text)) cls = 'syn-st';
      else if (keyword.test(text)) cls = 'syn-kw';
      else if (types.test(text)) cls = 'syn-ty';
      else if (constants.test(text) || /^\d/.test(text)) cls = 'syn-cn';
      else if (/^[A-Za-z_]/.test(text) && /^\s*\(/.test(rawLine.slice(pattern.lastIndex))) cls = 'syn-fn';
      else if (/^[^\w\s]/.test(text)) cls = 'syn-op';
      html += cls ? '<span class="' + cls + '">' + escapeHtml(text) + '</span>' : escapeHtml(text);
    }
    return html;
  }

  /**
   * Auto-formats any <pre data-atelier-code> block with line numbers, syntax tokens,
   * and optional data-focal-lines="4" / data-verified-lines="6" highlights.
   */
  function initAutoCodeBlocks() {
    const blocks = document.querySelectorAll('[data-atelier-code]');
    blocks.forEach((block) => {
      if (block.dataset.atelierProcessed === 'true') return;
      const lang = (block.getAttribute('data-lang') || 'rust').toLowerCase();
      const focalSet = new Set(
        (block.getAttribute('data-focal-lines') || '')
          .split(',')
          .map((s) => parseInt(s.trim(), 10))
          .filter(Boolean)
      );
      const verifiedSet = new Set(
        (block.getAttribute('data-verified-lines') || '')
          .split(',')
          .map((s) => parseInt(s.trim(), 10))
          .filter(Boolean)
      );

      const rawText = block.textContent.replace(/^\n+|\n+$/g, '');
      const lines = rawText.split('\n');
      block.innerHTML = '';

      lines.forEach((lineText, idx) => {
        const lineNum = idx + 1;
        const numStr = lineNum < 10 ? '0' + lineNum : String(lineNum);
        const div = document.createElement('span');
        let cls = 'atelier-code-line';
        let lnStyle = '';
        if (focalSet.has(lineNum)) {
          cls += ' atelier-code-line-focal';
          lnStyle = 'color:var(--accent-primary);font-weight:600;';
        } else if (verifiedSet.has(lineNum)) {
          cls += ' atelier-code-line-verified';
          lnStyle = 'color:var(--accent-secondary);font-weight:600;';
        }
        div.className = cls;
        div.innerHTML =
          '<span aria-hidden="true" class="syn-ln" style="' + lnStyle + '">' + numStr + '</span>' +
          highlightLine(lineText, lang);
        block.appendChild(div);
      });

      block.dataset.atelierProcessed = 'true';
      block.dataset.rawCode = rawText;
    });
  }

  async function copyToClipboard(text, onDone) {
    if (window.navigator.clipboard && window.navigator.clipboard.writeText) {
      await window.navigator.clipboard.writeText(text);
    } else {
      const textarea = document.createElement('textarea');
      textarea.value = text;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      try {
        textarea.select();
        if (!document.execCommand('copy')) throw new Error('Clipboard unavailable');
      } finally { textarea.remove(); }
    }
    if (onDone) onDone();
  }

  function initAll() {
    initAutoCodeBlocks();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAll);
  } else {
    initAll();
  }

  window.SwissAtelier = {
    version: '1.0.0',
    initAll: initAll,
    highlightLine: highlightLine,
    copyToClipboard: copyToClipboard
  };
})(window, document);
