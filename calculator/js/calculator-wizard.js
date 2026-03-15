// ═══════════════════════════════════════════
// calculator-wizard.js — Guided UX Flow
// Wraps the existing calculator in a step-by-step experience
// ═══════════════════════════════════════════

window.CalcWizard = (() => {
    let currentStep = 0;
    let selectedTemplate = 'tech';
    let selectedMode = 'balanced';
    let dataMethod = null; // 'ai', 'paste', 'manual'

    const STEPS = [
        { id: 'company', title: 'בחירת חברה', icon: '🏢' },
        { id: 'profile',  title: 'פרופיל ותבנית', icon: '⚙️' },
        { id: 'data',     title: 'הזנת נתונים', icon: '📊' },
        { id: 'process',  title: 'מחשב...', icon: '🧠' },
        { id: 'results',  title: 'תוצאות', icon: '🎯' }
    ];

    // ── Template display names ──
    const templateInfo = {
        tech:       { icon: '💻', name: 'טכנולוגיה', desc: 'צמיחה מהירה, מרווחים גבוהים' },
        finance:    { icon: '🏦', name: 'פיננסים', desc: 'מינוף גבוה, FCF פחות רלוונטי' },
        retail:     { icon: '🛒', name: 'קמעונאות', desc: 'מרווחים נמוכים, תחרות עזה' },
        healthcare: { icon: '💊', name: 'בריאות', desc: 'מרווחים גבוהים, מחזור ארוך' },
        industrial: { icon: '🏭', name: 'תעשייה', desc: 'מחזורית, השקעות הון' },
        utilities:  { icon: '⚡', name: 'אנרגיה ותשתיות', desc: 'יציבות, תשואות דיבידנד' },
        realestate: { icon: '🏠', name: 'נדל"ן', desc: 'נכסים מניבים, מינוף' }
    };

    const modeInfo = {
        growth:   { icon: '🚀', name: 'צמיחה', desc: 'מתמקד בחברות צומחות — מעדיף צמיחת EPS, FCF ומכפילים גבוהים' },
        balanced: { icon: '⚖️', name: 'מאוזן', desc: 'שילוב של צמיחה ויציבות — הגישה המומלצת לרוב המשקיעים' },
        value:    { icon: '💎', name: 'ערך', desc: 'מתמקד במחיר נמוך ויציבות — מעדיף תשואת דיבידנד ו-FCF גבוה' }
    };

    // ── Build wizard overlay ──
    function buildWizard() {
        const wz = document.createElement('div');
        wz.id = 'calc-wizard';
        wz.className = 'wz-overlay';
        wz.innerHTML = `
            <div class="wz-container">
                <!-- Progress -->
                <div class="wz-progress" id="wz-progress"></div>

                <!-- Step panels -->
                <div class="wz-panels" id="wz-panels">

                    <!-- Step 0: Company -->
                    <div class="wz-panel" data-step="0" id="wz-step-company">
                        <div class="wz-step-header">
                            <div class="wz-step-icon-big">🏢</div>
                            <h2>בואו נתחיל — איזו חברה רוצה לנתח?</h2>
                            <p>הקלד שם חברה ציבורית בעברית או באנגלית</p>
                        </div>
                        <div class="wz-input-wrap">
                            <input type="text" id="wz-company-input" class="wz-company-input" placeholder="למשל: Apple, טבע, Microsoft..." autofocus>
                        </div>
                        <div class="wz-nav">
                            <div></div>
                            <button class="wz-btn primary" id="wz-next-company" disabled>
                                הבא <span>←</span>
                            </button>
                        </div>
                        <button class="wz-skip-link" onclick="CalcWizard.skipToFull()">מצב מתקדם — דלג על האשף</button>
                    </div>

                    <!-- Step 1: Profile + Template -->
                    <div class="wz-panel" data-step="1" id="wz-step-profile" style="display:none">
                        <div class="wz-step-header">
                            <h2>מה סגנון ההשקעה שלך?</h2>
                            <p>בחר פרופיל — זה ישפיע על המשקולות של כל מדד</p>
                        </div>
                        <div class="wz-mode-grid" id="wz-mode-grid"></div>

                        <div class="wz-step-header" style="margin-top:28px;">
                            <h2>מאיזה ענף החברה?</h2>
                            <p>תבנית ענפית קובעת את ערכי הסף למדדים</p>
                        </div>
                        <div class="wz-template-grid" id="wz-template-grid"></div>

                        <div class="wz-nav">
                            <button class="wz-btn ghost" onclick="CalcWizard.prev()">
                                <span>→</span> חזור
                            </button>
                            <button class="wz-btn primary" onclick="CalcWizard.next()">
                                הבא <span>←</span>
                            </button>
                        </div>
                    </div>

                    <!-- Step 2: Data entry method -->
                    <div class="wz-panel" data-step="2" id="wz-step-data" style="display:none">
                        <div class="wz-step-header">
                            <h2>איך תרצה להזין נתונים?</h2>
                            <p>בחר את הדרך הנוחה לך — תמיד אפשר לערוך ידנית אח"כ</p>
                        </div>
                        <div class="wz-method-grid">
                            <div class="wz-method-card" data-method="ai" id="wz-method-ai">
                                <div class="wz-method-icon">🤖</div>
                                <div class="wz-method-name">שליפה אוטומטית</div>
                                <div class="wz-method-desc">AI ימלא את כל המדדים עבורך מהאינטרנט</div>
                                <span class="ai-pro-badge" style="margin-top:4px;">PRO</span>
                            </div>
                            <div class="wz-method-card" data-method="paste" id="wz-method-paste">
                                <div class="wz-method-icon">📋</div>
                                <div class="wz-method-name">הדבקת טקסט</div>
                                <div class="wz-method-desc">העתק נתונים מ-ChatGPT, Gemini או כל AI אחר</div>
                                <span class="ai-pro-badge" style="margin-top:4px;">PRO</span>
                            </div>
                            <div class="wz-method-card" data-method="manual" id="wz-method-manual">
                                <div class="wz-method-icon">✏️</div>
                                <div class="wz-method-name">הזנה ידנית</div>
                                <div class="wz-method-desc">מלא כל מדד בעצמך מתוך הדוחות הכספיים</div>
                            </div>
                        </div>
                        <div class="wz-nav">
                            <button class="wz-btn ghost" onclick="CalcWizard.prev()">
                                <span>→</span> חזור
                            </button>
                            <button class="wz-btn primary" id="wz-go-btn" disabled>
                                בואו נתחיל <span>←</span>
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        `;
        return wz;
    }

    // ── Build processing overlay ──
    function buildProcessing() {
        const el = document.createElement('div');
        el.id = 'wz-processing';
        el.className = 'wz-processing';
        el.style.display = 'none';
        el.innerHTML = `
            <div class="wz-proc-content">
                <div class="wz-proc-spinner"></div>
                <h2 id="wz-proc-title">מנתח את הנתונים...</h2>
                <p id="wz-proc-subtitle">אנחנו סורקים 13 מדדים פיננסיים</p>
                <div class="wz-proc-bar"><div class="wz-proc-fill" id="wz-proc-fill"></div></div>
                <div class="wz-proc-steps" id="wz-proc-steps"></div>
            </div>
        `;
        return el;
    }

    // ── Build results action bar ──
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
                        <span>📄</span> PDF
                    </button>
                    <button class="wz-action-btn" onclick="if(typeof CalcAI!=='undefined')CalcAI.analyzeCompany()">
                        <span>🤖</span> ניתוח AI
                    </button>
                    <button class="wz-action-btn" onclick="document.getElementById('compare-toggle')?.click()">
                        <span>📊</span> השוואה
                    </button>
                    <button class="wz-action-btn primary" onclick="CalcWizard.startNew()">
                        <span>🔄</span> חברה חדשה
                    </button>
                </div>
            </div>
        `;
        return bar;
    }

    // ── Render progress bar ──
    function renderProgress() {
        const el = document.getElementById('wz-progress');
        if (!el) return;
        el.innerHTML = STEPS.map((s, i) => `
            <div class="wz-progress-step ${i < currentStep ? 'done' : ''} ${i === currentStep ? 'active' : ''}">
                <div class="wz-progress-dot">${i < currentStep ? '✓' : s.icon}</div>
                <span>${s.title}</span>
            </div>
            ${i < STEPS.length - 1 ? '<div class="wz-progress-line ' + (i < currentStep ? 'done' : '') + '"></div>' : ''}
        `).join('');
    }

    // ── Render mode + template grids ──
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

    // ── Navigation ──
    function showStep(n) {
        currentStep = n;
        document.querySelectorAll('.wz-panel').forEach(p => p.style.display = 'none');
        const panel = document.querySelector(`.wz-panel[data-step="${n}"]`);
        if (panel) {
            panel.style.display = '';
            panel.classList.add('wz-slide-in');
            setTimeout(() => panel.classList.remove('wz-slide-in'), 400);
        }
        renderProgress();
    }

    function next() {
        if (currentStep === 0) {
            const name = document.getElementById('wz-company-input')?.value?.trim();
            if (!name) return;
        }
        if (currentStep < 2) {
            showStep(currentStep + 1);
            if (currentStep === 1) { renderModeGrid(); renderTemplateGrid(); }
        }
    }

    function prev() {
        if (currentStep > 0) showStep(currentStep - 1);
    }

    // ── Apply wizard selections to calculator ──
    function applySelections() {
        // Set company name
        const name = document.getElementById('wz-company-input')?.value?.trim() || '';
        const companyInput = document.getElementById('company-name');
        if (companyInput && name) {
            companyInput.value = name;
            document.getElementById('topbar-company').textContent = name;
        }

        // Set mode
        if (typeof switchMode === 'function') switchMode(selectedMode);

        // Apply template
        if (typeof activeTemplate !== 'undefined') {
            window.activeTemplate = selectedTemplate;
            if (typeof applyTemplate === 'function') applyTemplate();
        }
    }

    // ── Finish wizard and reveal calculator ──
    function finishWizard(method) {
        dataMethod = method;

        // Apply company + mode + template
        applySelections();

        // Hide wizard
        const wz = document.getElementById('calc-wizard');
        if (wz) wz.style.display = 'none';

        // Show calculator
        document.querySelector('main.app').style.display = '';
        document.body.classList.remove('wizard-active');
        document.body.classList.add('wizard-done');

        // Trigger the right data entry method
        if (method === 'ai') {
            // Open auto-fill
            const companyName = document.getElementById('company-name')?.value || '';
            if (typeof CalcAI !== 'undefined' && CalcAI.autoFill) {
                setTimeout(() => CalcAI.autoFill(companyName), 300);
            }
        } else if (method === 'paste') {
            if (typeof CalcAI !== 'undefined' && CalcAI.openPasteModal) {
                setTimeout(() => CalcAI.openPasteModal(), 300);
            }
        }
        // 'manual' = just show the calculator

        // Listen for score updates to trigger processing animation
        observeScore();
    }

    // ── Observe when score changes (data entered) → show processing ──
    let scoreObserverAttached = false;
    let hasShownProcessing = false;

    function observeScore() {
        if (scoreObserverAttached) return;
        scoreObserverAttached = true;

        // Watch for score changes via MutationObserver on gauge text
        const scoreEl = document.getElementById('gauge-score-text');
        if (!scoreEl) return;

        const observer = new MutationObserver(() => {
            const score = parseInt(scoreEl.textContent);
            if (score > 0 && !hasShownProcessing) {
                hasShownProcessing = true;
                observer.disconnect();
                // Small delay then show processing
                setTimeout(() => showProcessing(), 500);
            }
        });

        observer.observe(scoreEl, { childList: true, characterData: true, subtree: true });
    }

    // ── Fake processing animation ──
    function showProcessing() {
        const proc = document.getElementById('wz-processing');
        if (!proc) return;
        proc.style.display = 'flex';

        const messages = [
            { title: 'מנתח רווחיות...', sub: 'בודק ROI, ROE, מרווח גולמי ושולי רווח' },
            { title: 'בודק צמיחה...', sub: 'מחשב FCF Growth, EPS Growth ורכישה עצמית' },
            { title: 'מעריך שווי...', sub: 'מחשב P/E, PEG ומכפילים' },
            { title: 'בודק יציבות...', sub: 'ניתוח Current Ratio, D/E ו-Altman Z' },
            { title: 'מייצר תובנות...', sub: 'מזהה נקודות חוזק וסימני אזהרה' },
            { title: 'מסכם ציון כולל...', sub: 'שוקל את כל המדדים לפי הפרופיל שבחרת' }
        ];

        const fill = document.getElementById('wz-proc-fill');
        const title = document.getElementById('wz-proc-title');
        const sub = document.getElementById('wz-proc-subtitle');
        let i = 0;
        const interval = setInterval(() => {
            if (i < messages.length) {
                title.textContent = messages[i].title;
                sub.textContent = messages[i].sub;
                fill.style.width = `${((i + 1) / messages.length) * 100}%`;
                i++;
            }
        }, 1400);

        setTimeout(() => {
            clearInterval(interval);
            fill.style.width = '100%';
            title.textContent = 'הניתוח מוכן! 🎯';
            sub.textContent = '';

            setTimeout(() => {
                proc.style.display = 'none';
                showResults();
            }, 600);
        }, messages.length * 1400 + 200);
    }

    // ── Show results with action bar ──
    function showResults() {
        // Scroll to score panel
        const scoreCard = document.getElementById('score-card');
        if (scoreCard) {
            scoreCard.scrollIntoView({ behavior: 'smooth', block: 'start' });
            scoreCard.classList.add('wz-highlight');
            setTimeout(() => scoreCard.classList.remove('wz-highlight'), 2000);
        }

        // Show action bar
        const bar = document.getElementById('wz-action-bar');
        if (bar) {
            bar.style.display = '';
            setTimeout(() => bar.classList.add('visible'), 50);
        }
    }

    // ── Start new analysis ──
    function startNew() {
        // Reset
        if (typeof resetAll === 'function') {
            // Suppress confirm dialog for wizard restart
            const origConfirm = window.confirm;
            window.confirm = () => true;
            resetAll();
            window.confirm = origConfirm;
        }

        hasShownProcessing = false;
        scoreObserverAttached = false;
        currentStep = 0;

        // Hide action bar
        const bar = document.getElementById('wz-action-bar');
        if (bar) { bar.classList.remove('visible'); bar.style.display = 'none'; }

        // Hide calculator, show wizard
        document.querySelector('main.app').style.display = 'none';
        document.body.classList.add('wizard-active');
        document.body.classList.remove('wizard-done');

        const wz = document.getElementById('calc-wizard');
        if (wz) {
            wz.style.display = '';
            const input = document.getElementById('wz-company-input');
            if (input) { input.value = ''; input.focus(); }
        }
        showStep(0);
    }

    // ── Skip wizard (power user) ──
    function skipToFull() {
        const wz = document.getElementById('calc-wizard');
        if (wz) wz.style.display = 'none';
        document.querySelector('main.app').style.display = '';
        document.body.classList.remove('wizard-active');
        document.body.classList.add('wizard-done');
    }

    // ── Init ──
    function init() {
        // Build and inject elements
        const app = document.querySelector('main.app');
        if (!app) return;

        // Add wizard overlay
        const wz = buildWizard();
        app.parentNode.insertBefore(wz, app);

        // Add processing overlay
        document.body.appendChild(buildProcessing());

        // Add action bar
        document.body.appendChild(buildActionBar());

        // Hide calculator initially, show wizard
        app.style.display = 'none';
        document.body.classList.add('wizard-active');

        // Bind events
        const companyInput = document.getElementById('wz-company-input');
        const nextBtn = document.getElementById('wz-next-company');
        if (companyInput && nextBtn) {
            companyInput.addEventListener('input', () => {
                nextBtn.disabled = companyInput.value.trim().length < 2;
            });
            companyInput.addEventListener('keydown', e => {
                if (e.key === 'Enter' && !nextBtn.disabled) next();
            });
            nextBtn.addEventListener('click', next);
        }

        // Data method cards
        document.querySelectorAll('.wz-method-card').forEach(card => {
            card.onclick = () => {
                document.querySelectorAll('.wz-method-card').forEach(c => c.classList.remove('selected'));
                card.classList.add('selected');
                dataMethod = card.dataset.method;
                const goBtn = document.getElementById('wz-go-btn');
                if (goBtn) goBtn.disabled = false;
            };
        });

        const goBtn = document.getElementById('wz-go-btn');
        if (goBtn) {
            goBtn.addEventListener('click', () => {
                if (dataMethod) finishWizard(dataMethod);
            });
        }

        // Initial render
        showStep(0);
        renderModeGrid();
        renderTemplateGrid();
    }

    // Auto-init on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    return { next, prev, showStep, skipToFull, startNew, finishWizard };
})();
