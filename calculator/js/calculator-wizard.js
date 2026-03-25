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
    let _skipToResults = false; // set when data is pre-loaded (CSV/saved) from stage 1

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
        document.body.classList.remove('wz-editing'); // clear edit mode on any state change
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
                        <div class="wz-shortcuts">
                            <button class="wz-shortcut-btn" id="wz-load-saved-btn">טען ניתוח שמור 📂</button>
                            <button class="wz-shortcut-btn" id="wz-import-csv-btn">ייבא CSV 📄</button>
                            <input type="file" id="wz-csv-file-input" accept=".csv" style="display:none">
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

                    <!-- Step 2: Data Method (2 tabs) -->
                    <div class="wz-panel" data-step="2" style="display:none">
                        <div class="wz-step-header">
                            <h2>איך נכניס את הנתונים?</h2>
                            <p>בחר דרך — תמיד אפשר לערוך ידנית אח"כ</p>
                        </div>

                        <!-- Tab bar -->
                        <div class="wz-tabs" id="wz-tabs">
                            <button class="wz-tab active" data-tab="manual">הזנה ידנית ✏️</button>
                            <button class="wz-tab" data-tab="ai">שליפה באמצעות AI 🤖</button>
                        </div>

                        <!-- Tab: Manual -->
                        <div class="wz-tab-panel active" id="wz-tab-manual">
                            <div class="wz-method-grid" style="grid-template-columns:1fr;">
                                <div class="wz-method-card selected" data-method="manual">
                                    <div class="wz-method-icon">✏️</div>
                                    <div class="wz-method-name">הזנה ידנית</div>
                                    <div class="wz-method-desc">מלא את המדדים בעצמך לפי הדוחות הפיננסיים</div>
                                </div>
                            </div>
                        </div>

                        <!-- Tab: AI -->
                        <div class="wz-tab-panel" id="wz-tab-ai" style="display:none">
                            <!-- Option 1: Auto-fetch -->
                            <div class="wz-ai-option-box">
                                <div class="wz-ai-option-label">אופציה 1: שליפה אוטומטית</div>
                                <button class="wz-btn primary" id="wz-autofetch-btn" style="width:100%;justify-content:center;margin-bottom:6px;">
                                    🔍 שלוף נתונים אוטומטית
                                </button>
                                <div class="wz-ai-option-hint">שולף נתונים מהאינטרנט — לוקח כ-15-30 שניות</div>
                            </div>

                            <div class="wz-ai-or">─── או ───</div>

                            <!-- Option 2: Prompt + Paste -->
                            <div class="wz-ai-option-box">
                                <div class="wz-ai-option-label">אופציה 2: פרומפט + הדבקה</div>
                                <div class="wz-ai-howto">
                                    <div class="wz-ai-howto-title">📋 איך להשתמש:</div>
                                    <ol class="wz-ai-howto-list">
                                        <li>העתק את הפרומפט למטה</li>
                                        <li>הדבק ב-Gemini, ChatGPT, או Claude</li>
                                        <li>קבל CSV מוכן + מקורות לכל מדד</li>
                                        <li>הדבק את התוצאה בתיבה למטה</li>
                                    </ol>
                                </div>
                                <textarea id="wz-prompt-textarea" class="wz-prompt-textarea" readonly dir="ltr"></textarea>
                                <div class="wz-prompt-actions">
                                    <button class="wz-btn ghost wz-prompt-action-btn" id="wz-copy-prompt-btn">העתק פרומפט 📋</button>
                                    <button class="wz-btn ghost wz-prompt-action-btn" id="wz-download-prompt-btn">הורד txt. ⬇️</button>
                                </div>
                                <div class="wz-paste-divider">─── קיבלת תוצאה? הדבק כאן: ───</div>
                                <textarea id="wz-paste-textarea" class="wz-paste-textarea" placeholder="הדבק כאן את הפלט מה-AI... (טבלאות, CSV, JSON, טקסט חופשי — הכל עובד)" dir="ltr"></textarea>
                                <div class="wz-paste-actions">
                                    <button class="wz-btn primary wz-paste-action-btn" id="wz-fill-data-btn">🧠 מלא נתונים</button>
                                    <button class="wz-btn ghost wz-paste-action-btn" id="wz-import-csv-tab-btn">📄 ייבוא CSV</button>
                                    <input type="file" id="wz-csv-tab-input" accept=".csv" style="display:none">
                                </div>
                                <div class="wz-ai-hint">💡 אפשר להדביק: טבלאות, CSV, JSON, טקסט חופשי</div>
                            </div>

                            <!-- Success feedback + continue button (hidden until data filled) -->
                            <div class="wz-ai-success" id="wz-ai-success" style="display:none">
                                <span class="wz-ai-success-icon">✅</span>
                                <span id="wz-ai-success-msg">הנתונים מולאו בהצלחה!</span>
                            </div>
                        </div>

                        <div class="wz-nav" style="margin-top:16px;">
                            <button class="wz-btn ghost" onclick="CalcWizard.goStep(1)">→ חזור</button>
                            <button class="wz-btn primary" id="wz-go-btn">בואו נתחיל ←</button>
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
                    <button class="wz-action-btn wz-edit-toggle-btn" id="wz-edit-toggle" onclick="CalcWizard.toggleEditMode()">
                        <span>✏️</span> ערוך מדדים
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
        if (n === 2 && _skipToResults) {
            // Data already loaded from stage 1 shortcut — apply profile and go to results
            applySettings();
            _skipToResults = false;
            showProcessing();
            return;
        }
        if (n === 2) {
            // Refresh prompt if AI tab is already active
            const aiTab = document.querySelector('.wz-tab[data-tab="ai"]');
            if (aiTab && aiTab.classList.contains('active')) refreshWizardPrompt();
        }
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

    // ── Determine current data method from active tab ──
    function getActiveDataMethod() {
        const activeTabPanel = document.querySelector('.wz-tab-panel.active');
        if (!activeTabPanel) return 'manual';
        if (activeTabPanel.id === 'wz-tab-ai') return 'ai-tab';
        return 'manual';
    }

    // ── Start data entry phase ──
    function startEntry() {
        // Apply company + mode (no values)
        applySettings();

        // Switch to entry state — shows app in simplified mode
        setState('entry');

        // Scroll to first metric category
        setTimeout(() => {
            const first = document.getElementById('cat-profitability');
            if (first) first.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 200);
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

        // ── Stage 1 shortcuts ──

        // Button: Load saved analysis
        document.getElementById('wz-load-saved-btn')?.addEventListener('click', openLoadSavedModal);

        // Button: Import CSV from stage 1
        const wzCsvBtn = document.getElementById('wz-import-csv-btn');
        const wzCsvInput = document.getElementById('wz-csv-file-input');
        if (wzCsvBtn && wzCsvInput) {
            wzCsvBtn.addEventListener('click', () => wzCsvInput.click());
            wzCsvInput.addEventListener('change', e => {
                const file = e.target.files[0];
                if (!file) return;
                e.target.value = null;
                if (typeof importCSV === 'function') {
                    importCSV(file);
                    // Data is loaded — go to profile selection (stage 2), then results
                    _skipToResults = true;
                    setTimeout(() => goStep(1), 300);
                } else {
                    showToast('שגיאה: פונקציית ייבוא CSV לא נמצאה', 'error');
                }
            });
        }

        // ── Stage 3: Tab switching ──
        document.querySelectorAll('.wz-tab').forEach(tab => {
            tab.addEventListener('click', () => {
                const tabId = tab.dataset.tab;
                document.querySelectorAll('.wz-tab').forEach(t => t.classList.remove('active'));
                document.querySelectorAll('.wz-tab-panel').forEach(p => {
                    p.classList.remove('active');
                    p.style.display = 'none';
                });
                tab.classList.add('active');
                const panel = document.getElementById('wz-tab-' + tabId);
                if (panel) { panel.classList.add('active'); panel.style.display = ''; }

                // When AI tab opens, inject the prompt if company name exists
                if (tabId === 'ai') {
                    refreshWizardPrompt();
                }
            });
        });

        // ── Stage 3: Auto-fetch button ──
        document.getElementById('wz-autofetch-btn')?.addEventListener('click', () => {
            const company = document.getElementById('wz-company-input')?.value?.trim() || '';
            if (!company) { showToast('הקלד שם חברה קודם', 'warning'); return; }
            applySettings();
            if (typeof CalcAI !== 'undefined' && CalcAI.autoFill) {
                // Auto-fetch: open the autofill prompt modal, then proceed to entry
                CalcAI.autoFill(company);
                // After modal opens, also start entry so user can see the metrics being filled
                setTimeout(() => {
                    setState('entry');
                }, 400);
            } else {
                showToast('מודול AI לא נמצא', 'error');
            }
        });

        // ── Stage 3: Copy prompt button ──
        document.getElementById('wz-copy-prompt-btn')?.addEventListener('click', () => {
            const prompt = document.getElementById('wz-prompt-textarea')?.value;
            if (!prompt) { refreshWizardPrompt(); return; }
            navigator.clipboard.writeText(prompt).then(() => {
                showToast('הפרומפט הועתק! 📋 הדבק ב-Gemini או ChatGPT');
            }).catch(() => {
                showToast('שגיאה בהעתקה — נסה הורדה', 'error');
            });
        });

        // ── Stage 3: Download prompt button ──
        document.getElementById('wz-download-prompt-btn')?.addEventListener('click', () => {
            const prompt = document.getElementById('wz-prompt-textarea')?.value;
            const company = document.getElementById('wz-company-input')?.value?.trim() || 'company';
            if (!prompt) { refreshWizardPrompt(); return; }
            const blob = new Blob([prompt], { type: 'text/plain;charset=utf-8;' });
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = `ai_prompt_${company.replace(/\s+/g, '_')}.txt`;
            link.click();
            showToast('הפרומפט הורד!');
        });

        // ── Stage 3: Fill data (parse paste) button ──
        document.getElementById('wz-fill-data-btn')?.addEventListener('click', async () => {
            const text = document.getElementById('wz-paste-textarea')?.value?.trim();
            if (!text || text.length < 20) {
                showToast('הדבק טקסט ארוך יותר', 'warning');
                return;
            }

            // Check access (PRO feature)
            if (typeof CalcAI !== 'undefined' && CalcAI.checkAccess) {
                const hasAccess = await CalcAI.checkAccess();
                if (!hasAccess) {
                    if (CalcAI.showUpgradeModal) CalcAI.showUpgradeModal('הדבקת נתונים חכמה');
                    return;
                }
            }

            const btn = document.getElementById('wz-fill-data-btn');
            if (btn) { btn.textContent = '⏳ מנתח...'; btn.disabled = true; }

            // Apply settings first (so company name / mode is set in the main calculator)
            applySettings();

            try {
                // Mirror the text into the ai-paste-textarea that parsePastedText() reads
                let pasteTA = document.getElementById('ai-paste-textarea');
                if (!pasteTA) {
                    pasteTA = document.createElement('textarea');
                    pasteTA.id = 'ai-paste-textarea';
                    pasteTA.style.display = 'none';
                    document.body.appendChild(pasteTA);
                }
                pasteTA.value = text;

                if (typeof CalcAI !== 'undefined' && CalcAI.parsePastedText) {
                    await CalcAI.parsePastedText();
                    // Show success inline, then after a moment jump straight to results
                    showWizardAISuccess('הנתונים מולאו מהטקסט!');
                    setTimeout(() => showProcessing(), 1200);
                } else {
                    showToast('מודול AI לא נמצא', 'error');
                    setState('entry');
                }
            } catch (err) {
                showToast('שגיאה בניתוח: ' + err.message, 'error');
                setState('entry');
            } finally {
                if (btn) { btn.textContent = '🧠 מלא נתונים'; btn.disabled = false; }
            }
        });

        // ── Stage 3: CSV import in AI tab ──
        const wzCsvTabBtn = document.getElementById('wz-import-csv-tab-btn');
        const wzCsvTabInput = document.getElementById('wz-csv-tab-input');
        if (wzCsvTabBtn && wzCsvTabInput) {
            wzCsvTabBtn.addEventListener('click', () => wzCsvTabInput.click());
            wzCsvTabInput.addEventListener('change', e => {
                const file = e.target.files[0];
                if (!file) return;
                e.target.value = null;
                applySettings();
                if (typeof importCSV === 'function') {
                    importCSV(file);
                    showWizardAISuccess('הנתונים יובאו מה-CSV!');
                    setTimeout(() => showProcessing(), 1200);
                } else {
                    showToast('שגיאה: פונקציית ייבוא CSV לא נמצאה', 'error');
                }
            });
        }

        // ── Go button → start entry ──
        const goBtn = document.getElementById('wz-go-btn');
        if (goBtn) goBtn.addEventListener('click', startEntry);

        // Inject prompt when AI tab is clicked (refresh on company name change too)
        companyInput?.addEventListener('input', () => {
            if (document.querySelector('.wz-tab[data-tab="ai"].active')) {
                refreshWizardPrompt();
            }
        });
    }

    // ── Refresh prompt textarea with current company ──
    function refreshWizardPrompt() {
        const company = document.getElementById('wz-company-input')?.value?.trim() || '';
        const ta = document.getElementById('wz-prompt-textarea');
        if (!ta) return;
        if (typeof CalcAI !== 'undefined' && typeof CalcAI._buildPrompt === 'function') {
            ta.value = CalcAI._buildPrompt(company || 'חברה');
        } else {
            ta.value = company ? `[הקלד שם חברה ובחר "שלוף נתונים" כדי לקבל פרומפט מלא עבור: ${company}]` : '[הקלד שם חברה בשלב 1 כדי לקבל פרומפט מותאם]';
        }
    }

    // ── Show AI success message in wizard step 2 ──
    function showWizardAISuccess(msg) {
        const el = document.getElementById('wz-ai-success');
        const msgEl = document.getElementById('wz-ai-success-msg');
        if (el) {
            if (msgEl) msgEl.textContent = msg || 'הנתונים מולאו בהצלחה!';
            el.style.display = 'flex';
        }
    }

    // ── Load saved analysis modal ──
    async function openLoadSavedModal() {
        // Check if user is logged in
        if (typeof CalcDB === 'undefined') {
            showToast('יש להתחבר כדי לטעון ניתוחים שמורים', 'warning');
            return;
        }
        const userId = await CalcDB.getUserIdAsync();
        if (!userId) {
            showToast('יש להתחבר כדי לטעון ניתוחים שמורים', 'warning');
            return;
        }

        // Remove existing modal
        document.getElementById('wz-load-modal')?.remove();

        const modal = document.createElement('div');
        modal.id = 'wz-load-modal';
        modal.className = 'modal-overlay';
        modal.innerHTML = `
            <div class="modal-box" style="max-width:540px">
                <button class="modal-close" onclick="document.getElementById('wz-load-modal').classList.remove('open');document.body.style.overflow='';">&times;</button>
                <div class="modal-header">
                    <h2>📂 טען ניתוח שמור</h2>
                    <p>בחר ניתוח לטעינה — הנתונים יועברו ישירות לתוצאות</p>
                </div>
                <div id="wz-load-list" style="max-height:380px;overflow-y:auto;">
                    <div style="text-align:center;padding:24px;color:var(--text-muted);">טוען... ☁️</div>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
        requestAnimationFrame(() => modal.classList.add('open'));
        document.body.style.overflow = 'hidden';
        modal.addEventListener('click', e => {
            if (e.target === modal) { modal.classList.remove('open'); document.body.style.overflow = ''; }
        });

        // Load analyses
        try {
            const analyses = await CalcDB.getAnalyses(20);
            const list = document.getElementById('wz-load-list');
            if (!list) return;

            if (!analyses || analyses.length === 0) {
                list.innerHTML = '<div style="text-align:center;padding:24px;color:var(--text-muted);">לא נמצאו ניתוחים שמורים</div>';
                return;
            }

            list.innerHTML = '';
            analyses.forEach(a => {
                const date = new Date(a.ts);
                const dateStr = date.toLocaleDateString('he-IL', { day: 'numeric', month: 'short', year: 'numeric' });
                const item = document.createElement('div');
                item.className = 'history-item';
                item.style.cssText = 'cursor:pointer;padding:14px 16px;border-bottom:1px solid var(--border);display:flex;align-items:center;justify-content:space-between;gap:12px;';
                item.innerHTML = `
                    <div style="flex:1;">
                        <div style="font-weight:700;color:var(--text);font-size:15px;">${a.company}</div>
                        <div style="font-size:12px;color:var(--text-muted);margin-top:2px;">${dateStr}${a.totalScore ? ` · ציון: ${a.totalScore}%` : ''} · ${a.mode}</div>
                    </div>
                    <button class="wz-btn primary" style="padding:8px 16px;font-size:13px;">טען →</button>
                `;
                item.querySelector('button').addEventListener('click', () => {
                    loadSavedAnalysisIntoWizard(a);
                    modal.classList.remove('open');
                    document.body.style.overflow = '';
                });
                list.appendChild(item);
            });
        } catch (err) {
            const list = document.getElementById('wz-load-list');
            if (list) list.innerHTML = `<div style="text-align:center;padding:24px;color:var(--text-muted);">שגיאה בטעינה: ${err.message}</div>`;
        }
    }

    // ── Load a saved analysis and jump to results ──
    function loadSavedAnalysisIntoWizard(analysis) {
        // Set company name in wizard input
        const wzInput = document.getElementById('wz-company-input');
        if (wzInput) wzInput.value = analysis.company || '';

        if (typeof loadAnalysisBridge === 'function') {
            // Switch to entry state temporarily so app DOM is visible for loadAnalysisBridge
            setState('entry');
            setTimeout(() => {
                loadAnalysisBridge(analysis._supabaseId || analysis.id);
                // Data loaded — go back to wizard at profile selection step, then results
                setState('wizard');
                _skipToResults = true;
                setTimeout(() => goStep(1), 150);
            }, 100);
        } else {
            // Fallback
            _skipToResults = true;
            goStep(1);
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    function toggleEditMode() {
        const isEditing = document.body.classList.toggle('wz-editing');
        const btn = document.getElementById('wz-edit-toggle');
        if (btn) {
            btn.innerHTML = isEditing
                ? '<span>✓</span> סיים עריכה'
                : '<span>✏️</span> ערוך מדדים';
            btn.classList.toggle('active', isEditing);
        }
        if (isEditing) {
            // Scroll to first metric card so user sees the inputs
            const firstCard = document.querySelector('.metric-card');
            if (firstCard) firstCard.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }

    return { goStep, goAdvanced, startNew, finishEntry, showResults, openLoadSavedModal, toggleEditMode };
})();
