// ═══════════════════════════════════════════
// calculator-ai.js — AI Features Module
// Auto-fill, Analysis, Chat Assistant
// ═══════════════════════════════════════════

window.CalcAI = (() => {
    // ── State ──
    let chatHistory = [];
    let isProcessing = false;
    let chatPanelOpen = false;
    let _userHasAccess = null; // null = unchecked, true/false = checked

    // ── Access Check ──
    async function checkAccess() {
        if (_userHasAccess !== null) return _userHasAccess;
        try {
            _userHasAccess = await CalcDB.hasAccess();
        } catch { _userHasAccess = false; }
        return _userHasAccess;
    }

    async function requireAccess(featureName) {
        const has = await checkAccess();
        if (has) return true;
        showUpgradeModal(featureName);
        return false;
    }

    function showUpgradeModal(featureName) {
        document.getElementById('ai-upgrade-modal')?.remove();

        const modal = document.createElement('div');
        modal.id = 'ai-upgrade-modal';
        modal.className = 'modal-overlay';
        modal.innerHTML = `
            <div class="modal-box" style="max-width:520px;background:var(--surface);border:1px solid var(--border);">
                <button class="modal-close" onclick="document.getElementById('ai-upgrade-modal').classList.remove('open');document.body.style.overflow='';">&times;</button>
                <div style="text-align:center;padding:32px 24px 8px;">
                    <div style="width:64px;height:64px;background:linear-gradient(135deg,#0d9488,#14b8a6);border-radius:16px;display:flex;align-items:center;justify-content:center;margin:0 auto 16px;">
                        <svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" style="width:32px;height:32px;"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>
                    </div>
                    <h2 style="font-size:22px;font-weight:800;color:var(--text);margin-bottom:8px;">
                        ${featureName || 'יכולות AI'} — לתלמידי הקורס
                    </h2>
                    <p style="color:var(--text-secondary);font-size:14px;line-height:1.7;margin-bottom:24px;">
                        הפיצ'ר הזה זמין לתלמידי <strong style="color:var(--primary);">Investor Academy</strong>.<br>
                        הצטרף לקורס וקבל גישה לכלי AI מתקדמים שיעזרו לך לנתח חברות כמו מקצוען.
                    </p>
                </div>
                <div style="background:var(--bg);border-radius:12px;margin:0 24px;padding:20px;">
                    <div style="font-size:13px;font-weight:600;color:var(--text);margin-bottom:12px;">מה מקבלים עם הקורס:</div>
                    <div style="display:flex;flex-direction:column;gap:10px;">
                        <div style="display:flex;align-items:center;gap:10px;font-size:13px;color:var(--text-secondary);">
                            <span style="color:#14b8a6;font-size:16px;">✦</span>
                            <span><strong style="color:var(--text);">ניתוח AI</strong> — ניתוח מעמיק בסגנון באפט לכל חברה</span>
                        </div>
                        <div style="display:flex;align-items:center;gap:10px;font-size:13px;color:var(--text-secondary);">
                            <span style="color:#14b8a6;font-size:16px;">✦</span>
                            <span><strong style="color:var(--text);">עוזר פיננסי</strong> — שאל כל שאלה על מדדים והשקעות</span>
                        </div>
                        <div style="display:flex;align-items:center;gap:10px;font-size:13px;color:var(--text-secondary);">
                            <span style="color:#14b8a6;font-size:16px;">✦</span>
                            <span><strong style="color:var(--text);">הדבקת נתונים חכמה</strong> — העתק טקסט מ-AI, הכלי ימלא הכל</span>
                        </div>
                        <div style="display:flex;align-items:center;gap:10px;font-size:13px;color:var(--text-secondary);">
                            <span style="color:#14b8a6;font-size:16px;">✦</span>
                            <span><strong style="color:var(--text);">4 פרקים מלאים</strong> — השיטה המלאה להשקעות ערך</span>
                        </div>
                    </div>
                </div>
                <div style="padding:20px 24px 28px;display:flex;flex-direction:column;gap:10px;">
                    <a href="/investor-academy/" style="display:flex;align-items:center;justify-content:center;gap:8px;padding:14px 24px;background:linear-gradient(135deg,#0d9488,#14b8a6);color:white;border-radius:12px;font-weight:700;font-size:15px;text-decoration:none;transition:all .2s;">
                        גלה את הקורס ←
                    </a>
                    <button onclick="document.getElementById('ai-upgrade-modal').classList.remove('open');document.body.style.overflow='';" style="padding:10px;background:none;border:none;color:var(--text-muted);font-size:13px;cursor:pointer;font-family:var(--font);">
                        אולי אח"כ
                    </button>
                </div>
            </div>
        `;

        document.body.appendChild(modal);
        requestAnimationFrame(() => modal.classList.add('open'));
        document.body.style.overflow = 'hidden';
        modal.addEventListener('click', e => {
            if (e.target === modal) { modal.classList.remove('open'); document.body.style.overflow = ''; }
        });
    }

    // ── Edge Function URL ──
    function getEdgeFunctionUrl() {
        // Use the global SUPABASE_URL from supabase-config.js
        if (typeof SUPABASE_URL !== 'undefined' && SUPABASE_URL) {
            return `${SUPABASE_URL}/functions/v1/calculator-ai`;
        }
        return null;
    }

    async function callAI(action, payload) {
        const url = getEdgeFunctionUrl();
        if (!url) throw new Error('Supabase not configured');
        console.log('CalcAI calling:', url);

        const client = CalcDB.getClient();
        if (!client) throw new Error('Supabase client not available');

        const { data: { session } } = await client.auth.getSession();
        const token = session?.access_token;
        if (!token) throw new Error('Not authenticated');

        const resp = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
                'apikey': (typeof SUPABASE_ANON_KEY !== 'undefined') ? SUPABASE_ANON_KEY : ''
            },
            body: JSON.stringify({ action, payload })
        });

        if (!resp.ok) {
            const errBody = await resp.text().catch(() => 'no body');
            console.error(`CalcAI error: HTTP ${resp.status} — ${errBody}`);
            let errMsg = `HTTP ${resp.status}`;
            try { errMsg = JSON.parse(errBody).error || errMsg; } catch {}
            throw new Error(errMsg);
        }

        const data = await resp.json();
        return data.result;
    }

    // ═══════════════════════════════════════════
    // 1. AUTO-FILL → Opens prompt modal for Gemini/ChatGPT
    // ═══════════════════════════════════════════
    function autoFill(companyName) {
        if (!companyName || companyName.trim().length < 2) {
            showToast('הקלד שם חברה קודם', 'warning');
            return;
        }
        openAutoFillPromptModal(companyName.trim());
    }

    function buildAutoFillPrompt(companyName) {
        return `I need ACCURATE, CURRENT financial data for "${companyName}" to calculate a Financial Health Score.

## CRITICAL: DATA ACCURACY
- Use the MOST RECENT data available (TTM or latest annual report)
- For 5-year growth metrics, calculate CAGR (Compound Annual Growth Rate):
  Formula: ((value_now / value_5_years_ago) ^ (1/5) - 1) × 100
  Example: EPS went from $2 to $6 in 5 years → CAGR = ((6/2)^(0.2) - 1) × 100 = 24.6%
  This is NOT total growth. Total growth would be 200%, but CAGR is 24.6%.
- Cite the source website for EACH metric

## THE 13 METRICS I NEED:

### PROFITABILITY
| # | Metric | Formula | Unit | Source suggestion |
|---|--------|---------|------|-------------------|
| 1 | ROI (or ROIC) | Net Income ÷ Total Invested Capital × 100 | % | stockanalysis.com, gurufocus.com |
| 2 | ROE | Net Income ÷ Equity × 100 | % | stockanalysis.com |
| 3 | Gross Margin | (Revenue - COGS) ÷ Revenue × 100 | % | stockanalysis.com |
| 4 | Gross Margin Growth | YoY change in gross margin (ppts, not %) | ppts | macrotrends.net |
| 5 | Net Profit Margin | Net Income ÷ Revenue × 100 | % | stockanalysis.com |
| 6 | FCF Yield | Free Cash Flow ÷ Market Cap × 100 | % | gurufocus.com |

### GROWTH (5-YEAR CAGR — NOT total growth!)
| # | Metric | Formula | Unit | Source suggestion |
|---|--------|---------|------|-------------------|
| 7 | FCF Growth (5Y CAGR) | ((FCF_now / FCF_5y_ago)^(1/5) - 1) × 100 | % | macrotrends.net FCF history |
| 8 | EPS Growth (5Y CAGR) | ((EPS_now / EPS_5y_ago)^(1/5) - 1) × 100 | % | macrotrends.net EPS history |
| 9 | Buyback Yield | Net buybacks ÷ Market Cap × 100 | % | gurufocus.com |

### VALUATION
| # | Metric | Formula | Unit | Source suggestion |
|---|--------|---------|------|-------------------|
| 10 | P/E Ratio | Price ÷ EPS (TTM) | ratio | yahoo finance |
| 11 | PEG Ratio | P/E ÷ Expected Growth | ratio | yahoo finance, morningstar |

### STABILITY
| # | Metric | Formula | Unit | Source suggestion |
|---|--------|---------|------|-------------------|
| 12 | Current Ratio | Current Assets ÷ Current Liabilities | ratio | stockanalysis.com |
| 13 | D/E Ratio | Total Debt ÷ Equity | ratio | stockanalysis.com |
| 14 | Altman Z-Score | 5-factor formula | score | gurufocus.com |

## REQUIRED OUTPUT FORMAT:
Return a CSV file with this EXACT structure:

\`\`\`csv
שם החברה,פרופיל השקעה (growth/balanced/value),הערות,תשואה על ההשקעה (ROI),תשואה על ההון (ROE),מרווח גולמי,צמיחת מרווח גולמי,שולי רווח נקי,תשואת FCF,צמיחת FCF (5Y CAGR),צמיחת EPS (5Y CAGR),רכישה עצמית (שנתי),יחס מחיר לרווח (P/E),יחס PEG,יחס שוטף (CR),יחס חוב להון (D/E),Altman Z-Score
${companyName},balanced,,ROI_VALUE,ROE_VALUE,GM_VALUE,GM_GROWTH,PM_VALUE,FCF_YIELD,FCF_GROWTH_CAGR,EPS_GROWTH_CAGR,BUYBACK,PE,PEG,CR,DE,ALTMAN_Z
\`\`\`

## RULES:
1. Numbers only — no % signs, no "x" suffix
2. Round to 2 decimal places
3. For CAGR: show the annual compound rate, NOT total 5-year growth
4. If P/E is negative, leave empty
5. CITE YOUR SOURCE for each metric
6. If you calculated CAGR manually, show the start and end values used

After the CSV, list the source for each metric like:
- ROI: [value] from stockanalysis.com
- ROE: [value] from stockanalysis.com
- etc.`;
    }

    function openAutoFillPromptModal(companyName) {
        const prompt = buildAutoFillPrompt(companyName);

        // Remove existing modal
        document.getElementById('ai-autofill-modal')?.remove();

        const modal = document.createElement('div');
        modal.id = 'ai-autofill-modal';
        modal.className = 'modal-overlay';
        modal.innerHTML = `
            <div class="modal-box" style="max-width:750px">
                <button class="modal-close" onclick="document.getElementById('ai-autofill-modal').classList.remove('open');document.body.style.overflow='';">&times;</button>
                <div class="modal-header">
                    <div style="display:flex;align-items:center;gap:12px;">
                        <div style="width:40px;height:40px;background:linear-gradient(135deg,#0d9488,#14b8a6);border-radius:10px;display:flex;align-items:center;justify-content:center;">
                            <svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" style="width:22px;height:22px;"><path d="M12 2a2 2 0 012 2c0 .74-.4 1.39-1 1.73V7h1a7 7 0 017 7h1a1 1 0 011 1v3a1 1 0 01-1 1h-1v1a2 2 0 01-2 2H5a2 2 0 01-2-2v-1H2a1 1 0 01-1-1v-3a1 1 0 011-1h1a7 7 0 017-7h1V5.73c-.6-.34-1-.99-1-1.73a2 2 0 012-2z"/></svg>
                        </div>
                        <div>
                            <h2>הפקת נתונים באמצעות AI</h2>
                            <p style="font-size:13px;color:var(--text-secondary);margin:4px 0 0;">מילוי אוטומטי בקרוב — בינתיים, העתק את הפרומפט</p>
                        </div>
                    </div>
                </div>
                <div style="padding:16px 24px;">
                    <div style="background:var(--primary-bg);border:1px solid var(--primary-light);border-radius:12px;padding:14px 16px;margin-bottom:16px;">
                        <div style="font-size:14px;font-weight:600;color:var(--primary-dark);margin-bottom:8px;">📋 איך להשתמש:</div>
                        <div style="font-size:13px;color:var(--text-secondary);line-height:1.8;">
                            1. העתק את הפרומפט למטה<br>
                            2. הדבק ב-<strong>Gemini</strong>, <strong>ChatGPT</strong>, או <strong>Claude</strong><br>
                            3. קבל CSV מוכן + מקורות לכל מדד<br>
                            4. ייבא את ה-CSV דרך כפתור "ייבוא CSV" בכלי
                        </div>
                    </div>
                    <div style="position:relative;">
                        <pre style="background:var(--bg);border:1px solid var(--border);border-radius:12px;padding:16px;font-size:11px;line-height:1.6;white-space:pre-wrap;word-wrap:break-word;color:var(--text);max-height:350px;overflow-y:auto;font-family:ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,monospace;direction:ltr;text-align:left;">${escapeHtml(prompt)}</pre>
                    </div>
                </div>
                <div style="padding:12px 24px 20px;display:flex;gap:10px;">
                    <button onclick="CalcAI._copyAutoFillPrompt()" style="flex:1;padding:14px 20px;background:linear-gradient(135deg,#0d9488,#14b8a6);color:white;border:none;border-radius:10px;font-weight:600;font-size:15px;cursor:pointer;font-family:var(--font);display:flex;align-items:center;justify-content:center;gap:8px;">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:18px;height:18px;"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>
                        העתק פרומפט
                    </button>
                    <button onclick="CalcAI._downloadAutoFillPrompt()" style="padding:14px 20px;background:var(--bg);color:var(--text);border:1px solid var(--border);border-radius:10px;font-weight:600;font-size:15px;cursor:pointer;font-family:var(--font);display:flex;align-items:center;justify-content:center;gap:8px;">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:18px;height:18px;"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                        הורד .txt
                    </button>
                </div>
            </div>
        `;

        document.body.appendChild(modal);
        // Store prompt for copy/download
        window._aiAutoFillPrompt = prompt;
        window._aiAutoFillCompany = companyName;

        // Open with animation
        requestAnimationFrame(() => modal.classList.add('open'));
        document.body.style.overflow = 'hidden';

        // Close on backdrop
        modal.addEventListener('click', e => {
            if (e.target === modal) {
                modal.classList.remove('open');
                document.body.style.overflow = '';
            }
        });
    }

    function _copyAutoFillPrompt() {
        const prompt = window._aiAutoFillPrompt;
        if (!prompt) return;
        navigator.clipboard.writeText(prompt).then(() => {
            showToast('הפרומפט הועתק! 📋 הדבק ב-Gemini או ChatGPT');
        }).catch(() => {
            showToast('שגיאה בהעתקה — נסה הורדה', 'error');
        });
    }

    function _downloadAutoFillPrompt() {
        const prompt = window._aiAutoFillPrompt;
        const company = window._aiAutoFillCompany || 'company';
        if (!prompt) return;
        const blob = new Blob([prompt], { type: 'text/plain;charset=utf-8;' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = `ai_prompt_${company.replace(/\s+/g, '_')}.txt`;
        link.click();
        showToast('הפרומפט הורד!');
    }

    function getMetricIds() {
        return ['roi', 'roe', 'gross-margin', 'pm', 'fcf-yield', 'fcf-growth',
            'eps-growth', 'buyback', 'pe', 'peg', 'cr', 'de', 'altman-z'];
    }

    // ═══════════════════════════════════════════
    // 1b. TEXT PASTE → AUTO-PARSE (Premium)
    // ═══════════════════════════════════════════
    async function openPasteModal() {
        if (!(await requireAccess('הדבקת נתונים חכמה'))) return;

        document.getElementById('ai-paste-modal')?.remove();

        const modal = document.createElement('div');
        modal.id = 'ai-paste-modal';
        modal.className = 'modal-overlay';
        modal.innerHTML = `
            <div class="modal-box" style="max-width:650px;background:var(--surface);border:1px solid var(--border);">
                <button class="modal-close" onclick="document.getElementById('ai-paste-modal').classList.remove('open');document.body.style.overflow='';">&times;</button>
                <div class="modal-header">
                    <div style="display:flex;align-items:center;gap:12px;">
                        <div style="width:40px;height:40px;background:linear-gradient(135deg,#0d9488,#14b8a6);border-radius:10px;display:flex;align-items:center;justify-content:center;">
                            <svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" style="width:22px;height:22px;"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>
                        </div>
                        <div>
                            <h2 style="color:var(--text);">הדבקת נתונים חכמה</h2>
                            <p style="font-size:13px;color:var(--text-secondary);margin:2px 0 0;">העתק פלט מ-Gemini/ChatGPT והדבק כאן — הכלי ימלא הכל</p>
                        </div>
                    </div>
                </div>
                <div style="padding:16px 24px;">
                    <textarea id="ai-paste-textarea" placeholder="הדבק כאן את הטקסט מה-AI... (טבלאות, CSV, טקסט חופשי — הכל עובד)" 
                        style="width:100%;min-height:200px;max-height:350px;resize:vertical;border:2px solid var(--border);border-radius:12px;padding:14px;font-size:13px;font-family:ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,monospace;line-height:1.6;background:var(--bg);color:var(--text);direction:ltr;text-align:left;" dir="ltr"></textarea>
                    <div style="font-size:11px;color:var(--text-muted);margin-top:8px;display:flex;align-items:center;gap:6px;">
                        <span style="color:var(--primary);">💡</span>
                        אפשר להדביק: טבלאות, CSV, JSON, טקסט חופשי עם מספרים — ה-AI יזהה הכל
                    </div>
                </div>
                <div style="padding:12px 24px 20px;display:flex;gap:10px;">
                    <button id="ai-paste-submit" onclick="CalcAI.parsePastedText()" style="flex:1;padding:14px 20px;background:linear-gradient(135deg,#0d9488,#14b8a6);color:white;border:none;border-radius:10px;font-weight:600;font-size:15px;cursor:pointer;font-family:var(--font);display:flex;align-items:center;justify-content:center;gap:8px;">
                        🤖 מלא נתונים
                    </button>
                    <button onclick="document.getElementById('ai-paste-modal').classList.remove('open');document.body.style.overflow='';" style="padding:14px 20px;background:var(--bg);color:var(--text-secondary);border:1px solid var(--border);border-radius:10px;font-weight:500;font-size:14px;cursor:pointer;font-family:var(--font);">
                        ביטול
                    </button>
                </div>
            </div>
        `;

        document.body.appendChild(modal);
        requestAnimationFrame(() => modal.classList.add('open'));
        document.body.style.overflow = 'hidden';
        modal.addEventListener('click', e => {
            if (e.target === modal) { modal.classList.remove('open'); document.body.style.overflow = ''; }
        });

        // Focus textarea
        setTimeout(() => document.getElementById('ai-paste-textarea')?.focus(), 200);
    }

    async function parsePastedText() {
        const textarea = document.getElementById('ai-paste-textarea');
        const text = textarea?.value?.trim();
        if (!text || text.length < 20) {
            showToast('הדבק טקסט ארוך יותר', 'warning');
            return;
        }

        const submitBtn = document.getElementById('ai-paste-submit');
        if (submitBtn) {
            submitBtn.innerHTML = '<span class="ai-spinner"></span> מנתח טקסט...';
            submitBtn.disabled = true;
        }

        try {
            const result = await callAI('parse', { text });

            if (result.error) {
                showToast('לא הצלחתי לחלץ נתונים: ' + result.error, 'error');
                return;
            }

            // Fill metrics from parsed result
            const metricMap = {
                'roi': 'roi-value', 'roe': 'roe-value', 'gross-margin': 'gross-margin-value',
                'gross-margin-growth': 'gross-margin-growth-value', 'pm': 'pm-value',
                'fcf-yield': 'fcf-yield-value', 'fcf-growth': 'fcf-growth-value',
                'eps-growth': 'eps-growth-value', 'buyback': 'buyback-value',
                'pe': 'pe-value', 'peg': 'peg-value', 'cr': 'cr-value',
                'de': 'de-value', 'altman-z': 'altman-z-value'
            };

            let filled = 0;
            Object.entries(metricMap).forEach(([key, inputId]) => {
                const value = result[key];
                if (value !== null && value !== undefined && !isNaN(Number(value))) {
                    const input = document.getElementById(inputId);
                    if (input) {
                        input.value = Number(value).toFixed(2);
                        input.classList.add('ai-filled');
                        setTimeout(() => input.classList.remove('ai-filled'), 2000);
                        filled++;
                    }
                }
            });

            // Update company name if found
            if (result.company) {
                const companyEl = document.getElementById('company-name');
                if (companyEl && !companyEl.value.trim()) {
                    companyEl.value = result.company;
                    document.getElementById('topbar-company').textContent = result.company;
                }
            }

            if (typeof updateAllMetrics === 'function') updateAllMetrics();

            // Close modal
            document.getElementById('ai-paste-modal')?.classList.remove('open');
            document.body.style.overflow = '';

            showToast(`🤖 ${filled} מדדים מולאו מהטקסט!`);

        } catch (err) {
            console.error('Parse error:', err);
            showToast('שגיאה בניתוח הטקסט: ' + err.message, 'error');
        } finally {
            if (submitBtn) {
                submitBtn.innerHTML = '🤖 מלא נתונים';
                submitBtn.disabled = false;
            }
        }
    }

    function showAIDisclaimer(sources, dataDate, confidence, warnings, metricSources) {
        const existing = document.getElementById('ai-disclaimer');
        if (existing) existing.remove();

        const confidenceMap = {
            high: { label: 'ביטחון גבוה', color: '#10b981', bg: 'rgba(16,185,129,0.12)' },
            medium: { label: 'ביטחון בינוני', color: '#f59e0b', bg: 'rgba(245,158,11,0.12)' },
            low: { label: 'ביטחון נמוך', color: '#ef4444', bg: 'rgba(239,68,68,0.12)' }
        };
        const conf = confidenceMap[confidence] || confidenceMap.medium;

        const warningsHtml = (warnings && warnings.length > 0)
            ? `<div class="ai-disclaimer-warnings">${warnings.map(w => `<span class="ai-warning-pill">⚠️ ${w}</span>`).join('')}</div>`
            : '';

        // Extract unique sources from per-metric data
        let sourcesHtml = '';
        if (metricSources && Object.keys(metricSources).length > 0) {
            const uniqueSources = [...new Set(Object.values(metricSources))].filter(Boolean);
            if (uniqueSources.length > 0) {
                sourcesHtml = `<div class="ai-disclaimer-sources" style="margin:4px 0;">מקורות: ${uniqueSources.join(' · ')}</div>`;
            }
        } else if (sources) {
            sourcesHtml = `<div class="ai-disclaimer-sources">${sources}</div>`;
        }

        const disc = document.createElement('div');
        disc.id = 'ai-disclaimer';
        disc.className = 'ai-disclaimer';
        disc.innerHTML = `
            <div class="ai-disclaimer-icon">🤖</div>
            <div class="ai-disclaimer-text">
                <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;margin-bottom:4px;">
                    <strong>נתונים נאספו מהאינטרנט</strong>
                    <span class="ai-confidence-badge" style="background:${conf.bg};color:${conf.color};padding:2px 8px;border-radius:12px;font-size:11px;font-weight:600;">${conf.label}</span>
                    <span style="font-size:12px;color:var(--text-muted);">${dataDate || 'TTM'}</span>
                </div>
                ${sourcesHtml}
                ${warningsHtml}
                <div class="ai-disclaimer-warn">⚠️ הנתונים נלקחו מהאתרים המצוינים — בדוק אותם מול דוחות רשמיים לפני קבלת החלטות</div>
            </div>
            <button onclick="this.parentElement.remove()" class="ai-disclaimer-close">&times;</button>
        `;

        const inputSection = document.getElementById('input-section');
        if (inputSection) inputSection.after(disc);
    }

    // ═══════════════════════════════════════════
    // 2. AI ANALYSIS
    // ═══════════════════════════════════════════
    async function analyzeCompany() {
        if (isProcessing) return;
        if (!(await requireAccess('ניתוח AI'))) return;

        const companyName = document.getElementById('company-name')?.value?.trim();
        if (!companyName) {
            showToast('הקלד שם חברה קודם', 'warning');
            return;
        }

        // Gather current metrics
        const metrics = {};
        let hasData = false;
        if (typeof getAllMetrics === 'function') {
            getAllMetrics().forEach(m => {
                const card = document.getElementById(`${m.id}-card`);
                if (!card) return;
                const inp = card.querySelector(`#${m.inputs[0].id}`);
                if (!inp || inp.value === '') return;
                hasData = true;
                const status = document.getElementById(`${m.id}-status`);
                metrics[m.name] = {
                    value: parseFloat(inp.value),
                    unit: m.unit || '',
                    score: metricScores[m.id] || 0,
                    pass: status?.classList.contains('pass') || false
                };
            });
        }

        if (!hasData) {
            showToast('הזן מדדים לפני ניתוח AI', 'warning');
            return;
        }

        isProcessing = true;
        openAIAnalysisModal();

        const contentEl = document.getElementById('ai-analysis-content');
        if (contentEl) contentEl.innerHTML = '<div class="ai-loading"><span class="ai-spinner"></span> מנתח את הנתונים...</div>';

        try {
            const scoreText = document.getElementById('gauge-score-text');
            const totalScore = scoreText ? parseInt(scoreText.textContent) : 0;

            const result = await callAI('analyze', {
                companyName,
                mode: typeof currentMode !== 'undefined' ? currentMode : 'balanced',
                metrics,
                totalScore
            });

            if (contentEl) {
                // Convert markdown-ish to HTML
                const html = formatAIResponse(result);
                contentEl.innerHTML = html + `
                    <div style="margin-top:20px;padding-top:16px;border-top:1px solid var(--border);display:flex;gap:10px;justify-content:flex-end;">
                        <button onclick="CalcAI._saveAnalysisToNotes()" style="display:flex;align-items:center;gap:6px;padding:10px 18px;background:var(--primary);color:white;border:none;border-radius:var(--radius-md);font-weight:600;font-size:13px;cursor:pointer;font-family:var(--font);transition:all .2s;">
                            📝 שמור להערות
                        </button>
                        <button onclick="document.getElementById('ai-analysis-modal').classList.remove('open');document.body.style.overflow='';" style="padding:10px 18px;background:var(--bg);color:var(--text-secondary);border:1px solid var(--border);border-radius:var(--radius-md);font-weight:500;font-size:13px;cursor:pointer;font-family:var(--font);">
                            סגור
                        </button>
                    </div>
                `;
            }

        } catch (err) {
            console.error('Analysis error:', err);
            if (contentEl) {
                contentEl.innerHTML = `<div class="ai-error">❌ שגיאה בניתוח: ${err.message}</div>`;
            }
        } finally {
            isProcessing = false;
        }
    }

    function openAIAnalysisModal() {
        let modal = document.getElementById('ai-analysis-modal');
        if (!modal) {
            modal = document.createElement('div');
            modal.id = 'ai-analysis-modal';
            modal.className = 'modal-overlay';
            modal.innerHTML = `
                <div class="modal-box" style="max-width:700px">
                    <button class="modal-close" onclick="document.getElementById('ai-analysis-modal').classList.remove('open');document.body.style.overflow='';">&times;</button>
                    <div class="modal-header">
                        <div style="display:flex;align-items:center;gap:12px;">
                            <div style="width:40px;height:40px;background:linear-gradient(135deg,#0d9488,#14b8a6);border-radius:10px;display:flex;align-items:center;justify-content:center;">
                                <svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" style="width:22px;height:22px;"><path d="M12 2a2 2 0 012 2c0 .74-.4 1.39-1 1.73V7h1a7 7 0 017 7h1a1 1 0 011 1v3a1 1 0 01-1 1h-1v1a2 2 0 01-2 2H5a2 2 0 01-2-2v-1H2a1 1 0 01-1-1v-3a1 1 0 011-1h1a7 7 0 017-7h1V5.73c-.6-.34-1-.99-1-1.73a2 2 0 012-2z"/></svg>
                            </div>
                            <div>
                                <h2>ניתוח AI</h2>
                                <p style="font-size:13px;color:var(--text-secondary);margin:0;">מופעל ע"י Claude</p>
                            </div>
                        </div>
                    </div>
                    <div id="ai-analysis-content" class="ai-analysis-content" dir="rtl"></div>
                </div>
            `;
            document.body.appendChild(modal);
            modal.addEventListener('click', e => { if (e.target === modal) { modal.classList.remove('open'); document.body.style.overflow = ''; } });
        }
        modal.classList.add('open');
        document.body.style.overflow = 'hidden';
    }

    // ═══════════════════════════════════════════
    // 3. AI CHAT ASSISTANT
    // ═══════════════════════════════════════════
    function initChat() {
        // Create chat FAB (Floating Action Button)
        if (document.getElementById('ai-chat-fab')) return;

        const fab = document.createElement('button');
        fab.id = 'ai-chat-fab';
        fab.className = 'ai-chat-fab';
        fab.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2a2 2 0 012 2c0 .74-.4 1.39-1 1.73V7h1a7 7 0 017 7h1a1 1 0 011 1v3a1 1 0 01-1 1h-1v1a2 2 0 01-2 2H5a2 2 0 01-2-2v-1H2a1 1 0 01-1-1v-3a1 1 0 011-1h1a7 7 0 017-7h1V5.73c-.6-.34-1-.99-1-1.73a2 2 0 012-2z"/></svg><span class="ai-pro-badge">PRO</span>`;
        fab.title = 'עוזר AI';
        fab.onclick = toggleChat;
        document.body.appendChild(fab);

        // Create chat panel
        const panel = document.createElement('div');
        panel.id = 'ai-chat-panel';
        panel.className = 'ai-chat-panel';
        panel.innerHTML = `
            <div class="ai-chat-header">
                <div class="ai-chat-header-info">
                    <div class="ai-chat-avatar">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2a2 2 0 012 2c0 .74-.4 1.39-1 1.73V7h1a7 7 0 017 7h1a1 1 0 011 1v3a1 1 0 01-1 1h-1v1a2 2 0 01-2 2H5a2 2 0 01-2-2v-1H2a1 1 0 01-1-1v-3a1 1 0 011-1h1a7 7 0 017-7h1V5.73c-.6-.34-1-.99-1-1.73a2 2 0 012-2z"/></svg>
                    </div>
                    <div>
                        <strong>עוזר פיננסי</strong>
                        <span class="ai-chat-status">מופעל ע"י Claude</span>
                    </div>
                </div>
                <div class="ai-chat-header-actions">
                    <button onclick="CalcAI.clearChat()" title="נקה שיחה" class="ai-chat-header-btn">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:16px;height:16px;"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"/></svg>
                    </button>
                    <button onclick="CalcAI.toggleChat()" title="סגור" class="ai-chat-header-btn">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:16px;height:16px;"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                    </button>
                </div>
            </div>
            <div class="ai-chat-messages" id="ai-chat-messages">
                <div class="ai-chat-welcome">
                    <div class="ai-chat-welcome-icon">🤖</div>
                    <strong>שלום! אני העוזר הפיננסי שלך</strong>
                    <p>תוכל לשאול אותי על מדדים פיננסיים, הערכות שווי, או על הניתוח הנוכחי שלך.</p>
                    <div class="ai-chat-suggestions">
                        <button onclick="CalcAI.sendSuggestion('מה זה Altman Z-Score ולמה הוא חשוב?')">מה זה Z-Score?</button>
                        <button onclick="CalcAI.sendSuggestion('תסביר לי את ההבדל בין ROI ל-ROE')">ROI vs ROE</button>
                        <button onclick="CalcAI.sendSuggestion('מה המדדים הכי חשובים למשקיע ערך?')">מדדים למשקיע ערך</button>
                    </div>
                </div>
            </div>
            <div class="ai-chat-input-area">
                <textarea id="ai-chat-input" placeholder="שאל שאלה..." rows="1" 
                    onkeydown="if(event.key==='Enter'&&!event.shiftKey){event.preventDefault();CalcAI.sendMessage();}"></textarea>
                <button id="ai-chat-send" onclick="CalcAI.sendMessage()" class="ai-chat-send-btn">
                    <svg viewBox="0 0 24 24" fill="currentColor" style="width:20px;height:20px;transform:scaleX(-1)"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>
                </button>
            </div>
        `;
        document.body.appendChild(panel);

        // Auto-resize textarea
        const textarea = document.getElementById('ai-chat-input');
        if (textarea) {
            textarea.addEventListener('input', () => {
                textarea.style.height = 'auto';
                textarea.style.height = Math.min(textarea.scrollHeight, 120) + 'px';
            });
        }
    }

    async function toggleChat() {
        if (!chatPanelOpen && !(await requireAccess('עוזר AI פיננסי'))) return;
        chatPanelOpen = !chatPanelOpen;
        const panel = document.getElementById('ai-chat-panel');
        const fab = document.getElementById('ai-chat-fab');
        if (panel) panel.classList.toggle('open', chatPanelOpen);
        if (fab) fab.classList.toggle('active', chatPanelOpen);
    }

    function clearChat() {
        chatHistory = [];
        const messages = document.getElementById('ai-chat-messages');
        if (messages) {
            messages.innerHTML = `
                <div class="ai-chat-welcome">
                    <div class="ai-chat-welcome-icon">🤖</div>
                    <strong>שיחה חדשה</strong>
                    <p>איך אפשר לעזור?</p>
                </div>
            `;
        }
    }

    function sendSuggestion(text) {
        const input = document.getElementById('ai-chat-input');
        if (input) input.value = text;
        sendMessage();
    }

    async function sendMessage() {
        const input = document.getElementById('ai-chat-input');
        if (!input) return;
        const message = input.value.trim();
        if (!message || isProcessing) return;

        // ── Rate limit: 20 messages per day ──
        const today = new Date().toDateString();
        const chatKey = 'calc-chat-' + today;
        const chatCount = parseInt(localStorage.getItem(chatKey) || '0');
        if (chatCount >= 20) {
            appendChatMessage('assistant', '⚠️ הגעת למגבלת 20 הודעות ליום. הצ׳אט יתאפס מחר. בינתיים, אפשר להשתמש בניתוח AI ובהדבקת טקסט ללא הגבלה.');
            return;
        }
        localStorage.setItem(chatKey, String(chatCount + 1));

        input.value = '';
        input.style.height = 'auto';

        // Remove welcome if first message
        const welcome = document.querySelector('.ai-chat-welcome');
        if (welcome) welcome.remove();

        // Add user message
        appendChatMessage('user', message);
        chatHistory.push({ role: 'user', content: message });

        // Show typing indicator
        const typingId = appendTypingIndicator();

        isProcessing = true;

        try {
            // Gather context
            const context = getCurrentContext();

            const result = await callAI('chat', {
                message,
                context,
                history: chatHistory.slice(-10) // Last 10 messages for context
            });

            // Remove typing indicator
            removeTypingIndicator(typingId);

            // Add AI response
            appendChatMessage('assistant', result);
            chatHistory.push({ role: 'assistant', content: result });

        } catch (err) {
            removeTypingIndicator(typingId);
            appendChatMessage('assistant', `❌ שגיאה: ${err.message}. נסה שוב.`);
        } finally {
            isProcessing = false;
        }
    }

    function getCurrentContext() {
        const companyName = document.getElementById('company-name')?.value?.trim();
        const scoreText = document.getElementById('gauge-score-text');
        const totalScore = scoreText ? parseInt(scoreText.textContent) : 0;

        if (!companyName) return null;

        // Build a concise metrics summary for chat context
        let metricsSummary = '';
        try {
            if (typeof getAllMetrics === 'function' && typeof metricScores !== 'undefined') {
                const parts = [];
                const passing = [];
                const failing = [];
                getAllMetrics().forEach(m => {
                    const card = document.getElementById(`${m.id}-card`);
                    if (!card) return;
                    const inp = card.querySelector(`#${m.inputs[0].id}`);
                    if (!inp || inp.value === '') return;
                    const status = document.getElementById(`${m.id}-status`);
                    const pass = status?.classList.contains('pass');
                    const shortName = m.name.split('(')[0].trim();
                    if (pass) passing.push(shortName);
                    else failing.push(shortName);
                });
                if (passing.length) parts.push(`עוברים: ${passing.join(', ')}`);
                if (failing.length) parts.push(`לא עוברים: ${failing.join(', ')}`);
                metricsSummary = parts.join(' | ');
            }
        } catch (e) { /* non-critical */ }

        return {
            company: companyName,
            totalScore,
            mode: typeof currentMode !== 'undefined' ? currentMode : 'balanced',
            metricsSummary
        };
    }

    function appendChatMessage(role, content) {
        const messages = document.getElementById('ai-chat-messages');
        if (!messages) return;

        const msg = document.createElement('div');
        msg.className = `ai-chat-msg ai-chat-msg-${role}`;

        if (role === 'assistant') {
            msg.innerHTML = `
                <div class="ai-chat-msg-avatar">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:14px;height:14px;"><path d="M12 2a2 2 0 012 2c0 .74-.4 1.39-1 1.73V7h1a7 7 0 017 7h1a1 1 0 011 1v3a1 1 0 01-1 1h-1v1a2 2 0 01-2 2H5a2 2 0 01-2-2v-1H2a1 1 0 01-1-1v-3a1 1 0 011-1h1a7 7 0 017-7h1V5.73c-.6-.34-1-.99-1-1.73a2 2 0 012-2z"/></svg>
                </div>
                <div class="ai-chat-msg-content">${formatAIResponse(content)}</div>
            `;
        } else {
            msg.innerHTML = `<div class="ai-chat-msg-content">${escapeHtml(content)}</div>`;
        }

        messages.appendChild(msg);
        messages.scrollTop = messages.scrollHeight;
    }

    function appendTypingIndicator() {
        const messages = document.getElementById('ai-chat-messages');
        if (!messages) return null;
        const id = 'typing-' + Date.now();
        const el = document.createElement('div');
        el.id = id;
        el.className = 'ai-chat-msg ai-chat-msg-assistant ai-typing';
        el.innerHTML = `
            <div class="ai-chat-msg-avatar">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:14px;height:14px;"><path d="M12 2a2 2 0 012 2c0 .74-.4 1.39-1 1.73V7h1a7 7 0 017 7h1a1 1 0 011 1v3a1 1 0 01-1 1h-1v1a2 2 0 01-2 2H5a2 2 0 01-2-2v-1H2a1 1 0 01-1-1v-3a1 1 0 011-1h1a7 7 0 017-7h1V5.73c-.6-.34-1-.99-1-1.73a2 2 0 012-2z"/></svg>
            </div>
            <div class="ai-chat-msg-content"><span class="ai-typing-dots"><span>.</span><span>.</span><span>.</span></span></div>
        `;
        messages.appendChild(el);
        messages.scrollTop = messages.scrollHeight;
        return id;
    }

    function removeTypingIndicator(id) {
        if (id) document.getElementById(id)?.remove();
    }

    // ── Formatters ──
    function formatAIResponse(text) {
        if (!text) return '';
        let html = escapeHtml(text);
        // Bold: **text**
        html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
        // Newlines
        html = html.replace(/\n/g, '<br>');
        // Numbered lists
        html = html.replace(/(\d+)\.\s/g, '<br><strong>$1.</strong> ');
        return html;
    }

    function escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    // ═══════════════════════════════════════════
    // 4. UI INJECTION — Add AI buttons to existing UI
    // ═══════════════════════════════════════════
    function injectUI() {
        // Add AI auto-fill button next to company name input
        const companyInput = document.getElementById('company-name');
        if (companyInput && !document.getElementById('ai-autofill-btn')) {
            const wrapper = document.createElement('div');
            wrapper.className = 'ai-autofill-wrapper';
            companyInput.parentNode.insertBefore(wrapper, companyInput);
            wrapper.appendChild(companyInput);

            const btn = document.createElement('button');
            btn.id = 'ai-autofill-btn';
            btn.className = 'ai-autofill-btn';
            btn.innerHTML = `
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:16px;height:16px;">
                    <path d="M12 2a2 2 0 012 2c0 .74-.4 1.39-1 1.73V7h1a7 7 0 017 7h1a1 1 0 011 1v3a1 1 0 01-1 1h-1v1a2 2 0 01-2 2H5a2 2 0 01-2-2v-1H2a1 1 0 01-1-1v-3a1 1 0 011-1h1a7 7 0 017-7h1V5.73c-.6-.34-1-.99-1-1.73a2 2 0 012-2z"/>
                </svg>
                <span>שלוף נתונים 🤖</span>
            `;
            btn.onclick = () => autoFill(companyInput.value);
            wrapper.appendChild(btn);
        }

        // Add AI analyze button to analysis group (with PRO badge)
        const analysisGroup = document.getElementById('toolbar-analysis');
        if (analysisGroup && !document.getElementById('ai-analyze-btn')) {
            const btn = document.createElement('button');
            btn.id = 'ai-analyze-btn';
            btn.className = 'tool-btn ai-tool-btn';
            btn.innerHTML = `
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M12 2a2 2 0 012 2c0 .74-.4 1.39-1 1.73V7h1a7 7 0 017 7h1a1 1 0 011 1v3a1 1 0 01-1 1h-1v1a2 2 0 01-2 2H5a2 2 0 01-2-2v-1H2a1 1 0 01-1-1v-3a1 1 0 011-1h1a7 7 0 017-7h1V5.73c-.6-.34-1-.99-1-1.73a2 2 0 012-2z"/>
                </svg>
                <span>ניתוח AI</span>
                <span class="ai-pro-badge">PRO</span>
            `;
            btn.onclick = analyzeCompany;
            analysisGroup.insertBefore(btn, analysisGroup.firstChild);
        }

        // Add paste button to data group (with PRO badge)
        const dataGroup = document.getElementById('toolbar-data');
        if (dataGroup && !document.getElementById('ai-paste-btn')) {
            const btn = document.createElement('button');
            btn.id = 'ai-paste-btn';
            btn.className = 'tool-btn ai-tool-btn';
            btn.innerHTML = `
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/>
                </svg>
                <span>הדבק טקסט</span>
                <span class="ai-pro-badge">PRO</span>
            `;
            btn.onclick = openPasteModal;
            dataGroup.appendChild(btn);
        }

        // Initialize chat
        initChat();
    }

    // ═══════════════════════════════════════════
    // 5. CSS INJECTION FOR AI COMPONENTS
    // ═══════════════════════════════════════════
    function injectStyles() {
        if (document.getElementById('ai-styles')) return;
        const style = document.createElement('style');
        style.id = 'ai-styles';
        style.textContent = `
/* ── AI Auto-fill Wrapper ── */
.ai-autofill-wrapper {
    position: relative;
    display: flex;
    align-items: center;
    gap: 8px;
    width: 100%;
}
.ai-autofill-wrapper > input[type="text"] {
    flex: 1;
}
.ai-autofill-btn {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 10px 16px;
    background: linear-gradient(135deg, #0d9488, #14b8a6);
    color: white;
    border: none;
    border-radius: var(--radius-md);
    font-size: 13px;
    font-weight: 600;
    font-family: var(--font);
    cursor: pointer;
    white-space: nowrap;
    transition: all .2s;
    flex-shrink: 0;
}
.ai-autofill-btn:hover { 
    background: linear-gradient(135deg, #0f766e, #0d9488);
    box-shadow: 0 4px 12px rgba(20,184,166,0.3);
}
.ai-autofill-btn:disabled { opacity: 0.6; cursor: wait; }

/* ── AI Tool Button ── */
.ai-tool-btn {
    background: linear-gradient(135deg, #f0fdfa, #ccfbf1) !important;
    color: #0d9488 !important;
    border: 1px solid #99f6e4 !important;
}
.ai-tool-btn:hover {
    background: linear-gradient(135deg, #0d9488, #14b8a6) !important;
    color: white !important;
}

/* ── AI Filled Input Flash ── */
.metric-input.ai-filled {
    animation: aiFillFlash 0.8s ease;
    border-color: #14b8a6 !important;
    box-shadow: 0 0 0 3px rgba(20,184,166,0.15) !important;
}
@keyframes aiFillFlash {
    0% { background: #f0fdfa; }
    100% { background: inherit; }
}

/* ── Per-metric Source Badge ── */
.ai-source-badge {
    display: inline-block;
    padding: 1px 7px;
    background: #f0fdfa;
    color: #0d9488;
    border-radius: 6px;
    font-size: 9px;
    font-weight: 500;
    font-family: var(--font);
    white-space: nowrap;
    margin-right: 4px;
    cursor: help;
    border: 1px solid #99f6e4;
    max-width: 120px;
    overflow: hidden;
    text-overflow: ellipsis;
    vertical-align: middle;
}

/* ── AI Disclaimer ── */
.ai-disclaimer {
    display: flex;
    align-items: flex-start;
    gap: 12px;
    padding: 14px 18px;
    background: linear-gradient(135deg, #f0fdfa, #ecfdf5);
    border: 1px solid #99f6e4;
    border-radius: var(--radius-lg);
    margin-top: 8px;
    font-size: 13px;
    line-height: 1.6;
    animation: fadeUp .4s ease;
}
.ai-disclaimer-icon { font-size: 24px; flex-shrink: 0; }
.ai-disclaimer-sources { font-size: 11px; color: var(--text-muted); }
.ai-disclaimer-warn { font-size: 11px; color: var(--warning); font-weight: 500; margin-top: 4px; }
.ai-disclaimer-warnings {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
    margin: 6px 0;
}
.ai-warning-pill {
    display: inline-block;
    padding: 3px 10px;
    background: #FEF3C7;
    color: #92400E;
    border-radius: 8px;
    font-size: 11px;
    font-weight: 500;
    border: 1px solid #FDE68A;
}
.ai-disclaimer-close {
    margin-right: auto;
    background: none;
    border: none;
    font-size: 18px;
    cursor: pointer;
    color: var(--text-muted);
    padding: 0 4px;
}

/* ── AI Spinner ── */
.ai-spinner {
    display: inline-block;
    width: 16px;
    height: 16px;
    border: 2px solid rgba(255,255,255,0.3);
    border-top-color: white;
    border-radius: 50%;
    animation: aiSpin 0.6s linear infinite;
}
@keyframes aiSpin { to { transform: rotate(360deg); } }

/* ── AI Analysis Modal Content ── */
.ai-analysis-content {
    padding: 20px 24px;
    font-size: 14px;
    line-height: 1.8;
    color: var(--text);
    max-height: 60vh;
    overflow-y: auto;
}
.ai-loading {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 40px;
    justify-content: center;
    color: var(--text-secondary);
}
.ai-loading .ai-spinner {
    border-color: rgba(20,184,166,0.2);
    border-top-color: #14b8a6;
}
.ai-error {
    padding: 20px;
    text-align: center;
    color: var(--danger);
}

/* ── Chat FAB ── */
.ai-chat-fab {
    position: fixed;
    bottom: 24px;
    left: 24px;
    width: 56px;
    height: 56px;
    border-radius: 50%;
    background: linear-gradient(135deg, #0f172a, #1e293b);
    color: #b3e0dc;
    border: 2px solid #14b8a6;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 4px 16px rgba(15,23,42,0.4), 0 0 0 0 rgba(20,184,166,0.3);
    z-index: 1000;
    transition: all .3s;
}
.ai-chat-fab svg { width: 26px; height: 26px; }
.ai-chat-fab:hover { 
    transform: scale(1.08); 
    box-shadow: 0 6px 24px rgba(15,23,42,0.5), 0 0 20px rgba(20,184,166,0.2);
    color: #2dd4bf;
}
.ai-chat-fab.active { background: #14b8a6; color: white; border-color: #14b8a6; transform: rotate(180deg); }

/* ── Chat Panel ── */
.ai-chat-panel {
    position: fixed;
    bottom: 92px;
    left: 24px;
    width: 380px;
    max-height: 520px;
    background: #0f172a;
    border-radius: 20px;
    border: 1px solid #1e3a5f;
    box-shadow: 0 16px 48px rgba(0,0,0,0.4);
    z-index: 1001;
    display: flex;
    flex-direction: column;
    opacity: 0;
    transform: translateY(16px) scale(0.95);
    pointer-events: none;
    transition: all .3s cubic-bezier(.4,0,.2,1);
}
.ai-chat-panel.open {
    opacity: 1;
    transform: translateY(0) scale(1);
    pointer-events: auto;
}
@media (max-width: 480px) {
    .ai-chat-panel {
        left: 8px;
        right: 8px;
        width: auto;
        bottom: 88px;
        max-height: 70vh;
    }
}

/* ── Chat Header ── */
.ai-chat-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 14px 16px;
    border-bottom: 1px solid #1e3a5f;
    flex-shrink: 0;
}
.ai-chat-header-info {
    display: flex;
    align-items: center;
    gap: 10px;
}
.ai-chat-avatar {
    width: 32px;
    height: 32px;
    background: linear-gradient(135deg, #0d9488, #14b8a6);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
}
.ai-chat-avatar svg { width: 18px; height: 18px; }
.ai-chat-header-info strong { font-size: 14px; display: block; color: #e2e8f0; }
.ai-chat-status { font-size: 11px; color: #64748b; }
.ai-chat-header-actions { display: flex; gap: 4px; }
.ai-chat-header-btn {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    border: none;
    background: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #64748b;
    transition: all .2s;
}
.ai-chat-header-btn:hover { background: #1e293b; color: #b3e0dc; }

/* ── Chat Messages ── */
.ai-chat-messages {
    flex: 1;
    overflow-y: auto;
    padding: 16px;
    display: flex;
    flex-direction: column;
    gap: 12px;
    min-height: 200px;
    max-height: 340px;
}
.ai-chat-welcome {
    text-align: center;
    padding: 24px 16px;
    color: #94a3b8;
    font-size: 13px;
    line-height: 1.6;
}
.ai-chat-welcome-icon { font-size: 32px; margin-bottom: 8px; }
.ai-chat-welcome strong { display: block; font-size: 15px; color: #e2e8f0; margin-bottom: 4px; }
.ai-chat-suggestions {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
    justify-content: center;
    margin-top: 12px;
}
.ai-chat-suggestions button {
    padding: 6px 12px;
    background: #1e293b;
    border: 1px solid #334155;
    border-radius: var(--radius-pill);
    font-size: 12px;
    font-family: var(--font);
    color: #b3e0dc;
    cursor: pointer;
    transition: all .2s;
}
.ai-chat-suggestions button:hover {
    background: #0d9488;
    border-color: #14b8a6;
    color: white;
}

/* ── Chat Message Bubbles ── */
.ai-chat-msg {
    display: flex;
    gap: 8px;
    max-width: 90%;
}
.ai-chat-msg-user {
    align-self: flex-end;
    flex-direction: row-reverse;
}
.ai-chat-msg-assistant {
    align-self: flex-start;
}
.ai-chat-msg-avatar {
    width: 24px;
    height: 24px;
    border-radius: 50%;
    background: linear-gradient(135deg, #0d9488, #14b8a6);
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    flex-shrink: 0;
    margin-top: 2px;
}
.ai-chat-msg-content {
    padding: 10px 14px;
    border-radius: 14px;
    font-size: 13px;
    line-height: 1.6;
}
.ai-chat-msg-user .ai-chat-msg-content {
    background: #14b8a6;
    color: white;
    border-bottom-left-radius: 4px;
}
.ai-chat-msg-assistant .ai-chat-msg-content {
    background: #1e293b;
    color: #e2e8f0;
    border-bottom-right-radius: 4px;
}

/* ── Typing Indicator ── */
.ai-typing .ai-chat-msg-content { padding: 12px 18px; }
.ai-typing-dots span {
    display: inline-block;
    font-size: 18px;
    font-weight: 700;
    color: #64748b;
    animation: aiTypingBounce 1.4s infinite ease-in-out;
}
.ai-typing-dots span:nth-child(2) { animation-delay: 0.2s; }
.ai-typing-dots span:nth-child(3) { animation-delay: 0.4s; }
@keyframes aiTypingBounce {
    0%, 80%, 100% { transform: translateY(0); }
    40% { transform: translateY(-6px); }
}

/* ── Chat Input ── */
.ai-chat-input-area {
    display: flex;
    align-items: flex-end;
    gap: 8px;
    padding: 12px 16px;
    border-top: 1px solid #1e3a5f;
    flex-shrink: 0;
}
.ai-chat-input-area textarea {
    flex: 1;
    resize: none;
    border: 1px solid #334155;
    border-radius: var(--radius-md);
    padding: 10px 14px;
    font-size: 13px;
    font-family: var(--font);
    line-height: 1.5;
    max-height: 120px;
    background: #1e293b;
    color: #e2e8f0;
    transition: border-color .2s;
}
.ai-chat-input-area textarea::placeholder { color: #64748b; }
.ai-chat-input-area textarea:focus {
    outline: none;
    border-color: #14b8a6;
}
.ai-chat-send-btn {
    width: 38px;
    height: 38px;
    border-radius: 50%;
    background: #14b8a6;
    color: white;
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    transition: all .2s;
}
.ai-chat-send-btn:hover { background: #0d9488; }

/* ── Chat Panel Scrollbar ── */
.ai-chat-messages::-webkit-scrollbar { width: 4px; }
.ai-chat-messages::-webkit-scrollbar-track { background: transparent; }
.ai-chat-messages::-webkit-scrollbar-thumb { background: #334155; border-radius: 2px; }

/* ── PRO Badge ── */
.ai-pro-badge {
    display: inline-block;
    padding: 1px 6px;
    background: linear-gradient(135deg, #0d9488, #14b8a6);
    color: white;
    border-radius: 4px;
    font-size: 9px;
    font-weight: 700;
    letter-spacing: 0.5px;
    line-height: 1.4;
    vertical-align: middle;
}
.ai-chat-fab .ai-pro-badge {
    position: absolute;
    top: -2px;
    right: -2px;
    padding: 2px 5px;
    font-size: 8px;
    border-radius: 6px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.3);
}
        `;
        document.head.appendChild(style);
    }

    // ═══════════════════════════════════════════
    // INIT
    // ═══════════════════════════════════════════
    function init() {
        injectStyles();
        // Wait for DOM to be ready, then inject UI
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', injectUI);
        } else {
            // Small delay to let core JS render first
            setTimeout(injectUI, 100);
        }
    }

    // ── Save AI analysis to notes ──
    function _saveAnalysisToNotes() {
        const contentEl = document.getElementById('ai-analysis-content');
        if (!contentEl) return;
        // Extract plain text from the analysis (skip the buttons)
        const clone = contentEl.cloneNode(true);
        clone.querySelectorAll('button, [style*="border-top"]').forEach(el => el.remove());
        const text = clone.innerText.trim();
        if (!text) { if (typeof showToast === 'function') showToast('אין ניתוח לשמור', 'warning'); return; }

        const notesEl = document.getElementById('user-notes');
        if (notesEl) {
            const separator = notesEl.value.trim() ? '\n\n───── ניתוח AI ─────\n' : '───── ניתוח AI ─────\n';
            notesEl.value += separator + text;
            notesEl.scrollTop = notesEl.scrollHeight;
            if (typeof showToast === 'function') showToast('📝 הניתוח נשמר להערות!');
        }
    }

    // ═══ Public API ═══
    return {
        init,
        autoFill,
        analyzeCompany,
        sendMessage,
        sendSuggestion,
        toggleChat,
        clearChat,
        initChat,
        injectUI,
        _copyAutoFillPrompt,
        _downloadAutoFillPrompt,
        openPasteModal,
        parsePastedText,
        checkAccess,
        showUpgradeModal,
        _saveAnalysisToNotes
    };
})();

// Auto-initialize
CalcAI.init();
