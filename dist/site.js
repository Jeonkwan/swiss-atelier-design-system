    const SWATCHES = [
      { name: 'Gallery Stone', role: '--bg-paper' },
      { name: 'Pure Surface', role: '--bg-surface' },
      { name: 'Subtle Well', role: '--bg-subtle' },
      { name: 'Hairline Rule', role: '--border-color' },
      { name: 'Primary Ink', role: '--ink-primary' },
      { name: 'Secondary Ink', role: '--ink-secondary' },
      { name: 'Zurich Orange', role: '--accent-primary' },
      { name: 'Deep Teal', role: '--accent-secondary' },
      { name: 'Syntax Keyword', role: '--syn-keyword' },
      { name: 'Syntax Type', role: '--syn-type' },
      { name: 'Syntax Function', role: '--syn-fn' },
      { name: 'Syntax Constant', role: '--syn-const' },
      { name: 'Syntax String', role: '--syn-string' },
      { name: 'Syntax Macro', role: '--syn-attr' }
    ];

    function showToast(msg) {
      const el = document.getElementById('toastMsg');
      el.textContent = msg;
      el.classList.remove('hidden');
      clearTimeout(window._toastTimer);
      window._toastTimer = setTimeout(() => el.classList.add('hidden'), 2200);
    }

    async function copyToClipboard(text, msg) {
      try {
        await window.SwissAtelier.copyToClipboard(text);
        showToast(msg || 'Copied!');
      } catch (error) {
        showToast('Copy failed. Select the text and copy it manually.');
      }
    }

    // 1. Render Swatches
    const swatchGrid = document.getElementById('swatchGrid');
    SWATCHES.forEach(s => {
      s.hex = getComputedStyle(document.documentElement).getPropertyValue(s.role).trim();
      const btn = document.createElement('button');
      btn.className = 'text-left p-2.5 rounded-[4px] bg-[#F4F4F6] border border-[#CBD5E1] hover:border-[#141413] transition';
      btn.innerHTML = `
        <div class="w-full h-9 rounded-[3px] border border-black/15 mb-2" style="background-color: ${s.hex};"></div>
        <div class="font-ui text-xs font-semibold text-[#141413] truncate">${s.name}</div>
        <div class="font-mono-code text-[10px] text-[#57534E] truncate">${s.role}</div>
        <div class="font-mono-code text-[11px] font-semibold text-[#D9381E] mt-0.5">${s.hex}</div>
      `;
      btn.addEventListener('click', () => copyToClipboard(s.hex, `Copied ${s.name} (${s.hex})`));
      swatchGrid.appendChild(btn);
    });

    // 2. Diagram Tabs
    const diagButtons = document.querySelectorAll('#diagramTabs button');
    diagButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const target = btn.getAttribute('data-diag');
        ['topology', 'sequence', 'state'].forEach(k => {
          document.getElementById('diagPanel-' + k).classList.toggle('hidden', k !== target);
        });
        diagButtons.forEach(b => {
          b.className = (b === btn)
            ? 'px-3 py-1.5 rounded-[3px] bg-white text-[#141413] font-semibold border border-[#CBD5E1]'
            : 'px-3 py-1.5 rounded-[3px] text-[#57534E] hover:text-[#141413]';
        });
      });
    });

    // 3. Code Tabs (Rust, TOML, SQL)
    const codeButtons = document.querySelectorAll('#codeTabs button');
    let activeCodeTab = 'rust';
    codeButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        activeCodeTab = btn.getAttribute('data-code');
        ['rust', 'toml', 'sql'].forEach(k => {
          document.getElementById('codePanel-' + k).classList.toggle('hidden', k !== activeCodeTab);
        });
        codeButtons.forEach(b => {
          b.className = (b === btn)
            ? 'px-3 py-1 rounded-[3px] bg-white text-[#141413] font-semibold border border-[#CBD5E1]'
            : 'px-3 py-1 rounded-[3px] text-[#57534E] hover:text-[#141413]';
        });
      });
    });

    document.getElementById('btnCopyCode').addEventListener('click', () => {
      const map = { rust: 'rawCodeRust', toml: 'rawCodeToml', sql: 'rawCodeSql' };
      const container = document.getElementById(map[activeCodeTab]);
      const code = Array.from(container.children, line => {
        const clone = line.cloneNode(true);
        clone.querySelectorAll('.syn-ln').forEach(number => number.remove());
        return clone.textContent;
      }).join('\n');
      copyToClipboard(code, `Copied ${activeCodeTab.toUpperCase()} snippet!`);
    });

    // 4. Matrix Filter
    const filterBtns = document.querySelectorAll('#matrixFilterGroup button');
    const matrixRows = document.querySelectorAll('#matrixTableBody tr');
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const f = btn.getAttribute('data-filter');
        matrixRows.forEach(row => {
          const st = row.getAttribute('data-status');
          row.classList.toggle('hidden', f !== 'all' && st !== f);
        });
        filterBtns.forEach(b => {
          b.className = (b === btn)
            ? 'px-3 py-1 rounded-[3px] bg-white text-[#141413] font-semibold border border-[#CBD5E1]'
            : 'px-3 py-1 rounded-[3px] text-[#57534E] hover:text-[#141413]';
        });
      });
    });

    // 5. ADR Accordion
    document.querySelectorAll('.adr-toggle').forEach(btn => {
      btn.addEventListener('click', () => {
        const targetId = btn.getAttribute('data-target');
        const panel = document.getElementById(targetId);
        const icon = btn.querySelector('span:last-child');
        const isHidden = panel.classList.toggle('hidden');
        icon.textContent = isHidden ? '[+]' : '[−]';
        icon.style.color = isHidden ? '#57534E' : '#D9381E';
      });
    });

    // 6. Agent Hub Tabs
    const agentBtns = document.querySelectorAll('#agentTabs button');
    let activeAgentTab = 'cdn';
    agentBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        activeAgentTab = btn.getAttribute('data-agent');
        ['cdn', 'skill', 'prompt'].forEach(k => {
          document.getElementById('agentBox-' + k).classList.toggle('hidden', k !== activeAgentTab);
        });
        agentBtns.forEach(b => {
          b.className = (b === btn)
            ? 'px-3 py-1 rounded-[3px] bg-white text-[#141413] font-semibold border border-[#CBD5E1]'
            : 'px-3 py-1 rounded-[3px] text-[#57534E] hover:text-[#141413]';
        });
      });
    });

    document.getElementById('btnCopyAgentBox').addEventListener('click', () => {
      const el = document.getElementById('agentBox-' + activeAgentTab);
      copyToClipboard(el.innerText, 'Copied guide to clipboard!');
    });

    // 7. Top Bar Quick Jumps & Copy System CSS
    document.getElementById('btnJumpDiagrams').addEventListener('click', () => {
      document.getElementById('sec-diagrams').scrollIntoView({ behavior: 'smooth' });
    });
    document.getElementById('btnJumpCode').addEventListener('click', () => {
      document.getElementById('sec-code').scrollIntoView({ behavior: 'smooth' });
    });
    document.getElementById('btnJumpAgent').addEventListener('click', () => {
      document.getElementById('sec-agent').scrollIntoView({ behavior: 'smooth' });
    });
    document.getElementById('btnCopyAllCSS').addEventListener('click', async () => {
      try {
        const response = await fetch('./dist/atelier.css');
        if (!response.ok) throw new Error('Stylesheet unavailable');
        await copyToClipboard(await response.text(), 'Copied full Swiss Atelier stylesheet!');
      } catch (error) { showToast('Unable to load stylesheet. Open dist/atelier.css directly.'); }
    });

    // 8. Highlight active TOC item on click
    const tocLinks = document.querySelectorAll('#tocNav a');
    tocLinks.forEach(link => {
      link.addEventListener('click', () => {
        tocLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
      });
    });

    function accessibleTabs(groupId, attribute, panelPrefix) {
      const group = document.getElementById(groupId);
      group.setAttribute('role', 'tablist');
      group.setAttribute('aria-label', groupId.replace('Tabs', ' examples'));
      const buttons = Array.from(group.querySelectorAll('button'));
      function select(selected) {
        buttons.forEach(button => {
          const active = button === selected;
          button.setAttribute('aria-selected', String(active));
          button.tabIndex = active ? 0 : -1;
          document.getElementById(panelPrefix + button.dataset[attribute]).hidden = !active;
        });
      }
      buttons.forEach((button, index) => {
        const panel = document.getElementById(panelPrefix + button.dataset[attribute]);
        button.id = groupId + '-' + button.dataset[attribute];
        button.setAttribute('role', 'tab');
        button.setAttribute('aria-controls', panel.id);
        panel.setAttribute('role', 'tabpanel');
        panel.setAttribute('aria-labelledby', button.id);
        panel.tabIndex = 0;
        button.addEventListener('click', () => select(button));
        button.addEventListener('keydown', event => {
          let next;
          if (event.key === 'ArrowRight') next = (index + 1) % buttons.length;
          if (event.key === 'ArrowLeft') next = (index - 1 + buttons.length) % buttons.length;
          if (event.key === 'Home') next = 0;
          if (event.key === 'End') next = buttons.length - 1;
          if (next !== undefined) { event.preventDefault(); buttons[next].focus(); buttons[next].click(); }
        });
      });
      select(buttons[0]);
    }
    accessibleTabs('diagramTabs', 'diag', 'diagPanel-');
    accessibleTabs('codeTabs', 'code', 'codePanel-');
    accessibleTabs('agentTabs', 'agent', 'agentBox-');
    document.querySelectorAll('.adr-toggle').forEach(button => {
      const panel = document.getElementById(button.dataset.target);
      button.setAttribute('aria-controls', panel.id);
      button.setAttribute('aria-expanded', String(!panel.classList.contains('hidden')));
      button.addEventListener('click', () => button.setAttribute('aria-expanded', String(!panel.classList.contains('hidden'))));
    });
    document.querySelectorAll('#matrixFilterGroup button').forEach(button => {
      button.setAttribute('aria-pressed', String(button.dataset.filter === 'all'));
      button.addEventListener('click', () => {
        document.querySelectorAll('#matrixFilterGroup button').forEach(other => other.setAttribute('aria-pressed', String(other === button)));
      });
    });
