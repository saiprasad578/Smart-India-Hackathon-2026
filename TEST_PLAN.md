# Test Plan

## Authentication and roles

- [ ] Farmer, FPO agent, buyer, admin can sign in
- [ ] Users only access their own data and permitted role views
- [ ] Logged-out users cannot access private pages

## Listings and trust checks

- [ ] Listing requires geo-tagged, time-stamped photo
- [ ] Ask price far outside the mandi modal band is flagged
- [ ] Voice input creates a correct listing draft that the user can confirm
- [ ] FPO agent can list on behalf of a farmer
- [ ] Unverified FPO listings get no visibility boost

## Orders, allocation and payments

- [ ] Buyer places bulk and consumer orders
- [ ] Order allocates across multiple farmers
- [ ] **Partial fulfilment:** 2,000 kg order, 1,400 kg supply across five farmers, correct split payouts
- [ ] Payment moves created → held on order
- [ ] Delivery confirmation (OTP + photo) releases payouts
- [ ] Buyer refusal or short delivery triggers dispute flow and partial refund
- [ ] All state transitions are logged
- [ ] Money arithmetic in integer paise has no rounding drift

## Logistics

- [ ] VRP produces valid routes (capacity, stops served once)
- [ ] Map shows pickups and deliveries in order
- [ ] Pooled cost-per-kg is lower than unpooled baseline on test scenarios, and assumptions are displayed

## Forecasting

- [ ] Walk-forward validation implemented
- [ ] Seasonal-naive baseline error recorded
- [ ] Model error reported against baseline
- [ ] Prediction intervals shown; manual override works
- [ ] Forecast runs on real price data

## Transparency

- [ ] Price-breakup shows farmer / logistics / platform on each order
- [ ] All synthetic data carries the label
- [ ] Every displayed saving links to an assumption

## Responsive and accessibility

- [ ] 375px, 768px, 1440px
- [ ] Regional language rendering (Indic fonts) correct
- [ ] Keyboard and screen-reader basics
- [ ] Contrast sufficient

## End-to-end demo flow (Playwright)

1. Farmer/agent lists produce (voice or form)
2. Price check runs and flags/accepts
3. Buyer orders; payment held
4. Allocation splits across farmers
5. Routes generated and shown on map
6. Delivery confirmed; payouts released
7. Dashboard shows forecast and price breakup

## Commands

```bash
# backend
pytest
ruff check .
mypy .

# frontend
npm run lint
npm run typecheck
npm test
npm run build
npx playwright test
```

## Demo readiness

- [ ] Preview deployment QA passed
- [ ] Backup demo video recorded
- [ ] Offline/slow-network fallback tested
