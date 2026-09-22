# Tasks

Work one task at a time. Mark complete only after tests pass.

## Phase 0: Research and data prep (before the build window)

- [ ] TASK-001: Pick the crop corridor (onion + tomato from one FPO cluster to one city) and freeze it
- [ ] TASK-002: Map the actual chain (farmer → agent → wholesaler → retailer) with margins for the chosen crop
- [ ] TASK-003: Talk to at least one FPO or farmer (even by phone); record notes in `docs/RESEARCH.md`
- [ ] TASK-004: Download CEDA/Agmarknet CSVs for the chosen crop and 5–10 mandis
- [ ] TASK-005: Run a forecasting baseline (seasonal-naive) and record error before building UI
- [ ] TASK-006: Draft unit-economics assumptions (per-kg breakup, take rate, logistics cost) and mark every assumption
- [ ] TASK-007: Freeze MVP scope in `docs/PRD.md`

## Phase 1: Setup

- [ ] TASK-008: Initialize repo, backend (FastAPI) and frontend (React PWA + TypeScript + Tailwind)
- [ ] TASK-009: Configure PostgreSQL, Alembic migrations, linting, type checks
- [ ] TASK-010: Add `.env.example`, `.gitignore`, CI basics
- [ ] TASK-011: Set up i18n (English + one regional language to start)

## Phase 2: Core data model (design the allocation table first)

- [ ] TASK-012: Create tables: users, fpos, farmers, listings, orders, order_lines, allocations, payments, payouts, disputes
- [ ] TASK-013: Implement escrow/payment state machine (held → released / refunded / partially released)
- [ ] TASK-014: Implement allocation service (one order → many farmers, partial fulfilment, split payouts)
- [ ] TASK-015: Unit tests: 2 t order vs 1.4 t supply across 5 farmers with split payments
- [ ] TASK-016: Auth and roles (farmer, FPO agent, buyer, admin)

## Phase 3: Farmer/FPO listing flow

- [ ] TASK-017: Listing form (crop, grade, quantity, ask price) with geo-tagged, time-stamped photo capture
- [ ] TASK-018: Voice input for listing (browser speech API first; Bhashini as upgrade)
- [ ] TASK-019: FPO agent mode: list on behalf of a farmer
- [ ] TASK-020: Price-sanity check against mandi modal price band with outlier flag
- [ ] TASK-021: Import mandi price data and build price-band service

## Phase 4: Buyer ordering and payments

- [ ] TASK-022: Buyer catalogue and order placement (bulk and consumer)
- [ ] TASK-023: Payment in Razorpay test mode with escrow-style hold logic
- [ ] TASK-024: Delivery confirmation (OTP + photo) and release of payouts
- [ ] TASK-025: Dispute flow with graded partial-refund rule
- [ ] TASK-026: Reputation scores for buyers and sellers

## Phase 5: Pooled logistics

- [ ] TASK-027: Distance matrix via OSRM/OpenStreetMap
- [ ] TASK-028: VRP solver (OR-Tools) to batch orders across farmers and vehicles
- [ ] TASK-029: Map UI (Leaflet) with pickup and delivery route
- [ ] TASK-030: Cost-per-kg savings view from pooling, with assumptions shown

## Phase 6: Forecasting and transparency

- [ ] TASK-031: Price forecast (SARIMAX or Prophet) with walk-forward validation vs seasonal-naive baseline
- [ ] TASK-032: Prediction intervals, event flags and manual override
- [ ] TASK-033: Demand/price forecast dashboard
- [ ] TASK-034: Price-breakup ("fair price") view: farmer vs logistics vs platform on every order

## Phase 7: Demo readiness

- [ ] TASK-035: Seed synthetic data from real price history; label everything synthetic
- [ ] TASK-036: End-to-end Playwright test of the demo flow
- [ ] TASK-037: Prepare the live partial-fulfilment demo (2 t order, 1.4 t supply)
- [ ] TASK-038: Rehearse Judge Q&A (`docs/JUDGE_QA.md`)
- [ ] TASK-039: Preview deploy, QA, production deploy, backup demo video

## Backlog (stretch / not in MVP)

- Pre-order aggregation (collect commitments before harvest)
- ONDC-compatible interfaces
- WhatsApp/IVR fallback for order status
- AI photo grading (advisory only)
- Additional crops and corridors
