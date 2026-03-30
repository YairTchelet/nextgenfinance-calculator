# Data Structure Templates

## Company Question (buy/pass)

```javascript
{
    id: "sector-descriptor-NN",        // e.g., "insurance-turnaround-01"
    name: "שם החברה בע\"מ",
    sector: "סקטור",
    symbol: "SYMB",                    // 3-5 Hebrew-plausible letters
    price: 85.00,                      // in ₪
    tier: 1,                           // 1=easy, 2=medium, 3=hard, 4=expert
    difficulty: "easy",                // "easy"|"medium"|"hard"|"expert"
    
    description: "2-6 sentences...",
    management: "2-4 sentences...",
    moat: "2-4 sentences, mix strengths AND weaknesses...",
    events: "2-4 recent events, mix positive AND negative...",

    // OPTIONAL: chart display type (default: "annual")
    chartType: "annual",               // "annual"|"quarterly"|"segments"|"waterfall"|"none"

    // OPTIONAL: market context for bias training (hard/expert)
    marketContext: {
        analystConsensus: "...",
        mediaHeadlines: ["...", "..."],
        retailSentiment: "...",
        insiderActivity: "..."
    },

    metrics: {
        basic: [                       // 3-4 metrics, ALWAYS include sector-appropriate valuation
            { name: "P/E", value: "22" },
            { name: "ROE", value: "17%" },
            { name: "תשואת דיבידנד", value: "2.5%" }
        ],
        advanced: [                    // 3-5 metrics, include at least one sector-specific
            { name: "ROIC", value: "15%" },
            { name: "FCF (מיליון ₪)", value: "120" },
            { name: "שימור לקוחות", value: "92%" }
        ]
    },

    // Use RELATIVE years — mandatory
    historicalData: [
        { year: "year-4", revenue: 800, fcf: 80 },
        { year: "year-3", revenue: 750, fcf: 70 },   // include at least one dip/anomaly
        { year: "year-2", revenue: 850, fcf: 90 },
        { year: "year-1", revenue: 950, fcf: 105 },
        { year: "year-0", revenue: 1050, fcf: 120 }
    ],
    projectedData: [
        { year: "year+1", revenue: 1150, fcf: 135 },
        { year: "year+2", revenue: 1250, fcf: 150 }
    ],

    // ALTERNATIVE: quarterly data (when chartType: "quarterly")
    quarterlyData: [
        { quarter: "Q1 year-1", revenue: 240, fcf: 25 },
        { quarter: "Q2 year-1", revenue: 260, fcf: 30 },
        // ...
    ],

    // ALTERNATIVE: segment data (when chartType: "segments")
    segmentData: [
        { name: "מוצר ליבה", revenue: 400, margin: "35%", growth: "+3%" },
        { name: "שירותי SaaS", revenue: 120, margin: "72%", growth: "+25%" }
    ],

    correctDecision: "buy",            // "buy"|"pass"
    pointValue: 100,                   // 100 (easy), 150 (medium), 200 (hard), 250 (expert)
    askConfidence: true,               // always true for v2

    // Medium+ only
    principleSelectionRequired: true,  // player picks principle before deciding

    hints: [{ cost: 0.5, text: "Hebrew hint text..." }],

    // Hard/Expert only — reasoning options
    reasoningOptions: [
        {
            id: "r1",
            text: "נימוק בעברית...",
            isCorrect: true,           // is this a correct reasoning?
            isTrap: false,             // is this a tempting wrong answer?
            appliesToDecision: "buy",   // which decision does this support?
            principleId: "moat",       // which principle does this invoke? (null if generic)
            biasTag: null              // "herding"|"sunk-cost"|"recency"|"anchoring"|null
        },
        // ... 5-6 total options: 2-3 correct, 1-2 traps, 1-2 neutral wrong
    ],

    // Expert only
    sellTriggers: [
        { id: "s1", text: "...", isCorrect: true },   // 3-4 items, 1 incorrect
    ],
    dueDiligence: [
        { id: "d1", text: "...", isCorrect: true },   // 3-4 items, 1 incorrect
    ],

    feedback: {
        principle: { id: "moat", name: "חפיר כלכלי" },
        decisiveSignals: ["signal1", "signal2", "signal3"],
        counterSignalExplanation: "MANDATORY — what the bull/bear case against your answer is. 3+ sentences.",
        correctExplanation: "2-3 sentences, varies tone (don't always start with 'מצוין!').",
        incorrectExplanation: "2-3 sentences, educational not punitive.",
        workedExample: "MANDATORY — 5-7 step expert walkthrough. Show thinking PROCESS.",
        
        // If bias is embedded:
        biasWarning: {
            bias: "herding",
            name: "הטיית עדר",
            explanation: "2-3 sentences explaining the bias and how it manifested here."
        },
        
        // Hard/Expert only:
        reasoningFeedback: {
            fullCorrect: "...",
            partialCorrect: "...",
            fellForTrap: "..."
        }
    },

    // Backward compatibility with v1 engine
    isGoodValue: true,                 // mirrors correctDecision
    difficultyValue: 1,                // 1-4
    hint: "short version of hints[0].text"
}
```

## Versus Round

```javascript
{
    id: "versus-sector-NN",
    type: "versus",
    title: "שאלת השוואה בעברית?",
    tier: 2,
    pointValue: 150,
    difficulty: "medium",
    context: "1-2 sentences explaining why these are comparable.",

    companyA: {
        name: "חברה א'",
        symbol: "CMPA",
        sector: "סקטור",
        description: "2-3 sentences.",
        metrics: {
            basic: [/* 3 metrics */],
            advanced: [/* 3-4 metrics */]
        },
        historicalData: [/* relative years */]
        // can also use quarterlyData or segmentData
    },

    companyB: {
        name: "חברה ב'",
        symbol: "CMPB",
        sector: "סקטור",
        description: "2-3 sentences.",
        metrics: {
            basic: [/* 3 metrics */],
            advanced: [/* 3-4 metrics — the key difference is usually here */]
        },
        historicalData: [/* relative years */]
    },

    correctChoice: "A",                // "A" or "B"
    hints: [{ cost: 0.5, text: "..." }],

    feedback: {
        principle: { id: "...", name: "..." },
        keyDifference: "The one insight that separates them. 2-3 sentences.",
        aAdvantages: ["...", "...", "..."],
        bAdvantages: ["...", "...", "..."],   // MUST have real advantages for the wrong choice
        lesson: "The transferable investing insight. 2-3 sentences."
    }
}
```

## Sell/Hold Decision

```javascript
{
    id: "sellhold-sector-NN",
    type: "sellhold",
    title: "מכירה או המשך החזקה?",
    tier: 3,
    pointValue: 200,
    difficulty: "hard",

    originalThesis: {
        company: "שם החברה",
        symbol: "SYMB",
        sector: "סקטור",
        buyDate: "לפני שנתיים",        // relative, not absolute
        buyPrice: 80.00,
        buyReason: "1-2 sentences — why you bought.",
        originalMetrics: { pe: "18", roic: "22%", fcfYield: "5%" }
    },

    currentSituation: {
        currentPrice: 52.00,
        timeHeld: "שנתיים",
        description: "3-5 sentences — what changed since purchase.",
        currentMetrics: { pe: "12", roic: "14%", renewalRate: "78%" },
        chartData: [/* quarterly or annual — relative years */]
    },

    portfolioContext: {
        positionSize: "8% מהתיק",
        totalPortfolioReturn: "+12%",
        thisPositionReturn: "-35%",
        taxImplication: "מכירה תיצור הפסד מס של 10,000 ₪"  // or capital gains
    },

    correctDecision: "sell",           // "sell"|"hold"|"partial"
    options: [
        { id: "sell", label: "למכור הכל", icon: "📉" },
        { id: "hold", label: "להמשיך להחזיק", icon: "🤝" },
        { id: "partial", label: "למכור חצי", icon: "✂️" }
    ],

    hints: [{ cost: 0.5, text: "..." }],
    reasoningOptions: [/* same structure as company questions */],

    feedback: {
        principle: { id: "...", name: "..." },
        biasWarning: {                  // sell/hold often involves sunk cost or disposition effect
            bias: "sunk-cost",
            name: "הטיית עלות שקועה",
            explanation: "..."
        },
        correctExplanation: "...",
        incorrectExplanation: {         // different explanation per wrong choice
            hold: "...",
            sell: "...",
            partial: "..."
        },
        workedExample: "..."
    }
}
```

## Special Event

```javascript
{
    id: "event-type-NN",
    title: "כותרת האירוע",
    type: "special",
    tier: 2,
    pointValue: 150,
    difficulty: "medium",

    // Rich context, not just one sentence
    description: "2-4 sentences with enough context to require analysis, not just recall.",

    correctImpact: "positive",         // "positive"|"negative"|"neutral"

    // OPTIONAL: for events where the obvious answer is wrong
    nuanceExplanation: "Why the gut-reaction answer is wrong.",

    hints: [{ cost: 0.5, text: "..." }],

    feedback: {
        principle: { id: "...", name: "..." },
        correct: "2-3 sentences.",
        incorrect: "2-3 sentences, educational."
    },

    // Backward compatibility
    difficulty: "medium",
    difficultyValue: 2
}
```
