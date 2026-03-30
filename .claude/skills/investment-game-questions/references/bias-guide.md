# Cognitive Bias Training Guide

## How to Embed Biases in Questions

Biases should be SUBTLE — embedded in the scenario, not labeled. The player discovers the bias through the feedback, not the question itself.

### Herding (הטיית עדר)
**Embed via:** `marketContext.analystConsensus` and `marketContext.mediaHeadlines`
**Pattern:** Overwhelming consensus (80%+ "buy") contradicted by insider actions or fundamental weakness.
**Where:** The consensus info feels reassuring. The contradiction is in management section or advanced metrics.
**Example signal:** "85% recommend buy" + CEO selling shares + LTV < CAC

### Sunk Cost (הטיית עלות שקועה)
**Embed via:** `portfolioContext.thisPositionReturn` in sell/hold scenarios
**Pattern:** Player is down 30-40% and thesis is broken, but selling "locks in the loss."
**Trap reasoning:** "I'm already down 35%, I'll wait for it to come back"
**Counter:** "The loss already happened. Would you buy this today at this price? If no — sell."

### Recency Bias (הטיית עדכניות)
**Embed via:** Bad recent quarter in otherwise strong multi-year trend
**Pattern:** Strong company with one bad quarter/year that dominates attention
**Example:** 5-year ROIC average 18%, last year 5% because of cycle bottom. Player sees "5%" and panics.
**Also works in reverse:** Great recent quarter masking deteriorating long-term trend.

### Anchoring (עיגון)
**Embed via:** `marketContext.mediaHeadlines` with specific price targets, or previous high/low prices
**Pattern:** "Was 150₪ last year, now 50₪" — the 150₪ is irrelevant to intrinsic value but anchors perception
**Also:** "Analyst target 240₪" creates an anchor that makes 185₪ feel "cheap" regardless of fundamentals

### Loss Aversion (סלידה מהפסד)
**Embed via:** Sell/hold scenario where selling NOW at a small loss avoids a bigger loss later
**Pattern:** Company with deteriorating fundamentals, player is down 15%, correct answer is sell (thesis broken)
**Trap:** "It's only down 15%, not worth selling for such a small loss" → company goes down another 40%

### Disposition Effect (אפקט הדיספוזיציה)
**Embed via:** Sell/hold scenario where player is UP significantly but should HOLD
**Pattern:** Stock up 100%+, thesis still intact, player wants to "take profits" / "lock in gains"
**Correct answer:** Hold (or even add) because the business keeps getting better
**Teaching:** "Would you buy this stock today at today's price?" If yes — hold. The gain is irrelevant.

### Confirmation Bias (הטיית אישור)
**Embed via:** Question where first impression (from description) is wrong after reading deeper data
**Pattern:** Description sounds positive → basic metrics confirm → advanced metrics reveal problem
**Or:** Description sounds negative → basic metrics confirm → but deep dive reveals opportunity
**The "twist" should be in the advanced metrics or events section, not in the description itself.**

### Home Bias (הטיית ביתיות)
**Relevant for Israeli context.** Could embed via versus rounds comparing Israeli company vs. equivalent foreign company where the foreign one is better value but "feels" less comfortable.

## Bias Tag Values
Use these exact strings in `biasTag` field:
`"herding"`, `"sunk-cost"`, `"recency"`, `"anchoring"`, `"loss-aversion"`, `"disposition"`, `"confirmation"`, `"home-bias"`, `"overconfidence"`
