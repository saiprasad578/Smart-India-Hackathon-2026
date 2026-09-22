# Research Notes

Summarised from the problem-statement breakdown. **Verify figures before quoting them in a pitch.**

## Pain points and root causes

| Root cause | What happens on the ground |
| --- | --- |
| Fragmented supply | Small lots, no bargaining power |
| Information asymmetry | Farmers don't know prices in other mandis; traders do |
| No last-mile logistics | Local trader becomes the default buyer |
| Credit and payment dependence | Advances from agents lock farmers into selling to that agent |
| Perishability | Forced quick sales weaken negotiating position |
| Poor demand planning | Everyone plants the same crop; prices crash; wastage follows |

**Farmer share of consumer price (RBI working paper):** roughly 33% tomato, 36% onion, 37% potato; dairy about 70%.

## Stakeholders

| Stakeholder | Pain | Need |
| --- | --- | --- |
| Small farmers | Low price, delayed payment | Simple UX, guaranteed payment, price transparency |
| FPOs | Weak market linkage | Bulk buyers, aggregation tools |
| Consumers | High prices, unknown quality | Fresh produce, fair price, traceability |
| Bulk buyers | Inconsistent supply and quality | Reliable volume and grading |
| Transporters | Empty return trips | Pooled loads, better routes |
| Government | Inflation, farmer distress | Data and digital public infrastructure |

## Scale of existing rails

As of March 2026, e-NAM had integrated 1,656 mandis across 23 States and 4 Union Territories, with 1.80 crore+ farmers, 2.73 lakh traders and 4,724 FPOs registered. Our solution should plug into existing rails, not start from zero.

## Competitor analysis

| Player | What it does | Limitation |
| --- | --- | --- |
| e-NAM | Online trading across regulated mandis | Mandi/trader-centric; not built for direct consumer sales or last mile |
| ONDC | Open protocol; FPOs can list and reach any buyer app | A protocol, not an operations layer; no forecasting, pooling or trust engine |
| Ninjacart | B2B fresh-produce supply chain | Owns inventory and logistics (capital heavy); serves retailers |
| DeHaat | Inputs, advisory, credit, market linkage | Revenue skews to inputs |
| Otipy (shut down) | Farm-to-consumer via community resellers | Cautionary tale |
| Agmarknet / CEDA portal | Price and arrival data | Data only, no transactions |
| GitHub hackathon clones (Fasalo, FarmConnect, AgriConnect-style) | List-and-buy CRUD apps | Typically no real fraud handling, logistics or forecasting. **Verify against the repos before claiming this** |

### Reality checks

- **Otipy** shut down in May 2025 after failing to close a funding round; reporting attributes it to capital-intensive last-mile logistics, thin margins and competition from 10-minute apps. It claimed low wastage via predictive demand engines, so forecasting alone doesn't save a marketplace.
- **Ninjacart** reported ₹2,002.7 crore revenue in FY24 with a ₹259.6 crore net loss.
- **DeHaat** is reported to have crossed ₹3,000 crore FY25 revenue, with growth leaning on input sales.
- **ONDC** reportedly has 7,000+ FPOs and 35 lakh+ farmers connected (older government presentation). Be compatible, not competing.

## Common misinterpretations to avoid

| Misreading | Reality |
| --- | --- |
| "Amazon for farmers" | Core is removing intermediaries and inefficiency |
| "AI" as a chatbot | PS names demand forecasting and route optimisation |
| Consumer-only | Bulk buyers and FPOs are explicit users |
| Ignoring logistics | It is a named deliverable |
| "We remove all middlemen" | Frame as replacing extractive intermediaries with transparent, priced services |

## Evaluator red flags

- Generic CRUD app with "AI" bolted on
- Forecasting with no baseline or accuracy metric
- No answer on fraud, quality disputes or payments
- Huge savings claimed with made-up numbers
- Ignoring e-NAM/ONDC
- UI only a tech-savvy user could operate
- No cold-start plan

## Likely judging criteria (estimate)

Innovation and uniqueness, feasibility and working demo, impact and scalability (each high); sustainability and UX/completeness (medium).

## Team roles (team of ~6)

| Role | Count | Focus |
| --- | --- | --- |
| Backend | 2 | Orders, escrow logic, allocation schema |
| Frontend/mobile | 1 | Multilingual, voice-friendly UI |
| AI/ML | 1 | Forecasting + VRP routing |
| UX | 1 | Low-literacy design |
| Research / presentation | 1 | Mandi economics, FPO workflows, storytelling |

## Research to-do

1. Read the RBI paper on value chains and pick one crop corridor.
2. Map the chain with margins (farmer → agent → wholesaler → retailer).
3. Speak to at least one FPO or farmer.
4. Audit 3–4 competitors and list what each cannot do.
5. Freeze the MVP flow and scope.
6. Pull Agmarknet/CEDA data and run a baseline forecast before building UI.
7. Draft judge Q&A early.

## Research notes (fill in)

- Primary research (FPO/farmer conversations): [notes]
- Chain map with margins: [notes]
- Competitor repo audit: [notes]
