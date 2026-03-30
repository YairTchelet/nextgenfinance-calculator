# FCF Heuristic Breakers

The v1 question bank had a fatal flaw: "FCF positive = buy, FCF negative = pass" correctly predicted ~85% of answers. Every batch of new questions MUST include FCF breakers.

## Target: At least 30% of medium+ questions should have FCF pointing the "wrong" way

## FCF Positive but PASS

### Pattern 1: Stopped Investing
FCF jumped because CapEx dropped — company stopped maintaining/growing the business.
- **Signal:** FCF up + CapEx down + revenue declining
- **Teaching:** FCF from not-investing is like "saving money" by not fixing the roof
- **Sectors:** Infrastructure, telecom, retail with aging stores

### Pattern 2: One-Time Asset Sale
FCF inflated by selling property, division, or IP — not recurring.
- **Signal:** FCF spike in one year, normalize down in projections
- **Teaching:** Always check if FCF is from OPERATIONS or from liquidating assets
- **Sectors:** Real estate developers, conglomerates

### Pattern 3: Inventory Liquidation
Company shrinking and selling off inventory at discount.
- **Signal:** FCF positive + inventory dropping + revenue dropping + margins declining
- **Teaching:** Cash from selling inventory ≠ cash from healthy operations
- **Sectors:** Retail, manufacturing

### Pattern 4: Industry Dying Slowly
FCF still positive but the business is structurally shrinking.
- **Signal:** FCF positive but declining, revenue declining 5-15% per year consistently
- **Teaching:** A dying business can generate cash for years while slowly evaporating
- **Sectors:** Print media, legacy telecom, physical retail vs. e-commerce

### Pattern 5: Deferred Maintenance CapEx
Company postponing necessary maintenance to boost short-term FCF.
- **Signal:** CapEx well below depreciation for multiple years
- **Teaching:** When CapEx < depreciation consistently, the company is under-investing
- **Sectors:** Capital-intensive businesses (airlines, utilities, manufacturing)

### Pattern 6: Working Capital Games
FCF positive because company is stretching payables or tightening receivables unsustainably.
- **Signal:** FCF positive but accounts payable growing much faster than revenue
- **Teaching:** Squeezing suppliers is a one-time trick, not a sustainable strategy
- **Sectors:** Retail, construction

## FCF Negative but BUY

### Pattern 1: Heavy Growth Investment
Company investing heavily in expansion with clear high-ROIC returns.
- **Signal:** FCF negative + revenue growing fast + new stores/facilities opening + unit economics positive
- **Teaching:** Investment is not the same as losses. Check what the money is buying.
- **Sectors:** Retail expansion, SaaS with high NRR, franchise buildout
- **Key proof:** Show that past investments generated strong ROIC

### Pattern 2: Turnaround Investment
New management restructuring — spending now to fix the business.
- **Signal:** FCF negative + management buying shares + one-off restructuring costs + trend improving
- **Teaching:** Turnaround FCF is temporarily negative by design
- **Sectors:** Any sector with new management
- **Key proof:** Same-store/organic metrics improving even as total FCF is negative

### Pattern 3: Cyclical Trough
FCF negative because of cycle bottom, not structural problem.
- **Signal:** FCF negative in current year but positive in 4 out of 5 historical years
- **Teaching:** One bad year doesn't define a cyclical business. Check the 10-year average.
- **Sectors:** Commodities, chemicals, semiconductors, construction materials

### Pattern 4: R&D Intensive with Proven Product
Company spending on R&D that's expensed immediately but creating durable value.
- **Signal:** FCF negative + gross margins very high (60%+) + R&D/revenue high (20%+) + growing customer base
- **Teaching:** R&D spending is an investment, not a cost — if the products are working
- **Sectors:** Biotech with approved drugs, enterprise software, defense tech

### Pattern 5: Seasonal/Timing Mismatch
FCF negative in the period shown but positive on a full-year or normalized basis.
- **Signal:** Quarterly data showing FCF negative in Q1 (heavy inventory build) but positive rest of year
- **Teaching:** Timing of cash flows matters. Check the full cycle, not one snapshot.
- **Use with:** chartType: "quarterly"
