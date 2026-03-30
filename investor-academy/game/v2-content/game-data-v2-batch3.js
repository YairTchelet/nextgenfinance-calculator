// ============================================================================
// משחק ההשקעות v2 — Batch 3: Management, Moat & Future Thinking
// ============================================================================
// Focus areas:
//   - Strong management signals (capital allocation, skin in the game)
//   - Moat depth and durability (widening vs narrowing)
//   - Future thinking (what will matter in 5 years?)
//   - Heavy use of varied chartTypes: segments, waterfall, quarterly, none
//   - Remaining versus rounds, sell/hold, special events
//   - Final existing company patches
// ============================================================================


// ============================================================================
// SECTION 1: EASY TIER — 8 more companies
// ============================================================================

const EASY_BATCH3 = [

    // ── MOAT: Network Effect (Easy, Buy) ────────────────────────────────
    {
        id: "network-moat-e01",
        name: "פיי-קליק תשלומים בע\"מ",
        sector: "תשלומים",
        symbol: "PYCL",
        price: 135.00,
        tier: 1,
        chartType: "segments",
        description: "חברת תשלומים שבנתה רשת של 18,000 בתי עסק ו-2 מיליון משתמשים. ככל שיותר עסקים מצטרפים, יותר צרכנים רוצים את האפליקציה — וההפך. אפקט רשת קלאסי. ROIC 21%, FCF עולה כל שנה.",
        management: "מייסדת עם 18% אחזקה. מתמקדת ברווחיות מיום ראשון. סירבה ל-3 הצעות רכישה.",
        moat: "אפקט רשת דו-צדדי: 18K עסקים ↔ 2M משתמשים. עלות מעבר גבוהה (אינטגרציה עם קופות).",
        events: "שותפות עם 2 רשתות מזון גדולות. הוספת 3,000 עסקים ברבעון האחרון.",
        metrics: {
            basic: [
                { name: "P/E", value: "24" },
                { name: "PEG", value: "1.3" },
                { name: "ROE", value: "26%" }
            ],
            advanced: [
                { name: "ROIC", value: "21%" },
                { name: "FCF (מיליון ₪)", value: "48" },
                { name: "צמיחת משתמשים", value: "25%/שנה" }
            ]
        },
        segmentData: [
            { name: "עמלות בתי עסק", revenue: 145, margin: "35%", growth: "+22%" },
            { name: "שירותים פיננסיים (חדש)", revenue: 35, margin: "45%", growth: "+80%" },
            { name: "פרסום ממוקד", revenue: 20, margin: "60%", growth: "+40%" }
        ],
        projectedData: [
            { year: "year+1", revenue: 240, fcf: 62 },
            { year: "year+2", revenue: 290, fcf: 78 }
        ],
        correctDecision: "buy",
        pointValue: 100,
        hints: [{ cost: 0.5, text: "18,000 עסקים ו-2 מיליון משתמשים — כמה קשה למתחרה חדש לבנות את זה מאפס?" }],
        feedback: {
            principle: { id: "moat", name: "חפיר כלכלי" },
            decisiveSignals: ["אפקט רשת דו-צדדי", "ROIC 21% + עולה", "3 סגמנטים רווחיים"],
            correctExplanation: "מצוין! אפקט רשת הוא החפיר החזק ביותר — ככל שהרשת גדלה, היא נהיית יותר חזקה. 18K עסקים = מתחרה צריך שנים לשכפל. וה-ROIC 21% מוכיח שהחפיר מתורגם לרווחים.",
            incorrectExplanation: "פספוס! P/E 24 הפחיד? PEG 1.3 על צמיחה של 18% = סביר לטכנולוגיה רווחית. והכי חשוב: אפקט רשת = כל משתמש חדש מחזק את החפיר. זה מתחזק, לא נשחק.",
            counterSignalExplanation: "הצד השני יטען: P/E 24 גבוה, פינטק תחרותי, ורגולציה פיננסית עלולה לפגוע. בנקים גדולים יכולים לבנות מוצר מתחרה."
        },
        workedExample: "1) סוג חפיר: אפקט רשת דו-צדדי — החזק ביותר. 2) קנה מידה: 18K עסקים + 2M משתמשים = קשה מאוד לשכפל. 3) סגמנטים: 3 סגמנטים רווחיים עם מרווחים 35-60% = מגוון. 4) ROIC 21% = החפיר מתורגם לרווח. 5) PEG 1.3 = סביר. 6) מסקנה: חפיר רשת שמתחזק — קנייה.",
        isGoodValue: true,
        difficulty: "easy",
        difficultyValue: 1,
        hint: "18,000 עסקים ו-2 מיליון משתמשים — כמה קשה למתחרה חדש לבנות את זה מאפס?"
    },

    // ── MOAT: Switching Costs (Easy, Buy) ───────────────────────────────
    {
        id: "switching-cost-e01",
        name: "מערכות ERP-IL בע\"מ",
        sector: "תוכנה עסקית",
        symbol: "ERPI",
        price: 92.00,
        tier: 1,
        chartType: "none",
        description: "חברת תוכנת ניהול עסקי (ERP) לעסקים בינוניים. 850 לקוחות, שיעור חידוש 95%. להחליף מערכת ERP = 6-12 חודשי עבודה ומיליון ₪. אין סיבה שלקוח יעזוב.",
        management: "מייסד-מנכ\"ל עם 22% אחזקה. משקיע 18% מההכנסות בפיתוח מוצר. \'אנחנו לא מוכרים תוכנה — אנחנו בונים תלות.\'",
        moat: "עלות מעבר = ₪1M+ ו-12 חודשי עבודה. 95% חידוש. כל שנה שהלקוח נשאר, הוא יותר תלוי.",
        events: "שום חדשות מרגשות — וזה בדיוק הנקודה. 95% חידוש = ₪75M הכנסות חוזרות מובטחות.",
        metrics: {
            basic: [
                { name: "P/E", value: "18" },
                { name: "ROE", value: "20%" },
                { name: "צמיחת הכנסות", value: "8%" }
            ],
            advanced: [
                { name: "ROIC", value: "22%" },
                { name: "FCF (מיליון ₪)", value: "28" },
                { name: "שיעור חידוש", value: "95%" }
            ]
        },
        historicalData: [
            { year: "year-4", revenue: 68, fcf: 20 },
            { year: "year-3", revenue: 72, fcf: 22 },
            { year: "year-2", revenue: 78, fcf: 24 },
            { year: "year-1", revenue: 82, fcf: 25 },
            { year: "year-0", revenue: 88, fcf: 28 }
        ],
        projectedData: [
            { year: "year+1", revenue: 95, fcf: 31 },
            { year: "year+2", revenue: 103, fcf: 34 }
        ],
        correctDecision: "buy",
        pointValue: 100,
        hints: [{ cost: 0.5, text: "עלות מעבר ₪1M+ ו-12 חודשים — כמה לקוחות \'ירצו\' לעזוב?" }],
        feedback: {
            principle: { id: "moat", name: "חפיר כלכלי" },
            decisiveSignals: ["שיעור חידוש 95%", "עלות מעבר ₪1M+", "ROIC 22% עקבי"],
            correctExplanation: "מצוין! עלות מעבר = חפיר שמתחזק עם הזמן. 95% חידוש = הכנסות כמעט מובטחות. ROIC 22% = החפיר מייצר ערך. P/E 18 סביר למודל הכנסות חוזרות.",
            incorrectExplanation: "פספוס! \'צמיחה 8% — לא מרגש\' נכון, אבל 95% חידוש = העסק הבסיסי בטוח כמעט לחלוטין. צמיחה 8% מעל בסיס מובטח = פנטסטי.",
            counterSignalExplanation: "הצד השני יטען: צמיחה 8% = איטית. מערכות ענן חדשות עלולות להוריד את עלות המעבר. P/E 18 לא זול לחברה עם צמיחה חד-ספרתית."
        },
        workedExample: "1) חפיר: עלות מעבר ₪1M + 12 חודשים = אף אחד לא עוזב. 2) חידוש 95% = ₪75M+ מובטח כל שנה. 3) ROIC 22% × 5 שנים = עקבי. 4) פיתוח 18% מהכנסות = ההנהלה בונה את החפיר עוד. 5) P/E 18 על הכנסות חוזרות = זול. 6) מסקנה: חפיר עלות מעבר — קנייה.",
        isGoodValue: true,
        difficulty: "easy",
        difficultyValue: 1,
        hint: "עלות מעבר ₪1M+ ו-12 חודשים — כמה לקוחות \'ירצו\' לעזוב?"
    },

    // ── MANAGEMENT: Capital Allocation (Easy, Buy) ──────────────────────
    {
        id: "capital-allocation-e01",
        name: "הדס תעשיות בע\"מ",
        sector: "תעשייה",
        symbol: "HDST",
        price: 68.00,
        tier: 1,
        chartType: "waterfall",
        description: "חברת תעשייה \'משעממת\' שמנוהלת כמו מכונה. ההנהלה מחלקת כל שנה: 40% FCF לדיבידנד, 30% לרכישה עצמית, 30% להשקעות רק אם ROIC > 15%. שנה שאין השקעות ב-ROIC > 15%, הכסף חוזר לבעלי מניות.",
        management: "מנכ\"ל בעל 15% אחזקה. כלל ברזל: \'לא משקיעים מתחת ל-ROIC 15%\'. מחלק עודפים — לא בונה אימפריה.",
        moat: "אין חפיר ספציפי, אבל הקצאת הון מעולה = יוצרת ערך לאורך זמן.",
        events: "שנה שעברה סירב ל-3 רכישות כי ROIC שלהן היה 11%. העדיף לחלק את הכסף.",
        metrics: {
            basic: [
                { name: "P/E", value: "10" },
                { name: "ROE", value: "17%" },
                { name: "תשואת דיבידנד", value: "4%" }
            ],
            advanced: [
                { name: "ROIC", value: "17% (מינימום פנימי: 15%)" },
                { name: "רכישה עצמית", value: "3%/שנה" },
                { name: "FCF (מיליון ₪)", value: "42" }
            ]
        },
        // Waterfall showing how FCF is allocated
        historicalData: [
            { year: "year-4", revenue: 280, fcf: 35 },
            { year: "year-3", revenue: 285, fcf: 37 },
            { year: "year-2", revenue: 290, fcf: 38 },
            { year: "year-1", revenue: 295, fcf: 40 },
            { year: "year-0", revenue: 300, fcf: 42 }
        ],
        projectedData: [
            { year: "year+1", revenue: 305, fcf: 43 },
            { year: "year+2", revenue: 310, fcf: 44 }
        ],
        correctDecision: "buy",
        pointValue: 100,
        hints: [{ cost: 0.5, text: "מנכ\"ל שמסרב לרכישות ב-ROIC 11% ומחזיר כסף — מה זה אומר על סדרי העדיפויות שלו?" }],
        feedback: {
            principle: { id: "management-quality", name: "איכות הנהלה" },
            decisiveSignals: ["כלל ROIC > 15% = משמעת הקצאת הון", "סירוב ל-3 רכישות = לא בונה אימפריה", "40% דיבידנד + 30% רכישה + 30% השקעה = מדיניות ברורה"],
            correctExplanation: "מצוין! מנכ\"ל שמחזיר כסף במקום להשקיע ברכישות גרועות = נדיר ויקר ערך. P/E 10 עם ROIC 17% ומדיניות שמעשירה בעלי מניות = מציאה. באפט: \'המבחן של הנהלה טובה הוא מה היא עושה כשיש לה מזומן עודף.\'",
            incorrectExplanation: "טעות! \'צמיחה 2%\' ו\'אין חפיר ספציפי\' גרמו לך לעבור. אבל הקצאת הון מעולה היא חפיר בפני עצמו. P/E 10 + דיבידנד 4% + רכישה 3% = 7% תשואה שנתית \'אוטומטית\'.",
            counterSignalExplanation: "הצד השני יטען: צמיחה 2% = אין מנוע. אין חפיר מסורתי. P/E 10 = ממוצע לתעשייה. והסירוב לרכוש אולי פוגע בצמיחה ארוכת טווח."
        },
        workedExample: "1) צמיחה 2% — \'משעמם\'. 2) אבל: FCF ₪42M מוקצה בחוכמה: 40% דיבידנד, 30% רכישה, 30% השקעה. 3) כלל ROIC 15% = רק השקעות איכותיות. סירב ל-3 = לא פיתוי. 4) תשואה: דיבידנד 4% + רכישה 3% + צמיחה 2% = 9%/שנה. 5) P/E 10 = זול. 6) מסקנה: הקצאת הון מעולה — קנייה.",
        isGoodValue: true,
        difficulty: "easy",
        difficultyValue: 1,
        hint: "מנכ\"ל שמסרב לרכישות ב-ROIC 11% ומחזיר כסף — מה זה אומר על סדרי העדיפויות שלו?"
    },

    // ── MOAT WIDENING (Easy, Buy) ───────────────────────────────────────
    {
        id: "moat-widening-e01",
        name: "בדיקות ישראל בע\"מ",
        sector: "בדיקות ואישורים",
        symbol: "BDKT",
        price: 175.00,
        tier: 1,
        chartType: "annual",
        description: "חברת בדיקות ואישורים שכל מוצר שנמכר בישראל חייב לעבור אצלה. רגולציה חדשה מרחיבה את הדרישות — יותר מוצרים צריכים אישור. החפיר מתרחב, לא מצטמצם. ROIC 25%, FCF עולה 12% בשנה.",
        management: "מנכ\"לית מהנדסת שמשקיעה במעבדות חדשות. 8% אחזקה. צוות יציב 15 שנה.",
        moat: "מונופול רגולטורי: הגוף היחיד שמאושר לבדיקות. רגולציה חדשה = עוד מוצרים = חפיר מתרחב.",
        events: "רגולציה חדשה: 30% יותר קטגוריות מוצרים דורשות אישור. שום מתחרה באופק.",
        metrics: {
            basic: [
                { name: "P/E", value: "22" },
                { name: "PEG", value: "1.8" },
                { name: "ROE", value: "28%" }
            ],
            advanced: [
                { name: "ROIC", value: "25%" },
                { name: "FCF (מיליון ₪)", value: "38" },
                { name: "צמיחת FCF", value: "12%/שנה" }
            ]
        },
        historicalData: [
            { year: "year-4", revenue: 120, fcf: 24 },
            { year: "year-3", revenue: 130, fcf: 27 },
            { year: "year-2", revenue: 142, fcf: 30 },
            { year: "year-1", revenue: 155, fcf: 34 },
            { year: "year-0", revenue: 170, fcf: 38 }
        ],
        projectedData: [
            { year: "year+1", revenue: 195, fcf: 44 },
            { year: "year+2", revenue: 220, fcf: 50 }
        ],
        correctDecision: "buy",
        pointValue: 100,
        hints: [{ cost: 0.5, text: "רגולציה חדשה מוסיפה 30% קטגוריות — מה זה עושה לחברה שהיא הגוף היחיד שמאושר?" }],
        feedback: {
            principle: { id: "moat", name: "חפיר כלכלי" },
            decisiveSignals: ["מונופול רגולטורי", "חפיר מתרחב (רגולציה חדשה)", "ROIC 25%"],
            correctExplanation: "מצוין! חפיר שמתרחב הוא הדבר הכי טוב שמשקיע ערך יכול למצוא. רגולציה חדשה = עוד ביקוש מובטח לגוף היחיד. ROIC 25% מוכיח שהחפיר מתורגם לרווחים. PEG 1.8 = סביר לעסק עם חפיר מתרחב.",
            incorrectExplanation: "פספוס! P/E 22 או PEG 1.8 הפחידו? ROIC 25% עם חפיר מונופוליסטי שמתרחב = נדיר בשוק. רגולציה חדשה = \'צמיחה בחינם\' — בלי שהחברה צריכה להשקיע בשיווק.",
            counterSignalExplanation: "הצד השני יטען: P/E 22 גבוה. תלות ברגולציה = הרגולטור יכול גם לשנות. מונופולים מושכים ביקורת ציבורית. ו-PEG 1.8 = פרמיה."
        },
        workedExample: "1) חפיר: מונופול רגולטורי = אין מתחרים. 2) כיוון: רגולציה חדשה = חפיר מתרחב, לא מצטמצם. 3) ROIC 25% × 5 שנים = עקבי ויציב. 4) P/E 22 — \'גבוה\'? לא לעסק ב-ROIC 25% עם צמיחה 12%. 5) הנהלה: יציבה 15 שנה, משקיעה במעבדות. 6) מסקנה: חפיר מתרחב — קנייה.",
        isGoodValue: true,
        difficulty: "easy",
        difficultyValue: 1,
        hint: "רגולציה חדשה מוסיפה 30% קטגוריות — מה זה עושה לחברה שהיא הגוף היחיד שמאושר?"
    },

    // ── FUTURE THINKING: Obsolescence Risk (Easy, Pass) ─────────────────
    {
        id: "obsolescence-e01",
        name: "מדפסות הזהב בע\"מ",
        sector: "ציוד משרדי",
        symbol: "MDFZ",
        price: 30.00,
        tier: 1,
        chartType: "annual",
        description: "יצרנית מדפסות משרדיות. רווחית היום: P/E 6, FCF חיובי, דיבידנד 7%. אבל: השוק מתכווץ 12% בשנה בגלל דיגיטציה. בעוד 5 שנים, ההכנסות ירדו בחצי. ההנהלה לא מגיבה.",
        management: "מנכ\"ל ותיק שמסרב להכיר במגמה. \'אנשים תמיד ידפיסו.\'",
        moat: "מותג מוכר ורשת שירות, אבל הביקוש עצמו נעלם.",
        events: "3 מתחרים סגרו את קו המדפסות. שוק ההדפסה ירד 12% בשנה.",
        metrics: {
            basic: [
                { name: "P/E", value: "6" },
                { name: "ROE", value: "15%" },
                { name: "תשואת דיבידנד", value: "7%" }
            ],
            advanced: [
                { name: "ROIC", value: "12%" },
                { name: "FCF (מיליון ₪)", value: "22" },
                { name: "ירידת שוק שנתית", value: "-12%" }
            ]
        },
        historicalData: [
            { year: "year-4", revenue: 250, fcf: 35 },
            { year: "year-3", revenue: 225, fcf: 30 },
            { year: "year-2", revenue: 200, fcf: 28 },
            { year: "year-1", revenue: 178, fcf: 25 },
            { year: "year-0", revenue: 158, fcf: 22 }
        ],
        projectedData: [
            { year: "year+1", revenue: 140, fcf: 18 },
            { year: "year+2", revenue: 122, fcf: 14 }
        ],
        correctDecision: "pass",
        pointValue: 100,
        // FCF BREAKER: FCF positive today
        hints: [{ cost: 0.5, text: "P/E 6 ודיבידנד 7% — אבל ההכנסות ירדו 37% ב-4 שנים. איפה הן יהיו בעוד 4?" }],
        feedback: {
            principle: { id: "moat", name: "חפיר כלכלי" },
            decisiveSignals: ["שוק מתכווץ 12%/שנה", "הנהלה לא מסתגלת", "ירידת 37% ב-4 שנים"],
            correctExplanation: "נכון! באפט אומר: \'כשענף מתכווץ, גם החברה הכי טובה בענף תתכווץ.\' P/E 6 ודיבידנד 7% מפתים, אבל FCF ₪22M ב-year-0 יהיה ₪10M בעוד 3 שנים. החפיר לא רלוונטי כשאין ביקוש.",
            incorrectExplanation: "טעות! FCF חיובי ודיבידנד 7% הפתו אותך. אבל חשבו 5 שנים קדימה: שוק -12%/שנה = הכנסות ₪80M, FCF ₪5M. הדיבידנד ייחתך הרבה לפני.",
            counterSignalExplanation: "הצד השני יטען: P/E 6 ודיבידנד 7% — תשואה גבוהה ליד. גם אם השוק מתכווץ, זה לוקח שנים. ואולי החברה תמצא מוצר חדש."
        },
        workedExample: "1) P/E 6, דיבידנד 7% — \'מציאה\'? 2) אבל: שוק -12%/שנה × 4 שנים = -37%. 3) בעוד 5 שנים: הכנסות ~₪80M (מ-₪250M). 4) FCF: ~₪5-8M = דיבידנד ייחתך. 5) הנהלה: לא מסתגלת = לא פותרת. 6) שאלת עתיד: \'האם מישהו ידפיס בעוד 10 שנים?\' 7) מסקנה: חשיבה קדימה = העל.",
        isGoodValue: false,
        difficulty: "easy",
        difficultyValue: 1,
        hint: "P/E 6 ודיבידנד 7% — אבל ההכנסות ירדו 37% ב-4 שנים. איפה הן יהיו בעוד 4?"
    },

    // ── FUTURE THINKING: Competitive Position in 5 Years (Easy, Buy) ────
    {
        id: "future-position-e01",
        name: "גרין-לוג פתרונות בע\"מ",
        sector: "לוגיסטיקה ירוקה",
        symbol: "GRLG",
        price: 58.00,
        tier: 1,
        chartType: "quarterly",
        description: "חברת לוגיסטיקה שהשקיעה ₪50M בצי חשמלי. היום: ההשקעה הורידה את ה-FCF ו-ROIC נראה בינוני (10%). אבל: רגולציה חדשה תחייב כלי רכב ירוקים תוך 3 שנים. מתחרים לא השקיעו — יצטרכו להשקיע פי 2 בלחץ.",
        management: "מנכ\"לית צעירה עם חזון. השקיעה לפני שהרגולציה חייבה. \'מי שבונה היום, ירוויח מחר.\'",
        moat: "יתרון ראשון-נכנס: צי חשמלי מוכן כשמתחרים רק מתחילים.",
        events: "רגולציה אושרה: כל משאיות הפצה בערים חייבות חשמליות תוך 3 שנים. 2 לקוחות גדולים חתמו.",
        metrics: {
            basic: [
                { name: "P/E", value: "16" },
                { name: "ROE", value: "12%" },
                { name: "צמיחת הכנסות", value: "15%" }
            ],
            advanced: [
                { name: "ROIC", value: "10% (צפוי 18% ב-year+2)" },
                { name: "FCF (מיליון ₪)", value: "12" },
                { name: "יתרון זמן על מתחרים", value: "~2 שנים" }
            ]
        },
        quarterlyData: [
            { quarter: "Q1 year-1", revenue: 25, fcf: 1 },
            { quarter: "Q2 year-1", revenue: 28, fcf: 2 },
            { quarter: "Q3 year-1", revenue: 30, fcf: 2 },
            { quarter: "Q4 year-1", revenue: 32, fcf: 3 },
            { quarter: "Q1 year-0", revenue: 35, fcf: 4 },
            { quarter: "Q2 year-0", revenue: 38, fcf: 5 }
        ],
        projectedData: [
            { year: "year+1", revenue: 170, fcf: 25 },
            { year: "year+2", revenue: 220, fcf: 42 }
        ],
        correctDecision: "buy",
        pointValue: 100,
        hints: [{ cost: 0.5, text: "ROIC 10% היום, אבל 18% בעוד שנתיים. מה ההבדל? ההשקעה בצי חשמלי תניב פירות כשהרגולציה תיכנס." }],
        feedback: {
            principle: { id: "moat", name: "חפיר כלכלי" },
            decisiveSignals: ["יתרון 2 שנים על מתחרים", "רגולציה מחייבת = ביקוש מובטח", "ROIC 10% → 18% ככל שההשקעה מניבה"],
            correctExplanation: "מצוין! חשיבת עתיד: ROIC 10% היום \'בינוני\', אבל ₪50M ההשקעה תניב כשהרגולציה נכנסת. מתחרים יצטרכו להשקיע ₪100M בלחץ — בזמן שגרין-לוג כבר מרוויחה. יתרון ראשון-נכנס = חפיר זמני אבל חזק.",
            incorrectExplanation: "פספוס! ROIC 10% ו-FCF ₪12M נראים בינוניים. אבל אתם מסתכלים על ההווה. חשבו שנתיים קדימה: רגולציה חדשה + צי מוכן = לקוחות חדשים + מרווחים גבוהים.",
            counterSignalExplanation: "הצד השני יטען: ROIC 10% בינוני. FCF ₪12M נמוך. רגולציה עלולה להידחות. מתחרים גדולים עם כיסים עמוקים יכולים להשקיע מהר כשצריך."
        },
        workedExample: "1) ROIC 10% — בינוני. אבל מה הסיפור? 2) השקעה ₪50M בצי חשמלי = ההוצאה כבר קרתה. 3) רגולציה חדשה = ביקוש מובטח תוך 3 שנים. 4) מתחרים: לא מוכנים. צריכים 2+ שנים להשיג. 5) ROIC year+2: 18% (ההשקעה מתחילה להניב). 6) מסקנה: קנייה על בסיס עתיד, לא הווה.",
        isGoodValue: true,
        difficulty: "easy",
        difficultyValue: 1,
        hint: "ROIC 10% היום, אבל 18% בעוד שנתיים. מה ההבדל?"
    },

    // ── MANAGEMENT: CEO Compensation Alignment (Easy, Pass) ─────────────
    {
        id: "comp-misaligned-e01",
        name: "טופ-ליין שירותים בע\"מ",
        sector: "שירותים עסקיים",
        symbol: "TPLN",
        price: 110.00,
        tier: 1,
        chartType: "none",
        description: "חברת שירותים עם ביצועים \'טובים\': הכנסות עולות 15%, רווח עולה 8%. אבל: המנכ\"ל מתוגמל על הכנסות, לא על רווח. הוא רוכש חברות יקרות שמוסיפות הכנסות אבל מורידות מרווחים. ROIC ירד מ-18% ל-11% ב-3 שנים.",
        management: "מנכ\"ל שמתוגמל לפי הכנסות: בונוס ₪500K על כל ₪100M הכנסות. אין תנאי רווחיות.",
        moat: "חלקי — מותג מוכר ולקוחות ארוכי טווח. אבל הרכישות מדללות את הערך.",
        events: "3 רכישות בשנה ב-P/E ממוצע 18. ROIC ירד 7 נקודות ב-3 שנים.",
        metrics: {
            basic: [
                { name: "P/E", value: "14" },
                { name: "ROE", value: "14%" },
                { name: "צמיחת הכנסות", value: "15%" }
            ],
            advanced: [
                { name: "ROIC", value: "11% (ירד מ-18%)" },
                { name: "FCF (מיליון ₪)", value: "32" },
                { name: "תגמול מנכ\"ל", value: "מבוסס הכנסות בלבד" }
            ]
        },
        historicalData: [
            { year: "year-4", revenue: 280, fcf: 42 },
            { year: "year-3", revenue: 310, fcf: 40 },
            { year: "year-2", revenue: 345, fcf: 38 },
            { year: "year-1", revenue: 380, fcf: 35 },
            { year: "year-0", revenue: 430, fcf: 32 }
        ],
        projectedData: [
            { year: "year+1", revenue: 490, fcf: 30 },
            { year: "year+2", revenue: 550, fcf: 28 }
        ],
        correctDecision: "pass",
        pointValue: 100,
        // FCF BREAKER: FCF positive, revenue growing fast, but answer is pass
        hints: [{ cost: 0.5, text: "הכנסות +54% ב-4 שנים, אבל FCF ירד 24%. לאן הולך הכסף?" }],
        feedback: {
            principle: { id: "management-quality", name: "איכות הנהלה" },
            decisiveSignals: ["תגמול מבוסס הכנסות = תמריץ לרכישות גרועות", "ROIC 18% → 11%", "הכנסות +54% אבל FCF -24%"],
            correctExplanation: "נכון! כשמנכ\"ל מתוגמל על הכנסות, הוא יקנה כל דבר שמוסיף הכנסות — גם אם זה הורס ערך. ROIC ירד 7 נקודות = כל שקל חדש שמושקע מרוויח פחות. הכנסות ↑ + FCF ↓ = חד משמעי.",
            incorrectExplanation: "טעות! P/E 14 וצמיחה 15% נראים מצוין. אבל \'צמיחה\' שמורידה ROIC ו-FCF = הורסת ערך. הסיבה: תגמול לפי הכנסות = תמריץ שגוי.",
            counterSignalExplanation: "הצד השני יטען: P/E 14 סביר, הכנסות צומחות 15%, ומותג חזק. ROIC 11% עדיין מעל עלות ההון. הרכישות מוסיפות סקייל."
        },
        workedExample: "1) הכנסות +54% ב-4 שנים — מרשים! 2) FCF: ₪42M → ₪32M = -24%. 3) למה? ROIC 18% → 11% = הרכישות מרוויחות פחות. 4) למה רוכשים? תגמול מבוסס הכנסות = ₪500K בונוס לכל ₪100M. 5) שאלה: מה יתמרץ אותו להפסיק? כלום — הוא מרוויח מכל רכישה. 6) מסקנה: אינטרסים לא מיושרים — העל.",
        isGoodValue: false,
        difficulty: "easy",
        difficultyValue: 1,
        hint: "הכנסות +54% ב-4 שנים, אבל FCF ירד 24%. לאן הולך הכסף?"
    },

    // ── MOAT: Brand Power (Easy, Buy) ───────────────────────────────────
    {
        id: "brand-power-e01",
        name: "שטראוס-לייט מזון בריאות בע\"מ",
        sector: "מזון בריאות",
        symbol: "STLT",
        price: 82.00,
        tier: 1,
        chartType: "annual",
        description: "מותג מזון בריאות שמוביל בישראל עם 45% נתח שוק. מרווח גולמי 48% — גבוה פי 2 ממתחרים. מחיר המוצרים גבוה ב-30% מהמתחרים, ועדיין צרכנים בוחרים בהם. זה כוח מותג.",
        management: "מנכ\"ל שמשקיע 12% מההכנסות בשיווק ובחדשנות. 6% אחזקה.",
        moat: "מותג = כוח תמחור. מוכרת ב-30% יותר מהמתחרים ועדיין מובילה.",
        events: "השקת 3 מוצרים חדשים שכבר מהווים 8% מההכנסות. מתחרה פרייבט-לייבל הוזיל ב-25% — לא פגע בנתח.",
        metrics: {
            basic: [
                { name: "P/E", value: "20" },
                { name: "ROE", value: "24%" },
                { name: "צמיחת הכנסות", value: "7%" }
            ],
            advanced: [
                { name: "ROIC", value: "20%" },
                { name: "FCF (מיליון ₪)", value: "35" },
                { name: "מרווח גולמי", value: "48% (ענפי: 24%)" }
            ]
        },
        historicalData: [
            { year: "year-4", revenue: 210, fcf: 26 },
            { year: "year-3", revenue: 225, fcf: 28 },
            { year: "year-2", revenue: 235, fcf: 30 },
            { year: "year-1", revenue: 250, fcf: 33 },
            { year: "year-0", revenue: 268, fcf: 35 }
        ],
        projectedData: [
            { year: "year+1", revenue: 286, fcf: 38 },
            { year: "year+2", revenue: 305, fcf: 41 }
        ],
        correctDecision: "buy",
        pointValue: 100,
        hints: [{ cost: 0.5, text: "מרווח גולמי כפול מהמתחרים + מתחרה הוזיל 25% ולא פגע — מה זה אומר על כוח המותג?" }],
        feedback: {
            principle: { id: "moat", name: "חפיר כלכלי" },
            decisiveSignals: ["מרווח גולמי 48% (פי 2 מענפי)", "מתחרה הוזיל ולא פגע", "45% נתח שוק"],
            correctExplanation: "מצוין! מבחן החפיר הכי טוב: \'האם מתחרה זול פוגע?\' כשהתשובה \'לא\' = חפיר מותגי חזק. מרווח 48% מול 24% = כל שקל מכירה מרוויח כפול. P/E 20 מוצדק לחפיר שעובר מבחן תחרות.",
            incorrectExplanation: "טעות! P/E 20 עם צמיחה 7% = PEG 2.9 \'גבוה\'. אבל כשיש חפיר מותגי חזק (מרווח פי 2, נתח 45%, עמידות למתחרים), הפרמיה מוצדקת. חפיר = ביטחון.",
            counterSignalExplanation: "הצד השני יטען: P/E 20 עם צמיחה 7% = PEG גבוה. מגמת בריאות יכולה להשתנות. מתחרי פרייבט-לייבל ימשיכו לנסות."
        },
        workedExample: "1) חפיר: מותג ב-45% נתח, מרווח 48% (פי 2). 2) מבחן: מתחרה הוזיל 25% — לא פגע. = חפיר חי. 3) ROIC 20% = החפיר מייצר ערך. 4) חדשנות: 3 מוצרים חדשים = 8% הכנסות חדשות. 5) P/E 20 = פרמיה, אבל מוצדקת לחפיר מוכח. 6) מסקנה: מותג חזק שעובר מבחנים — קנייה.",
        isGoodValue: true,
        difficulty: "easy",
        difficultyValue: 1,
        hint: "מרווח גולמי כפול מהמתחרים + מתחרה הוזיל 25% ולא פגע — מה זה אומר על כוח המותג?"
    }
];


// ============================================================================
// SECTION 2: MEDIUM TIER — 5 more companies (management & future focus)
// ============================================================================

const MEDIUM_BATCH3 = [

    // ── MANAGEMENT: Insider Selling Red Flag (Medium, Pass) ─────────────
    {
        id: "insider-selling-m01",
        name: "סמארט-הום טכנולוגיות בע\"מ",
        sector: "טכנולוגיה",
        symbol: "SMHM",
        price: 155.00,
        tier: 2,
        chartType: "quarterly",
        description: "חברת טכנולוגיה לבית חכם. הצמיחה מרשימה (20%), P/E 18 סביר. אבל: 4 מתוך 5 בכירים מכרו מניות ב-3 חודשים האחרונים — ₪22M בסך הכל. במקביל, החברה הודיעה על \'מבצע\' רכישה עצמית קטנטנה (₪3M).",
        management: "מנכ\"ל מכר 40% מאחזקתו. CFO מכרה 60%. CTO מכר 30%. סמנכ\"ל שיווק מכר 50%.",
        moat: "טכנולוגיה מעניינת אבל שוק צפוף. 15+ מתחרים.",
        events: "4 בכירים מכרו ₪22M. רכישה עצמית ₪3M (\'כדי להראות אמון\'). הרבעון האחרון: צמיחה האטה מ-25% ל-15%.",
        metrics: {
            basic: [
                { name: "P/E", value: "18" },
                { name: "PEG", value: "0.9" },
                { name: "צמיחת הכנסות", value: "20% (מאטה)" }
            ],
            advanced: [
                { name: "ROIC", value: "14%" },
                { name: "FCF (מיליון ₪)", value: "28" },
                { name: "מכירות בכירים (3 חודשים)", value: "₪22M" }
            ]
        },
        quarterlyData: [
            { quarter: "Q1 year-1", revenue: 52, fcf: 6 },
            { quarter: "Q2 year-1", revenue: 58, fcf: 8 },
            { quarter: "Q3 year-1", revenue: 63, fcf: 9 },
            { quarter: "Q4 year-1", revenue: 68, fcf: 10 },
            { quarter: "Q1 year-0", revenue: 65, fcf: 7 },
            { quarter: "Q2 year-0", revenue: 68, fcf: 8 }
        ],
        projectedData: [
            { year: "year+1", revenue: 300, fcf: 32 },
            { year: "year+2", revenue: 340, fcf: 38 }
        ],
        correctDecision: "pass",
        pointValue: 150,
        hints: [{ cost: 0.5, text: "4 מתוך 5 בכירים מכרו ₪22M, החברה קנתה חזרה ₪3M. מי אמיתי?" }],
        feedback: {
            principle: { id: "management-quality", name: "איכות הנהלה" },
            decisiveSignals: ["4/5 בכירים מכרו ₪22M", "רכישה עצמית ₪3M = \'תיאטרון\'", "צמיחה מאטה 25% → 15%"],
            correctExplanation: "נכון! \'בעלים קונים מסיבה אחת, מוכרים מאלף סיבות\' — אבל כש-4 מתוך 5 מוכרים ביחד, הסיבה אחת: הם יודעים משהו. רכישה עצמית ₪3M מול מכירות ₪22M = תיאטרון. והצמיחה מאטה = אולי מה שהם יודעים.",
            incorrectExplanation: "טעות! PEG 0.9 מפתה. אבל כשכמעט כל ההנהלה מוכרת ביחד — זה הסיגנל הכי חזק שיש. ₪22M מכירות מול ₪3M רכישה = ההנהלה \'מגינה על עצמה\' בזמן שבורחת.",
            counterSignalExplanation: "הצד השני יטען: PEG 0.9 = זול. בכירים מוכרים מסיבות אישיות (מיסוי, גיוון). רכישה עצמית מראה אמון. ROIC 14% מכובד."
        },
        workedExample: "1) PEG 0.9 — \'מציאה\'! 2) אבל: 4/5 בכירים מכרו ₪22M ב-3 חודשים. 3) רכישה עצמית ₪3M = 14% ממה שהבכירים מכרו = תיאטרון. 4) צמיחה: 25% → 15% ברבעון = האטה. 5) שילוב: הנהלה בורחת + צמיחה מאטה = אזהרה. 6) מסקנה: תנו אמון בפעולות ההנהלה, לא בדיבורים — העל.",
        isGoodValue: false,
        difficulty: "medium",
        difficultyValue: 2,
        hint: "4 מתוך 5 בכירים מכרו ₪22M, החברה קנתה חזרה ₪3M. מי אמיתי?"
    },

    // ── MOAT: Intangible Assets (Medium, Buy) ──────────────────────────
    {
        id: "intangible-moat-m01",
        name: "רגולטור-טק בע\"מ",
        sector: "רגולציה וציות",
        symbol: "RGTK",
        price: 125.00,
        tier: 2,
        chartType: "segments",
        description: "חברה שבנתה מאגר מידע רגולטורי ייחודי ב-15 שנות עבודה. 8,000 תקנות מעודכנות, 500 לקוחות שמשלמים מנוי שנתי. שיעור חידוש 93%. מתחרה צריך 10+ שנים לבנות מאגר דומה.",
        management: "מייסד-מנכ\"ל עם 20% אחזקה. משקיע 22% מההכנסות בעדכון ובהרחבת המאגר.",
        moat: "נכס בלתי מוחשי: מאגר 8,000 תקנות × 15 שנות עבודה = לא ניתן לשכפל.",
        events: "רגולציה חדשה באירופה = דרישה להתאמה = לקוחות חדשים. מתחרה סגר כי לא הצליח לשכפל את המאגר.",
        metrics: {
            basic: [
                { name: "P/E", value: "19" },
                { name: "ROE", value: "22%" },
                { name: "צמיחת הכנסות", value: "11%" }
            ],
            advanced: [
                { name: "ROIC", value: "24%" },
                { name: "FCF (מיליון ₪)", value: "32" },
                { name: "שיעור חידוש", value: "93%" }
            ]
        },
        segmentData: [
            { name: "מנויים שנתיים", revenue: 95, margin: "55%", growth: "+8%" },
            { name: "ייעוץ רגולטורי", revenue: 35, margin: "40%", growth: "+18%" },
            { name: "הכשרות ותעודות", revenue: 20, margin: "65%", growth: "+15%" }
        ],
        projectedData: [
            { year: "year+1", revenue: 165, fcf: 36 },
            { year: "year+2", revenue: 182, fcf: 40 }
        ],
        correctDecision: "buy",
        pointValue: 150,
        hints: [{ cost: 0.5, text: "מאגר של 8,000 תקנות שנבנה ב-15 שנה. מתחרה סגר כי לא הצליח לשכפל. מה סוג החפיר הזה?" }],
        feedback: {
            principle: { id: "moat", name: "חפיר כלכלי" },
            decisiveSignals: ["מאגר 15 שנים = בלתי ניתן לשכפול", "חידוש 93%", "מתחרה סגר = החפיר הוכח"],
            correctExplanation: "מצוין! נכס בלתי מוחשי שלוקח 15+ שנים לבנות = חפיר עמוק. חידוש 93% מוכיח שהלקוחות תלויים. מתחרה שסגר = הוכחה שהחפיר עובד. ROIC 24% = מתורגם לרווחים.",
            incorrectExplanation: "פספוס! \'שירותי רגולציה\' לא נשמע מרגש, אבל חפירים לא חייבים להיות מרגשים. 8,000 תקנות × 15 שנים = מה שבאפט קורא \'נכס שלא ניתן לשכפול\'. P/E 19 עם ROIC 24% = זול.",
            counterSignalExplanation: "הצד השני יטען: P/E 19 = לא זול. רגולציה יכולה להשתנות ולהפוך את המאגר לפחות רלוונטי. AI עלולה לשנות את הענף."
        },
        workedExample: "1) חפיר: מאגר 8K תקנות × 15 שנים = נכס ייחודי. 2) הוכחה: מתחרה סגר, חידוש 93%. 3) סגמנטים: 3 זרמי הכנסות, כולם רווחיים (40-65%). 4) ROIC 24% = החפיר מייצר ערך. 5) P/E 19 מול ROIC 24% = סביר. 6) עתיד: רגולציה חדשה = עוד ביקוש. 7) מסקנה: חפיר נכס בלתי מוחשי — קנייה.",
        isGoodValue: true,
        difficulty: "medium",
        difficultyValue: 2,
        hint: "מאגר של 8,000 תקנות שנבנה ב-15 שנה. מתחרה סגר כי לא הצליח לשכפל. מה סוג החפיר הזה?"
    },

    // ── FUTURE: Reinvestment Rate (Medium, Buy) ────────────────────────
    {
        id: "reinvestment-m01",
        name: "אינפרא-דאטה בע\"מ",
        sector: "תשתיות מידע",
        symbol: "INFD",
        price: 148.00,
        tier: 2,
        chartType: "waterfall",
        description: "חברת תשתיות מידע שמשקיעה 40% מה-FCF בחזרה בעסק ב-ROIC של 25%. כל ₪1 שמושקע מחזיר ₪0.25/שנה. P/E 16 נראה \'ממוצע\', אבל שיעור ההשקעה מחדש × ROIC = צמיחה אורגנית פנימית של 10%/שנה.",
        management: "מנכ\"ל מהנדס עם 14% אחזקה. מדיניות ברורה: \'משקיעים רק ב-ROIC > 20%\'. 60% FCF חוזר לבעלי מניות.",
        moat: "תשתית מידע קריטית למגזר הפיננסי. עלות מעבר גבוהה.",
        events: "השקת שירות חדש שצפוי להוסיף 12% להכנסות בעוד שנתיים. שיעור זכייה במכרזים 70%.",
        metrics: {
            basic: [
                { name: "P/E", value: "16" },
                { name: "ROE", value: "20%" },
                { name: "צמיחת הכנסות", value: "10%" }
            ],
            advanced: [
                { name: "ROIC", value: "25%" },
                { name: "שיעור השקעה מחדש", value: "40% מ-FCF" },
                { name: "צמיחה פנימית (ROIC × reinvestment)", value: "10%/שנה" }
            ]
        },
        historicalData: [
            { year: "year-4", revenue: 220, fcf: 38 },
            { year: "year-3", revenue: 240, fcf: 42 },
            { year: "year-2", revenue: 260, fcf: 46 },
            { year: "year-1", revenue: 285, fcf: 50 },
            { year: "year-0", revenue: 310, fcf: 55 }
        ],
        projectedData: [
            { year: "year+1", revenue: 340, fcf: 60 },
            { year: "year+2", revenue: 375, fcf: 68 }
        ],
        correctDecision: "buy",
        pointValue: 150,
        hints: [{ cost: 0.5, text: "ROIC 25% × שיעור השקעה 40% = צמיחה פנימית 10%. מה זה אומר על הצמיחה בעוד 5 שנים?" }],
        feedback: {
            principle: { id: "owner-earnings", name: "רווחי בעלים" },
            decisiveSignals: ["ROIC 25% × 40% reinvestment = 10% צמיחה פנימית", "כלל ROIC > 20%", "60% FCF לבעלי מניות"],
            correctExplanation: "מצוין! הנוסחה הכי חשובה בהשקעות ערך: צמיחה פנימית = ROIC × שיעור השקעה מחדש. 25% × 40% = 10% צמיחה אורגנית — ללא רכישות, ללא סיכון. P/E 16 על צמיחה 10% מובטחת + 60% FCF לבעלי מניות = זול.",
            incorrectExplanation: "טעות! P/E 16 \'ממוצע\' בלבל אותך. אבל 25% ROIC עם 40% reinvestment = ₪1 מושקע מרוויח ₪0.25/שנה. זו מכונת צמיחה פנימית. + 60% FCF חוזר אליך.",
            counterSignalExplanation: "הצד השני יטען: P/E 16 ממוצע לסקטור. צמיחה 10% = לא מרגש. תשתיות מידע = תלות בלקוחות גדולים שעלולים לעזוב."
        },
        workedExample: "1) ROIC 25% — גבוה! 2) שיעור reinvestment: 40%. 3) צמיחה פנימית: 25% × 40% = 10%/שנה. 4) מה נשאר: 60% FCF → דיבידנד + רכישה עצמית. 5) סה\"כ תשואה: ~10% צמיחה + ~4% תשואה לבעלי מניות = ~14%. 6) P/E 16 על 14% תשואה שנתית = זול. 7) מסקנה: מכונת compounding — קנייה.",
        isGoodValue: true,
        difficulty: "medium",
        difficultyValue: 2,
        hint: "ROIC 25% × שיעור השקעה 40% = צמיחה פנימית 10%."
    },

    // ── FUTURE: Technology Disruption Risk (Medium, Pass) ───────────────
    {
        id: "disruption-risk-m01",
        name: "סקיורי-גארד בע\"מ",
        sector: "שמירה ואבטחה",
        symbol: "SKRG",
        price: 40.00,
        tier: 2,
        chartType: "annual",
        description: "חברת שמירה עם 3,000 שומרים. P/E 7, דיבידנד 6%, רווחית. אבל: מערכות AI וצילום מחליפות שומרים. 2 לקוחות גדולים כבר עברו למצלמות + AI. ההנהלה \'לא מאמינה\' שזה ישפיע.",
        management: "מנכ\"ל ותיק שבנה את החברה על אנשים, לא טכנולוגיה. \'שומרים תמיד יהיו צורך.\'",
        moat: "רשת 3,000 עובדים ומוניטין, אבל = עלות גבוהה מול חלופה טכנולוגית.",
        events: "2 לקוחות גדולים (12% מההכנסות) עברו ל-AI + מצלמות. 3 מתחרים השקיעו בטכנולוגיה.",
        metrics: {
            basic: [
                { name: "P/E", value: "7" },
                { name: "ROE", value: "14%" },
                { name: "תשואת דיבידנד", value: "6%" }
            ],
            advanced: [
                { name: "ROIC", value: "11%" },
                { name: "FCF (מיליון ₪)", value: "25" },
                { name: "שחיקת לקוחות טכנולוגיה", value: "12% מההכנסות" }
            ]
        },
        historicalData: [
            { year: "year-4", revenue: 310, fcf: 30 },
            { year: "year-3", revenue: 305, fcf: 28 },
            { year: "year-2", revenue: 298, fcf: 27 },
            { year: "year-1", revenue: 290, fcf: 26 },
            { year: "year-0", revenue: 278, fcf: 25 }
        ],
        projectedData: [
            { year: "year+1", revenue: 260, fcf: 22 },
            { year: "year+2", revenue: 240, fcf: 18 }
        ],
        correctDecision: "pass",
        pointValue: 150,
        // FCF BREAKER: FCF positive
        hints: [{ cost: 0.5, text: "2 לקוחות עברו ל-AI. 3 מתחרים השקיעו בטכנולוגיה. ההנהלה \'לא מאמינה\'. מי צודק?" }],
        feedback: {
            principle: { id: "moat", name: "חפיר כלכלי" },
            decisiveSignals: ["disruption טכנולוגי = שחיקת חפיר", "הנהלה לא מסתגלת", "12% הכנסות כבר אבדו"],
            correctExplanation: "נכון! שאלת העתיד: \'האם שמירה פיזית תהיה רלוונטית בעוד 10 שנים?\' AI + מצלמות = זולות יותר, אמינות יותר, 24/7. 12% כבר הלכו. הנהלה שמכחישה = לא תשתנה. P/E 7 = זול מסיבה.",
            incorrectExplanation: "טעות! P/E 7, דיבידנד 6% — \'מציאה\'. אבל שאלו: מה יהיה בעוד 5 שנים? AI + מצלמות = זולות ב-70% משומרים. 2 לקוחות כבר עברו. הנהלה שלא מסתגלת = תלך עם הענף.",
            counterSignalExplanation: "הצד השני יטען: שומרים תמיד יהיו צורך (בתי חולים, שדות תעופה). P/E 7 ודיבידנד 6% = תשואה טובה. AI עדיין לא מושלם."
        },
        workedExample: "1) P/E 7, FCF חיובי — בסדר? 2) אבל: חשיבת עתיד. AI + מצלמות = חלופה ב-70% פחות. 3) כבר 12% הכנסות אבדו ללקוחות שעברו. 4) מתחרים השקיעו בטכנולוגיה — הם יציעו מוצר משולב. 5) ההנהלה: \'לא מאמינה\' = לא תסתגל. 6) בעוד 5 שנים: הכנסות ₪180-200M (מ-₪310M). 7) מסקנה: disruption שההנהלה מכחישה — העל.",
        isGoodValue: false,
        difficulty: "medium",
        difficultyValue: 2,
        hint: "2 לקוחות עברו ל-AI. 3 מתחרים השקיעו בטכנולוגיה. ההנהלה \'לא מאמינה\'. מי צודק?"
    },

    // ── MANAGEMENT: Board Quality (Medium, Pass) ────────────────────────
    {
        id: "bad-board-m01",
        name: "מגה-קום תקשורת בע\"מ",
        sector: "תקשורת",
        symbol: "MGKM",
        price: 88.00,
        tier: 2,
        chartType: "none",
        description: "חברת תקשורת עם ביצועים סבירים. אבל: הדירקטוריון מורכב מ-7 חברים שכולם קרובים/ידידים של בעל השליטה. אין דירקטור בלתי תלוי אמיתי. 3 רכישות בשנה \'בתנאי שוק\' — כולן מחברות קשורות.",
        management: "בעל שליטה עם 30% כוח הצבעה. דירקטוריום \'חותמת גומי\'. שכר ₪4M/שנה ללא תנאי ביצוע.",
        moat: "רשיון תקשורת = חפיר רגולטורי, אבל הממשל התאגידי מנקז ערך.",
        events: "3 רכישות מ\'חברות קשורות\'. דוח שנתי 280 עמודים (מורכב במכוון?).",
        metrics: {
            basic: [
                { name: "P/E", value: "9" },
                { name: "ROE", value: "12%" },
                { name: "תשואת דיבידנד", value: "4%" }
            ],
            advanced: [
                { name: "ROIC", value: "8%" },
                { name: "FCF (מיליון ₪)", value: "40" },
                { name: "עסקאות צדדים קשורים", value: "3 בשנה האחרונה" }
            ]
        },
        historicalData: [
            { year: "year-4", revenue: 420, fcf: 48 },
            { year: "year-3", revenue: 430, fcf: 45 },
            { year: "year-2", revenue: 440, fcf: 43 },
            { year: "year-1", revenue: 445, fcf: 42 },
            { year: "year-0", revenue: 450, fcf: 40 }
        ],
        projectedData: [
            { year: "year+1", revenue: 455, fcf: 38 },
            { year: "year+2", revenue: 460, fcf: 36 }
        ],
        correctDecision: "pass",
        pointValue: 150,
        // FCF BREAKER: positive and looks stable
        hints: [{ cost: 0.5, text: "הכנסות עולות 1%, FCF יורד 2%. דירקטוריון של חברים. עסקאות צדדים קשורים. לאן הולך הכסף?" }],
        feedback: {
            principle: { id: "management-quality", name: "איכות הנהלה" },
            decisiveSignals: ["דירקטוריום חותמת גומי", "3 עסקאות צדדים קשורים", "הכנסות ↑ + FCF ↓"],
            correctExplanation: "נכון! דירקטוריום של חברים = אין פיקוח. 3 עסקאות מחברות קשורות = הערך זולג לבעל השליטה. הכנסות +1% ו-FCF -2% = הפער הולך לבעלי עניין. P/E 9 \'זול\' = מוצדק.",
            incorrectExplanation: "טעות! P/E 9, דיבידנד 4%, FCF ₪40M — נראה סביר. אבל FCF יורד בזמן שהכנסות עולות = ₪10M בשנה \'נעלמים\'. 3 עסקאות צדדים קשורים מסבירות לאן.",
            counterSignalExplanation: "הצד השני יטען: P/E 9 זול לתקשורת. רשיון = חפיר. דיבידנד 4% יציב. וגם חברות עם ממשל בעייתי יכולות להיות השקעות טובות."
        },
        workedExample: "1) P/E 9, FCF ₪40M — סביר? 2) מגמה: הכנסות +7% (4 שנים), FCF -17%. ₪8M \'נעלמו\'. 3) דירקטוריום: 7 חברים/קרובים = אין ביקורת. 4) עסקאות: 3 מחברות קשורות = כסף זולג. 5) שכר: ₪4M ללא ביצוע. 6) מסקנה: ממשל תאגידי רע = ערך שנעלם. העל.",
        isGoodValue: false,
        difficulty: "medium",
        difficultyValue: 2,
        hint: "הכנסות עולות 1%, FCF יורד 2%. דירקטוריון של חברים. עסקאות צדדים קשורים. לאן הולך הכסף?"
    }
];


// ============================================================================
// SECTION 3: MORE VERSUS ROUNDS (management & moat focused)
// ============================================================================

const VERSUS_BATCH3 = [

    // ── VERSUS 10: Moat Type Comparison (Easy) ─────────────────────────
    {
        id: "versus-moat-type-01",
        tier: 1,
        type: "versus",
        title: "איזה חפיר חזק יותר — רגולציה או מותג?",
        description: "שתי חברות: אחת עם חפיר רגולטורי (רשיון בלעדי) ושנייה עם חפיר מותגי. שתיהן ב-ROIC 18%.",
        companyA: {
            name: "רשיון-בלעדי בדיקות בע\"מ",
            symbol: "RSBN",
            sector: "בדיקות",
            description: "הגוף היחיד שרשאי לבדוק ציוד רפואי בישראל. רשיון בלעדי מהמדינה. P/E 20, ROIC 18%, צמיחה 5%.",
            metrics: [
                { name: "P/E", value: "20" },
                { name: "ROIC", value: "18%" },
                { name: "חפיר", value: "רשיון בלעדי (רגולטורי)" },
                { name: "סיכון", value: "הרגולטור יכול לפתוח תחרות" }
            ],
            historicalFCF: [20, 21, 22, 23, 24]
        },
        companyB: {
            name: "מותג-ישראל מזון בע\"מ",
            symbol: "MTGI",
            sector: "מזון",
            description: "מותג מזון מוביל שנמכר ב-25% יותר מהמתחרים — ואנשים עדיין קונים. P/E 18, ROIC 18%, צמיחה 6%.",
            metrics: [
                { name: "P/E", value: "18" },
                { name: "ROIC", value: "18%" },
                { name: "חפיר", value: "מותג + כוח תמחור" },
                { name: "סיכון", value: "שינוי טעם צרכנים" }
            ],
            historicalFCF: [18, 20, 22, 24, 26]
        },
        correctAnswer: "B",
        pointValue: 120,
        feedback: {
            explanation: "מותג-ישראל עדיף. חפיר רגולטורי = חזק אבל תלוי בהחלטה ממשלתית אחת. חפיר מותגי = נבנה ע\"י צרכנים במשך שנים. אם הרגולטור יפתח תחרות — הרשיון הבלעדי נעלם. אם צרכנים ישנו טעם — המותג ייפגע, אבל לאט יותר ובאופן הדרגתי.",
            counterArgument: "רשיון-בלעדי: חפיר רגולטורי = חזק יותר כי אי אפשר לשכפל. מותג יכול להישחק על ידי פרייבט-לייבל. P/E 20 מול 18 = הפרש קטן.",
            principle: { id: "moat", name: "חפיר כלכלי" }
        },
        workedExample: "1) שניהם ROIC 18% — ביצועים דומים. 2) חפיר רגולטורי: חזק, אבל = החלטה ממשלתית אחת הורסת אותו. 3) חפיר מותגי: איטי יותר להיבנות, אבל גם איטי יותר להישחק. 4) FCF: מותג עולה 8/שנה, רשיון 1/שנה. 5) מסקנה: מותג = חפיר עמיד יותר."
    },

    // ── VERSUS 11: Management Under Pressure (Hard) ────────────────────
    {
        id: "versus-mgmt-pressure-01",
        tier: 3,
        type: "versus",
        title: "איך ההנהלה מגיבה ללחץ?",
        description: "שתי חברות שספגו ירידה של 25% בהכנסות. אחת חתכה עלויות בחוכמה, השנייה בפאניקה. מי תתאושש?",
        companyA: {
            name: "מנוהלת-חכם בע\"מ",
            symbol: "MNHK",
            sector: "תעשייה",
            description: "ההכנסות ירדו 25%. ההנהלה: חתכה 15% כוח אדם (את הפחות פרודוקטיביים), שמרה על R&D, סגרה קו אחד הפסדי. מרווח תפעולי ירד מ-18% ל-14% בלבד. רכישה עצמית ₪10M \'כי המניה זולה\'.",
            metrics: [
                { name: "מרווח תפעולי", value: "14% (היה 18%)" },
                { name: "R&D", value: "נשמר" },
                { name: "רכישה עצמית", value: "₪10M" },
                { name: "פיטורים", value: "15% (ממוקדים)" }
            ],
            historicalFCF: [35, 38, 40, 28, 25]
        },
        companyB: {
            name: "חותכת-בפאניקה בע\"מ",
            symbol: "HTFP",
            sector: "תעשייה",
            description: "ההכנסות ירדו 25%. ההנהלה: חתכה 40% כוח אדם (כולל R&D), ביטלה את תוכנית הפיתוח, חילקה דיבידנד מיוחד ₪30M \'כדי לשמר משקיעים\'. מרווח תפעולי \'שופר\' ל-16% — אבל על ידי חיתוך העתיד.",
            metrics: [
                { name: "מרווח תפעולי", value: "16% (\'שופר\')" },
                { name: "R&D", value: "בוטל" },
                { name: "דיבידנד מיוחד", value: "₪30M" },
                { name: "פיטורים", value: "40% (גורפים)" }
            ],
            historicalFCF: [35, 38, 40, 28, 32]
        },
        correctAnswer: "A",
        pointValue: 200,
        feedback: {
            explanation: "מנוהלת-חכם עדיפה. שמירה על R&D = שמירה על העתיד. חיתוך ממוקד 15% (לא גורף) = יעילות בלי הרס. רכישה עצמית = \'המניה זולה, נקנה\'. לעומת: חותכת-בפאניקה הקריבה את העתיד (R&D = 0) כדי \'לשפר\' מרווח היום, וחילקה ₪30M שהייתה צריכה להשקעות.",
            counterArgument: "חותכת-בפאניקה: מרווח 16% > 14%. FCF ₪32M > ₪25M. דיבידנד ₪30M = מחזירה כסף למשקיעים. \'יעילה יותר\'.",
            principle: { id: "management-quality", name: "איכות הנהלה" }
        },
        workedExample: "1) שתיהן ספגו -25% הכנסות. 2) תגובת A: חיתוך ממוקד, שמירה R&D, רכישה עצמית = בונה לעתיד. 3) תגובת B: חיתוך גורף, ביטול R&D, דיבידנד = מציל את ההווה על חשבון המחר. 4) בעוד 3 שנים: A תחזור עם מוצרים חדשים. B = ללא R&D, אין מוצרים. 5) מסקנה: הנהלה שחושבת קדימה > הנהלה שנלחצת."
    },

    // ── VERSUS 12: Moat Widening vs. Narrowing (Expert) ────────────────
    {
        id: "versus-moat-direction-01",
        tier: 4,
        type: "versus",
        title: "חפיר שמתרחב או חפיר שמצטמצם?",
        description: "שתי חברות עם ROIC 16%. אחת = ROIC עלה מ-12% (חפיר מתרחב). השנייה = ROIC ירד מ-20% (חפיר מצטמצם).",
        companyA: {
            name: "מתרחבת-חפיר בע\"מ",
            symbol: "MTHF",
            sector: "שירותים",
            description: "ROIC עלה מ-12% ל-16% ב-4 שנים. מרווח גולמי עולה, נתח שוק עולה, מתחרים עוזבים. חפיר מתרחב. P/E 22.",
            metrics: [
                { name: "P/E", value: "22" },
                { name: "ROIC (מגמה)", value: "12% → 16% ↑" },
                { name: "מרווח גולמי", value: "עולה" },
                { name: "מתחרים", value: "עוזבים" }
            ],
            historicalFCF: [20, 24, 28, 33, 38]
        },
        companyB: {
            name: "מצטמצמת-חפיר בע\"מ",
            symbol: "MTHF",
            sector: "שירותים",
            description: "ROIC ירד מ-20% ל-16% ב-4 שנים. מרווח גולמי יורד, מתחרים נכנסים, הנחות גוברות. חפיר מצטמצם. P/E 12.",
            metrics: [
                { name: "P/E", value: "12" },
                { name: "ROIC (מגמה)", value: "20% → 16% ↓" },
                { name: "מרווח גולמי", value: "יורד" },
                { name: "מתחרים", value: "נכנסים" }
            ],
            historicalFCF: [42, 40, 38, 36, 34]
        },
        correctAnswer: "A",
        pointValue: 300,
        feedback: {
            explanation: "מתרחבת-חפיר עדיפה. ROIC 16% זהה — אבל הכיוון הפוך. A: חפיר מתחזק → ROIC ימשיך לעלות. B: חפיר נשחק → ROIC ימשיך לרדת. P/E 22 > 12 מוצדק כי A בונה ו-B מתפרקת. בעוד 3 שנים: A ב-ROIC 20%+, B ב-ROIC 12%.",
            counterArgument: "מצטמצמת: P/E 12 מול 22 = הפרש כפול. ROIC 16% עדיין גבוה. FCF ₪34M מול ₪38M = קרוב. \'קנייה בזול\' שלמרות הירידה עדיין רווחית.",
            principle: { id: "moat", name: "חפיר כלכלי" }
        },
        workedExample: "1) ROIC זהה: 16%. אבל כיוון הפוך. 2) A: 12% → 16% = חפיר מתחזק, FCF עולה מ-20 ל-38. 3) B: 20% → 16% = חפיר נשחק, FCF יורד מ-42 ל-34. 4) חיזוי: A → 18-20% בעוד 3 שנים. B → 12-14%. 5) P/E: 22 על חפיר מתרחב = זול. 12 על חפיר מצטמצם = יקר. 6) מסקנה: הכיוון חשוב יותר מהמספר."
    }
];


// ============================================================================
// SECTION 4: REMAINING SELL/HOLD (future-focused)
// ============================================================================

const SELL_HOLD_BATCH3 = [

    // ── SELL/HOLD 7: New Competitor Changes Outlook (Medium) ────────────
    {
        id: "sellhold-new-competitor-01",
        tier: 2,
        type: "sell-hold",
        title: "מתחרה חדש שמשנה את כללי המשחק",
        purchaseContext: {
            name: "דפוס-פלוס שירותי דפוס בע\"מ",
            symbol: "DFPS",
            sector: "שירותי דפוס",
            purchasePrice: 45.00,
            currentPrice: 48.00,
            change: "+7%",
            holdingPeriod: "10 חודשים"
        },
        newInformation: "מתחרה טכנולוגי חדש השיק שירות דפוס אונליין אוטומטי — ב-40% מהמחיר שלכם, עם איכות דומה. כבר לקח 5% מהשוק ב-3 חודשים. המנכ\"ל שלכם: \'הלקוחות שלנו נאמנים.\'",
        currentMetrics: [
            { name: "P/E", value: "8" },
            { name: "ROIC", value: "13%" },
            { name: "FCF", value: "₪18M" }
        ],
        correctDecision: "sell",
        pointValue: 150,
        feedback: {
            principle: { id: "moat", name: "חפיר כלכלי" },
            explanation: "למכור! מתחרה ב-40% פחות שכבר לקח 5% ב-3 חודשים = disruption אמיתי. \'הלקוחות נאמנים\' = מה שכל חברה שנפגעה מ-disruption אמרה. +7% = עדיין ברווח — נצלו את זה.",
            counterArgument: "\'רק 5% ב-3 חודשים, המחיר עלה, ואנחנו ברווח.\' — 5% ב-3 חודשים = 20%+ בשנה. וזה רק ההתחלה.",
            biasWarning: "הטיית סטטוס-קוו: הנטייה להניח שהמצב הנוכחי ימשיך. כש-disruption מגיע, הוא מאיץ — לא מאט."
        },
        workedExample: "1) מצב: +7%, P/E 8, FCF חיובי. 2) שינוי: מתחרה ב-40% פחות, 5% שוק ב-3 חודשים. 3) חשיבת עתיד: 5% ב-3 חודשים = 20%+ בשנה. בעוד 3 שנים? 4) הנהלה \'לא מודאגת\' = לא תסתגל. 5) מסקנה: disruption + הכחשה = למכור כשעדיין ברווח."
    },

    // ── SELL/HOLD 8: Management Deterioration (Hard) ────────────────────
    {
        id: "sellhold-mgmt-deterioration-01",
        tier: 3,
        type: "sell-hold",
        title: "ההנהלה השתנתה — מוצדק לחכות?",
        purchaseContext: {
            name: "קוואליטי-פוד תעשיות בע\"מ",
            symbol: "QLFD",
            sector: "מזון",
            purchasePrice: 85.00,
            currentPrice: 95.00,
            change: "+12%",
            holdingPeriod: "2 שנים"
        },
        newInformation: "קנית בגלל הנהלה מצוינת עם ROIC > 15%. מאז: (1) המנכ\"ל פרש ונכנס יורש ללא ניסיון. (2) 3 רכישות ב-ROIC 8%. (3) שכר ההנהלה עלה 45%. (4) ROIC ירד ל-11%. המספרים עדיין \'סבירים\' — אבל הכיוון שלילי.",
        currentMetrics: [
            { name: "P/E", value: "14" },
            { name: "ROIC", value: "11% (ירד מ-15%)" },
            { name: "FCF", value: "₪38M (יציב)" }
        ],
        correctDecision: "sell",
        pointValue: 200,
        feedback: {
            principle: { id: "management-quality", name: "איכות הנהלה" },
            explanation: "למכור! +12% מפתה להחזיק, אבל כל הסימנים שליליים: ROIC יורד, רכישות גרועות, שכר עולה. באפט: \'כשספינה טובה מקבלת קפטן רע, תמיד הקפטן מנצח.\' המספרים \'סבירים\' כי הנהלה רעה לוקחת זמן להרוס — אבל הכיוון ברור.",
            counterArgument: "\'אני ברווח 12%, המספרים עדיין סבירים, אולי היורש ילמד.\' — ROIC 15% → 11% ב-2 שנים = מגמה. 3 רכישות ב-ROIC 8% = הרגל. שכר +45% = אינטרסים.",
            biasWarning: "אפקט הקצאה + anchoring: \'אני כבר ברווח\' + \'המספרים עדיין \'סבירים\'\' מונעים ממך לראות שהכיוון רע."
        },
        workedExample: "1) התזה: הנהלה מעולה עם ROIC > 15%. 2) מה השתנה: מנכ\"ל פרש, יורש + ROIC 15% → 11% + 3 רכישות גרועות + שכר +45%. 3) \'המספרים סבירים\' = הנזק טרם השלים. 4) שאלה: \'הייתי קונה היום עם היורש?\' לא. 5) +12% לא רלוונטי. 6) מסקנה: הנהלה ← גרועה = התזה נשברה. למכור."
    }
];


// ============================================================================
// SECTION 5: REMAINING SPECIAL EVENTS (8 more)
// ============================================================================

const SPECIAL_EVENTS_BATCH3 = [

    {
        id: "event-moat-test-01",
        tier: 1,
        type: "special-event",
        eventType: "company",
        title: "מבחן החפיר: מתחרה הוזיל 20%",
        description: "חברה שאתם מחזיקים (מותג חזק, מרווח 40%) מתמודדת עם מתחרה שהוזיל ב-20%. עברו 3 חודשים. מה אתם בודקים כדי להחליט אם החפיר שלם?",
        options: [
            { text: "בודקים אם הרווח ירד — אם לא, החפיר עובד.", value: "check-profit" },
            { text: "בודקים נתח שוק — אם לא ירד, החפיר עובד.", value: "check-share" },
            { text: "בודקים שניהם: נתח שוק + מרווח גולמי. אם שניהם יציבים = חפיר חי.", value: "check-both" }
        ],
        correctOption: "check-both",
        pointValue: 100,
        feedback: {
            correct: "מצוין! שני המדדים חשובים: נתח שוק יציב = הלקוחות נשארים. מרווח יציב = לא נאלצו להוזיל. אם רק אחד יציב (למשל, נתח ירד אבל מרווח לא — איבדו לקוחות רגישי-מחיר אבל שמרו על האיכותיים), עדיין צריך לנתח לעומק.",
            incorrect: "חשבו יותר. רווח לבד לא מספיק — אולי הוזילו כדי לשמר נתח. נתח שוק לבד לא מספיק — אולי שמרו נתח ע\"י הורדת מחיר (= מרווח ירד). צריך את שניהם.",
            principle: { id: "moat", name: "חפיר כלכלי" }
        }
    },

    {
        id: "event-mgmt-compensation-01",
        tier: 2,
        type: "special-event",
        eventType: "company",
        title: "חבילת תגמול — אדומה או ירוקה?",
        description: "אתם קוראים את הדוח השנתי. חבילת תגמול המנכ\"ל: ₪1.5M בסיס + ₪3M בונוס על ROIC > 15% + ₪2M באופציות שמבשילות רק אחרי 4 שנים. סך הכל: ₪6.5M/שנה. הכנסות החברה: ₪500M.",
        options: [
            { text: "₪6.5M זה הרבה. שכר מנופח.", value: "too-much" },
            { text: "מבנה מעולה: בסיס נמוך, בונוס על ROIC, אופציות ארוכות טווח.", value: "great-structure" },
            { text: "בסדר. 1.3% מההכנסות — לא יקר.", value: "ok-cheap" }
        ],
        correctOption: "great-structure",
        pointValue: 150,
        feedback: {
            correct: "מצוין! לא הסכום שחשוב — המבנה. בסיס ₪1.5M = צנוע. בונוס על ROIC (לא הכנסות!) = תמריץ נכון. אופציות ל-4 שנים = חשיבה ארוכת טווח. זו בדיוק חבילת התגמול שבאפט מחפש.",
            incorrect: "הסכום (₪6.5M) פחות חשוב מהמבנה. בונוס על ROIC = מנכ\"ל מתוגמל על איכות ההשקעות. אופציות ל-4 שנים = מחויב לטווח ארוך. זה מבנה מעולה.",
            principle: { id: "management-quality", name: "איכות הנהלה" }
        }
    },

    {
        id: "event-5year-thinking-01",
        tier: 2,
        type: "special-event",
        eventType: "macro",
        title: "חשיבה ל-5 שנים קדימה",
        description: "אתם שוקלים 3 סקטורים להשקעה. מה שחשוב הוא לא איפה הם היום — אלא איפה הם יהיו בעוד 5 שנים. באיזה סקטור תשקיעו?",
        options: [
            { text: "אנרגיה מסורתית: P/E 5, דיבידנד 8%, FCF שיא — אבל רגולציה ירוקה בדרך.", value: "traditional-energy" },
            { text: "בדיקות איכות: P/E 18, צמיחה 8% — רגולציה חדשה מרחיבה דרישות.", value: "quality-testing" },
            { text: "נדל\"ן מסחרי: P/E 10, דיבידנד 5% — אבל עבודה מרחוק גוברת.", value: "commercial-real-estate" }
        ],
        correctOption: "quality-testing",
        pointValue: 150,
        feedback: {
            correct: "מצוין! חשיבת 5 שנים: אנרגיה מסורתית = FCF שיא היום, אבל רגולציה ירוקה תוריד ביקוש. נדל\"ן מסחרי = עבודה מרחוק = פחות ביקוש. בדיקות = רגולציה מרחיבה = יותר ביקוש. הסקטור \'המשעמם\' הוא ה-winner.",
            incorrect: "חשבו 5 שנים קדימה, לא היום. P/E 5 ודיבידנד 8% מרשימים — אבל מה יקרה לביקוש לאנרגיה מסורתית? P/E 10 ודיבידנד 5% נחמדים — אבל מה יקרה לנדל\"ן מסחרי? הסקטור עם רוח-גבית רגולטורית = בדיקות.",
            principle: { id: "moat", name: "חפיר כלכלי" }
        }
    },

    {
        id: "event-ceo-letter-01",
        tier: 1,
        type: "special-event",
        eventType: "company",
        title: "מכתב המנכ\"ל: מה לחפש?",
        description: "אתם קוראים את מכתב המנכ\"ל בדוח השנתי. איזה מכתב מעיד על הנהלה איכותית?",
        options: [
            { text: "\'שנה מצוינת! הכנסות שיא, רווחים שיא, צוות מדהים!\' — אופטימי ומעודד.", value: "cheerleader" },
            { text: "\'עשינו 3 דברים טוב, טעינו ב-2, וכך נתקן. ROIC ירד ונתמקד בשיפור.\' — כנה.", value: "honest" },
            { text: "\'תנאי השוק היו קשים, הרגולציה הזיקה, המתחרים נהגו לא הוגן.\' — מציאותי.", value: "blame-external" }
        ],
        correctOption: "honest",
        pointValue: 100,
        feedback: {
            correct: "מצוין! באפט קורא כל מכתב מנכ\"ל בעיניים חשדניות. מנכ\"ל שמודה בטעויות ומסביר איך יתקן = אמין. \'הכל מעולה\' = אינו מציאותי. \'אשם חיצוני\' = לא לוקח אחריות.",
            incorrect: "חשבו: מנכ\"ל שתמיד אופטימי = לא מזהיר אתכם מסיכונים. מנכ\"ל שמאשים גורמים חיצוניים = לא לוקח אחריות. מנכ\"ל שמודה בטעויות = אמין. זה מי שאתם רוצים שינהל את הכסף שלכם.",
            principle: { id: "management-quality", name: "איכות הנהלה" }
        }
    },

    {
        id: "event-moat-types-01",
        tier: 1,
        type: "special-event",
        eventType: "macro",
        title: "זהו את סוג החפיר",
        description: "4 חברות, 4 חפירים שונים. דרגו את החפירים מהחזק לחלש: (A) מותג שמוכר ב-30% יותר ואנשים עדיין קונים. (B) מפעל שעלותו נמוכה ב-20% מהמתחרים. (C) רשת 500K משתמשים שמושכת עוד משתמשים. (D) רשיון ממשלתי בלעדי.",
        options: [
            { text: "C > A > D > B (רשת > מותג > רשיון > עלות)", value: "network-first" },
            { text: "D > C > A > B (רשיון > רשת > מותג > עלות)", value: "license-first" },
            { text: "A > C > B > D (מותג > רשת > עלות > רשיון)", value: "brand-first" }
        ],
        correctOption: "network-first",
        pointValue: 100,
        feedback: {
            correct: "מצוין! רשת = מתחזק עם הזמן (ככל שגדל — חזק יותר). מותג = חזק אבל יכול להישחק לאט. רשיון = חזק אבל תלוי בהחלטה אחת. עלות = הכי חלש — מישהו זול יותר תמיד יגיע.",
            incorrect: "חשבו על עמידות: רשת = מתחזקת עם הזמן. רשיון = החלטה ממשלתית אחת מבטלת אותו. מותג = חזק אבל נשחק. עלות = הכי פגיע — מישהו תמיד ימצא דרך לייצר בזול.",
            principle: { id: "moat", name: "חפיר כלכלי" }
        }
    },

    {
        id: "event-roic-direction-01",
        tier: 3,
        type: "special-event",
        eventType: "company",
        title: "ROIC 15% — אבל לאן?",
        description: "שתי חברות עם ROIC 15%. חברה א\': ROIC עלה מ-10% → 15% ב-3 שנים. חברה ב\': ROIC ירד מ-20% → 15% ב-3 שנים. באיזו תשקיעו?",
        options: [
            { text: "חברה א\' — ROIC עולה = חפיר מתחזק = תמשיך לעלות.", value: "rising" },
            { text: "חברה ב\' — ROIC 20% מראה פוטנציאל גבוה יותר, רק צריך להתאושש.", value: "falling" },
            { text: "שתיהן שוות — ROIC 15% זהה.", value: "same" }
        ],
        correctOption: "rising",
        pointValue: 200,
        feedback: {
            correct: "מצוין! הכיוון חשוב יותר מהמספר. ROIC עולה = חפיר מתחזק, הנהלה משתפרת, העסק נהיה יותר טוב. ROIC יורד = חפיר נשחק, אולי תחרות גוברת. באפט: \'הייתי מעדיף חברה שמשתפרת לאט על פני חברה שמתדרדרת מהר.\'",
            incorrect: "חשבו על מגמה: 10% → 15% = שיפור. 20% → 15% = הרעה. בעוד 3 שנים: א\' אולי ב-20%. ב\' אולי ב-10%. \'אותו ROIC\' הוא תמונה רגעית — המגמה מספרת את הסיפור.",
            principle: { id: "owner-earnings", name: "רווחי בעלים" }
        }
    },

    {
        id: "event-debt-types-01",
        tier: 2,
        type: "special-event",
        eventType: "company",
        title: "לא כל חוב שווה — איזה מסוכן?",
        description: "שתי חברות עם חוב/הון 2.0. חברה א\': חוב בריבית קבועה ל-10 שנים, מכוסה 4x, הכנסות מחוזים ל-15 שנה. חברה ב\': חוב בריבית משתנה, מכוסה 1.5x, הכנסות מפרויקטים חד-פעמיים. איזה חוב מסוכן?",
        options: [
            { text: "שניהם מסוכנים — חוב/הון 2.0 גבוה תמיד.", value: "both-risky" },
            { text: "חברה ב\' מסוכנת. ריבית משתנה + כיסוי 1.5x + הכנסות לא-יציבות = מתכון לבעיות.", value: "b-risky" },
            { text: "חברה א\' מסוכנת — 10 שנים של חוב = התחייבות ארוכה.", value: "a-risky" }
        ],
        correctOption: "b-risky",
        pointValue: 150,
        feedback: {
            correct: "מצוין! חוב/הון 2.0 = מספר אחד. אבל מה שמאחוריו קריטי: ריבית קבועה vs. משתנה. כיסוי 4x vs. 1.5x. הכנסות יציבות vs. חד-פעמיות. חברה א\' = חוב \'בטוח\'. חברה ב\' = פצצה מתקתקת.",
            incorrect: "\'חוב/הון 2.0 = מסוכן תמיד\' זו גישה גסה מדי. חוב בריבית קבועה + כיסוי 4x + הכנסות מובטחות = כמעט ללא סיכון. חוב בריבית משתנה + כיסוי 1.5x + הכנסות לא-יציבות = מסוכן מאוד.",
            principle: { id: "leverage-risk", name: "סיכון מינוף" }
        }
    },

    {
        id: "event-future-moat-01",
        tier: 4,
        type: "special-event",
        eventType: "macro",
        title: "איזה חפיר ישרוד את השנים הבאות?",
        description: "באפט אומר: \'אני לא קונה את מה שטוב היום — אני קונה את מה שיהיה טוב בעוד 10 שנים.\' איזה עסק ישרוד ויצמח?",
        options: [
            { text: "רשת סניפי בנק (120 סניפים) — מיקומים פריים, מותג חזק.", value: "bank-branches" },
            { text: "חברת בדיקות מזון (מונופול) — רגולציה רק מרחיבה דרישות.", value: "food-testing" },
            { text: "סוכנות נסיעות מובילה (30% נתח) — מותג מוכר, לקוחות נאמנים.", value: "travel-agency" }
        ],
        correctOption: "food-testing",
        pointValue: 300,
        feedback: {
            correct: "מצוין! חשיבת 10 שנים: בנקאות → סניפים נסגרים (אפליקציות). סוכנות נסיעות → אונליין אוכל את הענף. בדיקות מזון → רגולציה רק גדלה. בעוד 10 שנים: פחות סניפי בנק, פחות סוכנויות נסיעות, יותר בדיקות מזון. שאלת העתיד = השאלה הכי חשובה.",
            incorrect: "חשבו 10 שנים קדימה: האם אנשים יבואו לסניף בנק? (לא — אפליקציות). האם אנשים ישתמשו בסוכן נסיעות? (פחות — Booking). האם רגולציית מזון תצטמצם? (לעולם לא — רק תתרחב). העסק \'המשעמם\' = הבטוח.",
            principle: { id: "moat", name: "חפיר כלכלי" }
        }
    }
];


// ============================================================================
// SUMMARY — BATCH 3
// ============================================================================
//
// Easy companies:       8 (6 buy, 2 pass)
// Medium companies:     5 (2 buy, 3 pass)
// Versus rounds:        3 (tiers: 1, 3, 4)
// Sell/hold:            2 (tiers: 2, 3)
// Special events:       8 (tiers: 1×3, 2×3, 3×1, 4×1)
// 
// Chart types: segments(3), waterfall(1), quarterly(2), none(3), annual(4)
//
// Focus areas covered:
//   - Moat types: network effect, switching costs, brand, intangible, regulatory
//   - Moat direction: widening vs narrowing
//   - Management: capital allocation, compensation alignment, insider signals, board
//   - Future thinking: disruption, 5-year outlook, reinvestment rate, obsolescence
//   - FCF breakers: 3 more (obsolescence, comp-misaligned, bad-board)
//
// ============================================================================
// MERGE INSTRUCTIONS: Same as Batches 1 & 2.
// ============================================================================
