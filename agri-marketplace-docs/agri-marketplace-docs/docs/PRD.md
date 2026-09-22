# Product Requirements Document

> PRD = **WHAT** we are building and **WHY**.

## Product

Farmer-to-Consumer Digital Marketplace with a trust layer, voice-first UX and pooled logistics.

## Problem

Farmers sell through a chain of commission agents, traders, wholesalers and retailers. Each takes a margin, so farmers earn little and consumers pay a lot. An RBI working paper estimates the farmer's share of the consumer rupee at around 33% for tomato, 36% for onion and 37% for potato (dairy farmers get about 70%).

Root causes: fragmented supply, information asymmetry, no last-mile logistics, credit dependence on agents, perishability, and poor demand planning.

## Target users

| User | Need |
| --- | --- |
| Small farmers | Simple UX, guaranteed payment, price transparency |
| FPOs / field agents | Bulk buyers, aggregation tools, listing on behalf of farmers |
| Consumers | Fresh produce, fair price, traceability |
| Bulk buyers (hotels, retailers, kirana chains) | Reliable volume and grading |
| Transporters | Pooled loads, fewer empty return trips |
| Government / evaluators | Data, lower food inflation, farmer income impact |

## Goal

Reduce the number of hops between farm and buyer and make every remaining margin visible, using aggregation, pooled logistics and forecast-driven planning.

**Framing:** we replace extractive intermediaries with transparent, priced services. We do not claim to remove all middlemen.

## What is being asked (from the problem statement)

1. A marketplace connecting farmers/FPOs directly with consumers **and** bulk buyers.
2. **Logistics support**, not just listings.
3. **AI for demand forecasting and route optimisation.**
4. A demonstrable path to better farmer prices and lower consumer prices.

## Differentiators (pick three, not all six)

**Chosen for MVP:**

1. 🛡️ **Trust and anti-fraud layer**: escrow released on delivery confirmation, FPO verification, geo/time-stamped listing photos, price-sanity check against mandi modal price, buyer/seller reputation, dispute flow.
2. 🎤 **Voice-first, regional-language, agent-assisted UX**: voice listing, FPO agent mode, SMS/WhatsApp/IVR fallback later.
3. 🚚 **Pooled route optimisation**: VRP solver batches orders from multiple farmers with a visible cost-per-kg saving.

**Also in the demo flow (lightweight):** "fair price" price-breakup view (farmer vs logistics vs platform) and a forecast dashboard.

**Deferred (backlog):** pre-order aggregation, ONDC-compatible interfaces.

## MVP (one corridor)

**Corridor:** onion and tomato from one FPO cluster to one city (final crop choice is an open decision, see below).

Live end-to-end flow:

- [ ] Farmer/FPO lists produce by voice or simple form (geo-tagged photo + quantity)
- [ ] Ask price checked against mandi modal price; outliers flagged
- [ ] Buyer places bulk or consumer order; payment held in escrow (test mode)
- [ ] System pools orders and shows optimised pickup/delivery route on a map
- [ ] Dashboard: price and demand forecasts + price-breakup view
- [ ] Partial fulfilment with split payouts works (1 buyer, many farmers)
- [ ] Delivery confirmation (OTP + photo) releases payment; dispute flow exists

## Out of scope (version 1)

- Owning inventory or a fleet (we stay asset-light)
- Real logistics-partner integrations (simulated and clearly labelled)
- Real payments (test mode only)
- National rollout, multiple corridors
- Hardware/IoT
- Chatbot-style "AI" features
- Real-time policy-shock prediction (export bans etc.); we show intervals and allow human override

## User stories

- As a farmer, I want to list my produce by speaking in my language, so that I don't need to type.
- As an FPO agent, I want to list on behalf of farmers, so that low-literacy farmers can participate.
- As a buyer, I want payment held until I confirm delivery, so that I'm protected from fake or short deliveries.
- As a farmer, I want guaranteed payment after delivery, so that I don't depend on agent advances.
- As a buyer ordering 2 tonnes, I want the order fulfilled by several farmers, so that supply gaps don't block me.
- As an evaluator, I want to see where each rupee goes, so that I can verify the fairness claim.

## Success criteria

- A judge can watch the whole flow live on one corridor.
- The partial-fulfilment scenario (2 t order, 1.4 t supply, five farmers, split payments) works live.
- Forecast accuracy is reported against a baseline with walk-forward validation.
- Every number shown has a documented assumption; all synthetic data is labelled.
- A farmer with a basic phone can complete a listing with voice or an agent's help.

## Sustainability (to be validated)

Small take rate on transactions plus routing savings; a share to the FPO/agent as a transparent service fee. No margin from holding stock. Numbers are **illustrative until validated in a pilot**.

## Open questions

- Final crop mix: onion + tomato (per MVP) vs onion + potato with tomato as perishable stress test?
- Which city and FPO cluster is the corridor?
- Take rate and per-kg breakup assumptions (to be documented in unit-economics sheet).
- Which regional language(s) first?
- Cold start: who joins first, and how do we recruit the first FPO and buyers?
