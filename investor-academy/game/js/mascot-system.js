/* === mascot-system.js ===
 * Mascot/Companion System
 */


/* === mascot-system.js === */
/**
 * Buffett Game - Mascot/Companion System
 * מערכת חיות מלוות עם אישיות ותגובות למשחק
 * 
 * Loaded AFTER shop-system.js, BEFORE game-engine.html
 */

window.BuffettMascot = window.BuffettMascot || {};

// ==============================
// MASCOT DEFINITIONS
// ==============================
BuffettMascot.mascots = {
    'mascot-none': {
        id: 'mascot-none',
        name: 'ללא מלווה',
        emoji: '',
        price: 0,
        rarity: 'common',
        isDefault: true,
        description: 'שחק ללא חיית מחמד',
        preview: '➖',
        personality: null
    },
    'mascot-bull': {
        id: 'mascot-bull',
        name: 'שורי השור',
        emoji: '🐂',
        price: 300,
        rarity: 'rare',
        description: 'שור אופטימי שתמיד רואה פוטנציאל',
        preview: '🐂',
        personality: 'optimistic',
        lines: {
            onRoundStart: [
                'בוא נראה מה יש פה... 🤔',
                'חברה חדשה! בוא נבדוק את הנתונים',
                'אני מריח הזדמנות!',
                'מעניין... מה אומרים המספרים?',
                'עוד סיבוב, עוד הזדמנות להרוויח!'
            ],
            onCorrect: [
                'ידעתי! אתה משקיע מעולה! 🎉',
                'זה הכסף הגדול! המשך ככה!',
                'קנה בזול, מכור ביוקר. מושלם.',
                'באפט היה גאה בך!',
                'רווח! כמו שאני אוהב! 💪'
            ],
            onIncorrect: [
                'אל דאגה, גם השוק מתקן לפעמים',
                'הפסד קטן, לקח גדול',
                'השוק תמיד נותן הזדמנות שנייה',
                'לא נורא! הסיבוב הבא שלנו',
                'גם באפט טעה בפעם הראשונה...'
            ],
            onCombo: [
                'רצף מנצח!! 🔥🔥🔥',
                'אתה בוער! השוק שלך!',
                'תיק מנצח! לא עוצרים!',
                'מאות אחוזי תשואה! (כמעט)'
            ],
            onVersus: [
                'השוואה! בוא נראה מי חזקה יותר',
                'עין חדה... איזו חברה עדיפה?'
            ],
            onSpecial: [
                'אירוע מיוחד! זה יכול לזעזע את השוק',
                'חדשות! בוא ננתח את ההשפעה'
            ],
            onIdle: [
                'מה דעתך? 🤔',
                'קח את הזמן שלך...',
                'בדוק את ה-FCF!',
                'אל תשכח לבדוק את ההנהלה'
            ]
        }
    },
    'mascot-bear': {
        id: 'mascot-bear',
        name: 'דובי הדוב',
        emoji: '🐻',
        price: 300,
        rarity: 'rare',
        description: 'דוב זהיר שתמיד מחפש סיכונים',
        preview: '🐻',
        personality: 'cautious',
        lines: {
            onRoundStart: [
                'היזהר... לא הכל זהב מה שנוצץ',
                'בוא נחפש את המלכודות פה...',
                'אני מרגיש שמשהו לא מסתדר 🧐',
                'קודם כל - מה הסיכונים?',
                'חברה חדשה. בוא נהיה סקפטיים.'
            ],
            onCorrect: [
                'ניתוח מדויק. יפה. 👍',
                'ראית את הסימנים. מרשים.',
                'זהירות משתלמת!',
                'החלטה נבונה. לא נפלת במלכודת.',
                'מרווח ביטחון - תמיד.'
            ],
            onIncorrect: [
                'הממ... שימת לב לדגלים האדומים?',
                'הייתי צריך להתריע חזק יותר 🤦',
                'תבדוק שוב את החוב בפעם הבאה',
                'למידה יקרה, אבל חשובה',
                'P/E נמוך לא תמיד אומר זול...'
            ],
            onCombo: [
                'רצף מרשים. תישאר חד.',
                'ניתוח סיכונים מושלם! ⚡',
                'אפילו אני מתרשם...',
                'ערנות משתלמת!'
            ],
            onVersus: [
                'השוואה... חפש את החברה עם פחות סיכון',
                'מי מהן יותר בטוחה? זו השאלה.'
            ],
            onSpecial: [
                'אירוע חיצוני. תחשוב על ההשלכות',
                'שינוי בסביבה... מי ירוויח ומי יפסיד?'
            ],
            onIdle: [
                'חשוב על הסיכונים...',
                'בדקת את יחס החוב? 📊',
                'מה קורה אם הריבית עולה?',
                'זכור - מרווח ביטחון!'
            ]
        }
    },
    'mascot-owl': {
        id: 'mascot-owl',
        name: 'ינשופי החכם',
        emoji: '🦉',
        price: 600,
        rarity: 'epic',
        description: 'ינשוף חכם שמלמד עקרונות השקעה',
        preview: '🦉',
        personality: 'wise',
        lines: {
            onRoundStart: [
                'בוא נלמד משהו חדש מהחברה הזו',
                'כל חברה היא שיעור בהשקעות',
                'שים לב לפרטים הקטנים...',
                'מה הסיפור מאחורי המספרים?',
                'זכור: העסק חשוב יותר מהמניה'
            ],
            onCorrect: [
                'מצוין! הבנת את העיקרון 📚',
                'בדיוק ככה באפט חושב',
                'הידע שלך מתעמק!',
                'לימוד מתמיד = משקיע טוב יותר',
                'עוד שיעור נלמד! 🎓'
            ],
            onIncorrect: [
                'שיעור חשוב! מה נלמד מזה? 📖',
                'הטעות הזו תהפוך אותך לחכם יותר',
                'באפט: "סיכון = לא לדעת מה אתה עושה"',
                'חזור לנתונים - מה פספסת?',
                'למידה מטעויות > למידה מהצלחות'
            ],
            onCombo: [
                'חוכמה מתגמלת! 🌟',
                'העקרונות עובדים!',
                'מונגר: "כל מה שאני רוצה זה לדעת איפה אני הולך למות, כדי לא ללכת לשם"',
                'הידע שלך מניב תשואה!'
            ],
            onVersus: [
                'שיעור בניתוח השוואתי! השווה בקפידה',
                'איזו חברה מגלמת עקרונות טובים יותר?'
            ],
            onSpecial: [
                'אירועי מאקרו - שיעור חשוב בהקשר',
                'חשוב: איך האירוע משפיע על הערך הפנימי?'
            ],
            onIdle: [
                'חשוב על ה-Moat...',
                'מה באפט היה אומר? 🤔',
                '"מחיר הוא מה שאתה משלם..."',
                'בדוק את איכות ההנהלה!'
            ]
        }
    },
    'mascot-fox': {
        id: 'mascot-fox',
        name: 'שועלי הממולח',
        emoji: '🦊',
        price: 600,
        rarity: 'epic',
        description: 'שועל ממולח שמזהה הזדמנויות נסתרות',
        preview: '🦊',
        personality: 'shrewd',
        lines: {
            onRoundStart: [
                'אהה... מה יש לנו פה? 👀',
                'בוא נחפור מאחורי הקלעים',
                'המספרים מספרים רק חצי מהסיפור...',
                'יש כאן משהו מעניין...',
                'בוא נראה מה ההנהלה מסתירה 🔍'
            ],
            onCorrect: [
                'מצאת את זה! פיקח! 🎯',
                'ראית מה שאחרים מפספסים!',
                'ככה נראה כסף חכם!',
                'מהלך של מקצוען!',
                'זיהוי מושלם. אני מתרשם.'
            ],
            onIncorrect: [
                'אופס... ההטעייה עבדה עליך',
                'הנתונים הסתירו את האמת 🎭',
                'שים לב לפערים בין דיווח למציאות',
                'לא תמיד מה שנראה טוב - טוב',
                'הטריק הזה תופס הרבה משקיעים...'
            ],
            onCombo: [
                'מסלול חם! 🔥 אף אחד לא עוצר אותך!',
                'רואה דרך הערפל! מדהים!',
                'חד כסכין! המשך ככה!',
                'שום מלכודת לא תופסת אותך!'
            ],
            onVersus: [
                'השוואה! תחפש את הנקודה שמבדילה ביניהן',
                'אחת מהן מסתירה סוד... מי? 🕵️'
            ],
            onSpecial: [
                'אירוע? כל שינוי הוא הזדמנות למישהו',
                'מי מרוויח מזה? תמיד תשאל את השאלה הזו.'
            ],
            onIdle: [
                'חשוב מחוץ לקופסה...',
                'מה ההנהלה עושה עם הכסף? 💰',
                'תסתכל על מה שלא רשום...',
                'Skin in the game?'
            ]
        }
    },
    'mascot-buffett': {
        id: 'mascot-buffett',
        name: 'האורקל מאומהה',
        emoji: '🧓',
        price: 2000,
        rarity: 'legendary',
        description: 'חונך אישי בסגנון וורן באפט עצמו',
        preview: '🧓',
        personality: 'master',
        lines: {
            onRoundStart: [
                'בוא נקרא את הדו"ח השנתי ביחד',
                'חברה מעניינת. בוא נבדוק אם אני מבין אותה.',
                'כלל 1: אל תפסיד כסף. כלל 2: אל תשכח את כלל 1.',
                'בוא נראה אם זה בתוך מעגל הכשירות שלנו',
                'האם הייתי קונה את כל החברה הזו?'
            ],
            onCorrect: [
                'בדיוק כמו שהייתי עושה.',
                'מצוין! אתה מבין את ההבדל בין מחיר לערך.',
                'השקעה חכמה דורשת סבלנות וידע. יש לך את שניהם.',
                'זו ההחלטה הנכונה. העסק הוא מה שחשוב.',
                'תיק ההשקעות שלי גדל בזכות החלטות כאלה.'
            ],
            onIncorrect: [
                'הפסד קטן בידע = רווח גדול בעתיד.',
                'לא נורא. אני טעיתי עם Dexter Shoe, עם US Air...',
                'הטעות הזו שווה יותר מכל שיעור בביזנס סקול.',
                'חזור ליסודות: FCF, Moat, הנהלה.',
                '"סיכון מגיע מלא לדעת מה אתה עושה."'
            ],
            onCombo: [
                'Wonderful company at fair price. שוב ושוב.',
                'אתה מתחיל לחשוב כמו משקיע ערך אמיתי!',
                'רצף מרשים. זה לא מזל - זה ידע.',
                '"היה חמדן כשאחרים פוחדים." 📈'
            ],
            onVersus: [
                'השקעה טובה = עסק טוב + מחיר הוגן. מי מנצחת?',
                'השווה את ה-Moat. זו תמיד השאלה הראשונה.'
            ],
            onSpecial: [
                '"בטווח הקצר השוק הוא מכונת הצבעה. בטווח הארוך - מכונת שקילה."',
                'אירועים מזיזים מחירים. עסקים טובים מתאוששים.'
            ],
            onIdle: [
                '"זמן הוא חבר של עסק מצוין."',
                'חשוב על 10 שנים קדימה...',
                'מה ה-Owner Earnings?',
                '"אל תשקיע במה שאתה לא מבין."'
            ]
        }
    }
};

// ==============================
// MASCOT UI COMPONENT
// ==============================
BuffettMascot.state = {
    currentMascotId: 'mascot-none',
    bubbleTimeout: null,
    idleTimeout: null,
    isVisible: false,
    container: null
};

BuffettMascot.init = function() {
    // Get equipped mascot from shop
    try {
        if (window.BuffettShop) {
            const equipped = BuffettShop.getEquipped();
            this.state.currentMascotId = equipped.mascot || 'mascot-none';
        }
    } catch(e) {
        this.state.currentMascotId = 'mascot-none';
    }
    this.injectStyles();
    this.createDOM();
};

BuffettMascot.injectStyles = function() {
    if (document.getElementById('mascot-styles')) return;
    const style = document.createElement('style');
    style.id = 'mascot-styles';
    style.textContent = `
        .mascot-wrapper {
            position: fixed;
            bottom: 20px;
            right: 20px;
            z-index: 500;
            display: flex;
            flex-direction: column;
            align-items: flex-end;
            gap: 8px;
            pointer-events: none;
            transition: opacity 0.3s ease;
        }
        .mascot-wrapper.hidden { opacity: 0; pointer-events: none; }
        
        .mascot-bubble {
            background: var(--surface-bg, white);
            color: var(--text-primary, #1a202c);
            padding: 10px 14px;
            border-radius: 14px 14px 4px 14px;
            max-width: 220px;
            font-size: 0.82em;
            line-height: 1.5;
            box-shadow: 0 4px 15px rgba(0,0,0,0.15);
            opacity: 0;
            transform: translateY(8px) scale(0.9);
            transition: opacity 0.3s ease, transform 0.3s ease;
            pointer-events: auto;
            direction: rtl;
            border: 1px solid rgba(0,0,0,0.06);
        }
        .mascot-bubble.show {
            opacity: 1;
            transform: translateY(0) scale(1);
        }
        .mascot-bubble.correct { border-right: 3px solid #48bb78; }
        .mascot-bubble.incorrect { border-right: 3px solid #f56565; }
        .mascot-bubble.combo { border-right: 3px solid #ecc94b; }
        
        .mascot-character {
            width: 56px;
            height: 56px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 2em;
            cursor: pointer;
            pointer-events: auto;
            transition: transform 0.2s ease;
            box-shadow: 0 4px 12px rgba(0,0,0,0.2);
            user-select: none;
            will-change: transform;
        }
        .mascot-character:hover { transform: scale(1.1); }
        .mascot-character:active { transform: scale(0.95); }
        .mascot-character.bounce {
            animation: mascot-bounce 0.5s ease;
        }
        @keyframes mascot-bounce {
            0%, 100% { transform: translateY(0); }
            30% { transform: translateY(-12px); }
            60% { transform: translateY(-4px); }
        }
        .mascot-character.shake {
            animation: mascot-shake 0.4s ease;
        }
        @keyframes mascot-shake {
            0%, 100% { transform: translateX(0); }
            20% { transform: translateX(-5px); }
            40% { transform: translateX(5px); }
            60% { transform: translateX(-3px); }
            80% { transform: translateX(3px); }
        }

        @media (max-width: 768px) {
            .mascot-wrapper { bottom: 70px; right: 10px; }
            .mascot-character { width: 44px; height: 44px; font-size: 1.5em; }
            .mascot-bubble { max-width: 180px; font-size: 0.78em; padding: 8px 10px; }
        }
    `;
    document.head.appendChild(style);
};

BuffettMascot.createDOM = function() {
    // Ensure styles are injected (safety net in case init wasn't called)
    this.injectStyles();
    if (document.getElementById('mascot-wrapper')) {
        document.getElementById('mascot-wrapper').remove();
    }

    const wrapper = document.createElement('div');
    wrapper.id = 'mascot-wrapper';
    wrapper.className = 'mascot-wrapper hidden';

    const bubble = document.createElement('div');
    bubble.id = 'mascot-bubble';
    bubble.className = 'mascot-bubble';
    bubble.textContent = '';

    const character = document.createElement('div');
    character.id = 'mascot-character';
    character.className = 'mascot-character';

    const mascot = this.getMascot();
    if (mascot && mascot.personality) {
        const bgColors = {
            optimistic: 'linear-gradient(135deg, #f6e05e, #ecc94b)',
            cautious: 'linear-gradient(135deg, #a0aec0, #718096)',
            wise: 'linear-gradient(135deg, #9f7aea, #805ad5)',
            shrewd: 'linear-gradient(135deg, #ed8936, #dd6b20)',
            master: 'linear-gradient(135deg, #38b2ac, #3182ce)'
        };
        character.style.background = bgColors[mascot.personality] || '#e2e8f0';
        character.textContent = mascot.emoji;
    }

    // Click mascot for idle line
    character.addEventListener('click', () => {
        const m = this.getMascot();
        if (m?.lines?.onIdle) {
            this.say(this._pick(m.lines.onIdle));
        }
    });

    wrapper.appendChild(bubble);
    wrapper.appendChild(character);
    document.body.appendChild(wrapper);
    this.state.container = wrapper;
};

// ==============================
// MASCOT API
// ==============================
BuffettMascot.getMascot = function() {
    return this.mascots[this.state.currentMascotId] || null;
};

BuffettMascot._pick = function(arr) {
    if (!arr || arr.length === 0) return '';
    return arr[Math.floor(Math.random() * arr.length)];
};

BuffettMascot.show = function() {
    const mascot = this.getMascot();
    if (!mascot || !mascot.personality) return;

    // Refresh mascot in case it changed
    const char = document.getElementById('mascot-character');
    if (char) {
        char.textContent = mascot.emoji;
        const bgColors = {
            optimistic: 'linear-gradient(135deg, #f6e05e, #ecc94b)',
            cautious: 'linear-gradient(135deg, #a0aec0, #718096)',
            wise: 'linear-gradient(135deg, #9f7aea, #805ad5)',
            shrewd: 'linear-gradient(135deg, #ed8936, #dd6b20)',
            master: 'linear-gradient(135deg, #38b2ac, #3182ce)'
        };
        char.style.background = bgColors[mascot.personality] || '#e2e8f0';
    }

    const wrapper = document.getElementById('mascot-wrapper');
    if (wrapper) {
        wrapper.classList.remove('hidden');
        this.state.isVisible = true;
    }
};

BuffettMascot.hide = function() {
    const wrapper = document.getElementById('mascot-wrapper');
    if (wrapper) wrapper.classList.add('hidden');
    this.state.isVisible = false;
    this.clearBubble();
};

BuffettMascot.say = function(text, type, duration) {
    if (!text) return;
    const bubble = document.getElementById('mascot-bubble');
    const char = document.getElementById('mascot-character');
    if (!bubble || !char) return;

    // Clear previous
    clearTimeout(this.state.bubbleTimeout);
    clearTimeout(this.state.idleTimeout);
    bubble.classList.remove('show', 'correct', 'incorrect', 'combo');

    // Set text & style
    bubble.textContent = text;
    if (type) bubble.classList.add(type);

    // Animate character
    char.classList.remove('bounce', 'shake');
    void char.offsetWidth; // force reflow
    if (type === 'correct' || type === 'combo') {
        char.classList.add('bounce');
    } else if (type === 'incorrect') {
        char.classList.add('shake');
    }

    // Show
    requestAnimationFrame(() => bubble.classList.add('show'));

    // Auto-hide
    const dur = duration || (text.length > 40 ? 5000 : 3500);
    this.state.bubbleTimeout = setTimeout(() => {
        bubble.classList.remove('show');
    }, dur);

    // Schedule idle line
    this.scheduleIdle();
};

BuffettMascot.clearBubble = function() {
    clearTimeout(this.state.bubbleTimeout);
    clearTimeout(this.state.idleTimeout);
    const bubble = document.getElementById('mascot-bubble');
    if (bubble) bubble.classList.remove('show', 'correct', 'incorrect', 'combo');
};

BuffettMascot.scheduleIdle = function() {
    clearTimeout(this.state.idleTimeout);
    const mascot = this.getMascot();
    if (!mascot?.lines?.onIdle) return;
    // Say something idle after 15-25 seconds of no interaction
    const delay = 15000 + Math.random() * 10000;
    this.state.idleTimeout = setTimeout(() => {
        if (this.state.isVisible) {
            this.say(this._pick(mascot.lines.onIdle));
        }
    }, delay);
};

// ==============================
// GAME EVENT HOOKS
// ==============================
BuffettMascot.onRoundStart = function(roundType) {
    const mascot = this.getMascot();
    if (!mascot?.lines) return;
    let lines;
    if (roundType === 'versus' && mascot.lines.onVersus) lines = mascot.lines.onVersus;
    else if (roundType === 'special' && mascot.lines.onSpecial) lines = mascot.lines.onSpecial;
    else lines = mascot.lines.onRoundStart;
    this.say(this._pick(lines));
};

BuffettMascot.onCorrect = function(comboCount) {
    const mascot = this.getMascot();
    if (!mascot?.lines) return;
    if (comboCount >= 3 && mascot.lines.onCombo) {
        this.say(this._pick(mascot.lines.onCombo), 'combo');
    } else {
        this.say(this._pick(mascot.lines.onCorrect), 'correct');
    }
};

BuffettMascot.onIncorrect = function() {
    const mascot = this.getMascot();
    if (!mascot?.lines) return;
    this.say(this._pick(mascot.lines.onIncorrect), 'incorrect');
};

BuffettMascot.onGameEnd = function(pct) {
    const mascot = this.getMascot();
    if (!mascot?.personality) return;
    const endLines = {
        optimistic: pct >= 60 ? 'ניצחון! ידעתי שאתה מצליח! 🎊' : 'הפעם הבאה נעשה יותר טוב!',
        cautious: pct >= 60 ? 'ביצועים סולידיים. מרוצה.' : 'צריך לשפר את ניהול הסיכונים.',
        wise: pct >= 60 ? 'למדת טוב היום. המשך לתרגל.' : 'כל משחק הוא שיעור. חזור חזק יותר.',
        shrewd: pct >= 60 ? 'השוק שלך! עשית חיל! 🦊' : 'לא תפסו אותנו שוב. הפעם הבאה!',
        master: pct >= 60 ? 'אני גאה בך. תמשיך ללמוד ולהשקיע.' : '"אל תפסיד כסף." חזור ותרגל.'
    };
    this.say(endLines[mascot.personality] || '', pct >= 60 ? 'correct' : undefined, 6000);
};

// Refresh mascot from shop equipment
BuffettMascot.refresh = function() {
    try {
        if (window.BuffettShop) {
            const equipped = BuffettShop.getEquipped();
            const newId = equipped.mascot || 'mascot-none';
            if (newId !== this.state.currentMascotId) {
                this.state.currentMascotId = newId;
                this.createDOM();
                if (this.state.isVisible) this.show();
            }
        }
    } catch(e) {}
};

// Listen for shop equipment changes — skip if shop overlay is open
window.addEventListener('buffettShopEquipmentChanged', () => {
    const shopOverlay = document.getElementById('buffett-shop-overlay');
    if (shopOverlay && shopOverlay.classList.contains('active')) return;
    BuffettMascot.refresh();
});

// Initialization is handled by game-engine.html in the window.load listener
// to ensure correct load order: shop → office → mascot

