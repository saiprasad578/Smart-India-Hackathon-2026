# Judge Q&A Stress Test

**Weakest point a sharp judge will hit first:** logistics economics and cold start. Expect: "Why won't you die like Otipy?"

## Q1. Why won't this end up like Otipy?

**Answer:** We are asset-light: no owned inventory or fleet. We start B2B and FPO-first, and (in the backlog) pre-order aggregation so dispatch is against committed demand, which attacks wastage. We pilot on a storable crop (onion) and use tomato as the perishable stress test. Revenue is a small take rate plus routing savings, not margin from holding stock.

**Follow-up: take rate and coverage?** Show an *illustrative* per-kg breakup with marked assumptions; say what you'd validate in a pilot.

## Q2. How do you stop fake listings, inflated quantities or refused deliveries?

**Answer:** Escrow releases payment only after delivery confirmation (OTP + photo). Listings need geo-tagged, time-stamped photos and are checked against mandi modal price bands. FPOs are verified; reputation affects visibility. Disputes trigger a partial-refund rule based on a graded quality check at the collection point.

**Follow-up: who arbitrates quality?** The FPO grades at aggregation using standard grade definitions. AI photo-grading is advisory only.

## Q3. How accurate is the forecasting, and with what data?

**Answer:** Agmarknet/CEDA price and arrival history. We compare against a seasonal-naive baseline with walk-forward validation and report error against that baseline. Forecasts feed price bands (and pre-order planning later).

**Follow-up: shocks like export bans or unseasonal rain?** Prediction intervals, event flags and human override. We don't claim to predict policy shocks.

## Q4. A farmer with a basic phone and low literacy: how does he use this?

**Answer:** Voice input in regional languages, an FPO agent mode where a field agent lists on the farmer's behalf, and SMS/WhatsApp fallbacks for order status (planned).

**Follow-up: who pays the agent?** A share of the platform take rate goes to the FPO/agent: a transparent, priced service instead of a hidden margin.

## Q5. How is this different from e-NAM or ONDC?

**Answer:** e-NAM digitises trading between registered mandis and traders. ONDC is an open protocol. Neither gives a small FPO an aggregation, pooled logistics, forecasting and trust engine out of the box. We build that operations layer and can expose it through ONDC-compatible interfaces.

**Follow-up: why not just build an ONDC seller app?** We can ship it that way; the innovation is the engine underneath and ONDC is one distribution channel.

## Q6 (structural, live). One buyer orders 2 tonnes, but five FPO farmers can only fulfil 1.4 tonnes. Show partial fulfilment with split payments.

**Answer:** Demo it live. The schema is `Order → OrderLines → Allocations → Payouts`, so partial fulfilment and split payouts are native, not a migration. Prepare this scenario in the seed data.

## Rules for answering

- Be honest about what is simulated.
- Every number needs a stated assumption.
- Don't claim to remove all middlemen; claim fewer hops and visible margins.
