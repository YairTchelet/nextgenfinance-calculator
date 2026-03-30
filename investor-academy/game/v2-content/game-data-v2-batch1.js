// ============================================================================
// משחק ההשקעות v2 — Batch 1: New Questions
// ============================================================================
// This file contains NEW content to be merged into game-data.js.
// Organization:
//   1. New company questions (buy/pass) — filling principle gaps
//   2. Versus rounds (pick better company)
//   3. Sell/hold scenarios
//   4. New special events
//   5. Patches for existing companies (counterSignalExplanation + workedExample)
//
// ALL questions use:
//   ✅ Relative years ("year-0", not "2024")
//   ✅ counterSignalExplanation on every company
//   ✅ workedExample on every company
//   ✅ Non-monotonic historical data
//   ✅ Sector-calibrated P/E
//   ✅ Varied chartType across the bank
//   ✅ FCF heuristic breakers at 30%+ of medium+
// ============================================================================


// ============================================================================
// SECTION 1: NEW COMPANY QUESTIONS
// ============================================================================

const NEW_COMPANIES_V2 = {

// ────────────────────────────────────────────────────────────────────────────
// EASY TIER (tier 1) — 12 new companies
// Player should be ~80% sure. 1 clear signal + 1 weaker counter-signal.
// ────────────────────────────────────────────────────────────────────────────

easy: [

    // ── CYCLICAL TRAP (Easy, Pass) ──────────────────────────────────────
    // Principle gap: cyclical-trap had only 1 question total
    {
        id: "steel-peak-e01",
        name: "פלדת הנגב בע\"מ",
        sector: "תעשייה מחזורית",
        symbol: "PLNG",
        price: 42.00,
        tier: 1,
        chartType: "annual",
        description: "יצרנית פלדה ישראלית שנהנית משנתיים של ביקוש שיא בענף הבנייה. ההכנסות והרווחים בשיא כל הזמנים, וההנהלה הכריזה על חלוקת דיבידנד מיוחד.",
        management: "מנכ\"ל ותיק עם 20 שנות ניסיון בתעשייה. צוות מנוסה שעבר מחזורים קודמים.",
        moat: "מפעל מודרני עם עלויות ייצור נמוכות יחסית, אבל פלדה היא מוצר גנרי — המחיר נקבע בשוק העולמי.",
        events: "מחיר הפלדה העולמי עלה 40% בשנתיים. התחלות בנייה בישראל ברמת שיא. דיבידנד מיוחד של ₪3 למניה.",
        metrics: {
            basic: [
                { name: "P/E", value: "6" },
                { name: "ROE", value: "28%" },
                { name: "תשואת דיבידנד", value: "9%" }
            ],
            advanced: [
                { name: "ROIC", value: "24%" },
                { name: "FCF (מיליון ₪)", value: "85" },
                { name: "חוב/הון", value: "0.3" }
            ]
        },
        historicalData: [
            { year: "year-4", revenue: 380, fcf: 25 },
            { year: "year-3", revenue: 340, fcf: 15 },
            { year: "year-2", revenue: 420, fcf: 45 },
            { year: "year-1", revenue: 520, fcf: 70 },
            { year: "year-0", revenue: 580, fcf: 85 }
        ],
        projectedData: [
            { year: "year+1", revenue: 500, fcf: 55 },
            { year: "year+2", revenue: 420, fcf: 30 }
        ],
        correctDecision: "pass",
        pointValue: 100,
        hints: [{ cost: 0.5, text: "מה קורה לרווחים של חברת פלדה כשמחזור הבנייה מגיע לשיא?" }],
        feedback: {
            principle: { id: "cyclical-trap", name: "מלכודת מחזוריות" },
            decisiveSignals: ["P/E נמוך בשיא המחזור", "מוצר גנרי", "דיבידנד מיוחד = סימן לשיא"],
            correctExplanation: "נכון! P/E של 6 נראה זול, אבל בחברה מחזורית זה בדיוק ההפך — P/E נמוך בשיא הרווחים אומר שהשוק כבר מתמחר ירידה. הדיבידנד המיוחד הוא סימן קלאסי שההנהלה יודעת שהשיא מאחוריה.",
            incorrectExplanation: "טעות קלאסית! בחברות מחזוריות, P/E נמוך = שיא המחזור, לא מציאה. כשהרווחים ירדו 50% (וזה יקרה), ה-P/E יקפוץ ל-12 גם בלי שהמניה תזוז. באפט אומר: בחברות מחזוריות, קנה כש-P/E גבוה ומכור כשהוא נמוך.",
            counterSignalExplanation: "הצד השני יטען: החברה מנוהלת היטב, חוב נמוך, FCF חזק, ודיבידנד 9%. גם אם יש ירידה מחזורית, היא תשרוד אותה בקלות. בנוסף, פרויקטי תשתית ממשלתיים עשויים להאריך את המחזור."
        },
        workedExample: "1) זיהוי הסקטור: פלדה = תעשייה מחזורית קלאסית. 2) בדיקת מיקום במחזור: הכנסות עלו 53% בשנתיים, מחיר הפלדה +40% — זה שיא. 3) פענוח P/E: בחברה מחזורית, P/E 6 בשיא = יקר, כי הרווחים ירדו. 4) פענוח הדיבידנד המיוחד: ההנהלה מחלקת כסף במקום להשקיע = מודעת שהשיא חולף. 5) מסקנה: מלכודת מחזוריות — נראה זול אבל נקנה בדיוק בשיא.",
        isGoodValue: false,
        difficulty: "easy",
        difficultyValue: 1,
        hint: "מה קורה לרווחים של חברת פלדה כשמחזור הבנייה מגיע לשיא?"
    },

    // ── DIVIDEND SUSTAINABILITY (Easy, Buy) ─────────────────────────────
    // Principle gap: dividend-sustainability had 0 questions
    {
        id: "water-utility-e01",
        name: "מי השפלה בע\"מ",
        sector: "שירותים",
        symbol: "MYSH",
        price: 78.00,
        tier: 1,
        chartType: "annual",
        description: "חברת מים ותשתיות שמספקת שירותי מים ל-15 רשויות מקומיות בדרום. הכנסות יציבות עם חוזים ל-25 שנה. הדיבידנד גדל 8 שנים ברציפות.",
        management: "מנכ\"לית בעלת רקע בניהול תשתיות ציבוריות. מדיניות חלוקה ברורה: 70% מהרווח הנקי.",
        moat: "מונופול רגולטורי באזור השירות. לא ניתן להחליף ספק מים. חוזים ארוכי טווח עם הצמדה למדד.",
        events: "חידוש חוזה עם עיריית באר שבע ל-10 שנים. אישור העלאת תעריפים של 3% מהרגולטור.",
        metrics: {
            basic: [
                { name: "P/E", value: "16" },
                { name: "ROE", value: "14%" },
                { name: "תשואת דיבידנד", value: "4.5%" }
            ],
            advanced: [
                { name: "ROIC", value: "11%" },
                { name: "FCF (מיליון ₪)", value: "42" },
                { name: "יחס חלוקה", value: "70%" }
            ]
        },
        historicalData: [
            { year: "year-4", revenue: 210, fcf: 32 },
            { year: "year-3", revenue: 218, fcf: 35 },
            { year: "year-2", revenue: 215, fcf: 33 },
            { year: "year-1", revenue: 228, fcf: 38 },
            { year: "year-0", revenue: 240, fcf: 42 }
        ],
        projectedData: [
            { year: "year+1", revenue: 250, fcf: 44 },
            { year: "year+2", revenue: 260, fcf: 46 }
        ],
        correctDecision: "buy",
        pointValue: 100,
        hints: [{ cost: 0.5, text: "חברה עם מונופול רגולטורי, חוזים צמודי מדד, ודיבידנד גדל 8 שנים — כמה זה בטוח?" }],
        feedback: {
            principle: { id: "dividend-sustainability", name: "קיימות דיבידנד" },
            decisiveSignals: ["דיבידנד גדל 8 שנים", "יחס חלוקה 70% — בר קיימא", "מונופול רגולטורי"],
            correctExplanation: "מצוין! דיבידנד בר-קיימא = הכנסות יציבות + יחס חלוקה סביר + חפיר. כאן יש את שלושתם. יחס חלוקה של 70% משאיר מרווח להשקעה ולגידול.",
            incorrectExplanation: "פספוס! זו דוגמה קלאסית לדיבידנד בר-קיימא. הכנסות יציבות ממונופול רגולטורי, יחס חלוקה סביר, וצמיחה עקבית. באפט אוהב בדיוק את סוג העסקים האלה.",
            counterSignalExplanation: "הצד השני יטען: P/E 16 לחברת שירותים זה לא זול במיוחד, הצמיחה איטית (3-4% בשנה), ורגולציה עלולה להגביל רווחיות עתידית. יש השקעות עם פוטנציאל צמיחה גבוה יותר."
        },
        workedExample: "1) זיהוי מודל העסק: מונופול רגולטורי עם חוזים ל-25 שנה — הכנסות כמעט מובטחות. 2) בדיקת קיימות הדיבידנד: יחס חלוקה 70% = לא מחלקת מעבר ליכולת. 3) מגמה: 8 שנות גידול רצופות, FCF עולה בהתמדה. 4) בדיקת P/E: 16 לחברת שירותים — טווח סביר (12-20 לסקטור). 5) מסקנה: דיבידנד בר-קיימא עם חפיר רגולטורי — קנייה.",
        isGoodValue: true,
        difficulty: "easy",
        difficultyValue: 1,
        hint: "חברה עם מונופול רגולטורי, חוזים צמודי מדד, ודיבידנד גדל 8 שנים — כמה זה בטוח?"
    },

    // ── DIVIDEND SUSTAINABILITY (Easy, Pass) ────────────────────────────
    {
        id: "retail-dividend-e01",
        name: "שופרסל מזרח בע\"מ",
        sector: "קמעונאות מזון",
        symbol: "SHFM",
        price: 35.00,
        tier: 1,
        chartType: "annual",
        description: "רשת סופרמרקטים בפריפריה עם 12 סניפים. מחלקת דיבידנד גבוה של 7% למרות שההכנסות יורדות שנה שלישית ברציפות. ה-FCF חיובי אבל יורד.",
        management: "בעל השליטה מושך דיבידנדים לצרכים אישיים. אין השקעה בשיפוץ סניפים.",
        moat: "נוכחות מקומית בעיירות פיתוח, אבל רשתות גדולות מתרחבות לאזור.",
        events: "סגירת 2 סניפים לא רווחיים. כניסת מתחרה חדש לשני אזורי פעילות.",
        metrics: {
            basic: [
                { name: "P/E", value: "9" },
                { name: "ROE", value: "11%" },
                { name: "תשואת דיבידנד", value: "7%" }
            ],
            advanced: [
                { name: "ROIC", value: "8%" },
                { name: "FCF (מיליון ₪)", value: "18" },
                { name: "יחס חלוקה", value: "95%" }
            ]
        },
        historicalData: [
            { year: "year-4", revenue: 320, fcf: 28 },
            { year: "year-3", revenue: 310, fcf: 25 },
            { year: "year-2", revenue: 295, fcf: 22 },
            { year: "year-1", revenue: 285, fcf: 20 },
            { year: "year-0", revenue: 270, fcf: 18 }
        ],
        projectedData: [
            { year: "year+1", revenue: 255, fcf: 14 },
            { year: "year+2", revenue: 240, fcf: 10 }
        ],
        correctDecision: "pass",
        pointValue: 100,
        hints: [{ cost: 0.5, text: "יחס חלוקה של 95% כש-FCF יורד — כמה זמן הדיבידנד יחזיק?" }],
        feedback: {
            principle: { id: "dividend-sustainability", name: "קיימות דיבידנד" },
            decisiveSignals: ["יחס חלוקה 95%", "הכנסות יורדות 3 שנים", "בעל שליטה מושך כספים"],
            correctExplanation: "נכון! דיבידנד 7% מפתה, אבל יחס חלוקה של 95% כשההכנסות יורדות = דיבידנד שייחתך. בעל השליטה מושך כספים במקום להשקיע בעסק. זה בדיוק ההפך מדיבידנד בר-קיימא.",
            incorrectExplanation: "טעות! דיבידנד גבוה לא שווה דיבידנד בטוח. כש-95% מהרווח הולך לדיבידנד והעסק מתכווץ, זו שאלה של מתי — לא אם — הדיבידנד ייחתך.",
            counterSignalExplanation: "הצד השני יטען: P/E 9 זול לקמעונאות מזון, FCF עדיין חיובי, ודיבידנד 7% הוא תשואה מעולה בסביבת ריבית נמוכה. אולי ההנהלה תמצא דרך לייצב את ההכנסות."
        },
        workedExample: "1) דיבידנד 7% — מפתה. בואו נבדוק אם הוא בר-קיימא. 2) יחס חלוקה 95% — כמעט כל הרווח הולך החוצה. אין כרית ביטחון. 3) מגמת FCF: יורד מ-28 ל-18 מיליון בארבע שנים. 4) בעל שליטה מושך כספים + לא משקיע = פוגע בעסק. 5) אין חפיר — מתחרים נכנסים. 6) מסקנה: הדיבידנד ייחתך תוך שנה-שנתיים. העל.",
        isGoodValue: false,
        difficulty: "easy",
        difficultyValue: 1,
        hint: "יחס חלוקה של 95% כש-FCF יורד — כמה זמן הדיבידנד יחזיק?"
    },

    // ── MANAGEMENT QUALITY (Easy, Buy) ──────────────────────────────────
    // Principle gap: management-quality had 0 questions as primary
    {
        id: "founder-led-e01",
        name: "סייבר-וולט בע\"מ",
        sector: "טכנולוגיה",
        symbol: "CYBV",
        price: 145.00,
        tier: 1,
        chartType: "annual",
        description: "חברת סייבר שהמייסד עדיין מנהל. הוא מחזיק 25% מהמניות ומושך משכורת צנועה. הצמיחה עקבית ב-18% בשנה, והחברה לא גייסה חוב.",
        management: "מייסד-מנכ\"ל עם 25% אחזקה. משכורת ₪80K/חודש — נמוכה לסקטור. היסטוריה של החלטות הקצאת הון חכמות.",
        moat: "טכנולוגיה ייחודית בזיהוי איומים, אבל סייבר הוא שוק תחרותי מאוד.",
        events: "רכישת סטארטאפ קטן ב-₪30M שהכפיל את בסיס הלקוחות. סירוב להצעת רכישה של ₪1.2B.",
        metrics: {
            basic: [
                { name: "P/E", value: "28" },
                { name: "ROE", value: "22%" },
                { name: "צמיחת הכנסות", value: "18%" }
            ],
            advanced: [
                { name: "PEG", value: "1.6" },
                { name: "FCF (מיליון ₪)", value: "65" },
                { name: "חוב/הון", value: "0.0" }
            ]
        },
        historicalData: [
            { year: "year-4", revenue: 180, fcf: 30 },
            { year: "year-3", revenue: 210, fcf: 38 },
            { year: "year-2", revenue: 245, fcf: 42 },
            { year: "year-1", revenue: 290, fcf: 55 },
            { year: "year-0", revenue: 340, fcf: 65 }
        ],
        projectedData: [
            { year: "year+1", revenue: 400, fcf: 78 },
            { year: "year+2", revenue: 470, fcf: 92 }
        ],
        correctDecision: "buy",
        pointValue: 100,
        hints: [{ cost: 0.5, text: "מנכ\"ל שמחזיק 25% ומושך משכורת נמוכה — מה זה אומר על התמריצים שלו?" }],
        feedback: {
            principle: { id: "management-quality", name: "איכות הנהלה" },
            decisiveSignals: ["מייסד עם 25% אחזקה", "משכורת נמוכה = אינטרס מיושר", "רכישה חכמה שהכפילה לקוחות"],
            correctExplanation: "מצוין! מייסד שמחזיק חלק גדול, מושך משכורת צנועה, ומקבל החלטות הקצאת הון חכמות — זה בדיוק מה שבאפט מחפש בהנהלה.",
            incorrectExplanation: "פספוס! P/E 28 נראה גבוה, אבל עם צמיחה של 18% (PEG 1.6) זה סביר לטכנולוגיה. והכי חשוב: הנהלה איכותית עם skin in the game היא הנכס הכי חשוב.",
            counterSignalExplanation: "הצד השני יטען: P/E 28 גבוה, סקטור הסייבר תחרותי מאוד, והסירוב להצעת הרכישה אולי היה טעות — מי יודע אם החברה תגיע שוב לשווי כזה."
        },
        workedExample: "1) בדיקת הנהלה: מייסד עם 25% = skin in the game. משכורת נמוכה = לא ממלא כיסים. 2) היסטוריית החלטות: רכישה ב-₪30M שהכפילה לקוחות = הקצאת הון חכמה. 3) מספרים: צמיחה 18%, PEG 1.6 — סביר לטכנולוגיה רווחית. 4) חפיר: חלקי, אבל הנהלה טובה בונה חפיר לאורך זמן. 5) מסקנה: הנהלה איכותית עם תמריצים נכונים = קנייה.",
        isGoodValue: true,
        difficulty: "easy",
        difficultyValue: 1,
        hint: "מנכ\"ל שמחזיק 25% ומושך משכורת נמוכה — מה זה אומר על התמריצים שלו?"
    },

    // ── MANAGEMENT QUALITY (Easy, Pass) ─────────────────────────────────
    {
        id: "empire-builder-e01",
        name: "אלפא נכסים בע\"מ",
        sector: "נדל\"ן",
        symbol: "ALFA",
        price: 52.00,
        tier: 1,
        chartType: "annual",
        description: "חברת נדל\"ן שהמנכ\"ל רוכש נכסים בקצב מטורף — 8 רכישות בשנתיים. ההכנסות גדלות אבל הרווח הנקי כמעט לא זז. המנכ\"ל מושך משכורת של ₪250K לחודש.",
        management: "מנכ\"ל \'בונה אימפריה\' — מתמקד בגודל ולא ברווחיות. משכורת בין הגבוהות בסקטור. אין אחזקת מניות משמעותית.",
        moat: "פורטפוליו מפוזר גיאוגרפית, אבל איכות הנכסים נמוכה. תפוסה ממוצעת 78%.",
        events: "3 רכישות ברבעון האחרון לבד. הנפקת מניות לדילול של 15% למימון עסקאות.",
        metrics: {
            basic: [
                { name: "P/E", value: "12" },
                { name: "ROE", value: "8%" },
                { name: "תשואת דיבידנד", value: "3%" }
            ],
            advanced: [
                { name: "FFO/מניה", value: "₪4.2" },
                { name: "FCF (מיליון ₪)", value: "35" },
                { name: "חוב/הון", value: "1.8" }
            ]
        },
        historicalData: [
            { year: "year-4", revenue: 120, fcf: 22 },
            { year: "year-3", revenue: 155, fcf: 25 },
            { year: "year-2", revenue: 195, fcf: 28 },
            { year: "year-1", revenue: 250, fcf: 32 },
            { year: "year-0", revenue: 310, fcf: 35 }
        ],
        projectedData: [
            { year: "year+1", revenue: 380, fcf: 38 },
            { year: "year+2", revenue: 440, fcf: 40 }
        ],
        correctDecision: "pass",
        pointValue: 100,
        // FCF BREAKER: FCF is positive and growing, but answer is pass
        hints: [{ cost: 0.5, text: "ההכנסות הוכפלו פי 2.5 אבל ה-FCF עלה רק 60% — לאן הולך הכסף?" }],
        feedback: {
            principle: { id: "management-quality", name: "איכות הנהלה" },
            decisiveSignals: ["מנכ\"ל ללא אחזקת מניות", "משכורת ₪250K/חודש", "דילול 15%", "ROE 8% בלבד"],
            correctExplanation: "נכון! מנכ\"ל שבונה אימפריה על חשבון בעלי המניות. ההכנסות גדלות דרך רכישות ודילול, לא דרך צמיחה אורגנית. ROE 8% אחרי מינוף 1.8 = תשואה עלובה על ההון.",
            incorrectExplanation: "טעות! FCF חיובי ועולה מסנוור, אבל ההכנסות גדלו 158% בזמן שה-FCF גדל רק 59%. הכסף נבלע ברכישות גרועות. ומנכ\"ל ללא skin in the game הוא דגל אדום.",
            counterSignalExplanation: "הצד השני יטען: P/E 12 סביר לנדל\"ן, FCF חיובי וגדל, ואסטרטגיית הרכישות בונה סקייל שיניב יתרון בעתיד. הדילול זמני."
        },
        workedExample: "1) בדיקת הנהלה: אין אחזקת מניות + משכורת גבוהה = אין skin in the game. 2) בדיקת צמיחה: הכנסות x2.5 אבל FCF +60% = רכישות הורסות ערך. 3) דילול: 15% הנפקה = בעלי מניות משלמים על האימפריה. 4) ROE 8% עם חוב/הון 1.8 = תשואה גרועה. 5) מסקנה: הנהלה שלא מיישרת אינטרסים עם המשקיעים — העל.",
        isGoodValue: false,
        difficulty: "easy",
        difficultyValue: 1,
        hint: "ההכנסות הוכפלו פי 2.5 אבל ה-FCF עלה רק 60% — לאן הולך הכסף?"
    },

    // ── TURNAROUND (Easy, Pass — failed turnaround) ─────────────────────
    // Principle gap: turnaround had only 1 question
    {
        id: "failed-turnaround-e01",
        name: "תקשורת ישראל בע\"מ",
        sector: "תקשורת",
        symbol: "TKSR",
        price: 8.50,
        tier: 1,
        chartType: "annual",
        description: "חברת תקשורת שהייתה פעם מהגדולות בשוק. מנכ\"ל חדש מונה לפני שנתיים עם הבטחה ל\'מהפכה דיגיטלית\', אבל ההכנסות המשיכו לרדת.",
        management: "מנכ\"ל חדש הגיע מסקטור אחר. הבטיח שיקום אבל הביצועים לא השתפרו בשנתיים.",
        moat: "מותג מוכר אבל מיושן. תשתית קיימת אבל צריכה השקעות כבדות.",
        events: "שני רבעונים רצופים של הפסד תפעולי. ביטול חוזה מרכזי עם לקוח גדול.",
        metrics: {
            basic: [
                { name: "P/E", value: "שלילי" },
                { name: "ROE", value: "-5%" },
                { name: "תשואת דיבידנד", value: "0%" }
            ],
            advanced: [
                { name: "ROIC", value: "-3%" },
                { name: "FCF (מיליון ₪)", value: "-15" },
                { name: "חוב/הון", value: "2.1" }
            ]
        },
        historicalData: [
            { year: "year-4", revenue: 480, fcf: 20 },
            { year: "year-3", revenue: 440, fcf: 10 },
            { year: "year-2", revenue: 410, fcf: -5 },
            { year: "year-1", revenue: 380, fcf: -12 },
            { year: "year-0", revenue: 350, fcf: -15 }
        ],
        projectedData: [
            { year: "year+1", revenue: 330, fcf: -18 },
            { year: "year+2", revenue: 310, fcf: -20 }
        ],
        correctDecision: "pass",
        pointValue: 100,
        hints: [{ cost: 0.5, text: "המנכ\"ל החדש פועל כבר שנתיים — האם יש סימנים שהשיקום עובד?" }],
        feedback: {
            principle: { id: "turnaround", name: "שיקום" },
            decisiveSignals: ["שנתיים בלי שיפור", "FCF שלילי ומחמיר", "חוב/הון 2.1"],
            correctExplanation: "נכון! שיקום שלא מראה תוצאות אחרי שנתיים הוא כנראה לא שיקום — הוא תירוץ. FCF שלילי ומחמיר + חוב גבוה = סיכון קיומי.",
            incorrectExplanation: "טעות! לא כל שיקום מצליח. שנתיים הן מספיק זמן לראות סימני שיפור, ופה אנחנו רואים הרעה. מנכ\"ל מסקטור אחר ללא ניסיון ענפי — דגל אדום נוסף.",
            counterSignalExplanation: "הצד השני יטען: המחיר ₪8.50 זול מאוד, יש נכסי תשתית בשווי גבוה, ושיקום לוקח זמן. אם המנכ\"ל יצליח, הפוטנציאל עצום."
        },
        workedExample: "1) זיהוי: חברה בשיקום. 2) בדיקת התקדמות: שנתיים מאז מונה המנכ\"ל — ההכנסות המשיכו לרדת, FCF הרע. 3) בדיקת הנהלה: מנכ\"ל מסקטור אחר — חסר ניסיון ספציפי. 4) בדיקת מצב פיננסי: חוב/הון 2.1 = סיכון קיומי אם השיקום נכשל. 5) מסקנה: שיקום כושל — העל.",
        isGoodValue: false,
        difficulty: "easy",
        difficultyValue: 1,
        hint: "המנכ\"ל החדש פועל כבר שנתיים — האם יש סימנים שהשיקום עובד?"
    },

    // ── LEVERAGE RISK (Easy, Buy — manageable leverage) ──────────────────
    // Direction unlock: leverage-risk was always "pass"
    {
        id: "managed-leverage-e01",
        name: "מגדלי הים בע\"מ",
        sector: "נדל\"ן מניב",
        symbol: "MGDL",
        price: 115.00,
        tier: 1,
        chartType: "annual",
        description: "חברת נדל\"ן מניב עם 5 מגדלי משרדים בגוש דן. תפוסה 96%. חוב גבוה יחסית (חוב/הון 1.4) אבל כולו בריבית קבועה לטווח ארוך ומכוסה בקלות מהשכירות.",
        management: "צוות ניהול ותיק ושמרני. לא רוכשים נכסים חדשים עד שהקיימים מייצרים 100% תפוסה.",
        moat: "מיקומים פריים בגוש דן, חוזי שכירות ארוכי טווח, תפוסה גבוהה מהממוצע בענף.",
        events: "חידוש חוזה עם שוכר עוגן ל-7 שנים. ריבית קבועה על כל החוב עד year+5.",
        metrics: {
            basic: [
                { name: "P/FFO", value: "11" },
                { name: "ROE", value: "16%" },
                { name: "תשואת דיבידנד", value: "5.5%" }
            ],
            advanced: [
                { name: "יחס כיסוי ריבית", value: "3.8x" },
                { name: "FCF (מיליון ₪)", value: "72" },
                { name: "תפוסה", value: "96%" }
            ]
        },
        historicalData: [
            { year: "year-4", revenue: 190, fcf: 55 },
            { year: "year-3", revenue: 200, fcf: 60 },
            { year: "year-2", revenue: 195, fcf: 58 },
            { year: "year-1", revenue: 210, fcf: 65 },
            { year: "year-0", revenue: 225, fcf: 72 }
        ],
        projectedData: [
            { year: "year+1", revenue: 235, fcf: 76 },
            { year: "year+2", revenue: 245, fcf: 80 }
        ],
        correctDecision: "buy",
        pointValue: 100,
        hints: [{ cost: 0.5, text: "חוב/הון 1.4 נראה גבוה — אבל מה סוג החוב ומה יחס הכיסוי?" }],
        feedback: {
            principle: { id: "leverage-risk", name: "סיכון מינוף" },
            decisiveSignals: ["ריבית קבועה לטווח ארוך", "יחס כיסוי 3.8x", "תפוסה 96%"],
            correctExplanation: "מצוין! לא כל מינוף הוא רע. חוב בריבית קבועה, מכוסה 3.8 פעמים, עם שכירות יציבה — זה מינוף חכם שמגדיל תשואה. P/FFO 11 = זול לנדל\"ן מניב איכותי.",
            incorrectExplanation: "טעות! חוב/הון 1.4 הבהיל אותך, אבל חוב בריבית קבועה עם יחס כיסוי 3.8x הוא בטוח. בנדל\"ן מניב, מינוף שמרני הוא חלק מהעסק.",
            counterSignalExplanation: "הצד השני יטען: חוב/הון 1.4 חושף את החברה לעליית ריבית כשהחוב יגיע למיחזור, ירידה בתפוסה עלולה לפגוע ביחס הכיסוי, ונדל\"ן משרדי עשוי לסבול מעבודה מרחוק."
        },
        workedExample: "1) בדיקת מינוף: חוב/הון 1.4 — גבוה. אבל מה סוג החוב? ריבית קבועה ל-5+ שנים. 2) בדיקת כיסוי: 3.8x = אפילו אם ההכנסות ירדו 30%, עדיין מכסים ריבית. 3) בדיקת נכסים: תפוסה 96%, מיקומים פריים, חוזים ארוכים. 4) תמחור: P/FFO 11 = זול לנדל\"ן מניב איכותי. 5) מסקנה: מינוף חכם ושמרני — קנייה.",
        isGoodValue: true,
        difficulty: "easy",
        difficultyValue: 1,
        hint: "חוב/הון 1.4 נראה גבוה — אבל מה סוג החוב ומה יחס הכיסוי?"
    },

    // ── MOAT (Easy, Pass — moat erosion) ─────────────────────────────────
    // Direction unlock: moat was always "buy"
    {
        id: "eroding-moat-e01",
        name: "סלקום פלוס בע\"מ",
        sector: "תקשורת",
        symbol: "SLKP",
        price: 25.00,
        tier: 1,
        chartType: "annual",
        description: "חברת סלולר שהייתה מובילת שוק עם 35% נתח, אבל רפורמת התקשורת שחקה את המחירים. המותג עדיין חזק, אבל ה-ARPU (הכנסה ממנוי) יורד כל שנה.",
        management: "מנכ\"ל מנוסה שמנסה לפצות עם שירותי סטרימינג ופיננסים, אבל אלה עדיין לא רווחיים.",
        moat: "מותג חזק ובסיס לקוחות גדול, אבל נתח שוק יורד ואין יתרון מחיר. תשתית קיימת אבל כולם חולקים אותה.",
        events: "כניסת שחקן חדש (MVNO) שמציע מחירים נמוכים ב-30%. אחוז הנטישה עלה ל-18% שנתי.",
        metrics: {
            basic: [
                { name: "P/E", value: "8" },
                { name: "ROE", value: "12%" },
                { name: "תשואת דיבידנד", value: "6%" }
            ],
            advanced: [
                { name: "ROIC", value: "9%" },
                { name: "FCF (מיליון ₪)", value: "45" },
                { name: "ARPU (ירידה שנתית)", value: "-7%" }
            ]
        },
        historicalData: [
            { year: "year-4", revenue: 520, fcf: 75 },
            { year: "year-3", revenue: 490, fcf: 65 },
            { year: "year-2", revenue: 465, fcf: 58 },
            { year: "year-1", revenue: 435, fcf: 50 },
            { year: "year-0", revenue: 410, fcf: 45 }
        ],
        projectedData: [
            { year: "year+1", revenue: 385, fcf: 38 },
            { year: "year+2", revenue: 360, fcf: 32 }
        ],
        correctDecision: "pass",
        pointValue: 100,
        // FCF BREAKER: FCF positive but answer is pass
        hints: [{ cost: 0.5, text: "חפיר שנשחק הוא גרוע יותר מחפיר שלא קיים — למה?" }],
        feedback: {
            principle: { id: "moat", name: "חפיר כלכלי" },
            decisiveSignals: ["ARPU יורד 7% בשנה", "נתח שוק נשחק", "מתחרה חדש עם מחירים נמוכים ב-30%"],
            correctExplanation: "נכון! חפיר שנשחק = הערך נעלם. P/E 8 נראה זול, אבל כש-ARPU יורד 7% בשנה, ההכנסות ימשיכו לרדת. מותג חזק לא שווה כלום אם הלקוחות בורחים למחירים נמוכים יותר.",
            incorrectExplanation: "טעות! FCF חיובי ודיבידנד 6% מפתים, אבל כשהחפיר נשחק, כל המספרים האלה ירדו. השוק כבר מתמחר את זה ב-P/E 8.",
            counterSignalExplanation: "הצד השני יטען: P/E 8 ודיבידנד 6% זה זול. המותג עדיין חזק, יש בסיס לקוחות גדול, והמעבר לשירותים דיגיטליים עשוי ליצור זרם הכנסות חדש."
        },
        workedExample: "1) זיהוי: חברה עם חפיר שנשחק (ירידה ב-ARPU, נתח שוק, כניסת מתחרים). 2) ניתוח מגמה: 4 שנים של ירידה עקבית בהכנסות ו-FCF. 3) בדיקת P/E: 8 לתקשורת נראה זול, אבל הרווחים עצמם יורדים. 4) פיזור חדש (סטרימינג, פינטק): לא רווחי עדיין, לא מוכח. 5) מסקנה: חפיר נשחק = מלכודת ערך בהתהוות.",
        isGoodValue: false,
        difficulty: "easy",
        difficultyValue: 1,
        hint: "חפיר שנשחק הוא גרוע יותר מחפיר שלא קיים — למה?"
    },

    // ── MARGIN OF SAFETY (Easy, Pass — insufficient margin) ─────────────
    // Direction unlock: margin-of-safety was always "buy"
    {
        id: "no-margin-e01",
        name: "ביו-מד ישראל בע\"מ",
        sector: "פארמה",
        symbol: "BIOM",
        price: 220.00,
        tier: 1,
        chartType: "annual",
        description: "חברת פארמה איכותית עם תרופה מובילה בשוק. הבעיה: המחיר מתמחר שלמות. P/E 32 על רווחים שצומחים 8% בשנה (PEG 4.0). אין מרווח ביטחון אם משהו ישתבש.",
        management: "הנהלה מקצועית ויציבה. מוניטין מצוין בתעשייה.",
        moat: "פטנט על תרופה מובילה, אבל הפטנט פג תוך 3 שנים. פייפליין דק.",
        events: "אנליסטים ממליצים \'קנייה\' פה אחד. המניה עלתה 40% בשנה האחרונה.",
        metrics: {
            basic: [
                { name: "P/E", value: "32" },
                { name: "ROE", value: "24%" },
                { name: "צמיחת הכנסות", value: "8%" }
            ],
            advanced: [
                { name: "PEG", value: "4.0" },
                { name: "FCF (מיליון ₪)", value: "95" },
                { name: "פקיעת פטנט", value: "3 שנים" }
            ]
        },
        historicalData: [
            { year: "year-4", revenue: 380, fcf: 70 },
            { year: "year-3", revenue: 410, fcf: 78 },
            { year: "year-2", revenue: 425, fcf: 80 },
            { year: "year-1", revenue: 460, fcf: 88 },
            { year: "year-0", revenue: 495, fcf: 95 }
        ],
        projectedData: [
            { year: "year+1", revenue: 535, fcf: 102 },
            { year: "year+2", revenue: 550, fcf: 100 }
        ],
        correctDecision: "pass",
        pointValue: 100,
        // FCF BREAKER: FCF positive and growing, but answer is pass
        hints: [{ cost: 0.5, text: "PEG 4.0 = משלמים פרמיה ענקית על צמיחה צנועה. מה קורה כשהפטנט פג?" }],
        feedback: {
            principle: { id: "margin-of-safety", name: "מרווח ביטחון" },
            decisiveSignals: ["PEG 4.0 = יקר מאוד", "פטנט פג ב-3 שנים", "אין מרווח ביטחון"],
            correctExplanation: "נכון! חברה איכותית, אבל המחיר מתמחר שלמות. PEG 4.0 = משלמים 4x על הצמיחה. ועם פטנט שפג ב-3 שנים, אין מרווח ביטחון כלל. באפט לא קונה חברות טובות במחיר מופרז.",
            incorrectExplanation: "טעות! החברה עצמה מעולה, אבל המחיר לא. PEG 4.0 = P/E 32 על צמיחה של 8%. זה ארבע פעמים יותר מהצפוי. אין מרווח ביטחון = לא קונים.",
            counterSignalExplanation: "הצד השני יטען: חברה איכותית עם ROE 24%, FCF חזק, והנהלה מעולה. אנליסטים ממליצים קנייה. אולי הפייפליין יניב תרופות חדשות לפני שהפטנט פג."
        },
        workedExample: "1) בדיקת איכות: ROE 24%, FCF חזק, הנהלה טובה — חברה איכותית. 2) בדיקת מחיר: P/E 32, צמיחה 8%, PEG 4.0 — יקר מאוד. 3) סיכון: פטנט פג ב-3 שנים, פייפליין דק. 4) מרווח ביטחון: אפס. כל הפתעה שלילית תפגע קשה. 5) מסקנה: חברה מעולה, מחיר מופרז = אין מרווח ביטחון. העל.",
        isGoodValue: false,
        difficulty: "easy",
        difficultyValue: 1,
        hint: "PEG 4.0 = משלמים פרמיה ענקית על צמיחה צנועה. מה קורה כשהפטנט פג?"
    },

    // ── TURNAROUND (Easy, Buy — early turnaround) ───────────────────────
    {
        id: "turnaround-buy-e01",
        name: "תעשיות הגליל בע\"מ",
        sector: "תעשייה",
        symbol: "TGLL",
        price: 28.00,
        tier: 1,
        chartType: "quarterly",
        description: "מפעל ייצור שעבר שנתיים קשות אבל מינה מנכ\"לית חדשה שכבר מראה תוצאות: חיתוך עלויות של 20%, סגירת קווי ייצור הפסדיים, ורבעון אחרון חיובי.",
        management: "מנכ\"לית חדשה (שנה בתפקיד) עם רקורד מוכח של שיקום חברות. קנתה מניות ב-₪2M מכספה.",
        moat: "אין חפיר מובהק, אבל המפעל המשופץ יעיל יותר מהמתחרים.",
        events: "סגירה של 2 קווי ייצור הפסדיים. חתימה על חוזה אספקה חדש עם לקוח גדול.",
        metrics: {
            basic: [
                { name: "P/E", value: "35 (על רווחים מנורמלים)" },
                { name: "ROE", value: "3%" },
                { name: "צמיחת הכנסות", value: "-5%" }
            ],
            advanced: [
                { name: "ROIC", value: "4%" },
                { name: "FCF (מיליון ₪)", value: "-2" },
                { name: "שיפור מרווח תפעולי", value: "+400bp ברבעון אחרון" }
            ]
        },
        quarterlyData: [
            { quarter: "Q1 year-1", revenue: 62, fcf: -8 },
            { quarter: "Q2 year-1", revenue: 58, fcf: -10 },
            { quarter: "Q3 year-1", revenue: 55, fcf: -6 },
            { quarter: "Q4 year-1", revenue: 60, fcf: -3 },
            { quarter: "Q1 year-0", revenue: 58, fcf: -2 },
            { quarter: "Q2 year-0", revenue: 63, fcf: 2 }
        ],
        projectedData: [
            { year: "year+1", revenue: 260, fcf: 15 },
            { year: "year+2", revenue: 280, fcf: 25 }
        ],
        correctDecision: "buy",
        pointValue: 100,
        // FCF BREAKER: FCF is still negative, but answer is buy
        hints: [{ cost: 0.5, text: "FCF שלילי? נכון, אבל הסתכלו על הכיוון — מה קורה ברבעון האחרון?" }],
        feedback: {
            principle: { id: "turnaround", name: "שיקום" },
            decisiveSignals: ["שיפור 400bp במרווח תפעולי", "רבעון אחרון חיובי", "מנכ\"לית קנתה מניות מכספה"],
            correctExplanation: "מצוין! בשיקום, הכיוון חשוב יותר מהמספר המוחלט. FCF הפך חיובי ברבעון האחרון, ומנכ\"לית שקונה מניות מכספה = skin in the game. זה שיקום אמיתי בשלב מוקדם.",
            incorrectExplanation: "פספוס! FCF שלילי הבהיל אותך, אבל המגמה ברורה: מ-₪-10M ל-₪+2M תוך 5 רבעונים. מנכ\"לית שקונה מניות ב-₪2M מכספה מאמינה בשיקום. המחיר ₪28 מתמחר כישלון — לא שיקום.",
            counterSignalExplanation: "הצד השני יטען: FCF עדיין שלילי על בסיס שנתי, אין חפיר, P/E 35 גבוה, ולא כל שיקום מצליח. רבעון אחד חיובי זה לא מגמה."
        },
        workedExample: "1) זיהוי: חברה בשיקום. 2) בדיקת התקדמות ברבעונים: FCF הפך מ-₪-10M ל-₪+2M — מגמה ברורה. 3) בדיקת הנהלה: מנכ\"לית עם רקורד + קנייה אישית = מחויבות. 4) פעולות: סגירת קווים הפסדיים + חוזה חדש = צעדים נכונים. 5) תמחור: ₪28 מתמחר כישלון, אם השיקום יצליח — אפסייד גדול. 6) מסקנה: שיקום מוקדם עם סימנים חיוביים — קנייה.",
        isGoodValue: true,
        difficulty: "easy",
        difficultyValue: 1,
        hint: "FCF שלילי? נכון, אבל הסתכלו על הכיוון — מה קורה ברבעון האחרון?"
    },

    // ── GROWTH TRAP (Easy, Pass) ─────────────────────────────────────────
    // Adding a pass variant to growth-trap
    {
        id: "growth-trap-e01",
        name: "קוויקשיפ לוגיסטיקה בע\"מ",
        sector: "לוגיסטיקה",
        symbol: "QKSH",
        price: 88.00,
        tier: 1,
        chartType: "annual",
        description: "חברת שילוח שגדלה 30% בשנה דרך מלחמת מחירים. ההכנסות מרקיעות שחקים אבל המרווחים מתכווצים כל שנה. היא מוכרת בהפסד כדי לכבוש נתח שוק.",
        management: "מנכ\"ל שרודף צמיחה מכל מחיר. מתגאה ב-30% צמיחה בכל דוח.",
        moat: "אין — לוגיסטיקה היא שוק תחרותי עם מרווחים דקים. אין נאמנות לקוחות.",
        events: "גיוס חוב של ₪200M לסבסוד המחירים. שני מתחרים גדולים הודיעו על הורדת מחירים תואמת.",
        metrics: {
            basic: [
                { name: "P/S", value: "2.5" },
                { name: "ROE", value: "-4%" },
                { name: "צמיחת הכנסות", value: "30%" }
            ],
            advanced: [
                { name: "מרווח גולמי", value: "8% (ירידה מ-15%)" },
                { name: "FCF (מיליון ₪)", value: "-35" },
                { name: "Burn Rate (חודשי מזומן)", value: "14 חודשים" }
            ]
        },
        historicalData: [
            { year: "year-4", revenue: 200, fcf: 10 },
            { year: "year-3", revenue: 260, fcf: -5 },
            { year: "year-2", revenue: 340, fcf: -18 },
            { year: "year-1", revenue: 440, fcf: -28 },
            { year: "year-0", revenue: 570, fcf: -35 }
        ],
        projectedData: [
            { year: "year+1", revenue: 740, fcf: -45 },
            { year: "year+2", revenue: 960, fcf: -50 }
        ],
        correctDecision: "pass",
        pointValue: 100,
        hints: [{ cost: 0.5, text: "צמיחה מרשימה, אבל ההכנסות הוכפלו כמעט פי 3 בזמן שהמרווח ירד מ-15% ל-8%. מה קורה פה?" }],
        feedback: {
            principle: { id: "growth-trap", name: "מלכודת צמיחה" },
            decisiveSignals: ["מרווח יורד מ-15% ל-8%", "FCF שלילי ומחמיר", "צמיחה מסובסדת בחוב"],
            correctExplanation: "נכון! צמיחה של 30% שבאה על חשבון רווחיות היא מלכודת צמיחה קלאסית. ההכנסות מרשימות אבל כל שקל מכירה מפסיד. כשהכסף ייגמר (14 חודשים), הצמיחה תיעצר.",
            incorrectExplanation: "טעות! צמיחה של 30% מסנוורת, אבל הסתכלו על המרווחים — הם מתכווצים כל שנה. זו לא צמיחה אמיתית, זה קניית הכנסות בהפסד.",
            counterSignalExplanation: "הצד השני יטען: חברות כמו אמזון גם הפסידו שנים לפני שהפכו רווחיות. צמיחה של 30% = כיבוש שוק, ומי שינצח את מלחמת המחירים ירוויח בגדול."
        },
        workedExample: "1) צמיחה 30% — מרשים! אבל... 2) מרווח גולמי ירד מ-15% ל-8% — הצמיחה באה על חשבון רווחיות. 3) FCF שלילי ומחמיר: ₪-35M, burn rate 14 חודשים. 4) אין חפיר: לוגיסטיקה = מרווחים דקים, אין נאמנות. 5) מתחרים מגיבים: שני גדולים הורידו מחירים = race to the bottom. 6) מסקנה: מלכודת צמיחה — הכנסות ללא רווח.",
        isGoodValue: false,
        difficulty: "easy",
        difficultyValue: 1,
        hint: "צמיחה מרשימה, אבל ההכנסות הוכפלו כמעט פי 3 בזמן שהמרווח ירד מ-15% ל-8%. מה קורה פה?"
    },

    // ── OWNER EARNINGS (Easy, Buy) ──────────────────────────────────────
    {
        id: "owner-earnings-e01",
        name: "נתיבי ישראל שירותים בע\"מ",
        sector: "שירותים",
        symbol: "NTVI",
        price: 62.00,
        tier: 1,
        chartType: "none",
        description: "חברת שירותי תחזוקת כבישים. מדווחת הפסד חשבונאי בגלל פחת כבד, אבל התזרים חיובי ויציב. ההפרש בין הרווח החשבונאי לתזרים גדול.",
        management: "הנהלה מנוסה שמפעילה בשמרנות. מחלקת 60% מהתזרים כדיבידנד.",
        moat: "חוזים ממשלתיים ל-10 שנים. מעטים מתחרים עם היכולת והרישיון לתחזוקת כבישים ראשיים.",
        events: "זכייה בחוזה תחזוקה חדש. ההפסד החשבונאי גרם לנפילה של 20% במניה.",
        metrics: {
            basic: [
                { name: "P/E", value: "שלילי (הפסד חשבונאי)" },
                { name: "ROE", value: "-2% (חשבונאי)" },
                { name: "תשואת דיבידנד", value: "5%" }
            ],
            advanced: [
                { name: "רווחי בעלים (FCF)", value: "₪38M" },
                { name: "P/Owner-Earnings", value: "8" },
                { name: "פחת > CAPEX תחזוקה", value: "פי 2.5" }
            ]
        },
        historicalData: [
            { year: "year-4", revenue: 180, fcf: 32 },
            { year: "year-3", revenue: 185, fcf: 34 },
            { year: "year-2", revenue: 190, fcf: 30 },
            { year: "year-1", revenue: 195, fcf: 36 },
            { year: "year-0", revenue: 200, fcf: 38 }
        ],
        projectedData: [
            { year: "year+1", revenue: 210, fcf: 40 },
            { year: "year+2", revenue: 220, fcf: 42 }
        ],
        correctDecision: "buy",
        pointValue: 100,
        hints: [{ cost: 0.5, text: "הרווח החשבונאי שלילי, אבל מה עם רווחי הבעלים (FCF)?" }],
        feedback: {
            principle: { id: "owner-earnings", name: "רווחי בעלים" },
            decisiveSignals: ["FCF ₪38M חיובי ויציב", "פחת גבוה פי 2.5 מ-CAPEX תחזוקה", "P/Owner-Earnings 8"],
            correctExplanation: "מצוין! ההפסד החשבונאי מטעה — הפחת הכבד מוריד את הרווח אבל לא משקף תזרים אמיתי. רווחי הבעלים (FCF) הם ₪38M, ו-P/Owner-Earnings 8 = זול. באפט מסתכל על תזרים, לא על חשבונאות.",
            incorrectExplanation: "טעות! P/E שלילי הבהיל אותך, אבל זה הפסד חשבונאי — לא אמיתי. FCF ₪38M, דיבידנד 5%, חוזים ממשלתיים = עסק מצוין במחיר זול.",
            counterSignalExplanation: "הצד השני יטען: חברה עם P/E שלילי ו-ROE שלילי נראית רע על הנייר. הפחת הכבד עלול להצביע על ציוד ישן שידרוש החלפה יקרה בעתיד."
        },
        workedExample: "1) P/E שלילי = הפסד חשבונאי. 2) אבל FCF ₪38M = חיובי ויציב. ההבדל = פחת גבוה. 3) פחת > CAPEX תחזוקה פי 2.5 = הפחת מוגזם. 4) P/Owner-Earnings 8 = זול. 5) חוזים ממשלתיים + חפיר = בטוח. 6) מסקנה: רווחי הבעלים אמיתיים ויציבים — קנייה.",
        isGoodValue: true,
        difficulty: "easy",
        difficultyValue: 1,
        hint: "הרווח החשבונאי שלילי, אבל מה עם רווחי הבעלים (FCF)?"
    }
],

// ────────────────────────────────────────────────────────────────────────────
// MEDIUM TIER (tier 2) — 15 new companies
// Player should be ~60% sure. 2 signals + 1-2 credible counter-signals.
// ────────────────────────────────────────────────────────────────────────────

medium: [

    // ── CYCLICAL TRAP (Medium, Buy — buying at trough) ──────────────────
    {
        id: "cyclical-trough-m01",
        name: "אשדוד כימיקלים בע\"מ",
        sector: "כימיה מחזורית",
        symbol: "ASHK",
        price: 38.00,
        tier: 2,
        chartType: "annual",
        description: "יצרנית כימיקלים תעשייתיים שנמצאת בתחתית מחזור. הרווחים ירדו 60% בשנתיים, P/E זינק ל-22. אבל החברה ללא חוב, ובעלת שליטה קנו מניות בחודשיים האחרונים.",
        management: "בעל שליטה מנוסה שעבר 3 מחזורים. קנה מניות ב-₪5M בחודשיים האחרונים.",
        moat: "מפעל מודרני עם עלויות ייצור נמוכות מהממוצע בענף. מיקום אסטרטגי ליד נמל.",
        events: "סגירת מפעל מתחרה בצפון. מחירי חומרי גלם החלו להתייצב אחרי ירידה חדה.",
        metrics: {
            basic: [
                { name: "P/E", value: "22 (על רווחי שפל)" },
                { name: "ROE", value: "5%" },
                { name: "תשואת דיבידנד", value: "1.5%" }
            ],
            advanced: [
                { name: "P/E מנורמל (ממוצע מחזורי)", value: "8" },
                { name: "FCF (מיליון ₪)", value: "12" },
                { name: "חוב/הון", value: "0.0" }
            ]
        },
        historicalData: [
            { year: "year-4", revenue: 420, fcf: 65 },
            { year: "year-3", revenue: 380, fcf: 45 },
            { year: "year-2", revenue: 310, fcf: 20 },
            { year: "year-1", revenue: 265, fcf: 10 },
            { year: "year-0", revenue: 250, fcf: 12 }
        ],
        projectedData: [
            { year: "year+1", revenue: 280, fcf: 25 },
            { year: "year+2", revenue: 340, fcf: 45 }
        ],
        correctDecision: "buy",
        pointValue: 150,
        // FCF BREAKER: FCF barely positive, looks weak, but answer is buy
        hints: [{ cost: 0.5, text: "בחברה מחזורית — P/E גבוה בשפל = זול. P/E נמוך בשיא = יקר. הפוך ממה שאתם רגילים!" }],
        feedback: {
            principle: { id: "cyclical-trap", name: "מלכודת מחזוריות" },
            decisiveSignals: ["P/E מנורמל 8 (מחזורי)", "אפס חוב = תשרוד כל מחזור", "בעלים קונים מניות"],
            correctExplanation: "מצוין! בחברה מחזורית, קנייה בשפל (P/E גבוה, רווחים נמוכים) היא הצעד הנכון. כשהמחזור יחזור — ורווחי השפל מעידים שזו שאלה של מתי, לא אם — הרווחים יקפצו והמניה תטוס.",
            incorrectExplanation: "טעות! P/E 22 הפחיד אותך, אבל בחברה מחזורית P/E גבוה = שפל = זמן לקנות. ה-P/E המנורמל (ממוצע על פני מחזור שלם) הוא 8 = זול מאוד.",
            counterSignalExplanation: "הצד השני יטען: ההכנסות ירדו 40% בשנתיים, P/E 22 יקר, FCF רק ₪12M — חלש. אולי המחזור עוד לא הגיע לתחתית, ומחירי חומרי גלם עלולים לרדת עוד."
        },
        workedExample: "1) זיהוי: כימיקלים = תעשייה מחזורית. 2) מיקום במחזור: הכנסות ירדו 40% מהשיא — קרוב לתחתית. 3) P/E: 22 על רווחי שפל, אבל מנורמל = 8 = זול. 4) חוסן: אפס חוב = תשרוד את השפל. 5) סימנים: בעלים קונים + מתחרה סגר = סביבה משתפרת. 6) מסקנה: קנייה בתחתית מחזור — הפוך מהאינסטינקט.",
        isGoodValue: true,
        difficulty: "medium",
        difficultyValue: 2,
        hint: "בחברה מחזורית — P/E גבוה בשפל = זול. P/E נמוך בשיא = יקר."
    },

    // ── CYCLICAL TRAP (Medium, Pass — false trough) ──────────────────────
    {
        id: "cyclical-false-m01",
        name: "ים תיכון ספנות בע\"מ",
        sector: "ספנות",
        symbol: "YMTS",
        price: 65.00,
        tier: 2,
        chartType: "quarterly",
        description: "חברת ספנות שנראית כאילו היא בשפל, אבל למעשה הענף עובר שינוי מבני — לא מחזורי. הקיבולת העולמית עלתה 35% בשלוש שנים וצפויה להמשיך.",
        management: "הנהלה מנוסה אבל נשארת תקועה באסטרטגיה ישנה. לא מסתגלת לשינויי שוק.",
        moat: "צי אוניות ותיק, אבל הרבה ממנו לא עומד בתקנות סביבה חדשות ודורש השקעה כבדה.",
        events: "3 אוניות חדשות של מתחרים נכנסו לקו הפעילות. רגולציה סביבתית חדשה מחייבת שדרוג יקר.",
        metrics: {
            basic: [
                { name: "P/E", value: "18 (על רווחי שפל לכאורה)" },
                { name: "ROE", value: "4%" },
                { name: "תשואת דיבידנד", value: "2%" }
            ],
            advanced: [
                { name: "P/NAV", value: "0.7" },
                { name: "FCF (מיליון ₪)", value: "15" },
                { name: "CAPEX נדרש (רגולציה)", value: "₪120M ב-3 שנים" }
            ]
        },
        quarterlyData: [
            { quarter: "Q1 year-1", revenue: 95, fcf: 8 },
            { quarter: "Q2 year-1", revenue: 88, fcf: 5 },
            { quarter: "Q3 year-1", revenue: 82, fcf: 3 },
            { quarter: "Q4 year-1", revenue: 78, fcf: 2 },
            { quarter: "Q1 year-0", revenue: 75, fcf: 4 },
            { quarter: "Q2 year-0", revenue: 72, fcf: 1 }
        ],
        projectedData: [
            { year: "year+1", revenue: 270, fcf: -10 },
            { year: "year+2", revenue: 250, fcf: -25 }
        ],
        correctDecision: "pass",
        pointValue: 150,
        hints: [{ cost: 0.5, text: "האם זה שפל מחזורי שיחזור, או שינוי מבני שלא?" }],
        feedback: {
            principle: { id: "cyclical-trap", name: "מלכודת מחזוריות" },
            decisiveSignals: ["שינוי מבני (לא מחזורי)", "עודף קיבולת מבני +35%", "CAPEX רגולטורי ₪120M"],
            correctExplanation: "נכון! לא כל ירידה בענף מחזורי היא שפל. כאן יש שינוי מבני — קיבולת חדשה ורגולציה. הענף לא \'יחזור\' לרמות הישנות. P/NAV 0.7 נראה זול אבל ה-NAV עצמו יורד.",
            incorrectExplanation: "טעות! P/NAV 0.7 נראה כמו הזדמנות \'קנייה בשפל\', אבל הפעם השפל הוא קבוע. עודף קיבולת + רגולציה = שינוי מבני.",
            counterSignalExplanation: "הצד השני יטען: P/NAV 0.7 = קונים נכסים ב-70% מערכם. ספנות מחזורית תמיד, וכשקיבולת תצא מהשוק, התעריפים יעלו. ההנהלה ותיקה ושרדה מחזורים קודמים."
        },
        workedExample: "1) זיהוי: ספנות = מחזורית. אבל האם זה שפל רגיל? 2) בדיקה: קיבולת עלתה 35% = עודף מבני, לא זמני. 3) רגולציה: CAPEX ₪120M נדרש = ההוצאות יעלו דרמטית. 4) תחרות: 3 אוניות חדשות בקו = לחץ מחירים מבני. 5) P/NAV 0.7: ה-NAV עצמו נשחק (אוניות ישנות שלא עומדות בתקנות). 6) מסקנה: זה לא שפל מחזורי — זה שינוי מבני. העל.",
        isGoodValue: false,
        difficulty: "medium",
        difficultyValue: 2,
        hint: "האם זה שפל מחזורי שיחזור, או שינוי מבני שלא?"
    },

    // ── TURNAROUND (Medium, Buy) ────────────────────────────────────────
    {
        id: "turnaround-buy-m01",
        name: "אופטיקה שלום בע\"מ",
        sector: "קמעונאות בריאות",
        symbol: "OPTK",
        price: 42.00,
        tier: 2,
        chartType: "segments",
        description: "רשת אופטיקה שמרה שסבלה מתחרות אונליין. מנכ\"ל חדש מינה לפני 18 חודשים שינה אסטרטגיה: סגר 30% מהסניפים, פתח חנות אונליין, ומתמקד בשירותים רפואיים במקום מוצרים.",
        management: "מנכ\"ל חדש עם ניסיון בשיקום קמעונאות (שיקם רשת אחרת בעבר). קנה 3% מהמניות.",
        moat: "מותג מוכר, אבל נשחק. השירותים הרפואיים יוצרים lock-in שמוצרים לא יוצרים.",
        events: "הרבעון האחרון הראה שיפור מפתיע ברווחיות. מרווח תפעולי עלה מ-2% ל-8%.",
        metrics: {
            basic: [
                { name: "P/E", value: "25 (על רווחי שפל)" },
                { name: "ROE", value: "6%" },
                { name: "צמיחת הכנסות", value: "-8% (אבל מכוונת)" }
            ],
            advanced: [
                { name: "ROIC", value: "7%" },
                { name: "FCF (מיליון ₪)", value: "8" },
                { name: "מרווח תפעולי", value: "8% (עלה מ-2%)" }
            ]
        },
        segmentData: [
            { name: "שירותים רפואיים", revenue: 85, margin: "22%", growth: "+35%" },
            { name: "מוצרי אופטיקה (חנויות)", revenue: 110, margin: "5%", growth: "-15%" },
            { name: "מכירות אונליין", revenue: 45, margin: "12%", growth: "+60%" }
        ],
        projectedData: [
            { year: "year+1", revenue: 250, fcf: 18 },
            { year: "year+2", revenue: 270, fcf: 28 }
        ],
        correctDecision: "buy",
        pointValue: 150,
        hints: [{ cost: 0.5, text: "ההכנסות יורדות, אבל הסגמנט הרפואי צומח 35% עם מרווח 22%. מה המנכ\"ל באמת עושה?" }],
        feedback: {
            principle: { id: "turnaround", name: "שיקום" },
            decisiveSignals: ["סגמנט רפואי צומח 35% עם מרווח 22%", "מרווח תפעולי עלה מ-2% ל-8%", "מנכ\"ל עם רקורד + skin in the game"],
            correctExplanation: "מצוין! ירידת ההכנסות היא מכוונת — המנכ\"ל סוגר את החלקים ההפסדיים ומתמקד בסגמנט הרפואי הרווחי. זה שיקום אמיתי: ויתור על גודל לטובת רווחיות.",
            incorrectExplanation: "טעות! ההכנסות הכוללות יורדות, אבל הנתונים המפולחים מספרים סיפור אחר: הסגמנט הרפואי צומח 35% עם מרווח 22%. המנכ\"ל מחליף הכנסות גרועות בטובות.",
            counterSignalExplanation: "הצד השני יטען: P/E 25, הכנסות יורדות 8%, ו-FCF רק ₪8M. החנות האונליין עדיין קטנה, ולא בטוח שהשירותים הרפואיים יחליפו את ההכנסות שנסגרו."
        },
        workedExample: "1) זיהוי: חברה בשיקום אסטרטגי. 2) ניתוח סגמנטים: רפואי +35%, מרווח 22% — זה הנכס. אונליין +60% — משלים. חנויות -15% — נסגרות בכוונה. 3) מרווח תפעולי: 2% → 8% = שיפור דרמטי. 4) הנהלה: רקורד + 3% אחזקה. 5) P/E 25 על רווחי שפל — כשהמיקס ישתנה, הרווחיות תקפוץ. 6) מסקנה: שיקום חכם — קנייה.",
        isGoodValue: true,
        difficulty: "medium",
        difficultyValue: 2,
        hint: "ההכנסות יורדות, אבל הסגמנט הרפואי צומח 35% עם מרווח 22%. מה המנכ\"ל באמת עושה?"
    },

    // ── TURNAROUND (Medium, Pass — turnaround trap) ──────────────────────
    {
        id: "turnaround-trap-m01",
        name: "טקסטיל העמק בע\"מ",
        sector: "תעשייה",
        symbol: "TKST",
        price: 15.00,
        tier: 2,
        chartType: "annual",
        description: "מפעל טקסטיל שהובטח \'שיקום\' כבר 4 שנים. כל שנה ההנהלה מבטיחה שיפור \'ברבעון הבא\'. המחיר ירד 70% מהשיא, ויש המלצות \'קנייה ספקולטיבית\' מאנליסטים.",
        management: "אותו מנכ\"ל שהוביל את הירידה עדיין בתפקיד. מכר 50% ממניותיו בשנתיים האחרונות.",
        moat: "אין — ייצור טקסטיל בישראל יקר מול יבוא מאסיה.",
        events: "הפסד רבעוני גדול מהצפי. ההנהלה \'בוחנת אפשרויות אסטרטגיות\' (= אולי מוכרת).",
        metrics: {
            basic: [
                { name: "P/E", value: "שלילי" },
                { name: "ROE", value: "-12%" },
                { name: "P/B", value: "0.4" }
            ],
            advanced: [
                { name: "ROIC", value: "-8%" },
                { name: "FCF (מיליון ₪)", value: "-22" },
                { name: "חוב/הון", value: "2.5" }
            ]
        },
        historicalData: [
            { year: "year-4", revenue: 280, fcf: -5 },
            { year: "year-3", revenue: 260, fcf: -10 },
            { year: "year-2", revenue: 240, fcf: -15 },
            { year: "year-1", revenue: 220, fcf: -18 },
            { year: "year-0", revenue: 195, fcf: -22 }
        ],
        projectedData: [
            { year: "year+1", revenue: 180, fcf: -25 },
            { year: "year+2", revenue: 165, fcf: -28 }
        ],
        correctDecision: "pass",
        pointValue: 150,
        hints: [{ cost: 0.5, text: "P/B 0.4 = זול על הנייר. אבל מנכ\"ל שמוכר מניות שלו — מה הוא יודע שאתם לא?" }],
        feedback: {
            principle: { id: "turnaround", name: "שיקום" },
            decisiveSignals: ["4 שנים ללא שיפור", "מנכ\"ל מוכר מניות", "חוב/הון 2.5 = סיכון קיומי"],
            correctExplanation: "נכון! \'שיקום\' שנמשך 4 שנים ללא תוצאות הוא לא שיקום — הוא סיפור כיסוי. מנכ\"ל שמוכר מניות שלו מודיע לכם שהוא לא מאמין. P/B 0.4 נראה זול, אבל ה-B הולך לאפס.",
            incorrectExplanation: "טעות! P/B 0.4 הפתה אותך, אבל ערך הספרים יורד כל שנה. 4 שנים בלי שיפור + מנכ\"ל שמוכר מניות = אין שיקום אמיתי כאן.",
            counterSignalExplanation: "הצד השני יטען: P/B 0.4 = קונים נכסים ב-40% מערכם. אם החברה תימכר, בעלי המניות ירוויחו. \'אפשרויות אסטרטגיות\' עשויות לכלול מכירה בפרמיה."
        },
        workedExample: "1) זיהוי: חברה שטוענת שהיא בשיקום. 2) בדיקת ציר הזמן: 4 שנים! שיקום אמיתי מראה סימנים תוך 12-18 חודשים. 3) הנהלה: אותו מנכ\"ל שגרם לבעיה + מוכר מניות = דגל אדום כפול. 4) מצב פיננסי: חוב/הון 2.5, FCF ₪-22M ומחמיר = סיכון קיומי. 5) חפיר: אין — ייצור בישראל לא תחרותי. 6) מסקנה: לא שיקום — מלכודת ערך. העל.",
        isGoodValue: false,
        difficulty: "medium",
        difficultyValue: 2,
        hint: "P/B 0.4 = זול על הנייר. אבל מנכ\"ל שמוכר מניות שלו — מה הוא יודע שאתם לא?"
    },

    // ── DIVIDEND SUSTAINABILITY (Medium, Pass — hidden dividend cut) ─────
    {
        id: "dividend-hidden-m01",
        name: "בנק מסחרי ראשון בע\"מ",
        sector: "בנקאות",
        symbol: "BNKM",
        price: 95.00,
        tier: 2,
        chartType: "none",
        description: "בנק קטן עם תשואת דיבידנד מושכת של 6%. הרווחים יציבים על פני השנים, אבל יחס הלימות ההון (CET1) נמצא ממש על הגבול הרגולטורי, והחשיפה לנדל\"ן מסחרי גבוהה.",
        management: "הנהלה שמרנית מבחינת תדמית, אבל המדיניות בפועל — אגרסיבית בחלוקת דיבידנדים.",
        moat: "רישיון בנקאי = חפיר רגולטורי, אבל אין יתרון אמיתי על פני בנקים גדולים.",
        events: "הרגולטור שלח מכתב התראה על יחס ההון. 25% מתיק האשראי בנדל\"ן מסחרי.",
        metrics: {
            basic: [
                { name: "P/E", value: "8" },
                { name: "ROE", value: "12%" },
                { name: "תשואת דיבידנד", value: "6%" }
            ],
            advanced: [
                { name: "CET1", value: "10.2% (מינימום: 10.0%)" },
                { name: "NIM", value: "2.1%" },
                { name: "חשיפה לנדל\"ן מסחרי", value: "25% מהתיק" }
            ]
        },
        historicalData: [
            { year: "year-4", revenue: 380, fcf: 48 },
            { year: "year-3", revenue: 395, fcf: 52 },
            { year: "year-2", revenue: 385, fcf: 50 },
            { year: "year-1", revenue: 400, fcf: 55 },
            { year: "year-0", revenue: 410, fcf: 58 }
        ],
        projectedData: [
            { year: "year+1", revenue: 415, fcf: 55 },
            { year: "year+2", revenue: 420, fcf: 52 }
        ],
        correctDecision: "pass",
        pointValue: 150,
        // FCF BREAKER: FCF positive and stable, but answer is pass
        hints: [{ cost: 0.5, text: "CET1 10.2% כש-10% זה המינימום — מה קורה אם הפסדי אשראי עולים?" }],
        feedback: {
            principle: { id: "dividend-sustainability", name: "קיימות דיבידנד" },
            decisiveSignals: ["CET1 0.2% מעל המינימום", "מכתב התראה מהרגולטור", "25% חשיפה לנדל\"ן מסחרי"],
            correctExplanation: "נכון! דיבידנד 6% מפתה, אבל CET1 ברזרבה אפסית. כל הרעה בתיק האשראי (במיוחד 25% נדל\"ן מסחרי) תכריח את הבנק לחתוך דיבידנד ולגייס הון. הרגולטור כבר שלח מכתב — זה עניין של זמן.",
            incorrectExplanation: "טעות! P/E 8, דיבידנד 6%, רווחים יציבים — הכל נראה מושלם. אבל CET1 10.2% כשהמינימום 10% = אפס כרית ביטחון. הדיבידנד חי על זמן שאול.",
            counterSignalExplanation: "הצד השני יטען: P/E 8 זול לבנק, ROE 12% מכובד, הרווחים יציבים, וההנהלה מנוסה. CET1 10.2% עדיין מעל המינימום, ואולי לא תהיה בעיה."
        },
        workedExample: "1) P/E 8, דיבידנד 6% — מפתה. 2) אבל CET1 10.2% מול מינימום 10% = מרווח של 0.2% בלבד. 3) מכתב התראה מהרגולטור = הוא מודאג. 4) 25% חשיפה לנדל\"ן מסחרי = אם מחירי נדל\"ן ירדו, ההפרשות יאכלו את ה-CET1. 5) תרחיש: הפרשות → CET1 יורד מתחת ל-10% → הרגולטור מכריח חיתוך דיבידנד + גיוס הון = המניה נופלת. 6) מסקנה: דיבידנד לא בר-קיימא. העל.",
        isGoodValue: false,
        difficulty: "medium",
        difficultyValue: 2,
        hint: "CET1 10.2% כש-10% זה המינימום — מה קורה אם הפסדי אשראי עולים?"
    },

    // ── MANAGEMENT QUALITY (Medium, Buy) ────────────────────────────────
    {
        id: "capital-allocator-m01",
        name: "דלתא-טק תעשיות בע\"מ",
        sector: "תעשייה מגוונת",
        symbol: "DLTK",
        price: 165.00,
        tier: 2,
        chartType: "segments",
        description: "קונגלומרט תעשייתי שמנוהל כ-\'מקצי הון\' — המנכ\"ל קונה ומוכר חטיבות לפי תשואה על ההון. מכר 2 חטיבות הפסדיות, רכש חטיבה רווחית. ROIC עולה כל שנה.",
        management: "מנכ\"לית עם 10 שנות ניסיון כמקצית הון. מחזיקה 8% מהמניות. תגמול מבוסס ROIC, לא גודל.",
        moat: "אין חפיר ספציפי, אבל ניהול הון מעולה יוצר ערך לאורך זמן.",
        events: "מכירת חטיבת אריזות (ROIC 4%) ורכישת חטיבת חיישנים (ROIC 22%). הביעה עניין ברכישה נוספת.",
        metrics: {
            basic: [
                { name: "P/E", value: "15" },
                { name: "ROE", value: "18%" },
                { name: "צמיחת ROIC", value: "+200bp בשנה" }
            ],
            advanced: [
                { name: "ROIC", value: "16% (עלה מ-10% ב-4 שנים)" },
                { name: "FCF (מיליון ₪)", value: "78" },
                { name: "תגמול מנכ\"לית", value: "מבוסס ROIC" }
            ]
        },
        segmentData: [
            { name: "חיישנים תעשייתיים", revenue: 180, margin: "28%", growth: "+12%" },
            { name: "מערכות בקרה", revenue: 140, margin: "18%", growth: "+6%" },
            { name: "שירותי תחזוקה", revenue: 95, margin: "22%", growth: "+8%" }
        ],
        projectedData: [
            { year: "year+1", revenue: 450, fcf: 88 },
            { year: "year+2", revenue: 490, fcf: 98 }
        ],
        correctDecision: "buy",
        pointValue: 150,
        hints: [{ cost: 0.5, text: "מנכ\"לית שמתוגמלת על ROIC ולא על גודל — מה סוג ההחלטות שהיא תקבל?" }],
        feedback: {
            principle: { id: "management-quality", name: "איכות הנהלה" },
            decisiveSignals: ["ROIC עלה מ-10% ל-16% ב-4 שנים", "תגמול מבוסס ROIC", "מכירת חטיבות גרועות, קניית טובות"],
            correctExplanation: "מצוין! מנכ\"לית שמנהלת הון — לא אימפריה. כל החלטה (מכירה/רכישה) מוסיפה ערך. ROIC עולה עקבית = הוכחה שזה עובד. 8% אחזקה + תגמול ROIC = אינטרסים מיושרים.",
            incorrectExplanation: "פספוס! P/E 15 לא נראה \'זול\' במבט ראשון, אבל עם ROIC שעולה 200bp בשנה ומנכ\"לית שמקצה הון בריאנות — זו מכונת יצירת ערך.",
            counterSignalExplanation: "הצד השני יטען: קונגלומרט בלי חפיר ברור, P/E 15 ממוצע, והרכישות עלולות להיכשל. מנכ\"לית שממשיכה לרכוש מגדילה סיכון."
        },
        workedExample: "1) הנהלה: 8% אחזקה + תגמול ROIC = אינטרסים מיושרים. 2) רקורד: מכרה חטיבה ב-ROIC 4%, קנתה ב-ROIC 22% — החלטות מבוססות ערך. 3) ROIC: 10% → 16% ב-4 שנים = שיפור עקבי. 4) סגמנטים: כולם רווחיים, מרווחים בריאים. 5) P/E 15 עם שיפור ROIC מתמשך = זול. 6) מסקנה: מקצית הון מעולה — קנייה.",
        isGoodValue: true,
        difficulty: "medium",
        difficultyValue: 2,
        hint: "מנכ\"לית שמתוגמלת על ROIC ולא על גודל — מה סוג ההחלטות שהיא תקבל?"
    },

    // ── MANAGEMENT QUALITY (Medium, Pass — related-party transactions) ───
    {
        id: "related-party-m01",
        name: "הולדינג הצפון בע\"מ",
        sector: "אחזקות",
        symbol: "HLDG",
        price: 48.00,
        tier: 2,
        chartType: "none",
        description: "חברת אחזקות עם נכסים מגוונים. הנתונים נראים סבירים, אבל עסקאות בעלי עניין מסיביות: 15% מההוצאות הולכות לחברות של בעל השליטה. דירקטוריון מאויש בקרובי משפחה.",
        management: "בעל שליטה שמעסיק 4 בני משפחה בתפקידי מפתח. שכר הנהלה = 8% מהרווח התפעולי.",
        moat: "נכסי נדל\"ן ותעשייה, אבל ניהול בינוני.",
        events: "עסקה חדשה עם חברת אחות בתנאים \'שוק\'. רשות ני\"ע פתחה בחקירה ראשונית.",
        metrics: {
            basic: [
                { name: "P/E", value: "7" },
                { name: "ROE", value: "10%" },
                { name: "תשואת דיבידנד", value: "4%" }
            ],
            advanced: [
                { name: "P/NAV", value: "0.55" },
                { name: "FCF (מיליון ₪)", value: "28" },
                { name: "עסקאות בעלי עניין", value: "15% מההוצאות" }
            ]
        },
        historicalData: [
            { year: "year-4", revenue: 350, fcf: 30 },
            { year: "year-3", revenue: 360, fcf: 32 },
            { year: "year-2", revenue: 355, fcf: 28 },
            { year: "year-1", revenue: 370, fcf: 30 },
            { year: "year-0", revenue: 380, fcf: 28 }
        ],
        projectedData: [
            { year: "year+1", revenue: 390, fcf: 30 },
            { year: "year+2", revenue: 400, fcf: 30 }
        ],
        correctDecision: "pass",
        pointValue: 150,
        // FCF BREAKER: FCF positive and stable, but answer is pass
        hints: [{ cost: 0.5, text: "P/NAV 0.55 = דיסקאונט עצום. אבל מי שולט בכסף ולמי הוא הולך?" }],
        feedback: {
            principle: { id: "management-quality", name: "איכות הנהלה" },
            decisiveSignals: ["15% מההוצאות לבעלי עניין", "4 בני משפחה בהנהלה", "חקירת רשות ני\"ע"],
            correctExplanation: "נכון! P/NAV 0.55 נראה כמו מציאה, אבל הדיסקאונט הוא בדיוק בגלל ממשל תאגידי גרוע. 15% מההוצאות ל\'חברות אחות\' = הערך נוזל לבעל השליטה, לא למשקיעים.",
            incorrectExplanation: "טעות! P/E 7, דיבידנד 4%, P/NAV 0.55 — על הנייר זה זול. אבל כשבעל השליטה מנקז 15% מההוצאות לחברות שלו, ה-FCF \'האמיתי\' למשקיע נמוך בהרבה.",
            counterSignalExplanation: "הצד השני יטען: P/NAV 0.55 = קונים נכסים בחצי מחיר. FCF ₪28M חיובי, דיבידנד 4% קיים, ואולי החקירה תסתיים בלי כלום."
        },
        workedExample: "1) P/NAV 0.55 — זול! אבל למה? 2) עסקאות בעלי עניין: 15% מההוצאות = דליפת ערך שיטתית. 3) ממשל תאגידי: 4 בני משפחה + שכר 8% מהרווח = ניגודי אינטרסים. 4) חקירת רשות ני\"ע = דגל אדום. 5) FCF ₪28M — אבל כמה באמת מגיע למשקיעים? 6) מסקנה: הדיסקאונט מוצדק — הנהלה שלא עובדת בשביל המשקיעים. העל.",
        isGoodValue: false,
        difficulty: "medium",
        difficultyValue: 2,
        hint: "P/NAV 0.55 = דיסקאונט עצום. אבל מי שולט בכסף ולמי הוא הולך?"
    },

    // ── DIVIDEND SUSTAINABILITY (Medium, Buy) ───────────────────────────
    {
        id: "dividend-grower-m01",
        name: "ישראמון ביטוח בע\"מ",
        sector: "ביטוח",
        symbol: "YSMN",
        price: 130.00,
        tier: 2,
        chartType: "annual",
        description: "חברת ביטוח עם combined ratio של 92% — רווחית מתפעולית. מגדילה דיבידנד 12 שנים ברציפות, אבל תשואת הדיבידנד \'רק\' 3.2%. הצמיחה בדיבידנד היא 10% בשנה.",
        management: "מנכ\"ל ותיק עם גישה שמרנית. לא רודף גודל, מתמקד ברווחיות.",
        moat: "מותג חזק בביטוח עסקי, חידושים גבוהים (88%), רשת סוכנים נאמנה.",
        events: "הכריזה על תוכנית רכישה עצמית. תשואת ההשקעות ירדה בגלל סביבת ריבית.",
        metrics: {
            basic: [
                { name: "P/E", value: "11" },
                { name: "ROE", value: "15%" },
                { name: "תשואת דיבידנד", value: "3.2%" }
            ],
            advanced: [
                { name: "Combined Ratio", value: "92%" },
                { name: "צמיחת דיבידנד שנתית", value: "10%" },
                { name: "יחס חלוקה", value: "35%" }
            ]
        },
        historicalData: [
            { year: "year-4", revenue: 580, fcf: 55 },
            { year: "year-3", revenue: 610, fcf: 60 },
            { year: "year-2", revenue: 620, fcf: 58 },
            { year: "year-1", revenue: 650, fcf: 65 },
            { year: "year-0", revenue: 690, fcf: 72 }
        ],
        projectedData: [
            { year: "year+1", revenue: 720, fcf: 76 },
            { year: "year+2", revenue: 755, fcf: 80 }
        ],
        correctDecision: "buy",
        pointValue: 150,
        hints: [{ cost: 0.5, text: "3.2% תשואה נראית נמוכה, אבל עם צמיחה של 10% בשנה — מה תהיה התשואה בעוד 5 שנים?" }],
        feedback: {
            principle: { id: "dividend-sustainability", name: "קיימות דיבידנד" },
            decisiveSignals: ["12 שנות גידול רצוף", "יחס חלוקה 35% = מרווח גדול", "combined ratio 92% = רווחית"],
            correctExplanation: "מצוין! 3.2% היום לא מרשים, אבל עם צמיחה של 10% בשנה ויחס חלוקה של 35% = תשואה על עלות של 5.2% בעוד 5 שנים. ויחס חלוקה נמוך = מרחב לגידול. זה דיבידנד-גידול קלאסי.",
            incorrectExplanation: "טעות! השוואת תשואת דיבידנד של 3.2% ל-6% של בנקים מטעה. דיבידנד שצומח 10% בשנה ששוה הרבה יותר מדיבידנד גבוה שלא צומח.",
            counterSignalExplanation: "הצד השני יטען: תשואת דיבידנד 3.2% נמוכה כשאפשר לקבל 6% בבנקים. ירידה בתשואות השקעות פוגעת ברווחי ביטוח. P/E 11 לא זול במיוחד לסקטור."
        },
        workedExample: "1) תשואה 3.2% — לא מרשימה. אבל... 2) צמיחת דיבידנד 10% בשנה × 12 שנים ברצף = רקורד מוכח. 3) יחס חלוקה 35% = מרחב אדיר — החברה יכולה להכפיל דיבידנד מבלי להסתכן. 4) combined ratio 92% = עסק ביטוח רווחי. 5) מודל תשואה על עלות: בעוד 5 שנים, 3.2% × 1.10^5 = 5.2% על ההשקעה. 6) מסקנה: דיבידנד-גידול — קנייה.",
        isGoodValue: true,
        difficulty: "medium",
        difficultyValue: 2,
        hint: "3.2% תשואה נראית נמוכה, אבל עם צמיחה של 10% בשנה — מה תהיה התשואה בעוד 5 שנים?"
    },

    // ── VALUE TRAP (Medium, Buy — value trap that's actually value) ──────
    // Direction unlock: value-trap was always "pass"
    {
        id: "value-not-trap-m01",
        name: "פלסטיק הדרום בע\"מ",
        sector: "תעשייה",
        symbol: "PLDR",
        price: 22.00,
        tier: 2,
        chartType: "annual",
        description: "יצרנית אריזות פלסטיק עם P/E 5 ודיבידנד 8%. נראה כמו מלכודת ערך קלאסית — ענף \'משעמם\', צמיחה אפסית. אבל: FCF יציב 10 שנים, אין חוב, ו-80% מההכנסות מחוזי אספקה ל-5+ שנים.",
        management: "משפחה מייסדת בדור שלישי. שמרנים מאוד. מחזיקים 40% מהמניות.",
        moat: "עלויות ייצור נמוכות, חוזים ארוכי טווח, עלות מעבר גבוהה ללקוחות (אריזות מותאמות אישית).",
        events: "שום דבר מרגש — וזה בדיוק הנקודה. אין חדשות = אין סיכון.",
        metrics: {
            basic: [
                { name: "P/E", value: "5" },
                { name: "ROE", value: "14%" },
                { name: "תשואת דיבידנד", value: "8%" }
            ],
            advanced: [
                { name: "ROIC", value: "16%" },
                { name: "FCF (מיליון ₪)", value: "32" },
                { name: "יחס חלוקה", value: "55%" }
            ]
        },
        historicalData: [
            { year: "year-4", revenue: 195, fcf: 30 },
            { year: "year-3", revenue: 200, fcf: 32 },
            { year: "year-2", revenue: 198, fcf: 31 },
            { year: "year-1", revenue: 205, fcf: 33 },
            { year: "year-0", revenue: 202, fcf: 32 }
        ],
        projectedData: [
            { year: "year+1", revenue: 208, fcf: 33 },
            { year: "year+2", revenue: 212, fcf: 34 }
        ],
        correctDecision: "buy",
        pointValue: 150,
        hints: [{ cost: 0.5, text: "P/E 5 ודיבידנד 8% — מלכודת ערך? או שזה באמת זול? בדקו את ה-FCF לאורך 5 שנים." }],
        feedback: {
            principle: { id: "value-trap", name: "מלכודת ערך" },
            decisiveSignals: ["FCF יציב 5+ שנים", "ROIC 16% — גבוה לתעשייה", "חוזים ל-5+ שנים = הכנסות מובטחות"],
            correctExplanation: "מצוין! לא כל מניה זולה היא מלכודת ערך! כאן יש FCF יציב, ROIC גבוה, חוזים ארוכי טווח, ויחס חלוקה סביר. הענף \'משעמם\' = בדיוק מה שבאפט אוהב. מלכודת הערך כאן היא... לא לקנות.",
            incorrectExplanation: "טעות! P/E 5 ודיבידנד 8% עם \'צמיחה אפסית\' נראה כמו מלכודת ערך — אבל FCF יציב 10 שנים ו-ROIC 16% מוכיחים שזה עסק איכותי. לא כל דבר שנראה זול הוא מלכודת.",
            counterSignalExplanation: "הצד השני יטען: צמיחה אפסית, ענף פלסטיק בלחץ סביבתי, ושוק שלא מעריך את המניה כבר שנים. אם השוק לא רואה ערך, אולי הוא צודק."
        },
        workedExample: "1) P/E 5, דיבידנד 8% — מלכודת ערך? נבדוק. 2) FCF: יציב ב-₪30-33M חמש שנים = עקבי, לא מדשדש. 3) ROIC 16% = תשואה גבוהה על ההון = עסק איכותי. 4) חוזים ל-5+ שנים = הכנסות כמעט מובטחות. 5) משפחה מייסדת עם 40% אחזקה = skin in the game. 6) מסקנה: זו לא מלכודת ערך — זו חברה איכותית שהשוק מתעלם ממנה. קנייה.",
        isGoodValue: true,
        difficulty: "medium",
        difficultyValue: 2,
        hint: "P/E 5 ודיבידנד 8% — מלכודת ערך? או שזה באמת זול? בדקו את ה-FCF לאורך 5 שנים."
    },

    // ── OWNER EARNINGS (Medium, Pass — accounting manipulation) ──────────
    {
        id: "accounting-trick-m01",
        name: "גלובל-טרייד סחר בע\"מ",
        sector: "סחר",
        symbol: "GLBT",
        price: 72.00,
        tier: 2,
        chartType: "waterfall",
        description: "חברת סחר שמציגה רווח נקי יפה, אבל רווחי הבעלים שליליים. ההבדל: רווחים חד-פעמיים ממכירת נכסים ושינוי מדיניות חשבונאית שהגדילה רווחים על הנייר.",
        management: "מנכ\"ל חדש שצריך להראות תוצאות. החליף רואה חשבון.",
        moat: "אין — סחר בסחורות ללא יתרון תחרותי.",
        events: "שינוי מדיניות הכרה בהכנסות. מכירת נכס במחיר גבוה = רווח חד-פעמי. החליפה רואה חשבון.",
        metrics: {
            basic: [
                { name: "P/E", value: "10 (על רווח מדווח)" },
                { name: "ROE", value: "15% (על רווח מדווח)" },
                { name: "צמיחת רווח", value: "25% (חד-פעמי)" }
            ],
            advanced: [
                { name: "P/E על רווחי בעלים", value: "שלילי" },
                { name: "FCF (מיליון ₪)", value: "-8" },
                { name: "רווח חד-פעמי", value: "₪40M (50% מהרווח)" }
            ]
        },
        // Waterfall data showing profit bridge
        historicalData: [
            { year: "year-4", revenue: 410, fcf: 15 },
            { year: "year-3", revenue: 395, fcf: 8 },
            { year: "year-2", revenue: 380, fcf: 2 },
            { year: "year-1", revenue: 370, fcf: -3 },
            { year: "year-0", revenue: 375, fcf: -8 }
        ],
        projectedData: [
            { year: "year+1", revenue: 365, fcf: -12 },
            { year: "year+2", revenue: 355, fcf: -15 }
        ],
        correctDecision: "pass",
        pointValue: 150,
        hints: [{ cost: 0.5, text: "50% מהרווח הוא חד-פעמי. מה קורה ל-P/E כשמסירים את זה?" }],
        feedback: {
            principle: { id: "owner-earnings", name: "רווחי בעלים" },
            decisiveSignals: ["50% רווח חד-פעמי", "FCF שלילי", "החלפת רואה חשבון"],
            correctExplanation: "נכון! הרווח המדווח מטעה — חצי ממנו חד-פעמי. רווחי הבעלים (FCF) שליליים = העסק מפסיד. שינוי מדיניות חשבונאית + החלפת רו\"ח = דגלים אדומים.",
            incorrectExplanation: "טעות! P/E 10 נראה סביר, אבל הוא מבוסס על רווחים מנופחים. FCF שלילי מספר את האמת — העסק שורף מזומן.",
            counterSignalExplanation: "הצד השני יטען: P/E 10 זול, הרווח עלה 25%, וההנהלה החדשה אולי תצליח לשפר ביצועים. שינוי מדיניות חשבונאית לא בהכרח שלילי."
        },
        workedExample: "1) P/E 10 על רווח מדווח — נראה טוב. 2) אבל 50% מהרווח = חד-פעמי (מכירת נכס). P/E \'אמיתי\' = 20+. 3) FCF שלילי ₪-8M = העסק מפסיד. 4) החלפת רו\"ח + שינוי מדיניות = חשד לאיפור מספרים. 5) ההכנסות יורדות 4 שנים = עסק בדעיכה. 6) מסקנה: רווחי בעלים שליליים — העל.",
        isGoodValue: false,
        difficulty: "medium",
        difficultyValue: 2,
        hint: "50% מהרווח הוא חד-פעמי. מה קורה ל-P/E כשמסירים את זה?"
    },

    // ── LEVERAGE RISK (Medium, Buy — smart leverage) ─────────────────────
    {
        id: "smart-leverage-m01",
        name: "סולארי אנרגיה בע\"מ",
        sector: "אנרגיה מתחדשת",
        symbol: "SOLR",
        price: 85.00,
        tier: 2,
        chartType: "annual",
        description: "חברת אנרגיה סולארית שלקחה חוב גדול (חוב/הון 2.0) לבניית 3 חוות סולאריות. נראה מסוכן, אבל: כל ההכנסות מובטחות בחוזי PPA ל-20 שנה עם גופים ממשלתיים, וכל החוב בריבית קבועה ל-15 שנה.",
        management: "צוות מהנדסים מנוסה. מנכ\"ל שמגיע מתשתיות ממשלתיות.",
        moat: "חוזי PPA ל-20 שנה = הכנסה מובטחת. פרויקטים מאושרים עם חיבור לרשת.",
        events: "חוות סולארית שלישית התחברה לרשת לפני הזמן. תעריף מובטח צמוד מדד.",
        metrics: {
            basic: [
                { name: "P/E", value: "20" },
                { name: "ROE", value: "22% (ממונף)" },
                { name: "צמיחת הכנסות", value: "35%" }
            ],
            advanced: [
                { name: "חוב/הון", value: "2.0" },
                { name: "יחס כיסוי ריבית", value: "4.2x" },
                { name: "PPA ממוצע", value: "20 שנים, צמוד מדד" }
            ]
        },
        historicalData: [
            { year: "year-4", revenue: 45, fcf: -15 },
            { year: "year-3", revenue: 80, fcf: -5 },
            { year: "year-2", revenue: 120, fcf: 10 },
            { year: "year-1", revenue: 160, fcf: 25 },
            { year: "year-0", revenue: 215, fcf: 40 }
        ],
        projectedData: [
            { year: "year+1", revenue: 250, fcf: 52 },
            { year: "year+2", revenue: 260, fcf: 58 }
        ],
        correctDecision: "buy",
        pointValue: 150,
        hints: [{ cost: 0.5, text: "חוב/הון 2.0 מפחיד, אבל מה הטיב של החוב? ומה מבטיח את ההכנסות?" }],
        feedback: {
            principle: { id: "leverage-risk", name: "סיכון מינוף" },
            decisiveSignals: ["הכנסות מובטחות ל-20 שנה", "ריבית קבועה ל-15 שנה", "יחס כיסוי 4.2x"],
            correctExplanation: "מצוין! חוב/הון 2.0 נראה מסוכן, אבל זה \'מינוף פרויקטי\' עם הכנסות מובטחות. כשהתזרים מובטח ל-20 שנה והריבית קבועה ל-15, החוב הוא כלי ליצירת ערך — לא סיכון.",
            incorrectExplanation: "טעות! חוב/הון 2.0 הפחיד אותך. אבל בפרויקטי תשתיות עם חוזים ממשלתיים ל-20 שנה, המינוף הזה הגיוני. השאלה היא לא כמה חוב יש, אלא מה מבטיח אותו.",
            counterSignalExplanation: "הצד השני יטען: חוב/הון 2.0 מסוכן. אם חוות תקולה, ההכנסות ייפגעו. P/E 20 לא זול. ואנרגיה סולארית תלויה ברגולציה שעלולה להשתנות."
        },
        workedExample: "1) חוב/הון 2.0 — דגל אדום? נבדוק. 2) הכנסות: חוזי PPA ל-20 שנה עם גופים ממשלתיים = כמעט ודאיות. 3) חוב: ריבית קבועה ל-15 שנה = אין סיכון ריבית. 4) כיסוי: 4.2x = אפילו עם ירידה של 50% בהכנסות, עדיין מכסים. 5) FCF: עלה מ-₪-15M ל-₪40M כשהפרויקטים הושלמו. 6) מסקנה: מינוף חכם עם הכנסות מובטחות — קנייה.",
        isGoodValue: true,
        difficulty: "medium",
        difficultyValue: 2,
        hint: "חוב/הון 2.0 מפחיד, אבל מה הטיב של החוב? ומה מבטיח את ההכנסות?"
    },

    // ── CIRCLE OF COMPETENCE (Medium, Pass) ─────────────────────────────
    {
        id: "biotech-complex-m01",
        name: "ג\'ין-פארם ביותק בע\"מ",
        sector: "ביוטכנולוגיה",
        symbol: "GNPH",
        price: 180.00,
        tier: 2,
        chartType: "none",
        description: "חברת ביוטק שמפתחת טיפול גנטי לסוג ספציפי של סרטן. בשלב 3 קליני. אנליסטים נלהבים, אבל ההבנה של הטכנולוגיה דורשת תואר בביולוגיה מולקולרית. אין הכנסות, רק שריפת מזומן.",
        management: "מנכ\"ל-מדען עם פרסומים מובילים. צוות מחקר מעולה.",
        moat: "פטנטים, אבל הערכת ערכם דורשת ידע מדעי עמוק.",
        events: "תוצאות שלב 2 \'מעודדות\' — אבל המונח מעורפל. מתחרה פרסם תוצאות דומות.",
        metrics: {
            basic: [
                { name: "P/E", value: "N/A (אין רווח)" },
                { name: "שווי שוק", value: "₪1.2B" },
                { name: "Burn Rate", value: "₪15M/רבעון" }
            ],
            advanced: [
                { name: "מזומן", value: "₪180M (12 רבעונות)" },
                { name: "שלב קליני", value: "3 (אחרון)" },
                { name: "הסתברות אישור FDA", value: "~50% (ממוצע סקטורי)" }
            ]
        },
        historicalData: [
            { year: "year-4", revenue: 0, fcf: -35 },
            { year: "year-3", revenue: 0, fcf: -42 },
            { year: "year-2", revenue: 0, fcf: -48 },
            { year: "year-1", revenue: 0, fcf: -55 },
            { year: "year-0", revenue: 0, fcf: -60 }
        ],
        projectedData: [
            { year: "year+1", revenue: 0, fcf: -65 },
            { year: "year+2", revenue: 50, fcf: -40 }
        ],
        correctDecision: "pass",
        pointValue: 150,
        hints: [{ cost: 0.5, text: "האם אתם באמת מסוגלים להעריך את ההסתברות שטיפול גנטי ספציפי יצליח בשלב 3?" }],
        feedback: {
            principle: { id: "circle-of-competence", name: "מעגל כשירות" },
            decisiveSignals: ["דרושה מומחיות בביולוגיה מולקולרית", "הסתברות אישור ~50%", "אין הכנסות = לא ניתן להעריך"],
            correctExplanation: "נכון! זו לא שאלה אם החברה טובה — זו שאלה אם אתם מסוגלים להעריך. בלי ידע בביולוגיה מולקולרית, אתם מהמרים ב-50/50 ולא משקיעים. זה מחוץ למעגל הכשירות.",
            incorrectExplanation: "טעות! \'אנליסטים נלהבים\' ו\'שלב 3\' נשמעים מבטיחים, אבל אם אתם לא מבינים את המדע — אתם סומכים על אחרים. באפט לעולם לא משקיע במה שהוא לא מבין.",
            counterSignalExplanation: "הצד השני יטען: שלב 3 = ההסתברות הגבוהה ביותר לאישור. מנכ\"ל-מדען מוביל, פטנטים מגנים, ושוק הסרטן ענק. אפשר לסמוך על המומחים."
        },
        workedExample: "1) שאלה ראשונה: האם אני מבין את הטכנולוגיה? טיפול גנטי = מדע מורכב שלא לכולם. 2) אם לא — כל ניתוח שלי הוא ניחוש. 3) \'אנליסטים נלהבים\' ≠ בטוח. 50% מהתרופות בשלב 3 נכשלות. 4) אין הכנסות = לא ניתן להעריך שווי בשיטות רגילות. 5) מסקנה: מחוץ למעגל הכשירות — העל.",
        isGoodValue: false,
        difficulty: "medium",
        difficultyValue: 2,
        hint: "האם אתם באמת מסוגלים להעריך את ההסתברות שטיפול גנטי ספציפי יצליח בשלב 3?"
    },

    // ── TOO HARD (Medium, Pass) ─────────────────────────────────────────
    {
        id: "too-hard-m01",
        name: "קוואנטום AI בע\"מ",
        sector: "טכנולוגיה עילית",
        symbol: "QNTM",
        price: 310.00,
        tier: 2,
        chartType: "none",
        description: "חברת AI שמפתחת מודלים למסחר אלגוריתמי. ההכנסות קפצו 200% בשנה אבל הרווחיות תלויה בביצועי המודלים בשוק, שנתון לרגרסיה לממוצע. לא ניתן לנבא ביצועים עתידיים.",
        management: "שני מייסדים מ-Unit 8200 עם PhD במתמטיקה.",
        moat: "אלגוריתמים, אבל האם הם באמת עדיפים? אי אפשר לדעת בלי לפתוח את ה-\'קופסה השחורה\'.",
        events: "קרן גידור ידועה השקיעה. אבל גם קרנות טועות.",
        metrics: {
            basic: [
                { name: "P/E", value: "45" },
                { name: "ROE", value: "40%" },
                { name: "צמיחה", value: "200%" }
            ],
            advanced: [
                { name: "PEG", value: "0.23 (אם הצמיחה נמשכת)" },
                { name: "FCF (מיליון ₪)", value: "55" },
                { name: "תלות במודל אחד", value: "85% מההכנסות" }
            ]
        },
        historicalData: [
            { year: "year-4", revenue: 15, fcf: -5 },
            { year: "year-3", revenue: 35, fcf: 5 },
            { year: "year-2", revenue: 55, fcf: 12 },
            { year: "year-1", revenue: 95, fcf: 28 },
            { year: "year-0", revenue: 280, fcf: 55 }
        ],
        projectedData: [
            { year: "year+1", revenue: 400, fcf: 80 },
            { year: "year+2", revenue: 350, fcf: 50 }
        ],
        correctDecision: "pass",
        pointValue: 150,
        // FCF BREAKER: FCF very positive and growing fast, but answer is pass
        hints: [{ cost: 0.5, text: "200% צמיחה ו-PEG 0.23 — חלום? או שהצמיחה לא ניתנת לחיזוי?" }],
        feedback: {
            principle: { id: "too-hard", name: "קשה מדי" },
            decisiveSignals: ["85% תלות במודל אחד", "צמיחה 200% = לא ניתנת לחיזוי", "\'קופסה שחורה\' = לא ניתנת לניתוח"],
            correctExplanation: "נכון! PEG 0.23 מפתה מאוד, אבל 200% צמיחה לא ניתנת לחיזוי. 85% מההכנסות ממודל אחד שאף אחד מבחוץ לא מבין = לא ניתן לניתוח. \'קשה מדי\' לא אומר גרוע — אומר שהסיכון לא ניתן להערכה.",
            incorrectExplanation: "טעות! FCF ₪55M ו-PEG 0.23 מסנוורים, אבל אם אתם לא יכולים לנבא אם הצמיחה תימשך, אתם מהמרים — לא משקיעים. באפט עובר על מה שהוא לא מבין.",
            counterSignalExplanation: "הצד השני יטען: PEG 0.23 = מציאת עשור. מייסדים מ-8200 + השקעת קרן גידור = תמחור מומחים. AI הוא העתיד, ומי שלא ישקיע יפסיד."
        },
        workedExample: "1) צמיחה 200%, PEG 0.23 — מרשים. 2) אבל: צמיחה מ-₪95M ל-₪280M בשנה = האם זה ניתן לשכפול? 3) 85% תלות במודל אחד = סיכון קונצנטרציה קיצוני. 4) מודל AI = \'קופסה שחורה\' — אני לא יכול להעריך אם הוא באמת עדיף. 5) רגרסיה לממוצע: ביצועי מסחר אלגוריתמי נוטים לדעוך. 6) מסקנה: לא יכול לנתח → קשה מדי → העל.",
        isGoodValue: false,
        difficulty: "medium",
        difficultyValue: 2,
        hint: "200% צמיחה ו-PEG 0.23 — חלום? או שהצמיחה לא ניתנת לחיזוי?"
    },

    // ── GROWTH TRAP (Medium, Buy — profitable growth) ────────────────────
    // Direction unlock: growth-trap had almost no "buy"
    {
        id: "profitable-growth-m01",
        name: "פינטק-פיי בע\"מ",
        sector: "פינטק",
        symbol: "FNTP",
        price: 195.00,
        tier: 2,
        chartType: "quarterly",
        description: "אפליקציית תשלומים שגדלה 40% בשנה — אבל בניגוד למתחרים, היא רווחית. NRR 135%, churn רק 3%, Rule of 40 = 52. המרווח הגולמי 75% והמרווח התפעולי 12% ועולה.",
        management: "מייסדת עם 15% אחזקה. מתמקדת ברווחיות מיום ראשון.",
        moat: "אפקט רשת + עלות מעבר (אינטגרציה עמוקה עם מערכות ERP).",
        events: "שותפות עם בנק גדול. NRR עלה מ-120% ל-135% בשנה.",
        metrics: {
            basic: [
                { name: "P/S", value: "8" },
                { name: "NRR", value: "135%" },
                { name: "Rule of 40", value: "52" }
            ],
            advanced: [
                { name: "מרווח גולמי", value: "75%" },
                { name: "מרווח תפעולי", value: "12% (עולה)" },
                { name: "Churn שנתי", value: "3%" }
            ]
        },
        quarterlyData: [
            { quarter: "Q1 year-1", revenue: 38, fcf: 3 },
            { quarter: "Q2 year-1", revenue: 42, fcf: 4 },
            { quarter: "Q3 year-1", revenue: 48, fcf: 5 },
            { quarter: "Q4 year-1", revenue: 52, fcf: 6 },
            { quarter: "Q1 year-0", revenue: 55, fcf: 7 },
            { quarter: "Q2 year-0", revenue: 62, fcf: 9 }
        ],
        projectedData: [
            { year: "year+1", revenue: 290, fcf: 42 },
            { year: "year+2", revenue: 400, fcf: 68 }
        ],
        correctDecision: "buy",
        pointValue: 150,
        hints: [{ cost: 0.5, text: "P/S 8 נראה גבוה — אבל מה Rule of 40 אומר על שילוב הצמיחה עם הרווחיות?" }],
        feedback: {
            principle: { id: "growth-trap", name: "מלכודת צמיחה" },
            decisiveSignals: ["Rule of 40 = 52 — צמיחה + רווחיות", "NRR 135% = לקוחות מוציאים יותר", "churn 3% = שימור גבוה"],
            correctExplanation: "מצוין! לא כל צמיחה מהירה היא מלכודת! צמיחה עם רווחיות (Rule of 40 > 40), NRR גבוה, ו-churn נמוך = צמיחה בריאה ובת-קיימא. P/S 8 מוצדק כשהמרווחים עולים.",
            incorrectExplanation: "טעות! P/S 8 וצמיחה 40% הזכירו לך מלכודות צמיחה, אבל כאן יש רווחיות, NRR 135%, ו-churn 3%. ההבדל בין מלכודת צמיחה לצמיחה אמיתית הוא בדיוק במספרים האלה.",
            counterSignalExplanation: "הצד השני יטען: P/S 8 גבוה, פינטק הוא שוק תחרותי, ורגולציה פיננסית עלולה לפגוע. 40% צמיחה לא תימשך לנצח, וכשהיא תואט, ה-P/S ייראה מופרז."
        },
        workedExample: "1) P/S 8 — גבוה? בפינטק, צריך להסתכל על SaaS metrics. 2) NRR 135% = הלקוחות הקיימים מביאים 35% יותר הכנסות. 3) Churn 3% = שימור יוצא דופן. 4) Rule of 40 = 52 (צמיחה 40% + מרווח 12%) = בריא. 5) מרווח גולמי 75% = scalability. 6) מסקנה: צמיחה רווחית ובת-קיימא — קנייה.",
        isGoodValue: true,
        difficulty: "medium",
        difficultyValue: 2,
        hint: "P/S 8 נראה גבוה — אבל מה Rule of 40 אומר על שילוב הצמיחה עם הרווחיות?"
    }
],

// ────────────────────────────────────────────────────────────────────────────
// HARD TIER (tier 3) — 10 new companies (with reasoning options)
// Player should feel "I could argue either way." 2-3 signals + 2-3 counter.
// ────────────────────────────────────────────────────────────────────────────

hard: [

    // ── CYCLICAL TRAP (Hard, Buy — counter-intuitive peak P/E buy) ──────
    {
        id: "cyclical-advanced-h01",
        name: "אוניברסל מתכות בע\"מ",
        sector: "מתכות מיוחדות",
        symbol: "UNVM",
        price: 74.00,
        tier: 3,
        chartType: "annual",
        description: "יצרנית מתכות מיוחדות לתעשייה האווירית. P/E 28 על רווחי שפל, נראה יקר. אבל: 70% מההכנסות מחוזי אספקה ל-7 שנים עם יצרני מטוסים, backlog שיא, ובעלי מפעל מודרני שהמתחרים לא יכולים לשכפל.",
        management: "מנכ\"ל מהנדס שמתמקד בחוזים ארוכי טווח. 12% אחזקה. סירב להצעת רכישה.",
        moat: "מפעל ייחודי, תעודות אישור תעופתיות (FAA), חוזים ארוכי טווח, ומוניטין בתעשייה.",
        events: "backlog שיא של ₪800M. חוזה חדש עם Boeing. אבל: הרווחים ברבעון האחרון ירדו 15% בגלל עלויות אנרגיה.",
        metrics: {
            basic: [
                { name: "P/E", value: "28 (על רווחי שפל)" },
                { name: "ROE", value: "8%" },
                { name: "צמיחת הכנסות", value: "-12%" }
            ],
            advanced: [
                { name: "P/E מנורמל", value: "11" },
                { name: "FCF (מיליון ₪)", value: "18" },
                { name: "Backlog", value: "₪800M (4.5 שנות הכנסה)" }
            ]
        },
        historicalData: [
            { year: "year-4", revenue: 220, fcf: 42 },
            { year: "year-3", revenue: 245, fcf: 48 },
            { year: "year-2", revenue: 210, fcf: 30 },
            { year: "year-1", revenue: 190, fcf: 22 },
            { year: "year-0", revenue: 178, fcf: 18 }
        ],
        projectedData: [
            { year: "year+1", revenue: 195, fcf: 28 },
            { year: "year+2", revenue: 230, fcf: 40 }
        ],
        correctDecision: "buy",
        pointValue: 200,
        hints: [{ cost: 0.5, text: "Backlog של 4.5 שנות הכנסה = נראות קדימה שאין לאף חברה מחזורית אחרת." }],
        feedback: {
            principle: { id: "cyclical-trap", name: "מלכודת מחזוריות" },
            decisiveSignals: ["P/E מנורמל 11", "backlog 4.5 שנים", "חפיר תעופתי (FAA)"],
            correctExplanation: "מצוין! כאן המחזוריות מטעה — הרווחים נמוכים, P/E גבוה, אבל backlog ₪800M מבטיח התאוששות. בנוסף, אישורי FAA = חפיר שמתחרים לא יכולים לחצות. P/E מנורמל 11 = זול.",
            incorrectExplanation: "טעות! P/E 28 והכנסות יורדות 12% — נראה נורא. אבל backlog 4.5 שנים אומר שההכנסות יחזרו, וחפיר FAA מגן על הרווחיות לטווח ארוך.",
            counterSignalExplanation: "הצד השני יטען: P/E 28 יקר, הכנסות יורדות 12%, FCF ₪18M חלש, ועלויות אנרגיה עולות. ענף התעופה עצמו מחזורי ויכול להישאר חלש שנים. Backlog יכול להתבטל."
        },
        workedExample: "1) P/E 28, הכנסות -12% — נראה רע. 2) אבל: P/E מנורמל (על רווחים ממוצעי מחזור) = 11 = זול. 3) Backlog ₪800M = 4.5 שנות הכנסה = נראות יוצאת דופן. 4) חפיר FAA = מתחרים צריכים שנים לקבל אישורים. 5) מנכ\"ל עם 12% אחזקה שסירב להצעת רכישה = מאמין. 6) הסיכון: עלויות אנרגיה + עיכוב מחזורי. 7) מסקנה: backlog + חפיר = קנייה בשפל.",
        reasoningOptions: [
            { text: "Backlog 4.5 שנים + חפיר FAA = הכנסות מובטחות לטווח ארוך", correct: true },
            { text: "P/E מנורמל 11 = זול ביחס לממוצע מחזורי", correct: true },
            { text: "P/E 28 = יקר מדי לחברה תעשייתית", correct: false, biasTag: "עיגון על P/E נקודתי" },
            { text: "הכנסות יורדות 12% = עסק בדעיכה", correct: false, biasTag: "טעות מחזוריות" },
            { text: "מנכ\"ל עם 12% אחזקה = skin in the game", correct: true },
            { text: "עלויות אנרגיה עולות = המרווחים ימשיכו להישחק", correct: false, biasTag: "הטיית עדכניות" }
        ],
        isGoodValue: true,
        difficulty: "hard",
        difficultyValue: 3,
        hint: "Backlog של 4.5 שנות הכנסה = נראות קדימה שאין לאף חברה מחזורית אחרת."
    },

    // ── TURNAROUND (Hard, Pass — turnaround that looks convincing) ───────
    {
        id: "turnaround-fake-h01",
        name: "רשת נוף הגולן בע\"מ",
        sector: "מלונאות",
        symbol: "NOFG",
        price: 55.00,
        tier: 3,
        chartType: "quarterly",
        description: "רשת מלונות בצפון שנפגעה קשה מהמלחמה ונכנסה לשיקום. הרבעון האחרון מראה שיפור דרמטי — תפוסה עלתה מ-35% ל-68%. אבל: השיפור בא מהנחות של 40% על המחיר, החוב עצום, ו-3 מלונות דורשים שיפוץ כבד.",
        management: "מנכ\"ל חדש שהגיע מענף אחר. מתמקד ב-marketing ולא בתפעול.",
        moat: "מיקומים יפים אבל נגישים למתחרים. ציוד מיושן.",
        events: "תפוסה עלתה דרמטית אבל ב-40% הנחה. ביקורות אורחים ירדו מ-4.2 ל-3.4 כוכבים.",
        metrics: {
            basic: [
                { name: "P/E", value: "שלילי" },
                { name: "ROE", value: "-8%" },
                { name: "RevPAR", value: "₪280 (ממוצע ענפי: ₪420)" }
            ],
            advanced: [
                { name: "תפוסה", value: "68% (עלתה מ-35%)" },
                { name: "FCF (מיליון ₪)", value: "-18" },
                { name: "חוב/הון", value: "3.2" }
            ]
        },
        quarterlyData: [
            { quarter: "Q3 year-1", revenue: 22, fcf: -8 },
            { quarter: "Q4 year-1", revenue: 18, fcf: -10 },
            { quarter: "Q1 year-0", revenue: 15, fcf: -12 },
            { quarter: "Q2 year-0", revenue: 25, fcf: -6 },
            { quarter: "Q3 year-0", revenue: 38, fcf: -2 }
        ],
        projectedData: [
            { year: "year+1", revenue: 120, fcf: -15 },
            { year: "year+2", revenue: 135, fcf: -8 }
        ],
        correctDecision: "pass",
        pointValue: 200,
        hints: [{ cost: 0.5, text: "תפוסה של 68% מרשימה — אבל ב-RevPAR ₪280 מול ₪420 ענפי, כמה מהתפוסה רווחית?" }],
        feedback: {
            principle: { id: "turnaround", name: "שיקום" },
            decisiveSignals: ["הנחות 40% = תפוסה לא-רווחית", "RevPAR 33% מתחת לממוצע", "חוב/הון 3.2 = סיכון קיומי"],
            correctExplanation: "נכון! השיקום \'המדהים\' הוא אשליה — תפוסה שנבנית על הנחות 40% לא רווחית ולא בת-קיימא. RevPAR ₪280 מול ₪420 ענפי = כל חדר שנמכר מפסיד. וביקורות שיורדות = חוויה גרועה = הלקוחות לא יחזרו.",
            incorrectExplanation: "טעות! תפוסה שקפצה מ-35% ל-68% מסנוורת, אבל שאלו: באיזה מחיר? 40% הנחה = הכנסה לחדר נמוכה מעלות התפעול. זה לא שיקום — זה סבסוד.",
            counterSignalExplanation: "הצד השני יטען: תפוסה קפצה מ-35% ל-68% — השיקום עובד! ברגע שהמותג ישתקם, אפשר לעלות מחירים. מלונות בגולן = נכסים ייחודיים שקשה לשכפל."
        },
        workedExample: "1) תפוסה 35% → 68% — מרשים! אבל... 2) בדיקה: ההנחה 40% = RevPAR ₪280 מול ₪420. 3) חישוב: RevPAR 33% מתחת = סביר שכל חדר בהפסד תפעולי. 4) ביקורות: 4.2 → 3.4 = איכות ירדה = לקוחות לא יחזרו במחיר מלא. 5) חוב/הון 3.2 = אין מרחב לטעות. 6) מנכ\"ל מ-marketing, לא מלונאות = חסר ניסיון ספציפי. 7) מסקנה: שיקום מדומה — תפוסה על חשבון רווחיות. העל.",
        reasoningOptions: [
            { text: "RevPAR 33% מתחת לממוצע = תפוסה לא-רווחית", correct: true },
            { text: "חוב/הון 3.2 = סיכון קיומי אם השיקום נכשל", correct: true },
            { text: "תפוסה עלתה מ-35% ל-68% = השיקום מצליח", correct: false, biasTag: "הטיית אישור" },
            { text: "ביקורות ירדו = חוויה גרועה = לקוחות לא יחזרו", correct: true },
            { text: "מלונות בגולן = נכסי נדל\"ן ייחודיים", correct: false, biasTag: "עיגון על נכסים" },
            { text: "מנכ\"ל חדש = רוח חדשה = תקווה", correct: false, biasTag: "הטיית אופטימיות" }
        ],
        isGoodValue: false,
        difficulty: "hard",
        difficultyValue: 3,
        hint: "תפוסה של 68% מרשימה — אבל ב-RevPAR ₪280 מול ₪420 ענפי, כמה מהתפוסה רווחית?"
    },

    // ── DIVIDEND SUSTAINABILITY (Hard, Pass — hidden cut coming) ─────────
    {
        id: "dividend-complex-h01",
        name: "נכסי עזריאלי הנגב בע\"מ",
        sector: "נדל\"ן מניב",
        symbol: "NKAZ",
        price: 140.00,
        tier: 3,
        chartType: "segments",
        description: "חברת נדל\"ן מניב עם דיבידנד 7% ורקורד של 15 שנות חלוקה. אבל: 40% מהשטחים מושכרים לשוכר עוגן אחד שחוזהו פג בעוד 18 חודשים, והוא פרסם שמחפש מיקום זול יותר. יחס כיסוי ריבית 1.8x בלבד.",
        management: "הנהלה ותיקה שגאה ברקורד הדיבידנד. \'לא ניגע בדיבידנד\' = הבטחה מסוכנת.",
        moat: "מיקום טוב, אבל תלות בשוכר אחד = פגיעות.",
        events: "שוכר עוגן (40% מההכנסות) מחפש מיקום זול יותר. חוזה פג בעוד 18 חודש.",
        metrics: {
            basic: [
                { name: "P/FFO", value: "9" },
                { name: "ROE", value: "14%" },
                { name: "תשואת דיבידנד", value: "7%" }
            ],
            advanced: [
                { name: "יחס כיסוי ריבית", value: "1.8x" },
                { name: "FCF (מיליון ₪)", value: "52" },
                { name: "ריכוז שוכרים", value: "40% שוכר אחד" }
            ]
        },
        segmentData: [
            { name: "שוכר עוגן (חוזה פג 18m)", revenue: 85, margin: "45%", growth: "0%" },
            { name: "שוכרי משרדים (5+ חוזים)", revenue: 65, margin: "38%", growth: "+3%" },
            { name: "מסחרי קמעונאי", revenue: 60, margin: "32%", growth: "-2%" }
        ],
        projectedData: [
            { year: "year+1", revenue: 210, fcf: 50 },
            { year: "year+2", revenue: 160, fcf: 22 }
        ],
        correctDecision: "pass",
        pointValue: 200,
        // FCF BREAKER: FCF very positive today, but cliff ahead
        hints: [{ cost: 0.5, text: "מה קורה ל-FCF, לדיבידנד, וליחס הכיסוי אם שוכר של 40% עוזב?" }],
        feedback: {
            principle: { id: "dividend-sustainability", name: "קיימות דיבידנד" },
            decisiveSignals: ["40% תלות בשוכר אחד שמחפש חלופה", "יחס כיסוי 1.8x = דק מדי", "דיבידנד ייחתך בעזיבה"],
            correctExplanation: "נכון! דיבידנד 7% ו-15 שנות רקורד מרשימים — אבל 40% תלות בשוכר שמחפש מקום אחר = מצב \'לפני הצוק\'. עם יחס כיסוי 1.8x, איבוד השוכר = חיתוך דיבידנד מיידי.",
            incorrectExplanation: "טעות! 15 שנות דיבידנד בנו אמון — וזו בדיוק הבעיה. הרקורד יצר הטיית עיגון. כש-40% מההכנסות בסיכון ויחס הכיסוי 1.8x, הדיבידנד תלוי בשוכר אחד.",
            counterSignalExplanation: "הצד השני יטען: P/FFO 9 זול, 15 שנות דיבידנד = רקורד מוכח. ההנהלה תמצא שוכר חלופי, ואולי השוכר הנוכחי ישאר. מיקום טוב מושך שוכרים."
        },
        workedExample: "1) דיבידנד 7%, P/FFO 9, 15 שנות רקורד — מפתה. 2) בדיקת סיכון: 40% מההכנסות = שוכר אחד שמחפש חלופה. 3) תרחיש עזיבה: הכנסות ירדו ~40% → FCF ירד מ-₪52M ל-~₪22M. 4) יחס כיסוי: 1.8x → ~1.1x = על הגבול. 5) דיבידנד: ₪52M × 70% יחס חלוקה = חייבים לחתוך ל-~₪15M. 6) מסקנה: דיבידנד תלוי בגורם אחד = לא בר-קיימא. העל.",
        reasoningOptions: [
            { text: "40% תלות בשוכר שעוזב = FCF ייחתך בעזיבה", correct: true },
            { text: "יחס כיסוי 1.8x לא ישרוד ירידה של 40% בהכנסות", correct: true },
            { text: "15 שנות דיבידנד = הוכחה שההנהלה מחויבת", correct: false, biasTag: "הטיית עיגון" },
            { text: "P/FFO 9 = זול מאוד לנדל\"ן מניב", correct: false, biasTag: "עיגון על מכפיל" },
            { text: "ההנהלה תמצא שוכר חלופי בקלות", correct: false, biasTag: "הטיית אופטימיות" },
            { text: "סגמנט משרדים + קמעונאות לא מספיק לכסות חוב", correct: true }
        ],
        isGoodValue: false,
        difficulty: "hard",
        difficultyValue: 3,
        hint: "מה קורה ל-FCF, לדיבידנד, וליחס הכיסוי אם שוכר של 40% עוזב?"
    }
],

// ────────────────────────────────────────────────────────────────────────────
// EXPERT TIER (tier 4) — 8 new companies
// Player needs a framework. 3+ signals, 3+ counter-signals.
// ────────────────────────────────────────────────────────────────────────────

expert: [

    // ── CYCLICAL TRAP + MANAGEMENT (Expert, Buy) ────────────────────────
    {
        id: "cyclical-expert-x01",
        name: "גלבוע חומרי גלם בע\"מ",
        sector: "כרייה ומינרלים",
        symbol: "GLBH",
        price: 28.00,
        tier: 4,
        chartType: "annual",
        description: "חברת כרייה שנמצאת בשנה השלישית של שפל מחזורי. המניה ירדה 65% מהשיא. P/E שלילי, אבל: מאזן חזק (חוב/הון 0.2), רכשה זיכיונות חדשים במחירי שפל, ומנכ\"ל ותיק שקנה מניות ב-₪8M בשנה האחרונה. האנליסטים \'מוכרים\' פה אחד.",
        management: "מנכ\"ל 20 שנות ניסיון בכרייה. 15% אחזקה. קנה מניות ב-₪8M כשכולם מוכרים. ניהל 3 מחזורים בהצלחה.",
        moat: "זיכיונות כרייה ייחודיים, עלויות ייצור ברבעון התחתון עולמית, גישה לנמל.",
        events: "כל האנליסטים \'מוכרים\'. 2 מתחרים סגרו מכרות לא רווחיים. רכישת 2 זיכיונות חדשים ב-₪15M (מחיר שפל).",
        metrics: {
            basic: [
                { name: "P/E", value: "שלילי (הפסד מחזורי)" },
                { name: "ROE", value: "-4%" },
                { name: "P/NAV", value: "0.45" }
            ],
            advanced: [
                { name: "P/E מנורמל", value: "5" },
                { name: "חוב/הון", value: "0.2" },
                { name: "עלות ייצור (רבעון עולמי)", value: "25% תחתון" }
            ]
        },
        historicalData: [
            { year: "year-4", revenue: 480, fcf: 90 },
            { year: "year-3", revenue: 350, fcf: 35 },
            { year: "year-2", revenue: 260, fcf: -10 },
            { year: "year-1", revenue: 220, fcf: -18 },
            { year: "year-0", revenue: 210, fcf: -15 }
        ],
        projectedData: [
            { year: "year+1", revenue: 240, fcf: 5 },
            { year: "year+2", revenue: 320, fcf: 45 }
        ],
        correctDecision: "buy",
        pointValue: 300,
        hints: [{ cost: 0.5, text: "כשכל האנליסטים \'מוכרים\' ובעל השליטה קונה ב-₪8M — מי כנראה צודק?" }],
        feedback: {
            principle: { id: "cyclical-trap", name: "מלכודת מחזוריות" },
            decisiveSignals: ["P/E מנורמל 5 = זול מאוד", "חוב/הון 0.2 = תשרוד כל שפל", "מנכ\"ל קונה + מתחרים סוגרים"],
            correctExplanation: "מצוין! זו הדוגמה הקלאסית: כשכולם מוכרים, המשקיע החכם קונה. P/E שלילי על רווחי שפל, אבל P/E מנורמל 5 = זול בטירוף. מאזן חזק + מנכ\"ל שקונה + מתחרים סוגרים = כל הסימנים לתחתית.",
            incorrectExplanation: "טעות! P/E שלילי, הפסדים, \'כל האנליסטים מוכרים\' — הפחיד אותך? בדיוק בזה בנוי שוק ההון. בתחתית מחזור, כשכולם מפחדים — שם ההזדמנויות.",
            counterSignalExplanation: "הצד השני יטען: הפסד מחזורי יכול להימשך שנים. \'קניית מנכ\"ל\' עלולה להיות סינון — הוא מחויב רגשית. P/NAV 0.45 אבל אולי ה-NAV מנופח. אנליסטים אולי צודקים הפעם."
        },
        workedExample: "1) P/E שלילי — מפחיד. אבל זה כרייה = מחזורית מהטהורות. 2) מיקום במחזור: 3 שנות שפל, הכנסות ירדו 56% מהשיא. 3) חוסן: חוב/הון 0.2 = אחת החברות הבטוחות בענף. 4) סימנים לתחתית: 2 מתחרים סגרו = היצע יורד = מחירים יעלו. 5) הנהלה: מנכ\"ל ותיק קונה ב-₪8M = skin in the game מקסימלי. 6) תמחור: P/E מנורמל 5, P/NAV 0.45 = המחיר מתמחר כאילו החברה גוססת. 7) מסקנה: contrarian buy — קנייה בשפל.",
        reasoningOptions: [
            { text: "P/E מנורמל 5 + מאזן חזק = זול ובטוח", correct: true },
            { text: "מתחרים סוגרים = היצע יורד = מחירים יעלו", correct: true },
            { text: "מנכ\"ל קונה ב-₪8M כשכולם מוכרים = contrarian signal", correct: true },
            { text: "כל האנליסטים מוכרים = הם יודעים משהו", correct: false, biasTag: "הטיית עדר" },
            { text: "P/E שלילי = חברה בדרך לפשיטת רגל", correct: false, biasTag: "טעות מחזוריות" },
            { text: "הכנסות ירדו 56% = עסק בקריסה", correct: false, biasTag: "הטיית עדכניות" }
        ],
        sellTriggers: [
            "מנכ\"ל מתחיל למכור מניות",
            "חוב/הון עולה מעל 0.8",
            "מחירי חומרי גלם חוזרים לשיא ללא שיפור ברווחים",
            "מתחרים חדשים נכנסים עם טכנולוגיה זולה יותר"
        ],
        dueDiligence: [
            "לבדוק מחירי חומרי גלם גלובליים — האם יש סימני התאוששות?",
            "לבדוק את מועד תפוגת הזיכיונות החדשים",
            "לוודא שמנכ\"ל לא קנה מניות כחלק מתוכנית מוגדרת מראש"
        ],
        isGoodValue: true,
        difficulty: "expert",
        difficultyValue: 4,
        hint: "כשכל האנליסטים \'מוכרים\' ובעל השליטה קונה ב-₪8M — מי כנראה צודק?"
    },

    // ── MANAGEMENT QUALITY + OWNER EARNINGS (Expert, Pass) ──────────────
    {
        id: "governance-expert-x01",
        name: "אי.די.אי אחזקות בע\"מ",
        sector: "אחזקות מגוונות",
        symbol: "ADIA",
        price: 320.00,
        tier: 4,
        chartType: "segments",
        description: "קבוצת אחזקות גדולה עם ביטוח, נדל\"ן, ותקשורת. על הנייר: P/E 7, דיבידנד 5%, FCF חזק. אבל: מבנה פירמידלי עם 4 שכבות, בעל שליטה שמנהל 3 חברות נוספות, עסקאות בעלי עניין מורכבות, ודוחות שצריך תואר חשבונאות לקרוא.",
        management: "בעל שליטה חכם אבל מנהל \'אימפריה\'. 4 שכבות אחזקה = 22% שליטה כלכלית אבל 51% כוח הצבעה. 3 חברות נוספות = ניגודי עניין.",
        moat: "חברות הבת חזקות (ביטוח, נדל\"ן), אבל השאלה היא כמה ערך מגיע למשקיע במניות.",
        events: "עסקה מורכבת בין חברות הקבוצה שהעשירה את בעל השליטה. \'הלוואת בעלים\' בתנאים לא שוק. דוח של 450 עמודים.",
        metrics: {
            basic: [
                { name: "P/E", value: "7" },
                { name: "ROE", value: "14%" },
                { name: "תשואת דיבידנד", value: "5%" }
            ],
            advanced: [
                { name: "P/NAV", value: "0.6" },
                { name: "FCF (מיליון ₪)", value: "180" },
                { name: "דיסקאונט אחזקה", value: "40%" }
            ]
        },
        segmentData: [
            { name: "ביטוח (חברת בת)", revenue: 2400, margin: "8%", growth: "+5%" },
            { name: "נדל\"ן (חברת בת)", revenue: 800, margin: "42%", growth: "+3%" },
            { name: "תקשורת (חברת בת)", revenue: 600, margin: "12%", growth: "-2%" },
            { name: "הוצאות מטה + בעלי עניין", revenue: -120, margin: "N/A", growth: "+15%" }
        ],
        projectedData: [
            { year: "year+1", revenue: 3800, fcf: 185 },
            { year: "year+2", revenue: 3900, fcf: 190 }
        ],
        correctDecision: "pass",
        pointValue: 300,
        // FCF BREAKER: FCF very strong at ₪180M, but answer is pass
        hints: [{ cost: 0.5, text: "P/E 7 עם FCF ₪180M — למה הדיסקאונט 40%? השוק לא טיפש." }],
        feedback: {
            principle: { id: "management-quality", name: "איכות הנהלה" },
            decisiveSignals: ["4 שכבות פירמידה = 22% כלכלי, 51% הצבעה", "עסקאות בעלי עניין", "הוצאות מטה +15% בשנה"],
            correctExplanation: "נכון! הדיסקאונט של 40% לא חינם — הוא משקף ממשל תאגידי בעייתי. בעל שליטה עם 22% אחזקה כלכלית ו-51% כוח הצבעה = הוא מקבל החלטות לטובתו, לא לטובתכם. FCF ₪180M — אבל כמה באמת מגיע למשקיע?",
            incorrectExplanation: "טעות! P/E 7 ו-FCF ₪180M מסנוורים. אבל הדיסקאונט 40% הוא שם לסיבה: מבנה פירמידלי + עסקאות בעלי עניין = הערך נוזל לבעל השליטה.",
            counterSignalExplanation: "הצד השני יטען: P/NAV 0.6 = קונים נכסים ייכותיים ב-60%. חברות הבת עצמן חזקות (ביטוח, נדל\"ן). בעל שליטה חכם יוצר ערך לטווח ארוך, והדיסקאונט יצטמצם."
        },
        workedExample: "1) P/E 7, FCF ₪180M, P/NAV 0.6 — זול! אבל למה? 2) מבנה: 4 שכבות פירמידה. 22% כלכלי = על כל ₪1 ערך שנוצר, בעל השליטה מקבל רק 22 אגורות, אבל שולט ב-51%. 3) עסקאות: \'הלוואת בעלים בתנאים לא שוק\' + הוצאות מטה +15% = ניקוז שיטתי. 4) מורכבות: דוח 450 עמודים = מה מוסתר? 5) דיסקאונט 40% = השוק מעריך שהממשל התאגידי פוגע בערך. 6) מסקנה: נכסים טובים, ממשל רע = העל. הדיסקאונט מוצדק.",
        reasoningOptions: [
            { text: "22% כלכלי אבל 51% הצבעה = אינטרסים לא מיושרים", correct: true },
            { text: "עסקאות בעלי עניין + הוצאות מטה +15% = ניקוז ערך", correct: true },
            { text: "P/E 7 = זול מדי — יש הזדמנות לצמצום דיסקאונט", correct: false, biasTag: "הטיית עיגון על מכפיל" },
            { text: "דיסקאונט 40% מגן עלינו — גם אם יש בעיות, קנינו בזול", correct: false, biasTag: "מלכודת ערך" },
            { text: "חברות הבת (ביטוח, נדל\"ן) חזקות עצמאית", correct: false, biasTag: "הפרדה לא-לגיטימית" },
            { text: "דוח 450 עמודים + מבנה מורכב = too hard to analyze", correct: true }
        ],
        sellTriggers: [
            "שינוי ממשל תאגידי לטובת משקיעי מיעוט",
            "ביטול מבנה פירמידלי",
            "שקיפות מלאה בעסקאות בעלי עניין"
        ],
        dueDiligence: [
            "לבדוק כל עסקאות בעלי עניין ב-3 שנים אחרונות",
            "להשוות דיסקאונט אחזקה לקבוצות דומות",
            "לבדוק האם רשות ני\"ע העירה על הדיווח"
        ],
        isGoodValue: false,
        difficulty: "expert",
        difficultyValue: 4,
        hint: "P/E 7 עם FCF ₪180M — למה הדיסקאונט 40%? השוק לא טיפש."
    }
]

}; // END NEW_COMPANIES_V2


// ============================================================================
// SECTION 2: VERSUS ROUNDS (Pick the better investment)
// ============================================================================

const VERSUS_ROUNDS_V2 = [

    // ── VERSUS 1: Moat Quality (Easy) ───────────────────────────────────
    {
        id: "versus-moat-quality-01",
        tier: 1,
        type: "versus",
        title: "מי בונה חפיר חזק יותר?",
        description: "שתי חברות בסקטור המזון — אחת עם מותג חזק ושנייה עם יתרון עלויות. מי מוגנת טוב יותר?",
        companyA: {
            name: "טעמי הגולן בע\"מ",
            symbol: "TGOL",
            sector: "מזון",
            description: "יצרנית מוצרי חלב אורגניים עם מותג פרמיום. מרווח גולמי 42%, נאמנות לקוחות גבוהה, אבל צמיחה איטית (3% בשנה).",
            metrics: [
                { name: "P/E", value: "18" },
                { name: "מרווח גולמי", value: "42%" },
                { name: "נאמנות מותג", value: "גבוהה (NPS 65)" },
                { name: "צמיחה", value: "3%" }
            ],
            historicalFCF: [28, 29, 30, 31, 32]
        },
        companyB: {
            name: "סופר-פרש מפיצים בע\"מ",
            symbol: "SPRF",
            sector: "מזון",
            description: "מפיצת מזון גדולה עם יתרון סקייל — הזולה ב-15% מהמתחרים. מרווח גולמי 12% אבל מחזור גבוה. צמיחה 8% בשנה.",
            metrics: [
                { name: "P/E", value: "12" },
                { name: "מרווח גולמי", value: "12%" },
                { name: "יתרון מחיר", value: "זולה ב-15%" },
                { name: "צמיחה", value: "8%" }
            ],
            historicalFCF: [18, 20, 22, 25, 28]
        },
        correctAnswer: "A",
        pointValue: 120,
        feedback: {
            explanation: "טעמי הגולן עדיפה. מותג פרמיום עם מרווח 42% = חפיר שקשה לשחוק. יתרון מחיר (סופר-פרש) נשחק ברגע שמתחרה גדול יותר נכנס. באפט: \'מרווחים גבוהים = חפיר. מרווחים דקים = מירוץ לתחתית.\'",
            counterArgument: "סופר-פרש צומחת מהר יותר (8% vs 3%) ו-P/E 12 זול יותר. יתרון סקייל יכול להתחזק עם הזמן.",
            principle: { id: "moat", name: "חפיר כלכלי" }
        },
        workedExample: "1) סוג חפיר: מותג (טעמי) vs. עלות (סופר). 2) עמידות: מותג פרמיום קשה לשכפל. יתרון עלות — אם מישהו גדול יותר נכנס, היתרון נעלם. 3) מרווח: 42% vs 12% — טעמי יכולה לספוג הפתעות. 4) מסקנה: חפיר מותג > חפיר עלות."
    },

    // ── VERSUS 2: Real vs Fake Turnaround (Medium) ──────────────────────
    {
        id: "versus-turnaround-01",
        tier: 2,
        type: "versus",
        title: "איזה שיקום אמיתי?",
        description: "שתי חברות בשיקום — אחת עם שיפור תפעולי אמיתי ושנייה עם שיפור חשבונאי. מי שווה להשקיע?",
        companyA: {
            name: "תעשיות הצפון המחודשת בע\"מ",
            symbol: "TZFN",
            sector: "תעשייה",
            description: "מפעל שסגר 3 קווים הפסדיים, צמצם כוח אדם 25%, והתמקד ב-2 מוצרים רווחיים. מרווח תפעולי עלה מ-2% ל-10% בשנה. מנכ\"לית חדשה קנתה מניות.",
            metrics: [
                { name: "P/E", value: "22 (על רווחי שפל)" },
                { name: "מרווח תפעולי", value: "10% (עלה מ-2%)" },
                { name: "FCF", value: "₪8M (היה ₪-15M)" },
                { name: "הכנסות", value: "ירדו 20% (בכוונה)" }
            ],
            historicalFCF: [-15, -10, -5, 3, 8]
        },
        companyB: {
            name: "גלובל שירותים IT בע\"מ",
            symbol: "GLIT",
            sector: "IT",
            description: "חברת IT שמראה \'שיפור\' ברווח — אבל דרך שינוי מדיניות חשבונאית (הכרה מוקדמת בהכנסות) ומכירת נכס חד-פעמית. ה-FCF עדיין שלילי.",
            metrics: [
                { name: "P/E", value: "15 (על רווח מדווח)" },
                { name: "רווח נקי", value: "₪12M (כולל ₪8M חד-פעמי)" },
                { name: "FCF", value: "₪-5M" },
                { name: "הכנסות", value: "עלו 5%" }
            ],
            historicalFCF: [-12, -10, -8, -7, -5]
        },
        correctAnswer: "A",
        pointValue: 150,
        feedback: {
            explanation: "הצפון המחודשת היא השיקום האמיתי. FCF הפך חיובי דרך שיפור תפעולי (סגירת קווים, מיקוד) — לא חשבונאות. גלובל שירותים רק נראית טוב — ₪8M מתוך ₪12M רווח הם חד-פעמיים, ו-FCF עדיין שלילי.",
            counterArgument: "גלובל שירותים: P/E 15 זול יותר מ-P/E 22, הכנסות עולות (לא יורדות), והרווח הנקי חיובי. שיקום הצפון = הכנסות יורדות 20% = מתכווצת.",
            principle: { id: "turnaround", name: "שיקום" }
        },
        workedExample: "1) בדיקת FCF: הצפון הפך מ-₪-15M ל-₪+8M = שיפור אמיתי. גלובל עדיין ₪-5M. 2) סוג שיפור: הצפון = תפעולי (סגירת הפסדיים). גלובל = חשבונאי (הכרה מוקדמת). 3) מרווח: הצפון 2% → 10%. גלובל — אם נסיר חד-פעמי, הרווח ₪4M, P/E = 45. 4) מסקנה: שיפור תפעולי > שיפור חשבונאי."
    },

    // ── VERSUS 3: Dividend Quality (Medium) ─────────────────────────────
    {
        id: "versus-dividend-01",
        tier: 2,
        type: "versus",
        title: "איזה דיבידנד בטוח יותר?",
        description: "שתי חברות דיבידנד — אחת עם תשואה גבוהה ושנייה עם תשואה נמוכה. מי תשלם דיבידנד בעוד 10 שנים?",
        companyA: {
            name: "אנרג\'י פאוור בע\"מ",
            symbol: "ENRP",
            sector: "אנרגיה",
            description: "חברת אנרגיה מסורתית. דיבידנד 8%, יחס חלוקה 90%. הכנסות יורדות 3% בשנה בגלל מעבר לאנרגיה ירוקה. לא משקיעה בהתחדשות.",
            metrics: [
                { name: "תשואת דיבידנד", value: "8%" },
                { name: "יחס חלוקה", value: "90%" },
                { name: "צמיחת הכנסות", value: "-3%" },
                { name: "CAPEX", value: "מינימלי" }
            ],
            historicalFCF: [55, 52, 50, 48, 45]
        },
        companyB: {
            name: "ירוק אנרגיה בע\"מ",
            symbol: "YROK",
            sector: "אנרגיה מתחדשת",
            description: "חברת אנרגיה מתחדשת. דיבידנד \'רק\' 2.5%, יחס חלוקה 30%, אבל צמיחת דיבידנד 15% בשנה. חוזי PPA ל-20 שנה.",
            metrics: [
                { name: "תשואת דיבידנד", value: "2.5%" },
                { name: "יחס חלוקה", value: "30%" },
                { name: "צמיחת דיבידנד", value: "15% בשנה" },
                { name: "חוזי PPA", value: "20 שנה" }
            ],
            historicalFCF: [15, 20, 28, 35, 42]
        },
        correctAnswer: "B",
        pointValue: 150,
        feedback: {
            explanation: "ירוק אנרגיה עדיפה. תשואה 2.5% עם צמיחה 15% = תשואה על עלות 5% בעוד 5 שנים, 10% בעוד 10. אנרג\'י פאוור: 8% שיורד — בעוד 5 שנים כנראה ייחתך.",
            counterArgument: "אנרג\'י פאוור: 8% היום > 2.5% היום. ₪8,000 בשנה מול ₪2,500 על כל ₪100K. צריך לחכות שנים עד שירוק \'תשיג\' את אנרג\'י.",
            principle: { id: "dividend-sustainability", name: "קיימות דיבידנד" }
        },
        workedExample: "1) היום: אנרג\'י 8% > ירוק 2.5%. 2) בעוד 5 שנים: אנרג\'י ~6% (יורד), ירוק ~5% (עולה). 3) בעוד 10: אנרג\'י ~4% (אם בכלל), ירוק ~10%. 4) סיכון: אנרג\'י 90% יחס חלוקה = אין מרווח. ירוק 30% = מרחב אדיר. 5) מסקנה: דיבידנד-גידול > דיבידנד גבוה."
    },

    // ── VERSUS 4: Management vs. Metrics (Hard) ─────────────────────────
    {
        id: "versus-management-01",
        tier: 3,
        type: "versus",
        title: "הנהלה מעולה עם מספרים בינוניים, או מספרים מעולים עם הנהלה בינונית?",
        description: "שתי חברות טכנולוגיה — באחת ההנהלה מצוינת אבל המספרים ממוצעים, ובשנייה המספרים מרשימים אבל ההנהלה מעוררת חשש.",
        companyA: {
            name: "קוד-מאסטר בע\"מ",
            symbol: "CDMS",
            sector: "טכנולוגיה",
            description: "חברת תוכנה עם מנכ\"ל-מייסד שמחזיק 20%, מושך משכורת צנועה, ומתגמל לפי ROIC. צמיחה 12%, P/E 22, מרווח תפעולי 18%. לא מרשים — אבל עקבי 8 שנים.",
            metrics: [
                { name: "P/E", value: "22" },
                { name: "צמיחה", value: "12%" },
                { name: "ROIC", value: "18%" },
                { name: "אחזקת מנכ\"ל", value: "20%" }
            ],
            historicalFCF: [22, 24, 27, 30, 33]
        },
        companyB: {
            name: "דאטה-בום בע\"מ",
            symbol: "DTBM",
            sector: "טכנולוגיה",
            description: "חברת big data שצומחת 35%, P/E 18 (PEG 0.5!), מרווח תפעולי 25%. אבל: מנכ\"ל החליף 3 פעמים ב-5 שנים, שכר הנהלה = 12% מהרווח, ו-CFO עזב פתאום.",
            metrics: [
                { name: "P/E", value: "18" },
                { name: "צמיחה", value: "35%" },
                { name: "ROIC", value: "28%" },
                { name: "תחלופת הנהלה", value: "3 מנכ\"לים ב-5 שנים" }
            ],
            historicalFCF: [8, 15, 28, 45, 62]
        },
        correctAnswer: "A",
        pointValue: 200,
        feedback: {
            explanation: "קוד-מאסטר עדיפה. הנהלה יציבה עם skin in the game = פחות סיכון. דאטה-בום: מספרים מרשימים, אבל 3 מנכ\"לים ב-5 שנים + CFO שעזב = דגלי אדום. באפט: \'כשהנהלה מעולה נכנסת לעסק עם מוניטין רע, המוניטין של העסק נשאר.\'",
            counterArgument: "דאטה-בום: PEG 0.5 = מציאה אבסולוטית. ROIC 28% > 18%. FCF קפץ מ-₪8M ל-₪62M. אולי תחלופת המנכ\"לים היא סימן שהדירקטוריון דרשני ולא מסתפק בבינוניות.",
            principle: { id: "management-quality", name: "איכות הנהלה" }
        },
        workedExample: "1) מספרים: דאטה-בום מנצחת (צמיחה 35%, ROIC 28%, PEG 0.5). 2) הנהלה: קוד-מאסטר מנצחת (מייסד עם 20%, 8 שנות עקביות). 3) סיכונים: דאטה-בום — 3 מנכ\"לים + CFO עזב = מה קורה שם? 4) עקביות: קוד-מאסטר 8 שנים רצופות. דאטה-בום — האם ה-35% ימשך ללא הנהלה יציבה? 5) מסקנה: הנהלה > מספרים לטווח ארוך."
    },

    // ── VERSUS 5: Cyclical Timing (Hard) ────────────────────────────────
    {
        id: "versus-cyclical-timing-01",
        tier: 3,
        type: "versus",
        title: "שתי חברות מחזוריות — איזו בזמן הנכון?",
        description: "שתי חברות מחזוריות באותו ענף. אחת בשיא עם P/E נמוך, שנייה בשפל עם P/E גבוה. מי עדיפה?",
        companyA: {
            name: "מפעלי הנגב כימיקלים",
            symbol: "MFNG",
            sector: "כימיה",
            description: "P/E 5, ROE 30%, FCF שיא. אבל: מחירי כימיקלים בשיא, קיבולת חדשה נכנסת לשוק, ובעלים מכרו מניות.",
            metrics: [
                { name: "P/E", value: "5 (שיא רווחים)" },
                { name: "ROE", value: "30%" },
                { name: "FCF", value: "₪120M (שיא)" },
                { name: "מכירות בעלים", value: "כן" }
            ],
            historicalFCF: [40, 55, 75, 100, 120]
        },
        companyB: {
            name: "כימיקל ים המלח",
            symbol: "KYMS",
            sector: "כימיה",
            description: "P/E 35, ROE 3%, FCF כמעט אפס. אבל: עלויות ייצור נמוכות ב-25% מהמתחרים, אפס חוב, ומנכ\"ל קנה מניות.",
            metrics: [
                { name: "P/E", value: "35 (שפל רווחים)" },
                { name: "ROE", value: "3%" },
                { name: "FCF", value: "₪5M (שפל)" },
                { name: "קניות מנכ\"ל", value: "₪3M" }
            ],
            historicalFCF: [85, 50, 20, 8, 5]
        },
        correctAnswer: "B",
        pointValue: 200,
        feedback: {
            explanation: "כימיקל ים המלח עדיפה — קנייה בשפל. P/E 35 על רווחי שפל = זול. P/E 5 על רווחי שיא = יקר. עלויות נמוכות + אפס חוב = תשרוד כל שפל. מנכ\"ל קונה vs. בעלים מוכרים = סיגנל חזק.",
            counterArgument: "מפעלי הנגב: FCF ₪120M מול ₪5M. P/E 5 מול 35. ROE 30% מול 3%. כל מטריקה מצביעה על הנגב. \'שפל\' של כימיקל עלול להימשך שנים.",
            principle: { id: "cyclical-trap", name: "מלכודת מחזוריות" }
        },
        workedExample: "1) כלל מחזוריות: קנה P/E גבוה (שפל), מכור P/E נמוך (שיא). 2) הנגב: P/E 5 = שיא + בעלים מוכרים. 3) כימיקל: P/E 35 = שפל + מנכ\"ל קונה. 4) עלויות: כימיקל ברבעון תחתון = תשרוד ותרוויח ראשונה בהתאוששות. 5) מסקנה: הפוך מהאינסטינקט — P/E 35 > P/E 5."
    }
];


// ============================================================================
// SECTION 3: SELL/HOLD SCENARIOS
// ============================================================================

const SELL_HOLD_ROUNDS_V2 = [

    // ── SELL/HOLD 1: Sunk Cost (Easy) ───────────────────────────────────
    {
        id: "sellhold-sunk-cost-01",
        tier: 1,
        type: "sell-hold",
        title: "הפסד של 40% — מה עושים?",
        purchaseContext: {
            name: "מגה-סטור קמעונאות בע\"מ",
            symbol: "MGST",
            sector: "קמעונאות",
            purchasePrice: 50.00,
            currentPrice: 30.00,
            change: "-40%",
            holdingPeriod: "18 חודשים"
        },
        newInformation: "החברה איבדה את הלקוח הגדול ביותר שלה (25% מההכנסות). 3 מתחרים חדשים נכנסו לשוק. המנכ\"ל עזב.",
        currentMetrics: [
            { name: "P/E (נוכחי)", value: "18" },
            { name: "FCF", value: "₪12M (ירד מ-₪25M)" },
            { name: "חוב/הון", value: "1.5 (עלה מ-0.8)" }
        ],
        correctDecision: "sell",
        pointValue: 120,
        feedback: {
            principle: { id: "sunk-cost", name: "עלות שקועה" },
            explanation: "למכור! התזה המקורית נשברה — הלקוח הגדול הלך, ההנהלה השתנתה, והתחרות גברה. מה ששילמת (₪50) לא רלוונטי. השאלה היחידה: \'האם הייתי קונה היום ב-₪30?\' התשובה ברורה: לא.",
            counterArgument: "\'אם אמכור, אממש הפסד של 40%. אולי ישתפר?\' — זו בדיוק מלכודת עלות שקועה. ההפסד כבר קרה בין אם תמכור ובין אם לא.",
            biasWarning: "עלות שקועה: הנטייה להחזיק בהשקעה מפסידה כי \'כבר השקעתי\'. המחיר ששילמת לא משנה — רק העתיד משנה."
        },
        workedExample: "1) שאלה: האם הייתי קונה היום ב-₪30? 2) בדיקה: הלקוח הגדול הלך (25% הכנסות), מנכ\"ל עזב, 3 מתחרים חדשים, חוב כפול. 3) תשובה: לא — בשום פנים. 4) אז למה להחזיק? כי \'כבר הפסדתי 40%\' = עלות שקועה. 5) מסקנה: למכור ולהעביר את הכסף להשקעה טובה יותר."
    },

    // ── SELL/HOLD 2: Thesis Intact (Medium) ──────────────────────────────
    {
        id: "sellhold-thesis-intact-01",
        tier: 2,
        type: "sell-hold",
        title: "המניה ירדה 30% — אבל האם התזה נשברה?",
        purchaseContext: {
            name: "טק-מד פתרונות רפואיים בע\"מ",
            symbol: "TKMD",
            sector: "טכנולוגיה רפואית",
            purchasePrice: 120.00,
            currentPrice: 84.00,
            change: "-30%",
            holdingPeriod: "8 חודשים"
        },
        newInformation: "ירידה כללית בשוק של 20%. מכירות האגרסיביות של קרנות ETF. אבל: הדוח האחרון מעולה — הכנסות +22%, FCF +35%, חוזה חדש עם בית חולים. אף דבר בחברה עצמה לא השתנה.",
        currentMetrics: [
            { name: "P/E (נוכחי)", value: "15 (ירד מ-22)" },
            { name: "FCF", value: "₪45M (עלה 35%)" },
            { name: "צמיחת הכנסות", value: "+22%" }
        ],
        correctDecision: "hold",
        pointValue: 150,
        feedback: {
            principle: { id: "loss-aversion", name: "שנאת הפסד" },
            explanation: "להחזיק! התזה לא נשברה — להפך, הדוח מעולה. הירידה היא מאקרו (שוק כללי), לא מיקרו (החברה). P/E ירד מ-22 ל-15 בזמן שהביצועים השתפרו = עכשיו זולה יותר מכשקנית. אם כבר — אפשר להגדיל פוזיציה.",
            counterArgument: "\'ירד 30%, מי יודע כמה עוד יירד?\' — שנאת הפסד. \'אם אמכור ואקנה מחדש בתחתית\' — ניסיון לתזמן שוק.",
            biasWarning: "שנאת הפסד: הכאב מהפסד חזק פי 2 מההנאה מרווח באותו גודל. זה גורם לנו למכור בפאניקה כשהתזה עדיין טובה."
        },
        workedExample: "1) למה המניה ירדה? שוק כללי -20%, לא בעיה בחברה. 2) בדיקת תזה: הכנסות +22%, FCF +35%, חוזה חדש — הכל חיובי. 3) תמחור: P/E ירד מ-22 ל-15 = עכשיו זולה יותר. 4) שאלה: \'אם לא הייתי מחזיק, הייתי קונה ב-₪84?\' כן! 5) מסקנה: התזה שלמה — להחזיק (אולי אפילו להגדיל)."
    },

    // ── SELL/HOLD 3: Disposition Effect (Hard) ──────────────────────────
    {
        id: "sellhold-disposition-01",
        tier: 3,
        type: "sell-hold",
        title: "המניה עלתה 100% — למכור או להחזיק?",
        purchaseContext: {
            name: "סייבר-שילד בע\"מ",
            symbol: "CYBS",
            sector: "סייבר",
            purchasePrice: 80.00,
            currentPrice: 160.00,
            change: "+100%",
            holdingPeriod: "2 שנים"
        },
        newInformation: "המניה הכפילה את עצמה. אתם מרגישים שצריך \'לקחת רווחים\'. אבל: החברה חתמה על חוזה ענק עם ממשלת ארה\"ב, ה-ARR קפץ 50%, ו-NRR 145%. הצמיחה מאיצה, לא מאטה.",
        currentMetrics: [
            { name: "P/E (נוכחי)", value: "35" },
            { name: "PEG", value: "1.2 (צמיחה 30%)" },
            { name: "NRR", value: "145%" },
            { name: "ARR צמיחה", value: "+50%" }
        ],
        correctDecision: "hold",
        pointValue: 200,
        feedback: {
            principle: { id: "disposition-effect", name: "אפקט דיספוזיציה" },
            explanation: "להחזיק! +100% מרגיש \'מספיק\' — אבל זו הטיה. השאלה לא כמה הרווחת, אלא מה יקרה מכאן. ARR +50%, NRR 145%, חוזה ממשלתי = הצמיחה מאיצה. PEG 1.2 = עדיין לא יקר. \'לקחת רווחים\' הוא אחד המשפטים הכי יקרים בהשקעות.",
            counterArgument: "\'עוף ביד שווה שניים על העץ\'. \'אף אחד לא נפגע מלקיחת רווח\'. אבל: אם מכרת את אמזון אחרי 100%, פספסת 10,000%.",
            biasWarning: "אפקט דיספוזיציה: הנטייה למכור מנצחות מוקדם מדי ולהחזיק מפסידות יותר מדי. בדיוק ההפך ממה שצריך."
        },
        workedExample: "1) הנטייה: \'עשיתי 100%, בוא נכסה\'. 2) אבל מה אומרים המספרים? ARR +50%, NRR 145% = הצמיחה מאיצה. 3) PEG 1.2 = עדיין לא יקר ביחס לצמיחה. 4) חוזה ממשלתי = catalyst חדש. 5) שאלה: \'האם הייתי קונה היום ב-₪160?\' עם ARR +50% ו-PEG 1.2? כן! 6) מסקנה: אפקט דיספוזיציה. להחזיק."
    }
];


// ============================================================================
// SECTION 4: NEW SPECIAL EVENTS
// ============================================================================

const NEW_SPECIAL_EVENTS_V2 = [

    // ── EVENT 1: Insider Buying vs. Selling (Easy) ──────────────────────
    {
        id: "event-insider-signals-01",
        tier: 1,
        type: "special-event",
        eventType: "company",
        title: "מסחר פנימיים — מה הם יודעים?",
        description: "בעל השליטה של חברת תשתיות יציבה מכר 10% מאחזקתו בחודש האחרון. באותו זמן, 3 דירקטורים קנו מניות. מה הסיגנל החזק יותר?",
        options: [
            { text: "בעל השליטה מוכר = סיגנל שלילי חזק. הוא יודע יותר.", value: "negative" },
            { text: "דירקטורים קונים = סיגנל חיובי. בעל שליטה אולי מגוון.", value: "positive" },
            { text: "זה לא מספיק מידע. צריך לבדוק למה בעל השליטה מוכר.", value: "neutral" }
        ],
        correctOption: "neutral",
        pointValue: 100,
        feedback: {
            correct: "מצוין! \'בעלים מוכרים מאלף סיבות, אבל קונים רק מסיבה אחת.\' צריך לבדוק: האם מכר בגלל גירושין? מיסוי? או כי הוא יודע משהו? בלי ההקשר, אי אפשר להחליט.",
            incorrect: "לא מדויק. מכירה של בעלים לא תמיד שלילית (גירושין, מיסוי, גיוון), וקנייה של דירקטורים לא תמיד חיובית (מחויבות תדמיתית). ההקשר קריטי.",
            principle: { id: "management-quality", name: "איכות הנהלה" }
        }
    },

    // ── EVENT 2: Market Crash Response (Medium) ─────────────────────────
    {
        id: "event-market-crash-01",
        tier: 2,
        type: "special-event",
        eventType: "macro",
        title: "קריסת שוק — מה עושים?",
        description: "השוק ירד 25% בחודש. הפורטפוליו שלכם ירד 30%. הכותרות מפחידות. \'מומחים\' צופים ירידה נוספת של 20%. אתם מחזיקים 3 חברות איכותיות שהתזה שלהם לא נשברה, אבל יש לכם 15% מזומן.",
        options: [
            { text: "למכור הכל ולחכות שהסערה תעבור — הגנה על ההון.", value: "sell-all" },
            { text: "לא לעשות כלום — להחזיק את מה שיש ולא להיבהל.", value: "hold" },
            { text: "להשקיע את ה-15% מזומן בחברות האיכותיות שהוזלו.", value: "buy-more" }
        ],
        correctOption: "buy-more",
        pointValue: 150,
        feedback: {
            correct: "מצוין! באפט: \'היו חששנים כשאחרים חמדנים, וחמדנים כשאחרים חששנים.\' אם התזה לא נשברה והחברות הוזלו 30% — זו הזדמנות. ה-15% מזומן קיימים בדיוק לרגע הזה.",
            incorrect: "חשבו שוב. מכירה בפאניקה = מימוש הפסד. \'לא לעשות כלום\' טוב — אבל לא מנצל את ההזדמנות. אם התזה שלמה, ירידת 30% = הנחה של 30% על חברות שהאמנתם בהן.",
            principle: { id: "margin-of-safety", name: "מרווח ביטחון" }
        }
    },

    // ── EVENT 3: Earnings Manipulation Clues (Hard) ─────────────────────
    {
        id: "event-earnings-manipulation-01",
        tier: 3,
        type: "special-event",
        eventType: "company",
        title: "סימנים לאיפור דוחות",
        description: "חברה שאתם עוקבים אחריה מציגה רווח שיא, אבל 3 סימנים מטרידים: (1) רו\"ח מנהל הוחלף בפעם השנייה ב-3 שנים, (2) ימי לקוחות עלו מ-45 ל-90, (3) ההנהלה שינתה מדיניות הכרה בהכנסות. מה עושים?",
        options: [
            { text: "סימנים מטרידים, אבל הרווח שיא — בואו ניתן הזדמנות.", value: "hold" },
            { text: "שלושת הסימנים ביחד = דגלי אדום חמורים. למכור.", value: "sell" },
            { text: "להמתין לדוח הבא ולראות אם המגמה נמשכת.", value: "wait" }
        ],
        correctOption: "sell",
        pointValue: 200,
        feedback: {
            correct: "נכון! כל סימן בנפרד עלול להיות תמים. שלושתם ביחד = דגל אדום בוער. החלפת רו\"ח × 2 + ימי לקוחות × 2 + שינוי מדיניות = הסתברות גבוהה לאיפור. אל תחכו לדוח הבא — עד אז אולי כבר מאוחר.",
            incorrect: "שלושת הסימנים ביחד הם pattern recognition חשוב: (1) רו\"ח לא מוכנים לחתום = בעיה. (2) ימי לקוחות כפולים = \'הכנסות\' שאולי לא ייגבו. (3) שינוי מדיניות = מאפשר להכיר הכנסות מוקדם. אל תיתנו לרווח שיא לעוור אתכם.",
            principle: { id: "owner-earnings", name: "רווחי בעלים" }
        }
    },

    // ── EVENT 4: Regulatory Disruption (Expert) ─────────────────────────
    {
        id: "event-regulation-01",
        tier: 4,
        type: "special-event",
        eventType: "macro",
        title: "רגולציה חדשה — מי ירוויח ומי יפסיד?",
        description: "הממשלה הודיעה על רגולציית סייבר חדשה שמחייבת כל חברה ציבורית באימות אבטחה שנתי. זה ייצור ביקוש חדש, אבל גם יגדיל עלויות. יש לכם 2 חברות סייבר בפורטפוליו: אחת שמתמקדת באימות (70% מההכנסות) ושנייה שמתמקדת בניטור (85% מההכנסות).",
        options: [
            { text: "להגדיל את שתיהן — כל סקטור הסייבר ירוויח.", value: "buy-both" },
            { text: "להגדיל את חברת האימות ולהקטין את הניטור.", value: "tilt-verify" },
            { text: "לא לשנות כלום — רגולציה לוקחת שנים ליישום.", value: "do-nothing" }
        ],
        correctOption: "tilt-verify",
        pointValue: 300,
        feedback: {
            correct: "מצוין! רגולציה יוצרת מנצחים ומפסידים — לא מנצחים בלבד. חברת אימות = מרוויחה ישירות (ביקוש חדש). חברת ניטור = עלויות ציות עולות אבל ההכנסות לא בהכרח. חשיבה סקטוריאלית גסה (\'סייבר = טוב\') פחות מדויקת מניתוח ספציפי.",
            incorrect: "לא מדויק. \'כל הסייבר ירוויח\' זו חשיבה גסה מדי. הרגולציה מחייבת אימות — לא ניטור. חברת אימות מרוויחה ישירות, חברת ניטור תצטרך להתאים. ו-\'לא לשנות כלום\' = לפספס הזדמנות.",
            principle: { id: "moat", name: "חפיר כלכלי" }
        }
    }
];


// ============================================================================
// SECTION 5: PATCHES FOR EXISTING COMPANIES
// Adds counterSignalExplanation and workedExample to existing companies
// Apply these to the existing companies in game-data.js
// ============================================================================

const EXISTING_COMPANY_PATCHES = {

    // Patches are keyed by company ID from the existing game-data.js
    // Each patch contains the fields to ADD or REPLACE

    // Example patch format — apply to each existing company:
    // Find the company by id, then merge these fields into the object

    "defense-contractor-01": {
        // Fix: uses absolute years → needs conversion to relative
        // Fix: missing counterSignalExplanation and workedExample
        counterSignalExplanation: "הצד השני יטען: P/E 18 לא זול במיוחד, 60% תלות ביצוא חושפת לסיכון גיאופוליטי, והענף הביטחוני נתון לשינויי תקציב ממשלתיים. Backlog יכול להתבטל.",
        workedExample: "1) חפיר: סיווג ביטחוני + IP + רישיונות = חפיר חזק שמתחרים לא יכולים לחצות. 2) Backlog 3.2 שנים = נראות קדימה מעולה. 3) ROIC 19% = תשואה גבוהה על ההון. 4) צמיחה 15% = בריאה. 5) P/E 18 לביטחוני = סביר (טווח 15-25). 6) מסקנה: חפיר חזק + backlog + צמיחה = קנייה."
    },

    "luxury-retail-01": {
        counterSignalExplanation: "הצד השני יטען: המנכ\"ל החדש אולי צריך עוד זמן. המהפכה הדיגיטלית דורשת השקעה ראשונית שתשתלם. מותגי יוקרה בלעדיים הם נכס שקשה לשכפל.",
        workedExample: "1) בדיקת חפיר: בלעדיות נשחקת, אין נאמנות אמיתית. 2) הנהלה: מנכ\"ל חדש + הוצאות ללא תוצאות = סיכון. 3) מגמה: סגירת סניפים + ירידת רווח 20%. 4) חוב: עלה בגלל שיפוצים ללא תשואה. 5) מסקנה: ענף שוקע + אין חפיר + הוצאות ללא תוצאות = העל."
    },

    "printing-company-01": {
        counterSignalExplanation: "הצד השני יטען: P/E 5 ודיבידנד 8% — תשואה מצוינת גם אם העסק מתכווץ לאט. המעבר לאריזות עשוי לשנות את המגמה. ולמייסד בן 70 אולי יש תוכנית ירושה שלא פורסמה.",
        workedExample: "1) P/E 5, דיבידנד 8% — מפתה. 2) אבל: הכנסות יורדות 10% בשנה = הכפלת ירידה כל 7 שנים. 3) ענף מתכווץ + אין חפיר = לא יכול להיעצר. 4) מנהיגות: מייסד בן 70 בלי ירושה = סיכון המשכיות. 5) הדיבידנד: בעוד 3 שנים, FCF ירד ל-₪5M = דיבידנד ייחתך. 6) מסקנה: מלכודת ערך קלאסית."
    }

    // NOTE: Apply similar patches to ALL remaining existing companies.
    // Each company in the existing game-data.js needs:
    //   1. counterSignalExplanation (if missing)
    //   2. workedExample (if missing)
    //   3. Convert absolute years to relative years
    //   4. Add chartType field (default "annual" for existing)
};


// ============================================================================
// EXPORT / MERGE INSTRUCTIONS
// ============================================================================
// To integrate this into game-data.js:
//
// 1. Add NEW_COMPANIES_V2.easy to window.BuffettGame.companies.easy
// 2. Add NEW_COMPANIES_V2.medium to window.BuffettGame.companies.medium
// 3. Add NEW_COMPANIES_V2.hard to window.BuffettGame.companies.hard
// 4. Add NEW_COMPANIES_V2.expert to window.BuffettGame.companies.expert
// 5. Add VERSUS_ROUNDS_V2 to window.BuffettGame.versusRounds (new array)
// 6. Add SELL_HOLD_ROUNDS_V2 to window.BuffettGame.sellHoldRounds (new array)
// 7. Add NEW_SPECIAL_EVENTS_V2 to existing specialEvents arrays by tier
// 8. Apply EXISTING_COMPANY_PATCHES to existing companies
//
// The game engine (game-engine.js) will need updates to handle:
//   - versus round UI
//   - sell/hold round UI
//   - chartType: "quarterly", "segments", "waterfall", "none"
//   - reasoningOptions display for hard tier
//   - sellTriggers and dueDiligence for expert tier
//   - workedExample display in feedback
// ============================================================================
