/* === shop-catalog.js ===
 * Shop item definitions: themes, frames, effects, titles, avatars, mascots
 * Edit this file to add shop items!
 */

window.BuffettShop = window.BuffettShop || {};

// ==============================
// SHOP CONFIGURATION
// ==============================
BuffettShop.config = {
    storageKey: 'buffettGameShop',
    currencyName: 'נקודות',
    currencyIcon: '💰'
};

// ==============================
// RARITY SYSTEM
// ==============================
BuffettShop.rarities = {
    common: {
        name: 'נפוץ',
        nameEn: 'Common',
        color: '#718096',
        gradient: 'linear-gradient(135deg, #718096, #a0aec0)',
        glow: 'none'
    },
    rare: {
        name: 'נדיר',
        nameEn: 'Rare',
        color: '#3182ce',
        gradient: 'linear-gradient(135deg, #2b6cb0, #4299e1)',
        glow: '0 0 10px rgba(66, 153, 225, 0.5)'
    },
    epic: {
        name: 'אפי',
        nameEn: 'Epic',
        color: '#805ad5',
        gradient: 'linear-gradient(135deg, #6b46c1, #9f7aea)',
        glow: '0 0 15px rgba(159, 122, 234, 0.6)'
    },
    legendary: {
        name: 'אגדי',
        nameEn: 'Legendary',
        color: '#d69e2e',
        gradient: 'linear-gradient(135deg, #b7791f, #ecc94b)',
        glow: '0 0 20px rgba(236, 201, 75, 0.7)'
    }
};

// ==============================
// SHOP CATEGORIES
// ==============================
BuffettShop.categories = {
    themes: {
        id: 'themes',
        name: 'ערכות נושא',
        icon: '🎨',
        description: 'שנה את המראה הכללי של המשחק'
    },
    cardFrames: {
        id: 'cardFrames',
        name: 'מסגרות כרטיס',
        icon: '🖼️',
        description: 'מסגרות מיוחדות לכרטיסי החברות'
    },
    effects: {
        id: 'effects',
        name: 'אפקטים',
        icon: '✨',
        description: 'אפקטים ויזואליים לתשובות נכונות'
    },
    titles: {
        id: 'titles',
        name: 'תארים',
        icon: '🏅',
        description: 'תארים שיוצגו ליד השם שלך'
    },
    avatars: {
        id: 'avatars',
        name: 'אווטארים',
        icon: '👤',
        description: 'דמויות משקיעים אייקוניות'
    },
    mascots: {
        id: 'mascots',
        name: 'מלווים',
        icon: '🐾',
        description: 'חיית מחמד שמלווה אותך במשחק'
    },
    officeDecorations: {
        id: 'officeDecorations',
        name: 'משרד',
        icon: '🏢',
        description: 'קישוטים למשרד ההשקעות שלך'
    }
};

// ==============================
// THEMES
// ==============================
BuffettShop.items = {
    themes: [
        {
            id: 'theme-default',
            name: 'קלאסי',
            description: 'הערכה הקלאסית של המשחק',
            price: 0,
            rarity: 'common',
            isDefault: true,
            preview: '🏛️',
            css: {
                '--bg-primary': '#eef6fb',
                '--bg-secondary': '#ffffff',
                '--accent-start': '#38b2ac',
                '--accent-end': '#3182ce',
                '--text-primary': '#2d3748',
                '--text-secondary': '#4a5568',
                '--text-muted': '#718096',
                '--card-bg': 'rgba(255, 255, 255, 0.95)',
                '--card-border': 'rgba(0, 0, 0, 0.1)',
                '--border-color': 'rgba(0, 0, 0, 0.08)',
                '--surface-dim': '#e2e8f0',
                '--surface-bg': '#ffffff',
                '--metric-bg': '#f8f9fa',
                '--metric-border': '#dee2e6'
            }
        },
        {
            id: 'theme-wall-street-night',
            name: 'וול סטריט בלילה',
            description: 'אווירת מסחר עם דגשי ירוק',
            price: 500,
            rarity: 'rare',
            preview: '🌃',
            css: {
                '--bg-primary': '#edf2f7',
                '--bg-secondary': '#e2e8f0',
                '--accent-start': '#38a169',
                '--accent-end': '#2f855a',
                '--text-primary': '#1a202c',
                '--text-secondary': '#2d3748',
                '--text-muted': '#718096',
                '--card-bg': 'rgba(237, 242, 247, 0.97)',
                '--card-border': 'rgba(56, 161, 105, 0.3)',
                '--border-color': 'rgba(56, 161, 105, 0.15)',
                '--surface-dim': '#cbd5e0',
                '--surface-bg': '#e2e8f0',
                '--metric-bg': '#e2e8f0',
                '--metric-border': '#cbd5e0'
            }
        },
        {
            id: 'theme-bloomberg',
            name: 'טרמינל בלומברג',
            description: 'בהשראת מסך מסחר אמיתי',
            price: 800,
            rarity: 'epic',
            preview: '📊',
            css: {
                '--bg-primary': '#fff8f0',
                '--bg-secondary': '#ffecd2',
                '--accent-start': '#dd6b20',
                '--accent-end': '#c05621',
                '--text-primary': '#2d1600',
                '--text-secondary': '#553300',
                '--text-muted': '#9c6e3a',
                '--card-bg': 'rgba(255, 248, 240, 0.97)',
                '--card-border': 'rgba(221, 107, 32, 0.35)',
                '--border-color': 'rgba(221, 107, 32, 0.15)',
                '--surface-dim': '#fbd38d',
                '--surface-bg': '#ffecd2',
                '--metric-bg': '#ffecd2',
                '--metric-border': '#fbd38d'
            }
        },
        {
            id: 'theme-vintage-newspaper',
            name: 'עיתון וינטג׳',
            description: 'סגנון עיתון פיננסי קלאסי',
            price: 600,
            rarity: 'rare',
            preview: '📰',
            css: {
                '--bg-primary': '#f5f0e1',
                '--bg-secondary': '#ebe4d1',
                '--accent-start': '#8b4513',
                '--accent-end': '#a0522d',
                '--text-primary': '#2c1810',
                '--text-secondary': '#4a3728',
                '--text-muted': '#6b5a48',
                '--card-bg': 'rgba(245, 240, 225, 0.98)',
                '--card-border': 'rgba(139, 69, 19, 0.3)',
                '--border-color': 'rgba(139, 69, 19, 0.15)',
                '--surface-dim': '#ddd5c0',
                '--surface-bg': '#ebe4d1',
                '--metric-bg': '#ebe4d1',
                '--metric-border': '#d4c9b0'
            }
        },
        {
            id: 'theme-gold-standard',
            name: 'תקן הזהב',
            description: 'יוקרה וזהב בכל פינה',
            price: 1500,
            rarity: 'legendary',
            preview: '👑',
            css: {
                '--bg-primary': '#faf6ed',
                '--bg-secondary': '#f0e9d8',
                '--accent-start': '#b8860b',
                '--accent-end': '#daa520',
                '--text-primary': '#3d2b1f',
                '--text-secondary': '#5c4033',
                '--text-muted': '#7a6555',
                '--card-bg': 'rgba(250, 246, 237, 0.97)',
                '--card-border': 'rgba(184, 134, 11, 0.4)',
                '--border-color': 'rgba(184, 134, 11, 0.15)',
                '--surface-dim': '#e5dcc8',
                '--surface-bg': '#f0e9d8',
                '--metric-bg': '#f0e9d8',
                '--metric-border': '#d5c9af'
            }
        },
        {
            id: 'theme-perfect-investor',
            name: 'משקיע מושלם',
            description: '🏆 הישג: קבל 10/10 במשחק אחד',
            price: 0,
            rarity: 'legendary',
            unlockedBy: 'perfect_game',
            preview: '🌟',
            css: {
                '--bg-primary': '#f0faf5',
                '--bg-secondary': '#d8f4e8',
                '--accent-start': '#1a7a4a',
                '--accent-end': '#2ecc71',
                '--text-primary': '#0d3320',
                '--text-secondary': '#1a5c38',
                '--text-muted': '#3a8c5e',
                '--card-bg': 'rgba(240, 250, 245, 0.98)',
                '--card-border': 'rgba(46, 204, 113, 0.4)',
                '--border-color': 'rgba(46, 204, 113, 0.15)',
                '--surface-dim': '#b3eacf',
                '--surface-bg': '#d8f4e8',
                '--metric-bg': '#d8f4e8',
                '--metric-border': '#a0ddbf'
            }
        },
        {
            id: 'theme-berkshire',
            name: 'ברקשייר האת׳ווי',
            description: 'בהשראת משרדי וורן באפט באומהה',
            price: 2000,
            rarity: 'legendary',
            preview: '🏢',
            css: {
                '--bg-primary': '#f0f4f8',
                '--bg-secondary': '#e3eaf2',
                '--accent-start': '#b8941e',
                '--accent-end': '#c9a227',
                '--text-primary': '#1e3a5f',
                '--text-secondary': '#2c4a6e',
                '--text-muted': '#5a7a9a',
                '--card-bg': 'rgba(240, 244, 248, 0.97)',
                '--card-border': 'rgba(184, 148, 30, 0.35)',
                '--border-color': 'rgba(184, 148, 30, 0.15)',
                '--surface-dim': '#d0dbe6',
                '--surface-bg': '#e3eaf2',
                '--metric-bg': '#e3eaf2',
                '--metric-border': '#c8d6e2'
            }
        },
        {
            id: 'theme-matrix',
            name: 'המטריקס',
            description: 'ראה את הקוד מאחורי המספרים',
            price: 1200,
            rarity: 'epic',
            preview: '💊',
            css: {
                '--bg-primary': '#0d0d0d',
                '--bg-secondary': '#1a1a1a',
                '--accent-start': '#00ff41',
                '--accent-end': '#00cc33',
                '--text-primary': '#00ff41',
                '--text-secondary': '#00cc33',
                '--text-muted': '#009922',
                '--card-bg': 'rgba(13, 13, 13, 0.98)',
                '--card-border': 'rgba(0, 255, 65, 0.3)',
                '--border-color': 'rgba(0, 255, 65, 0.1)',
                '--surface-dim': '#2a2a2a',
                '--surface-bg': '#1a1a1a',
                '--metric-bg': '#1a1a1a',
                '--metric-border': '#2a2a2a'
            }
        },
        {
            id: 'theme-cherry-blossom',
            name: 'פריחת הדובדבן',
            description: 'השקעות בסגנון יפני מסורתי',
            price: 700,
            rarity: 'rare',
            preview: '🌸',
            css: {
                '--bg-primary': '#fff5f5',
                '--bg-secondary': '#ffe4e6',
                '--accent-start': '#f687b3',
                '--accent-end': '#ed64a6',
                '--text-primary': '#702459',
                '--text-secondary': '#97266d',
                '--text-muted': '#b83280',
                '--card-bg': 'rgba(255, 245, 245, 0.95)',
                '--card-border': 'rgba(237, 100, 166, 0.3)',
                '--border-color': 'rgba(237, 100, 166, 0.15)',
                '--surface-dim': '#fed7e2',
                '--surface-bg': '#ffe4e6',
                '--metric-bg': '#ffe4e6',
                '--metric-border': '#feb2b2'
            }
        }
    ],

    // ==============================
    // CARD FRAMES
    // ==============================
    cardFrames: [
        {
            id: 'frame-default',
            name: 'סטנדרטי',
            description: 'המסגרת הבסיסית',
            price: 0,
            rarity: 'common',
            isDefault: true,
            preview: '▢',
            css: {
                border: '1px solid var(--card-border)',
                boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
                borderRadius: '16px'
            }
        },
        {
            id: 'frame-gold-trim',
            name: 'מסגרת זהב',
            description: 'גבול זהוב אלגנטי',
            price: 400,
            rarity: 'rare',
            preview: '🥇',
            css: {
                border: '3px solid #d69e2e',
                boxShadow: '0 4px 12px rgba(214, 158, 46, 0.3)',
                borderRadius: '16px'
            }
        },
        {
            id: 'frame-neon',
            name: 'ניאון זוהר',
            description: 'זוהר ניאוני מרהיב',
            price: 600,
            rarity: 'rare',
            preview: '💡',
            css: {
                border: '2px solid #00ffff',
                boxShadow: '0 0 12px rgba(0, 255, 255, 0.4)',
                borderRadius: '16px',
                
            }
        },
        {
            id: 'frame-stock-certificate',
            name: 'תעודת מניה',
            description: 'כמו תעודת מניה עתיקה',
            price: 800,
            rarity: 'epic',
            preview: '📜',
            css: {
                border: '4px double #8b4513',
                boxShadow: '0 4px 15px rgba(139, 69, 19, 0.3)',
                borderRadius: '4px',
                background: 'linear-gradient(135deg, rgba(245, 240, 225, 0.1), rgba(235, 228, 209, 0.1))'
            }
        },
        {
            id: 'frame-holographic',
            name: 'הולוגרפי',
            description: 'אפקט הולוגרפי מסנוור',
            price: 1200,
            rarity: 'epic',
            preview: '🌈',
            css: {
                border: '3px solid transparent',
                borderImage: 'linear-gradient(135deg, #ff0000, #ff7f00, #ffff00, #00ff00, #0000ff, #8b00ff) 1',
                boxShadow: '0 4px 12px rgba(147, 51, 234, 0.3)',
                borderRadius: '0',
                
            }
        },
        {
            id: 'frame-diamond',
            name: 'יהלום',
            description: 'מסגרת יהלומים נוצצת',
            price: 2000,
            rarity: 'legendary',
            preview: '💎',
            css: {
                border: '4px solid #b9f2ff',
                boxShadow: '0 0 12px rgba(185, 242, 255, 0.4)',
                borderRadius: '16px',
                
            }
        },
        {
            id: 'frame-fire',
            name: 'להבות',
            description: 'מסגרת עם אפקט אש',
            price: 1500,
            rarity: 'legendary',
            preview: '🔥',
            css: {
                border: '3px solid #ff4500',
                boxShadow: '0 0 12px rgba(255, 69, 0, 0.4)',
                borderRadius: '16px',
                
            }
        }
    ],

    // ==============================
    // EFFECTS
    // ==============================
    effects: [
        {
            id: 'effect-default',
            name: 'בסיסי',
            description: 'הבהוב ירוק פשוט',
            price: 0,
            rarity: 'common',
            isDefault: true,
            preview: '✓',
            effectType: 'flash',
            effectConfig: {
                color: '#48bb78',
                duration: 500
            }
        },
        {
            id: 'effect-confetti',
            name: 'קונפטי',
            description: 'גשם קונפטי צבעוני',
            price: 300,
            rarity: 'common',
            preview: '🎊',
            effectType: 'confetti',
            effectConfig: {
                particleCount: 50,
                spread: 70,
                colors: ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff']
            }
        },
        {
            id: 'effect-coins',
            name: 'גשם מטבעות',
            description: 'מטבעות זהב נופלים מהשמיים',
            price: 500,
            rarity: 'rare',
            preview: '🪙',
            effectType: 'coins',
            effectConfig: {
                coinCount: 30,
                duration: 2000
            }
        },
        {
            id: 'effect-fireworks',
            name: 'זיקוקים',
            description: 'מופע זיקוקים מרהיב',
            price: 700,
            rarity: 'rare',
            preview: '🎆',
            effectType: 'fireworks',
            effectConfig: {
                bursts: 3,
                colors: ['#ff0', '#0ff', '#f0f', '#0f0']
            }
        },
        {
            id: 'effect-stocks-up',
            name: 'מניות עולות',
            description: 'חיצים ירוקים מתעופפים למעלה',
            price: 400,
            rarity: 'rare',
            preview: '📈',
            effectType: 'arrows',
            effectConfig: {
                direction: 'up',
                color: '#48bb78',
                count: 20
            }
        },
        {
            id: 'effect-dollar-rain',
            name: 'גשם דולרים',
            description: 'שטרות דולר מתעופפים',
            price: 800,
            rarity: 'epic',
            preview: '💵',
            effectType: 'moneyRain',
            effectConfig: {
                billCount: 40,
                symbols: ['💵', '💴', '💶', '💷']
            }
        },
        {
            id: 'effect-champagne',
            name: 'שמפניה',
            description: 'פיצוץ בקבוק שמפניה',
            price: 1000,
            rarity: 'epic',
            preview: '🍾',
            effectType: 'champagne',
            effectConfig: {
                bubbleCount: 60,
                color: '#ffd700'
            }
        },
        {
            id: 'effect-aurora',
            name: 'זוהר צפוני',
            description: 'גלי אור קסומים',
            price: 1500,
            rarity: 'legendary',
            preview: '🌌',
            effectType: 'aurora',
            effectConfig: {
                waves: 5,
                colors: ['#00ff87', '#60efff', '#ff00ff', '#00ff00']
            }
        },
        {
            id: 'effect-buffett-applause',
            name: 'מחיאות כפיים מבאפט',
            description: 'וורן באפט מוחא לך כפיים',
            price: 2500,
            rarity: 'legendary',
            preview: '👏',
            effectType: 'buffettApplause',
            effectConfig: {
                message: '!השקעה מצוינת',
                duration: 3000
            }
        }
    ],

    // ==============================
    // TITLES
    // ==============================
    titles: [
        {
            id: 'title-default',
            name: 'משקיע',
            description: 'התואר הבסיסי',
            price: 0,
            rarity: 'common',
            isDefault: true,
            preview: '📊',
            displayText: 'משקיע'
        },
        {
            id: 'title-analyst',
            name: 'אנליסט',
            description: 'מנתח מספרים מקצועי',
            price: 200,
            rarity: 'common',
            preview: '🔍',
            displayText: 'אנליסט'
        },
        {
            id: 'title-value-hunter',
            name: 'צייד ערך',
            description: 'מוצא הזדמנויות שאחרים מפספסים',
            price: 400,
            rarity: 'rare',
            preview: '🎯',
            displayText: 'צייד ערך'
        },
        {
            id: 'title-moat-detective',
            name: 'בלש החפיר',
            description: 'מומחה באיתור יתרונות תחרותיים',
            price: 500,
            rarity: 'rare',
            preview: '🕵️',
            displayText: 'בלש החפיר'
        },
        {
            id: 'title-margin-master',
            name: 'אדון מרווח הביטחון',
            description: 'תמיד משאיר מקום לטעויות',
            price: 600,
            rarity: 'rare',
            preview: '🛡️',
            displayText: 'אדון מרווח הביטחון'
        },
        {
            id: 'title-dividend-king',
            name: 'מלך הדיבידנדים',
            description: 'אוהב תזרים מזומנים קבוע',
            price: 700,
            rarity: 'epic',
            preview: '👑',
            displayText: 'מלך הדיבידנדים'
        },
        {
            id: 'title-contrarian',
            name: 'קונטרריאן',
            description: 'הולך נגד העדר',
            price: 800,
            rarity: 'epic',
            preview: '🔄',
            displayText: 'קונטרריאן'
        },
        {
            id: 'title-long-term-thinker',
            name: 'חושב לטווח ארוך',
            description: 'תקופת ההחזקה האהובה: לנצח',
            price: 900,
            rarity: 'epic',
            preview: '⏳',
            displayText: 'חושב לטווח ארוך'
        },
        {
            id: 'title-oracle',
            name: 'האורקל',
            description: 'בהשראת האורקל מאומהה',
            price: 2000,
            rarity: 'legendary',
            preview: '🔮',
            displayText: 'האורקל'
        },
        {
            id: 'title-sage',
            name: 'החכם מאומהה',
            description: 'התואר הנכסף ביותר',
            price: 3000,
            rarity: 'legendary',
            preview: '🧙',
            displayText: 'החכם מאומהה'
        },
        {
            id: 'title-black-belt',
            name: 'בעל חגורה שחורה',
            description: '🏆 הישג: הגע לחגורה השחורה',
            price: 0,
            rarity: 'legendary',
            unlockedBy: 'black_belt',
            preview: '⬛',
            displayText: '⬛ בעל חגורה שחורה'
        },
        {
            id: 'title-streak-master',
            name: 'מאסטר הרצף',
            description: '🏆 הישג: הגע ל-5 נכונות ברצף',
            price: 0,
            rarity: 'epic',
            unlockedBy: 'hot_streak',
            preview: '🔥',
            displayText: '🔥 מאסטר הרצף'
        }
    ],

    // ==============================
    // AVATARS
    // ==============================
    avatars: [
        {
            id: 'avatar-default',
            name: 'משקיע מתחיל',
            description: 'התחלת המסע',
            price: 0,
            rarity: 'common',
            isDefault: true,
            preview: '👤',
            emoji: '👤'
        },
        {
            id: 'avatar-suit',
            name: 'איש עסקים',
            description: 'חליפה מחויטת ועניבה',
            price: 200,
            rarity: 'common',
            preview: '👔',
            emoji: '👔'
        },
        {
            id: 'avatar-chart',
            name: 'אנליסט טכני',
            description: 'תמיד עם גרף ביד',
            price: 300,
            rarity: 'common',
            preview: '📈',
            emoji: '📈'
        },
        {
            id: 'avatar-bull',
            name: 'השור',
            description: 'אופטימי תמיד',
            price: 400,
            rarity: 'rare',
            preview: '🐂',
            emoji: '🐂'
        },
        {
            id: 'avatar-bear',
            name: 'הדוב',
            description: 'זהיר ושמרן',
            price: 400,
            rarity: 'rare',
            preview: '🐻',
            emoji: '🐻'
        },
        {
            id: 'avatar-owl',
            name: 'ינשוף חכם',
            description: 'רואה מה שאחרים לא רואים',
            price: 500,
            rarity: 'rare',
            preview: '🦉',
            emoji: '🦉'
        },
        {
            id: 'avatar-shark',
            name: 'כריש',
            description: 'טורף הזדמנויות',
            price: 600,
            rarity: 'rare',
            preview: '🦈',
            emoji: '🦈'
        },
        {
            id: 'avatar-rocket',
            name: 'רקטה',
            description: 'מניות צמיחה בלבד',
            price: 700,
            rarity: 'epic',
            preview: '🚀',
            emoji: '🚀'
        },
        {
            id: 'avatar-diamond-hands',
            name: 'ידיים יהלום',
            description: 'לעולם לא מוכר',
            price: 800,
            rarity: 'epic',
            preview: '💎',
            emoji: '💎🙌'
        },
        {
            id: 'avatar-money-bag',
            name: 'שק כסף',
            description: 'העושר הוא המטרה',
            price: 900,
            rarity: 'epic',
            preview: '💰',
            emoji: '💰'
        },
        {
            id: 'avatar-crown',
            name: 'מלך ההשקעות',
            description: 'שולט בשווקים',
            price: 1500,
            rarity: 'legendary',
            preview: '👑',
            emoji: '👑'
        },
        {
            id: 'avatar-buffett',
            name: 'וורן באפט',
            description: 'האגדה בכבודו ובעצמו',
            price: 5000,
            rarity: 'legendary',
            preview: '🧓',
            emoji: '🧓💼',
            special: true,
            unlockMessage: 'השגת את האווטאר הנדיר ביותר!'
        },
        {
            id: 'avatar-sensei',
            name: 'הסנסיי',
            description: '🏆 הישג: למד את כל 12 העקרונות',
            price: 0,
            rarity: 'legendary',
            unlockedBy: 'all_principles',
            preview: '🥋',
            emoji: '🥋'
        }
    ],

    // ==============================
    // MASCOTS (Companions)
    // ==============================
    mascots: [
        {
            id: 'mascot-none',
            name: 'ללא מלווה',
            description: 'שחק ללא חיית מחמד',
            price: 0,
            rarity: 'common',
            isDefault: true,
            preview: '➖'
        },
        {
            id: 'mascot-bull',
            name: 'שורי השור',
            description: 'שור אופטימי שרואה פוטנציאל בכל מקום',
            price: 300,
            rarity: 'rare',
            preview: '🐂'
        },
        {
            id: 'mascot-bear',
            name: 'דובי הדוב',
            description: 'דוב זהיר שמחפש סיכונים',
            price: 300,
            rarity: 'rare',
            preview: '🐻'
        },
        {
            id: 'mascot-owl',
            name: 'ינשופי החכם',
            description: 'ינשוף שמלמד עקרונות השקעה',
            price: 600,
            rarity: 'epic',
            preview: '🦉'
        },
        {
            id: 'mascot-fox',
            name: 'שועלי הממולח',
            description: 'שועל שמזהה הזדמנויות נסתרות',
            price: 600,
            rarity: 'epic',
            preview: '🦊'
        },
        {
            id: 'mascot-buffett',
            name: 'האורקל מאומהה',
            description: 'חונך אישי בסגנון וורן באפט',
            price: 2000,
            rarity: 'legendary',
            preview: '🧓'
        }
    ],

    // ==============================
    // OFFICE DECORATIONS
    // ==============================
    officeDecorations: [] // Populated from BuffettOffice.decorations at init
};
