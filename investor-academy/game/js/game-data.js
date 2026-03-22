/* === game-data.js ===
 * All game content: principles, glossary, companies, special events
 * Edit this file to add/modify questions!
 */

/* === game-content.js === */
/**
 * Investment Decision Game - Content Module
 * ==========================================
 * Contains all game content: companies, special events, principles, glossary
 * This file should be loaded BEFORE game-engine.js
 * 
 * Data structures follow the design spec schema for future reasoning system expansion
 */

// Initialize global game namespace
window.BuffettGame = window.BuffettGame || {};

// ==============================
// PRINCIPLE DEFINITIONS
// ==============================
window.BuffettGame.principles = {
    "moat": {
        id: "moat",
        name: "חפיר כלכלי (Economic Moat)",
        shortDescription: "יתרון תחרותי בר-קיימא",
        fullDescription: "עסק עם moat יכול להגן על הרווחיות שלו לאורך זמן מפני מתחרים. זה היתרון התחרותי שמאפשר לחברה לשמור על רווחיות גבוהה.",
        examples: ["מותג חזק", "עלויות מעבר", "יתרון רשת", "יתרון עלות", "פטנטים"],
        buffettQuote: "במשחק עסקי, חפיר הוא הדבר החשוב ביותר."
    },
    "value-trap": {
        id: "value-trap",
        name: "מלכודת ערך (Value Trap)",
        shortDescription: "נראה זול אבל זול מסיבה",
        fullDescription: "חברות עם P/E נמוך ותשואת דיבידנד גבוהה שאינן באמת זולות. המחיר הנמוך משקף בעיות אמיתיות בעסק.",
        redFlags: ["FCF שלילי", "ירידה במכירות", "ענף בדעיכה", "חוב גבוה", "תחלופת הנהלה"],
        buffettQuote: "עדיף לקנות חברה מצוינת במחיר הוגן מאשר חברה הוגנת במחיר מצוין."
    },
    "owner-earnings": {
        id: "owner-earnings",
        name: "רווחי בעלים (Owner Earnings)",
        shortDescription: "המזומן האמיתי שהבעלים יכולים למשוך",
        fullDescription: "לא הרווח החשבונאי, אלא התזרים שנשאר אחרי תחזוקת העסק. FCF הוא המדד האמיתי לערך.",
        formula: "FCF = תזרים תפעולי - CapEx תחזוקתי",
        buffettQuote: "הרווחים החשבונאיים הם נקודת התחלה, לא סוף הדרך."
    },
    "margin-of-safety": {
        id: "margin-of-safety",
        name: "מרווח ביטחון (Margin of Safety)",
        shortDescription: "קנייה מתחת לשווי פנימי",
        fullDescription: "הפער בין מה שאתה משלם למה שהעסק שווה. ככל שהפער גדול יותר, כך ההשקעה בטוחה יותר.",
        buffettQuote: "מחיר הוא מה שאתה משלם, ערך הוא מה שאתה מקבל."
    },
    "circle-of-competence": {
        id: "circle-of-competence",
        name: "מעגל כשירות (Circle of Competence)",
        shortDescription: "השקע רק במה שאתה מבין",
        fullDescription: "עדיף לדעת את גבולות הידע שלך ולהישאר בתוכם. אל תשקיע בעסקים שאתה לא מבין.",
        application: "העבר לערימת 'קשה מדי' כשאתה לא בטוח"
    },
    "too-hard": {
        id: "too-hard",
        name: "קשה מדי (Too Hard Pile)",
        shortDescription: "לא חייבים לשחק כל יד",
        fullDescription: "משקיעים טובים יודעים מתי לומר 'אני לא יודע'. לא כל הזדמנות שווה ניתוח.",
        mungerQuote: "אין לי מה להוסיף."
    },
    "management-quality": {
        id: "management-quality",
        name: "איכות הנהלה",
        shortDescription: "הנהלה ישרה ומוכשרת",
        fullDescription: "חפש הנהלה עם רקורד מוכח, יושרה, והתאמה של אינטרסים עם בעלי המניות.",
        signs: ["רכישת מניות ע\"י הנהלה", "תגמול מבוסס ביצועים", "שקיפות", "רקורד ארוך טווח"]
    },
    "leverage-risk": {
        id: "leverage-risk",
        name: "סיכון מינוף",
        shortDescription: "חוב מגביר סיכון",
        fullDescription: "חברות ממונפות רגישות יותר לשינויים בסביבה העסקית ובריבית. חוב גבוה יכול להרוס חברה טובה.",
        redFlags: ["יחס חוב להון גבוה", "ריבית משתנה", "כיסוי ריבית נמוך"]
    },
    "cyclical-trap": {
        id: "cyclical-trap",
        name: "מלכודת מחזוריות",
        shortDescription: "P/E נמוך בשיא המחזור",
        fullDescription: "בחברות מחזוריות, P/E נמוך יכול להופיע דווקא בשיא הרווחים, לפני ירידה.",
        warning: "היזהר מ-P/E נמוך בענפים מחזוריים"
    },
    "dividend-sustainability": {
        id: "dividend-sustainability",
        name: "קיימות דיבידנד",
        shortDescription: "האם הדיבידנד בר-קיימא?",
        fullDescription: "דיבידנד גבוה חסר משמעות אם הוא לא נתמך ב-FCF. בדוק יחס חלוקה ומגמות.",
        check: "דיבידנד / FCF < 70% לרוב בריא"
    },
    "growth-trap": {
        id: "growth-trap",
        name: "מלכודת צמיחה",
        shortDescription: "צמיחה ללא רווחיות",
        fullDescription: "צמיחה במכירות לא שווה כלום אם החברה לא מרוויחה. שריפת מזומנים לצמיחה היא דגל אדום.",
        warning: "הכנסות גדלות + FCF שלילי = בעיה"
    },
    "turnaround": {
        id: "turnaround",
        name: "סיפור שיקום (Turnaround)",
        shortDescription: "חברה בתהליך התאוששות",
        fullDescription: "חברה עם בעיות שמראה סימני שיפור יכולה להיות הזדמנות, אך דורשת ניתוח זהיר.",
        signs: ["הנהלה חדשה מוכחת", "שיפור ב-FCF", "צמצום הפסדים", "נכסים מוחשיים"]
    }
};

// ==============================
// GLOSSARY TERMS
// ==============================
window.BuffettGame.glossary = [
    { term: "P/E", definition: "יחס מחיר לרווח - מחיר המניה חלקי רווח למניה." },
    { term: "ROE", definition: "תשואה על ההון - רווח נקי חלקי הון עצמי." },
    { term: "ROIC", definition: "תשואה על ההון המושקע - מדד יעילות השימוש בהון." },
    { term: "FCF", definition: "תזרים מזומנים חופשי - המזומן שנשאר אחרי השקעות." },
    { term: "Buyback", definition: "רכישה עצמית של מניות - מפחיתה מספר מניות ומעלה EPS." },
    { term: "Economic Moat", definition: "חפיר כלכלי - יתרון תחרותי בר-קיימא." },
    { term: "יחס חוב להון", definition: "היחס בין חוב להון עצמי - מדד למינוף." },
    { term: "תשואת דיבידנד", definition: "הדיבידנד השנתי חלקי מחיר המניה." },
    { term: "שולי רווח נקי", definition: "רווח נקי חלקי הכנסות - כמה נשאר מכל שקל." },
    { term: "יחס שוטף", definition: "נכסים שוטפים חלקי התחייבויות שוטפות." },
    { term: "ROA", definition: "תשואה על הנכסים - רווח נקי חלקי סך הנכסים." },
    { term: "FCF Yield", definition: "תשואת תזרים חופשי - FCF חלקי שווי שוק." },
    { term: "P/B", definition: "יחס מחיר לערך פנקסני - מחיר מניה חלקי הון למניה." },
    { term: "EV/EBITDA", definition: "שווי פירמה חלקי רווח תפעולי לפני פחת." },
    { term: "PEG", definition: "P/E חלקי צמיחה צפויה - מתקן P/E לצמיחה." },
    { term: "EBITDA", definition: "רווח לפני ריבית, מסים, פחת והפחתות." },
    { term: "Working Capital", definition: "הון חוזר - נכסים שוטפים פחות התחייבויות שוטפות." },
    { term: "CapEx", definition: "השקעות הוניות - רכישת נכסים קבועים." },
    { term: "ARR", definition: "הכנסות שנתיות חוזרות - מדד מפתח ב-SaaS." },
    { term: "Net Revenue Retention", definition: "שימור הכנסות נטו - כמה הכנסות נשמרות מלקוחות קיימים." }
];

// ==============================
// COMPANIES DATA
// ==============================
window.BuffettGame.companies = {
    easy: [
        {
            id: "jewelry-chain-01",
            name: "רשתות זהב בע\"מ",
            sector: "קמעונאות",
            symbol: "ZHAV",
            price: 85.30,
            tier: 1,
            description: "רשת חנויות תכשיטים ותיקה עם 50 סניפים ברחבי הארץ, מתמחה בתכשיטי זהב ויהלומים.",
            management: "משפחת המייסדים מנהלת את החברה כבר 30 שנה. המנכ\"ל הנוכחי בן המייסד, בתפקיד 15 שנה.",
            moat: "מותג מוכר, מוניטין של עשרות שנים, קשרים ארוכי טווח עם ספקים, מיקומים מרכזיים.",
            events: "צמיחה יציבה במכירות, פתיחת סניפים חדשים, התרחבות למכירות אונליין.",
            metrics: {
                basic: [
                    { name: "P/E", value: "12.5" },
                    { name: "ROE", value: "18%" },
                    { name: "תשואת דיבידנד", value: "4.2%" }
                ],
                advanced: [
                    { name: "ROIC", value: "20%" },
                    { name: "FCF (מיליון ₪)", value: "120" },
                    { name: "FCF Yield", value: "5.8%" }
                ]
            },
            historicalData: [
                { year: 2019, revenue: 800, fcf: 80 },
                { year: 2020, revenue: 750, fcf: 70 },
                { year: 2021, revenue: 850, fcf: 90 },
                { year: 2022, revenue: 950, fcf: 105 },
                { year: 2023, revenue: 1050, fcf: 120 }
            ],
            projectedData: [
                { year: 2024, revenue: 1150, fcf: 135 },
                { year: 2025, revenue: 1250, fcf: 150 }
            ],
            correctDecision: "buy",
            pointValue: 100,
            hints: [
                { cost: 0.5, text: "בדקו את היחסים הפיננסיים ואת יציבות תזרים המזומנים." }
            ],
            feedback: {
                principle: { id: "moat", name: "חפיר כלכלי" },
                decisiveSignals: ["FCF עולה בעקביות", "ROE גבוה ויציב", "הנהלה עם רקורד של 30 שנה"],
                correctExplanation: "החלטה מצוינת! חברה עם הנהלה יציבה, מותג חזק, P/E נמוך ותזרים מזומנים עקבי.",
                incorrectExplanation: "החמצה! החברה מציגה יסודות חזקים עם תמחור אטרקטיבי ותזרים מזומנים יציב."
            },
            // For backward compatibility
            isGoodValue: true,
            difficulty: "easy",
            difficultyValue: 1,
            hint: "בדקו את היחסים הפיננסיים ואת יציבות תזרים המזומנים."
        },
        {
            id: "metaverse-startup-01",
            name: "טכנו-חלום בע\"מ",
            sector: "טכנולוגיה",
            symbol: "THLM",
            price: 250.00,
            tier: 1,
            description: "חברת סטארט-אפ המפתחת פלטפורמת מטאוורס למסחר וירטואלי.",
            management: "צוות מייסדים צעיר בגיל 25 בממוצע, ללא ניסיון ניהולי קודם.",
            moat: "טכנולוגיה חדשנית אך עדיין לא מוכחת, תחרות עזה מול ענקיות טכנולוגיה.",
            events: "גיוס הון סיכון אחרון ב-2 מיליארד ₪ הערכה, שריפת מזומנים מהירה לצורך צמיחה.",
            metrics: {
                basic: [
                    { name: "P/E", value: "N/A - אין רווחים" },
                    { name: "ROE", value: "-45%" },
                    { name: "תשואת דיבידנד", value: "0%" }
                ],
                advanced: [
                    { name: "ROIC", value: "-60%" },
                    { name: "FCF (מיליון ₪)", value: "-500" },
                    { name: "שריפת מזומנים רבעונית", value: "125 מיליון ₪" }
                ]
            },
            historicalData: [
                { year: 2019, revenue: 0, fcf: -50 },
                { year: 2020, revenue: 5, fcf: -100 },
                { year: 2021, revenue: 20, fcf: -200 },
                { year: 2022, revenue: 50, fcf: -350 },
                { year: 2023, revenue: 100, fcf: -500 }
            ],
            projectedData: [
                { year: 2024, revenue: 200, fcf: -600 },
                { year: 2025, revenue: 400, fcf: -700 }
            ],
            correctDecision: "pass",
            pointValue: 100,
            hints: [
                { cost: 0.5, text: "האם החברה מייצרת רווחים או לפחות תזרים מזומנים חיובי?" }
            ],
            feedback: {
                principle: { id: "growth-trap", name: "מלכודת צמיחה" },
                decisiveSignals: ["FCF שלילי מתמשך ומחמיר", "אין רווחים", "מודל עסקי לא מוכח"],
                correctExplanation: "נכון! הימנעות מחברות צמיחה ספקולטיביות ללא רווחיות היא עיקרון בסיסי בהשקעות ערך.",
                incorrectExplanation: "טעות! חברה ללא רווחים, שריפת מזומנים ענקית ומודל עסקי לא מוכח."
            },
            isGoodValue: false,
            difficulty: "easy",
            difficultyValue: 1,
            hint: "האם החברה מייצרת רווחים או לפחות תזרים מזומנים חיובי?"
        },
        {
            id: "dairy-producer-01",
            name: "מחלבות הצפון",
            sector: "מזון ומשקאות",
            symbol: "MHLB",
            price: 42.50,
            tier: 1,
            description: "יצרנית מוצרי חלב מובילה עם קו מוצרים רחב הכולל חלב, גבינות ויוגורטים.",
            management: "הנהלה מקצועית עם ממוצע של 20 שנות ניסיון בתעשייה. מנכ\"ל עם רקורד מוכח.",
            moat: "מותגים חזקים, רשת הפצה רחבה, יתרון לגודל, נאמנות צרכנים גבוהה.",
            events: "עלייה במחירי חומרי גלם, אך העברה מוצלחת של עלויות לצרכנים. צמיחה באורגני.",
            metrics: {
                basic: [
                    { name: "P/E", value: "14.2" },
                    { name: "ROE", value: "22%" },
                    { name: "תשואת דיבידנד", value: "3.8%" }
                ],
                advanced: [
                    { name: "ROIC", value: "25%" },
                    { name: "FCF (מיליון ₪)", value: "180" },
                    { name: "שולי רווח נקי", value: "12%" }
                ]
            },
            historicalData: [
                { year: 2019, revenue: 1200, fcf: 120 },
                { year: 2020, revenue: 1300, fcf: 140 },
                { year: 2021, revenue: 1400, fcf: 150 },
                { year: 2022, revenue: 1550, fcf: 165 },
                { year: 2023, revenue: 1700, fcf: 180 }
            ],
            projectedData: [
                { year: 2024, revenue: 1850, fcf: 195 },
                { year: 2025, revenue: 2000, fcf: 210 }
            ],
            correctDecision: "buy",
            pointValue: 100,
            hints: [
                { cost: 0.5, text: "חברות מזון עם מותגים חזקים הן לעיתים השקעות ערך טובות." }
            ],
            feedback: {
                principle: { id: "moat", name: "חפיר כלכלי" },
                decisiveSignals: ["מותגים חזקים", "FCF עולה בעקביות", "ROIC גבוה של 25%"],
                correctExplanation: "מעולה! חברת מזון עם מותגים חזקים, הנהלה איכותית ותזרים מזומנים יציב.",
                incorrectExplanation: "פספוס! החברה מציגה את כל המאפיינים של השקעת ערך איכותית."
            },
            isGoodValue: true,
            difficulty: "easy",
            difficultyValue: 1,
            hint: "חברות מזון עם מותגים חזקים הן לעיתים השקעות ערך טובות."
        },
        {
            id: "fashion-retailer-trap-01",
            name: "אופנת הרחוב",
            sector: "אופנה וטקסטיל",
            symbol: "OFNA",
            price: 15.20,
            tier: 1,
            description: "רשת חנויות אופנה מהירה עם 120 סניפים, מתמחה באופנת צעירים.",
            management: "תחלופת מנכ\"לים גבוהה - 3 מנכ\"לים ב-5 שנים אחרונות.",
            moat: "תחרות עזה מול ענקיות בינלאומיות ומסחר אונליין, אין יתרון תחרותי ברור.",
            events: "ירידה במכירות בחנויות הפיזיות, מלאי גבוה, סגירת סניפים לא רווחיים.",
            metrics: {
                basic: [
                    { name: "P/E", value: "6.5" },
                    { name: "ROE", value: "5%" },
                    { name: "תשואת דיבידנד", value: "8.5%" }
                ],
                advanced: [
                    { name: "ROIC", value: "3%" },
                    { name: "FCF (מיליון ₪)", value: "-20" },
                    { name: "יחס מלאי למכירות", value: "מדאיג - 25%" }
                ]
            },
            historicalData: [
                { year: 2019, revenue: 600, fcf: 30 },
                { year: 2020, revenue: 400, fcf: -50 },
                { year: 2021, revenue: 450, fcf: -30 },
                { year: 2022, revenue: 480, fcf: -10 },
                { year: 2023, revenue: 500, fcf: -20 }
            ],
            projectedData: [
                { year: 2024, revenue: 520, fcf: -15 },
                { year: 2025, revenue: 540, fcf: -10 }
            ],
            correctDecision: "pass",
            pointValue: 100,
            hints: [
                { cost: 0.5, text: "דיבידנד גבוה לפעמים מסתיר בעיות בעסק הליבה. בדקו אם ה-FCF תומך בתשלום." }
            ],
            feedback: {
                principle: { id: "value-trap", name: "מלכודת ערך" },
                decisiveSignals: ["FCF שלילי מתמשך", "תחלופת הנהלה גבוהה", "אין moat מול תחרות"],
                counterSignalExplanation: "P/E נמוך ותשואת דיבידנד גבוהה נראים אטרקטיביים, אבל כשה-FCF שלילי - החברה לא באמת מייצרת ערך.",
                correctExplanation: "החלטה נכונה! למרות התמחור הנמוך, החברה סובלת מבעיות מבניות. זו מלכודת ערך קלאסית.",
                incorrectExplanation: "זהירות! מלכודת ערך קלאסית - P/E נמוך אבל עסק בדעיכה עם FCF שלילי."
            },
            isGoodValue: false,
            difficulty: "easy",
            difficultyValue: 1,
            hint: "דיבידנד גבוה לפעמים מסתיר בעיות בעסק הליבה."
        },
        {
            id: "insurance-stable-01",
            name: "ביטוח ישיר פלוס",
            sector: "ביטוח",
            symbol: "BITP",
            price: 68.90,
            tier: 1,
            description: "חברת ביטוח ותיקה המתמחה בביטוחי רכב, דירה וחיים עם מיליון לקוחות.",
            management: "צוות ניהול יציב עם ניסיון עשיר בתחום הביטוח. תרבות של זהירות וניהול סיכונים.",
            moat: "מותג מוכר, עלויות מעבר גבוהות, רגולציה שמקשה על כניסת מתחרים חדשים.",
            events: "צמיחה יציבה בפרמיות, שיפור ביחס התביעות, השקעות שמרניות.",
            metrics: {
                basic: [
                    { name: "P/E", value: "11.8" },
                    { name: "ROE", value: "15%" },
                    { name: "תשואת דיבידנד", value: "4.5%" }
                ],
                advanced: [
                    { name: "יחס משולב", value: "92%" },
                    { name: "FCF (מיליון ₪)", value: "250" },
                    { name: "יחס הון עצמי", value: "185%" }
                ]
            },
            historicalData: [
                { year: 2019, revenue: 1800, fcf: 180 },
                { year: 2020, revenue: 1900, fcf: 200 },
                { year: 2021, revenue: 2050, fcf: 210 },
                { year: 2022, revenue: 2200, fcf: 230 },
                { year: 2023, revenue: 2350, fcf: 250 }
            ],
            projectedData: [
                { year: 2024, revenue: 2500, fcf: 270 },
                { year: 2025, revenue: 2650, fcf: 290 }
            ],
            correctDecision: "buy",
            pointValue: 100,
            hints: [
                { cost: 0.5, text: "חברות ביטוח עם יחס משולב נמוך מ-100% הן רווחיות." }
            ],
            feedback: {
                principle: { id: "moat", name: "חפיר כלכלי" },
                decisiveSignals: ["יחס משולב 92% - רווחי", "FCF עולה בעקביות", "עלויות מעבר גבוהות"],
                correctExplanation: "מצוין! חברת ביטוח יציבה עם יחס משולב טוב, תזרים חזק ותמחור הוגן.",
                incorrectExplanation: "החמצה! חברות ביטוח שמרניות עם ניהול טוב הן השקעות ערך קלאסיות."
            },
            isGoodValue: true,
            difficulty: "easy",
            difficultyValue: 1,
            hint: "חברות ביטוח עם יחס משולב נמוך מ-100% הן רווחיות."
        },
        {
            id: "gym-chain-01",
            name: "רשת כושר 24/7",
            sector: "פנאי וספורט",
            symbol: "KSHR",
            price: 35.00,
            tier: 1,
            description: "רשת מכוני כושר עם 80 סניפים, מודל מנויים חודשי.",
            management: "הנהלה חדשה מנסה להפוך את החברה לרווחית אחרי שנים של הפסדים.",
            moat: "תחרות גבוהה, עלויות מעבר נמוכות, תחלופת לקוחות גבוהה.",
            events: "קשיים בגיוס מנויים חדשים, עלויות תפעול גבוהות, תחרות מאפליקציות כושר ביתיות.",
            metrics: {
                basic: [
                    { name: "P/E", value: "45" },
                    { name: "ROE", value: "-12%" },
                    { name: "תשואת דיבידנד", value: "0%" }
                ],
                advanced: [
                    { name: "ROIC", value: "-8%" },
                    { name: "FCF (מיליון ₪)", value: "-80" },
                    { name: "יחס חוב להון", value: "2.5" }
                ]
            },
            historicalData: [
                { year: 2019, revenue: 400, fcf: 20 },
                { year: 2020, revenue: 200, fcf: -100 },
                { year: 2021, revenue: 300, fcf: -60 },
                { year: 2022, revenue: 350, fcf: -70 },
                { year: 2023, revenue: 380, fcf: -80 }
            ],
            projectedData: [
                { year: 2024, revenue: 400, fcf: -70 },
                { year: 2025, revenue: 420, fcf: -60 }
            ],
            correctDecision: "pass",
            pointValue: 100,
            hints: [
                { cost: 0.5, text: "עסקים עם עלויות קבועות גבוהות ותחלופת לקוחות גבוהה הם בעייתיים." }
            ],
            feedback: {
                principle: { id: "moat", name: "חפיר כלכלי (חסר)" },
                decisiveSignals: ["FCF שלילי מתמשך", "חוב גבוה", "אין moat - תחרות קלה"],
                correctExplanation: "נכון! מכוני כושר הם עסק קשה עם מחסומי כניסה נמוכים ונאמנות לקוחות חלשה.",
                incorrectExplanation: "טעות! מודל עסקי בעייתי עם FCF שלילי מתמשך וחוב גבוה."
            },
            isGoodValue: false,
            difficulty: "easy",
            difficultyValue: 1,
            hint: "עסקים עם עלויות קבועות גבוהות ותחלופת לקוחות גבוהה הם בעייתיים."
        },
        {
            id: "pharma-generic-01",
            name: "פארמה ישראל",
            sector: "פארמה",
            symbol: "FARM",
            price: 125.50,
            tier: 1,
            description: "חברת תרופות גנריות עם מפעל ייצור מקומי ויצוא ל-30 מדינות.",
            management: "מנכ\"ל עם 25 שנות ניסיון בתעשייה, צוות מדעי מוביל.",
            moat: "פטנטים על תהליכי ייצור, אישורי FDA, קשרי לקוחות ארוכי טווח.",
            events: "אישורים רגולטוריים חדשים, צמיחה ביצוא, השקעות במו\"פ.",
            metrics: {
                basic: [
                    { name: "P/E", value: "16.5" },
                    { name: "ROE", value: "20%" },
                    { name: "תשואת דיבידנד", value: "3.2%" }
                ],
                advanced: [
                    { name: "ROIC", value: "18%" },
                    { name: "FCF (מיליון ₪)", value: "220" },
                    { name: "השקעה במו\"פ", value: "8% מהמכירות" }
                ]
            },
            historicalData: [
                { year: 2019, revenue: 1100, fcf: 150 },
                { year: 2020, revenue: 1250, fcf: 170 },
                { year: 2021, revenue: 1400, fcf: 190 },
                { year: 2022, revenue: 1550, fcf: 205 },
                { year: 2023, revenue: 1700, fcf: 220 }
            ],
            projectedData: [
                { year: 2024, revenue: 1850, fcf: 240 },
                { year: 2025, revenue: 2000, fcf: 260 }
            ],
            correctDecision: "buy",
            pointValue: 100,
            hints: [
                { cost: 0.5, text: "חברות פארמה עם פטנטים וצמיחה יציבה הן השקעות טובות." }
            ],
            feedback: {
                principle: { id: "moat", name: "חפיר כלכלי" },
                decisiveSignals: ["פטנטים ואישורי FDA", "FCF עולה בעקביות", "ROIC גבוה"],
                correctExplanation: "מעולה! חברת פארמה עם יתרונות תחרותיים, צמיחה יציבה ותזרים חזק.",
                incorrectExplanation: "פספוס! החברה מציגה את כל הסימנים של השקעת ערך איכותית."
            },
            isGoodValue: true,
            difficulty: "easy",
            difficultyValue: 1,
            hint: "חברות פארמה עם פטנטים וצמיחה יציבה הן השקעות טובות."
        },
        {
            id: "crypto-platform-01",
            name: "קריפטו-טרייד",
            sector: "פינטק",
            symbol: "CRPT",
            price: 180.00,
            tier: 1,
            description: "פלטפורמת מסחר במטבעות דיגיטליים עם צמיחה מהירה.",
            management: "מייסדים צעירים מעולם הקריפטו, ללא ניסיון בשווקים פיננסיים מסורתיים.",
            moat: "שוק תנודתי מאוד, רגולציה לא ברורה, תחרות מבורסות גלובליות.",
            events: "תנודתיות קיצונית בהכנסות בהתאם לשוק הקריפטו, חקירות רגולטוריות.",
            metrics: {
                basic: [
                    { name: "P/E", value: "85" },
                    { name: "ROE", value: "35%" },
                    { name: "תשואת דיבידנד", value: "0%" }
                ],
                advanced: [
                    { name: "ROIC", value: "תנודתי מאוד" },
                    { name: "FCF (מיליון ₪)", value: "150 (תנודתי)" },
                    { name: "תלות בשוק קריפטו", value: "95%" }
                ]
            },
            historicalData: [
                { year: 2019, revenue: 50, fcf: 10 },
                { year: 2020, revenue: 200, fcf: 80 },
                { year: 2021, revenue: 800, fcf: 400 },
                { year: 2022, revenue: 300, fcf: -50 },
                { year: 2023, revenue: 500, fcf: 150 }
            ],
            projectedData: [
                { year: 2024, revenue: 600, fcf: 200 },
                { year: 2025, revenue: 700, fcf: 250 }
            ],
            correctDecision: "pass",
            pointValue: 100,
            hints: [
                { cost: 0.5, text: "באפט נמנע מעסקים שהוא לא מבין או תנודתיים מדי." }
            ],
            feedback: {
                principle: { id: "circle-of-competence", name: "מעגל כשירות" },
                decisiveSignals: ["תנודתיות קיצונית בהכנסות", "סיכון רגולטורי", "תלות בשוק ספקולטיבי"],
                correctExplanation: "נכון! הימנעות מעסקים ספקולטיביים ותנודתיים היא עיקרון בסיסי.",
                incorrectExplanation: "טעות! עסק ספקולטיבי מאוד עם הכנסות תנודתיות וחוסר וודאות רגולטורית."
            },
            isGoodValue: false,
            difficulty: "easy",
            difficultyValue: 1,
            hint: "באפט נמנע מעסקים שהוא לא מבין או תנודתיים מדי."
        },
        {
            id: "reit-quality-01",
            name: "נדל\"ן מניב",
            sector: "נדל\"ן",
            symbol: "NADL",
            price: 55.00,
            tier: 1,
            description: "חברת נדל\"ן המחזיקה 50 נכסים מסחריים באזורי ביקוש.",
            management: "הנהלה מנוסה עם רקורד של 20 שנה בתחום הנדל\"ן המניב.",
            moat: "נכסים באיכות גבוהה במיקומים מרכזיים, חוזי שכירות ארוכי טווח.",
            events: "תפוסה של 95%, חידוש חוזים במחירים גבוהים יותר, רכישת נכסים חדשים.",
            metrics: {
                basic: [
                    { name: "P/FFO", value: "12" },
                    { name: "ROE", value: "12%" },
                    { name: "תשואת דיבידנד", value: "6.5%" }
                ],
                advanced: [
                    { name: "יחס חוב ל-EBITDA", value: "5.5" },
                    { name: "FFO (מיליון ₪)", value: "180" },
                    { name: "תפוסה ממוצעת", value: "95%" }
                ]
            },
            historicalData: [
                { year: 2019, revenue: 280, fcf: 140 },
                { year: 2020, revenue: 270, fcf: 130 },
                { year: 2021, revenue: 290, fcf: 150 },
                { year: 2022, revenue: 310, fcf: 165 },
                { year: 2023, revenue: 330, fcf: 180 }
            ],
            projectedData: [
                { year: 2024, revenue: 350, fcf: 195 },
                { year: 2025, revenue: 370, fcf: 210 }
            ],
            correctDecision: "buy",
            pointValue: 100,
            hints: [
                { cost: 0.5, text: "בדקו האם התזרים מצדיק את התמחור, ומה רמת הביטחון בהכנסות העתידיות." }
            ],
            feedback: {
                principle: { id: "owner-earnings", name: "רווחי בעלים" },
                decisiveSignals: ["תפוסה 95%", "FFO יציב ועולה", "נכסים במיקומים מרכזיים"],
                correctExplanation: "נכון! REIT איכותי עם נכסים טובים, תפוסה גבוהה ודיבידנד אטרקטיבי.",
                incorrectExplanation: "החמצה! נדל\"ן מניב עם תזרים יציב הוא השקעה שמרנית טובה."
            },
            isGoodValue: true,
            difficulty: "easy",
            difficultyValue: 1,
            hint: "בדקו האם התזרים מצדיק את התמחור, ומה רמת הביטחון בהכנסות העתידיות."
        },
        {
            id: "gaming-mobile-01",
            name: "גיימינג פרו",
            sector: "בידור דיגיטלי",
            symbol: "GAME",
            price: 95.00,
            tier: 1,
            description: "מפתחת משחקי מובייל עם מיליוני הורדות.",
            management: "צוות פיתוח מוכשר אך חוסר ניסיון עסקי. תחלופה גבוהה.",
            moat: "תחרות עצומה, תלות במשחק בודד להכנסות, מחזור חיים קצר למשחקים.",
            events: "ירידה בהורדות המשחק הראשי, עיכובים בפיתוח משחקים חדשים.",
            metrics: {
                basic: [
                    { name: "P/E", value: "50" },
                    { name: "ROE", value: "8%" },
                    { name: "תשואת דיבידנד", value: "0%" }
                ],
                advanced: [
                    { name: "ROIC", value: "5%" },
                    { name: "FCF (מיליון ₪)", value: "30" },
                    { name: "תלות במשחק יחיד", value: "75% מההכנסות" }
                ]
            },
            historicalData: [
                { year: 2019, revenue: 100, fcf: 20 },
                { year: 2020, revenue: 200, fcf: 60 },
                { year: 2021, revenue: 350, fcf: 80 },
                { year: 2022, revenue: 300, fcf: 40 },
                { year: 2023, revenue: 280, fcf: 30 }
            ],
            projectedData: [
                { year: 2024, revenue: 260, fcf: 25 },
                { year: 2025, revenue: 250, fcf: 20 }
            ],
            correctDecision: "pass",
            pointValue: 100,
            hints: [
                { cost: 0.5, text: "תלות בהיט יחיד וירידה במגמה הם סימני אזהרה." }
            ],
            feedback: {
                principle: { id: "moat", name: "חפיר כלכלי (חסר)" },
                decisiveSignals: ["תלות במוצר יחיד", "מגמת ירידה בהכנסות", "P/E גבוה יחסית לצמיחה"],
                correctExplanation: "נכון! תלות גבוהה במשחק אחד ומגמת ירידה מצדיקים הימנעות.",
                incorrectExplanation: "טעות! ענף תנודתי עם תלות במוצר יחיד ומגמה שלילית."
            },
            isGoodValue: false,
            difficulty: "easy",
            difficultyValue: 1,
            hint: "תלות בהיט יחיד וירידה במגמה הם סימני אזהרה."
        },
        {
            id: "bakery-chain-01",
            name: "לחם הארץ בע\"מ",
            sector: "מזון",
            symbol: "LHMA",
            price: 62.40,
            tier: 1,
            description: "רשת מאפיות עם 80 סניפים ברחבי הארץ, מוכרת לחמים, עוגות ומאפים טריים.",
            management: "מנכ\"ל עם 20 שנות ניסיון בתעשיית המזון. הנהלה יציבה עם תחלופה נמוכה.",
            moat: "מותג חזק, מיקומים אסטרטגיים, מתכונים ייחודיים שהפכו לסטנדרט, נאמנות לקוחות גבוהה.",
            events: "פתיחת קו מוצרים בריאותיים, כניסה לרשתות סופר, צמיחה יציבה.",
            metrics: {
                basic: [
                    { name: "P/E", value: "11.2" },
                    { name: "ROE", value: "22%" },
                    { name: "תשואת דיבידנד", value: "3.8%" }
                ],
                advanced: [
                    { name: "ROIC", value: "19%" },
                    { name: "FCF (מיליון ₪)", value: "95" },
                    { name: "FCF Yield", value: "6.1%" }
                ]
            },
            historicalData: [
                { year: 2019, revenue: 620, fcf: 65 },
                { year: 2020, revenue: 680, fcf: 72 },
                { year: 2021, revenue: 740, fcf: 80 },
                { year: 2022, revenue: 810, fcf: 88 },
                { year: 2023, revenue: 880, fcf: 95 }
            ],
            projectedData: [
                { year: 2024, revenue: 950, fcf: 105 },
                { year: 2025, revenue: 1030, fcf: 115 }
            ],
            correctDecision: "buy",
            pointValue: 100,
            hints: [{ cost: 0.5, text: "שימו לב לעקביות הצמיחה בהכנסות ובתזרים המזומנים." }],
            feedback: {
                principle: { id: "moat", name: "חפיר כלכלי" },
                decisiveSignals: ["FCF עולה בעקביות 5 שנים", "ROE מעל 20%", "מותג חזק עם נאמנות"],
                correctExplanation: "מצוין! חברת מזון יציבה עם חפיר תחרותי, תמחור נמוך ותזרים מזומנים חזק.",
                incorrectExplanation: "החמצה! P/E נמוך עם צמיחה עקבית ו-FCF חזק — סימנים קלאסיים להשקעת ערך."
            },
            isGoodValue: true, difficulty: "easy", difficultyValue: 1,
            hint: "שימו לב לעקביות הצמיחה בהכנסות ובתזרים המזומנים."
        },
        {
            id: "ev-startup-01",
            name: "אלקטרו-נוסע בע\"מ",
            sector: "רכב חשמלי",
            symbol: "ELNS",
            price: 320.00,
            tier: 1,
            description: "סטארט-אפ ישראלי המפתח רכב חשמלי עירוני. טרם התחיל ייצור המוני.",
            management: "צוות מהנדסים צעירים. המנכ\"ל בן 32, ללא ניסיון ניהולי קודם בתעשיית הרכב.",
            moat: "פטנט על טכנולוגיית סוללה חדשה, אבל טרם הוכחה בשטח. תחרות עזה מיצרני רכב גדולים.",
            events: "גיוס הון גדול, אבל ביטול עסקת שיתוף פעולה עם יצרן אירופי. עיכובים בלוח הזמנים.",
            metrics: {
                basic: [
                    { name: "P/E", value: "N/A (הפסדי)" },
                    { name: "ROE", value: "-45%" },
                    { name: "תשואת דיבידנד", value: "0%" }
                ],
                advanced: [
                    { name: "ROIC", value: "-30%" },
                    { name: "FCF (מיליון ₪)", value: "-180" },
                    { name: "שריפת מזומנים חודשית", value: "15M ₪" }
                ]
            },
            historicalData: [
                { year: 2019, revenue: 0, fcf: -20 },
                { year: 2020, revenue: 2, fcf: -50 },
                { year: 2021, revenue: 5, fcf: -90 },
                { year: 2022, revenue: 8, fcf: -140 },
                { year: 2023, revenue: 12, fcf: -180 }
            ],
            projectedData: [
                { year: 2024, revenue: 30, fcf: -220 },
                { year: 2025, revenue: 80, fcf: -250 }
            ],
            correctDecision: "pass",
            pointValue: 100,
            hints: [{ cost: 0.5, text: "בדקו אם החברה מייצרת מזומנים או שורפת אותם." }],
            feedback: {
                principle: { id: "circle-of-competence", name: "מעגל כשירות" },
                decisiveSignals: ["הפסדים הולכים וגדלים", "אין הכנסות משמעותיות", "שריפת מזומנים מואצת"],
                correctExplanation: "נכון! חברה ספקולטיבית ללא רווחים, שורפת מזומנים ועם תחרות עצומה.",
                incorrectExplanation: "טעות! באפט מעולם לא משקיע בחברות שאינן מייצרות רווחים — זה מחוץ למעגל הכשירות."
            },
            isGoodValue: false, difficulty: "easy", difficultyValue: 1,
            hint: "בדקו אם החברה מייצרת מזומנים או שורפת אותם."
        },
        {
            id: "water-utility-01",
            name: "מי שפע בע\"מ",
            sector: "תשתיות",
            symbol: "MYSH",
            price: 44.80,
            tier: 1,
            description: "חברת תשתיות מים המספקת שירותי מים וביוב ל-15 רשויות מקומיות. מונופול אזורי.",
            management: "הנהלה מנוסה עם ממוצע 18 שנות ותק. מדיניות דיבידנד יציבה ועקבית.",
            moat: "מונופול רגולטורי — אין תחרות ישירה. חוזים ארוכי טווח עם רשויות.",
            events: "אישור העלאת תעריפים 3%, השקעה בתשתיות חדשות, חוזה 20 שנה מול עירייה.",
            metrics: {
                basic: [
                    { name: "P/E", value: "14.5" },
                    { name: "ROE", value: "15%" },
                    { name: "תשואת דיבידנד", value: "5.1%" }
                ],
                advanced: [
                    { name: "ROIC", value: "12%" },
                    { name: "FCF (מיליון ₪)", value: "78" },
                    { name: "FCF Yield", value: "7.2%" }
                ]
            },
            historicalData: [
                { year: 2019, revenue: 420, fcf: 60 },
                { year: 2020, revenue: 435, fcf: 63 },
                { year: 2021, revenue: 450, fcf: 67 },
                { year: 2022, revenue: 470, fcf: 72 },
                { year: 2023, revenue: 490, fcf: 78 }
            ],
            projectedData: [
                { year: 2024, revenue: 510, fcf: 83 },
                { year: 2025, revenue: 530, fcf: 88 }
            ],
            correctDecision: "buy",
            pointValue: 100,
            hints: [{ cost: 0.5, text: "חפשו יתרון תחרותי שלא ניתן לשכפל." }],
            feedback: {
                principle: { id: "moat", name: "חפיר כלכלי" },
                decisiveSignals: ["מונופול רגולטורי", "תזרים מזומנים יציב", "תשואת דיבידנד גבוהה"],
                correctExplanation: "מצוין! מונופול טבעי עם הכנסות צפויות ודיבידנד יציב — השקעת ערך קלאסית.",
                incorrectExplanation: "החמצה! חברת מונופול עם תזרים יציב ותשואת דיבידנד מעל 5% — פספוס."
            },
            isGoodValue: true, difficulty: "easy", difficultyValue: 1,
            hint: "חפשו יתרון תחרותי שלא ניתן לשכפל."
        },
        {
            id: "fashion-ecommerce-01",
            name: "טרנד-נט בע\"מ",
            sector: "אי-קומרס",
            symbol: "TRNT",
            price: 180.00,
            tier: 1,
            description: "אתר מכירות אופנה אונליין שצמח מהר בקורונה. מוכר מותגים בינלאומיים בהנחות.",
            management: "מנכ\"ל צעיר ודינמי אך מחליף אסטרטגיה כל שנה. תחלופת סמנכ\"לים גבוהה.",
            moat: "אין יתרון תחרותי ברור — תחרות עזה מאליאקספרס, שיין וחנויות מקומיות.",
            events: "עלייה חדה במכירות ב-2021, ירידה בחזרה ב-2022-2023. ניסיון כושל להיכנס לשוק האירופי.",
            metrics: {
                basic: [
                    { name: "P/E", value: "45" },
                    { name: "ROE", value: "5%" },
                    { name: "תשואת דיבידנד", value: "0%" }
                ],
                advanced: [
                    { name: "ROIC", value: "4%" },
                    { name: "FCF (מיליון ₪)", value: "8" },
                    { name: "עלות שיווק/הכנסה", value: "35%" }
                ]
            },
            historicalData: [
                { year: 2019, revenue: 120, fcf: 5 },
                { year: 2020, revenue: 250, fcf: 20 },
                { year: 2021, revenue: 380, fcf: 30 },
                { year: 2022, revenue: 280, fcf: 10 },
                { year: 2023, revenue: 240, fcf: 8 }
            ],
            projectedData: [
                { year: 2024, revenue: 220, fcf: 3 },
                { year: 2025, revenue: 200, fcf: -5 }
            ],
            correctDecision: "pass",
            pointValue: 100,
            hints: [{ cost: 0.5, text: "בדקו את מגמת ההכנסות — האם הצמיחה בת-קיימא?" }],
            feedback: {
                principle: { id: "moat", name: "חפיר כלכלי (חסר)" },
                decisiveSignals: ["הכנסות יורדות", "P/E גבוה מאוד", "אין חפיר תחרותי"],
                correctExplanation: "נכון! חברה ללא חפיר, עם הכנסות יורדות ו-P/E מנופח — לא השקעת ערך.",
                incorrectExplanation: "טעות! הצמיחה הייתה חד-פעמית (קורונה), אין חפיר ותחרות עצומה."
            },
            isGoodValue: false, difficulty: "easy", difficultyValue: 1,
            hint: "בדקו את מגמת ההכנסות — האם הצמיחה בת-קיימא?"
        },
        {
            id: "security-services-01",
            name: "מגן שירותים בע\"מ",
            sector: "שירותים",
            symbol: "MAGN",
            price: 38.50,
            tier: 1,
            description: "חברת שמירה ואבטחה ותיקה עם 5,000 עובדים. מספקת שירותי אבטחה למוסדות ציבור ופרטיים.",
            management: "מנכ\"ל עם רקע ביטחוני, 12 שנה בתפקיד. הנהלה מנוסה ויציבה.",
            moat: "חוזים ארוכי טווח עם ממשלה, מוניטין רב-שנתי, רישיונות מיוחדים, עלויות מעבר גבוהות ללקוח.",
            events: "חידוש חוזה ממשלתי ל-5 שנים, הרחבת פעילות לתחום הסייבר.",
            metrics: {
                basic: [
                    { name: "P/E", value: "10.8" },
                    { name: "ROE", value: "16%" },
                    { name: "תשואת דיבידנד", value: "4.5%" }
                ],
                advanced: [
                    { name: "ROIC", value: "14%" },
                    { name: "FCF (מיליון ₪)", value: "52" },
                    { name: "FCF Yield", value: "6.8%" }
                ]
            },
            historicalData: [
                { year: 2019, revenue: 340, fcf: 38 },
                { year: 2020, revenue: 355, fcf: 40 },
                { year: 2021, revenue: 370, fcf: 43 },
                { year: 2022, revenue: 400, fcf: 48 },
                { year: 2023, revenue: 430, fcf: 52 }
            ],
            projectedData: [
                { year: 2024, revenue: 460, fcf: 57 },
                { year: 2025, revenue: 490, fcf: 62 }
            ],
            correctDecision: "buy",
            pointValue: 100,
            hints: [{ cost: 0.5, text: "בדקו את טיב החוזים ומשך ההתקשרות עם הלקוחות." }],
            feedback: {
                principle: { id: "moat", name: "חפיר כלכלי" },
                decisiveSignals: ["חוזים ממשלתיים ל-5 שנים", "עלויות מעבר גבוהות", "FCF עולה"],
                correctExplanation: "מצוין! חברה עם חוזים ארוכי טווח, מונופול-כמעט בתחומה ותמחור זול.",
                incorrectExplanation: "פספוס! P/E מתחת ל-11 עם חוזים ממשלתיים ותזרים יציב — קלאסי באפט."
            },
            isGoodValue: true, difficulty: "easy", difficultyValue: 1,
            hint: "בדקו את טיב החוזים ומשך ההתקשרות עם הלקוחות."
        },
        {
            id: "social-app-01",
            name: "שיחון בע\"מ",
            sector: "טכנולוגיה",
            symbol: "SHCH",
            price: 95.00,
            tier: 1,
            description: "אפליקציית רשת חברתית ישראלית עם 2 מיליון משתמשים. מתחרה בטיקטוק וסנאפצ'ט מקומי.",
            management: "מייסד צעיר בן 27. צוות קטן, שורף מזומנים על שיווק אגרסיבי.",
            moat: "בסיס משתמשים צומח אבל לא נאמן — 60% נטישה תוך חודש. אין מודל הכנסות ברור.",
            events: "גיוס 50 מיליון ₪, אבל קצב שריפת מזומנים גבוה. תחרות מול ענקי טכנולוגיה.",
            metrics: {
                basic: [
                    { name: "P/E", value: "N/A (הפסדי)" },
                    { name: "ROE", value: "-60%" },
                    { name: "תשואת דיבידנד", value: "0%" }
                ],
                advanced: [
                    { name: "ROIC", value: "-40%" },
                    { name: "FCF (מיליון ₪)", value: "-35" },
                    { name: "LTV/CAC", value: "0.4" }
                ]
            },
            historicalData: [
                { year: 2019, revenue: 0, fcf: -5 },
                { year: 2020, revenue: 3, fcf: -12 },
                { year: 2021, revenue: 8, fcf: -20 },
                { year: 2022, revenue: 15, fcf: -28 },
                { year: 2023, revenue: 18, fcf: -35 }
            ],
            projectedData: [
                { year: 2024, revenue: 22, fcf: -42 },
                { year: 2025, revenue: 25, fcf: -48 }
            ],
            correctDecision: "pass",
            pointValue: 100,
            hints: [{ cost: 0.5, text: "שימו לב ליחס בין עלות רכישת לקוח לערך חיי הלקוח." }],
            feedback: {
                principle: { id: "growth-trap", name: "מלכודת צמיחה" },
                decisiveSignals: ["שריפת מזומנים מתגברת", "60% נטישה", "אין מודל רווח"],
                correctExplanation: "נכון! צמיחה בלי רווחים היא לא עסק — באפט תמיד אומר שצמיחה צריכה להיות רווחית.",
                incorrectExplanation: "טעות! אין מודל הכנסות בר-קיימא, שריפת מזומנים מתגברת ותחרות מול ענקים."
            },
            isGoodValue: false, difficulty: "easy", difficultyValue: 1,
            hint: "שימו לב ליחס בין עלות רכישת לקוח לערך חיי הלקוח."
        },
        {
            id: "steel-manufacturer-01",
            name: "פלדת הנגב בע\"מ",
            sector: "תעשייה",
            symbol: "PLNG",
            price: 72.00,
            tier: 1,
            description: "יצרנית פלדה ותיקה עם מפעל בדרום. מספקת לתעשיית הבנייה והתשתיות בישראל.",
            management: "הנהלה עם 25 שנות ניסיון. המפעל מתקדם טכנולוגית עם אוטומציה.",
            moat: "מעט יצרנים מקומיים, קרבה ללקוחות ישראליים, עלויות הובלה נמוכות מייבוא.",
            events: "גידול בבנייה בישראל, אבל מחירי חומרי גלם תנודתיים. פחת עלויות אנרגיה.",
            metrics: {
                basic: [
                    { name: "P/E", value: "8.5" },
                    { name: "ROE", value: "14%" },
                    { name: "תשואת דיבידנד", value: "5.5%" }
                ],
                advanced: [
                    { name: "ROIC", value: "11%" },
                    { name: "FCF (מיליון ₪)", value: "110" },
                    { name: "חוב/הון", value: "0.3" }
                ]
            },
            historicalData: [
                { year: 2019, revenue: 900, fcf: 85 },
                { year: 2020, revenue: 780, fcf: 60 },
                { year: 2021, revenue: 1050, fcf: 120 },
                { year: 2022, revenue: 1100, fcf: 130 },
                { year: 2023, revenue: 950, fcf: 110 }
            ],
            projectedData: [
                { year: 2024, revenue: 980, fcf: 115 },
                { year: 2025, revenue: 1020, fcf: 120 }
            ],
            correctDecision: "buy",
            pointValue: 100,
            hints: [{ cost: 0.5, text: "בחנו את היציבות הכללית למרות התנודות המחזוריות." }],
            feedback: {
                principle: { id: "margin-of-safety", name: "מרווח ביטחון" },
                decisiveSignals: ["P/E נמוך מאוד", "תשואת דיבידנד 5.5%", "חוב נמוך"],
                correctExplanation: "נכון! למרות שזו תעשייה מחזורית, התמחור הנמוך וה-FCF החזק מספקים מרווח ביטחון.",
                incorrectExplanation: "החמצה! P/E של 8.5 עם דיבידנד 5.5% וחוב נמוך — מחיר שמגן מפני סיכון."
            },
            isGoodValue: true, difficulty: "easy", difficultyValue: 1,
            hint: "בחנו את היציבות הכללית למרות התנודות המחזוריות."
        },
        {
            id: "nft-marketplace-01",
            name: "דיגיטל-ארט בע\"מ",
            sector: "טכנולוגיה",
            symbol: "DGART",
            price: 42.00,
            tier: 1,
            description: "פלטפורמה למכירת NFT ואמנות דיגיטלית. שוק ה-NFT קרס ב-90% מאז 2021.",
            management: "מנכ\"ל שהגיע מעולם הקריפטו. צוות מצומצם עם ניסיון טכנולוגי אבל לא עסקי.",
            moat: "אין חפיר — עשרות פלטפורמות מתחרות. הטכנולוגיה פשוטה לשכפול.",
            events: "ירידה של 80% בנפח המסחר. ניסיון למכור שירותי tokenization לחברות — טרם הוכח.",
            metrics: {
                basic: [
                    { name: "P/E", value: "N/A (הפסדי)" },
                    { name: "ROE", value: "-85%" },
                    { name: "תשואת דיבידנד", value: "0%" }
                ],
                advanced: [
                    { name: "ROIC", value: "-50%" },
                    { name: "FCF (מיליון ₪)", value: "-22" },
                    { name: "מזומן בקופה (חודשים)", value: "8" }
                ]
            },
            historicalData: [
                { year: 2019, revenue: 0, fcf: -3 },
                { year: 2020, revenue: 5, fcf: -8 },
                { year: 2021, revenue: 45, fcf: 10 },
                { year: 2022, revenue: 15, fcf: -15 },
                { year: 2023, revenue: 6, fcf: -22 }
            ],
            projectedData: [
                { year: 2024, revenue: 4, fcf: -18 },
                { year: 2025, revenue: 2, fcf: -15 }
            ],
            correctDecision: "pass",
            pointValue: 100,
            hints: [{ cost: 0.5, text: "מה קרה לשוק שבו החברה פועלת?" }],
            feedback: {
                principle: { id: "too-hard", name: "קשה מדי" },
                decisiveSignals: ["שוק NFT קרס", "הכנסות צונחות", "8 חודשי מזומן בלבד"],
                correctExplanation: "נכון! באפט אומר 'כשאתה לא מבין את העסק — תעבור'. שוק ה-NFT לא צפוי.",
                incorrectExplanation: "טעות! השוק קרס, ההכנסות בנפילה חופשית ואין חפיר — זה בסל ה'קשה מדי'."
            },
            isGoodValue: false, difficulty: "easy", difficultyValue: 1,
            hint: "מה קרה לשוק שבו החברה פועלת?"
        }
    ],
    
    medium: [
        {
            id: "medical-devices-01",
            name: "מדיקל אינוביישן",
            sector: "ציוד רפואי",
            symbol: "MDIN",
            price: 178.00,
            tier: 2,
            description: "חברת ציוד רפואי חדשנית המתמחה ברובוטיקה כירורגית. מוצר דגל עם 500 התקנות ב-200 בתי חולים. צמיחה של 40% בשנה. התאמה אישית לניתוחים מורכבים. אך אין עדיין רווחיות.",
            management: "מייסד-רופא כמנכ\"ל עם תשוקה לחדשנות אך חסר ניסיון עסקי. לאחרונה גויס CFO מנוסה מחברת מכשור רפואי גדולה. השקעה כבדה במו\"פ (25% מההכנסות) לפעמים על חשבון רווחיות.",
            moat: "פטנטים חזקים על הטכנולוגיה הליבה. אישורי FDA ו-CE שלוקח שנים להשיג. עקומת למידה תלולה לשימוש במוצר. switching cost גבוה לבתי חולים. אך תחרות גוברת מחברות גדולות.",
            events: "אישור FDA למוצר חדש לניתוחי לב. תביעה פטנטים מול מתחרה גדולה. זכייה במכרז גדול בגרמניה. ירידה בשולי רווח בגלל השקעות בתמיכה ללקוחות חדשים.",
            metrics: {
                basic: [
                    { name: "P/E", value: "65" },
                    { name: "ROE", value: "5%" },
                    { name: "תשואת דיבידנד", value: "0%" },
                    { name: "PEG", value: "2.1" }
                ],
                advanced: [
                    { name: "ROIC", value: "3%" },
                    { name: "FCF (מיליון ₪)", value: "-80" },
                    { name: "שולי רווח גולמי", value: "68%" },
                    { name: "הוצאות מו\"פ", value: "25% מהמכירות" },
                    { name: "מזומן נטו", value: "300 מיליון ₪" }
                ]
            },
            historicalData: [
                { year: 2019, revenue: 150, fcf: -100 },
                { year: 2020, revenue: 180, fcf: -120 },
                { year: 2021, revenue: 250, fcf: -90 },
                { year: 2022, revenue: 350, fcf: -70 },
                { year: 2023, revenue: 450, fcf: -80 }
            ],
            projectedData: [
                { year: 2024, revenue: 600, fcf: -50 },
                { year: 2025, revenue: 750, fcf: 20 }
            ],
            correctDecision: "pass",
            pointValue: 150,
            hints: [
                { cost: 0.5, text: "חדשנות חשובה, אבל רווחיות ותזרים מזומנים חשובים יותר." }
            ],
            feedback: {
                principle: { id: "owner-earnings", name: "רווחי בעלים" },
                decisiveSignals: ["FCF שלילי מתמשך", "אין נתיב ברור לרווחיות", "תלות בגיוסי הון"],
                correctExplanation: "נכון! למרות הטכנולוגיה המרשימה, החברה שורפת מזומנים ללא נתיב ברור לרווחיות.",
                incorrectExplanation: "טעות! חברת ציוד רפואי עם FCF שלילי מתמשך וללא יתרון תחרותי ברור אינה השקעת ערך."
            },
            isGoodValue: false,
            difficulty: "medium",
            difficultyValue: 2,
            hint: "חדשנות חשובה, אבל רווחיות ותזרים מזומנים חשובים יותר."
        },
        {
            id: "logistics-company-01",
            name: "לוגיסטיקה ושינוע בע\"מ",
            sector: "לוגיסטיקה",
            symbol: "LGST",
            price: 48.50,
            tier: 2,
            description: "חברת הובלה ולוגיסטיקה עם צי של 200 משאיות ו-10 מרכזי הפצה. מתמחה בשינוע למרכזי קמעונאות ו-e-commerce. השקיעה רבות באוטומציה ומערכות ניהול צי. נתח שוק של 15% בתחום ההפצה הקרה.",
            management: "דור שני למשפחת המייסדים עם גישה מודרנית. מינו COO מקצועי מחברה בינלאומית. דגש על יעילות תפעולית ושביעות רצון לקוחות. תרבות של בטיחות וטיפול בנהגים.",
            moat: "רשת לוגיסטית רחבה שקשה לשכפל. קשרים ארוכי טווח עם רשתות הקמעונאות הגדולות. מערכות IT מתקדמות המשפרות יעילות. מוניטין של אמינות במשך 30 שנה.",
            events: "עליית מחירי דלק ב-15% השנה. מחסור בנהגים מקצועיים דוחף שכר למעלה. השקעה של 50 מיליון ₪ במרכז לוגיסטי חדש. חוזה גדול עם רשת e-commerce מובילה.",
            metrics: {
                basic: [
                    { name: "P/E", value: "14" },
                    { name: "ROE", value: "16%" },
                    { name: "תשואת דיבידנד", value: "3.5%" },
                    { name: "EV/EBITDA", value: "7.5" }
                ],
                advanced: [
                    { name: "ROIC", value: "14%" },
                    { name: "FCF (מיליון ₪)", value: "80" },
                    { name: "יחס הוצאות תפעול", value: "88%" },
                    { name: "ניצולת צי", value: "82%" },
                    { name: "ROA", value: "8%" }
                ]
            },
            historicalData: [
                { year: 2019, revenue: 600, fcf: 50 },
                { year: 2020, revenue: 650, fcf: 60 },
                { year: 2021, revenue: 750, fcf: 65 },
                { year: 2022, revenue: 850, fcf: 75 },
                { year: 2023, revenue: 920, fcf: 80 }
            ],
            projectedData: [
                { year: 2024, revenue: 1000, fcf: 90 },
                { year: 2025, revenue: 1080, fcf: 100 }
            ],
            correctDecision: "buy",
            pointValue: 150,
            hints: [
                { cost: 0.5, text: "חברות לוגיסטיקה עם יעילות תפעולית גבוהה יכולות להיות רווחיות מאוד." }
            ],
            feedback: {
                principle: { id: "moat", name: "חפיר כלכלי" },
                decisiveSignals: ["FCF יציב ועולה", "ROIC של 14%", "רשת שקשה לשכפל"],
                correctExplanation: "מעולה! חברה עם ניהול טוב, תזרים יציב ותמחור סביר בתחום חיוני לכלכלה.",
                incorrectExplanation: "פספוס! למרות האתגרים בענף, זו חברה מנוהלת היטב עם FCF חזק ומוניטין מצוין."
            },
            isGoodValue: true,
            difficulty: "medium",
            difficultyValue: 2,
            hint: "חברות לוגיסטיקה עם יעילות תפעולית גבוהה יכולות להיות רווחיות מאוד."
        },
        {
            id: "realestate-developer-01",
            name: "בנייה ופיתוח נדל\"ן",
            sector: "נדל\"ן",
            symbol: "BNPT",
            price: 125.00,
            tier: 2,
            description: "חברת נדל\"ן המתמחה בפיתוח פרויקטים למגורים. בנק קרקעות של 5,000 יחידות דיור בשלבי תכנון שונים. מתמקדת באזורי ביקוש במרכז הארץ. נוהגת למכור 60% מהדירות לפני תחילת בנייה.",
            management: "מנכ\"ל עם 30 שנות ניסיון שעבר את כל המשברים בענף. גישה שמרנית למינוף - לא עולים מעל 60% חוב להון. אך יש לחץ מבעלי מניות להגדיל פרויקטים ורווחים.",
            moat: "בנק קרקעות איכותי במיקומים מבוקשים. מוניטין של איכות בנייה גבוהה. קשרים טובים עם בנקים למימון פרויקטים. אך תלות גבוהה במחזורי נדל\"ן ורגולציה.",
            events: "עליית ריבית משפיעה על ביקוש לדירות. רגולציה חדשה על היטלי פיתוח. מלאי דירות למכירה גדל ב-40%. זמן מכירה ממוצע עלה מ-3 ל-6 חודשים.",
            metrics: {
                basic: [
                    { name: "P/E", value: "9" },
                    { name: "ROE", value: "18%" },
                    { name: "תשואת דיבידנד", value: "5%" },
                    { name: "P/B", value: "0.8" }
                ],
                advanced: [
                    { name: "ROIC", value: "15%" },
                    { name: "FCF (מיליון ₪)", value: "-50" },
                    { name: "יחס חוב נטו להון", value: "55%" },
                    { name: "מלאי קרקעות", value: "8 שנות בנייה" },
                    { name: "presales ratio", value: "45%" }
                ]
            },
            historicalData: [
                { year: 2019, revenue: 800, fcf: 100 },
                { year: 2020, revenue: 700, fcf: 50 },
                { year: 2021, revenue: 1000, fcf: 150 },
                { year: 2022, revenue: 1200, fcf: 100 },
                { year: 2023, revenue: 900, fcf: -50 }
            ],
            projectedData: [
                { year: 2024, revenue: 700, fcf: -100 },
                { year: 2025, revenue: 600, fcf: -150 }
            ],
            correctDecision: "pass",
            pointValue: 150,
            hints: [
                { cost: 0.5, text: "P/E נמוך בחברות נדל\"ן יכול להטעות - בדקו את המגמות בשוק." }
            ],
            feedback: {
                principle: { id: "cyclical-trap", name: "מלכודת מחזוריות" },
                decisiveSignals: ["FCF הופך שלילי", "מלאי דירות עולה", "זמן מכירה מתארך"],
                counterSignalExplanation: "P/B נמוך ו-P/E נמוך נראים אטרקטיביים, אבל המגמות בשוק הנדל\"ן שליליות.",
                correctExplanation: "נכון! שוק הנדל\"ן נכנס למיתון ו-FCF הופך שלילי. P/B נמוך לא מספיק כשהשוק יורד.",
                incorrectExplanation: "טעות! למרות התמחור הנמוך, המגמות בענף שליליות והחברה תיאלץ להוריד מחירים."
            },
            isGoodValue: false,
            difficulty: "medium",
            difficultyValue: 2,
            hint: "P/E נמוך בחברות נדל\"ן יכול להטעות - בדקו את המגמות בשוק."
        },
        {
            id: "biotech-profitable-01",
            name: "ביו-פארמה ישראלית",
            sector: "ביוטכנולוגיה",
            symbol: "BIOF",
            price: 310.00,
            tier: 2,
            description: "חברת ביוטק עם תרופה אחת מאושרת לטיפול בסרטן נדיר (שוק של 500 מיליון $ בשנה). בפייפליין 3 תרופות נוספות בשלבי ניסויים שונים. הוצאות מו\"פ גבוהות אך ממוקדות. שותפות אסטרטגית עם חברת פארמה גדולה.",
            management: "מדען ראשי מהמייסדים עם פרסומים מובילים. CEO עם ניסיון בהבאת תרופות לשוק. CFO מנוסה שמנהל מזומנים בזהירות. דירקטוריון עם מומחים מהתעשייה.",
            moat: "פטנט חזק על התרופה המאושרת עד 2032. טכנולוגיית פלטפורמה ייחודית. knowhow עמוק בתחום האונקולוגיה. ביטוח של 85% מהמכירות דרך agreements עם ביטוחי בריאות.",
            events: "תוצאות חיוביות בניסוי פאזה 2 לתרופה שנייה. הרחבת אינדיקציה לתרופה הקיימת. תחרות פוטנציאלית מתרופה גנרית ב-2025. מו\"מ על מכירת זכויות בשווקים מתעוררים.",
            metrics: {
                basic: [
                    { name: "P/E", value: "28" },
                    { name: "ROE", value: "22%" },
                    { name: "תשואת דיבידנד", value: "0%" },
                    { name: "PEG", value: "0.9" }
                ],
                advanced: [
                    { name: "ROIC", value: "25%" },
                    { name: "FCF (מיליון ₪)", value: "180" },
                    { name: "שולי EBITDA", value: "35%" },
                    { name: "הוצאות מו\"פ", value: "40% מהמכירות" },
                    { name: "מזומן נטו", value: "500 מיליון ₪" }
                ]
            },
            historicalData: [
                { year: 2019, revenue: 100, fcf: -150 },
                { year: 2020, revenue: 200, fcf: -100 },
                { year: 2021, revenue: 400, fcf: 50 },
                { year: 2022, revenue: 600, fcf: 120 },
                { year: 2023, revenue: 800, fcf: 180 }
            ],
            projectedData: [
                { year: 2024, revenue: 1000, fcf: 250 },
                { year: 2025, revenue: 1200, fcf: 300 }
            ],
            correctDecision: "buy",
            pointValue: 150,
            hints: [
                { cost: 0.5, text: "חברות ביוטק עם תרופה מאושרת ו-FCF חיובי נדירות." }
            ],
            feedback: {
                principle: { id: "moat", name: "חפיר כלכלי" },
                decisiveSignals: ["FCF חיובי וצומח", "ROIC של 25%", "PEG נמוך מ-1", "פטנט חזק"],
                correctExplanation: "נכון! חברת ביוטק נדירה עם רווחיות, FCF חזק ופייפליין מבטיח. PEG נמוך מ-1.",
                incorrectExplanation: "החמצה! זו לא חברת ביוטק ספקולטיבית אלא חברה עם מוצר מניב ותזרים חזק."
            },
            isGoodValue: true,
            difficulty: "medium",
            difficultyValue: 2,
            hint: "חברות ביוטק עם תרופה מאושרת ו-FCF חיובי נדירות."
        },
        {
            id: "cloud-services-01",
            name: "שירותי ענן ואחסון",
            sector: "תשתיות IT",
            symbol: "ANAN",
            price: 92.00,
            tier: 2,
            description: "ספקית שירותי ענן ואחסון נתונים לעסקים בינוניים וגדולים. 3 מרכזי נתונים מודרניים. מעבר מהיר ממודל on-premise ל-SaaS. לקוחות מובילים כולל בנקים וחברות ביטוח.",
            management: "מנכ\"ל מנוסה מתעשיית הטכנולוגיה. צוות טכנולוגי חזק. תהליך מסודר למעבר לענן. השקעות בבינה מלאכותית.",
            moat: "switching costs גבוהים - קשה להעביר נתונים. אמינות של 99.99% uptime. אישורי אבטחה מחמירים נדרשים בענף הפיננסי. אך תחרות מ-AWS ו-Azure.",
            events: "חוזה גדול עם בנק מוביל. השקעה של 200 מיליון ₪ במרכז נתונים חדש. עליית הוצאות חשמל ב-20%. שותפות אסטרטגית עם Microsoft.",
            metrics: {
                basic: [
                    { name: "P/E", value: "22" },
                    { name: "ROE", value: "18%" },
                    { name: "תשואת דיבידנד", value: "1.5%" },
                    { name: "EV/EBITDA", value: "12" }
                ],
                advanced: [
                    { name: "ROIC", value: "15%" },
                    { name: "FCF (מיליון ₪)", value: "120" },
                    { name: "Net Revenue Retention", value: "115%" },
                    { name: "Recurring Revenue", value: "85%" },
                    { name: "Customer Churn", value: "3%" }
                ]
            },
            historicalData: [
                { year: 2019, revenue: 300, fcf: 40 },
                { year: 2020, revenue: 380, fcf: 60 },
                { year: 2021, revenue: 480, fcf: 80 },
                { year: 2022, revenue: 600, fcf: 100 },
                { year: 2023, revenue: 750, fcf: 120 }
            ],
            projectedData: [
                { year: 2024, revenue: 900, fcf: 150 },
                { year: 2025, revenue: 1080, fcf: 180 }
            ],
            correctDecision: "buy",
            pointValue: 150,
            hints: [
                { cost: 0.5, text: "בדקו את מדדי ה-SaaS — מה הם מספרים על נאמנות הלקוחות?" }
            ],
            feedback: {
                principle: { id: "moat", name: "חפיר כלכלי" },
                decisiveSignals: ["NRR של 115%", "Churn נמוך של 3%", "הכנסות חוזרות 85%", "FCF צומח"],
                correctExplanation: "מצוין! חברת SaaS עם switching costs גבוהים, לקוחות נאמנים ותזרים יציב.",
                incorrectExplanation: "פספוס! מדדי SaaS מצוינים - NRR גבוה, churn נמוך והכנסות חוזרות."
            },
            isGoodValue: true,
            difficulty: "medium",
            difficultyValue: 2,
            hint: "בדקו את מדדי ה-SaaS — מה הם מספרים על נאמנות הלקוחות?"
        },
        {
            id: "retail-bank-01",
            name: "בנק קהילתי בע\"מ",
            sector: "בנקאות",
            symbol: "BNKK",
            price: 45.00,
            tier: 2,
            description: "בנק קמעונאי בינוני עם 80 סניפים ומיליון לקוחות. מתמקד במשכנתאות ואשראי לעסקים קטנים. דיגיטציה מואצת ב-3 שנים אחרונות. חלק מהסניפים עודפים.",
            management: "מנכ\"ל חדש מזה שנתיים, לשעבר בבנק גדול. תוכנית התייעלות בעיצומה. דגש על שירות לקוחות ודיגיטל. צמצום 15% בכוח אדם.",
            moat: "בסיס לקוחות נאמן בפריפריה. ידע מקומי בענף הנדל\"ן. אך תחרות מבנקים דיגיטליים וחברות אשראי חוץ-בנקאי.",
            events: "עליית ריבית משפרת מרווח פיננסי. הפרשות לחובות מסופקים עלו ב-30%. סגירת 10 סניפים. השקה של אפליקציה חדשה עם ביקורות חיוביות.",
            metrics: {
                basic: [
                    { name: "P/E", value: "8.5" },
                    { name: "ROE", value: "10%" },
                    { name: "תשואת דיבידנד", value: "5.5%" },
                    { name: "P/B", value: "0.7" }
                ],
                advanced: [
                    { name: "NIM (מרווח ריבית)", value: "2.8%" },
                    { name: "יחס הון רובד 1", value: "12.5%" },
                    { name: "יחס יעילות", value: "62%" },
                    { name: "הפרשות/אשראי", value: "1.2%" },
                    { name: "ROA", value: "0.9%" }
                ]
            },
            historicalData: [
                { year: 2019, revenue: 800, fcf: 150 },
                { year: 2020, revenue: 750, fcf: 100 },
                { year: 2021, revenue: 820, fcf: 130 },
                { year: 2022, revenue: 900, fcf: 160 },
                { year: 2023, revenue: 950, fcf: 180 }
            ],
            projectedData: [
                { year: 2024, revenue: 1000, fcf: 200 },
                { year: 2025, revenue: 1050, fcf: 210 }
            ],
            correctDecision: "buy",
            pointValue: 150,
            hints: [
                { cost: 0.5, text: "השוו את מחיר המניה לנכסים שעומדים מאחוריה — ובדקו את בריאות הבנק." }
            ],
            feedback: {
                principle: { id: "margin-of-safety", name: "מרווח ביטחון" },
                decisiveSignals: ["P/B של 0.7", "יחס הון חזק", "מרווח ריבית משתפר", "דיבידנד בר-קיימא"],
                correctExplanation: "נכון! בנק בריא הנסחר ב-70% מהערך הפנקסני עם דיבידנד גבוה.",
                incorrectExplanation: "פספוס! בנק עם יסודות טובים ותמחור זול - הזדמנות ערך."
            },
            isGoodValue: true,
            difficulty: "medium",
            difficultyValue: 2,
            hint: "השוו את מחיר המניה לנכסים שעומדים מאחוריה — ובדקו את בריאות הבנק."
        },
        {
            id: "cybersecurity-01",
            name: "סייבר-מגן טכנולוגיות",
            sector: "טכנולוגיה",
            symbol: "CBMG",
            price: 145.00,
            tier: 2,
            description: "חברת סייבר ישראלית המספקת פתרונות אבטחת מידע לארגונים בינלאומיים. 200 לקוחות בארה\"ב ואירופה.",
            management: "הוקמה ע\"י בוגרי 8200. מנכ\"ל עם 15 שנות ניסיון בתחום. צמיחה עקבית.",
            moat: "טכנולוגיה מוגנת בפטנטים, עלויות מעבר גבוהות, חוזי SLA רב-שנתיים.",
            events: "חידוש 95% מהחוזים, כניסה לשוק האסייתי, הוספת מוצר AI לזיהוי איומים.",
            metrics: {
                basic: [
                    { name: "P/E", value: "22" },
                    { name: "ROE", value: "25%" },
                    { name: "צמיחת הכנסות", value: "18%" }
                ],
                advanced: [
                    { name: "ROIC", value: "21%" },
                    { name: "FCF (מיליון ₪)", value: "85" },
                    { name: "שיעור חידוש", value: "95%" }
                ]
            },
            historicalData: [
                { year: 2019, revenue: 280, fcf: 35 },
                { year: 2020, revenue: 330, fcf: 45 },
                { year: 2021, revenue: 400, fcf: 58 },
                { year: 2022, revenue: 470, fcf: 70 },
                { year: 2023, revenue: 550, fcf: 85 }
            ],
            projectedData: [
                { year: 2024, revenue: 640, fcf: 100 },
                { year: 2025, revenue: 740, fcf: 118 }
            ],
            correctDecision: "buy",
            pointValue: 150,
            hints: [{ cost: 0.5, text: "שימו לב לשיעור חידוש החוזים — מה זה אומר על איכות המוצר?" }],
            feedback: {
                principle: { id: "moat", name: "חפיר כלכלי" },
                decisiveSignals: ["95% חידוש חוזים", "צמיחה עקבית 18%", "ROIC מעל 20%"],
                correctExplanation: "מצוין! חברת סייבר עם חפיר טכנולוגי, לקוחות דביקים וצמיחה רווחית.",
                incorrectExplanation: "פספוס! P/E של 22 עם צמיחה של 18% ו-95% חידוש — PEG מצוין."
            },
            isGoodValue: true, difficulty: "medium", difficultyValue: 2,
            hint: "שימו לב לשיעור חידוש החוזים — מה זה אומר על איכות המוצר?"
        },
        {
            id: "newspaper-media-01",
            name: "ידיעות תקשורת בע\"מ",
            sector: "תקשורת",
            symbol: "YDIA",
            price: 15.50,
            tier: 2,
            description: "חברת מדיה ותיקה — עיתון מודפס ואתר חדשות. ירידה מתמדת בפרסום מודפס.",
            management: "המשפחה המייסדת עדיין שולטת. חילוקי דעות פנימיים על כיוון אסטרטגי.",
            moat: "מותג מוכר, אבל נשחק — הקוראים עוברים לרשתות חברתיות. אין עלויות מעבר.",
            events: "ירידה של 15% בהכנסות פרסום. ניסיון מנוי דיגיטלי עם תוצאות חלשות.",
            metrics: {
                basic: [
                    { name: "P/E", value: "6.5" },
                    { name: "ROE", value: "8%" },
                    { name: "תשואת דיבידנד", value: "7.2%" }
                ],
                advanced: [
                    { name: "ROIC", value: "6%" },
                    { name: "FCF (מיליון ₪)", value: "45" },
                    { name: "מגמת הכנסות", value: "יורדת 15% שנתי" }
                ]
            },
            historicalData: [
                { year: 2019, revenue: 520, fcf: 80 },
                { year: 2020, revenue: 440, fcf: 65 },
                { year: 2021, revenue: 380, fcf: 55 },
                { year: 2022, revenue: 330, fcf: 50 },
                { year: 2023, revenue: 280, fcf: 45 }
            ],
            projectedData: [
                { year: 2024, revenue: 240, fcf: 35 },
                { year: 2025, revenue: 200, fcf: 25 }
            ],
            correctDecision: "pass",
            pointValue: 150,
            hints: [{ cost: 0.5, text: "האם P/E נמוך תמיד אומר שהמניה זולה? בדקו את מגמת ההכנסות." }],
            feedback: {
                principle: { id: "value-trap", name: "מלכודת ערך" },
                decisiveSignals: ["הכנסות יורדות 15% בשנה", "ענף בדעיכה", "אין חפיר דיגיטלי"],
                correctExplanation: "נכון! P/E נמוך לא אומר זול — ההכנסות בירידה מתמדת. זו מלכודת ערך קלאסית.",
                incorrectExplanation: "טעות! תשואת דיבידנד של 7% מפתה, אבל הדיבידנד ייחתך כשההכנסות ימשיכו לרדת."
            },
            isGoodValue: false, difficulty: "medium", difficultyValue: 2,
            hint: "האם P/E נמוך תמיד אומר שהמניה זולה? בדקו את מגמת ההכנסות."
        },
        {
            id: "elevator-maintenance-01",
            name: "עלית שירותים בע\"מ",
            sector: "שירותים",
            symbol: "ALSH",
            price: 88.00,
            tier: 2,
            description: "חברת תחזוקת מעליות הגדולה בישראל. מתחזקת 12,000 מעליות בחוזים שנתיים.",
            management: "הנהלה מקצועית, מנכ\"ל 18 שנה. רכישות ממוקדות של מתחזקים קטנים.",
            moat: "עלויות מעבר גבוהות — החלפת חברת תחזוקה יקרה ומסובכת. 85% שימור לקוחות.",
            events: "רכישת מתחרה קטן, הוספת שירות מעליות חכמות IoT, גידול ברווחיות.",
            metrics: {
                basic: [
                    { name: "P/E", value: "16" },
                    { name: "ROE", value: "20%" },
                    { name: "צמיחת הכנסות", value: "12%" }
                ],
                advanced: [
                    { name: "ROIC", value: "18%" },
                    { name: "FCF (מיליון ₪)", value: "72" },
                    { name: "שימור לקוחות", value: "85%" }
                ]
            },
            historicalData: [
                { year: 2019, revenue: 380, fcf: 42 },
                { year: 2020, revenue: 400, fcf: 48 },
                { year: 2021, revenue: 440, fcf: 55 },
                { year: 2022, revenue: 490, fcf: 63 },
                { year: 2023, revenue: 550, fcf: 72 }
            ],
            projectedData: [
                { year: 2024, revenue: 610, fcf: 82 },
                { year: 2025, revenue: 680, fcf: 92 }
            ],
            correctDecision: "buy",
            pointValue: 150,
            hints: [{ cost: 0.5, text: "חשבו על עלויות המעבר — כמה קשה להחליף ספק תחזוקת מעליות?" }],
            feedback: {
                principle: { id: "moat", name: "חפיר כלכלי" },
                decisiveSignals: ["עלויות מעבר גבוהות", "85% שימור", "צמיחה אורגנית + רכישות"],
                correctExplanation: "מצוין! עסק עם לקוחות 'דביקים', צמיחה עקבית ורווחיות גבוהה.",
                incorrectExplanation: "פספוס! עסקי תחזוקה עם שימור 85% הם חפיר קלאסי — ההכנסות חוזרות."
            },
            isGoodValue: true, difficulty: "medium", difficultyValue: 2,
            hint: "חשבו על עלויות המעבר — כמה קשה להחליף ספק תחזוקת מעליות?"
        },
        {
            id: "solar-installer-01",
            name: "שמש-טק אנרגיה",
            sector: "אנרגיה מתחדשת",
            symbol: "SHMT",
            price: 210.00,
            tier: 2,
            description: "חברת התקנת פאנלים סולאריים על גגות בתים פרטיים ומסחריים. צמיחה מהירה.",
            management: "מנכ\"ל מהנדס עם חזון, אבל החברה גדלה מהר מדי — בעיות בביצוע.",
            moat: "אין חפיר אמיתי — מאות מתקינים בשוק. תלות בסובסידיות ממשלתיות.",
            events: "הממשלה הודיעה על קיצוץ בתעריף הסולארי ב-20%. עלייה בתלונות לקוחות.",
            metrics: {
                basic: [
                    { name: "P/E", value: "35" },
                    { name: "ROE", value: "12%" },
                    { name: "צמיחת הכנסות", value: "40%" }
                ],
                advanced: [
                    { name: "ROIC", value: "8%" },
                    { name: "FCF (מיליון ₪)", value: "-15" },
                    { name: "תלות בסובסידיה", value: "כן" }
                ]
            },
            historicalData: [
                { year: 2019, revenue: 50, fcf: 5 },
                { year: 2020, revenue: 90, fcf: 8 },
                { year: 2021, revenue: 160, fcf: 12 },
                { year: 2022, revenue: 280, fcf: 5 },
                { year: 2023, revenue: 350, fcf: -15 }
            ],
            projectedData: [
                { year: 2024, revenue: 300, fcf: -30 },
                { year: 2025, revenue: 250, fcf: -25 }
            ],
            correctDecision: "pass",
            pointValue: 150,
            hints: [{ cost: 0.5, text: "מה קורה כשהצמיחה מהירה אבל ה-FCF הופך שלילי?" }],
            feedback: {
                principle: { id: "growth-trap", name: "מלכודת צמיחה" },
                decisiveSignals: ["FCF הפך שלילי", "תלות בסובסידיות", "אין חפיר תחרותי"],
                correctExplanation: "נכון! צמיחה מהירה שאוכלת מזומנים עם תלות בסובסידיות — לא עסק בר-קיימא.",
                incorrectExplanation: "טעות! צמיחה של 40% מרשימה, אבל ה-FCF שלילי והסובסידיות נחתכות."
            },
            isGoodValue: false, difficulty: "medium", difficultyValue: 2,
            hint: "מה קורה כשהצמיחה מהירה אבל ה-FCF הופך שלילי?"
        },
        {
            id: "pest-control-01",
            name: "הדברה פלוס בע\"מ",
            sector: "שירותים",
            symbol: "HDBR",
            price: 56.00,
            tier: 2,
            description: "חברת הדברה מובילה בישראל עם 40 שנות פעילות. חוזי שירות שנתיים עם 3,000 לקוחות עסקיים.",
            management: "דור שני. מנכ\"ל עם 20 שנות ניסיון. מדיניות רכישת מתחרים קטנים.",
            moat: "רגולציה מחייבת הדברה בעסקי מזון, רישיון מקצועי, חוזים חוזרים, שם מותג.",
            events: "רכישת 3 חברות קטנות, כניסה לתחום הדברה ירוקה, גידול של 15% בבסיס הלקוחות.",
            metrics: {
                basic: [
                    { name: "P/E", value: "13" },
                    { name: "ROE", value: "19%" },
                    { name: "צמיחת הכנסות", value: "14%" }
                ],
                advanced: [
                    { name: "ROIC", value: "22%" },
                    { name: "FCF (מיליון ₪)", value: "38" },
                    { name: "שימור לקוחות", value: "92%" }
                ]
            },
            historicalData: [
                { year: 2019, revenue: 140, fcf: 20 },
                { year: 2020, revenue: 155, fcf: 23 },
                { year: 2021, revenue: 175, fcf: 27 },
                { year: 2022, revenue: 200, fcf: 32 },
                { year: 2023, revenue: 230, fcf: 38 }
            ],
            projectedData: [
                { year: 2024, revenue: 265, fcf: 44 },
                { year: 2025, revenue: 300, fcf: 52 }
            ],
            correctDecision: "buy",
            pointValue: 150,
            hints: [{ cost: 0.5, text: "בדקו את היחס בין ההון המושקע לבין התשואה שהוא מייצר — מה המספר הזה אומר?" }],
            feedback: {
                principle: { id: "owner-earnings", name: "רווחי בעלים" },
                decisiveSignals: ["ROIC 22%", "92% שימור", "הכנסות חוזרות מחוזים"],
                correctExplanation: "מצוין! עסק משעמם אבל מעולה — הכנסות חוזרות, רווחיות גבוהה וצמיחה.",
                incorrectExplanation: "פספוס! באפט אוהב עסקים 'משעממים' עם ROIC גבוה ולקוחות חוזרים."
            },
            isGoodValue: true, difficulty: "medium", difficultyValue: 2,
            hint: "בדקו את היחס בין ההון המושקע לבין התשואה שהוא מייצר — מה המספר הזה אומר?"
        },
        {
            id: "airline-domestic-01",
            name: "ארקיע תעופה בע\"מ",
            sector: "תעופה",
            symbol: "ARKI",
            price: 28.00,
            tier: 2,
            description: "חברת תעופה פנים-ארצית ובינלאומית. רווחיות נמוכה ותחרות עזה.",
            management: "תחלופת מנכ\"לים — 3 מנכ\"לים ב-5 שנים. ועד עובדים חזק ובעייתי.",
            moat: "אין חפיר. תחרות עזה מול low-cost. מחירי דלק תנודתיים. רגולציה כבדה.",
            events: "רבעון מפסיד, עיכוב בקבלת מטוסים חדשים, שביתת דיילים.",
            metrics: {
                basic: [
                    { name: "P/E", value: "7.5" },
                    { name: "ROE", value: "4%" },
                    { name: "תשואת דיבידנד", value: "0%" }
                ],
                advanced: [
                    { name: "ROIC", value: "3%" },
                    { name: "FCF (מיליון ₪)", value: "20" },
                    { name: "חוב/הון", value: "2.8" }
                ]
            },
            historicalData: [
                { year: 2019, revenue: 1800, fcf: 50 },
                { year: 2020, revenue: 400, fcf: -300 },
                { year: 2021, revenue: 900, fcf: -80 },
                { year: 2022, revenue: 1500, fcf: 30 },
                { year: 2023, revenue: 1700, fcf: 20 }
            ],
            projectedData: [
                { year: 2024, revenue: 1750, fcf: 25 },
                { year: 2025, revenue: 1800, fcf: 30 }
            ],
            correctDecision: "pass",
            pointValue: 150,
            hints: [{ cost: 0.5, text: "באפט אמר פעם שתעשיית התעופה היא 'מלכודת הרס הון'. למה?" }],
            feedback: {
                principle: { id: "too-hard", name: "קשה מדי" },
                decisiveSignals: ["חוב/הון 2.8", "ROIC 3% בלבד", "תחלופת הנהלה", "תעשייה ללא חפיר"],
                correctExplanation: "נכון! באפט שונא תעופה — חוב גבוה, תחרות עזה, ROIC עלוב.",
                incorrectExplanation: "טעות! P/E של 7.5 מטעה — תחרות הרסנית, חוב כבד, ואין חפיר."
            },
            isGoodValue: false, difficulty: "medium", difficultyValue: 2,
            hint: "באפט אמר פעם שתעשיית התעופה היא 'מלכודת הרס הון'. למה?"
        },
        {
            id: "parking-lots-01",
            name: "חניון עיר בע\"מ",
            sector: "נדל\"ן",
            symbol: "HNYN",
            price: 52.00,
            tier: 2,
            description: "מפעילת 25 חניונים במרכזי ערים גדולות. חוזי זיכיון ל-20-30 שנה.",
            management: "הנהלה רזה ויעילה. 8 עובדי מטה בלבד. מנכ\"ל 15 שנה בתפקיד.",
            moat: "זיכיונות בלעדיים לעשרות שנים, מיקומים שלא ניתן לשכפל, ביקוש קבוע.",
            events: "חידוש 3 זיכיונות, העלאת מחירים 8%, הכנסה שנתית צפויה ויציבה.",
            metrics: {
                basic: [
                    { name: "P/E", value: "12" },
                    { name: "ROE", value: "17%" },
                    { name: "תשואת דיבידנד", value: "5.8%" }
                ],
                advanced: [
                    { name: "ROIC", value: "15%" },
                    { name: "FCF (מיליון ₪)", value: "65" },
                    { name: "תפוסה ממוצעת", value: "88%" }
                ]
            },
            historicalData: [
                { year: 2019, revenue: 220, fcf: 48 },
                { year: 2020, revenue: 160, fcf: 30 },
                { year: 2021, revenue: 210, fcf: 45 },
                { year: 2022, revenue: 250, fcf: 58 },
                { year: 2023, revenue: 280, fcf: 65 }
            ],
            projectedData: [
                { year: 2024, revenue: 300, fcf: 72 },
                { year: 2025, revenue: 320, fcf: 78 }
            ],
            correctDecision: "buy",
            pointValue: 150,
            hints: [{ cost: 0.5, text: "כמה זמן נותרו לזיכיונות? מה ערך הנכסים שלא ניתנים לשכפול?" }],
            feedback: {
                principle: { id: "moat", name: "חפיר כלכלי" },
                decisiveSignals: ["זיכיונות ל-20-30 שנה", "מיקומים ייחודיים", "דיבידנד 5.8%"],
                correctExplanation: "מצוין! זיכיונות ארוכי טווח במיקומים שלא ניתן לשכפל — חפיר קלאסי.",
                incorrectExplanation: "החמצה! חניונים במרכזי ערים עם זיכיון — עסק שבאפט היה אוהב."
            },
            isGoodValue: true, difficulty: "medium", difficultyValue: 2,
            hint: "כמה זמן נותרו לזיכיונות? מה ערך הנכסים שלא ניתנים לשכפול?"
        },
        {
            id: "printing-company-01",
            name: "דפוס אומן בע\"מ",
            sector: "תעשייה",
            symbol: "DFOM",
            price: 18.00,
            tier: 2,
            description: "בית דפוס מסחרי שמייצר חומרי שיווק, קטלוגים ואריזות. שוק הדפוס מתכווץ.",
            management: "המייסד בן 70, אין תוכנית ירושה ברורה. חוסר השקעה בטכנולוגיה דיגיטלית.",
            moat: "אין — עשרות בתי דפוס מתחרים. הלקוחות עוברים לדיגיטל.",
            events: "איבוד 3 לקוחות גדולים. ניסיון לעבור לאריזות — השקעה כבדה עם תוצאות לא ברורות.",
            metrics: {
                basic: [
                    { name: "P/E", value: "5" },
                    { name: "ROE", value: "6%" },
                    { name: "תשואת דיבידנד", value: "8%" }
                ],
                advanced: [
                    { name: "ROIC", value: "5%" },
                    { name: "FCF (מיליון ₪)", value: "12" },
                    { name: "ירידה בהכנסות", value: "10% שנתי" }
                ]
            },
            historicalData: [
                { year: 2019, revenue: 180, fcf: 22 },
                { year: 2020, revenue: 155, fcf: 18 },
                { year: 2021, revenue: 140, fcf: 16 },
                { year: 2022, revenue: 125, fcf: 14 },
                { year: 2023, revenue: 110, fcf: 12 }
            ],
            projectedData: [
                { year: 2024, revenue: 98, fcf: 8 },
                { year: 2025, revenue: 85, fcf: 5 }
            ],
            correctDecision: "pass",
            pointValue: 150,
            hints: [{ cost: 0.5, text: "P/E של 5 ודיבידנד 8% נראים מפתים — אבל מה הם מסתירים?" }],
            feedback: {
                principle: { id: "value-trap", name: "מלכודת ערך" },
                decisiveSignals: ["הכנסות יורדות 10% בשנה", "ענף מתכווץ", "אין תוכנית ירושה"],
                correctExplanation: "נכון! דיבידנד 8% לא בר-קיימא כשההכנסות יורדות — מלכודת ערך קלאסית.",
                incorrectExplanation: "טעות! P/E נמוך ודיבידנד גבוה מפתים, אבל העסק גוסס — הדיבידנד ייחתך."
            },
            isGoodValue: false, difficulty: "medium", difficultyValue: 2,
            hint: "P/E של 5 ודיבידנד 8% נראים מפתים — אבל מה הם מסתירים?"
        }
    ],
    
    hard: [
        {
            id: "agtech-startup-01",
            name: "אגריטק חדשנות",
            sector: "טכנולוגיה חקלאית",
            symbol: "AGRI",
            price: 85.00,
            tier: 3,
            description: "סטארטאפ המפתח טכנולוגיית חקלאות מדייקת באמצעות AI ודרונים. מערכת לניהול השקיה והדברה חכמה. 200 חקלאים משתמשים במוצר. שותפות עם משרד החקלאות. צמיחה מהירה אך הפסדים.",
            management: "מייסדים מהאקדמיה עם ידע עמוק באגרונומיה ו-AI. גייסו COO עם ניסיון בסקיילינג. board חזק כולל שותף מקרן VC מובילה. אך חסר ניסיון בניהול פיננסי.",
            moat: "טכנולוגיה מתקדמת אך קלה לחיקוי. נתונים שנאספו מ-500,000 דונם - יתרון משמעותי. אך שוק מפוצל עם מתחרים רבים. חקלאים שמרנים ואיטיים לאמץ טכנולוגיה.",
            events: "גיוס 150 מיליון ₪ בהערכת שווי של 800 מיליון. השקת מוצר חדש לכרמים עם תוצאות מרשימות. כניסה לשוק האירופי. הפסדים גדלים עם ההתרחבות.",
            metrics: {
                basic: [
                    { name: "P/E", value: "N/A - הפסדים" },
                    { name: "P/S", value: "3.6" },
                    { name: "תשואת דיבידנד", value: "0%" }
                ],
                advanced: [
                    { name: "ROIC", value: "-5%" },
                    { name: "FCF (מיליון ₪)", value: "-80" },
                    { name: "Gross margin", value: "65%" },
                    { name: "R&D/Sales", value: "30%" },
                    { name: "Customer retention", value: "85%" },
                    { name: "Land under mgmt", value: "500K דונם" },
                    { name: "Cash runway", value: "24 חודשים" }
                ]
            },
            historicalData: [
                { year: 2019, revenue: 20, fcf: -60 },
                { year: 2020, revenue: 40, fcf: -70 },
                { year: 2021, revenue: 80, fcf: -75 },
                { year: 2022, revenue: 150, fcf: -80 },
                { year: 2023, revenue: 220, fcf: -80 }
            ],
            projectedData: [
                { year: 2024, revenue: 350, fcf: -60 },
                { year: 2025, revenue: 500, fcf: -20 }
            ],
            correctDecision: "pass",
            pointValue: 200,
            hints: [
                { cost: 0.5, text: "טכנולוגיה מבטיחה לא מספיקה. חפשו נתיב לרווחיות." }
            ],
            // REASONING SYSTEM - Tier 3+
            reasoningOptions: [
                { id: "r1", text: "FCF שלילי מתמשך מראה שהחברה לא מייצרת ערך", isCorrect: true, isTrap: false, appliesToDecision: "pass", principleId: "owner-earnings" },
                { id: "r2", text: "אין נתיב ברור לרווחיות - תלות בגיוסים נוספים", isCorrect: true, isTrap: false, appliesToDecision: "pass", principleId: "owner-earnings" },
                { id: "r3", text: "צמיחה מרשימה במכירות מצדיקה השקעה", isCorrect: false, isTrap: true, appliesToDecision: "buy", principleId: "growth-trap" },
                { id: "r4", text: "שוק החקלאות הדיוקנית צומח - הזדמנות גדולה", isCorrect: false, isTrap: false, appliesToDecision: "buy", principleId: null },
                { id: "r5", text: "P/S של 3.6 נמוך יחסית לחברות צמיחה", isCorrect: false, isTrap: true, appliesToDecision: "buy", principleId: "growth-trap" },
                { id: "r6", text: "הטכנולוגיה קלה לחיקוי - אין moat אמיתי", isCorrect: true, isTrap: false, appliesToDecision: "pass", principleId: "moat" }
            ],
            feedback: {
                principle: { id: "owner-earnings", name: "רווחי בעלים" },
                decisiveSignals: ["FCF שלילי מתמשך", "burn rate גבוה", "אין נתיב ברור לרווחיות"],
                correctExplanation: "נכון! חברה עם טכנולוגיה מעניינת אך ללא נתיב ברור לרווחיות. burn rate גבוה.",
                incorrectExplanation: "טעות! השקעה בחברות agtech ספקולטיביות עם הפסדים גדולים לא מתאימה להשקעת ערך.",
                reasoningFeedback: {
                    fullCorrect: "מצוין! זיהית נכון את הבעיות המרכזיות - FCF שלילי וחוסר moat.",
                    partialCorrect: "טוב, אבל לא זיהית את כל הנקודות המרכזיות.",
                    fellForTrap: "נפלת במלכודת! צמיחה במכירות לא שווה כלום ללא רווחיות."
                }
            },
            isGoodValue: false,
            difficulty: "hard",
            difficultyValue: 3,
            hint: "טכנולוגיה מבטיחה לא מספיקה. חפשו נתיב לרווחיות."
        },
        {
            id: "energy-traditional-01",
            name: "חברת אנרגיה מסורתית",
            sector: "נפט וגז",
            symbol: "ENER",
            price: 22.40,
            tier: 3,
            description: "חברת חיפושי גז עם 3 שדות מפיקים ו-5 רישיונות חיפוש. רזרבות מוכחות ל-15 שנה. 80% מהגז נמכר בחוזים ארוכי טווח לחברת החשמל. תזרים חזק אך ירידה בהשקעות בחיפושים חדשים. לחץ רגולטורי למעבר לאנרגיה ירוקה. חלוקת 80% מהרווח כדיבידנד.",
            management: "CEO ותיק בענף עם גישה שמרנית. דירקטוריון מבוגר עם ממוצע גיל 65. התנגדות לשינוי ולהשקעות באנרגיה מתחדשת. פוקוס על החזר מקסימלי לבעלי מניות בטווח הקצר.",
            moat: "נכסי גז מפיקים עם חוזים ארוכים. רישיונות בלעדיים לחיפוש. מומחיות טכנית עמוקה. אך ענף בדעיכה ארוכת טווח. תחליפים ירוקים הולכים ונעשים תחרותיים.",
            events: "גילוי גז קטן באחד הרישיונות. מס פחמן חדש יפגע ברווחיות ב-10%. קרנות ESG מוכרות את המניה. דיבידנד מיוחד של 5 ₪ למניה הוכרז.",
            metrics: {
                basic: [
                    { name: "P/E", value: "4.5" },
                    { name: "ROE", value: "25%" },
                    { name: "תשואת דיבידנד", value: "12%" },
                    { name: "P/B", value: "0.6" }
                ],
                advanced: [
                    { name: "ROIC", value: "20%" },
                    { name: "FCF (מיליון ₪)", value: "500" },
                    { name: "Reserve life", value: "15 שנים" },
                    { name: "Finding cost", value: "$8/BOE" },
                    { name: "Depletion rate", value: "7% שנתי" },
                    { name: "ESG score", value: "D rating" },
                    { name: "CapEx/OCF", value: "20%" }
                ]
            },
            historicalData: [
                { year: 2019, revenue: 1200, fcf: 600 },
                { year: 2020, revenue: 900, fcf: 400 },
                { year: 2021, revenue: 1400, fcf: 700 },
                { year: 2022, revenue: 1600, fcf: 800 },
                { year: 2023, revenue: 1300, fcf: 500 }
            ],
            projectedData: [
                { year: 2024, revenue: 1200, fcf: 450 },
                { year: 2025, revenue: 1100, fcf: 400 }
            ],
            correctDecision: "buy",
            pointValue: 200,
            hints: [
                { cost: 0.5, text: "ערך עמוק יכול להימצא גם בענפים לא פופולריים. 15 שנות רזרבות זה הרבה." }
            ],
            // REASONING SYSTEM - Tier 3+
            reasoningOptions: [
                { id: "r1", text: "P/E של 4.5 עם FCF yield של 22% - זול קיצוני", isCorrect: true, isTrap: false, appliesToDecision: "buy", principleId: "margin-of-safety" },
                { id: "r2", text: "רזרבות ל-15 שנה מבטיחות תזרים ארוך טווח", isCorrect: true, isTrap: false, appliesToDecision: "buy", principleId: "owner-earnings" },
                { id: "r3", text: "ESG rating נמוך - קרנות ימשיכו למכור", isCorrect: false, isTrap: true, appliesToDecision: "pass", principleId: null },
                { id: "r4", text: "ענף בדעיכה - לא מתאים להשקעה", isCorrect: false, isTrap: false, appliesToDecision: "pass", principleId: null },
                { id: "r5", text: "דיבידנד 12% בר-קיימא עם FCF חזק", isCorrect: true, isTrap: false, appliesToDecision: "buy", principleId: "dividend-sustainability" },
                { id: "r6", text: "הנהלה לא משקיעה בצמיחה - סימן שלילי", isCorrect: false, isTrap: false, appliesToDecision: "pass", principleId: null }
            ],
            feedback: {
                principle: { id: "margin-of-safety", name: "מרווח ביטחון" },
                decisiveSignals: ["P/E של 4.5 - זול מאוד", "FCF yield של 22%", "רזרבות ל-15 שנה", "דיבידנד 12%"],
                counterSignalExplanation: "ESG rating נמוך ומגמות נגד דלקים מאובנים הם סיכונים ארוכי טווח, אך התמחור כבר משקף אותם.",
                correctExplanation: "נכון! למרות הענף הבעייתי, זו חברה עם תזרים עצום ותמחור זול מאוד. ערך קלאסי.",
                incorrectExplanation: "פספוס! 12% דיבידנד עם P/E של 4.5 ו-15 שנות רזרבות - ערך מובהק למי שלא חושש מ-ESG.",
                reasoningFeedback: {
                    fullCorrect: "מעולה! זיהית את מרווח הביטחון העצום והתזרים החזק.",
                    partialCorrect: "בכיוון הנכון, אבל יש עוד נקודות חשובות.",
                    fellForTrap: "נפלת במלכודת! ESG rating אינו מדד לערך פנימי."
                }
            },
            isGoodValue: true,
            difficulty: "hard",
            difficultyValue: 3,
            hint: "ערך עמוק יכול להימצא גם בענפים לא פופולריים. 15 שנות רזרבות זה הרבה."
        },
        {
            id: "defense-contractor-01",
            name: "מגן-טק מערכות",
            sector: "ביטחון",
            symbol: "MGTK",
            price: 195.00,
            tier: 3,
            description: "חברת ביטחון ישראלית המייצרת מערכות תקשורת מאובטחות לצבאות. 60% מההכנסות מיצוא.",
            management: "מנכ\"ל לשעבר בתעשיות ביטחוניות. צוות הנדסה מהשורה הראשונה.",
            moat: "סיווג ביטחוני, חוזים ארוכי טווח עם מדינות, IP מוגן, רישיונות מיוחדים.",
            events: "זכייה במכרז צבאי גדול, הרחבת פעילות לאסיה, חתימה על חוזה 5 שנים.",
            metrics: {
                basic: [
                    { name: "P/E", value: "18" },
                    { name: "ROE", value: "22%" },
                    { name: "צמיחת הכנסות", value: "15%" }
                ],
                advanced: [
                    { name: "ROIC", value: "19%" },
                    { name: "FCF (מיליון ₪)", value: "120" },
                    { name: "Backlog (שנות הכנסה)", value: "3.2" }
                ]
            },
            historicalData: [
                { year: 2019, revenue: 650, fcf: 70 },
                { year: 2020, revenue: 720, fcf: 82 },
                { year: 2021, revenue: 800, fcf: 95 },
                { year: 2022, revenue: 900, fcf: 108 },
                { year: 2023, revenue: 1020, fcf: 120 }
            ],
            projectedData: [
                { year: 2024, revenue: 1150, fcf: 140 },
                { year: 2025, revenue: 1300, fcf: 160 }
            ],
            correctDecision: "buy",
            pointValue: 200,
            hints: [{ cost: 0.5, text: "בדקו כמה שנות הכנסה כבר חתומות בחוזים — ומה זה אומר על הסיכון." }],
            feedback: {
                principle: { id: "moat", name: "חפיר כלכלי" },
                decisiveSignals: ["backlog 3.2 שנים", "סיווג ביטחוני", "ROIC 19%"],
                correctExplanation: "מצוין! חפיר ביטחוני + backlog חזק = הכנסות צפויות לשנים קדימה.",
                incorrectExplanation: "פספוס! חברת ביטחון עם backlog גדול היא מהבטוחות בשוק."
            },
            isGoodValue: true, difficulty: "hard", difficultyValue: 3,
            hint: "בדקו כמה שנות הכנסה כבר חתומות בחוזים — ומה זה אומר על הסיכון."
        },
        {
            id: "luxury-retail-01",
            name: "פרימיום סטייל בע\"מ",
            sector: "קמעונאות יוקרה",
            symbol: "PRMS",
            price: 125.00,
            tier: 3,
            description: "רשת חנויות אופנת יוקרה ב-8 קניונים. נפגעה מהאטה כלכלית ומסחר אונליין.",
            management: "מנכ\"ל חדש שניסה מהפכה דיגיטלית — ההוצאות עלו אבל ההכנסות לא.",
            moat: "מותגי יוקרה בלעדיים, אבל הבלעדיות הולכת ונשחקת. אין נאמנות אמיתית.",
            events: "סגירת 2 סניפים, ירידה של 20% ברווח, חוב עלה בגלל שיפוץ חנויות.",
            metrics: {
                basic: [
                    { name: "P/E", value: "8" },
                    { name: "ROE", value: "9%" },
                    { name: "תשואת דיבידנד", value: "6.5%" }
                ],
                advanced: [
                    { name: "ROIC", value: "7%" },
                    { name: "FCF (מיליון ₪)", value: "25" },
                    { name: "חוב/EBITDA", value: "3.5" }
                ]
            },
            historicalData: [
                { year: 2019, revenue: 450, fcf: 55 },
                { year: 2020, revenue: 280, fcf: 10 },
                { year: 2021, revenue: 380, fcf: 40 },
                { year: 2022, revenue: 360, fcf: 35 },
                { year: 2023, revenue: 320, fcf: 25 }
            ],
            projectedData: [
                { year: 2024, revenue: 290, fcf: 18 },
                { year: 2025, revenue: 270, fcf: 12 }
            ],
            correctDecision: "pass",
            pointValue: 200,
            hints: [{ cost: 0.5, text: "חוב/EBITDA של 3.5 עם הכנסות יורדות — מה המשמעות?" }],
            feedback: {
                principle: { id: "leverage-risk", name: "סיכון מינוף" },
                decisiveSignals: ["חוב/EBITDA 3.5", "הכנסות יורדות", "חפיר נשחק"],
                correctExplanation: "נכון! חוב גבוה + הכנסות יורדות = סיכון מינוף מסוכן.",
                incorrectExplanation: "טעות! P/E של 8 מפתה אבל החוב הגבוה עם ירידה בהכנסות = סיכון."
            },
            isGoodValue: false, difficulty: "hard", difficultyValue: 3,
            hint: "חוב/EBITDA של 3.5 עם הכנסות יורדות — מה המשמעות?"
        },
        {
            id: "medical-lab-01",
            name: "מעבדות ביו-טסט",
            sector: "בריאות",
            symbol: "BTST",
            price: 110.00,
            tier: 3,
            description: "רשת מעבדות רפואיות עם 45 סניפים. מבצעת בדיקות דם, פתולוגיה וגנטיקה.",
            management: "מנכ\"ל רופא עם 20 שנות ניסיון. הנהלה יציבה, אסטרטגיה ברורה.",
            moat: "אישורי רגולציה מורכבים, חוזים עם קופות חולים, מומחיות מעבדתית.",
            events: "כניסה לבדיקות גנטיות מתקדמות, חוזה חדש עם קופ\"ח גדולה, גידול ב-FCF.",
            metrics: {
                basic: [
                    { name: "P/E", value: "15" },
                    { name: "ROE", value: "24%" },
                    { name: "צמיחת הכנסות", value: "10%" }
                ],
                advanced: [
                    { name: "ROIC", value: "20%" },
                    { name: "FCF (מיליון ₪)", value: "92" },
                    { name: "הכנסה חוזרת", value: "78%" }
                ]
            },
            historicalData: [
                { year: 2019, revenue: 420, fcf: 55 },
                { year: 2020, revenue: 480, fcf: 65 },
                { year: 2021, revenue: 520, fcf: 72 },
                { year: 2022, revenue: 570, fcf: 82 },
                { year: 2023, revenue: 620, fcf: 92 }
            ],
            projectedData: [
                { year: 2024, revenue: 680, fcf: 102 },
                { year: 2025, revenue: 740, fcf: 115 }
            ],
            correctDecision: "buy",
            pointValue: 200,
            hints: [{ cost: 0.5, text: "בדקו את מבנה ההכנסות — כמה מהן חד-פעמיות וכמה חוזרות?" }],
            feedback: {
                principle: { id: "owner-earnings", name: "רווחי בעלים" },
                decisiveSignals: ["78% הכנסה חוזרת", "ROIC 20%", "חפיר רגולטורי"],
                correctExplanation: "מצוין! עסק עם הכנסות חוזרות, רווחיות גבוהה וחפיר רגולטורי.",
                incorrectExplanation: "פספוס! מעבדות רפואיות עם 78% הכנסה חוזרת — עסק באיכות גבוהה."
            },
            isGoodValue: true, difficulty: "hard", difficultyValue: 3,
            hint: "בדקו את מבנה ההכנסות — כמה מהן חד-פעמיות וכמה חוזרות?"
        },
        {
            id: "construction-materials-01",
            name: "בטון הצפון בע\"מ",
            sector: "חומרי בנייה",
            symbol: "BTZF",
            price: 65.00,
            tier: 3,
            description: "יצרנית בטון ואגרגטים מובילה בצפון הארץ. 3 מחצבות ו-8 מתקני בטון.",
            management: "דור שלישי. מנכ\"ל מנוסה. אסטרטגיית 'buy and build' של מתחרים קטנים.",
            moat: "מחצבות הן נכסים שלא ניתנים לשכפול. רגולציה מונעת מחצבות חדשות. מונופול אזורי.",
            events: "רכישת מחצבה נוספת, העלאת מחירי בטון 12%, ביקוש גבוה מבנייה.",
            metrics: {
                basic: [
                    { name: "P/E", value: "11" },
                    { name: "ROE", value: "18%" },
                    { name: "צמיחת הכנסות", value: "8%" }
                ],
                advanced: [
                    { name: "ROIC", value: "16%" },
                    { name: "FCF (מיליון ₪)", value: "78" },
                    { name: "כוח תמחור", value: "חזק" }
                ]
            },
            historicalData: [
                { year: 2019, revenue: 380, fcf: 48 },
                { year: 2020, revenue: 360, fcf: 42 },
                { year: 2021, revenue: 410, fcf: 55 },
                { year: 2022, revenue: 460, fcf: 68 },
                { year: 2023, revenue: 500, fcf: 78 }
            ],
            projectedData: [
                { year: 2024, revenue: 540, fcf: 85 },
                { year: 2025, revenue: 580, fcf: 92 }
            ],
            correctDecision: "buy",
            pointValue: 200,
            hints: [{ cost: 0.5, text: "מחצבות הן נכסים שלא ניתנים לשכפול — כמו באפט אוהב." }],
            feedback: {
                principle: { id: "moat", name: "חפיר כלכלי" },
                decisiveSignals: ["מונופול אזורי", "מחצבות לא ניתנות לשכפול", "כוח תמחור"],
                correctExplanation: "מצוין! נכסים שלא ניתנים לשכפול עם מונופול אזורי — חפיר מושלם.",
                incorrectExplanation: "פספוס! מחצבות הן כמו 'toll bridge' של באפט — אי אפשר לעקוף."
            },
            isGoodValue: true, difficulty: "hard", difficultyValue: 3,
            hint: "מחצבות הן נכסים שלא ניתנים לשכפול — כמו באפט אוהב."
        },
        {
            id: "rental-cars-debt-01",
            name: "השכרת רכב ישיר בע\"מ",
            sector: "השכרת רכב",
            symbol: "HSHR",
            price: 22.00,
            tier: 3,
            description: "חברת השכרת רכב גדולה עם 5,000 רכבים. רווחית אבל מלאת חוב.",
            management: "מנכ\"ל אגרסיבי שהגדיל את הצי ב-50% על חשבון חוב.",
            moat: "גודל ונגישות, אבל תחרות עזה. ירידת ערך מהירה של הצי.",
            events: "עלייה בריבית מייקרת את החוב. ירידת ערך רכבים חדשים מאיימת על הרווח.",
            metrics: {
                basic: [
                    { name: "P/E", value: "6" },
                    { name: "ROE", value: "15%" },
                    { name: "תשואת דיבידנד", value: "0%" }
                ],
                advanced: [
                    { name: "ROIC", value: "4%" },
                    { name: "FCF (מיליון ₪)", value: "30" },
                    { name: "חוב/הון", value: "4.2" }
                ]
            },
            historicalData: [
                { year: 2019, revenue: 600, fcf: 40 },
                { year: 2020, revenue: 350, fcf: -50 },
                { year: 2021, revenue: 550, fcf: 35 },
                { year: 2022, revenue: 700, fcf: 55 },
                { year: 2023, revenue: 750, fcf: 30 }
            ],
            projectedData: [
                { year: 2024, revenue: 780, fcf: 20 },
                { year: 2025, revenue: 800, fcf: 15 }
            ],
            correctDecision: "pass",
            pointValue: 200,
            hints: [{ cost: 0.5, text: "ROE של 15% נראה טוב — אבל איך הוא מושג? בדקו את המינוף." }],
            feedback: {
                principle: { id: "leverage-risk", name: "סיכון מינוף" },
                decisiveSignals: ["חוב/הון 4.2", "ROIC 4% בלבד", "FCF יורד"],
                correctExplanation: "נכון! ROE גבוה מומן ע\"י חוב עצום — ROIC האמיתי רק 4%.",
                incorrectExplanation: "טעות! ROE של 15% מטעה — כשמסתכלים על ROIC (4%) רואים שהחוב עושה את העבודה."
            },
            isGoodValue: false, difficulty: "hard", difficultyValue: 3,
            hint: "ROE של 15% נראה טוב — אבל איך הוא מושג? בדקו את המינוף."
        },
        {
            id: "waste-management-01",
            name: "איכות הסביבה בע\"מ",
            sector: "סביבה",
            symbol: "SVIV",
            price: 78.00,
            tier: 3,
            description: "חברת טיפול בפסולת מובילה. מפעילה 3 אתרי הטמנה ומיחזור עם רישיונות ל-25 שנה.",
            management: "מנכ\"ל מהנדס סביבתי. הנהלה יציבה עם אסטרטגיה ארוכת טווח.",
            moat: "רישיונות סביבתיים נדירים — כמעט בלתי אפשרי לקבל חדשים. מונופול אזורי.",
            events: "חקיקה חדשה מחייבת מחזור — מגדילה ביקוש. הרחבת אתר מיחזור.",
            metrics: {
                basic: [
                    { name: "P/E", value: "14" },
                    { name: "ROE", value: "21%" },
                    { name: "צמיחת הכנסות", value: "9%" }
                ],
                advanced: [
                    { name: "ROIC", value: "17%" },
                    { name: "FCF (מיליון ₪)", value: "88" },
                    { name: "חוזים ממוצע (שנים)", value: "12" }
                ]
            },
            historicalData: [
                { year: 2019, revenue: 350, fcf: 55 },
                { year: 2020, revenue: 370, fcf: 60 },
                { year: 2021, revenue: 400, fcf: 68 },
                { year: 2022, revenue: 440, fcf: 78 },
                { year: 2023, revenue: 480, fcf: 88 }
            ],
            projectedData: [
                { year: 2024, revenue: 520, fcf: 98 },
                { year: 2025, revenue: 560, fcf: 108 }
            ],
            correctDecision: "buy",
            pointValue: 200,
            hints: [{ cost: 0.5, text: "חשבו על חסמי כניסה בענפים רגולטוריים — מה הם שווים?" }],
            feedback: {
                principle: { id: "moat", name: "חפיר כלכלי" },
                decisiveSignals: ["רישיונות נדירים", "מונופול אזורי", "רגולציה מגבירה ביקוש"],
                correctExplanation: "מצוין! רישיונות בלתי-ניתנים-לשכפול + רגולציה שמגדילה ביקוש = חפיר אידיאלי.",
                incorrectExplanation: "פספוס! עסק פסולת 'משעמם' עם חפיר רגולטורי — סגנון באפט מובהק."
            },
            isGoodValue: true, difficulty: "hard", difficultyValue: 3,
            hint: "חשבו על חסמי כניסה בענפים רגולטוריים — מה הם שווים?"
        },
        {
            id: "fintech-lending-01",
            name: "קרדיט-נאו טכנולוגיות",
            sector: "פינטק",
            symbol: "CRDN",
            price: 165.00,
            tier: 3,
            description: "פלטפורמת הלוואות P2P שצמחה מהר. משתמשת ב-AI לדירוג אשראי.",
            management: "מייסד צעיר ושאפתני. גיוסי הון מרשימים אבל חסר ניסיון במשברי אשראי.",
            moat: "אלגוריתם AI ייחודי, אבל מתחרים רבים. טרם נבחן במיתון.",
            events: "צמיחה של 50% אבל עלייה בחובות אבודים. רגולטור דורש הון מינימלי.",
            metrics: {
                basic: [
                    { name: "P/E", value: "40" },
                    { name: "ROE", value: "18%" },
                    { name: "צמיחה", value: "50%" }
                ],
                advanced: [
                    { name: "ROIC", value: "10%" },
                    { name: "חובות אבודים", value: "4.5% (עולה)" },
                    { name: "FCF (מיליון ₪)", value: "15" }
                ]
            },
            historicalData: [
                { year: 2019, revenue: 30, fcf: -5 },
                { year: 2020, revenue: 60, fcf: 2 },
                { year: 2021, revenue: 120, fcf: 10 },
                { year: 2022, revenue: 200, fcf: 18 },
                { year: 2023, revenue: 300, fcf: 15 }
            ],
            projectedData: [
                { year: 2024, revenue: 400, fcf: 10 },
                { year: 2025, revenue: 500, fcf: 5 }
            ],
            correctDecision: "pass",
            pointValue: 200,
            hints: [{ cost: 0.5, text: "הכנסות גדלות אבל FCF יורד — למה?" }],
            feedback: {
                principle: { id: "circle-of-competence", name: "מעגל כשירות" },
                decisiveSignals: ["P/E 40", "חובות אבודים עולים", "FCF יורד למרות צמיחה"],
                correctExplanation: "נכון! צמיחה מרשימה אבל חובות אבודים עולים = הסיכון גדל עם הגודל.",
                incorrectExplanation: "טעות! P/E 40 + חובות אבודים גדלים + FCF יורד = צמיחה לא בריאה."
            },
            isGoodValue: false, difficulty: "hard", difficultyValue: 3,
            hint: "הכנסות גדלות אבל FCF יורד — למה?"
        },
        {
            id: "veterinary-chain-01",
            name: "וט-קייר שירותים",
            sector: "בריאות",
            symbol: "VTCR",
            price: 92.00,
            tier: 3,
            description: "רשת 30 מרפאות וטרינריות. שוק חיות המחמד צומח 8% בשנה.",
            management: "מנכ\"ל וטרינר לשעבר. אסטרטגיית roll-up — רוכש מרפאות עצמאיות.",
            moat: "נאמנות בעלי חיות לוטרינר, נוחות גאוגרפית, מכירות חוזרות.",
            events: "רכישת 5 מרפאות בשנה האחרונה. השקת חנות מקוונת לציוד לחיות מחמד.",
            metrics: {
                basic: [
                    { name: "P/E", value: "17" },
                    { name: "ROE", value: "19%" },
                    { name: "צמיחת הכנסות", value: "20%" }
                ],
                advanced: [
                    { name: "ROIC", value: "15%" },
                    { name: "FCF (מיליון ₪)", value: "48" },
                    { name: "הכנסה חוזרת", value: "72%" }
                ]
            },
            historicalData: [
                { year: 2019, revenue: 120, fcf: 18 },
                { year: 2020, revenue: 150, fcf: 22 },
                { year: 2021, revenue: 190, fcf: 30 },
                { year: 2022, revenue: 240, fcf: 38 },
                { year: 2023, revenue: 300, fcf: 48 }
            ],
            projectedData: [
                { year: 2024, revenue: 360, fcf: 58 },
                { year: 2025, revenue: 430, fcf: 70 }
            ],
            correctDecision: "buy",
            pointValue: 200,
            hints: [{ cost: 0.5, text: "בדקו את איכות הצמיחה — האם היא מלווה בשימור לקוחות ורווחיות?" }],
            feedback: {
                principle: { id: "moat", name: "חפיר כלכלי" },
                decisiveSignals: ["72% הכנסה חוזרת", "שוק צומח 8%", "אסטרטגיית roll-up מוצלחת"],
                correctExplanation: "מצוין! שוק חיות מחמד צומח + הכנסות חוזרות + roll-up = צמיחה רווחית.",
                incorrectExplanation: "פספוס! שוק צומח עם הכנסות חוזרות ו-ROIC טוב — השקעה מצוינת."
            },
            isGoodValue: true, difficulty: "hard", difficultyValue: 3,
            hint: "בדקו את איכות הצמיחה — האם היא מלווה בשימור לקוחות ורווחיות?"
        },
        {
            id: "textile-legacy-01",
            name: "טקסטיל הגליל בע\"מ",
            sector: "טקסטיל",
            symbol: "TXGL",
            price: 12.00,
            tier: 3,
            description: "מפעל טקסטיל ותיק. המחירים נשחקים מייבוא זול מאסיה. מפעל ישן ובלתי-יעיל.",
            management: "מנכ\"ל שמגן על המצב הקיים. אין השקעה בחדשנות או מודרניזציה.",
            moat: "אין. תחרות עזה מייבוא. עלויות עבודה בישראל גבוהות.",
            events: "סגירת קו ייצור, פיטורי 50 עובדים, ירידה נוספת ברווחים.",
            metrics: {
                basic: [
                    { name: "P/E", value: "4" },
                    { name: "ROE", value: "3%" },
                    { name: "תשואת דיבידנד", value: "9%" }
                ],
                advanced: [
                    { name: "ROIC", value: "2%" },
                    { name: "FCF (מיליון ₪)", value: "8" },
                    { name: "ירידת הכנסות", value: "12% שנתי" }
                ]
            },
            historicalData: [
                { year: 2019, revenue: 200, fcf: 18 },
                { year: 2020, revenue: 170, fcf: 14 },
                { year: 2021, revenue: 150, fcf: 12 },
                { year: 2022, revenue: 130, fcf: 10 },
                { year: 2023, revenue: 115, fcf: 8 }
            ],
            projectedData: [
                { year: 2024, revenue: 100, fcf: 5 },
                { year: 2025, revenue: 85, fcf: 2 }
            ],
            correctDecision: "pass",
            pointValue: 200,
            hints: [{ cost: 0.5, text: "P/E של 4 ודיבידנד 9% — אבל מה קורה ל-FCF?" }],
            feedback: {
                principle: { id: "value-trap", name: "מלכודת ערך" },
                decisiveSignals: ["ROIC 2%", "הכנסות יורדות 12% שנתי", "אין חפיר נגד ייבוא"],
                correctExplanation: "נכון! P/E ודיבידנד מטעים — הדיבידנד ייחתך כש-FCF ממשיך לרדת.",
                incorrectExplanation: "טעות! מלכודת ערך קלאסית — מספרים 'זולים' מסתירים עסק גוסס."
            },
            isGoodValue: false, difficulty: "hard", difficultyValue: 3,
            hint: "P/E של 4 ודיבידנד 9% — אבל מה קורה ל-FCF?"
        },
        {
            id: "data-center-01",
            name: "ענן-מגה תשתיות",
            sector: "טכנולוגיה",
            symbol: "ANMG",
            price: 155.00,
            tier: 3,
            description: "מפעילת 3 מרכזי מידע בישראל. מספקת שירותי hosting וענן לחברות גדולות.",
            management: "מנכ\"ל מנוסה מתחום התשתיות. אסטרטגיית הרחבה שקולה.",
            moat: "עלויות מעבר גבוהות, חוזי SLA רב-שנתיים, השקעת הון ראשונית כבדה של מתחרים.",
            events: "חתימה על חוזה 7 שנים עם בנק גדול. בניית מרכז מידע רביעי.",
            metrics: {
                basic: [
                    { name: "P/E", value: "19" },
                    { name: "ROE", value: "16%" },
                    { name: "צמיחת הכנסות", value: "14%" }
                ],
                advanced: [
                    { name: "ROIC", value: "13%" },
                    { name: "FCF (מיליון ₪)", value: "68" },
                    { name: "אורך חוזה ממוצע", value: "5.2 שנים" }
                ]
            },
            historicalData: [
                { year: 2019, revenue: 280, fcf: 35 },
                { year: 2020, revenue: 310, fcf: 40 },
                { year: 2021, revenue: 350, fcf: 48 },
                { year: 2022, revenue: 400, fcf: 58 },
                { year: 2023, revenue: 460, fcf: 68 }
            ],
            projectedData: [
                { year: 2024, revenue: 520, fcf: 78 },
                { year: 2025, revenue: 590, fcf: 90 }
            ],
            correctDecision: "buy",
            pointValue: 200,
            hints: [{ cost: 0.5, text: "בדקו את אורך החוזים הממוצע — ומה זה אומר על חסם הכניסה." }],
            feedback: {
                principle: { id: "owner-earnings", name: "רווחי בעלים" },
                decisiveSignals: ["חוזי 5+ שנים", "עלויות מעבר כבדות", "FCF צומח בעקביות"],
                correctExplanation: "מצוין! מרכזי מידע עם לקוחות 'נעולים' — הכנסות צפויות לשנים.",
                incorrectExplanation: "פספוס! תשתיות ענן עם חוזים ארוכים — עסק עם ודאות גבוהה."
            },
            isGoodValue: true, difficulty: "hard", difficultyValue: 3,
            hint: "בדקו את אורך החוזים הממוצע — ומה זה אומר על חסם הכניסה."
        },
        {
            id: "coworking-space-01",
            name: "ספייס-פלוס בע\"מ",
            sector: "נדל\"ן",
            symbol: "SPPL",
            price: 35.00,
            tier: 3,
            description: "רשת חללי עבודה משותפים עם 15 מתחמים. חוזי שכירות ארוכים, השכרה לחודש.",
            management: "מנכ\"ל מעולם הנדל\"ן. צמיחה אגרסיבית ממונפת בחוב.",
            moat: "אין — תחרות עזה. WeWork נכשלה באותו מודל. שוכרים עוזבים בקלות.",
            events: "תפוסה ירדה ל-65%. חוזה שכירות ארוך על מתחם שעומד ריק. חוב כבד.",
            metrics: {
                basic: [
                    { name: "P/E", value: "N/A (הפסדי)" },
                    { name: "ROE", value: "-20%" },
                    { name: "תשואת דיבידנד", value: "0%" }
                ],
                advanced: [
                    { name: "ROIC", value: "-8%" },
                    { name: "FCF (מיליון ₪)", value: "-45" },
                    { name: "חוב/הון", value: "5.5" }
                ]
            },
            historicalData: [
                { year: 2019, revenue: 80, fcf: 5 },
                { year: 2020, revenue: 50, fcf: -30 },
                { year: 2021, revenue: 70, fcf: -20 },
                { year: 2022, revenue: 110, fcf: -10 },
                { year: 2023, revenue: 120, fcf: -45 }
            ],
            projectedData: [
                { year: 2024, revenue: 100, fcf: -55 },
                { year: 2025, revenue: 90, fcf: -50 }
            ],
            correctDecision: "pass",
            pointValue: 200,
            hints: [{ cost: 0.5, text: "חוב/הון 5.5 עם FCF שלילי — כמה זמן החברה יכולה להחזיק?" }],
            feedback: {
                principle: { id: "leverage-risk", name: "סיכון מינוף" },
                decisiveSignals: ["חוב/הון 5.5", "FCF שלילי -45M", "תפוסה 65% בלבד"],
                correctExplanation: "נכון! מודל WeWork — שכירות ארוכה, השכרה קצרה, חוב כבד = אסון.",
                incorrectExplanation: "טעות! חוב 5.5x הון עם FCF שלילי — החברה בסכנת פשיטת רגל."
            },
            isGoodValue: false, difficulty: "hard", difficultyValue: 3,
            hint: "חוב/הון 5.5 עם FCF שלילי — כמה זמן החברה יכולה להחזיק?"
        },
        {
            id: "pet-food-01",
            name: "טעם-פט מזון לחיות",
            sector: "מזון",
            symbol: "TMPT",
            price: 68.00,
            tier: 3,
            description: "יצרנית מזון לחיות מחמד מובילה בישראל. מותג מס' 1 בקטגוריה.",
            management: "מנכ\"ל עם 25 שנות ניסיון. מדיניות דיבידנד עקבית ומגדילה.",
            moat: "מותג מס' 1, נאמנות בעלי חיות גבוהה, הפצה ב-95% מנקודות המכירה.",
            events: "השקת קו מזון פרימיום, יצוא לאירופה, שוק חיות מחמד צומח.",
            metrics: {
                basic: [
                    { name: "P/E", value: "16" },
                    { name: "ROE", value: "26%" },
                    { name: "צמיחת הכנסות", value: "11%" }
                ],
                advanced: [
                    { name: "ROIC", value: "23%" },
                    { name: "FCF (מיליון ₪)", value: "55" },
                    { name: "נתח שוק", value: "35%" }
                ]
            },
            historicalData: [
                { year: 2019, revenue: 200, fcf: 30 },
                { year: 2020, revenue: 225, fcf: 35 },
                { year: 2021, revenue: 255, fcf: 40 },
                { year: 2022, revenue: 285, fcf: 48 },
                { year: 2023, revenue: 320, fcf: 55 }
            ],
            projectedData: [
                { year: 2024, revenue: 355, fcf: 62 },
                { year: 2025, revenue: 395, fcf: 70 }
            ],
            correctDecision: "buy",
            pointValue: 200,
            hints: [{ cost: 0.5, text: "בדקו מה מגן על נתח השוק — ואם הרווחיות מצדיקה את המחיר." }],
            feedback: {
                principle: { id: "moat", name: "חפיר כלכלי" },
                decisiveSignals: ["מותג מס' 1", "ROIC 23%", "שוק צומח + נאמנות גבוהה"],
                correctExplanation: "מצוין! מותג מוביל בשוק צומח עם ROIC מעולה — סגנון באפט מובהק.",
                incorrectExplanation: "פספוס! מותג מס' 1 בשוק צומח עם רווחיות גבוהה — השקעת ערך מעולה."
            },
            isGoodValue: true, difficulty: "hard", difficultyValue: 3,
            hint: "בדקו מה מגן על נתח השוק — ואם הרווחיות מצדיקה את המחיר."
        }
    ],
    
    expert: [
        {
            id: "supermarket-turnaround-01",
            name: "רשת סופרמרקטים בשיקום",
            sector: "קמעונאות מזון",
            symbol: "RSTS",
            price: 18.50,
            tier: 4,
            description: "רשת סופרמרקטים עם 150 סניפים שעברה 3 שנים קשות של ירידה במכירות וחלקת שוק. לפני 18 חודשים הגיע מנכ\"ל חדש (לשעבר סמנכ\"ל בכיר ב-Walmart) עם תוכנית טרנספורמציה אגרסיבית. סגר 30 סניפים לא רווחיים, שיפץ 50 סניפים מרכזיים, והשיק מותג פרטי פרימיום שכבר מהווה 15% מהמכירות. השקעה של 300 מיליון ₪ בטכנולוגיה כולל מערכת ניהול מלאי מבוססת AI, אפליקציה חדשה, ושירות משלוחים תוך שעתיים. נתח השוק ירד מ-18% ל-14% אך התייצב לאחרונה. עדיין נסחרת ב-70% מהשיא של 2019.",
            management: "המנכ\"ל החדש, דוד כהן, הוביל הפיכה מוצלחת של רשת אמריקאית בעבר והכפיל את ערכה תוך 5 שנים. הביא איתו צוות של 8 מנהלים בכירים מניסיונו הקודם. שינה תרבות ארגונית מ'ניהול לפי נוהל' ל'אובססיה ללקוח'. הפחית הוצאות הנהלה ומטה ב-30% והעביר את החיסכון לשיפור חווית הקנייה. תגמול ההנהלה עבר מבונוסים על מכירות לבונוסים על ROIC ושביעות רצון לקוחות. ביטל פרויקטי יוקרה כמו מטה חדש ב-500 מיליון ₪. משקיע זמן רב בסניפים ומקשיב לעובדים ולקוחות.",
            moat: "אין moat טכנולוגי או מותג חזק בקמעונאות מזון - זה עסק של יעילות תפעולית ונוחות. אבל יש כמה יתרונות: בעלות על נדל\"ן ב-70 סניפים בשווי 2 מיליארד ₪ (לא משועבד), חלקם במיקומי פרימיום שקשה לשכפל. רשת לוגיסטית עם 3 מרכזי הפצה מודרניים לאחר השקעה של 150 מיליון ₪. מותג עם היסטוריה של 40 שנה שעדיין מוכר ל-80% מהאוכלוסייה. יחסים חזקים עם ספקים מקומיים. בסיס של 2 מיליון לקוחות במועדון. עלויות מעבר פסיכולוגיות - רבים חוזרים מהרגל.",
            events: "סיום תוכנית הרה-ארגון עם עלויות חד פעמיות של 200 מיליון ₪ שנרשמו ב-2023. לראשונה מזה 3 שנים same-store sales חיובי (+1.2% ברבעון האחרון). האפליקציה החדשה עם 500K הורדות ו-20% מהמכירות כבר דיגיטליות. מו\"מ למכירת 10 נכסי נדל\"ן לא אסטרטגיים ב-300 מיליון ₪. השקת 50 מוצרי מותג פרטי נוספים. שותפות עם חברת fintech למתן אשראי בקופות. עדיין מפסידה כסף אבל הפסדים מצטמצמים.",
            metrics: {
                basic: [
                    { name: "P/E", value: "N/A - הפסדים" },
                    { name: "EPS", value: "-0.85 ₪" },
                    { name: "תשואת דיבידנד", value: "0%" },
                    { name: "P/B", value: "0.4" }
                ],
                advanced: [
                    { name: "Price/Tangible Book", value: "0.35" },
                    { name: "EV/Sales", value: "0.15" },
                    { name: "Quick Ratio", value: "0.6" },
                    { name: "FCF (מיליון ₪)", value: "-50" },
                    { name: "EBITDA margin", value: "2%" },
                    { name: "Same-store sales", value: "+1.2%" },
                    { name: "Debt/Equity", value: "0.3" },
                    { name: "Inventory turnover", value: "18x" },
                    { name: "Working Capital/Sales", value: "3%" },
                    { name: "CapEx/Sales", value: "2.5%" }
                ]
            },
            historicalData: [
                { year: 2019, revenue: 8500, fcf: 350 },
                { year: 2020, revenue: 8000, fcf: 200 },
                { year: 2021, revenue: 7200, fcf: -100 },
                { year: 2022, revenue: 6800, fcf: -180 },
                { year: 2023, revenue: 6500, fcf: -50 }
            ],
            projectedData: [
                { year: 2024, revenue: 6600, fcf: 50 },
                { year: 2025, revenue: 6900, fcf: 200 }
            ],
            correctDecision: "buy",
            pointValue: 250,
            hints: [
                { cost: 0.5, text: "המנכ\"ל הנוכחי קנה 10 מיליון ₪ במניות החברה ממקורותיו הפרטיים לפני 6 חודשים. הרשת מחזיקה נדל\"ן לא ממונף בשווי שגבוה משמעותית משווי השוק של כל החברה. שימו לב שהחברה כבר חזרה ל-EBITDA חיובי למרות שעדיין מדווחת הפסדים חשבונאיים." }
            ],
            // REASONING SYSTEM - Tier 4 with thesis factors
            reasoningOptions: [
                { id: "r1", text: "נדל\"ן בשווי 2 מיליארד ₪ לעומת שווי שוק נמוך בהרבה", isCorrect: true, isTrap: false, appliesToDecision: "buy", principleId: "margin-of-safety" },
                { id: "r2", text: "מנכ\"ל מוכח עם skin in the game (קנה מניות מכספו)", isCorrect: true, isTrap: false, appliesToDecision: "buy", principleId: "management-quality" },
                { id: "r3", text: "מגמת שיפור ברורה - same-store sales חיובי", isCorrect: true, isTrap: false, appliesToDecision: "buy", principleId: "turnaround" },
                { id: "r4", text: "החברה עדיין מפסידה כסף - סיכון גבוה מדי", isCorrect: false, isTrap: true, appliesToDecision: "pass", principleId: null },
                { id: "r5", text: "ענף הקמעונאות בדעיכה בגלל אונליין", isCorrect: false, isTrap: false, appliesToDecision: "pass", principleId: null },
                { id: "r6", text: "P/B של 0.4 מספק מרווח ביטחון משמעותי", isCorrect: true, isTrap: false, appliesToDecision: "buy", principleId: "margin-of-safety" }
            ],
            sellTriggers: [
                { id: "s1", text: "המנכ\"ל עוזב או מוכר מניות", isCorrect: true },
                { id: "s2", text: "same-store sales חוזרים לשליליים ל-2 רבעונים רצופים", isCorrect: true },
                { id: "s3", text: "המניה עולה ב-50%", isCorrect: false },
                { id: "s4", text: "מכירת נכסי הנדל\"ן במחיר נמוך משמעותית מההערכה", isCorrect: true }
            ],
            dueDiligence: [
                { id: "d1", text: "הערכת שווי עצמאית לנכסי הנדל\"ן", isCorrect: true },
                { id: "d2", text: "ראיון עם המנכ\"ל", isCorrect: true },
                { id: "d3", text: "בדיקת תנאי החוב והקובננטים", isCorrect: true },
                { id: "d4", text: "סקירת הרגלי קנייה של לקוחות באפליקציה", isCorrect: false }
            ],
            feedback: {
                principle: { id: "turnaround", name: "סיפור שיקום" },
                decisiveSignals: ["מנהל מוכח עם skin in the game", "נדל\"ן > שווי שוק", "מגמת שיפור ברורה", "P/B של 0.4"],
                correctExplanation: "מצוין! זיהית סיפור טיפוסי של turnaround - מנהל מוכח, נכסים מוחשיים בשווי גבוה ממחיר השוק, ומגמת שיפור ברורה.",
                incorrectExplanation: "פספוס! זה בדיוק סוג ההזדמנויות שמשקיעי ערך מחפשים - חברה בתחתית עם נכסים חבויים וניהול חדש.",
                reasoningFeedback: {
                    fullCorrect: "מושלם! זיהית את כל הגורמים המרכזיים לסיפור השיקום.",
                    partialCorrect: "טוב, אבל יש עוד נקודות חשובות שכדאי לזהות.",
                    fellForTrap: "נפלת במלכודת! הפסדים חשבונאיים לא אומרים שאין ערך."
                }
            },
            isGoodValue: true,
            difficulty: "hard",
            difficultyValue: 3,
            hint: "המנכ\"ל קנה מניות מכספו. נדל\"ן לא ממונף בשווי גבוה משווי השוק."
        },
        {
            id: "cannabis-medical-01",
            name: "חברת קנאביס רפואי",
            sector: "קנאביס רפואי",
            symbol: "CANN",
            price: 12.50,
            tier: 4,
            description: "אחת מחברות הקנאביס הרפואי הראשונות שהוקמו ב-2013. מתקני גידול מתקדמים, רישיונות ייצור והפצה, 20 זנים רפואיים. 30,000 מטופלים פעילים. בשיאה ב-2021 נסחרה ב-150 ₪ למניה. ירידה של 92% בגלל תחרות, רגולציה, וציפיות מופרזות. אך החברה עדיין רווחית, בניגוד לרוב המתחרות. שוק הקנאביס הרפואי ממשיך לגדול 20% בשנה. רכישות קטנות של מתחרים כושלים.",
            management: "המייסד-CEO, רופא לשעבר, עדיין מוביל אחרי 10 שנים. ניהול שמרני שהתנגד להתרחבות מהירה מדי. CFO מנוסה מתעשיית הפארמה שומר על משמעת פיננסית. תרבות של איכות ומחקר במקום hype. לא חילקו בונוסים ענק בבועה. ההנהלה מחזיקה 25% מהחברה ולא מכרה בשיא. גייסו מעט יחסית הון ונמנעו מדילול. אך חסרים ב-marketing ובחדשנות מוצרים.",
            moat: "אחד הרישיונות הראשונים עם reputation חזק בקרב רופאים. GMP certification למתקני הייצור. IP על זנים ייחודיים ושיטות גידול. בסיס נתונים רפואי יקר ערך. קשרים עם מערכת הבריאות. אך השוק נהיה commoditized. מחירים ירדו 50% ב-3 שנים. קל יחסית לקבל רישיונות חדשים. תחרות מיבוא זול. סטיגמה עדיין קיימת. רגולציה לא יציבה.",
            events: "רכישת מתחרה קטן ב-20 מיליון ₪ הוסיפה 5,000 מטופלים. השקת קו מוצרי CBD ללא מרשם. מחקר קליני חדש בשיתוף בית חולים גדול. הורדת מחירים ב-20% כדי להתחרות. EBITDA margin נשמר על 25%. שוק הייצוא לגרמניה נפתח עם margins גבוהים. רגולטור שוקל להקל בתנאי הרישוי.",
            metrics: {
                basic: [
                    { name: "P/E", value: "8.5" },
                    { name: "EPS", value: "1.47 ₪" },
                    { name: "תשואת דיבידנד", value: "0%" },
                    { name: "P/B", value: "0.7" }
                ],
                advanced: [
                    { name: "ROE", value: "15%" },
                    { name: "ROIC", value: "12%" },
                    { name: "FCF (מיליון ₪)", value: "35" },
                    { name: "EBITDA Margin", value: "25%" },
                    { name: "Revenue per patient", value: "4,000 ₪/year" },
                    { name: "Patient growth", value: "15% YoY" },
                    { name: "Debt/Equity", value: "0.2" },
                    { name: "Quick Ratio", value: "1.8" },
                    { name: "Working Capital/Sales", value: "20%" },
                    { name: "Market Share", value: "12%" }
                ]
            },
            historicalData: [
                { year: 2019, revenue: 80, fcf: 15 },
                { year: 2020, revenue: 100, fcf: 20 },
                { year: 2021, revenue: 130, fcf: 30 },
                { year: 2022, revenue: 140, fcf: 32 },
                { year: 2023, revenue: 150, fcf: 35 }
            ],
            projectedData: [
                { year: 2024, revenue: 165, fcf: 40 },
                { year: 2025, revenue: 180, fcf: 45 }
            ],
            correctDecision: "buy",
            pointValue: 250,
            hints: [
                { cost: 0.5, text: "זו אחת החברות היחידות בענף עם FCF חיובי ו-EBITDA margin של 25%. נסחרת ב-P/E של 8.5 ו-70% מהערך הפנקסני. ההנהלה רכשה מניות בשווי 3 מיליון ₪ בחצי השנה האחרונה. השוק גדל 20% בשנה אך המניה מתומחרת כאילו החברה תיעלם." }
            ],
            // REASONING SYSTEM - Tier 4 with thesis factors
            reasoningOptions: [
                { id: "r1", text: "P/E של 8.5 עם צמיחה של 15% - זול מאוד", isCorrect: true, isTrap: false, appliesToDecision: "buy", principleId: "margin-of-safety" },
                { id: "r2", text: "FCF חיובי בענף שרוב החברות מפסידות", isCorrect: true, isTrap: false, appliesToDecision: "buy", principleId: "owner-earnings" },
                { id: "r3", text: "הנהלה שקונה מניות ולא מכרה בשיא", isCorrect: true, isTrap: false, appliesToDecision: "buy", principleId: "management-quality" },
                { id: "r4", text: "ענף הקנאביס נהרס - המניה ירדה 92%", isCorrect: false, isTrap: true, appliesToDecision: "pass", principleId: null },
                { id: "r5", text: "תחרות גוברת ומחירים יורדים", isCorrect: false, isTrap: false, appliesToDecision: "pass", principleId: null },
                { id: "r6", text: "EBITDA margin של 25% מראה יתרון תחרותי", isCorrect: true, isTrap: false, appliesToDecision: "buy", principleId: "moat" }
            ],
            sellTriggers: [
                { id: "s1", text: "EBITDA margin יורד מתחת ל-15%", isCorrect: true },
                { id: "s2", text: "הנהלה מתחילה למכור מניות", isCorrect: true },
                { id: "s3", text: "שינוי רגולטורי שליחי", isCorrect: true },
                { id: "s4", text: "המניה חוזרת לשיא של 150 ₪", isCorrect: false }
            ],
            dueDiligence: [
                { id: "d1", text: "פגישה עם רופאים שרושמים את המוצרים", isCorrect: true },
                { id: "d2", text: "בדיקת איכות המוצרים וסטנדרטים", isCorrect: true },
                { id: "d3", text: "הבנת הסביבה הרגולטורית", isCorrect: true },
                { id: "d4", text: "ניתוח טכני של המניה", isCorrect: false }
            ],
            feedback: {
                principle: { id: "margin-of-safety", name: "מרווח ביטחון" },
                decisiveSignals: ["FCF חיובי בענף של הפסדים", "P/E של 8.5 עם צמיחה", "הנהלה שקונה מניות", "EBITDA margin חזק"],
                correctExplanation: "נכון! חברה רווחית בענף שעבר בועה ונמצא בתחתית. ב-P/E של 8.5 עם צמיחה, זו הזדמנות.",
                incorrectExplanation: "החמצה! הסנטימנט השלילי סביב הענף יוצר הזדמנות בחברה איכותית שנסחרת בזול קיצוני.",
                reasoningFeedback: {
                    fullCorrect: "מעולה! זיהית את מרווח הביטחון ואת איכות החברה למרות הסנטימנט השלילי.",
                    partialCorrect: "טוב, אבל יש עוד היבטים חשובים.",
                    fellForTrap: "נפלת במלכודת! ירידת מחיר לא אומרת שאין ערך - זה יכול ליצור הזדמנות."
                }
            },
            isGoodValue: true,
            difficulty: "expert",
            difficultyValue: 4,
            hint: "FCF חיובי בענף של הפסדים. P/E של 8.5 עם צמיחה."
        }
    ]
};

// ==============================
// SPECIAL EVENTS DATA
// ==============================
window.BuffettGame.specialEvents = {
    easy: [
        {
            id: "interest-rate-hike-01",
            title: "העלאת ריבית",
            description: "הבנק המרכזי הודיע על העלאת ריבית ב-0.25%.",
            correctImpact: "negative",
            tier: 1,
            pointValue: 100,
            hints: [{ cost: 0.5, text: "חשבו על היוון רווחים עתידיים." }],
            feedback: {
                principle: { id: "leverage-risk", name: "סיכון ריבית" },
                correct: "צודק! העלאת ריבית לרוב משפיעה שלילית על שוק המניות - מייקרת מימון ומורידה תמחור.",
                incorrect: "טעות. העלאת ריבית מייקרת את עלות ההון ופוגעת בתמחור מניות."
            },
            difficulty: "easy",
            difficultyValue: 1
        },
        {
            id: "new-competitor-01",
            title: "תחרות חדשה",
            description: "מתחרה חדש נכנס לשוק עם מוצר זול יותר.",
            correctImpact: "negative",
            tier: 1,
            pointValue: 100,
            hints: [{ cost: 0.5, text: "תחרות חדשה משפיעה על שולי הרווח." }],
            feedback: {
                principle: { id: "moat", name: "חפיר כלכלי" },
                correct: "נכון! תחרות מגבירה לחץ על מחירים ושולי רווח.",
                incorrect: "טעות. כניסת מתחרים פוגעת בפוטנציאל שוק."
            },
            difficulty: "easy",
            difficultyValue: 1
        },
        {
            id: "special-dividend-01",
            title: "הודעת דיבידנד",
            description: "חברה טכנולוגית הכריזה על דיבידנד מיוחד למחזיקים.",
            correctImpact: "positive",
            tier: 1,
            pointValue: 100,
            hints: [{ cost: 0.5, text: "דיבידנדים מסמנים תזרים מזומנים יציב." }],
            feedback: {
                principle: { id: "owner-earnings", name: "רווחי בעלים" },
                correct: "נכון! דיבידנד מבטא תזרים מזומנים ושמירה על ערך.",
                incorrect: "לא נכון. דיבידנד משקף בריאות פיננסית ויציבות."
            },
            difficulty: "easy",
            difficultyValue: 1
        },
        {
            id: "insurance-claims-01",
            title: "כיסוי ביטוח לאירוע",
            description: "חברת ביטוח הודיעה על כיסוי מלא ללקוחותיה לאחר אסון.",
            correctImpact: "negative",
            tier: 1,
            pointValue: 100,
            hints: [{ cost: 0.5, text: "הוצאות ביטוח גבוהות מורידות רווחים." }],
            feedback: {
                principle: { id: "owner-earnings", name: "רווחי בעלים" },
                correct: "נכון! כיסוי עולה במאזן החברה ופוגע ברווחיות.",
                incorrect: "טעות. תביעות ביטוח כבדות מפחיתות רווח נטו."
            },
            difficulty: "easy",
            difficultyValue: 1
        },
        {
            id: "share-issuance-01",
            title: "הנפקת מניות חד-פעמית",
            description: "חברה לצריכה מהירה הנפיקה מניות נוספות במסלול פרטי.",
            correctImpact: "negative",
            tier: 1,
            pointValue: 100,
            hints: [{ cost: 0.5, text: "הנפקת מניות מדללת בעלות קיימת." }],
            feedback: {
                principle: { id: "owner-earnings", name: "רווחי בעלים" },
                correct: "צודק! הנפקה מדללת מפחיתה חלקו של המשקיע.",
                incorrect: "לא נכון. הנפקה מעלה את מספר המניות ומשפיעה על הבעלות."
            },
            difficulty: "easy",
            difficultyValue: 1
        }
    ],
    
    medium: [
        {
            id: "fixed-asset-purchase-01",
            title: "קניית נכס קבוע",
            description: "חברה הוציאה 200 מיליון על בניין חדש למשרדים.",
            correctImpact: "neutral",
            tier: 2,
            pointValue: 150,
            hints: [{ cost: 0.5, text: "בדקו השפעה על תזרים חופשי ועתיד פעילות." }],
            feedback: {
                principle: { id: "owner-earnings", name: "רווחי בעלים" },
                correct: "נכון! השקעה בהון קבוע תומכת בפעילות אך מורידה זמנית מזומנים.",
                incorrect: "לא מדויק. רכישת נכס מגדילה נכסים קבועים ולא משפיעה מיד על רווח."
            },
            difficulty: "medium",
            difficultyValue: 2
        },
        {
            id: "inventory-reduction-01",
            title: "דיווח על ירידה במלאי",
            description: "חברה קמעונאית דיווחה על ירידה במלאי לקראת עליית מכירות.",
            correctImpact: "positive",
            tier: 2,
            pointValue: 150,
            hints: [{ cost: 0.5, text: "מלאי נמוך מרמז על סחורה שנמכרת." }],
            feedback: {
                principle: { id: "owner-earnings", name: "רווחי בעלים" },
                correct: "נכון! מלאי מצטמצם כשהסחורות נמכרות ומשפר תזרימי מזומנים.",
                incorrect: "טעות. מלאי שלא נראה במלאי יכול להיות בעיה אם מבוסס על פחת."
            },
            difficulty: "medium",
            difficultyValue: 2
        },
        {
            id: "rd-cancellation-01",
            title: "ביטול פרויקט R&D",
            description: "הנהלה החליטה לוותר על פיתוח מוצר חדש בשל עלות גבוהה.",
            correctImpact: "positive",
            tier: 2,
            pointValue: 150,
            hints: [{ cost: 0.5, text: "התבוננו על החזר השקעה צפוי מול עלות." }],
            feedback: {
                principle: { id: "owner-earnings", name: "רווחי בעלים" },
                correct: "נכון! ביטול פרויקט עם ROI נמוך משפר רווח עתידי.",
                incorrect: "לא נכון. להשקעה ב-R&D יש גם יתרון אסטרטגי אך אם ROI נמוך - ניתן לוותר."
            },
            difficulty: "medium",
            difficultyValue: 2
        },
        {
            id: "merger-announcement-01",
            title: "מיזוג אסטרטגי",
            description: "שתי חברות פלסטיק הודיעו על מיזוג ביניהן.",
            correctImpact: "neutral",
            tier: 2,
            pointValue: 150,
            hints: [{ cost: 0.5, text: "שימו לב לסינרגיה ועלות המיזוג." }],
            feedback: {
                principle: { id: "management-quality", name: "איכות הנהלה" },
                correct: "נכון! מיזוג יכול לספק חסכון אך דורש עלויות גבוהות.",
                incorrect: "לא נכון. מיזוגים מורכבים משפיעים לעיתים בשני הכיוונים."
            },
            difficulty: "medium",
            difficultyValue: 2
        },
        {
            id: "employee-options-01",
            title: "כתבי אופציה לעובדים",
            description: "חברה ביוטק הוציאה כתבי אופציה לעובדים.",
            correctImpact: "negative",
            tier: 2,
            pointValue: 150,
            hints: [{ cost: 0.5, text: "בדקו דילול ואינטרס ארוך טווח." }],
            feedback: {
                principle: { id: "owner-earnings", name: "רווחי בעלים" },
                correct: "נכון! כתבי אופציה מדללים בעלי מניות קיימים.",
                incorrect: "טעות. אופציות לעובדים גוזרות חלק מרווח עתידי."
            },
            difficulty: "medium",
            difficultyValue: 2
        }
    ],
    
    hard: [
        {
            id: "leveraged-buyback-01",
            title: "מתווה Buyback ממונף",
            description: "חברת תקשורת מציעה רכישה חוזרת במימון חוב כבד.",
            correctImpact: "positive",
            tier: 3,
            pointValue: 200,
            hints: [{ cost: 0.5, text: "שקלו תזרים חוב לעומת תמחור מניה." }],
            feedback: {
                principle: { id: "leverage-risk", name: "סיכון מינוף" },
                correct: "נכון! Buyback ממונף משפר EPS אך מגדיל סיכון פיננסי.",
                incorrect: "לא נכון. רכישות בחוב יכולות להיות חיוביות כל עוד תזרים תומך."
            },
            difficulty: "hard",
            difficultyValue: 3
        },
        {
            id: "dollar-weakening-01",
            title: "ירידת הדולר",
            description: "הדולר נחלש מול השקל ב-5% בשל תחרות גלובלית.",
            correctImpact: "positive",
            tier: 3,
            pointValue: 200,
            hints: [{ cost: 0.5, text: "חשבו על הכנסות יצוא ויבוא חומרי גלם." }],
            feedback: {
                principle: { id: "moat", name: "חפיר כלכלי" },
                correct: "נכון! יצואנים נהנים ממטבע חלש.",
                incorrect: "לא נכון. חברות תלות בחומרי גלם מייקרות עלויות."
            },
            difficulty: "hard",
            difficultyValue: 3
        },
        {
            id: "tax-cut-01",
            title: "שינוי מדיניות מס",
            description: "משרד האוצר הכריז על הורדת מס תאגידים ל-20%.",
            correctImpact: "positive",
            tier: 3,
            pointValue: 200,
            hints: [{ cost: 0.5, text: "בדקו השפעה על רווח נקי ושימור תזרימים." }],
            feedback: {
                principle: { id: "owner-earnings", name: "רווחי בעלים" },
                correct: "נכון! מס נמוך מגדיל רווחי נטו ומשפר ערך מניה.",
                incorrect: "טעות. מס נמוך מביא עודפי מזומנים אך דורש לצפות השקעות עתידיות."
            },
            difficulty: "hard",
            difficultyValue: 3
        },
        {
            id: "legal-case-01",
            title: "התמודדות עם תביעה משפטית",
            description: "חברה בתעשייה כימית עומדת בפני תביעה על זיהום.",
            correctImpact: "negative",
            tier: 3,
            pointValue: 200,
            hints: [{ cost: 0.5, text: "בדקו פוטנציאל פיצויים וביטוחים." }],
            feedback: {
                principle: { id: "leverage-risk", name: "סיכון משפטי" },
                correct: "נכון! הוצאות פיצויים גבוהות מורידות ערך החברה.",
                incorrect: "טעות. תביעות מסבכות צפויות להגדיל עלויות עתידיות."
            },
            difficulty: "hard",
            difficultyValue: 3
        }
    ]
};

