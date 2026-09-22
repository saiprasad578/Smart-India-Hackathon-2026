# Security and Fraud Requirements

Fraud prevention is a core product feature here, not an afterthought.

## Fraud and trust controls

| Risk | Control |
| --- | --- |
| Fake listings | Geo-tagged, time-stamped photos; FPO verification; reputation-based visibility |
| Inflated quantities | Collection-point grading and weighing by FPO; reconcile delivered vs listed quantity |
| Price manipulation | Compare ask price to mandi modal price band; flag or block outliers |
| Buyer refusing delivery | Payment held in escrow; OTP + photo delivery confirmation; dispute flow |
| Seller shipping poor quality | Graded quality check at collection point (standard grade definitions); partial-refund rule |
| Fake accounts | Phone verification, FPO-linked onboarding, rate limits |

AI photo grading is **advisory only**, never the final arbiter.

## Authentication and authorization

- Roles: farmer, fpo_agent, buyer, admin.
- Verify authentication and authorization server-side for every request.
- Users access only resources they own or their role permits. FPO agents only act for farmers linked to their FPO.

## Payments

- Test mode only for the prototype; label as simulated.
- Escrow is an explicit state machine; every transition is logged with actor and timestamp.
- Idempotency on payment and payout operations.
- Store money in integer paise.

## Secrets

- Never expose secrets in client code or commit `.env` files. Only `.env.example` is committed.
- Separate keys per environment.

## Data protection

- Minimise personal data (phone, village, geo-location); collect only what is needed.
- Restrict access to precise farmer locations to necessary roles.
- Protect uploaded photos: validate type, size and filename; strip unneeded metadata except the geo/time stamp we need.
- Backups for production data.

## Input validation

- Validate all API request bodies and parameters on the server.
- Validate quantities, prices and grades against allowed ranges.

## Dependencies

- Pin versions; review new dependencies; keep packages updated.

## Pre-deployment checklist

- [ ] No secrets in Git history
- [ ] Authentication and authorization verified for every role
- [ ] Escrow transitions tested, including failure paths
- [ ] Input validation in place
- [ ] File upload validation in place
- [ ] Error messages do not leak internals
- [ ] Synthetic and simulated features clearly labelled
