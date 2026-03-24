/* === game-config.js ===
 * Game configuration and utility functions
 */

// Initialize global game namespace (in case game-data.js not yet loaded)
window.BuffettGame = window.BuffettGame || {};

window.BuffettGame.config = {
    totalRounds: 10,
    specialRoundPositions: [3, 7], // 0-indexed: rounds 4 and 8
    
    // Point values by tier
    tierPoints: {
        1: 100, // Easy
        2: 150, // Medium
        3: 200, // Hard
        4: 250  // Expert
    },
    
    // Hint cost (percentage of base points)
    hintCostPercent: 0.5,
    
    // Projections unlock cost
    projectionsUnlockCost: 200,
    
    // Unlock threshold (percentage correct)
    unlockThreshold: 60,
    
    // Combo system
    comboMultipliers: [1, 1.5, 2, 2.5, 3], // Index = streak count (0, 1, 2, 3, 4+)
    
    // LocalStorage keys
    storageKeys: {
        difficulties: 'buffettGameUnlockedDifficulties',
        lifetimeScore: 'buffettGameLifetimeScore',
        highScores: 'buffettGameHighScores',
        achievements: 'buffettGameAchievements', // legacy key
        mastery: 'buffett_mastery',              // System 1
        newAchievements: 'buffett_achievements'  // System 2
    }
};

// ==============================
// UTILITY FUNCTIONS
// ==============================
window.BuffettGame.utils = {
    // Get companies for a specific difficulty
    getCompaniesForDifficulty: function(difficulty) {
        return window.BuffettGame.companies[difficulty] || [];
    },
    
    // Get events for a specific difficulty
    getEventsForDifficulty: function(difficulty) {
        return window.BuffettGame.specialEvents[difficulty] || [];
    },
    
    // Get principle by ID
    getPrinciple: function(id) {
        return window.BuffettGame.principles[id] || null;
    },
    
    // Shuffle array (Fisher-Yates)
    shuffle: function(array) {
        const shuffled = [...array];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    },
    
    // Generate game rounds for a difficulty
    generateRounds: function(difficulty) {
        const companies = this.shuffle(this.getCompaniesForDifficulty(difficulty));
        const events = this.shuffle(this.getEventsForDifficulty(difficulty));
        const config = window.BuffettGame.config;
        
        const rounds = [];
        let companyIndex = 0;
        let eventIndex = 0;
        
        for (let i = 0; i < config.totalRounds; i++) {
            if (config.specialRoundPositions.includes(i) && eventIndex < events.length) {
                rounds.push({
                    type: 'special',
                    data: events[eventIndex++]
                });
            } else if (companyIndex < companies.length) {
                rounds.push({
                    type: 'company',
                    data: companies[companyIndex++]
                });
            }
        }
        
        return rounds;
    }
};

// Signal that content is loaded
window.BuffettGame.contentLoaded = true;
console.log('BuffettGame content loaded successfully');

window.BuffettGame.metricGlossary = {
  "P/E": {
    short: "מכפיל רווח — כמה שנים ייקח להחזיר את ההשקעה מהרווחים",
    good: "נמוך יותר = זול יותר (אבל תלוי סקטור)",
    example: "P/E 10 = משלמים ₪10 על כל ₪1 רווח שנתי"
  },
  "PEG": {
    short: "מכפיל רווח חלקי צמיחה — האם המחיר מוצדק ביחס לצמיחה",
    good: "מתחת ל-1 = זול, מעל 2 = יקר",
    example: "P/E 30 עם צמיחה 30% = PEG 1.0 = הוגן"
  },
  "ROE": {
    short: "תשואה על ההון — כמה רווח החברה מייצרת מכל שקל של הון עצמי",
    good: "מעל 15% = טוב, מעל 20% = מצוין",
    example: "ROE 20% = על כל ₪100 הון, החברה מרוויחה ₪20 בשנה"
  },
  "ROIC": {
    short: "תשואה על הון מושקע — כמה רווח על כל שקל שהושקע בעסק (כולל חוב)",
    good: "מעל 15% = מצוין. ROIC > עלות ההון = יוצר ערך",
    example: "ROIC 18% = כל ₪100 שמושקעים מחזירים ₪18 בשנה"
  },
  "FCF": {
    short: "תזרים מזומנים חופשי — הכסף שנשאר אחרי כל ההוצאות וההשקעות",
    good: "חיובי ועולה = בריא. שלילי = שורף מזומן",
    example: "FCF ₪50M = ₪50M שהחברה יכולה לחלק, לרכוש, או להשקיע"
  },
  "מרווח גולמי": {
    short: "כמה נשאר מכל שקל מכירה אחרי עלות הייצור",
    good: "מעל 30% = טוב. מעל 50% = חפיר חזק",
    example: "מרווח 40% = מוכרים ב-₪100, עלות ייצור ₪60, נשאר ₪40"
  },
  "מרווח תפעולי": {
    short: "כמה נשאר מכל שקל מכירה אחרי כל ההוצאות התפעוליות",
    good: "מעל 15% = טוב. מרווח גולמי גבוה + תפעולי נמוך = בעיית הוצאות",
    example: "מרווח 12% = מכל ₪100 מכירות, ₪12 רווח תפעולי"
  },
  "חוב/הון": {
    short: "כמה חוב יש ביחס להון העצמי — מדד מינוף",
    good: "מתחת ל-0.5 = שמרני. מעל 2 = ממונף מאוד",
    example: "חוב/הון 1.5 = על כל ₪100 הון, יש ₪150 חוב"
  },
  "תשואת דיבידנד": {
    short: "כמה אחוז מהשקעה מקבלים בחזרה כדיבידנד כל שנה",
    good: "3-6% = טוב. מעל 8% = לבדוק אם בר-קיימא",
    example: "דיבידנד 5% = על כל ₪10,000 השקעה, מקבלים ₪500 בשנה"
  },
  "יחס חלוקה": {
    short: "כמה אחוז מהרווח הולך לדיבידנד",
    good: "30-60% = בריא. מעל 90% = מסוכן",
    example: "יחס 70% = מכל ₪100 רווח, ₪70 הולכים לדיבידנד"
  },
  "יחס כיסוי ריבית": {
    short: "כמה פעמים הרווח התפעולי מכסה את הוצאות הריבית",
    good: "מעל 3x = בטוח. מתחת ל-1.5x = מסוכן",
    example: "כיסוי 4x = הרווח מכסה את הריבית 4 פעמים — מרווח נוח"
  },
  "יחס מהיר": {
    short: "האם לחברה מספיק מזומן ונכסים נזילים לשלם חובות לזמן קצר",
    good: "מעל 1.5 = בטוח. מתחת ל-1 = סיכון נזילות",
    example: "יחס 2.0 = יש ₪2 נזילים על כל ₪1 חוב שוטף"
  },
  "רכישה עצמית": {
    short: "אחוז המניות שהחברה קונה בחזרה מהשוק כל שנה",
    good: "1-5% בשנה כשהמניה זולה = מעולה",
    example: "רכישה 3% = כל שנה יש 3% פחות מניות = הרווח למניה עולה"
  },
  "Backlog": {
    short: "סך ההזמנות שהתקבלו אבל טרם סופקו — נראות קדימה",
    good: "backlog של 2+ שנות הכנסה = ביטחון",
    example: "Backlog ₪500M עם הכנסות ₪200M = 2.5 שנות עבודה מובטחת"
  },
  "P/NAV": {
    short: "מחיר ביחס לשווי הנכסים הנקי — האם קונים בפחות מערך הנכסים",
    good: "מתחת ל-1 = 'קונים בהנחה' (אבל לבדוק למה)",
    example: "P/NAV 0.7 = משלמים 70 אגורות על כל ₪1 של נכסים"
  },
  "P/B": {
    short: "מחיר ביחס לערך הספרים — דומה ל-P/NAV",
    good: "מתחת ל-1 = אולי זול, אולי מלכודת",
    example: "P/B 0.5 = השוק מעריך את החברה בחצי מערכה החשבונאי"
  },
  "P/FFO": {
    short: "מכפיל לנדל\"ן מניב — כמו P/E אבל על תזרים מפעילות נדל\"ן",
    good: "8-14 = טווח נורמלי לנדל\"ן מניב",
    example: "P/FFO 10 = משלמים ₪10 על כל ₪1 תזרים שנתי מנדל\"ן"
  },
  "P/S": {
    short: "מכפיל מכירות — כמה משלמים על כל שקל הכנסה",
    good: "תלוי מאוד במרווחים. P/S 2 עם מרווח 50% = P/E 4",
    example: "P/S 5 = משלמים ₪5 על כל ₪1 מכירות"
  },
  "CET1": {
    short: "יחס הלימות הון ליבה — כמה 'כרית' יש לבנק מעל המינימום",
    good: "מעל 12% = חזק. 10% = מינימום רגולטורי",
    example: "CET1 13.5% מול מינימום 10% = 3.5% כרית ביטחון"
  },
  "NIM": {
    short: "מרווח ריבית נטו — ההפרש בין ריבית שבנק מקבל לריבית שמשלם",
    good: "מעל 2.5% = טוב לבנקאות ישראלית",
    example: "NIM 3% = הבנק מרוויח 3% על כל שקל שמלווה"
  }
};