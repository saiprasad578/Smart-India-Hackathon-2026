# KisanConnect — SIH Prototype Build Plan

## Objective
Build one complete end-to-end path instead of implementing every architecture box fully.

## Demo flow
1. Farmer
2. Telugu voice / FPO entry
3. Produce listing
4. AI demand prediction
5. Buyer match
6. Multi-farmer allocation
7. Route optimization
8. Delivery
9. Farmer payout

## Demo data
Use sample:
- Farmers: 3
- Buyers: 2–3
- Crop: tomato
- Example total order: 1,000 kg
- Farmer A: 300 kg
- Farmer B: 400 kg
- Farmer C: 300 kg

## Recommended screens

### 1. Landing / role selection
Buttons:
- Farmer
- FPO Agent
- Buyer

### 2. Farmer voice listing
Show:
- Record / simulate voice
- Recognized language
- Extracted crop
- Quantity
- Availability
- Confirm button

### 3. Marketplace
Show:
- Listings
- Reference price
- Quantity
- Location

### 4. Buyer order
Show:
- Requested crop
- Quantity
- Delivery location
- Create order

### 5. Allocation
Show:
- Order quantity
- Farmer allocations
- Remaining quantity

### 6. Logistics
Show:
- Collection point
- Pooled vehicle
- Optimized route
- Buyer stops

### 7. Trust and delivery
Show:
- Verification
- Weight
- Quality
- Escrow
- Delivery OTP
- Confirmation

### 8. Payout
Show:
- Farmer allocation
- Amount
- Payout status

## Demo principle
Every screen should visibly connect to the next screen. Avoid isolated mock dashboards.
