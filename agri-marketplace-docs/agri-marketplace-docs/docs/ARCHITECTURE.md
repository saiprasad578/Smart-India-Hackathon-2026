# Architecture

> Architecture = **HOW** the application works. Status of stack choices: see `DECISIONS.md` (currently *Proposed*).

## Tech stack (proposed)

| Layer | Choice | Notes |
| --- | --- | --- |
| Frontend | React PWA + TypeScript + Tailwind | Farmer view and buyer view; multilingual |
| Backend | FastAPI (Python) | Same language as forecasting and routing |
| Database | PostgreSQL | Migrations with Alembic |
| Payments | Razorpay (test mode) + internal escrow state machine | Simulated; label as such |
| Forecasting | Python: seasonal-naive baseline, SARIMAX/Prophet/LightGBM | Walk-forward validation |
| Routing | OR-Tools (VRP) + OSRM/OpenStreetMap | Free and demo-able |
| Maps | Leaflet + OpenStreetMap tiles | |
| Voice / language | Browser speech APIs first; Bhashini as upgrade | |
| Testing | pytest, Vitest, Playwright | |
| Deployment | Any simple host (preview + production) | |

## System overview

```text
Farmer / FPO agent (voice, form)        Buyer (bulk / consumer)
              ↓                                   ↓
                 React PWA (i18n, voice, maps)
                              ↓
                    FastAPI backend (REST)
     ┌───────────┬───────────┼─────────────┬──────────────┐
  Listings   Orders &     Escrow /      Logistics       Forecast &
  & price    Allocations  Payments &    (VRP routing)   price-band
  checks                  Disputes                      services
     └───────────┴───────────┼─────────────┴──────────────┘
                              ↓
                          PostgreSQL
        (+ mandi price history, synthetic seed data)
```

## Folder structure

```text
backend/
├── app/
│   ├── api/          # routes
│   ├── domain/       # allocation, escrow state machine, price-band rules
│   ├── services/     # DB access, external services
│   ├── models/       # ORM models
│   ├── schemas/      # request/response schemas
│   ├── ml/           # forecasting
│   ├── routing/      # VRP + OSRM client
│   └── core/         # config, security
├── alembic/
└── tests/
frontend/
├── src/
│   ├── pages/
│   ├── components/
│   ├── features/     # listings, orders, tracking, dashboard
│   ├── i18n/
│   ├── lib/
│   └── types/
└── tests/e2e/
data/
├── raw/              # downloaded CSVs (not committed)
└── seed/             # scripts to generate synthetic data
notebooks/            # forecasting experiments
docs/
```

## Data model (allocation-first)

> Design the allocation table on **day one**. A schema that assumes one farmer per order cannot be migrated live during a demo.

```text
Order → OrderLines → Allocations (per farmer/listing) → Payouts
```

| Table | Key columns | Notes |
| --- | --- | --- |
| `users` | id, role, name, phone, language, verified | roles: farmer, fpo_agent, buyer, admin |
| `fpos` | id, name, location, verification_status | verified before listings get visibility boost |
| `farmers` | id, user_id, fpo_id, village, geo | |
| `listings` | id, farmer_id, commodity, grade, quantity_kg, ask_price_paise_per_kg, photo_url, photo_geo, photo_taken_at, price_flag, status, is_synthetic | photo must be geo + time stamped |
| `orders` | id, buyer_id, status, total_paise, delivery_address, created_at | |
| `order_lines` | id, order_id, commodity, grade, requested_qty_kg, price_paise_per_kg | |
| `allocations` | id, order_line_id, listing_id, farmer_id, allocated_qty_kg, delivered_qty_kg, status | many per order line; supports partial fulfilment |
| `payments` | id, order_id, amount_paise, status, gateway_ref | escrow states: held / released / partially_released / refunded |
| `payouts` | id, allocation_id, farmer_id, amount_paise, status | split payments per farmer |
| `price_breakups` | id, order_id, farmer_paise, logistics_paise, platform_paise, assumptions_ref | powers the fair-price view |
| `dispatch_batches` | id, vehicle_id, planned_route (JSON), distance_km, cost_paise | output of VRP |
| `batch_stops` | id, batch_id, allocation_id, stop_type, sequence, eta | pickups and deliveries |
| `disputes` | id, order_id, allocation_id, reason, quality_grade, resolution, status | graded partial-refund rule |
| `reputation` | id, user_id, score, events_count | affects listing visibility |
| `mandi_prices` | date, market, commodity, min_paise, max_paise, modal_paise, arrivals | real data (CEDA/Agmarknet) |
| `forecasts` | id, commodity, market, target_date, point, lower, upper, model, baseline_error | |
| `state_log` | id, entity, entity_id, from_state, to_state, actor, at | append-only audit trail |

## Key flows

### Partial fulfilment (must work live)

1. Buyer orders 2,000 kg (one order line).
2. Allocation service picks verified listings across five farmers; total available 1,400 kg.
3. Order is fulfilled partially (1,400 kg) or offered as a partial order for buyer confirmation.
4. Escrow holds payment for the allocated amount; per-farmer `payouts` are created.
5. On delivery confirmation (OTP + photo), payouts release per allocation; short deliveries trigger the dispute/partial-refund rule.

### Escrow state machine

```text
created → held → released
             ↘ partially_released
             ↘ refunded (dispute)
```

### Price sanity check

Compare listing ask price with the mandi modal price band for the commodity/market; flag outliers, block or require agent review beyond thresholds.

### Forecasting

Baseline = seasonal-naive. Candidate = SARIMAX/Prophet/LightGBM. Evaluate with walk-forward validation; report error vs baseline; show prediction intervals; allow human override and event flags.

### Pooled routing

Cluster pickups and deliveries → OSRM distance matrix → OR-Tools VRP → show route on map and cost-per-kg saving versus unpooled baseline (with assumptions displayed).

## Architectural rules

- No business logic in UI components.
- Allocation, escrow and price-band logic live in `domain/` and are unit-tested.
- Authentication and authorization are verified server-side.
- Money in integer paise. Every state change is logged.
- Synthetic data is always flagged.

## Environments

| Environment | Database | Notes |
| --- | --- | --- |
| Development | local PostgreSQL | `.env` |
| Preview | staging DB | per-branch |
| Production (demo) | production DB | protected `main`, backup demo video ready |
