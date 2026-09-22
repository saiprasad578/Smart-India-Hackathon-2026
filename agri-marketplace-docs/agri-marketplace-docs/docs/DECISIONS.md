# Decisions

Status values: **Proposed** (suggested from the problem-statement breakdown, not yet confirmed), **Accepted**, **Superseded**.
Do not change Accepted decisions without recording a new one.

## ADR-001: Scope to one crop corridor

- **Status:** Proposed
- **Decision:** Build one corridor end to end (onion and tomato from one FPO cluster to a city) instead of a national platform.
- **Reason:** A hackathon build window supports one working end-to-end demo, not a national platform.
- **Open:** Confirm crop mix (onion + tomato vs onion + potato with tomato as perishable stress test), city and FPO cluster.

## ADR-002: Lead with three differentiators

- **Status:** Proposed
- **Decision:** Trust/anti-fraud layer, voice-first regional UX with FPO agent mode, pooled route optimisation. Others are backlog.
- **Reason:** A generic marketplace is easy to clone; three strong differentiators beat six shallow ones.

## ADR-003: Allocation-first data model

- **Status:** Proposed (treat as mandatory)
- **Decision:** `Order → OrderLines → Allocations → Payouts`. Never assume one farmer per order.
- **Reason:** Judges may ask for partial fulfilment with split payments live; a single-farmer schema cannot be migrated during a demo.

## ADR-004: Asset-light model

- **Status:** Proposed
- **Decision:** No owned inventory or fleet. Revenue = small take rate + routing savings; share to FPO/agent as transparent service fee.
- **Reason:** Capital-intensive fresh-produce supply chains (e.g. Otipy, Ninjacart) struggle with unit economics.

## ADR-005: Backend and frontend stack

- **Status:** Proposed
- **Decision:** FastAPI + PostgreSQL backend; React PWA + TypeScript + Tailwind frontend.
- **Reason:** Python covers forecasting and OR-Tools in the same language as the API; PWA suits low-end phones.
- **Alternatives:** Node backend, Flutter frontend.

## ADR-006: Payments are simulated

- **Status:** Proposed
- **Decision:** Razorpay test mode with an internal escrow state machine; visibly labelled as simulated.
- **Reason:** Real payment integration is out of scope; honesty is rewarded.

## ADR-007: Data policy

- **Status:** Proposed
- **Decision:** Real mandi price history (CEDA/Agmarknet) for forecasting; synthetic farmers, FPOs, buyers and orders seeded from real prices, always labelled.
- **Reason:** No public farmer/order data exists; judges punish hidden fakery.

## ADR-008: Forecasting standard

- **Status:** Proposed
- **Decision:** Always compare against a seasonal-naive baseline using walk-forward validation; show prediction intervals; allow human override.
- **Reason:** Forecasting without a baseline or accuracy metric is a known red flag.

## ADR-009: Routing approach

- **Status:** Proposed
- **Decision:** OR-Tools VRP with OSRM/OpenStreetMap distances; logistics simulated and labelled.
- **Reason:** Free, demo-able, and honest about no real fleet integration.

## ADR-010: ONDC/e-NAM positioning

- **Status:** Proposed
- **Decision:** Position as an operations layer that can be exposed through ONDC-compatible interfaces; not competing with e-NAM/ONDC.
- **Reason:** Judges expect awareness of national rails. ONDC compatibility is backlog for the MVP.
