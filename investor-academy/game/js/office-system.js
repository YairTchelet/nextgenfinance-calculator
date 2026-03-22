/* === office-system.js ===
 * Investor Office System
 */


/* === office-system.js === */
/**
 * Buffett Game - Investor Office System
 * המשרד האישי של המשקיע - מסך בית מתפתח
 * 
 * Loaded AFTER shop-system.js, BEFORE game-engine.html
 */

window.BuffettOffice = window.BuffettOffice || {};

// ==============================
// OFFICE LEVELS
// ==============================
BuffettOffice.levels = [
    {
        level: 1,
        name: 'פינת עבודה',
        nameEn: 'Workspace Corner',
        minPoints: 0,
        bg: 'linear-gradient(180deg, #e8e0d4 0%, #d4c8b8 100%)',
        wallColor: '#e8e0d4',
        floorColor: '#8b7355',
        deskEmoji: '🪑',
        windowView: '',
        description: 'התחלה צנועה. כל אחד מתחיל מאיפשהו.'
    },
    {
        level: 2,
        name: 'תא עבודה',
        nameEn: 'Cubicle',
        minPoints: 500,
        bg: 'linear-gradient(180deg, #ddd8cf 0%, #c8bfb0 100%)',
        wallColor: '#d5cfc5',
        floorColor: '#7a6548',
        deskEmoji: '🖥️',
        windowView: '🏢',
        description: 'תא עבודה עם מחשב. ההתחלה של הקריירה.'
    },
    {
        level: 3,
        name: 'משרד',
        nameEn: 'Office',
        minPoints: 2000,
        bg: 'linear-gradient(180deg, #e2ddd4 0%, #c5bba9 100%)',
        wallColor: '#ddd5c8',
        floorColor: '#6b5640',
        deskEmoji: '💼',
        windowView: '🌆',
        description: 'משרד אישי! עם דלת ומפתח.'
    },
    {
        level: 4,
        name: 'משרד פינתי',
        nameEn: 'Corner Office',
        minPoints: 5000,
        bg: 'linear-gradient(180deg, #f0ebe3 0%, #ddd5c5 100%)',
        wallColor: '#ede6dc',
        floorColor: '#5c4a38',
        deskEmoji: '🗄️',
        windowView: '🏙️',
        description: 'משרד פינתי עם נוף לעיר. הגעת רחוק!'
    },
    {
        level: 5,
        name: 'פנטהאוז',
        nameEn: 'Penthouse Suite',
        minPoints: 15000,
        bg: 'linear-gradient(180deg, #f5f0e8 0%, #e8dfd0 100%)',
        wallColor: '#f2ece2',
        floorColor: '#4a3c2e',
        deskEmoji: '🏆',
        windowView: '🌅',
        description: 'הפנטהאוז. מבט על העולם מלמעלה.'
    }
];

// ==============================
// OFFICE DECORATIONS (Shop Items)
// ==============================
BuffettOffice.decorations = [
    // Wall Items
    {
        id: 'deco-diploma',
        name: 'תעודת השקעות',
        description: 'תעודה ממוסגרת על הקיר',
        price: 200,
        rarity: 'common',
        preview: '📜',
        slot: 'wall',
        emoji: '📜',
        position: { area: 'wall-left' }
    },
    {
        id: 'deco-chart-frame',
        name: 'גרף ממוסגר',
        description: 'גרף מניות היסטורי על הקיר',
        price: 300,
        rarity: 'common',
        preview: '📊',
        slot: 'wall',
        emoji: '📊',
        position: { area: 'wall-right' }
    },
    {
        id: 'deco-clock',
        name: 'שעון וול סטריט',
        description: 'שעון עם אזורי זמן של בורסות',
        price: 400,
        rarity: 'rare',
        preview: '🕐',
        slot: 'wall',
        emoji: '🕐',
        position: { area: 'wall-center' }
    },
    {
        id: 'deco-quote-frame',
        name: 'ציטוט באפט',
        description: '"מחיר הוא מה שאתה משלם, ערך הוא מה שאתה מקבל"',
        price: 500,
        rarity: 'rare',
        preview: '🖼️',
        slot: 'wall',
        emoji: '🖼️',
        position: { area: 'wall-left' }
    },
    {
        id: 'deco-bull-painting',
        name: 'ציור השור של וול סטריט',
        description: 'ציור שמן מרשים של השור המפורסם',
        price: 800,
        rarity: 'epic',
        preview: '🎨',
        slot: 'wall',
        emoji: '🐂🎨',
        position: { area: 'wall-center' }
    },
    // Desk Items
    {
        id: 'deco-calculator',
        name: 'מחשבון פיננסי',
        description: 'HP-12C קלאסי על השולחן',
        price: 150,
        rarity: 'common',
        preview: '🧮',
        slot: 'desk',
        emoji: '🧮',
        position: { area: 'desk-left' }
    },
    {
        id: 'deco-coffee',
        name: 'ספל קפה',
        description: 'קפה חם - דלק ההשקעות',
        price: 100,
        rarity: 'common',
        preview: '☕',
        slot: 'desk',
        emoji: '☕',
        position: { area: 'desk-right' }
    },
    {
        id: 'deco-globe',
        name: 'גלובוס',
        description: 'שווקים גלובליים בהישג יד',
        price: 400,
        rarity: 'rare',
        preview: '🌍',
        slot: 'desk',
        emoji: '🌍',
        position: { area: 'desk-center' }
    },
    {
        id: 'deco-newspaper',
        name: 'עיתון פיננסי',
        description: 'Financial Times על השולחן',
        price: 200,
        rarity: 'common',
        preview: '📰',
        slot: 'desk',
        emoji: '📰',
        position: { area: 'desk-left' }
    },
    {
        id: 'deco-gold-pen',
        name: 'עט זהב',
        description: 'עט חתימה מוזהב',
        price: 600,
        rarity: 'epic',
        preview: '✒️',
        slot: 'desk',
        emoji: '✒️',
        position: { area: 'desk-right' }
    },
    // Shelf Items
    {
        id: 'deco-books',
        name: 'ספרי השקעות',
        description: 'The Intelligent Investor ועוד',
        price: 250,
        rarity: 'common',
        preview: '📚',
        slot: 'shelf',
        emoji: '📚',
        position: { area: 'shelf-left' }
    },
    {
        id: 'deco-annual-report',
        name: 'דו"ח שנתי ברקשייר',
        description: 'הדו"ח השנתי של ברקשייר האת\'וויי',
        price: 350,
        rarity: 'rare',
        preview: '📋',
        slot: 'shelf',
        emoji: '📋',
        position: { area: 'shelf-center' }
    },
    {
        id: 'deco-bonsai',
        name: 'בונסאי',
        description: 'עץ שגדל לאט - כמו תשואה מורכבת',
        price: 450,
        rarity: 'rare',
        preview: '🌳',
        slot: 'shelf',
        emoji: '🌳',
        position: { area: 'shelf-right' }
    },
    // Trophies (Special)
    {
        id: 'deco-small-trophy',
        name: 'גביע ברונזה',
        description: 'ההישג הראשון שלך',
        price: 300,
        rarity: 'common',
        preview: '🥉',
        slot: 'trophy',
        emoji: '🥉',
        position: { area: 'shelf-left' }
    },
    {
        id: 'deco-gold-trophy',
        name: 'גביע זהב',
        description: 'ביצועים יוצאי דופן',
        price: 1000,
        rarity: 'epic',
        preview: '🏆',
        slot: 'trophy',
        emoji: '🏆',
        position: { area: 'shelf-center' }
    },
    {
        id: 'deco-diamond-trophy',
        name: 'גביע יהלום',
        description: 'הישג נדיר ומרשים',
        price: 2500,
        rarity: 'legendary',
        preview: '💎🏆',
        slot: 'trophy',
        emoji: '💎',
        position: { area: 'shelf-right' }
    }
];

// ==============================
// OFFICE STATS STORAGE
// ==============================
BuffettOffice.storageKey = 'buffettGameOfficeStats';

BuffettOffice.getStats = function() {
    try {
        const data = localStorage.getItem(this.storageKey);
        if (!data) return this.getDefaultStats();
        return JSON.parse(data);
    } catch(e) {
        return this.getDefaultStats();
    }
};

BuffettOffice.getDefaultStats = function() {
    return {
        gamesPlayed: 0,
        totalCorrect: 0,
        totalRounds: 0,
        bestScore: 0,
        bestPct: 0,
        principlesMastered: [],
        difficultiesCompleted: { easy: 0, medium: 0, hard: 0 }
    };
};

BuffettOffice.saveStats = function(stats) {
    try {
        localStorage.setItem(this.storageKey, JSON.stringify(stats));
    } catch(e) {}
};

BuffettOffice.recordGame = function(difficulty, score, correct, total, principles) {
    const stats = this.getStats();
    stats.gamesPlayed++;
    stats.totalCorrect += correct;
    stats.totalRounds += total;
    if (score > stats.bestScore) stats.bestScore = score;
    const pct = Math.round((correct / total) * 100);
    if (pct > stats.bestPct) stats.bestPct = pct;
    if (difficulty && stats.difficultiesCompleted[difficulty] !== undefined) {
        stats.difficultiesCompleted[difficulty]++;
    }
    // Track unique principles encountered
    if (principles && Array.isArray(principles)) {
        principles.forEach(p => {
            if (p && !stats.principlesMastered.includes(p)) {
                stats.principlesMastered.push(p);
            }
        });
    }
    this.saveStats(stats);
    return stats;
};

BuffettOffice.getLevel = function() {
    try {
        const shopPoints = window.BuffettShop ? (BuffettShop.storage.getData().lifetimePoints || 0) : 0;
        const stats = this.getStats();
        // Combined score: lifetime shop points + games played * 50
        const totalScore = shopPoints + (stats.gamesPlayed * 50);
        let currentLevel = this.levels[0];
        for (let i = this.levels.length - 1; i >= 0; i--) {
            if (totalScore >= this.levels[i].minPoints) {
                currentLevel = this.levels[i];
                break;
            }
        }
        // Next level
        const nextIdx = this.levels.findIndex(l => l.level === currentLevel.level) + 1;
        const nextLevel = nextIdx < this.levels.length ? this.levels[nextIdx] : null;
        return { current: currentLevel, next: nextLevel, totalScore };
    } catch(e) {
        return { current: this.levels[0], next: this.levels[1], totalScore: 0 };
    }
};

// ==============================
// OFFICE RENDERING
// ==============================
BuffettOffice.injectStyles = function() {
    if (document.getElementById('office-styles')) return;
    const style = document.createElement('style');
    style.id = 'office-styles';
    style.textContent = `
        .office-panel {
            margin: 0 auto 20px;
            max-width: 600px;
            border-radius: 16px;
            overflow: hidden;
            box-shadow: 0 4px 20px rgba(0,0,0,0.12);
            border: 1px solid rgba(0,0,0,0.08);
            direction: rtl;
        }
        .office-scene {
            position: relative;
            height: 180px;
            overflow: hidden;
            padding: 0;
        }
        /* Wall */
        .office-wall {
            position: absolute;
            top: 0; left: 0; right: 0;
            height: 65%;
            display: flex;
            justify-content: space-around;
            align-items: center;
            padding: 10px 20px;
        }
        .office-wall-item {
            font-size: 1.8em;
            opacity: 0.9;
            transition: transform 0.2s ease;
        }
        .office-wall-item:hover { transform: scale(1.15); }

        /* Window */
        .office-window {
            position: absolute;
            top: 8px;
            left: 50%;
            transform: translateX(-50%);
            width: 70px;
            height: 55px;
            border: 3px solid #8b7355;
            border-radius: 4px 4px 0 0;
            background: linear-gradient(180deg, #87ceeb 0%, #b0e0e6 100%);
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1.5em;
            box-shadow: inset 0 0 10px rgba(0,0,0,0.1);
        }

        /* Shelf */
        .office-shelf {
            position: absolute;
            top: 50%;
            right: 15px;
            transform: translateY(-50%);
            display: flex;
            gap: 4px;
            background: linear-gradient(180deg, #a0845c, #8b7355);
            padding: 4px 8px;
            border-radius: 3px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.2);
        }
        .office-shelf-item {
            font-size: 1.1em;
            transition: transform 0.2s ease;
        }
        .office-shelf-item:hover { transform: scale(1.2); }

        /* Floor + Desk */
        .office-floor {
            position: absolute;
            bottom: 0; left: 0; right: 0;
            height: 35%;
        }
        .office-desk {
            position: absolute;
            bottom: 5px;
            left: 50%;
            transform: translateX(-50%);
            display: flex;
            gap: 12px;
            align-items: flex-end;
            background: linear-gradient(180deg, #c4a46c, #a8894e);
            padding: 6px 18px 4px;
            border-radius: 6px 6px 0 0;
            min-width: 160px;
            justify-content: center;
            box-shadow: 0 -2px 8px rgba(0,0,0,0.15);
        }
        .office-desk-item {
            font-size: 1.3em;
            transition: transform 0.2s ease;
        }
        .office-desk-item:hover { transform: scale(1.15) translateY(-2px); }

        /* Level badge */
        .office-level-badge {
            position: absolute;
            top: 8px;
            right: 8px;
            background: rgba(0,0,0,0.6);
            color: white;
            padding: 3px 10px;
            border-radius: 12px;
            font-size: 0.72em;
            font-weight: 600;
            z-index: 2;
        }

        /* Stats bar */
        .office-stats {
            background: linear-gradient(135deg, #1a1a2e, #16213e);
            padding: 12px 16px;
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 8px;
            color: white;
        }
        .office-stat {
            text-align: center;
        }
        .office-stat-value {
            font-size: 1.15em;
            font-weight: 700;
            color: #ecc94b;
        }
        .office-stat-label {
            font-size: 0.65em;
            color: #a0aec0;
            margin-top: 2px;
        }

        /* Progress bar to next level */
        .office-progress {
            background: #0d1117;
            padding: 6px 16px 10px;
            display: flex;
            align-items: center;
            gap: 10px;
            direction: rtl;
        }
        .office-progress-label {
            font-size: 0.68em;
            color: #a0aec0;
            white-space: nowrap;
        }
        .office-progress-bar {
            flex: 1;
            height: 6px;
            background: #2d3748;
            border-radius: 3px;
            overflow: hidden;
        }
        .office-progress-fill {
            height: 100%;
            background: linear-gradient(90deg, #38b2ac, #ecc94b);
            border-radius: 3px;
            transition: width 0.5s ease;
        }

        /* Principles bookshelf */
        .office-principles {
            background: #0d1117;
            padding: 0 16px 10px;
            display: flex;
            gap: 4px;
            flex-wrap: wrap;
            justify-content: center;
        }
        .office-principle-badge {
            background: rgba(56, 178, 172, 0.15);
            color: #38b2ac;
            padding: 2px 8px;
            border-radius: 8px;
            font-size: 0.62em;
            border: 1px solid rgba(56, 178, 172, 0.3);
        }
        .office-principle-badge.empty {
            background: rgba(160, 174, 192, 0.1);
            color: #4a5568;
            border-color: rgba(160, 174, 192, 0.2);
        }

        @media (max-width: 480px) {
            .office-scene { height: 150px; }
            .office-stats { grid-template-columns: repeat(2, 1fr); gap: 6px; }
            .office-window { width: 55px; height: 45px; font-size: 1.2em; }
            .office-desk { min-width: 120px; padding: 4px 12px 3px; }
        }
    `;
    document.head.appendChild(style);
};

BuffettOffice.render = function() {
    // Ensure styles are injected (safety net in case init wasn't called)
    this.injectStyles();
    
    let panel = document.getElementById('office-panel');
    if (!panel) {
        panel = document.createElement('div');
        panel.id = 'office-panel';
        panel.className = 'office-panel';
        // Insert before difficulty select
        const diffSelect = document.getElementById('difficulty-select');
        if (diffSelect && diffSelect.parentNode) {
            diffSelect.parentNode.insertBefore(panel, diffSelect);
        } else {
            return; // Can't render without anchor
        }
    }

    const levelInfo = this.getLevel();
    const level = levelInfo.current;
    const nextLevel = levelInfo.next;
    const stats = this.getStats();
    const ownedDecos = this.getOwnedDecorations();

    // Build wall items
    const wallItems = ownedDecos
        .filter(d => d.slot === 'wall')
        .map(d => `<span class="office-wall-item" title="${d.name}">${d.emoji}</span>`)
        .join('');

    // Build shelf items
    const shelfItems = ownedDecos
        .filter(d => d.slot === 'shelf' || d.slot === 'trophy')
        .map(d => `<span class="office-shelf-item" title="${d.name}">${d.emoji}</span>`)
        .join('');

    // Build desk items
    const deskBaseEmoji = level.deskEmoji || '🪑';
    const deskItems = ownedDecos
        .filter(d => d.slot === 'desk')
        .map(d => `<span class="office-desk-item" title="${d.name}">${d.emoji}</span>`)
        .join('');

    // Window view
    const windowView = level.windowView 
        ? `<div class="office-window">${level.windowView}</div>` 
        : '';

    // Progress to next level
    let progressHtml = '';
    if (nextLevel) {
        const pct = Math.min(100, Math.round(((levelInfo.totalScore - level.minPoints) / (nextLevel.minPoints - level.minPoints)) * 100));
        progressHtml = `
            <div class="office-progress">
                <span class="office-progress-label">➡️ ${nextLevel.name}</span>
                <div class="office-progress-bar">
                    <div class="office-progress-fill" style="width: ${pct}%"></div>
                </div>
                <span class="office-progress-label">${pct}%</span>
            </div>
        `;
    } else {
        progressHtml = `
            <div class="office-progress">
                <span class="office-progress-label">🏆 הגעת לדרגה הגבוהה ביותר!</span>
            </div>
        `;
    }

    // Principles badges — use actual principle IDs from game content
    const allPrinciples = [
        { id: 'moat', name: 'חפיר כלכלי' },
        { id: 'owner-earnings', name: 'רווחי בעלים' },
        { id: 'margin-of-safety', name: 'מרווח ביטחון' },
        { id: 'value-trap', name: 'מלכודת ערך' },
        { id: 'growth-trap', name: 'מלכודת צמיחה' },
        { id: 'management-quality', name: 'איכות הנהלה' },
        { id: 'leverage-risk', name: 'סיכון מינוף' },
        { id: 'cyclical-trap', name: 'מלכודת מחזוריות' },
        { id: 'circle-of-competence', name: 'מעגל כשירות' },
        { id: 'dividend-sustainability', name: 'קיימות דיבידנד' },
        { id: 'turnaround', name: 'סיפור שיקום' }
    ];
    const mastered = stats.principlesMastered || [];
    const principlesHtml = allPrinciples.map(p => {
        const isMastered = mastered.includes(p.id);
        return `<span class="office-principle-badge ${isMastered ? '' : 'empty'}" title="${p.name}">${isMastered ? '📖' : '📕'} ${p.name}</span>`;
    }).join('');

    // Win rate
    const winRate = stats.totalRounds > 0 
        ? Math.round((stats.totalCorrect / stats.totalRounds) * 100) 
        : 0;

    panel.innerHTML = `
        <div class="office-scene" style="background: ${level.bg};">
            <div class="office-level-badge">${level.name} (Lv.${level.level})</div>
            ${windowView}
            <div class="office-wall" style="background: ${level.wallColor};">
                ${wallItems || '<span style="opacity:0.3; font-size:0.8em;">קירות ריקים... קנה קישוטים בחנות!</span>'}
            </div>
            ${shelfItems ? `<div class="office-shelf">${shelfItems}</div>` : ''}
            <div class="office-floor" style="background: ${level.floorColor};">
                <div class="office-desk">
                    <span class="office-desk-item">${deskBaseEmoji}</span>
                    ${deskItems}
                </div>
            </div>
        </div>
        <div class="office-stats">
            <div class="office-stat">
                <div class="office-stat-value">${stats.gamesPlayed}</div>
                <div class="office-stat-label">משחקים</div>
            </div>
            <div class="office-stat">
                <div class="office-stat-value">${winRate}%</div>
                <div class="office-stat-label">אחוז הצלחה</div>
            </div>
            <div class="office-stat">
                <div class="office-stat-value">${stats.bestScore}</div>
                <div class="office-stat-label">שיא ניקוד</div>
            </div>
            <div class="office-stat">
                <div class="office-stat-value">${mastered.length}</div>
                <div class="office-stat-label">עקרונות</div>
            </div>
        </div>
        ${progressHtml}
        ${principlesHtml ? `<div class="office-principles">${principlesHtml}</div>` : ''}
    `;
};

BuffettOffice.getOwnedDecorations = function() {
    try {
        if (!window.BuffettShop) return [];
        const owned = BuffettShop.storage.getData().owned;
        const ownedDecoIds = owned.officeDecorations || [];
        return this.decorations.filter(d => ownedDecoIds.includes(d.id));
    } catch(e) {
        return [];
    }
};

BuffettOffice.init = function() {
    this.injectStyles();
    // Populate shop with office decorations
    if (window.BuffettShop && BuffettShop.items) {
        BuffettShop.items.officeDecorations = this.decorations;
    }
    this.render();
};

// Re-render when returning to menu
BuffettOffice._refreshTimer = null;
BuffettOffice.refresh = function() {
    // Debounce refresh to prevent rapid DOM rebuilds
    clearTimeout(this._refreshTimer);
    this._refreshTimer = setTimeout(() => {
        this.render();
    }, 50);
};

// Listen for shop changes — but skip refresh if shop overlay is open (DOM is hidden)
window.addEventListener('buffettShopEquipmentChanged', () => {
    if (window.BuffettOffice) {
        // Don't rebuild office DOM while shop overlay is covering it
        const shopOverlay = document.getElementById('buffett-shop-overlay');
        if (shopOverlay && shopOverlay.classList.contains('active')) return;
        BuffettOffice.refresh();
    }
});

// Initialization is handled by game-engine.html in the window.load listener
// to ensure correct load order: shop → office → mascot

