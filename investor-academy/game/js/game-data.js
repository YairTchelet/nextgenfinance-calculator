/* === game-data.js ===
 * All game content: principles, glossary, companies, special events
 * Edit this file to add/modify questions!
 * v2 — merged with batch1, batch2, batch3
 */

/* === game-content.js === */
/**
 * Investment Decision Game - Content Module
 * ==========================================
 * Contains all game content: companies, special events, principles, glossary
 * This file should be loaded BEFORE game-engine.js
 */

// Initialize global game namespace
window.BuffettGame = window.BuffettGame || {};

// ==============================
// PRINCIPLE DEFINITIONS
// ==============================
window.BuffettGame.principles = {
    "moat": {
        "id": "moat",
        "name": "חפיר כלכלי (Economic Moat)",
        "shortDescription": "יתרון תחרותי בר-קיימא",
        "fullDescription": "עסק עם moat יכול להגן על הרווחיות שלו לאורך זמן מפני מתחרים. זה היתרון התחרותי שמאפשר לחברה לשמור על רווחיות גבוהה.",
        "examples": [
            "מותג חזק",
            "עלויות מעבר",
            "יתרון רשת",
            "יתרון עלות",
            "פטנטים"
        ],
        "buffettQuote": "במשחק עסקי, חפיר הוא הדבר החשוב ביותר."
    },
    "value-trap": {
        "id": "value-trap",
        "name": "מלכודת ערך (Value Trap)",
        "shortDescription": "נראה זול אבל זול מסיבה",
        "fullDescription": "חברות עם P/E נמוך ותשואת דיבידנד גבוהה שאינן באמת זולות. המחיר הנמוך משקף בעיות אמיתיות בעסק.",
        "redFlags": [
            "FCF שלילי",
            "ירידה במכירות",
            "ענף בדעיכה",
            "חוב גבוה",
            "תחלופת הנהלה"
        ],
        "buffettQuote": "עדיף לקנות חברה מצוינת במחיר הוגן מאשר חברה הוגנת במחיר מצוין."
    },
    "owner-earnings": {
        "id": "owner-earnings",
        "name": "רווחי בעלים (Owner Earnings)",
        "shortDescription": "המזומן האמיתי שהבעלים יכולים למשוך",
        "fullDescription": "לא הרווח החשבונאי, אלא התזרים שנשאר אחרי תחזוקת העסק. FCF הוא המדד האמיתי לערך.",
        "formula": "FCF = תזרים תפעולי - CapEx תחזוקתי",
        "buffettQuote": "הרווחים החשבונאיים הם נקודת התחלה, לא סוף הדרך."
    },
    "margin-of-safety": {
        "id": "margin-of-safety",
        "name": "מרווח ביטחון (Margin of Safety)",
        "shortDescription": "קנייה מתחת לשווי פנימי",
        "fullDescription": "הפער בין מה שאתה משלם למה שהעסק שווה. ככל שהפער גדול יותר, כך ההשקעה בטוחה יותר.",
        "buffettQuote": "מחיר הוא מה שאתה משלם, ערך הוא מה שאתה מקבל."
    },
    "circle-of-competence": {
        "id": "circle-of-competence",
        "name": "מעגל כשירות (Circle of Competence)",
        "shortDescription": "השקע רק במה שאתה מבין",
        "fullDescription": "עדיף לדעת את גבולות הידע שלך ולהישאר בתוכם. אל תשקיע בעסקים שאתה לא מבין.",
        "application": "העבר לערימת 'קשה מדי' כשאתה לא בטוח"
    },
    "too-hard": {
        "id": "too-hard",
        "name": "קשה מדי (Too Hard Pile)",
        "shortDescription": "לא חייבים לשחק כל יד",
        "fullDescription": "משקיעים טובים יודעים מתי לומר 'אני לא יודע'. לא כל הזדמנות שווה ניתוח.",
        "mungerQuote": "אין לי מה להוסיף."
    },
    "management-quality": {
        "id": "management-quality",
        "name": "איכות הנהלה",
        "shortDescription": "הנהלה ישרה ומוכשרת",
        "fullDescription": "חפש הנהלה עם רקורד מוכח, יושרה, והתאמה של אינטרסים עם בעלי המניות.",
        "signs": [
            "רכישת מניות ע\"י הנהלה",
            "תגמול מבוסס ביצועים",
            "שקיפות",
            "רקורד ארוך טווח"
        ]
    },
    "leverage-risk": {
        "id": "leverage-risk",
        "name": "סיכון מינוף",
        "shortDescription": "חוב מגביר סיכון",
        "fullDescription": "חברות ממונפות רגישות יותר לשינויים בסביבה העסקית ובריבית. חוב גבוה יכול להרוס חברה טובה.",
        "redFlags": [
            "יחס חוב להון גבוה",
            "ריבית משתנה",
            "כיסוי ריבית נמוך"
        ]
    },
    "cyclical-trap": {
        "id": "cyclical-trap",
        "name": "מלכודת מחזוריות",
        "shortDescription": "P/E נמוך בשיא המחזור",
        "fullDescription": "בחברות מחזוריות, P/E נמוך יכול להופיע דווקא בשיא הרווחים, לפני ירידה.",
        "warning": "היזהר מ-P/E נמוך בענפים מחזוריים"
    },
    "dividend-sustainability": {
        "id": "dividend-sustainability",
        "name": "קיימות דיבידנד",
        "shortDescription": "האם הדיבידנד בר-קיימא?",
        "fullDescription": "דיבידנד גבוה חסר משמעות אם הוא לא נתמך ב-FCF. בדוק יחס חלוקה ומגמות.",
        "check": "דיבידנד / FCF < 70% לרוב בריא"
    },
    "growth-trap": {
        "id": "growth-trap",
        "name": "מלכודת צמיחה",
        "shortDescription": "צמיחה ללא רווחיות",
        "fullDescription": "צמיחה במכירות לא שווה כלום אם החברה לא מרוויחה. שריפת מזומנים לצמיחה היא דגל אדום.",
        "warning": "הכנסות גדלות + FCF שלילי = בעיה"
    },
    "turnaround": {
        "id": "turnaround",
        "name": "סיפור שיקום (Turnaround)",
        "shortDescription": "חברה בתהליך התאוששות",
        "fullDescription": "חברה עם בעיות שמראה סימני שיפור יכולה להיות הזדמנות, אך דורשת ניתוח זהיר.",
        "signs": [
            "הנהלה חדשה מוכחת",
            "שיפור ב-FCF",
            "צמצום הפסדים",
            "נכסים מוחשיים"
        ]
    }
};

// ==============================
// GLOSSARY TERMS
// ==============================
window.BuffettGame.glossary = [
    {
        "term": "P/E",
        "definition": "יחס מחיר לרווח - מחיר המניה חלקי רווח למניה."
    },
    {
        "term": "ROE",
        "definition": "תשואה על ההון - רווח נקי חלקי הון עצמי."
    },
    {
        "term": "ROIC",
        "definition": "תשואה על ההון המושקע - מדד יעילות השימוש בהון."
    },
    {
        "term": "FCF",
        "definition": "תזרים מזומנים חופשי - המזומן שנשאר אחרי השקעות."
    },
    {
        "term": "Buyback",
        "definition": "רכישה עצמית של מניות - מפחיתה מספר מניות ומעלה EPS."
    },
    {
        "term": "Economic Moat",
        "definition": "חפיר כלכלי - יתרון תחרותי בר-קיימא."
    },
    {
        "term": "יחס חוב להון",
        "definition": "היחס בין חוב להון עצמי - מדד למינוף."
    },
    {
        "term": "תשואת דיבידנד",
        "definition": "הדיבידנד השנתי חלקי מחיר המניה."
    },
    {
        "term": "שולי רווח נקי",
        "definition": "רווח נקי חלקי הכנסות - כמה נשאר מכל שקל."
    },
    {
        "term": "יחס שוטף",
        "definition": "נכסים שוטפים חלקי התחייבויות שוטפות."
    },
    {
        "term": "ROA",
        "definition": "תשואה על הנכסים - רווח נקי חלקי סך הנכסים."
    },
    {
        "term": "FCF Yield",
        "definition": "תשואת תזרים חופשי - FCF חלקי שווי שוק."
    },
    {
        "term": "P/B",
        "definition": "יחס מחיר לערך פנקסני - מחיר מניה חלקי הון למניה."
    },
    {
        "term": "EV/EBITDA",
        "definition": "שווי פירמה חלקי רווח תפעולי לפני פחת."
    },
    {
        "term": "PEG",
        "definition": "P/E חלקי צמיחה צפויה - מתקן P/E לצמיחה."
    },
    {
        "term": "EBITDA",
        "definition": "רווח לפני ריבית, מסים, פחת והפחתות."
    },
    {
        "term": "Working Capital",
        "definition": "הון חוזר - נכסים שוטפים פחות התחייבויות שוטפות."
    },
    {
        "term": "CapEx",
        "definition": "השקעות הוניות - רכישת נכסים קבועים."
    },
    {
        "term": "ARR",
        "definition": "הכנסות שנתיות חוזרות - מדד מפתח ב-SaaS."
    },
    {
        "term": "Net Revenue Retention",
        "definition": "שימור הכנסות נטו - כמה הכנסות נשמרות מלקוחות קיימים."
    }
];

// ==============================
// COMPANIES DATA
// ==============================
window.BuffettGame.companies = {
    easy: [
    {
        "id": "jewelry-chain-01",
        "name": "רשתות זהב בע\"מ",
        "sector": "קמעונאות",
        "symbol": "ZHAV",
        "price": 85.3,
        "tier": 1,
        "description": "רשת חנויות תכשיטים ותיקה עם 50 סניפים ברחבי הארץ, מתמחה בתכשיטי זהב ויהלומים.",
        "management": "משפחת המייסדים מנהלת את החברה כבר 30 שנה. המנכ\"ל הנוכחי בן המייסד, בתפקיד 15 שנה.",
        "moat": "מותג מוכר, מוניטין של עשרות שנים, קשרים ארוכי טווח עם ספקים, מיקומים מרכזיים.",
        "events": "צמיחה יציבה במכירות, פתיחת סניפים חדשים, התרחבות למכירות אונליין.",
        "metrics": {
            "basic": [
                {
                    "name": "P/E",
                    "value": "12.5"
                },
                {
                    "name": "ROE",
                    "value": "18%"
                },
                {
                    "name": "תשואת דיבידנד",
                    "value": "4.2%"
                }
            ],
            "advanced": [
                {
                    "name": "ROIC",
                    "value": "20%"
                },
                {
                    "name": "FCF (מיליון ₪)",
                    "value": "120"
                },
                {
                    "name": "FCF Yield",
                    "value": "5.8%"
                }
            ]
        },
        "historicalData": [
            {
                "year": "year-4",
                "revenue": 800,
                "fcf": 80
            },
            {
                "year": "year-3",
                "revenue": 750,
                "fcf": 70
            },
            {
                "year": "year-2",
                "revenue": 850,
                "fcf": 90
            },
            {
                "year": "year-1",
                "revenue": 950,
                "fcf": 105
            },
            {
                "year": "year-0",
                "revenue": 1050,
                "fcf": 120
            }
        ],
        "projectedData": [
            {
                "year": "year+1",
                "revenue": 1150,
                "fcf": 135
            },
            {
                "year": "year+2",
                "revenue": 1250,
                "fcf": 150
            }
        ],
        "correctDecision": "buy",
        "pointValue": 100,
        "hints": [
            {
                "cost": 0.5,
                "text": "בדקו את היחסים הפיננסיים ואת יציבות תזרים המזומנים."
            }
        ],
        "feedback": {
            "principle": {
                "id": "moat",
                "name": "חפיר כלכלי"
            },
            "decisiveSignals": [
                "FCF עולה בעקביות",
                "ROE גבוה ויציב",
                "הנהלה עם רקורד של 30 שנה"
            ],
            "correctExplanation": "החלטה מצוינת! חברה עם הנהלה יציבה, מותג חזק, P/E נמוך ותזרים מזומנים עקבי.",
            "incorrectExplanation": "החמצה! החברה מציגה יסודות חזקים עם תמחור אטרקטיבי ותזרים מזומנים יציב."
        },
        "isGoodValue": true,
        "difficulty": "easy",
        "difficultyValue": 1,
        "hint": "בדקו את היחסים הפיננסיים ואת יציבות תזרים המזומנים.",
        "chartType": "annual"
    },
    {
        "id": "metaverse-startup-01",
        "name": "טכנו-חלום בע\"מ",
        "sector": "טכנולוגיה",
        "symbol": "THLM",
        "price": 250,
        "tier": 1,
        "description": "חברת סטארט-אפ המפתחת פלטפורמת מטאוורס למסחר וירטואלי.",
        "management": "צוות מייסדים צעיר בגיל 25 בממוצע, ללא ניסיון ניהולי קודם.",
        "moat": "טכנולוגיה חדשנית אך עדיין לא מוכחת, תחרות עזה מול ענקיות טכנולוגיה.",
        "events": "גיוס הון סיכון אחרון ב-2 מיליארד ₪ הערכה, שריפת מזומנים מהירה לצורך צמיחה.",
        "metrics": {
            "basic": [
                {
                    "name": "P/E",
                    "value": "N/A - אין רווחים"
                },
                {
                    "name": "ROE",
                    "value": "-45%"
                },
                {
                    "name": "תשואת דיבידנד",
                    "value": "0%"
                }
            ],
            "advanced": [
                {
                    "name": "ROIC",
                    "value": "-60%"
                },
                {
                    "name": "FCF (מיליון ₪)",
                    "value": "-500"
                },
                {
                    "name": "שריפת מזומנים רבעונית",
                    "value": "125 מיליון ₪"
                }
            ]
        },
        "historicalData": [
            {
                "year": "year-4",
                "revenue": 0,
                "fcf": -50
            },
            {
                "year": "year-3",
                "revenue": 5,
                "fcf": -100
            },
            {
                "year": "year-2",
                "revenue": 20,
                "fcf": -200
            },
            {
                "year": "year-1",
                "revenue": 50,
                "fcf": -350
            },
            {
                "year": "year-0",
                "revenue": 100,
                "fcf": -500
            }
        ],
        "projectedData": [
            {
                "year": "year+1",
                "revenue": 200,
                "fcf": -600
            },
            {
                "year": "year+2",
                "revenue": 400,
                "fcf": -700
            }
        ],
        "correctDecision": "pass",
        "pointValue": 100,
        "hints": [
            {
                "cost": 0.5,
                "text": "האם החברה מייצרת רווחים או לפחות תזרים מזומנים חיובי?"
            }
        ],
        "feedback": {
            "principle": {
                "id": "growth-trap",
                "name": "מלכודת צמיחה"
            },
            "decisiveSignals": [
                "FCF שלילי מתמשך ומחמיר",
                "אין רווחים",
                "מודל עסקי לא מוכח"
            ],
            "correctExplanation": "נכון! הימנעות מחברות צמיחה ספקולטיביות ללא רווחיות היא עיקרון בסיסי בהשקעות ערך.",
            "incorrectExplanation": "טעות! חברה ללא רווחים, שריפת מזומנים ענקית ומודל עסקי לא מוכח."
        },
        "isGoodValue": false,
        "difficulty": "easy",
        "difficultyValue": 1,
        "hint": "האם החברה מייצרת רווחים או לפחות תזרים מזומנים חיובי?",
        "chartType": "annual"
    },
    {
        "id": "dairy-producer-01",
        "name": "מחלבות הצפון",
        "sector": "מזון ומשקאות",
        "symbol": "MHLB",
        "price": 42.5,
        "tier": 1,
        "description": "יצרנית מוצרי חלב מובילה עם קו מוצרים רחב הכולל חלב, גבינות ויוגורטים.",
        "management": "הנהלה מקצועית עם ממוצע של 20 שנות ניסיון בתעשייה. מנכ\"ל עם רקורד מוכח.",
        "moat": "מותגים חזקים, רשת הפצה רחבה, יתרון לגודל, נאמנות צרכנים גבוהה.",
        "events": "עלייה במחירי חומרי גלם, אך העברה מוצלחת של עלויות לצרכנים. צמיחה באורגני.",
        "metrics": {
            "basic": [
                {
                    "name": "P/E",
                    "value": "14.2"
                },
                {
                    "name": "ROE",
                    "value": "22%"
                },
                {
                    "name": "תשואת דיבידנד",
                    "value": "3.8%"
                }
            ],
            "advanced": [
                {
                    "name": "ROIC",
                    "value": "25%"
                },
                {
                    "name": "FCF (מיליון ₪)",
                    "value": "180"
                },
                {
                    "name": "שולי רווח נקי",
                    "value": "12%"
                }
            ]
        },
        "historicalData": [
            {
                "year": "year-4",
                "revenue": 1200,
                "fcf": 120
            },
            {
                "year": "year-3",
                "revenue": 1300,
                "fcf": 140
            },
            {
                "year": "year-2",
                "revenue": 1400,
                "fcf": 150
            },
            {
                "year": "year-1",
                "revenue": 1550,
                "fcf": 165
            },
            {
                "year": "year-0",
                "revenue": 1700,
                "fcf": 180
            }
        ],
        "projectedData": [
            {
                "year": "year+1",
                "revenue": 1850,
                "fcf": 195
            },
            {
                "year": "year+2",
                "revenue": 2000,
                "fcf": 210
            }
        ],
        "correctDecision": "buy",
        "pointValue": 100,
        "hints": [
            {
                "cost": 0.5,
                "text": "חברות מזון עם מותגים חזקים הן לעיתים השקעות ערך טובות."
            }
        ],
        "feedback": {
            "principle": {
                "id": "moat",
                "name": "חפיר כלכלי"
            },
            "decisiveSignals": [
                "מותגים חזקים",
                "FCF עולה בעקביות",
                "ROIC גבוה של 25%"
            ],
            "correctExplanation": "מעולה! חברת מזון עם מותגים חזקים, הנהלה איכותית ותזרים מזומנים יציב.",
            "incorrectExplanation": "פספוס! החברה מציגה את כל המאפיינים של השקעת ערך איכותית."
        },
        "isGoodValue": true,
        "difficulty": "easy",
        "difficultyValue": 1,
        "hint": "חברות מזון עם מותגים חזקים הן לעיתים השקעות ערך טובות.",
        "chartType": "annual"
    },
    {
        "id": "fashion-retailer-trap-01",
        "name": "אופנת הרחוב",
        "sector": "אופנה וטקסטיל",
        "symbol": "OFNA",
        "price": 15.2,
        "tier": 1,
        "description": "רשת חנויות אופנה מהירה עם 120 סניפים, מתמחה באופנת צעירים.",
        "management": "תחלופת מנכ\"לים גבוהה - 3 מנכ\"לים ב-5 שנים אחרונות.",
        "moat": "תחרות עזה מול ענקיות בינלאומיות ומסחר אונליין, אין יתרון תחרותי ברור.",
        "events": "ירידה במכירות בחנויות הפיזיות, מלאי גבוה, סגירת סניפים לא רווחיים.",
        "metrics": {
            "basic": [
                {
                    "name": "P/E",
                    "value": "6.5"
                },
                {
                    "name": "ROE",
                    "value": "5%"
                },
                {
                    "name": "תשואת דיבידנד",
                    "value": "8.5%"
                }
            ],
            "advanced": [
                {
                    "name": "ROIC",
                    "value": "3%"
                },
                {
                    "name": "FCF (מיליון ₪)",
                    "value": "-20"
                },
                {
                    "name": "יחס מלאי למכירות",
                    "value": "מדאיג - 25%"
                }
            ]
        },
        "historicalData": [
            {
                "year": "year-4",
                "revenue": 600,
                "fcf": 30
            },
            {
                "year": "year-3",
                "revenue": 400,
                "fcf": -50
            },
            {
                "year": "year-2",
                "revenue": 450,
                "fcf": -30
            },
            {
                "year": "year-1",
                "revenue": 480,
                "fcf": -10
            },
            {
                "year": "year-0",
                "revenue": 500,
                "fcf": -20
            }
        ],
        "projectedData": [
            {
                "year": "year+1",
                "revenue": 520,
                "fcf": -15
            },
            {
                "year": "year+2",
                "revenue": 540,
                "fcf": -10
            }
        ],
        "correctDecision": "pass",
        "pointValue": 100,
        "hints": [
            {
                "cost": 0.5,
                "text": "דיבידנד גבוה לפעמים מסתיר בעיות בעסק הליבה. בדקו אם ה-FCF תומך בתשלום."
            }
        ],
        "feedback": {
            "principle": {
                "id": "value-trap",
                "name": "מלכודת ערך"
            },
            "decisiveSignals": [
                "FCF שלילי מתמשך",
                "תחלופת הנהלה גבוהה",
                "אין moat מול תחרות"
            ],
            "counterSignalExplanation": "P/E נמוך ותשואת דיבידנד גבוהה נראים אטרקטיביים, אבל כשה-FCF שלילי - החברה לא באמת מייצרת ערך.",
            "correctExplanation": "החלטה נכונה! למרות התמחור הנמוך, החברה סובלת מבעיות מבניות. זו מלכודת ערך קלאסית.",
            "incorrectExplanation": "זהירות! מלכודת ערך קלאסית - P/E נמוך אבל עסק בדעיכה עם FCF שלילי."
        },
        "isGoodValue": false,
        "difficulty": "easy",
        "difficultyValue": 1,
        "hint": "דיבידנד גבוה לפעמים מסתיר בעיות בעסק הליבה.",
        "chartType": "annual"
    },
    {
        "id": "insurance-stable-01",
        "name": "ביטוח ישיר פלוס",
        "sector": "ביטוח",
        "symbol": "BITP",
        "price": 68.9,
        "tier": 1,
        "description": "חברת ביטוח ותיקה המתמחה בביטוחי רכב, דירה וחיים עם מיליון לקוחות.",
        "management": "צוות ניהול יציב עם ניסיון עשיר בתחום הביטוח. תרבות של זהירות וניהול סיכונים.",
        "moat": "מותג מוכר, עלויות מעבר גבוהות, רגולציה שמקשה על כניסת מתחרים חדשים.",
        "events": "צמיחה יציבה בפרמיות, שיפור ביחס התביעות, השקעות שמרניות.",
        "metrics": {
            "basic": [
                {
                    "name": "P/E",
                    "value": "11.8"
                },
                {
                    "name": "ROE",
                    "value": "15%"
                },
                {
                    "name": "תשואת דיבידנד",
                    "value": "4.5%"
                }
            ],
            "advanced": [
                {
                    "name": "יחס משולב",
                    "value": "92%"
                },
                {
                    "name": "FCF (מיליון ₪)",
                    "value": "250"
                },
                {
                    "name": "יחס הון עצמי",
                    "value": "185%"
                }
            ]
        },
        "historicalData": [
            {
                "year": "year-4",
                "revenue": 1800,
                "fcf": 180
            },
            {
                "year": "year-3",
                "revenue": 1900,
                "fcf": 200
            },
            {
                "year": "year-2",
                "revenue": 2050,
                "fcf": 210
            },
            {
                "year": "year-1",
                "revenue": 2200,
                "fcf": 230
            },
            {
                "year": "year-0",
                "revenue": 2350,
                "fcf": 250
            }
        ],
        "projectedData": [
            {
                "year": "year+1",
                "revenue": 2500,
                "fcf": 270
            },
            {
                "year": "year+2",
                "revenue": 2650,
                "fcf": 290
            }
        ],
        "correctDecision": "buy",
        "pointValue": 100,
        "hints": [
            {
                "cost": 0.5,
                "text": "חברות ביטוח עם יחס משולב נמוך מ-100% הן רווחיות."
            }
        ],
        "feedback": {
            "principle": {
                "id": "moat",
                "name": "חפיר כלכלי"
            },
            "decisiveSignals": [
                "יחס משולב 92% - רווחי",
                "FCF עולה בעקביות",
                "עלויות מעבר גבוהות"
            ],
            "correctExplanation": "מצוין! חברת ביטוח יציבה עם יחס משולב טוב, תזרים חזק ותמחור הוגן.",
            "incorrectExplanation": "החמצה! חברות ביטוח שמרניות עם ניהול טוב הן השקעות ערך קלאסיות."
        },
        "isGoodValue": true,
        "difficulty": "easy",
        "difficultyValue": 1,
        "hint": "חברות ביטוח עם יחס משולב נמוך מ-100% הן רווחיות.",
        "chartType": "annual"
    },
    {
        "id": "gym-chain-01",
        "name": "רשת כושר 24/7",
        "sector": "פנאי וספורט",
        "symbol": "KSHR",
        "price": 35,
        "tier": 1,
        "description": "רשת מכוני כושר עם 80 סניפים, מודל מנויים חודשי.",
        "management": "הנהלה חדשה מנסה להפוך את החברה לרווחית אחרי שנים של הפסדים.",
        "moat": "תחרות גבוהה, עלויות מעבר נמוכות, תחלופת לקוחות גבוהה.",
        "events": "קשיים בגיוס מנויים חדשים, עלויות תפעול גבוהות, תחרות מאפליקציות כושר ביתיות.",
        "metrics": {
            "basic": [
                {
                    "name": "P/E",
                    "value": "45"
                },
                {
                    "name": "ROE",
                    "value": "-12%"
                },
                {
                    "name": "תשואת דיבידנד",
                    "value": "0%"
                }
            ],
            "advanced": [
                {
                    "name": "ROIC",
                    "value": "-8%"
                },
                {
                    "name": "FCF (מיליון ₪)",
                    "value": "-80"
                },
                {
                    "name": "יחס חוב להון",
                    "value": "2.5"
                }
            ]
        },
        "historicalData": [
            {
                "year": "year-4",
                "revenue": 400,
                "fcf": 20
            },
            {
                "year": "year-3",
                "revenue": 200,
                "fcf": -100
            },
            {
                "year": "year-2",
                "revenue": 300,
                "fcf": -60
            },
            {
                "year": "year-1",
                "revenue": 350,
                "fcf": -70
            },
            {
                "year": "year-0",
                "revenue": 380,
                "fcf": -80
            }
        ],
        "projectedData": [
            {
                "year": "year+1",
                "revenue": 400,
                "fcf": -70
            },
            {
                "year": "year+2",
                "revenue": 420,
                "fcf": -60
            }
        ],
        "correctDecision": "pass",
        "pointValue": 100,
        "hints": [
            {
                "cost": 0.5,
                "text": "עסקים עם עלויות קבועות גבוהות ותחלופת לקוחות גבוהה הם בעייתיים."
            }
        ],
        "feedback": {
            "principle": {
                "id": "moat",
                "name": "חפיר כלכלי (חסר)"
            },
            "decisiveSignals": [
                "FCF שלילי מתמשך",
                "חוב גבוה",
                "אין moat - תחרות קלה"
            ],
            "correctExplanation": "נכון! מכוני כושר הם עסק קשה עם מחסומי כניסה נמוכים ונאמנות לקוחות חלשה.",
            "incorrectExplanation": "טעות! מודל עסקי בעייתי עם FCF שלילי מתמשך וחוב גבוה."
        },
        "isGoodValue": false,
        "difficulty": "easy",
        "difficultyValue": 1,
        "hint": "עסקים עם עלויות קבועות גבוהות ותחלופת לקוחות גבוהה הם בעייתיים.",
        "chartType": "annual"
    },
    {
        "id": "pharma-generic-01",
        "name": "פארמה ישראל",
        "sector": "פארמה",
        "symbol": "FARM",
        "price": 125.5,
        "tier": 1,
        "description": "חברת תרופות גנריות עם מפעל ייצור מקומי ויצוא ל-30 מדינות.",
        "management": "מנכ\"ל עם 25 שנות ניסיון בתעשייה, צוות מדעי מוביל.",
        "moat": "פטנטים על תהליכי ייצור, אישורי FDA, קשרי לקוחות ארוכי טווח.",
        "events": "אישורים רגולטוריים חדשים, צמיחה ביצוא, השקעות במו\"פ.",
        "metrics": {
            "basic": [
                {
                    "name": "P/E",
                    "value": "16.5"
                },
                {
                    "name": "ROE",
                    "value": "20%"
                },
                {
                    "name": "תשואת דיבידנד",
                    "value": "3.2%"
                }
            ],
            "advanced": [
                {
                    "name": "ROIC",
                    "value": "18%"
                },
                {
                    "name": "FCF (מיליון ₪)",
                    "value": "220"
                },
                {
                    "name": "השקעה במו\"פ",
                    "value": "8% מהמכירות"
                }
            ]
        },
        "historicalData": [
            {
                "year": "year-4",
                "revenue": 1100,
                "fcf": 150
            },
            {
                "year": "year-3",
                "revenue": 1250,
                "fcf": 170
            },
            {
                "year": "year-2",
                "revenue": 1400,
                "fcf": 190
            },
            {
                "year": "year-1",
                "revenue": 1550,
                "fcf": 205
            },
            {
                "year": "year-0",
                "revenue": 1700,
                "fcf": 220
            }
        ],
        "projectedData": [
            {
                "year": "year+1",
                "revenue": 1850,
                "fcf": 240
            },
            {
                "year": "year+2",
                "revenue": 2000,
                "fcf": 260
            }
        ],
        "correctDecision": "buy",
        "pointValue": 100,
        "hints": [
            {
                "cost": 0.5,
                "text": "חברות פארמה עם פטנטים וצמיחה יציבה הן השקעות טובות."
            }
        ],
        "feedback": {
            "principle": {
                "id": "moat",
                "name": "חפיר כלכלי"
            },
            "decisiveSignals": [
                "פטנטים ואישורי FDA",
                "FCF עולה בעקביות",
                "ROIC גבוה"
            ],
            "correctExplanation": "מעולה! חברת פארמה עם יתרונות תחרותיים, צמיחה יציבה ותזרים חזק.",
            "incorrectExplanation": "פספוס! החברה מציגה את כל הסימנים של השקעת ערך איכותית."
        },
        "isGoodValue": true,
        "difficulty": "easy",
        "difficultyValue": 1,
        "hint": "חברות פארמה עם פטנטים וצמיחה יציבה הן השקעות טובות.",
        "chartType": "annual"
    },
    {
        "id": "crypto-platform-01",
        "name": "קריפטו-טרייד",
        "sector": "פינטק",
        "symbol": "CRPT",
        "price": 180,
        "tier": 1,
        "description": "פלטפורמת מסחר במטבעות דיגיטליים עם צמיחה מהירה.",
        "management": "מייסדים צעירים מעולם הקריפטו, ללא ניסיון בשווקים פיננסיים מסורתיים.",
        "moat": "שוק תנודתי מאוד, רגולציה לא ברורה, תחרות מבורסות גלובליות.",
        "events": "תנודתיות קיצונית בהכנסות בהתאם לשוק הקריפטו, חקירות רגולטוריות.",
        "metrics": {
            "basic": [
                {
                    "name": "P/E",
                    "value": "85"
                },
                {
                    "name": "ROE",
                    "value": "35%"
                },
                {
                    "name": "תשואת דיבידנד",
                    "value": "0%"
                }
            ],
            "advanced": [
                {
                    "name": "ROIC",
                    "value": "תנודתי מאוד"
                },
                {
                    "name": "FCF (מיליון ₪)",
                    "value": "150 (תנודתי)"
                },
                {
                    "name": "תלות בשוק קריפטו",
                    "value": "95%"
                }
            ]
        },
        "historicalData": [
            {
                "year": "year-4",
                "revenue": 50,
                "fcf": 10
            },
            {
                "year": "year-3",
                "revenue": 200,
                "fcf": 80
            },
            {
                "year": "year-2",
                "revenue": 800,
                "fcf": 400
            },
            {
                "year": "year-1",
                "revenue": 300,
                "fcf": -50
            },
            {
                "year": "year-0",
                "revenue": 500,
                "fcf": 150
            }
        ],
        "projectedData": [
            {
                "year": "year+1",
                "revenue": 600,
                "fcf": 200
            },
            {
                "year": "year+2",
                "revenue": 700,
                "fcf": 250
            }
        ],
        "correctDecision": "pass",
        "pointValue": 100,
        "hints": [
            {
                "cost": 0.5,
                "text": "באפט נמנע מעסקים שהוא לא מבין או תנודתיים מדי."
            }
        ],
        "feedback": {
            "principle": {
                "id": "circle-of-competence",
                "name": "מעגל כשירות"
            },
            "decisiveSignals": [
                "תנודתיות קיצונית בהכנסות",
                "סיכון רגולטורי",
                "תלות בשוק ספקולטיבי"
            ],
            "correctExplanation": "נכון! הימנעות מעסקים ספקולטיביים ותנודתיים היא עיקרון בסיסי.",
            "incorrectExplanation": "טעות! עסק ספקולטיבי מאוד עם הכנסות תנודתיות וחוסר וודאות רגולטורית."
        },
        "isGoodValue": false,
        "difficulty": "easy",
        "difficultyValue": 1,
        "hint": "באפט נמנע מעסקים שהוא לא מבין או תנודתיים מדי.",
        "chartType": "annual"
    },
    {
        "id": "reit-quality-01",
        "name": "נדל\"ן מניב",
        "sector": "נדל\"ן",
        "symbol": "NADL",
        "price": 55,
        "tier": 1,
        "description": "חברת נדל\"ן המחזיקה 50 נכסים מסחריים באזורי ביקוש.",
        "management": "הנהלה מנוסה עם רקורד של 20 שנה בתחום הנדל\"ן המניב.",
        "moat": "נכסים באיכות גבוהה במיקומים מרכזיים, חוזי שכירות ארוכי טווח.",
        "events": "תפוסה של 95%, חידוש חוזים במחירים גבוהים יותר, רכישת נכסים חדשים.",
        "metrics": {
            "basic": [
                {
                    "name": "P/FFO",
                    "value": "12"
                },
                {
                    "name": "ROE",
                    "value": "12%"
                },
                {
                    "name": "תשואת דיבידנד",
                    "value": "6.5%"
                }
            ],
            "advanced": [
                {
                    "name": "יחס חוב ל-EBITDA",
                    "value": "5.5"
                },
                {
                    "name": "FFO (מיליון ₪)",
                    "value": "180"
                },
                {
                    "name": "תפוסה ממוצעת",
                    "value": "95%"
                }
            ]
        },
        "historicalData": [
            {
                "year": "year-4",
                "revenue": 280,
                "fcf": 140
            },
            {
                "year": "year-3",
                "revenue": 270,
                "fcf": 130
            },
            {
                "year": "year-2",
                "revenue": 290,
                "fcf": 150
            },
            {
                "year": "year-1",
                "revenue": 310,
                "fcf": 165
            },
            {
                "year": "year-0",
                "revenue": 330,
                "fcf": 180
            }
        ],
        "projectedData": [
            {
                "year": "year+1",
                "revenue": 350,
                "fcf": 195
            },
            {
                "year": "year+2",
                "revenue": 370,
                "fcf": 210
            }
        ],
        "correctDecision": "buy",
        "pointValue": 100,
        "hints": [
            {
                "cost": 0.5,
                "text": "בדקו האם התזרים מצדיק את התמחור, ומה רמת הביטחון בהכנסות העתידיות."
            }
        ],
        "feedback": {
            "principle": {
                "id": "owner-earnings",
                "name": "רווחי בעלים"
            },
            "decisiveSignals": [
                "תפוסה 95%",
                "FFO יציב ועולה",
                "נכסים במיקומים מרכזיים"
            ],
            "correctExplanation": "נכון! REIT איכותי עם נכסים טובים, תפוסה גבוהה ודיבידנד אטרקטיבי.",
            "incorrectExplanation": "החמצה! נדל\"ן מניב עם תזרים יציב הוא השקעה שמרנית טובה."
        },
        "isGoodValue": true,
        "difficulty": "easy",
        "difficultyValue": 1,
        "hint": "בדקו האם התזרים מצדיק את התמחור, ומה רמת הביטחון בהכנסות העתידיות.",
        "chartType": "annual"
    },
    {
        "id": "gaming-mobile-01",
        "name": "גיימינג פרו",
        "sector": "בידור דיגיטלי",
        "symbol": "GAME",
        "price": 95,
        "tier": 1,
        "description": "מפתחת משחקי מובייל עם מיליוני הורדות.",
        "management": "צוות פיתוח מוכשר אך חוסר ניסיון עסקי. תחלופה גבוהה.",
        "moat": "תחרות עצומה, תלות במשחק בודד להכנסות, מחזור חיים קצר למשחקים.",
        "events": "ירידה בהורדות המשחק הראשי, עיכובים בפיתוח משחקים חדשים.",
        "metrics": {
            "basic": [
                {
                    "name": "P/E",
                    "value": "50"
                },
                {
                    "name": "ROE",
                    "value": "8%"
                },
                {
                    "name": "תשואת דיבידנד",
                    "value": "0%"
                }
            ],
            "advanced": [
                {
                    "name": "ROIC",
                    "value": "5%"
                },
                {
                    "name": "FCF (מיליון ₪)",
                    "value": "30"
                },
                {
                    "name": "תלות במשחק יחיד",
                    "value": "75% מההכנסות"
                }
            ]
        },
        "historicalData": [
            {
                "year": "year-4",
                "revenue": 100,
                "fcf": 20
            },
            {
                "year": "year-3",
                "revenue": 200,
                "fcf": 60
            },
            {
                "year": "year-2",
                "revenue": 350,
                "fcf": 80
            },
            {
                "year": "year-1",
                "revenue": 300,
                "fcf": 40
            },
            {
                "year": "year-0",
                "revenue": 280,
                "fcf": 30
            }
        ],
        "projectedData": [
            {
                "year": "year+1",
                "revenue": 260,
                "fcf": 25
            },
            {
                "year": "year+2",
                "revenue": 250,
                "fcf": 20
            }
        ],
        "correctDecision": "pass",
        "pointValue": 100,
        "hints": [
            {
                "cost": 0.5,
                "text": "תלות בהיט יחיד וירידה במגמה הם סימני אזהרה."
            }
        ],
        "feedback": {
            "principle": {
                "id": "moat",
                "name": "חפיר כלכלי (חסר)"
            },
            "decisiveSignals": [
                "תלות במוצר יחיד",
                "מגמת ירידה בהכנסות",
                "P/E גבוה יחסית לצמיחה"
            ],
            "correctExplanation": "נכון! תלות גבוהה במשחק אחד ומגמת ירידה מצדיקים הימנעות.",
            "incorrectExplanation": "טעות! ענף תנודתי עם תלות במוצר יחיד ומגמה שלילית."
        },
        "isGoodValue": false,
        "difficulty": "easy",
        "difficultyValue": 1,
        "hint": "תלות בהיט יחיד וירידה במגמה הם סימני אזהרה.",
        "chartType": "annual"
    },
    {
        "id": "bakery-chain-01",
        "name": "לחם הארץ בע\"מ",
        "sector": "מזון",
        "symbol": "LHMA",
        "price": 62.4,
        "tier": 1,
        "description": "רשת מאפיות עם 80 סניפים ברחבי הארץ, מוכרת לחמים, עוגות ומאפים טריים.",
        "management": "מנכ\"ל עם 20 שנות ניסיון בתעשיית המזון. הנהלה יציבה עם תחלופה נמוכה.",
        "moat": "מותג חזק, מיקומים אסטרטגיים, מתכונים ייחודיים שהפכו לסטנדרט, נאמנות לקוחות גבוהה.",
        "events": "פתיחת קו מוצרים בריאותיים, כניסה לרשתות סופר, צמיחה יציבה.",
        "metrics": {
            "basic": [
                {
                    "name": "P/E",
                    "value": "11.2"
                },
                {
                    "name": "ROE",
                    "value": "22%"
                },
                {
                    "name": "תשואת דיבידנד",
                    "value": "3.8%"
                }
            ],
            "advanced": [
                {
                    "name": "ROIC",
                    "value": "19%"
                },
                {
                    "name": "FCF (מיליון ₪)",
                    "value": "95"
                },
                {
                    "name": "FCF Yield",
                    "value": "6.1%"
                }
            ]
        },
        "historicalData": [
            {
                "year": "year-4",
                "revenue": 620,
                "fcf": 65
            },
            {
                "year": "year-3",
                "revenue": 680,
                "fcf": 72
            },
            {
                "year": "year-2",
                "revenue": 740,
                "fcf": 80
            },
            {
                "year": "year-1",
                "revenue": 810,
                "fcf": 88
            },
            {
                "year": "year-0",
                "revenue": 880,
                "fcf": 95
            }
        ],
        "projectedData": [
            {
                "year": "year+1",
                "revenue": 950,
                "fcf": 105
            },
            {
                "year": "year+2",
                "revenue": 1030,
                "fcf": 115
            }
        ],
        "correctDecision": "buy",
        "pointValue": 100,
        "hints": [
            {
                "cost": 0.5,
                "text": "שימו לב לעקביות הצמיחה בהכנסות ובתזרים המזומנים."
            }
        ],
        "feedback": {
            "principle": {
                "id": "moat",
                "name": "חפיר כלכלי"
            },
            "decisiveSignals": [
                "FCF עולה בעקביות 5 שנים",
                "ROE מעל 20%",
                "מותג חזק עם נאמנות"
            ],
            "correctExplanation": "מצוין! חברת מזון יציבה עם חפיר תחרותי, תמחור נמוך ותזרים מזומנים חזק.",
            "incorrectExplanation": "החמצה! P/E נמוך עם צמיחה עקבית ו-FCF חזק — סימנים קלאסיים להשקעת ערך."
        },
        "isGoodValue": true,
        "difficulty": "easy",
        "difficultyValue": 1,
        "hint": "שימו לב לעקביות הצמיחה בהכנסות ובתזרים המזומנים.",
        "chartType": "annual"
    },
    {
        "id": "ev-startup-01",
        "name": "אלקטרו-נוסע בע\"מ",
        "sector": "רכב חשמלי",
        "symbol": "ELNS",
        "price": 320,
        "tier": 1,
        "description": "סטארט-אפ ישראלי המפתח רכב חשמלי עירוני. טרם התחיל ייצור המוני.",
        "management": "צוות מהנדסים צעירים. המנכ\"ל בן 32, ללא ניסיון ניהולי קודם בתעשיית הרכב.",
        "moat": "פטנט על טכנולוגיית סוללה חדשה, אבל טרם הוכחה בשטח. תחרות עזה מיצרני רכב גדולים.",
        "events": "גיוס הון גדול, אבל ביטול עסקת שיתוף פעולה עם יצרן אירופי. עיכובים בלוח הזמנים.",
        "metrics": {
            "basic": [
                {
                    "name": "P/E",
                    "value": "N/A (הפסדי)"
                },
                {
                    "name": "ROE",
                    "value": "-45%"
                },
                {
                    "name": "תשואת דיבידנד",
                    "value": "0%"
                }
            ],
            "advanced": [
                {
                    "name": "ROIC",
                    "value": "-30%"
                },
                {
                    "name": "FCF (מיליון ₪)",
                    "value": "-180"
                },
                {
                    "name": "שריפת מזומנים חודשית",
                    "value": "15M ₪"
                }
            ]
        },
        "historicalData": [
            {
                "year": "year-4",
                "revenue": 0,
                "fcf": -20
            },
            {
                "year": "year-3",
                "revenue": 2,
                "fcf": -50
            },
            {
                "year": "year-2",
                "revenue": 5,
                "fcf": -90
            },
            {
                "year": "year-1",
                "revenue": 8,
                "fcf": -140
            },
            {
                "year": "year-0",
                "revenue": 12,
                "fcf": -180
            }
        ],
        "projectedData": [
            {
                "year": "year+1",
                "revenue": 30,
                "fcf": -220
            },
            {
                "year": "year+2",
                "revenue": 80,
                "fcf": -250
            }
        ],
        "correctDecision": "pass",
        "pointValue": 100,
        "hints": [
            {
                "cost": 0.5,
                "text": "בדקו אם החברה מייצרת מזומנים או שורפת אותם."
            }
        ],
        "feedback": {
            "principle": {
                "id": "circle-of-competence",
                "name": "מעגל כשירות"
            },
            "decisiveSignals": [
                "הפסדים הולכים וגדלים",
                "אין הכנסות משמעותיות",
                "שריפת מזומנים מואצת"
            ],
            "correctExplanation": "נכון! חברה ספקולטיבית ללא רווחים, שורפת מזומנים ועם תחרות עצומה.",
            "incorrectExplanation": "טעות! באפט מעולם לא משקיע בחברות שאינן מייצרות רווחים — זה מחוץ למעגל הכשירות."
        },
        "isGoodValue": false,
        "difficulty": "easy",
        "difficultyValue": 1,
        "hint": "בדקו אם החברה מייצרת מזומנים או שורפת אותם.",
        "chartType": "annual"
    },
    {
        "id": "water-utility-01",
        "name": "מי שפע בע\"מ",
        "sector": "תשתיות",
        "symbol": "MYSH",
        "price": 44.8,
        "tier": 1,
        "description": "חברת תשתיות מים המספקת שירותי מים וביוב ל-15 רשויות מקומיות. מונופול אזורי.",
        "management": "הנהלה מנוסה עם ממוצע 18 שנות ותק. מדיניות דיבידנד יציבה ועקבית.",
        "moat": "מונופול רגולטורי — אין תחרות ישירה. חוזים ארוכי טווח עם רשויות.",
        "events": "אישור העלאת תעריפים 3%, השקעה בתשתיות חדשות, חוזה 20 שנה מול עירייה.",
        "metrics": {
            "basic": [
                {
                    "name": "P/E",
                    "value": "14.5"
                },
                {
                    "name": "ROE",
                    "value": "15%"
                },
                {
                    "name": "תשואת דיבידנד",
                    "value": "5.1%"
                }
            ],
            "advanced": [
                {
                    "name": "ROIC",
                    "value": "12%"
                },
                {
                    "name": "FCF (מיליון ₪)",
                    "value": "78"
                },
                {
                    "name": "FCF Yield",
                    "value": "7.2%"
                }
            ]
        },
        "historicalData": [
            {
                "year": "year-4",
                "revenue": 420,
                "fcf": 60
            },
            {
                "year": "year-3",
                "revenue": 435,
                "fcf": 63
            },
            {
                "year": "year-2",
                "revenue": 450,
                "fcf": 67
            },
            {
                "year": "year-1",
                "revenue": 470,
                "fcf": 72
            },
            {
                "year": "year-0",
                "revenue": 490,
                "fcf": 78
            }
        ],
        "projectedData": [
            {
                "year": "year+1",
                "revenue": 510,
                "fcf": 83
            },
            {
                "year": "year+2",
                "revenue": 530,
                "fcf": 88
            }
        ],
        "correctDecision": "buy",
        "pointValue": 100,
        "hints": [
            {
                "cost": 0.5,
                "text": "חפשו יתרון תחרותי שלא ניתן לשכפל."
            }
        ],
        "feedback": {
            "principle": {
                "id": "moat",
                "name": "חפיר כלכלי"
            },
            "decisiveSignals": [
                "מונופול רגולטורי",
                "תזרים מזומנים יציב",
                "תשואת דיבידנד גבוהה"
            ],
            "correctExplanation": "מצוין! מונופול טבעי עם הכנסות צפויות ודיבידנד יציב — השקעת ערך קלאסית.",
            "incorrectExplanation": "החמצה! חברת מונופול עם תזרים יציב ותשואת דיבידנד מעל 5% — פספוס."
        },
        "isGoodValue": true,
        "difficulty": "easy",
        "difficultyValue": 1,
        "hint": "חפשו יתרון תחרותי שלא ניתן לשכפל.",
        "chartType": "annual"
    },
    {
        "id": "fashion-ecommerce-01",
        "name": "טרנד-נט בע\"מ",
        "sector": "אי-קומרס",
        "symbol": "TRNT",
        "price": 180,
        "tier": 1,
        "description": "אתר מכירות אופנה אונליין שצמח מהר בקורונה. מוכר מותגים בינלאומיים בהנחות.",
        "management": "מנכ\"ל צעיר ודינמי אך מחליף אסטרטגיה כל שנה. תחלופת סמנכ\"לים גבוהה.",
        "moat": "אין יתרון תחרותי ברור — תחרות עזה מאליאקספרס, שיין וחנויות מקומיות.",
        "events": "עלייה חדה במכירות ב-2021, ירידה בחזרה ב-2022-2023. ניסיון כושל להיכנס לשוק האירופי.",
        "metrics": {
            "basic": [
                {
                    "name": "P/E",
                    "value": "45"
                },
                {
                    "name": "ROE",
                    "value": "5%"
                },
                {
                    "name": "תשואת דיבידנד",
                    "value": "0%"
                }
            ],
            "advanced": [
                {
                    "name": "ROIC",
                    "value": "4%"
                },
                {
                    "name": "FCF (מיליון ₪)",
                    "value": "8"
                },
                {
                    "name": "עלות שיווק/הכנסה",
                    "value": "35%"
                }
            ]
        },
        "historicalData": [
            {
                "year": "year-4",
                "revenue": 120,
                "fcf": 5
            },
            {
                "year": "year-3",
                "revenue": 250,
                "fcf": 20
            },
            {
                "year": "year-2",
                "revenue": 380,
                "fcf": 30
            },
            {
                "year": "year-1",
                "revenue": 280,
                "fcf": 10
            },
            {
                "year": "year-0",
                "revenue": 240,
                "fcf": 8
            }
        ],
        "projectedData": [
            {
                "year": "year+1",
                "revenue": 220,
                "fcf": 3
            },
            {
                "year": "year+2",
                "revenue": 200,
                "fcf": -5
            }
        ],
        "correctDecision": "pass",
        "pointValue": 100,
        "hints": [
            {
                "cost": 0.5,
                "text": "בדקו את מגמת ההכנסות — האם הצמיחה בת-קיימא?"
            }
        ],
        "feedback": {
            "principle": {
                "id": "moat",
                "name": "חפיר כלכלי (חסר)"
            },
            "decisiveSignals": [
                "הכנסות יורדות",
                "P/E גבוה מאוד",
                "אין חפיר תחרותי"
            ],
            "correctExplanation": "נכון! חברה ללא חפיר, עם הכנסות יורדות ו-P/E מנופח — לא השקעת ערך.",
            "incorrectExplanation": "טעות! הצמיחה הייתה חד-פעמית (קורונה), אין חפיר ותחרות עצומה."
        },
        "isGoodValue": false,
        "difficulty": "easy",
        "difficultyValue": 1,
        "hint": "בדקו את מגמת ההכנסות — האם הצמיחה בת-קיימא?",
        "chartType": "annual"
    },
    {
        "id": "security-services-01",
        "name": "מגן שירותים בע\"מ",
        "sector": "שירותים",
        "symbol": "MAGN",
        "price": 38.5,
        "tier": 1,
        "description": "חברת שמירה ואבטחה ותיקה עם 5,000 עובדים. מספקת שירותי אבטחה למוסדות ציבור ופרטיים.",
        "management": "מנכ\"ל עם רקע ביטחוני, 12 שנה בתפקיד. הנהלה מנוסה ויציבה.",
        "moat": "חוזים ארוכי טווח עם ממשלה, מוניטין רב-שנתי, רישיונות מיוחדים, עלויות מעבר גבוהות ללקוח.",
        "events": "חידוש חוזה ממשלתי ל-5 שנים, הרחבת פעילות לתחום הסייבר.",
        "metrics": {
            "basic": [
                {
                    "name": "P/E",
                    "value": "10.8"
                },
                {
                    "name": "ROE",
                    "value": "16%"
                },
                {
                    "name": "תשואת דיבידנד",
                    "value": "4.5%"
                }
            ],
            "advanced": [
                {
                    "name": "ROIC",
                    "value": "14%"
                },
                {
                    "name": "FCF (מיליון ₪)",
                    "value": "52"
                },
                {
                    "name": "FCF Yield",
                    "value": "6.8%"
                }
            ]
        },
        "historicalData": [
            {
                "year": "year-4",
                "revenue": 340,
                "fcf": 38
            },
            {
                "year": "year-3",
                "revenue": 355,
                "fcf": 40
            },
            {
                "year": "year-2",
                "revenue": 370,
                "fcf": 43
            },
            {
                "year": "year-1",
                "revenue": 400,
                "fcf": 48
            },
            {
                "year": "year-0",
                "revenue": 430,
                "fcf": 52
            }
        ],
        "projectedData": [
            {
                "year": "year+1",
                "revenue": 460,
                "fcf": 57
            },
            {
                "year": "year+2",
                "revenue": 490,
                "fcf": 62
            }
        ],
        "correctDecision": "buy",
        "pointValue": 100,
        "hints": [
            {
                "cost": 0.5,
                "text": "בדקו את טיב החוזים ומשך ההתקשרות עם הלקוחות."
            }
        ],
        "feedback": {
            "principle": {
                "id": "moat",
                "name": "חפיר כלכלי"
            },
            "decisiveSignals": [
                "חוזים ממשלתיים ל-5 שנים",
                "עלויות מעבר גבוהות",
                "FCF עולה"
            ],
            "correctExplanation": "מצוין! חברה עם חוזים ארוכי טווח, מונופול-כמעט בתחומה ותמחור זול.",
            "incorrectExplanation": "פספוס! P/E מתחת ל-11 עם חוזים ממשלתיים ותזרים יציב — קלאסי באפט."
        },
        "isGoodValue": true,
        "difficulty": "easy",
        "difficultyValue": 1,
        "hint": "בדקו את טיב החוזים ומשך ההתקשרות עם הלקוחות.",
        "chartType": "annual"
    },
    {
        "id": "social-app-01",
        "name": "שיחון בע\"מ",
        "sector": "טכנולוגיה",
        "symbol": "SHCH",
        "price": 95,
        "tier": 1,
        "description": "אפליקציית רשת חברתית ישראלית עם 2 מיליון משתמשים. מתחרה בטיקטוק וסנאפצ'ט מקומי.",
        "management": "מייסד צעיר בן 27. צוות קטן, שורף מזומנים על שיווק אגרסיבי.",
        "moat": "בסיס משתמשים צומח אבל לא נאמן — 60% נטישה תוך חודש. אין מודל הכנסות ברור.",
        "events": "גיוס 50 מיליון ₪, אבל קצב שריפת מזומנים גבוה. תחרות מול ענקי טכנולוגיה.",
        "metrics": {
            "basic": [
                {
                    "name": "P/E",
                    "value": "N/A (הפסדי)"
                },
                {
                    "name": "ROE",
                    "value": "-60%"
                },
                {
                    "name": "תשואת דיבידנד",
                    "value": "0%"
                }
            ],
            "advanced": [
                {
                    "name": "ROIC",
                    "value": "-40%"
                },
                {
                    "name": "FCF (מיליון ₪)",
                    "value": "-35"
                },
                {
                    "name": "LTV/CAC",
                    "value": "0.4"
                }
            ]
        },
        "historicalData": [
            {
                "year": "year-4",
                "revenue": 0,
                "fcf": -5
            },
            {
                "year": "year-3",
                "revenue": 3,
                "fcf": -12
            },
            {
                "year": "year-2",
                "revenue": 8,
                "fcf": -20
            },
            {
                "year": "year-1",
                "revenue": 15,
                "fcf": -28
            },
            {
                "year": "year-0",
                "revenue": 18,
                "fcf": -35
            }
        ],
        "projectedData": [
            {
                "year": "year+1",
                "revenue": 22,
                "fcf": -42
            },
            {
                "year": "year+2",
                "revenue": 25,
                "fcf": -48
            }
        ],
        "correctDecision": "pass",
        "pointValue": 100,
        "hints": [
            {
                "cost": 0.5,
                "text": "שימו לב ליחס בין עלות רכישת לקוח לערך חיי הלקוח."
            }
        ],
        "feedback": {
            "principle": {
                "id": "growth-trap",
                "name": "מלכודת צמיחה"
            },
            "decisiveSignals": [
                "שריפת מזומנים מתגברת",
                "60% נטישה",
                "אין מודל רווח"
            ],
            "correctExplanation": "נכון! צמיחה בלי רווחים היא לא עסק — באפט תמיד אומר שצמיחה צריכה להיות רווחית.",
            "incorrectExplanation": "טעות! אין מודל הכנסות בר-קיימא, שריפת מזומנים מתגברת ותחרות מול ענקים."
        },
        "isGoodValue": false,
        "difficulty": "easy",
        "difficultyValue": 1,
        "hint": "שימו לב ליחס בין עלות רכישת לקוח לערך חיי הלקוח.",
        "chartType": "annual"
    },
    {
        "id": "steel-manufacturer-01",
        "name": "פלדת הנגב בע\"מ",
        "sector": "תעשייה",
        "symbol": "PLNG",
        "price": 72,
        "tier": 1,
        "description": "יצרנית פלדה ותיקה עם מפעל בדרום. מספקת לתעשיית הבנייה והתשתיות בישראל.",
        "management": "הנהלה עם 25 שנות ניסיון. המפעל מתקדם טכנולוגית עם אוטומציה.",
        "moat": "מעט יצרנים מקומיים, קרבה ללקוחות ישראליים, עלויות הובלה נמוכות מייבוא.",
        "events": "גידול בבנייה בישראל, אבל מחירי חומרי גלם תנודתיים. פחת עלויות אנרגיה.",
        "metrics": {
            "basic": [
                {
                    "name": "P/E",
                    "value": "8.5"
                },
                {
                    "name": "ROE",
                    "value": "14%"
                },
                {
                    "name": "תשואת דיבידנד",
                    "value": "5.5%"
                }
            ],
            "advanced": [
                {
                    "name": "ROIC",
                    "value": "11%"
                },
                {
                    "name": "FCF (מיליון ₪)",
                    "value": "110"
                },
                {
                    "name": "חוב/הון",
                    "value": "0.3"
                }
            ]
        },
        "historicalData": [
            {
                "year": "year-4",
                "revenue": 900,
                "fcf": 85
            },
            {
                "year": "year-3",
                "revenue": 780,
                "fcf": 60
            },
            {
                "year": "year-2",
                "revenue": 1050,
                "fcf": 120
            },
            {
                "year": "year-1",
                "revenue": 1100,
                "fcf": 130
            },
            {
                "year": "year-0",
                "revenue": 950,
                "fcf": 110
            }
        ],
        "projectedData": [
            {
                "year": "year+1",
                "revenue": 980,
                "fcf": 115
            },
            {
                "year": "year+2",
                "revenue": 1020,
                "fcf": 120
            }
        ],
        "correctDecision": "buy",
        "pointValue": 100,
        "hints": [
            {
                "cost": 0.5,
                "text": "בחנו את היציבות הכללית למרות התנודות המחזוריות."
            }
        ],
        "feedback": {
            "principle": {
                "id": "margin-of-safety",
                "name": "מרווח ביטחון"
            },
            "decisiveSignals": [
                "P/E נמוך מאוד",
                "תשואת דיבידנד 5.5%",
                "חוב נמוך"
            ],
            "correctExplanation": "נכון! למרות שזו תעשייה מחזורית, התמחור הנמוך וה-FCF החזק מספקים מרווח ביטחון.",
            "incorrectExplanation": "החמצה! P/E של 8.5 עם דיבידנד 5.5% וחוב נמוך — מחיר שמגן מפני סיכון."
        },
        "isGoodValue": true,
        "difficulty": "easy",
        "difficultyValue": 1,
        "hint": "בחנו את היציבות הכללית למרות התנודות המחזוריות.",
        "chartType": "annual"
    },
    {
        "id": "nft-marketplace-01",
        "name": "דיגיטל-ארט בע\"מ",
        "sector": "טכנולוגיה",
        "symbol": "DGART",
        "price": 42,
        "tier": 1,
        "description": "פלטפורמה למכירת NFT ואמנות דיגיטלית. שוק ה-NFT קרס ב-90% מאז 2021.",
        "management": "מנכ\"ל שהגיע מעולם הקריפטו. צוות מצומצם עם ניסיון טכנולוגי אבל לא עסקי.",
        "moat": "אין חפיר — עשרות פלטפורמות מתחרות. הטכנולוגיה פשוטה לשכפול.",
        "events": "ירידה של 80% בנפח המסחר. ניסיון למכור שירותי tokenization לחברות — טרם הוכח.",
        "metrics": {
            "basic": [
                {
                    "name": "P/E",
                    "value": "N/A (הפסדי)"
                },
                {
                    "name": "ROE",
                    "value": "-85%"
                },
                {
                    "name": "תשואת דיבידנד",
                    "value": "0%"
                }
            ],
            "advanced": [
                {
                    "name": "ROIC",
                    "value": "-50%"
                },
                {
                    "name": "FCF (מיליון ₪)",
                    "value": "-22"
                },
                {
                    "name": "מזומן בקופה (חודשים)",
                    "value": "8"
                }
            ]
        },
        "historicalData": [
            {
                "year": "year-4",
                "revenue": 0,
                "fcf": -3
            },
            {
                "year": "year-3",
                "revenue": 5,
                "fcf": -8
            },
            {
                "year": "year-2",
                "revenue": 45,
                "fcf": 10
            },
            {
                "year": "year-1",
                "revenue": 15,
                "fcf": -15
            },
            {
                "year": "year-0",
                "revenue": 6,
                "fcf": -22
            }
        ],
        "projectedData": [
            {
                "year": "year+1",
                "revenue": 4,
                "fcf": -18
            },
            {
                "year": "year+2",
                "revenue": 2,
                "fcf": -15
            }
        ],
        "correctDecision": "pass",
        "pointValue": 100,
        "hints": [
            {
                "cost": 0.5,
                "text": "מה קרה לשוק שבו החברה פועלת?"
            }
        ],
        "feedback": {
            "principle": {
                "id": "too-hard",
                "name": "קשה מדי"
            },
            "decisiveSignals": [
                "שוק NFT קרס",
                "הכנסות צונחות",
                "8 חודשי מזומן בלבד"
            ],
            "correctExplanation": "נכון! באפט אומר 'כשאתה לא מבין את העסק — תעבור'. שוק ה-NFT לא צפוי.",
            "incorrectExplanation": "טעות! השוק קרס, ההכנסות בנפילה חופשית ואין חפיר — זה בסל ה'קשה מדי'."
        },
        "isGoodValue": false,
        "difficulty": "easy",
        "difficultyValue": 1,
        "hint": "מה קרה לשוק שבו החברה פועלת?",
        "chartType": "annual"
    },
    {
        "id": "steel-peak-e01",
        "name": "פלדת הנגב בע\"מ",
        "sector": "תעשייה מחזורית",
        "symbol": "PLNG",
        "price": 42,
        "tier": 1,
        "chartType": "annual",
        "description": "יצרנית פלדה ישראלית שנהנית משנתיים של ביקוש שיא בענף הבנייה. ההכנסות והרווחים בשיא כל הזמנים, וההנהלה הכריזה על חלוקת דיבידנד מיוחד.",
        "management": "מנכ\"ל ותיק עם 20 שנות ניסיון בתעשייה. צוות מנוסה שעבר מחזורים קודמים.",
        "moat": "מפעל מודרני עם עלויות ייצור נמוכות יחסית, אבל פלדה היא מוצר גנרי — המחיר נקבע בשוק העולמי.",
        "events": "מחיר הפלדה העולמי עלה 40% בשנתיים. התחלות בנייה בישראל ברמת שיא. דיבידנד מיוחד של ₪3 למניה.",
        "metrics": {
            "basic": [
                {
                    "name": "P/E",
                    "value": "6"
                },
                {
                    "name": "ROE",
                    "value": "28%"
                },
                {
                    "name": "תשואת דיבידנד",
                    "value": "9%"
                }
            ],
            "advanced": [
                {
                    "name": "ROIC",
                    "value": "24%"
                },
                {
                    "name": "FCF (מיליון ₪)",
                    "value": "85"
                },
                {
                    "name": "חוב/הון",
                    "value": "0.3"
                }
            ]
        },
        "historicalData": [
            {
                "year": "year-4",
                "revenue": 380,
                "fcf": 25
            },
            {
                "year": "year-3",
                "revenue": 340,
                "fcf": 15
            },
            {
                "year": "year-2",
                "revenue": 420,
                "fcf": 45
            },
            {
                "year": "year-1",
                "revenue": 520,
                "fcf": 70
            },
            {
                "year": "year-0",
                "revenue": 580,
                "fcf": 85
            }
        ],
        "projectedData": [
            {
                "year": "year+1",
                "revenue": 500,
                "fcf": 55
            },
            {
                "year": "year+2",
                "revenue": 420,
                "fcf": 30
            }
        ],
        "correctDecision": "pass",
        "pointValue": 100,
        "hints": [
            {
                "cost": 0.5,
                "text": "מה קורה לרווחים של חברת פלדה כשמחזור הבנייה מגיע לשיא?"
            }
        ],
        "feedback": {
            "principle": {
                "id": "cyclical-trap",
                "name": "מלכודת מחזוריות"
            },
            "decisiveSignals": [
                "P/E נמוך בשיא המחזור",
                "מוצר גנרי",
                "דיבידנד מיוחד = סימן לשיא"
            ],
            "correctExplanation": "נכון! P/E של 6 נראה זול, אבל בחברה מחזורית זה בדיוק ההפך — P/E נמוך בשיא הרווחים אומר שהשוק כבר מתמחר ירידה. הדיבידנד המיוחד הוא סימן קלאסי שההנהלה יודעת שהשיא מאחוריה.",
            "incorrectExplanation": "טעות קלאסית! בחברות מחזוריות, P/E נמוך = שיא המחזור, לא מציאה. כשהרווחים ירדו 50% (וזה יקרה), ה-P/E יקפוץ ל-12 גם בלי שהמניה תזוז. באפט אומר: בחברות מחזוריות, קנה כש-P/E גבוה ומכור כשהוא נמוך.",
            "counterSignalExplanation": "הצד השני יטען: החברה מנוהלת היטב, חוב נמוך, FCF חזק, ודיבידנד 9%. גם אם יש ירידה מחזורית, היא תשרוד אותה בקלות. בנוסף, פרויקטי תשתית ממשלתיים עשויים להאריך את המחזור."
        },
        "workedExample": "1) זיהוי הסקטור: פלדה = תעשייה מחזורית קלאסית. 2) בדיקת מיקום במחזור: הכנסות עלו 53% בשנתיים, מחיר הפלדה +40% — זה שיא. 3) פענוח P/E: בחברה מחזורית, P/E 6 בשיא = יקר, כי הרווחים ירדו. 4) פענוח הדיבידנד המיוחד: ההנהלה מחלקת כסף במקום להשקיע = מודעת שהשיא חולף. 5) מסקנה: מלכודת מחזוריות — נראה זול אבל נקנה בדיוק בשיא.",
        "isGoodValue": false,
        "difficulty": "easy",
        "difficultyValue": 1,
        "hint": "מה קורה לרווחים של חברת פלדה כשמחזור הבנייה מגיע לשיא?"
    },
    {
        "id": "water-utility-e01",
        "name": "מי השפלה בע\"מ",
        "sector": "שירותים",
        "symbol": "MYSH",
        "price": 78,
        "tier": 1,
        "chartType": "annual",
        "description": "חברת מים ותשתיות שמספקת שירותי מים ל-15 רשויות מקומיות בדרום. הכנסות יציבות עם חוזים ל-25 שנה. הדיבידנד גדל 8 שנים ברציפות.",
        "management": "מנכ\"לית בעלת רקע בניהול תשתיות ציבוריות. מדיניות חלוקה ברורה: 70% מהרווח הנקי.",
        "moat": "מונופול רגולטורי באזור השירות. לא ניתן להחליף ספק מים. חוזים ארוכי טווח עם הצמדה למדד.",
        "events": "חידוש חוזה עם עיריית באר שבע ל-10 שנים. אישור העלאת תעריפים של 3% מהרגולטור.",
        "metrics": {
            "basic": [
                {
                    "name": "P/E",
                    "value": "16"
                },
                {
                    "name": "ROE",
                    "value": "14%"
                },
                {
                    "name": "תשואת דיבידנד",
                    "value": "4.5%"
                }
            ],
            "advanced": [
                {
                    "name": "ROIC",
                    "value": "11%"
                },
                {
                    "name": "FCF (מיליון ₪)",
                    "value": "42"
                },
                {
                    "name": "יחס חלוקה",
                    "value": "70%"
                }
            ]
        },
        "historicalData": [
            {
                "year": "year-4",
                "revenue": 210,
                "fcf": 32
            },
            {
                "year": "year-3",
                "revenue": 218,
                "fcf": 35
            },
            {
                "year": "year-2",
                "revenue": 215,
                "fcf": 33
            },
            {
                "year": "year-1",
                "revenue": 228,
                "fcf": 38
            },
            {
                "year": "year-0",
                "revenue": 240,
                "fcf": 42
            }
        ],
        "projectedData": [
            {
                "year": "year+1",
                "revenue": 250,
                "fcf": 44
            },
            {
                "year": "year+2",
                "revenue": 260,
                "fcf": 46
            }
        ],
        "correctDecision": "buy",
        "pointValue": 100,
        "hints": [
            {
                "cost": 0.5,
                "text": "חברה עם מונופול רגולטורי, חוזים צמודי מדד, ודיבידנד גדל 8 שנים — כמה זה בטוח?"
            }
        ],
        "feedback": {
            "principle": {
                "id": "dividend-sustainability",
                "name": "קיימות דיבידנד"
            },
            "decisiveSignals": [
                "דיבידנד גדל 8 שנים",
                "יחס חלוקה 70% — בר קיימא",
                "מונופול רגולטורי"
            ],
            "correctExplanation": "מצוין! דיבידנד בר-קיימא = הכנסות יציבות + יחס חלוקה סביר + חפיר. כאן יש את שלושתם. יחס חלוקה של 70% משאיר מרווח להשקעה ולגידול.",
            "incorrectExplanation": "פספוס! זו דוגמה קלאסית לדיבידנד בר-קיימא. הכנסות יציבות ממונופול רגולטורי, יחס חלוקה סביר, וצמיחה עקבית. באפט אוהב בדיוק את סוג העסקים האלה.",
            "counterSignalExplanation": "הצד השני יטען: P/E 16 לחברת שירותים זה לא זול במיוחד, הצמיחה איטית (3-4% בשנה), ורגולציה עלולה להגביל רווחיות עתידית. יש השקעות עם פוטנציאל צמיחה גבוה יותר."
        },
        "workedExample": "1) זיהוי מודל העסק: מונופול רגולטורי עם חוזים ל-25 שנה — הכנסות כמעט מובטחות. 2) בדיקת קיימות הדיבידנד: יחס חלוקה 70% = לא מחלקת מעבר ליכולת. 3) מגמה: 8 שנות גידול רצופות, FCF עולה בהתמדה. 4) בדיקת P/E: 16 לחברת שירותים — טווח סביר (12-20 לסקטור). 5) מסקנה: דיבידנד בר-קיימא עם חפיר רגולטורי — קנייה.",
        "isGoodValue": true,
        "difficulty": "easy",
        "difficultyValue": 1,
        "hint": "חברה עם מונופול רגולטורי, חוזים צמודי מדד, ודיבידנד גדל 8 שנים — כמה זה בטוח?"
    },
    {
        "id": "retail-dividend-e01",
        "name": "שופרסל מזרח בע\"מ",
        "sector": "קמעונאות מזון",
        "symbol": "SHFM",
        "price": 35,
        "tier": 1,
        "chartType": "annual",
        "description": "רשת סופרמרקטים בפריפריה עם 12 סניפים. מחלקת דיבידנד גבוה של 7% למרות שההכנסות יורדות שנה שלישית ברציפות. ה-FCF חיובי אבל יורד.",
        "management": "בעל השליטה מושך דיבידנדים לצרכים אישיים. אין השקעה בשיפוץ סניפים.",
        "moat": "נוכחות מקומית בעיירות פיתוח, אבל רשתות גדולות מתרחבות לאזור.",
        "events": "סגירת 2 סניפים לא רווחיים. כניסת מתחרה חדש לשני אזורי פעילות.",
        "metrics": {
            "basic": [
                {
                    "name": "P/E",
                    "value": "9"
                },
                {
                    "name": "ROE",
                    "value": "11%"
                },
                {
                    "name": "תשואת דיבידנד",
                    "value": "7%"
                }
            ],
            "advanced": [
                {
                    "name": "ROIC",
                    "value": "8%"
                },
                {
                    "name": "FCF (מיליון ₪)",
                    "value": "18"
                },
                {
                    "name": "יחס חלוקה",
                    "value": "95%"
                }
            ]
        },
        "historicalData": [
            {
                "year": "year-4",
                "revenue": 320,
                "fcf": 28
            },
            {
                "year": "year-3",
                "revenue": 310,
                "fcf": 25
            },
            {
                "year": "year-2",
                "revenue": 295,
                "fcf": 22
            },
            {
                "year": "year-1",
                "revenue": 285,
                "fcf": 20
            },
            {
                "year": "year-0",
                "revenue": 270,
                "fcf": 18
            }
        ],
        "projectedData": [
            {
                "year": "year+1",
                "revenue": 255,
                "fcf": 14
            },
            {
                "year": "year+2",
                "revenue": 240,
                "fcf": 10
            }
        ],
        "correctDecision": "pass",
        "pointValue": 100,
        "hints": [
            {
                "cost": 0.5,
                "text": "יחס חלוקה של 95% כש-FCF יורד — כמה זמן הדיבידנד יחזיק?"
            }
        ],
        "feedback": {
            "principle": {
                "id": "dividend-sustainability",
                "name": "קיימות דיבידנד"
            },
            "decisiveSignals": [
                "יחס חלוקה 95%",
                "הכנסות יורדות 3 שנים",
                "בעל שליטה מושך כספים"
            ],
            "correctExplanation": "נכון! דיבידנד 7% מפתה, אבל יחס חלוקה של 95% כשההכנסות יורדות = דיבידנד שייחתך. בעל השליטה מושך כספים במקום להשקיע בעסק. זה בדיוק ההפך מדיבידנד בר-קיימא.",
            "incorrectExplanation": "טעות! דיבידנד גבוה לא שווה דיבידנד בטוח. כש-95% מהרווח הולך לדיבידנד והעסק מתכווץ, זו שאלה של מתי — לא אם — הדיבידנד ייחתך.",
            "counterSignalExplanation": "הצד השני יטען: P/E 9 זול לקמעונאות מזון, FCF עדיין חיובי, ודיבידנד 7% הוא תשואה מעולה בסביבת ריבית נמוכה. אולי ההנהלה תמצא דרך לייצב את ההכנסות."
        },
        "workedExample": "1) דיבידנד 7% — מפתה. בואו נבדוק אם הוא בר-קיימא. 2) יחס חלוקה 95% — כמעט כל הרווח הולך החוצה. אין כרית ביטחון. 3) מגמת FCF: יורד מ-28 ל-18 מיליון בארבע שנים. 4) בעל שליטה מושך כספים + לא משקיע = פוגע בעסק. 5) אין חפיר — מתחרים נכנסים. 6) מסקנה: הדיבידנד ייחתך תוך שנה-שנתיים. העל.",
        "isGoodValue": false,
        "difficulty": "easy",
        "difficultyValue": 1,
        "hint": "יחס חלוקה של 95% כש-FCF יורד — כמה זמן הדיבידנד יחזיק?"
    },
    {
        "id": "founder-led-e01",
        "name": "סייבר-וולט בע\"מ",
        "sector": "טכנולוגיה",
        "symbol": "CYBV",
        "price": 145,
        "tier": 1,
        "chartType": "annual",
        "description": "חברת סייבר שהמייסד עדיין מנהל. הוא מחזיק 25% מהמניות ומושך משכורת צנועה. הצמיחה עקבית ב-18% בשנה, והחברה לא גייסה חוב.",
        "management": "מייסד-מנכ\"ל עם 25% אחזקה. משכורת ₪80K/חודש — נמוכה לסקטור. היסטוריה של החלטות הקצאת הון חכמות.",
        "moat": "טכנולוגיה ייחודית בזיהוי איומים, אבל סייבר הוא שוק תחרותי מאוד.",
        "events": "רכישת סטארטאפ קטן ב-₪30M שהכפיל את בסיס הלקוחות. סירוב להצעת רכישה של ₪1.2B.",
        "metrics": {
            "basic": [
                {
                    "name": "P/E",
                    "value": "28"
                },
                {
                    "name": "ROE",
                    "value": "22%"
                },
                {
                    "name": "צמיחת הכנסות",
                    "value": "18%"
                }
            ],
            "advanced": [
                {
                    "name": "PEG",
                    "value": "1.6"
                },
                {
                    "name": "FCF (מיליון ₪)",
                    "value": "65"
                },
                {
                    "name": "חוב/הון",
                    "value": "0.0"
                }
            ]
        },
        "historicalData": [
            {
                "year": "year-4",
                "revenue": 180,
                "fcf": 30
            },
            {
                "year": "year-3",
                "revenue": 210,
                "fcf": 38
            },
            {
                "year": "year-2",
                "revenue": 245,
                "fcf": 42
            },
            {
                "year": "year-1",
                "revenue": 290,
                "fcf": 55
            },
            {
                "year": "year-0",
                "revenue": 340,
                "fcf": 65
            }
        ],
        "projectedData": [
            {
                "year": "year+1",
                "revenue": 400,
                "fcf": 78
            },
            {
                "year": "year+2",
                "revenue": 470,
                "fcf": 92
            }
        ],
        "correctDecision": "buy",
        "pointValue": 100,
        "hints": [
            {
                "cost": 0.5,
                "text": "מנכ\"ל שמחזיק 25% ומושך משכורת נמוכה — מה זה אומר על התמריצים שלו?"
            }
        ],
        "feedback": {
            "principle": {
                "id": "management-quality",
                "name": "איכות הנהלה"
            },
            "decisiveSignals": [
                "מייסד עם 25% אחזקה",
                "משכורת נמוכה = אינטרס מיושר",
                "רכישה חכמה שהכפילה לקוחות"
            ],
            "correctExplanation": "מצוין! מייסד שמחזיק חלק גדול, מושך משכורת צנועה, ומקבל החלטות הקצאת הון חכמות — זה בדיוק מה שבאפט מחפש בהנהלה.",
            "incorrectExplanation": "פספוס! P/E 28 נראה גבוה, אבל עם צמיחה של 18% (PEG 1.6) זה סביר לטכנולוגיה. והכי חשוב: הנהלה איכותית עם skin in the game היא הנכס הכי חשוב.",
            "counterSignalExplanation": "הצד השני יטען: P/E 28 גבוה, סקטור הסייבר תחרותי מאוד, והסירוב להצעת הרכישה אולי היה טעות — מי יודע אם החברה תגיע שוב לשווי כזה."
        },
        "workedExample": "1) בדיקת הנהלה: מייסד עם 25% = skin in the game. משכורת נמוכה = לא ממלא כיסים. 2) היסטוריית החלטות: רכישה ב-₪30M שהכפילה לקוחות = הקצאת הון חכמה. 3) מספרים: צמיחה 18%, PEG 1.6 — סביר לטכנולוגיה רווחית. 4) חפיר: חלקי, אבל הנהלה טובה בונה חפיר לאורך זמן. 5) מסקנה: הנהלה איכותית עם תמריצים נכונים = קנייה.",
        "isGoodValue": true,
        "difficulty": "easy",
        "difficultyValue": 1,
        "hint": "מנכ\"ל שמחזיק 25% ומושך משכורת נמוכה — מה זה אומר על התמריצים שלו?"
    },
    {
        "id": "empire-builder-e01",
        "name": "אלפא נכסים בע\"מ",
        "sector": "נדל\"ן",
        "symbol": "ALFA",
        "price": 52,
        "tier": 1,
        "chartType": "annual",
        "description": "חברת נדל\"ן שהמנכ\"ל רוכש נכסים בקצב מטורף — 8 רכישות בשנתיים. ההכנסות גדלות אבל הרווח הנקי כמעט לא זז. המנכ\"ל מושך משכורת של ₪250K לחודש.",
        "management": "מנכ\"ל 'בונה אימפריה' — מתמקד בגודל ולא ברווחיות. משכורת בין הגבוהות בסקטור. אין אחזקת מניות משמעותית.",
        "moat": "פורטפוליו מפוזר גיאוגרפית, אבל איכות הנכסים נמוכה. תפוסה ממוצעת 78%.",
        "events": "3 רכישות ברבעון האחרון לבד. הנפקת מניות לדילול של 15% למימון עסקאות.",
        "metrics": {
            "basic": [
                {
                    "name": "P/E",
                    "value": "12"
                },
                {
                    "name": "ROE",
                    "value": "8%"
                },
                {
                    "name": "תשואת דיבידנד",
                    "value": "3%"
                }
            ],
            "advanced": [
                {
                    "name": "FFO/מניה",
                    "value": "₪4.2"
                },
                {
                    "name": "FCF (מיליון ₪)",
                    "value": "35"
                },
                {
                    "name": "חוב/הון",
                    "value": "1.8"
                }
            ]
        },
        "historicalData": [
            {
                "year": "year-4",
                "revenue": 120,
                "fcf": 22
            },
            {
                "year": "year-3",
                "revenue": 155,
                "fcf": 25
            },
            {
                "year": "year-2",
                "revenue": 195,
                "fcf": 28
            },
            {
                "year": "year-1",
                "revenue": 250,
                "fcf": 32
            },
            {
                "year": "year-0",
                "revenue": 310,
                "fcf": 35
            }
        ],
        "projectedData": [
            {
                "year": "year+1",
                "revenue": 380,
                "fcf": 38
            },
            {
                "year": "year+2",
                "revenue": 440,
                "fcf": 40
            }
        ],
        "correctDecision": "pass",
        "pointValue": 100,
        "hints": [
            {
                "cost": 0.5,
                "text": "ההכנסות הוכפלו פי 2.5 אבל ה-FCF עלה רק 60% — לאן הולך הכסף?"
            }
        ],
        "feedback": {
            "principle": {
                "id": "management-quality",
                "name": "איכות הנהלה"
            },
            "decisiveSignals": [
                "מנכ\"ל ללא אחזקת מניות",
                "משכורת ₪250K/חודש",
                "דילול 15%",
                "ROE 8% בלבד"
            ],
            "correctExplanation": "נכון! מנכ\"ל שבונה אימפריה על חשבון בעלי המניות. ההכנסות גדלות דרך רכישות ודילול, לא דרך צמיחה אורגנית. ROE 8% אחרי מינוף 1.8 = תשואה עלובה על ההון.",
            "incorrectExplanation": "טעות! FCF חיובי ועולה מסנוור, אבל ההכנסות גדלו 158% בזמן שה-FCF גדל רק 59%. הכסף נבלע ברכישות גרועות. ומנכ\"ל ללא skin in the game הוא דגל אדום.",
            "counterSignalExplanation": "הצד השני יטען: P/E 12 סביר לנדל\"ן, FCF חיובי וגדל, ואסטרטגיית הרכישות בונה סקייל שיניב יתרון בעתיד. הדילול זמני."
        },
        "workedExample": "1) בדיקת הנהלה: אין אחזקת מניות + משכורת גבוהה = אין skin in the game. 2) בדיקת צמיחה: הכנסות x2.5 אבל FCF +60% = רכישות הורסות ערך. 3) דילול: 15% הנפקה = בעלי מניות משלמים על האימפריה. 4) ROE 8% עם חוב/הון 1.8 = תשואה גרועה. 5) מסקנה: הנהלה שלא מיישרת אינטרסים עם המשקיעים — העל.",
        "isGoodValue": false,
        "difficulty": "easy",
        "difficultyValue": 1,
        "hint": "ההכנסות הוכפלו פי 2.5 אבל ה-FCF עלה רק 60% — לאן הולך הכסף?"
    },
    {
        "id": "failed-turnaround-e01",
        "name": "תקשורת ישראל בע\"מ",
        "sector": "תקשורת",
        "symbol": "TKSR",
        "price": 8.5,
        "tier": 1,
        "chartType": "annual",
        "description": "חברת תקשורת שהייתה פעם מהגדולות בשוק. מנכ\"ל חדש מונה לפני שנתיים עם הבטחה ל'מהפכה דיגיטלית', אבל ההכנסות המשיכו לרדת.",
        "management": "מנכ\"ל חדש הגיע מסקטור אחר. הבטיח שיקום אבל הביצועים לא השתפרו בשנתיים.",
        "moat": "מותג מוכר אבל מיושן. תשתית קיימת אבל צריכה השקעות כבדות.",
        "events": "שני רבעונים רצופים של הפסד תפעולי. ביטול חוזה מרכזי עם לקוח גדול.",
        "metrics": {
            "basic": [
                {
                    "name": "P/E",
                    "value": "שלילי"
                },
                {
                    "name": "ROE",
                    "value": "-5%"
                },
                {
                    "name": "תשואת דיבידנד",
                    "value": "0%"
                }
            ],
            "advanced": [
                {
                    "name": "ROIC",
                    "value": "-3%"
                },
                {
                    "name": "FCF (מיליון ₪)",
                    "value": "-15"
                },
                {
                    "name": "חוב/הון",
                    "value": "2.1"
                }
            ]
        },
        "historicalData": [
            {
                "year": "year-4",
                "revenue": 480,
                "fcf": 20
            },
            {
                "year": "year-3",
                "revenue": 440,
                "fcf": 10
            },
            {
                "year": "year-2",
                "revenue": 410,
                "fcf": -5
            },
            {
                "year": "year-1",
                "revenue": 380,
                "fcf": -12
            },
            {
                "year": "year-0",
                "revenue": 350,
                "fcf": -15
            }
        ],
        "projectedData": [
            {
                "year": "year+1",
                "revenue": 330,
                "fcf": -18
            },
            {
                "year": "year+2",
                "revenue": 310,
                "fcf": -20
            }
        ],
        "correctDecision": "pass",
        "pointValue": 100,
        "hints": [
            {
                "cost": 0.5,
                "text": "המנכ\"ל החדש פועל כבר שנתיים — האם יש סימנים שהשיקום עובד?"
            }
        ],
        "feedback": {
            "principle": {
                "id": "turnaround",
                "name": "שיקום"
            },
            "decisiveSignals": [
                "שנתיים בלי שיפור",
                "FCF שלילי ומחמיר",
                "חוב/הון 2.1"
            ],
            "correctExplanation": "נכון! שיקום שלא מראה תוצאות אחרי שנתיים הוא כנראה לא שיקום — הוא תירוץ. FCF שלילי ומחמיר + חוב גבוה = סיכון קיומי.",
            "incorrectExplanation": "טעות! לא כל שיקום מצליח. שנתיים הן מספיק זמן לראות סימני שיפור, ופה אנחנו רואים הרעה. מנכ\"ל מסקטור אחר ללא ניסיון ענפי — דגל אדום נוסף.",
            "counterSignalExplanation": "הצד השני יטען: המחיר ₪8.50 זול מאוד, יש נכסי תשתית בשווי גבוה, ושיקום לוקח זמן. אם המנכ\"ל יצליח, הפוטנציאל עצום."
        },
        "workedExample": "1) זיהוי: חברה בשיקום. 2) בדיקת התקדמות: שנתיים מאז מונה המנכ\"ל — ההכנסות המשיכו לרדת, FCF הרע. 3) בדיקת הנהלה: מנכ\"ל מסקטור אחר — חסר ניסיון ספציפי. 4) בדיקת מצב פיננסי: חוב/הון 2.1 = סיכון קיומי אם השיקום נכשל. 5) מסקנה: שיקום כושל — העל.",
        "isGoodValue": false,
        "difficulty": "easy",
        "difficultyValue": 1,
        "hint": "המנכ\"ל החדש פועל כבר שנתיים — האם יש סימנים שהשיקום עובד?"
    },
    {
        "id": "managed-leverage-e01",
        "name": "מגדלי הים בע\"מ",
        "sector": "נדל\"ן מניב",
        "symbol": "MGDL",
        "price": 115,
        "tier": 1,
        "chartType": "annual",
        "description": "חברת נדל\"ן מניב עם 5 מגדלי משרדים בגוש דן. תפוסה 96%. חוב גבוה יחסית (חוב/הון 1.4) אבל כולו בריבית קבועה לטווח ארוך ומכוסה בקלות מהשכירות.",
        "management": "צוות ניהול ותיק ושמרני. לא רוכשים נכסים חדשים עד שהקיימים מייצרים 100% תפוסה.",
        "moat": "מיקומים פריים בגוש דן, חוזי שכירות ארוכי טווח, תפוסה גבוהה מהממוצע בענף.",
        "events": "חידוש חוזה עם שוכר עוגן ל-7 שנים. ריבית קבועה על כל החוב עד year+5.",
        "metrics": {
            "basic": [
                {
                    "name": "P/FFO",
                    "value": "11"
                },
                {
                    "name": "ROE",
                    "value": "16%"
                },
                {
                    "name": "תשואת דיבידנד",
                    "value": "5.5%"
                }
            ],
            "advanced": [
                {
                    "name": "יחס כיסוי ריבית",
                    "value": "3.8x"
                },
                {
                    "name": "FCF (מיליון ₪)",
                    "value": "72"
                },
                {
                    "name": "תפוסה",
                    "value": "96%"
                }
            ]
        },
        "historicalData": [
            {
                "year": "year-4",
                "revenue": 190,
                "fcf": 55
            },
            {
                "year": "year-3",
                "revenue": 200,
                "fcf": 60
            },
            {
                "year": "year-2",
                "revenue": 195,
                "fcf": 58
            },
            {
                "year": "year-1",
                "revenue": 210,
                "fcf": 65
            },
            {
                "year": "year-0",
                "revenue": 225,
                "fcf": 72
            }
        ],
        "projectedData": [
            {
                "year": "year+1",
                "revenue": 235,
                "fcf": 76
            },
            {
                "year": "year+2",
                "revenue": 245,
                "fcf": 80
            }
        ],
        "correctDecision": "buy",
        "pointValue": 100,
        "hints": [
            {
                "cost": 0.5,
                "text": "חוב/הון 1.4 נראה גבוה — אבל מה סוג החוב ומה יחס הכיסוי?"
            }
        ],
        "feedback": {
            "principle": {
                "id": "leverage-risk",
                "name": "סיכון מינוף"
            },
            "decisiveSignals": [
                "ריבית קבועה לטווח ארוך",
                "יחס כיסוי 3.8x",
                "תפוסה 96%"
            ],
            "correctExplanation": "מצוין! לא כל מינוף הוא רע. חוב בריבית קבועה, מכוסה 3.8 פעמים, עם שכירות יציבה — זה מינוף חכם שמגדיל תשואה. P/FFO 11 = זול לנדל\"ן מניב איכותי.",
            "incorrectExplanation": "טעות! חוב/הון 1.4 הבהיל אותך, אבל חוב בריבית קבועה עם יחס כיסוי 3.8x הוא בטוח. בנדל\"ן מניב, מינוף שמרני הוא חלק מהעסק.",
            "counterSignalExplanation": "הצד השני יטען: חוב/הון 1.4 חושף את החברה לעליית ריבית כשהחוב יגיע למיחזור, ירידה בתפוסה עלולה לפגוע ביחס הכיסוי, ונדל\"ן משרדי עשוי לסבול מעבודה מרחוק."
        },
        "workedExample": "1) בדיקת מינוף: חוב/הון 1.4 — גבוה. אבל מה סוג החוב? ריבית קבועה ל-5+ שנים. 2) בדיקת כיסוי: 3.8x = אפילו אם ההכנסות ירדו 30%, עדיין מכסים ריבית. 3) בדיקת נכסים: תפוסה 96%, מיקומים פריים, חוזים ארוכים. 4) תמחור: P/FFO 11 = זול לנדל\"ן מניב איכותי. 5) מסקנה: מינוף חכם ושמרני — קנייה.",
        "isGoodValue": true,
        "difficulty": "easy",
        "difficultyValue": 1,
        "hint": "חוב/הון 1.4 נראה גבוה — אבל מה סוג החוב ומה יחס הכיסוי?"
    },
    {
        "id": "eroding-moat-e01",
        "name": "סלקום פלוס בע\"מ",
        "sector": "תקשורת",
        "symbol": "SLKP",
        "price": 25,
        "tier": 1,
        "chartType": "annual",
        "description": "חברת סלולר שהייתה מובילת שוק עם 35% נתח, אבל רפורמת התקשורת שחקה את המחירים. המותג עדיין חזק, אבל ה-ARPU (הכנסה ממנוי) יורד כל שנה.",
        "management": "מנכ\"ל מנוסה שמנסה לפצות עם שירותי סטרימינג ופיננסים, אבל אלה עדיין לא רווחיים.",
        "moat": "מותג חזק ובסיס לקוחות גדול, אבל נתח שוק יורד ואין יתרון מחיר. תשתית קיימת אבל כולם חולקים אותה.",
        "events": "כניסת שחקן חדש (MVNO) שמציע מחירים נמוכים ב-30%. אחוז הנטישה עלה ל-18% שנתי.",
        "metrics": {
            "basic": [
                {
                    "name": "P/E",
                    "value": "8"
                },
                {
                    "name": "ROE",
                    "value": "12%"
                },
                {
                    "name": "תשואת דיבידנד",
                    "value": "6%"
                }
            ],
            "advanced": [
                {
                    "name": "ROIC",
                    "value": "9%"
                },
                {
                    "name": "FCF (מיליון ₪)",
                    "value": "45"
                },
                {
                    "name": "ARPU (ירידה שנתית)",
                    "value": "-7%"
                }
            ]
        },
        "historicalData": [
            {
                "year": "year-4",
                "revenue": 520,
                "fcf": 75
            },
            {
                "year": "year-3",
                "revenue": 490,
                "fcf": 65
            },
            {
                "year": "year-2",
                "revenue": 465,
                "fcf": 58
            },
            {
                "year": "year-1",
                "revenue": 435,
                "fcf": 50
            },
            {
                "year": "year-0",
                "revenue": 410,
                "fcf": 45
            }
        ],
        "projectedData": [
            {
                "year": "year+1",
                "revenue": 385,
                "fcf": 38
            },
            {
                "year": "year+2",
                "revenue": 360,
                "fcf": 32
            }
        ],
        "correctDecision": "pass",
        "pointValue": 100,
        "hints": [
            {
                "cost": 0.5,
                "text": "חפיר שנשחק הוא גרוע יותר מחפיר שלא קיים — למה?"
            }
        ],
        "feedback": {
            "principle": {
                "id": "moat",
                "name": "חפיר כלכלי"
            },
            "decisiveSignals": [
                "ARPU יורד 7% בשנה",
                "נתח שוק נשחק",
                "מתחרה חדש עם מחירים נמוכים ב-30%"
            ],
            "correctExplanation": "נכון! חפיר שנשחק = הערך נעלם. P/E 8 נראה זול, אבל כש-ARPU יורד 7% בשנה, ההכנסות ימשיכו לרדת. מותג חזק לא שווה כלום אם הלקוחות בורחים למחירים נמוכים יותר.",
            "incorrectExplanation": "טעות! FCF חיובי ודיבידנד 6% מפתים, אבל כשהחפיר נשחק, כל המספרים האלה ירדו. השוק כבר מתמחר את זה ב-P/E 8.",
            "counterSignalExplanation": "הצד השני יטען: P/E 8 ודיבידנד 6% זה זול. המותג עדיין חזק, יש בסיס לקוחות גדול, והמעבר לשירותים דיגיטליים עשוי ליצור זרם הכנסות חדש."
        },
        "workedExample": "1) זיהוי: חברה עם חפיר שנשחק (ירידה ב-ARPU, נתח שוק, כניסת מתחרים). 2) ניתוח מגמה: 4 שנים של ירידה עקבית בהכנסות ו-FCF. 3) בדיקת P/E: 8 לתקשורת נראה זול, אבל הרווחים עצמם יורדים. 4) פיזור חדש (סטרימינג, פינטק): לא רווחי עדיין, לא מוכח. 5) מסקנה: חפיר נשחק = מלכודת ערך בהתהוות.",
        "isGoodValue": false,
        "difficulty": "easy",
        "difficultyValue": 1,
        "hint": "חפיר שנשחק הוא גרוע יותר מחפיר שלא קיים — למה?"
    },
    {
        "id": "no-margin-e01",
        "name": "ביו-מד ישראל בע\"מ",
        "sector": "פארמה",
        "symbol": "BIOM",
        "price": 220,
        "tier": 1,
        "chartType": "annual",
        "description": "חברת פארמה איכותית עם תרופה מובילה בשוק. הבעיה: המחיר מתמחר שלמות. P/E 32 על רווחים שצומחים 8% בשנה (PEG 4.0). אין מרווח ביטחון אם משהו ישתבש.",
        "management": "הנהלה מקצועית ויציבה. מוניטין מצוין בתעשייה.",
        "moat": "פטנט על תרופה מובילה, אבל הפטנט פג תוך 3 שנים. פייפליין דק.",
        "events": "אנליסטים ממליצים 'קנייה' פה אחד. המניה עלתה 40% בשנה האחרונה.",
        "metrics": {
            "basic": [
                {
                    "name": "P/E",
                    "value": "32"
                },
                {
                    "name": "ROE",
                    "value": "24%"
                },
                {
                    "name": "צמיחת הכנסות",
                    "value": "8%"
                }
            ],
            "advanced": [
                {
                    "name": "PEG",
                    "value": "4.0"
                },
                {
                    "name": "FCF (מיליון ₪)",
                    "value": "95"
                },
                {
                    "name": "פקיעת פטנט",
                    "value": "3 שנים"
                }
            ]
        },
        "historicalData": [
            {
                "year": "year-4",
                "revenue": 380,
                "fcf": 70
            },
            {
                "year": "year-3",
                "revenue": 410,
                "fcf": 78
            },
            {
                "year": "year-2",
                "revenue": 425,
                "fcf": 80
            },
            {
                "year": "year-1",
                "revenue": 460,
                "fcf": 88
            },
            {
                "year": "year-0",
                "revenue": 495,
                "fcf": 95
            }
        ],
        "projectedData": [
            {
                "year": "year+1",
                "revenue": 535,
                "fcf": 102
            },
            {
                "year": "year+2",
                "revenue": 550,
                "fcf": 100
            }
        ],
        "correctDecision": "pass",
        "pointValue": 100,
        "hints": [
            {
                "cost": 0.5,
                "text": "PEG 4.0 = משלמים פרמיה ענקית על צמיחה צנועה. מה קורה כשהפטנט פג?"
            }
        ],
        "feedback": {
            "principle": {
                "id": "margin-of-safety",
                "name": "מרווח ביטחון"
            },
            "decisiveSignals": [
                "PEG 4.0 = יקר מאוד",
                "פטנט פג ב-3 שנים",
                "אין מרווח ביטחון"
            ],
            "correctExplanation": "נכון! חברה איכותית, אבל המחיר מתמחר שלמות. PEG 4.0 = משלמים 4x על הצמיחה. ועם פטנט שפג ב-3 שנים, אין מרווח ביטחון כלל. באפט לא קונה חברות טובות במחיר מופרז.",
            "incorrectExplanation": "טעות! החברה עצמה מעולה, אבל המחיר לא. PEG 4.0 = P/E 32 על צמיחה של 8%. זה ארבע פעמים יותר מהצפוי. אין מרווח ביטחון = לא קונים.",
            "counterSignalExplanation": "הצד השני יטען: חברה איכותית עם ROE 24%, FCF חזק, והנהלה מעולה. אנליסטים ממליצים קנייה. אולי הפייפליין יניב תרופות חדשות לפני שהפטנט פג."
        },
        "workedExample": "1) בדיקת איכות: ROE 24%, FCF חזק, הנהלה טובה — חברה איכותית. 2) בדיקת מחיר: P/E 32, צמיחה 8%, PEG 4.0 — יקר מאוד. 3) סיכון: פטנט פג ב-3 שנים, פייפליין דק. 4) מרווח ביטחון: אפס. כל הפתעה שלילית תפגע קשה. 5) מסקנה: חברה מעולה, מחיר מופרז = אין מרווח ביטחון. העל.",
        "isGoodValue": false,
        "difficulty": "easy",
        "difficultyValue": 1,
        "hint": "PEG 4.0 = משלמים פרמיה ענקית על צמיחה צנועה. מה קורה כשהפטנט פג?"
    },
    {
        "id": "turnaround-buy-e01",
        "name": "תעשיות הגליל בע\"מ",
        "sector": "תעשייה",
        "symbol": "TGLL",
        "price": 28,
        "tier": 1,
        "chartType": "quarterly",
        "description": "מפעל ייצור שעבר שנתיים קשות אבל מינה מנכ\"לית חדשה שכבר מראה תוצאות: חיתוך עלויות של 20%, סגירת קווי ייצור הפסדיים, ורבעון אחרון חיובי.",
        "management": "מנכ\"לית חדשה (שנה בתפקיד) עם רקורד מוכח של שיקום חברות. קנתה מניות ב-₪2M מכספה.",
        "moat": "אין חפיר מובהק, אבל המפעל המשופץ יעיל יותר מהמתחרים.",
        "events": "סגירה של 2 קווי ייצור הפסדיים. חתימה על חוזה אספקה חדש עם לקוח גדול.",
        "metrics": {
            "basic": [
                {
                    "name": "P/E",
                    "value": "35 (על רווחים מנורמלים)"
                },
                {
                    "name": "ROE",
                    "value": "3%"
                },
                {
                    "name": "צמיחת הכנסות",
                    "value": "-5%"
                }
            ],
            "advanced": [
                {
                    "name": "ROIC",
                    "value": "4%"
                },
                {
                    "name": "FCF (מיליון ₪)",
                    "value": "-2"
                },
                {
                    "name": "שיפור מרווח תפעולי",
                    "value": "+400bp ברבעון אחרון"
                }
            ]
        },
        "quarterlyData": [
            {
                "quarter": "Q1 year-1",
                "revenue": 62,
                "fcf": -8
            },
            {
                "quarter": "Q2 year-1",
                "revenue": 58,
                "fcf": -10
            },
            {
                "quarter": "Q3 year-1",
                "revenue": 55,
                "fcf": -6
            },
            {
                "quarter": "Q4 year-1",
                "revenue": 60,
                "fcf": -3
            },
            {
                "quarter": "Q1 year-0",
                "revenue": 58,
                "fcf": -2
            },
            {
                "quarter": "Q2 year-0",
                "revenue": 63,
                "fcf": 2
            }
        ],
        "projectedData": [
            {
                "year": "year+1",
                "revenue": 260,
                "fcf": 15
            },
            {
                "year": "year+2",
                "revenue": 280,
                "fcf": 25
            }
        ],
        "correctDecision": "buy",
        "pointValue": 100,
        "hints": [
            {
                "cost": 0.5,
                "text": "FCF שלילי? נכון, אבל הסתכלו על הכיוון — מה קורה ברבעון האחרון?"
            }
        ],
        "feedback": {
            "principle": {
                "id": "turnaround",
                "name": "שיקום"
            },
            "decisiveSignals": [
                "שיפור 400bp במרווח תפעולי",
                "רבעון אחרון חיובי",
                "מנכ\"לית קנתה מניות מכספה"
            ],
            "correctExplanation": "מצוין! בשיקום, הכיוון חשוב יותר מהמספר המוחלט. FCF הפך חיובי ברבעון האחרון, ומנכ\"לית שקונה מניות מכספה = skin in the game. זה שיקום אמיתי בשלב מוקדם.",
            "incorrectExplanation": "פספוס! FCF שלילי הבהיל אותך, אבל המגמה ברורה: מ-₪-10M ל-₪+2M תוך 5 רבעונים. מנכ\"לית שקונה מניות ב-₪2M מכספה מאמינה בשיקום. המחיר ₪28 מתמחר כישלון — לא שיקום.",
            "counterSignalExplanation": "הצד השני יטען: FCF עדיין שלילי על בסיס שנתי, אין חפיר, P/E 35 גבוה, ולא כל שיקום מצליח. רבעון אחד חיובי זה לא מגמה."
        },
        "workedExample": "1) זיהוי: חברה בשיקום. 2) בדיקת התקדמות ברבעונים: FCF הפך מ-₪-10M ל-₪+2M — מגמה ברורה. 3) בדיקת הנהלה: מנכ\"לית עם רקורד + קנייה אישית = מחויבות. 4) פעולות: סגירת קווים הפסדיים + חוזה חדש = צעדים נכונים. 5) תמחור: ₪28 מתמחר כישלון, אם השיקום יצליח — אפסייד גדול. 6) מסקנה: שיקום מוקדם עם סימנים חיוביים — קנייה.",
        "isGoodValue": true,
        "difficulty": "easy",
        "difficultyValue": 1,
        "hint": "FCF שלילי? נכון, אבל הסתכלו על הכיוון — מה קורה ברבעון האחרון?"
    },
    {
        "id": "growth-trap-e01",
        "name": "קוויקשיפ לוגיסטיקה בע\"מ",
        "sector": "לוגיסטיקה",
        "symbol": "QKSH",
        "price": 88,
        "tier": 1,
        "chartType": "annual",
        "description": "חברת שילוח שגדלה 30% בשנה דרך מלחמת מחירים. ההכנסות מרקיעות שחקים אבל המרווחים מתכווצים כל שנה. היא מוכרת בהפסד כדי לכבוש נתח שוק.",
        "management": "מנכ\"ל שרודף צמיחה מכל מחיר. מתגאה ב-30% צמיחה בכל דוח.",
        "moat": "אין — לוגיסטיקה היא שוק תחרותי עם מרווחים דקים. אין נאמנות לקוחות.",
        "events": "גיוס חוב של ₪200M לסבסוד המחירים. שני מתחרים גדולים הודיעו על הורדת מחירים תואמת.",
        "metrics": {
            "basic": [
                {
                    "name": "P/S",
                    "value": "2.5"
                },
                {
                    "name": "ROE",
                    "value": "-4%"
                },
                {
                    "name": "צמיחת הכנסות",
                    "value": "30%"
                }
            ],
            "advanced": [
                {
                    "name": "מרווח גולמי",
                    "value": "8% (ירידה מ-15%)"
                },
                {
                    "name": "FCF (מיליון ₪)",
                    "value": "-35"
                },
                {
                    "name": "Burn Rate (חודשי מזומן)",
                    "value": "14 חודשים"
                }
            ]
        },
        "historicalData": [
            {
                "year": "year-4",
                "revenue": 200,
                "fcf": 10
            },
            {
                "year": "year-3",
                "revenue": 260,
                "fcf": -5
            },
            {
                "year": "year-2",
                "revenue": 340,
                "fcf": -18
            },
            {
                "year": "year-1",
                "revenue": 440,
                "fcf": -28
            },
            {
                "year": "year-0",
                "revenue": 570,
                "fcf": -35
            }
        ],
        "projectedData": [
            {
                "year": "year+1",
                "revenue": 740,
                "fcf": -45
            },
            {
                "year": "year+2",
                "revenue": 960,
                "fcf": -50
            }
        ],
        "correctDecision": "pass",
        "pointValue": 100,
        "hints": [
            {
                "cost": 0.5,
                "text": "צמיחה מרשימה, אבל ההכנסות הוכפלו כמעט פי 3 בזמן שהמרווח ירד מ-15% ל-8%. מה קורה פה?"
            }
        ],
        "feedback": {
            "principle": {
                "id": "growth-trap",
                "name": "מלכודת צמיחה"
            },
            "decisiveSignals": [
                "מרווח יורד מ-15% ל-8%",
                "FCF שלילי ומחמיר",
                "צמיחה מסובסדת בחוב"
            ],
            "correctExplanation": "נכון! צמיחה של 30% שבאה על חשבון רווחיות היא מלכודת צמיחה קלאסית. ההכנסות מרשימות אבל כל שקל מכירה מפסיד. כשהכסף ייגמר (14 חודשים), הצמיחה תיעצר.",
            "incorrectExplanation": "טעות! צמיחה של 30% מסנוורת, אבל הסתכלו על המרווחים — הם מתכווצים כל שנה. זו לא צמיחה אמיתית, זה קניית הכנסות בהפסד.",
            "counterSignalExplanation": "הצד השני יטען: חברות כמו אמזון גם הפסידו שנים לפני שהפכו רווחיות. צמיחה של 30% = כיבוש שוק, ומי שינצח את מלחמת המחירים ירוויח בגדול."
        },
        "workedExample": "1) צמיחה 30% — מרשים! אבל... 2) מרווח גולמי ירד מ-15% ל-8% — הצמיחה באה על חשבון רווחיות. 3) FCF שלילי ומחמיר: ₪-35M, burn rate 14 חודשים. 4) אין חפיר: לוגיסטיקה = מרווחים דקים, אין נאמנות. 5) מתחרים מגיבים: שני גדולים הורידו מחירים = race to the bottom. 6) מסקנה: מלכודת צמיחה — הכנסות ללא רווח.",
        "isGoodValue": false,
        "difficulty": "easy",
        "difficultyValue": 1,
        "hint": "צמיחה מרשימה, אבל ההכנסות הוכפלו כמעט פי 3 בזמן שהמרווח ירד מ-15% ל-8%. מה קורה פה?"
    },
    {
        "id": "owner-earnings-e01",
        "name": "נתיבי ישראל שירותים בע\"מ",
        "sector": "שירותים",
        "symbol": "NTVI",
        "price": 62,
        "tier": 1,
        "chartType": "none",
        "description": "חברת שירותי תחזוקת כבישים. מדווחת הפסד חשבונאי בגלל פחת כבד, אבל התזרים חיובי ויציב. ההפרש בין הרווח החשבונאי לתזרים גדול.",
        "management": "הנהלה מנוסה שמפעילה בשמרנות. מחלקת 60% מהתזרים כדיבידנד.",
        "moat": "חוזים ממשלתיים ל-10 שנים. מעטים מתחרים עם היכולת והרישיון לתחזוקת כבישים ראשיים.",
        "events": "זכייה בחוזה תחזוקה חדש. ההפסד החשבונאי גרם לנפילה של 20% במניה.",
        "metrics": {
            "basic": [
                {
                    "name": "P/E",
                    "value": "שלילי (הפסד חשבונאי)"
                },
                {
                    "name": "ROE",
                    "value": "-2% (חשבונאי)"
                },
                {
                    "name": "תשואת דיבידנד",
                    "value": "5%"
                }
            ],
            "advanced": [
                {
                    "name": "רווחי בעלים (FCF)",
                    "value": "₪38M"
                },
                {
                    "name": "P/Owner-Earnings",
                    "value": "8"
                },
                {
                    "name": "פחת > CAPEX תחזוקה",
                    "value": "פי 2.5"
                }
            ]
        },
        "historicalData": [
            {
                "year": "year-4",
                "revenue": 180,
                "fcf": 32
            },
            {
                "year": "year-3",
                "revenue": 185,
                "fcf": 34
            },
            {
                "year": "year-2",
                "revenue": 190,
                "fcf": 30
            },
            {
                "year": "year-1",
                "revenue": 195,
                "fcf": 36
            },
            {
                "year": "year-0",
                "revenue": 200,
                "fcf": 38
            }
        ],
        "projectedData": [
            {
                "year": "year+1",
                "revenue": 210,
                "fcf": 40
            },
            {
                "year": "year+2",
                "revenue": 220,
                "fcf": 42
            }
        ],
        "correctDecision": "buy",
        "pointValue": 100,
        "hints": [
            {
                "cost": 0.5,
                "text": "הרווח החשבונאי שלילי, אבל מה עם רווחי הבעלים (FCF)?"
            }
        ],
        "feedback": {
            "principle": {
                "id": "owner-earnings",
                "name": "רווחי בעלים"
            },
            "decisiveSignals": [
                "FCF ₪38M חיובי ויציב",
                "פחת גבוה פי 2.5 מ-CAPEX תחזוקה",
                "P/Owner-Earnings 8"
            ],
            "correctExplanation": "מצוין! ההפסד החשבונאי מטעה — הפחת הכבד מוריד את הרווח אבל לא משקף תזרים אמיתי. רווחי הבעלים (FCF) הם ₪38M, ו-P/Owner-Earnings 8 = זול. באפט מסתכל על תזרים, לא על חשבונאות.",
            "incorrectExplanation": "טעות! P/E שלילי הבהיל אותך, אבל זה הפסד חשבונאי — לא אמיתי. FCF ₪38M, דיבידנד 5%, חוזים ממשלתיים = עסק מצוין במחיר זול.",
            "counterSignalExplanation": "הצד השני יטען: חברה עם P/E שלילי ו-ROE שלילי נראית רע על הנייר. הפחת הכבד עלול להצביע על ציוד ישן שידרוש החלפה יקרה בעתיד."
        },
        "workedExample": "1) P/E שלילי = הפסד חשבונאי. 2) אבל FCF ₪38M = חיובי ויציב. ההבדל = פחת גבוה. 3) פחת > CAPEX תחזוקה פי 2.5 = הפחת מוגזם. 4) P/Owner-Earnings 8 = זול. 5) חוזים ממשלתיים + חפיר = בטוח. 6) מסקנה: רווחי הבעלים אמיתיים ויציבים — קנייה.",
        "isGoodValue": true,
        "difficulty": "easy",
        "difficultyValue": 1,
        "hint": "הרווח החשבונאי שלילי, אבל מה עם רווחי הבעלים (FCF)?"
    },
    {
        "id": "network-moat-e01",
        "name": "פיי-קליק תשלומים בע\"מ",
        "sector": "תשלומים",
        "symbol": "PYCL",
        "price": 135,
        "tier": 1,
        "chartType": "segments",
        "description": "חברת תשלומים שבנתה רשת של 18,000 בתי עסק ו-2 מיליון משתמשים. ככל שיותר עסקים מצטרפים, יותר צרכנים רוצים את האפליקציה — וההפך. אפקט רשת קלאסי. ROIC 21%, FCF עולה כל שנה.",
        "management": "מייסדת עם 18% אחזקה. מתמקדת ברווחיות מיום ראשון. סירבה ל-3 הצעות רכישה.",
        "moat": "אפקט רשת דו-צדדי: 18K עסקים ↔ 2M משתמשים. עלות מעבר גבוהה (אינטגרציה עם קופות).",
        "events": "שותפות עם 2 רשתות מזון גדולות. הוספת 3,000 עסקים ברבעון האחרון.",
        "metrics": {
            "basic": [
                {
                    "name": "P/E",
                    "value": "24"
                },
                {
                    "name": "PEG",
                    "value": "1.3"
                },
                {
                    "name": "ROE",
                    "value": "26%"
                }
            ],
            "advanced": [
                {
                    "name": "ROIC",
                    "value": "21%"
                },
                {
                    "name": "FCF (מיליון ₪)",
                    "value": "48"
                },
                {
                    "name": "צמיחת משתמשים",
                    "value": "25%/שנה"
                }
            ]
        },
        "segmentData": [
            {
                "name": "עמלות בתי עסק",
                "revenue": 145,
                "margin": "35%",
                "growth": "+22%"
            },
            {
                "name": "שירותים פיננסיים (חדש)",
                "revenue": 35,
                "margin": "45%",
                "growth": "+80%"
            },
            {
                "name": "פרסום ממוקד",
                "revenue": 20,
                "margin": "60%",
                "growth": "+40%"
            }
        ],
        "projectedData": [
            {
                "year": "year+1",
                "revenue": 240,
                "fcf": 62
            },
            {
                "year": "year+2",
                "revenue": 290,
                "fcf": 78
            }
        ],
        "correctDecision": "buy",
        "pointValue": 100,
        "hints": [
            {
                "cost": 0.5,
                "text": "18,000 עסקים ו-2 מיליון משתמשים — כמה קשה למתחרה חדש לבנות את זה מאפס?"
            }
        ],
        "feedback": {
            "principle": {
                "id": "moat",
                "name": "חפיר כלכלי"
            },
            "decisiveSignals": [
                "אפקט רשת דו-צדדי",
                "ROIC 21% + עולה",
                "3 סגמנטים רווחיים"
            ],
            "correctExplanation": "מצוין! אפקט רשת הוא החפיר החזק ביותר — ככל שהרשת גדלה, היא נהיית יותר חזקה. 18K עסקים = מתחרה צריך שנים לשכפל. וה-ROIC 21% מוכיח שהחפיר מתורגם לרווחים.",
            "incorrectExplanation": "פספוס! P/E 24 הפחיד? PEG 1.3 על צמיחה של 18% = סביר לטכנולוגיה רווחית. והכי חשוב: אפקט רשת = כל משתמש חדש מחזק את החפיר. זה מתחזק, לא נשחק.",
            "counterSignalExplanation": "הצד השני יטען: P/E 24 גבוה, פינטק תחרותי, ורגולציה פיננסית עלולה לפגוע. בנקים גדולים יכולים לבנות מוצר מתחרה."
        },
        "workedExample": "1) סוג חפיר: אפקט רשת דו-צדדי — החזק ביותר. 2) קנה מידה: 18K עסקים + 2M משתמשים = קשה מאוד לשכפל. 3) סגמנטים: 3 סגמנטים רווחיים עם מרווחים 35-60% = מגוון. 4) ROIC 21% = החפיר מתורגם לרווח. 5) PEG 1.3 = סביר. 6) מסקנה: חפיר רשת שמתחזק — קנייה.",
        "isGoodValue": true,
        "difficulty": "easy",
        "difficultyValue": 1,
        "hint": "18,000 עסקים ו-2 מיליון משתמשים — כמה קשה למתחרה חדש לבנות את זה מאפס?"
    },
    {
        "id": "switching-cost-e01",
        "name": "מערכות ERP-IL בע\"מ",
        "sector": "תוכנה עסקית",
        "symbol": "ERPI",
        "price": 92,
        "tier": 1,
        "chartType": "none",
        "description": "חברת תוכנת ניהול עסקי (ERP) לעסקים בינוניים. 850 לקוחות, שיעור חידוש 95%. להחליף מערכת ERP = 6-12 חודשי עבודה ומיליון ₪. אין סיבה שלקוח יעזוב.",
        "management": "מייסד-מנכ\"ל עם 22% אחזקה. משקיע 18% מההכנסות בפיתוח מוצר. 'אנחנו לא מוכרים תוכנה — אנחנו בונים תלות.'",
        "moat": "עלות מעבר = ₪1M+ ו-12 חודשי עבודה. 95% חידוש. כל שנה שהלקוח נשאר, הוא יותר תלוי.",
        "events": "שום חדשות מרגשות — וזה בדיוק הנקודה. 95% חידוש = ₪75M הכנסות חוזרות מובטחות.",
        "metrics": {
            "basic": [
                {
                    "name": "P/E",
                    "value": "18"
                },
                {
                    "name": "ROE",
                    "value": "20%"
                },
                {
                    "name": "צמיחת הכנסות",
                    "value": "8%"
                }
            ],
            "advanced": [
                {
                    "name": "ROIC",
                    "value": "22%"
                },
                {
                    "name": "FCF (מיליון ₪)",
                    "value": "28"
                },
                {
                    "name": "שיעור חידוש",
                    "value": "95%"
                }
            ]
        },
        "historicalData": [
            {
                "year": "year-4",
                "revenue": 68,
                "fcf": 20
            },
            {
                "year": "year-3",
                "revenue": 72,
                "fcf": 22
            },
            {
                "year": "year-2",
                "revenue": 78,
                "fcf": 24
            },
            {
                "year": "year-1",
                "revenue": 82,
                "fcf": 25
            },
            {
                "year": "year-0",
                "revenue": 88,
                "fcf": 28
            }
        ],
        "projectedData": [
            {
                "year": "year+1",
                "revenue": 95,
                "fcf": 31
            },
            {
                "year": "year+2",
                "revenue": 103,
                "fcf": 34
            }
        ],
        "correctDecision": "buy",
        "pointValue": 100,
        "hints": [
            {
                "cost": 0.5,
                "text": "עלות מעבר ₪1M+ ו-12 חודשים — כמה לקוחות 'ירצו' לעזוב?"
            }
        ],
        "feedback": {
            "principle": {
                "id": "moat",
                "name": "חפיר כלכלי"
            },
            "decisiveSignals": [
                "שיעור חידוש 95%",
                "עלות מעבר ₪1M+",
                "ROIC 22% עקבי"
            ],
            "correctExplanation": "מצוין! עלות מעבר = חפיר שמתחזק עם הזמן. 95% חידוש = הכנסות כמעט מובטחות. ROIC 22% = החפיר מייצר ערך. P/E 18 סביר למודל הכנסות חוזרות.",
            "incorrectExplanation": "פספוס! 'צמיחה 8% — לא מרגש' נכון, אבל 95% חידוש = העסק הבסיסי בטוח כמעט לחלוטין. צמיחה 8% מעל בסיס מובטח = פנטסטי.",
            "counterSignalExplanation": "הצד השני יטען: צמיחה 8% = איטית. מערכות ענן חדשות עלולות להוריד את עלות המעבר. P/E 18 לא זול לחברה עם צמיחה חד-ספרתית."
        },
        "workedExample": "1) חפיר: עלות מעבר ₪1M + 12 חודשים = אף אחד לא עוזב. 2) חידוש 95% = ₪75M+ מובטח כל שנה. 3) ROIC 22% × 5 שנים = עקבי. 4) פיתוח 18% מהכנסות = ההנהלה בונה את החפיר עוד. 5) P/E 18 על הכנסות חוזרות = זול. 6) מסקנה: חפיר עלות מעבר — קנייה.",
        "isGoodValue": true,
        "difficulty": "easy",
        "difficultyValue": 1,
        "hint": "עלות מעבר ₪1M+ ו-12 חודשים — כמה לקוחות 'ירצו' לעזוב?"
    },
    {
        "id": "capital-allocation-e01",
        "name": "הדס תעשיות בע\"מ",
        "sector": "תעשייה",
        "symbol": "HDST",
        "price": 68,
        "tier": 1,
        "chartType": "waterfall",
        "description": "חברת תעשייה 'משעממת' שמנוהלת כמו מכונה. ההנהלה מחלקת כל שנה: 40% FCF לדיבידנד, 30% לרכישה עצמית, 30% להשקעות רק אם ROIC > 15%. שנה שאין השקעות ב-ROIC > 15%, הכסף חוזר לבעלי מניות.",
        "management": "מנכ\"ל בעל 15% אחזקה. כלל ברזל: 'לא משקיעים מתחת ל-ROIC 15%'. מחלק עודפים — לא בונה אימפריה.",
        "moat": "אין חפיר ספציפי, אבל הקצאת הון מעולה = יוצרת ערך לאורך זמן.",
        "events": "שנה שעברה סירב ל-3 רכישות כי ROIC שלהן היה 11%. העדיף לחלק את הכסף.",
        "metrics": {
            "basic": [
                {
                    "name": "P/E",
                    "value": "10"
                },
                {
                    "name": "ROE",
                    "value": "17%"
                },
                {
                    "name": "תשואת דיבידנד",
                    "value": "4%"
                }
            ],
            "advanced": [
                {
                    "name": "ROIC",
                    "value": "17% (מינימום פנימי: 15%)"
                },
                {
                    "name": "רכישה עצמית",
                    "value": "3%/שנה"
                },
                {
                    "name": "FCF (מיליון ₪)",
                    "value": "42"
                }
            ]
        },
        "historicalData": [
            {
                "year": "year-4",
                "revenue": 280,
                "fcf": 35
            },
            {
                "year": "year-3",
                "revenue": 285,
                "fcf": 37
            },
            {
                "year": "year-2",
                "revenue": 290,
                "fcf": 38
            },
            {
                "year": "year-1",
                "revenue": 295,
                "fcf": 40
            },
            {
                "year": "year-0",
                "revenue": 300,
                "fcf": 42
            }
        ],
        "projectedData": [
            {
                "year": "year+1",
                "revenue": 305,
                "fcf": 43
            },
            {
                "year": "year+2",
                "revenue": 310,
                "fcf": 44
            }
        ],
        "correctDecision": "buy",
        "pointValue": 100,
        "hints": [
            {
                "cost": 0.5,
                "text": "מנכ\"ל שמסרב לרכישות ב-ROIC 11% ומחזיר כסף — מה זה אומר על סדרי העדיפויות שלו?"
            }
        ],
        "feedback": {
            "principle": {
                "id": "management-quality",
                "name": "איכות הנהלה"
            },
            "decisiveSignals": [
                "כלל ROIC > 15% = משמעת הקצאת הון",
                "סירוב ל-3 רכישות = לא בונה אימפריה",
                "40% דיבידנד + 30% רכישה + 30% השקעה = מדיניות ברורה"
            ],
            "correctExplanation": "מצוין! מנכ\"ל שמחזיר כסף במקום להשקיע ברכישות גרועות = נדיר ויקר ערך. P/E 10 עם ROIC 17% ומדיניות שמעשירה בעלי מניות = מציאה. באפט: 'המבחן של הנהלה טובה הוא מה היא עושה כשיש לה מזומן עודף.'",
            "incorrectExplanation": "טעות! 'צמיחה 2%' ו'אין חפיר ספציפי' גרמו לך לעבור. אבל הקצאת הון מעולה היא חפיר בפני עצמו. P/E 10 + דיבידנד 4% + רכישה 3% = 7% תשואה שנתית 'אוטומטית'.",
            "counterSignalExplanation": "הצד השני יטען: צמיחה 2% = אין מנוע. אין חפיר מסורתי. P/E 10 = ממוצע לתעשייה. והסירוב לרכוש אולי פוגע בצמיחה ארוכת טווח."
        },
        "workedExample": "1) צמיחה 2% — 'משעמם'. 2) אבל: FCF ₪42M מוקצה בחוכמה: 40% דיבידנד, 30% רכישה, 30% השקעה. 3) כלל ROIC 15% = רק השקעות איכותיות. סירב ל-3 = לא פיתוי. 4) תשואה: דיבידנד 4% + רכישה 3% + צמיחה 2% = 9%/שנה. 5) P/E 10 = זול. 6) מסקנה: הקצאת הון מעולה — קנייה.",
        "isGoodValue": true,
        "difficulty": "easy",
        "difficultyValue": 1,
        "hint": "מנכ\"ל שמסרב לרכישות ב-ROIC 11% ומחזיר כסף — מה זה אומר על סדרי העדיפויות שלו?"
    },
    {
        "id": "moat-widening-e01",
        "name": "בדיקות ישראל בע\"מ",
        "sector": "בדיקות ואישורים",
        "symbol": "BDKT",
        "price": 175,
        "tier": 1,
        "chartType": "annual",
        "description": "חברת בדיקות ואישורים שכל מוצר שנמכר בישראל חייב לעבור אצלה. רגולציה חדשה מרחיבה את הדרישות — יותר מוצרים צריכים אישור. החפיר מתרחב, לא מצטמצם. ROIC 25%, FCF עולה 12% בשנה.",
        "management": "מנכ\"לית מהנדסת שמשקיעה במעבדות חדשות. 8% אחזקה. צוות יציב 15 שנה.",
        "moat": "מונופול רגולטורי: הגוף היחיד שמאושר לבדיקות. רגולציה חדשה = עוד מוצרים = חפיר מתרחב.",
        "events": "רגולציה חדשה: 30% יותר קטגוריות מוצרים דורשות אישור. שום מתחרה באופק.",
        "metrics": {
            "basic": [
                {
                    "name": "P/E",
                    "value": "22"
                },
                {
                    "name": "PEG",
                    "value": "1.8"
                },
                {
                    "name": "ROE",
                    "value": "28%"
                }
            ],
            "advanced": [
                {
                    "name": "ROIC",
                    "value": "25%"
                },
                {
                    "name": "FCF (מיליון ₪)",
                    "value": "38"
                },
                {
                    "name": "צמיחת FCF",
                    "value": "12%/שנה"
                }
            ]
        },
        "historicalData": [
            {
                "year": "year-4",
                "revenue": 120,
                "fcf": 24
            },
            {
                "year": "year-3",
                "revenue": 130,
                "fcf": 27
            },
            {
                "year": "year-2",
                "revenue": 142,
                "fcf": 30
            },
            {
                "year": "year-1",
                "revenue": 155,
                "fcf": 34
            },
            {
                "year": "year-0",
                "revenue": 170,
                "fcf": 38
            }
        ],
        "projectedData": [
            {
                "year": "year+1",
                "revenue": 195,
                "fcf": 44
            },
            {
                "year": "year+2",
                "revenue": 220,
                "fcf": 50
            }
        ],
        "correctDecision": "buy",
        "pointValue": 100,
        "hints": [
            {
                "cost": 0.5,
                "text": "רגולציה חדשה מוסיפה 30% קטגוריות — מה זה עושה לחברה שהיא הגוף היחיד שמאושר?"
            }
        ],
        "feedback": {
            "principle": {
                "id": "moat",
                "name": "חפיר כלכלי"
            },
            "decisiveSignals": [
                "מונופול רגולטורי",
                "חפיר מתרחב (רגולציה חדשה)",
                "ROIC 25%"
            ],
            "correctExplanation": "מצוין! חפיר שמתרחב הוא הדבר הכי טוב שמשקיע ערך יכול למצוא. רגולציה חדשה = עוד ביקוש מובטח לגוף היחיד. ROIC 25% מוכיח שהחפיר מתורגם לרווחים. PEG 1.8 = סביר לעסק עם חפיר מתרחב.",
            "incorrectExplanation": "פספוס! P/E 22 או PEG 1.8 הפחידו? ROIC 25% עם חפיר מונופוליסטי שמתרחב = נדיר בשוק. רגולציה חדשה = 'צמיחה בחינם' — בלי שהחברה צריכה להשקיע בשיווק.",
            "counterSignalExplanation": "הצד השני יטען: P/E 22 גבוה. תלות ברגולציה = הרגולטור יכול גם לשנות. מונופולים מושכים ביקורת ציבורית. ו-PEG 1.8 = פרמיה."
        },
        "workedExample": "1) חפיר: מונופול רגולטורי = אין מתחרים. 2) כיוון: רגולציה חדשה = חפיר מתרחב, לא מצטמצם. 3) ROIC 25% × 5 שנים = עקבי ויציב. 4) P/E 22 — 'גבוה'? לא לעסק ב-ROIC 25% עם צמיחה 12%. 5) הנהלה: יציבה 15 שנה, משקיעה במעבדות. 6) מסקנה: חפיר מתרחב — קנייה.",
        "isGoodValue": true,
        "difficulty": "easy",
        "difficultyValue": 1,
        "hint": "רגולציה חדשה מוסיפה 30% קטגוריות — מה זה עושה לחברה שהיא הגוף היחיד שמאושר?"
    },
    {
        "id": "obsolescence-e01",
        "name": "מדפסות הזהב בע\"מ",
        "sector": "ציוד משרדי",
        "symbol": "MDFZ",
        "price": 30,
        "tier": 1,
        "chartType": "annual",
        "description": "יצרנית מדפסות משרדיות. רווחית היום: P/E 6, FCF חיובי, דיבידנד 7%. אבל: השוק מתכווץ 12% בשנה בגלל דיגיטציה. בעוד 5 שנים, ההכנסות ירדו בחצי. ההנהלה לא מגיבה.",
        "management": "מנכ\"ל ותיק שמסרב להכיר במגמה. 'אנשים תמיד ידפיסו.'",
        "moat": "מותג מוכר ורשת שירות, אבל הביקוש עצמו נעלם.",
        "events": "3 מתחרים סגרו את קו המדפסות. שוק ההדפסה ירד 12% בשנה.",
        "metrics": {
            "basic": [
                {
                    "name": "P/E",
                    "value": "6"
                },
                {
                    "name": "ROE",
                    "value": "15%"
                },
                {
                    "name": "תשואת דיבידנד",
                    "value": "7%"
                }
            ],
            "advanced": [
                {
                    "name": "ROIC",
                    "value": "12%"
                },
                {
                    "name": "FCF (מיליון ₪)",
                    "value": "22"
                },
                {
                    "name": "ירידת שוק שנתית",
                    "value": "-12%"
                }
            ]
        },
        "historicalData": [
            {
                "year": "year-4",
                "revenue": 250,
                "fcf": 35
            },
            {
                "year": "year-3",
                "revenue": 225,
                "fcf": 30
            },
            {
                "year": "year-2",
                "revenue": 200,
                "fcf": 28
            },
            {
                "year": "year-1",
                "revenue": 178,
                "fcf": 25
            },
            {
                "year": "year-0",
                "revenue": 158,
                "fcf": 22
            }
        ],
        "projectedData": [
            {
                "year": "year+1",
                "revenue": 140,
                "fcf": 18
            },
            {
                "year": "year+2",
                "revenue": 122,
                "fcf": 14
            }
        ],
        "correctDecision": "pass",
        "pointValue": 100,
        "hints": [
            {
                "cost": 0.5,
                "text": "P/E 6 ודיבידנד 7% — אבל ההכנסות ירדו 37% ב-4 שנים. איפה הן יהיו בעוד 4?"
            }
        ],
        "feedback": {
            "principle": {
                "id": "moat",
                "name": "חפיר כלכלי"
            },
            "decisiveSignals": [
                "שוק מתכווץ 12%/שנה",
                "הנהלה לא מסתגלת",
                "ירידת 37% ב-4 שנים"
            ],
            "correctExplanation": "נכון! באפט אומר: 'כשענף מתכווץ, גם החברה הכי טובה בענף תתכווץ.' P/E 6 ודיבידנד 7% מפתים, אבל FCF ₪22M ב-year-0 יהיה ₪10M בעוד 3 שנים. החפיר לא רלוונטי כשאין ביקוש.",
            "incorrectExplanation": "טעות! FCF חיובי ודיבידנד 7% הפתו אותך. אבל חשבו 5 שנים קדימה: שוק -12%/שנה = הכנסות ₪80M, FCF ₪5M. הדיבידנד ייחתך הרבה לפני.",
            "counterSignalExplanation": "הצד השני יטען: P/E 6 ודיבידנד 7% — תשואה גבוהה ליד. גם אם השוק מתכווץ, זה לוקח שנים. ואולי החברה תמצא מוצר חדש."
        },
        "workedExample": "1) P/E 6, דיבידנד 7% — 'מציאה'? 2) אבל: שוק -12%/שנה × 4 שנים = -37%. 3) בעוד 5 שנים: הכנסות ~₪80M (מ-₪250M). 4) FCF: ~₪5-8M = דיבידנד ייחתך. 5) הנהלה: לא מסתגלת = לא פותרת. 6) שאלת עתיד: 'האם מישהו ידפיס בעוד 10 שנים?' 7) מסקנה: חשיבה קדימה = העל.",
        "isGoodValue": false,
        "difficulty": "easy",
        "difficultyValue": 1,
        "hint": "P/E 6 ודיבידנד 7% — אבל ההכנסות ירדו 37% ב-4 שנים. איפה הן יהיו בעוד 4?"
    },
    {
        "id": "future-position-e01",
        "name": "גרין-לוג פתרונות בע\"מ",
        "sector": "לוגיסטיקה ירוקה",
        "symbol": "GRLG",
        "price": 58,
        "tier": 1,
        "chartType": "quarterly",
        "description": "חברת לוגיסטיקה שהשקיעה ₪50M בצי חשמלי. היום: ההשקעה הורידה את ה-FCF ו-ROIC נראה בינוני (10%). אבל: רגולציה חדשה תחייב כלי רכב ירוקים תוך 3 שנים. מתחרים לא השקיעו — יצטרכו להשקיע פי 2 בלחץ.",
        "management": "מנכ\"לית צעירה עם חזון. השקיעה לפני שהרגולציה חייבה. 'מי שבונה היום, ירוויח מחר.'",
        "moat": "יתרון ראשון-נכנס: צי חשמלי מוכן כשמתחרים רק מתחילים.",
        "events": "רגולציה אושרה: כל משאיות הפצה בערים חייבות חשמליות תוך 3 שנים. 2 לקוחות גדולים חתמו.",
        "metrics": {
            "basic": [
                {
                    "name": "P/E",
                    "value": "16"
                },
                {
                    "name": "ROE",
                    "value": "12%"
                },
                {
                    "name": "צמיחת הכנסות",
                    "value": "15%"
                }
            ],
            "advanced": [
                {
                    "name": "ROIC",
                    "value": "10% (צפוי 18% ב-year+2)"
                },
                {
                    "name": "FCF (מיליון ₪)",
                    "value": "12"
                },
                {
                    "name": "יתרון זמן על מתחרים",
                    "value": "~2 שנים"
                }
            ]
        },
        "quarterlyData": [
            {
                "quarter": "Q1 year-1",
                "revenue": 25,
                "fcf": 1
            },
            {
                "quarter": "Q2 year-1",
                "revenue": 28,
                "fcf": 2
            },
            {
                "quarter": "Q3 year-1",
                "revenue": 30,
                "fcf": 2
            },
            {
                "quarter": "Q4 year-1",
                "revenue": 32,
                "fcf": 3
            },
            {
                "quarter": "Q1 year-0",
                "revenue": 35,
                "fcf": 4
            },
            {
                "quarter": "Q2 year-0",
                "revenue": 38,
                "fcf": 5
            }
        ],
        "projectedData": [
            {
                "year": "year+1",
                "revenue": 170,
                "fcf": 25
            },
            {
                "year": "year+2",
                "revenue": 220,
                "fcf": 42
            }
        ],
        "correctDecision": "buy",
        "pointValue": 100,
        "hints": [
            {
                "cost": 0.5,
                "text": "ROIC 10% היום, אבל 18% בעוד שנתיים. מה ההבדל? ההשקעה בצי חשמלי תניב פירות כשהרגולציה תיכנס."
            }
        ],
        "feedback": {
            "principle": {
                "id": "moat",
                "name": "חפיר כלכלי"
            },
            "decisiveSignals": [
                "יתרון 2 שנים על מתחרים",
                "רגולציה מחייבת = ביקוש מובטח",
                "ROIC 10% → 18% ככל שההשקעה מניבה"
            ],
            "correctExplanation": "מצוין! חשיבת עתיד: ROIC 10% היום 'בינוני', אבל ₪50M ההשקעה תניב כשהרגולציה נכנסת. מתחרים יצטרכו להשקיע ₪100M בלחץ — בזמן שגרין-לוג כבר מרוויחה. יתרון ראשון-נכנס = חפיר זמני אבל חזק.",
            "incorrectExplanation": "פספוס! ROIC 10% ו-FCF ₪12M נראים בינוניים. אבל אתם מסתכלים על ההווה. חשבו שנתיים קדימה: רגולציה חדשה + צי מוכן = לקוחות חדשים + מרווחים גבוהים.",
            "counterSignalExplanation": "הצד השני יטען: ROIC 10% בינוני. FCF ₪12M נמוך. רגולציה עלולה להידחות. מתחרים גדולים עם כיסים עמוקים יכולים להשקיע מהר כשצריך."
        },
        "workedExample": "1) ROIC 10% — בינוני. אבל מה הסיפור? 2) השקעה ₪50M בצי חשמלי = ההוצאה כבר קרתה. 3) רגולציה חדשה = ביקוש מובטח תוך 3 שנים. 4) מתחרים: לא מוכנים. צריכים 2+ שנים להשיג. 5) ROIC year+2: 18% (ההשקעה מתחילה להניב). 6) מסקנה: קנייה על בסיס עתיד, לא הווה.",
        "isGoodValue": true,
        "difficulty": "easy",
        "difficultyValue": 1,
        "hint": "ROIC 10% היום, אבל 18% בעוד שנתיים. מה ההבדל?"
    },
    {
        "id": "comp-misaligned-e01",
        "name": "טופ-ליין שירותים בע\"מ",
        "sector": "שירותים עסקיים",
        "symbol": "TPLN",
        "price": 110,
        "tier": 1,
        "chartType": "none",
        "description": "חברת שירותים עם ביצועים 'טובים': הכנסות עולות 15%, רווח עולה 8%. אבל: המנכ\"ל מתוגמל על הכנסות, לא על רווח. הוא רוכש חברות יקרות שמוסיפות הכנסות אבל מורידות מרווחים. ROIC ירד מ-18% ל-11% ב-3 שנים.",
        "management": "מנכ\"ל שמתוגמל לפי הכנסות: בונוס ₪500K על כל ₪100M הכנסות. אין תנאי רווחיות.",
        "moat": "חלקי — מותג מוכר ולקוחות ארוכי טווח. אבל הרכישות מדללות את הערך.",
        "events": "3 רכישות בשנה ב-P/E ממוצע 18. ROIC ירד 7 נקודות ב-3 שנים.",
        "metrics": {
            "basic": [
                {
                    "name": "P/E",
                    "value": "14"
                },
                {
                    "name": "ROE",
                    "value": "14%"
                },
                {
                    "name": "צמיחת הכנסות",
                    "value": "15%"
                }
            ],
            "advanced": [
                {
                    "name": "ROIC",
                    "value": "11% (ירד מ-18%)"
                },
                {
                    "name": "FCF (מיליון ₪)",
                    "value": "32"
                },
                {
                    "name": "תגמול מנכ\"ל",
                    "value": "מבוסס הכנסות בלבד"
                }
            ]
        },
        "historicalData": [
            {
                "year": "year-4",
                "revenue": 280,
                "fcf": 42
            },
            {
                "year": "year-3",
                "revenue": 310,
                "fcf": 40
            },
            {
                "year": "year-2",
                "revenue": 345,
                "fcf": 38
            },
            {
                "year": "year-1",
                "revenue": 380,
                "fcf": 35
            },
            {
                "year": "year-0",
                "revenue": 430,
                "fcf": 32
            }
        ],
        "projectedData": [
            {
                "year": "year+1",
                "revenue": 490,
                "fcf": 30
            },
            {
                "year": "year+2",
                "revenue": 550,
                "fcf": 28
            }
        ],
        "correctDecision": "pass",
        "pointValue": 100,
        "hints": [
            {
                "cost": 0.5,
                "text": "הכנסות +54% ב-4 שנים, אבל FCF ירד 24%. לאן הולך הכסף?"
            }
        ],
        "feedback": {
            "principle": {
                "id": "management-quality",
                "name": "איכות הנהלה"
            },
            "decisiveSignals": [
                "תגמול מבוסס הכנסות = תמריץ לרכישות גרועות",
                "ROIC 18% → 11%",
                "הכנסות +54% אבל FCF -24%"
            ],
            "correctExplanation": "נכון! כשמנכ\"ל מתוגמל על הכנסות, הוא יקנה כל דבר שמוסיף הכנסות — גם אם זה הורס ערך. ROIC ירד 7 נקודות = כל שקל חדש שמושקע מרוויח פחות. הכנסות ↑ + FCF ↓ = חד משמעי.",
            "incorrectExplanation": "טעות! P/E 14 וצמיחה 15% נראים מצוין. אבל 'צמיחה' שמורידה ROIC ו-FCF = הורסת ערך. הסיבה: תגמול לפי הכנסות = תמריץ שגוי.",
            "counterSignalExplanation": "הצד השני יטען: P/E 14 סביר, הכנסות צומחות 15%, ומותג חזק. ROIC 11% עדיין מעל עלות ההון. הרכישות מוסיפות סקייל."
        },
        "workedExample": "1) הכנסות +54% ב-4 שנים — מרשים! 2) FCF: ₪42M → ₪32M = -24%. 3) למה? ROIC 18% → 11% = הרכישות מרוויחות פחות. 4) למה רוכשים? תגמול מבוסס הכנסות = ₪500K בונוס לכל ₪100M. 5) שאלה: מה יתמרץ אותו להפסיק? כלום — הוא מרוויח מכל רכישה. 6) מסקנה: אינטרסים לא מיושרים — העל.",
        "isGoodValue": false,
        "difficulty": "easy",
        "difficultyValue": 1,
        "hint": "הכנסות +54% ב-4 שנים, אבל FCF ירד 24%. לאן הולך הכסף?"
    },
    {
        "id": "brand-power-e01",
        "name": "שטראוס-לייט מזון בריאות בע\"מ",
        "sector": "מזון בריאות",
        "symbol": "STLT",
        "price": 82,
        "tier": 1,
        "chartType": "annual",
        "description": "מותג מזון בריאות שמוביל בישראל עם 45% נתח שוק. מרווח גולמי 48% — גבוה פי 2 ממתחרים. מחיר המוצרים גבוה ב-30% מהמתחרים, ועדיין צרכנים בוחרים בהם. זה כוח מותג.",
        "management": "מנכ\"ל שמשקיע 12% מההכנסות בשיווק ובחדשנות. 6% אחזקה.",
        "moat": "מותג = כוח תמחור. מוכרת ב-30% יותר מהמתחרים ועדיין מובילה.",
        "events": "השקת 3 מוצרים חדשים שכבר מהווים 8% מההכנסות. מתחרה פרייבט-לייבל הוזיל ב-25% — לא פגע בנתח.",
        "metrics": {
            "basic": [
                {
                    "name": "P/E",
                    "value": "20"
                },
                {
                    "name": "ROE",
                    "value": "24%"
                },
                {
                    "name": "צמיחת הכנסות",
                    "value": "7%"
                }
            ],
            "advanced": [
                {
                    "name": "ROIC",
                    "value": "20%"
                },
                {
                    "name": "FCF (מיליון ₪)",
                    "value": "35"
                },
                {
                    "name": "מרווח גולמי",
                    "value": "48% (ענפי: 24%)"
                }
            ]
        },
        "historicalData": [
            {
                "year": "year-4",
                "revenue": 210,
                "fcf": 26
            },
            {
                "year": "year-3",
                "revenue": 225,
                "fcf": 28
            },
            {
                "year": "year-2",
                "revenue": 235,
                "fcf": 30
            },
            {
                "year": "year-1",
                "revenue": 250,
                "fcf": 33
            },
            {
                "year": "year-0",
                "revenue": 268,
                "fcf": 35
            }
        ],
        "projectedData": [
            {
                "year": "year+1",
                "revenue": 286,
                "fcf": 38
            },
            {
                "year": "year+2",
                "revenue": 305,
                "fcf": 41
            }
        ],
        "correctDecision": "buy",
        "pointValue": 100,
        "hints": [
            {
                "cost": 0.5,
                "text": "מרווח גולמי כפול מהמתחרים + מתחרה הוזיל 25% ולא פגע — מה זה אומר על כוח המותג?"
            }
        ],
        "feedback": {
            "principle": {
                "id": "moat",
                "name": "חפיר כלכלי"
            },
            "decisiveSignals": [
                "מרווח גולמי 48% (פי 2 מענפי)",
                "מתחרה הוזיל ולא פגע",
                "45% נתח שוק"
            ],
            "correctExplanation": "מצוין! מבחן החפיר הכי טוב: 'האם מתחרה זול פוגע?' כשהתשובה 'לא' = חפיר מותגי חזק. מרווח 48% מול 24% = כל שקל מכירה מרוויח כפול. P/E 20 מוצדק לחפיר שעובר מבחן תחרות.",
            "incorrectExplanation": "טעות! P/E 20 עם צמיחה 7% = PEG 2.9 'גבוה'. אבל כשיש חפיר מותגי חזק (מרווח פי 2, נתח 45%, עמידות למתחרים), הפרמיה מוצדקת. חפיר = ביטחון.",
            "counterSignalExplanation": "הצד השני יטען: P/E 20 עם צמיחה 7% = PEG גבוה. מגמת בריאות יכולה להשתנות. מתחרי פרייבט-לייבל ימשיכו לנסות."
        },
        "workedExample": "1) חפיר: מותג ב-45% נתח, מרווח 48% (פי 2). 2) מבחן: מתחרה הוזיל 25% — לא פגע. = חפיר חי. 3) ROIC 20% = החפיר מייצר ערך. 4) חדשנות: 3 מוצרים חדשים = 8% הכנסות חדשות. 5) P/E 20 = פרמיה, אבל מוצדקת לחפיר מוכח. 6) מסקנה: מותג חזק שעובר מבחנים — קנייה.",
        "isGoodValue": true,
        "difficulty": "easy",
        "difficultyValue": 1,
        "hint": "מרווח גולמי כפול מהמתחרים + מתחרה הוזיל 25% ולא פגע — מה זה אומר על כוח המותג?"
    }
],
    medium: [
    {
        "id": "medical-devices-01",
        "name": "מדיקל אינוביישן",
        "sector": "ציוד רפואי",
        "symbol": "MDIN",
        "price": 178,
        "tier": 2,
        "description": "חברת ציוד רפואי חדשנית המתמחה ברובוטיקה כירורגית. מוצר דגל עם 500 התקנות ב-200 בתי חולים. צמיחה של 40% בשנה. התאמה אישית לניתוחים מורכבים. אך אין עדיין רווחיות.",
        "management": "מייסד-רופא כמנכ\"ל עם תשוקה לחדשנות אך חסר ניסיון עסקי. לאחרונה גויס CFO מנוסה מחברת מכשור רפואי גדולה. השקעה כבדה במו\"פ (25% מההכנסות) לפעמים על חשבון רווחיות.",
        "moat": "פטנטים חזקים על הטכנולוגיה הליבה. אישורי FDA ו-CE שלוקח שנים להשיג. עקומת למידה תלולה לשימוש במוצר. switching cost גבוה לבתי חולים. אך תחרות גוברת מחברות גדולות.",
        "events": "אישור FDA למוצר חדש לניתוחי לב. תביעה פטנטים מול מתחרה גדולה. זכייה במכרז גדול בגרמניה. ירידה בשולי רווח בגלל השקעות בתמיכה ללקוחות חדשים.",
        "metrics": {
            "basic": [
                {
                    "name": "P/E",
                    "value": "65"
                },
                {
                    "name": "ROE",
                    "value": "5%"
                },
                {
                    "name": "תשואת דיבידנד",
                    "value": "0%"
                },
                {
                    "name": "PEG",
                    "value": "2.1"
                }
            ],
            "advanced": [
                {
                    "name": "ROIC",
                    "value": "3%"
                },
                {
                    "name": "FCF (מיליון ₪)",
                    "value": "-80"
                },
                {
                    "name": "שולי רווח גולמי",
                    "value": "68%"
                },
                {
                    "name": "הוצאות מו\"פ",
                    "value": "25% מהמכירות"
                },
                {
                    "name": "מזומן נטו",
                    "value": "300 מיליון ₪"
                }
            ]
        },
        "historicalData": [
            {
                "year": "year-4",
                "revenue": 150,
                "fcf": -100
            },
            {
                "year": "year-3",
                "revenue": 180,
                "fcf": -120
            },
            {
                "year": "year-2",
                "revenue": 250,
                "fcf": -90
            },
            {
                "year": "year-1",
                "revenue": 350,
                "fcf": -70
            },
            {
                "year": "year-0",
                "revenue": 450,
                "fcf": -80
            }
        ],
        "projectedData": [
            {
                "year": "year+1",
                "revenue": 600,
                "fcf": -50
            },
            {
                "year": "year+2",
                "revenue": 750,
                "fcf": 20
            }
        ],
        "correctDecision": "pass",
        "pointValue": 150,
        "hints": [
            {
                "cost": 0.5,
                "text": "חדשנות חשובה, אבל רווחיות ותזרים מזומנים חשובים יותר."
            }
        ],
        "feedback": {
            "principle": {
                "id": "owner-earnings",
                "name": "רווחי בעלים"
            },
            "decisiveSignals": [
                "FCF שלילי מתמשך",
                "אין נתיב ברור לרווחיות",
                "תלות בגיוסי הון"
            ],
            "correctExplanation": "נכון! למרות הטכנולוגיה המרשימה, החברה שורפת מזומנים ללא נתיב ברור לרווחיות.",
            "incorrectExplanation": "טעות! חברת ציוד רפואי עם FCF שלילי מתמשך וללא יתרון תחרותי ברור אינה השקעת ערך."
        },
        "isGoodValue": false,
        "difficulty": "medium",
        "difficultyValue": 2,
        "hint": "חדשנות חשובה, אבל רווחיות ותזרים מזומנים חשובים יותר.",
        "chartType": "annual"
    },
    {
        "id": "logistics-company-01",
        "name": "לוגיסטיקה ושינוע בע\"מ",
        "sector": "לוגיסטיקה",
        "symbol": "LGST",
        "price": 48.5,
        "tier": 2,
        "description": "חברת הובלה ולוגיסטיקה עם צי של 200 משאיות ו-10 מרכזי הפצה. מתמחה בשינוע למרכזי קמעונאות ו-e-commerce. השקיעה רבות באוטומציה ומערכות ניהול צי. נתח שוק של 15% בתחום ההפצה הקרה.",
        "management": "דור שני למשפחת המייסדים עם גישה מודרנית. מינו COO מקצועי מחברה בינלאומית. דגש על יעילות תפעולית ושביעות רצון לקוחות. תרבות של בטיחות וטיפול בנהגים.",
        "moat": "רשת לוגיסטית רחבה שקשה לשכפל. קשרים ארוכי טווח עם רשתות הקמעונאות הגדולות. מערכות IT מתקדמות המשפרות יעילות. מוניטין של אמינות במשך 30 שנה.",
        "events": "עליית מחירי דלק ב-15% השנה. מחסור בנהגים מקצועיים דוחף שכר למעלה. השקעה של 50 מיליון ₪ במרכז לוגיסטי חדש. חוזה גדול עם רשת e-commerce מובילה.",
        "metrics": {
            "basic": [
                {
                    "name": "P/E",
                    "value": "14"
                },
                {
                    "name": "ROE",
                    "value": "16%"
                },
                {
                    "name": "תשואת דיבידנד",
                    "value": "3.5%"
                },
                {
                    "name": "EV/EBITDA",
                    "value": "7.5"
                }
            ],
            "advanced": [
                {
                    "name": "ROIC",
                    "value": "14%"
                },
                {
                    "name": "FCF (מיליון ₪)",
                    "value": "80"
                },
                {
                    "name": "יחס הוצאות תפעול",
                    "value": "88%"
                },
                {
                    "name": "ניצולת צי",
                    "value": "82%"
                },
                {
                    "name": "ROA",
                    "value": "8%"
                }
            ]
        },
        "historicalData": [
            {
                "year": "year-4",
                "revenue": 600,
                "fcf": 50
            },
            {
                "year": "year-3",
                "revenue": 650,
                "fcf": 60
            },
            {
                "year": "year-2",
                "revenue": 750,
                "fcf": 65
            },
            {
                "year": "year-1",
                "revenue": 850,
                "fcf": 75
            },
            {
                "year": "year-0",
                "revenue": 920,
                "fcf": 80
            }
        ],
        "projectedData": [
            {
                "year": "year+1",
                "revenue": 1000,
                "fcf": 90
            },
            {
                "year": "year+2",
                "revenue": 1080,
                "fcf": 100
            }
        ],
        "correctDecision": "buy",
        "pointValue": 150,
        "hints": [
            {
                "cost": 0.5,
                "text": "חברות לוגיסטיקה עם יעילות תפעולית גבוהה יכולות להיות רווחיות מאוד."
            }
        ],
        "feedback": {
            "principle": {
                "id": "moat",
                "name": "חפיר כלכלי"
            },
            "decisiveSignals": [
                "FCF יציב ועולה",
                "ROIC של 14%",
                "רשת שקשה לשכפל"
            ],
            "correctExplanation": "מעולה! חברה עם ניהול טוב, תזרים יציב ותמחור סביר בתחום חיוני לכלכלה.",
            "incorrectExplanation": "פספוס! למרות האתגרים בענף, זו חברה מנוהלת היטב עם FCF חזק ומוניטין מצוין."
        },
        "isGoodValue": true,
        "difficulty": "medium",
        "difficultyValue": 2,
        "hint": "חברות לוגיסטיקה עם יעילות תפעולית גבוהה יכולות להיות רווחיות מאוד.",
        "chartType": "annual"
    },
    {
        "id": "realestate-developer-01",
        "name": "בנייה ופיתוח נדל\"ן",
        "sector": "נדל\"ן",
        "symbol": "BNPT",
        "price": 125,
        "tier": 2,
        "description": "חברת נדל\"ן המתמחה בפיתוח פרויקטים למגורים. בנק קרקעות של 5,000 יחידות דיור בשלבי תכנון שונים. מתמקדת באזורי ביקוש במרכז הארץ. נוהגת למכור 60% מהדירות לפני תחילת בנייה.",
        "management": "מנכ\"ל עם 30 שנות ניסיון שעבר את כל המשברים בענף. גישה שמרנית למינוף - לא עולים מעל 60% חוב להון. אך יש לחץ מבעלי מניות להגדיל פרויקטים ורווחים.",
        "moat": "בנק קרקעות איכותי במיקומים מבוקשים. מוניטין של איכות בנייה גבוהה. קשרים טובים עם בנקים למימון פרויקטים. אך תלות גבוהה במחזורי נדל\"ן ורגולציה.",
        "events": "עליית ריבית משפיעה על ביקוש לדירות. רגולציה חדשה על היטלי פיתוח. מלאי דירות למכירה גדל ב-40%. זמן מכירה ממוצע עלה מ-3 ל-6 חודשים.",
        "metrics": {
            "basic": [
                {
                    "name": "P/E",
                    "value": "9"
                },
                {
                    "name": "ROE",
                    "value": "18%"
                },
                {
                    "name": "תשואת דיבידנד",
                    "value": "5%"
                },
                {
                    "name": "P/B",
                    "value": "0.8"
                }
            ],
            "advanced": [
                {
                    "name": "ROIC",
                    "value": "15%"
                },
                {
                    "name": "FCF (מיליון ₪)",
                    "value": "-50"
                },
                {
                    "name": "יחס חוב נטו להון",
                    "value": "55%"
                },
                {
                    "name": "מלאי קרקעות",
                    "value": "8 שנות בנייה"
                },
                {
                    "name": "presales ratio",
                    "value": "45%"
                }
            ]
        },
        "historicalData": [
            {
                "year": "year-4",
                "revenue": 800,
                "fcf": 100
            },
            {
                "year": "year-3",
                "revenue": 700,
                "fcf": 50
            },
            {
                "year": "year-2",
                "revenue": 1000,
                "fcf": 150
            },
            {
                "year": "year-1",
                "revenue": 1200,
                "fcf": 100
            },
            {
                "year": "year-0",
                "revenue": 900,
                "fcf": -50
            }
        ],
        "projectedData": [
            {
                "year": "year+1",
                "revenue": 700,
                "fcf": -100
            },
            {
                "year": "year+2",
                "revenue": 600,
                "fcf": -150
            }
        ],
        "correctDecision": "pass",
        "pointValue": 150,
        "hints": [
            {
                "cost": 0.5,
                "text": "P/E נמוך בחברות נדל\"ן יכול להטעות - בדקו את המגמות בשוק."
            }
        ],
        "feedback": {
            "principle": {
                "id": "cyclical-trap",
                "name": "מלכודת מחזוריות"
            },
            "decisiveSignals": [
                "FCF הופך שלילי",
                "מלאי דירות עולה",
                "זמן מכירה מתארך"
            ],
            "counterSignalExplanation": "P/B נמוך ו-P/E נמוך נראים אטרקטיביים, אבל המגמות בשוק הנדל\"ן שליליות.",
            "correctExplanation": "נכון! שוק הנדל\"ן נכנס למיתון ו-FCF הופך שלילי. P/B נמוך לא מספיק כשהשוק יורד.",
            "incorrectExplanation": "טעות! למרות התמחור הנמוך, המגמות בענף שליליות והחברה תיאלץ להוריד מחירים."
        },
        "isGoodValue": false,
        "difficulty": "medium",
        "difficultyValue": 2,
        "hint": "P/E נמוך בחברות נדל\"ן יכול להטעות - בדקו את המגמות בשוק.",
        "chartType": "annual"
    },
    {
        "id": "biotech-profitable-01",
        "name": "ביו-פארמה ישראלית",
        "sector": "ביוטכנולוגיה",
        "symbol": "BIOF",
        "price": 310,
        "tier": 2,
        "description": "חברת ביוטק עם תרופה אחת מאושרת לטיפול בסרטן נדיר (שוק של 500 מיליון $ בשנה). בפייפליין 3 תרופות נוספות בשלבי ניסויים שונים. הוצאות מו\"פ גבוהות אך ממוקדות. שותפות אסטרטגית עם חברת פארמה גדולה.",
        "management": "מדען ראשי מהמייסדים עם פרסומים מובילים. CEO עם ניסיון בהבאת תרופות לשוק. CFO מנוסה שמנהל מזומנים בזהירות. דירקטוריון עם מומחים מהתעשייה.",
        "moat": "פטנט חזק על התרופה המאושרת עד 2032. טכנולוגיית פלטפורמה ייחודית. knowhow עמוק בתחום האונקולוגיה. ביטוח של 85% מהמכירות דרך agreements עם ביטוחי בריאות.",
        "events": "תוצאות חיוביות בניסוי פאזה 2 לתרופה שנייה. הרחבת אינדיקציה לתרופה הקיימת. תחרות פוטנציאלית מתרופה גנרית ב-2025. מו\"מ על מכירת זכויות בשווקים מתעוררים.",
        "metrics": {
            "basic": [
                {
                    "name": "P/E",
                    "value": "28"
                },
                {
                    "name": "ROE",
                    "value": "22%"
                },
                {
                    "name": "תשואת דיבידנד",
                    "value": "0%"
                },
                {
                    "name": "PEG",
                    "value": "0.9"
                }
            ],
            "advanced": [
                {
                    "name": "ROIC",
                    "value": "25%"
                },
                {
                    "name": "FCF (מיליון ₪)",
                    "value": "180"
                },
                {
                    "name": "שולי EBITDA",
                    "value": "35%"
                },
                {
                    "name": "הוצאות מו\"פ",
                    "value": "40% מהמכירות"
                },
                {
                    "name": "מזומן נטו",
                    "value": "500 מיליון ₪"
                }
            ]
        },
        "historicalData": [
            {
                "year": "year-4",
                "revenue": 100,
                "fcf": -150
            },
            {
                "year": "year-3",
                "revenue": 200,
                "fcf": -100
            },
            {
                "year": "year-2",
                "revenue": 400,
                "fcf": 50
            },
            {
                "year": "year-1",
                "revenue": 600,
                "fcf": 120
            },
            {
                "year": "year-0",
                "revenue": 800,
                "fcf": 180
            }
        ],
        "projectedData": [
            {
                "year": "year+1",
                "revenue": 1000,
                "fcf": 250
            },
            {
                "year": "year+2",
                "revenue": 1200,
                "fcf": 300
            }
        ],
        "correctDecision": "buy",
        "pointValue": 150,
        "hints": [
            {
                "cost": 0.5,
                "text": "חברות ביוטק עם תרופה מאושרת ו-FCF חיובי נדירות."
            }
        ],
        "feedback": {
            "principle": {
                "id": "moat",
                "name": "חפיר כלכלי"
            },
            "decisiveSignals": [
                "FCF חיובי וצומח",
                "ROIC של 25%",
                "PEG נמוך מ-1",
                "פטנט חזק"
            ],
            "correctExplanation": "נכון! חברת ביוטק נדירה עם רווחיות, FCF חזק ופייפליין מבטיח. PEG נמוך מ-1.",
            "incorrectExplanation": "החמצה! זו לא חברת ביוטק ספקולטיבית אלא חברה עם מוצר מניב ותזרים חזק."
        },
        "isGoodValue": true,
        "difficulty": "medium",
        "difficultyValue": 2,
        "hint": "חברות ביוטק עם תרופה מאושרת ו-FCF חיובי נדירות.",
        "chartType": "annual"
    },
    {
        "id": "cloud-services-01",
        "name": "שירותי ענן ואחסון",
        "sector": "תשתיות IT",
        "symbol": "ANAN",
        "price": 92,
        "tier": 2,
        "description": "ספקית שירותי ענן ואחסון נתונים לעסקים בינוניים וגדולים. 3 מרכזי נתונים מודרניים. מעבר מהיר ממודל on-premise ל-SaaS. לקוחות מובילים כולל בנקים וחברות ביטוח.",
        "management": "מנכ\"ל מנוסה מתעשיית הטכנולוגיה. צוות טכנולוגי חזק. תהליך מסודר למעבר לענן. השקעות בבינה מלאכותית.",
        "moat": "switching costs גבוהים - קשה להעביר נתונים. אמינות של 99.99% uptime. אישורי אבטחה מחמירים נדרשים בענף הפיננסי. אך תחרות מ-AWS ו-Azure.",
        "events": "חוזה גדול עם בנק מוביל. השקעה של 200 מיליון ₪ במרכז נתונים חדש. עליית הוצאות חשמל ב-20%. שותפות אסטרטגית עם Microsoft.",
        "metrics": {
            "basic": [
                {
                    "name": "P/E",
                    "value": "22"
                },
                {
                    "name": "ROE",
                    "value": "18%"
                },
                {
                    "name": "תשואת דיבידנד",
                    "value": "1.5%"
                },
                {
                    "name": "EV/EBITDA",
                    "value": "12"
                }
            ],
            "advanced": [
                {
                    "name": "ROIC",
                    "value": "15%"
                },
                {
                    "name": "FCF (מיליון ₪)",
                    "value": "120"
                },
                {
                    "name": "Net Revenue Retention",
                    "value": "115%"
                },
                {
                    "name": "Recurring Revenue",
                    "value": "85%"
                },
                {
                    "name": "Customer Churn",
                    "value": "3%"
                }
            ]
        },
        "historicalData": [
            {
                "year": "year-4",
                "revenue": 300,
                "fcf": 40
            },
            {
                "year": "year-3",
                "revenue": 380,
                "fcf": 60
            },
            {
                "year": "year-2",
                "revenue": 480,
                "fcf": 80
            },
            {
                "year": "year-1",
                "revenue": 600,
                "fcf": 100
            },
            {
                "year": "year-0",
                "revenue": 750,
                "fcf": 120
            }
        ],
        "projectedData": [
            {
                "year": "year+1",
                "revenue": 900,
                "fcf": 150
            },
            {
                "year": "year+2",
                "revenue": 1080,
                "fcf": 180
            }
        ],
        "correctDecision": "buy",
        "pointValue": 150,
        "hints": [
            {
                "cost": 0.5,
                "text": "בדקו את מדדי ה-SaaS — מה הם מספרים על נאמנות הלקוחות?"
            }
        ],
        "feedback": {
            "principle": {
                "id": "moat",
                "name": "חפיר כלכלי"
            },
            "decisiveSignals": [
                "NRR של 115%",
                "Churn נמוך של 3%",
                "הכנסות חוזרות 85%",
                "FCF צומח"
            ],
            "correctExplanation": "מצוין! חברת SaaS עם switching costs גבוהים, לקוחות נאמנים ותזרים יציב.",
            "incorrectExplanation": "פספוס! מדדי SaaS מצוינים - NRR גבוה, churn נמוך והכנסות חוזרות."
        },
        "isGoodValue": true,
        "difficulty": "medium",
        "difficultyValue": 2,
        "hint": "בדקו את מדדי ה-SaaS — מה הם מספרים על נאמנות הלקוחות?",
        "chartType": "annual"
    },
    {
        "id": "retail-bank-01",
        "name": "בנק קהילתי בע\"מ",
        "sector": "בנקאות",
        "symbol": "BNKK",
        "price": 45,
        "tier": 2,
        "description": "בנק קמעונאי בינוני עם 80 סניפים ומיליון לקוחות. מתמקד במשכנתאות ואשראי לעסקים קטנים. דיגיטציה מואצת ב-3 שנים אחרונות. חלק מהסניפים עודפים.",
        "management": "מנכ\"ל חדש מזה שנתיים, לשעבר בבנק גדול. תוכנית התייעלות בעיצומה. דגש על שירות לקוחות ודיגיטל. צמצום 15% בכוח אדם.",
        "moat": "בסיס לקוחות נאמן בפריפריה. ידע מקומי בענף הנדל\"ן. אך תחרות מבנקים דיגיטליים וחברות אשראי חוץ-בנקאי.",
        "events": "עליית ריבית משפרת מרווח פיננסי. הפרשות לחובות מסופקים עלו ב-30%. סגירת 10 סניפים. השקה של אפליקציה חדשה עם ביקורות חיוביות.",
        "metrics": {
            "basic": [
                {
                    "name": "P/E",
                    "value": "8.5"
                },
                {
                    "name": "ROE",
                    "value": "10%"
                },
                {
                    "name": "תשואת דיבידנד",
                    "value": "5.5%"
                },
                {
                    "name": "P/B",
                    "value": "0.7"
                }
            ],
            "advanced": [
                {
                    "name": "NIM (מרווח ריבית)",
                    "value": "2.8%"
                },
                {
                    "name": "יחס הון רובד 1",
                    "value": "12.5%"
                },
                {
                    "name": "יחס יעילות",
                    "value": "62%"
                },
                {
                    "name": "הפרשות/אשראי",
                    "value": "1.2%"
                },
                {
                    "name": "ROA",
                    "value": "0.9%"
                }
            ]
        },
        "historicalData": [
            {
                "year": "year-4",
                "revenue": 800,
                "fcf": 150
            },
            {
                "year": "year-3",
                "revenue": 750,
                "fcf": 100
            },
            {
                "year": "year-2",
                "revenue": 820,
                "fcf": 130
            },
            {
                "year": "year-1",
                "revenue": 900,
                "fcf": 160
            },
            {
                "year": "year-0",
                "revenue": 950,
                "fcf": 180
            }
        ],
        "projectedData": [
            {
                "year": "year+1",
                "revenue": 1000,
                "fcf": 200
            },
            {
                "year": "year+2",
                "revenue": 1050,
                "fcf": 210
            }
        ],
        "correctDecision": "buy",
        "pointValue": 150,
        "hints": [
            {
                "cost": 0.5,
                "text": "השוו את מחיר המניה לנכסים שעומדים מאחוריה — ובדקו את בריאות הבנק."
            }
        ],
        "feedback": {
            "principle": {
                "id": "margin-of-safety",
                "name": "מרווח ביטחון"
            },
            "decisiveSignals": [
                "P/B של 0.7",
                "יחס הון חזק",
                "מרווח ריבית משתפר",
                "דיבידנד בר-קיימא"
            ],
            "correctExplanation": "נכון! בנק בריא הנסחר ב-70% מהערך הפנקסני עם דיבידנד גבוה.",
            "incorrectExplanation": "פספוס! בנק עם יסודות טובים ותמחור זול - הזדמנות ערך."
        },
        "isGoodValue": true,
        "difficulty": "medium",
        "difficultyValue": 2,
        "hint": "השוו את מחיר המניה לנכסים שעומדים מאחוריה — ובדקו את בריאות הבנק.",
        "chartType": "annual"
    },
    {
        "id": "cybersecurity-01",
        "name": "סייבר-מגן טכנולוגיות",
        "sector": "טכנולוגיה",
        "symbol": "CBMG",
        "price": 145,
        "tier": 2,
        "description": "חברת סייבר ישראלית המספקת פתרונות אבטחת מידע לארגונים בינלאומיים. 200 לקוחות בארה\"ב ואירופה.",
        "management": "הוקמה ע\"י בוגרי 8200. מנכ\"ל עם 15 שנות ניסיון בתחום. צמיחה עקבית.",
        "moat": "טכנולוגיה מוגנת בפטנטים, עלויות מעבר גבוהות, חוזי SLA רב-שנתיים.",
        "events": "חידוש 95% מהחוזים, כניסה לשוק האסייתי, הוספת מוצר AI לזיהוי איומים.",
        "metrics": {
            "basic": [
                {
                    "name": "P/E",
                    "value": "22"
                },
                {
                    "name": "ROE",
                    "value": "25%"
                },
                {
                    "name": "צמיחת הכנסות",
                    "value": "18%"
                }
            ],
            "advanced": [
                {
                    "name": "ROIC",
                    "value": "21%"
                },
                {
                    "name": "FCF (מיליון ₪)",
                    "value": "85"
                },
                {
                    "name": "שיעור חידוש",
                    "value": "95%"
                }
            ]
        },
        "historicalData": [
            {
                "year": "year-4",
                "revenue": 280,
                "fcf": 35
            },
            {
                "year": "year-3",
                "revenue": 330,
                "fcf": 45
            },
            {
                "year": "year-2",
                "revenue": 400,
                "fcf": 58
            },
            {
                "year": "year-1",
                "revenue": 470,
                "fcf": 70
            },
            {
                "year": "year-0",
                "revenue": 550,
                "fcf": 85
            }
        ],
        "projectedData": [
            {
                "year": "year+1",
                "revenue": 640,
                "fcf": 100
            },
            {
                "year": "year+2",
                "revenue": 740,
                "fcf": 118
            }
        ],
        "correctDecision": "buy",
        "pointValue": 150,
        "hints": [
            {
                "cost": 0.5,
                "text": "שימו לב לשיעור חידוש החוזים — מה זה אומר על איכות המוצר?"
            }
        ],
        "feedback": {
            "principle": {
                "id": "moat",
                "name": "חפיר כלכלי"
            },
            "decisiveSignals": [
                "95% חידוש חוזים",
                "צמיחה עקבית 18%",
                "ROIC מעל 20%"
            ],
            "correctExplanation": "מצוין! חברת סייבר עם חפיר טכנולוגי, לקוחות דביקים וצמיחה רווחית.",
            "incorrectExplanation": "פספוס! P/E של 22 עם צמיחה של 18% ו-95% חידוש — PEG מצוין."
        },
        "isGoodValue": true,
        "difficulty": "medium",
        "difficultyValue": 2,
        "hint": "שימו לב לשיעור חידוש החוזים — מה זה אומר על איכות המוצר?",
        "chartType": "annual"
    },
    {
        "id": "newspaper-media-01",
        "name": "ידיעות תקשורת בע\"מ",
        "sector": "תקשורת",
        "symbol": "YDIA",
        "price": 15.5,
        "tier": 2,
        "description": "חברת מדיה ותיקה — עיתון מודפס ואתר חדשות. ירידה מתמדת בפרסום מודפס.",
        "management": "המשפחה המייסדת עדיין שולטת. חילוקי דעות פנימיים על כיוון אסטרטגי.",
        "moat": "מותג מוכר, אבל נשחק — הקוראים עוברים לרשתות חברתיות. אין עלויות מעבר.",
        "events": "ירידה של 15% בהכנסות פרסום. ניסיון מנוי דיגיטלי עם תוצאות חלשות.",
        "metrics": {
            "basic": [
                {
                    "name": "P/E",
                    "value": "6.5"
                },
                {
                    "name": "ROE",
                    "value": "8%"
                },
                {
                    "name": "תשואת דיבידנד",
                    "value": "7.2%"
                }
            ],
            "advanced": [
                {
                    "name": "ROIC",
                    "value": "6%"
                },
                {
                    "name": "FCF (מיליון ₪)",
                    "value": "45"
                },
                {
                    "name": "מגמת הכנסות",
                    "value": "יורדת 15% שנתי"
                }
            ]
        },
        "historicalData": [
            {
                "year": "year-4",
                "revenue": 520,
                "fcf": 80
            },
            {
                "year": "year-3",
                "revenue": 440,
                "fcf": 65
            },
            {
                "year": "year-2",
                "revenue": 380,
                "fcf": 55
            },
            {
                "year": "year-1",
                "revenue": 330,
                "fcf": 50
            },
            {
                "year": "year-0",
                "revenue": 280,
                "fcf": 45
            }
        ],
        "projectedData": [
            {
                "year": "year+1",
                "revenue": 240,
                "fcf": 35
            },
            {
                "year": "year+2",
                "revenue": 200,
                "fcf": 25
            }
        ],
        "correctDecision": "pass",
        "pointValue": 150,
        "hints": [
            {
                "cost": 0.5,
                "text": "האם P/E נמוך תמיד אומר שהמניה זולה? בדקו את מגמת ההכנסות."
            }
        ],
        "feedback": {
            "principle": {
                "id": "value-trap",
                "name": "מלכודת ערך"
            },
            "decisiveSignals": [
                "הכנסות יורדות 15% בשנה",
                "ענף בדעיכה",
                "אין חפיר דיגיטלי"
            ],
            "correctExplanation": "נכון! P/E נמוך לא אומר זול — ההכנסות בירידה מתמדת. זו מלכודת ערך קלאסית.",
            "incorrectExplanation": "טעות! תשואת דיבידנד של 7% מפתה, אבל הדיבידנד ייחתך כשההכנסות ימשיכו לרדת."
        },
        "isGoodValue": false,
        "difficulty": "medium",
        "difficultyValue": 2,
        "hint": "האם P/E נמוך תמיד אומר שהמניה זולה? בדקו את מגמת ההכנסות.",
        "chartType": "annual"
    },
    {
        "id": "elevator-maintenance-01",
        "name": "עלית שירותים בע\"מ",
        "sector": "שירותים",
        "symbol": "ALSH",
        "price": 88,
        "tier": 2,
        "description": "חברת תחזוקת מעליות הגדולה בישראל. מתחזקת 12,000 מעליות בחוזים שנתיים.",
        "management": "הנהלה מקצועית, מנכ\"ל 18 שנה. רכישות ממוקדות של מתחזקים קטנים.",
        "moat": "עלויות מעבר גבוהות — החלפת חברת תחזוקה יקרה ומסובכת. 85% שימור לקוחות.",
        "events": "רכישת מתחרה קטן, הוספת שירות מעליות חכמות IoT, גידול ברווחיות.",
        "metrics": {
            "basic": [
                {
                    "name": "P/E",
                    "value": "16"
                },
                {
                    "name": "ROE",
                    "value": "20%"
                },
                {
                    "name": "צמיחת הכנסות",
                    "value": "12%"
                }
            ],
            "advanced": [
                {
                    "name": "ROIC",
                    "value": "18%"
                },
                {
                    "name": "FCF (מיליון ₪)",
                    "value": "72"
                },
                {
                    "name": "שימור לקוחות",
                    "value": "85%"
                }
            ]
        },
        "historicalData": [
            {
                "year": "year-4",
                "revenue": 380,
                "fcf": 42
            },
            {
                "year": "year-3",
                "revenue": 400,
                "fcf": 48
            },
            {
                "year": "year-2",
                "revenue": 440,
                "fcf": 55
            },
            {
                "year": "year-1",
                "revenue": 490,
                "fcf": 63
            },
            {
                "year": "year-0",
                "revenue": 550,
                "fcf": 72
            }
        ],
        "projectedData": [
            {
                "year": "year+1",
                "revenue": 610,
                "fcf": 82
            },
            {
                "year": "year+2",
                "revenue": 680,
                "fcf": 92
            }
        ],
        "correctDecision": "buy",
        "pointValue": 150,
        "hints": [
            {
                "cost": 0.5,
                "text": "חשבו על עלויות המעבר — כמה קשה להחליף ספק תחזוקת מעליות?"
            }
        ],
        "feedback": {
            "principle": {
                "id": "moat",
                "name": "חפיר כלכלי"
            },
            "decisiveSignals": [
                "עלויות מעבר גבוהות",
                "85% שימור",
                "צמיחה אורגנית + רכישות"
            ],
            "correctExplanation": "מצוין! עסק עם לקוחות 'דביקים', צמיחה עקבית ורווחיות גבוהה.",
            "incorrectExplanation": "פספוס! עסקי תחזוקה עם שימור 85% הם חפיר קלאסי — ההכנסות חוזרות."
        },
        "isGoodValue": true,
        "difficulty": "medium",
        "difficultyValue": 2,
        "hint": "חשבו על עלויות המעבר — כמה קשה להחליף ספק תחזוקת מעליות?",
        "chartType": "annual"
    },
    {
        "id": "solar-installer-01",
        "name": "שמש-טק אנרגיה",
        "sector": "אנרגיה מתחדשת",
        "symbol": "SHMT",
        "price": 210,
        "tier": 2,
        "description": "חברת התקנת פאנלים סולאריים על גגות בתים פרטיים ומסחריים. צמיחה מהירה.",
        "management": "מנכ\"ל מהנדס עם חזון, אבל החברה גדלה מהר מדי — בעיות בביצוע.",
        "moat": "אין חפיר אמיתי — מאות מתקינים בשוק. תלות בסובסידיות ממשלתיות.",
        "events": "הממשלה הודיעה על קיצוץ בתעריף הסולארי ב-20%. עלייה בתלונות לקוחות.",
        "metrics": {
            "basic": [
                {
                    "name": "P/E",
                    "value": "35"
                },
                {
                    "name": "ROE",
                    "value": "12%"
                },
                {
                    "name": "צמיחת הכנסות",
                    "value": "40%"
                }
            ],
            "advanced": [
                {
                    "name": "ROIC",
                    "value": "8%"
                },
                {
                    "name": "FCF (מיליון ₪)",
                    "value": "-15"
                },
                {
                    "name": "תלות בסובסידיה",
                    "value": "כן"
                }
            ]
        },
        "historicalData": [
            {
                "year": "year-4",
                "revenue": 50,
                "fcf": 5
            },
            {
                "year": "year-3",
                "revenue": 90,
                "fcf": 8
            },
            {
                "year": "year-2",
                "revenue": 160,
                "fcf": 12
            },
            {
                "year": "year-1",
                "revenue": 280,
                "fcf": 5
            },
            {
                "year": "year-0",
                "revenue": 350,
                "fcf": -15
            }
        ],
        "projectedData": [
            {
                "year": "year+1",
                "revenue": 300,
                "fcf": -30
            },
            {
                "year": "year+2",
                "revenue": 250,
                "fcf": -25
            }
        ],
        "correctDecision": "pass",
        "pointValue": 150,
        "hints": [
            {
                "cost": 0.5,
                "text": "מה קורה כשהצמיחה מהירה אבל ה-FCF הופך שלילי?"
            }
        ],
        "feedback": {
            "principle": {
                "id": "growth-trap",
                "name": "מלכודת צמיחה"
            },
            "decisiveSignals": [
                "FCF הפך שלילי",
                "תלות בסובסידיות",
                "אין חפיר תחרותי"
            ],
            "correctExplanation": "נכון! צמיחה מהירה שאוכלת מזומנים עם תלות בסובסידיות — לא עסק בר-קיימא.",
            "incorrectExplanation": "טעות! צמיחה של 40% מרשימה, אבל ה-FCF שלילי והסובסידיות נחתכות."
        },
        "isGoodValue": false,
        "difficulty": "medium",
        "difficultyValue": 2,
        "hint": "מה קורה כשהצמיחה מהירה אבל ה-FCF הופך שלילי?",
        "chartType": "annual"
    },
    {
        "id": "pest-control-01",
        "name": "הדברה פלוס בע\"מ",
        "sector": "שירותים",
        "symbol": "HDBR",
        "price": 56,
        "tier": 2,
        "description": "חברת הדברה מובילה בישראל עם 40 שנות פעילות. חוזי שירות שנתיים עם 3,000 לקוחות עסקיים.",
        "management": "דור שני. מנכ\"ל עם 20 שנות ניסיון. מדיניות רכישת מתחרים קטנים.",
        "moat": "רגולציה מחייבת הדברה בעסקי מזון, רישיון מקצועי, חוזים חוזרים, שם מותג.",
        "events": "רכישת 3 חברות קטנות, כניסה לתחום הדברה ירוקה, גידול של 15% בבסיס הלקוחות.",
        "metrics": {
            "basic": [
                {
                    "name": "P/E",
                    "value": "13"
                },
                {
                    "name": "ROE",
                    "value": "19%"
                },
                {
                    "name": "צמיחת הכנסות",
                    "value": "14%"
                }
            ],
            "advanced": [
                {
                    "name": "ROIC",
                    "value": "22%"
                },
                {
                    "name": "FCF (מיליון ₪)",
                    "value": "38"
                },
                {
                    "name": "שימור לקוחות",
                    "value": "92%"
                }
            ]
        },
        "historicalData": [
            {
                "year": "year-4",
                "revenue": 140,
                "fcf": 20
            },
            {
                "year": "year-3",
                "revenue": 155,
                "fcf": 23
            },
            {
                "year": "year-2",
                "revenue": 175,
                "fcf": 27
            },
            {
                "year": "year-1",
                "revenue": 200,
                "fcf": 32
            },
            {
                "year": "year-0",
                "revenue": 230,
                "fcf": 38
            }
        ],
        "projectedData": [
            {
                "year": "year+1",
                "revenue": 265,
                "fcf": 44
            },
            {
                "year": "year+2",
                "revenue": 300,
                "fcf": 52
            }
        ],
        "correctDecision": "buy",
        "pointValue": 150,
        "hints": [
            {
                "cost": 0.5,
                "text": "בדקו את היחס בין ההון המושקע לבין התשואה שהוא מייצר — מה המספר הזה אומר?"
            }
        ],
        "feedback": {
            "principle": {
                "id": "owner-earnings",
                "name": "רווחי בעלים"
            },
            "decisiveSignals": [
                "ROIC 22%",
                "92% שימור",
                "הכנסות חוזרות מחוזים"
            ],
            "correctExplanation": "מצוין! עסק משעמם אבל מעולה — הכנסות חוזרות, רווחיות גבוהה וצמיחה.",
            "incorrectExplanation": "פספוס! באפט אוהב עסקים 'משעממים' עם ROIC גבוה ולקוחות חוזרים."
        },
        "isGoodValue": true,
        "difficulty": "medium",
        "difficultyValue": 2,
        "hint": "בדקו את היחס בין ההון המושקע לבין התשואה שהוא מייצר — מה המספר הזה אומר?",
        "chartType": "annual"
    },
    {
        "id": "airline-domestic-01",
        "name": "ארקיע תעופה בע\"מ",
        "sector": "תעופה",
        "symbol": "ARKI",
        "price": 28,
        "tier": 2,
        "description": "חברת תעופה פנים-ארצית ובינלאומית. רווחיות נמוכה ותחרות עזה.",
        "management": "תחלופת מנכ\"לים — 3 מנכ\"לים ב-5 שנים. ועד עובדים חזק ובעייתי.",
        "moat": "אין חפיר. תחרות עזה מול low-cost. מחירי דלק תנודתיים. רגולציה כבדה.",
        "events": "רבעון מפסיד, עיכוב בקבלת מטוסים חדשים, שביתת דיילים.",
        "metrics": {
            "basic": [
                {
                    "name": "P/E",
                    "value": "7.5"
                },
                {
                    "name": "ROE",
                    "value": "4%"
                },
                {
                    "name": "תשואת דיבידנד",
                    "value": "0%"
                }
            ],
            "advanced": [
                {
                    "name": "ROIC",
                    "value": "3%"
                },
                {
                    "name": "FCF (מיליון ₪)",
                    "value": "20"
                },
                {
                    "name": "חוב/הון",
                    "value": "2.8"
                }
            ]
        },
        "historicalData": [
            {
                "year": "year-4",
                "revenue": 1800,
                "fcf": 50
            },
            {
                "year": "year-3",
                "revenue": 400,
                "fcf": -300
            },
            {
                "year": "year-2",
                "revenue": 900,
                "fcf": -80
            },
            {
                "year": "year-1",
                "revenue": 1500,
                "fcf": 30
            },
            {
                "year": "year-0",
                "revenue": 1700,
                "fcf": 20
            }
        ],
        "projectedData": [
            {
                "year": "year+1",
                "revenue": 1750,
                "fcf": 25
            },
            {
                "year": "year+2",
                "revenue": 1800,
                "fcf": 30
            }
        ],
        "correctDecision": "pass",
        "pointValue": 150,
        "hints": [
            {
                "cost": 0.5,
                "text": "באפט אמר פעם שתעשיית התעופה היא 'מלכודת הרס הון'. למה?"
            }
        ],
        "feedback": {
            "principle": {
                "id": "too-hard",
                "name": "קשה מדי"
            },
            "decisiveSignals": [
                "חוב/הון 2.8",
                "ROIC 3% בלבד",
                "תחלופת הנהלה",
                "תעשייה ללא חפיר"
            ],
            "correctExplanation": "נכון! באפט שונא תעופה — חוב גבוה, תחרות עזה, ROIC עלוב.",
            "incorrectExplanation": "טעות! P/E של 7.5 מטעה — תחרות הרסנית, חוב כבד, ואין חפיר."
        },
        "isGoodValue": false,
        "difficulty": "medium",
        "difficultyValue": 2,
        "hint": "באפט אמר פעם שתעשיית התעופה היא 'מלכודת הרס הון'. למה?",
        "chartType": "annual"
    },
    {
        "id": "parking-lots-01",
        "name": "חניון עיר בע\"מ",
        "sector": "נדל\"ן",
        "symbol": "HNYN",
        "price": 52,
        "tier": 2,
        "description": "מפעילת 25 חניונים במרכזי ערים גדולות. חוזי זיכיון ל-20-30 שנה.",
        "management": "הנהלה רזה ויעילה. 8 עובדי מטה בלבד. מנכ\"ל 15 שנה בתפקיד.",
        "moat": "זיכיונות בלעדיים לעשרות שנים, מיקומים שלא ניתן לשכפל, ביקוש קבוע.",
        "events": "חידוש 3 זיכיונות, העלאת מחירים 8%, הכנסה שנתית צפויה ויציבה.",
        "metrics": {
            "basic": [
                {
                    "name": "P/E",
                    "value": "12"
                },
                {
                    "name": "ROE",
                    "value": "17%"
                },
                {
                    "name": "תשואת דיבידנד",
                    "value": "5.8%"
                }
            ],
            "advanced": [
                {
                    "name": "ROIC",
                    "value": "15%"
                },
                {
                    "name": "FCF (מיליון ₪)",
                    "value": "65"
                },
                {
                    "name": "תפוסה ממוצעת",
                    "value": "88%"
                }
            ]
        },
        "historicalData": [
            {
                "year": "year-4",
                "revenue": 220,
                "fcf": 48
            },
            {
                "year": "year-3",
                "revenue": 160,
                "fcf": 30
            },
            {
                "year": "year-2",
                "revenue": 210,
                "fcf": 45
            },
            {
                "year": "year-1",
                "revenue": 250,
                "fcf": 58
            },
            {
                "year": "year-0",
                "revenue": 280,
                "fcf": 65
            }
        ],
        "projectedData": [
            {
                "year": "year+1",
                "revenue": 300,
                "fcf": 72
            },
            {
                "year": "year+2",
                "revenue": 320,
                "fcf": 78
            }
        ],
        "correctDecision": "buy",
        "pointValue": 150,
        "hints": [
            {
                "cost": 0.5,
                "text": "כמה זמן נותרו לזיכיונות? מה ערך הנכסים שלא ניתנים לשכפול?"
            }
        ],
        "feedback": {
            "principle": {
                "id": "moat",
                "name": "חפיר כלכלי"
            },
            "decisiveSignals": [
                "זיכיונות ל-20-30 שנה",
                "מיקומים ייחודיים",
                "דיבידנד 5.8%"
            ],
            "correctExplanation": "מצוין! זיכיונות ארוכי טווח במיקומים שלא ניתן לשכפל — חפיר קלאסי.",
            "incorrectExplanation": "החמצה! חניונים במרכזי ערים עם זיכיון — עסק שבאפט היה אוהב."
        },
        "isGoodValue": true,
        "difficulty": "medium",
        "difficultyValue": 2,
        "hint": "כמה זמן נותרו לזיכיונות? מה ערך הנכסים שלא ניתנים לשכפול?",
        "chartType": "annual"
    },
    {
        "id": "printing-company-01",
        "name": "דפוס אומן בע\"מ",
        "sector": "תעשייה",
        "symbol": "DFOM",
        "price": 18,
        "tier": 2,
        "description": "בית דפוס מסחרי שמייצר חומרי שיווק, קטלוגים ואריזות. שוק הדפוס מתכווץ.",
        "management": "המייסד בן 70, אין תוכנית ירושה ברורה. חוסר השקעה בטכנולוגיה דיגיטלית.",
        "moat": "אין — עשרות בתי דפוס מתחרים. הלקוחות עוברים לדיגיטל.",
        "events": "איבוד 3 לקוחות גדולים. ניסיון לעבור לאריזות — השקעה כבדה עם תוצאות לא ברורות.",
        "metrics": {
            "basic": [
                {
                    "name": "P/E",
                    "value": "5"
                },
                {
                    "name": "ROE",
                    "value": "6%"
                },
                {
                    "name": "תשואת דיבידנד",
                    "value": "8%"
                }
            ],
            "advanced": [
                {
                    "name": "ROIC",
                    "value": "5%"
                },
                {
                    "name": "FCF (מיליון ₪)",
                    "value": "12"
                },
                {
                    "name": "ירידה בהכנסות",
                    "value": "10% שנתי"
                }
            ]
        },
        "historicalData": [
            {
                "year": "year-4",
                "revenue": 180,
                "fcf": 22
            },
            {
                "year": "year-3",
                "revenue": 155,
                "fcf": 18
            },
            {
                "year": "year-2",
                "revenue": 140,
                "fcf": 16
            },
            {
                "year": "year-1",
                "revenue": 125,
                "fcf": 14
            },
            {
                "year": "year-0",
                "revenue": 110,
                "fcf": 12
            }
        ],
        "projectedData": [
            {
                "year": "year+1",
                "revenue": 98,
                "fcf": 8
            },
            {
                "year": "year+2",
                "revenue": 85,
                "fcf": 5
            }
        ],
        "correctDecision": "pass",
        "pointValue": 150,
        "hints": [
            {
                "cost": 0.5,
                "text": "P/E של 5 ודיבידנד 8% נראים מפתים — אבל מה הם מסתירים?"
            }
        ],
        "feedback": {
            "principle": {
                "id": "value-trap",
                "name": "מלכודת ערך"
            },
            "decisiveSignals": [
                "הכנסות יורדות 10% בשנה",
                "ענף מתכווץ",
                "אין תוכנית ירושה"
            ],
            "correctExplanation": "נכון! דיבידנד 8% לא בר-קיימא כשההכנסות יורדות — מלכודת ערך קלאסית.",
            "incorrectExplanation": "טעות! P/E נמוך ודיבידנד גבוה מפתים, אבל העסק גוסס — הדיבידנד ייחתך.",
            "counterSignalExplanation": "הצד השני יטען: P/E 5 ודיבידנד 8% — תשואה מצוינת גם אם העסק מתכווץ לאט. המעבר לאריזות עשוי לשנות את המגמה. ולמייסד בן 70 אולי יש תוכנית ירושה שלא פורסמה."
        },
        "isGoodValue": false,
        "difficulty": "medium",
        "difficultyValue": 2,
        "hint": "P/E של 5 ודיבידנד 8% נראים מפתים — אבל מה הם מסתירים?",
        "chartType": "annual",
        "workedExample": "1) P/E 5, דיבידנד 8% — מפתה. 2) אבל: הכנסות יורדות 10% בשנה = הכפלת ירידה כל 7 שנים. 3) ענף מתכווץ + אין חפיר = לא יכול להיעצר. 4) מנהיגות: מייסד בן 70 בלי ירושה = סיכון המשכיות. 5) הדיבידנד: בעוד 3 שנים, FCF ירד ל-₪5M = דיבידנד ייחתך. 6) מסקנה: מלכודת ערך קלאסית."
    },
    {
        "id": "cyclical-trough-m01",
        "name": "אשדוד כימיקלים בע\"מ",
        "sector": "כימיה מחזורית",
        "symbol": "ASHK",
        "price": 38,
        "tier": 2,
        "chartType": "annual",
        "description": "יצרנית כימיקלים תעשייתיים שנמצאת בתחתית מחזור. הרווחים ירדו 60% בשנתיים, P/E זינק ל-22. אבל החברה ללא חוב, ובעלת שליטה קנו מניות בחודשיים האחרונים.",
        "management": "בעל שליטה מנוסה שעבר 3 מחזורים. קנה מניות ב-₪5M בחודשיים האחרונים.",
        "moat": "מפעל מודרני עם עלויות ייצור נמוכות מהממוצע בענף. מיקום אסטרטגי ליד נמל.",
        "events": "סגירת מפעל מתחרה בצפון. מחירי חומרי גלם החלו להתייצב אחרי ירידה חדה.",
        "metrics": {
            "basic": [
                {
                    "name": "P/E",
                    "value": "22 (על רווחי שפל)"
                },
                {
                    "name": "ROE",
                    "value": "5%"
                },
                {
                    "name": "תשואת דיבידנד",
                    "value": "1.5%"
                }
            ],
            "advanced": [
                {
                    "name": "P/E מנורמל (ממוצע מחזורי)",
                    "value": "8"
                },
                {
                    "name": "FCF (מיליון ₪)",
                    "value": "12"
                },
                {
                    "name": "חוב/הון",
                    "value": "0.0"
                }
            ]
        },
        "historicalData": [
            {
                "year": "year-4",
                "revenue": 420,
                "fcf": 65
            },
            {
                "year": "year-3",
                "revenue": 380,
                "fcf": 45
            },
            {
                "year": "year-2",
                "revenue": 310,
                "fcf": 20
            },
            {
                "year": "year-1",
                "revenue": 265,
                "fcf": 10
            },
            {
                "year": "year-0",
                "revenue": 250,
                "fcf": 12
            }
        ],
        "projectedData": [
            {
                "year": "year+1",
                "revenue": 280,
                "fcf": 25
            },
            {
                "year": "year+2",
                "revenue": 340,
                "fcf": 45
            }
        ],
        "correctDecision": "buy",
        "pointValue": 150,
        "hints": [
            {
                "cost": 0.5,
                "text": "בחברה מחזורית — P/E גבוה בשפל = זול. P/E נמוך בשיא = יקר. הפוך ממה שאתם רגילים!"
            }
        ],
        "feedback": {
            "principle": {
                "id": "cyclical-trap",
                "name": "מלכודת מחזוריות"
            },
            "decisiveSignals": [
                "P/E מנורמל 8 (מחזורי)",
                "אפס חוב = תשרוד כל מחזור",
                "בעלים קונים מניות"
            ],
            "correctExplanation": "מצוין! בחברה מחזורית, קנייה בשפל (P/E גבוה, רווחים נמוכים) היא הצעד הנכון. כשהמחזור יחזור — ורווחי השפל מעידים שזו שאלה של מתי, לא אם — הרווחים יקפצו והמניה תטוס.",
            "incorrectExplanation": "טעות! P/E 22 הפחיד אותך, אבל בחברה מחזורית P/E גבוה = שפל = זמן לקנות. ה-P/E המנורמל (ממוצע על פני מחזור שלם) הוא 8 = זול מאוד.",
            "counterSignalExplanation": "הצד השני יטען: ההכנסות ירדו 40% בשנתיים, P/E 22 יקר, FCF רק ₪12M — חלש. אולי המחזור עוד לא הגיע לתחתית, ומחירי חומרי גלם עלולים לרדת עוד."
        },
        "workedExample": "1) זיהוי: כימיקלים = תעשייה מחזורית. 2) מיקום במחזור: הכנסות ירדו 40% מהשיא — קרוב לתחתית. 3) P/E: 22 על רווחי שפל, אבל מנורמל = 8 = זול. 4) חוסן: אפס חוב = תשרוד את השפל. 5) סימנים: בעלים קונים + מתחרה סגר = סביבה משתפרת. 6) מסקנה: קנייה בתחתית מחזור — הפוך מהאינסטינקט.",
        "isGoodValue": true,
        "difficulty": "medium",
        "difficultyValue": 2,
        "hint": "בחברה מחזורית — P/E גבוה בשפל = זול. P/E נמוך בשיא = יקר."
    },
    {
        "id": "cyclical-false-m01",
        "name": "ים תיכון ספנות בע\"מ",
        "sector": "ספנות",
        "symbol": "YMTS",
        "price": 65,
        "tier": 2,
        "chartType": "quarterly",
        "description": "חברת ספנות שנראית כאילו היא בשפל, אבל למעשה הענף עובר שינוי מבני — לא מחזורי. הקיבולת העולמית עלתה 35% בשלוש שנים וצפויה להמשיך.",
        "management": "הנהלה מנוסה אבל נשארת תקועה באסטרטגיה ישנה. לא מסתגלת לשינויי שוק.",
        "moat": "צי אוניות ותיק, אבל הרבה ממנו לא עומד בתקנות סביבה חדשות ודורש השקעה כבדה.",
        "events": "3 אוניות חדשות של מתחרים נכנסו לקו הפעילות. רגולציה סביבתית חדשה מחייבת שדרוג יקר.",
        "metrics": {
            "basic": [
                {
                    "name": "P/E",
                    "value": "18 (על רווחי שפל לכאורה)"
                },
                {
                    "name": "ROE",
                    "value": "4%"
                },
                {
                    "name": "תשואת דיבידנד",
                    "value": "2%"
                }
            ],
            "advanced": [
                {
                    "name": "P/NAV",
                    "value": "0.7"
                },
                {
                    "name": "FCF (מיליון ₪)",
                    "value": "15"
                },
                {
                    "name": "CAPEX נדרש (רגולציה)",
                    "value": "₪120M ב-3 שנים"
                }
            ]
        },
        "quarterlyData": [
            {
                "quarter": "Q1 year-1",
                "revenue": 95,
                "fcf": 8
            },
            {
                "quarter": "Q2 year-1",
                "revenue": 88,
                "fcf": 5
            },
            {
                "quarter": "Q3 year-1",
                "revenue": 82,
                "fcf": 3
            },
            {
                "quarter": "Q4 year-1",
                "revenue": 78,
                "fcf": 2
            },
            {
                "quarter": "Q1 year-0",
                "revenue": 75,
                "fcf": 4
            },
            {
                "quarter": "Q2 year-0",
                "revenue": 72,
                "fcf": 1
            }
        ],
        "projectedData": [
            {
                "year": "year+1",
                "revenue": 270,
                "fcf": -10
            },
            {
                "year": "year+2",
                "revenue": 250,
                "fcf": -25
            }
        ],
        "correctDecision": "pass",
        "pointValue": 150,
        "hints": [
            {
                "cost": 0.5,
                "text": "האם זה שפל מחזורי שיחזור, או שינוי מבני שלא?"
            }
        ],
        "feedback": {
            "principle": {
                "id": "cyclical-trap",
                "name": "מלכודת מחזוריות"
            },
            "decisiveSignals": [
                "שינוי מבני (לא מחזורי)",
                "עודף קיבולת מבני +35%",
                "CAPEX רגולטורי ₪120M"
            ],
            "correctExplanation": "נכון! לא כל ירידה בענף מחזורי היא שפל. כאן יש שינוי מבני — קיבולת חדשה ורגולציה. הענף לא 'יחזור' לרמות הישנות. P/NAV 0.7 נראה זול אבל ה-NAV עצמו יורד.",
            "incorrectExplanation": "טעות! P/NAV 0.7 נראה כמו הזדמנות 'קנייה בשפל', אבל הפעם השפל הוא קבוע. עודף קיבולת + רגולציה = שינוי מבני.",
            "counterSignalExplanation": "הצד השני יטען: P/NAV 0.7 = קונים נכסים ב-70% מערכם. ספנות מחזורית תמיד, וכשקיבולת תצא מהשוק, התעריפים יעלו. ההנהלה ותיקה ושרדה מחזורים קודמים."
        },
        "workedExample": "1) זיהוי: ספנות = מחזורית. אבל האם זה שפל רגיל? 2) בדיקה: קיבולת עלתה 35% = עודף מבני, לא זמני. 3) רגולציה: CAPEX ₪120M נדרש = ההוצאות יעלו דרמטית. 4) תחרות: 3 אוניות חדשות בקו = לחץ מחירים מבני. 5) P/NAV 0.7: ה-NAV עצמו נשחק (אוניות ישנות שלא עומדות בתקנות). 6) מסקנה: זה לא שפל מחזורי — זה שינוי מבני. העל.",
        "isGoodValue": false,
        "difficulty": "medium",
        "difficultyValue": 2,
        "hint": "האם זה שפל מחזורי שיחזור, או שינוי מבני שלא?"
    },
    {
        "id": "turnaround-buy-m01",
        "name": "אופטיקה שלום בע\"מ",
        "sector": "קמעונאות בריאות",
        "symbol": "OPTK",
        "price": 42,
        "tier": 2,
        "chartType": "segments",
        "description": "רשת אופטיקה שמרה שסבלה מתחרות אונליין. מנכ\"ל חדש מינה לפני 18 חודשים שינה אסטרטגיה: סגר 30% מהסניפים, פתח חנות אונליין, ומתמקד בשירותים רפואיים במקום מוצרים.",
        "management": "מנכ\"ל חדש עם ניסיון בשיקום קמעונאות (שיקם רשת אחרת בעבר). קנה 3% מהמניות.",
        "moat": "מותג מוכר, אבל נשחק. השירותים הרפואיים יוצרים lock-in שמוצרים לא יוצרים.",
        "events": "הרבעון האחרון הראה שיפור מפתיע ברווחיות. מרווח תפעולי עלה מ-2% ל-8%.",
        "metrics": {
            "basic": [
                {
                    "name": "P/E",
                    "value": "25 (על רווחי שפל)"
                },
                {
                    "name": "ROE",
                    "value": "6%"
                },
                {
                    "name": "צמיחת הכנסות",
                    "value": "-8% (אבל מכוונת)"
                }
            ],
            "advanced": [
                {
                    "name": "ROIC",
                    "value": "7%"
                },
                {
                    "name": "FCF (מיליון ₪)",
                    "value": "8"
                },
                {
                    "name": "מרווח תפעולי",
                    "value": "8% (עלה מ-2%)"
                }
            ]
        },
        "segmentData": [
            {
                "name": "שירותים רפואיים",
                "revenue": 85,
                "margin": "22%",
                "growth": "+35%"
            },
            {
                "name": "מוצרי אופטיקה (חנויות)",
                "revenue": 110,
                "margin": "5%",
                "growth": "-15%"
            },
            {
                "name": "מכירות אונליין",
                "revenue": 45,
                "margin": "12%",
                "growth": "+60%"
            }
        ],
        "projectedData": [
            {
                "year": "year+1",
                "revenue": 250,
                "fcf": 18
            },
            {
                "year": "year+2",
                "revenue": 270,
                "fcf": 28
            }
        ],
        "correctDecision": "buy",
        "pointValue": 150,
        "hints": [
            {
                "cost": 0.5,
                "text": "ההכנסות יורדות, אבל הסגמנט הרפואי צומח 35% עם מרווח 22%. מה המנכ\"ל באמת עושה?"
            }
        ],
        "feedback": {
            "principle": {
                "id": "turnaround",
                "name": "שיקום"
            },
            "decisiveSignals": [
                "סגמנט רפואי צומח 35% עם מרווח 22%",
                "מרווח תפעולי עלה מ-2% ל-8%",
                "מנכ\"ל עם רקורד + skin in the game"
            ],
            "correctExplanation": "מצוין! ירידת ההכנסות היא מכוונת — המנכ\"ל סוגר את החלקים ההפסדיים ומתמקד בסגמנט הרפואי הרווחי. זה שיקום אמיתי: ויתור על גודל לטובת רווחיות.",
            "incorrectExplanation": "טעות! ההכנסות הכוללות יורדות, אבל הנתונים המפולחים מספרים סיפור אחר: הסגמנט הרפואי צומח 35% עם מרווח 22%. המנכ\"ל מחליף הכנסות גרועות בטובות.",
            "counterSignalExplanation": "הצד השני יטען: P/E 25, הכנסות יורדות 8%, ו-FCF רק ₪8M. החנות האונליין עדיין קטנה, ולא בטוח שהשירותים הרפואיים יחליפו את ההכנסות שנסגרו."
        },
        "workedExample": "1) זיהוי: חברה בשיקום אסטרטגי. 2) ניתוח סגמנטים: רפואי +35%, מרווח 22% — זה הנכס. אונליין +60% — משלים. חנויות -15% — נסגרות בכוונה. 3) מרווח תפעולי: 2% → 8% = שיפור דרמטי. 4) הנהלה: רקורד + 3% אחזקה. 5) P/E 25 על רווחי שפל — כשהמיקס ישתנה, הרווחיות תקפוץ. 6) מסקנה: שיקום חכם — קנייה.",
        "isGoodValue": true,
        "difficulty": "medium",
        "difficultyValue": 2,
        "hint": "ההכנסות יורדות, אבל הסגמנט הרפואי צומח 35% עם מרווח 22%. מה המנכ\"ל באמת עושה?"
    },
    {
        "id": "turnaround-trap-m01",
        "name": "טקסטיל העמק בע\"מ",
        "sector": "תעשייה",
        "symbol": "TKST",
        "price": 15,
        "tier": 2,
        "chartType": "annual",
        "description": "מפעל טקסטיל שהובטח 'שיקום' כבר 4 שנים. כל שנה ההנהלה מבטיחה שיפור 'ברבעון הבא'. המחיר ירד 70% מהשיא, ויש המלצות 'קנייה ספקולטיבית' מאנליסטים.",
        "management": "אותו מנכ\"ל שהוביל את הירידה עדיין בתפקיד. מכר 50% ממניותיו בשנתיים האחרונות.",
        "moat": "אין — ייצור טקסטיל בישראל יקר מול יבוא מאסיה.",
        "events": "הפסד רבעוני גדול מהצפי. ההנהלה 'בוחנת אפשרויות אסטרטגיות' (= אולי מוכרת).",
        "metrics": {
            "basic": [
                {
                    "name": "P/E",
                    "value": "שלילי"
                },
                {
                    "name": "ROE",
                    "value": "-12%"
                },
                {
                    "name": "P/B",
                    "value": "0.4"
                }
            ],
            "advanced": [
                {
                    "name": "ROIC",
                    "value": "-8%"
                },
                {
                    "name": "FCF (מיליון ₪)",
                    "value": "-22"
                },
                {
                    "name": "חוב/הון",
                    "value": "2.5"
                }
            ]
        },
        "historicalData": [
            {
                "year": "year-4",
                "revenue": 280,
                "fcf": -5
            },
            {
                "year": "year-3",
                "revenue": 260,
                "fcf": -10
            },
            {
                "year": "year-2",
                "revenue": 240,
                "fcf": -15
            },
            {
                "year": "year-1",
                "revenue": 220,
                "fcf": -18
            },
            {
                "year": "year-0",
                "revenue": 195,
                "fcf": -22
            }
        ],
        "projectedData": [
            {
                "year": "year+1",
                "revenue": 180,
                "fcf": -25
            },
            {
                "year": "year+2",
                "revenue": 165,
                "fcf": -28
            }
        ],
        "correctDecision": "pass",
        "pointValue": 150,
        "hints": [
            {
                "cost": 0.5,
                "text": "P/B 0.4 = זול על הנייר. אבל מנכ\"ל שמוכר מניות שלו — מה הוא יודע שאתם לא?"
            }
        ],
        "feedback": {
            "principle": {
                "id": "turnaround",
                "name": "שיקום"
            },
            "decisiveSignals": [
                "4 שנים ללא שיפור",
                "מנכ\"ל מוכר מניות",
                "חוב/הון 2.5 = סיכון קיומי"
            ],
            "correctExplanation": "נכון! 'שיקום' שנמשך 4 שנים ללא תוצאות הוא לא שיקום — הוא סיפור כיסוי. מנכ\"ל שמוכר מניות שלו מודיע לכם שהוא לא מאמין. P/B 0.4 נראה זול, אבל ה-B הולך לאפס.",
            "incorrectExplanation": "טעות! P/B 0.4 הפתה אותך, אבל ערך הספרים יורד כל שנה. 4 שנים בלי שיפור + מנכ\"ל שמוכר מניות = אין שיקום אמיתי כאן.",
            "counterSignalExplanation": "הצד השני יטען: P/B 0.4 = קונים נכסים ב-40% מערכם. אם החברה תימכר, בעלי המניות ירוויחו. 'אפשרויות אסטרטגיות' עשויות לכלול מכירה בפרמיה."
        },
        "workedExample": "1) זיהוי: חברה שטוענת שהיא בשיקום. 2) בדיקת ציר הזמן: 4 שנים! שיקום אמיתי מראה סימנים תוך 12-18 חודשים. 3) הנהלה: אותו מנכ\"ל שגרם לבעיה + מוכר מניות = דגל אדום כפול. 4) מצב פיננסי: חוב/הון 2.5, FCF ₪-22M ומחמיר = סיכון קיומי. 5) חפיר: אין — ייצור בישראל לא תחרותי. 6) מסקנה: לא שיקום — מלכודת ערך. העל.",
        "isGoodValue": false,
        "difficulty": "medium",
        "difficultyValue": 2,
        "hint": "P/B 0.4 = זול על הנייר. אבל מנכ\"ל שמוכר מניות שלו — מה הוא יודע שאתם לא?"
    },
    {
        "id": "dividend-hidden-m01",
        "name": "בנק מסחרי ראשון בע\"מ",
        "sector": "בנקאות",
        "symbol": "BNKM",
        "price": 95,
        "tier": 2,
        "chartType": "none",
        "description": "בנק קטן עם תשואת דיבידנד מושכת של 6%. הרווחים יציבים על פני השנים, אבל יחס הלימות ההון (CET1) נמצא ממש על הגבול הרגולטורי, והחשיפה לנדל\"ן מסחרי גבוהה.",
        "management": "הנהלה שמרנית מבחינת תדמית, אבל המדיניות בפועל — אגרסיבית בחלוקת דיבידנדים.",
        "moat": "רישיון בנקאי = חפיר רגולטורי, אבל אין יתרון אמיתי על פני בנקים גדולים.",
        "events": "הרגולטור שלח מכתב התראה על יחס ההון. 25% מתיק האשראי בנדל\"ן מסחרי.",
        "metrics": {
            "basic": [
                {
                    "name": "P/E",
                    "value": "8"
                },
                {
                    "name": "ROE",
                    "value": "12%"
                },
                {
                    "name": "תשואת דיבידנד",
                    "value": "6%"
                }
            ],
            "advanced": [
                {
                    "name": "CET1",
                    "value": "10.2% (מינימום: 10.0%)"
                },
                {
                    "name": "NIM",
                    "value": "2.1%"
                },
                {
                    "name": "חשיפה לנדל\"ן מסחרי",
                    "value": "25% מהתיק"
                }
            ]
        },
        "historicalData": [
            {
                "year": "year-4",
                "revenue": 380,
                "fcf": 48
            },
            {
                "year": "year-3",
                "revenue": 395,
                "fcf": 52
            },
            {
                "year": "year-2",
                "revenue": 385,
                "fcf": 50
            },
            {
                "year": "year-1",
                "revenue": 400,
                "fcf": 55
            },
            {
                "year": "year-0",
                "revenue": 410,
                "fcf": 58
            }
        ],
        "projectedData": [
            {
                "year": "year+1",
                "revenue": 415,
                "fcf": 55
            },
            {
                "year": "year+2",
                "revenue": 420,
                "fcf": 52
            }
        ],
        "correctDecision": "pass",
        "pointValue": 150,
        "hints": [
            {
                "cost": 0.5,
                "text": "CET1 10.2% כש-10% זה המינימום — מה קורה אם הפסדי אשראי עולים?"
            }
        ],
        "feedback": {
            "principle": {
                "id": "dividend-sustainability",
                "name": "קיימות דיבידנד"
            },
            "decisiveSignals": [
                "CET1 0.2% מעל המינימום",
                "מכתב התראה מהרגולטור",
                "25% חשיפה לנדל\"ן מסחרי"
            ],
            "correctExplanation": "נכון! דיבידנד 6% מפתה, אבל CET1 ברזרבה אפסית. כל הרעה בתיק האשראי (במיוחד 25% נדל\"ן מסחרי) תכריח את הבנק לחתוך דיבידנד ולגייס הון. הרגולטור כבר שלח מכתב — זה עניין של זמן.",
            "incorrectExplanation": "טעות! P/E 8, דיבידנד 6%, רווחים יציבים — הכל נראה מושלם. אבל CET1 10.2% כשהמינימום 10% = אפס כרית ביטחון. הדיבידנד חי על זמן שאול.",
            "counterSignalExplanation": "הצד השני יטען: P/E 8 זול לבנק, ROE 12% מכובד, הרווחים יציבים, וההנהלה מנוסה. CET1 10.2% עדיין מעל המינימום, ואולי לא תהיה בעיה."
        },
        "workedExample": "1) P/E 8, דיבידנד 6% — מפתה. 2) אבל CET1 10.2% מול מינימום 10% = מרווח של 0.2% בלבד. 3) מכתב התראה מהרגולטור = הוא מודאג. 4) 25% חשיפה לנדל\"ן מסחרי = אם מחירי נדל\"ן ירדו, ההפרשות יאכלו את ה-CET1. 5) תרחיש: הפרשות → CET1 יורד מתחת ל-10% → הרגולטור מכריח חיתוך דיבידנד + גיוס הון = המניה נופלת. 6) מסקנה: דיבידנד לא בר-קיימא. העל.",
        "isGoodValue": false,
        "difficulty": "medium",
        "difficultyValue": 2,
        "hint": "CET1 10.2% כש-10% זה המינימום — מה קורה אם הפסדי אשראי עולים?"
    },
    {
        "id": "capital-allocator-m01",
        "name": "דלתא-טק תעשיות בע\"מ",
        "sector": "תעשייה מגוונת",
        "symbol": "DLTK",
        "price": 165,
        "tier": 2,
        "chartType": "segments",
        "description": "קונגלומרט תעשייתי שמנוהל כ-'מקצי הון' — המנכ\"ל קונה ומוכר חטיבות לפי תשואה על ההון. מכר 2 חטיבות הפסדיות, רכש חטיבה רווחית. ROIC עולה כל שנה.",
        "management": "מנכ\"לית עם 10 שנות ניסיון כמקצית הון. מחזיקה 8% מהמניות. תגמול מבוסס ROIC, לא גודל.",
        "moat": "אין חפיר ספציפי, אבל ניהול הון מעולה יוצר ערך לאורך זמן.",
        "events": "מכירת חטיבת אריזות (ROIC 4%) ורכישת חטיבת חיישנים (ROIC 22%). הביעה עניין ברכישה נוספת.",
        "metrics": {
            "basic": [
                {
                    "name": "P/E",
                    "value": "15"
                },
                {
                    "name": "ROE",
                    "value": "18%"
                },
                {
                    "name": "צמיחת ROIC",
                    "value": "+200bp בשנה"
                }
            ],
            "advanced": [
                {
                    "name": "ROIC",
                    "value": "16% (עלה מ-10% ב-4 שנים)"
                },
                {
                    "name": "FCF (מיליון ₪)",
                    "value": "78"
                },
                {
                    "name": "תגמול מנכ\"לית",
                    "value": "מבוסס ROIC"
                }
            ]
        },
        "segmentData": [
            {
                "name": "חיישנים תעשייתיים",
                "revenue": 180,
                "margin": "28%",
                "growth": "+12%"
            },
            {
                "name": "מערכות בקרה",
                "revenue": 140,
                "margin": "18%",
                "growth": "+6%"
            },
            {
                "name": "שירותי תחזוקה",
                "revenue": 95,
                "margin": "22%",
                "growth": "+8%"
            }
        ],
        "projectedData": [
            {
                "year": "year+1",
                "revenue": 450,
                "fcf": 88
            },
            {
                "year": "year+2",
                "revenue": 490,
                "fcf": 98
            }
        ],
        "correctDecision": "buy",
        "pointValue": 150,
        "hints": [
            {
                "cost": 0.5,
                "text": "מנכ\"לית שמתוגמלת על ROIC ולא על גודל — מה סוג ההחלטות שהיא תקבל?"
            }
        ],
        "feedback": {
            "principle": {
                "id": "management-quality",
                "name": "איכות הנהלה"
            },
            "decisiveSignals": [
                "ROIC עלה מ-10% ל-16% ב-4 שנים",
                "תגמול מבוסס ROIC",
                "מכירת חטיבות גרועות, קניית טובות"
            ],
            "correctExplanation": "מצוין! מנכ\"לית שמנהלת הון — לא אימפריה. כל החלטה (מכירה/רכישה) מוסיפה ערך. ROIC עולה עקבית = הוכחה שזה עובד. 8% אחזקה + תגמול ROIC = אינטרסים מיושרים.",
            "incorrectExplanation": "פספוס! P/E 15 לא נראה 'זול' במבט ראשון, אבל עם ROIC שעולה 200bp בשנה ומנכ\"לית שמקצה הון בריאנות — זו מכונת יצירת ערך.",
            "counterSignalExplanation": "הצד השני יטען: קונגלומרט בלי חפיר ברור, P/E 15 ממוצע, והרכישות עלולות להיכשל. מנכ\"לית שממשיכה לרכוש מגדילה סיכון."
        },
        "workedExample": "1) הנהלה: 8% אחזקה + תגמול ROIC = אינטרסים מיושרים. 2) רקורד: מכרה חטיבה ב-ROIC 4%, קנתה ב-ROIC 22% — החלטות מבוססות ערך. 3) ROIC: 10% → 16% ב-4 שנים = שיפור עקבי. 4) סגמנטים: כולם רווחיים, מרווחים בריאים. 5) P/E 15 עם שיפור ROIC מתמשך = זול. 6) מסקנה: מקצית הון מעולה — קנייה.",
        "isGoodValue": true,
        "difficulty": "medium",
        "difficultyValue": 2,
        "hint": "מנכ\"לית שמתוגמלת על ROIC ולא על גודל — מה סוג ההחלטות שהיא תקבל?"
    },
    {
        "id": "related-party-m01",
        "name": "הולדינג הצפון בע\"מ",
        "sector": "אחזקות",
        "symbol": "HLDG",
        "price": 48,
        "tier": 2,
        "chartType": "none",
        "description": "חברת אחזקות עם נכסים מגוונים. הנתונים נראים סבירים, אבל עסקאות בעלי עניין מסיביות: 15% מההוצאות הולכות לחברות של בעל השליטה. דירקטוריון מאויש בקרובי משפחה.",
        "management": "בעל שליטה שמעסיק 4 בני משפחה בתפקידי מפתח. שכר הנהלה = 8% מהרווח התפעולי.",
        "moat": "נכסי נדל\"ן ותעשייה, אבל ניהול בינוני.",
        "events": "עסקה חדשה עם חברת אחות בתנאים 'שוק'. רשות ני\"ע פתחה בחקירה ראשונית.",
        "metrics": {
            "basic": [
                {
                    "name": "P/E",
                    "value": "7"
                },
                {
                    "name": "ROE",
                    "value": "10%"
                },
                {
                    "name": "תשואת דיבידנד",
                    "value": "4%"
                }
            ],
            "advanced": [
                {
                    "name": "P/NAV",
                    "value": "0.55"
                },
                {
                    "name": "FCF (מיליון ₪)",
                    "value": "28"
                },
                {
                    "name": "עסקאות בעלי עניין",
                    "value": "15% מההוצאות"
                }
            ]
        },
        "historicalData": [
            {
                "year": "year-4",
                "revenue": 350,
                "fcf": 30
            },
            {
                "year": "year-3",
                "revenue": 360,
                "fcf": 32
            },
            {
                "year": "year-2",
                "revenue": 355,
                "fcf": 28
            },
            {
                "year": "year-1",
                "revenue": 370,
                "fcf": 30
            },
            {
                "year": "year-0",
                "revenue": 380,
                "fcf": 28
            }
        ],
        "projectedData": [
            {
                "year": "year+1",
                "revenue": 390,
                "fcf": 30
            },
            {
                "year": "year+2",
                "revenue": 400,
                "fcf": 30
            }
        ],
        "correctDecision": "pass",
        "pointValue": 150,
        "hints": [
            {
                "cost": 0.5,
                "text": "P/NAV 0.55 = דיסקאונט עצום. אבל מי שולט בכסף ולמי הוא הולך?"
            }
        ],
        "feedback": {
            "principle": {
                "id": "management-quality",
                "name": "איכות הנהלה"
            },
            "decisiveSignals": [
                "15% מההוצאות לבעלי עניין",
                "4 בני משפחה בהנהלה",
                "חקירת רשות ני\"ע"
            ],
            "correctExplanation": "נכון! P/NAV 0.55 נראה כמו מציאה, אבל הדיסקאונט הוא בדיוק בגלל ממשל תאגידי גרוע. 15% מההוצאות ל'חברות אחות' = הערך נוזל לבעל השליטה, לא למשקיעים.",
            "incorrectExplanation": "טעות! P/E 7, דיבידנד 4%, P/NAV 0.55 — על הנייר זה זול. אבל כשבעל השליטה מנקז 15% מההוצאות לחברות שלו, ה-FCF 'האמיתי' למשקיע נמוך בהרבה.",
            "counterSignalExplanation": "הצד השני יטען: P/NAV 0.55 = קונים נכסים בחצי מחיר. FCF ₪28M חיובי, דיבידנד 4% קיים, ואולי החקירה תסתיים בלי כלום."
        },
        "workedExample": "1) P/NAV 0.55 — זול! אבל למה? 2) עסקאות בעלי עניין: 15% מההוצאות = דליפת ערך שיטתית. 3) ממשל תאגידי: 4 בני משפחה + שכר 8% מהרווח = ניגודי אינטרסים. 4) חקירת רשות ני\"ע = דגל אדום. 5) FCF ₪28M — אבל כמה באמת מגיע למשקיעים? 6) מסקנה: הדיסקאונט מוצדק — הנהלה שלא עובדת בשביל המשקיעים. העל.",
        "isGoodValue": false,
        "difficulty": "medium",
        "difficultyValue": 2,
        "hint": "P/NAV 0.55 = דיסקאונט עצום. אבל מי שולט בכסף ולמי הוא הולך?"
    },
    {
        "id": "dividend-grower-m01",
        "name": "ישראמון ביטוח בע\"מ",
        "sector": "ביטוח",
        "symbol": "YSMN",
        "price": 130,
        "tier": 2,
        "chartType": "annual",
        "description": "חברת ביטוח עם combined ratio של 92% — רווחית מתפעולית. מגדילה דיבידנד 12 שנים ברציפות, אבל תשואת הדיבידנד 'רק' 3.2%. הצמיחה בדיבידנד היא 10% בשנה.",
        "management": "מנכ\"ל ותיק עם גישה שמרנית. לא רודף גודל, מתמקד ברווחיות.",
        "moat": "מותג חזק בביטוח עסקי, חידושים גבוהים (88%), רשת סוכנים נאמנה.",
        "events": "הכריזה על תוכנית רכישה עצמית. תשואת ההשקעות ירדה בגלל סביבת ריבית.",
        "metrics": {
            "basic": [
                {
                    "name": "P/E",
                    "value": "11"
                },
                {
                    "name": "ROE",
                    "value": "15%"
                },
                {
                    "name": "תשואת דיבידנד",
                    "value": "3.2%"
                }
            ],
            "advanced": [
                {
                    "name": "Combined Ratio",
                    "value": "92%"
                },
                {
                    "name": "צמיחת דיבידנד שנתית",
                    "value": "10%"
                },
                {
                    "name": "יחס חלוקה",
                    "value": "35%"
                }
            ]
        },
        "historicalData": [
            {
                "year": "year-4",
                "revenue": 580,
                "fcf": 55
            },
            {
                "year": "year-3",
                "revenue": 610,
                "fcf": 60
            },
            {
                "year": "year-2",
                "revenue": 620,
                "fcf": 58
            },
            {
                "year": "year-1",
                "revenue": 650,
                "fcf": 65
            },
            {
                "year": "year-0",
                "revenue": 690,
                "fcf": 72
            }
        ],
        "projectedData": [
            {
                "year": "year+1",
                "revenue": 720,
                "fcf": 76
            },
            {
                "year": "year+2",
                "revenue": 755,
                "fcf": 80
            }
        ],
        "correctDecision": "buy",
        "pointValue": 150,
        "hints": [
            {
                "cost": 0.5,
                "text": "3.2% תשואה נראית נמוכה, אבל עם צמיחה של 10% בשנה — מה תהיה התשואה בעוד 5 שנים?"
            }
        ],
        "feedback": {
            "principle": {
                "id": "dividend-sustainability",
                "name": "קיימות דיבידנד"
            },
            "decisiveSignals": [
                "12 שנות גידול רצוף",
                "יחס חלוקה 35% = מרווח גדול",
                "combined ratio 92% = רווחית"
            ],
            "correctExplanation": "מצוין! 3.2% היום לא מרשים, אבל עם צמיחה של 10% בשנה ויחס חלוקה של 35% = תשואה על עלות של 5.2% בעוד 5 שנים. ויחס חלוקה נמוך = מרחב לגידול. זה דיבידנד-גידול קלאסי.",
            "incorrectExplanation": "טעות! השוואת תשואת דיבידנד של 3.2% ל-6% של בנקים מטעה. דיבידנד שצומח 10% בשנה ששוה הרבה יותר מדיבידנד גבוה שלא צומח.",
            "counterSignalExplanation": "הצד השני יטען: תשואת דיבידנד 3.2% נמוכה כשאפשר לקבל 6% בבנקים. ירידה בתשואות השקעות פוגעת ברווחי ביטוח. P/E 11 לא זול במיוחד לסקטור."
        },
        "workedExample": "1) תשואה 3.2% — לא מרשימה. אבל... 2) צמיחת דיבידנד 10% בשנה × 12 שנים ברצף = רקורד מוכח. 3) יחס חלוקה 35% = מרחב אדיר — החברה יכולה להכפיל דיבידנד מבלי להסתכן. 4) combined ratio 92% = עסק ביטוח רווחי. 5) מודל תשואה על עלות: בעוד 5 שנים, 3.2% × 1.10^5 = 5.2% על ההשקעה. 6) מסקנה: דיבידנד-גידול — קנייה.",
        "isGoodValue": true,
        "difficulty": "medium",
        "difficultyValue": 2,
        "hint": "3.2% תשואה נראית נמוכה, אבל עם צמיחה של 10% בשנה — מה תהיה התשואה בעוד 5 שנים?"
    },
    {
        "id": "value-not-trap-m01",
        "name": "פלסטיק הדרום בע\"מ",
        "sector": "תעשייה",
        "symbol": "PLDR",
        "price": 22,
        "tier": 2,
        "chartType": "annual",
        "description": "יצרנית אריזות פלסטיק עם P/E 5 ודיבידנד 8%. נראה כמו מלכודת ערך קלאסית — ענף 'משעמם', צמיחה אפסית. אבל: FCF יציב 10 שנים, אין חוב, ו-80% מההכנסות מחוזי אספקה ל-5+ שנים.",
        "management": "משפחה מייסדת בדור שלישי. שמרנים מאוד. מחזיקים 40% מהמניות.",
        "moat": "עלויות ייצור נמוכות, חוזים ארוכי טווח, עלות מעבר גבוהה ללקוחות (אריזות מותאמות אישית).",
        "events": "שום דבר מרגש — וזה בדיוק הנקודה. אין חדשות = אין סיכון.",
        "metrics": {
            "basic": [
                {
                    "name": "P/E",
                    "value": "5"
                },
                {
                    "name": "ROE",
                    "value": "14%"
                },
                {
                    "name": "תשואת דיבידנד",
                    "value": "8%"
                }
            ],
            "advanced": [
                {
                    "name": "ROIC",
                    "value": "16%"
                },
                {
                    "name": "FCF (מיליון ₪)",
                    "value": "32"
                },
                {
                    "name": "יחס חלוקה",
                    "value": "55%"
                }
            ]
        },
        "historicalData": [
            {
                "year": "year-4",
                "revenue": 195,
                "fcf": 30
            },
            {
                "year": "year-3",
                "revenue": 200,
                "fcf": 32
            },
            {
                "year": "year-2",
                "revenue": 198,
                "fcf": 31
            },
            {
                "year": "year-1",
                "revenue": 205,
                "fcf": 33
            },
            {
                "year": "year-0",
                "revenue": 202,
                "fcf": 32
            }
        ],
        "projectedData": [
            {
                "year": "year+1",
                "revenue": 208,
                "fcf": 33
            },
            {
                "year": "year+2",
                "revenue": 212,
                "fcf": 34
            }
        ],
        "correctDecision": "buy",
        "pointValue": 150,
        "hints": [
            {
                "cost": 0.5,
                "text": "P/E 5 ודיבידנד 8% — מלכודת ערך? או שזה באמת זול? בדקו את ה-FCF לאורך 5 שנים."
            }
        ],
        "feedback": {
            "principle": {
                "id": "value-trap",
                "name": "מלכודת ערך"
            },
            "decisiveSignals": [
                "FCF יציב 5+ שנים",
                "ROIC 16% — גבוה לתעשייה",
                "חוזים ל-5+ שנים = הכנסות מובטחות"
            ],
            "correctExplanation": "מצוין! לא כל מניה זולה היא מלכודת ערך! כאן יש FCF יציב, ROIC גבוה, חוזים ארוכי טווח, ויחס חלוקה סביר. הענף 'משעמם' = בדיוק מה שבאפט אוהב. מלכודת הערך כאן היא... לא לקנות.",
            "incorrectExplanation": "טעות! P/E 5 ודיבידנד 8% עם 'צמיחה אפסית' נראה כמו מלכודת ערך — אבל FCF יציב 10 שנים ו-ROIC 16% מוכיחים שזה עסק איכותי. לא כל דבר שנראה זול הוא מלכודת.",
            "counterSignalExplanation": "הצד השני יטען: צמיחה אפסית, ענף פלסטיק בלחץ סביבתי, ושוק שלא מעריך את המניה כבר שנים. אם השוק לא רואה ערך, אולי הוא צודק."
        },
        "workedExample": "1) P/E 5, דיבידנד 8% — מלכודת ערך? נבדוק. 2) FCF: יציב ב-₪30-33M חמש שנים = עקבי, לא מדשדש. 3) ROIC 16% = תשואה גבוהה על ההון = עסק איכותי. 4) חוזים ל-5+ שנים = הכנסות כמעט מובטחות. 5) משפחה מייסדת עם 40% אחזקה = skin in the game. 6) מסקנה: זו לא מלכודת ערך — זו חברה איכותית שהשוק מתעלם ממנה. קנייה.",
        "isGoodValue": true,
        "difficulty": "medium",
        "difficultyValue": 2,
        "hint": "P/E 5 ודיבידנד 8% — מלכודת ערך? או שזה באמת זול? בדקו את ה-FCF לאורך 5 שנים."
    },
    {
        "id": "accounting-trick-m01",
        "name": "גלובל-טרייד סחר בע\"מ",
        "sector": "סחר",
        "symbol": "GLBT",
        "price": 72,
        "tier": 2,
        "chartType": "waterfall",
        "description": "חברת סחר שמציגה רווח נקי יפה, אבל רווחי הבעלים שליליים. ההבדל: רווחים חד-פעמיים ממכירת נכסים ושינוי מדיניות חשבונאית שהגדילה רווחים על הנייר.",
        "management": "מנכ\"ל חדש שצריך להראות תוצאות. החליף רואה חשבון.",
        "moat": "אין — סחר בסחורות ללא יתרון תחרותי.",
        "events": "שינוי מדיניות הכרה בהכנסות. מכירת נכס במחיר גבוה = רווח חד-פעמי. החליפה רואה חשבון.",
        "metrics": {
            "basic": [
                {
                    "name": "P/E",
                    "value": "10 (על רווח מדווח)"
                },
                {
                    "name": "ROE",
                    "value": "15% (על רווח מדווח)"
                },
                {
                    "name": "צמיחת רווח",
                    "value": "25% (חד-פעמי)"
                }
            ],
            "advanced": [
                {
                    "name": "P/E על רווחי בעלים",
                    "value": "שלילי"
                },
                {
                    "name": "FCF (מיליון ₪)",
                    "value": "-8"
                },
                {
                    "name": "רווח חד-פעמי",
                    "value": "₪40M (50% מהרווח)"
                }
            ]
        },
        "historicalData": [
            {
                "year": "year-4",
                "revenue": 410,
                "fcf": 15
            },
            {
                "year": "year-3",
                "revenue": 395,
                "fcf": 8
            },
            {
                "year": "year-2",
                "revenue": 380,
                "fcf": 2
            },
            {
                "year": "year-1",
                "revenue": 370,
                "fcf": -3
            },
            {
                "year": "year-0",
                "revenue": 375,
                "fcf": -8
            }
        ],
        "projectedData": [
            {
                "year": "year+1",
                "revenue": 365,
                "fcf": -12
            },
            {
                "year": "year+2",
                "revenue": 355,
                "fcf": -15
            }
        ],
        "correctDecision": "pass",
        "pointValue": 150,
        "hints": [
            {
                "cost": 0.5,
                "text": "50% מהרווח הוא חד-פעמי. מה קורה ל-P/E כשמסירים את זה?"
            }
        ],
        "feedback": {
            "principle": {
                "id": "owner-earnings",
                "name": "רווחי בעלים"
            },
            "decisiveSignals": [
                "50% רווח חד-פעמי",
                "FCF שלילי",
                "החלפת רואה חשבון"
            ],
            "correctExplanation": "נכון! הרווח המדווח מטעה — חצי ממנו חד-פעמי. רווחי הבעלים (FCF) שליליים = העסק מפסיד. שינוי מדיניות חשבונאית + החלפת רו\"ח = דגלים אדומים.",
            "incorrectExplanation": "טעות! P/E 10 נראה סביר, אבל הוא מבוסס על רווחים מנופחים. FCF שלילי מספר את האמת — העסק שורף מזומן.",
            "counterSignalExplanation": "הצד השני יטען: P/E 10 זול, הרווח עלה 25%, וההנהלה החדשה אולי תצליח לשפר ביצועים. שינוי מדיניות חשבונאית לא בהכרח שלילי."
        },
        "workedExample": "1) P/E 10 על רווח מדווח — נראה טוב. 2) אבל 50% מהרווח = חד-פעמי (מכירת נכס). P/E 'אמיתי' = 20+. 3) FCF שלילי ₪-8M = העסק מפסיד. 4) החלפת רו\"ח + שינוי מדיניות = חשד לאיפור מספרים. 5) ההכנסות יורדות 4 שנים = עסק בדעיכה. 6) מסקנה: רווחי בעלים שליליים — העל.",
        "isGoodValue": false,
        "difficulty": "medium",
        "difficultyValue": 2,
        "hint": "50% מהרווח הוא חד-פעמי. מה קורה ל-P/E כשמסירים את זה?"
    },
    {
        "id": "smart-leverage-m01",
        "name": "סולארי אנרגיה בע\"מ",
        "sector": "אנרגיה מתחדשת",
        "symbol": "SOLR",
        "price": 85,
        "tier": 2,
        "chartType": "annual",
        "description": "חברת אנרגיה סולארית שלקחה חוב גדול (חוב/הון 2.0) לבניית 3 חוות סולאריות. נראה מסוכן, אבל: כל ההכנסות מובטחות בחוזי PPA ל-20 שנה עם גופים ממשלתיים, וכל החוב בריבית קבועה ל-15 שנה.",
        "management": "צוות מהנדסים מנוסה. מנכ\"ל שמגיע מתשתיות ממשלתיות.",
        "moat": "חוזי PPA ל-20 שנה = הכנסה מובטחת. פרויקטים מאושרים עם חיבור לרשת.",
        "events": "חוות סולארית שלישית התחברה לרשת לפני הזמן. תעריף מובטח צמוד מדד.",
        "metrics": {
            "basic": [
                {
                    "name": "P/E",
                    "value": "20"
                },
                {
                    "name": "ROE",
                    "value": "22% (ממונף)"
                },
                {
                    "name": "צמיחת הכנסות",
                    "value": "35%"
                }
            ],
            "advanced": [
                {
                    "name": "חוב/הון",
                    "value": "2.0"
                },
                {
                    "name": "יחס כיסוי ריבית",
                    "value": "4.2x"
                },
                {
                    "name": "PPA ממוצע",
                    "value": "20 שנים, צמוד מדד"
                }
            ]
        },
        "historicalData": [
            {
                "year": "year-4",
                "revenue": 45,
                "fcf": -15
            },
            {
                "year": "year-3",
                "revenue": 80,
                "fcf": -5
            },
            {
                "year": "year-2",
                "revenue": 120,
                "fcf": 10
            },
            {
                "year": "year-1",
                "revenue": 160,
                "fcf": 25
            },
            {
                "year": "year-0",
                "revenue": 215,
                "fcf": 40
            }
        ],
        "projectedData": [
            {
                "year": "year+1",
                "revenue": 250,
                "fcf": 52
            },
            {
                "year": "year+2",
                "revenue": 260,
                "fcf": 58
            }
        ],
        "correctDecision": "buy",
        "pointValue": 150,
        "hints": [
            {
                "cost": 0.5,
                "text": "חוב/הון 2.0 מפחיד, אבל מה הטיב של החוב? ומה מבטיח את ההכנסות?"
            }
        ],
        "feedback": {
            "principle": {
                "id": "leverage-risk",
                "name": "סיכון מינוף"
            },
            "decisiveSignals": [
                "הכנסות מובטחות ל-20 שנה",
                "ריבית קבועה ל-15 שנה",
                "יחס כיסוי 4.2x"
            ],
            "correctExplanation": "מצוין! חוב/הון 2.0 נראה מסוכן, אבל זה 'מינוף פרויקטי' עם הכנסות מובטחות. כשהתזרים מובטח ל-20 שנה והריבית קבועה ל-15, החוב הוא כלי ליצירת ערך — לא סיכון.",
            "incorrectExplanation": "טעות! חוב/הון 2.0 הפחיד אותך. אבל בפרויקטי תשתיות עם חוזים ממשלתיים ל-20 שנה, המינוף הזה הגיוני. השאלה היא לא כמה חוב יש, אלא מה מבטיח אותו.",
            "counterSignalExplanation": "הצד השני יטען: חוב/הון 2.0 מסוכן. אם חוות תקולה, ההכנסות ייפגעו. P/E 20 לא זול. ואנרגיה סולארית תלויה ברגולציה שעלולה להשתנות."
        },
        "workedExample": "1) חוב/הון 2.0 — דגל אדום? נבדוק. 2) הכנסות: חוזי PPA ל-20 שנה עם גופים ממשלתיים = כמעט ודאיות. 3) חוב: ריבית קבועה ל-15 שנה = אין סיכון ריבית. 4) כיסוי: 4.2x = אפילו עם ירידה של 50% בהכנסות, עדיין מכסים. 5) FCF: עלה מ-₪-15M ל-₪40M כשהפרויקטים הושלמו. 6) מסקנה: מינוף חכם עם הכנסות מובטחות — קנייה.",
        "isGoodValue": true,
        "difficulty": "medium",
        "difficultyValue": 2,
        "hint": "חוב/הון 2.0 מפחיד, אבל מה הטיב של החוב? ומה מבטיח את ההכנסות?"
    },
    {
        "id": "biotech-complex-m01",
        "name": "ג'ין-פארם ביותק בע\"מ",
        "sector": "ביוטכנולוגיה",
        "symbol": "GNPH",
        "price": 180,
        "tier": 2,
        "chartType": "none",
        "description": "חברת ביוטק שמפתחת טיפול גנטי לסוג ספציפי של סרטן. בשלב 3 קליני. אנליסטים נלהבים, אבל ההבנה של הטכנולוגיה דורשת תואר בביולוגיה מולקולרית. אין הכנסות, רק שריפת מזומן.",
        "management": "מנכ\"ל-מדען עם פרסומים מובילים. צוות מחקר מעולה.",
        "moat": "פטנטים, אבל הערכת ערכם דורשת ידע מדעי עמוק.",
        "events": "תוצאות שלב 2 'מעודדות' — אבל המונח מעורפל. מתחרה פרסם תוצאות דומות.",
        "metrics": {
            "basic": [
                {
                    "name": "P/E",
                    "value": "N/A (אין רווח)"
                },
                {
                    "name": "שווי שוק",
                    "value": "₪1.2B"
                },
                {
                    "name": "Burn Rate",
                    "value": "₪15M/רבעון"
                }
            ],
            "advanced": [
                {
                    "name": "מזומן",
                    "value": "₪180M (12 רבעונות)"
                },
                {
                    "name": "שלב קליני",
                    "value": "3 (אחרון)"
                },
                {
                    "name": "הסתברות אישור FDA",
                    "value": "~50% (ממוצע סקטורי)"
                }
            ]
        },
        "historicalData": [
            {
                "year": "year-4",
                "revenue": 0,
                "fcf": -35
            },
            {
                "year": "year-3",
                "revenue": 0,
                "fcf": -42
            },
            {
                "year": "year-2",
                "revenue": 0,
                "fcf": -48
            },
            {
                "year": "year-1",
                "revenue": 0,
                "fcf": -55
            },
            {
                "year": "year-0",
                "revenue": 0,
                "fcf": -60
            }
        ],
        "projectedData": [
            {
                "year": "year+1",
                "revenue": 0,
                "fcf": -65
            },
            {
                "year": "year+2",
                "revenue": 50,
                "fcf": -40
            }
        ],
        "correctDecision": "pass",
        "pointValue": 150,
        "hints": [
            {
                "cost": 0.5,
                "text": "האם אתם באמת מסוגלים להעריך את ההסתברות שטיפול גנטי ספציפי יצליח בשלב 3?"
            }
        ],
        "feedback": {
            "principle": {
                "id": "circle-of-competence",
                "name": "מעגל כשירות"
            },
            "decisiveSignals": [
                "דרושה מומחיות בביולוגיה מולקולרית",
                "הסתברות אישור ~50%",
                "אין הכנסות = לא ניתן להעריך"
            ],
            "correctExplanation": "נכון! זו לא שאלה אם החברה טובה — זו שאלה אם אתם מסוגלים להעריך. בלי ידע בביולוגיה מולקולרית, אתם מהמרים ב-50/50 ולא משקיעים. זה מחוץ למעגל הכשירות.",
            "incorrectExplanation": "טעות! 'אנליסטים נלהבים' ו'שלב 3' נשמעים מבטיחים, אבל אם אתם לא מבינים את המדע — אתם סומכים על אחרים. באפט לעולם לא משקיע במה שהוא לא מבין.",
            "counterSignalExplanation": "הצד השני יטען: שלב 3 = ההסתברות הגבוהה ביותר לאישור. מנכ\"ל-מדען מוביל, פטנטים מגנים, ושוק הסרטן ענק. אפשר לסמוך על המומחים."
        },
        "workedExample": "1) שאלה ראשונה: האם אני מבין את הטכנולוגיה? טיפול גנטי = מדע מורכב שלא לכולם. 2) אם לא — כל ניתוח שלי הוא ניחוש. 3) 'אנליסטים נלהבים' ≠ בטוח. 50% מהתרופות בשלב 3 נכשלות. 4) אין הכנסות = לא ניתן להעריך שווי בשיטות רגילות. 5) מסקנה: מחוץ למעגל הכשירות — העל.",
        "isGoodValue": false,
        "difficulty": "medium",
        "difficultyValue": 2,
        "hint": "האם אתם באמת מסוגלים להעריך את ההסתברות שטיפול גנטי ספציפי יצליח בשלב 3?"
    },
    {
        "id": "too-hard-m01",
        "name": "קוואנטום AI בע\"מ",
        "sector": "טכנולוגיה עילית",
        "symbol": "QNTM",
        "price": 310,
        "tier": 2,
        "chartType": "none",
        "description": "חברת AI שמפתחת מודלים למסחר אלגוריתמי. ההכנסות קפצו 200% בשנה אבל הרווחיות תלויה בביצועי המודלים בשוק, שנתון לרגרסיה לממוצע. לא ניתן לנבא ביצועים עתידיים.",
        "management": "שני מייסדים מ-Unit 8200 עם PhD במתמטיקה.",
        "moat": "אלגוריתמים, אבל האם הם באמת עדיפים? אי אפשר לדעת בלי לפתוח את ה-'קופסה השחורה'.",
        "events": "קרן גידור ידועה השקיעה. אבל גם קרנות טועות.",
        "metrics": {
            "basic": [
                {
                    "name": "P/E",
                    "value": "45"
                },
                {
                    "name": "ROE",
                    "value": "40%"
                },
                {
                    "name": "צמיחה",
                    "value": "200%"
                }
            ],
            "advanced": [
                {
                    "name": "PEG",
                    "value": "0.23 (אם הצמיחה נמשכת)"
                },
                {
                    "name": "FCF (מיליון ₪)",
                    "value": "55"
                },
                {
                    "name": "תלות במודל אחד",
                    "value": "85% מההכנסות"
                }
            ]
        },
        "historicalData": [
            {
                "year": "year-4",
                "revenue": 15,
                "fcf": -5
            },
            {
                "year": "year-3",
                "revenue": 35,
                "fcf": 5
            },
            {
                "year": "year-2",
                "revenue": 55,
                "fcf": 12
            },
            {
                "year": "year-1",
                "revenue": 95,
                "fcf": 28
            },
            {
                "year": "year-0",
                "revenue": 280,
                "fcf": 55
            }
        ],
        "projectedData": [
            {
                "year": "year+1",
                "revenue": 400,
                "fcf": 80
            },
            {
                "year": "year+2",
                "revenue": 350,
                "fcf": 50
            }
        ],
        "correctDecision": "pass",
        "pointValue": 150,
        "hints": [
            {
                "cost": 0.5,
                "text": "200% צמיחה ו-PEG 0.23 — חלום? או שהצמיחה לא ניתנת לחיזוי?"
            }
        ],
        "feedback": {
            "principle": {
                "id": "too-hard",
                "name": "קשה מדי"
            },
            "decisiveSignals": [
                "85% תלות במודל אחד",
                "צמיחה 200% = לא ניתנת לחיזוי",
                "'קופסה שחורה' = לא ניתנת לניתוח"
            ],
            "correctExplanation": "נכון! PEG 0.23 מפתה מאוד, אבל 200% צמיחה לא ניתנת לחיזוי. 85% מההכנסות ממודל אחד שאף אחד מבחוץ לא מבין = לא ניתן לניתוח. 'קשה מדי' לא אומר גרוע — אומר שהסיכון לא ניתן להערכה.",
            "incorrectExplanation": "טעות! FCF ₪55M ו-PEG 0.23 מסנוורים, אבל אם אתם לא יכולים לנבא אם הצמיחה תימשך, אתם מהמרים — לא משקיעים. באפט עובר על מה שהוא לא מבין.",
            "counterSignalExplanation": "הצד השני יטען: PEG 0.23 = מציאת עשור. מייסדים מ-8200 + השקעת קרן גידור = תמחור מומחים. AI הוא העתיד, ומי שלא ישקיע יפסיד."
        },
        "workedExample": "1) צמיחה 200%, PEG 0.23 — מרשים. 2) אבל: צמיחה מ-₪95M ל-₪280M בשנה = האם זה ניתן לשכפול? 3) 85% תלות במודל אחד = סיכון קונצנטרציה קיצוני. 4) מודל AI = 'קופסה שחורה' — אני לא יכול להעריך אם הוא באמת עדיף. 5) רגרסיה לממוצע: ביצועי מסחר אלגוריתמי נוטים לדעוך. 6) מסקנה: לא יכול לנתח → קשה מדי → העל.",
        "isGoodValue": false,
        "difficulty": "medium",
        "difficultyValue": 2,
        "hint": "200% צמיחה ו-PEG 0.23 — חלום? או שהצמיחה לא ניתנת לחיזוי?"
    },
    {
        "id": "profitable-growth-m01",
        "name": "פינטק-פיי בע\"מ",
        "sector": "פינטק",
        "symbol": "FNTP",
        "price": 195,
        "tier": 2,
        "chartType": "quarterly",
        "description": "אפליקציית תשלומים שגדלה 40% בשנה — אבל בניגוד למתחרים, היא רווחית. NRR 135%, churn רק 3%, Rule of 40 = 52. המרווח הגולמי 75% והמרווח התפעולי 12% ועולה.",
        "management": "מייסדת עם 15% אחזקה. מתמקדת ברווחיות מיום ראשון.",
        "moat": "אפקט רשת + עלות מעבר (אינטגרציה עמוקה עם מערכות ERP).",
        "events": "שותפות עם בנק גדול. NRR עלה מ-120% ל-135% בשנה.",
        "metrics": {
            "basic": [
                {
                    "name": "P/S",
                    "value": "8"
                },
                {
                    "name": "NRR",
                    "value": "135%"
                },
                {
                    "name": "Rule of 40",
                    "value": "52"
                }
            ],
            "advanced": [
                {
                    "name": "מרווח גולמי",
                    "value": "75%"
                },
                {
                    "name": "מרווח תפעולי",
                    "value": "12% (עולה)"
                },
                {
                    "name": "Churn שנתי",
                    "value": "3%"
                }
            ]
        },
        "quarterlyData": [
            {
                "quarter": "Q1 year-1",
                "revenue": 38,
                "fcf": 3
            },
            {
                "quarter": "Q2 year-1",
                "revenue": 42,
                "fcf": 4
            },
            {
                "quarter": "Q3 year-1",
                "revenue": 48,
                "fcf": 5
            },
            {
                "quarter": "Q4 year-1",
                "revenue": 52,
                "fcf": 6
            },
            {
                "quarter": "Q1 year-0",
                "revenue": 55,
                "fcf": 7
            },
            {
                "quarter": "Q2 year-0",
                "revenue": 62,
                "fcf": 9
            }
        ],
        "projectedData": [
            {
                "year": "year+1",
                "revenue": 290,
                "fcf": 42
            },
            {
                "year": "year+2",
                "revenue": 400,
                "fcf": 68
            }
        ],
        "correctDecision": "buy",
        "pointValue": 150,
        "hints": [
            {
                "cost": 0.5,
                "text": "P/S 8 נראה גבוה — אבל מה Rule of 40 אומר על שילוב הצמיחה עם הרווחיות?"
            }
        ],
        "feedback": {
            "principle": {
                "id": "growth-trap",
                "name": "מלכודת צמיחה"
            },
            "decisiveSignals": [
                "Rule of 40 = 52 — צמיחה + רווחיות",
                "NRR 135% = לקוחות מוציאים יותר",
                "churn 3% = שימור גבוה"
            ],
            "correctExplanation": "מצוין! לא כל צמיחה מהירה היא מלכודת! צמיחה עם רווחיות (Rule of 40 > 40), NRR גבוה, ו-churn נמוך = צמיחה בריאה ובת-קיימא. P/S 8 מוצדק כשהמרווחים עולים.",
            "incorrectExplanation": "טעות! P/S 8 וצמיחה 40% הזכירו לך מלכודות צמיחה, אבל כאן יש רווחיות, NRR 135%, ו-churn 3%. ההבדל בין מלכודת צמיחה לצמיחה אמיתית הוא בדיוק במספרים האלה.",
            "counterSignalExplanation": "הצד השני יטען: P/S 8 גבוה, פינטק הוא שוק תחרותי, ורגולציה פיננסית עלולה לפגוע. 40% צמיחה לא תימשך לנצח, וכשהיא תואט, ה-P/S ייראה מופרז."
        },
        "workedExample": "1) P/S 8 — גבוה? בפינטק, צריך להסתכל על SaaS metrics. 2) NRR 135% = הלקוחות הקיימים מביאים 35% יותר הכנסות. 3) Churn 3% = שימור יוצא דופן. 4) Rule of 40 = 52 (צמיחה 40% + מרווח 12%) = בריא. 5) מרווח גולמי 75% = scalability. 6) מסקנה: צמיחה רווחית ובת-קיימא — קנייה.",
        "isGoodValue": true,
        "difficulty": "medium",
        "difficultyValue": 2,
        "hint": "P/S 8 נראה גבוה — אבל מה Rule of 40 אומר על שילוב הצמיחה עם הרווחיות?"
    },
    {
        "id": "insider-selling-m01",
        "name": "סמארט-הום טכנולוגיות בע\"מ",
        "sector": "טכנולוגיה",
        "symbol": "SMHM",
        "price": 155,
        "tier": 2,
        "chartType": "quarterly",
        "description": "חברת טכנולוגיה לבית חכם. הצמיחה מרשימה (20%), P/E 18 סביר. אבל: 4 מתוך 5 בכירים מכרו מניות ב-3 חודשים האחרונים — ₪22M בסך הכל. במקביל, החברה הודיעה על 'מבצע' רכישה עצמית קטנטנה (₪3M).",
        "management": "מנכ\"ל מכר 40% מאחזקתו. CFO מכרה 60%. CTO מכר 30%. סמנכ\"ל שיווק מכר 50%.",
        "moat": "טכנולוגיה מעניינת אבל שוק צפוף. 15+ מתחרים.",
        "events": "4 בכירים מכרו ₪22M. רכישה עצמית ₪3M ('כדי להראות אמון'). הרבעון האחרון: צמיחה האטה מ-25% ל-15%.",
        "metrics": {
            "basic": [
                {
                    "name": "P/E",
                    "value": "18"
                },
                {
                    "name": "PEG",
                    "value": "0.9"
                },
                {
                    "name": "צמיחת הכנסות",
                    "value": "20% (מאטה)"
                }
            ],
            "advanced": [
                {
                    "name": "ROIC",
                    "value": "14%"
                },
                {
                    "name": "FCF (מיליון ₪)",
                    "value": "28"
                },
                {
                    "name": "מכירות בכירים (3 חודשים)",
                    "value": "₪22M"
                }
            ]
        },
        "quarterlyData": [
            {
                "quarter": "Q1 year-1",
                "revenue": 52,
                "fcf": 6
            },
            {
                "quarter": "Q2 year-1",
                "revenue": 58,
                "fcf": 8
            },
            {
                "quarter": "Q3 year-1",
                "revenue": 63,
                "fcf": 9
            },
            {
                "quarter": "Q4 year-1",
                "revenue": 68,
                "fcf": 10
            },
            {
                "quarter": "Q1 year-0",
                "revenue": 65,
                "fcf": 7
            },
            {
                "quarter": "Q2 year-0",
                "revenue": 68,
                "fcf": 8
            }
        ],
        "projectedData": [
            {
                "year": "year+1",
                "revenue": 300,
                "fcf": 32
            },
            {
                "year": "year+2",
                "revenue": 340,
                "fcf": 38
            }
        ],
        "correctDecision": "pass",
        "pointValue": 150,
        "hints": [
            {
                "cost": 0.5,
                "text": "4 מתוך 5 בכירים מכרו ₪22M, החברה קנתה חזרה ₪3M. מי אמיתי?"
            }
        ],
        "feedback": {
            "principle": {
                "id": "management-quality",
                "name": "איכות הנהלה"
            },
            "decisiveSignals": [
                "4/5 בכירים מכרו ₪22M",
                "רכישה עצמית ₪3M = 'תיאטרון'",
                "צמיחה מאטה 25% → 15%"
            ],
            "correctExplanation": "נכון! 'בעלים קונים מסיבה אחת, מוכרים מאלף סיבות' — אבל כש-4 מתוך 5 מוכרים ביחד, הסיבה אחת: הם יודעים משהו. רכישה עצמית ₪3M מול מכירות ₪22M = תיאטרון. והצמיחה מאטה = אולי מה שהם יודעים.",
            "incorrectExplanation": "טעות! PEG 0.9 מפתה. אבל כשכמעט כל ההנהלה מוכרת ביחד — זה הסיגנל הכי חזק שיש. ₪22M מכירות מול ₪3M רכישה = ההנהלה 'מגינה על עצמה' בזמן שבורחת.",
            "counterSignalExplanation": "הצד השני יטען: PEG 0.9 = זול. בכירים מוכרים מסיבות אישיות (מיסוי, גיוון). רכישה עצמית מראה אמון. ROIC 14% מכובד."
        },
        "workedExample": "1) PEG 0.9 — 'מציאה'! 2) אבל: 4/5 בכירים מכרו ₪22M ב-3 חודשים. 3) רכישה עצמית ₪3M = 14% ממה שהבכירים מכרו = תיאטרון. 4) צמיחה: 25% → 15% ברבעון = האטה. 5) שילוב: הנהלה בורחת + צמיחה מאטה = אזהרה. 6) מסקנה: תנו אמון בפעולות ההנהלה, לא בדיבורים — העל.",
        "isGoodValue": false,
        "difficulty": "medium",
        "difficultyValue": 2,
        "hint": "4 מתוך 5 בכירים מכרו ₪22M, החברה קנתה חזרה ₪3M. מי אמיתי?"
    },
    {
        "id": "intangible-moat-m01",
        "name": "רגולטור-טק בע\"מ",
        "sector": "רגולציה וציות",
        "symbol": "RGTK",
        "price": 125,
        "tier": 2,
        "chartType": "segments",
        "description": "חברה שבנתה מאגר מידע רגולטורי ייחודי ב-15 שנות עבודה. 8,000 תקנות מעודכנות, 500 לקוחות שמשלמים מנוי שנתי. שיעור חידוש 93%. מתחרה צריך 10+ שנים לבנות מאגר דומה.",
        "management": "מייסד-מנכ\"ל עם 20% אחזקה. משקיע 22% מההכנסות בעדכון ובהרחבת המאגר.",
        "moat": "נכס בלתי מוחשי: מאגר 8,000 תקנות × 15 שנות עבודה = לא ניתן לשכפל.",
        "events": "רגולציה חדשה באירופה = דרישה להתאמה = לקוחות חדשים. מתחרה סגר כי לא הצליח לשכפל את המאגר.",
        "metrics": {
            "basic": [
                {
                    "name": "P/E",
                    "value": "19"
                },
                {
                    "name": "ROE",
                    "value": "22%"
                },
                {
                    "name": "צמיחת הכנסות",
                    "value": "11%"
                }
            ],
            "advanced": [
                {
                    "name": "ROIC",
                    "value": "24%"
                },
                {
                    "name": "FCF (מיליון ₪)",
                    "value": "32"
                },
                {
                    "name": "שיעור חידוש",
                    "value": "93%"
                }
            ]
        },
        "segmentData": [
            {
                "name": "מנויים שנתיים",
                "revenue": 95,
                "margin": "55%",
                "growth": "+8%"
            },
            {
                "name": "ייעוץ רגולטורי",
                "revenue": 35,
                "margin": "40%",
                "growth": "+18%"
            },
            {
                "name": "הכשרות ותעודות",
                "revenue": 20,
                "margin": "65%",
                "growth": "+15%"
            }
        ],
        "projectedData": [
            {
                "year": "year+1",
                "revenue": 165,
                "fcf": 36
            },
            {
                "year": "year+2",
                "revenue": 182,
                "fcf": 40
            }
        ],
        "correctDecision": "buy",
        "pointValue": 150,
        "hints": [
            {
                "cost": 0.5,
                "text": "מאגר של 8,000 תקנות שנבנה ב-15 שנה. מתחרה סגר כי לא הצליח לשכפל. מה סוג החפיר הזה?"
            }
        ],
        "feedback": {
            "principle": {
                "id": "moat",
                "name": "חפיר כלכלי"
            },
            "decisiveSignals": [
                "מאגר 15 שנים = בלתי ניתן לשכפול",
                "חידוש 93%",
                "מתחרה סגר = החפיר הוכח"
            ],
            "correctExplanation": "מצוין! נכס בלתי מוחשי שלוקח 15+ שנים לבנות = חפיר עמוק. חידוש 93% מוכיח שהלקוחות תלויים. מתחרה שסגר = הוכחה שהחפיר עובד. ROIC 24% = מתורגם לרווחים.",
            "incorrectExplanation": "פספוס! 'שירותי רגולציה' לא נשמע מרגש, אבל חפירים לא חייבים להיות מרגשים. 8,000 תקנות × 15 שנים = מה שבאפט קורא 'נכס שלא ניתן לשכפול'. P/E 19 עם ROIC 24% = זול.",
            "counterSignalExplanation": "הצד השני יטען: P/E 19 = לא זול. רגולציה יכולה להשתנות ולהפוך את המאגר לפחות רלוונטי. AI עלולה לשנות את הענף."
        },
        "workedExample": "1) חפיר: מאגר 8K תקנות × 15 שנים = נכס ייחודי. 2) הוכחה: מתחרה סגר, חידוש 93%. 3) סגמנטים: 3 זרמי הכנסות, כולם רווחיים (40-65%). 4) ROIC 24% = החפיר מייצר ערך. 5) P/E 19 מול ROIC 24% = סביר. 6) עתיד: רגולציה חדשה = עוד ביקוש. 7) מסקנה: חפיר נכס בלתי מוחשי — קנייה.",
        "isGoodValue": true,
        "difficulty": "medium",
        "difficultyValue": 2,
        "hint": "מאגר של 8,000 תקנות שנבנה ב-15 שנה. מתחרה סגר כי לא הצליח לשכפל. מה סוג החפיר הזה?"
    },
    {
        "id": "reinvestment-m01",
        "name": "אינפרא-דאטה בע\"מ",
        "sector": "תשתיות מידע",
        "symbol": "INFD",
        "price": 148,
        "tier": 2,
        "chartType": "waterfall",
        "description": "חברת תשתיות מידע שמשקיעה 40% מה-FCF בחזרה בעסק ב-ROIC של 25%. כל ₪1 שמושקע מחזיר ₪0.25/שנה. P/E 16 נראה 'ממוצע', אבל שיעור ההשקעה מחדש × ROIC = צמיחה אורגנית פנימית של 10%/שנה.",
        "management": "מנכ\"ל מהנדס עם 14% אחזקה. מדיניות ברורה: 'משקיעים רק ב-ROIC > 20%'. 60% FCF חוזר לבעלי מניות.",
        "moat": "תשתית מידע קריטית למגזר הפיננסי. עלות מעבר גבוהה.",
        "events": "השקת שירות חדש שצפוי להוסיף 12% להכנסות בעוד שנתיים. שיעור זכייה במכרזים 70%.",
        "metrics": {
            "basic": [
                {
                    "name": "P/E",
                    "value": "16"
                },
                {
                    "name": "ROE",
                    "value": "20%"
                },
                {
                    "name": "צמיחת הכנסות",
                    "value": "10%"
                }
            ],
            "advanced": [
                {
                    "name": "ROIC",
                    "value": "25%"
                },
                {
                    "name": "שיעור השקעה מחדש",
                    "value": "40% מ-FCF"
                },
                {
                    "name": "צמיחה פנימית (ROIC × reinvestment)",
                    "value": "10%/שנה"
                }
            ]
        },
        "historicalData": [
            {
                "year": "year-4",
                "revenue": 220,
                "fcf": 38
            },
            {
                "year": "year-3",
                "revenue": 240,
                "fcf": 42
            },
            {
                "year": "year-2",
                "revenue": 260,
                "fcf": 46
            },
            {
                "year": "year-1",
                "revenue": 285,
                "fcf": 50
            },
            {
                "year": "year-0",
                "revenue": 310,
                "fcf": 55
            }
        ],
        "projectedData": [
            {
                "year": "year+1",
                "revenue": 340,
                "fcf": 60
            },
            {
                "year": "year+2",
                "revenue": 375,
                "fcf": 68
            }
        ],
        "correctDecision": "buy",
        "pointValue": 150,
        "hints": [
            {
                "cost": 0.5,
                "text": "ROIC 25% × שיעור השקעה 40% = צמיחה פנימית 10%. מה זה אומר על הצמיחה בעוד 5 שנים?"
            }
        ],
        "feedback": {
            "principle": {
                "id": "owner-earnings",
                "name": "רווחי בעלים"
            },
            "decisiveSignals": [
                "ROIC 25% × 40% reinvestment = 10% צמיחה פנימית",
                "כלל ROIC > 20%",
                "60% FCF לבעלי מניות"
            ],
            "correctExplanation": "מצוין! הנוסחה הכי חשובה בהשקעות ערך: צמיחה פנימית = ROIC × שיעור השקעה מחדש. 25% × 40% = 10% צמיחה אורגנית — ללא רכישות, ללא סיכון. P/E 16 על צמיחה 10% מובטחת + 60% FCF לבעלי מניות = זול.",
            "incorrectExplanation": "טעות! P/E 16 'ממוצע' בלבל אותך. אבל 25% ROIC עם 40% reinvestment = ₪1 מושקע מרוויח ₪0.25/שנה. זו מכונת צמיחה פנימית. + 60% FCF חוזר אליך.",
            "counterSignalExplanation": "הצד השני יטען: P/E 16 ממוצע לסקטור. צמיחה 10% = לא מרגש. תשתיות מידע = תלות בלקוחות גדולים שעלולים לעזוב."
        },
        "workedExample": "1) ROIC 25% — גבוה! 2) שיעור reinvestment: 40%. 3) צמיחה פנימית: 25% × 40% = 10%/שנה. 4) מה נשאר: 60% FCF → דיבידנד + רכישה עצמית. 5) סה\"כ תשואה: ~10% צמיחה + ~4% תשואה לבעלי מניות = ~14%. 6) P/E 16 על 14% תשואה שנתית = זול. 7) מסקנה: מכונת compounding — קנייה.",
        "isGoodValue": true,
        "difficulty": "medium",
        "difficultyValue": 2,
        "hint": "ROIC 25% × שיעור השקעה 40% = צמיחה פנימית 10%."
    },
    {
        "id": "disruption-risk-m01",
        "name": "סקיורי-גארד בע\"מ",
        "sector": "שמירה ואבטחה",
        "symbol": "SKRG",
        "price": 40,
        "tier": 2,
        "chartType": "annual",
        "description": "חברת שמירה עם 3,000 שומרים. P/E 7, דיבידנד 6%, רווחית. אבל: מערכות AI וצילום מחליפות שומרים. 2 לקוחות גדולים כבר עברו למצלמות + AI. ההנהלה 'לא מאמינה' שזה ישפיע.",
        "management": "מנכ\"ל ותיק שבנה את החברה על אנשים, לא טכנולוגיה. 'שומרים תמיד יהיו צורך.'",
        "moat": "רשת 3,000 עובדים ומוניטין, אבל = עלות גבוהה מול חלופה טכנולוגית.",
        "events": "2 לקוחות גדולים (12% מההכנסות) עברו ל-AI + מצלמות. 3 מתחרים השקיעו בטכנולוגיה.",
        "metrics": {
            "basic": [
                {
                    "name": "P/E",
                    "value": "7"
                },
                {
                    "name": "ROE",
                    "value": "14%"
                },
                {
                    "name": "תשואת דיבידנד",
                    "value": "6%"
                }
            ],
            "advanced": [
                {
                    "name": "ROIC",
                    "value": "11%"
                },
                {
                    "name": "FCF (מיליון ₪)",
                    "value": "25"
                },
                {
                    "name": "שחיקת לקוחות טכנולוגיה",
                    "value": "12% מההכנסות"
                }
            ]
        },
        "historicalData": [
            {
                "year": "year-4",
                "revenue": 310,
                "fcf": 30
            },
            {
                "year": "year-3",
                "revenue": 305,
                "fcf": 28
            },
            {
                "year": "year-2",
                "revenue": 298,
                "fcf": 27
            },
            {
                "year": "year-1",
                "revenue": 290,
                "fcf": 26
            },
            {
                "year": "year-0",
                "revenue": 278,
                "fcf": 25
            }
        ],
        "projectedData": [
            {
                "year": "year+1",
                "revenue": 260,
                "fcf": 22
            },
            {
                "year": "year+2",
                "revenue": 240,
                "fcf": 18
            }
        ],
        "correctDecision": "pass",
        "pointValue": 150,
        "hints": [
            {
                "cost": 0.5,
                "text": "2 לקוחות עברו ל-AI. 3 מתחרים השקיעו בטכנולוגיה. ההנהלה 'לא מאמינה'. מי צודק?"
            }
        ],
        "feedback": {
            "principle": {
                "id": "moat",
                "name": "חפיר כלכלי"
            },
            "decisiveSignals": [
                "disruption טכנולוגי = שחיקת חפיר",
                "הנהלה לא מסתגלת",
                "12% הכנסות כבר אבדו"
            ],
            "correctExplanation": "נכון! שאלת העתיד: 'האם שמירה פיזית תהיה רלוונטית בעוד 10 שנים?' AI + מצלמות = זולות יותר, אמינות יותר, 24/7. 12% כבר הלכו. הנהלה שמכחישה = לא תשתנה. P/E 7 = זול מסיבה.",
            "incorrectExplanation": "טעות! P/E 7, דיבידנד 6% — 'מציאה'. אבל שאלו: מה יהיה בעוד 5 שנים? AI + מצלמות = זולות ב-70% משומרים. 2 לקוחות כבר עברו. הנהלה שלא מסתגלת = תלך עם הענף.",
            "counterSignalExplanation": "הצד השני יטען: שומרים תמיד יהיו צורך (בתי חולים, שדות תעופה). P/E 7 ודיבידנד 6% = תשואה טובה. AI עדיין לא מושלם."
        },
        "workedExample": "1) P/E 7, FCF חיובי — בסדר? 2) אבל: חשיבת עתיד. AI + מצלמות = חלופה ב-70% פחות. 3) כבר 12% הכנסות אבדו ללקוחות שעברו. 4) מתחרים השקיעו בטכנולוגיה — הם יציעו מוצר משולב. 5) ההנהלה: 'לא מאמינה' = לא תסתגל. 6) בעוד 5 שנים: הכנסות ₪180-200M (מ-₪310M). 7) מסקנה: disruption שההנהלה מכחישה — העל.",
        "isGoodValue": false,
        "difficulty": "medium",
        "difficultyValue": 2,
        "hint": "2 לקוחות עברו ל-AI. 3 מתחרים השקיעו בטכנולוגיה. ההנהלה 'לא מאמינה'. מי צודק?"
    },
    {
        "id": "bad-board-m01",
        "name": "מגה-קום תקשורת בע\"מ",
        "sector": "תקשורת",
        "symbol": "MGKM",
        "price": 88,
        "tier": 2,
        "chartType": "none",
        "description": "חברת תקשורת עם ביצועים סבירים. אבל: הדירקטוריון מורכב מ-7 חברים שכולם קרובים/ידידים של בעל השליטה. אין דירקטור בלתי תלוי אמיתי. 3 רכישות בשנה 'בתנאי שוק' — כולן מחברות קשורות.",
        "management": "בעל שליטה עם 30% כוח הצבעה. דירקטוריום 'חותמת גומי'. שכר ₪4M/שנה ללא תנאי ביצוע.",
        "moat": "רשיון תקשורת = חפיר רגולטורי, אבל הממשל התאגידי מנקז ערך.",
        "events": "3 רכישות מ'חברות קשורות'. דוח שנתי 280 עמודים (מורכב במכוון?).",
        "metrics": {
            "basic": [
                {
                    "name": "P/E",
                    "value": "9"
                },
                {
                    "name": "ROE",
                    "value": "12%"
                },
                {
                    "name": "תשואת דיבידנד",
                    "value": "4%"
                }
            ],
            "advanced": [
                {
                    "name": "ROIC",
                    "value": "8%"
                },
                {
                    "name": "FCF (מיליון ₪)",
                    "value": "40"
                },
                {
                    "name": "עסקאות צדדים קשורים",
                    "value": "3 בשנה האחרונה"
                }
            ]
        },
        "historicalData": [
            {
                "year": "year-4",
                "revenue": 420,
                "fcf": 48
            },
            {
                "year": "year-3",
                "revenue": 430,
                "fcf": 45
            },
            {
                "year": "year-2",
                "revenue": 440,
                "fcf": 43
            },
            {
                "year": "year-1",
                "revenue": 445,
                "fcf": 42
            },
            {
                "year": "year-0",
                "revenue": 450,
                "fcf": 40
            }
        ],
        "projectedData": [
            {
                "year": "year+1",
                "revenue": 455,
                "fcf": 38
            },
            {
                "year": "year+2",
                "revenue": 460,
                "fcf": 36
            }
        ],
        "correctDecision": "pass",
        "pointValue": 150,
        "hints": [
            {
                "cost": 0.5,
                "text": "הכנסות עולות 1%, FCF יורד 2%. דירקטוריון של חברים. עסקאות צדדים קשורים. לאן הולך הכסף?"
            }
        ],
        "feedback": {
            "principle": {
                "id": "management-quality",
                "name": "איכות הנהלה"
            },
            "decisiveSignals": [
                "דירקטוריום חותמת גומי",
                "3 עסקאות צדדים קשורים",
                "הכנסות ↑ + FCF ↓"
            ],
            "correctExplanation": "נכון! דירקטוריום של חברים = אין פיקוח. 3 עסקאות מחברות קשורות = הערך זולג לבעל השליטה. הכנסות +1% ו-FCF -2% = הפער הולך לבעלי עניין. P/E 9 'זול' = מוצדק.",
            "incorrectExplanation": "טעות! P/E 9, דיבידנד 4%, FCF ₪40M — נראה סביר. אבל FCF יורד בזמן שהכנסות עולות = ₪10M בשנה 'נעלמים'. 3 עסקאות צדדים קשורים מסבירות לאן.",
            "counterSignalExplanation": "הצד השני יטען: P/E 9 זול לתקשורת. רשיון = חפיר. דיבידנד 4% יציב. וגם חברות עם ממשל בעייתי יכולות להיות השקעות טובות."
        },
        "workedExample": "1) P/E 9, FCF ₪40M — סביר? 2) מגמה: הכנסות +7% (4 שנים), FCF -17%. ₪8M 'נעלמו'. 3) דירקטוריום: 7 חברים/קרובים = אין ביקורת. 4) עסקאות: 3 מחברות קשורות = כסף זולג. 5) שכר: ₪4M ללא ביצוע. 6) מסקנה: ממשל תאגידי רע = ערך שנעלם. העל.",
        "isGoodValue": false,
        "difficulty": "medium",
        "difficultyValue": 2,
        "hint": "הכנסות עולות 1%, FCF יורד 2%. דירקטוריון של חברים. עסקאות צדדים קשורים. לאן הולך הכסף?"
    }
],
    hard: [
    {
        "id": "agtech-startup-01",
        "name": "אגריטק חדשנות",
        "sector": "טכנולוגיה חקלאית",
        "symbol": "AGRI",
        "price": 85,
        "tier": 3,
        "description": "סטארטאפ המפתח טכנולוגיית חקלאות מדייקת באמצעות AI ודרונים. מערכת לניהול השקיה והדברה חכמה. 200 חקלאים משתמשים במוצר. שותפות עם משרד החקלאות. צמיחה מהירה אך הפסדים.",
        "management": "מייסדים מהאקדמיה עם ידע עמוק באגרונומיה ו-AI. גייסו COO עם ניסיון בסקיילינג. board חזק כולל שותף מקרן VC מובילה. אך חסר ניסיון בניהול פיננסי.",
        "moat": "טכנולוגיה מתקדמת אך קלה לחיקוי. נתונים שנאספו מ-500,000 דונם - יתרון משמעותי. אך שוק מפוצל עם מתחרים רבים. חקלאים שמרנים ואיטיים לאמץ טכנולוגיה.",
        "events": "גיוס 150 מיליון ₪ בהערכת שווי של 800 מיליון. השקת מוצר חדש לכרמים עם תוצאות מרשימות. כניסה לשוק האירופי. הפסדים גדלים עם ההתרחבות.",
        "metrics": {
            "basic": [
                {
                    "name": "P/E",
                    "value": "N/A - הפסדים"
                },
                {
                    "name": "P/S",
                    "value": "3.6"
                },
                {
                    "name": "תשואת דיבידנד",
                    "value": "0%"
                }
            ],
            "advanced": [
                {
                    "name": "ROIC",
                    "value": "-5%"
                },
                {
                    "name": "FCF (מיליון ₪)",
                    "value": "-80"
                },
                {
                    "name": "Gross margin",
                    "value": "65%"
                },
                {
                    "name": "R&D/Sales",
                    "value": "30%"
                },
                {
                    "name": "Customer retention",
                    "value": "85%"
                },
                {
                    "name": "Land under mgmt",
                    "value": "500K דונם"
                },
                {
                    "name": "Cash runway",
                    "value": "24 חודשים"
                }
            ]
        },
        "historicalData": [
            {
                "year": "year-4",
                "revenue": 20,
                "fcf": -60
            },
            {
                "year": "year-3",
                "revenue": 40,
                "fcf": -70
            },
            {
                "year": "year-2",
                "revenue": 80,
                "fcf": -75
            },
            {
                "year": "year-1",
                "revenue": 150,
                "fcf": -80
            },
            {
                "year": "year-0",
                "revenue": 220,
                "fcf": -80
            }
        ],
        "projectedData": [
            {
                "year": "year+1",
                "revenue": 350,
                "fcf": -60
            },
            {
                "year": "year+2",
                "revenue": 500,
                "fcf": -20
            }
        ],
        "correctDecision": "pass",
        "pointValue": 200,
        "hints": [
            {
                "cost": 0.5,
                "text": "טכנולוגיה מבטיחה לא מספיקה. חפשו נתיב לרווחיות."
            }
        ],
        "reasoningOptions": [
            {
                "id": "r1",
                "text": "FCF שלילי מתמשך מראה שהחברה לא מייצרת ערך",
                "isCorrect": true,
                "isTrap": false,
                "appliesToDecision": "pass",
                "principleId": "owner-earnings"
            },
            {
                "id": "r2",
                "text": "אין נתיב ברור לרווחיות - תלות בגיוסים נוספים",
                "isCorrect": true,
                "isTrap": false,
                "appliesToDecision": "pass",
                "principleId": "owner-earnings"
            },
            {
                "id": "r3",
                "text": "צמיחה מרשימה במכירות מצדיקה השקעה",
                "isCorrect": false,
                "isTrap": true,
                "appliesToDecision": "buy",
                "principleId": "growth-trap"
            },
            {
                "id": "r4",
                "text": "שוק החקלאות הדיוקנית צומח - הזדמנות גדולה",
                "isCorrect": false,
                "isTrap": false,
                "appliesToDecision": "buy",
                "principleId": null
            },
            {
                "id": "r5",
                "text": "P/S של 3.6 נמוך יחסית לחברות צמיחה",
                "isCorrect": false,
                "isTrap": true,
                "appliesToDecision": "buy",
                "principleId": "growth-trap"
            },
            {
                "id": "r6",
                "text": "הטכנולוגיה קלה לחיקוי - אין moat אמיתי",
                "isCorrect": true,
                "isTrap": false,
                "appliesToDecision": "pass",
                "principleId": "moat"
            }
        ],
        "feedback": {
            "principle": {
                "id": "owner-earnings",
                "name": "רווחי בעלים"
            },
            "decisiveSignals": [
                "FCF שלילי מתמשך",
                "burn rate גבוה",
                "אין נתיב ברור לרווחיות"
            ],
            "correctExplanation": "נכון! חברה עם טכנולוגיה מעניינת אך ללא נתיב ברור לרווחיות. burn rate גבוה.",
            "incorrectExplanation": "טעות! השקעה בחברות agtech ספקולטיביות עם הפסדים גדולים לא מתאימה להשקעת ערך.",
            "reasoningFeedback": {
                "fullCorrect": "מצוין! זיהית נכון את הבעיות המרכזיות - FCF שלילי וחוסר moat.",
                "partialCorrect": "טוב, אבל לא זיהית את כל הנקודות המרכזיות.",
                "fellForTrap": "נפלת במלכודת! צמיחה במכירות לא שווה כלום ללא רווחיות."
            }
        },
        "isGoodValue": false,
        "difficulty": "hard",
        "difficultyValue": 3,
        "hint": "טכנולוגיה מבטיחה לא מספיקה. חפשו נתיב לרווחיות.",
        "chartType": "annual"
    },
    {
        "id": "energy-traditional-01",
        "name": "חברת אנרגיה מסורתית",
        "sector": "נפט וגז",
        "symbol": "ENER",
        "price": 22.4,
        "tier": 3,
        "description": "חברת חיפושי גז עם 3 שדות מפיקים ו-5 רישיונות חיפוש. רזרבות מוכחות ל-15 שנה. 80% מהגז נמכר בחוזים ארוכי טווח לחברת החשמל. תזרים חזק אך ירידה בהשקעות בחיפושים חדשים. לחץ רגולטורי למעבר לאנרגיה ירוקה. חלוקת 80% מהרווח כדיבידנד.",
        "management": "CEO ותיק בענף עם גישה שמרנית. דירקטוריון מבוגר עם ממוצע גיל 65. התנגדות לשינוי ולהשקעות באנרגיה מתחדשת. פוקוס על החזר מקסימלי לבעלי מניות בטווח הקצר.",
        "moat": "נכסי גז מפיקים עם חוזים ארוכים. רישיונות בלעדיים לחיפוש. מומחיות טכנית עמוקה. אך ענף בדעיכה ארוכת טווח. תחליפים ירוקים הולכים ונעשים תחרותיים.",
        "events": "גילוי גז קטן באחד הרישיונות. מס פחמן חדש יפגע ברווחיות ב-10%. קרנות ESG מוכרות את המניה. דיבידנד מיוחד של 5 ₪ למניה הוכרז.",
        "metrics": {
            "basic": [
                {
                    "name": "P/E",
                    "value": "4.5"
                },
                {
                    "name": "ROE",
                    "value": "25%"
                },
                {
                    "name": "תשואת דיבידנד",
                    "value": "12%"
                },
                {
                    "name": "P/B",
                    "value": "0.6"
                }
            ],
            "advanced": [
                {
                    "name": "ROIC",
                    "value": "20%"
                },
                {
                    "name": "FCF (מיליון ₪)",
                    "value": "500"
                },
                {
                    "name": "Reserve life",
                    "value": "15 שנים"
                },
                {
                    "name": "Finding cost",
                    "value": "$8/BOE"
                },
                {
                    "name": "Depletion rate",
                    "value": "7% שנתי"
                },
                {
                    "name": "ESG score",
                    "value": "D rating"
                },
                {
                    "name": "CapEx/OCF",
                    "value": "20%"
                }
            ]
        },
        "historicalData": [
            {
                "year": "year-4",
                "revenue": 1200,
                "fcf": 600
            },
            {
                "year": "year-3",
                "revenue": 900,
                "fcf": 400
            },
            {
                "year": "year-2",
                "revenue": 1400,
                "fcf": 700
            },
            {
                "year": "year-1",
                "revenue": 1600,
                "fcf": 800
            },
            {
                "year": "year-0",
                "revenue": 1300,
                "fcf": 500
            }
        ],
        "projectedData": [
            {
                "year": "year+1",
                "revenue": 1200,
                "fcf": 450
            },
            {
                "year": "year+2",
                "revenue": 1100,
                "fcf": 400
            }
        ],
        "correctDecision": "buy",
        "pointValue": 200,
        "hints": [
            {
                "cost": 0.5,
                "text": "ערך עמוק יכול להימצא גם בענפים לא פופולריים. 15 שנות רזרבות זה הרבה."
            }
        ],
        "reasoningOptions": [
            {
                "id": "r1",
                "text": "P/E של 4.5 עם FCF yield של 22% - זול קיצוני",
                "isCorrect": true,
                "isTrap": false,
                "appliesToDecision": "buy",
                "principleId": "margin-of-safety"
            },
            {
                "id": "r2",
                "text": "רזרבות ל-15 שנה מבטיחות תזרים ארוך טווח",
                "isCorrect": true,
                "isTrap": false,
                "appliesToDecision": "buy",
                "principleId": "owner-earnings"
            },
            {
                "id": "r3",
                "text": "ESG rating נמוך - קרנות ימשיכו למכור",
                "isCorrect": false,
                "isTrap": true,
                "appliesToDecision": "pass",
                "principleId": null
            },
            {
                "id": "r4",
                "text": "ענף בדעיכה - לא מתאים להשקעה",
                "isCorrect": false,
                "isTrap": false,
                "appliesToDecision": "pass",
                "principleId": null
            },
            {
                "id": "r5",
                "text": "דיבידנד 12% בר-קיימא עם FCF חזק",
                "isCorrect": true,
                "isTrap": false,
                "appliesToDecision": "buy",
                "principleId": "dividend-sustainability"
            },
            {
                "id": "r6",
                "text": "הנהלה לא משקיעה בצמיחה - סימן שלילי",
                "isCorrect": false,
                "isTrap": false,
                "appliesToDecision": "pass",
                "principleId": null
            }
        ],
        "feedback": {
            "principle": {
                "id": "margin-of-safety",
                "name": "מרווח ביטחון"
            },
            "decisiveSignals": [
                "P/E של 4.5 - זול מאוד",
                "FCF yield של 22%",
                "רזרבות ל-15 שנה",
                "דיבידנד 12%"
            ],
            "counterSignalExplanation": "ESG rating נמוך ומגמות נגד דלקים מאובנים הם סיכונים ארוכי טווח, אך התמחור כבר משקף אותם.",
            "correctExplanation": "נכון! למרות הענף הבעייתי, זו חברה עם תזרים עצום ותמחור זול מאוד. ערך קלאסי.",
            "incorrectExplanation": "פספוס! 12% דיבידנד עם P/E של 4.5 ו-15 שנות רזרבות - ערך מובהק למי שלא חושש מ-ESG.",
            "reasoningFeedback": {
                "fullCorrect": "מעולה! זיהית את מרווח הביטחון העצום והתזרים החזק.",
                "partialCorrect": "בכיוון הנכון, אבל יש עוד נקודות חשובות.",
                "fellForTrap": "נפלת במלכודת! ESG rating אינו מדד לערך פנימי."
            }
        },
        "isGoodValue": true,
        "difficulty": "hard",
        "difficultyValue": 3,
        "hint": "ערך עמוק יכול להימצא גם בענפים לא פופולריים. 15 שנות רזרבות זה הרבה.",
        "chartType": "annual"
    },
    {
        "id": "defense-contractor-01",
        "name": "מגן-טק מערכות",
        "sector": "ביטחון",
        "symbol": "MGTK",
        "price": 195,
        "tier": 3,
        "description": "חברת ביטחון ישראלית המייצרת מערכות תקשורת מאובטחות לצבאות. 60% מההכנסות מיצוא.",
        "management": "מנכ\"ל לשעבר בתעשיות ביטחוניות. צוות הנדסה מהשורה הראשונה.",
        "moat": "סיווג ביטחוני, חוזים ארוכי טווח עם מדינות, IP מוגן, רישיונות מיוחדים.",
        "events": "זכייה במכרז צבאי גדול, הרחבת פעילות לאסיה, חתימה על חוזה 5 שנים.",
        "metrics": {
            "basic": [
                {
                    "name": "P/E",
                    "value": "18"
                },
                {
                    "name": "ROE",
                    "value": "22%"
                },
                {
                    "name": "צמיחת הכנסות",
                    "value": "15%"
                }
            ],
            "advanced": [
                {
                    "name": "ROIC",
                    "value": "19%"
                },
                {
                    "name": "FCF (מיליון ₪)",
                    "value": "120"
                },
                {
                    "name": "Backlog (שנות הכנסה)",
                    "value": "3.2"
                }
            ]
        },
        "historicalData": [
            {
                "year": "year-4",
                "revenue": 650,
                "fcf": 70
            },
            {
                "year": "year-3",
                "revenue": 720,
                "fcf": 82
            },
            {
                "year": "year-2",
                "revenue": 800,
                "fcf": 95
            },
            {
                "year": "year-1",
                "revenue": 900,
                "fcf": 108
            },
            {
                "year": "year-0",
                "revenue": 1020,
                "fcf": 120
            }
        ],
        "projectedData": [
            {
                "year": "year+1",
                "revenue": 1150,
                "fcf": 140
            },
            {
                "year": "year+2",
                "revenue": 1300,
                "fcf": 160
            }
        ],
        "correctDecision": "buy",
        "pointValue": 200,
        "hints": [
            {
                "cost": 0.5,
                "text": "בדקו כמה שנות הכנסה כבר חתומות בחוזים — ומה זה אומר על הסיכון."
            }
        ],
        "feedback": {
            "principle": {
                "id": "moat",
                "name": "חפיר כלכלי"
            },
            "decisiveSignals": [
                "backlog 3.2 שנים",
                "סיווג ביטחוני",
                "ROIC 19%"
            ],
            "correctExplanation": "מצוין! חפיר ביטחוני + backlog חזק = הכנסות צפויות לשנים קדימה.",
            "incorrectExplanation": "פספוס! חברת ביטחון עם backlog גדול היא מהבטוחות בשוק.",
            "counterSignalExplanation": "הצד השני יטען: P/E 18 לא זול במיוחד, 60% תלות ביצוא חושפת לסיכון גיאופוליטי, והענף הביטחוני נתון לשינויי תקציב ממשלתיים. Backlog יכול להתבטל."
        },
        "isGoodValue": true,
        "difficulty": "hard",
        "difficultyValue": 3,
        "hint": "בדקו כמה שנות הכנסה כבר חתומות בחוזים — ומה זה אומר על הסיכון.",
        "chartType": "annual",
        "workedExample": "1) חפיר: סיווג ביטחוני + IP + רישיונות = חפיר חזק שמתחרים לא יכולים לחצות. 2) Backlog 3.2 שנים = נראות קדימה מעולה. 3) ROIC 19% = תשואה גבוהה על ההון. 4) צמיחה 15% = בריאה. 5) P/E 18 לביטחוני = סביר (טווח 15-25). 6) מסקנה: חפיר חזק + backlog + צמיחה = קנייה."
    },
    {
        "id": "luxury-retail-01",
        "name": "פרימיום סטייל בע\"מ",
        "sector": "קמעונאות יוקרה",
        "symbol": "PRMS",
        "price": 125,
        "tier": 3,
        "description": "רשת חנויות אופנת יוקרה ב-8 קניונים. נפגעה מהאטה כלכלית ומסחר אונליין.",
        "management": "מנכ\"ל חדש שניסה מהפכה דיגיטלית — ההוצאות עלו אבל ההכנסות לא.",
        "moat": "מותגי יוקרה בלעדיים, אבל הבלעדיות הולכת ונשחקת. אין נאמנות אמיתית.",
        "events": "סגירת 2 סניפים, ירידה של 20% ברווח, חוב עלה בגלל שיפוץ חנויות.",
        "metrics": {
            "basic": [
                {
                    "name": "P/E",
                    "value": "8"
                },
                {
                    "name": "ROE",
                    "value": "9%"
                },
                {
                    "name": "תשואת דיבידנד",
                    "value": "6.5%"
                }
            ],
            "advanced": [
                {
                    "name": "ROIC",
                    "value": "7%"
                },
                {
                    "name": "FCF (מיליון ₪)",
                    "value": "25"
                },
                {
                    "name": "חוב/EBITDA",
                    "value": "3.5"
                }
            ]
        },
        "historicalData": [
            {
                "year": "year-4",
                "revenue": 450,
                "fcf": 55
            },
            {
                "year": "year-3",
                "revenue": 280,
                "fcf": 10
            },
            {
                "year": "year-2",
                "revenue": 380,
                "fcf": 40
            },
            {
                "year": "year-1",
                "revenue": 360,
                "fcf": 35
            },
            {
                "year": "year-0",
                "revenue": 320,
                "fcf": 25
            }
        ],
        "projectedData": [
            {
                "year": "year+1",
                "revenue": 290,
                "fcf": 18
            },
            {
                "year": "year+2",
                "revenue": 270,
                "fcf": 12
            }
        ],
        "correctDecision": "pass",
        "pointValue": 200,
        "hints": [
            {
                "cost": 0.5,
                "text": "חוב/EBITDA של 3.5 עם הכנסות יורדות — מה המשמעות?"
            }
        ],
        "feedback": {
            "principle": {
                "id": "leverage-risk",
                "name": "סיכון מינוף"
            },
            "decisiveSignals": [
                "חוב/EBITDA 3.5",
                "הכנסות יורדות",
                "חפיר נשחק"
            ],
            "correctExplanation": "נכון! חוב גבוה + הכנסות יורדות = סיכון מינוף מסוכן.",
            "incorrectExplanation": "טעות! P/E של 8 מפתה אבל החוב הגבוה עם ירידה בהכנסות = סיכון.",
            "counterSignalExplanation": "הצד השני יטען: המנכ\"ל החדש אולי צריך עוד זמן. המהפכה הדיגיטלית דורשת השקעה ראשונית שתשתלם. מותגי יוקרה בלעדיים הם נכס שקשה לשכפל."
        },
        "isGoodValue": false,
        "difficulty": "hard",
        "difficultyValue": 3,
        "hint": "חוב/EBITDA של 3.5 עם הכנסות יורדות — מה המשמעות?",
        "chartType": "annual",
        "workedExample": "1) בדיקת חפיר: בלעדיות נשחקת, אין נאמנות אמיתית. 2) הנהלה: מנכ\"ל חדש + הוצאות ללא תוצאות = סיכון. 3) מגמה: סגירת סניפים + ירידת רווח 20%. 4) חוב: עלה בגלל שיפוצים ללא תשואה. 5) מסקנה: ענף שוקע + אין חפיר + הוצאות ללא תוצאות = העל."
    },
    {
        "id": "medical-lab-01",
        "name": "מעבדות ביו-טסט",
        "sector": "בריאות",
        "symbol": "BTST",
        "price": 110,
        "tier": 3,
        "description": "רשת מעבדות רפואיות עם 45 סניפים. מבצעת בדיקות דם, פתולוגיה וגנטיקה.",
        "management": "מנכ\"ל רופא עם 20 שנות ניסיון. הנהלה יציבה, אסטרטגיה ברורה.",
        "moat": "אישורי רגולציה מורכבים, חוזים עם קופות חולים, מומחיות מעבדתית.",
        "events": "כניסה לבדיקות גנטיות מתקדמות, חוזה חדש עם קופ\"ח גדולה, גידול ב-FCF.",
        "metrics": {
            "basic": [
                {
                    "name": "P/E",
                    "value": "15"
                },
                {
                    "name": "ROE",
                    "value": "24%"
                },
                {
                    "name": "צמיחת הכנסות",
                    "value": "10%"
                }
            ],
            "advanced": [
                {
                    "name": "ROIC",
                    "value": "20%"
                },
                {
                    "name": "FCF (מיליון ₪)",
                    "value": "92"
                },
                {
                    "name": "הכנסה חוזרת",
                    "value": "78%"
                }
            ]
        },
        "historicalData": [
            {
                "year": "year-4",
                "revenue": 420,
                "fcf": 55
            },
            {
                "year": "year-3",
                "revenue": 480,
                "fcf": 65
            },
            {
                "year": "year-2",
                "revenue": 520,
                "fcf": 72
            },
            {
                "year": "year-1",
                "revenue": 570,
                "fcf": 82
            },
            {
                "year": "year-0",
                "revenue": 620,
                "fcf": 92
            }
        ],
        "projectedData": [
            {
                "year": "year+1",
                "revenue": 680,
                "fcf": 102
            },
            {
                "year": "year+2",
                "revenue": 740,
                "fcf": 115
            }
        ],
        "correctDecision": "buy",
        "pointValue": 200,
        "hints": [
            {
                "cost": 0.5,
                "text": "בדקו את מבנה ההכנסות — כמה מהן חד-פעמיות וכמה חוזרות?"
            }
        ],
        "feedback": {
            "principle": {
                "id": "owner-earnings",
                "name": "רווחי בעלים"
            },
            "decisiveSignals": [
                "78% הכנסה חוזרת",
                "ROIC 20%",
                "חפיר רגולטורי"
            ],
            "correctExplanation": "מצוין! עסק עם הכנסות חוזרות, רווחיות גבוהה וחפיר רגולטורי.",
            "incorrectExplanation": "פספוס! מעבדות רפואיות עם 78% הכנסה חוזרת — עסק באיכות גבוהה."
        },
        "isGoodValue": true,
        "difficulty": "hard",
        "difficultyValue": 3,
        "hint": "בדקו את מבנה ההכנסות — כמה מהן חד-פעמיות וכמה חוזרות?",
        "chartType": "annual"
    },
    {
        "id": "construction-materials-01",
        "name": "בטון הצפון בע\"מ",
        "sector": "חומרי בנייה",
        "symbol": "BTZF",
        "price": 65,
        "tier": 3,
        "description": "יצרנית בטון ואגרגטים מובילה בצפון הארץ. 3 מחצבות ו-8 מתקני בטון.",
        "management": "דור שלישי. מנכ\"ל מנוסה. אסטרטגיית 'buy and build' של מתחרים קטנים.",
        "moat": "מחצבות הן נכסים שלא ניתנים לשכפול. רגולציה מונעת מחצבות חדשות. מונופול אזורי.",
        "events": "רכישת מחצבה נוספת, העלאת מחירי בטון 12%, ביקוש גבוה מבנייה.",
        "metrics": {
            "basic": [
                {
                    "name": "P/E",
                    "value": "11"
                },
                {
                    "name": "ROE",
                    "value": "18%"
                },
                {
                    "name": "צמיחת הכנסות",
                    "value": "8%"
                }
            ],
            "advanced": [
                {
                    "name": "ROIC",
                    "value": "16%"
                },
                {
                    "name": "FCF (מיליון ₪)",
                    "value": "78"
                },
                {
                    "name": "כוח תמחור",
                    "value": "חזק"
                }
            ]
        },
        "historicalData": [
            {
                "year": "year-4",
                "revenue": 380,
                "fcf": 48
            },
            {
                "year": "year-3",
                "revenue": 360,
                "fcf": 42
            },
            {
                "year": "year-2",
                "revenue": 410,
                "fcf": 55
            },
            {
                "year": "year-1",
                "revenue": 460,
                "fcf": 68
            },
            {
                "year": "year-0",
                "revenue": 500,
                "fcf": 78
            }
        ],
        "projectedData": [
            {
                "year": "year+1",
                "revenue": 540,
                "fcf": 85
            },
            {
                "year": "year+2",
                "revenue": 580,
                "fcf": 92
            }
        ],
        "correctDecision": "buy",
        "pointValue": 200,
        "hints": [
            {
                "cost": 0.5,
                "text": "מחצבות הן נכסים שלא ניתנים לשכפול — כמו באפט אוהב."
            }
        ],
        "feedback": {
            "principle": {
                "id": "moat",
                "name": "חפיר כלכלי"
            },
            "decisiveSignals": [
                "מונופול אזורי",
                "מחצבות לא ניתנות לשכפול",
                "כוח תמחור"
            ],
            "correctExplanation": "מצוין! נכסים שלא ניתנים לשכפול עם מונופול אזורי — חפיר מושלם.",
            "incorrectExplanation": "פספוס! מחצבות הן כמו 'toll bridge' של באפט — אי אפשר לעקוף."
        },
        "isGoodValue": true,
        "difficulty": "hard",
        "difficultyValue": 3,
        "hint": "מחצבות הן נכסים שלא ניתנים לשכפול — כמו באפט אוהב.",
        "chartType": "annual"
    },
    {
        "id": "rental-cars-debt-01",
        "name": "השכרת רכב ישיר בע\"מ",
        "sector": "השכרת רכב",
        "symbol": "HSHR",
        "price": 22,
        "tier": 3,
        "description": "חברת השכרת רכב גדולה עם 5,000 רכבים. רווחית אבל מלאת חוב.",
        "management": "מנכ\"ל אגרסיבי שהגדיל את הצי ב-50% על חשבון חוב.",
        "moat": "גודל ונגישות, אבל תחרות עזה. ירידת ערך מהירה של הצי.",
        "events": "עלייה בריבית מייקרת את החוב. ירידת ערך רכבים חדשים מאיימת על הרווח.",
        "metrics": {
            "basic": [
                {
                    "name": "P/E",
                    "value": "6"
                },
                {
                    "name": "ROE",
                    "value": "15%"
                },
                {
                    "name": "תשואת דיבידנד",
                    "value": "0%"
                }
            ],
            "advanced": [
                {
                    "name": "ROIC",
                    "value": "4%"
                },
                {
                    "name": "FCF (מיליון ₪)",
                    "value": "30"
                },
                {
                    "name": "חוב/הון",
                    "value": "4.2"
                }
            ]
        },
        "historicalData": [
            {
                "year": "year-4",
                "revenue": 600,
                "fcf": 40
            },
            {
                "year": "year-3",
                "revenue": 350,
                "fcf": -50
            },
            {
                "year": "year-2",
                "revenue": 550,
                "fcf": 35
            },
            {
                "year": "year-1",
                "revenue": 700,
                "fcf": 55
            },
            {
                "year": "year-0",
                "revenue": 750,
                "fcf": 30
            }
        ],
        "projectedData": [
            {
                "year": "year+1",
                "revenue": 780,
                "fcf": 20
            },
            {
                "year": "year+2",
                "revenue": 800,
                "fcf": 15
            }
        ],
        "correctDecision": "pass",
        "pointValue": 200,
        "hints": [
            {
                "cost": 0.5,
                "text": "ROE של 15% נראה טוב — אבל איך הוא מושג? בדקו את המינוף."
            }
        ],
        "feedback": {
            "principle": {
                "id": "leverage-risk",
                "name": "סיכון מינוף"
            },
            "decisiveSignals": [
                "חוב/הון 4.2",
                "ROIC 4% בלבד",
                "FCF יורד"
            ],
            "correctExplanation": "נכון! ROE גבוה מומן ע\"י חוב עצום — ROIC האמיתי רק 4%.",
            "incorrectExplanation": "טעות! ROE של 15% מטעה — כשמסתכלים על ROIC (4%) רואים שהחוב עושה את העבודה."
        },
        "isGoodValue": false,
        "difficulty": "hard",
        "difficultyValue": 3,
        "hint": "ROE של 15% נראה טוב — אבל איך הוא מושג? בדקו את המינוף.",
        "chartType": "annual"
    },
    {
        "id": "waste-management-01",
        "name": "איכות הסביבה בע\"מ",
        "sector": "סביבה",
        "symbol": "SVIV",
        "price": 78,
        "tier": 3,
        "description": "חברת טיפול בפסולת מובילה. מפעילה 3 אתרי הטמנה ומיחזור עם רישיונות ל-25 שנה.",
        "management": "מנכ\"ל מהנדס סביבתי. הנהלה יציבה עם אסטרטגיה ארוכת טווח.",
        "moat": "רישיונות סביבתיים נדירים — כמעט בלתי אפשרי לקבל חדשים. מונופול אזורי.",
        "events": "חקיקה חדשה מחייבת מחזור — מגדילה ביקוש. הרחבת אתר מיחזור.",
        "metrics": {
            "basic": [
                {
                    "name": "P/E",
                    "value": "14"
                },
                {
                    "name": "ROE",
                    "value": "21%"
                },
                {
                    "name": "צמיחת הכנסות",
                    "value": "9%"
                }
            ],
            "advanced": [
                {
                    "name": "ROIC",
                    "value": "17%"
                },
                {
                    "name": "FCF (מיליון ₪)",
                    "value": "88"
                },
                {
                    "name": "חוזים ממוצע (שנים)",
                    "value": "12"
                }
            ]
        },
        "historicalData": [
            {
                "year": "year-4",
                "revenue": 350,
                "fcf": 55
            },
            {
                "year": "year-3",
                "revenue": 370,
                "fcf": 60
            },
            {
                "year": "year-2",
                "revenue": 400,
                "fcf": 68
            },
            {
                "year": "year-1",
                "revenue": 440,
                "fcf": 78
            },
            {
                "year": "year-0",
                "revenue": 480,
                "fcf": 88
            }
        ],
        "projectedData": [
            {
                "year": "year+1",
                "revenue": 520,
                "fcf": 98
            },
            {
                "year": "year+2",
                "revenue": 560,
                "fcf": 108
            }
        ],
        "correctDecision": "buy",
        "pointValue": 200,
        "hints": [
            {
                "cost": 0.5,
                "text": "חשבו על חסמי כניסה בענפים רגולטוריים — מה הם שווים?"
            }
        ],
        "feedback": {
            "principle": {
                "id": "moat",
                "name": "חפיר כלכלי"
            },
            "decisiveSignals": [
                "רישיונות נדירים",
                "מונופול אזורי",
                "רגולציה מגבירה ביקוש"
            ],
            "correctExplanation": "מצוין! רישיונות בלתי-ניתנים-לשכפול + רגולציה שמגדילה ביקוש = חפיר אידיאלי.",
            "incorrectExplanation": "פספוס! עסק פסולת 'משעמם' עם חפיר רגולטורי — סגנון באפט מובהק."
        },
        "isGoodValue": true,
        "difficulty": "hard",
        "difficultyValue": 3,
        "hint": "חשבו על חסמי כניסה בענפים רגולטוריים — מה הם שווים?",
        "chartType": "annual"
    },
    {
        "id": "fintech-lending-01",
        "name": "קרדיט-נאו טכנולוגיות",
        "sector": "פינטק",
        "symbol": "CRDN",
        "price": 165,
        "tier": 3,
        "description": "פלטפורמת הלוואות P2P שצמחה מהר. משתמשת ב-AI לדירוג אשראי.",
        "management": "מייסד צעיר ושאפתני. גיוסי הון מרשימים אבל חסר ניסיון במשברי אשראי.",
        "moat": "אלגוריתם AI ייחודי, אבל מתחרים רבים. טרם נבחן במיתון.",
        "events": "צמיחה של 50% אבל עלייה בחובות אבודים. רגולטור דורש הון מינימלי.",
        "metrics": {
            "basic": [
                {
                    "name": "P/E",
                    "value": "40"
                },
                {
                    "name": "ROE",
                    "value": "18%"
                },
                {
                    "name": "צמיחה",
                    "value": "50%"
                }
            ],
            "advanced": [
                {
                    "name": "ROIC",
                    "value": "10%"
                },
                {
                    "name": "חובות אבודים",
                    "value": "4.5% (עולה)"
                },
                {
                    "name": "FCF (מיליון ₪)",
                    "value": "15"
                }
            ]
        },
        "historicalData": [
            {
                "year": "year-4",
                "revenue": 30,
                "fcf": -5
            },
            {
                "year": "year-3",
                "revenue": 60,
                "fcf": 2
            },
            {
                "year": "year-2",
                "revenue": 120,
                "fcf": 10
            },
            {
                "year": "year-1",
                "revenue": 200,
                "fcf": 18
            },
            {
                "year": "year-0",
                "revenue": 300,
                "fcf": 15
            }
        ],
        "projectedData": [
            {
                "year": "year+1",
                "revenue": 400,
                "fcf": 10
            },
            {
                "year": "year+2",
                "revenue": 500,
                "fcf": 5
            }
        ],
        "correctDecision": "pass",
        "pointValue": 200,
        "hints": [
            {
                "cost": 0.5,
                "text": "הכנסות גדלות אבל FCF יורד — למה?"
            }
        ],
        "feedback": {
            "principle": {
                "id": "circle-of-competence",
                "name": "מעגל כשירות"
            },
            "decisiveSignals": [
                "P/E 40",
                "חובות אבודים עולים",
                "FCF יורד למרות צמיחה"
            ],
            "correctExplanation": "נכון! צמיחה מרשימה אבל חובות אבודים עולים = הסיכון גדל עם הגודל.",
            "incorrectExplanation": "טעות! P/E 40 + חובות אבודים גדלים + FCF יורד = צמיחה לא בריאה."
        },
        "isGoodValue": false,
        "difficulty": "hard",
        "difficultyValue": 3,
        "hint": "הכנסות גדלות אבל FCF יורד — למה?",
        "chartType": "annual"
    },
    {
        "id": "veterinary-chain-01",
        "name": "וט-קייר שירותים",
        "sector": "בריאות",
        "symbol": "VTCR",
        "price": 92,
        "tier": 3,
        "description": "רשת 30 מרפאות וטרינריות. שוק חיות המחמד צומח 8% בשנה.",
        "management": "מנכ\"ל וטרינר לשעבר. אסטרטגיית roll-up — רוכש מרפאות עצמאיות.",
        "moat": "נאמנות בעלי חיות לוטרינר, נוחות גאוגרפית, מכירות חוזרות.",
        "events": "רכישת 5 מרפאות בשנה האחרונה. השקת חנות מקוונת לציוד לחיות מחמד.",
        "metrics": {
            "basic": [
                {
                    "name": "P/E",
                    "value": "17"
                },
                {
                    "name": "ROE",
                    "value": "19%"
                },
                {
                    "name": "צמיחת הכנסות",
                    "value": "20%"
                }
            ],
            "advanced": [
                {
                    "name": "ROIC",
                    "value": "15%"
                },
                {
                    "name": "FCF (מיליון ₪)",
                    "value": "48"
                },
                {
                    "name": "הכנסה חוזרת",
                    "value": "72%"
                }
            ]
        },
        "historicalData": [
            {
                "year": "year-4",
                "revenue": 120,
                "fcf": 18
            },
            {
                "year": "year-3",
                "revenue": 150,
                "fcf": 22
            },
            {
                "year": "year-2",
                "revenue": 190,
                "fcf": 30
            },
            {
                "year": "year-1",
                "revenue": 240,
                "fcf": 38
            },
            {
                "year": "year-0",
                "revenue": 300,
                "fcf": 48
            }
        ],
        "projectedData": [
            {
                "year": "year+1",
                "revenue": 360,
                "fcf": 58
            },
            {
                "year": "year+2",
                "revenue": 430,
                "fcf": 70
            }
        ],
        "correctDecision": "buy",
        "pointValue": 200,
        "hints": [
            {
                "cost": 0.5,
                "text": "בדקו את איכות הצמיחה — האם היא מלווה בשימור לקוחות ורווחיות?"
            }
        ],
        "feedback": {
            "principle": {
                "id": "moat",
                "name": "חפיר כלכלי"
            },
            "decisiveSignals": [
                "72% הכנסה חוזרת",
                "שוק צומח 8%",
                "אסטרטגיית roll-up מוצלחת"
            ],
            "correctExplanation": "מצוין! שוק חיות מחמד צומח + הכנסות חוזרות + roll-up = צמיחה רווחית.",
            "incorrectExplanation": "פספוס! שוק צומח עם הכנסות חוזרות ו-ROIC טוב — השקעה מצוינת."
        },
        "isGoodValue": true,
        "difficulty": "hard",
        "difficultyValue": 3,
        "hint": "בדקו את איכות הצמיחה — האם היא מלווה בשימור לקוחות ורווחיות?",
        "chartType": "annual"
    },
    {
        "id": "textile-legacy-01",
        "name": "טקסטיל הגליל בע\"מ",
        "sector": "טקסטיל",
        "symbol": "TXGL",
        "price": 12,
        "tier": 3,
        "description": "מפעל טקסטיל ותיק. המחירים נשחקים מייבוא זול מאסיה. מפעל ישן ובלתי-יעיל.",
        "management": "מנכ\"ל שמגן על המצב הקיים. אין השקעה בחדשנות או מודרניזציה.",
        "moat": "אין. תחרות עזה מייבוא. עלויות עבודה בישראל גבוהות.",
        "events": "סגירת קו ייצור, פיטורי 50 עובדים, ירידה נוספת ברווחים.",
        "metrics": {
            "basic": [
                {
                    "name": "P/E",
                    "value": "4"
                },
                {
                    "name": "ROE",
                    "value": "3%"
                },
                {
                    "name": "תשואת דיבידנד",
                    "value": "9%"
                }
            ],
            "advanced": [
                {
                    "name": "ROIC",
                    "value": "2%"
                },
                {
                    "name": "FCF (מיליון ₪)",
                    "value": "8"
                },
                {
                    "name": "ירידת הכנסות",
                    "value": "12% שנתי"
                }
            ]
        },
        "historicalData": [
            {
                "year": "year-4",
                "revenue": 200,
                "fcf": 18
            },
            {
                "year": "year-3",
                "revenue": 170,
                "fcf": 14
            },
            {
                "year": "year-2",
                "revenue": 150,
                "fcf": 12
            },
            {
                "year": "year-1",
                "revenue": 130,
                "fcf": 10
            },
            {
                "year": "year-0",
                "revenue": 115,
                "fcf": 8
            }
        ],
        "projectedData": [
            {
                "year": "year+1",
                "revenue": 100,
                "fcf": 5
            },
            {
                "year": "year+2",
                "revenue": 85,
                "fcf": 2
            }
        ],
        "correctDecision": "pass",
        "pointValue": 200,
        "hints": [
            {
                "cost": 0.5,
                "text": "P/E של 4 ודיבידנד 9% — אבל מה קורה ל-FCF?"
            }
        ],
        "feedback": {
            "principle": {
                "id": "value-trap",
                "name": "מלכודת ערך"
            },
            "decisiveSignals": [
                "ROIC 2%",
                "הכנסות יורדות 12% שנתי",
                "אין חפיר נגד ייבוא"
            ],
            "correctExplanation": "נכון! P/E ודיבידנד מטעים — הדיבידנד ייחתך כש-FCF ממשיך לרדת.",
            "incorrectExplanation": "טעות! מלכודת ערך קלאסית — מספרים 'זולים' מסתירים עסק גוסס."
        },
        "isGoodValue": false,
        "difficulty": "hard",
        "difficultyValue": 3,
        "hint": "P/E של 4 ודיבידנד 9% — אבל מה קורה ל-FCF?",
        "chartType": "annual"
    },
    {
        "id": "data-center-01",
        "name": "ענן-מגה תשתיות",
        "sector": "טכנולוגיה",
        "symbol": "ANMG",
        "price": 155,
        "tier": 3,
        "description": "מפעילת 3 מרכזי מידע בישראל. מספקת שירותי hosting וענן לחברות גדולות.",
        "management": "מנכ\"ל מנוסה מתחום התשתיות. אסטרטגיית הרחבה שקולה.",
        "moat": "עלויות מעבר גבוהות, חוזי SLA רב-שנתיים, השקעת הון ראשונית כבדה של מתחרים.",
        "events": "חתימה על חוזה 7 שנים עם בנק גדול. בניית מרכז מידע רביעי.",
        "metrics": {
            "basic": [
                {
                    "name": "P/E",
                    "value": "19"
                },
                {
                    "name": "ROE",
                    "value": "16%"
                },
                {
                    "name": "צמיחת הכנסות",
                    "value": "14%"
                }
            ],
            "advanced": [
                {
                    "name": "ROIC",
                    "value": "13%"
                },
                {
                    "name": "FCF (מיליון ₪)",
                    "value": "68"
                },
                {
                    "name": "אורך חוזה ממוצע",
                    "value": "5.2 שנים"
                }
            ]
        },
        "historicalData": [
            {
                "year": "year-4",
                "revenue": 280,
                "fcf": 35
            },
            {
                "year": "year-3",
                "revenue": 310,
                "fcf": 40
            },
            {
                "year": "year-2",
                "revenue": 350,
                "fcf": 48
            },
            {
                "year": "year-1",
                "revenue": 400,
                "fcf": 58
            },
            {
                "year": "year-0",
                "revenue": 460,
                "fcf": 68
            }
        ],
        "projectedData": [
            {
                "year": "year+1",
                "revenue": 520,
                "fcf": 78
            },
            {
                "year": "year+2",
                "revenue": 590,
                "fcf": 90
            }
        ],
        "correctDecision": "buy",
        "pointValue": 200,
        "hints": [
            {
                "cost": 0.5,
                "text": "בדקו את אורך החוזים הממוצע — ומה זה אומר על חסם הכניסה."
            }
        ],
        "feedback": {
            "principle": {
                "id": "owner-earnings",
                "name": "רווחי בעלים"
            },
            "decisiveSignals": [
                "חוזי 5+ שנים",
                "עלויות מעבר כבדות",
                "FCF צומח בעקביות"
            ],
            "correctExplanation": "מצוין! מרכזי מידע עם לקוחות 'נעולים' — הכנסות צפויות לשנים.",
            "incorrectExplanation": "פספוס! תשתיות ענן עם חוזים ארוכים — עסק עם ודאות גבוהה."
        },
        "isGoodValue": true,
        "difficulty": "hard",
        "difficultyValue": 3,
        "hint": "בדקו את אורך החוזים הממוצע — ומה זה אומר על חסם הכניסה.",
        "chartType": "annual"
    },
    {
        "id": "coworking-space-01",
        "name": "ספייס-פלוס בע\"מ",
        "sector": "נדל\"ן",
        "symbol": "SPPL",
        "price": 35,
        "tier": 3,
        "description": "רשת חללי עבודה משותפים עם 15 מתחמים. חוזי שכירות ארוכים, השכרה לחודש.",
        "management": "מנכ\"ל מעולם הנדל\"ן. צמיחה אגרסיבית ממונפת בחוב.",
        "moat": "אין — תחרות עזה. WeWork נכשלה באותו מודל. שוכרים עוזבים בקלות.",
        "events": "תפוסה ירדה ל-65%. חוזה שכירות ארוך על מתחם שעומד ריק. חוב כבד.",
        "metrics": {
            "basic": [
                {
                    "name": "P/E",
                    "value": "N/A (הפסדי)"
                },
                {
                    "name": "ROE",
                    "value": "-20%"
                },
                {
                    "name": "תשואת דיבידנד",
                    "value": "0%"
                }
            ],
            "advanced": [
                {
                    "name": "ROIC",
                    "value": "-8%"
                },
                {
                    "name": "FCF (מיליון ₪)",
                    "value": "-45"
                },
                {
                    "name": "חוב/הון",
                    "value": "5.5"
                }
            ]
        },
        "historicalData": [
            {
                "year": "year-4",
                "revenue": 80,
                "fcf": 5
            },
            {
                "year": "year-3",
                "revenue": 50,
                "fcf": -30
            },
            {
                "year": "year-2",
                "revenue": 70,
                "fcf": -20
            },
            {
                "year": "year-1",
                "revenue": 110,
                "fcf": -10
            },
            {
                "year": "year-0",
                "revenue": 120,
                "fcf": -45
            }
        ],
        "projectedData": [
            {
                "year": "year+1",
                "revenue": 100,
                "fcf": -55
            },
            {
                "year": "year+2",
                "revenue": 90,
                "fcf": -50
            }
        ],
        "correctDecision": "pass",
        "pointValue": 200,
        "hints": [
            {
                "cost": 0.5,
                "text": "חוב/הון 5.5 עם FCF שלילי — כמה זמן החברה יכולה להחזיק?"
            }
        ],
        "feedback": {
            "principle": {
                "id": "leverage-risk",
                "name": "סיכון מינוף"
            },
            "decisiveSignals": [
                "חוב/הון 5.5",
                "FCF שלילי -45M",
                "תפוסה 65% בלבד"
            ],
            "correctExplanation": "נכון! מודל WeWork — שכירות ארוכה, השכרה קצרה, חוב כבד = אסון.",
            "incorrectExplanation": "טעות! חוב 5.5x הון עם FCF שלילי — החברה בסכנת פשיטת רגל."
        },
        "isGoodValue": false,
        "difficulty": "hard",
        "difficultyValue": 3,
        "hint": "חוב/הון 5.5 עם FCF שלילי — כמה זמן החברה יכולה להחזיק?",
        "chartType": "annual"
    },
    {
        "id": "pet-food-01",
        "name": "טעם-פט מזון לחיות",
        "sector": "מזון",
        "symbol": "TMPT",
        "price": 68,
        "tier": 3,
        "description": "יצרנית מזון לחיות מחמד מובילה בישראל. מותג מס' 1 בקטגוריה.",
        "management": "מנכ\"ל עם 25 שנות ניסיון. מדיניות דיבידנד עקבית ומגדילה.",
        "moat": "מותג מס' 1, נאמנות בעלי חיות גבוהה, הפצה ב-95% מנקודות המכירה.",
        "events": "השקת קו מזון פרימיום, יצוא לאירופה, שוק חיות מחמד צומח.",
        "metrics": {
            "basic": [
                {
                    "name": "P/E",
                    "value": "16"
                },
                {
                    "name": "ROE",
                    "value": "26%"
                },
                {
                    "name": "צמיחת הכנסות",
                    "value": "11%"
                }
            ],
            "advanced": [
                {
                    "name": "ROIC",
                    "value": "23%"
                },
                {
                    "name": "FCF (מיליון ₪)",
                    "value": "55"
                },
                {
                    "name": "נתח שוק",
                    "value": "35%"
                }
            ]
        },
        "historicalData": [
            {
                "year": "year-4",
                "revenue": 200,
                "fcf": 30
            },
            {
                "year": "year-3",
                "revenue": 225,
                "fcf": 35
            },
            {
                "year": "year-2",
                "revenue": 255,
                "fcf": 40
            },
            {
                "year": "year-1",
                "revenue": 285,
                "fcf": 48
            },
            {
                "year": "year-0",
                "revenue": 320,
                "fcf": 55
            }
        ],
        "projectedData": [
            {
                "year": "year+1",
                "revenue": 355,
                "fcf": 62
            },
            {
                "year": "year+2",
                "revenue": 395,
                "fcf": 70
            }
        ],
        "correctDecision": "buy",
        "pointValue": 200,
        "hints": [
            {
                "cost": 0.5,
                "text": "בדקו מה מגן על נתח השוק — ואם הרווחיות מצדיקה את המחיר."
            }
        ],
        "feedback": {
            "principle": {
                "id": "moat",
                "name": "חפיר כלכלי"
            },
            "decisiveSignals": [
                "מותג מס' 1",
                "ROIC 23%",
                "שוק צומח + נאמנות גבוהה"
            ],
            "correctExplanation": "מצוין! מותג מוביל בשוק צומח עם ROIC מעולה — סגנון באפט מובהק.",
            "incorrectExplanation": "פספוס! מותג מס' 1 בשוק צומח עם רווחיות גבוהה — השקעת ערך מעולה."
        },
        "isGoodValue": true,
        "difficulty": "hard",
        "difficultyValue": 3,
        "hint": "בדקו מה מגן על נתח השוק — ואם הרווחיות מצדיקה את המחיר.",
        "chartType": "annual"
    },
    {
        "id": "cyclical-advanced-h01",
        "name": "אוניברסל מתכות בע\"מ",
        "sector": "מתכות מיוחדות",
        "symbol": "UNVM",
        "price": 74,
        "tier": 3,
        "chartType": "annual",
        "description": "יצרנית מתכות מיוחדות לתעשייה האווירית. P/E 28 על רווחי שפל, נראה יקר. אבל: 70% מההכנסות מחוזי אספקה ל-7 שנים עם יצרני מטוסים, backlog שיא, ובעלי מפעל מודרני שהמתחרים לא יכולים לשכפל.",
        "management": "מנכ\"ל מהנדס שמתמקד בחוזים ארוכי טווח. 12% אחזקה. סירב להצעת רכישה.",
        "moat": "מפעל ייחודי, תעודות אישור תעופתיות (FAA), חוזים ארוכי טווח, ומוניטין בתעשייה.",
        "events": "backlog שיא של ₪800M. חוזה חדש עם Boeing. אבל: הרווחים ברבעון האחרון ירדו 15% בגלל עלויות אנרגיה.",
        "metrics": {
            "basic": [
                {
                    "name": "P/E",
                    "value": "28 (על רווחי שפל)"
                },
                {
                    "name": "ROE",
                    "value": "8%"
                },
                {
                    "name": "צמיחת הכנסות",
                    "value": "-12%"
                }
            ],
            "advanced": [
                {
                    "name": "P/E מנורמל",
                    "value": "11"
                },
                {
                    "name": "FCF (מיליון ₪)",
                    "value": "18"
                },
                {
                    "name": "Backlog",
                    "value": "₪800M (4.5 שנות הכנסה)"
                }
            ]
        },
        "historicalData": [
            {
                "year": "year-4",
                "revenue": 220,
                "fcf": 42
            },
            {
                "year": "year-3",
                "revenue": 245,
                "fcf": 48
            },
            {
                "year": "year-2",
                "revenue": 210,
                "fcf": 30
            },
            {
                "year": "year-1",
                "revenue": 190,
                "fcf": 22
            },
            {
                "year": "year-0",
                "revenue": 178,
                "fcf": 18
            }
        ],
        "projectedData": [
            {
                "year": "year+1",
                "revenue": 195,
                "fcf": 28
            },
            {
                "year": "year+2",
                "revenue": 230,
                "fcf": 40
            }
        ],
        "correctDecision": "buy",
        "pointValue": 200,
        "hints": [
            {
                "cost": 0.5,
                "text": "Backlog של 4.5 שנות הכנסה = נראות קדימה שאין לאף חברה מחזורית אחרת."
            }
        ],
        "feedback": {
            "principle": {
                "id": "cyclical-trap",
                "name": "מלכודת מחזוריות"
            },
            "decisiveSignals": [
                "P/E מנורמל 11",
                "backlog 4.5 שנים",
                "חפיר תעופתי (FAA)"
            ],
            "correctExplanation": "מצוין! כאן המחזוריות מטעה — הרווחים נמוכים, P/E גבוה, אבל backlog ₪800M מבטיח התאוששות. בנוסף, אישורי FAA = חפיר שמתחרים לא יכולים לחצות. P/E מנורמל 11 = זול.",
            "incorrectExplanation": "טעות! P/E 28 והכנסות יורדות 12% — נראה נורא. אבל backlog 4.5 שנים אומר שההכנסות יחזרו, וחפיר FAA מגן על הרווחיות לטווח ארוך.",
            "counterSignalExplanation": "הצד השני יטען: P/E 28 יקר, הכנסות יורדות 12%, FCF ₪18M חלש, ועלויות אנרגיה עולות. ענף התעופה עצמו מחזורי ויכול להישאר חלש שנים. Backlog יכול להתבטל."
        },
        "workedExample": "1) P/E 28, הכנסות -12% — נראה רע. 2) אבל: P/E מנורמל (על רווחים ממוצעי מחזור) = 11 = זול. 3) Backlog ₪800M = 4.5 שנות הכנסה = נראות יוצאת דופן. 4) חפיר FAA = מתחרים צריכים שנים לקבל אישורים. 5) מנכ\"ל עם 12% אחזקה שסירב להצעת רכישה = מאמין. 6) הסיכון: עלויות אנרגיה + עיכוב מחזורי. 7) מסקנה: backlog + חפיר = קנייה בשפל.",
        "reasoningOptions": [
            {
                "text": "Backlog 4.5 שנים + חפיר FAA = הכנסות מובטחות לטווח ארוך",
                "correct": true
            },
            {
                "text": "P/E מנורמל 11 = זול ביחס לממוצע מחזורי",
                "correct": true
            },
            {
                "text": "P/E 28 = יקר מדי לחברה תעשייתית",
                "correct": false,
                "biasTag": "עיגון על P/E נקודתי"
            },
            {
                "text": "הכנסות יורדות 12% = עסק בדעיכה",
                "correct": false,
                "biasTag": "טעות מחזוריות"
            },
            {
                "text": "מנכ\"ל עם 12% אחזקה = skin in the game",
                "correct": true
            },
            {
                "text": "עלויות אנרגיה עולות = המרווחים ימשיכו להישחק",
                "correct": false,
                "biasTag": "הטיית עדכניות"
            }
        ],
        "isGoodValue": true,
        "difficulty": "hard",
        "difficultyValue": 3,
        "hint": "Backlog של 4.5 שנות הכנסה = נראות קדימה שאין לאף חברה מחזורית אחרת."
    },
    {
        "id": "turnaround-fake-h01",
        "name": "רשת נוף הגולן בע\"מ",
        "sector": "מלונאות",
        "symbol": "NOFG",
        "price": 55,
        "tier": 3,
        "chartType": "quarterly",
        "description": "רשת מלונות בצפון שנפגעה קשה מהמלחמה ונכנסה לשיקום. הרבעון האחרון מראה שיפור דרמטי — תפוסה עלתה מ-35% ל-68%. אבל: השיפור בא מהנחות של 40% על המחיר, החוב עצום, ו-3 מלונות דורשים שיפוץ כבד.",
        "management": "מנכ\"ל חדש שהגיע מענף אחר. מתמקד ב-marketing ולא בתפעול.",
        "moat": "מיקומים יפים אבל נגישים למתחרים. ציוד מיושן.",
        "events": "תפוסה עלתה דרמטית אבל ב-40% הנחה. ביקורות אורחים ירדו מ-4.2 ל-3.4 כוכבים.",
        "metrics": {
            "basic": [
                {
                    "name": "P/E",
                    "value": "שלילי"
                },
                {
                    "name": "ROE",
                    "value": "-8%"
                },
                {
                    "name": "RevPAR",
                    "value": "₪280 (ממוצע ענפי: ₪420)"
                }
            ],
            "advanced": [
                {
                    "name": "תפוסה",
                    "value": "68% (עלתה מ-35%)"
                },
                {
                    "name": "FCF (מיליון ₪)",
                    "value": "-18"
                },
                {
                    "name": "חוב/הון",
                    "value": "3.2"
                }
            ]
        },
        "quarterlyData": [
            {
                "quarter": "Q3 year-1",
                "revenue": 22,
                "fcf": -8
            },
            {
                "quarter": "Q4 year-1",
                "revenue": 18,
                "fcf": -10
            },
            {
                "quarter": "Q1 year-0",
                "revenue": 15,
                "fcf": -12
            },
            {
                "quarter": "Q2 year-0",
                "revenue": 25,
                "fcf": -6
            },
            {
                "quarter": "Q3 year-0",
                "revenue": 38,
                "fcf": -2
            }
        ],
        "projectedData": [
            {
                "year": "year+1",
                "revenue": 120,
                "fcf": -15
            },
            {
                "year": "year+2",
                "revenue": 135,
                "fcf": -8
            }
        ],
        "correctDecision": "pass",
        "pointValue": 200,
        "hints": [
            {
                "cost": 0.5,
                "text": "תפוסה של 68% מרשימה — אבל ב-RevPAR ₪280 מול ₪420 ענפי, כמה מהתפוסה רווחית?"
            }
        ],
        "feedback": {
            "principle": {
                "id": "turnaround",
                "name": "שיקום"
            },
            "decisiveSignals": [
                "הנחות 40% = תפוסה לא-רווחית",
                "RevPAR 33% מתחת לממוצע",
                "חוב/הון 3.2 = סיכון קיומי"
            ],
            "correctExplanation": "נכון! השיקום 'המדהים' הוא אשליה — תפוסה שנבנית על הנחות 40% לא רווחית ולא בת-קיימא. RevPAR ₪280 מול ₪420 ענפי = כל חדר שנמכר מפסיד. וביקורות שיורדות = חוויה גרועה = הלקוחות לא יחזרו.",
            "incorrectExplanation": "טעות! תפוסה שקפצה מ-35% ל-68% מסנוורת, אבל שאלו: באיזה מחיר? 40% הנחה = הכנסה לחדר נמוכה מעלות התפעול. זה לא שיקום — זה סבסוד.",
            "counterSignalExplanation": "הצד השני יטען: תפוסה קפצה מ-35% ל-68% — השיקום עובד! ברגע שהמותג ישתקם, אפשר לעלות מחירים. מלונות בגולן = נכסים ייחודיים שקשה לשכפל."
        },
        "workedExample": "1) תפוסה 35% → 68% — מרשים! אבל... 2) בדיקה: ההנחה 40% = RevPAR ₪280 מול ₪420. 3) חישוב: RevPAR 33% מתחת = סביר שכל חדר בהפסד תפעולי. 4) ביקורות: 4.2 → 3.4 = איכות ירדה = לקוחות לא יחזרו במחיר מלא. 5) חוב/הון 3.2 = אין מרחב לטעות. 6) מנכ\"ל מ-marketing, לא מלונאות = חסר ניסיון ספציפי. 7) מסקנה: שיקום מדומה — תפוסה על חשבון רווחיות. העל.",
        "reasoningOptions": [
            {
                "text": "RevPAR 33% מתחת לממוצע = תפוסה לא-רווחית",
                "correct": true
            },
            {
                "text": "חוב/הון 3.2 = סיכון קיומי אם השיקום נכשל",
                "correct": true
            },
            {
                "text": "תפוסה עלתה מ-35% ל-68% = השיקום מצליח",
                "correct": false,
                "biasTag": "הטיית אישור"
            },
            {
                "text": "ביקורות ירדו = חוויה גרועה = לקוחות לא יחזרו",
                "correct": true
            },
            {
                "text": "מלונות בגולן = נכסי נדל\"ן ייחודיים",
                "correct": false,
                "biasTag": "עיגון על נכסים"
            },
            {
                "text": "מנכ\"ל חדש = רוח חדשה = תקווה",
                "correct": false,
                "biasTag": "הטיית אופטימיות"
            }
        ],
        "isGoodValue": false,
        "difficulty": "hard",
        "difficultyValue": 3,
        "hint": "תפוסה של 68% מרשימה — אבל ב-RevPAR ₪280 מול ₪420 ענפי, כמה מהתפוסה רווחית?"
    },
    {
        "id": "dividend-complex-h01",
        "name": "נכסי עזריאלי הנגב בע\"מ",
        "sector": "נדל\"ן מניב",
        "symbol": "NKAZ",
        "price": 140,
        "tier": 3,
        "chartType": "segments",
        "description": "חברת נדל\"ן מניב עם דיבידנד 7% ורקורד של 15 שנות חלוקה. אבל: 40% מהשטחים מושכרים לשוכר עוגן אחד שחוזהו פג בעוד 18 חודשים, והוא פרסם שמחפש מיקום זול יותר. יחס כיסוי ריבית 1.8x בלבד.",
        "management": "הנהלה ותיקה שגאה ברקורד הדיבידנד. 'לא ניגע בדיבידנד' = הבטחה מסוכנת.",
        "moat": "מיקום טוב, אבל תלות בשוכר אחד = פגיעות.",
        "events": "שוכר עוגן (40% מההכנסות) מחפש מיקום זול יותר. חוזה פג בעוד 18 חודש.",
        "metrics": {
            "basic": [
                {
                    "name": "P/FFO",
                    "value": "9"
                },
                {
                    "name": "ROE",
                    "value": "14%"
                },
                {
                    "name": "תשואת דיבידנד",
                    "value": "7%"
                }
            ],
            "advanced": [
                {
                    "name": "יחס כיסוי ריבית",
                    "value": "1.8x"
                },
                {
                    "name": "FCF (מיליון ₪)",
                    "value": "52"
                },
                {
                    "name": "ריכוז שוכרים",
                    "value": "40% שוכר אחד"
                }
            ]
        },
        "segmentData": [
            {
                "name": "שוכר עוגן (חוזה פג 18m)",
                "revenue": 85,
                "margin": "45%",
                "growth": "0%"
            },
            {
                "name": "שוכרי משרדים (5+ חוזים)",
                "revenue": 65,
                "margin": "38%",
                "growth": "+3%"
            },
            {
                "name": "מסחרי קמעונאי",
                "revenue": 60,
                "margin": "32%",
                "growth": "-2%"
            }
        ],
        "projectedData": [
            {
                "year": "year+1",
                "revenue": 210,
                "fcf": 50
            },
            {
                "year": "year+2",
                "revenue": 160,
                "fcf": 22
            }
        ],
        "correctDecision": "pass",
        "pointValue": 200,
        "hints": [
            {
                "cost": 0.5,
                "text": "מה קורה ל-FCF, לדיבידנד, וליחס הכיסוי אם שוכר של 40% עוזב?"
            }
        ],
        "feedback": {
            "principle": {
                "id": "dividend-sustainability",
                "name": "קיימות דיבידנד"
            },
            "decisiveSignals": [
                "40% תלות בשוכר אחד שמחפש חלופה",
                "יחס כיסוי 1.8x = דק מדי",
                "דיבידנד ייחתך בעזיבה"
            ],
            "correctExplanation": "נכון! דיבידנד 7% ו-15 שנות רקורד מרשימים — אבל 40% תלות בשוכר שמחפש מקום אחר = מצב 'לפני הצוק'. עם יחס כיסוי 1.8x, איבוד השוכר = חיתוך דיבידנד מיידי.",
            "incorrectExplanation": "טעות! 15 שנות דיבידנד בנו אמון — וזו בדיוק הבעיה. הרקורד יצר הטיית עיגון. כש-40% מההכנסות בסיכון ויחס הכיסוי 1.8x, הדיבידנד תלוי בשוכר אחד.",
            "counterSignalExplanation": "הצד השני יטען: P/FFO 9 זול, 15 שנות דיבידנד = רקורד מוכח. ההנהלה תמצא שוכר חלופי, ואולי השוכר הנוכחי ישאר. מיקום טוב מושך שוכרים."
        },
        "workedExample": "1) דיבידנד 7%, P/FFO 9, 15 שנות רקורד — מפתה. 2) בדיקת סיכון: 40% מההכנסות = שוכר אחד שמחפש חלופה. 3) תרחיש עזיבה: הכנסות ירדו ~40% → FCF ירד מ-₪52M ל-~₪22M. 4) יחס כיסוי: 1.8x → ~1.1x = על הגבול. 5) דיבידנד: ₪52M × 70% יחס חלוקה = חייבים לחתוך ל-~₪15M. 6) מסקנה: דיבידנד תלוי בגורם אחד = לא בר-קיימא. העל.",
        "reasoningOptions": [
            {
                "text": "40% תלות בשוכר שעוזב = FCF ייחתך בעזיבה",
                "correct": true
            },
            {
                "text": "יחס כיסוי 1.8x לא ישרוד ירידה של 40% בהכנסות",
                "correct": true
            },
            {
                "text": "15 שנות דיבידנד = הוכחה שההנהלה מחויבת",
                "correct": false,
                "biasTag": "הטיית עיגון"
            },
            {
                "text": "P/FFO 9 = זול מאוד לנדל\"ן מניב",
                "correct": false,
                "biasTag": "עיגון על מכפיל"
            },
            {
                "text": "ההנהלה תמצא שוכר חלופי בקלות",
                "correct": false,
                "biasTag": "הטיית אופטימיות"
            },
            {
                "text": "סגמנט משרדים + קמעונאות לא מספיק לכסות חוב",
                "correct": true
            }
        ],
        "isGoodValue": false,
        "difficulty": "hard",
        "difficultyValue": 3,
        "hint": "מה קורה ל-FCF, לדיבידנד, וליחס הכיסוי אם שוכר של 40% עוזב?"
    },
    {
        "id": "moat-erosion-h01",
        "name": "פארם-ישראל תרופות בע\"מ",
        "sector": "פארמה גנרית",
        "symbol": "FRMI",
        "price": 95,
        "tier": 3,
        "chartType": "annual",
        "description": "יצרנית תרופות גנריות שהייתה מובילה עם מרווחים גבוהים. בשלוש שנים האחרונות, יצרנים הודיים נכנסו לשוק שלה עם מחירים נמוכים ב-40%. ההכנסות עדיין גדלות (3%) אבל המרווח הגולמי ירד מ-55% ל-38% וממשיך לרדת.",
        "management": "מנכ\"ל ותיק שמתעקש 'לא נוריד מחירים — אנחנו מותג'. לא משנה אסטרטגיה.",
        "moat": "מותג חזק בישראל ורישיונות FDA, אבל בגנריות המותג פחות חשוב — המחיר קובע.",
        "events": "2 לקוחות גדולים עברו ליצרן הודי. המרווח הגולמי ירד לרבעון חמישי ברציפות.",
        "metrics": {
            "basic": [
                {
                    "name": "P/E",
                    "value": "14"
                },
                {
                    "name": "ROE",
                    "value": "16%"
                },
                {
                    "name": "צמיחת הכנסות",
                    "value": "+3%"
                }
            ],
            "advanced": [
                {
                    "name": "ROIC",
                    "value": "13%"
                },
                {
                    "name": "FCF (מיליון ₪)",
                    "value": "48"
                },
                {
                    "name": "מרווח גולמי (מגמה)",
                    "value": "55% → 38% (5 שנים)"
                }
            ]
        },
        "historicalData": [
            {
                "year": "year-4",
                "revenue": 520,
                "fcf": 72
            },
            {
                "year": "year-3",
                "revenue": 535,
                "fcf": 65
            },
            {
                "year": "year-2",
                "revenue": 540,
                "fcf": 58
            },
            {
                "year": "year-1",
                "revenue": 548,
                "fcf": 52
            },
            {
                "year": "year-0",
                "revenue": 555,
                "fcf": 48
            }
        ],
        "projectedData": [
            {
                "year": "year+1",
                "revenue": 560,
                "fcf": 40
            },
            {
                "year": "year+2",
                "revenue": 555,
                "fcf": 32
            }
        ],
        "correctDecision": "pass",
        "pointValue": 200,
        "hints": [
            {
                "cost": 0.5,
                "text": "ההכנסות גדלות 3%, אבל ה-FCF ירד 33% בארבע שנים. מה קורה בין השורות?"
            }
        ],
        "feedback": {
            "principle": {
                "id": "moat",
                "name": "חפיר כלכלי"
            },
            "decisiveSignals": [
                "מרווח גולמי 55% → 38% = חפיר נשחק",
                "מתחרים ב-40% פחות",
                "הנהלה לא מסתגלת"
            ],
            "correctExplanation": "נכון! ההכנסות מסוות את הבעיה — הן גדלות רק כי הנפח עולה, אבל הרווח על כל יחידה קורס. מרווח גולמי שיורד 17 נקודות ב-5 שנים = חפיר שנשחק. כשמגנריות מתחרות על מחיר, המותג לא מגן.",
            "incorrectExplanation": "טעות! P/E 14, ROE 16%, FCF חיובי — הכל נראה טוב. אבל מגמת המרווח הגולמי מספרת סיפור אחר. כשהחפיר נשחק, כל המספרים 'הטובים' יתדרדרו בעקבותיו.",
            "counterSignalExplanation": "הצד השני יטען: P/E 14 סביר, ROIC 13% מכובד, הכנסות עדיין גדלות, ורישיונות FDA הם חפיר רגולטורי. אולי ההנהלה תשנה אסטרטגיה בלחץ."
        },
        "workedExample": "1) הכנסות +3% — נראה טוב. 2) אבל FCF ירד מ-₪72M ל-₪48M = -33%. 3) הסיבה: מרווח גולמי 55% → 38% = כל שקל מכירה מרוויח פחות. 4) למה? מתחרים הודיים ב-40% פחות = לחץ מחירים. 5) הנהלה: מסרבת לשנות = תמשיך לאבד. 6) P/E 14 מטעה — הרווחים עצמם יורדים. 7) מסקנה: חפיר נשחק = העל.",
        "reasoningOptions": [
            {
                "text": "מרווח גולמי 55%→38% = חפיר נשחק בקצב מדאיג",
                "correct": true
            },
            {
                "text": "הנהלה שמסרבת להסתגל = תמשיך לאבד נתח שוק",
                "correct": true
            },
            {
                "text": "P/E 14 = מחיר סביר לחברת פארמה",
                "correct": false,
                "biasTag": "עיגון על מכפיל נקודתי"
            },
            {
                "text": "FCF חיובי + הכנסות גדלות = החברה בסדר",
                "correct": false,
                "biasTag": "התעלמות ממגמה"
            },
            {
                "text": "ROIC 13% יורד ויגיע ל-8% בעוד שנתיים בקצב הזה",
                "correct": true
            },
            {
                "text": "רישיונות FDA = חפיר רגולטורי שמגן",
                "correct": false,
                "biasTag": "הערכת יתר של חפיר חלקי"
            }
        ],
        "isGoodValue": false,
        "difficulty": "hard",
        "difficultyValue": 3,
        "hint": "ההכנסות גדלות 3%, אבל ה-FCF ירד 33% בארבע שנים. מה קורה בין השורות?"
    },
    {
        "id": "deep-value-h01",
        "name": "אלון תעשיות מזון בע\"מ",
        "sector": "מזון ומשקאות",
        "symbol": "ALNT",
        "price": 45,
        "tier": 3,
        "chartType": "annual",
        "description": "יצרנית מזון מעובד עם P/E 6, דיבידנד 7%, ו-FCF יציב 10 שנים. השוק מתעלם ממנה כי אין 'סיפור צמיחה'. ROIC 18% עקבי, רכישה עצמית של 3% מהמניות בשנה, ומשפחה מייסדת עם 45% אחזקה.",
        "management": "משפחה מייסדת בדור שני. 45% אחזקה. משכורות צנועות. רוכשים מניות עצמית בעקביות.",
        "moat": "מותגים מוכרים בישראל (30+ שנה), נתח מדף קבוע ברשתות, עלות מעבר צרכנית (הרגל).",
        "events": "שום דבר מרגש. רכישה עצמית שקטה. אנליסטים לא מכסים — 'לא מעניין'. מחזור מסחר נמוך.",
        "metrics": {
            "basic": [
                {
                    "name": "P/E",
                    "value": "6"
                },
                {
                    "name": "ROE",
                    "value": "20%"
                },
                {
                    "name": "תשואת דיבידנד",
                    "value": "7%"
                }
            ],
            "advanced": [
                {
                    "name": "ROIC",
                    "value": "18% (יציב 10 שנים)"
                },
                {
                    "name": "FCF (מיליון ₪)",
                    "value": "55"
                },
                {
                    "name": "רכישה עצמית",
                    "value": "3% מהמניות/שנה"
                }
            ]
        },
        "historicalData": [
            {
                "year": "year-4",
                "revenue": 410,
                "fcf": 50
            },
            {
                "year": "year-3",
                "revenue": 420,
                "fcf": 52
            },
            {
                "year": "year-2",
                "revenue": 415,
                "fcf": 48
            },
            {
                "year": "year-1",
                "revenue": 425,
                "fcf": 54
            },
            {
                "year": "year-0",
                "revenue": 430,
                "fcf": 55
            }
        ],
        "projectedData": [
            {
                "year": "year+1",
                "revenue": 435,
                "fcf": 56
            },
            {
                "year": "year+2",
                "revenue": 440,
                "fcf": 57
            }
        ],
        "correctDecision": "buy",
        "pointValue": 200,
        "hints": [
            {
                "cost": 0.5,
                "text": "ROIC 18% עקבי 10 שנים, רכישה עצמית 3% בשנה, משפחה עם 45% — נראה לכם כמו מלכודת?"
            }
        ],
        "feedback": {
            "principle": {
                "id": "value-trap",
                "name": "מלכודת ערך"
            },
            "decisiveSignals": [
                "ROIC 18% יציב 10 שנים",
                "רכישה עצמית 3%/שנה = הנהלה מאמינה",
                "FCF יציב ויחס חלוקה סביר"
            ],
            "correctExplanation": "מצוין! זו לא מלכודת ערך — זו השקעת ערך קלאסית. ROIC 18% עקבי, רכישה עצמית (=הנהלה מאמינה שהמניה זולה), FCF יציב, ומשפחה עם skin in the game. השוק מתעלם כי אין 'סיפור' — וזה בדיוק מה שיוצר את ההזדמנות.",
            "incorrectExplanation": "טעות! P/E 6 + דיבידנד 7% + 'אין צמיחה' הזכיר לך מלכודות ערך קודמות. אבל ההבדל: ROIC 18% עקבי, FCF יציב, ורכישה עצמית. מלכודת ערך = עסק שמתדרדר. כאן העסק מצוין — רק לא מרגש.",
            "counterSignalExplanation": "הצד השני יטען: צמיחה אפסית, שום מנוע צמיחה חדש, מחזור מסחר נמוך (קשה למכור), ואנליסטים לא מכסים = אולי יש סיבה שהשוק מתעלם."
        },
        "workedExample": "1) P/E 6, דיבידנד 7% — מלכודת ערך? נבדוק. 2) ROIC 18% × 10 שנים = עקביות יוצאת דופן. מלכודת ערך = ROIC יורד. כאן הוא יציב. 3) FCF: ₪48-55M, יציב = העסק מייצר מזומן אמיתי. 4) רכישה עצמית 3%/שנה = ההנהלה חושבת שהמניה זולה. 5) משפחה 45% = skin in the game. 6) למה זול? אין 'סיפור', אין אנליסטים, אין מחזור. 7) מסקנה: ערך אמיתי שהשוק מתעלם ממנו — קנייה.",
        "reasoningOptions": [
            {
                "text": "ROIC 18% יציב 10 שנים = עסק איכותי, לא מלכודת",
                "correct": true
            },
            {
                "text": "רכישה עצמית 3%/שנה = ההנהלה מאמינה שהמניה זולה",
                "correct": true
            },
            {
                "text": "P/E 6 + אין צמיחה = מלכודת ערך קלאסית",
                "correct": false,
                "biasTag": "זיהוי דפוס שגוי"
            },
            {
                "text": "אנליסטים לא מכסים = מידע חסר = סיכון",
                "correct": false,
                "biasTag": "הטיית עדר"
            },
            {
                "text": "FCF יציב + יחס חלוקה סביר = דיבידנד בר-קיימא",
                "correct": true
            },
            {
                "text": "מחזור מסחר נמוך = לא נוכל למכור כשנרצה",
                "correct": false,
                "biasTag": "פרמיית נזילות מוגזמת"
            }
        ],
        "isGoodValue": true,
        "difficulty": "hard",
        "difficultyValue": 3,
        "hint": "ROIC 18% עקבי 10 שנים, רכישה עצמית 3% בשנה, משפחה עם 45% — נראה לכם כמו מלכודת?"
    },
    {
        "id": "hidden-leverage-h01",
        "name": "נדל\"ן גלובל ישראל בע\"מ",
        "sector": "נדל\"ן",
        "symbol": "NDLG",
        "price": 180,
        "tier": 3,
        "chartType": "none",
        "description": "חברת נדל\"ן שנראית בריאה: P/E 9, ROE 22%, דיבידנד 5%. אבל ה-ROE הגבוה מגיע ממינוף קיצוני. חוב/הון 3.5, רוב החוב בריבית משתנה, ו-30% מהנכסים ממומנים באגרות חוב שעומדות למיחזור בעוד 14 חודשים בסביבת ריבית גבוהה יותר.",
        "management": "מנכ\"ל שמגיע מעולם המימון — מתמקד במנוף, לא בנכסים. 'עוד מנוף = עוד תשואה'.",
        "moat": "פורטפוליו נכסים סביר, אבל לא יוצא דופן. תפוסה 88% — ממוצעת.",
        "events": "אג\"ח ₪400M עומדות למיחזור בעוד 14 חודשים. הריבית עלתה 200bp מאז ההנפקה.",
        "metrics": {
            "basic": [
                {
                    "name": "P/E",
                    "value": "9"
                },
                {
                    "name": "ROE",
                    "value": "22%"
                },
                {
                    "name": "תשואת דיבידנד",
                    "value": "5%"
                }
            ],
            "advanced": [
                {
                    "name": "ROIC",
                    "value": "6%"
                },
                {
                    "name": "חוב/הון",
                    "value": "3.5"
                },
                {
                    "name": "ריבית על חוב",
                    "value": "65% משתנה"
                }
            ]
        },
        "historicalData": [
            {
                "year": "year-4",
                "revenue": 280,
                "fcf": 35
            },
            {
                "year": "year-3",
                "revenue": 310,
                "fcf": 40
            },
            {
                "year": "year-2",
                "revenue": 340,
                "fcf": 45
            },
            {
                "year": "year-1",
                "revenue": 365,
                "fcf": 42
            },
            {
                "year": "year-0",
                "revenue": 380,
                "fcf": 38
            }
        ],
        "projectedData": [
            {
                "year": "year+1",
                "revenue": 390,
                "fcf": 25
            },
            {
                "year": "year+2",
                "revenue": 395,
                "fcf": 15
            }
        ],
        "correctDecision": "pass",
        "pointValue": 200,
        "hints": [
            {
                "cost": 0.5,
                "text": "ROE 22% אבל ROIC רק 6%. מה מסביר את הפער? (רמז: מינוף)"
            }
        ],
        "feedback": {
            "principle": {
                "id": "leverage-risk",
                "name": "סיכון מינוף"
            },
            "decisiveSignals": [
                "חוב/הון 3.5 = מינוף קיצוני",
                "65% ריבית משתנה",
                "מיחזור ₪400M ב-14 חודשים"
            ],
            "correctExplanation": "נכון! ROE 22% מול ROIC 6% = כל ה-'תשואה' מגיעה ממינוף, לא מאיכות העסק. חוב/הון 3.5 עם 65% ריבית משתנה ומיחזור קרוב = פצצה מתקתקת. כשהריבית עולה, ה-FCF יקרוס.",
            "incorrectExplanation": "טעות! P/E 9, ROE 22%, דיבידנד 5% — מושלם על הנייר. אבל ROE ≠ ROIC. כשיש מנוף 3.5x, ה-ROE מנופח. ROIC 6% = התשואה 'האמיתית' על הנכסים עלובה.",
            "counterSignalExplanation": "הצד השני יטען: P/E 9 זול, הכנסות גדלות, דיבידנד 5% מושך. מינוף בנדל\"ן הוא נורמלי, וההנהלה מנוסה בניהול חוב."
        },
        "workedExample": "1) ROE 22% — מרשים! 2) אבל ROIC 6% — למה הפער? כי ROE = ROIC × מנוף. 22% = 6% × 3.5 + אפקט ריבית. 3) חוב/הון 3.5 = על כל ₪1 הון, יש ₪3.5 חוב. 4) 65% ריבית משתנה = כשהריבית עולה, ההוצאות קופצות. 5) מיחזור ₪400M ב-14 חודשים = ריבית חדשה גבוהה ב-200bp = ₪8M הוצאות ריבית נוספות. 6) FCF: ₪38M → כ-₪15M אחרי מיחזור. 7) מסקנה: ROE מנופח, סיכון ריבית גבוה — העל.",
        "reasoningOptions": [
            {
                "text": "ROE 22% מול ROIC 6% = כל התשואה ממנוף, לא מאיכות",
                "correct": true
            },
            {
                "text": "מיחזור ₪400M בריבית גבוהה יותר = FCF ייחתך",
                "correct": true
            },
            {
                "text": "P/E 9 = זול לנדל\"ן",
                "correct": false,
                "biasTag": "עיגון על מכפיל"
            },
            {
                "text": "ROE 22% = תשואה מעולה על ההון",
                "correct": false,
                "biasTag": "בלבול ROE/ROIC"
            },
            {
                "text": "65% ריבית משתנה = חשיפה מסוכנת לעליית ריבית",
                "correct": true
            },
            {
                "text": "הכנסות גדלות = העסק מתרחב",
                "correct": false,
                "biasTag": "התעלמות ממבנה המימון"
            }
        ],
        "isGoodValue": false,
        "difficulty": "hard",
        "difficultyValue": 3,
        "hint": "ROE 22% אבל ROIC רק 6%. מה מסביר את הפער?"
    },
    {
        "id": "hidden-earnings-h01",
        "name": "תשתיות אילת בע\"מ",
        "sector": "תשתיות",
        "symbol": "TSHT",
        "price": 55,
        "tier": 3,
        "chartType": "annual",
        "description": "חברת תשתיות עם הפסד חשבונאי שנה שנייה ברציפות. המניה ירדה 35%. אבל: ההפסד כולו מפחת מואץ על פרויקט חדש שהושלם. FCF חיובי ועולה. ביטול הפחת מראה ROIC של 14%.",
        "management": "מהנדסת שמנהלת עם חשיבת בעלים. מחזיקה 10% מהמניות. תגמול מבוסס FCF, לא רווח חשבונאי.",
        "moat": "חוזים ממשלתיים ל-15 שנה. זיכיון בלעדי באזור. מתחרים צריכים 5+ שנים לקבל רישיון.",
        "events": "פרויקט חדש הושלם — יחל להניב הכנסות מלאות מ-year+1. המניה ירדה 35% בגלל 'הפסד'.",
        "metrics": {
            "basic": [
                {
                    "name": "P/E (מדווח)",
                    "value": "שלילי"
                },
                {
                    "name": "P/E (על רווחי בעלים)",
                    "value": "8"
                },
                {
                    "name": "ROE (מדווח)",
                    "value": "-3%"
                }
            ],
            "advanced": [
                {
                    "name": "ROIC (מנורמל)",
                    "value": "14%"
                },
                {
                    "name": "FCF (מיליון ₪)",
                    "value": "42"
                },
                {
                    "name": "פחת מואץ > תחזוקה",
                    "value": "פי 3"
                }
            ]
        },
        "historicalData": [
            {
                "year": "year-4",
                "revenue": 160,
                "fcf": 28
            },
            {
                "year": "year-3",
                "revenue": 170,
                "fcf": 30
            },
            {
                "year": "year-2",
                "revenue": 180,
                "fcf": 25
            },
            {
                "year": "year-1",
                "revenue": 200,
                "fcf": 35
            },
            {
                "year": "year-0",
                "revenue": 220,
                "fcf": 42
            }
        ],
        "projectedData": [
            {
                "year": "year+1",
                "revenue": 260,
                "fcf": 55
            },
            {
                "year": "year+2",
                "revenue": 280,
                "fcf": 62
            }
        ],
        "correctDecision": "buy",
        "pointValue": 200,
        "hints": [
            {
                "cost": 0.5,
                "text": "P/E שלילי אבל FCF ₪42M? מה קורה כש-FCF ורווח חשבונאי מספרים סיפורים שונים?"
            }
        ],
        "feedback": {
            "principle": {
                "id": "owner-earnings",
                "name": "רווחי בעלים"
            },
            "decisiveSignals": [
                "FCF ₪42M חיובי ועולה",
                "פחת מואץ פי 3 מתחזוקה = הפסד מלאכותי",
                "P/E על רווחי בעלים = 8"
            ],
            "correctExplanation": "מצוין! ההפסד החשבונאי אינו אמיתי — הפחת המואץ על הפרויקט החדש מעוות את הרווח. FCF מגלה את האמת: ₪42M ועולה. זו בדיוק הסיטואציה שבאפט מחפש — שוק שמפחד ממספר חשבונאי ומתעלם מהתזרים.",
            "incorrectExplanation": "טעות! P/E שלילי ו-'הפסד שנה שנייה' הפחידו אותך — ואת השוק. אבל FCF ₪42M אומר שהעסק מרוויח. הפחת הכבד הוא רישום חשבונאי, לא תזרים מזומן שיצא.",
            "counterSignalExplanation": "הצד השני יטען: שנתיים הפסד = אולי יש בעיה אמיתית. פחת מואץ קיים מסיבה — הנכסים מתבלים. ומי אומר שה-FCF ימשיך לעלות?"
        },
        "workedExample": "1) P/E שלילי — מפחיד. 2) אבל FCF ₪42M ועולה = העסק מרוויח מזומן. 3) ההפרש: פחת מואץ פי 3 מתחזוקה = הפחתה חשבונאית אגרסיבית. 4) P/E על רווחי בעלים = 8 = זול. 5) חפיר: זיכיון ממשלתי 15 שנה = הכנסות מובטחות. 6) מנכ\"לית עם 10% + תגמול FCF = אינטרסים נכונים. 7) מסקנה: השוק טועה — רווחי בעלים חיוביים — קנייה.",
        "reasoningOptions": [
            {
                "text": "FCF ₪42M חיובי ועולה = העסק מרוויח למרות 'ההפסד'",
                "correct": true
            },
            {
                "text": "פחת מואץ פי 3 מתחזוקה = הפסד חשבונאי מלאכותי",
                "correct": true
            },
            {
                "text": "P/E שלילי שנתיים = חברה בבעיה",
                "correct": false,
                "biasTag": "עיגון על רווח חשבונאי"
            },
            {
                "text": "המניה ירדה 35% = השוק יודע משהו",
                "correct": false,
                "biasTag": "הטיית עדר"
            },
            {
                "text": "זיכיון ממשלתי 15 שנה = הכנסות מובטחות",
                "correct": true
            },
            {
                "text": "פרויקט חדש שיניב הכנסות מלאות מ-year+1 = FCF יעלה עוד",
                "correct": true
            }
        ],
        "isGoodValue": true,
        "difficulty": "hard",
        "difficultyValue": 3,
        "hint": "P/E שלילי אבל FCF ₪42M? מה קורה כש-FCF ורווח חשבונאי מספרים סיפורים שונים?"
    },
    {
        "id": "margin-contrarian-h01",
        "name": "ביטוח הדרום בע\"מ",
        "sector": "ביטוח",
        "symbol": "BTDR",
        "price": 72,
        "tier": 3,
        "chartType": "annual",
        "description": "חברת ביטוח שהמניה ירדה 40% אחרי אירוע חד-פעמי: שריפה גדולה שעלתה ₪80M. המחיר מתמחר כאילו שריפות כאלה קורות כל שנה. בפועל, הביצועים 'הנורמליים' מעולים: ROIC 15%, FCF יציב, ויחס חלוקה 40%.",
        "management": "מנכ\"ל ותיק שמנהל מדיניות ביטוח-משנה שמרנית. לא הפתעות מיחזור.",
        "moat": "מותג מוביל בביטוח עסקי בדרום. שיעור חידוש 85%. התמחות בביטוח חקלאי.",
        "events": "שריפה חד-פעמית = ₪80M הפסד. מניה ירדה 40%. אנליסטים הורידו 'מכירה'.",
        "metrics": {
            "basic": [
                {
                    "name": "P/E (נוכחי, כולל חד-פעמי)",
                    "value": "25"
                },
                {
                    "name": "P/E (מנורמל)",
                    "value": "7"
                },
                {
                    "name": "ROE",
                    "value": "14%"
                }
            ],
            "advanced": [
                {
                    "name": "ROIC (מנורמל)",
                    "value": "15%"
                },
                {
                    "name": "FCF מנורמל (מיליון ₪)",
                    "value": "65"
                },
                {
                    "name": "רכישה עצמית",
                    "value": "₪15M (החלה אחרי הירידה)"
                }
            ]
        },
        "historicalData": [
            {
                "year": "year-4",
                "revenue": 450,
                "fcf": 58
            },
            {
                "year": "year-3",
                "revenue": 470,
                "fcf": 62
            },
            {
                "year": "year-2",
                "revenue": 490,
                "fcf": 65
            },
            {
                "year": "year-1",
                "revenue": 510,
                "fcf": 68
            },
            {
                "year": "year-0",
                "revenue": 520,
                "fcf": -12
            }
        ],
        "projectedData": [
            {
                "year": "year+1",
                "revenue": 540,
                "fcf": 70
            },
            {
                "year": "year+2",
                "revenue": 560,
                "fcf": 75
            }
        ],
        "correctDecision": "buy",
        "pointValue": 200,
        "hints": [
            {
                "cost": 0.5,
                "text": "FCF שלילי ב-year-0, אבל 4 שנים לפניו היה חיובי ועולה. מה גרם לשינוי?"
            }
        ],
        "feedback": {
            "principle": {
                "id": "margin-of-safety",
                "name": "מרווח ביטחון"
            },
            "decisiveSignals": [
                "P/E מנורמל 7 = זול מאוד",
                "אירוע חד-פעמי, לא מבני",
                "רכישה עצמית = ההנהלה חושבת שזול"
            ],
            "correctExplanation": "מצוין! השוק הגיב בפאניקה לאירוע חד-פעמי וירד 40%. P/E 25 כולל את השריפה — P/E מנורמל 7 = זול בטירוף. זה בדיוק מרווח ביטחון — קניית עסק טוב אחרי אירוע שעושה אותו זול זמנית.",
            "incorrectExplanation": "טעות! FCF שלילי ב-year-0 הפחיד, אבל הסתכלו על 4 השנים לפני — ₪58-68M יציב. השריפה חד-פעמית. ירידה 40% יצרה מרווח ביטחון עצום.",
            "counterSignalExplanation": "הצד השני יטען: מי מבטיח שלא תהיה שריפה נוספת? ביטוח חקלאי חשוף לאירועי טבע. P/E 25 (נוכחי) יקר. וירידה של 40% אולי מתמחרת סיכון אמיתי."
        },
        "workedExample": "1) מניה ירדה 40% — למה? שריפה ₪80M. 2) שאלה: האם זה מבני או חד-פעמי? 3) בדיקה: 4 שנים של FCF ₪58-68M → ₪-12M → תחזית ₪70M. = חד-פעמי. 4) P/E מנורמל 7 = השוק מתמחר כאילו השריפה קבועה. 5) רכישה עצמית ₪15M = ההנהלה מסכימה שזול. 6) ROIC 15% עקבי = עסק איכותי. 7) מסקנה: אירוע חד-פעמי יצר מרווח ביטחון — קנייה.",
        "reasoningOptions": [
            {
                "text": "P/E מנורמל 7 אחרי אירוע חד-פעמי = מרווח ביטחון גדול",
                "correct": true
            },
            {
                "text": "רכישה עצמית אחרי הירידה = הנהלה מאמינה שהמניה זולה",
                "correct": true
            },
            {
                "text": "FCF שלילי ב-year-0 = העסק נפגע",
                "correct": false,
                "biasTag": "הטיית עדכניות"
            },
            {
                "text": "אנליסטים 'מכירה' = הם מנתחים לעומק",
                "correct": false,
                "biasTag": "הטיית סמכות"
            },
            {
                "text": "ROIC 15% עקבי 4 שנים = עסק איכותי שנפגע זמנית",
                "correct": true
            },
            {
                "text": "ביטוח חקלאי = סיכון אירועי טבע חוזר",
                "correct": false,
                "biasTag": "הכללת יתר מאירוע בודד"
            }
        ],
        "isGoodValue": true,
        "difficulty": "hard",
        "difficultyValue": 3,
        "hint": "FCF שלילי ב-year-0, אבל 4 שנים לפניו היה חיובי ועולה. מה גרם לשינוי?"
    },
    {
        "id": "growth-vanity-h01",
        "name": "קלאוד-מקס שירותים בע\"מ",
        "sector": "שירותי IT",
        "symbol": "CLDM",
        "price": 240,
        "tier": 3,
        "chartType": "quarterly",
        "description": "חברת שירותי IT שמדווחת צמיחה של 45%, אבל: 80% מהצמיחה מגיעה מרכישות (לא אורגנית), ה-FCF שלילי כבר 3 שנים, ההנהלה מדללת 10% בשנה, ו-ROIC ירד מ-15% ל-6% ככל שהרכישות הזולות נגמרו.",
        "management": "מנכ\"ל שרודף צמיחה ומדבר רק על 'גודל' ו'סקייל'. תגמול מבוסס הכנסות, לא רווח.",
        "moat": "אין — שירותי IT הם תחרותיים מאוד. כל 'חפיר' נקנה ביוקר.",
        "events": "רכישה נוספת ב-₪150M (פי 8 הכנסות היעד). דילול 10% ב-year-0. ROIC ירד שוב.",
        "metrics": {
            "basic": [
                {
                    "name": "P/E",
                    "value": "65"
                },
                {
                    "name": "PEG",
                    "value": "1.4"
                },
                {
                    "name": "צמיחת הכנסות",
                    "value": "45%"
                }
            ],
            "advanced": [
                {
                    "name": "צמיחה אורגנית",
                    "value": "9% בלבד"
                },
                {
                    "name": "ROIC",
                    "value": "6% (ירד מ-15%)"
                },
                {
                    "name": "FCF (מיליון ₪)",
                    "value": "-25"
                }
            ]
        },
        "quarterlyData": [
            {
                "quarter": "Q1 year-1",
                "revenue": 65,
                "fcf": -4
            },
            {
                "quarter": "Q2 year-1",
                "revenue": 72,
                "fcf": -5
            },
            {
                "quarter": "Q3 year-1",
                "revenue": 85,
                "fcf": -6
            },
            {
                "quarter": "Q4 year-1",
                "revenue": 95,
                "fcf": -8
            },
            {
                "quarter": "Q1 year-0",
                "revenue": 98,
                "fcf": -7
            },
            {
                "quarter": "Q2 year-0",
                "revenue": 102,
                "fcf": -5
            }
        ],
        "projectedData": [
            {
                "year": "year+1",
                "revenue": 520,
                "fcf": -30
            },
            {
                "year": "year+2",
                "revenue": 600,
                "fcf": -35
            }
        ],
        "correctDecision": "pass",
        "pointValue": 200,
        "hints": [
            {
                "cost": 0.5,
                "text": "צמיחה 45%, אבל צמיחה אורגנית רק 9%. מי 'גדל' באמת?"
            }
        ],
        "feedback": {
            "principle": {
                "id": "growth-trap",
                "name": "מלכודת צמיחה"
            },
            "decisiveSignals": [
                "צמיחה אורגנית 9% בלבד (מתוך 45%)",
                "ROIC ירד מ-15% ל-6%",
                "דילול 10% בשנה"
            ],
            "correctExplanation": "נכון! 45% צמיחה נשמע מרשים, אבל 80% מגיע מרכישות. צמיחה אורגנית רק 9% = העסק הבסיסי גדל לאט. ROIC 15% → 6% = כל רכישה מדללת את האיכות. PEG 1.4 נראה סביר, אבל הוא מחושב על צמיחה לא-אורגנית.",
            "incorrectExplanation": "טעות! PEG 1.4 מפתה, אבל PEG עובד רק על צמיחה אורגנית. 45% צמיחה שמורכבת מרכישות = לא בת-קיימא. ו-ROIC שיורד כל שנה = הרכישות הורסות ערך.",
            "counterSignalExplanation": "הצד השני יטען: PEG 1.4 = מחיר סביר לצמיחה. סקייל בשירותי IT יוצר יתרון תחרותי. הרכישות בונות בסיס לקוחות שייצר הכנסות חוזרות."
        },
        "workedExample": "1) צמיחה 45% — מרשים! 2) אבל: צמיחה אורגנית = 9%. השאר = רכישות. 3) ROIC: 15% → 6% = כל רכישה מוסיפה הכנסות אבל לא רווח. 4) FCF: שלילי 3 שנים = הרכישות עולות יותר ממה שהן מניבות. 5) דילול 10%/שנה = מנפיקים מניות כדי לממן. 6) תגמול: מנכ\"ל מתוגמל על הכנסות = ימשיך לרכוש. 7) מסקנה: צמיחה 'קנויה' שהורסת ערך — העל.",
        "reasoningOptions": [
            {
                "text": "צמיחה אורגנית 9% בלבד = הצמיחה 'האמיתית' צנועה",
                "correct": true
            },
            {
                "text": "ROIC 15% → 6% = הרכישות הורסות ערך",
                "correct": true
            },
            {
                "text": "PEG 1.4 = מחיר סביר לצמיחה",
                "correct": false,
                "biasTag": "שימוש ב-PEG על צמיחה לא-אורגנית"
            },
            {
                "text": "45% צמיחה = חברה בהתרחבות מסיבית",
                "correct": false,
                "biasTag": "בלבול צמיחה אורגנית/רכישות"
            },
            {
                "text": "דילול 10% + FCF שלילי = בעלי מניות משלמים על הצמיחה",
                "correct": true
            },
            {
                "text": "סקייל ב-IT = יתרון תחרותי לטווח ארוך",
                "correct": false,
                "biasTag": "הנחת סקייל ללא הוכחה"
            }
        ],
        "isGoodValue": false,
        "difficulty": "hard",
        "difficultyValue": 3,
        "hint": "צמיחה 45%, אבל צמיחה אורגנית רק 9%. מי 'גדל' באמת?"
    },
    {
        "id": "buyback-king-h01",
        "name": "מנועי ישראל בע\"מ",
        "sector": "תעשייה",
        "symbol": "MNOI",
        "price": 88,
        "tier": 3,
        "chartType": "annual",
        "description": "יצרנית מנועים תעשייתיים שנראית 'דשדוש' — הכנסות צומחות רק 2% בשנה. אבל: רוכשת 5% מהמניות כל שנה כבר 6 שנים. FCF למניה עלה 45% בתקופה, גם ללא צמיחת הכנסות. ROIC 19% עקבי.",
        "management": "מנכ\"ל עם 12% אחזקה. מעדיף רכישה עצמית על פני רכישות. 'אנחנו לא צריכים לצמוח — צריכים להתייעל.'",
        "moat": "מוצרים מותאמים אישית ללקוחות תעשייתיים. עלות מעבר גבוהה. שיעור חידוש 92%.",
        "events": "הכריזה על תוכנית רכישה עצמית נוספת של ₪50M. אנליסטים: 'אין צמיחה = מכירה'.",
        "metrics": {
            "basic": [
                {
                    "name": "P/E",
                    "value": "11"
                },
                {
                    "name": "ROE",
                    "value": "19%"
                },
                {
                    "name": "צמיחת הכנסות",
                    "value": "+2%"
                }
            ],
            "advanced": [
                {
                    "name": "ROIC",
                    "value": "19% (יציב 6 שנים)"
                },
                {
                    "name": "FCF למניה (צמיחה 6 שנים)",
                    "value": "+45%"
                },
                {
                    "name": "רכישה עצמית",
                    "value": "5%/שנה × 6 שנים"
                }
            ]
        },
        "historicalData": [
            {
                "year": "year-4",
                "revenue": 350,
                "fcf": 58
            },
            {
                "year": "year-3",
                "revenue": 355,
                "fcf": 60
            },
            {
                "year": "year-2",
                "revenue": 360,
                "fcf": 55
            },
            {
                "year": "year-1",
                "revenue": 368,
                "fcf": 62
            },
            {
                "year": "year-0",
                "revenue": 375,
                "fcf": 64
            }
        ],
        "projectedData": [
            {
                "year": "year+1",
                "revenue": 382,
                "fcf": 66
            },
            {
                "year": "year+2",
                "revenue": 390,
                "fcf": 68
            }
        ],
        "correctDecision": "buy",
        "pointValue": 200,
        "hints": [
            {
                "cost": 0.5,
                "text": "ההכנסות גדלו 2%, אבל FCF למניה גדל 45%. איך זה אפשרי?"
            }
        ],
        "feedback": {
            "principle": {
                "id": "owner-earnings",
                "name": "רווחי בעלים"
            },
            "decisiveSignals": [
                "רכישה עצמית 5%/שנה × 6 = FCF למניה +45%",
                "ROIC 19% עקבי",
                "P/E 11 על עסק איכותי"
            ],
            "correctExplanation": "מצוין! רכישה עצמית היא 'צמיחה שקטה'. FCF סך הכל עלה 10%, אבל FCF למניה עלה 45% כי יש פחות מניות. P/E 11 על עסק עם ROIC 19% ורכישה של 5%/שנה = זול. הכנסות 2% + רכישה 5% = 7% תשואה שנתית 'אוטומטית'.",
            "incorrectExplanation": "טעות! 'אין צמיחה' הוא מסנן גס. FCF למניה עלה 45% דרך רכישה עצמית — זה 'צמיחה' לכל דבר, רק שהיא מגיעה מהקטנת המכנה ולא מהגדלת המונה.",
            "counterSignalExplanation": "הצד השני יטען: 2% צמיחה = חברה שלא גדלה. אנליסטים 'מכירה'. רכישה עצמית טובה רק כשהמניה באמת זולה — מי אומר שהיא זולה?"
        },
        "workedExample": "1) צמיחה 2% — 'משעמם'. 2) אבל רכישה עצמית 5%/שנה × 6 שנים = הקטנת מניות ב-26%. 3) FCF למניה: +45% (FCF +10% ÷ 74% מניות). 4) ROIC 19% = העסק עצמו איכותי. 5) שיעור חידוש 92% = הכנסות צפויות. 6) P/E 11 = זול לעסק ב-ROIC 19%. 7) 'תשואה שקטה': דיבידנד + רכישה + צמיחה = ~10%/שנה. 8) מסקנה: קנייה.",
        "reasoningOptions": [
            {
                "text": "FCF למניה +45% דרך רכישה עצמית = צמיחה אמיתית",
                "correct": true
            },
            {
                "text": "ROIC 19% יציב + P/E 11 = עסק איכותי במחיר זול",
                "correct": true
            },
            {
                "text": "צמיחה 2% = חברה שלא מתפתחת",
                "correct": false,
                "biasTag": "הטיית צמיחה בלבד"
            },
            {
                "text": "אנליסטים 'מכירה' = הם רואים משהו",
                "correct": false,
                "biasTag": "הטיית סמכות"
            },
            {
                "text": "רכישה עצמית ב-P/E 11 = החברה קונה את עצמה בזול",
                "correct": true
            },
            {
                "text": "שיעור חידוש 92% = הכנסות עקביות",
                "correct": true
            }
        ],
        "isGoodValue": true,
        "difficulty": "hard",
        "difficultyValue": 3,
        "hint": "ההכנסות גדלו 2%, אבל FCF למניה גדל 45%. איך זה אפשרי?"
    },
    {
        "id": "crypto-adjacent-h01",
        "name": "בלוקצ'יין ישראל בע\"מ",
        "sector": "פינטק / קריפטו",
        "symbol": "BLKC",
        "price": 420,
        "tier": 3,
        "chartType": "quarterly",
        "description": "חברה שמפתחת תשתית בלוקצ'יין לבנקים. ההכנסות צמחו פי 5 בשנתיים. P/E 80 (PEG 1.0 כביכול). אבל: 60% מההכנסות הן 'עמלות על נפח מסחר' שתלויות בתנודתיות קריפטו. כש-BTC ירד, ההכנסות קרסו.",
        "management": "מייסדים צעירים עם רקע טכנולוגי מרשים. אין ניסיון בניהול חברה ציבורית.",
        "moat": "טכנולוגיה מתקדמת, אבל 10+ מתחרים עם מוצר דומה. שום לקוח מחויב.",
        "events": "שותפות 'אסטרטגית' עם בנק (POC קטן, לא חוזה). הכנסות ברבעון האחרון ירדו 35%.",
        "metrics": {
            "basic": [
                {
                    "name": "P/E",
                    "value": "80"
                },
                {
                    "name": "PEG (על צמיחה היסטורית)",
                    "value": "1.0"
                },
                {
                    "name": "ROE",
                    "value": "25%"
                }
            ],
            "advanced": [
                {
                    "name": "ROIC",
                    "value": "12%"
                },
                {
                    "name": "FCF (מיליון ₪)",
                    "value": "15"
                },
                {
                    "name": "הכנסות תלויות-נפח",
                    "value": "60%"
                }
            ]
        },
        "quarterlyData": [
            {
                "quarter": "Q1 year-1",
                "revenue": 35,
                "fcf": 5
            },
            {
                "quarter": "Q2 year-1",
                "revenue": 55,
                "fcf": 12
            },
            {
                "quarter": "Q3 year-1",
                "revenue": 48,
                "fcf": 8
            },
            {
                "quarter": "Q4 year-1",
                "revenue": 72,
                "fcf": 18
            },
            {
                "quarter": "Q1 year-0",
                "revenue": 65,
                "fcf": 10
            },
            {
                "quarter": "Q2 year-0",
                "revenue": 42,
                "fcf": 3
            }
        ],
        "projectedData": [
            {
                "year": "year+1",
                "revenue": 220,
                "fcf": 20
            },
            {
                "year": "year+2",
                "revenue": 180,
                "fcf": 8
            }
        ],
        "correctDecision": "pass",
        "pointValue": 200,
        "hints": [
            {
                "cost": 0.5,
                "text": "PEG 1.0 מבוסס על צמיחה היסטורית. אבל ₪72M → ₪42M ברבעון אחד — מה קורה לצמיחה?"
            }
        ],
        "feedback": {
            "principle": {
                "id": "circle-of-competence",
                "name": "מעגל כשירות"
            },
            "decisiveSignals": [
                "60% הכנסות תלויות-נפח = לא ניתנות לחיזוי",
                "PEG על צמיחה לא-חוזרת = מטעה",
                "הכנסות ירדו 35% ברבעון"
            ],
            "correctExplanation": "נכון! שני דגלים: (1) מעגל כשירות — הכנסות שתלויות בנפח מסחר קריפטו לא ניתנות לחיזוי, אז PEG לא שווה כלום. (2) קשה מדי — כל ניתוח שנעשה בשוק עם תנודתיות כזו הוא ניחוש.",
            "incorrectExplanation": "טעות! PEG 1.0 הפתה אותך, אבל הוא מחושב על צמיחה ש-60% ממנה תלויה בתנודתיות קריפטו. הרבעון האחרון (-35%) מראה מה קורה כשהנפח יורד.",
            "counterSignalExplanation": "הצד השני יטען: PEG 1.0 = מחיר הוגן לצמיחה. תשתית בלוקצ'יין לבנקים = העתיד. שותפות עם בנק = validation. מייסדים מרשימים."
        },
        "workedExample": "1) PEG 1.0 — נראה סביר. 2) אבל: הצמיחה היסטורית = תלויית נפח קריפטו (60%). 3) ברבעון האחרון: ₪72M → ₪42M (-35%) = הנפח ירד. 4) PEG 'אמיתי': אם הצמיחה חוזרת ל-0%? P/E 80 / 0% = אינסוף. 5) שאלה: האם אני מבין מתי נפח קריפטו יעלה? לא. 6) 'שותפות' = POC, לא חוזה. 7) מסקנה: לא ניתן לחיזוי + מחוץ למעגל כשירות — העל.",
        "reasoningOptions": [
            {
                "text": "60% הכנסות תלויות בנפח קריפטו = לא ניתן לחזות FCF",
                "correct": true
            },
            {
                "text": "PEG 1.0 על צמיחה לא-חוזרת = מטעה",
                "correct": true
            },
            {
                "text": "PEG 1.0 = מחיר הוגן ביחס לצמיחה",
                "correct": false,
                "biasTag": "שימוש ב-PEG על נתון לא-יציב"
            },
            {
                "text": "בלוקצ'יין = העתיד, שווה להשקיע מוקדם",
                "correct": false,
                "biasTag": "הטיית חדשנות"
            },
            {
                "text": "ירידה של 35% ברבעון מראה את הרגישות לנפח",
                "correct": true
            },
            {
                "text": "שותפות עם בנק = validation מסחרי",
                "correct": false,
                "biasTag": "הערכת יתר של POC"
            }
        ],
        "isGoodValue": false,
        "difficulty": "hard",
        "difficultyValue": 3,
        "hint": "PEG 1.0 מבוסס על צמיחה היסטורית. אבל ₪72M → ₪42M ברבעון אחד — מה קורה לצמיחה?"
    }
],
    expert: [
    {
        "id": "supermarket-turnaround-01",
        "name": "רשת סופרמרקטים בשיקום",
        "sector": "קמעונאות מזון",
        "symbol": "RSTS",
        "price": 18.5,
        "tier": 4,
        "description": "רשת סופרמרקטים עם 150 סניפים שעברה 3 שנים קשות של ירידה במכירות וחלקת שוק. לפני 18 חודשים הגיע מנכ\"ל חדש (לשעבר סמנכ\"ל בכיר ב-Walmart) עם תוכנית טרנספורמציה אגרסיבית. סגר 30 סניפים לא רווחיים, שיפץ 50 סניפים מרכזיים, והשיק מותג פרטי פרימיום שכבר מהווה 15% מהמכירות. השקעה של 300 מיליון ₪ בטכנולוגיה כולל מערכת ניהול מלאי מבוססת AI, אפליקציה חדשה, ושירות משלוחים תוך שעתיים. נתח השוק ירד מ-18% ל-14% אך התייצב לאחרונה. עדיין נסחרת ב-70% מהשיא של 2019.",
        "management": "המנכ\"ל החדש, דוד כהן, הוביל הפיכה מוצלחת של רשת אמריקאית בעבר והכפיל את ערכה תוך 5 שנים. הביא איתו צוות של 8 מנהלים בכירים מניסיונו הקודם. שינה תרבות ארגונית מ'ניהול לפי נוהל' ל'אובססיה ללקוח'. הפחית הוצאות הנהלה ומטה ב-30% והעביר את החיסכון לשיפור חווית הקנייה. תגמול ההנהלה עבר מבונוסים על מכירות לבונוסים על ROIC ושביעות רצון לקוחות. ביטל פרויקטי יוקרה כמו מטה חדש ב-500 מיליון ₪. משקיע זמן רב בסניפים ומקשיב לעובדים ולקוחות.",
        "moat": "אין moat טכנולוגי או מותג חזק בקמעונאות מזון - זה עסק של יעילות תפעולית ונוחות. אבל יש כמה יתרונות: בעלות על נדל\"ן ב-70 סניפים בשווי 2 מיליארד ₪ (לא משועבד), חלקם במיקומי פרימיום שקשה לשכפל. רשת לוגיסטית עם 3 מרכזי הפצה מודרניים לאחר השקעה של 150 מיליון ₪. מותג עם היסטוריה של 40 שנה שעדיין מוכר ל-80% מהאוכלוסייה. יחסים חזקים עם ספקים מקומיים. בסיס של 2 מיליון לקוחות במועדון. עלויות מעבר פסיכולוגיות - רבים חוזרים מהרגל.",
        "events": "סיום תוכנית הרה-ארגון עם עלויות חד פעמיות של 200 מיליון ₪ שנרשמו ב-2023. לראשונה מזה 3 שנים same-store sales חיובי (+1.2% ברבעון האחרון). האפליקציה החדשה עם 500K הורדות ו-20% מהמכירות כבר דיגיטליות. מו\"מ למכירת 10 נכסי נדל\"ן לא אסטרטגיים ב-300 מיליון ₪. השקת 50 מוצרי מותג פרטי נוספים. שותפות עם חברת fintech למתן אשראי בקופות. עדיין מפסידה כסף אבל הפסדים מצטמצמים.",
        "metrics": {
            "basic": [
                {
                    "name": "P/E",
                    "value": "N/A - הפסדים"
                },
                {
                    "name": "EPS",
                    "value": "-0.85 ₪"
                },
                {
                    "name": "תשואת דיבידנד",
                    "value": "0%"
                },
                {
                    "name": "P/B",
                    "value": "0.4"
                }
            ],
            "advanced": [
                {
                    "name": "Price/Tangible Book",
                    "value": "0.35"
                },
                {
                    "name": "EV/Sales",
                    "value": "0.15"
                },
                {
                    "name": "Quick Ratio",
                    "value": "0.6"
                },
                {
                    "name": "FCF (מיליון ₪)",
                    "value": "-50"
                },
                {
                    "name": "EBITDA margin",
                    "value": "2%"
                },
                {
                    "name": "Same-store sales",
                    "value": "+1.2%"
                },
                {
                    "name": "Debt/Equity",
                    "value": "0.3"
                },
                {
                    "name": "Inventory turnover",
                    "value": "18x"
                },
                {
                    "name": "Working Capital/Sales",
                    "value": "3%"
                },
                {
                    "name": "CapEx/Sales",
                    "value": "2.5%"
                }
            ]
        },
        "historicalData": [
            {
                "year": "year-4",
                "revenue": 8500,
                "fcf": 350
            },
            {
                "year": "year-3",
                "revenue": 8000,
                "fcf": 200
            },
            {
                "year": "year-2",
                "revenue": 7200,
                "fcf": -100
            },
            {
                "year": "year-1",
                "revenue": 6800,
                "fcf": -180
            },
            {
                "year": "year-0",
                "revenue": 6500,
                "fcf": -50
            }
        ],
        "projectedData": [
            {
                "year": "year+1",
                "revenue": 6600,
                "fcf": 50
            },
            {
                "year": "year+2",
                "revenue": 6900,
                "fcf": 200
            }
        ],
        "correctDecision": "buy",
        "pointValue": 250,
        "hints": [
            {
                "cost": 0.5,
                "text": "המנכ\"ל הנוכחי קנה 10 מיליון ₪ במניות החברה ממקורותיו הפרטיים לפני 6 חודשים. הרשת מחזיקה נדל\"ן לא ממונף בשווי שגבוה משמעותית משווי השוק של כל החברה. שימו לב שהחברה כבר חזרה ל-EBITDA חיובי למרות שעדיין מדווחת הפסדים חשבונאיים."
            }
        ],
        "reasoningOptions": [
            {
                "id": "r1",
                "text": "נדל\"ן בשווי 2 מיליארד ₪ לעומת שווי שוק נמוך בהרבה",
                "isCorrect": true,
                "isTrap": false,
                "appliesToDecision": "buy",
                "principleId": "margin-of-safety"
            },
            {
                "id": "r2",
                "text": "מנכ\"ל מוכח עם skin in the game (קנה מניות מכספו)",
                "isCorrect": true,
                "isTrap": false,
                "appliesToDecision": "buy",
                "principleId": "management-quality"
            },
            {
                "id": "r3",
                "text": "מגמת שיפור ברורה - same-store sales חיובי",
                "isCorrect": true,
                "isTrap": false,
                "appliesToDecision": "buy",
                "principleId": "turnaround"
            },
            {
                "id": "r4",
                "text": "החברה עדיין מפסידה כסף - סיכון גבוה מדי",
                "isCorrect": false,
                "isTrap": true,
                "appliesToDecision": "pass",
                "principleId": null
            },
            {
                "id": "r5",
                "text": "ענף הקמעונאות בדעיכה בגלל אונליין",
                "isCorrect": false,
                "isTrap": false,
                "appliesToDecision": "pass",
                "principleId": null
            },
            {
                "id": "r6",
                "text": "P/B של 0.4 מספק מרווח ביטחון משמעותי",
                "isCorrect": true,
                "isTrap": false,
                "appliesToDecision": "buy",
                "principleId": "margin-of-safety"
            }
        ],
        "sellTriggers": [
            {
                "id": "s1",
                "text": "המנכ\"ל עוזב או מוכר מניות",
                "isCorrect": true
            },
            {
                "id": "s2",
                "text": "same-store sales חוזרים לשליליים ל-2 רבעונים רצופים",
                "isCorrect": true
            },
            {
                "id": "s3",
                "text": "המניה עולה ב-50%",
                "isCorrect": false
            },
            {
                "id": "s4",
                "text": "מכירת נכסי הנדל\"ן במחיר נמוך משמעותית מההערכה",
                "isCorrect": true
            }
        ],
        "dueDiligence": [
            {
                "id": "d1",
                "text": "הערכת שווי עצמאית לנכסי הנדל\"ן",
                "isCorrect": true
            },
            {
                "id": "d2",
                "text": "ראיון עם המנכ\"ל",
                "isCorrect": true
            },
            {
                "id": "d3",
                "text": "בדיקת תנאי החוב והקובננטים",
                "isCorrect": true
            },
            {
                "id": "d4",
                "text": "סקירת הרגלי קנייה של לקוחות באפליקציה",
                "isCorrect": false
            }
        ],
        "feedback": {
            "principle": {
                "id": "turnaround",
                "name": "סיפור שיקום"
            },
            "decisiveSignals": [
                "מנהל מוכח עם skin in the game",
                "נדל\"ן > שווי שוק",
                "מגמת שיפור ברורה",
                "P/B של 0.4"
            ],
            "correctExplanation": "מצוין! זיהית סיפור טיפוסי של turnaround - מנהל מוכח, נכסים מוחשיים בשווי גבוה ממחיר השוק, ומגמת שיפור ברורה.",
            "incorrectExplanation": "פספוס! זה בדיוק סוג ההזדמנויות שמשקיעי ערך מחפשים - חברה בתחתית עם נכסים חבויים וניהול חדש.",
            "reasoningFeedback": {
                "fullCorrect": "מושלם! זיהית את כל הגורמים המרכזיים לסיפור השיקום.",
                "partialCorrect": "טוב, אבל יש עוד נקודות חשובות שכדאי לזהות.",
                "fellForTrap": "נפלת במלכודת! הפסדים חשבונאיים לא אומרים שאין ערך."
            }
        },
        "isGoodValue": true,
        "difficulty": "hard",
        "difficultyValue": 3,
        "hint": "המנכ\"ל קנה מניות מכספו. נדל\"ן לא ממונף בשווי גבוה משווי השוק.",
        "chartType": "annual"
    },
    {
        "id": "cannabis-medical-01",
        "name": "חברת קנאביס רפואי",
        "sector": "קנאביס רפואי",
        "symbol": "CANN",
        "price": 12.5,
        "tier": 4,
        "description": "אחת מחברות הקנאביס הרפואי הראשונות שהוקמו ב-2013. מתקני גידול מתקדמים, רישיונות ייצור והפצה, 20 זנים רפואיים. 30,000 מטופלים פעילים. בשיאה ב-2021 נסחרה ב-150 ₪ למניה. ירידה של 92% בגלל תחרות, רגולציה, וציפיות מופרזות. אך החברה עדיין רווחית, בניגוד לרוב המתחרות. שוק הקנאביס הרפואי ממשיך לגדול 20% בשנה. רכישות קטנות של מתחרים כושלים.",
        "management": "המייסד-CEO, רופא לשעבר, עדיין מוביל אחרי 10 שנים. ניהול שמרני שהתנגד להתרחבות מהירה מדי. CFO מנוסה מתעשיית הפארמה שומר על משמעת פיננסית. תרבות של איכות ומחקר במקום hype. לא חילקו בונוסים ענק בבועה. ההנהלה מחזיקה 25% מהחברה ולא מכרה בשיא. גייסו מעט יחסית הון ונמנעו מדילול. אך חסרים ב-marketing ובחדשנות מוצרים.",
        "moat": "אחד הרישיונות הראשונים עם reputation חזק בקרב רופאים. GMP certification למתקני הייצור. IP על זנים ייחודיים ושיטות גידול. בסיס נתונים רפואי יקר ערך. קשרים עם מערכת הבריאות. אך השוק נהיה commoditized. מחירים ירדו 50% ב-3 שנים. קל יחסית לקבל רישיונות חדשים. תחרות מיבוא זול. סטיגמה עדיין קיימת. רגולציה לא יציבה.",
        "events": "רכישת מתחרה קטן ב-20 מיליון ₪ הוסיפה 5,000 מטופלים. השקת קו מוצרי CBD ללא מרשם. מחקר קליני חדש בשיתוף בית חולים גדול. הורדת מחירים ב-20% כדי להתחרות. EBITDA margin נשמר על 25%. שוק הייצוא לגרמניה נפתח עם margins גבוהים. רגולטור שוקל להקל בתנאי הרישוי.",
        "metrics": {
            "basic": [
                {
                    "name": "P/E",
                    "value": "8.5"
                },
                {
                    "name": "EPS",
                    "value": "1.47 ₪"
                },
                {
                    "name": "תשואת דיבידנד",
                    "value": "0%"
                },
                {
                    "name": "P/B",
                    "value": "0.7"
                }
            ],
            "advanced": [
                {
                    "name": "ROE",
                    "value": "15%"
                },
                {
                    "name": "ROIC",
                    "value": "12%"
                },
                {
                    "name": "FCF (מיליון ₪)",
                    "value": "35"
                },
                {
                    "name": "EBITDA Margin",
                    "value": "25%"
                },
                {
                    "name": "Revenue per patient",
                    "value": "4,000 ₪/year"
                },
                {
                    "name": "Patient growth",
                    "value": "15% YoY"
                },
                {
                    "name": "Debt/Equity",
                    "value": "0.2"
                },
                {
                    "name": "Quick Ratio",
                    "value": "1.8"
                },
                {
                    "name": "Working Capital/Sales",
                    "value": "20%"
                },
                {
                    "name": "Market Share",
                    "value": "12%"
                }
            ]
        },
        "historicalData": [
            {
                "year": "year-4",
                "revenue": 80,
                "fcf": 15
            },
            {
                "year": "year-3",
                "revenue": 100,
                "fcf": 20
            },
            {
                "year": "year-2",
                "revenue": 130,
                "fcf": 30
            },
            {
                "year": "year-1",
                "revenue": 140,
                "fcf": 32
            },
            {
                "year": "year-0",
                "revenue": 150,
                "fcf": 35
            }
        ],
        "projectedData": [
            {
                "year": "year+1",
                "revenue": 165,
                "fcf": 40
            },
            {
                "year": "year+2",
                "revenue": 180,
                "fcf": 45
            }
        ],
        "correctDecision": "buy",
        "pointValue": 250,
        "hints": [
            {
                "cost": 0.5,
                "text": "זו אחת החברות היחידות בענף עם FCF חיובי ו-EBITDA margin של 25%. נסחרת ב-P/E של 8.5 ו-70% מהערך הפנקסני. ההנהלה רכשה מניות בשווי 3 מיליון ₪ בחצי השנה האחרונה. השוק גדל 20% בשנה אך המניה מתומחרת כאילו החברה תיעלם."
            }
        ],
        "reasoningOptions": [
            {
                "id": "r1",
                "text": "P/E של 8.5 עם צמיחה של 15% - זול מאוד",
                "isCorrect": true,
                "isTrap": false,
                "appliesToDecision": "buy",
                "principleId": "margin-of-safety"
            },
            {
                "id": "r2",
                "text": "FCF חיובי בענף שרוב החברות מפסידות",
                "isCorrect": true,
                "isTrap": false,
                "appliesToDecision": "buy",
                "principleId": "owner-earnings"
            },
            {
                "id": "r3",
                "text": "הנהלה שקונה מניות ולא מכרה בשיא",
                "isCorrect": true,
                "isTrap": false,
                "appliesToDecision": "buy",
                "principleId": "management-quality"
            },
            {
                "id": "r4",
                "text": "ענף הקנאביס נהרס - המניה ירדה 92%",
                "isCorrect": false,
                "isTrap": true,
                "appliesToDecision": "pass",
                "principleId": null
            },
            {
                "id": "r5",
                "text": "תחרות גוברת ומחירים יורדים",
                "isCorrect": false,
                "isTrap": false,
                "appliesToDecision": "pass",
                "principleId": null
            },
            {
                "id": "r6",
                "text": "EBITDA margin של 25% מראה יתרון תחרותי",
                "isCorrect": true,
                "isTrap": false,
                "appliesToDecision": "buy",
                "principleId": "moat"
            }
        ],
        "sellTriggers": [
            {
                "id": "s1",
                "text": "EBITDA margin יורד מתחת ל-15%",
                "isCorrect": true
            },
            {
                "id": "s2",
                "text": "הנהלה מתחילה למכור מניות",
                "isCorrect": true
            },
            {
                "id": "s3",
                "text": "שינוי רגולטורי שליחי",
                "isCorrect": true
            },
            {
                "id": "s4",
                "text": "המניה חוזרת לשיא של 150 ₪",
                "isCorrect": false
            }
        ],
        "dueDiligence": [
            {
                "id": "d1",
                "text": "פגישה עם רופאים שרושמים את המוצרים",
                "isCorrect": true
            },
            {
                "id": "d2",
                "text": "בדיקת איכות המוצרים וסטנדרטים",
                "isCorrect": true
            },
            {
                "id": "d3",
                "text": "הבנת הסביבה הרגולטורית",
                "isCorrect": true
            },
            {
                "id": "d4",
                "text": "ניתוח טכני של המניה",
                "isCorrect": false
            }
        ],
        "feedback": {
            "principle": {
                "id": "margin-of-safety",
                "name": "מרווח ביטחון"
            },
            "decisiveSignals": [
                "FCF חיובי בענף של הפסדים",
                "P/E של 8.5 עם צמיחה",
                "הנהלה שקונה מניות",
                "EBITDA margin חזק"
            ],
            "correctExplanation": "נכון! חברה רווחית בענף שעבר בועה ונמצא בתחתית. ב-P/E של 8.5 עם צמיחה, זו הזדמנות.",
            "incorrectExplanation": "החמצה! הסנטימנט השלילי סביב הענף יוצר הזדמנות בחברה איכותית שנסחרת בזול קיצוני.",
            "reasoningFeedback": {
                "fullCorrect": "מעולה! זיהית את מרווח הביטחון ואת איכות החברה למרות הסנטימנט השלילי.",
                "partialCorrect": "טוב, אבל יש עוד היבטים חשובים.",
                "fellForTrap": "נפלת במלכודת! ירידת מחיר לא אומרת שאין ערך - זה יכול ליצור הזדמנות."
            }
        },
        "isGoodValue": true,
        "difficulty": "expert",
        "difficultyValue": 4,
        "hint": "FCF חיובי בענף של הפסדים. P/E של 8.5 עם צמיחה.",
        "chartType": "annual"
    },
    {
        "id": "cyclical-expert-x01",
        "name": "גלבוע חומרי גלם בע\"מ",
        "sector": "כרייה ומינרלים",
        "symbol": "GLBH",
        "price": 28,
        "tier": 4,
        "chartType": "annual",
        "description": "חברת כרייה שנמצאת בשנה השלישית של שפל מחזורי. המניה ירדה 65% מהשיא. P/E שלילי, אבל: מאזן חזק (חוב/הון 0.2), רכשה זיכיונות חדשים במחירי שפל, ומנכ\"ל ותיק שקנה מניות ב-₪8M בשנה האחרונה. האנליסטים 'מוכרים' פה אחד.",
        "management": "מנכ\"ל 20 שנות ניסיון בכרייה. 15% אחזקה. קנה מניות ב-₪8M כשכולם מוכרים. ניהל 3 מחזורים בהצלחה.",
        "moat": "זיכיונות כרייה ייחודיים, עלויות ייצור ברבעון התחתון עולמית, גישה לנמל.",
        "events": "כל האנליסטים 'מוכרים'. 2 מתחרים סגרו מכרות לא רווחיים. רכישת 2 זיכיונות חדשים ב-₪15M (מחיר שפל).",
        "metrics": {
            "basic": [
                {
                    "name": "P/E",
                    "value": "שלילי (הפסד מחזורי)"
                },
                {
                    "name": "ROE",
                    "value": "-4%"
                },
                {
                    "name": "P/NAV",
                    "value": "0.45"
                }
            ],
            "advanced": [
                {
                    "name": "P/E מנורמל",
                    "value": "5"
                },
                {
                    "name": "חוב/הון",
                    "value": "0.2"
                },
                {
                    "name": "עלות ייצור (רבעון עולמי)",
                    "value": "25% תחתון"
                }
            ]
        },
        "historicalData": [
            {
                "year": "year-4",
                "revenue": 480,
                "fcf": 90
            },
            {
                "year": "year-3",
                "revenue": 350,
                "fcf": 35
            },
            {
                "year": "year-2",
                "revenue": 260,
                "fcf": -10
            },
            {
                "year": "year-1",
                "revenue": 220,
                "fcf": -18
            },
            {
                "year": "year-0",
                "revenue": 210,
                "fcf": -15
            }
        ],
        "projectedData": [
            {
                "year": "year+1",
                "revenue": 240,
                "fcf": 5
            },
            {
                "year": "year+2",
                "revenue": 320,
                "fcf": 45
            }
        ],
        "correctDecision": "buy",
        "pointValue": 300,
        "hints": [
            {
                "cost": 0.5,
                "text": "כשכל האנליסטים 'מוכרים' ובעל השליטה קונה ב-₪8M — מי כנראה צודק?"
            }
        ],
        "feedback": {
            "principle": {
                "id": "cyclical-trap",
                "name": "מלכודת מחזוריות"
            },
            "decisiveSignals": [
                "P/E מנורמל 5 = זול מאוד",
                "חוב/הון 0.2 = תשרוד כל שפל",
                "מנכ\"ל קונה + מתחרים סוגרים"
            ],
            "correctExplanation": "מצוין! זו הדוגמה הקלאסית: כשכולם מוכרים, המשקיע החכם קונה. P/E שלילי על רווחי שפל, אבל P/E מנורמל 5 = זול בטירוף. מאזן חזק + מנכ\"ל שקונה + מתחרים סוגרים = כל הסימנים לתחתית.",
            "incorrectExplanation": "טעות! P/E שלילי, הפסדים, 'כל האנליסטים מוכרים' — הפחיד אותך? בדיוק בזה בנוי שוק ההון. בתחתית מחזור, כשכולם מפחדים — שם ההזדמנויות.",
            "counterSignalExplanation": "הצד השני יטען: הפסד מחזורי יכול להימשך שנים. 'קניית מנכ\"ל' עלולה להיות סינון — הוא מחויב רגשית. P/NAV 0.45 אבל אולי ה-NAV מנופח. אנליסטים אולי צודקים הפעם."
        },
        "workedExample": "1) P/E שלילי — מפחיד. אבל זה כרייה = מחזורית מהטהורות. 2) מיקום במחזור: 3 שנות שפל, הכנסות ירדו 56% מהשיא. 3) חוסן: חוב/הון 0.2 = אחת החברות הבטוחות בענף. 4) סימנים לתחתית: 2 מתחרים סגרו = היצע יורד = מחירים יעלו. 5) הנהלה: מנכ\"ל ותיק קונה ב-₪8M = skin in the game מקסימלי. 6) תמחור: P/E מנורמל 5, P/NAV 0.45 = המחיר מתמחר כאילו החברה גוססת. 7) מסקנה: contrarian buy — קנייה בשפל.",
        "reasoningOptions": [
            {
                "text": "P/E מנורמל 5 + מאזן חזק = זול ובטוח",
                "correct": true
            },
            {
                "text": "מתחרים סוגרים = היצע יורד = מחירים יעלו",
                "correct": true
            },
            {
                "text": "מנכ\"ל קונה ב-₪8M כשכולם מוכרים = contrarian signal",
                "correct": true
            },
            {
                "text": "כל האנליסטים מוכרים = הם יודעים משהו",
                "correct": false,
                "biasTag": "הטיית עדר"
            },
            {
                "text": "P/E שלילי = חברה בדרך לפשיטת רגל",
                "correct": false,
                "biasTag": "טעות מחזוריות"
            },
            {
                "text": "הכנסות ירדו 56% = עסק בקריסה",
                "correct": false,
                "biasTag": "הטיית עדכניות"
            }
        ],
        "sellTriggers": [
            "מנכ\"ל מתחיל למכור מניות",
            "חוב/הון עולה מעל 0.8",
            "מחירי חומרי גלם חוזרים לשיא ללא שיפור ברווחים",
            "מתחרים חדשים נכנסים עם טכנולוגיה זולה יותר"
        ],
        "dueDiligence": [
            "לבדוק מחירי חומרי גלם גלובליים — האם יש סימני התאוששות?",
            "לבדוק את מועד תפוגת הזיכיונות החדשים",
            "לוודא שמנכ\"ל לא קנה מניות כחלק מתוכנית מוגדרת מראש"
        ],
        "isGoodValue": true,
        "difficulty": "expert",
        "difficultyValue": 4,
        "hint": "כשכל האנליסטים 'מוכרים' ובעל השליטה קונה ב-₪8M — מי כנראה צודק?"
    },
    {
        "id": "governance-expert-x01",
        "name": "אי.די.אי אחזקות בע\"מ",
        "sector": "אחזקות מגוונות",
        "symbol": "ADIA",
        "price": 320,
        "tier": 4,
        "chartType": "segments",
        "description": "קבוצת אחזקות גדולה עם ביטוח, נדל\"ן, ותקשורת. על הנייר: P/E 7, דיבידנד 5%, FCF חזק. אבל: מבנה פירמידלי עם 4 שכבות, בעל שליטה שמנהל 3 חברות נוספות, עסקאות בעלי עניין מורכבות, ודוחות שצריך תואר חשבונאות לקרוא.",
        "management": "בעל שליטה חכם אבל מנהל 'אימפריה'. 4 שכבות אחזקה = 22% שליטה כלכלית אבל 51% כוח הצבעה. 3 חברות נוספות = ניגודי עניין.",
        "moat": "חברות הבת חזקות (ביטוח, נדל\"ן), אבל השאלה היא כמה ערך מגיע למשקיע במניות.",
        "events": "עסקה מורכבת בין חברות הקבוצה שהעשירה את בעל השליטה. 'הלוואת בעלים' בתנאים לא שוק. דוח של 450 עמודים.",
        "metrics": {
            "basic": [
                {
                    "name": "P/E",
                    "value": "7"
                },
                {
                    "name": "ROE",
                    "value": "14%"
                },
                {
                    "name": "תשואת דיבידנד",
                    "value": "5%"
                }
            ],
            "advanced": [
                {
                    "name": "P/NAV",
                    "value": "0.6"
                },
                {
                    "name": "FCF (מיליון ₪)",
                    "value": "180"
                },
                {
                    "name": "דיסקאונט אחזקה",
                    "value": "40%"
                }
            ]
        },
        "segmentData": [
            {
                "name": "ביטוח (חברת בת)",
                "revenue": 2400,
                "margin": "8%",
                "growth": "+5%"
            },
            {
                "name": "נדל\"ן (חברת בת)",
                "revenue": 800,
                "margin": "42%",
                "growth": "+3%"
            },
            {
                "name": "תקשורת (חברת בת)",
                "revenue": 600,
                "margin": "12%",
                "growth": "-2%"
            },
            {
                "name": "הוצאות מטה + בעלי עניין",
                "revenue": -120,
                "margin": "N/A",
                "growth": "+15%"
            }
        ],
        "projectedData": [
            {
                "year": "year+1",
                "revenue": 3800,
                "fcf": 185
            },
            {
                "year": "year+2",
                "revenue": 3900,
                "fcf": 190
            }
        ],
        "correctDecision": "pass",
        "pointValue": 300,
        "hints": [
            {
                "cost": 0.5,
                "text": "P/E 7 עם FCF ₪180M — למה הדיסקאונט 40%? השוק לא טיפש."
            }
        ],
        "feedback": {
            "principle": {
                "id": "management-quality",
                "name": "איכות הנהלה"
            },
            "decisiveSignals": [
                "4 שכבות פירמידה = 22% כלכלי, 51% הצבעה",
                "עסקאות בעלי עניין",
                "הוצאות מטה +15% בשנה"
            ],
            "correctExplanation": "נכון! הדיסקאונט של 40% לא חינם — הוא משקף ממשל תאגידי בעייתי. בעל שליטה עם 22% אחזקה כלכלית ו-51% כוח הצבעה = הוא מקבל החלטות לטובתו, לא לטובתכם. FCF ₪180M — אבל כמה באמת מגיע למשקיע?",
            "incorrectExplanation": "טעות! P/E 7 ו-FCF ₪180M מסנוורים. אבל הדיסקאונט 40% הוא שם לסיבה: מבנה פירמידלי + עסקאות בעלי עניין = הערך נוזל לבעל השליטה.",
            "counterSignalExplanation": "הצד השני יטען: P/NAV 0.6 = קונים נכסים ייכותיים ב-60%. חברות הבת עצמן חזקות (ביטוח, נדל\"ן). בעל שליטה חכם יוצר ערך לטווח ארוך, והדיסקאונט יצטמצם."
        },
        "workedExample": "1) P/E 7, FCF ₪180M, P/NAV 0.6 — זול! אבל למה? 2) מבנה: 4 שכבות פירמידה. 22% כלכלי = על כל ₪1 ערך שנוצר, בעל השליטה מקבל רק 22 אגורות, אבל שולט ב-51%. 3) עסקאות: 'הלוואת בעלים בתנאים לא שוק' + הוצאות מטה +15% = ניקוז שיטתי. 4) מורכבות: דוח 450 עמודים = מה מוסתר? 5) דיסקאונט 40% = השוק מעריך שהממשל התאגידי פוגע בערך. 6) מסקנה: נכסים טובים, ממשל רע = העל. הדיסקאונט מוצדק.",
        "reasoningOptions": [
            {
                "text": "22% כלכלי אבל 51% הצבעה = אינטרסים לא מיושרים",
                "correct": true
            },
            {
                "text": "עסקאות בעלי עניין + הוצאות מטה +15% = ניקוז ערך",
                "correct": true
            },
            {
                "text": "P/E 7 = זול מדי — יש הזדמנות לצמצום דיסקאונט",
                "correct": false,
                "biasTag": "הטיית עיגון על מכפיל"
            },
            {
                "text": "דיסקאונט 40% מגן עלינו — גם אם יש בעיות, קנינו בזול",
                "correct": false,
                "biasTag": "מלכודת ערך"
            },
            {
                "text": "חברות הבת (ביטוח, נדל\"ן) חזקות עצמאית",
                "correct": false,
                "biasTag": "הפרדה לא-לגיטימית"
            },
            {
                "text": "דוח 450 עמודים + מבנה מורכב = too hard to analyze",
                "correct": true
            }
        ],
        "sellTriggers": [
            "שינוי ממשל תאגידי לטובת משקיעי מיעוט",
            "ביטול מבנה פירמידלי",
            "שקיפות מלאה בעסקאות בעלי עניין"
        ],
        "dueDiligence": [
            "לבדוק כל עסקאות בעלי עניין ב-3 שנים אחרונות",
            "להשוות דיסקאונט אחזקה לקבוצות דומות",
            "לבדוק האם רשות ני\"ע העירה על הדיווח"
        ],
        "isGoodValue": false,
        "difficulty": "expert",
        "difficultyValue": 4,
        "hint": "P/E 7 עם FCF ₪180M — למה הדיסקאונט 40%? השוק לא טיפש."
    },
    {
        "id": "turnaround-expert-x01",
        "name": "אופק תקשורת בע\"מ",
        "sector": "תקשורת / מדיה",
        "symbol": "OFKT",
        "price": 18,
        "tier": 4,
        "chartType": "segments",
        "description": "חברת מדיה שהייתה גוססת: הכנסות ירדו 50% ב-4 שנים, החוב חנק אותה, והמניה ירדה 80%. מנכ\"לית חדשה מונתה לפני 30 חודשים ועשתה: (1) ארגון מחדש של החוב (הפחיתה ריבית 40%), (2) סגירת 3 חטיבות הפסדיות, (3) פיבוט לדיגיטל שעכשיו מהווה 35% מההכנסות עם מרווח 25%. FCF הפך חיובי ברבעון האחרון.",
        "management": "מנכ\"לית עם רקורד שיקום (שיקמה חברת קמעונאות בעבר). קנתה 4% מהמניות מכספה. תגמול 80% מבוסס FCF.",
        "moat": "אין חפיר מובהק עדיין, אבל הסגמנט הדיגיטלי בונה lock-in.",
        "events": "FCF חיובי לראשונה ברבעון. חוזה חדש עם פלטפורמה בינלאומית. 2 אנליסטים החלו כיסוי.",
        "metrics": {
            "basic": [
                {
                    "name": "P/E",
                    "value": "שלילי (עדיין על בסיס שנתי)"
                },
                {
                    "name": "P/E על FCF מנורמל",
                    "value": "12"
                },
                {
                    "name": "ROE",
                    "value": "-2% (משתפר)"
                }
            ],
            "advanced": [
                {
                    "name": "ROIC (סגמנט דיגיטלי)",
                    "value": "22%"
                },
                {
                    "name": "FCF (רבעוני אחרון)",
                    "value": "+₪3M"
                },
                {
                    "name": "חוב/הון (אחרי ארגון מחדש)",
                    "value": "1.2 (ירד מ-3.5)"
                }
            ]
        },
        "segmentData": [
            {
                "name": "דיגיטלי (חדש)",
                "revenue": 42,
                "margin": "25%",
                "growth": "+55%"
            },
            {
                "name": "שידור מסורתי",
                "revenue": 55,
                "margin": "8%",
                "growth": "-10%"
            },
            {
                "name": "שירותי תוכן",
                "revenue": 23,
                "margin": "15%",
                "growth": "+5%"
            }
        ],
        "projectedData": [
            {
                "year": "year+1",
                "revenue": 135,
                "fcf": 15
            },
            {
                "year": "year+2",
                "revenue": 155,
                "fcf": 28
            }
        ],
        "correctDecision": "buy",
        "pointValue": 300,
        "hints": [
            {
                "cost": 0.5,
                "text": "הסגמנט הדיגיטלי צומח 55% עם מרווח 25%. אם הוא יגיע ל-60% מההכנסות, מה ה-P/E?"
            }
        ],
        "feedback": {
            "principle": {
                "id": "turnaround",
                "name": "שיקום"
            },
            "decisiveSignals": [
                "FCF חיובי לראשונה",
                "סגמנט דיגיטלי: ROIC 22%, +55% צמיחה",
                "מנכ\"לית עם 4% + רקורד"
            ],
            "correctExplanation": "מצוין! שיקום אמיתי — כל התנאים מתקיימים: (1) הנהלה חדשה עם רקורד + skin in the game, (2) פעולות מובנות (ארגון חוב, סגירת הפסדיים, פיבוט), (3) תוצאות: FCF חיובי, סגמנט חדש רווחי. P/E על FCF מנורמל 12 = זול לסיפור שיקום.",
            "incorrectExplanation": "טעות! P/E שלילי, חוב גבוה, הכנסות ירדו 50% — כל זה מהעבר. ההווה שונה: FCF חיובי, סגמנט דיגיטלי +55%, חוב ירד מ-3.5 ל-1.2. שיקום אמיתי — לא סיפור.",
            "counterSignalExplanation": "הצד השני יטען: עדיין P/E שלילי שנתי, חוב/הון 1.2 גבוה, רבעון אחד חיובי לא מגמה, ומדיה מסורתית ממשיכה לדעוך."
        },
        "workedExample": "1) עבר: הכנסות -50%, חוב 3.5, מניה -80% = גוססת. 2) הנהלה חדשה: רקורד + 4% + תגמול FCF = כל הסימנים הנכונים. 3) פעולות: ארגון חוב (1.2 מ-3.5), סגירת הפסדיים, פיבוט דיגיטלי. 4) תוצאות: FCF חיובי ברבעון, דיגיטלי 35% הכנסות עם ROIC 22%. 5) תמחור: P/E 12 על FCF מנורמל. 6) הסיכון: רבעון 1 בלבד, חוב עדיין 1.2. 7) מסקנה: שיקום אמיתי בשלב מוקדם — קנייה.",
        "reasoningOptions": [
            {
                "text": "FCF חיובי + סגמנט דיגיטלי ROIC 22% = שיקום אמיתי",
                "correct": true
            },
            {
                "text": "מנכ\"לית עם רקורד + 4% אחזקה + תגמול FCF = מחויבות",
                "correct": true
            },
            {
                "text": "P/E שלילי שנתי = החברה עדיין מפסידה",
                "correct": false,
                "biasTag": "עיגון על נתון מיושן"
            },
            {
                "text": "חוב/הון 1.2 = עדיין מסוכן מדי",
                "correct": false,
                "biasTag": "הערכת יתר של סיכון יורד"
            },
            {
                "text": "חוב ירד מ-3.5 ל-1.2 = שיפור דרמטי במבנה הון",
                "correct": true
            },
            {
                "text": "מדיה מסורתית מתה = החברה תלך",
                "correct": false,
                "biasTag": "התעלמות מהפיבוט"
            }
        ],
        "sellTriggers": [
            "FCF חוזר לשלילי 2 רבעונים רצופים",
            "מנכ\"לית מוכרת מניות",
            "צמיחת הסגמנט הדיגיטלי מאטה מתחת ל-20%",
            "חוב/הון חוזר מעל 2.0"
        ],
        "dueDiligence": [
            "לבדוק את תנאי ארגון החוב — האם יש covenants שמגבילים?",
            "לבדוק אם לקוחות הדיגיטלי חתומים על חוזים או month-to-month",
            "להשוות ROIC של הדיגיטלי למתחרים בסקטור"
        ],
        "isGoodValue": true,
        "difficulty": "expert",
        "difficultyValue": 4,
        "hint": "הסגמנט הדיגיטלי צומח 55% עם מרווח 25%. אם הוא יגיע ל-60% מההכנסות, מה ה-P/E?"
    },
    {
        "id": "triple-trap-x01",
        "name": "נדל\"ן מסחרי פלוס בע\"מ",
        "sector": "נדל\"ן מסחרי",
        "symbol": "NDLP",
        "price": 65,
        "tier": 4,
        "chartType": "annual",
        "description": "חברה שמשלבת שלוש מלכודות: (1) דיבידנד 9% שנראה מעולה — אבל יחס חלוקה 105% (מחלקת מעבר ל-FCF). (2) חוב/הון 4.0 עם 50% ריבית משתנה. (3) 45% מהשוכרים בענף שנמצא בשיא מחזורי. P/E 6 'מציאה' — על הנייר.",
        "management": "מנכ\"ל שמסרב לחתוך דיבידנד כי 'זו ההבטחה לבעלי המניות'. ללא אחזקת מניות.",
        "moat": "מיקומים מרכזיים, אבל שוכרים מרוכזים ותלויי מחזור.",
        "events": "קרן ריבית עלתה. שוכר עוגן (15% מההכנסות) הודיע על צמצום שטחים. יחס כיסוי ריבית 1.3x.",
        "metrics": {
            "basic": [
                {
                    "name": "P/E",
                    "value": "6"
                },
                {
                    "name": "ROE",
                    "value": "18% (ממונף)"
                },
                {
                    "name": "תשואת דיבידנד",
                    "value": "9%"
                }
            ],
            "advanced": [
                {
                    "name": "ROIC",
                    "value": "4.5%"
                },
                {
                    "name": "יחס חלוקה",
                    "value": "105% (!)"
                },
                {
                    "name": "יחס כיסוי ריבית",
                    "value": "1.3x"
                }
            ]
        },
        "historicalData": [
            {
                "year": "year-4",
                "revenue": 320,
                "fcf": 42
            },
            {
                "year": "year-3",
                "revenue": 340,
                "fcf": 45
            },
            {
                "year": "year-2",
                "revenue": 350,
                "fcf": 43
            },
            {
                "year": "year-1",
                "revenue": 355,
                "fcf": 40
            },
            {
                "year": "year-0",
                "revenue": 360,
                "fcf": 38
            }
        ],
        "projectedData": [
            {
                "year": "year+1",
                "revenue": 340,
                "fcf": 28
            },
            {
                "year": "year+2",
                "revenue": 310,
                "fcf": 15
            }
        ],
        "correctDecision": "pass",
        "pointValue": 300,
        "hints": [
            {
                "cost": 0.5,
                "text": "יחס חלוקה 105% + יחס כיסוי 1.3x + חוב/הון 4.0 = כמה 'רשתות ביטחון' יש כאן?"
            }
        ],
        "feedback": {
            "principle": {
                "id": "dividend-sustainability",
                "name": "קיימות דיבידנד"
            },
            "decisiveSignals": [
                "יחס חלוקה 105% = מחלקת מעבר ליכולת",
                "יחס כיסוי 1.3x = בול על הגבול",
                "3 סיכונים מצטברים"
            ],
            "correctExplanation": "נכון! שלוש מלכודות בחברה אחת: (1) דיבידנד לא בר-קיימא (105% יחס חלוקה). (2) מינוף קיצוני (4.0 + ריבית משתנה). (3) חשיפה מחזורית (45% שוכרים בשיא). כשכולם מתממשים ביחד — קריסה.",
            "incorrectExplanation": "טעות! P/E 6, דיבידנד 9% — המלכודת המושלמת. יחס חלוקה 105% = החברה לוותת כדי לשלם דיבידנד. יחס כיסוי 1.3x = כל הפתעה קטנה = בעיה. וחוב/הון 4.0 = אין מרחב טעות.",
            "counterSignalExplanation": "הצד השני יטען: P/E 6 = מציאה. דיבידנד 9% = תשואה מעולה. נדל\"ן מסחרי = נכסים 'אמיתיים'. ואולי המנכ\"ל צודק שאפשר לשמור על הדיבידנד."
        },
        "workedExample": "1) P/E 6, דיבידנד 9% — מפתה. נבדוק 3 זוויות. 2) דיבידנד: יחס חלוקה 105% = מחלקת מהלוואות, לא מרווחים. 3) מינוף: חוב/הון 4.0, 50% ריבית משתנה, כיסוי 1.3x = על הגבול. 4) מחזוריות: 45% שוכרים בשיא = כשהמחזור יירד, ההכנסות ייפגעו. 5) שוכר עוגן מצמצם = ההכנסות כבר יורדות. 6) תרחיש: ריבית עולה + שוכר עוזב + מחזור יורד = FCF קורס → דיבידנד נחתך → מניה נופלת. 7) מסקנה: שלוש מלכודות ביחד = העל.",
        "reasoningOptions": [
            {
                "text": "יחס חלוקה 105% = מחלקת מעבר ל-FCF = לא בר-קיימא",
                "correct": true
            },
            {
                "text": "3 סיכונים מצטברים (דיבידנד + מינוף + מחזור) = אפקט מצטבר",
                "correct": true
            },
            {
                "text": "P/E 6 = זול מאוד ומגן על הירידה",
                "correct": false,
                "biasTag": "עיגון על P/E ללא הקשר"
            },
            {
                "text": "נדל\"ן = נכסים אמיתיים = רצפת ערך",
                "correct": false,
                "biasTag": "הנחת ערך נכסים קבוע"
            },
            {
                "text": "ROIC 4.5% מול ROE 18% = כל התשואה ממנוף",
                "correct": true
            },
            {
                "text": "9% דיבידנד = תשואה מעולה שכדאי לקחת",
                "correct": false,
                "biasTag": "מלכודת תשואה גבוהה"
            }
        ],
        "sellTriggers": [
            "דיבידנד נחתך (סימן שהחברה מודה בבעיה)",
            "יחס כיסוי ירד מתחת ל-1.0",
            "שוכר עוגן נוסף עוזב"
        ],
        "dueDiligence": [
            "לבדוק לוח מיחזור החוב — מתי האג\"ח הבאות?",
            "לבדוק את הענפים של השוכרים — כמה מחזוריים?",
            "לבדוק האם יש covenants שיופרו אם ה-FCF ירד"
        ],
        "isGoodValue": false,
        "difficulty": "expert",
        "difficultyValue": 4,
        "hint": "יחס חלוקה 105% + יחס כיסוי 1.3x + חוב/הון 4.0 = כמה 'רשתות ביטחון' יש כאן?"
    },
    {
        "id": "contrarian-deep-x01",
        "name": "בנק הערבה בע\"מ",
        "sector": "בנקאות",
        "symbol": "BNKH",
        "price": 42,
        "tier": 4,
        "chartType": "annual",
        "description": "בנק קטן שספג הפסד חד-פעמי ₪120M מתיק אשראי אחד שנכשל. המניה ירדה 45%. אבל: שאר התיק איכותי (הפרשות רגילות 0.3%), ההון גבוה (יחס הלימות 13.5%), ההנהלה קנתה מניות, ו-ROIC מנורמל 12%. P/E מנורמל 5.5.",
        "management": "מנכ\"ל 18 שנות ניסיון בנקאי. קנה מניות ב-₪6M אחרי הירידה. סגנית מנכ\"לית גם קנתה.",
        "moat": "התמחות בעסקים קטנים ובינוניים בנגב. מכיר את הלקוחות אישית. שיעור חידוש 90%.",
        "events": "הפסד חד-פעמי ₪120M מלקוח בודד. כל ההפרשות נלקחו ברבעון אחד. תיק שאר — 0.3% הפרשות (מצוין).",
        "metrics": {
            "basic": [
                {
                    "name": "P/E (נוכחי, כולל חד-פעמי)",
                    "value": "שלילי"
                },
                {
                    "name": "P/E (מנורמל)",
                    "value": "5.5"
                },
                {
                    "name": "ROE (מנורמל)",
                    "value": "11%"
                }
            ],
            "advanced": [
                {
                    "name": "יחס הלימות הון",
                    "value": "13.5% (מינימום: 10%)"
                },
                {
                    "name": "הפרשות (ללא חד-פעמי)",
                    "value": "0.3% (ענפי: 0.8%)"
                },
                {
                    "name": "רכישות הנהלה",
                    "value": "₪8M בחודשיים"
                }
            ]
        },
        "historicalData": [
            {
                "year": "year-4",
                "revenue": 280,
                "fcf": 35
            },
            {
                "year": "year-3",
                "revenue": 295,
                "fcf": 38
            },
            {
                "year": "year-2",
                "revenue": 310,
                "fcf": 42
            },
            {
                "year": "year-1",
                "revenue": 325,
                "fcf": 45
            },
            {
                "year": "year-0",
                "revenue": 335,
                "fcf": -75
            }
        ],
        "projectedData": [
            {
                "year": "year+1",
                "revenue": 340,
                "fcf": 48
            },
            {
                "year": "year+2",
                "revenue": 355,
                "fcf": 52
            }
        ],
        "correctDecision": "buy",
        "pointValue": 300,
        "hints": [
            {
                "cost": 0.5,
                "text": "FCF ₪45M × 4 שנים → ₪-75M בגלל אירוע אחד. האם הפסד חד-פעמי משנה את טיב העסק?"
            }
        ],
        "feedback": {
            "principle": {
                "id": "margin-of-safety",
                "name": "מרווח ביטחון"
            },
            "decisiveSignals": [
                "P/E מנורמל 5.5 = זול בטירוף",
                "הלימות 13.5% = מרחב גדול",
                "הנהלה קונה ₪8M"
            ],
            "correctExplanation": "מצוין! זו דוגמה קלאסית למרווח ביטחון — אירוע חד-פעמי שהפחיד את השוק ויצר הנחה עצומה. הלימות 13.5% = הבנק חזק. הפרשות 0.3% = התיק איכותי. והנהלה שקונה ב-₪8M = הם יודעים שזה זמני.",
            "incorrectExplanation": "טעות! הפסד ₪120M וירידה 45% מפחידים. אבל: זה אירוע אחד, מלקוח אחד. 4 שנים של FCF ₪35-45M מוכיחות את איכות העסק. כשהנהלה קונה אחרי ירידה = הם מגיעים עם הכסף שלהם.",
            "counterSignalExplanation": "הצד השני יטען: אם לקוח אחד יכול לגרום להפסד ₪120M, מי אומר שזה לא יקרה שוב? בנקים קטנים פגיעים. אולי ניהול הסיכונים לקוי."
        },
        "workedExample": "1) הפסד ₪120M → מניה -45%. 2) שאלה: חד-פעמי או מבני? 3) בדיקה: הפרשות ללא החד-פעמי = 0.3% (מול 0.8% ענפי) = תיק מצוין. 4) הלימות: 13.5% מול מינימום 10% = כרית של 3.5 נקודות. 5) רקורד: FCF ₪35-45M × 4 שנים = עקביות. 6) סיגנל: הנהלה קונה ₪8M = מאמינה שזמני. 7) P/E מנורמל 5.5 = השוק מתמחר כאילו ₪120M יחזור כל שנה. 8) מסקנה: מרווח ביטחון עצום — קנייה.",
        "reasoningOptions": [
            {
                "text": "P/E מנורמל 5.5 אחרי אירוע חד-פעמי = הנחה עצומה",
                "correct": true
            },
            {
                "text": "הנהלה קונה ₪8M מכספם = מאמינים שזמני",
                "correct": true
            },
            {
                "text": "הפסד ₪120M = ניהול סיכונים כושל",
                "correct": false,
                "biasTag": "הכללת יתר מאירוע בודד"
            },
            {
                "text": "מניה ירדה 45% = השוק מתמחר סיכון אמיתי",
                "correct": false,
                "biasTag": "הטיית עדר"
            },
            {
                "text": "הלימות 13.5% = 3.5% מעל המינימום = הבנק חזק",
                "correct": true
            },
            {
                "text": "הפרשות 0.3% מול 0.8% ענפי = תיק איכותי",
                "correct": true
            }
        ],
        "sellTriggers": [
            "הפרשות 'רגילות' עולות מעל 1%",
            "הלימות הון ירדה מתחת ל-11%",
            "מנכ\"ל מוכר מניות",
            "לקוח גדול נוסף נכשל"
        ],
        "dueDiligence": [
            "לבדוק את ריכוז התיק — כמה לקוחות מעל 5% מהתיק?",
            "לבדוק האם הרגולטור דרש שינויי ניהול סיכונים",
            "לבדוק האם יש ביטוח-משנה על תיקי אשראי גדולים"
        ],
        "isGoodValue": true,
        "difficulty": "expert",
        "difficultyValue": 4,
        "hint": "FCF ₪45M × 4 שנים → ₪-75M בגלל אירוע אחד. האם הפסד חד-פעמי משנה את טיב העסק?"
    },
    {
        "id": "empire-expert-x01",
        "name": "קבוצת מזרחי גלובל בע\"מ",
        "sector": "אחזקות",
        "symbol": "MZRG",
        "price": 210,
        "tier": 4,
        "chartType": "segments",
        "description": "קונגלומרט שנוהל ע\"י 'מייסד אגדי' שבנה אימפריה ב-30 שנה. הוא פרש, והבן ירש. הבן מבצע 4 רכישות בשנה, ROIC ירד מ-16% ל-7% מאז, ההוצאות העסקיות עלו 40%, ו-FCF למניה ירד 25% בגלל דילול מצטבר. אבל: 'שם המשפחה' והנוסטלגיה שומרים על המניה.",
        "management": "יורש שלא הוכח. 4 רכישות/שנה (גודל > איכות). הוצאות נסיעות: ₪8M/שנה. דירקטוריון מאויש בחברים.",
        "moat": "חברות בת עם חפירים (פארמה, נדל\"ן), אבל המטה מנקז ערך.",
        "events": "ROIC ירד מ-16% ל-7% ב-4 שנים. דילול 8% מצטבר. רכישה אחרונה: פי 12 רווח (יקר).",
        "metrics": {
            "basic": [
                {
                    "name": "P/E",
                    "value": "11"
                },
                {
                    "name": "ROE",
                    "value": "13%"
                },
                {
                    "name": "תשואת דיבידנד",
                    "value": "3%"
                }
            ],
            "advanced": [
                {
                    "name": "ROIC",
                    "value": "7% (ירד מ-16%)"
                },
                {
                    "name": "FCF למניה (שינוי 4 שנים)",
                    "value": "-25%"
                },
                {
                    "name": "הוצאות מטה",
                    "value": "₪32M (+40% מאז הירושה)"
                }
            ]
        },
        "segmentData": [
            {
                "name": "פארמה (חברת בת ותיקה)",
                "revenue": 450,
                "margin": "28%",
                "growth": "+4%"
            },
            {
                "name": "נדל\"ן (חברת בת ותיקה)",
                "revenue": 280,
                "margin": "35%",
                "growth": "+2%"
            },
            {
                "name": "רכישות חדשות (4 חברות)",
                "revenue": 180,
                "margin": "8%",
                "growth": "+15%"
            },
            {
                "name": "הוצאות מטה",
                "revenue": -32,
                "margin": "N/A",
                "growth": "+12%"
            }
        ],
        "projectedData": [
            {
                "year": "year+1",
                "revenue": 950,
                "fcf": 68
            },
            {
                "year": "year+2",
                "revenue": 1000,
                "fcf": 65
            }
        ],
        "correctDecision": "pass",
        "pointValue": 300,
        "hints": [
            {
                "cost": 0.5,
                "text": "חברות הבת הוותיקות מרוויחות 28-35% מרווח. הרכישות החדשות — 8%. לאן הולך הערך?"
            }
        ],
        "feedback": {
            "principle": {
                "id": "management-quality",
                "name": "איכות הנהלה"
            },
            "decisiveSignals": [
                "ROIC 16% → 7% = רכישות הורסות ערך",
                "FCF למניה -25% = דילול + רכישות גרועות",
                "הוצאות מטה +40%"
            ],
            "correctExplanation": "נכון! המייסד בנה חברות בת נהדרות (מרווחים 28-35%). הבן מדלל את הערך: רכישות ב-8% מרווח, ROIC שחצי, דילול, והוצאות מטה שטסות. הסכום = FCF למניה -25% ב-4 שנים. 'שם המשפחה' שומר על המחיר — עד שלא.",
            "incorrectExplanation": "טעות! P/E 11 והכנסות שגדלות = נראה בסדר. אבל הסתכלו על FCF למניה: -25% ב-4 שנים. ההכנסות גדלות דרך רכישות מדוללות, לא דרך צמיחה אמיתית. ROIC 7% בירידה = הורסים ערך.",
            "counterSignalExplanation": "הצד השני יטען: P/E 11 זול, חברות הבת חזקות, הכנסות כוללות גדלות, והמותג המשפחתי יוצר אמון. אולי הרכישות החדשות צריכות זמן להבשיל."
        },
        "workedExample": "1) P/E 11, הכנסות גדלות — בסדר? 2) בדיקת ROIC: 16% → 7% = כל שקל שנוסף מרוויח פחות. 3) סגמנטים: וותיקות 28-35%. חדשות 8%. = רכישות גרועות. 4) FCF למניה: -25% = דילול + הוצאות אוכלים את הערך. 5) הוצאות מטה: ₪32M (+40%) = המטה הפך למרכז עלות. 6) דירקטוריון חברים = אין ביקורת. 7) מסקנה: יורש שמבזבז את מה שהמייסד בנה. העל.",
        "reasoningOptions": [
            {
                "text": "ROIC 16%→7% = כל רכישה מורידה את איכות הפורטפוליו",
                "correct": true
            },
            {
                "text": "FCF למניה -25% ב-4 שנים = בעלי מניות נפגעים",
                "correct": true
            },
            {
                "text": "P/E 11 = זול לקונגלומרט עם חברות בת חזקות",
                "correct": false,
                "biasTag": "מלכודת P/E"
            },
            {
                "text": "הכנסות גדלות = הקבוצה צומחת",
                "correct": false,
                "biasTag": "בלבול הכנסות עם ערך"
            },
            {
                "text": "חברות הבת הוותיקות מצוינות אבל המטה מנקז ערך",
                "correct": true
            },
            {
                "text": "'שם המשפחה' = מותג שמגן על הערך",
                "correct": false,
                "biasTag": "הטיית נוסטלגיה"
            }
        ],
        "sellTriggers": [
            "החלפת הנהלה ביורש לניהול מקצועי חיצוני",
            "פירוק הקונגלומרט ומכירת חברות הבת בנפרד",
            "עצירת רכישות חדשות ומיקוד בביצועים"
        ],
        "dueDiligence": [
            "להשוות שווי חברות הבת בנפרד (SOTP) מול שווי הקונגלומרט",
            "לבדוק את עסקאות בעלי העניין בפירוט",
            "לבדוק האם אקטיביסט נכנס למניה"
        ],
        "isGoodValue": false,
        "difficulty": "expert",
        "difficultyValue": 4,
        "hint": "חברות הבת הוותיקות מרוויחות 28-35% מרווח. הרכישות החדשות — 8%. לאן הולך הערך?"
    }
]
};

// ==============================
// SPECIAL EVENTS
// ==============================
window.BuffettGame.specialEvents = {
    easy: [
    {
        "id": "interest-rate-hike-01",
        "title": "העלאת ריבית",
        "description": "הבנק המרכזי הודיע על העלאת ריבית ב-0.25%.",
        "correctImpact": "negative",
        "tier": 1,
        "pointValue": 100,
        "hints": [
            {
                "cost": 0.5,
                "text": "חשבו על היוון רווחים עתידיים."
            }
        ],
        "feedback": {
            "principle": {
                "id": "leverage-risk",
                "name": "סיכון ריבית"
            },
            "correct": "צודק! העלאת ריבית לרוב משפיעה שלילית על שוק המניות - מייקרת מימון ומורידה תמחור.",
            "incorrect": "טעות. העלאת ריבית מייקרת את עלות ההון ופוגעת בתמחור מניות."
        },
        "difficulty": "easy",
        "difficultyValue": 1
    },
    {
        "id": "new-competitor-01",
        "title": "תחרות חדשה",
        "description": "מתחרה חדש נכנס לשוק עם מוצר זול יותר.",
        "correctImpact": "negative",
        "tier": 1,
        "pointValue": 100,
        "hints": [
            {
                "cost": 0.5,
                "text": "תחרות חדשה משפיעה על שולי הרווח."
            }
        ],
        "feedback": {
            "principle": {
                "id": "moat",
                "name": "חפיר כלכלי"
            },
            "correct": "נכון! תחרות מגבירה לחץ על מחירים ושולי רווח.",
            "incorrect": "טעות. כניסת מתחרים פוגעת בפוטנציאל שוק."
        },
        "difficulty": "easy",
        "difficultyValue": 1
    },
    {
        "id": "special-dividend-01",
        "title": "הודעת דיבידנד",
        "description": "חברה טכנולוגית הכריזה על דיבידנד מיוחד למחזיקים.",
        "correctImpact": "positive",
        "tier": 1,
        "pointValue": 100,
        "hints": [
            {
                "cost": 0.5,
                "text": "דיבידנדים מסמנים תזרים מזומנים יציב."
            }
        ],
        "feedback": {
            "principle": {
                "id": "owner-earnings",
                "name": "רווחי בעלים"
            },
            "correct": "נכון! דיבידנד מבטא תזרים מזומנים ושמירה על ערך.",
            "incorrect": "לא נכון. דיבידנד משקף בריאות פיננסית ויציבות."
        },
        "difficulty": "easy",
        "difficultyValue": 1
    },
    {
        "id": "insurance-claims-01",
        "title": "כיסוי ביטוח לאירוע",
        "description": "חברת ביטוח הודיעה על כיסוי מלא ללקוחותיה לאחר אסון.",
        "correctImpact": "negative",
        "tier": 1,
        "pointValue": 100,
        "hints": [
            {
                "cost": 0.5,
                "text": "הוצאות ביטוח גבוהות מורידות רווחים."
            }
        ],
        "feedback": {
            "principle": {
                "id": "owner-earnings",
                "name": "רווחי בעלים"
            },
            "correct": "נכון! כיסוי עולה במאזן החברה ופוגע ברווחיות.",
            "incorrect": "טעות. תביעות ביטוח כבדות מפחיתות רווח נטו."
        },
        "difficulty": "easy",
        "difficultyValue": 1
    },
    {
        "id": "share-issuance-01",
        "title": "הנפקת מניות חד-פעמית",
        "description": "חברה לצריכה מהירה הנפיקה מניות נוספות במסלול פרטי.",
        "correctImpact": "negative",
        "tier": 1,
        "pointValue": 100,
        "hints": [
            {
                "cost": 0.5,
                "text": "הנפקת מניות מדללת בעלות קיימת."
            }
        ],
        "feedback": {
            "principle": {
                "id": "owner-earnings",
                "name": "רווחי בעלים"
            },
            "correct": "צודק! הנפקה מדללת מפחיתה חלקו של המשקיע.",
            "incorrect": "לא נכון. הנפקה מעלה את מספר המניות ומשפיעה על הבעלות."
        },
        "difficulty": "easy",
        "difficultyValue": 1
    },
    {
        "id": "event-insider-signals-01",
        "tier": 1,
        "type": "special-event",
        "eventType": "company",
        "title": "מסחר פנימיים — מה הם יודעים?",
        "description": "בעל השליטה של חברת תשתיות יציבה מכר 10% מאחזקתו בחודש האחרון. באותו זמן, 3 דירקטורים קנו מניות. מה הסיגנל החזק יותר?",
        "options": [
            {
                "text": "בעל השליטה מוכר = סיגנל שלילי חזק. הוא יודע יותר.",
                "value": "negative"
            },
            {
                "text": "דירקטורים קונים = סיגנל חיובי. בעל שליטה אולי מגוון.",
                "value": "positive"
            },
            {
                "text": "זה לא מספיק מידע. צריך לבדוק למה בעל השליטה מוכר.",
                "value": "neutral"
            }
        ],
        "correctOption": "neutral",
        "pointValue": 100,
        "feedback": {
            "correct": "מצוין! 'בעלים מוכרים מאלף סיבות, אבל קונים רק מסיבה אחת.' צריך לבדוק: האם מכר בגלל גירושין? מיסוי? או כי הוא יודע משהו? בלי ההקשר, אי אפשר להחליט.",
            "incorrect": "לא מדויק. מכירה של בעלים לא תמיד שלילית (גירושין, מיסוי, גיוון), וקנייה של דירקטורים לא תמיד חיובית (מחויבות תדמיתית). ההקשר קריטי.",
            "principle": {
                "id": "management-quality",
                "name": "איכות הנהלה"
            }
        }
    },
    {
        "id": "event-moat-test-01",
        "tier": 1,
        "type": "special-event",
        "eventType": "company",
        "title": "מבחן החפיר: מתחרה הוזיל 20%",
        "description": "חברה שאתם מחזיקים (מותג חזק, מרווח 40%) מתמודדת עם מתחרה שהוזיל ב-20%. עברו 3 חודשים. מה אתם בודקים כדי להחליט אם החפיר שלם?",
        "options": [
            {
                "text": "בודקים אם הרווח ירד — אם לא, החפיר עובד.",
                "value": "check-profit"
            },
            {
                "text": "בודקים נתח שוק — אם לא ירד, החפיר עובד.",
                "value": "check-share"
            },
            {
                "text": "בודקים שניהם: נתח שוק + מרווח גולמי. אם שניהם יציבים = חפיר חי.",
                "value": "check-both"
            }
        ],
        "correctOption": "check-both",
        "pointValue": 100,
        "feedback": {
            "correct": "מצוין! שני המדדים חשובים: נתח שוק יציב = הלקוחות נשארים. מרווח יציב = לא נאלצו להוזיל. אם רק אחד יציב (למשל, נתח ירד אבל מרווח לא — איבדו לקוחות רגישי-מחיר אבל שמרו על האיכותיים), עדיין צריך לנתח לעומק.",
            "incorrect": "חשבו יותר. רווח לבד לא מספיק — אולי הוזילו כדי לשמר נתח. נתח שוק לבד לא מספיק — אולי שמרו נתח ע\"י הורדת מחיר (= מרווח ירד). צריך את שניהם.",
            "principle": {
                "id": "moat",
                "name": "חפיר כלכלי"
            }
        }
    },
    {
        "id": "event-ceo-letter-01",
        "tier": 1,
        "type": "special-event",
        "eventType": "company",
        "title": "מכתב המנכ\"ל: מה לחפש?",
        "description": "אתם קוראים את מכתב המנכ\"ל בדוח השנתי. איזה מכתב מעיד על הנהלה איכותית?",
        "options": [
            {
                "text": "'שנה מצוינת! הכנסות שיא, רווחים שיא, צוות מדהים!' — אופטימי ומעודד.",
                "value": "cheerleader"
            },
            {
                "text": "'עשינו 3 דברים טוב, טעינו ב-2, וכך נתקן. ROIC ירד ונתמקד בשיפור.' — כנה.",
                "value": "honest"
            },
            {
                "text": "'תנאי השוק היו קשים, הרגולציה הזיקה, המתחרים נהגו לא הוגן.' — מציאותי.",
                "value": "blame-external"
            }
        ],
        "correctOption": "honest",
        "pointValue": 100,
        "feedback": {
            "correct": "מצוין! באפט קורא כל מכתב מנכ\"ל בעיניים חשדניות. מנכ\"ל שמודה בטעויות ומסביר איך יתקן = אמין. 'הכל מעולה' = אינו מציאותי. 'אשם חיצוני' = לא לוקח אחריות.",
            "incorrect": "חשבו: מנכ\"ל שתמיד אופטימי = לא מזהיר אתכם מסיכונים. מנכ\"ל שמאשים גורמים חיצוניים = לא לוקח אחריות. מנכ\"ל שמודה בטעויות = אמין. זה מי שאתם רוצים שינהל את הכסף שלכם.",
            "principle": {
                "id": "management-quality",
                "name": "איכות הנהלה"
            }
        }
    },
    {
        "id": "event-moat-types-01",
        "tier": 1,
        "type": "special-event",
        "eventType": "macro",
        "title": "זהו את סוג החפיר",
        "description": "4 חברות, 4 חפירים שונים. דרגו את החפירים מהחזק לחלש: (A) מותג שמוכר ב-30% יותר ואנשים עדיין קונים. (B) מפעל שעלותו נמוכה ב-20% מהמתחרים. (C) רשת 500K משתמשים שמושכת עוד משתמשים. (D) רשיון ממשלתי בלעדי.",
        "options": [
            {
                "text": "C > A > D > B (רשת > מותג > רשיון > עלות)",
                "value": "network-first"
            },
            {
                "text": "D > C > A > B (רשיון > רשת > מותג > עלות)",
                "value": "license-first"
            },
            {
                "text": "A > C > B > D (מותג > רשת > עלות > רשיון)",
                "value": "brand-first"
            }
        ],
        "correctOption": "network-first",
        "pointValue": 100,
        "feedback": {
            "correct": "מצוין! רשת = מתחזק עם הזמן (ככל שגדל — חזק יותר). מותג = חזק אבל יכול להישחק לאט. רשיון = חזק אבל תלוי בהחלטה אחת. עלות = הכי חלש — מישהו זול יותר תמיד יגיע.",
            "incorrect": "חשבו על עמידות: רשת = מתחזקת עם הזמן. רשיון = החלטה ממשלתית אחת מבטלת אותו. מותג = חזק אבל נשחק. עלות = הכי פגיע — מישהו תמיד ימצא דרך לייצר בזול.",
            "principle": {
                "id": "moat",
                "name": "חפיר כלכלי"
            }
        }
    }
],
    medium: [
    {
        "id": "fixed-asset-purchase-01",
        "title": "קניית נכס קבוע",
        "description": "חברה הוציאה 200 מיליון על בניין חדש למשרדים.",
        "correctImpact": "neutral",
        "tier": 2,
        "pointValue": 150,
        "hints": [
            {
                "cost": 0.5,
                "text": "בדקו השפעה על תזרים חופשי ועתיד פעילות."
            }
        ],
        "feedback": {
            "principle": {
                "id": "owner-earnings",
                "name": "רווחי בעלים"
            },
            "correct": "נכון! השקעה בהון קבוע תומכת בפעילות אך מורידה זמנית מזומנים.",
            "incorrect": "לא מדויק. רכישת נכס מגדילה נכסים קבועים ולא משפיעה מיד על רווח."
        },
        "difficulty": "medium",
        "difficultyValue": 2
    },
    {
        "id": "inventory-reduction-01",
        "title": "דיווח על ירידה במלאי",
        "description": "חברה קמעונאית דיווחה על ירידה במלאי לקראת עליית מכירות.",
        "correctImpact": "positive",
        "tier": 2,
        "pointValue": 150,
        "hints": [
            {
                "cost": 0.5,
                "text": "מלאי נמוך מרמז על סחורה שנמכרת."
            }
        ],
        "feedback": {
            "principle": {
                "id": "owner-earnings",
                "name": "רווחי בעלים"
            },
            "correct": "נכון! מלאי מצטמצם כשהסחורות נמכרות ומשפר תזרימי מזומנים.",
            "incorrect": "טעות. מלאי שלא נראה במלאי יכול להיות בעיה אם מבוסס על פחת."
        },
        "difficulty": "medium",
        "difficultyValue": 2
    },
    {
        "id": "rd-cancellation-01",
        "title": "ביטול פרויקט R&D",
        "description": "הנהלה החליטה לוותר על פיתוח מוצר חדש בשל עלות גבוהה.",
        "correctImpact": "positive",
        "tier": 2,
        "pointValue": 150,
        "hints": [
            {
                "cost": 0.5,
                "text": "התבוננו על החזר השקעה צפוי מול עלות."
            }
        ],
        "feedback": {
            "principle": {
                "id": "owner-earnings",
                "name": "רווחי בעלים"
            },
            "correct": "נכון! ביטול פרויקט עם ROI נמוך משפר רווח עתידי.",
            "incorrect": "לא נכון. להשקעה ב-R&D יש גם יתרון אסטרטגי אך אם ROI נמוך - ניתן לוותר."
        },
        "difficulty": "medium",
        "difficultyValue": 2
    },
    {
        "id": "merger-announcement-01",
        "title": "מיזוג אסטרטגי",
        "description": "שתי חברות פלסטיק הודיעו על מיזוג ביניהן.",
        "correctImpact": "neutral",
        "tier": 2,
        "pointValue": 150,
        "hints": [
            {
                "cost": 0.5,
                "text": "שימו לב לסינרגיה ועלות המיזוג."
            }
        ],
        "feedback": {
            "principle": {
                "id": "management-quality",
                "name": "איכות הנהלה"
            },
            "correct": "נכון! מיזוג יכול לספק חסכון אך דורש עלויות גבוהות.",
            "incorrect": "לא נכון. מיזוגים מורכבים משפיעים לעיתים בשני הכיוונים."
        },
        "difficulty": "medium",
        "difficultyValue": 2
    },
    {
        "id": "employee-options-01",
        "title": "כתבי אופציה לעובדים",
        "description": "חברה ביוטק הוציאה כתבי אופציה לעובדים.",
        "correctImpact": "negative",
        "tier": 2,
        "pointValue": 150,
        "hints": [
            {
                "cost": 0.5,
                "text": "בדקו דילול ואינטרס ארוך טווח."
            }
        ],
        "feedback": {
            "principle": {
                "id": "owner-earnings",
                "name": "רווחי בעלים"
            },
            "correct": "נכון! כתבי אופציה מדללים בעלי מניות קיימים.",
            "incorrect": "טעות. אופציות לעובדים גוזרות חלק מרווח עתידי."
        },
        "difficulty": "medium",
        "difficultyValue": 2
    },
    {
        "id": "event-market-crash-01",
        "tier": 2,
        "type": "special-event",
        "eventType": "macro",
        "title": "קריסת שוק — מה עושים?",
        "description": "השוק ירד 25% בחודש. הפורטפוליו שלכם ירד 30%. הכותרות מפחידות. 'מומחים' צופים ירידה נוספת של 20%. אתם מחזיקים 3 חברות איכותיות שהתזה שלהם לא נשברה, אבל יש לכם 15% מזומן.",
        "options": [
            {
                "text": "למכור הכל ולחכות שהסערה תעבור — הגנה על ההון.",
                "value": "sell-all"
            },
            {
                "text": "לא לעשות כלום — להחזיק את מה שיש ולא להיבהל.",
                "value": "hold"
            },
            {
                "text": "להשקיע את ה-15% מזומן בחברות האיכותיות שהוזלו.",
                "value": "buy-more"
            }
        ],
        "correctOption": "buy-more",
        "pointValue": 150,
        "feedback": {
            "correct": "מצוין! באפט: 'היו חששנים כשאחרים חמדנים, וחמדנים כשאחרים חששנים.' אם התזה לא נשברה והחברות הוזלו 30% — זו הזדמנות. ה-15% מזומן קיימים בדיוק לרגע הזה.",
            "incorrect": "חשבו שוב. מכירה בפאניקה = מימוש הפסד. 'לא לעשות כלום' טוב — אבל לא מנצל את ההזדמנות. אם התזה שלמה, ירידת 30% = הנחה של 30% על חברות שהאמנתם בהן.",
            "principle": {
                "id": "margin-of-safety",
                "name": "מרווח ביטחון"
            }
        }
    },
    {
        "id": "event-buyback-signal-01",
        "tier": 2,
        "type": "special-event",
        "eventType": "company",
        "title": "רכישה עצמית — סיגנל חזק או מלכודת?",
        "description": "חברה הכריזה על תוכנית רכישה עצמית של 10% מהמניות. P/E 8, ROIC 17%, FCF יציב. אבל: המנכ\"ל מקבל בונוס לפי רווח למניה (EPS) — ורכישה עצמית מעלה EPS אוטומטית ללא שיפור בעסק. מה הסיגנל?",
        "options": [
            {
                "text": "חיובי! ההנהלה חושבת שהמניה זולה ומשתמשת ב-FCF לטובת בעלי מניות.",
                "value": "positive"
            },
            {
                "text": "חשוד. בונוס מבוסס EPS = הרכישה משרתת את המנכ\"ל, לא את המשקיעים.",
                "value": "suspicious"
            },
            {
                "text": "ניטרלי — צריך לבדוק את ההיסטוריה: האם החברה קנתה בזול בעבר?",
                "value": "neutral"
            }
        ],
        "correctOption": "suspicious",
        "pointValue": 150,
        "feedback": {
            "correct": "מצוין! רכישה עצמית היא חיובית רק כשהמוטיבציה נכונה. כשבונוס מנכ\"ל מבוסס EPS, הוא מתוגמל על הרכישה גם אם היא נעשית במחיר מופרז. הסימן: האם הוא היה קונה גם ללא הבונוס?",
            "incorrect": "חשבו עוד. רכישה עצמית = פעולה. המוטיבציה = מה חשוב. בונוס EPS = המנכ\"ל מרוויח מהרכישה אישית. זה לא אומר שהרכישה רעה — אבל צריך חשדנות.",
            "principle": {
                "id": "management-quality",
                "name": "איכות הנהלה"
            }
        }
    },
    {
        "id": "event-mgmt-compensation-01",
        "tier": 2,
        "type": "special-event",
        "eventType": "company",
        "title": "חבילת תגמול — אדומה או ירוקה?",
        "description": "אתם קוראים את הדוח השנתי. חבילת תגמול המנכ\"ל: ₪1.5M בסיס + ₪3M בונוס על ROIC > 15% + ₪2M באופציות שמבשילות רק אחרי 4 שנים. סך הכל: ₪6.5M/שנה. הכנסות החברה: ₪500M.",
        "options": [
            {
                "text": "₪6.5M זה הרבה. שכר מנופח.",
                "value": "too-much"
            },
            {
                "text": "מבנה מעולה: בסיס נמוך, בונוס על ROIC, אופציות ארוכות טווח.",
                "value": "great-structure"
            },
            {
                "text": "בסדר. 1.3% מההכנסות — לא יקר.",
                "value": "ok-cheap"
            }
        ],
        "correctOption": "great-structure",
        "pointValue": 150,
        "feedback": {
            "correct": "מצוין! לא הסכום שחשוב — המבנה. בסיס ₪1.5M = צנוע. בונוס על ROIC (לא הכנסות!) = תמריץ נכון. אופציות ל-4 שנים = חשיבה ארוכת טווח. זו בדיוק חבילת התגמול שבאפט מחפש.",
            "incorrect": "הסכום (₪6.5M) פחות חשוב מהמבנה. בונוס על ROIC = מנכ\"ל מתוגמל על איכות ההשקעות. אופציות ל-4 שנים = מחויב לטווח ארוך. זה מבנה מעולה.",
            "principle": {
                "id": "management-quality",
                "name": "איכות הנהלה"
            }
        }
    },
    {
        "id": "event-5year-thinking-01",
        "tier": 2,
        "type": "special-event",
        "eventType": "macro",
        "title": "חשיבה ל-5 שנים קדימה",
        "description": "אתם שוקלים 3 סקטורים להשקעה. מה שחשוב הוא לא איפה הם היום — אלא איפה הם יהיו בעוד 5 שנים. באיזה סקטור תשקיעו?",
        "options": [
            {
                "text": "אנרגיה מסורתית: P/E 5, דיבידנד 8%, FCF שיא — אבל רגולציה ירוקה בדרך.",
                "value": "traditional-energy"
            },
            {
                "text": "בדיקות איכות: P/E 18, צמיחה 8% — רגולציה חדשה מרחיבה דרישות.",
                "value": "quality-testing"
            },
            {
                "text": "נדל\"ן מסחרי: P/E 10, דיבידנד 5% — אבל עבודה מרחוק גוברת.",
                "value": "commercial-real-estate"
            }
        ],
        "correctOption": "quality-testing",
        "pointValue": 150,
        "feedback": {
            "correct": "מצוין! חשיבת 5 שנים: אנרגיה מסורתית = FCF שיא היום, אבל רגולציה ירוקה תוריד ביקוש. נדל\"ן מסחרי = עבודה מרחוק = פחות ביקוש. בדיקות = רגולציה מרחיבה = יותר ביקוש. הסקטור 'המשעמם' הוא ה-winner.",
            "incorrect": "חשבו 5 שנים קדימה, לא היום. P/E 5 ודיבידנד 8% מרשימים — אבל מה יקרה לביקוש לאנרגיה מסורתית? P/E 10 ודיבידנד 5% נחמדים — אבל מה יקרה לנדל\"ן מסחרי? הסקטור עם רוח-גבית רגולטורית = בדיקות.",
            "principle": {
                "id": "moat",
                "name": "חפיר כלכלי"
            }
        }
    },
    {
        "id": "event-debt-types-01",
        "tier": 2,
        "type": "special-event",
        "eventType": "company",
        "title": "לא כל חוב שווה — איזה מסוכן?",
        "description": "שתי חברות עם חוב/הון 2.0. חברה א': חוב בריבית קבועה ל-10 שנים, מכוסה 4x, הכנסות מחוזים ל-15 שנה. חברה ב': חוב בריבית משתנה, מכוסה 1.5x, הכנסות מפרויקטים חד-פעמיים. איזה חוב מסוכן?",
        "options": [
            {
                "text": "שניהם מסוכנים — חוב/הון 2.0 גבוה תמיד.",
                "value": "both-risky"
            },
            {
                "text": "חברה ב' מסוכנת. ריבית משתנה + כיסוי 1.5x + הכנסות לא-יציבות = מתכון לבעיות.",
                "value": "b-risky"
            },
            {
                "text": "חברה א' מסוכנת — 10 שנים של חוב = התחייבות ארוכה.",
                "value": "a-risky"
            }
        ],
        "correctOption": "b-risky",
        "pointValue": 150,
        "feedback": {
            "correct": "מצוין! חוב/הון 2.0 = מספר אחד. אבל מה שמאחוריו קריטי: ריבית קבועה vs. משתנה. כיסוי 4x vs. 1.5x. הכנסות יציבות vs. חד-פעמיות. חברה א' = חוב 'בטוח'. חברה ב' = פצצה מתקתקת.",
            "incorrect": "'חוב/הון 2.0 = מסוכן תמיד' זו גישה גסה מדי. חוב בריבית קבועה + כיסוי 4x + הכנסות מובטחות = כמעט ללא סיכון. חוב בריבית משתנה + כיסוי 1.5x + הכנסות לא-יציבות = מסוכן מאוד.",
            "principle": {
                "id": "leverage-risk",
                "name": "סיכון מינוף"
            }
        }
    }
],
    hard: [
    {
        "id": "leveraged-buyback-01",
        "title": "מתווה Buyback ממונף",
        "description": "חברת תקשורת מציעה רכישה חוזרת במימון חוב כבד.",
        "correctImpact": "positive",
        "tier": 3,
        "pointValue": 200,
        "hints": [
            {
                "cost": 0.5,
                "text": "שקלו תזרים חוב לעומת תמחור מניה."
            }
        ],
        "feedback": {
            "principle": {
                "id": "leverage-risk",
                "name": "סיכון מינוף"
            },
            "correct": "נכון! Buyback ממונף משפר EPS אך מגדיל סיכון פיננסי.",
            "incorrect": "לא נכון. רכישות בחוב יכולות להיות חיוביות כל עוד תזרים תומך."
        },
        "difficulty": "hard",
        "difficultyValue": 3
    },
    {
        "id": "dollar-weakening-01",
        "title": "ירידת הדולר",
        "description": "הדולר נחלש מול השקל ב-5% בשל תחרות גלובלית.",
        "correctImpact": "positive",
        "tier": 3,
        "pointValue": 200,
        "hints": [
            {
                "cost": 0.5,
                "text": "חשבו על הכנסות יצוא ויבוא חומרי גלם."
            }
        ],
        "feedback": {
            "principle": {
                "id": "moat",
                "name": "חפיר כלכלי"
            },
            "correct": "נכון! יצואנים נהנים ממטבע חלש.",
            "incorrect": "לא נכון. חברות תלות בחומרי גלם מייקרות עלויות."
        },
        "difficulty": "hard",
        "difficultyValue": 3
    },
    {
        "id": "tax-cut-01",
        "title": "שינוי מדיניות מס",
        "description": "משרד האוצר הכריז על הורדת מס תאגידים ל-20%.",
        "correctImpact": "positive",
        "tier": 3,
        "pointValue": 200,
        "hints": [
            {
                "cost": 0.5,
                "text": "בדקו השפעה על רווח נקי ושימור תזרימים."
            }
        ],
        "feedback": {
            "principle": {
                "id": "owner-earnings",
                "name": "רווחי בעלים"
            },
            "correct": "נכון! מס נמוך מגדיל רווחי נטו ומשפר ערך מניה.",
            "incorrect": "טעות. מס נמוך מביא עודפי מזומנים אך דורש לצפות השקעות עתידיות."
        },
        "difficulty": "hard",
        "difficultyValue": 3
    },
    {
        "id": "legal-case-01",
        "title": "התמודדות עם תביעה משפטית",
        "description": "חברה בתעשייה כימית עומדת בפני תביעה על זיהום.",
        "correctImpact": "negative",
        "tier": 3,
        "pointValue": 200,
        "hints": [
            {
                "cost": 0.5,
                "text": "בדקו פוטנציאל פיצויים וביטוחים."
            }
        ],
        "feedback": {
            "principle": {
                "id": "leverage-risk",
                "name": "סיכון משפטי"
            },
            "correct": "נכון! הוצאות פיצויים גבוהות מורידות ערך החברה.",
            "incorrect": "טעות. תביעות מסבכות צפויות להגדיל עלויות עתידיות."
        },
        "difficulty": "hard",
        "difficultyValue": 3
    },
    {
        "id": "event-earnings-manipulation-01",
        "tier": 3,
        "type": "special-event",
        "eventType": "company",
        "title": "סימנים לאיפור דוחות",
        "description": "חברה שאתם עוקבים אחריה מציגה רווח שיא, אבל 3 סימנים מטרידים: (1) רו\"ח מנהל הוחלף בפעם השנייה ב-3 שנים, (2) ימי לקוחות עלו מ-45 ל-90, (3) ההנהלה שינתה מדיניות הכרה בהכנסות. מה עושים?",
        "options": [
            {
                "text": "סימנים מטרידים, אבל הרווח שיא — בואו ניתן הזדמנות.",
                "value": "hold"
            },
            {
                "text": "שלושת הסימנים ביחד = דגלי אדום חמורים. למכור.",
                "value": "sell"
            },
            {
                "text": "להמתין לדוח הבא ולראות אם המגמה נמשכת.",
                "value": "wait"
            }
        ],
        "correctOption": "sell",
        "pointValue": 200,
        "feedback": {
            "correct": "נכון! כל סימן בנפרד עלול להיות תמים. שלושתם ביחד = דגל אדום בוער. החלפת רו\"ח × 2 + ימי לקוחות × 2 + שינוי מדיניות = הסתברות גבוהה לאיפור. אל תחכו לדוח הבא — עד אז אולי כבר מאוחר.",
            "incorrect": "שלושת הסימנים ביחד הם pattern recognition חשוב: (1) רו\"ח לא מוכנים לחתום = בעיה. (2) ימי לקוחות כפולים = 'הכנסות' שאולי לא ייגבו. (3) שינוי מדיניות = מאפשר להכיר הכנסות מוקדם. אל תיתנו לרווח שיא לעוור אתכם.",
            "principle": {
                "id": "owner-earnings",
                "name": "רווחי בעלים"
            }
        }
    },
    {
        "id": "event-roic-direction-01",
        "tier": 3,
        "type": "special-event",
        "eventType": "company",
        "title": "ROIC 15% — אבל לאן?",
        "description": "שתי חברות עם ROIC 15%. חברה א': ROIC עלה מ-10% → 15% ב-3 שנים. חברה ב': ROIC ירד מ-20% → 15% ב-3 שנים. באיזו תשקיעו?",
        "options": [
            {
                "text": "חברה א' — ROIC עולה = חפיר מתחזק = תמשיך לעלות.",
                "value": "rising"
            },
            {
                "text": "חברה ב' — ROIC 20% מראה פוטנציאל גבוה יותר, רק צריך להתאושש.",
                "value": "falling"
            },
            {
                "text": "שתיהן שוות — ROIC 15% זהה.",
                "value": "same"
            }
        ],
        "correctOption": "rising",
        "pointValue": 200,
        "feedback": {
            "correct": "מצוין! הכיוון חשוב יותר מהמספר. ROIC עולה = חפיר מתחזק, הנהלה משתפרת, העסק נהיה יותר טוב. ROIC יורד = חפיר נשחק, אולי תחרות גוברת. באפט: 'הייתי מעדיף חברה שמשתפרת לאט על פני חברה שמתדרדרת מהר.'",
            "incorrect": "חשבו על מגמה: 10% → 15% = שיפור. 20% → 15% = הרעה. בעוד 3 שנים: א' אולי ב-20%. ב' אולי ב-10%. 'אותו ROIC' הוא תמונה רגעית — המגמה מספרת את הסיפור.",
            "principle": {
                "id": "owner-earnings",
                "name": "רווחי בעלים"
            }
        }
    }
],
    expert: [
    {
        "id": "event-regulation-01",
        "tier": 4,
        "type": "special-event",
        "eventType": "macro",
        "title": "רגולציה חדשה — מי ירוויח ומי יפסיד?",
        "description": "הממשלה הודיעה על רגולציית סייבר חדשה שמחייבת כל חברה ציבורית באימות אבטחה שנתי. זה ייצור ביקוש חדש, אבל גם יגדיל עלויות. יש לכם 2 חברות סייבר בפורטפוליו: אחת שמתמקדת באימות (70% מההכנסות) ושנייה שמתמקדת בניטור (85% מההכנסות).",
        "options": [
            {
                "text": "להגדיל את שתיהן — כל סקטור הסייבר ירוויח.",
                "value": "buy-both"
            },
            {
                "text": "להגדיל את חברת האימות ולהקטין את הניטור.",
                "value": "tilt-verify"
            },
            {
                "text": "לא לשנות כלום — רגולציה לוקחת שנים ליישום.",
                "value": "do-nothing"
            }
        ],
        "correctOption": "tilt-verify",
        "pointValue": 300,
        "feedback": {
            "correct": "מצוין! רגולציה יוצרת מנצחים ומפסידים — לא מנצחים בלבד. חברת אימות = מרוויחה ישירות (ביקוש חדש). חברת ניטור = עלויות ציות עולות אבל ההכנסות לא בהכרח. חשיבה סקטוריאלית גסה ('סייבר = טוב') פחות מדויקת מניתוח ספציפי.",
            "incorrect": "לא מדויק. 'כל הסייבר ירוויח' זו חשיבה גסה מדי. הרגולציה מחייבת אימות — לא ניטור. חברת אימות מרוויחה ישירות, חברת ניטור תצטרך להתאים. ו-'לא לשנות כלום' = לפספס הזדמנות.",
            "principle": {
                "id": "moat",
                "name": "חפיר כלכלי"
            }
        }
    },
    {
        "id": "event-sector-rotation-01",
        "tier": 4,
        "type": "special-event",
        "eventType": "macro",
        "title": "רוטציה סקטוריאלית — להצטרף או להתעלם?",
        "description": "בחודש האחרון, קרנות גדולות עברו מטכנולוגיה לתעשייה. מניות תעשייה עלו 15%. יש לכם חברת תעשייה שקניתם לפני שנה (עלתה 8%) וחברת טכנולוגיה (ירדה 10%). התזה של שתיהן שלמה. מה עושים?",
        "options": [
            {
                "text": "למכור את הטכנולוגיה ולהגדיל תעשייה — ללכת עם המגמה.",
                "value": "follow-trend"
            },
            {
                "text": "לא לשנות כלום — רוטציה סקטוריאלית היא רעש, לא סיגנל.",
                "value": "ignore"
            },
            {
                "text": "להגדיל את הטכנולוגיה שירדה 10% (עכשיו זולה יותר) ולהקטין תעשייה שעלתה 15%.",
                "value": "contrarian"
            }
        ],
        "correctOption": "ignore",
        "pointValue": 300,
        "feedback": {
            "correct": "מצוין! רוטציה סקטוריאלית = תנועת קרנות, לא שינוי בערך החברות. אם התזה שלמה — לא משנים. להצטרף למגמה = רדיפה (chasing). להיות contrarian רק בגלל מגמה = אותה טעות בכיוון הפוך.",
            "incorrect": "חשבו שוב. 'ללכת עם המגמה' = מכירה בזול וקנייה ביוקר. 'contrarian' בלי סיבה בסיסית = ספקולציה. הדרך של באפט: אם התזה לא השתנתה, הפורטפוליו לא צריך להשתנות.",
            "principle": {
                "id": "margin-of-safety",
                "name": "מרווח ביטחון"
            }
        }
    },
    {
        "id": "event-future-moat-01",
        "tier": 4,
        "type": "special-event",
        "eventType": "macro",
        "title": "איזה חפיר ישרוד את השנים הבאות?",
        "description": "באפט אומר: 'אני לא קונה את מה שטוב היום — אני קונה את מה שיהיה טוב בעוד 10 שנים.' איזה עסק ישרוד ויצמח?",
        "options": [
            {
                "text": "רשת סניפי בנק (120 סניפים) — מיקומים פריים, מותג חזק.",
                "value": "bank-branches"
            },
            {
                "text": "חברת בדיקות מזון (מונופול) — רגולציה רק מרחיבה דרישות.",
                "value": "food-testing"
            },
            {
                "text": "סוכנות נסיעות מובילה (30% נתח) — מותג מוכר, לקוחות נאמנים.",
                "value": "travel-agency"
            }
        ],
        "correctOption": "food-testing",
        "pointValue": 300,
        "feedback": {
            "correct": "מצוין! חשיבת 10 שנים: בנקאות → סניפים נסגרים (אפליקציות). סוכנות נסיעות → אונליין אוכל את הענף. בדיקות מזון → רגולציה רק גדלה. בעוד 10 שנים: פחות סניפי בנק, פחות סוכנויות נסיעות, יותר בדיקות מזון. שאלת העתיד = השאלה הכי חשובה.",
            "incorrect": "חשבו 10 שנים קדימה: האם אנשים יבואו לסניף בנק? (לא — אפליקציות). האם אנשים ישתמשו בסוכן נסיעות? (פחות — Booking). האם רגולציית מזון תצטמצם? (לעולם לא — רק תתרחב). העסק 'המשעמם' = הבטוח.",
            "principle": {
                "id": "moat",
                "name": "חפיר כלכלי"
            }
        }
    }
]
};

// ==============================
// VERSUS ROUNDS
// ==============================
window.BuffettGame.versusRounds = [
    {
        "id": "versus-moat-quality-01",
        "tier": 1,
        "type": "versus",
        "title": "מי בונה חפיר חזק יותר?",
        "description": "שתי חברות בסקטור המזון — אחת עם מותג חזק ושנייה עם יתרון עלויות. מי מוגנת טוב יותר?",
        "companyA": {
            "name": "טעמי הגולן בע\"מ",
            "symbol": "TGOL",
            "sector": "מזון",
            "description": "יצרנית מוצרי חלב אורגניים עם מותג פרמיום. מרווח גולמי 42%, נאמנות לקוחות גבוהה, אבל צמיחה איטית (3% בשנה).",
            "metrics": [
                {
                    "name": "P/E",
                    "value": "18"
                },
                {
                    "name": "מרווח גולמי",
                    "value": "42%"
                },
                {
                    "name": "נאמנות מותג",
                    "value": "גבוהה (NPS 65)"
                },
                {
                    "name": "צמיחה",
                    "value": "3%"
                }
            ],
            "historicalFCF": [
                28,
                29,
                30,
                31,
                32
            ]
        },
        "companyB": {
            "name": "סופר-פרש מפיצים בע\"מ",
            "symbol": "SPRF",
            "sector": "מזון",
            "description": "מפיצת מזון גדולה עם יתרון סקייל — הזולה ב-15% מהמתחרים. מרווח גולמי 12% אבל מחזור גבוה. צמיחה 8% בשנה.",
            "metrics": [
                {
                    "name": "P/E",
                    "value": "12"
                },
                {
                    "name": "מרווח גולמי",
                    "value": "12%"
                },
                {
                    "name": "יתרון מחיר",
                    "value": "זולה ב-15%"
                },
                {
                    "name": "צמיחה",
                    "value": "8%"
                }
            ],
            "historicalFCF": [
                18,
                20,
                22,
                25,
                28
            ]
        },
        "correctAnswer": "A",
        "pointValue": 120,
        "feedback": {
            "explanation": "טעמי הגולן עדיפה. מותג פרמיום עם מרווח 42% = חפיר שקשה לשחוק. יתרון מחיר (סופר-פרש) נשחק ברגע שמתחרה גדול יותר נכנס. באפט: 'מרווחים גבוהים = חפיר. מרווחים דקים = מירוץ לתחתית.'",
            "counterArgument": "סופר-פרש צומחת מהר יותר (8% vs 3%) ו-P/E 12 זול יותר. יתרון סקייל יכול להתחזק עם הזמן.",
            "principle": {
                "id": "moat",
                "name": "חפיר כלכלי"
            }
        },
        "workedExample": "1) סוג חפיר: מותג (טעמי) vs. עלות (סופר). 2) עמידות: מותג פרמיום קשה לשכפל. יתרון עלות — אם מישהו גדול יותר נכנס, היתרון נעלם. 3) מרווח: 42% vs 12% — טעמי יכולה לספוג הפתעות. 4) מסקנה: חפיר מותג > חפיר עלות."
    },
    {
        "id": "versus-turnaround-01",
        "tier": 2,
        "type": "versus",
        "title": "איזה שיקום אמיתי?",
        "description": "שתי חברות בשיקום — אחת עם שיפור תפעולי אמיתי ושנייה עם שיפור חשבונאי. מי שווה להשקיע?",
        "companyA": {
            "name": "תעשיות הצפון המחודשת בע\"מ",
            "symbol": "TZFN",
            "sector": "תעשייה",
            "description": "מפעל שסגר 3 קווים הפסדיים, צמצם כוח אדם 25%, והתמקד ב-2 מוצרים רווחיים. מרווח תפעולי עלה מ-2% ל-10% בשנה. מנכ\"לית חדשה קנתה מניות.",
            "metrics": [
                {
                    "name": "P/E",
                    "value": "22 (על רווחי שפל)"
                },
                {
                    "name": "מרווח תפעולי",
                    "value": "10% (עלה מ-2%)"
                },
                {
                    "name": "FCF",
                    "value": "₪8M (היה ₪-15M)"
                },
                {
                    "name": "הכנסות",
                    "value": "ירדו 20% (בכוונה)"
                }
            ],
            "historicalFCF": [
                -15,
                -10,
                -5,
                3,
                8
            ]
        },
        "companyB": {
            "name": "גלובל שירותים IT בע\"מ",
            "symbol": "GLIT",
            "sector": "IT",
            "description": "חברת IT שמראה 'שיפור' ברווח — אבל דרך שינוי מדיניות חשבונאית (הכרה מוקדמת בהכנסות) ומכירת נכס חד-פעמית. ה-FCF עדיין שלילי.",
            "metrics": [
                {
                    "name": "P/E",
                    "value": "15 (על רווח מדווח)"
                },
                {
                    "name": "רווח נקי",
                    "value": "₪12M (כולל ₪8M חד-פעמי)"
                },
                {
                    "name": "FCF",
                    "value": "₪-5M"
                },
                {
                    "name": "הכנסות",
                    "value": "עלו 5%"
                }
            ],
            "historicalFCF": [
                -12,
                -10,
                -8,
                -7,
                -5
            ]
        },
        "correctAnswer": "A",
        "pointValue": 150,
        "feedback": {
            "explanation": "הצפון המחודשת היא השיקום האמיתי. FCF הפך חיובי דרך שיפור תפעולי (סגירת קווים, מיקוד) — לא חשבונאות. גלובל שירותים רק נראית טוב — ₪8M מתוך ₪12M רווח הם חד-פעמיים, ו-FCF עדיין שלילי.",
            "counterArgument": "גלובל שירותים: P/E 15 זול יותר מ-P/E 22, הכנסות עולות (לא יורדות), והרווח הנקי חיובי. שיקום הצפון = הכנסות יורדות 20% = מתכווצת.",
            "principle": {
                "id": "turnaround",
                "name": "שיקום"
            }
        },
        "workedExample": "1) בדיקת FCF: הצפון הפך מ-₪-15M ל-₪+8M = שיפור אמיתי. גלובל עדיין ₪-5M. 2) סוג שיפור: הצפון = תפעולי (סגירת הפסדיים). גלובל = חשבונאי (הכרה מוקדמת). 3) מרווח: הצפון 2% → 10%. גלובל — אם נסיר חד-פעמי, הרווח ₪4M, P/E = 45. 4) מסקנה: שיפור תפעולי > שיפור חשבונאי."
    },
    {
        "id": "versus-dividend-01",
        "tier": 2,
        "type": "versus",
        "title": "איזה דיבידנד בטוח יותר?",
        "description": "שתי חברות דיבידנד — אחת עם תשואה גבוהה ושנייה עם תשואה נמוכה. מי תשלם דיבידנד בעוד 10 שנים?",
        "companyA": {
            "name": "אנרג'י פאוור בע\"מ",
            "symbol": "ENRP",
            "sector": "אנרגיה",
            "description": "חברת אנרגיה מסורתית. דיבידנד 8%, יחס חלוקה 90%. הכנסות יורדות 3% בשנה בגלל מעבר לאנרגיה ירוקה. לא משקיעה בהתחדשות.",
            "metrics": [
                {
                    "name": "תשואת דיבידנד",
                    "value": "8%"
                },
                {
                    "name": "יחס חלוקה",
                    "value": "90%"
                },
                {
                    "name": "צמיחת הכנסות",
                    "value": "-3%"
                },
                {
                    "name": "CAPEX",
                    "value": "מינימלי"
                }
            ],
            "historicalFCF": [
                55,
                52,
                50,
                48,
                45
            ]
        },
        "companyB": {
            "name": "ירוק אנרגיה בע\"מ",
            "symbol": "YROK",
            "sector": "אנרגיה מתחדשת",
            "description": "חברת אנרגיה מתחדשת. דיבידנד 'רק' 2.5%, יחס חלוקה 30%, אבל צמיחת דיבידנד 15% בשנה. חוזי PPA ל-20 שנה.",
            "metrics": [
                {
                    "name": "תשואת דיבידנד",
                    "value": "2.5%"
                },
                {
                    "name": "יחס חלוקה",
                    "value": "30%"
                },
                {
                    "name": "צמיחת דיבידנד",
                    "value": "15% בשנה"
                },
                {
                    "name": "חוזי PPA",
                    "value": "20 שנה"
                }
            ],
            "historicalFCF": [
                15,
                20,
                28,
                35,
                42
            ]
        },
        "correctAnswer": "B",
        "pointValue": 150,
        "feedback": {
            "explanation": "ירוק אנרגיה עדיפה. תשואה 2.5% עם צמיחה 15% = תשואה על עלות 5% בעוד 5 שנים, 10% בעוד 10. אנרג'י פאוור: 8% שיורד — בעוד 5 שנים כנראה ייחתך.",
            "counterArgument": "אנרג'י פאוור: 8% היום > 2.5% היום. ₪8,000 בשנה מול ₪2,500 על כל ₪100K. צריך לחכות שנים עד שירוק 'תשיג' את אנרג'י.",
            "principle": {
                "id": "dividend-sustainability",
                "name": "קיימות דיבידנד"
            }
        },
        "workedExample": "1) היום: אנרג'י 8% > ירוק 2.5%. 2) בעוד 5 שנים: אנרג'י ~6% (יורד), ירוק ~5% (עולה). 3) בעוד 10: אנרג'י ~4% (אם בכלל), ירוק ~10%. 4) סיכון: אנרג'י 90% יחס חלוקה = אין מרווח. ירוק 30% = מרחב אדיר. 5) מסקנה: דיבידנד-גידול > דיבידנד גבוה."
    },
    {
        "id": "versus-management-01",
        "tier": 3,
        "type": "versus",
        "title": "הנהלה מעולה עם מספרים בינוניים, או מספרים מעולים עם הנהלה בינונית?",
        "description": "שתי חברות טכנולוגיה — באחת ההנהלה מצוינת אבל המספרים ממוצעים, ובשנייה המספרים מרשימים אבל ההנהלה מעוררת חשש.",
        "companyA": {
            "name": "קוד-מאסטר בע\"מ",
            "symbol": "CDMS",
            "sector": "טכנולוגיה",
            "description": "חברת תוכנה עם מנכ\"ל-מייסד שמחזיק 20%, מושך משכורת צנועה, ומתגמל לפי ROIC. צמיחה 12%, P/E 22, מרווח תפעולי 18%. לא מרשים — אבל עקבי 8 שנים.",
            "metrics": [
                {
                    "name": "P/E",
                    "value": "22"
                },
                {
                    "name": "צמיחה",
                    "value": "12%"
                },
                {
                    "name": "ROIC",
                    "value": "18%"
                },
                {
                    "name": "אחזקת מנכ\"ל",
                    "value": "20%"
                }
            ],
            "historicalFCF": [
                22,
                24,
                27,
                30,
                33
            ]
        },
        "companyB": {
            "name": "דאטה-בום בע\"מ",
            "symbol": "DTBM",
            "sector": "טכנולוגיה",
            "description": "חברת big data שצומחת 35%, P/E 18 (PEG 0.5!), מרווח תפעולי 25%. אבל: מנכ\"ל החליף 3 פעמים ב-5 שנים, שכר הנהלה = 12% מהרווח, ו-CFO עזב פתאום.",
            "metrics": [
                {
                    "name": "P/E",
                    "value": "18"
                },
                {
                    "name": "צמיחה",
                    "value": "35%"
                },
                {
                    "name": "ROIC",
                    "value": "28%"
                },
                {
                    "name": "תחלופת הנהלה",
                    "value": "3 מנכ\"לים ב-5 שנים"
                }
            ],
            "historicalFCF": [
                8,
                15,
                28,
                45,
                62
            ]
        },
        "correctAnswer": "A",
        "pointValue": 200,
        "feedback": {
            "explanation": "קוד-מאסטר עדיפה. הנהלה יציבה עם skin in the game = פחות סיכון. דאטה-בום: מספרים מרשימים, אבל 3 מנכ\"לים ב-5 שנים + CFO שעזב = דגלי אדום. באפט: 'כשהנהלה מעולה נכנסת לעסק עם מוניטין רע, המוניטין של העסק נשאר.'",
            "counterArgument": "דאטה-בום: PEG 0.5 = מציאה אבסולוטית. ROIC 28% > 18%. FCF קפץ מ-₪8M ל-₪62M. אולי תחלופת המנכ\"לים היא סימן שהדירקטוריון דרשני ולא מסתפק בבינוניות.",
            "principle": {
                "id": "management-quality",
                "name": "איכות הנהלה"
            }
        },
        "workedExample": "1) מספרים: דאטה-בום מנצחת (צמיחה 35%, ROIC 28%, PEG 0.5). 2) הנהלה: קוד-מאסטר מנצחת (מייסד עם 20%, 8 שנות עקביות). 3) סיכונים: דאטה-בום — 3 מנכ\"לים + CFO עזב = מה קורה שם? 4) עקביות: קוד-מאסטר 8 שנים רצופות. דאטה-בום — האם ה-35% ימשך ללא הנהלה יציבה? 5) מסקנה: הנהלה > מספרים לטווח ארוך."
    },
    {
        "id": "versus-cyclical-timing-01",
        "tier": 3,
        "type": "versus",
        "title": "שתי חברות מחזוריות — איזו בזמן הנכון?",
        "description": "שתי חברות מחזוריות באותו ענף. אחת בשיא עם P/E נמוך, שנייה בשפל עם P/E גבוה. מי עדיפה?",
        "companyA": {
            "name": "מפעלי הנגב כימיקלים",
            "symbol": "MFNG",
            "sector": "כימיה",
            "description": "P/E 5, ROE 30%, FCF שיא. אבל: מחירי כימיקלים בשיא, קיבולת חדשה נכנסת לשוק, ובעלים מכרו מניות.",
            "metrics": [
                {
                    "name": "P/E",
                    "value": "5 (שיא רווחים)"
                },
                {
                    "name": "ROE",
                    "value": "30%"
                },
                {
                    "name": "FCF",
                    "value": "₪120M (שיא)"
                },
                {
                    "name": "מכירות בעלים",
                    "value": "כן"
                }
            ],
            "historicalFCF": [
                40,
                55,
                75,
                100,
                120
            ]
        },
        "companyB": {
            "name": "כימיקל ים המלח",
            "symbol": "KYMS",
            "sector": "כימיה",
            "description": "P/E 35, ROE 3%, FCF כמעט אפס. אבל: עלויות ייצור נמוכות ב-25% מהמתחרים, אפס חוב, ומנכ\"ל קנה מניות.",
            "metrics": [
                {
                    "name": "P/E",
                    "value": "35 (שפל רווחים)"
                },
                {
                    "name": "ROE",
                    "value": "3%"
                },
                {
                    "name": "FCF",
                    "value": "₪5M (שפל)"
                },
                {
                    "name": "קניות מנכ\"ל",
                    "value": "₪3M"
                }
            ],
            "historicalFCF": [
                85,
                50,
                20,
                8,
                5
            ]
        },
        "correctAnswer": "B",
        "pointValue": 200,
        "feedback": {
            "explanation": "כימיקל ים המלח עדיפה — קנייה בשפל. P/E 35 על רווחי שפל = זול. P/E 5 על רווחי שיא = יקר. עלויות נמוכות + אפס חוב = תשרוד כל שפל. מנכ\"ל קונה vs. בעלים מוכרים = סיגנל חזק.",
            "counterArgument": "מפעלי הנגב: FCF ₪120M מול ₪5M. P/E 5 מול 35. ROE 30% מול 3%. כל מטריקה מצביעה על הנגב. 'שפל' של כימיקל עלול להימשך שנים.",
            "principle": {
                "id": "cyclical-trap",
                "name": "מלכודת מחזוריות"
            }
        },
        "workedExample": "1) כלל מחזוריות: קנה P/E גבוה (שפל), מכור P/E נמוך (שיא). 2) הנגב: P/E 5 = שיא + בעלים מוכרים. 3) כימיקל: P/E 35 = שפל + מנכ\"ל קונה. 4) עלויות: כימיקל ברבעון תחתון = תשרוד ותרוויח ראשונה בהתאוששות. 5) מסקנה: הפוך מהאינסטינקט — P/E 35 > P/E 5."
    },
    {
        "id": "versus-fcf-quality-01",
        "tier": 2,
        "type": "versus",
        "title": "₪50M FCF — אבל באיזו איכות?",
        "description": "שתי חברות עם FCF דומה של ₪50M. אחת עם FCF יציב ואורגני, השנייה עם FCF שמנופח מעיתוי חד-פעמי.",
        "companyA": {
            "name": "מזון הבית בע\"מ",
            "symbol": "MZBT",
            "sector": "מזון",
            "description": "FCF ₪50M עקבי 6 שנים. מקור: מכירות חוזרות של מוצרי יומיום. ROIC 16%. לא מרגש אבל עקבי.",
            "metrics": [
                {
                    "name": "FCF",
                    "value": "₪50M (6 שנים עקבי)"
                },
                {
                    "name": "ROIC",
                    "value": "16%"
                },
                {
                    "name": "צמיחה",
                    "value": "3%"
                },
                {
                    "name": "P/E",
                    "value": "12"
                }
            ],
            "historicalFCF": [
                46,
                48,
                50,
                49,
                51,
                50
            ]
        },
        "companyB": {
            "name": "טכנו-סרביס בע\"מ",
            "symbol": "TKSV",
            "sector": "שירותי IT",
            "description": "FCF ₪50M השנה. אבל: ₪20M מתזמון הון חוזר (לקוח שילם מוקדם), ₪15M מדחיית CAPEX. FCF 'אמיתי' = ₪15M. בשנים קודמות: ₪10-20M.",
            "metrics": [
                {
                    "name": "FCF",
                    "value": "₪50M (חד-פעמי)"
                },
                {
                    "name": "ROIC",
                    "value": "8%"
                },
                {
                    "name": "צמיחה",
                    "value": "12%"
                },
                {
                    "name": "P/E",
                    "value": "15"
                }
            ],
            "historicalFCF": [
                12,
                18,
                15,
                20,
                10,
                50
            ]
        },
        "correctAnswer": "A",
        "pointValue": 150,
        "feedback": {
            "explanation": "מזון הבית עדיפה. FCF ₪50M × 6 שנים = ניתן לתכנן עליו. טכנו-סרביס: ₪50M השנה אבל ₪15M 'אמיתי'. P/E 12 על FCF אמיתי מול P/E 15 על FCF מנופח = מזון הבית זולה פי 3.",
            "counterArgument": "טכנו-סרביס: צמיחה 12% > 3%. ROIC 8% ישתפר עם סקייל. ₪50M FCF מראה פוטנציאל.",
            "principle": {
                "id": "owner-earnings",
                "name": "רווחי בעלים"
            }
        },
        "workedExample": "1) FCF זהה: ₪50M. אבל איכות שונה. 2) מזון: 46-51 × 6 שנים = עקבי. 3) טכנו: 10-20 × 5 שנים, 50 בשנה אחת = חריג. 4) בדיקה: ₪20M תזמון + ₪15M דחיית CAPEX = ₪35M 'מנופח'. 5) FCF 'אמיתי' של טכנו: ₪15M. 6) מסקנה: FCF עקבי > FCF חד-פעמי."
    },
    {
        "id": "versus-buyback-dividend-01",
        "tier": 3,
        "type": "versus",
        "title": "רכישה עצמית או דיבידנד — מי מחזיר ערך טוב יותר?",
        "description": "שתי חברות תעשייתיות דומות. אחת מחלקת דיבידנד 6%, השנייה רוכשת 6% מהמניות בשנה. שתיהן ב-P/E 10 ו-ROIC 15%.",
        "companyA": {
            "name": "תעשיות אשקלון בע\"מ",
            "symbol": "TASH",
            "sector": "תעשייה",
            "description": "דיבידנד 6%, יחס חלוקה 60%. לא רוכשת מניות. FCF למניה גדל 3%/שנה (מצמיחת הכנסות בלבד).",
            "metrics": [
                {
                    "name": "תשואת דיבידנד",
                    "value": "6%"
                },
                {
                    "name": "רכישה עצמית",
                    "value": "0%"
                },
                {
                    "name": "ROIC",
                    "value": "15%"
                },
                {
                    "name": "FCF למניה (צמיחה)",
                    "value": "+3%/שנה"
                }
            ],
            "historicalFCF": [
                30,
                31,
                32,
                33,
                34
            ]
        },
        "companyB": {
            "name": "תעשיות חיפה בע\"מ",
            "symbol": "THIF",
            "sector": "תעשייה",
            "description": "דיבידנד 1%, רכישה עצמית 6%/שנה ב-P/E 10. FCF למניה גדל 9%/שנה (3% אורגני + 6% רכישה עצמית).",
            "metrics": [
                {
                    "name": "תשואת דיבידנד",
                    "value": "1%"
                },
                {
                    "name": "רכישה עצמית",
                    "value": "6%/שנה"
                },
                {
                    "name": "ROIC",
                    "value": "15%"
                },
                {
                    "name": "FCF למניה (צמיחה)",
                    "value": "+9%/שנה"
                }
            ],
            "historicalFCF": [
                30,
                33,
                36,
                39,
                43
            ]
        },
        "correctAnswer": "B",
        "pointValue": 200,
        "feedback": {
            "explanation": "חיפה עדיפה. רכישה עצמית ב-P/E 10 = קנייה של ₪1 רווח ב-₪10 = תשואה 10% על הרכישה. דיבידנד 6% = תשואה 6% (ועוד מס). FCF למניה של חיפה גדל 9%/שנה מול 3% — בעוד 5 שנים ההפרש יהיה עצום.",
            "counterArgument": "אשקלון: 6% תשואה 'ביד' — לא צריך לסמוך על ההנהלה שתמשיך לרכוש. מס על דיבידנד, נכון, אבל אתה מקבל מזומן.",
            "principle": {
                "id": "owner-earnings",
                "name": "רווחי בעלים"
            }
        },
        "workedExample": "1) שתיהן ROIC 15%, P/E 10. 2) אשקלון: 6% דיבידנד = ₪6 לכל ₪100 השקעה (מינוס מס ~25% = ₪4.5 נטו). 3) חיפה: 6% רכישה ב-P/E 10 = כל ₪10 שנרכש = ₪1 רווח/שנה שנוסף. 4) FCF למניה: אשקלון +3%/שנה, חיפה +9%/שנה. 5) בעוד 5 שנים: חיפה FCF למניה ₪47 מול אשקלון ₪39. 6) מסקנה: רכישה עצמית > דיבידנד כש-P/E נמוך."
    },
    {
        "id": "versus-pe-trap-01",
        "tier": 1,
        "type": "versus",
        "title": "P/E 8 מול P/E 20 — מי באמת זול?",
        "description": "שתי חברות. אחת עם P/E 8 והכנסות יורדות, השנייה עם P/E 20 אבל צמיחה של 18% וחפיר חזק.",
        "companyA": {
            "name": "ישן-טק הדפסות בע\"מ",
            "symbol": "YSNT",
            "sector": "תעשייה",
            "description": "P/E 8, דיבידנד 5%. אבל: ההכנסות יורדות 8% בשנה, אין חפיר, הענף מתכווץ, ו-ROIC 6%.",
            "metrics": [
                {
                    "name": "P/E",
                    "value": "8"
                },
                {
                    "name": "ROIC",
                    "value": "6%"
                },
                {
                    "name": "צמיחה",
                    "value": "-8%"
                },
                {
                    "name": "חפיר",
                    "value": "אין"
                }
            ],
            "historicalFCF": [
                25,
                22,
                20,
                18,
                16
            ]
        },
        "companyB": {
            "name": "חכם-סופט בע\"מ",
            "symbol": "HKSF",
            "sector": "תוכנה",
            "description": "P/E 20 (PEG 1.1). צמיחה 18%, ROIC 24%, FCF עולה כל שנה, חפיר מוצק (עלות מעבר גבוהה).",
            "metrics": [
                {
                    "name": "P/E",
                    "value": "20"
                },
                {
                    "name": "PEG",
                    "value": "1.1"
                },
                {
                    "name": "ROIC",
                    "value": "24%"
                },
                {
                    "name": "צמיחה",
                    "value": "18%"
                }
            ],
            "historicalFCF": [
                22,
                26,
                31,
                37,
                44
            ]
        },
        "correctAnswer": "B",
        "pointValue": 120,
        "feedback": {
            "explanation": "חכם-סופט עדיפה. P/E 20 עם צמיחה 18% (PEG 1.1) = זולה יותר מ-P/E 8 עם ירידה 8%. בעוד 3 שנים, FCF של חכם-סופט יעקוף את ישן-טק. 'P/E נמוך = זול' זו טעות נפוצה.",
            "counterArgument": "ישן-טק: P/E 8, דיבידנד 5% — תשואה מיידית. חכם-סופט: P/E 20 = צריך לחכות שנים עד שהצמיחה 'תתפוס'.",
            "principle": {
                "id": "margin-of-safety",
                "name": "מרווח ביטחון"
            }
        },
        "workedExample": "1) ישן-טק: P/E 8, אבל FCF יורד 16→8 (ב-4 שנים). P/E 'עתידי' = 16+. 2) חכם-סופט: P/E 20, FCF עולה 22→44. P/E 'עתידי' = 10. 3) ROIC: 6% מול 24% — כל שקל שחכם-סופט משקיעה מרוויח פי 4. 4) מסקנה: P/E הוא תמונה רגעית, לא אבסולוטי."
    },
    {
        "id": "versus-liquidity-01",
        "tier": 2,
        "type": "versus",
        "title": "שתי חברות רווחיות — אחת עלולה להיתקע",
        "description": "שתי חברות עם FCF חיובי ו-ROIC 14%. אחת עם יחס מהיר (quick ratio) 2.1, השנייה עם 0.4. מי בסיכון?",
        "companyA": {
            "name": "נוזלית תעשיות בע\"מ",
            "symbol": "NZLT",
            "sector": "תעשייה",
            "description": "ROIC 14%, P/E 11, FCF ₪35M. יחס מהיר 2.1 — מזומן ושווי מזומן מכסים את ההתחייבויות השוטפות פי 2. חוב/הון 0.5.",
            "metrics": [
                {
                    "name": "P/E",
                    "value": "11"
                },
                {
                    "name": "ROIC",
                    "value": "14%"
                },
                {
                    "name": "יחס מהיר",
                    "value": "2.1"
                },
                {
                    "name": "חוב/הון",
                    "value": "0.5"
                }
            ],
            "historicalFCF": [
                30,
                32,
                33,
                34,
                35
            ]
        },
        "companyB": {
            "name": "מהירה לוגיסטיקה בע\"מ",
            "symbol": "MHRL",
            "sector": "לוגיסטיקה",
            "description": "ROIC 14%, P/E 9 ('זולה יותר'!), FCF ₪40M. אבל יחס מהיר 0.4 = ההתחייבויות השוטפות כפולות מהנכסים הנזילים. חוב/הון 2.2.",
            "metrics": [
                {
                    "name": "P/E",
                    "value": "9"
                },
                {
                    "name": "ROIC",
                    "value": "14%"
                },
                {
                    "name": "יחס מהיר",
                    "value": "0.4"
                },
                {
                    "name": "חוב/הון",
                    "value": "2.2"
                }
            ],
            "historicalFCF": [
                28,
                32,
                35,
                38,
                40
            ]
        },
        "correctAnswer": "A",
        "pointValue": 150,
        "feedback": {
            "explanation": "נוזלית עדיפה. FCF דומה, ROIC זהה, אבל נוזלית יכולה לשרוד הפתעות (יחס מהיר 2.1). מהירה: יחס מהיר 0.4 = אם לקוח גדול מאחר בתשלום, אין מזומן לשלם ספקים. P/E 9 'זול' כי השוק מתמחר את הסיכון.",
            "counterArgument": "מהירה: P/E 9 מול 11, FCF ₪40M מול ₪35M. 'זולה יותר ומרוויחה יותר'. יחס מהיר נמוך נפוץ בלוגיסטיקה.",
            "principle": {
                "id": "leverage-risk",
                "name": "סיכון מינוף"
            }
        },
        "workedExample": "1) ROIC זהה, FCF דומה. P/E: מהירה 'זולה' יותר. 2) אבל: יחס מהיר 0.4 = על כל ₪1 חוב לזמן קצר, יש רק 40 אגורות נזילים. 3) תרחיש: לקוח גדול מאחר 60 יום = מהירה לא יכולה לשלם ספקים. 4) חוב/הון 2.2 מול 0.5 = מהירה ממונפת פי 4.4. 5) מסקנה: P/E 9 'זול' כי מגלם סיכון נזילות."
    },
    {
        "id": "versus-moat-type-01",
        "tier": 1,
        "type": "versus",
        "title": "איזה חפיר חזק יותר — רגולציה או מותג?",
        "description": "שתי חברות: אחת עם חפיר רגולטורי (רשיון בלעדי) ושנייה עם חפיר מותגי. שתיהן ב-ROIC 18%.",
        "companyA": {
            "name": "רשיון-בלעדי בדיקות בע\"מ",
            "symbol": "RSBN",
            "sector": "בדיקות",
            "description": "הגוף היחיד שרשאי לבדוק ציוד רפואי בישראל. רשיון בלעדי מהמדינה. P/E 20, ROIC 18%, צמיחה 5%.",
            "metrics": [
                {
                    "name": "P/E",
                    "value": "20"
                },
                {
                    "name": "ROIC",
                    "value": "18%"
                },
                {
                    "name": "חפיר",
                    "value": "רשיון בלעדי (רגולטורי)"
                },
                {
                    "name": "סיכון",
                    "value": "הרגולטור יכול לפתוח תחרות"
                }
            ],
            "historicalFCF": [
                20,
                21,
                22,
                23,
                24
            ]
        },
        "companyB": {
            "name": "מותג-ישראל מזון בע\"מ",
            "symbol": "MTGI",
            "sector": "מזון",
            "description": "מותג מזון מוביל שנמכר ב-25% יותר מהמתחרים — ואנשים עדיין קונים. P/E 18, ROIC 18%, צמיחה 6%.",
            "metrics": [
                {
                    "name": "P/E",
                    "value": "18"
                },
                {
                    "name": "ROIC",
                    "value": "18%"
                },
                {
                    "name": "חפיר",
                    "value": "מותג + כוח תמחור"
                },
                {
                    "name": "סיכון",
                    "value": "שינוי טעם צרכנים"
                }
            ],
            "historicalFCF": [
                18,
                20,
                22,
                24,
                26
            ]
        },
        "correctAnswer": "B",
        "pointValue": 120,
        "feedback": {
            "explanation": "מותג-ישראל עדיף. חפיר רגולטורי = חזק אבל תלוי בהחלטה ממשלתית אחת. חפיר מותגי = נבנה ע\"י צרכנים במשך שנים. אם הרגולטור יפתח תחרות — הרשיון הבלעדי נעלם. אם צרכנים ישנו טעם — המותג ייפגע, אבל לאט יותר ובאופן הדרגתי.",
            "counterArgument": "רשיון-בלעדי: חפיר רגולטורי = חזק יותר כי אי אפשר לשכפל. מותג יכול להישחק על ידי פרייבט-לייבל. P/E 20 מול 18 = הפרש קטן.",
            "principle": {
                "id": "moat",
                "name": "חפיר כלכלי"
            }
        },
        "workedExample": "1) שניהם ROIC 18% — ביצועים דומים. 2) חפיר רגולטורי: חזק, אבל = החלטה ממשלתית אחת הורסת אותו. 3) חפיר מותגי: איטי יותר להיבנות, אבל גם איטי יותר להישחק. 4) FCF: מותג עולה 8/שנה, רשיון 1/שנה. 5) מסקנה: מותג = חפיר עמיד יותר."
    },
    {
        "id": "versus-mgmt-pressure-01",
        "tier": 3,
        "type": "versus",
        "title": "איך ההנהלה מגיבה ללחץ?",
        "description": "שתי חברות שספגו ירידה של 25% בהכנסות. אחת חתכה עלויות בחוכמה, השנייה בפאניקה. מי תתאושש?",
        "companyA": {
            "name": "מנוהלת-חכם בע\"מ",
            "symbol": "MNHK",
            "sector": "תעשייה",
            "description": "ההכנסות ירדו 25%. ההנהלה: חתכה 15% כוח אדם (את הפחות פרודוקטיביים), שמרה על R&D, סגרה קו אחד הפסדי. מרווח תפעולי ירד מ-18% ל-14% בלבד. רכישה עצמית ₪10M 'כי המניה זולה'.",
            "metrics": [
                {
                    "name": "מרווח תפעולי",
                    "value": "14% (היה 18%)"
                },
                {
                    "name": "R&D",
                    "value": "נשמר"
                },
                {
                    "name": "רכישה עצמית",
                    "value": "₪10M"
                },
                {
                    "name": "פיטורים",
                    "value": "15% (ממוקדים)"
                }
            ],
            "historicalFCF": [
                35,
                38,
                40,
                28,
                25
            ]
        },
        "companyB": {
            "name": "חותכת-בפאניקה בע\"מ",
            "symbol": "HTFP",
            "sector": "תעשייה",
            "description": "ההכנסות ירדו 25%. ההנהלה: חתכה 40% כוח אדם (כולל R&D), ביטלה את תוכנית הפיתוח, חילקה דיבידנד מיוחד ₪30M 'כדי לשמר משקיעים'. מרווח תפעולי 'שופר' ל-16% — אבל על ידי חיתוך העתיד.",
            "metrics": [
                {
                    "name": "מרווח תפעולי",
                    "value": "16% ('שופר')"
                },
                {
                    "name": "R&D",
                    "value": "בוטל"
                },
                {
                    "name": "דיבידנד מיוחד",
                    "value": "₪30M"
                },
                {
                    "name": "פיטורים",
                    "value": "40% (גורפים)"
                }
            ],
            "historicalFCF": [
                35,
                38,
                40,
                28,
                32
            ]
        },
        "correctAnswer": "A",
        "pointValue": 200,
        "feedback": {
            "explanation": "מנוהלת-חכם עדיפה. שמירה על R&D = שמירה על העתיד. חיתוך ממוקד 15% (לא גורף) = יעילות בלי הרס. רכישה עצמית = 'המניה זולה, נקנה'. לעומת: חותכת-בפאניקה הקריבה את העתיד (R&D = 0) כדי 'לשפר' מרווח היום, וחילקה ₪30M שהייתה צריכה להשקעות.",
            "counterArgument": "חותכת-בפאניקה: מרווח 16% > 14%. FCF ₪32M > ₪25M. דיבידנד ₪30M = מחזירה כסף למשקיעים. 'יעילה יותר'.",
            "principle": {
                "id": "management-quality",
                "name": "איכות הנהלה"
            }
        },
        "workedExample": "1) שתיהן ספגו -25% הכנסות. 2) תגובת A: חיתוך ממוקד, שמירה R&D, רכישה עצמית = בונה לעתיד. 3) תגובת B: חיתוך גורף, ביטול R&D, דיבידנד = מציל את ההווה על חשבון המחר. 4) בעוד 3 שנים: A תחזור עם מוצרים חדשים. B = ללא R&D, אין מוצרים. 5) מסקנה: הנהלה שחושבת קדימה > הנהלה שנלחצת."
    },
    {
        "id": "versus-moat-direction-01",
        "tier": 4,
        "type": "versus",
        "title": "חפיר שמתרחב או חפיר שמצטמצם?",
        "description": "שתי חברות עם ROIC 16%. אחת = ROIC עלה מ-12% (חפיר מתרחב). השנייה = ROIC ירד מ-20% (חפיר מצטמצם).",
        "companyA": {
            "name": "מתרחבת-חפיר בע\"מ",
            "symbol": "MTHF",
            "sector": "שירותים",
            "description": "ROIC עלה מ-12% ל-16% ב-4 שנים. מרווח גולמי עולה, נתח שוק עולה, מתחרים עוזבים. חפיר מתרחב. P/E 22.",
            "metrics": [
                {
                    "name": "P/E",
                    "value": "22"
                },
                {
                    "name": "ROIC (מגמה)",
                    "value": "12% → 16% ↑"
                },
                {
                    "name": "מרווח גולמי",
                    "value": "עולה"
                },
                {
                    "name": "מתחרים",
                    "value": "עוזבים"
                }
            ],
            "historicalFCF": [
                20,
                24,
                28,
                33,
                38
            ]
        },
        "companyB": {
            "name": "מצטמצמת-חפיר בע\"מ",
            "symbol": "MTHF",
            "sector": "שירותים",
            "description": "ROIC ירד מ-20% ל-16% ב-4 שנים. מרווח גולמי יורד, מתחרים נכנסים, הנחות גוברות. חפיר מצטמצם. P/E 12.",
            "metrics": [
                {
                    "name": "P/E",
                    "value": "12"
                },
                {
                    "name": "ROIC (מגמה)",
                    "value": "20% → 16% ↓"
                },
                {
                    "name": "מרווח גולמי",
                    "value": "יורד"
                },
                {
                    "name": "מתחרים",
                    "value": "נכנסים"
                }
            ],
            "historicalFCF": [
                42,
                40,
                38,
                36,
                34
            ]
        },
        "correctAnswer": "A",
        "pointValue": 300,
        "feedback": {
            "explanation": "מתרחבת-חפיר עדיפה. ROIC 16% זהה — אבל הכיוון הפוך. A: חפיר מתחזק → ROIC ימשיך לעלות. B: חפיר נשחק → ROIC ימשיך לרדת. P/E 22 > 12 מוצדק כי A בונה ו-B מתפרקת. בעוד 3 שנים: A ב-ROIC 20%+, B ב-ROIC 12%.",
            "counterArgument": "מצטמצמת: P/E 12 מול 22 = הפרש כפול. ROIC 16% עדיין גבוה. FCF ₪34M מול ₪38M = קרוב. 'קנייה בזול' שלמרות הירידה עדיין רווחית.",
            "principle": {
                "id": "moat",
                "name": "חפיר כלכלי"
            }
        },
        "workedExample": "1) ROIC זהה: 16%. אבל כיוון הפוך. 2) A: 12% → 16% = חפיר מתחזק, FCF עולה מ-20 ל-38. 3) B: 20% → 16% = חפיר נשחק, FCF יורד מ-42 ל-34. 4) חיזוי: A → 18-20% בעוד 3 שנים. B → 12-14%. 5) P/E: 22 על חפיר מתרחב = זול. 12 על חפיר מצטמצם = יקר. 6) מסקנה: הכיוון חשוב יותר מהמספר."
    }
];

// ==============================
// SELL/HOLD ROUNDS
// ==============================
window.BuffettGame.sellHoldRounds = [
    {
        "id": "sellhold-sunk-cost-01",
        "tier": 1,
        "type": "sell-hold",
        "title": "הפסד של 40% — מה עושים?",
        "purchaseContext": {
            "name": "מגה-סטור קמעונאות בע\"מ",
            "symbol": "MGST",
            "sector": "קמעונאות",
            "purchasePrice": 50,
            "currentPrice": 30,
            "change": "-40%",
            "holdingPeriod": "18 חודשים"
        },
        "newInformation": "החברה איבדה את הלקוח הגדול ביותר שלה (25% מההכנסות). 3 מתחרים חדשים נכנסו לשוק. המנכ\"ל עזב.",
        "currentMetrics": [
            {
                "name": "P/E (נוכחי)",
                "value": "18"
            },
            {
                "name": "FCF",
                "value": "₪12M (ירד מ-₪25M)"
            },
            {
                "name": "חוב/הון",
                "value": "1.5 (עלה מ-0.8)"
            }
        ],
        "correctDecision": "sell",
        "pointValue": 120,
        "feedback": {
            "principle": {
                "id": "sunk-cost",
                "name": "עלות שקועה"
            },
            "explanation": "למכור! התזה המקורית נשברה — הלקוח הגדול הלך, ההנהלה השתנתה, והתחרות גברה. מה ששילמת (₪50) לא רלוונטי. השאלה היחידה: 'האם הייתי קונה היום ב-₪30?' התשובה ברורה: לא.",
            "counterArgument": "'אם אמכור, אממש הפסד של 40%. אולי ישתפר?' — זו בדיוק מלכודת עלות שקועה. ההפסד כבר קרה בין אם תמכור ובין אם לא.",
            "biasWarning": "עלות שקועה: הנטייה להחזיק בהשקעה מפסידה כי 'כבר השקעתי'. המחיר ששילמת לא משנה — רק העתיד משנה."
        },
        "workedExample": "1) שאלה: האם הייתי קונה היום ב-₪30? 2) בדיקה: הלקוח הגדול הלך (25% הכנסות), מנכ\"ל עזב, 3 מתחרים חדשים, חוב כפול. 3) תשובה: לא — בשום פנים. 4) אז למה להחזיק? כי 'כבר הפסדתי 40%' = עלות שקועה. 5) מסקנה: למכור ולהעביר את הכסף להשקעה טובה יותר."
    },
    {
        "id": "sellhold-thesis-intact-01",
        "tier": 2,
        "type": "sell-hold",
        "title": "המניה ירדה 30% — אבל האם התזה נשברה?",
        "purchaseContext": {
            "name": "טק-מד פתרונות רפואיים בע\"מ",
            "symbol": "TKMD",
            "sector": "טכנולוגיה רפואית",
            "purchasePrice": 120,
            "currentPrice": 84,
            "change": "-30%",
            "holdingPeriod": "8 חודשים"
        },
        "newInformation": "ירידה כללית בשוק של 20%. מכירות האגרסיביות של קרנות ETF. אבל: הדוח האחרון מעולה — הכנסות +22%, FCF +35%, חוזה חדש עם בית חולים. אף דבר בחברה עצמה לא השתנה.",
        "currentMetrics": [
            {
                "name": "P/E (נוכחי)",
                "value": "15 (ירד מ-22)"
            },
            {
                "name": "FCF",
                "value": "₪45M (עלה 35%)"
            },
            {
                "name": "צמיחת הכנסות",
                "value": "+22%"
            }
        ],
        "correctDecision": "hold",
        "pointValue": 150,
        "feedback": {
            "principle": {
                "id": "loss-aversion",
                "name": "שנאת הפסד"
            },
            "explanation": "להחזיק! התזה לא נשברה — להפך, הדוח מעולה. הירידה היא מאקרו (שוק כללי), לא מיקרו (החברה). P/E ירד מ-22 ל-15 בזמן שהביצועים השתפרו = עכשיו זולה יותר מכשקנית. אם כבר — אפשר להגדיל פוזיציה.",
            "counterArgument": "'ירד 30%, מי יודע כמה עוד יירד?' — שנאת הפסד. 'אם אמכור ואקנה מחדש בתחתית' — ניסיון לתזמן שוק.",
            "biasWarning": "שנאת הפסד: הכאב מהפסד חזק פי 2 מההנאה מרווח באותו גודל. זה גורם לנו למכור בפאניקה כשהתזה עדיין טובה."
        },
        "workedExample": "1) למה המניה ירדה? שוק כללי -20%, לא בעיה בחברה. 2) בדיקת תזה: הכנסות +22%, FCF +35%, חוזה חדש — הכל חיובי. 3) תמחור: P/E ירד מ-22 ל-15 = עכשיו זולה יותר. 4) שאלה: 'אם לא הייתי מחזיק, הייתי קונה ב-₪84?' כן! 5) מסקנה: התזה שלמה — להחזיק (אולי אפילו להגדיל)."
    },
    {
        "id": "sellhold-disposition-01",
        "tier": 3,
        "type": "sell-hold",
        "title": "המניה עלתה 100% — למכור או להחזיק?",
        "purchaseContext": {
            "name": "סייבר-שילד בע\"מ",
            "symbol": "CYBS",
            "sector": "סייבר",
            "purchasePrice": 80,
            "currentPrice": 160,
            "change": "+100%",
            "holdingPeriod": "2 שנים"
        },
        "newInformation": "המניה הכפילה את עצמה. אתם מרגישים שצריך 'לקחת רווחים'. אבל: החברה חתמה על חוזה ענק עם ממשלת ארה\"ב, ה-ARR קפץ 50%, ו-NRR 145%. הצמיחה מאיצה, לא מאטה.",
        "currentMetrics": [
            {
                "name": "P/E (נוכחי)",
                "value": "35"
            },
            {
                "name": "PEG",
                "value": "1.2 (צמיחה 30%)"
            },
            {
                "name": "NRR",
                "value": "145%"
            },
            {
                "name": "ARR צמיחה",
                "value": "+50%"
            }
        ],
        "correctDecision": "hold",
        "pointValue": 200,
        "feedback": {
            "principle": {
                "id": "disposition-effect",
                "name": "אפקט דיספוזיציה"
            },
            "explanation": "להחזיק! +100% מרגיש 'מספיק' — אבל זו הטיה. השאלה לא כמה הרווחת, אלא מה יקרה מכאן. ARR +50%, NRR 145%, חוזה ממשלתי = הצמיחה מאיצה. PEG 1.2 = עדיין לא יקר. 'לקחת רווחים' הוא אחד המשפטים הכי יקרים בהשקעות.",
            "counterArgument": "'עוף ביד שווה שניים על העץ'. 'אף אחד לא נפגע מלקיחת רווח'. אבל: אם מכרת את אמזון אחרי 100%, פספסת 10,000%.",
            "biasWarning": "אפקט דיספוזיציה: הנטייה למכור מנצחות מוקדם מדי ולהחזיק מפסידות יותר מדי. בדיוק ההפך ממה שצריך."
        },
        "workedExample": "1) הנטייה: 'עשיתי 100%, בוא נכסה'. 2) אבל מה אומרים המספרים? ARR +50%, NRR 145% = הצמיחה מאיצה. 3) PEG 1.2 = עדיין לא יקר ביחס לצמיחה. 4) חוזה ממשלתי = catalyst חדש. 5) שאלה: 'האם הייתי קונה היום ב-₪160?' עם ARR +50% ו-PEG 1.2? כן! 6) מסקנה: אפקט דיספוזיציה. להחזיק."
    },
    {
        "id": "sellhold-thesis-broken-01",
        "tier": 2,
        "type": "sell-hold",
        "title": "קנית בגלל ההנהלה — ההנהלה השתנתה",
        "purchaseContext": {
            "name": "טכנו-פארם ישראל בע\"מ",
            "symbol": "TKFR",
            "sector": "פארמה",
            "purchasePrice": 95,
            "currentPrice": 102,
            "change": "+7%",
            "holdingPeriod": "14 חודשים"
        },
        "newInformation": "המנכ\"לית שבגללה קנית (מייסדת עם 15% אחזקה, ROIC 18%) הודיעה על פרישה. המחליף הוא מנהל מקרב בנקאות השקעות ללא ניסיון תפעולי. הדירקטוריון אישר לו חבילת תגמול של ₪12M/שנה ללא תנאי ביצוע.",
        "currentMetrics": [
            {
                "name": "P/E",
                "value": "16"
            },
            {
                "name": "ROIC",
                "value": "18% (עדיין)"
            },
            {
                "name": "FCF",
                "value": "₪52M"
            }
        ],
        "correctDecision": "sell",
        "pointValue": 150,
        "feedback": {
            "principle": {
                "id": "management-quality",
                "name": "איכות הנהלה"
            },
            "explanation": "למכור! התזה הייתה מבוססת על הנהלה — וההנהלה השתנתה. '+7%' = אתה ברווח, אבל זה לא משנה. השאלה: 'האם הייתי קונה היום עם המנכ\"ל החדש?' מנהל בלי ניסיון + תגמול ללא ביצוע = אינטרסים לא מיושרים.",
            "counterArgument": "'אני ברווח 7%, המספרים עדיין טובים, אולי המנכ\"ל החדש יפתיע.' — נכון, אבל הסתברותית: מעבר ממנכ\"לית מייסדת למנהל מבנקאות = סיכון גבוה.",
            "biasWarning": "אפקט הקצאה (endowment effect): נטייה להעריך מה שכבר שלנו יותר מדי. 'אני כבר ברווח' = לא רלוונטי לשאלה אם להחזיק."
        },
        "workedExample": "1) התזה המקורית: מנכ\"לית מייסדת + 15% + ROIC 18%. 2) מה השתנה: היא פורשת. 3) המחליף: אין ניסיון תפעולי + תגמול ללא ביצוע = דגל אדום כפול. 4) שאלה: 'הייתי קונה היום?' עם המנכ\"ל החדש, ב-P/E 16? לא. 5) +7% לא רלוונטי. 6) מסקנה: התזה נשברה — למכור."
    },
    {
        "id": "sellhold-anchoring-01",
        "tier": 3,
        "type": "sell-hold",
        "title": "הפסד של 55% — אבל העסק השתנה לחלוטין",
        "purchaseContext": {
            "name": "מגה-רשת חנויות בע\"מ",
            "symbol": "MGRT",
            "sector": "קמעונאות",
            "purchasePrice": 180,
            "currentPrice": 81,
            "change": "-55%",
            "holdingPeriod": "3 שנים"
        },
        "newInformation": "קנית לפני 3 שנים כשהיה חפיר — מותג חזק ו-30 סניפים. מאז: 15 סניפים נסגרו, חוב הכפיל את עצמו, מנכ\"ל עזב, ROIC ירד מ-14% ל-3%, ומתחרה אונליין לקח 40% מהלקוחות. אין שום סיבה לחשוב שזה ישתנה.",
        "currentMetrics": [
            {
                "name": "P/E",
                "value": "22 (על רווחים שמתכווצים)"
            },
            {
                "name": "ROIC",
                "value": "3% (ירד מ-14%)"
            },
            {
                "name": "FCF",
                "value": "₪8M (ירד מ-₪45M)"
            }
        ],
        "correctDecision": "sell",
        "pointValue": 200,
        "feedback": {
            "principle": {
                "id": "sunk-cost",
                "name": "עלות שקועה"
            },
            "explanation": "למכור! ₪180 → ₪81 כואב — אבל ₪180 לא קיים יותר. השאלה: 'אם היה לי ₪81 מזומן, הייתי קונה את המניה הזו?' עם ROIC 3%, חוב כפול, ומתחרה שלקח 40%? ברור שלא. ₪81 ידלו במניה טובה יותר.",
            "counterArgument": "'כבר הפסדתי 55%. אם אמכור עכשיו, זה 'אמיתי'. אולי יהיה ריבאונד.' — עלות שקועה קלאסית. ההפסד כבר קרה.",
            "biasWarning": "עלות שקועה + עיגון על מחיר קנייה: הנטייה לחכות 'עד שהמניה תחזור ל-₪180'. אבל המניה לא יודעת מה שילמת. היא שווה מה שהיא שווה."
        },
        "workedExample": "1) ₪180 → ₪81 = הפסד 55%. כואב. 2) אבל: ROIC 14% → 3%, FCF ₪45M → ₪8M, 15 סניפים נסגרו. 3) התזה נשברה לחלוטין — לא חלקית. 4) שאלה: 'הייתי קונה ב-₪81?' = לא. P/E 22 על רווחים מתכווצים = יקר. 5) ₪81 שנשאירו כאן = ₪81 שלא עובדים בשבילנו. 6) מסקנה: להתנתק ממחיר הקנייה — למכור."
    },
    {
        "id": "sellhold-loss-aversion-01",
        "tier": 4,
        "type": "sell-hold",
        "title": "למכור בהפסד עכשיו או להסתכן בהפסד גדול יותר",
        "purchaseContext": {
            "name": "אופטימל אנרגיה בע\"מ",
            "symbol": "OPTM",
            "sector": "אנרגיה",
            "purchasePrice": 120,
            "currentPrice": 96,
            "change": "-20%",
            "holdingPeriod": "11 חודשים"
        },
        "newInformation": "קנית על בסיס חוזה גדול שנחתם. עכשיו: החוזה עלול להתבטל (60% סיכוי) בגלל שינוי רגולטורי. אם יתבטל — המניה צפויה לרדת ל-₪50 (-58% ממחיר הנוכחי). אם לא יתבטל — תעלה ל-₪150. תוחלת: 0.6×50 + 0.4×150 = ₪90 < ₪96.",
        "currentMetrics": [
            {
                "name": "תוחלת מחיר",
                "value": "₪90 (< ₪96 נוכחי)"
            },
            {
                "name": "הסתברות ביטול",
                "value": "60%"
            },
            {
                "name": "downside אם ביטול",
                "value": "₪50 (-48%)"
            }
        ],
        "correctDecision": "sell",
        "pointValue": 300,
        "feedback": {
            "principle": {
                "id": "loss-aversion",
                "name": "שנאת הפסד"
            },
            "explanation": "למכור! התוחלת ₪90 < מחיר נוכחי ₪96. בנוסף, downside (₪50) הרבה יותר גדול מ-upside (₪150 מול ₪96). זה חישוב קר, לא רגש. '20% הפסד' כואב למכור, אבל עדיף מ-58% הפסד.",
            "counterArgument": "'אם אמכור ב-₪96, ההפסד של 20% 'מתממש'. אם אחכה, יש 40% סיכוי ל-₪150!' — שנאת הפסד. התוחלת שלילית = למכור.",
            "biasWarning": "שנאת הפסד: הכאב ממימוש הפסד 20% מונע ממך לראות שאתה חושף את עצמך להפסד 48% נוסף. 'קיבוע הפסד' הוא ביטוי שגוי — ההפסד כבר קרה."
        },
        "workedExample": "1) מצב: ₪96, הפסד 20% עד כה. 2) תרחישים: 60% → ₪50, 40% → ₪150. 3) תוחלת: 0.6×50 + 0.4×150 = 30+60 = ₪90 < ₪96. 4) = תוחלת שלילית = למכור מבחינה מתמטית. 5) בנוסף: ₪50 = הפסד 48% נוסף, לעומת upside ₪54 = 56%. 6) יחס סיכון/סיכוי: 48%×60% מול 56%×40% = -28.8% מול +22.4%. 7) מסקנה: מתמטית ורגשית — למכור."
    },
    {
        "id": "sellhold-new-competitor-01",
        "tier": 2,
        "type": "sell-hold",
        "title": "מתחרה חדש שמשנה את כללי המשחק",
        "purchaseContext": {
            "name": "דפוס-פלוס שירותי דפוס בע\"מ",
            "symbol": "DFPS",
            "sector": "שירותי דפוס",
            "purchasePrice": 45,
            "currentPrice": 48,
            "change": "+7%",
            "holdingPeriod": "10 חודשים"
        },
        "newInformation": "מתחרה טכנולוגי חדש השיק שירות דפוס אונליין אוטומטי — ב-40% מהמחיר שלכם, עם איכות דומה. כבר לקח 5% מהשוק ב-3 חודשים. המנכ\"ל שלכם: 'הלקוחות שלנו נאמנים.'",
        "currentMetrics": [
            {
                "name": "P/E",
                "value": "8"
            },
            {
                "name": "ROIC",
                "value": "13%"
            },
            {
                "name": "FCF",
                "value": "₪18M"
            }
        ],
        "correctDecision": "sell",
        "pointValue": 150,
        "feedback": {
            "principle": {
                "id": "moat",
                "name": "חפיר כלכלי"
            },
            "explanation": "למכור! מתחרה ב-40% פחות שכבר לקח 5% ב-3 חודשים = disruption אמיתי. 'הלקוחות נאמנים' = מה שכל חברה שנפגעה מ-disruption אמרה. +7% = עדיין ברווח — נצלו את זה.",
            "counterArgument": "'רק 5% ב-3 חודשים, המחיר עלה, ואנחנו ברווח.' — 5% ב-3 חודשים = 20%+ בשנה. וזה רק ההתחלה.",
            "biasWarning": "הטיית סטטוס-קוו: הנטייה להניח שהמצב הנוכחי ימשיך. כש-disruption מגיע, הוא מאיץ — לא מאט."
        },
        "workedExample": "1) מצב: +7%, P/E 8, FCF חיובי. 2) שינוי: מתחרה ב-40% פחות, 5% שוק ב-3 חודשים. 3) חשיבת עתיד: 5% ב-3 חודשים = 20%+ בשנה. בעוד 3 שנים? 4) הנהלה 'לא מודאגת' = לא תסתגל. 5) מסקנה: disruption + הכחשה = למכור כשעדיין ברווח."
    },
    {
        "id": "sellhold-mgmt-deterioration-01",
        "tier": 3,
        "type": "sell-hold",
        "title": "ההנהלה השתנתה — מוצדק לחכות?",
        "purchaseContext": {
            "name": "קוואליטי-פוד תעשיות בע\"מ",
            "symbol": "QLFD",
            "sector": "מזון",
            "purchasePrice": 85,
            "currentPrice": 95,
            "change": "+12%",
            "holdingPeriod": "2 שנים"
        },
        "newInformation": "קנית בגלל הנהלה מצוינת עם ROIC > 15%. מאז: (1) המנכ\"ל פרש ונכנס יורש ללא ניסיון. (2) 3 רכישות ב-ROIC 8%. (3) שכר ההנהלה עלה 45%. (4) ROIC ירד ל-11%. המספרים עדיין 'סבירים' — אבל הכיוון שלילי.",
        "currentMetrics": [
            {
                "name": "P/E",
                "value": "14"
            },
            {
                "name": "ROIC",
                "value": "11% (ירד מ-15%)"
            },
            {
                "name": "FCF",
                "value": "₪38M (יציב)"
            }
        ],
        "correctDecision": "sell",
        "pointValue": 200,
        "feedback": {
            "principle": {
                "id": "management-quality",
                "name": "איכות הנהלה"
            },
            "explanation": "למכור! +12% מפתה להחזיק, אבל כל הסימנים שליליים: ROIC יורד, רכישות גרועות, שכר עולה. באפט: 'כשספינה טובה מקבלת קפטן רע, תמיד הקפטן מנצח.' המספרים 'סבירים' כי הנהלה רעה לוקחת זמן להרוס — אבל הכיוון ברור.",
            "counterArgument": "'אני ברווח 12%, המספרים עדיין סבירים, אולי היורש ילמד.' — ROIC 15% → 11% ב-2 שנים = מגמה. 3 רכישות ב-ROIC 8% = הרגל. שכר +45% = אינטרסים.",
            "biasWarning": "אפקט הקצאה + anchoring: 'אני כבר ברווח' + 'המספרים עדיין 'סבירים'' מונעים ממך לראות שהכיוון רע."
        },
        "workedExample": "1) התזה: הנהלה מעולה עם ROIC > 15%. 2) מה השתנה: מנכ\"ל פרש, יורש + ROIC 15% → 11% + 3 רכישות גרועות + שכר +45%. 3) 'המספרים סבירים' = הנזק טרם השלים. 4) שאלה: 'הייתי קונה היום עם היורש?' לא. 5) +12% לא רלוונטי. 6) מסקנה: הנהלה ← גרועה = התזה נשברה. למכור."
    }
];

window.BuffettGame.principleRounds = [
  // ── EASY (tier 1) — 8 scenarios ──────────────────────────────────────────
  {
    id: "pr-moat-patent-01",
    tier: 1,
    scenario: "חברת תרופות רשמה פטנט על מוצר חדש שמגן עליה מתחרות ל-15 שנה. מאז הפטנט, המרווח הגולמי עלה מ-30% ל-55% כי אין מתחרים שיורידו מחירים. החברה מצליחה לגבות פרמיה משמעותית.",
    question: "איזה עיקרון של השקעות ערך בא לידי ביטוי כאן?",
    options: ["חפיר כלכלי", "מרווח ביטחון", "מלכודת ערך", "רווחי בעלים"],
    correctPrinciple: "moat",
    explanation: "פטנט = חפיר כלכלי (נכס בלתי מוחשי). הוא מגן על המרווחים מתחרות. כשהפטנט יפוג — החפיר ייחלש, ויש לנטר זאת."
  },
  {
    id: "pr-value-trap-01",
    tier: 1,
    scenario: "חברת קמעונאות נסחרת ב-P/E 6 — נראה זול מאוד. אבל הכנסותיה ירדו 8% השנה, 11% בשנה שעברה, ו-7% לפני שלוש שנים. האמזון נכנסת לתחום שלה.",
    question: "איזה עיקרון של השקעות ערך בא לידי ביטוי כאן?",
    options: ["מלכודת ערך", "חפיר כלכלי", "מרווח ביטחון", "מלכודת צמיחה"],
    correctPrinciple: "value-trap",
    explanation: "P/E נמוך עם עסק מתדרדר = מלכודת ערך. 'זול' יכול להיות יקר מאוד אם העסק ממשיך לשקוע."
  },
  {
    id: "pr-margin-of-safety-01",
    tier: 1,
    scenario: "מניה נסחרת ב-₪100 לפי הערכתך שווי פנימי מינימלי הוא ₪150. אתה מחכה ומחכה — לבסוף היא יורדת ל-₪65 בגלל חדשות שליליות זמניות שלא פגעו בעסק עצמו.",
    question: "איזה עיקרון של השקעות ערך בא לידי ביטוי כאן?",
    options: ["מרווח ביטחון", "חפיר כלכלי", "רווחי בעלים", "איכות הנהלה"],
    correctPrinciple: "margin-of-safety",
    explanation: "מרווח ביטחון = קנייה במחיר נמוך משמעותית מהשווי הפנימי. ₪65 מול שווי ₪150 = מרווח ביטחון של 57%."
  },
  {
    id: "pr-management-01",
    tier: 1,
    scenario: "המנכ\"ל של חברה קנה מניות בשווי ₪5M מכספו האישי — גם כשהמניה ירדה 30%. מאז ייסוד החברה הוא מקבל משכורת נמוכה מהממוצע בתחום, אבל אוחז ב-15% מהמניות.",
    question: "איזה עיקרון של השקעות ערך בא לידי ביטוי כאן?",
    options: ["איכות הנהלה", "מרווח ביטחון", "מלכודת ערך", "חפיר כלכלי"],
    correctPrinciple: "management-quality",
    explanation: "הנהלה שמשקיעה מכספה = 'skin in the game'. מנהל עם 15% מהחברה חושב כמו בעלים — לא כמו שכיר."
  },
  {
    id: "pr-leverage-risk-01",
    tier: 1,
    scenario: "חברת נדל\"ן צמחה 40% בשנה האחרונה. אבל חוב/הון שלה עומד על 3.5 ויחס כיסוי הריבית הוא 1.2. הריביות עולות בעולם.",
    question: "איזה עיקרון של השקעות ערך בא לידי ביטוי כאן?",
    options: ["סיכון מינוף", "מלכודת צמיחה", "חפיר כלכלי", "שיקום"],
    correctPrinciple: "leverage-risk",
    explanation: "כיסוי ריבית 1.2 = מסוכן מאוד. אם הכנסות ייפלו 20% או הריבית תעלה עוד — החברה לא תוכל לשרת את חובה."
  },
  {
    id: "pr-dividend-01",
    tier: 1,
    scenario: "חברת תשתיות מחלקת דיבידנד של 9%. נשמע נהדר — אבל יחס החלוקה שלה הוא 115% (משלמת יותר ממה שמרוויחה). היא לווה כסף כדי לשלם דיבידנד.",
    question: "איזה עיקרון של השקעות ערך בא לידי ביטוי כאן?",
    options: ["קיימות דיבידנד", "תשואת דיבידנד", "סיכון מינוף", "מלכודת ערך"],
    correctPrinciple: "dividend-sustainability",
    explanation: "דיבידנד שמומן מחוב הוא פצצה מתקתקת. יחס חלוקה מעל 100% = הדיבידנד בסכנה."
  },
  {
    id: "pr-owner-earnings-01",
    tier: 1,
    scenario: "חברה מדווחת על רווח נקי של ₪100M. אבל ה-FCF (תזרים חופשי) שלה הוא רק ₪20M. הסיבה: פחת מואץ מוריד את הרווח ה'חשבונאי', בעוד שבפועל ה-CAPEX השנתי נמוך.",
    question: "איזה עיקרון של השקעות ערך בא לידי ביטוי כאן?",
    options: ["רווחי בעלים", "מלכודת ערך", "חפיר כלכלי", "מרווח ביטחון"],
    correctPrinciple: "owner-earnings",
    explanation: "באפט: 'רווח חשבונאי הוא דעה, מזומן הוא עובדה.' FCF = הכסף שבאמת זמין לבעלים. רווח נקי יכול להטעות."
  },
  {
    id: "pr-circle-01",
    tier: 1,
    scenario: "חברת בינה מלאכותית עם ביזנס-מודל מסובך — שילוב של ענן, מוצרי צריכה, ואסטרטגיית IP. הכנסות עולות אבל אתה לא בטוח מאיפה מגיע הרווח ומה יקרה בעוד 5 שנים.",
    question: "איזה עיקרון של השקעות ערך בא לידי ביטוי כאן?",
    options: ["מעגל כשירות", "קשה מדי", "מלכודת צמיחה", "מרווח ביטחון"],
    correctPrinciple: "circle-of-competence",
    explanation: "אם אתה לא מבין את העסק — אל תשקיע. זה לא שוטות, זה משמעת. 'לא יודע' הוא תשובה לגיטימית לגמרי."
  },

  // ── MEDIUM (tier 2) — 8 scenarios ────────────────────────────────────────
  {
    id: "pr-growth-trap-01",
    tier: 2,
    scenario: "חברת סטארטאפ צמחה 50% בהכנסות. אבל המרווח הגולמי ירד מ-65% ל-40% כי צריכים להוזיל כדי לצמוח. הוצאות המכירה גדלו פי שלוש. ה-FCF שלילי ומחמיר.",
    question: "איזה עיקרון של השקעות ערך בא לידי ביטוי כאן?",
    options: ["מלכודת צמיחה", "מלכודת ערך", "מרווח ביטחון", "סיכון מינוף"],
    correctPrinciple: "growth-trap",
    explanation: "צמיחה שדורשת הוזלת מחירים = חסרת ערך. עסק טוב צומח עם שמירה על מרווחים, לא על חשבונם."
  },
  {
    id: "pr-cyclical-01",
    tier: 2,
    scenario: "חברת פלדה נסחרת ב-P/E 6 — נראה זול. אבל הרווחים הנוכחיים שיאיים: מחירי הפלדה הכפילו את עצמם בגלל מגפה ובעיות שרשרת אספקה. היסטורית מחיר הפלדה מחזורי מאוד.",
    question: "איזה עיקרון של השקעות ערך בא לידי ביטוי כאן?",
    options: ["מלכודת מחזוריות", "מלכודת ערך", "חפיר כלכלי", "שיקום"],
    correctPrinciple: "cyclical-trap",
    explanation: "בחברה מחזורית, P/E נמוך בשיא = P/E גבוה מנוכה-מחזור. הרווחים הנוכחיים לא ייצוגיים — הם ירדו."
  },
  {
    id: "pr-turnaround-01",
    tier: 2,
    scenario: "חברת תעשייה שסבלה 3 שנים החליפה מנכ\"ל. המנכ\"ל החדש סגר 2 מחלקות מפסידות, פיטר 20% מכוח האדם, ומכר נכסים עודפים. ה-FCF חזר לחיוביות אחרי שנתיים.",
    question: "איזה עיקרון של השקעות ערך בא לידי ביטוי כאן?",
    options: ["שיקום", "מלכודת ערך", "מחזוריות", "איכות הנהלה"],
    correctPrinciple: "turnaround",
    explanation: "שיקום אמיתי = פעולות קונקרטיות (סגירה, מכירה, FCF+). לא רק הבטחות. הסיכון: האם ההנהלה תוכל לבצע?"
  },
  {
    id: "pr-moat-network-01",
    tier: 2,
    scenario: "פלטפורמת מסחר אלקטרוני ישראלית: 2 מיליון קונים ו-80,000 מוכרים. ככל שיש יותר מוכרים — יש יותר מוצרים — יש יותר קונים. מוכר חדש לא יכול להרשות לעצמו לפספס פלטפורמה עם 2M קונים.",
    question: "איזה עיקרון של השקעות ערך בא לידי ביטוי כאן?",
    options: ["חפיר כלכלי", "רווחי בעלים", "מלכודת צמיחה", "מרווח ביטחון"],
    correctPrinciple: "moat",
    explanation: "אפקט הרשת = חפיר חזק. כל משתמש חדש מגדיל את ערך הפלטפורמה לכולם. קשה מאוד לשכפל."
  },
  {
    id: "pr-owner-earnings-02",
    tier: 2,
    scenario: "רשת מלונות מדווחת רווח של ₪80M. אבל בכל שנה היא חייבת לשפץ 20% מהחדרים ב-₪60M — אחרת האיכות תרד. ה-CAPEX הזה לא 'אופציונלי'.",
    question: "איזה עיקרון של השקעות ערך בא לידי ביטוי כאן?",
    options: ["רווחי בעלים", "מרווח גולמי", "סיכון מינוף", "קיימות דיבידנד"],
    correctPrinciple: "owner-earnings",
    explanation: "רווחי בעלים = רווח נקי + פחת - CAPEX תחזוקתי. ₪80M - ₪60M = ₪20M בפועל. הרווח 'האמיתי' הוא רק ₪20M."
  },
  {
    id: "pr-too-hard-01",
    tier: 2,
    scenario: "חברת ביוטק עם תרופה שנמצאת בשלב 3 של ניסויים קליניים. הרגולציה מורכבת, ה-FDA לא ניתן לחיזוי, ויש מתחרה דומה בשוק. הצלחה = x10. כישלון = ירידה של 90%.",
    question: "איזה עיקרון של השקעות ערך בא לידי ביטוי כאן?",
    options: ["קשה מדי", "מרווח ביטחון", "מלכודת צמיחה", "שיקום"],
    correctPrinciple: "too-hard",
    explanation: "כשהתוצאות בינאריות ותלויות בגורמים שאי אפשר לנתח — זה 'too hard'. העברה לסל 'קשה מדי' היא משמעת, לא חולשה."
  },
  {
    id: "pr-margin-of-safety-02",
    tier: 2,
    scenario: "חברת נדל\"ן מסחרי נסחרת ב-₪200M. שווי הנכסים שלה לפי הערכה שמרנית הוא ₪600M, עם שוכרים ארוכי-טווח ואיכותיים. הירידה בגלל חששות מאינפלציה שנראית זמנית.",
    question: "איזה עיקרון של השקעות ערך בא לידי ביטוי כאן?",
    options: ["מרווח ביטחון", "מלכודת ערך", "חפיר כלכלי", "מחזוריות"],
    correctPrinciple: "margin-of-safety",
    explanation: "₪200M מול שווי ₪600M = מרווח ביטחון של 67%. גם אם השומה מוגזמת ב-30%, עדיין יש הגנה משמעותית."
  },
  {
    id: "pr-leverage-risk-02",
    tier: 2,
    scenario: "חברת רכישות ממונפת — חוב/הון 4.2. בשנים טובות הרוויחה מעולה, כי המינוף הגביר את התשואה. אבל שוק האשראי נקפא ב-2020 ל-3 חודשים, והיא כמעט פשטה רגל.",
    question: "איזה עיקרון של השקעות ערך בא לידי ביטוי כאן?",
    options: ["סיכון מינוף", "שיקום", "מלכודת ערך", "קשה מדי"],
    correctPrinciple: "leverage-risk",
    explanation: "מינוף מגביר רווחים — וגם הפסדים. חברה ממונפת יכולה להפוך פגיעה קטנה לסכנת חדלות פירעון."
  },

  // ── HARD (tier 3) — 8 scenarios ──────────────────────────────────────────
  {
    id: "pr-value-trap-02",
    tier: 3,
    scenario: "בנק מסחרי נסחר ב-P/B 0.5. ROE של 8% — מתחת לעלות ההון. הנהלה מחלקת דיבידנד מלא. מאז 2015 ה-ROE ירד מ-14% ל-8% ומשקיעים רבים אומרים 'זה פשוט זול'.",
    question: "איזה עיקרון של השקעות ערך בא לידי ביטוי כאן?",
    options: ["מלכודת ערך", "קיימות דיבידנד", "מחזוריות", "מרווח ביטחון"],
    correctPrinciple: "value-trap",
    explanation: "בנק עם ROE מתחת לעלות ההון מפסיד ערך לבעלים. P/B 0.5 'זול' אבל השוק מתמחר את הירידה ב-ROE — לא עיוות אופטי."
  },
  {
    id: "pr-cyclical-02",
    tier: 3,
    scenario: "חברת שינוע ים נסחרת ב-P/E 3. בשנה האחרונה הכנסות x4 בגלל מחסור ספינות גלובלי. CEO אומר 'הביקוש יישאר גבוה'. היסטורית, מחירי שינוע ים ידועים בתנודתיות קיצונית.",
    question: "איזה עיקרון של השקעות ערך בא לידי ביטוי כאן?",
    options: ["מלכודת מחזוריות", "חפיר כלכלי", "מלכודת ערך", "רווחי בעלים"],
    correctPrinciple: "cyclical-trap",
    explanation: "ב-commodity cyclicals: P/E נמוך בשיא מחזור = P/E גבוה על רווחים מנוכי-מחזור. מה ה-P/E על תזרים ב'שנה רגילה'?"
  },
  {
    id: "pr-moat-switching-01",
    tier: 3,
    scenario: "חברת ERP לעסקים קטנים. עלות המעבר ללקוח (הדרכות, אינטגרציות, נתונים היסטוריים) עומדת על ₪200K ו-6 חודשי הטמעה. כ-90% מהלקוחות מחדשים מדי שנה.",
    question: "איזה עיקרון של השקעות ערך בא לידי ביטוי כאן?",
    options: ["חפיר כלכלי", "רווחי בעלים", "מלכודת צמיחה", "איכות הנהלה"],
    correctPrinciple: "moat",
    explanation: "עלויות מעבר = חפיר כלכלי. לקוח שנשאר לא מרוצה אבל נשאר כי 'כואב לעבור' = הגנה מובנית על הכנסות."
  },
  {
    id: "pr-growth-trap-02",
    tier: 3,
    scenario: "חברת SaaS צמחה 80% בARR. משקיעים מתלהבים. אבל CAC (עלות רכישת לקוח) עלתה מ-₪8K ל-₪22K, בעוד LTV (שווי לקוח) נשאר ב-₪30K. יחס LTV/CAC ירד מ-6 ל-1.4.",
    question: "איזה עיקרון של השקעות ערך בא לידי ביטוי כאן?",
    options: ["מלכודת צמיחה", "חפיר כלכלי", "קשה מדי", "מלכודת ערך"],
    correctPrinciple: "growth-trap",
    explanation: "צמיחה עם LTV/CAC < 3 = קונים לקוחות בהפסד. הצמיחה 'אמיתית' רק בנייר — בפועל כל לקוח חדש מפסיד כסף."
  },
  {
    id: "pr-turnaround-02",
    tier: 3,
    scenario: "חברה שהפסידה 3 שנים עברה ל-FCF חיובי. אבל הסיבה: מכרה מחלקת מחקר רווחית ב-₪300M וצמצמה עובדים במו\"פ. ה'שיקום' על חשבון עתיד.",
    question: "איזה עיקרון של השקעות ערך בא לידי ביטוי כאן?",
    options: ["שיקום", "מלכודת ערך", "מרווח ביטחון", "רווחי בעלים"],
    correctPrinciple: "turnaround",
    explanation: "שיקום מזויף: FCF חיובי מ'גזירת שרירים' עתידיים ≠ שיקום עסקי אמיתי. צריך לבדוק: האם הבסיס העסקי השתפר?"
  },
  {
    id: "pr-management-02",
    tier: 3,
    scenario: "חברה הנפיקה אופציות לצוות ניהול בשווי ₪120M בשנה שהרוויחה רק ₪80M. בנוסף רכשה חברה בת-תחרות ב-פרמיה של 80% — עסקה שמעולם לא הניבה ערך.",
    question: "איזה עיקרון של השקעות ערך בא לידי ביטוי כאן?",
    options: ["איכות הנהלה", "מלכודת ערך", "קשה מדי", "סיכון מינוף"],
    correctPrinciple: "management-quality",
    explanation: "הנהלה שמדוללת בעלים + משלמת פרמיה על רכישה גרועה = הרס ערך. הקצאת הון לא נבונה היא מאפיין מוביל של הנהלה גרועה."
  },
  {
    id: "pr-circle-02",
    tier: 3,
    scenario: "חברת ביצועי סייבר + ענן + AI + חומרה. כל רבעון מגיעים בהפתעה — פעם עלייה ממוצרי cloud, פעם ירידה מחומרה, פעם רכישה לא צפויה. ה-CFO עצמו אמר 'המודל העסקי שלנו מורכב'.",
    question: "איזה עיקרון של השקעות ערך בא לידי ביטוי כאן?",
    options: ["קשה מדי", "מעגל כשירות", "מלכודת צמיחה", "חפיר כלכלי"],
    correctPrinciple: "too-hard",
    explanation: "כשהCFO עצמו לא יכול להסביר — איך אתה תנתח? 'קשה מדי' ≠ 'חברה גרועה', אלא 'לא ניתן לנתח בביטחון'."
  },
  {
    id: "pr-dividend-02",
    tier: 3,
    scenario: "חברת תשתיות עם דיבידנד 6%. FCF yield של 8%, יחס חלוקה של 75%, חוב יציב, חוזי לקוחות ל-15 שנה. אבל מתחרה חדשה נכנסת לשוק עם מחירים נמוכים ב-12%.",
    question: "איזה עיקרון של השקעות ערך בא לידי ביטוי כאן?",
    options: ["קיימות דיבידנד", "חפיר כלכלי", "סיכון מינוף", "מלכודת ערך"],
    correctPrinciple: "dividend-sustainability",
    explanation: "דיבידנד בר-קיימא תלוי ב: FCF, יחס חלוקה, ומצב תחרותי. כאן: FCF מאפשר, אבל כניסת מתחרה מאיימת על ה-FCF העתידי."
  }
];
