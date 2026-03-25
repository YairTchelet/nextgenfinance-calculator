/* === achievements-system.js ===
 * System 1: Mastery & Belt Progression (1A–1D)
 * System 2: Achievements & Shop Integration (2A–2D)
 * RTL Hebrew, Vanilla JS
 */

// ─────────────────────────────────────────────────────────────────────────────
// MASTERY SYSTEM  (System 1)
// ─────────────────────────────────────────────────────────────────────────────
window.BuffettMastery = (function () {
    'use strict';

    const STORAGE_KEY = 'buffett_mastery';
    const ACHIEVEMENTS_KEY = 'buffett_achievements';

    // ── Belt definitions (System 1B) ──────────────────────────────────────────
    const BELT_DEFS = [
        { id: 'white',  name: 'חגורה לבנה',  color: '#e0e0e0', textColor: '#333333', emoji: '⬜', minCorrect: 0,   minPrinciples: 0  },
        { id: 'yellow', name: 'חגורה צהובה', color: '#f6e05e', textColor: '#744210', emoji: '🟨', minCorrect: 5,   minPrinciples: 2  },
        { id: 'orange', name: 'חגורה כתומה', color: '#f6ad55', textColor: '#7b341e', emoji: '🟧', minCorrect: 15,  minPrinciples: 4  },
        { id: 'green',  name: 'חגורה ירוקה', color: '#68d391', textColor: '#1c4532', emoji: '🟩', minCorrect: 30,  minPrinciples: 6  },
        { id: 'blue',   name: 'חגורה כחולה', color: '#63b3ed', textColor: '#1a365d', emoji: '🟦', minCorrect: 50,  minPrinciples: 8  },
        { id: 'brown',  name: 'חגורה חומה',  color: '#c05621', textColor: '#fff5e6', emoji: '🟫', minCorrect: 75,  minPrinciples: 10 },
        { id: 'black',  name: 'חגורה שחורה', color: '#1a1a2e', textColor: '#f6e05e', emoji: '⬛', minCorrect: 100, minPrinciples: 12 }
    ];

    // ── Principle definitions ─────────────────────────────────────────────────
    const PRINCIPLE_DEFS = [
        { id: 'moat',             name: 'יתרון תחרותי',      icon: '🏰' },
        { id: 'management',       name: 'איכות הנהלה',       icon: '👔' },
        { id: 'fcf',              name: 'תזרים חופשי',       icon: '💵' },
        { id: 'margin_of_safety', name: 'מרווח ביטחון',      icon: '🛡️' },
        { id: 'growth',           name: 'צמיחה',             icon: '📈' },
        { id: 'valuation',        name: 'הערכת שווי',        icon: '⚖️' },
        { id: 'long_term',        name: 'טווח ארוך',         icon: '🔭' },
        { id: 'competitive',      name: 'ניתוח תחרות',       icon: '🎯' },
        { id: 'financials',       name: 'ניתוח כספי',        icon: '📊' },
        { id: 'risk',             name: 'ניהול סיכונים',     icon: '⚠️' },
        { id: 'psychology',       name: 'פסיכולוגיה',        icon: '🧠' },
        { id: 'capital',          name: 'הקצאת הון',         icon: '🔄' }
    ];

    // ── Principle ID aliases (normalise game data IDs to canonical IDs) ────────
    const ALIASES = {
        moat: 'moat', competitive_advantage: 'moat',
        management: 'management', quality: 'management',
        fcf: 'fcf', free_cash_flow: 'fcf', cash_flow: 'fcf',
        margin_of_safety: 'margin_of_safety', margin: 'margin_of_safety',
        growth: 'growth', sustainable_growth: 'growth',
        valuation: 'valuation', value: 'valuation',
        long_term: 'long_term', patience: 'long_term',
        competitive: 'competitive',
        financials: 'financials', financial_analysis: 'financials',
        risk: 'risk', risk_management: 'risk',
        psychology: 'psychology', behavioral: 'psychology',
        capital: 'capital', capital_allocation: 'capital'
    };

    function normalizePrincipleId(id) {
        if (!id) return null;
        const lc = String(id).toLowerCase().replace(/-/g, '_');
        return ALIASES[lc] || null;
    }

    // ── Storage ───────────────────────────────────────────────────────────────
    // Map affinity IDs (from principle-selection) → mastery IDs
    const _AFFINITY_TO_MASTERY = {
        'moat': 'moat', 'owner-earnings': 'fcf', 'value-trap': 'valuation',
        'margin-of-safety': 'margin_of_safety', 'growth-trap': 'growth',
        'circle-of-competence': 'long_term', 'too-hard': 'long_term',
        'leverage-risk': 'risk', 'cyclical-trap': 'risk', 'turnaround': 'management',
        'dividend-sustainability': 'fcf', 'management-quality': 'management',
        'sunk-cost': 'psychology', 'loss-aversion': 'psychology',
        'disposition-effect': 'psychology'
    };

    function getDefaultMastery() {
        const principles = {};
        PRINCIPLE_DEFS.forEach(p => {
            principles[p.id] = { attempts: 0, correct: 0, streak: 0, bestStreak: 0, lastSeen: null,
                identifyAttempts: 0, identifyCorrect: 0 };
        });
        return {
            principles,
            overall: {
                totalGames: 0, totalCorrect: 0, totalAttempts: 0,
                currentBelt: 'white', beltProgress: 0,
                versusCorrect: 0, sellHoldCorrect: 0,
                playedDifficulties: [], playDates: [], glossaryOpened: 0
            },
            history: []
        };
    }

    function loadMastery() {
        try {
            const raw = localStorage.getItem(STORAGE_KEY);
            if (!raw) return getDefaultMastery();
            const data = JSON.parse(raw);
            const def = getDefaultMastery();
            // Merge — ensure all principle keys and overall keys exist
            data.principles = Object.assign({}, def.principles, data.principles || {});
            data.overall = Object.assign({}, def.overall, data.overall || {});
            if (!Array.isArray(data.history)) data.history = [];
            // Back-compat: ensure identifyAttempts / identifyCorrect on existing principle objects
            PRINCIPLE_DEFS.forEach(p => {
                if (!data.principles[p.id]) data.principles[p.id] = def.principles[p.id];
                else {
                    if (data.principles[p.id].identifyAttempts === undefined) data.principles[p.id].identifyAttempts = 0;
                    if (data.principles[p.id].identifyCorrect  === undefined) data.principles[p.id].identifyCorrect  = 0;
                }
            });
            return data;
        } catch (e) { return getDefaultMastery(); }
    }

    function saveMastery(data) {
        try { localStorage.setItem(STORAGE_KEY, JSON.stringify(data)); } catch (e) { }
    }

    // ── Achievements storage ──────────────────────────────────────────────────
    function loadAchievements() {
        try {
            const raw = localStorage.getItem(ACHIEVEMENTS_KEY);
            return raw ? JSON.parse(raw) : { unlocked: [], progress: {} };
        } catch (e) { return { unlocked: [], progress: {} }; }
    }

    function saveAchievements(data) {
        try { localStorage.setItem(ACHIEVEMENTS_KEY, JSON.stringify(data)); } catch (e) { }
    }

    // ── Belt helpers ──────────────────────────────────────────────────────────
    function getBeltById(id) {
        return BELT_DEFS.find(b => b.id === id) || BELT_DEFS[0];
    }

    function computeBelt(mastery) {
        const totalCorrect = mastery.overall.totalCorrect || 0;
        const principlesTried = Object.values(mastery.principles).filter(p => p.attempts > 0).length;
        let belt = BELT_DEFS[0];
        for (const b of BELT_DEFS) {
            if (totalCorrect >= b.minCorrect && principlesTried >= b.minPrinciples) belt = b;
        }
        // Blue+ requires course access
        const courseRequired = ['blue', 'brown', 'black'];
        if (courseRequired.includes(belt.id) && window.BuffettAccess && !BuffettAccess.canPlay('hard')) {
            belt = BELT_DEFS.find(b => b.id === 'green') || belt;
        }
        return belt;
    }

    function _computeRawBelt(mastery) {
        const totalCorrect = mastery.overall.totalCorrect || 0;
        const principlesTried = Object.values(mastery.principles).filter(p => p.attempts > 0).length;
        let belt = BELT_DEFS[0];
        for (const b of BELT_DEFS) {
            if (totalCorrect >= b.minCorrect && principlesTried >= b.minPrinciples) belt = b;
        }
        return belt;
    }

    function computeBeltProgress(mastery, currentBelt) {
        const idx = BELT_DEFS.findIndex(b => b.id === currentBelt.id);
        const next = BELT_DEFS[idx + 1];
        if (!next) return { pct: 100, missingCorrect: 0, missingPrinciples: 0, nextBelt: null };
        const totalCorrect = mastery.overall.totalCorrect || 0;
        const principlesTried = Object.values(mastery.principles).filter(p => p.attempts > 0).length;
        const missingCorrect = Math.max(0, next.minCorrect - totalCorrect);
        const missingPrinciples = Math.max(0, next.minPrinciples - principlesTried);
        const span = next.minCorrect - currentBelt.minCorrect;
        const done = totalCorrect - currentBelt.minCorrect;
        const pct = span > 0 ? Math.min(100, Math.max(0, Math.round((done / span) * 100))) : 100;
        return { pct, missingCorrect, missingPrinciples, nextBelt: next };
    }

    // ── Record single round result (System 1A) ────────────────────────────────
    function recordRound(principleId, isCorrect) {
        const mastery = loadMastery();
        const pid = normalizePrincipleId(principleId);
        if (pid && mastery.principles[pid]) {
            const p = mastery.principles[pid];
            p.attempts++;
            p.lastSeen = Date.now();
            if (isCorrect) { p.correct++; p.streak++; p.bestStreak = Math.max(p.bestStreak, p.streak); }
            else p.streak = 0;
        }
        mastery.overall.totalAttempts++;
        if (isCorrect) mastery.overall.totalCorrect++;
        saveMastery(mastery);
        return mastery;
    }

    // ── Called by game-engine at game end ─────────────────────────────────────
    function onGameEnd(gameData) {
        const mastery = loadMastery();

        // Track play date
        const today = new Date().toDateString();
        if (!mastery.overall.playDates.includes(today)) {
            mastery.overall.playDates.push(today);
            if (mastery.overall.playDates.length > 60) mastery.overall.playDates.shift();
        }

        // Track difficulties
        if (!mastery.overall.playedDifficulties.includes(gameData.difficulty)) {
            mastery.overall.playedDifficulties.push(gameData.difficulty);
        }

        // Accumulate round-type stats
        mastery.overall.versusCorrect  += (gameData.versusCorrect  || 0);
        mastery.overall.sellHoldCorrect += (gameData.sellHoldCorrect || 0);

        mastery.overall.totalGames++;

        // Add to history (before checking comeback)
        mastery.history.unshift({
            date: Date.now(),
            difficulty: gameData.difficulty,
            correct: gameData.correct,
            total: gameData.total,
            score: gameData.score
        });
        if (mastery.history.length > 20) mastery.history.pop();

        // Belt check
        const oldBelt = getBeltById(mastery.overall.currentBelt);
        const newBelt = computeBelt(mastery);
        mastery.overall.currentBelt = newBelt.id;
        mastery.overall.beltProgress = computeBeltProgress(mastery, newBelt).pct;

        saveMastery(mastery);

        // Belt celebration if upgraded
        if (newBelt.id !== oldBelt.id) {
            setTimeout(() => showBeltCelebration(oldBelt, newBelt), 1600);
        }

        // Async Supabase sync
        _syncToSupabase(mastery);

        return mastery;
    }

    // ── Supabase sync (fire and forget) ──────────────────────────────────────
    async function _syncToSupabase(mastery) {
        try {
            if (!window.supabase || !window.SUPABASE_URL || !window.SUPABASE_ANON_KEY) return;
            const client = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
            const { data: { user } } = await client.auth.getUser();
            if (!user) return;
            await client.from('user_progress').upsert({
                user_id: user.id,
                mastery_data: mastery,
                achievements: loadAchievements(),
                updated_at: new Date().toISOString()
            }, { onConflict: 'user_id' });
        } catch (e) { /* offline / table not created yet — silent fail */ }
    }

    // ── Belt celebration modal (System 1B) ───────────────────────────────────
    function showBeltCelebration(oldBelt, newBelt) {
        const el = document.createElement('div');
        el.className = 'belt-celebration-overlay';
        el.innerHTML = `
            <div class="belt-celebration-card">
                <div class="belt-celebrate-confetti">🎉🎊🎉</div>
                <div class="belt-celebrate-title">עלית רמה!</div>
                <div class="belt-celebrate-row">
                    <div class="belt-chip" style="background:${oldBelt.color};color:${oldBelt.textColor}">${oldBelt.emoji} ${oldBelt.name}</div>
                    <div class="belt-celebrate-arrow">→</div>
                    <div class="belt-chip new-belt" style="background:${newBelt.color};color:${newBelt.textColor}">${newBelt.emoji} ${newBelt.name}</div>
                </div>
                <div class="belt-celebrate-msg">כל הכבוד! המשך להתאמן כדי להגיע לרמות גבוהות עוד יותר</div>
                <button class="belt-celebrate-close">✓ קדימה!</button>
            </div>`;
        document.body.appendChild(el);
        setTimeout(() => el.classList.add('show'), 30);
        el.querySelector('.belt-celebrate-close').addEventListener('click', () => {
            el.classList.remove('show');
            setTimeout(() => el.remove(), 350);
        });
    }

    // ── Adaptive company weighting (System 1D) ───────────────────────────────
    function getCompanyWeight(company) {
        const mastery = loadMastery();
        const pid = normalizePrincipleId(company?.feedback?.principle?.id);
        if (!pid || !mastery.principles[pid]) return 2;
        const p = mastery.principles[pid];
        if (p.attempts < 5) return 2;
        const rate = p.correct / p.attempts;
        if (rate < 0.50) return 3;
        if (rate < 0.65) return 2;
        return 1;
    }

    function weightedShuffle(arr, weightFn) {
        if (!arr || arr.length === 0) return [];
        const weighted = [];
        arr.forEach(item => {
            const w = weightFn(item);
            for (let i = 0; i < w; i++) weighted.push(item);
        });
        for (let i = weighted.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [weighted[i], weighted[j]] = [weighted[j], weighted[i]];
        }
        const seen = new Set();
        return weighted.filter(item => {
            const key = item.id || item.name;
            if (seen.has(key)) return false;
            seen.add(key); return true;
        });
    }

    // ── Mastery Dashboard (System 1C) ─────────────────────────────────────────
    let _dashEl = null;

    function showMasteryDashboard() {
        // Always rebuild to reflect latest data
        if (_dashEl) _dashEl.remove();
        _dashEl = document.createElement('div');
        _dashEl.className = 'mastery-dashboard-overlay';
        _dashEl.innerHTML = _buildDashboardHTML();
        document.body.appendChild(_dashEl);
        setTimeout(() => _dashEl.classList.add('show'), 20);
        _dashEl.querySelector('.mastery-close-btn').addEventListener('click', hideMasteryDashboard);
        _dashEl.addEventListener('click', e => { if (e.target === _dashEl) hideMasteryDashboard(); });

        // SVG tree click listener
        const svgEl = _dashEl.querySelector('.ach-tree-svg');
        if (svgEl) {
            svgEl.addEventListener('click', function(e) {
                const hitTarget = e.target.closest('.tree-hit-target');
                const popover = _dashEl.querySelector('#ach-tree-popover');
                if (!hitTarget) {
                    if (popover) popover.style.display = 'none';
                    return;
                }
                const achId = hitTarget.getAttribute('data-ach');
                const achDefs = window.BuffettAchievements?.ACHIEVEMENT_DEFS || [];
                const ach = achDefs.find(a => a.id === achId);
                if (!ach || !popover) return;
                const achievements = loadAchievements();
                const earned = (achievements.unlocked || []).includes(achId);
                popover.innerHTML = `
                    <div class="ach-pop-icon">${ach.icon}</div>
                    <div class="ach-pop-name">${ach.name}</div>
                    <div class="ach-pop-desc">${ach.description}</div>
                    <span class="ach-pop-status ${earned ? 'earned' : 'locked'}">${earned ? '✓ הושג' : '🔒 נעול'}</span>
                `;
                // Position popover relative to .ach-tree-wrap
                const wrapEl = _dashEl.querySelector('.ach-tree-wrap');
                const svgRect = svgEl.getBoundingClientRect();
                const wrapRect = wrapEl.getBoundingClientRect();
                const scaleX = svgRect.width / 580;
                const scaleY = svgRect.height / 520;
                const domX = parseFloat(hitTarget.getAttribute('cx')) * scaleX + (svgRect.left - wrapRect.left);
                const domY = parseFloat(hitTarget.getAttribute('cy')) * scaleY + (svgRect.top - wrapRect.top);
                popover.style.left = Math.max(0, Math.min(domX - 85, wrapRect.width - 200)) + 'px';
                popover.style.top = Math.max(0, domY - 130) + 'px';
                popover.style.display = 'block';
            });
        }
    }

    function hideMasteryDashboard() {
        if (!_dashEl) return;
        _dashEl.classList.remove('show');
        setTimeout(() => { if (_dashEl) { _dashEl.remove(); _dashEl = null; } }, 350);
    }

    function _buildAchievementTree(achData) {
        const achDefs = window.BuffettAchievements?.ACHIEVEMENT_DEFS || [];
        const unlocked = achData.unlocked || [];
        const earnedCount = unlocked.length;
        const totalCount = achDefs.length;
        const pct = totalCount > 0 ? Math.round(earnedCount / totalCount * 100) : 0;

        const PATHS = [
            { name: 'שומר החפיר',  color: '#2a9d8f', angle: 90,  nodes: ['first_steps','moat_master','fcf_expert','value_hunter','all_principles'], spacing: 45 },
            { name: 'בלש הרווחים', color: '#f6c23e', angle: 18,  nodes: ['vs_champion','sell_hold_pro','principle_spotter','principle_streak_5','glossary_master'], spacing: 45 },
            { name: 'אש על המגרש', color: '#e76f51', angle: 306, nodes: ['hot_streak','perfect_game','combo_king','speed_demon','hint_avoider'], spacing: 45 },
            { name: 'מטפס הדרגות', color: '#3498db', angle: 234, nodes: ['orange_belt','green_belt','black_belt','hundred_rounds','multi_difficulty'], spacing: 45 },
            { name: 'המתמיד',       color: '#9b59b6', angle: 162, nodes: ['daily_player','ten_games','comeback_kid','marathon','expert_debut','night_owl','early_bird'], spacing: 37 }
        ];

        const cx = 290, cy = 310;
        let svgContent = '';

        // Draw lines first (behind nodes)
        PATHS.forEach(path => {
            const rad = path.angle * Math.PI / 180;
            const dx = Math.cos(rad), dy = -Math.sin(rad);
            let prevX = cx, prevY = cy;
            path.nodes.forEach((achId, i) => {
                const nx = Math.round(cx + dx * path.spacing * (i + 1));
                const ny = Math.round(cy + dy * path.spacing * (i + 1));
                const prevEarned = i === 0 ? true : unlocked.includes(path.nodes[i - 1]);
                const thisEarned = unlocked.includes(achId);
                const isAvailable = prevEarned && !thisEarned;
                const isConnEarned = (i === 0 ? true : unlocked.includes(path.nodes[i - 1])) && thisEarned;

                let lineOpacity, lineDash;
                if (isConnEarned) { lineOpacity = '0.9'; lineDash = ''; }
                else if (isAvailable) { lineOpacity = '0.45'; lineDash = 'stroke-dasharray="4 3"'; }
                else if (prevEarned && !thisEarned) { lineOpacity = '0.45'; lineDash = 'stroke-dasharray="4 3"'; }
                else { lineOpacity = '0.15'; lineDash = 'stroke-dasharray="4 3"'; }

                svgContent += `<line x1="${prevX}" y1="${prevY}" x2="${nx}" y2="${ny}" stroke="${path.color}" stroke-width="2" opacity="${lineOpacity}" ${lineDash}/>`;
                prevX = nx; prevY = ny;
            });
        });

        // Draw center node
        svgContent += `<circle cx="${cx}" cy="${cy}" r="26" fill="#1a2e38" stroke="#4a9d8f" stroke-width="2.5"/>`;
        svgContent += `<text x="${cx}" y="${cy}" text-anchor="middle" dominant-baseline="central" font-size="18">⭐</text>`;

        // Draw path nodes
        PATHS.forEach(path => {
            const rad = path.angle * Math.PI / 180;
            const dx = Math.cos(rad), dy = -Math.sin(rad);
            const NR = 19;

            path.nodes.forEach((achId, i) => {
                const nx = Math.round(cx + dx * path.spacing * (i + 1));
                const ny = Math.round(cy + dy * path.spacing * (i + 1));
                const thisEarned = unlocked.includes(achId);
                const prevEarned = i === 0 ? true : unlocked.includes(path.nodes[i - 1]);
                const isAvailable = prevEarned && !thisEarned;
                const ach = achDefs.find(a => a.id === achId);
                const icon = ach ? ach.icon : '?';

                let circleFill, circleStroke, circleFilter, pulseClass;
                if (thisEarned) {
                    circleFill = path.color;
                    circleStroke = '';
                    circleFilter = `filter="url(#glow-${path.color.replace('#','')})"`;
                    pulseClass = '';
                } else if (isAvailable) {
                    circleFill = 'rgba(255,255,255,0.06)';
                    circleStroke = `stroke="${path.color}" stroke-width="2.5"`;
                    circleFilter = '';
                    pulseClass = 'class="ach-node-pulse"';
                } else {
                    circleFill = 'rgba(255,255,255,0.03)';
                    circleStroke = 'stroke="rgba(255,255,255,0.12)" stroke-width="1.5"';
                    circleFilter = '';
                    pulseClass = '';
                }

                const displayIcon = (thisEarned || isAvailable) ? icon : '🔒';
                const iconSize = (thisEarned || isAvailable) ? 14 : 11;

                svgContent += `<circle cx="${nx}" cy="${ny}" r="${NR}" fill="${circleFill}" ${circleStroke} ${circleFilter} ${pulseClass}/>`;
                svgContent += `<text x="${nx}" y="${ny}" text-anchor="middle" dominant-baseline="central" font-size="${iconSize}">${displayIcon}</text>`;
            });

            // Path label (reuse rad/dx/dy already computed above)
            const nc = path.nodes.length;
            const labelX = Math.round(cx + dx * (path.spacing * nc + 26));
            const labelY = Math.round(cy + dy * (path.spacing * nc + 26));
            svgContent += `<text x="${labelX}" y="${labelY}" text-anchor="middle" dominant-baseline="central" font-size="10" fill="${path.color}" font-weight="700" font-family="Heebo,sans-serif">${path.name}</text>`;
        });

        // Hit targets (on top, after all visual elements)
        PATHS.forEach(path => {
            const rad = path.angle * Math.PI / 180;
            const dx = Math.cos(rad), dy = -Math.sin(rad);
            path.nodes.forEach((achId, i) => {
                const nx = Math.round(cx + dx * path.spacing * (i + 1));
                const ny = Math.round(cy + dy * path.spacing * (i + 1));
                svgContent += `<circle fill="transparent" r="25" cx="${nx}" cy="${ny}" data-ach="${achId}" class="tree-hit-target" style="cursor:pointer"/>`;
            });
        });

        // Glow filters
        const glowColors = [...new Set(PATHS.map(p => p.color))];
        const defs = `<defs>${glowColors.map(c => `<filter id="glow-${c.replace('#','')}" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="3" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>`).join('')}</defs>`;

        return `
            <div class="ach-tree-counter">
                🏆 ${earnedCount}/${totalCount} הישגים
                <div class="ach-tree-bar"><div class="ach-tree-bar-fill" style="width:${pct}%"></div></div>
            </div>
            <div class="ach-tree-wrap">
                <svg class="ach-tree-svg" viewBox="0 0 580 520" style="width:100%;display:block;" xmlns="http://www.w3.org/2000/svg">
                    ${defs}
                    ${svgContent}
                </svg>
                <div id="ach-tree-popover" class="ach-tree-popover" style="display:none;"></div>
            </div>
        `;
    }

    function _buildDashboardHTML() {
        const mastery = loadMastery();
        const currentBelt = getBeltById(mastery.overall.currentBelt);
        const progress = computeBeltProgress(mastery, currentBelt);
        const achievements = loadAchievements();

        // Principle cards grid
        const principleCards = PRINCIPLE_DEFS.map(p => {
            const stats = mastery.principles[p.id] || { attempts: 0, correct: 0 };
            const rate = stats.attempts > 0 ? stats.correct / stats.attempts : -1;
            let colorClass = 'principle-gray';
            if (rate >= 0.70) colorClass = 'principle-green';
            else if (rate >= 0.40) colorClass = 'principle-yellow';
            else if (rate >= 0)    colorClass = 'principle-red';
            const pct = rate >= 0 ? Math.round(rate * 100) : 0;
            const dash = Math.round(pct * 100 / 100); // 0–100
            return `
                <div class="principle-card ${colorClass}">
                    <div class="principle-icon">${p.icon}</div>
                    <div class="principle-ring">
                        <svg viewBox="0 0 36 36" class="principle-ring-svg">
                            <circle cx="18" cy="18" r="15.9" fill="none" stroke="rgba(0,0,0,0.12)" stroke-width="3.2"/>
                            <circle cx="18" cy="18" r="15.9" fill="none" stroke="currentColor" stroke-width="3.2"
                                stroke-dasharray="${dash} 100" stroke-linecap="round"
                                transform="rotate(-90 18 18)" class="principle-ring-fill"/>
                        </svg>
                        <span class="principle-pct">${stats.attempts > 0 ? pct + '%' : '—'}</span>
                    </div>
                    <div class="principle-name">${p.name}</div>
                    <div class="principle-attempts">${stats.attempts > 0 ? stats.attempts + ' ניסיונות' : 'טרם'}</div>
                    ${stats.identifyAttempts > 0
                        ? `<div class="principle-identify">זיהוי: ${Math.round(stats.identifyCorrect / stats.identifyAttempts * 100)}%</div>`
                        : ''}
                </div>`;
        }).join('');

        // Weak area callout
        const withAttempts = PRINCIPLE_DEFS
            .map(p => ({ ...p, stats: mastery.principles[p.id] || { attempts: 0, correct: 0 } }))
            .filter(p => p.stats.attempts >= 3)
            .sort((a, b) => (a.stats.correct / a.stats.attempts) - (b.stats.correct / b.stats.attempts));
        const weakest = withAttempts[0];
        const weakCallout = weakest
            ? `<div class="mastery-weak-callout">⚡ אזור לשיפור: <strong>${weakest.name}</strong> — ${Math.round(weakest.stats.correct / weakest.stats.attempts * 100)}% הצלחה</div>`
            : '';

        // Course-access callout: show if player is being capped at green
        const rawBelt = _computeRawBelt(mastery);
        const courseRequired = ['blue', 'brown', 'black'];
        const isCapped = courseRequired.includes(rawBelt.id) && window.BuffettAccess && !BuffettAccess.canPlay('hard');
        const courseCallout = isCapped
            ? `<div class="mastery-course-callout">🔒 אתה ברמת <strong>${rawBelt.name}</strong> — <a href="/investor-academy/" class="mastery-course-link">הצטרף לקורס</a> כדי לפתוח חגורות גבוהות יותר</div>`
            : '';

        // Progress text
        let progressText = '';
        if (progress.nextBelt) {
            const parts = [];
            if (progress.missingCorrect > 0)    parts.push(`עוד ${progress.missingCorrect} נכונות`);
            if (progress.missingPrinciples > 0) parts.push(`עוד ${progress.missingPrinciples} עקרונות חדשים`);
            progressText = parts.length ? `ל-${progress.nextBelt.name}: ${parts.join(' + ')}` : 'מוכן לחגורה הבאה!';
        } else {
            progressText = '🏆 הגעת לרמה הגבוהה ביותר!';
        }

        // Achievement skill tree
        const treeHTML = _buildAchievementTree(achievements);
        const principlesTried = Object.values(mastery.principles).filter(p => p.attempts > 0).length;

        return `
            <div class="mastery-dashboard-card">
                <button class="mastery-close-btn" aria-label="סגור">✕</button>
                <div class="mastery-dashboard-title">📊 מסלול ההתקדמות</div>

                <div class="mastery-belt-display" style="background:${currentBelt.color};color:${currentBelt.textColor}">
                    <span class="mastery-belt-emoji">${currentBelt.emoji}</span>
                    <div class="mastery-belt-info">
                        <div class="mastery-belt-name">${currentBelt.name}</div>
                        <div class="mastery-belt-stats">${mastery.overall.totalCorrect} נכונות · ${mastery.overall.totalGames} משחקים</div>
                    </div>
                </div>

                ${progress.nextBelt ? `
                <div class="mastery-progress-section">
                    <div class="mastery-progress-bar-wrap">
                        <div class="mastery-progress-bar" style="width:${progress.pct}%"></div>
                    </div>
                    <div class="mastery-progress-text">${progressText}</div>
                </div>` : `<div class="mastery-progress-text">${progressText}</div>`}

                ${weakCallout}
                ${courseCallout}

                <div class="mastery-section-title">עקרונות (${principlesTried}/12)</div>
                <div class="principles-grid">${principleCards}</div>

                ${treeHTML}
            </div>`;
    }

    // ── Record principle identification (called from principle-selection UI) ─
    function recordPrincipleIdentification(affinityId, isCorrect) {
        const masteryId = _AFFINITY_TO_MASTERY[affinityId];
        if (!masteryId) return;
        const mastery = loadMastery();
        if (!mastery.principles[masteryId]) return;
        mastery.principles[masteryId].identifyAttempts++;
        if (isCorrect) mastery.principles[masteryId].identifyCorrect++;
        saveMastery(mastery);
    }

    // ── Public API ────────────────────────────────────────────────────────────
    return {
        BELT_DEFS, PRINCIPLE_DEFS,
        loadMastery, saveMastery,
        loadAchievements, saveAchievements,
        getBeltById, computeBelt, computeBeltProgress,
        recordRound, normalizePrincipleId,
        recordPrincipleIdentification,
        onGameEnd, getCompanyWeight, weightedShuffle,
        showMasteryDashboard, hideMasteryDashboard,
        showBeltCelebration
    };
})();


// ─────────────────────────────────────────────────────────────────────────────
// ACHIEVEMENTS SYSTEM  (System 2)
// ─────────────────────────────────────────────────────────────────────────────
window.BuffettAchievements = (function () {
    'use strict';

    // ── Achievement definitions (System 2A) ──────────────────────────────────
    // check(gameData, mastery) → boolean
    const ACHIEVEMENT_DEFS = [
        // Category 1 — Principle Mastery
        { id: 'first_steps',    category: 'mastery',     icon: '🌱', name: 'צעד ראשון',          description: 'קבל החלטה נכונה ראשונה',
          check: (g, m) => m.overall.totalCorrect >= 1 },
        { id: 'moat_master',    category: 'mastery',     icon: '🏰', name: 'שומר החומה',          description: '5 נכונות על עקרון ה-Moat',
          check: (g, m) => (m.principles.moat?.correct || 0) >= 5 },
        { id: 'fcf_expert',     category: 'mastery',     icon: '💵', name: 'מומחה תזרים',         description: '5 נכונות על FCF',
          check: (g, m) => (m.principles.fcf?.correct || 0) >= 5 },
        { id: 'value_hunter',   category: 'mastery',     icon: '⚖️', name: 'ציד הערך',             description: '5 נכונות על הערכת שווי',
          check: (g, m) => (m.principles.valuation?.correct || 0) >= 5 },
        { id: 'all_principles', category: 'mastery',     icon: '🎓', name: 'אנציקלופדיה',          description: 'התמודד עם כל 12 העקרונות',
          check: (g, m) => Object.values(m.principles).filter(p => p.attempts > 0).length >= 12 },

        // Category 2 — Streak & Performance
        { id: 'hot_streak',     category: 'streak',      icon: '🔥', name: 'רצף לוהט',             description: '5 נכונות ברצף',
          check: (g, m) => (g.maxStreak || 0) >= 5 },
        { id: 'perfect_game',   category: 'streak',      icon: '💯', name: 'משחק מושלם',            description: '10/10 במשחק',
          check: (g, m) => g.correct >= 10 && g.total >= 10 },
        { id: 'combo_king',     category: 'streak',      icon: '⚡', name: 'מלך הקומבו',             description: 'הפעל קומבו x5',
          check: (g, m) => (g.maxCombo || 0) >= 5 },
        { id: 'vs_champion',    category: 'streak',      icon: '⚔️', name: 'אלוף ההשוואות',         description: '5 נכונות בסיבובי השוואה',
          check: (g, m) => (m.overall.versusCorrect || 0) >= 5 },
        { id: 'sell_hold_pro',  category: 'streak',      icon: '💎', name: 'מקצוען התיק',           description: '5 נכונות בסיבובי תיק',
          check: (g, m) => (m.overall.sellHoldCorrect || 0) >= 5 },

        // Category 3 — Learning & Growth
        { id: 'orange_belt',    category: 'growth',      icon: '🟧', name: 'חגורה כתומה',          description: 'הגע לחגורה כתומה',
          check: (g, m) => ['orange','green','blue','brown','black'].includes(m.overall.currentBelt) },
        { id: 'green_belt',     category: 'growth',      icon: '🟩', name: 'חגורה ירוקה',          description: 'הגע לחגורה ירוקה',
          check: (g, m) => ['green','blue','brown','black'].includes(m.overall.currentBelt) },
        { id: 'black_belt',     category: 'growth',      icon: '⬛', name: 'חגורה שחורה',          description: 'הגע לחגורה השחורה',
          check: (g, m) => m.overall.currentBelt === 'black' },
        { id: 'hundred_rounds', category: 'growth',      icon: '💯', name: '100 סיבובים',          description: 'השלם 100 סיבובים',
          check: (g, m) => m.overall.totalAttempts >= 100 },
        { id: 'multi_difficulty',category: 'growth',     icon: '🏔️', name: 'כל הרמות',             description: 'שחק בשלוש רמות קושי',
          check: (g, m) => (m.overall.playedDifficulties || []).length >= 3 },

        // Category 4 — Persistence
        { id: 'daily_player',   category: 'persistence', icon: '📅', name: 'שחקן יומי',            description: 'שחק 3 ימים שונים',
          check: (g, m) => (m.overall.playDates || []).length >= 3 },
        { id: 'ten_games',      category: 'persistence', icon: '🎮', name: 'ותיק',                  description: 'השלם 10 משחקים',
          check: (g, m) => m.overall.totalGames >= 10 },
        { id: 'comeback_kid',   category: 'persistence', icon: '💪', name: 'החזרה הגדולה',          description: 'ניצח אחרי משחק עם פחות מ-40%',
          check: (g, m) => !!(g.previousLow && g.correct >= 7) },
        { id: 'marathon',       category: 'persistence', icon: '🏃', name: 'מרתון',                 description: 'השלם 50 משחקים',
          check: (g, m) => m.overall.totalGames >= 50 },
        { id: 'hint_avoider',   category: 'persistence', icon: '🧩', name: 'ללא רמזים',             description: 'השלם משחק מבלי לקנות רמז',
          check: (g, m) => g.total >= 10 && !g.hintUsed },

        // Category 6 — Principle Identification
        { id: 'principle_spotter',  category: 'identify', icon: '🎯', name: 'מזהה עקרונות',
          description: 'זהה נכון 20 עקרונות לפני ההחלטה',
          check: (g, m) => Object.values(m.principles).reduce((s, p) => s + (p.identifyCorrect || 0), 0) >= 20 },
        { id: 'principle_streak_5', category: 'identify', icon: '🎪', name: 'זיהוי מושלם',
          description: 'זהה 5 עקרונות ברצף',
          check: (g, m) => (g.maxPrincipleStreak || 0) >= 5 },

        // Category 5 — Bonus
        { id: 'night_owl',      category: 'bonus',       icon: '🦉', name: 'ינשוף לילה',            description: 'שחק אחרי 22:00',
          check: (g, m) => new Date().getHours() >= 22 },
        { id: 'early_bird',     category: 'bonus',       icon: '🌅', name: 'ציפור השחר',            description: 'שחק לפני 07:00',
          check: (g, m) => new Date().getHours() < 7 },
        { id: 'expert_debut',   category: 'bonus',       icon: '🎯', name: 'ניסיון ראשון במומחה',   description: 'שחק ברמת מומחה',
          check: (g, m) => g.difficulty === 'expert' },
        { id: 'speed_demon',    category: 'bonus',       icon: '⚡', name: 'מהיר כברק',             description: 'השלם משחק בפחות מ-5 דקות',
          check: (g, m) => g.total >= 10 && g.durationMs > 0 && g.durationMs < 300000 },
        { id: 'glossary_master',category: 'bonus',       icon: '📖', name: 'בעל ידע',               description: 'פתח את המילון 5 פעמים',
          check: (g, m) => (m.overall.glossaryOpened || 0) >= 5 }
    ];

    // ── Storage ───────────────────────────────────────────────────────────────
    const load = () => BuffettMastery.loadAchievements();
    const save = d  => BuffettMastery.saveAchievements(d);

    function isUnlocked(id) {
        return (load().unlocked || []).includes(id);
    }

    // ── Check all achievements, return newly unlocked (System 2B) ─────────────
    function checkAll(gameData, masteryData) {
        const data = load();
        if (!data.unlocked) data.unlocked = [];
        const newlyUnlocked = [];

        ACHIEVEMENT_DEFS.forEach(def => {
            if (data.unlocked.includes(def.id)) return;
            try {
                if (def.check(gameData, masteryData)) {
                    data.unlocked.push(def.id);
                    newlyUnlocked.push(def);
                }
            } catch (e) { /* silent — bad data guard */ }
        });

        save(data);
        newlyUnlocked.forEach(a => _grantShopItem(a.id));
        return newlyUnlocked;
    }

    // ── Grant achievement-linked shop item for free (System 2D) ───────────────
    function _grantShopItem(achievementId) {
        if (!window.BuffettShop) return;
        try {
            const catalog = window.BuffettShop.items || {};
            Object.keys(catalog).forEach(category => {
                (catalog[category] || []).forEach(item => {
                    if (item.unlockedBy === achievementId && !BuffettShop.logic.isOwned(category, item.id)) {
                        const orig = item.price;
                        item.price = 0;
                        BuffettShop.logic.purchaseItem(category, item.id);
                        item.price = orig;
                    }
                });
            });
        } catch (e) { }
    }

    // ── Toast notification (System 2B) ───────────────────────────────────────
    function showToast(achievement) {
        const toast = document.createElement('div');
        toast.className = 'achievement-toast';
        toast.innerHTML = `
            <div class="achievement-toast-icon">${achievement.icon}</div>
            <div class="achievement-toast-body">
                <div class="achievement-toast-label">🏆 הישג חדש!</div>
                <div class="achievement-toast-name">${achievement.name}</div>
                <div class="achievement-toast-desc">${achievement.description}</div>
            </div>`;
        document.body.appendChild(toast);
        setTimeout(() => toast.classList.add('show'), 40);
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 350);
        }, 4200);
    }

    function showToastsSequentially(list) {
        list.forEach((a, i) => setTimeout(() => showToast(a), i * 900));
    }

    // ── Public API ────────────────────────────────────────────────────────────
    return {
        ACHIEVEMENT_DEFS,
        isUnlocked,
        checkAll,
        showToast,
        showToastsSequentially
    };
})();
