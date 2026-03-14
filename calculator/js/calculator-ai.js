// ═══════════════════════════════════════════
// calculator-ai.js — AI Features Module
// Auto-fill, Analysis, Chat Assistant
// ═══════════════════════════════════════════

window.CalcAI = (() => {
    // ── State ──
    let chatHistory = [];
    let isProcessing = false;
    let chatPanelOpen = false;

    // ── Edge Function URL ──
    // Set this after Supabase project is configured
    function getEdgeFunctionUrl() {
        const client = CalcDB.getClient();
        if (!client) return null;
        // Extract project URL from supabase client
        const url = client.supabaseUrl || client.rest?.url?.replace('/rest/v1', '') || '';
        return url ? `${url}/functions/v1/calculator-ai` : null;
    }

    async function callAI(action, payload) {
        const url = getEdgeFunctionUrl();
        if (!url) throw new Error('Supabase not configured');

        const client = CalcDB.getClient();
        const { data: { session } } = await client.auth.getSession();
        const token = session?.access_token;
        if (!token) throw new Error('Not authenticated');

        const resp = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
                'apikey': client.supabaseKey || client.rest?.headers?.apikey || ''
            },
            body: JSON.stringify({ action, payload })
        });

        if (!resp.ok) {
            const err = await resp.json().catch(() => ({ error: resp.statusText }));
            throw new Error(err.error || 'AI request failed');
        }

        const data = await resp.json();
        return data.result;
    }

    // ═══════════════════════════════════════════
    // 1. AUTO-FILL BY COMPANY NAME
    // ═══════════════════════════════════════════
    async function autoFill(companyName) {
        if (!companyName || companyName.trim().length < 2) {
            showToast('הקלד שם חברה קודם', 'warning');
            return;
        }

        if (isProcessing) return;
        isProcessing = true;

        const btn = document.getElementById('ai-autofill-btn');
        const originalHTML = btn ? btn.innerHTML : '';
        if (btn) {
            btn.innerHTML = '<span class="ai-spinner"></span> מאתר נתונים...';
            btn.disabled = true;
        }

        try {
            const result = await callAI('autofill', {
                companyName: companyName.trim(),
                metrics: getMetricIds()
            });

            if (result.error) {
                showToast('AI לא הצליח למצוא נתונים: ' + result.error, 'error');
                return;
            }

            // Fill in the metrics
            let filled = 0;
            const metricMap = {
                'roi': 'roi-value',
                'roe': 'roe-value',
                'gross-margin': 'gross-margin-value',
                'gross-margin-growth': 'gross-margin-growth-value',
                'pm': 'pm-value',
                'fcf-yield': 'fcf-yield-value',
                'fcf-growth': 'fcf-growth-value',
                'eps-growth': 'eps-growth-value',
                'buyback': 'buyback-value',
                'pe': 'pe-value',
                'peg': 'peg-value',
                'cr': 'cr-value',
                'de': 'de-value',
                'altman-z': 'altman-z-value'
            };

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

            // Update company name if ticker was returned
            if (result.ticker) {
                const companyEl = document.getElementById('company-name');
                if (companyEl && !companyEl.value.includes(result.ticker)) {
                    companyEl.value = `${companyEl.value.trim()} (${result.ticker})`;
                    document.getElementById('topbar-company').textContent = companyEl.value;
                }
            }

            // Trigger recalculation
            if (typeof updateAllMetrics === 'function') {
                updateAllMetrics();
            }

            const sourceNote = result.sources ? ` | ${result.dataDate || 'TTM'}` : '';
            showToast(`🤖 ${filled} מדדים מולאו אוטומטית${sourceNote}`);

            // Show source disclaimer
            showAIDisclaimer(result.sources, result.dataDate);

        } catch (err) {
            console.error('AutoFill error:', err);
            showToast('שגיאה בשליפת נתונים: ' + err.message, 'error');
        } finally {
            isProcessing = false;
            if (btn) {
                btn.innerHTML = originalHTML;
                btn.disabled = false;
            }
        }
    }

    function getMetricIds() {
        return ['roi', 'roe', 'gross-margin', 'pm', 'fcf-yield', 'fcf-growth',
            'eps-growth', 'buyback', 'pe', 'peg', 'cr', 'de', 'altman-z'];
    }

    function showAIDisclaimer(sources, dataDate) {
        const existing = document.getElementById('ai-disclaimer');
        if (existing) existing.remove();

        const disc = document.createElement('div');
        disc.id = 'ai-disclaimer';
        disc.className = 'ai-disclaimer';
        disc.innerHTML = `
            <div class="ai-disclaimer-icon">🤖</div>
            <div class="ai-disclaimer-text">
                <strong>נתונים מולאו ע"י AI</strong> — ${dataDate || 'TTM'} 
                ${sources ? `<br><span class="ai-disclaimer-sources">${sources}</span>` : ''}
                <br><span class="ai-disclaimer-warn">⚠️ בדוק את הנתונים מול דוחות רשמיים לפני קבלת החלטות</span>
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
                contentEl.innerHTML = html;
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
                            <div style="width:40px;height:40px;background:linear-gradient(135deg,#6366F1,#8B5CF6);border-radius:10px;display:flex;align-items:center;justify-content:center;">
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
        fab.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2a2 2 0 012 2c0 .74-.4 1.39-1 1.73V7h1a7 7 0 017 7h1a1 1 0 011 1v3a1 1 0 01-1 1h-1v1a2 2 0 01-2 2H5a2 2 0 01-2-2v-1H2a1 1 0 01-1-1v-3a1 1 0 011-1h1a7 7 0 017-7h1V5.73c-.6-.34-1-.99-1-1.73a2 2 0 012-2z"/></svg>`;
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

    function toggleChat() {
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
        return {
            company: companyName,
            totalScore,
            mode: typeof currentMode !== 'undefined' ? currentMode : 'balanced'
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
                <span>מלא ע"י AI</span>
            `;
            btn.onclick = () => autoFill(companyInput.value);
            wrapper.appendChild(btn);
        }

        // Add AI analyze button to toolbar
        const toolbar = document.querySelector('.toolbar');
        if (toolbar && !document.getElementById('ai-analyze-btn')) {
            const btn = document.createElement('button');
            btn.id = 'ai-analyze-btn';
            btn.className = 'tool-btn ai-tool-btn';
            btn.innerHTML = `
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M12 2a2 2 0 012 2c0 .74-.4 1.39-1 1.73V7h1a7 7 0 017 7h1a1 1 0 011 1v3a1 1 0 01-1 1h-1v1a2 2 0 01-2 2H5a2 2 0 01-2-2v-1H2a1 1 0 01-1-1v-3a1 1 0 011-1h1a7 7 0 017-7h1V5.73c-.6-.34-1-.99-1-1.73a2 2 0 012-2z"/>
                </svg>
                <span>ניתוח AI</span>
            `;
            btn.onclick = analyzeCompany;
            // Insert before the save button
            const saveBtn = document.getElementById('save-btn');
            if (saveBtn) toolbar.insertBefore(btn, saveBtn);
            else toolbar.appendChild(btn);
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
    background: linear-gradient(135deg, #6366F1, #8B5CF6);
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
    background: linear-gradient(135deg, #5558E6, #7C3AED);
    box-shadow: 0 4px 12px rgba(99,102,241,0.3);
}
.ai-autofill-btn:disabled { opacity: 0.6; cursor: wait; }

/* ── AI Tool Button ── */
.ai-tool-btn {
    background: linear-gradient(135deg, #EEF2FF, #E0E7FF) !important;
    color: #6366F1 !important;
    border: 1px solid #C7D2FE !important;
}
.ai-tool-btn:hover {
    background: linear-gradient(135deg, #6366F1, #8B5CF6) !important;
    color: white !important;
}

/* ── AI Filled Input Flash ── */
.metric-input.ai-filled {
    animation: aiFillFlash 0.8s ease;
    border-color: #6366F1 !important;
    box-shadow: 0 0 0 3px rgba(99,102,241,0.15) !important;
}
@keyframes aiFillFlash {
    0% { background: #EEF2FF; }
    100% { background: inherit; }
}

/* ── AI Disclaimer ── */
.ai-disclaimer {
    display: flex;
    align-items: flex-start;
    gap: 12px;
    padding: 14px 18px;
    background: linear-gradient(135deg, #EEF2FF, #F5F3FF);
    border: 1px solid #C7D2FE;
    border-radius: var(--radius-lg);
    margin-top: 8px;
    font-size: 13px;
    line-height: 1.6;
    animation: fadeUp .4s ease;
}
.ai-disclaimer-icon { font-size: 24px; flex-shrink: 0; }
.ai-disclaimer-sources { font-size: 11px; color: var(--text-muted); }
.ai-disclaimer-warn { font-size: 11px; color: var(--warning); font-weight: 500; }
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
    border-color: rgba(99,102,241,0.2);
    border-top-color: #6366F1;
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
    background: linear-gradient(135deg, #6366F1, #8B5CF6);
    color: white;
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 4px 16px rgba(99,102,241,0.35);
    z-index: 1000;
    transition: all .3s;
}
.ai-chat-fab svg { width: 26px; height: 26px; }
.ai-chat-fab:hover { transform: scale(1.08); box-shadow: 0 6px 24px rgba(99,102,241,0.45); }
.ai-chat-fab.active { background: var(--text-secondary); transform: rotate(180deg); }

/* ── Chat Panel ── */
.ai-chat-panel {
    position: fixed;
    bottom: 92px;
    left: 24px;
    width: 380px;
    max-height: 520px;
    background: var(--surface);
    border-radius: var(--radius-xl);
    border: 1px solid var(--border);
    box-shadow: var(--shadow-xl);
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
    border-bottom: 1px solid var(--border);
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
    background: linear-gradient(135deg, #6366F1, #8B5CF6);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
}
.ai-chat-avatar svg { width: 18px; height: 18px; }
.ai-chat-header-info strong { font-size: 14px; display: block; }
.ai-chat-status { font-size: 11px; color: var(--text-muted); }
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
    color: var(--text-muted);
    transition: all .2s;
}
.ai-chat-header-btn:hover { background: var(--bg); color: var(--text); }

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
    color: var(--text-secondary);
    font-size: 13px;
    line-height: 1.6;
}
.ai-chat-welcome-icon { font-size: 32px; margin-bottom: 8px; }
.ai-chat-welcome strong { display: block; font-size: 15px; color: var(--text); margin-bottom: 4px; }
.ai-chat-suggestions {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
    justify-content: center;
    margin-top: 12px;
}
.ai-chat-suggestions button {
    padding: 6px 12px;
    background: var(--bg);
    border: 1px solid var(--border);
    border-radius: var(--radius-pill);
    font-size: 12px;
    font-family: var(--font);
    color: var(--primary);
    cursor: pointer;
    transition: all .2s;
}
.ai-chat-suggestions button:hover {
    background: var(--primary-bg);
    border-color: var(--primary-light);
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
    background: linear-gradient(135deg, #6366F1, #8B5CF6);
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
    background: var(--primary);
    color: white;
    border-bottom-left: 4px;
}
.ai-chat-msg-assistant .ai-chat-msg-content {
    background: var(--bg);
    color: var(--text);
    border-bottom-right: 4px;
}

/* ── Typing Indicator ── */
.ai-typing .ai-chat-msg-content { padding: 12px 18px; }
.ai-typing-dots span {
    display: inline-block;
    font-size: 18px;
    font-weight: 700;
    color: var(--text-muted);
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
    border-top: 1px solid var(--border);
    flex-shrink: 0;
}
.ai-chat-input-area textarea {
    flex: 1;
    resize: none;
    border: 1px solid var(--border);
    border-radius: var(--radius-md);
    padding: 10px 14px;
    font-size: 13px;
    font-family: var(--font);
    line-height: 1.5;
    max-height: 120px;
    background: var(--bg);
    color: var(--text);
    transition: border-color .2s;
}
.ai-chat-input-area textarea:focus {
    outline: none;
    border-color: var(--primary);
}
.ai-chat-send-btn {
    width: 38px;
    height: 38px;
    border-radius: 50%;
    background: var(--primary);
    color: white;
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    transition: all .2s;
}
.ai-chat-send-btn:hover { background: var(--primary-hover); }
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
        injectUI
    };
})();

// Auto-initialize
CalcAI.init();
