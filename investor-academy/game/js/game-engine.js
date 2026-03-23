/* === game-engine.js ===
 * Core game logic, state management, rendering
 * v2: relative years, new chart types, versus/sell-hold rounds, feedback extras
 */

// ─────────────────────────────────────────────────────────────────────────────
// PHASE 1 — YEAR RESOLUTION
// ─────────────────────────────────────────────────────────────────────────────
const BASE_YEAR = new Date().getFullYear();

function resolveYearLabel(y) {
    if (typeof y === 'number') return y;
    if (typeof y !== 'string') return y;
    if (y === 'year-0' || y === 'year+0') return BASE_YEAR;
    const neg = y.match(/^year-(\d+)$/);
    if (neg) return BASE_YEAR - parseInt(neg[1], 10);
    const pos = y.match(/^year\+(\d+)$/);
    if (pos) return BASE_YEAR + parseInt(pos[1], 10);
    // "Q1 year-1", "Q2 year+1", etc.
    return y.replace(/year([+-]?\d+)/, (_, offset) => BASE_YEAR + parseInt(offset, 10));
}

// ─────────────────────────────────────────────────────────────────────────────
// INJECT NEW ROUND CONTAINERS (Phases 4 & 5)
// Runs immediately — game-engine.js is at bottom of body, DOM is ready.
// ─────────────────────────────────────────────────────────────────────────────
(function injectRoundContainers() {
    const gc = document.getElementById('game-container');
    if (!gc || document.getElementById('versus-round-display')) return;

    // ── Versus Round ──────────────────────────────────────────────────────
    const vd = document.createElement('div');
    vd.id = 'versus-round-display';
    vd.className = 'versus-round-card hidden';
    vd.innerHTML = `
        <div class="round-type-badge">⚔️ סיבוב השוואה</div>
        <div class="versus-round-title" id="versus-title"></div>
        <div class="versus-round-desc" id="versus-description"></div>
        <div class="versus-companies-grid">
            <div class="versus-company" id="versus-company-a">
                <div class="versus-company-header">
                    <span class="versus-label versus-label-a">חברה א׳</span>
                    <div class="versus-company-name" id="versus-a-name"></div>
                    <div class="versus-company-meta">
                        <span class="symbol-badge" id="versus-a-symbol"></span>
                        <span class="sector-tag" id="versus-a-sector"></span>
                    </div>
                </div>
                <div class="versus-company-desc" id="versus-a-desc"></div>
                <div class="versus-metrics-list" id="versus-a-metrics"></div>
                <div class="versus-sparkline-row">
                    <span class="versus-sparkline-label">מגמת FCF</span>
                    <div id="versus-a-sparkline" class="versus-sparkline"></div>
                </div>
            </div>
            <div class="versus-company" id="versus-company-b">
                <div class="versus-company-header">
                    <span class="versus-label versus-label-b">חברה ב׳</span>
                    <div class="versus-company-name" id="versus-b-name"></div>
                    <div class="versus-company-meta">
                        <span class="symbol-badge" id="versus-b-symbol"></span>
                        <span class="sector-tag" id="versus-b-sector"></span>
                    </div>
                </div>
                <div class="versus-company-desc" id="versus-b-desc"></div>
                <div class="versus-metrics-list" id="versus-b-metrics"></div>
                <div class="versus-sparkline-row">
                    <span class="versus-sparkline-label">מגמת FCF</span>
                    <div id="versus-b-sparkline" class="versus-sparkline"></div>
                </div>
            </div>
        </div>
        <div class="actions" id="versus-buttons">
            <button class="button versus-a-button" id="choose-a-button">חברה א׳ עדיפה ✅</button>
            <button class="button versus-b-button" id="choose-b-button">חברה ב׳ עדיפה ✅</button>
        </div>
        <div class="decision-feedback hidden" id="versus-feedback">
            <div class="principle-badge hidden" id="versus-principle-badge"></div>
            <div class="decision-title" id="versus-feedback-title"></div>
            <div class="decision-explanation" id="versus-explanation"></div>
            <button class="continue-button" id="versus-continue-button">המשך לסיבוב הבא</button>
        </div>`;
    gc.appendChild(vd);

    // ── Sell/Hold Round ───────────────────────────────────────────────────
    const sd = document.createElement('div');
    sd.id = 'sellhold-round-display';
    sd.className = 'sellhold-round-card hidden';
    sd.innerHTML = `
        <div class="round-type-badge">📊 החלטת תיק</div>
        <div class="versus-round-title" id="sellhold-title"></div>
        <div class="portfolio-card" id="portfolio-card">
            <div class="portfolio-company-name" id="portfolio-company-name"></div>
            <div class="portfolio-meta" id="portfolio-meta"></div>
            <div class="portfolio-info-grid">
                <div class="portfolio-info-item">
                    <div class="portfolio-info-label">מחיר קנייה</div>
                    <div class="portfolio-info-value" id="portfolio-purchase-price"></div>
                </div>
                <div class="portfolio-info-item">
                    <div class="portfolio-info-label">מחיר נוכחי</div>
                    <div class="portfolio-info-value" id="portfolio-current-price"></div>
                </div>
                <div class="portfolio-info-item">
                    <div class="portfolio-info-label">שינוי</div>
                    <div class="portfolio-info-value portfolio-change" id="portfolio-change"></div>
                </div>
                <div class="portfolio-info-item">
                    <div class="portfolio-info-label">תקופת החזקה</div>
                    <div class="portfolio-info-value" id="portfolio-holding-period"></div>
                </div>
            </div>
        </div>
        <div class="info-section events">
            <div class="section-title">📰 מידע חדש:</div>
            <div class="section-content" id="sellhold-new-info"></div>
        </div>
        <div class="metrics-section">
            <div class="metrics-title">מדדים נוכחיים:</div>
            <div class="metrics-grid" id="sellhold-metrics-grid"></div>
        </div>
        <div class="actions" id="sellhold-buttons">
            <button class="button sell-button" id="sell-button">למכור 📉</button>
            <button class="button hold-button" id="hold-button">להחזיק 💎</button>
        </div>
        <div class="decision-feedback hidden" id="sellhold-feedback">
            <div class="principle-badge hidden" id="sellhold-principle-badge"></div>
            <div class="decision-title" id="sellhold-feedback-title"></div>
            <div class="decision-explanation" id="sellhold-explanation"></div>
            <button class="continue-button" id="sellhold-continue-button">המשך לסיבוב הבא</button>
        </div>`;
    gc.appendChild(sd);
})();

// ─────────────────────────────────────────────────────────────────────────────
// GAME STATE
// ─────────────────────────────────────────────────────────────────────────────
const GameState = {
    phase: 'MENU', difficulty: null, currentRound: 0, totalRounds: 10,
    score: 0, correctDecisions: 0, consecutiveCorrect: 0, comboMultiplier: 1,
    decisionMade: false, projectionsUnlocked: false, hintUsed: false,
    gameRounds: [], roundOutcomes: [], lastDecision: null,
    // Mastery & achievement tracking
    startTime: 0, maxStreak: 0, maxCombo: 0,
    hintUsedThisGame: false, versusCorrect: 0, sellHoldCorrect: 0,
    // Principle pre-selection
    principleSelected: null, principleCorrect: false,
    principleStreak: 0, maxPrincipleStreak: 0
};

// ─────────────────────────────────────────────────────────────────────────────
// DOM REFERENCES
// ─────────────────────────────────────────────────────────────────────────────
const DOM = {
    // Existing elements
    difficultySelect: document.getElementById('difficulty-select'),
    scoreContainer: document.getElementById('score-container'),
    progressStagesContainer: document.getElementById('progress-stages-container'),
    gameContainer: document.getElementById('game-container'),
    companyDisplay: document.getElementById('company-display'),
    specialRoundDisplay: document.getElementById('special-round-display'),
    loadingEl: document.getElementById('loading'),
    currentRoundDisplay: document.getElementById('current-round-display'),
    correctDecisionsEl: document.getElementById('correct-decisions'),
    scoreEl: document.getElementById('score'),
    comboDisplay: document.getElementById('combo-display'),
    companyName: document.getElementById('company-name'),
    companySymbol: document.getElementById('company-symbol'),
    companyPrice: document.getElementById('company-price'),
    companySector: document.getElementById('company-sector'),
    companyDescription: document.getElementById('company-description'),
    companyManagement: document.getElementById('company-management-info'),
    companyMoat: document.getElementById('company-moat-info'),
    companyEvents: document.getElementById('company-events-info'),
    basicMetricsGrid: document.getElementById('basic-metrics-grid'),
    advancedMetricsGrid: document.getElementById('advanced-metrics-grid'),
    linePlotContainer: document.getElementById('line-plot-area-container'),
    unlockProjectionsButton: document.getElementById('unlock-projections-button'),
    decisionFeedback: document.getElementById('decision-feedback'),
    principleBadge: document.getElementById('principle-badge'),
    decisionTitle: document.getElementById('decision-title'),
    decisionExplanation: document.getElementById('decision-explanation'),
    decisiveSignals: document.getElementById('decisive-signals'),
    decisiveSignalsList: document.getElementById('decisive-signals-list'),
    companyHintButton: document.getElementById('company-hint-button'),
    companyHintDisplay: document.getElementById('company-hint-display'),
    companyHintText: document.getElementById('company-hint-text'),
    buyButton: document.getElementById('buy-button'),
    passButton: document.getElementById('pass-button'),
    decisionButtons: document.getElementById('decision-buttons'),
    continueButton: document.getElementById('continue-button'),
    reasoningSection: document.getElementById('reasoning-section'),
    reasoningOptions: document.getElementById('reasoning-options'),
    submitReasoningButton: document.getElementById('submit-reasoning-button'),
    specialTitle: document.getElementById('special-title'),
    specialDescription: document.getElementById('special-description'),
    specialFeedback: document.getElementById('special-feedback'),
    specialPrincipleBadge: document.getElementById('special-principle-badge'),
    specialFeedbackTitle: document.getElementById('special-feedback-title'),
    specialExplanation: document.getElementById('special-explanation'),
    specialHintButton: document.getElementById('special-hint-button'),
    specialHintDisplay: document.getElementById('special-hint-display'),
    specialHintText: document.getElementById('special-hint-text'),
    impactButtons: document.getElementById('impact-buttons'),
    positiveImpactButton: document.getElementById('positive-impact-button'),
    neutralImpactButton: document.getElementById('neutral-impact-button'),
    negativeImpactButton: document.getElementById('negative-impact-button'),
    specialContinueButton: document.getElementById('special-continue-button'),
    easyButton: document.getElementById('easy-button'),
    mediumButton: document.getElementById('medium-button'),
    hardButton: document.getElementById('hard-button'),
    difficultyDescription: document.getElementById('difficulty-description'),
    resultOverlay: document.getElementById('result-overlay'),
    resultMessage: document.getElementById('result-message'),
    expertFeedback: document.getElementById('expert-feedback'),
    restartButton: document.getElementById('restart-button'),
    glossaryButton: document.getElementById('glossary-button'),
    glossaryOverlay: document.getElementById('glossary-overlay'),
    glossaryList: document.getElementById('glossary-list'),
    glossaryClose: document.getElementById('glossary-close'),
    modalOverlay: document.getElementById('custom-modal-overlay'),
    modalTitle: document.getElementById('modal-title'),
    modalMessage: document.getElementById('modal-message'),
    modalConfirmButton: document.getElementById('modal-confirm-button'),
    modalCancelButton: document.getElementById('modal-cancel-button'),
    modalOkButton: document.getElementById('modal-ok-button'),
    // Versus round elements (injected above)
    versusDisplay: document.getElementById('versus-round-display'),
    versusTitle: document.getElementById('versus-title'),
    versusDescription: document.getElementById('versus-description'),
    versusButtons: document.getElementById('versus-buttons'),
    chooseAButton: document.getElementById('choose-a-button'),
    chooseBButton: document.getElementById('choose-b-button'),
    versusFeedback: document.getElementById('versus-feedback'),
    versusPrincipleBadge: document.getElementById('versus-principle-badge'),
    versusFeedbackTitle: document.getElementById('versus-feedback-title'),
    versusExplanation: document.getElementById('versus-explanation'),
    versusContinueButton: document.getElementById('versus-continue-button'),
    // Sell/Hold elements (injected above)
    sellHoldDisplay: document.getElementById('sellhold-round-display'),
    sellHoldTitle: document.getElementById('sellhold-title'),
    portfolioCompanyName: document.getElementById('portfolio-company-name'),
    portfolioMeta: document.getElementById('portfolio-meta'),
    portfolioPurchasePrice: document.getElementById('portfolio-purchase-price'),
    portfolioCurrentPrice: document.getElementById('portfolio-current-price'),
    portfolioChange: document.getElementById('portfolio-change'),
    portfolioHoldingPeriod: document.getElementById('portfolio-holding-period'),
    sellHoldNewInfo: document.getElementById('sellhold-new-info'),
    sellHoldMetricsGrid: document.getElementById('sellhold-metrics-grid'),
    sellHoldButtons: document.getElementById('sellhold-buttons'),
    sellButton: document.getElementById('sell-button'),
    holdButton: document.getElementById('hold-button'),
    sellHoldFeedback: document.getElementById('sellhold-feedback'),
    sellHoldPrincipleBadge: document.getElementById('sellhold-principle-badge'),
    sellHoldFeedbackTitle: document.getElementById('sellhold-feedback-title'),
    sellHoldExplanation: document.getElementById('sellhold-explanation'),
    sellHoldContinueButton: document.getElementById('sellhold-continue-button')
};

// ─────────────────────────────────────────────────────────────────────────────
// STORAGE
// ─────────────────────────────────────────────────────────────────────────────
const Storage = {
    keys: { difficulties: 'buffettGameUnlockedDifficulties' },
    getUnlockedDifficulties() {
        try { return JSON.parse(localStorage.getItem(this.keys.difficulties)) || ['easy']; }
        catch { localStorage.setItem(this.keys.difficulties, JSON.stringify(['easy'])); return ['easy']; }
    },
    unlockDifficulty(difficulty) {
        let unlocked = this.getUnlockedDifficulties();
        if (!unlocked.includes(difficulty)) {
            unlocked.push(difficulty);
            localStorage.setItem(this.keys.difficulties, JSON.stringify(unlocked));
            return true;
        }
        return false;
    }
};

// ─────────────────────────────────────────────────────────────────────────────
// MODAL
// ─────────────────────────────────────────────────────────────────────────────
let currentConfirmCallback = null;
function closeModal() { DOM.modalOverlay.classList.remove('show'); DOM.modalOverlay.classList.add('hidden'); currentConfirmCallback = null; }
function showInfoModal(title, message) {
    DOM.modalTitle.textContent = title; DOM.modalMessage.textContent = message;
    DOM.modalConfirmButton.style.display = 'none'; DOM.modalCancelButton.style.display = 'none';
    DOM.modalOkButton.style.display = 'inline-block';
    DOM.modalOverlay.classList.remove('hidden'); DOM.modalOverlay.classList.add('show');
}
function showConfirmModal(title, message, onConfirm) {
    DOM.modalTitle.textContent = title; DOM.modalMessage.textContent = message;
    currentConfirmCallback = onConfirm;
    DOM.modalConfirmButton.style.display = 'inline-block'; DOM.modalCancelButton.style.display = 'inline-block';
    DOM.modalOkButton.style.display = 'none';
    DOM.modalOverlay.classList.remove('hidden'); DOM.modalOverlay.classList.add('show');
}

// ─────────────────────────────────────────────────────────────────────────────
// GLOSSARY
// ─────────────────────────────────────────────────────────────────────────────
function openGlossary() {
    const glossary = window.BuffettGame?.glossary || [];
    DOM.glossaryList.innerHTML = glossary.map(item => `<li class="glossary-item"><div class="glossary-term">${item.term}</div><div>${item.definition}</div></li>`).join('');
    DOM.glossaryOverlay.classList.remove('hidden'); DOM.glossaryOverlay.classList.add('show');
    // Track for glossary_master achievement
    if (window.BuffettMastery) {
        const m = BuffettMastery.loadMastery();
        m.overall.glossaryOpened = (m.overall.glossaryOpened || 0) + 1;
        BuffettMastery.saveMastery(m);
    }
}
function closeGlossary() { DOM.glossaryOverlay.classList.remove('show'); DOM.glossaryOverlay.classList.add('hidden'); }

// ─────────────────────────────────────────────────────────────────────────────
// DIFFICULTY
// ─────────────────────────────────────────────────────────────────────────────
function updateDifficultyButtonsState() {
    const unlocked = Storage.getUnlockedDifficulties();
    [DOM.easyButton, DOM.mediumButton, DOM.hardButton].forEach(btn => {
        const diff = btn.dataset.difficulty;
        btn.classList.toggle('locked', !unlocked.includes(diff));
        btn.disabled = !unlocked.includes(diff);
    });
}
function updateDifficultyDescription(difficulty) {
    const desc = { easy: "קל: תרחישים ברורים יחסית.", medium: "בינוני: תמהיל מאוזן.", hard: "קשה: מצבים מאתגרים.", default: "בחר רמת קושי" };
    DOM.difficultyDescription.textContent = desc[difficulty] || desc.default;
}
function selectDifficulty(difficulty) {
    const btn = document.querySelector(`.difficulty-button[data-difficulty="${difficulty}"]`);
    if (btn.classList.contains('locked')) { showInfoModal("רמה נעולה", "השלם רמות קודמות (60%+)"); return; }
    GameState.difficulty = difficulty;
    [DOM.easyButton, DOM.mediumButton, DOM.hardButton].forEach(b => b.classList.remove('selected'));
    btn.classList.add('selected');
    updateDifficultyDescription(difficulty);
    setTimeout(startGame, 200);
}

// ─────────────────────────────────────────────────────────────────────────────
// PROGRESS STAGES
// ─────────────────────────────────────────────────────────────────────────────
function initializeProgressStages() {
    DOM.progressStagesContainer.innerHTML = '';
    GameState.roundOutcomes = new Array(GameState.totalRounds).fill(null);
    for (let i = 0; i < GameState.totalRounds; i++) {
        const stage = document.createElement('div');
        stage.classList.add('progress-stage', 'upcoming');
        stage.textContent = i + 1;
        stage.id = `progress-stage-${i}`;
        DOM.progressStagesContainer.appendChild(stage);
    }
}
function updateProgressStageDisplay() {
    const stages = DOM.progressStagesContainer.children;
    for (let i = 0; i < stages.length; i++) {
        stages[i].classList.remove('current', 'passed', 'failed', 'upcoming');
        if (GameState.roundOutcomes[i]) stages[i].classList.add(GameState.roundOutcomes[i]);
        else if (i === GameState.currentRound) stages[i].classList.add('current');
        else stages[i].classList.add('upcoming');
    }
}

// ─────────────────────────────────────────────────────────────────────────────
// COMBO
// ─────────────────────────────────────────────────────────────────────────────
function handleCorrectDecisionCombo() {
    GameState.consecutiveCorrect++;
    GameState.maxStreak = Math.max(GameState.maxStreak, GameState.consecutiveCorrect);
    if (GameState.consecutiveCorrect >= 2) {
        GameState.comboMultiplier = Math.min(GameState.consecutiveCorrect, 5);
        GameState.maxCombo = Math.max(GameState.maxCombo, GameState.comboMultiplier);
        DOM.comboDisplay.textContent = `x${GameState.comboMultiplier} רצף!`;
        DOM.comboDisplay.classList.remove('hidden');
    }
}
function resetCombo() { GameState.consecutiveCorrect = 0; GameState.comboMultiplier = 1; DOM.comboDisplay.classList.add('hidden'); }
function calculateComboBonus(basePoints) { return GameState.comboMultiplier > 1 ? Math.round(basePoints * (GameState.comboMultiplier - 1) * 0.25) : 0; }
function calculatePotentialPoints(roundData) { let pts = roundData.pointValue || 100; return GameState.hintUsed ? Math.round(pts * 0.5) : pts; }

// ─────────────────────────────────────────────────────────────────────────────
// PHASE 6 — REASONING SYSTEM (existing, enhanced with biasTag)
// ─────────────────────────────────────────────────────────────────────────────
let selectedReasonings = [];
let reasoningSubmitted = false;

function shouldShowReasoning() {
    return GameState.difficulty === 'hard' || GameState.difficulty === 'expert';
}

function displayReasoningOptions(company, playerDecision) {
    if (!company.reasoningOptions || company.reasoningOptions.length === 0) return;
    selectedReasonings = [];
    reasoningSubmitted = false;
    DOM.reasoningOptions.innerHTML = '';
    const shuffled = [...company.reasoningOptions].sort(() => Math.random() - 0.5);
    shuffled.forEach(option => {
        const optionEl = document.createElement('div');
        optionEl.className = 'reasoning-option';
        optionEl.dataset.id = option.id;
        optionEl.innerHTML = `<div class="reasoning-checkbox"></div><div class="reasoning-option-text">${option.text}</div>`;
        optionEl.addEventListener('click', () => toggleReasoningOption(option.id, optionEl));
        DOM.reasoningOptions.appendChild(optionEl);
    });
    DOM.submitReasoningButton.disabled = true;
    DOM.reasoningSection.classList.remove('hidden');
}

function toggleReasoningOption(optionId, element) {
    if (reasoningSubmitted) return;
    const index = selectedReasonings.indexOf(optionId);
    if (index > -1) { selectedReasonings.splice(index, 1); element.classList.remove('selected'); }
    else { selectedReasonings.push(optionId); element.classList.add('selected'); }
    DOM.submitReasoningButton.disabled = selectedReasonings.length === 0;
}

function evaluateReasoning(company, playerDecision) {
    reasoningSubmitted = true;
    const options = company.reasoningOptions || [];
    let correctCount = 0, trapCount = 0;
    const totalCorrect = options.filter(o => o.isCorrect && o.appliesToDecision === playerDecision).length;

    selectedReasonings.forEach(selectedId => {
        const option = options.find(o => o.id === selectedId);
        if (!option) return;
        if (option.isCorrect && option.appliesToDecision === playerDecision) correctCount++;
        else if (option.isTrap) trapCount++;
    });

    document.querySelectorAll('.reasoning-option').forEach(el => {
        const optionId = el.dataset.id;
        const option = options.find(o => o.id === optionId);
        if (!option) return;
        el.style.pointerEvents = 'none';
        if (option.isCorrect && option.appliesToDecision === playerDecision) {
            el.classList.add('correct-answer');
            const badge = document.createElement('span');
            badge.className = 'reasoning-option-badge correct';
            badge.textContent = 'נכון ✓';
            el.querySelector('.reasoning-option-text').prepend(badge);
        } else if (option.isTrap) {
            el.classList.add('trap-answer');
            const badge = document.createElement('span');
            badge.className = 'reasoning-option-badge trap';
            // Show biasTag if available
            badge.textContent = option.biasTag ? `מלכודת: ${option.biasTag}` : 'מלכודת ✗';
            el.querySelector('.reasoning-option-text').prepend(badge);
        } else if (selectedReasonings.includes(optionId)) {
            el.classList.add('wrong-answer');
            const badge = document.createElement('span');
            badge.className = 'reasoning-option-badge wrong';
            badge.textContent = 'לא מדויק';
            el.querySelector('.reasoning-option-text').prepend(badge);
        }
    });

    const feedback = company.feedback?.reasoningFeedback || {};
    let reasoningBonus = 0, feedbackTitle = '', feedbackClass = '';
    if (trapCount > 0) {
        feedbackTitle = feedback.fellForTrap || 'נפלת במלכודת!';
        feedbackClass = 'needs-work'; reasoningBonus = -20 * trapCount;
    } else if (correctCount === totalCorrect && totalCorrect > 0) {
        feedbackTitle = feedback.fullCorrect || 'מצוין! זיהית את כל הנימוקים הנכונים.';
        feedbackClass = 'excellent'; reasoningBonus = 50;
    } else if (correctCount > 0) {
        feedbackTitle = feedback.partialCorrect || 'טוב, אבל לא זיהית את כל הנימוקים.';
        feedbackClass = 'good'; reasoningBonus = 20 * correctCount;
    } else {
        feedbackTitle = 'לא נבחרו נימוקים נכונים.'; feedbackClass = 'needs-work';
    }

    GameState.score += reasoningBonus;
    DOM.scoreEl.textContent = GameState.score;

    const feedbackEl = document.createElement('div');
    feedbackEl.className = 'reasoning-feedback';
    feedbackEl.innerHTML = `
        <div class="reasoning-feedback-title ${feedbackClass}">${feedbackTitle}</div>
        <div class="reasoning-score">
            ${reasoningBonus >= 0 ? '+' : ''}${reasoningBonus} נקודות על ניתוח הנימוקים
            ${correctCount > 0 ? `<br>זיהית ${correctCount} מתוך ${totalCorrect} נימוקים נכונים` : ''}
        </div>`;
    DOM.reasoningSection.appendChild(feedbackEl);
    DOM.submitReasoningButton.classList.add('hidden');
    DOM.decisionFeedback.classList.remove('hidden');
}

// ─────────────────────────────────────────────────────────────────────────────
// PHASE 3 — FEEDBACK COLLAPSIBLES (counterSignal, workedExample, Phase 7 expert)
// ─────────────────────────────────────────────────────────────────────────────
function formatWorkedExample(text) {
    const parts = text.split(/(?=\d+\)\s)/);
    const items = parts.filter(p => p.trim()).map(p => {
        const clean = p.replace(/^\d+\)\s*/, '').trim();
        return clean ? `<li>${clean}</li>` : '';
    }).join('');
    return items ? `<ol class="worked-example-steps">${items}</ol>` : `<p>${text}</p>`;
}

function createCollapsibleSection(icon, title, bodyHTML, extraClass) {
    const section = document.createElement('div');
    section.className = `feedback-collapsible${extraClass ? ' ' + extraClass : ''}`;
    section.innerHTML = `
        <button class="collapsible-header" type="button" aria-expanded="false">
            <span class="collapsible-icon">${icon}</span>
            <span class="collapsible-title">${title}</span>
            <span class="collapsible-arrow">▼</span>
        </button>
        <div class="collapsible-body">${bodyHTML}</div>`;
    const btn = section.querySelector('.collapsible-header');
    btn.addEventListener('click', () => {
        const open = section.classList.toggle('open');
        btn.setAttribute('aria-expanded', open);
    });
    return section;
}

function injectFeedbackExtras(feedback, containerEl) {
    // Remove old collapsibles
    containerEl.querySelectorAll('.feedback-collapsible, .bias-warning').forEach(el => el.remove());
    const continueBtn = containerEl.querySelector('.continue-button');
    if (!continueBtn) return;

    if (feedback.counterSignalExplanation) {
        const el = createCollapsibleSection('🔄', 'מה הצד השני היה טוען?',
            `<p>${feedback.counterSignalExplanation}</p>`, 'counter-signal');
        containerEl.insertBefore(el, continueBtn);
    }
    if (feedback.workedExample) {
        const el = createCollapsibleSection('🧠', 'איך מומחה היה חושב?',
            formatWorkedExample(feedback.workedExample), 'worked-example');
        containerEl.insertBefore(el, continueBtn);
    }
    // Phase 7 — expert sell triggers & due diligence
    if (feedback.sellTriggers && feedback.sellTriggers.length > 0) {
        const list = feedback.sellTriggers.map(t => `<li>${typeof t === 'string' ? t : t.text}</li>`).join('');
        const el = createCollapsibleSection('🚨', 'מתי למכור?', `<ul>${list}</ul>`, 'sell-triggers');
        containerEl.insertBefore(el, continueBtn);
    }
    if (feedback.dueDiligence && feedback.dueDiligence.length > 0) {
        const list = feedback.dueDiligence.map(t => `<li>${typeof t === 'string' ? t : t.text}</li>`).join('');
        const el = createCollapsibleSection('🔍', 'בדיקות נוספות לפני השקעה', `<ul>${list}</ul>`, 'due-diligence');
        containerEl.insertBefore(el, continueBtn);
    }
}

// ─────────────────────────────────────────────────────────────────────────────
// PRINCIPLE PRE-SELECTION  (pre-decision pedagogical step)
// ─────────────────────────────────────────────────────────────────────────────

const PRINCIPLE_NAMES = {
    'moat':                 'חפיר כלכלי',
    'owner-earnings':       'רווחי בעלים',
    'value-trap':           'מלכודת ערך',
    'margin-of-safety':     'מרווח ביטחון',
    'growth-trap':          'מלכודת צמיחה',
    'circle-of-competence': 'מעגל כשירות',
    'leverage-risk':        'סיכון מינוף',
    'too-hard':             'קשה מדי',
    'cyclical-trap':        'מלכודת מחזוריות',
    'turnaround':           'שיקום',
    'dividend-sustainability': 'קיימות דיבידנד',
    'management-quality':   'איכות הנהלה'
};

const SELLHOLD_PRINCIPLE_NAMES = {
    'sunk-cost':          'עלות שקועה',
    'loss-aversion':      'שנאת הפסד',
    'disposition-effect': 'אפקט דיספוזיציה',
    'management-quality': 'איכות הנהלה',
    'moat':               'חפיר כלכלי',
    'margin-of-safety':   'מרווח ביטחון'
};

const PRINCIPLE_AFFINITIES = {
    'moat':                  ['value-trap', 'growth-trap', 'margin-of-safety'],
    'owner-earnings':        ['value-trap', 'margin-of-safety', 'management-quality'],
    'value-trap':            ['moat', 'margin-of-safety', 'dividend-sustainability'],
    'margin-of-safety':      ['value-trap', 'moat', 'growth-trap'],
    'growth-trap':           ['moat', 'margin-of-safety', 'owner-earnings'],
    'circle-of-competence':  ['too-hard', 'growth-trap', 'moat'],
    'leverage-risk':         ['value-trap', 'margin-of-safety', 'dividend-sustainability'],
    'too-hard':              ['circle-of-competence', 'growth-trap', 'moat'],
    'cyclical-trap':         ['value-trap', 'margin-of-safety', 'turnaround'],
    'turnaround':            ['value-trap', 'cyclical-trap', 'management-quality'],
    'dividend-sustainability':['value-trap', 'leverage-risk', 'owner-earnings'],
    'management-quality':    ['owner-earnings', 'moat', 'turnaround']
};

// Map game-data principle IDs (mastery IDs) → affinity map keys
const _P_NORM = {
    moat: 'moat', competitive_advantage: 'moat', competitive: 'moat',
    management: 'management-quality', management_quality: 'management-quality',
    fcf: 'owner-earnings', free_cash_flow: 'owner-earnings', cash_flow: 'owner-earnings',
    financials: 'owner-earnings', financial_analysis: 'owner-earnings',
    capital: 'owner-earnings', capital_allocation: 'owner-earnings',
    margin_of_safety: 'margin-of-safety',
    growth: 'growth-trap', sustainable_growth: 'growth-trap',
    valuation: 'value-trap', value: 'value-trap',
    long_term: 'too-hard', patience: 'too-hard',
    risk: 'leverage-risk', risk_management: 'leverage-risk',
    psychology: 'sunk-cost', behavioral: 'sunk-cost',
    // sell-hold bias IDs (may come from game data)
    sunk_cost: 'sunk-cost', loss_aversion: 'loss-aversion',
    disposition: 'disposition-effect', disposition_effect: 'disposition-effect'
};

// Map affinity IDs → mastery principle IDs (for identification tracking)
const _AFFINITY_TO_MASTERY = {
    'moat': 'moat',
    'owner-earnings': 'fcf',
    'value-trap': 'valuation',
    'margin-of-safety': 'margin_of_safety',
    'growth-trap': 'growth',
    'circle-of-competence': 'long_term',
    'too-hard': 'long_term',
    'leverage-risk': 'risk',
    'cyclical-trap': 'risk',
    'turnaround': 'management',
    'dividend-sustainability': 'fcf',
    'management-quality': 'management',
    'sunk-cost': 'psychology',
    'loss-aversion': 'psychology',
    'disposition-effect': 'psychology'
};

function _normToAffinityKey(rawId, roundType) {
    if (!rawId) return roundType === 'sellhold' ? 'sunk-cost' : 'moat';
    const key = String(rawId).toLowerCase().replace(/[-\s]+/g, '_');
    const mapped = _P_NORM[key];
    if (mapped) return mapped;
    // Direct match in the affinity/sellhold pool
    const normHyphen = String(rawId).toLowerCase().replace(/[_\s]+/g, '-');
    if (roundType === 'sellhold' && SELLHOLD_PRINCIPLE_NAMES[normHyphen]) return normHyphen;
    if (PRINCIPLE_NAMES[normHyphen]) return normHyphen;
    return roundType === 'sellhold' ? 'sunk-cost' : 'moat';
}

function _buildPrincipleOptions(rawPrincipleId, roundType) {
    const isSellHold = roundType === 'sellhold';
    const pool = isSellHold ? SELLHOLD_PRINCIPLE_NAMES : PRINCIPLE_NAMES;
    const correctId = _normToAffinityKey(rawPrincipleId, roundType);
    // Ensure correctId is in pool; if not, pick first
    const validId = pool[correctId] ? correctId : Object.keys(pool)[0];
    // Build distractor list
    let distractors = (PRINCIPLE_AFFINITIES[validId] || []).filter(d => pool[d]);
    // Fill from remaining pool if needed
    if (distractors.length < 3) {
        const rest = Object.keys(pool).filter(k => k !== validId && !distractors.includes(k));
        while (distractors.length < 3 && rest.length) {
            distractors.push(rest.splice(Math.floor(Math.random() * rest.length), 1)[0]);
        }
    }
    const options = [
        { id: validId, name: pool[validId], correct: true },
        ...distractors.slice(0, 3).map(d => ({ id: d, name: pool[d] || d, correct: false }))
    ];
    // Fisher-Yates shuffle
    for (let i = options.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [options[i], options[j]] = [options[j], options[i]];
    }
    return { options, correctId: validId };
}

// Tracks which buttons to un-lock after principle is selected
let _principleDecisiveButtons = [];

function _renderPrincipleSelection(roundType, rawPrincipleId) {
    // Clean up any previous instance and unlock buttons
    const prev = document.getElementById('principle-selection');
    if (prev) prev.remove();
    _principleDecisiveButtons.forEach(b => b && b.classList.remove('principle-pending'));
    _principleDecisiveButtons = [];

    const { options, correctId } = _buildPrincipleOptions(rawPrincipleId, roundType);

    // Determine the parent container and anchor element (insert before this)
    let anchors;
    if (roundType === 'company') {
        anchors = { parent: DOM.companyDisplay, before: DOM.decisionButtons };
        _principleDecisiveButtons = [DOM.buyButton, DOM.passButton];
    } else if (roundType === 'versus') {
        anchors = { parent: DOM.versusDisplay, before: DOM.versusButtons };
        _principleDecisiveButtons = [DOM.chooseAButton, DOM.chooseBButton];
    } else if (roundType === 'sellhold') {
        anchors = { parent: DOM.sellHoldDisplay, before: DOM.sellHoldButtons };
        _principleDecisiveButtons = [DOM.sellButton, DOM.holdButton];
    } else return;

    // Disable decision buttons until principle picked
    _principleDecisiveButtons.forEach(b => b && b.classList.add('principle-pending'));

    const sel = document.createElement('div');
    sel.id = 'principle-selection';
    sel.className = 'principle-selection';
    sel.innerHTML = `
        <div class="principle-selection-title">🎯 מה העיקרון המרכזי שצריך להנחות אותך כאן?</div>
        <div class="principle-options">
            ${options.map(o =>
                `<button class="principle-btn" data-pid="${o.id}" data-correct="${o.correct}">${o.name}</button>`
            ).join('')}
        </div>`;

    // Wire up button clicks
    sel.querySelectorAll('.principle-btn').forEach(btn => {
        btn.addEventListener('click', () => _handlePrincipleSelect(btn.dataset.pid, correctId));
    });

    anchors.parent.insertBefore(sel, anchors.before);
}

function _handlePrincipleSelect(selectedId, correctId) {
    if (GameState.principleSelected !== null) return; // already picked
    GameState.principleSelected = selectedId;
    GameState.principleCorrect = (selectedId === correctId);

    // Highlight selected (no reveal of correct/wrong yet — just selection state)
    document.querySelectorAll('#principle-selection .principle-btn').forEach(btn => {
        btn.disabled = true;
        if (btn.dataset.pid === selectedId) btn.classList.add('principle-selected');
    });

    // Unlock decision buttons
    _principleDecisiveButtons.forEach(b => b && b.classList.remove('principle-pending'));
    _principleDecisiveButtons = [];
}

// Inject principle result into a feedback container (call after decision)
function _injectPrincipleResult(feedbackEl, rawPrincipleId, roundType, decisionWasCorrect) {
    if (GameState.principleSelected === null) return 0;
    const correctAffinityId = _normToAffinityKey(rawPrincipleId, roundType);
    const pool = roundType === 'sellhold' ? { ...PRINCIPLE_NAMES, ...SELLHOLD_PRINCIPLE_NAMES } : PRINCIPLE_NAMES;
    const correctName  = pool[correctAffinityId] || correctAffinityId;
    const selectedName = pool[GameState.principleSelected] || GameState.principleSelected;

    let bonus = 0, html = '', cssClass = '';
    if (GameState.principleCorrect && decisionWasCorrect) {
        bonus = 50;
        html = `🎯 <strong>+50 נק'</strong> — זיהית נכון: ${correctName}!`;
        cssClass = 'principle-result-correct';
    } else if (GameState.principleCorrect && !decisionWasCorrect) {
        bonus = 25;
        html = `🎯 <strong>+25 נק'</strong> — זיהית נכון: ${correctName} (אבל ההחלטה שגויה)`;
        cssClass = 'principle-result-partial';
    } else {
        html = `🎯 העיקרון היה: <strong>${correctName}</strong> (בחרת: ${selectedName})`;
        cssClass = 'principle-result-wrong';
    }

    const div = document.createElement('div');
    div.className = `principle-result ${cssClass}`;
    div.innerHTML = html;
    const continueBtn = feedbackEl.querySelector('.continue-button');
    continueBtn ? feedbackEl.insertBefore(div, continueBtn) : feedbackEl.appendChild(div);

    // Update principle streak tracking
    if (GameState.principleCorrect) {
        GameState.principleStreak++;
        GameState.maxPrincipleStreak = Math.max(GameState.maxPrincipleStreak, GameState.principleStreak);
    } else {
        GameState.principleStreak = 0;
    }

    // Score the bonus
    if (bonus > 0) { GameState.score += bonus; DOM.scoreEl.textContent = GameState.score; }

    // Record identification in mastery (System 1A extension)
    if (window.BuffettMastery && typeof BuffettMastery.recordPrincipleIdentification === 'function') {
        BuffettMastery.recordPrincipleIdentification(correctAffinityId, GameState.principleCorrect);
    }

    return bonus;
}

// ─────────────────────────────────────────────────────────────────────────────
// PHASE 2 — CHART RENDERING
// ─────────────────────────────────────────────────────────────────────────────

// Mini sparkline for versus cards
function createSparklineSVG(values) {
    if (!values || values.length < 2) return '<span style="color:var(--text-muted);font-size:0.8em;">—</span>';
    const w = 80, h = 28, pad = 2;
    const min = Math.min(...values), max = Math.max(...values);
    const range = (max - min) || 1;
    const pts = values.map((v, i) => {
        const x = pad + (i / (values.length - 1)) * (w - pad * 2);
        const y = pad + (1 - (v - min) / range) * (h - pad * 2);
        return `${x.toFixed(1)},${y.toFixed(1)}`;
    }).join(' ');
    const trending = values[values.length - 1] >= values[0];
    const color = trending ? '#48bb78' : '#f56565';
    return `<svg width="${w}" height="${h}" style="overflow:visible;display:block"><polyline points="${pts}" fill="none" stroke="${color}" stroke-width="2" stroke-linejoin="round" stroke-linecap="round"/><circle cx="${pts.split(' ').pop().split(',')[0]}" cy="${pts.split(' ').pop().split(',')[1]}" r="3" fill="${color}"/></svg>`;
}

// Quarterly chart — same dual-axis SVG, uses quarterlyData with quarter labels
function renderQuarterlyChart(containerEl, company) {
    const qData = company.quarterlyData;
    if (!qData || qData.length < 2) {
        containerEl.innerHTML = '<p class="chart-no-data">אין נתונים רבעוניים</p>';
        return;
    }
    // Proxy into historicalData format using quarter as year key
    const proxy = { historicalData: qData.map(q => ({ year: q.quarter, revenue: q.revenue, fcf: q.fcf })) };
    createDualAxisLinePlot(containerEl, proxy, false);
}

// Segments — HTML table
function renderSegmentsTable(containerEl, company) {
    const segs = company.segmentData;
    if (!segs || segs.length === 0) {
        containerEl.innerHTML = '<p class="chart-no-data">אין נתוני מגזרים</p>';
        return;
    }
    containerEl.style.height = 'auto';
    const rows = segs.map(s => {
        const growthVal = parseFloat(s.growth);
        const gClass = isNaN(growthVal) ? '' : growthVal >= 0 ? 'seg-positive' : 'seg-negative';
        return `<tr>
            <td class="seg-name">${s.name}</td>
            <td class="seg-num">₪${s.revenue}M</td>
            <td class="seg-num seg-positive">${s.margin}</td>
            <td class="seg-num ${gClass}">${s.growth}</td>
        </tr>`;
    }).join('');
    containerEl.innerHTML = `
        <table class="segments-table">
            <thead><tr><th>מגזר</th><th>הכנסות</th><th>מרווח</th><th>צמיחה</th></tr></thead>
            <tbody>${rows}</tbody>
        </table>`;
}

// Waterfall — HTML table with delta columns
function renderWaterfallTable(containerEl, company) {
    const data = company.historicalData;
    if (!data || data.length < 2) {
        containerEl.innerHTML = '<p class="chart-no-data">נתונים לא מספיקים</p>';
        return;
    }
    containerEl.style.height = 'auto';
    const rows = data.map((d, i) => {
        const yearLabel = resolveYearLabel(d.year);
        const prev = i > 0 ? data[i - 1] : null;
        const revDelta = prev !== null ? d.revenue - prev.revenue : null;
        const fcfDelta = prev !== null ? d.fcf - prev.fcf : null;
        const rClass = revDelta === null ? '' : revDelta >= 0 ? 'wf-positive' : 'wf-negative';
        const fClass = fcfDelta === null ? '' : fcfDelta >= 0 ? 'wf-positive' : 'wf-negative';
        const fValClass = d.fcf < 0 ? 'wf-negative' : '';
        return `<tr>
            <td class="wf-year">${yearLabel}</td>
            <td>${d.revenue.toLocaleString()}</td>
            <td class="${rClass}">${revDelta !== null ? (revDelta >= 0 ? '+' : '') + revDelta.toLocaleString() : '—'}</td>
            <td class="${fValClass}">${d.fcf.toLocaleString()}</td>
            <td class="${fClass}">${fcfDelta !== null ? (fcfDelta >= 0 ? '+' : '') + fcfDelta.toLocaleString() : '—'}</td>
        </tr>`;
    }).join('');
    containerEl.innerHTML = `
        <table class="waterfall-table">
            <thead><tr><th>שנה</th><th>הכנסות</th><th>Δ הכנסות</th><th>FCF</th><th>Δ FCF</th></tr></thead>
            <tbody>${rows}</tbody>
        </table>`;
}

// No chart
function renderNoChart(containerEl) {
    containerEl.style.height = 'auto';
    containerEl.innerHTML = `
        <div class="no-chart-message">
            <span class="no-chart-icon">📊</span>
            <span>אין גרף זמין — נתחו את המספרים בלבד</span>
        </div>`;
}

// Chart dispatcher
function renderChart(containerEl, company, showProjected) {
    containerEl.style.height = ''; // reset to CSS default
    const chartType = company.chartType || 'annual';
    const titleEl = document.getElementById('main-chart-title');
    switch (chartType) {
        case 'quarterly':
            if (titleEl) titleEl.textContent = 'הכנסות ו-FCF רבעוניים';
            renderQuarterlyChart(containerEl, company);
            break;
        case 'segments':
            if (titleEl) titleEl.textContent = 'פירוט לפי מגזרי עסקים';
            renderSegmentsTable(containerEl, company);
            break;
        case 'waterfall':
            if (titleEl) titleEl.textContent = 'שינויים שנה-על-שנה';
            renderWaterfallTable(containerEl, company);
            break;
        case 'none':
            if (titleEl) titleEl.textContent = '';
            renderNoChart(containerEl);
            break;
        default:
            if (titleEl) titleEl.textContent = 'הכנסות (כחול) ו-FCF (ירוק) שנתיים';
            createDualAxisLinePlot(containerEl, company, showProjected);
    }
}

// Core dual-axis SVG chart (Phase 1: year labels resolved)
function createDualAxisLinePlot(containerEl, companyData, showProjected = false) {
    containerEl.innerHTML = '';
    const dataToChart = [...(companyData.historicalData || [])];
    if (showProjected && companyData.projectedData) dataToChart.push(...companyData.projectedData.map(d => ({ ...d, projected: true })));
    if (dataToChart.length < 2) { containerEl.innerHTML = `<p class="chart-no-data">נתונים לא מספיקים.</p>`; return; }

    const margin = { top: 20, right: 50, bottom: 55, left: 55 };
    const rect = containerEl.getBoundingClientRect();
    const width = rect.width - margin.left - margin.right;
    const height = rect.height - margin.top - margin.bottom;
    if (width <= 0 || height <= 0) return;

    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("class", "line-plot-svg");
    svg.setAttribute("width", rect.width);
    svg.setAttribute("height", rect.height);
    const plotArea = document.createElementNS("http://www.w3.org/2000/svg", "g");
    plotArea.setAttribute("transform", `translate(${margin.left},${margin.top})`);
    svg.appendChild(plotArea);
    containerEl.appendChild(svg);

    const tooltip = document.createElement('div');
    tooltip.className = 'chart-tooltip';
    containerEl.appendChild(tooltip);

    const years = dataToChart.map(d => d.year);
    const xScale = year => { const i = years.indexOf(year); return years.length === 1 ? width / 2 : (i / (years.length - 1)) * width; };

    const revValues = dataToChart.map(d => d.revenue).filter(v => !isNaN(v));
    let minRev = Math.min(0, ...revValues), maxRev = Math.max(...revValues);
    if (minRev === maxRev) { minRev -= 1; maxRev += 1; }
    const y0Scale = v => height - ((v - minRev) / (maxRev - minRev)) * height;

    const fcfValues = dataToChart.map(d => d.fcf).filter(v => !isNaN(v));
    let minFcf = Math.min(0, ...fcfValues), maxFcf = Math.max(...fcfValues);
    if (minFcf === maxFcf) { minFcf -= 1; maxFcf += 1; }
    const y1Scale = v => height - ((v - minFcf) / (maxFcf - minFcf)) * height;

    const drawAxis = (scaleFunc, orient, ticks, axisClass, format) => {
        const g = document.createElementNS("http://www.w3.org/2000/svg", "g");
        g.setAttribute("class", `axis ${orient}-axis ${axisClass}`);
        if (orient === 'x') g.setAttribute("transform", `translate(0,${height})`);
        else if (axisClass === 'fcf-axis') g.setAttribute("transform", `translate(${width},0)`);
        const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
        orient === 'x' ? (line.setAttribute("x1", 0), line.setAttribute("x2", width)) : (line.setAttribute("y1", 0), line.setAttribute("y2", height));
        g.appendChild(line);
        ticks.forEach(val => {
            const pos = scaleFunc(val);
            if (isNaN(pos)) return;
            const mark = document.createElementNS("http://www.w3.org/2000/svg", "line");
            const label = document.createElementNS("http://www.w3.org/2000/svg", "text");
            if (orient === 'x') {
                mark.setAttribute("x1", pos); mark.setAttribute("x2", pos); mark.setAttribute("y2", 5);
                label.setAttribute("x", pos); label.setAttribute("y", 20); label.setAttribute("text-anchor", "middle");
                label.textContent = resolveYearLabel(val); // PHASE 1: resolve relative years
            } else {
                mark.setAttribute("y1", pos); mark.setAttribute("y2", pos);
                mark.setAttribute(axisClass === 'revenue-axis' ? "x1" : "x2", axisClass === 'revenue-axis' ? -5 : 5);
                label.setAttribute("y", pos);
                label.setAttribute("x", axisClass === 'revenue-axis' ? -10 : 10);
                label.setAttribute("text-anchor", axisClass === 'revenue-axis' ? "end" : "start");
                label.setAttribute("alignment-baseline", "middle");
                label.classList.add(axisClass + '-label');
                if (axisClass === 'fcf-axis' && val < 0) label.classList.add('negative-value');
                label.textContent = format(val);
            }
            g.appendChild(mark); g.appendChild(label);
        });
        return g;
    };
    plotArea.appendChild(drawAxis(xScale, 'x', years, '', v => v));
    plotArea.appendChild(drawAxis(y0Scale, 'y', [minRev, (minRev + maxRev) / 2, maxRev], 'revenue-axis', v => Math.round(v).toLocaleString()));
    plotArea.appendChild(drawAxis(y1Scale, 'y', [minFcf, (minFcf + maxFcf) / 2, maxFcf], 'fcf-axis', v => Math.round(v).toLocaleString()));

    const drawLine = (data, yScale, cls, proj) => {
        const filtered = data.filter(d => !isNaN(yScale(cls === 'revenue' ? d.revenue : d.fcf)));
        if (filtered.length < 2) return;
        const pathD = filtered.map((d, i) => `${i === 0 ? 'M' : 'L'} ${xScale(d.year)} ${yScale(cls === 'revenue' ? d.revenue : d.fcf)}`).join(' ');
        const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
        path.setAttribute("class", `line ${cls}${proj ? ' projected' : ''}`);
        path.setAttribute("d", pathD);
        plotArea.appendChild(path);
        filtered.forEach(d => {
            const val = cls === 'revenue' ? d.revenue : d.fcf;
            const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
            circle.setAttribute("cx", xScale(d.year));
            circle.setAttribute("cy", yScale(val));
            circle.setAttribute("r", 5);
            circle.setAttribute("class", `dot ${cls}${proj ? ' projected' : ''}${cls === 'fcf' && val < 0 ? ' negative' : ''}`);
            circle.addEventListener('mouseenter', e => {
                tooltip.innerHTML = `<strong>${resolveYearLabel(d.year)}</strong><br>${cls === 'revenue' ? 'הכנסות' : 'FCF'}: ${val.toLocaleString()}`;
                tooltip.classList.add('show');
                const r = containerEl.getBoundingClientRect();
                tooltip.style.left = (e.clientX - r.left - tooltip.offsetWidth / 2) + 'px';
                tooltip.style.top = (e.clientY - r.top - tooltip.offsetHeight - 10) + 'px';
            });
            circle.addEventListener('mouseleave', () => tooltip.classList.remove('show'));
            plotArea.appendChild(circle);
        });
    };
    const hist = dataToChart.filter(d => !d.projected), proj = dataToChart.filter(d => d.projected);
    drawLine(hist, y0Scale, 'revenue', false); drawLine(hist, y1Scale, 'fcf', false);
    if (showProjected && proj.length > 0) {
        const conn = [hist[hist.length - 1], ...proj];
        drawLine(conn, y0Scale, 'revenue', true); drawLine(conn, y1Scale, 'fcf', true);
    }
}

// ─────────────────────────────────────────────────────────────────────────────
// DISPLAY HELPERS
// ─────────────────────────────────────────────────────────────────────────────
function hideAllRoundDisplays() {
    DOM.companyDisplay.classList.add('hidden');
    DOM.specialRoundDisplay.classList.add('hidden');
    if (DOM.versusDisplay) DOM.versusDisplay.classList.add('hidden');
    if (DOM.sellHoldDisplay) DOM.sellHoldDisplay.classList.add('hidden');
}

// ─────────────────────────────────────────────────────────────────────────────
// DISPLAY COMPANY (Phase 2: renderChart)
// ─────────────────────────────────────────────────────────────────────────────
function displayCompany(company) {
    DOM.companyName.textContent = company.name;
    DOM.companySymbol.textContent = company.symbol || 'N/A';
    DOM.companyPrice.textContent = `₪${company.price?.toFixed(2) || '0.00'}`;
    DOM.companySector.textContent = company.sector || '';
    DOM.companyDescription.textContent = company.description || '';
    DOM.companyManagement.textContent = company.management || '';
    DOM.companyMoat.textContent = company.moat || '';
    DOM.companyEvents.textContent = company.events || '';

    const basicMetrics = (company.metrics?.basic || company.basicMetrics || []).filter(m => m && typeof m.name === 'string' && m.value !== undefined);
    const advMetrics = (company.metrics?.advanced || company.advancedMetrics || []).filter(m => m && typeof m.name === 'string' && m.value !== undefined);
    DOM.basicMetricsGrid.innerHTML = basicMetrics.map(m => `<div class="metric"><div class="metric-name">${m.name}</div><div class="metric-value">${m.value}</div></div>`).join('');
    DOM.advancedMetricsGrid.innerHTML = advMetrics.map(m => `<div class="metric"><div class="metric-name">${m.name}</div><div class="metric-value">${m.value}</div></div>`).join('');

    const hintCost = Math.round(company.pointValue * 0.5);
    DOM.companyHintButton.textContent = `רמז (-${hintCost} נק')`; DOM.companyHintButton.disabled = false;
    DOM.unlockProjectionsButton.disabled = false; DOM.unlockProjectionsButton.textContent = 'גלה תחזיות (-200 נק\')';
    DOM.companyHintDisplay.classList.add('hidden');
    // Clean up previous feedback extras
    DOM.decisionFeedback.querySelectorAll('.feedback-collapsible, .bias-warning').forEach(el => el.remove());
    DOM.decisionFeedback.classList.add('hidden');
    DOM.decisionButtons.style.display = 'flex'; DOM.decisiveSignals.classList.add('hidden');
    // Hide projections button for non-annual chart types
    const chartType = company.chartType || 'annual';
    DOM.unlockProjectionsButton.style.display = (chartType === 'annual') ? 'block' : 'none';

    hideAllRoundDisplays();
    DOM.companyDisplay.classList.remove('hidden');
    requestAnimationFrame(() => renderChart(DOM.linePlotContainer, company, false));
    _renderPrincipleSelection('company', company.feedback?.principle?.id);
}

// ─────────────────────────────────────────────────────────────────────────────
// DISPLAY SPECIAL ROUND
// ─────────────────────────────────────────────────────────────────────────────
function displaySpecialRound(event) {
    DOM.specialTitle.textContent = event.title || '';
    DOM.specialDescription.textContent = event.description || '';
    const hintCost = Math.round(event.pointValue * 0.5);
    DOM.specialHintButton.textContent = `רמז (-${hintCost} נק')`; DOM.specialHintButton.disabled = false;
    DOM.specialHintDisplay.classList.add('hidden'); DOM.specialFeedback.classList.add('hidden');
    DOM.impactButtons.style.display = 'flex';
    hideAllRoundDisplays();
    DOM.specialRoundDisplay.classList.remove('hidden');
}

// ─────────────────────────────────────────────────────────────────────────────
// PHASE 4 — VERSUS ROUND DISPLAY
// ─────────────────────────────────────────────────────────────────────────────
function buildVersusCompanyHTML(companyData, idPrefix) {
    document.getElementById(`${idPrefix}-name`).textContent = companyData.name || '';
    document.getElementById(`${idPrefix}-symbol`).textContent = companyData.symbol || '';
    document.getElementById(`${idPrefix}-sector`).textContent = companyData.sector || '';
    document.getElementById(`${idPrefix}-desc`).textContent = companyData.description || '';
    const metricsEl = document.getElementById(`${idPrefix}-metrics`);
    metricsEl.innerHTML = (companyData.metrics || []).map(m =>
        `<div class="versus-metric-row"><span class="versus-metric-name">${m.name}</span><span class="versus-metric-value">${m.value}</span></div>`
    ).join('');
    const sparkEl = document.getElementById(`${idPrefix}-sparkline`);
    sparkEl.innerHTML = createSparklineSVG(companyData.historicalFCF);
}

function displayVersusRound(round) {
    // Reset state
    DOM.versusFeedback.querySelectorAll('.feedback-collapsible').forEach(el => el.remove());
    DOM.versusFeedback.className = 'decision-feedback hidden';
    DOM.versusFeedbackTitle.className = 'decision-title';
    DOM.versusPrincipleBadge.classList.add('hidden');
    DOM.versusButtons.style.display = 'flex';
    document.getElementById('versus-company-a')?.classList.remove('versus-winner', 'versus-loser');
    document.getElementById('versus-company-b')?.classList.remove('versus-winner', 'versus-loser');

    DOM.versusTitle.textContent = round.title || '';
    DOM.versusDescription.textContent = round.description || '';
    buildVersusCompanyHTML(round.companyA, 'versus-a');
    buildVersusCompanyHTML(round.companyB, 'versus-b');

    hideAllRoundDisplays();
    DOM.versusDisplay.classList.remove('hidden');
    _renderPrincipleSelection('versus', round.feedback?.principle?.id);
}

// ─────────────────────────────────────────────────────────────────────────────
// PHASE 5 — SELL/HOLD ROUND DISPLAY
// ─────────────────────────────────────────────────────────────────────────────
function displaySellHoldRound(round) {
    // Reset state
    DOM.sellHoldFeedback.querySelectorAll('.feedback-collapsible, .bias-warning').forEach(el => el.remove());
    DOM.sellHoldFeedback.className = 'decision-feedback hidden';
    DOM.sellHoldFeedbackTitle.className = 'decision-title';
    DOM.sellHoldPrincipleBadge.classList.add('hidden');
    DOM.sellHoldButtons.style.display = 'flex';

    DOM.sellHoldTitle.textContent = round.title || '';

    const pc = round.purchaseContext || {};
    DOM.portfolioCompanyName.textContent = pc.name || '';
    DOM.portfolioMeta.textContent = `${pc.symbol || ''} · ${pc.sector || ''}`;
    DOM.portfolioPurchasePrice.textContent = pc.purchasePrice ? `₪${pc.purchasePrice}` : '—';
    DOM.portfolioCurrentPrice.textContent = pc.currentPrice ? `₪${pc.currentPrice}` : '—';

    const changeEl = DOM.portfolioChange;
    changeEl.textContent = pc.change || '';
    changeEl.classList.remove('positive', 'negative');
    if (pc.change && pc.change.startsWith('+')) changeEl.classList.add('positive');
    else if (pc.change && pc.change.startsWith('-')) changeEl.classList.add('negative');

    DOM.portfolioHoldingPeriod.textContent = pc.holdingPeriod || '';
    DOM.sellHoldNewInfo.textContent = round.newInformation || '';
    DOM.sellHoldMetricsGrid.innerHTML = (round.currentMetrics || []).map(m =>
        `<div class="metric"><div class="metric-name">${m.name}</div><div class="metric-value">${m.value}</div></div>`
    ).join('');

    hideAllRoundDisplays();
    DOM.sellHoldDisplay.classList.remove('hidden');
    _renderPrincipleSelection('sellhold', round.feedback?.principle?.id);
}

// ─────────────────────────────────────────────────────────────────────────────
// HINT & PROJECTIONS
// ─────────────────────────────────────────────────────────────────────────────
function handleHintPurchase() {
    const roundData = GameState.gameRounds[GameState.currentRound];
    if (!roundData || GameState.hintUsed) return;
    const isSpecial = roundData.type === 'special';
    const data = roundData.data;
    const hintCost = Math.round(data.pointValue * 0.5);
    showConfirmModal('רכישת רמז', `האם לרכוש רמז תמורת ${hintCost} נקודות?`, () => {
        GameState.hintUsed = true;
        GameState.hintUsedThisGame = true;
        const hints = data.hints || [{ text: data.hint }];
        const hintText = hints[0]?.text || data.hint || 'אין רמז זמין';
        if (isSpecial) { DOM.specialHintText.textContent = hintText; DOM.specialHintDisplay.classList.remove('hidden'); DOM.specialHintButton.disabled = true; }
        else { DOM.companyHintText.textContent = hintText; DOM.companyHintDisplay.classList.remove('hidden'); DOM.companyHintButton.disabled = true; }
    });
}

function handleUnlockProjections() {
    if (GameState.projectionsUnlocked) return;
    showConfirmModal('גילוי תחזיות', 'האם לגלות תחזיות תמורת 200 נקודות?', () => {
        GameState.projectionsUnlocked = true;
        GameState.score -= 200;
        DOM.scoreEl.textContent = GameState.score;
        DOM.unlockProjectionsButton.disabled = true;
        DOM.unlockProjectionsButton.textContent = 'תחזיות נפתחו';
        const company = GameState.gameRounds[GameState.currentRound].data;
        renderChart(DOM.linePlotContainer, company, true);
    });
}

// ─────────────────────────────────────────────────────────────────────────────
// DECISION HANDLERS
// ─────────────────────────────────────────────────────────────────────────────

// Company buy/pass (Phase 3 & 7 feedback extras)
function handleInvestmentDecision(decision) {
    if (GameState.decisionMade || !GameState.gameRounds[GameState.currentRound]) return;
    if (GameState.gameRounds[GameState.currentRound].type !== 'company') return;
    GameState.decisionMade = true;
    GameState.lastDecision = decision;
    DOM.companyHintButton.disabled = true; DOM.unlockProjectionsButton.disabled = true;

    const company = GameState.gameRounds[GameState.currentRound].data;
    const correctDecision = company.correctDecision || (company.isGoodValue ? 'buy' : 'pass');
    const isCorrect = decision === correctDecision;
    const potentialPoints = calculatePotentialPoints(company);
    let pointsAwarded = isCorrect ? potentialPoints : 0;

    const feedback = company.feedback || {};
    const explanationText = isCorrect
        ? (feedback.correctExplanation || feedback.positive || 'החלטה נכונה!')
        : (feedback.incorrectExplanation || feedback.negative || 'החלטה שגויה.');

    DOM.decisionFeedback.className = 'decision-feedback';
    DOM.decisionTitle.className = 'decision-title';

    if (isCorrect) {
        GameState.correctDecisions++;
        handleCorrectDecisionCombo();
        const comboBonus = calculateComboBonus(pointsAwarded);
        pointsAwarded += comboBonus;
        GameState.score += pointsAwarded;
        let title = `החלטה נכונה! (+${potentialPoints} נק'`;
        if (comboBonus > 0) title += ` + ${comboBonus} בונוס`;
        DOM.decisionTitle.textContent = title + ")";
        DOM.decisionTitle.classList.add('correct');
        DOM.decisionFeedback.classList.add('correct');
    } else {
        resetCombo();
        DOM.decisionTitle.textContent = 'החלטה שגויה';
        DOM.decisionTitle.classList.add('incorrect');
        DOM.decisionFeedback.classList.add('incorrect');
    }

    if (feedback.principle) { DOM.principleBadge.textContent = feedback.principle.name; DOM.principleBadge.classList.remove('hidden'); }
    else DOM.principleBadge.classList.add('hidden');
    DOM.decisionExplanation.textContent = explanationText;
    if (feedback.decisiveSignals?.length > 0) {
        DOM.decisiveSignalsList.innerHTML = feedback.decisiveSignals.map(s => `<li>${s}</li>`).join('');
        DOM.decisiveSignals.classList.remove('hidden');
    } else DOM.decisiveSignals.classList.add('hidden');

    DOM.correctDecisionsEl.textContent = GameState.correctDecisions;
    DOM.scoreEl.textContent = GameState.score;
    GameState.roundOutcomes[GameState.currentRound] = isCorrect ? 'passed' : 'failed';
    updateProgressStageDisplay();

    if (window.BuffettMascot) {
        try { if (isCorrect) BuffettMascot.onCorrect(GameState.consecutiveCorrect); else BuffettMascot.onIncorrect(); } catch (e) { }
    }

    // Mastery tracking (System 1A)
    if (window.BuffettMastery) BuffettMastery.recordRound(feedback.principle?.id, isCorrect);

    // Principle pre-selection result + bonus
    _injectPrincipleResult(DOM.decisionFeedback, feedback.principle?.id, 'company', isCorrect);

    // Phase 3 + 7: inject extras (counterSignal, workedExample, sellTriggers, dueDiligence)
    const extrasData = { ...feedback };
    if (company.sellTriggers) extrasData.sellTriggers = company.sellTriggers;
    if (company.dueDiligence) extrasData.dueDiligence = company.dueDiligence;
    injectFeedbackExtras(extrasData, DOM.decisionFeedback);

    DOM.decisionButtons.style.display = 'none';

    if (shouldShowReasoning() && company.reasoningOptions && company.reasoningOptions.length > 0) {
        DOM.decisionFeedback.classList.add('hidden');
        displayReasoningOptions(company, decision);
    } else {
        DOM.decisionFeedback.classList.remove('hidden');
    }

    DOM.companyDisplay.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// Special event impact
function handleImpactDecision(impact) {
    if (GameState.decisionMade || !GameState.gameRounds[GameState.currentRound]) return;
    if (GameState.gameRounds[GameState.currentRound].type !== 'special') return;
    GameState.decisionMade = true;
    DOM.specialHintButton.disabled = true;

    const event = GameState.gameRounds[GameState.currentRound].data;
    const isCorrect = impact === event.correctImpact;
    const potentialPoints = calculatePotentialPoints(event);
    let pointsAwarded = isCorrect ? potentialPoints : 0;

    DOM.specialFeedback.className = 'decision-feedback';
    DOM.specialFeedbackTitle.className = 'decision-title';
    const feedback = event.feedback || {};

    if (isCorrect) {
        GameState.correctDecisions++;
        handleCorrectDecisionCombo();
        const comboBonus = calculateComboBonus(pointsAwarded);
        pointsAwarded += comboBonus;
        GameState.score += pointsAwarded;
        let title = `ניתוח נכון! (+${potentialPoints} נק'`;
        if (comboBonus > 0) title += ` + ${comboBonus} בונוס`;
        DOM.specialFeedbackTitle.textContent = title + ")";
        DOM.specialFeedbackTitle.classList.add('correct');
        DOM.specialFeedback.classList.add('correct');
        DOM.specialExplanation.textContent = feedback.correct || 'תשובה נכונה!';
    } else {
        resetCombo();
        DOM.specialFeedbackTitle.textContent = 'ניתוח שגוי';
        DOM.specialFeedbackTitle.classList.add('incorrect');
        DOM.specialFeedback.classList.add('incorrect');
        DOM.specialExplanation.textContent = feedback.incorrect || 'תשובה שגויה.';
    }

    if (feedback.principle) { DOM.specialPrincipleBadge.textContent = feedback.principle.name; DOM.specialPrincipleBadge.classList.remove('hidden'); }
    else DOM.specialPrincipleBadge.classList.add('hidden');

    // Mastery tracking (System 1A)
    if (window.BuffettMastery) BuffettMastery.recordRound(feedback.principle?.id, isCorrect);

    DOM.correctDecisionsEl.textContent = GameState.correctDecisions;
    DOM.scoreEl.textContent = GameState.score;
    GameState.roundOutcomes[GameState.currentRound] = isCorrect ? 'passed' : 'failed';
    updateProgressStageDisplay();

    if (window.BuffettMascot) {
        try { if (isCorrect) BuffettMascot.onCorrect(GameState.consecutiveCorrect); else BuffettMascot.onIncorrect(); } catch (e) { }
    }

    DOM.specialFeedback.classList.remove('hidden');
    DOM.impactButtons.style.display = 'none';
    DOM.specialFeedback.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

// Phase 4 — Versus decision
function handleVersusDecision(choice) {
    if (GameState.decisionMade) return;
    GameState.decisionMade = true;

    const round = GameState.gameRounds[GameState.currentRound].data;
    const isCorrect = choice === round.correctAnswer;
    const pointValue = round.pointValue || 120;

    DOM.versusFeedback.className = 'decision-feedback';
    DOM.versusFeedbackTitle.className = 'decision-title';

    if (isCorrect) {
        GameState.correctDecisions++;
        handleCorrectDecisionCombo();
        const comboBonus = calculateComboBonus(pointValue);
        GameState.score += pointValue + comboBonus;
        DOM.versusFeedbackTitle.textContent = `בחירה נכונה! (+${pointValue} נק'${comboBonus > 0 ? ` + ${comboBonus} בונוס` : ''})`;
        DOM.versusFeedbackTitle.classList.add('correct');
        DOM.versusFeedback.classList.add('correct');
    } else {
        resetCombo();
        DOM.versusFeedbackTitle.textContent = 'לא בדיוק...';
        DOM.versusFeedbackTitle.classList.add('incorrect');
        DOM.versusFeedback.classList.add('incorrect');
    }

    const fb = round.feedback || {};
    if (fb.principle) { DOM.versusPrincipleBadge.textContent = fb.principle.name; DOM.versusPrincipleBadge.classList.remove('hidden'); }
    DOM.versusExplanation.textContent = fb.explanation || '';

    // Mastery tracking (System 1A)
    if (window.BuffettMastery) BuffettMastery.recordRound(fb.principle?.id, isCorrect);
    if (isCorrect) GameState.versusCorrect++;

    DOM.correctDecisionsEl.textContent = GameState.correctDecisions;
    DOM.scoreEl.textContent = GameState.score;
    GameState.roundOutcomes[GameState.currentRound] = isCorrect ? 'passed' : 'failed';
    updateProgressStageDisplay();

    if (window.BuffettMascot) {
        try { if (isCorrect) BuffettMascot.onCorrect(GameState.consecutiveCorrect); else BuffettMascot.onIncorrect(); } catch (e) { }
    }

    // Highlight winner/loser
    const aEl = document.getElementById('versus-company-a');
    const bEl = document.getElementById('versus-company-b');
    const correctIsA = round.correctAnswer === 'A';
    if (aEl) aEl.classList.add(correctIsA ? 'versus-winner' : 'versus-loser');
    if (bEl) bEl.classList.add(correctIsA ? 'versus-loser' : 'versus-winner');

    // Principle pre-selection result
    _injectPrincipleResult(DOM.versusFeedback, fb.principle?.id, 'versus', isCorrect);

    // Inject extras (counterArgument as counterSignalExplanation, workedExample)
    injectFeedbackExtras({
        counterSignalExplanation: fb.counterArgument,
        workedExample: round.workedExample
    }, DOM.versusFeedback);

    DOM.versusButtons.style.display = 'none';
    DOM.versusFeedback.classList.remove('hidden');
    DOM.versusDisplay.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// Phase 5 — Sell/Hold decision
function handleSellHoldDecision(decision) {
    if (GameState.decisionMade) return;
    GameState.decisionMade = true;

    const round = GameState.gameRounds[GameState.currentRound].data;
    const isCorrect = decision === round.correctDecision;
    const pointValue = round.pointValue || 120;

    DOM.sellHoldFeedback.className = 'decision-feedback';
    DOM.sellHoldFeedbackTitle.className = 'decision-title';

    if (isCorrect) {
        GameState.correctDecisions++;
        handleCorrectDecisionCombo();
        const comboBonus = calculateComboBonus(pointValue);
        GameState.score += pointValue + comboBonus;
        DOM.sellHoldFeedbackTitle.textContent = `החלטה נכונה! (+${pointValue} נק'${comboBonus > 0 ? ` + ${comboBonus} בונוס` : ''})`;
        DOM.sellHoldFeedbackTitle.classList.add('correct');
        DOM.sellHoldFeedback.classList.add('correct');
    } else {
        resetCombo();
        DOM.sellHoldFeedbackTitle.textContent = 'לא בדיוק...';
        DOM.sellHoldFeedbackTitle.classList.add('incorrect');
        DOM.sellHoldFeedback.classList.add('incorrect');
    }

    const fb = round.feedback || {};
    if (fb.principle) { DOM.sellHoldPrincipleBadge.textContent = fb.principle.name; DOM.sellHoldPrincipleBadge.classList.remove('hidden'); }
    DOM.sellHoldExplanation.textContent = fb.explanation || '';

    // Mastery tracking (System 1A)
    if (window.BuffettMastery) BuffettMastery.recordRound(fb.principle?.id, isCorrect);
    if (isCorrect) GameState.sellHoldCorrect++;

    // Principle pre-selection result
    _injectPrincipleResult(DOM.sellHoldFeedback, fb.principle?.id, 'sellhold', isCorrect);

    // Bias warning (Phase 5) — insert before continue button
    if (fb.biasWarning) {
        const bw = document.createElement('div');
        bw.className = 'bias-warning';
        bw.innerHTML = `<strong>⚠️ הטיה קוגניטיבית:</strong> ${fb.biasWarning}`;
        DOM.sellHoldFeedback.insertBefore(bw, DOM.sellHoldFeedback.querySelector('.continue-button'));
    }

    injectFeedbackExtras({
        counterSignalExplanation: fb.counterArgument,
        workedExample: round.workedExample
    }, DOM.sellHoldFeedback);

    DOM.correctDecisionsEl.textContent = GameState.correctDecisions;
    DOM.scoreEl.textContent = GameState.score;
    GameState.roundOutcomes[GameState.currentRound] = isCorrect ? 'passed' : 'failed';
    updateProgressStageDisplay();

    if (window.BuffettMascot) {
        try { if (isCorrect) BuffettMascot.onCorrect(GameState.consecutiveCorrect); else BuffettMascot.onIncorrect(); } catch (e) { }
    }

    DOM.sellHoldButtons.style.display = 'none';
    DOM.sellHoldFeedback.classList.remove('hidden');
    DOM.sellHoldDisplay.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// ─────────────────────────────────────────────────────────────────────────────
// GAME FLOW
// ─────────────────────────────────────────────────────────────────────────────
function generateGameRounds() {
    const diff = GameState.difficulty;
    const tierMap = { easy: 1, medium: 2, hard: 3, expert: 4 };
    const tier = tierMap[diff] || 1;

    // System 1D: adaptive weighted selection by principle mastery
    const rawCompanies = window.BuffettGame?.companies?.[diff] || [];
    const companies = window.BuffettMastery
        ? BuffettMastery.weightedShuffle([...rawCompanies], BuffettMastery.getCompanyWeight)
        : [...rawCompanies].sort(() => Math.random() - 0.5);
    const events = [...(window.BuffettGame?.specialEvents?.[diff] || [])].sort(() => Math.random() - 0.5);
    // Filter versus/sellhold by exact tier; fall back to any tier <= current if empty
    let versus = (window.BuffettGame?.versusRounds || []).filter(r => r.tier === tier);
    if (versus.length === 0) versus = (window.BuffettGame?.versusRounds || []).filter(r => r.tier <= tier);
    versus = [...versus].sort(() => Math.random() - 0.5);

    let sellHold = (window.BuffettGame?.sellHoldRounds || []).filter(r => r.tier === tier);
    if (sellHold.length === 0) sellHold = (window.BuffettGame?.sellHoldRounds || []).filter(r => r.tier <= tier);
    sellHold = [...sellHold].sort(() => Math.random() - 0.5);

    GameState.gameRounds = [];
    let cIdx = 0, eIdx = 0, vIdx = 0, shIdx = 0;

    for (let i = 0; i < GameState.totalRounds; i++) {
        // Round 5 (idx 4): versus
        if (i === 4 && vIdx < versus.length) {
            GameState.gameRounds.push({ type: 'versus', data: versus[vIdx++] });
        }
        // Round 7 (idx 6): sell/hold (medium+)
        else if (i === 6 && shIdx < sellHold.length && diff !== 'easy') {
            GameState.gameRounds.push({ type: 'sellhold', data: sellHold[shIdx++] });
        }
        // Rounds 4 & 8 (idx 3, 7): special events
        else if ((i === 3 || i === 7) && eIdx < events.length) {
            GameState.gameRounds.push({ type: 'special', data: events[eIdx++] });
        }
        else if (cIdx < companies.length) {
            GameState.gameRounds.push({ type: 'company', data: companies[cIdx++] });
        }
    }
}

function loadCurrentRound() {
    if (GameState.currentRound >= GameState.totalRounds || GameState.currentRound >= GameState.gameRounds.length) { endGame(); return; }
    const effectContainer = document.getElementById('buffett-effect-container');
    if (effectContainer) effectContainer.innerHTML = '';

    GameState.decisionMade = false; GameState.projectionsUnlocked = false; GameState.hintUsed = false;
    GameState.lastDecision = null;
    GameState.principleSelected = null; GameState.principleCorrect = false;

    selectedReasonings = [];
    reasoningSubmitted = false;
    DOM.reasoningSection.classList.add('hidden');
    DOM.submitReasoningButton.classList.remove('hidden');
    DOM.submitReasoningButton.disabled = true;

    DOM.currentRoundDisplay.textContent = `${GameState.currentRound + 1}/${GameState.totalRounds}`;
    updateProgressStageDisplay();

    const round = GameState.gameRounds[GameState.currentRound];
    if (round.type === 'special') displaySpecialRound(round.data);
    else if (round.type === 'versus') displayVersusRound(round.data);
    else if (round.type === 'sellhold') displaySellHoldRound(round.data);
    else displayCompany(round.data);

    if (window.BuffettMascot) {
        try { BuffettMascot.onRoundStart(round.type || 'company'); } catch (e) { }
    }
}

function continueToNextRound() { GameState.currentRound++; loadCurrentRound(); }

function startGame() {
    DOM.difficultySelect.classList.add('hidden');
    DOM.scoreContainer.classList.remove('hidden');
    DOM.gameContainer.classList.remove('hidden');
    DOM.progressStagesContainer.classList.remove('hidden');

    try {
        if (window.BuffettShop) {
            const equipped = BuffettShop.getEquipped();
            const avatar = BuffettShop.getItem('avatars', equipped.avatar);
            const gameAvatarEl = document.getElementById('game-avatar');
            if (gameAvatarEl && avatar && !avatar.isDefault) {
                gameAvatarEl.textContent = avatar.preview || avatar.emoji || '';
                gameAvatarEl.style.display = 'block';
            } else if (gameAvatarEl) gameAvatarEl.style.display = 'none';
        }
    } catch (e) { }

    if (window.BuffettMascot) { try { BuffettMascot.show(); } catch (e) { } }

    GameState.startTime = Date.now();
    GameState.maxStreak = 0; GameState.maxCombo = 0;
    GameState.hintUsedThisGame = false;
    GameState.versusCorrect = 0; GameState.sellHoldCorrect = 0;

    initializeProgressStages();
    generateGameRounds();
    if (GameState.gameRounds.length > 0) loadCurrentRound();
    else endGameWithError("שגיאה ביצירת סיבובים.");
}

function endGame() {
    const pct = Math.round((GameState.correctDecisions / GameState.totalRounds) * 100);
    let msg, rating;
    if (pct >= 80) { msg = `מצוין! ${GameState.correctDecisions}/${GameState.totalRounds} (${pct}%).`; rating = "מומחה"; }
    else if (pct >= 60) { msg = `טוב מאוד! ${GameState.correctDecisions}/${GameState.totalRounds} (${pct}%).`; rating = "מיומן"; }
    else if (pct >= 40) { msg = `לא רע! ${GameState.correctDecisions}/${GameState.totalRounds} (${pct}%).`; rating = "מתפתח"; }
    else { msg = `${GameState.correctDecisions}/${GameState.totalRounds} (${pct}%).`; rating = "מתחיל"; }

    if (window.BuffettShop && GameState.score > 0) {
        BuffettShop.logic.addPoints(GameState.score);
        const totalPoints = BuffettShop.logic.getPoints();
        DOM.resultMessage.innerHTML = `${msg}<br><br>ניקוד סופי: <strong>${GameState.score}</strong><br>דירוג: <strong>${rating}</strong><br><br>💰 סה"כ נקודות לחנות: <strong>${totalPoints.toLocaleString()}</strong>`;
    } else {
        DOM.resultMessage.innerHTML = `${msg}<br><br>ניקוד סופי: <strong>${GameState.score}</strong><br>דירוג: <strong>${rating}</strong>`;
    }

    let unlock = '';
    if (GameState.difficulty === 'easy' && pct >= 60 && Storage.unlockDifficulty('medium')) unlock = '<br><br>🎉 רמת בינוני נפתחה!';
    else if (GameState.difficulty === 'medium' && pct >= 60 && Storage.unlockDifficulty('hard')) unlock = '<br><br>🎉 רמת קשה נפתחה!';
    if (unlock) DOM.resultMessage.innerHTML += unlock;

    DOM.expertFeedback.innerHTML = `<strong>עקרונות באפט:</strong><br>1. הבן את העסק<br>2. חפש Moat<br>3. הנהלה איכותית<br>4. FCF הוא המפתח<br>5. מרווח ביטחון<br>6. חשוב לטווח ארוך`;
    DOM.resultOverlay.classList.remove('hidden');
    DOM.resultOverlay.classList.add('show');

    if (window.BuffettShop && pct >= 60) BuffettShop.effects.playCurrentEffect();
    if (window.BuffettMascot) { try { BuffettMascot.onGameEnd(pct); } catch (e) { } }

    // System 1 + 2: mastery & achievements
    if (window.BuffettMastery) {
        const prevHistory = BuffettMastery.loadMastery().history;
        const previousLow = prevHistory.length > 0 && prevHistory[0].total > 0
            && (prevHistory[0].correct / prevHistory[0].total) < 0.4;
        const gameData = {
            difficulty: GameState.difficulty,
            correct: GameState.correctDecisions,
            total: GameState.totalRounds,
            score: GameState.score,
            hintUsed: GameState.hintUsedThisGame,
            maxStreak: GameState.maxStreak,
            maxCombo: GameState.maxCombo,
            versusCorrect: GameState.versusCorrect,
            sellHoldCorrect: GameState.sellHoldCorrect,
            maxPrincipleStreak: GameState.maxPrincipleStreak,
            durationMs: Date.now() - (GameState.startTime || Date.now()),
            previousLow
        };
        const mastery = BuffettMastery.onGameEnd(gameData);
        if (window.BuffettAchievements) {
            const newAch = BuffettAchievements.checkAll(gameData, mastery);
            if (newAch.length > 0) setTimeout(() => BuffettAchievements.showToastsSequentially(newAch), 2000);
        }
    }
}

function endGameWithError(errorMessage) {
    DOM.resultMessage.textContent = errorMessage || "אירעה שגיאה.";
    DOM.expertFeedback.innerHTML = "";
    DOM.scoreEl.textContent = GameState.score;
    DOM.resultOverlay.classList.remove('hidden');
    DOM.resultOverlay.classList.add('show');
    DOM.gameContainer.classList.add('hidden');
}

function initGame() {
    GameState.currentRound = 0; GameState.correctDecisions = 0; GameState.score = 0;
    GameState.gameRounds = []; GameState.decisionMade = false;
    GameState.projectionsUnlocked = false; GameState.hintUsed = false; GameState.lastDecision = null;
    GameState.startTime = 0; GameState.maxStreak = 0; GameState.maxCombo = 0;
    GameState.hintUsedThisGame = false; GameState.versusCorrect = 0; GameState.sellHoldCorrect = 0;
    GameState.principleSelected = null; GameState.principleCorrect = false;
    GameState.principleStreak = 0; GameState.maxPrincipleStreak = 0;
    resetCombo();

    DOM.correctDecisionsEl.textContent = "0";
    DOM.scoreEl.textContent = "0";
    DOM.currentRoundDisplay.textContent = `1/${GameState.totalRounds}`;

    initializeProgressStages();
    updateDifficultyButtonsState();
    [DOM.easyButton, DOM.mediumButton, DOM.hardButton].forEach(btn => btn.classList.remove('selected'));
    updateDifficultyDescription(null);

    [DOM.companyHintDisplay, DOM.specialHintDisplay, DOM.decisionFeedback,
        DOM.specialFeedback, DOM.resultOverlay, DOM.scoreContainer,
        DOM.gameContainer, DOM.progressStagesContainer, DOM.companyDisplay,
        DOM.specialRoundDisplay, DOM.loadingEl].forEach(el => el && el.classList.add('hidden'));

    // Also hide new round displays
    if (DOM.versusDisplay) DOM.versusDisplay.classList.add('hidden');
    if (DOM.sellHoldDisplay) DOM.sellHoldDisplay.classList.add('hidden');

    DOM.resultOverlay.classList.remove('show');

    if (window.BuffettMascot) { try { BuffettMascot.hide(); } catch (e) { } }
    const gameAvatarEl = document.getElementById('game-avatar');
    if (gameAvatarEl) gameAvatarEl.style.display = 'none';

    [DOM.companyHintButton, DOM.specialHintButton].forEach(btn => {
        btn.disabled = true; btn.textContent = 'רמז (-?? נק\')';
    });

    DOM.difficultySelect.classList.remove('hidden');

    if (typeof updateMenuPointsDisplay === 'function') updateMenuPointsDisplay();
    closeModal();
}

// ─────────────────────────────────────────────────────────────────────────────
// EVENT LISTENERS
// ─────────────────────────────────────────────────────────────────────────────
DOM.easyButton.addEventListener('click', () => selectDifficulty('easy'));
DOM.mediumButton.addEventListener('click', () => selectDifficulty('medium'));
DOM.hardButton.addEventListener('click', () => selectDifficulty('hard'));

DOM.buyButton.addEventListener('click', () => handleInvestmentDecision('buy'));
DOM.passButton.addEventListener('click', () => handleInvestmentDecision('pass'));

DOM.positiveImpactButton.addEventListener('click', () => handleImpactDecision('positive'));
DOM.neutralImpactButton.addEventListener('click', () => handleImpactDecision('neutral'));
DOM.negativeImpactButton.addEventListener('click', () => handleImpactDecision('negative'));

DOM.continueButton.addEventListener('click', continueToNextRound);
DOM.specialContinueButton.addEventListener('click', continueToNextRound);

// Versus continue
if (DOM.versusContinueButton) DOM.versusContinueButton.addEventListener('click', continueToNextRound);
// Versus choice buttons
if (DOM.chooseAButton) DOM.chooseAButton.addEventListener('click', () => handleVersusDecision('A'));
if (DOM.chooseBButton) DOM.chooseBButton.addEventListener('click', () => handleVersusDecision('B'));

// Sell/Hold continue
if (DOM.sellHoldContinueButton) DOM.sellHoldContinueButton.addEventListener('click', continueToNextRound);
// Sell/Hold buttons
if (DOM.sellButton) DOM.sellButton.addEventListener('click', () => handleSellHoldDecision('sell'));
if (DOM.holdButton) DOM.holdButton.addEventListener('click', () => handleSellHoldDecision('hold'));

DOM.submitReasoningButton.addEventListener('click', () => {
    const company = GameState.gameRounds[GameState.currentRound]?.data;
    if (company && GameState.lastDecision) evaluateReasoning(company, GameState.lastDecision);
});

DOM.companyHintButton.addEventListener('click', handleHintPurchase);
DOM.specialHintButton.addEventListener('click', handleHintPurchase);
DOM.unlockProjectionsButton.addEventListener('click', handleUnlockProjections);
DOM.restartButton.addEventListener('click', initGame);

const openShopButton = document.getElementById('open-shop-button');
if (openShopButton) openShopButton.addEventListener('click', () => { if (window.BuffettShopUI) BuffettShopUI.open(); });

const menuShopButton = document.getElementById('menu-shop-button');
if (menuShopButton) menuShopButton.addEventListener('click', () => { if (window.BuffettShopUI) BuffettShopUI.open(); });

const menuMasteryButton = document.getElementById('menu-mastery-button');
if (menuMasteryButton) menuMasteryButton.addEventListener('click', () => { if (window.BuffettMastery) BuffettMastery.showMasteryDashboard(); });

function updateMenuPointsDisplay() {
    const pointsEl = document.getElementById('menu-points-value');
    if (pointsEl && window.BuffettShop) pointsEl.textContent = BuffettShop.logic.getPoints().toLocaleString();
}
window.addEventListener('buffettShopEquipmentChanged', updateMenuPointsDisplay);

DOM.glossaryButton.addEventListener('click', openGlossary);
DOM.glossaryClose.addEventListener('click', closeGlossary);
DOM.glossaryOverlay.addEventListener('click', (e) => { if (e.target === DOM.glossaryOverlay) closeGlossary(); });

DOM.modalOkButton.addEventListener('click', closeModal);
DOM.modalCancelButton.addEventListener('click', closeModal);
DOM.modalConfirmButton.addEventListener('click', () => { if (typeof currentConfirmCallback === 'function') currentConfirmCallback(); closeModal(); });
DOM.modalOverlay.addEventListener('click', (e) => { if (e.target === DOM.modalOverlay) closeModal(); });

// ─────────────────────────────────────────────────────────────────────────────
// INITIALIZATION
// ─────────────────────────────────────────────────────────────────────────────
window.addEventListener('load', () => {
    if (!window.BuffettGame?.contentLoaded) {
        console.warn('Game content may not be fully loaded.');
    }
    if (window.BuffettShop) { BuffettShop.applyEquipped(); }
    if (window.BuffettOffice) { BuffettOffice.init(); }
    if (window.BuffettMascot) { BuffettMascot.init(); }
    updateMenuPointsDisplay();
    initGame();
});
