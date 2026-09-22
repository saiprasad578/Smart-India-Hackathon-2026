# 🌾 Farmer-to-Consumer Digital Marketplace (SIH)

A trust-first, farmer-friendly marketplace that connects farmers and FPOs directly with consumers and bulk buyers. It reduces the number of hops between farm and buyer and makes every remaining margin visible, using pre-verified listings, escrow-style payments, pooled route optimisation and forecast-driven planning.

**Problem statement:** Multiple intermediaries reduce farmers' earnings and increase consumer prices.

## Approach in one paragraph

We do **not** build a generic "list and buy" app. We build **one crop corridor** end to end (onion and tomato from one FPO cluster to a city) and lead with three differentiators: a **trust and anti-fraud layer**, a **voice-first regional-language farmer UX with FPO agent mode**, and **pooled route optimisation**. Everything is asset-light (no owned inventory or fleet), honest about simulated data, and designed so that partial fulfilment (one buyer, many farmers) works from day one.

## Status

Pre-build. See `TASKS.md` for the plan and `docs/MEMORY.md` for the current state.

## Documentation

| File | Purpose |
| --- | --- |
| `docs/PRD.md` | What we are building and why |
| `docs/ARCHITECTURE.md` | Stack, folder structure, data model (incl. allocations) |
| `docs/DESIGN.md` | Farmer-first, low-literacy design system |
| `RULES.md` | Rules for the AI and humans when coding |
| `TASKS.md` | Phased build plan |
| `docs/DECISIONS.md` | Technical decisions (proposed / accepted) |
| `docs/MEMORY.md` | Current project state |
| `docs/TEST_PLAN.md` | How we verify it works |
| `docs/SECURITY.md` | Fraud, payment and data security requirements |
| `docs/RESEARCH.md` | Pain points, stakeholders, competitors, reality checks |
| `docs/DATA_PLAN.md` | Data sources, fallbacks, synthetic data policy |
| `docs/JUDGE_QA.md` | Prepared answers to the toughest judge questions |
| `docs/PROMPTS.md` | Reusable AI prompt templates |

## Getting started

```bash
git clone [repo-url]
cd [project-folder]

# backend
cd backend && python -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt
cp ../.env.example ../.env   # fill in values

# frontend
cd ../frontend && npm install && npm run dev
```

## Demo flow (MVP)

1. Farmer/FPO lists produce by voice or simple form (geo-tagged photo + quantity).
2. Platform checks the ask price against the mandi modal price and flags outliers.
3. Buyer places a bulk or consumer order; payment is held in escrow (test mode).
4. System pools orders and shows an optimised pickup and delivery route on a map.
5. Dashboard shows demand and price forecasts and a price-breakup view (farmer vs logistics vs platform).
