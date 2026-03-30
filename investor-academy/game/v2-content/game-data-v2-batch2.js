// ============================================================================
// משחק ההשקעות v2 — Batch 2: Hard/Expert + Remaining Question Types
// ============================================================================
// Continues from Batch 1. Focuses on:
//   1. Hard tier companies (with reasoning options)
//   2. Expert tier companies (with sell triggers + due diligence)
//   3. Remaining versus rounds
//   4. Remaining sell/hold scenarios
//   5. Remaining special events
//   6. Existing company patches (counterSignalExplanation + workedExample)
//
// METRICS POLICY: Universal metrics only (P/E, PEG, FCF, ROE, ROIC, CROIC,
// quick ratio, current ratio, buybacks, debt/equity, payout ratio, margins).
// New-but-universal metrics get a short Hebrew tooltip in the metric name.
// ============================================================================


// ============================================================================
// SECTION 1: HARD TIER (tier 3) — 10 more companies
// Every hard company has reasoningOptions (6 options, 1-2 traps with biasTag)
// ============================================================================

const HARD_COMPANIES_BATCH2 = [

    // ── MOAT EROSION (Hard, Pass) ───────────────────────────────────────
    {
        id: "moat-erosion-h01",
        name: "פארם-ישראל תרופות בע\"מ",
        sector: "פארמה גנרית",
        symbol: "FRMI",
        price: 95.00,
        tier: 3,
        chartType: "annual",
        description: "יצרנית תרופות גנריות שהייתה מובילה עם מרווחים גבוהים. בשלוש שנים האחרונות, יצרנים הודיים נכנסו לשוק שלה עם מחירים נמוכים ב-40%. ההכנסות עדיין גדלות (3%) אבל המרווח הגולמי ירד מ-55% ל-38% וממשיך לרדת.",
        management: "מנכ\"ל ותיק שמתעקש \'לא נוריד מחירים — אנחנו מותג\'. לא משנה אסטרטגיה.",
        moat: "מותג חזק בישראל ורישיונות FDA, אבל בגנריות המותג פחות חשוב — המחיר קובע.",
        events: "2 לקוחות גדולים עברו ליצרן הודי. המרווח הגולמי ירד לרבעון חמישי ברציפות.",
        metrics: {
            basic: [
                { name: "P/E", value: "14" },
                { name: "ROE", value: "16%" },
                { name: "צמיחת הכנסות", value: "+3%" }
            ],
            advanced: [
                { name: "ROIC", value: "13%" },
                { name: "FCF (מיליון ₪)", value: "48" },
                { name: "מרווח גולמי (מגמה)", value: "55% → 38% (5 שנים)" }
            ]
        },
        historicalData: [
            { year: "year-4", revenue: 520, fcf: 72 },
            { year: "year-3", revenue: 535, fcf: 65 },
            { year: "year-2", revenue: 540, fcf: 58 },
            { year: "year-1", revenue: 548, fcf: 52 },
            { year: "year-0", revenue: 555, fcf: 48 }
        ],
        projectedData: [
            { year: "year+1", revenue: 560, fcf: 40 },
            { year: "year+2", revenue: 555, fcf: 32 }
        ],
        correctDecision: "pass",
        pointValue: 200,
        // FCF BREAKER: FCF positive, revenue growing, but answer is pass
        hints: [{ cost: 0.5, text: "ההכנסות גדלות 3%, אבל ה-FCF ירד 33% בארבע שנים. מה קורה בין השורות?" }],
        feedback: {
            principle: { id: "moat", name: "חפיר כלכלי" },
            decisiveSignals: ["מרווח גולמי 55% → 38% = חפיר נשחק", "מתחרים ב-40% פחות", "הנהלה לא מסתגלת"],
            correctExplanation: "נכון! ההכנסות מסוות את הבעיה — הן גדלות רק כי הנפח עולה, אבל הרווח על כל יחידה קורס. מרווח גולמי שיורד 17 נקודות ב-5 שנים = חפיר שנשחק. כשמגנריות מתחרות על מחיר, המותג לא מגן.",
            incorrectExplanation: "טעות! P/E 14, ROE 16%, FCF חיובי — הכל נראה טוב. אבל מגמת המרווח הגולמי מספרת סיפור אחר. כשהחפיר נשחק, כל המספרים \'הטובים\' יתדרדרו בעקבותיו.",
            counterSignalExplanation: "הצד השני יטען: P/E 14 סביר, ROIC 13% מכובד, הכנסות עדיין גדלות, ורישיונות FDA הם חפיר רגולטורי. אולי ההנהלה תשנה אסטרטגיה בלחץ."
        },
        workedExample: "1) הכנסות +3% — נראה טוב. 2) אבל FCF ירד מ-₪72M ל-₪48M = -33%. 3) הסיבה: מרווח גולמי 55% → 38% = כל שקל מכירה מרוויח פחות. 4) למה? מתחרים הודיים ב-40% פחות = לחץ מחירים. 5) הנהלה: מסרבת לשנות = תמשיך לאבד. 6) P/E 14 מטעה — הרווחים עצמם יורדים. 7) מסקנה: חפיר נשחק = העל.",
        reasoningOptions: [
            { text: "מרווח גולמי 55%→38% = חפיר נשחק בקצב מדאיג", correct: true },
            { text: "הנהלה שמסרבת להסתגל = תמשיך לאבד נתח שוק", correct: true },
            { text: "P/E 14 = מחיר סביר לחברת פארמה", correct: false, biasTag: "עיגון על מכפיל נקודתי" },
            { text: "FCF חיובי + הכנסות גדלות = החברה בסדר", correct: false, biasTag: "התעלמות ממגמה" },
            { text: "ROIC 13% יורד ויגיע ל-8% בעוד שנתיים בקצב הזה", correct: true },
            { text: "רישיונות FDA = חפיר רגולטורי שמגן", correct: false, biasTag: "הערכת יתר של חפיר חלקי" }
        ],
        isGoodValue: false,
        difficulty: "hard",
        difficultyValue: 3,
        hint: "ההכנסות גדלות 3%, אבל ה-FCF ירד 33% בארבע שנים. מה קורה בין השורות?"
    },

    // ── VALUE TRAP THAT'S REAL VALUE (Hard, Buy) ────────────────────────
    {
        id: "deep-value-h01",
        name: "אלון תעשיות מזון בע\"מ",
        sector: "מזון ומשקאות",
        symbol: "ALNT",
        price: 45.00,
        tier: 3,
        chartType: "annual",
        description: "יצרנית מזון מעובד עם P/E 6, דיבידנד 7%, ו-FCF יציב 10 שנים. השוק מתעלם ממנה כי אין \'סיפור צמיחה\'. ROIC 18% עקבי, רכישה עצמית של 3% מהמניות בשנה, ומשפחה מייסדת עם 45% אחזקה.",
        management: "משפחה מייסדת בדור שני. 45% אחזקה. משכורות צנועות. רוכשים מניות עצמית בעקביות.",
        moat: "מותגים מוכרים בישראל (30+ שנה), נתח מדף קבוע ברשתות, עלות מעבר צרכנית (הרגל).",
        events: "שום דבר מרגש. רכישה עצמית שקטה. אנליסטים לא מכסים — \'לא מעניין\'. מחזור מסחר נמוך.",
        metrics: {
            basic: [
                { name: "P/E", value: "6" },
                { name: "ROE", value: "20%" },
                { name: "תשואת דיבידנד", value: "7%" }
            ],
            advanced: [
                { name: "ROIC", value: "18% (יציב 10 שנים)" },
                { name: "FCF (מיליון ₪)", value: "55" },
                { name: "רכישה עצמית", value: "3% מהמניות/שנה" }
            ]
        },
        historicalData: [
            { year: "year-4", revenue: 410, fcf: 50 },
            { year: "year-3", revenue: 420, fcf: 52 },
            { year: "year-2", revenue: 415, fcf: 48 },
            { year: "year-1", revenue: 425, fcf: 54 },
            { year: "year-0", revenue: 430, fcf: 55 }
        ],
        projectedData: [
            { year: "year+1", revenue: 435, fcf: 56 },
            { year: "year+2", revenue: 440, fcf: 57 }
        ],
        correctDecision: "buy",
        pointValue: 200,
        hints: [{ cost: 0.5, text: "ROIC 18% עקבי 10 שנים, רכישה עצמית 3% בשנה, משפחה עם 45% — נראה לכם כמו מלכודת?" }],
        feedback: {
            principle: { id: "value-trap", name: "מלכודת ערך" },
            decisiveSignals: ["ROIC 18% יציב 10 שנים", "רכישה עצמית 3%/שנה = הנהלה מאמינה", "FCF יציב ויחס חלוקה סביר"],
            correctExplanation: "מצוין! זו לא מלכודת ערך — זו השקעת ערך קלאסית. ROIC 18% עקבי, רכישה עצמית (=הנהלה מאמינה שהמניה זולה), FCF יציב, ומשפחה עם skin in the game. השוק מתעלם כי אין \'סיפור\' — וזה בדיוק מה שיוצר את ההזדמנות.",
            incorrectExplanation: "טעות! P/E 6 + דיבידנד 7% + \'אין צמיחה\' הזכיר לך מלכודות ערך קודמות. אבל ההבדל: ROIC 18% עקבי, FCF יציב, ורכישה עצמית. מלכודת ערך = עסק שמתדרדר. כאן העסק מצוין — רק לא מרגש.",
            counterSignalExplanation: "הצד השני יטען: צמיחה אפסית, שום מנוע צמיחה חדש, מחזור מסחר נמוך (קשה למכור), ואנליסטים לא מכסים = אולי יש סיבה שהשוק מתעלם."
        },
        workedExample: "1) P/E 6, דיבידנד 7% — מלכודת ערך? נבדוק. 2) ROIC 18% × 10 שנים = עקביות יוצאת דופן. מלכודת ערך = ROIC יורד. כאן הוא יציב. 3) FCF: ₪48-55M, יציב = העסק מייצר מזומן אמיתי. 4) רכישה עצמית 3%/שנה = ההנהלה חושבת שהמניה זולה. 5) משפחה 45% = skin in the game. 6) למה זול? אין \'סיפור\', אין אנליסטים, אין מחזור. 7) מסקנה: ערך אמיתי שהשוק מתעלם ממנו — קנייה.",
        reasoningOptions: [
            { text: "ROIC 18% יציב 10 שנים = עסק איכותי, לא מלכודת", correct: true },
            { text: "רכישה עצמית 3%/שנה = ההנהלה מאמינה שהמניה זולה", correct: true },
            { text: "P/E 6 + אין צמיחה = מלכודת ערך קלאסית", correct: false, biasTag: "זיהוי דפוס שגוי" },
            { text: "אנליסטים לא מכסים = מידע חסר = סיכון", correct: false, biasTag: "הטיית עדר" },
            { text: "FCF יציב + יחס חלוקה סביר = דיבידנד בר-קיימא", correct: true },
            { text: "מחזור מסחר נמוך = לא נוכל למכור כשנרצה", correct: false, biasTag: "פרמיית נזילות מוגזמת" }
        ],
        isGoodValue: true,
        difficulty: "hard",
        difficultyValue: 3,
        hint: "ROIC 18% עקבי 10 שנים, רכישה עצמית 3% בשנה, משפחה עם 45% — נראה לכם כמו מלכודת?"
    },

    // ── LEVERAGE RISK (Hard, Pass — hidden leverage) ─────────────────────
    {
        id: "hidden-leverage-h01",
        name: "נדל\"ן גלובל ישראל בע\"מ",
        sector: "נדל\"ן",
        symbol: "NDLG",
        price: 180.00,
        tier: 3,
        chartType: "none",
        description: "חברת נדל\"ן שנראית בריאה: P/E 9, ROE 22%, דיבידנד 5%. אבל ה-ROE הגבוה מגיע ממינוף קיצוני. חוב/הון 3.5, רוב החוב בריבית משתנה, ו-30% מהנכסים ממומנים באגרות חוב שעומדות למיחזור בעוד 14 חודשים בסביבת ריבית גבוהה יותר.",
        management: "מנכ\"ל שמגיע מעולם המימון — מתמקד במנוף, לא בנכסים. \'עוד מנוף = עוד תשואה\'.",
        moat: "פורטפוליו נכסים סביר, אבל לא יוצא דופן. תפוסה 88% — ממוצעת.",
        events: "אג\"ח ₪400M עומדות למיחזור בעוד 14 חודשים. הריבית עלתה 200bp מאז ההנפקה.",
        metrics: {
            basic: [
                { name: "P/E", value: "9" },
                { name: "ROE", value: "22%" },
                { name: "תשואת דיבידנד", value: "5%" }
            ],
            advanced: [
                { name: "ROIC", value: "6%" },
                { name: "חוב/הון", value: "3.5" },
                { name: "ריבית על חוב", value: "65% משתנה" }
            ]
        },
        historicalData: [
            { year: "year-4", revenue: 280, fcf: 35 },
            { year: "year-3", revenue: 310, fcf: 40 },
            { year: "year-2", revenue: 340, fcf: 45 },
            { year: "year-1", revenue: 365, fcf: 42 },
            { year: "year-0", revenue: 380, fcf: 38 }
        ],
        projectedData: [
            { year: "year+1", revenue: 390, fcf: 25 },
            { year: "year+2", revenue: 395, fcf: 15 }
        ],
        correctDecision: "pass",
        pointValue: 200,
        // FCF BREAKER: FCF positive, but cliff ahead
        hints: [{ cost: 0.5, text: "ROE 22% אבל ROIC רק 6%. מה מסביר את הפער? (רמז: מינוף)" }],
        feedback: {
            principle: { id: "leverage-risk", name: "סיכון מינוף" },
            decisiveSignals: ["חוב/הון 3.5 = מינוף קיצוני", "65% ריבית משתנה", "מיחזור ₪400M ב-14 חודשים"],
            correctExplanation: "נכון! ROE 22% מול ROIC 6% = כל ה-\'תשואה\' מגיעה ממינוף, לא מאיכות העסק. חוב/הון 3.5 עם 65% ריבית משתנה ומיחזור קרוב = פצצה מתקתקת. כשהריבית עולה, ה-FCF יקרוס.",
            incorrectExplanation: "טעות! P/E 9, ROE 22%, דיבידנד 5% — מושלם על הנייר. אבל ROE ≠ ROIC. כשיש מנוף 3.5x, ה-ROE מנופח. ROIC 6% = התשואה \'האמיתית\' על הנכסים עלובה.",
            counterSignalExplanation: "הצד השני יטען: P/E 9 זול, הכנסות גדלות, דיבידנד 5% מושך. מינוף בנדל\"ן הוא נורמלי, וההנהלה מנוסה בניהול חוב."
        },
        workedExample: "1) ROE 22% — מרשים! 2) אבל ROIC 6% — למה הפער? כי ROE = ROIC × מנוף. 22% = 6% × 3.5 + אפקט ריבית. 3) חוב/הון 3.5 = על כל ₪1 הון, יש ₪3.5 חוב. 4) 65% ריבית משתנה = כשהריבית עולה, ההוצאות קופצות. 5) מיחזור ₪400M ב-14 חודשים = ריבית חדשה גבוהה ב-200bp = ₪8M הוצאות ריבית נוספות. 6) FCF: ₪38M → כ-₪15M אחרי מיחזור. 7) מסקנה: ROE מנופח, סיכון ריבית גבוה — העל.",
        reasoningOptions: [
            { text: "ROE 22% מול ROIC 6% = כל התשואה ממנוף, לא מאיכות", correct: true },
            { text: "מיחזור ₪400M בריבית גבוהה יותר = FCF ייחתך", correct: true },
            { text: "P/E 9 = זול לנדל\"ן", correct: false, biasTag: "עיגון על מכפיל" },
            { text: "ROE 22% = תשואה מעולה על ההון", correct: false, biasTag: "בלבול ROE/ROIC" },
            { text: "65% ריבית משתנה = חשיפה מסוכנת לעליית ריבית", correct: true },
            { text: "הכנסות גדלות = העסק מתרחב", correct: false, biasTag: "התעלמות ממבנה המימון" }
        ],
        isGoodValue: false,
        difficulty: "hard",
        difficultyValue: 3,
        hint: "ROE 22% אבל ROIC רק 6%. מה מסביר את הפער?"
    },

    // ── OWNER EARNINGS (Hard, Buy — hidden value) ───────────────────────
    {
        id: "hidden-earnings-h01",
        name: "תשתיות אילת בע\"מ",
        sector: "תשתיות",
        symbol: "TSHT",
        price: 55.00,
        tier: 3,
        chartType: "annual",
        description: "חברת תשתיות עם הפסד חשבונאי שנה שנייה ברציפות. המניה ירדה 35%. אבל: ההפסד כולו מפחת מואץ על פרויקט חדש שהושלם. FCF חיובי ועולה. ביטול הפחת מראה ROIC של 14%.",
        management: "מהנדסת שמנהלת עם חשיבת בעלים. מחזיקה 10% מהמניות. תגמול מבוסס FCF, לא רווח חשבונאי.",
        moat: "חוזים ממשלתיים ל-15 שנה. זיכיון בלעדי באזור. מתחרים צריכים 5+ שנים לקבל רישיון.",
        events: "פרויקט חדש הושלם — יחל להניב הכנסות מלאות מ-year+1. המניה ירדה 35% בגלל \'הפסד\'.",
        metrics: {
            basic: [
                { name: "P/E (מדווח)", value: "שלילי" },
                { name: "P/E (על רווחי בעלים)", value: "8" },
                { name: "ROE (מדווח)", value: "-3%" }
            ],
            advanced: [
                { name: "ROIC (מנורמל)", value: "14%" },
                { name: "FCF (מיליון ₪)", value: "42" },
                { name: "פחת מואץ > תחזוקה", value: "פי 3" }
            ]
        },
        historicalData: [
            { year: "year-4", revenue: 160, fcf: 28 },
            { year: "year-3", revenue: 170, fcf: 30 },
            { year: "year-2", revenue: 180, fcf: 25 },
            { year: "year-1", revenue: 200, fcf: 35 },
            { year: "year-0", revenue: 220, fcf: 42 }
        ],
        projectedData: [
            { year: "year+1", revenue: 260, fcf: 55 },
            { year: "year+2", revenue: 280, fcf: 62 }
        ],
        correctDecision: "buy",
        pointValue: 200,
        hints: [{ cost: 0.5, text: "P/E שלילי אבל FCF ₪42M? מה קורה כש-FCF ורווח חשבונאי מספרים סיפורים שונים?" }],
        feedback: {
            principle: { id: "owner-earnings", name: "רווחי בעלים" },
            decisiveSignals: ["FCF ₪42M חיובי ועולה", "פחת מואץ פי 3 מתחזוקה = הפסד מלאכותי", "P/E על רווחי בעלים = 8"],
            correctExplanation: "מצוין! ההפסד החשבונאי אינו אמיתי — הפחת המואץ על הפרויקט החדש מעוות את הרווח. FCF מגלה את האמת: ₪42M ועולה. זו בדיוק הסיטואציה שבאפט מחפש — שוק שמפחד ממספר חשבונאי ומתעלם מהתזרים.",
            incorrectExplanation: "טעות! P/E שלילי ו-\'הפסד שנה שנייה\' הפחידו אותך — ואת השוק. אבל FCF ₪42M אומר שהעסק מרוויח. הפחת הכבד הוא רישום חשבונאי, לא תזרים מזומן שיצא.",
            counterSignalExplanation: "הצד השני יטען: שנתיים הפסד = אולי יש בעיה אמיתית. פחת מואץ קיים מסיבה — הנכסים מתבלים. ומי אומר שה-FCF ימשיך לעלות?"
        },
        workedExample: "1) P/E שלילי — מפחיד. 2) אבל FCF ₪42M ועולה = העסק מרוויח מזומן. 3) ההפרש: פחת מואץ פי 3 מתחזוקה = הפחתה חשבונאית אגרסיבית. 4) P/E על רווחי בעלים = 8 = זול. 5) חפיר: זיכיון ממשלתי 15 שנה = הכנסות מובטחות. 6) מנכ\"לית עם 10% + תגמול FCF = אינטרסים נכונים. 7) מסקנה: השוק טועה — רווחי בעלים חיוביים — קנייה.",
        reasoningOptions: [
            { text: "FCF ₪42M חיובי ועולה = העסק מרוויח למרות \'ההפסד\'", correct: true },
            { text: "פחת מואץ פי 3 מתחזוקה = הפסד חשבונאי מלאכותי", correct: true },
            { text: "P/E שלילי שנתיים = חברה בבעיה", correct: false, biasTag: "עיגון על רווח חשבונאי" },
            { text: "המניה ירדה 35% = השוק יודע משהו", correct: false, biasTag: "הטיית עדר" },
            { text: "זיכיון ממשלתי 15 שנה = הכנסות מובטחות", correct: true },
            { text: "פרויקט חדש שיניב הכנסות מלאות מ-year+1 = FCF יעלה עוד", correct: true }
        ],
        isGoodValue: true,
        difficulty: "hard",
        difficultyValue: 3,
        hint: "P/E שלילי אבל FCF ₪42M? מה קורה כש-FCF ורווח חשבונאי מספרים סיפורים שונים?"
    },

    // ── MARGIN OF SAFETY (Hard, Buy — contrarian buy) ───────────────────
    {
        id: "margin-contrarian-h01",
        name: "ביטוח הדרום בע\"מ",
        sector: "ביטוח",
        symbol: "BTDR",
        price: 72.00,
        tier: 3,
        chartType: "annual",
        description: "חברת ביטוח שהמניה ירדה 40% אחרי אירוע חד-פעמי: שריפה גדולה שעלתה ₪80M. המחיר מתמחר כאילו שריפות כאלה קורות כל שנה. בפועל, הביצועים \'הנורמליים\' מעולים: ROIC 15%, FCF יציב, ויחס חלוקה 40%.",
        management: "מנכ\"ל ותיק שמנהל מדיניות ביטוח-משנה שמרנית. לא הפתעות מיחזור.",
        moat: "מותג מוביל בביטוח עסקי בדרום. שיעור חידוש 85%. התמחות בביטוח חקלאי.",
        events: "שריפה חד-פעמית = ₪80M הפסד. מניה ירדה 40%. אנליסטים הורידו \'מכירה\'.",
        metrics: {
            basic: [
                { name: "P/E (נוכחי, כולל חד-פעמי)", value: "25" },
                { name: "P/E (מנורמל)", value: "7" },
                { name: "ROE", value: "14%" }
            ],
            advanced: [
                { name: "ROIC (מנורמל)", value: "15%" },
                { name: "FCF מנורמל (מיליון ₪)", value: "65" },
                { name: "רכישה עצמית", value: "₪15M (החלה אחרי הירידה)" }
            ]
        },
        historicalData: [
            { year: "year-4", revenue: 450, fcf: 58 },
            { year: "year-3", revenue: 470, fcf: 62 },
            { year: "year-2", revenue: 490, fcf: 65 },
            { year: "year-1", revenue: 510, fcf: 68 },
            { year: "year-0", revenue: 520, fcf: -12 }
        ],
        projectedData: [
            { year: "year+1", revenue: 540, fcf: 70 },
            { year: "year+2", revenue: 560, fcf: 75 }
        ],
        correctDecision: "buy",
        pointValue: 200,
        hints: [{ cost: 0.5, text: "FCF שלילי ב-year-0, אבל 4 שנים לפניו היה חיובי ועולה. מה גרם לשינוי?" }],
        feedback: {
            principle: { id: "margin-of-safety", name: "מרווח ביטחון" },
            decisiveSignals: ["P/E מנורמל 7 = זול מאוד", "אירוע חד-פעמי, לא מבני", "רכישה עצמית = ההנהלה חושבת שזול"],
            correctExplanation: "מצוין! השוק הגיב בפאניקה לאירוע חד-פעמי וירד 40%. P/E 25 כולל את השריפה — P/E מנורמל 7 = זול בטירוף. זה בדיוק מרווח ביטחון — קניית עסק טוב אחרי אירוע שעושה אותו זול זמנית.",
            incorrectExplanation: "טעות! FCF שלילי ב-year-0 הפחיד, אבל הסתכלו על 4 השנים לפני — ₪58-68M יציב. השריפה חד-פעמית. ירידה 40% יצרה מרווח ביטחון עצום.",
            counterSignalExplanation: "הצד השני יטען: מי מבטיח שלא תהיה שריפה נוספת? ביטוח חקלאי חשוף לאירועי טבע. P/E 25 (נוכחי) יקר. וירידה של 40% אולי מתמחרת סיכון אמיתי."
        },
        workedExample: "1) מניה ירדה 40% — למה? שריפה ₪80M. 2) שאלה: האם זה מבני או חד-פעמי? 3) בדיקה: 4 שנים של FCF ₪58-68M → ₪-12M → תחזית ₪70M. = חד-פעמי. 4) P/E מנורמל 7 = השוק מתמחר כאילו השריפה קבועה. 5) רכישה עצמית ₪15M = ההנהלה מסכימה שזול. 6) ROIC 15% עקבי = עסק איכותי. 7) מסקנה: אירוע חד-פעמי יצר מרווח ביטחון — קנייה.",
        reasoningOptions: [
            { text: "P/E מנורמל 7 אחרי אירוע חד-פעמי = מרווח ביטחון גדול", correct: true },
            { text: "רכישה עצמית אחרי הירידה = הנהלה מאמינה שהמניה זולה", correct: true },
            { text: "FCF שלילי ב-year-0 = העסק נפגע", correct: false, biasTag: "הטיית עדכניות" },
            { text: "אנליסטים \'מכירה\' = הם מנתחים לעומק", correct: false, biasTag: "הטיית סמכות" },
            { text: "ROIC 15% עקבי 4 שנים = עסק איכותי שנפגע זמנית", correct: true },
            { text: "ביטוח חקלאי = סיכון אירועי טבע חוזר", correct: false, biasTag: "הכללת יתר מאירוע בודד" }
        ],
        isGoodValue: true,
        difficulty: "hard",
        difficultyValue: 3,
        hint: "FCF שלילי ב-year-0, אבל 4 שנים לפניו היה חיובי ועולה. מה גרם לשינוי?"
    },

    // ── GROWTH TRAP (Hard, Pass — SaaS-like growth without substance) ────
    {
        id: "growth-vanity-h01",
        name: "קלאוד-מקס שירותים בע\"מ",
        sector: "שירותי IT",
        symbol: "CLDM",
        price: 240.00,
        tier: 3,
        chartType: "quarterly",
        description: "חברת שירותי IT שמדווחת צמיחה של 45%, אבל: 80% מהצמיחה מגיעה מרכישות (לא אורגנית), ה-FCF שלילי כבר 3 שנים, ההנהלה מדללת 10% בשנה, ו-ROIC ירד מ-15% ל-6% ככל שהרכישות הזולות נגמרו.",
        management: "מנכ\"ל שרודף צמיחה ומדבר רק על \'גודל\' ו\'סקייל\'. תגמול מבוסס הכנסות, לא רווח.",
        moat: "אין — שירותי IT הם תחרותיים מאוד. כל \'חפיר\' נקנה ביוקר.",
        events: "רכישה נוספת ב-₪150M (פי 8 הכנסות היעד). דילול 10% ב-year-0. ROIC ירד שוב.",
        metrics: {
            basic: [
                { name: "P/E", value: "65" },
                { name: "PEG", value: "1.4" },
                { name: "צמיחת הכנסות", value: "45%" }
            ],
            advanced: [
                { name: "צמיחה אורגנית", value: "9% בלבד" },
                { name: "ROIC", value: "6% (ירד מ-15%)" },
                { name: "FCF (מיליון ₪)", value: "-25" }
            ]
        },
        quarterlyData: [
            { quarter: "Q1 year-1", revenue: 65, fcf: -4 },
            { quarter: "Q2 year-1", revenue: 72, fcf: -5 },
            { quarter: "Q3 year-1", revenue: 85, fcf: -6 },
            { quarter: "Q4 year-1", revenue: 95, fcf: -8 },
            { quarter: "Q1 year-0", revenue: 98, fcf: -7 },
            { quarter: "Q2 year-0", revenue: 102, fcf: -5 }
        ],
        projectedData: [
            { year: "year+1", revenue: 520, fcf: -30 },
            { year: "year+2", revenue: 600, fcf: -35 }
        ],
        correctDecision: "pass",
        pointValue: 200,
        hints: [{ cost: 0.5, text: "צמיחה 45%, אבל צמיחה אורגנית רק 9%. מי \'גדל\' באמת?" }],
        feedback: {
            principle: { id: "growth-trap", name: "מלכודת צמיחה" },
            decisiveSignals: ["צמיחה אורגנית 9% בלבד (מתוך 45%)", "ROIC ירד מ-15% ל-6%", "דילול 10% בשנה"],
            correctExplanation: "נכון! 45% צמיחה נשמע מרשים, אבל 80% מגיע מרכישות. צמיחה אורגנית רק 9% = העסק הבסיסי גדל לאט. ROIC 15% → 6% = כל רכישה מדללת את האיכות. PEG 1.4 נראה סביר, אבל הוא מחושב על צמיחה לא-אורגנית.",
            incorrectExplanation: "טעות! PEG 1.4 מפתה, אבל PEG עובד רק על צמיחה אורגנית. 45% צמיחה שמורכבת מרכישות = לא בת-קיימא. ו-ROIC שיורד כל שנה = הרכישות הורסות ערך.",
            counterSignalExplanation: "הצד השני יטען: PEG 1.4 = מחיר סביר לצמיחה. סקייל בשירותי IT יוצר יתרון תחרותי. הרכישות בונות בסיס לקוחות שייצר הכנסות חוזרות."
        },
        workedExample: "1) צמיחה 45% — מרשים! 2) אבל: צמיחה אורגנית = 9%. השאר = רכישות. 3) ROIC: 15% → 6% = כל רכישה מוסיפה הכנסות אבל לא רווח. 4) FCF: שלילי 3 שנים = הרכישות עולות יותר ממה שהן מניבות. 5) דילול 10%/שנה = מנפיקים מניות כדי לממן. 6) תגמול: מנכ\"ל מתוגמל על הכנסות = ימשיך לרכוש. 7) מסקנה: צמיחה \'קנויה\' שהורסת ערך — העל.",
        reasoningOptions: [
            { text: "צמיחה אורגנית 9% בלבד = הצמיחה \'האמיתית\' צנועה", correct: true },
            { text: "ROIC 15% → 6% = הרכישות הורסות ערך", correct: true },
            { text: "PEG 1.4 = מחיר סביר לצמיחה", correct: false, biasTag: "שימוש ב-PEG על צמיחה לא-אורגנית" },
            { text: "45% צמיחה = חברה בהתרחבות מסיבית", correct: false, biasTag: "בלבול צמיחה אורגנית/רכישות" },
            { text: "דילול 10% + FCF שלילי = בעלי מניות משלמים על הצמיחה", correct: true },
            { text: "סקייל ב-IT = יתרון תחרותי לטווח ארוך", correct: false, biasTag: "הנחת סקייל ללא הוכחה" }
        ],
        isGoodValue: false,
        difficulty: "hard",
        difficultyValue: 3,
        hint: "צמיחה 45%, אבל צמיחה אורגנית רק 9%. מי \'גדל\' באמת?"
    },

    // ── BUYBACK (Hard, Buy — shareholder-friendly) ──────────────────────
    {
        id: "buyback-king-h01",
        name: "מנועי ישראל בע\"מ",
        sector: "תעשייה",
        symbol: "MNOI",
        price: 88.00,
        tier: 3,
        chartType: "annual",
        description: "יצרנית מנועים תעשייתיים שנראית \'דשדוש\' — הכנסות צומחות רק 2% בשנה. אבל: רוכשת 5% מהמניות כל שנה כבר 6 שנים. FCF למניה עלה 45% בתקופה, גם ללא צמיחת הכנסות. ROIC 19% עקבי.",
        management: "מנכ\"ל עם 12% אחזקה. מעדיף רכישה עצמית על פני רכישות. \'אנחנו לא צריכים לצמוח — צריכים להתייעל.\'",
        moat: "מוצרים מותאמים אישית ללקוחות תעשייתיים. עלות מעבר גבוהה. שיעור חידוש 92%.",
        events: "הכריזה על תוכנית רכישה עצמית נוספת של ₪50M. אנליסטים: \'אין צמיחה = מכירה\'.",
        metrics: {
            basic: [
                { name: "P/E", value: "11" },
                { name: "ROE", value: "19%" },
                { name: "צמיחת הכנסות", value: "+2%" }
            ],
            advanced: [
                { name: "ROIC", value: "19% (יציב 6 שנים)" },
                { name: "FCF למניה (צמיחה 6 שנים)", value: "+45%" },
                { name: "רכישה עצמית", value: "5%/שנה × 6 שנים" }
            ]
        },
        historicalData: [
            { year: "year-4", revenue: 350, fcf: 58 },
            { year: "year-3", revenue: 355, fcf: 60 },
            { year: "year-2", revenue: 360, fcf: 55 },
            { year: "year-1", revenue: 368, fcf: 62 },
            { year: "year-0", revenue: 375, fcf: 64 }
        ],
        projectedData: [
            { year: "year+1", revenue: 382, fcf: 66 },
            { year: "year+2", revenue: 390, fcf: 68 }
        ],
        correctDecision: "buy",
        pointValue: 200,
        hints: [{ cost: 0.5, text: "ההכנסות גדלו 2%, אבל FCF למניה גדל 45%. איך זה אפשרי?" }],
        feedback: {
            principle: { id: "owner-earnings", name: "רווחי בעלים" },
            decisiveSignals: ["רכישה עצמית 5%/שנה × 6 = FCF למניה +45%", "ROIC 19% עקבי", "P/E 11 על עסק איכותי"],
            correctExplanation: "מצוין! רכישה עצמית היא \'צמיחה שקטה\'. FCF סך הכל עלה 10%, אבל FCF למניה עלה 45% כי יש פחות מניות. P/E 11 על עסק עם ROIC 19% ורכישה של 5%/שנה = זול. הכנסות 2% + רכישה 5% = 7% תשואה שנתית \'אוטומטית\'.",
            incorrectExplanation: "טעות! \'אין צמיחה\' הוא מסנן גס. FCF למניה עלה 45% דרך רכישה עצמית — זה \'צמיחה\' לכל דבר, רק שהיא מגיעה מהקטנת המכנה ולא מהגדלת המונה.",
            counterSignalExplanation: "הצד השני יטען: 2% צמיחה = חברה שלא גדלה. אנליסטים \'מכירה\'. רכישה עצמית טובה רק כשהמניה באמת זולה — מי אומר שהיא זולה?"
        },
        workedExample: "1) צמיחה 2% — \'משעמם\'. 2) אבל רכישה עצמית 5%/שנה × 6 שנים = הקטנת מניות ב-26%. 3) FCF למניה: +45% (FCF +10% ÷ 74% מניות). 4) ROIC 19% = העסק עצמו איכותי. 5) שיעור חידוש 92% = הכנסות צפויות. 6) P/E 11 = זול לעסק ב-ROIC 19%. 7) \'תשואה שקטה\': דיבידנד + רכישה + צמיחה = ~10%/שנה. 8) מסקנה: קנייה.",
        reasoningOptions: [
            { text: "FCF למניה +45% דרך רכישה עצמית = צמיחה אמיתית", correct: true },
            { text: "ROIC 19% יציב + P/E 11 = עסק איכותי במחיר זול", correct: true },
            { text: "צמיחה 2% = חברה שלא מתפתחת", correct: false, biasTag: "הטיית צמיחה בלבד" },
            { text: "אנליסטים \'מכירה\' = הם רואים משהו", correct: false, biasTag: "הטיית סמכות" },
            { text: "רכישה עצמית ב-P/E 11 = החברה קונה את עצמה בזול", correct: true },
            { text: "שיעור חידוש 92% = הכנסות עקביות", correct: true }
        ],
        isGoodValue: true,
        difficulty: "hard",
        difficultyValue: 3,
        hint: "ההכנסות גדלו 2%, אבל FCF למניה גדל 45%. איך זה אפשרי?"
    },

    // ── CIRCLE OF COMPETENCE + TOO HARD (Hard, Pass) ────────────────────
    {
        id: "crypto-adjacent-h01",
        name: "בלוקצ\'יין ישראל בע\"מ",
        sector: "פינטק / קריפטו",
        symbol: "BLKC",
        price: 420.00,
        tier: 3,
        chartType: "quarterly",
        description: "חברה שמפתחת תשתית בלוקצ\'יין לבנקים. ההכנסות צמחו פי 5 בשנתיים. P/E 80 (PEG 1.0 כביכול). אבל: 60% מההכנסות הן \'עמלות על נפח מסחר\' שתלויות בתנודתיות קריפטו. כש-BTC ירד, ההכנסות קרסו.",
        management: "מייסדים צעירים עם רקע טכנולוגי מרשים. אין ניסיון בניהול חברה ציבורית.",
        moat: "טכנולוגיה מתקדמת, אבל 10+ מתחרים עם מוצר דומה. שום לקוח מחויב.",
        events: "שותפות \'אסטרטגית\' עם בנק (POC קטן, לא חוזה). הכנסות ברבעון האחרון ירדו 35%.",
        metrics: {
            basic: [
                { name: "P/E", value: "80" },
                { name: "PEG (על צמיחה היסטורית)", value: "1.0" },
                { name: "ROE", value: "25%" }
            ],
            advanced: [
                { name: "ROIC", value: "12%" },
                { name: "FCF (מיליון ₪)", value: "15" },
                { name: "הכנסות תלויות-נפח", value: "60%" }
            ]
        },
        quarterlyData: [
            { quarter: "Q1 year-1", revenue: 35, fcf: 5 },
            { quarter: "Q2 year-1", revenue: 55, fcf: 12 },
            { quarter: "Q3 year-1", revenue: 48, fcf: 8 },
            { quarter: "Q4 year-1", revenue: 72, fcf: 18 },
            { quarter: "Q1 year-0", revenue: 65, fcf: 10 },
            { quarter: "Q2 year-0", revenue: 42, fcf: 3 }
        ],
        projectedData: [
            { year: "year+1", revenue: 220, fcf: 20 },
            { year: "year+2", revenue: 180, fcf: 8 }
        ],
        correctDecision: "pass",
        pointValue: 200,
        hints: [{ cost: 0.5, text: "PEG 1.0 מבוסס על צמיחה היסטורית. אבל ₪72M → ₪42M ברבעון אחד — מה קורה לצמיחה?" }],
        feedback: {
            principle: { id: "circle-of-competence", name: "מעגל כשירות" },
            decisiveSignals: ["60% הכנסות תלויות-נפח = לא ניתנות לחיזוי", "PEG על צמיחה לא-חוזרת = מטעה", "הכנסות ירדו 35% ברבעון"],
            correctExplanation: "נכון! שני דגלים: (1) מעגל כשירות — הכנסות שתלויות בנפח מסחר קריפטו לא ניתנות לחיזוי, אז PEG לא שווה כלום. (2) קשה מדי — כל ניתוח שנעשה בשוק עם תנודתיות כזו הוא ניחוש.",
            incorrectExplanation: "טעות! PEG 1.0 הפתה אותך, אבל הוא מחושב על צמיחה ש-60% ממנה תלויה בתנודתיות קריפטו. הרבעון האחרון (-35%) מראה מה קורה כשהנפח יורד.",
            counterSignalExplanation: "הצד השני יטען: PEG 1.0 = מחיר הוגן לצמיחה. תשתית בלוקצ\'יין לבנקים = העתיד. שותפות עם בנק = validation. מייסדים מרשימים."
        },
        workedExample: "1) PEG 1.0 — נראה סביר. 2) אבל: הצמיחה היסטורית = תלויית נפח קריפטו (60%). 3) ברבעון האחרון: ₪72M → ₪42M (-35%) = הנפח ירד. 4) PEG \'אמיתי\': אם הצמיחה חוזרת ל-0%? P/E 80 / 0% = אינסוף. 5) שאלה: האם אני מבין מתי נפח קריפטו יעלה? לא. 6) \'שותפות\' = POC, לא חוזה. 7) מסקנה: לא ניתן לחיזוי + מחוץ למעגל כשירות — העל.",
        reasoningOptions: [
            { text: "60% הכנסות תלויות בנפח קריפטו = לא ניתן לחזות FCF", correct: true },
            { text: "PEG 1.0 על צמיחה לא-חוזרת = מטעה", correct: true },
            { text: "PEG 1.0 = מחיר הוגן ביחס לצמיחה", correct: false, biasTag: "שימוש ב-PEG על נתון לא-יציב" },
            { text: "בלוקצ\'יין = העתיד, שווה להשקיע מוקדם", correct: false, biasTag: "הטיית חדשנות" },
            { text: "ירידה של 35% ברבעון מראה את הרגישות לנפח", correct: true },
            { text: "שותפות עם בנק = validation מסחרי", correct: false, biasTag: "הערכת יתר של POC" }
        ],
        isGoodValue: false,
        difficulty: "hard",
        difficultyValue: 3,
        hint: "PEG 1.0 מבוסס על צמיחה היסטורית. אבל ₪72M → ₪42M ברבעון אחד — מה קורה לצמיחה?"
    }
];


// ============================================================================
// SECTION 2: EXPERT TIER (tier 4) — 6 more companies
// Full expert features: reasoning, sellTriggers, dueDiligence
// ============================================================================

const EXPERT_COMPANIES_BATCH2 = [

    // ── TURNAROUND (Expert, Buy — complex multi-year) ───────────────────
    {
        id: "turnaround-expert-x01",
        name: "אופק תקשורת בע\"מ",
        sector: "תקשורת / מדיה",
        symbol: "OFKT",
        price: 18.00,
        tier: 4,
        chartType: "segments",
        description: "חברת מדיה שהייתה גוססת: הכנסות ירדו 50% ב-4 שנים, החוב חנק אותה, והמניה ירדה 80%. מנכ\"לית חדשה מונתה לפני 30 חודשים ועשתה: (1) ארגון מחדש של החוב (הפחיתה ריבית 40%), (2) סגירת 3 חטיבות הפסדיות, (3) פיבוט לדיגיטל שעכשיו מהווה 35% מההכנסות עם מרווח 25%. FCF הפך חיובי ברבעון האחרון.",
        management: "מנכ\"לית עם רקורד שיקום (שיקמה חברת קמעונאות בעבר). קנתה 4% מהמניות מכספה. תגמול 80% מבוסס FCF.",
        moat: "אין חפיר מובהק עדיין, אבל הסגמנט הדיגיטלי בונה lock-in.",
        events: "FCF חיובי לראשונה ברבעון. חוזה חדש עם פלטפורמה בינלאומית. 2 אנליסטים החלו כיסוי.",
        metrics: {
            basic: [
                { name: "P/E", value: "שלילי (עדיין על בסיס שנתי)" },
                { name: "P/E על FCF מנורמל", value: "12" },
                { name: "ROE", value: "-2% (משתפר)" }
            ],
            advanced: [
                { name: "ROIC (סגמנט דיגיטלי)", value: "22%" },
                { name: "FCF (רבעוני אחרון)", value: "+₪3M" },
                { name: "חוב/הון (אחרי ארגון מחדש)", value: "1.2 (ירד מ-3.5)" }
            ]
        },
        segmentData: [
            { name: "דיגיטלי (חדש)", revenue: 42, margin: "25%", growth: "+55%" },
            { name: "שידור מסורתי", revenue: 55, margin: "8%", growth: "-10%" },
            { name: "שירותי תוכן", revenue: 23, margin: "15%", growth: "+5%" }
        ],
        projectedData: [
            { year: "year+1", revenue: 135, fcf: 15 },
            { year: "year+2", revenue: 155, fcf: 28 }
        ],
        correctDecision: "buy",
        pointValue: 300,
        hints: [{ cost: 0.5, text: "הסגמנט הדיגיטלי צומח 55% עם מרווח 25%. אם הוא יגיע ל-60% מההכנסות, מה ה-P/E?" }],
        feedback: {
            principle: { id: "turnaround", name: "שיקום" },
            decisiveSignals: ["FCF חיובי לראשונה", "סגמנט דיגיטלי: ROIC 22%, +55% צמיחה", "מנכ\"לית עם 4% + רקורד"],
            correctExplanation: "מצוין! שיקום אמיתי — כל התנאים מתקיימים: (1) הנהלה חדשה עם רקורד + skin in the game, (2) פעולות מובנות (ארגון חוב, סגירת הפסדיים, פיבוט), (3) תוצאות: FCF חיובי, סגמנט חדש רווחי. P/E על FCF מנורמל 12 = זול לסיפור שיקום.",
            incorrectExplanation: "טעות! P/E שלילי, חוב גבוה, הכנסות ירדו 50% — כל זה מהעבר. ההווה שונה: FCF חיובי, סגמנט דיגיטלי +55%, חוב ירד מ-3.5 ל-1.2. שיקום אמיתי — לא סיפור.",
            counterSignalExplanation: "הצד השני יטען: עדיין P/E שלילי שנתי, חוב/הון 1.2 גבוה, רבעון אחד חיובי לא מגמה, ומדיה מסורתית ממשיכה לדעוך."
        },
        workedExample: "1) עבר: הכנסות -50%, חוב 3.5, מניה -80% = גוססת. 2) הנהלה חדשה: רקורד + 4% + תגמול FCF = כל הסימנים הנכונים. 3) פעולות: ארגון חוב (1.2 מ-3.5), סגירת הפסדיים, פיבוט דיגיטלי. 4) תוצאות: FCF חיובי ברבעון, דיגיטלי 35% הכנסות עם ROIC 22%. 5) תמחור: P/E 12 על FCF מנורמל. 6) הסיכון: רבעון 1 בלבד, חוב עדיין 1.2. 7) מסקנה: שיקום אמיתי בשלב מוקדם — קנייה.",
        reasoningOptions: [
            { text: "FCF חיובי + סגמנט דיגיטלי ROIC 22% = שיקום אמיתי", correct: true },
            { text: "מנכ\"לית עם רקורד + 4% אחזקה + תגמול FCF = מחויבות", correct: true },
            { text: "P/E שלילי שנתי = החברה עדיין מפסידה", correct: false, biasTag: "עיגון על נתון מיושן" },
            { text: "חוב/הון 1.2 = עדיין מסוכן מדי", correct: false, biasTag: "הערכת יתר של סיכון יורד" },
            { text: "חוב ירד מ-3.5 ל-1.2 = שיפור דרמטי במבנה הון", correct: true },
            { text: "מדיה מסורתית מתה = החברה תלך", correct: false, biasTag: "התעלמות מהפיבוט" }
        ],
        sellTriggers: [
            "FCF חוזר לשלילי 2 רבעונים רצופים",
            "מנכ\"לית מוכרת מניות",
            "צמיחת הסגמנט הדיגיטלי מאטה מתחת ל-20%",
            "חוב/הון חוזר מעל 2.0"
        ],
        dueDiligence: [
            "לבדוק את תנאי ארגון החוב — האם יש covenants שמגבילים?",
            "לבדוק אם לקוחות הדיגיטלי חתומים על חוזים או month-to-month",
            "להשוות ROIC של הדיגיטלי למתחרים בסקטור"
        ],
        isGoodValue: true,
        difficulty: "expert",
        difficultyValue: 4,
        hint: "הסגמנט הדיגיטלי צומח 55% עם מרווח 25%. אם הוא יגיע ל-60% מההכנסות, מה ה-P/E?"
    },

    // ── DIVIDEND + LEVERAGE + CYCLICAL (Expert, Pass — three traps) ──────
    {
        id: "triple-trap-x01",
        name: "נדל\"ן מסחרי פלוס בע\"מ",
        sector: "נדל\"ן מסחרי",
        symbol: "NDLP",
        price: 65.00,
        tier: 4,
        chartType: "annual",
        description: "חברה שמשלבת שלוש מלכודות: (1) דיבידנד 9% שנראה מעולה — אבל יחס חלוקה 105% (מחלקת מעבר ל-FCF). (2) חוב/הון 4.0 עם 50% ריבית משתנה. (3) 45% מהשוכרים בענף שנמצא בשיא מחזורי. P/E 6 \'מציאה\' — על הנייר.",
        management: "מנכ\"ל שמסרב לחתוך דיבידנד כי \'זו ההבטחה לבעלי המניות\'. ללא אחזקת מניות.",
        moat: "מיקומים מרכזיים, אבל שוכרים מרוכזים ותלויי מחזור.",
        events: "קרן ריבית עלתה. שוכר עוגן (15% מההכנסות) הודיע על צמצום שטחים. יחס כיסוי ריבית 1.3x.",
        metrics: {
            basic: [
                { name: "P/E", value: "6" },
                { name: "ROE", value: "18% (ממונף)" },
                { name: "תשואת דיבידנד", value: "9%" }
            ],
            advanced: [
                { name: "ROIC", value: "4.5%" },
                { name: "יחס חלוקה", value: "105% (!)" },
                { name: "יחס כיסוי ריבית", value: "1.3x" }
            ]
        },
        historicalData: [
            { year: "year-4", revenue: 320, fcf: 42 },
            { year: "year-3", revenue: 340, fcf: 45 },
            { year: "year-2", revenue: 350, fcf: 43 },
            { year: "year-1", revenue: 355, fcf: 40 },
            { year: "year-0", revenue: 360, fcf: 38 }
        ],
        projectedData: [
            { year: "year+1", revenue: 340, fcf: 28 },
            { year: "year+2", revenue: 310, fcf: 15 }
        ],
        correctDecision: "pass",
        pointValue: 300,
        // FCF BREAKER: FCF positive today
        hints: [{ cost: 0.5, text: "יחס חלוקה 105% + יחס כיסוי 1.3x + חוב/הון 4.0 = כמה \'רשתות ביטחון\' יש כאן?" }],
        feedback: {
            principle: { id: "dividend-sustainability", name: "קיימות דיבידנד" },
            decisiveSignals: ["יחס חלוקה 105% = מחלקת מעבר ליכולת", "יחס כיסוי 1.3x = בול על הגבול", "3 סיכונים מצטברים"],
            correctExplanation: "נכון! שלוש מלכודות בחברה אחת: (1) דיבידנד לא בר-קיימא (105% יחס חלוקה). (2) מינוף קיצוני (4.0 + ריבית משתנה). (3) חשיפה מחזורית (45% שוכרים בשיא). כשכולם מתממשים ביחד — קריסה.",
            incorrectExplanation: "טעות! P/E 6, דיבידנד 9% — המלכודת המושלמת. יחס חלוקה 105% = החברה לוותת כדי לשלם דיבידנד. יחס כיסוי 1.3x = כל הפתעה קטנה = בעיה. וחוב/הון 4.0 = אין מרחב טעות.",
            counterSignalExplanation: "הצד השני יטען: P/E 6 = מציאה. דיבידנד 9% = תשואה מעולה. נדל\"ן מסחרי = נכסים \'אמיתיים\'. ואולי המנכ\"ל צודק שאפשר לשמור על הדיבידנד."
        },
        workedExample: "1) P/E 6, דיבידנד 9% — מפתה. נבדוק 3 זוויות. 2) דיבידנד: יחס חלוקה 105% = מחלקת מהלוואות, לא מרווחים. 3) מינוף: חוב/הון 4.0, 50% ריבית משתנה, כיסוי 1.3x = על הגבול. 4) מחזוריות: 45% שוכרים בשיא = כשהמחזור יירד, ההכנסות ייפגעו. 5) שוכר עוגן מצמצם = ההכנסות כבר יורדות. 6) תרחיש: ריבית עולה + שוכר עוזב + מחזור יורד = FCF קורס → דיבידנד נחתך → מניה נופלת. 7) מסקנה: שלוש מלכודות ביחד = העל.",
        reasoningOptions: [
            { text: "יחס חלוקה 105% = מחלקת מעבר ל-FCF = לא בר-קיימא", correct: true },
            { text: "3 סיכונים מצטברים (דיבידנד + מינוף + מחזור) = אפקט מצטבר", correct: true },
            { text: "P/E 6 = זול מאוד ומגן על הירידה", correct: false, biasTag: "עיגון על P/E ללא הקשר" },
            { text: "נדל\"ן = נכסים אמיתיים = רצפת ערך", correct: false, biasTag: "הנחת ערך נכסים קבוע" },
            { text: "ROIC 4.5% מול ROE 18% = כל התשואה ממנוף", correct: true },
            { text: "9% דיבידנד = תשואה מעולה שכדאי לקחת", correct: false, biasTag: "מלכודת תשואה גבוהה" }
        ],
        sellTriggers: [
            "דיבידנד נחתך (סימן שהחברה מודה בבעיה)",
            "יחס כיסוי ירד מתחת ל-1.0",
            "שוכר עוגן נוסף עוזב"
        ],
        dueDiligence: [
            "לבדוק לוח מיחזור החוב — מתי האג\"ח הבאות?",
            "לבדוק את הענפים של השוכרים — כמה מחזוריים?",
            "לבדוק האם יש covenants שיופרו אם ה-FCF ירד"
        ],
        isGoodValue: false,
        difficulty: "expert",
        difficultyValue: 4,
        hint: "יחס חלוקה 105% + יחס כיסוי 1.3x + חוב/הון 4.0 = כמה \'רשתות ביטחון\' יש כאן?"
    },

    // ── CONTRARIAN + MARGIN OF SAFETY (Expert, Buy) ─────────────────────
    {
        id: "contrarian-deep-x01",
        name: "בנק הערבה בע\"מ",
        sector: "בנקאות",
        symbol: "BNKH",
        price: 42.00,
        tier: 4,
        chartType: "annual",
        description: "בנק קטן שספג הפסד חד-פעמי ₪120M מתיק אשראי אחד שנכשל. המניה ירדה 45%. אבל: שאר התיק איכותי (הפרשות רגילות 0.3%), ההון גבוה (יחס הלימות 13.5%), ההנהלה קנתה מניות, ו-ROIC מנורמל 12%. P/E מנורמל 5.5.",
        management: "מנכ\"ל 18 שנות ניסיון בנקאי. קנה מניות ב-₪6M אחרי הירידה. סגנית מנכ\"לית גם קנתה.",
        moat: "התמחות בעסקים קטנים ובינוניים בנגב. מכיר את הלקוחות אישית. שיעור חידוש 90%.",
        events: "הפסד חד-פעמי ₪120M מלקוח בודד. כל ההפרשות נלקחו ברבעון אחד. תיק שאר — 0.3% הפרשות (מצוין).",
        metrics: {
            basic: [
                { name: "P/E (נוכחי, כולל חד-פעמי)", value: "שלילי" },
                { name: "P/E (מנורמל)", value: "5.5" },
                { name: "ROE (מנורמל)", value: "11%" }
            ],
            advanced: [
                { name: "יחס הלימות הון", value: "13.5% (מינימום: 10%)" },
                { name: "הפרשות (ללא חד-פעמי)", value: "0.3% (ענפי: 0.8%)" },
                { name: "רכישות הנהלה", value: "₪8M בחודשיים" }
            ]
        },
        historicalData: [
            { year: "year-4", revenue: 280, fcf: 35 },
            { year: "year-3", revenue: 295, fcf: 38 },
            { year: "year-2", revenue: 310, fcf: 42 },
            { year: "year-1", revenue: 325, fcf: 45 },
            { year: "year-0", revenue: 335, fcf: -75 }
        ],
        projectedData: [
            { year: "year+1", revenue: 340, fcf: 48 },
            { year: "year+2", revenue: 355, fcf: 52 }
        ],
        correctDecision: "buy",
        pointValue: 300,
        hints: [{ cost: 0.5, text: "FCF ₪45M × 4 שנים → ₪-75M בגלל אירוע אחד. האם הפסד חד-פעמי משנה את טיב העסק?" }],
        feedback: {
            principle: { id: "margin-of-safety", name: "מרווח ביטחון" },
            decisiveSignals: ["P/E מנורמל 5.5 = זול בטירוף", "הלימות 13.5% = מרחב גדול", "הנהלה קונה ₪8M"],
            correctExplanation: "מצוין! זו דוגמה קלאסית למרווח ביטחון — אירוע חד-פעמי שהפחיד את השוק ויצר הנחה עצומה. הלימות 13.5% = הבנק חזק. הפרשות 0.3% = התיק איכותי. והנהלה שקונה ב-₪8M = הם יודעים שזה זמני.",
            incorrectExplanation: "טעות! הפסד ₪120M וירידה 45% מפחידים. אבל: זה אירוע אחד, מלקוח אחד. 4 שנים של FCF ₪35-45M מוכיחות את איכות העסק. כשהנהלה קונה אחרי ירידה = הם מגיעים עם הכסף שלהם.",
            counterSignalExplanation: "הצד השני יטען: אם לקוח אחד יכול לגרום להפסד ₪120M, מי אומר שזה לא יקרה שוב? בנקים קטנים פגיעים. אולי ניהול הסיכונים לקוי."
        },
        workedExample: "1) הפסד ₪120M → מניה -45%. 2) שאלה: חד-פעמי או מבני? 3) בדיקה: הפרשות ללא החד-פעמי = 0.3% (מול 0.8% ענפי) = תיק מצוין. 4) הלימות: 13.5% מול מינימום 10% = כרית של 3.5 נקודות. 5) רקורד: FCF ₪35-45M × 4 שנים = עקביות. 6) סיגנל: הנהלה קונה ₪8M = מאמינה שזמני. 7) P/E מנורמל 5.5 = השוק מתמחר כאילו ₪120M יחזור כל שנה. 8) מסקנה: מרווח ביטחון עצום — קנייה.",
        reasoningOptions: [
            { text: "P/E מנורמל 5.5 אחרי אירוע חד-פעמי = הנחה עצומה", correct: true },
            { text: "הנהלה קונה ₪8M מכספם = מאמינים שזמני", correct: true },
            { text: "הפסד ₪120M = ניהול סיכונים כושל", correct: false, biasTag: "הכללת יתר מאירוע בודד" },
            { text: "מניה ירדה 45% = השוק מתמחר סיכון אמיתי", correct: false, biasTag: "הטיית עדר" },
            { text: "הלימות 13.5% = 3.5% מעל המינימום = הבנק חזק", correct: true },
            { text: "הפרשות 0.3% מול 0.8% ענפי = תיק איכותי", correct: true }
        ],
        sellTriggers: [
            "הפרשות \'רגילות\' עולות מעל 1%",
            "הלימות הון ירדה מתחת ל-11%",
            "מנכ\"ל מוכר מניות",
            "לקוח גדול נוסף נכשל"
        ],
        dueDiligence: [
            "לבדוק את ריכוז התיק — כמה לקוחות מעל 5% מהתיק?",
            "לבדוק האם הרגולטור דרש שינויי ניהול סיכונים",
            "לבדוק האם יש ביטוח-משנה על תיקי אשראי גדולים"
        ],
        isGoodValue: true,
        difficulty: "expert",
        difficultyValue: 4,
        hint: "FCF ₪45M × 4 שנים → ₪-75M בגלל אירוע אחד. האם הפסד חד-פעמי משנה את טיב העסק?"
    },

    // ── MANAGEMENT EMPIRE (Expert, Pass) ─────────────────────────────────
    {
        id: "empire-expert-x01",
        name: "קבוצת מזרחי גלובל בע\"מ",
        sector: "אחזקות",
        symbol: "MZRG",
        price: 210.00,
        tier: 4,
        chartType: "segments",
        description: "קונגלומרט שנוהל ע\"י \'מייסד אגדי\' שבנה אימפריה ב-30 שנה. הוא פרש, והבן ירש. הבן מבצע 4 רכישות בשנה, ROIC ירד מ-16% ל-7% מאז, ההוצאות העסקיות עלו 40%, ו-FCF למניה ירד 25% בגלל דילול מצטבר. אבל: \'שם המשפחה\' והנוסטלגיה שומרים על המניה.",
        management: "יורש שלא הוכח. 4 רכישות/שנה (גודל > איכות). הוצאות נסיעות: ₪8M/שנה. דירקטוריון מאויש בחברים.",
        moat: "חברות בת עם חפירים (פארמה, נדל\"ן), אבל המטה מנקז ערך.",
        events: "ROIC ירד מ-16% ל-7% ב-4 שנים. דילול 8% מצטבר. רכישה אחרונה: פי 12 רווח (יקר).",
        metrics: {
            basic: [
                { name: "P/E", value: "11" },
                { name: "ROE", value: "13%" },
                { name: "תשואת דיבידנד", value: "3%" }
            ],
            advanced: [
                { name: "ROIC", value: "7% (ירד מ-16%)" },
                { name: "FCF למניה (שינוי 4 שנים)", value: "-25%" },
                { name: "הוצאות מטה", value: "₪32M (+40% מאז הירושה)" }
            ]
        },
        segmentData: [
            { name: "פארמה (חברת בת ותיקה)", revenue: 450, margin: "28%", growth: "+4%" },
            { name: "נדל\"ן (חברת בת ותיקה)", revenue: 280, margin: "35%", growth: "+2%" },
            { name: "רכישות חדשות (4 חברות)", revenue: 180, margin: "8%", growth: "+15%" },
            { name: "הוצאות מטה", revenue: -32, margin: "N/A", growth: "+12%" }
        ],
        projectedData: [
            { year: "year+1", revenue: 950, fcf: 68 },
            { year: "year+2", revenue: 1000, fcf: 65 }
        ],
        correctDecision: "pass",
        pointValue: 300,
        // FCF BREAKER: FCF positive, total revenue growing
        hints: [{ cost: 0.5, text: "חברות הבת הוותיקות מרוויחות 28-35% מרווח. הרכישות החדשות — 8%. לאן הולך הערך?" }],
        feedback: {
            principle: { id: "management-quality", name: "איכות הנהלה" },
            decisiveSignals: ["ROIC 16% → 7% = רכישות הורסות ערך", "FCF למניה -25% = דילול + רכישות גרועות", "הוצאות מטה +40%"],
            correctExplanation: "נכון! המייסד בנה חברות בת נהדרות (מרווחים 28-35%). הבן מדלל את הערך: רכישות ב-8% מרווח, ROIC שחצי, דילול, והוצאות מטה שטסות. הסכום = FCF למניה -25% ב-4 שנים. \'שם המשפחה\' שומר על המחיר — עד שלא.",
            incorrectExplanation: "טעות! P/E 11 והכנסות שגדלות = נראה בסדר. אבל הסתכלו על FCF למניה: -25% ב-4 שנים. ההכנסות גדלות דרך רכישות מדוללות, לא דרך צמיחה אמיתית. ROIC 7% בירידה = הורסים ערך.",
            counterSignalExplanation: "הצד השני יטען: P/E 11 זול, חברות הבת חזקות, הכנסות כוללות גדלות, והמותג המשפחתי יוצר אמון. אולי הרכישות החדשות צריכות זמן להבשיל."
        },
        workedExample: "1) P/E 11, הכנסות גדלות — בסדר? 2) בדיקת ROIC: 16% → 7% = כל שקל שנוסף מרוויח פחות. 3) סגמנטים: וותיקות 28-35%. חדשות 8%. = רכישות גרועות. 4) FCF למניה: -25% = דילול + הוצאות אוכלים את הערך. 5) הוצאות מטה: ₪32M (+40%) = המטה הפך למרכז עלות. 6) דירקטוריון חברים = אין ביקורת. 7) מסקנה: יורש שמבזבז את מה שהמייסד בנה. העל.",
        reasoningOptions: [
            { text: "ROIC 16%→7% = כל רכישה מורידה את איכות הפורטפוליו", correct: true },
            { text: "FCF למניה -25% ב-4 שנים = בעלי מניות נפגעים", correct: true },
            { text: "P/E 11 = זול לקונגלומרט עם חברות בת חזקות", correct: false, biasTag: "מלכודת P/E" },
            { text: "הכנסות גדלות = הקבוצה צומחת", correct: false, biasTag: "בלבול הכנסות עם ערך" },
            { text: "חברות הבת הוותיקות מצוינות אבל המטה מנקז ערך", correct: true },
            { text: "\'שם המשפחה\' = מותג שמגן על הערך", correct: false, biasTag: "הטיית נוסטלגיה" }
        ],
        sellTriggers: [
            "החלפת הנהלה ביורש לניהול מקצועי חיצוני",
            "פירוק הקונגלומרט ומכירת חברות הבת בנפרד",
            "עצירת רכישות חדשות ומיקוד בביצועים"
        ],
        dueDiligence: [
            "להשוות שווי חברות הבת בנפרד (SOTP) מול שווי הקונגלומרט",
            "לבדוק את עסקאות בעלי העניין בפירוט",
            "לבדוק האם אקטיביסט נכנס למניה"
        ],
        isGoodValue: false,
        difficulty: "expert",
        difficultyValue: 4,
        hint: "חברות הבת הוותיקות מרוויחות 28-35% מרווח. הרכישות החדשות — 8%. לאן הולך הערך?"
    }
];


// ============================================================================
// SECTION 3: MORE VERSUS ROUNDS
// ============================================================================

const VERSUS_ROUNDS_BATCH2 = [

    // ── VERSUS 6: FCF Quality (Medium) ──────────────────────────────────
    {
        id: "versus-fcf-quality-01",
        tier: 2,
        type: "versus",
        title: "₪50M FCF — אבל באיזו איכות?",
        description: "שתי חברות עם FCF דומה של ₪50M. אחת עם FCF יציב ואורגני, השנייה עם FCF שמנופח מעיתוי חד-פעמי.",
        companyA: {
            name: "מזון הבית בע\"מ",
            symbol: "MZBT",
            sector: "מזון",
            description: "FCF ₪50M עקבי 6 שנים. מקור: מכירות חוזרות של מוצרי יומיום. ROIC 16%. לא מרגש אבל עקבי.",
            metrics: [
                { name: "FCF", value: "₪50M (6 שנים עקבי)" },
                { name: "ROIC", value: "16%" },
                { name: "צמיחה", value: "3%" },
                { name: "P/E", value: "12" }
            ],
            historicalFCF: [46, 48, 50, 49, 51, 50]
        },
        companyB: {
            name: "טכנו-סרביס בע\"מ",
            symbol: "TKSV",
            sector: "שירותי IT",
            description: "FCF ₪50M השנה. אבל: ₪20M מתזמון הון חוזר (לקוח שילם מוקדם), ₪15M מדחיית CAPEX. FCF \'אמיתי\' = ₪15M. בשנים קודמות: ₪10-20M.",
            metrics: [
                { name: "FCF", value: "₪50M (חד-פעמי)" },
                { name: "ROIC", value: "8%" },
                { name: "צמיחה", value: "12%" },
                { name: "P/E", value: "15" }
            ],
            historicalFCF: [12, 18, 15, 20, 10, 50]
        },
        correctAnswer: "A",
        pointValue: 150,
        feedback: {
            explanation: "מזון הבית עדיפה. FCF ₪50M × 6 שנים = ניתן לתכנן עליו. טכנו-סרביס: ₪50M השנה אבל ₪15M \'אמיתי\'. P/E 12 על FCF אמיתי מול P/E 15 על FCF מנופח = מזון הבית זולה פי 3.",
            counterArgument: "טכנו-סרביס: צמיחה 12% > 3%. ROIC 8% ישתפר עם סקייל. ₪50M FCF מראה פוטנציאל.",
            principle: { id: "owner-earnings", name: "רווחי בעלים" }
        },
        workedExample: "1) FCF זהה: ₪50M. אבל איכות שונה. 2) מזון: 46-51 × 6 שנים = עקבי. 3) טכנו: 10-20 × 5 שנים, 50 בשנה אחת = חריג. 4) בדיקה: ₪20M תזמון + ₪15M דחיית CAPEX = ₪35M \'מנופח\'. 5) FCF \'אמיתי\' של טכנו: ₪15M. 6) מסקנה: FCF עקבי > FCF חד-פעמי."
    },

    // ── VERSUS 7: Buyback vs Dividend (Hard) ────────────────────────────
    {
        id: "versus-buyback-dividend-01",
        tier: 3,
        type: "versus",
        title: "רכישה עצמית או דיבידנד — מי מחזיר ערך טוב יותר?",
        description: "שתי חברות תעשייתיות דומות. אחת מחלקת דיבידנד 6%, השנייה רוכשת 6% מהמניות בשנה. שתיהן ב-P/E 10 ו-ROIC 15%.",
        companyA: {
            name: "תעשיות אשקלון בע\"מ",
            symbol: "TASH",
            sector: "תעשייה",
            description: "דיבידנד 6%, יחס חלוקה 60%. לא רוכשת מניות. FCF למניה גדל 3%/שנה (מצמיחת הכנסות בלבד).",
            metrics: [
                { name: "תשואת דיבידנד", value: "6%" },
                { name: "רכישה עצמית", value: "0%" },
                { name: "ROIC", value: "15%" },
                { name: "FCF למניה (צמיחה)", value: "+3%/שנה" }
            ],
            historicalFCF: [30, 31, 32, 33, 34]
        },
        companyB: {
            name: "תעשיות חיפה בע\"מ",
            symbol: "THIF",
            sector: "תעשייה",
            description: "דיבידנד 1%, רכישה עצמית 6%/שנה ב-P/E 10. FCF למניה גדל 9%/שנה (3% אורגני + 6% רכישה עצמית).",
            metrics: [
                { name: "תשואת דיבידנד", value: "1%" },
                { name: "רכישה עצמית", value: "6%/שנה" },
                { name: "ROIC", value: "15%" },
                { name: "FCF למניה (צמיחה)", value: "+9%/שנה" }
            ],
            historicalFCF: [30, 33, 36, 39, 43]
        },
        correctAnswer: "B",
        pointValue: 200,
        feedback: {
            explanation: "חיפה עדיפה. רכישה עצמית ב-P/E 10 = קנייה של ₪1 רווח ב-₪10 = תשואה 10% על הרכישה. דיבידנד 6% = תשואה 6% (ועוד מס). FCF למניה של חיפה גדל 9%/שנה מול 3% — בעוד 5 שנים ההפרש יהיה עצום.",
            counterArgument: "אשקלון: 6% תשואה \'ביד\' — לא צריך לסמוך על ההנהלה שתמשיך לרכוש. מס על דיבידנד, נכון, אבל אתה מקבל מזומן.",
            principle: { id: "owner-earnings", name: "רווחי בעלים" }
        },
        workedExample: "1) שתיהן ROIC 15%, P/E 10. 2) אשקלון: 6% דיבידנד = ₪6 לכל ₪100 השקעה (מינוס מס ~25% = ₪4.5 נטו). 3) חיפה: 6% רכישה ב-P/E 10 = כל ₪10 שנרכש = ₪1 רווח/שנה שנוסף. 4) FCF למניה: אשקלון +3%/שנה, חיפה +9%/שנה. 5) בעוד 5 שנים: חיפה FCF למניה ₪47 מול אשקלון ₪39. 6) מסקנה: רכישה עצמית > דיבידנד כש-P/E נמוך."
    },

    // ── VERSUS 8: P/E Trap (Easy) ───────────────────────────────────────
    {
        id: "versus-pe-trap-01",
        tier: 1,
        type: "versus",
        title: "P/E 8 מול P/E 20 — מי באמת זול?",
        description: "שתי חברות. אחת עם P/E 8 והכנסות יורדות, השנייה עם P/E 20 אבל צמיחה של 18% וחפיר חזק.",
        companyA: {
            name: "ישן-טק הדפסות בע\"מ",
            symbol: "YSNT",
            sector: "תעשייה",
            description: "P/E 8, דיבידנד 5%. אבל: ההכנסות יורדות 8% בשנה, אין חפיר, הענף מתכווץ, ו-ROIC 6%.",
            metrics: [
                { name: "P/E", value: "8" },
                { name: "ROIC", value: "6%" },
                { name: "צמיחה", value: "-8%" },
                { name: "חפיר", value: "אין" }
            ],
            historicalFCF: [25, 22, 20, 18, 16]
        },
        companyB: {
            name: "חכם-סופט בע\"מ",
            symbol: "HKSF",
            sector: "תוכנה",
            description: "P/E 20 (PEG 1.1). צמיחה 18%, ROIC 24%, FCF עולה כל שנה, חפיר מוצק (עלות מעבר גבוהה).",
            metrics: [
                { name: "P/E", value: "20" },
                { name: "PEG", value: "1.1" },
                { name: "ROIC", value: "24%" },
                { name: "צמיחה", value: "18%" }
            ],
            historicalFCF: [22, 26, 31, 37, 44]
        },
        correctAnswer: "B",
        pointValue: 120,
        feedback: {
            explanation: "חכם-סופט עדיפה. P/E 20 עם צמיחה 18% (PEG 1.1) = זולה יותר מ-P/E 8 עם ירידה 8%. בעוד 3 שנים, FCF של חכם-סופט יעקוף את ישן-טק. \'P/E נמוך = זול\' זו טעות נפוצה.",
            counterArgument: "ישן-טק: P/E 8, דיבידנד 5% — תשואה מיידית. חכם-סופט: P/E 20 = צריך לחכות שנים עד שהצמיחה \'תתפוס\'.",
            principle: { id: "margin-of-safety", name: "מרווח ביטחון" }
        },
        workedExample: "1) ישן-טק: P/E 8, אבל FCF יורד 16→8 (ב-4 שנים). P/E \'עתידי\' = 16+. 2) חכם-סופט: P/E 20, FCF עולה 22→44. P/E \'עתידי\' = 10. 3) ROIC: 6% מול 24% — כל שקל שחכם-סופט משקיעה מרוויח פי 4. 4) מסקנה: P/E הוא תמונה רגעית, לא אבסולוטי."
    },

    // ── VERSUS 9: Quick Ratio Warning (Medium) ──────────────────────────
    {
        id: "versus-liquidity-01",
        tier: 2,
        type: "versus",
        title: "שתי חברות רווחיות — אחת עלולה להיתקע",
        description: "שתי חברות עם FCF חיובי ו-ROIC 14%. אחת עם יחס מהיר (quick ratio) 2.1, השנייה עם 0.4. מי בסיכון?",
        companyA: {
            name: "נוזלית תעשיות בע\"מ",
            symbol: "NZLT",
            sector: "תעשייה",
            description: "ROIC 14%, P/E 11, FCF ₪35M. יחס מהיר 2.1 — מזומן ושווי מזומן מכסים את ההתחייבויות השוטפות פי 2. חוב/הון 0.5.",
            metrics: [
                { name: "P/E", value: "11" },
                { name: "ROIC", value: "14%" },
                { name: "יחס מהיר", value: "2.1" },
                { name: "חוב/הון", value: "0.5" }
            ],
            historicalFCF: [30, 32, 33, 34, 35]
        },
        companyB: {
            name: "מהירה לוגיסטיקה בע\"מ",
            symbol: "MHRL",
            sector: "לוגיסטיקה",
            description: "ROIC 14%, P/E 9 (\'זולה יותר\'!), FCF ₪40M. אבל יחס מהיר 0.4 = ההתחייבויות השוטפות כפולות מהנכסים הנזילים. חוב/הון 2.2.",
            metrics: [
                { name: "P/E", value: "9" },
                { name: "ROIC", value: "14%" },
                { name: "יחס מהיר", value: "0.4" },
                { name: "חוב/הון", value: "2.2" }
            ],
            historicalFCF: [28, 32, 35, 38, 40]
        },
        correctAnswer: "A",
        pointValue: 150,
        feedback: {
            explanation: "נוזלית עדיפה. FCF דומה, ROIC זהה, אבל נוזלית יכולה לשרוד הפתעות (יחס מהיר 2.1). מהירה: יחס מהיר 0.4 = אם לקוח גדול מאחר בתשלום, אין מזומן לשלם ספקים. P/E 9 \'זול\' כי השוק מתמחר את הסיכון.",
            counterArgument: "מהירה: P/E 9 מול 11, FCF ₪40M מול ₪35M. \'זולה יותר ומרוויחה יותר\'. יחס מהיר נמוך נפוץ בלוגיסטיקה.",
            principle: { id: "leverage-risk", name: "סיכון מינוף" }
        },
        workedExample: "1) ROIC זהה, FCF דומה. P/E: מהירה \'זולה\' יותר. 2) אבל: יחס מהיר 0.4 = על כל ₪1 חוב לזמן קצר, יש רק 40 אגורות נזילים. 3) תרחיש: לקוח גדול מאחר 60 יום = מהירה לא יכולה לשלם ספקים. 4) חוב/הון 2.2 מול 0.5 = מהירה ממונפת פי 4.4. 5) מסקנה: P/E 9 \'זול\' כי מגלם סיכון נזילות."
    }
];


// ============================================================================
// SECTION 4: MORE SELL/HOLD SCENARIOS
// ============================================================================

const SELL_HOLD_BATCH2 = [

    // ── SELL/HOLD 4: Thesis Changed (Medium) ────────────────────────────
    {
        id: "sellhold-thesis-broken-01",
        tier: 2,
        type: "sell-hold",
        title: "קנית בגלל ההנהלה — ההנהלה השתנתה",
        purchaseContext: {
            name: "טכנו-פארם ישראל בע\"מ",
            symbol: "TKFR",
            sector: "פארמה",
            purchasePrice: 95.00,
            currentPrice: 102.00,
            change: "+7%",
            holdingPeriod: "14 חודשים"
        },
        newInformation: "המנכ\"לית שבגללה קנית (מייסדת עם 15% אחזקה, ROIC 18%) הודיעה על פרישה. המחליף הוא מנהל מקרב בנקאות השקעות ללא ניסיון תפעולי. הדירקטוריון אישר לו חבילת תגמול של ₪12M/שנה ללא תנאי ביצוע.",
        currentMetrics: [
            { name: "P/E", value: "16" },
            { name: "ROIC", value: "18% (עדיין)" },
            { name: "FCF", value: "₪52M" }
        ],
        correctDecision: "sell",
        pointValue: 150,
        feedback: {
            principle: { id: "management-quality", name: "איכות הנהלה" },
            explanation: "למכור! התזה הייתה מבוססת על הנהלה — וההנהלה השתנתה. \'+7%\' = אתה ברווח, אבל זה לא משנה. השאלה: \'האם הייתי קונה היום עם המנכ\"ל החדש?\' מנהל בלי ניסיון + תגמול ללא ביצוע = אינטרסים לא מיושרים.",
            counterArgument: "\'אני ברווח 7%, המספרים עדיין טובים, אולי המנכ\"ל החדש יפתיע.\' — נכון, אבל הסתברותית: מעבר ממנכ\"לית מייסדת למנהל מבנקאות = סיכון גבוה.",
            biasWarning: "אפקט הקצאה (endowment effect): נטייה להעריך מה שכבר שלנו יותר מדי. \'אני כבר ברווח\' = לא רלוונטי לשאלה אם להחזיק."
        },
        workedExample: "1) התזה המקורית: מנכ\"לית מייסדת + 15% + ROIC 18%. 2) מה השתנה: היא פורשת. 3) המחליף: אין ניסיון תפעולי + תגמול ללא ביצוע = דגל אדום כפול. 4) שאלה: \'הייתי קונה היום?\' עם המנכ\"ל החדש, ב-P/E 16? לא. 5) +7% לא רלוונטי. 6) מסקנה: התזה נשברה — למכור."
    },

    // ── SELL/HOLD 5: Anchoring on Purchase Price (Hard) ──────────────────
    {
        id: "sellhold-anchoring-01",
        tier: 3,
        type: "sell-hold",
        title: "הפסד של 55% — אבל העסק השתנה לחלוטין",
        purchaseContext: {
            name: "מגה-רשת חנויות בע\"מ",
            symbol: "MGRT",
            sector: "קמעונאות",
            purchasePrice: 180.00,
            currentPrice: 81.00,
            change: "-55%",
            holdingPeriod: "3 שנים"
        },
        newInformation: "קנית לפני 3 שנים כשהיה חפיר — מותג חזק ו-30 סניפים. מאז: 15 סניפים נסגרו, חוב הכפיל את עצמו, מנכ\"ל עזב, ROIC ירד מ-14% ל-3%, ומתחרה אונליין לקח 40% מהלקוחות. אין שום סיבה לחשוב שזה ישתנה.",
        currentMetrics: [
            { name: "P/E", value: "22 (על רווחים שמתכווצים)" },
            { name: "ROIC", value: "3% (ירד מ-14%)" },
            { name: "FCF", value: "₪8M (ירד מ-₪45M)" }
        ],
        correctDecision: "sell",
        pointValue: 200,
        feedback: {
            principle: { id: "sunk-cost", name: "עלות שקועה" },
            explanation: "למכור! ₪180 → ₪81 כואב — אבל ₪180 לא קיים יותר. השאלה: \'אם היה לי ₪81 מזומן, הייתי קונה את המניה הזו?\' עם ROIC 3%, חוב כפול, ומתחרה שלקח 40%? ברור שלא. ₪81 ידלו במניה טובה יותר.",
            counterArgument: "\'כבר הפסדתי 55%. אם אמכור עכשיו, זה \'אמיתי\'. אולי יהיה ריבאונד.\' — עלות שקועה קלאסית. ההפסד כבר קרה.",
            biasWarning: "עלות שקועה + עיגון על מחיר קנייה: הנטייה לחכות \'עד שהמניה תחזור ל-₪180\'. אבל המניה לא יודעת מה שילמת. היא שווה מה שהיא שווה."
        },
        workedExample: "1) ₪180 → ₪81 = הפסד 55%. כואב. 2) אבל: ROIC 14% → 3%, FCF ₪45M → ₪8M, 15 סניפים נסגרו. 3) התזה נשברה לחלוטין — לא חלקית. 4) שאלה: \'הייתי קונה ב-₪81?\' = לא. P/E 22 על רווחים מתכווצים = יקר. 5) ₪81 שנשאירו כאן = ₪81 שלא עובדים בשבילנו. 6) מסקנה: להתנתק ממחיר הקנייה — למכור."
    },

    // ── SELL/HOLD 6: Loss Aversion (Expert) ─────────────────────────────
    {
        id: "sellhold-loss-aversion-01",
        tier: 4,
        type: "sell-hold",
        title: "למכור בהפסד עכשיו או להסתכן בהפסד גדול יותר",
        purchaseContext: {
            name: "אופטימל אנרגיה בע\"מ",
            symbol: "OPTM",
            sector: "אנרגיה",
            purchasePrice: 120.00,
            currentPrice: 96.00,
            change: "-20%",
            holdingPeriod: "11 חודשים"
        },
        newInformation: "קנית על בסיס חוזה גדול שנחתם. עכשיו: החוזה עלול להתבטל (60% סיכוי) בגלל שינוי רגולטורי. אם יתבטל — המניה צפויה לרדת ל-₪50 (-58% ממחיר הנוכחי). אם לא יתבטל — תעלה ל-₪150. תוחלת: 0.6×50 + 0.4×150 = ₪90 < ₪96.",
        currentMetrics: [
            { name: "תוחלת מחיר", value: "₪90 (< ₪96 נוכחי)" },
            { name: "הסתברות ביטול", value: "60%" },
            { name: "downside אם ביטול", value: "₪50 (-48%)" }
        ],
        correctDecision: "sell",
        pointValue: 300,
        feedback: {
            principle: { id: "loss-aversion", name: "שנאת הפסד" },
            explanation: "למכור! התוחלת ₪90 < מחיר נוכחי ₪96. בנוסף, downside (₪50) הרבה יותר גדול מ-upside (₪150 מול ₪96). זה חישוב קר, לא רגש. \'20% הפסד\' כואב למכור, אבל עדיף מ-58% הפסד.",
            counterArgument: "\'אם אמכור ב-₪96, ההפסד של 20% \'מתממש\'. אם אחכה, יש 40% סיכוי ל-₪150!\' — שנאת הפסד. התוחלת שלילית = למכור.",
            biasWarning: "שנאת הפסד: הכאב ממימוש הפסד 20% מונע ממך לראות שאתה חושף את עצמך להפסד 48% נוסף. \'קיבוע הפסד\' הוא ביטוי שגוי — ההפסד כבר קרה."
        },
        workedExample: "1) מצב: ₪96, הפסד 20% עד כה. 2) תרחישים: 60% → ₪50, 40% → ₪150. 3) תוחלת: 0.6×50 + 0.4×150 = 30+60 = ₪90 < ₪96. 4) = תוחלת שלילית = למכור מבחינה מתמטית. 5) בנוסף: ₪50 = הפסד 48% נוסף, לעומת upside ₪54 = 56%. 6) יחס סיכון/סיכוי: 48%×60% מול 56%×40% = -28.8% מול +22.4%. 7) מסקנה: מתמטית ורגשית — למכור."
    }
];


// ============================================================================
// SECTION 5: MORE SPECIAL EVENTS
// ============================================================================

const SPECIAL_EVENTS_BATCH2 = [

    // ── EVENT 5: Buyback Signal (Medium) ────────────────────────────────
    {
        id: "event-buyback-signal-01",
        tier: 2,
        type: "special-event",
        eventType: "company",
        title: "רכישה עצמית — סיגנל חזק או מלכודת?",
        description: "חברה הכריזה על תוכנית רכישה עצמית של 10% מהמניות. P/E 8, ROIC 17%, FCF יציב. אבל: המנכ\"ל מקבל בונוס לפי רווח למניה (EPS) — ורכישה עצמית מעלה EPS אוטומטית ללא שיפור בעסק. מה הסיגנל?",
        options: [
            { text: "חיובי! ההנהלה חושבת שהמניה זולה ומשתמשת ב-FCF לטובת בעלי מניות.", value: "positive" },
            { text: "חשוד. בונוס מבוסס EPS = הרכישה משרתת את המנכ\"ל, לא את המשקיעים.", value: "suspicious" },
            { text: "ניטרלי — צריך לבדוק את ההיסטוריה: האם החברה קנתה בזול בעבר?", value: "neutral" }
        ],
        correctOption: "suspicious",
        pointValue: 150,
        feedback: {
            correct: "מצוין! רכישה עצמית היא חיובית רק כשהמוטיבציה נכונה. כשבונוס מנכ\"ל מבוסס EPS, הוא מתוגמל על הרכישה גם אם היא נעשית במחיר מופרז. הסימן: האם הוא היה קונה גם ללא הבונוס?",
            incorrect: "חשבו עוד. רכישה עצמית = פעולה. המוטיבציה = מה חשוב. בונוס EPS = המנכ\"ל מרוויח מהרכישה אישית. זה לא אומר שהרכישה רעה — אבל צריך חשדנות.",
            principle: { id: "management-quality", name: "איכות הנהלה" }
        }
    },

    // ── EVENT 6: Sector Rotation (Expert) ───────────────────────────────
    {
        id: "event-sector-rotation-01",
        tier: 4,
        type: "special-event",
        eventType: "macro",
        title: "רוטציה סקטוריאלית — להצטרף או להתעלם?",
        description: "בחודש האחרון, קרנות גדולות עברו מטכנולוגיה לתעשייה. מניות תעשייה עלו 15%. יש לכם חברת תעשייה שקניתם לפני שנה (עלתה 8%) וחברת טכנולוגיה (ירדה 10%). התזה של שתיהן שלמה. מה עושים?",
        options: [
            { text: "למכור את הטכנולוגיה ולהגדיל תעשייה — ללכת עם המגמה.", value: "follow-trend" },
            { text: "לא לשנות כלום — רוטציה סקטוריאלית היא רעש, לא סיגנל.", value: "ignore" },
            { text: "להגדיל את הטכנולוגיה שירדה 10% (עכשיו זולה יותר) ולהקטין תעשייה שעלתה 15%.", value: "contrarian" }
        ],
        correctOption: "ignore",
        pointValue: 300,
        feedback: {
            correct: "מצוין! רוטציה סקטוריאלית = תנועת קרנות, לא שינוי בערך החברות. אם התזה שלמה — לא משנים. להצטרף למגמה = רדיפה (chasing). להיות contrarian רק בגלל מגמה = אותה טעות בכיוון הפוך.",
            incorrect: "חשבו שוב. \'ללכת עם המגמה\' = מכירה בזול וקנייה ביוקר. \'contrarian\' בלי סיבה בסיסית = ספקולציה. הדרך של באפט: אם התזה לא השתנתה, הפורטפוליו לא צריך להשתנות.",
            principle: { id: "margin-of-safety", name: "מרווח ביטחון" }
        }
    }
];


// ============================================================================
// SECTION 6: EXISTING COMPANY PATCHES
// Adds counterSignalExplanation + workedExample to salvageable companies
// Also converts absolute years to relative and adds chartType
// ============================================================================

const EXISTING_COMPANY_PATCHES_BATCH2 = {

    // ═══ EASY TIER PATCHES ══════════════════════════════════════════════

    // (Apply to each existing easy company — example IDs from v1)
    // ID format may vary — match by name or existing ID in your game-data.js

    "insurance-company-01": {
        chartType: "annual",
        counterSignalExplanation: "הצד השני יטען: P/E 10 סביר לביטוח, ההנהלה מנוסה, והשוק תמיד צריך ביטוח. מחזור תביעות קשה הוא זמני.",
        workedExample: "1) בדיקת חפיר: ביטוח = תחרותי, אבל מותגים חזקים שומרים על לקוחות. 2) מספרים: בדוק ROIC ו-FCF לאורך 5 שנים — עקבי? 3) סיכון: מחזור תביעות = חד-פעמי? או מבני? 4) מרווח: P/E ביחס לסקטור ולצמיחה. 5) מסקנה: בנה את הטענה לשני הכיוונים."
    },

    "tech-company-01": {
        chartType: "annual",
        counterSignalExplanation: "הצד השני יטען: P/E גבוה לטכנולוגיה אומר שהשוק כבר מתמחר את הצמיחה. חפיר טכנולוגי עלול להתיישן מהר. תחרות בסייבר/AI אינטנסיבית.",
        workedExample: "1) בדיקת צמיחה: האם אורגנית? מה PEG? 2) בדיקת חפיר: IP, עלות מעבר, אפקט רשת? 3) ROIC: האם גבוה ויציב? 4) הנהלה: skin in the game? 5) P/E: קליבר ביחס לסקטור (טווח 20-40 לטכנולוגיה רווחית)."
    },

    "retail-chain-01": {
        chartType: "annual",
        counterSignalExplanation: "הצד השני יטען: קמעונאות פיזית מתמודדת עם איקומרס. שינוי טרנדים יכול לפגוע בהכנסות. P/E נמוך בקמעונאות הוא נפוץ ולא בהכרח מציאה.",
        workedExample: "1) בדיקת חפיר: מותג? מיקום? נאמנות? 2) מגמה: הכנסות ו-FCF — עולים, יציבים, יורדים? 3) מרווחים: יציבים או נשחקים? 4) הנהלה: מסתגלת לדיגיטל? 5) P/E: ביחס לטווח הסקטורי (12-18 לקמעונאות מזון)."
    },

    "food-manufacturer-01": {
        chartType: "annual",
        counterSignalExplanation: "הצד השני יטען: מזון מעובד נמצא תחת לחץ מגמת בריאות. צמיחה איטית אומרת שאין מנוע עתידי. מתחרי פרייבט לייבל לוחצים על מרווחים.",
        workedExample: "1) חפיר: מותגים מוכרים + נתח מדף = חפיר צרכני. 2) בדיקה: האם המותגים מאבדים נתח? 3) FCF: יציב = עסק מזומנים. 4) ROIC: גבוה ויציב = העסק מייצר ערך. 5) P/E: ביחס לצמיחה + יציבות."
    },

    "bank-stable-01": {
        chartType: "none",
        counterSignalExplanation: "הצד השני יטען: בנקים חשופים למחזורי אשראי. רגולציה יכולה לפגוע ברווחיות. ריבית נמוכה מצמצמת מרווח ריבית.",
        workedExample: "1) בנקאות: בדוק יחס הלימות הון — מעל מינימום? 2) הפרשות: האם נמוכות מהממוצע הענפי? 3) ROE: האם מגיע מרווחיות אמיתית או ממנוף? 4) חוב/הון: בבנקאות גבוה = נורמלי, אבל השוואה לענף חשובה."
    },

    // ═══ MEDIUM TIER PATCHES ════════════════════════════════════════════

    "defense-contractor-01": {
        chartType: "annual",
        // NOTE: This company also needs year conversion from absolute to relative!
        // Change: 2019→year-4, 2020→year-3, 2021→year-2, 2022→year-1, 2023→year-0
        counterSignalExplanation: "הצד השני יטען: P/E 18 לא זול, 60% תלות ביצוא מחשפת לסיכון גיאופוליטי, וענף ביטחוני נתון לקיצוצי תקציב.",
        workedExample: "1) חפיר: סיווג ביטחוני + IP = מתחרים לא נכנסים. 2) Backlog 3.2 שנים = נראות. 3) ROIC 19% = איכות. 4) P/E 18 לביטחוני = טווח 15-25 → סביר. 5) סיכון: תלות יצוא. 6) מסקנה: חפיר + backlog = קנייה."
    },

    "luxury-retail-01": {
        chartType: "annual",
        counterSignalExplanation: "הצד השני יטען: המנכ\"ל החדש צריך זמן. מותגי יוקרה בלעדיים = נכס שקשה לשכפל. שיפוץ חנויות = השקעה לטווח ארוך.",
        workedExample: "1) חפיר: בלעדיות נשחקת? 2) הנהלה: מנכ\"ל חדש — רקורד? הוצאות ללא תוצאות. 3) מגמה: סגירת סניפים = כיווץ. 4) חוב: עלה = סיכון. 5) P/E: ביחס לקמעונאות יוקרה."
    },

    "printing-company-01": {
        chartType: "annual",
        counterSignalExplanation: "הצד השני יטען: P/E 5 ודיבידנד 8% = תשואה מצוינת לזמן מה. המעבר לאריזות עשוי להצליח. הנכסים שווים משהו גם אם העסק ייסגר.",
        workedExample: "1) ענף: דפוס מתכווץ = רוח נגדית מבנית. 2) הכנסות: -10%/שנה = הכפלת ירידה כל 7 שנים. 3) דיבידנד: 8% אבל FCF יורד = ייחתך. 4) ניהול: מייסד 70, אין ירושה. 5) מסקנה: מלכודת ערך."
    },

    "solar-energy-01": {
        chartType: "annual",
        counterSignalExplanation: "הצד השני יטען: אנרגיה מתחדשת נתמכת רגולטורית אבל תלויה בסובסידיות. חוב גבוה בתשתיות = סיכון ריבית. לא כל פרויקט מסתיים בזמן.",
        workedExample: "1) הכנסות: חוזים ארוכי טווח? 2) חוב: סוג הריבית — קבועה או משתנה? 3) כיסוי: יחס כיסוי ריבית מספיק? 4) FCF: חיובי אחרי השלמת פרויקטים? 5) P/E ביחס לתשתיות."
    },

    "biotech-startup-01": {
        chartType: "none",
        counterSignalExplanation: "הצד השני יטען: ביוטק = פוטנציאל עצום אם התרופה מאושרת. מדענים מובילים = יתרון. ופטנטים מגנים ליתרי שנים.",
        workedExample: "1) שאלה ראשונה: האם אני מבין את המדע? 2) אם לא = מחוץ למעגל כשירות. 3) הסתברות אישור: בדוק שלב קליני. 4) Burn rate: כמה זמן יש? 5) מסקנה: אם לא מבין = לא משקיע."
    },

    "conglomerate-01": {
        chartType: "segments",
        counterSignalExplanation: "הצד השני יטען: P/NAV 0.6 = קונים נכסים ב-60%. חברות הבת עצמן חזקות. דיסקאונט קונגלומרט = הזדמנות לסבלניים.",
        workedExample: "1) סגמנטים: בדוק כל חברת בת בנפרד. 2) מטה: הוצאות מטה — כמה מנקזות? 3) ממשל: עסקאות בעלי עניין? 4) ROIC כולל: משקלל את הרכישות הגרועות? 5) מבנה: פירמידלי = סיכון."
    }
};


// ============================================================================
// SUMMARY STATS — BATCH 2
// ============================================================================
//
// Hard companies:      7 (3 buy, 4 pass)
// Expert companies:    4 (2 buy, 2 pass)
// Versus rounds:       4 (tiers: 1, 2, 2, 3)
// Sell/hold:           3 (tiers: 2, 3, 4)
// Special events:      2 (tiers: 2, 4)
// Existing patches:    11 companies
//
// NEW METRICS USED:
//   - Quick ratio (יחס מהיר) — new, universal
//   - Buyback yield (רכישה עצמית %) — new, universal
//   - CROIC not explicitly used but ROIC consistently included
//   - All other metrics: P/E, PEG, FCF, ROE, ROIC, debt/equity, payout ratio
//
// FCF BREAKERS in batch 2: 5 more (moat-erosion-h01, hidden-leverage-h01,
//   triple-trap-x01, empire-expert-x01, plus existing company patches)
//
// CHART TYPE MIX: annual (6), quarterly (2), segments (3), none (3), waterfall (0)
//
// ============================================================================
// MERGE INSTRUCTIONS: Same as Batch 1.
// Hard companies → window.BuffettGame.companies.hard
// Expert companies → window.BuffettGame.companies.expert
// Versus → append to window.BuffettGame.versusRounds
// Sell/hold → append to window.BuffettGame.sellHoldRounds
// Events → append to appropriate tier in specialEvents
// Patches → merge into existing company objects by ID
// ============================================================================
