// ═══════════════════════════════════════════
// calculator-wizard.js — Guided UX Flow v2
// States: wizard → entry → processing → results
// Full calculator available via "מצב מתקדם"
// ═══════════════════════════════════════════

window.CalcWizard = (() => {
    let currentStep = 0;
    let selectedTemplate = 'tech';
    let selectedMode = 'balanced';
    let dataMethod = null;

    // ── Template + mode display data ──
    const templateInfo = {
        tech:       { icon: '💻', name: 'טכנולוגיה' },
        finance:    { icon: '🏦', name: 'פיננסים' },
        retail:     { icon: '🛒', name: 'קמעונאות' },
        healthcare: { icon: '💊', name: 'בריאות' },
        industrial: { icon: '🏭', name: 'תעשייה' },
        utilities:  { icon: '⚡', name: 'אנרגיה ותשתיות' },
        realestate: { icon: '🏠', name: 'נדל"ן' }
    };

    const modeInfo = {
        growth:   { icon: '🚀', name: 'צמיחה', desc: 'חברות צומחות — מעדיף צמיחת EPS, FCF ומכפילים גבוהים' },
        balanced: { icon: '⚖️', name: 'מאוזן', desc: 'שילוב צמיחה ויציבות — מומלץ לרוב המשקיעים' },
        value:    { icon: '💎', name: 'ערך', desc: 'מחיר נמוך ויציבות — מעדיף תשואת דיבידנד ו-FCF גבוה' }
    };

    // ── State management: body classes control visibility ──
    // body.wz-state-wizard  = wizard overlay visible, app hidden
    // body.wz-state-entry   = app visible in entry mode (only metric cards + finish btn)
    // body.wz-state-process = processing overlay
    // body.wz-state-results = app visible in results mode (read-only, clean)
    // body.wz-state-advanced = full calculator (power user)

    function setState(state) {
        document.body.className = document.body.className
            .replace(/wz-state-\w+/g, '').trim();
        document.body.classList.add(`wz-state-${state}`);

        const wz = document.getElementById('calc-wizard');
        const app = document.querySelector('main.app');
        const proc = document.getElementById('wz-processing');
        const bar = document.getElementById('wz-action-bar');
        const entryBar = document.getElementById('wz-entry-bar');

        if (wz) wz.style.display = state === 'wizard' ? '' : 'none';
        if (app) app.style.display = (state === 'wizard' || state === 'process') ? 'none' : '';
        if (proc) proc.style.display = state === 'process' ? 'flex' : 'none';
        if (bar) { bar.style.display = state === 'results' ? '' : 'none'; if (state === 'results') setTimeout(() => bar.classList.add('visible'), 50); else bar.classList.remove('visible'); }
        if (entryBar) entryBar.style.display = state === 'entry' ? '' : 'none';
    }

    // ── Build wizard HTML ──
    function buildWizard() {
        const wz = document.createElement('div');
        wz.id = 'calc-wizard';
        wz.className = 'wz-overlay';
        wz.innerHTML = `
            <div class="wz-container">
                <div class="wz-progress" id="wz-progress"></div>
                <div class="wz-panels" id="wz-panels">

                    <!-- Step 0: Company -->
                    <div class="wz-panel" data-step="0">
                        <div class="wz-step-header">
                            <div class="wz-step-icon-big">🏢</div>
                            <h2>בואו נתחיל — איזו חברה מעניינת אותך?</h2>
                            <p>הקלד שם חברה ציבורית</p>
                        </div>
                        <div class="wz-input-wrap">
                            <input type="text" id="wz-company-input" class="wz-company-input" placeholder="למשל: Apple, טבע, Microsoft..." autofocus>
                        </div>
                        <div class="wz-nav">
                            <div></div>
                            <button class="wz-btn primary" id="wz-next-0" disabled>הבא ←</button>
                        </div>
                        <button class="wz-skip-link" onclick="CalcWizard.goAdvanced()">אני מכיר את הכלי — מצב מתקדם</button>
                    </div>

                    <!-- Step 1: Profile + Template -->
                    <div class="wz-panel" data-step="1" style="display:none">
                        <div class="wz-step-header">
                            <h2>מה סגנון ההשקעה שלך?</h2>
                            <p>זה ישפיע על המשקולות של כל מדד בניתוח</p>
                        </div>
                        <div class="wz-mode-grid" id="wz-mode-grid"></div>
                        <div class="wz-step-header" style="margin-top:24px;">
                            <h2>מאיזה ענף החברה?</h2>
                            <p>תבנית ענפית מגדירה את ערכי הסף הרלוונטיים</p>
                        </div>
                        <div class="wz-template-grid" id="wz-template-grid"></div>
                        <div class="wz-nav">
                            <button class="wz-btn ghost" onclick="CalcWizard.goStep(0)">→ חזור</button>
                            <button class="wz-btn primary" onclick="CalcWizard.goStep(2)">הבא ←</button>
                        </div>
                    </div>

                    <!-- Step 2: Data Method -->
                    <div class="wz-panel" data-step="2" style="display:none">
                        <div class="wz-step-header">
                            <h2>איך נכניס את הנתונים?</h2>
                            <p>בחר דרך — תמיד אפשר לערוך ידנית אח"כ</p>
                        </div>
                        <div class="wz-method-grid">
                            <div class="wz-method-card" data-method="ai">
                                <div class="wz-method-icon">🤖</div>
                                <div class="wz-method-name">שליפה אוטומטית</div>
                                <div class="wz-method-desc">AI ימלא את כל 13 המדדים מהאינטרנט</div>
                                <span class="ai-pro-badge" style="margin-top:4px;">PRO</span>
                            </div>
                            <div class="wz-method-card" data-method="paste">
                                <div class="wz-method-icon">📋</div>
                                <div class="wz-method-name">הדבקת טקסט</div>
                                <div class="wz-method-desc">העתק מ-ChatGPT, Gemini או כל AI</div>
                                <span class="ai-pro-badge" style="margin-top:4px;">PRO</span>
                            </div>
                            <div class="wz-method-card" data-method="manual">
                                <div class="wz-method-icon">✏️</div>
                                <div class="wz-method-name">הזנה ידנית</div>
                                <div class="wz-method-desc">מלא את המדדים בעצמך</div>
                            </div>
                        </div>
                        <div class="wz-nav">
                            <button class="wz-btn ghost" onclick="CalcWizard.goStep(1)">→ חזור</button>
                            <button class="wz-btn primary" id="wz-go-btn" disabled>בואו נתחיל ←</button>
                        </div>
                    </div>

                </div>
            </div>
        `;
        return wz;
    }

    function buildProcessing() {
        const el = document.createElement('div');
        el.id = 'wz-processing';
        el.className = 'wz-processing';
        el.style.display = 'none';
        el.innerHTML = `
            <div class="wz-proc-content">
                <div class="wz-proc-spinner"></div>
                <h2 id="wz-proc-title">מנתח את הנתונים...</h2>
                <p id="wz-proc-subtitle">סורקים 13 מדדים פיננסיים</p>
                <div class="wz-proc-bar"><div class="wz-proc-fill" id="wz-proc-fill"></div></div>
            </div>
        `;
        return el;
    }

    function buildEntryBar() {
        const bar = document.createElement('div');
        bar.id = 'wz-entry-bar';
        bar.className = 'wz-entry-bar';
        bar.style.display = 'none';
        bar.innerHTML = `
            <div class="wz-entry-bar-inner">
                <span class="wz-entry-hint">💡 מלא כמה שיותר מדדים לתוצאה מדויקת</span>
                <button class="wz-btn primary" id="wz-finish-entry" onclick="CalcWizard.finishEntry()">
                    סיימתי — הראה תוצאות ←
                </button>
            </div>
        `;
        return bar;
    }

    function buildActionBar() {
        const bar = document.createElement('div');
        bar.id = 'wz-action-bar';
        bar.className = 'wz-action-bar';
        bar.style.display = 'none';
        bar.innerHTML = `
            <div class="wz-action-bar-inner">
                <span class="wz-action-label">מה עכשיו?</span>
                <div class="wz-action-btns">
                    <button class="wz-action-btn" onclick="document.getElementById('save-btn')?.click()">
                        <span>💾</span> שמור
                    </button>
                    <button class="wz-action-btn" onclick="if(typeof CalcPDF!=='undefined')CalcPDF.generatePDF()">
                        <span>📄</span> ייצוא PDF
                    </button>
                    <button class="wz-action-btn" onclick="CalcWizard.goAdvanced()">
                        <span>🔧</span> מצב מתקדם
                    </button>
                    <button class="wz-action-btn primary" onclick="CalcWizard.startNew()">
                        <span>🔄</span> חברה חדשה
                    </button>
                </div>
            </div>
        `;
        return bar;
    }

    // ── Progress ──
    const STEP_LABELS = ['חברה', 'פרופיל', 'נתונים', 'תוצאות'];
    function renderProgress() {
        const el = document.getElementById('wz-progress');
        if (!el) return;
        el.innerHTML = STEP_LABELS.map((s, i) => `
            <div class="wz-progress-step ${i < currentStep ? 'done' : ''} ${i === currentStep ? 'active' : ''}">
                <div class="wz-progress-dot">${i < currentStep ? '✓' : i + 1}</div>
                <span>${s}</span>
            </div>
            ${i < STEP_LABELS.length - 1 ? '<div class="wz-progress-line ' + (i < currentStep ? 'done' : '') + '"></div>' : ''}
        `).join('');
    }

    // ── Render selections grids ──
    function renderModeGrid() {
        const grid = document.getElementById('wz-mode-grid');
        if (!grid) return;
        grid.innerHTML = Object.entries(modeInfo).map(([key, m]) => `
            <div class="wz-mode-card ${key === selectedMode ? 'selected' : ''}" data-mode="${key}">
                <div class="wz-mode-icon">${m.icon}</div>
                <div class="wz-mode-name">${m.name}</div>
                <div class="wz-mode-desc">${m.desc}</div>
            </div>
        `).join('');
        grid.querySelectorAll('.wz-mode-card').forEach(card => {
            card.onclick = () => {
                selectedMode = card.dataset.mode;
                grid.querySelectorAll('.wz-mode-card').forEach(c => c.classList.remove('selected'));
                card.classList.add('selected');
            };
        });
    }

    function renderTemplateGrid() {
        const grid = document.getElementById('wz-template-grid');
        if (!grid) return;
        grid.innerHTML = Object.entries(templateInfo).map(([key, t]) => `
            <div class="wz-tmpl-card ${key === selectedTemplate ? 'selected' : ''}" data-tmpl="${key}">
                <span class="wz-tmpl-icon">${t.icon}</span>
                <span class="wz-tmpl-name">${t.name}</span>
            </div>
        `).join('');
        grid.querySelectorAll('.wz-tmpl-card').forEach(card => {
            card.onclick = () => {
                selectedTemplate = card.dataset.tmpl;
                grid.querySelectorAll('.wz-tmpl-card').forEach(c => c.classList.remove('selected'));
                card.classList.add('selected');
            };
        });
    }

    // ── Step navigation ──
    function goStep(n) {
        currentStep = n;
        document.querySelectorAll('.wz-panel').forEach(p => p.style.display = 'none');
        const panel = document.querySelector(`.wz-panel[data-step="${n}"]`);
        if (panel) {
            panel.style.display = '';
            panel.classList.add('wz-slide-in');
            setTimeout(() => panel.classList.remove('wz-slide-in'), 400);
        }
        renderProgress();
        if (n === 1) { renderModeGrid(); renderTemplateGrid(); }
    }

    // ── Apply selections WITHOUT filling values ──
    function applySettings() {
        // Set company name
        const name = document.getElementById('wz-company-input')?.value?.trim() || '';
        const companyInput = document.getElementById('company-name');
        if (companyInput && name) {
            companyInput.value = name;
            const topbar = document.getElementById('topbar-company');
            if (topbar) topbar.textContent = name;
        }
        // Set mode (changes weights, NOT values)
        if (typeof switchMode === 'function') switchMode(selectedMode);
        // Set template for thresholds reference (don't apply values)
        if (typeof activeTemplate !== 'undefined') window.activeTemplate = selectedTemplate;
    }

    // ── Start data entry phase ──
    function startEntry() {
        dataMethod = document.querySelector('.wz-method-card.selected')?.dataset?.method;
        if (!dataMethod) return;

        // Apply company + mode (no values)
        applySettings();

        // Switch to entry state — shows app in simplified mode
        setState('entry');

        // Scroll to first metric category
        setTimeout(() => {
            const first = document.getElementById('cat-profitability');
            if (first) first.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 200);

        // Trigger AI/paste if selected
        if (dataMethod === 'ai') {
            const companyName = document.getElementById('company-name')?.value || '';
            if (typeof CalcAI !== 'undefined' && CalcAI.autoFill) {
                setTimeout(() => CalcAI.autoFill(companyName), 400);
            }
        } else if (dataMethod === 'paste') {
            if (typeof CalcAI !== 'undefined' && CalcAI.openPasteModal) {
                setTimeout(() => CalcAI.openPasteModal(), 400);
            }
        }
    }

    // ── Finish entry → processing → results ──
    function finishEntry() {
        // Check if any data was entered
        const score = parseInt(document.getElementById('gauge-score-text')?.textContent || '0');
        if (score === 0) {
            const filled = document.querySelectorAll('.metric-input:not([value=""])');
            let hasData = false;
            filled.forEach(inp => { if (inp.value && inp.value !== '') hasData = true; });
            if (!hasData) {
                if (typeof showToast === 'function') showToast('הזן לפחות מדד אחד', 'warning');
                return;
            }
        }
        showProcessing();
    }

    // ── Processing animation ──
    function showProcessing() {
        setState('process');

        const messages = [
            { title: 'מנתח רווחיות...', sub: 'ROI, ROE, מרווח גולמי, שולי רווח, FCF' },
            { title: 'בודק צמיחה...', sub: 'צמיחת FCF, צמיחת EPS, רכישה עצמית' },
            { title: 'מעריך שווי...', sub: 'P/E, PEG ומכפילים' },
            { title: 'בודק יציבות...', sub: 'Current Ratio, D/E, Altman Z-Score' },
            { title: 'מייצר תובנות...', sub: 'נקודות חוזק, סימני אזהרה, סיכום' }
        ];

        const fill = document.getElementById('wz-proc-fill');
        const title = document.getElementById('wz-proc-title');
        const sub = document.getElementById('wz-proc-subtitle');
        if (fill) fill.style.width = '0%';

        let i = 0;
        const interval = setInterval(() => {
            if (i < messages.length) {
                if (title) title.textContent = messages[i].title;
                if (sub) sub.textContent = messages[i].sub;
                if (fill) fill.style.width = `${((i + 1) / messages.length) * 100}%`;
                i++;
            }
        }, 1200);

        setTimeout(() => {
            clearInterval(interval);
            if (fill) fill.style.width = '100%';
            if (title) title.textContent = '✓ הניתוח מוכן!';
            if (sub) sub.textContent = '';
            setTimeout(() => showResults(), 500);
        }, messages.length * 1200 + 300);
    }

    // ── Show results view ──
    function showResults() {
        currentStep = 3;

        // Force recalculate everything
        if (typeof updateAllMetrics === 'function') updateAllMetrics();

        // Force insights body expanded
        const insightsBody = document.getElementById('insights-body');
        if (insightsBody) insightsBody.classList.remove('collapsed');
        const insightsToggle = document.getElementById('insights-toggle');
        if (insightsToggle) insightsToggle.textContent = 'הסתר ▴';

        setState('results');

        // Inject AI analysis CTA inside insights header (if not already)
        if (!document.getElementById('wz-ai-cta')) {
            const insightsHeader = document.querySelector('.insights-header');
            if (insightsHeader) {
                const cta = document.createElement('button');
                cta.id = 'wz-ai-cta';
                cta.className = 'wz-ai-cta-btn';
                cta.innerHTML = '🤖 קבל ניתוח AI מעמיק';
                cta.onclick = () => {
                    if (typeof CalcAI !== 'undefined' && CalcAI.analyzeCompany) CalcAI.analyzeCompany();
                };
                // Insert after the toggle button
                insightsHeader.appendChild(cta);
            }
        }

        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });

        // Highlight score card
        const scoreCard = document.getElementById('score-card');
        if (scoreCard) {
            scoreCard.classList.add('wz-highlight');
            setTimeout(() => scoreCard.classList.remove('wz-highlight'), 2000);
        }
    }

    // ── Go to full advanced mode ──
    function goAdvanced() {
        // Apply settings if coming from wizard
        if (document.body.classList.contains('wz-state-wizard')) {
            const name = document.getElementById('wz-company-input')?.value?.trim();
            if (name) {
                const companyInput = document.getElementById('company-name');
                if (companyInput) companyInput.value = name;
                const topbar = document.getElementById('topbar-company');
                if (topbar) topbar.textContent = name;
            }
        }
        setState('advanced');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // ── Start new analysis ──
    function startNew() {
        // Reset calculator
        if (typeof resetAll === 'function') {
            const origConfirm = window.confirm;
            window.confirm = () => true;
            resetAll();
            window.confirm = origConfirm;
        }

        currentStep = 0;
        dataMethod = null;

        setState('wizard');
        goStep(0);

        const input = document.getElementById('wz-company-input');
        if (input) { input.value = ''; setTimeout(() => input.focus(), 200); }
    }

    // ── Init ──
    function init() {
        const app = document.querySelector('main.app');
        if (!app) return;

        // Insert wizard before app
        const wz = buildWizard();
        app.parentNode.insertBefore(wz, app);

        // Insert processing overlay
        document.body.appendChild(buildProcessing());

        // Insert entry bar (sticky bottom during data entry)
        document.body.appendChild(buildEntryBar());

        // Insert results action bar
        document.body.appendChild(buildActionBar());

        // Initial state
        setState('wizard');
        goStep(0);

        // ── Bind events ──

        // Company input
        const companyInput = document.getElementById('wz-company-input');
        const nextBtn = document.getElementById('wz-next-0');
        if (companyInput && nextBtn) {
            companyInput.addEventListener('input', () => {
                nextBtn.disabled = companyInput.value.trim().length < 2;
            });
            companyInput.addEventListener('keydown', e => {
                if (e.key === 'Enter' && !nextBtn.disabled) goStep(1);
            });
            nextBtn.addEventListener('click', () => goStep(1));
        }

        // Method cards
        document.querySelectorAll('.wz-method-card').forEach(card => {
            card.onclick = () => {
                document.querySelectorAll('.wz-method-card').forEach(c => c.classList.remove('selected'));
                card.classList.add('selected');
                const goBtn = document.getElementById('wz-go-btn');
                if (goBtn) goBtn.disabled = false;
            };
        });

        // Go button → start entry
        const goBtn = document.getElementById('wz-go-btn');
        if (goBtn) goBtn.addEventListener('click', startEntry);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    return { goStep, goAdvanced, startNew, finishEntry };
})();
