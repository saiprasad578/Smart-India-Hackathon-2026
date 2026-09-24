# KisanConnect — Trust and Payments

## Nine-checkpoint flow

1. Farmer listing
2. FPO / collection verification
3. Weight and quality check
4. Buyer order
5. Escrow
6. Pickup confirmation
7. Delivery OTP
8. Buyer confirmation / dispute
9. Farmer payout

## Verification
Collection-point staff should be able to confirm:
- Produce exists
- Measured weight
- Quality information

## Escrow
Prototype should represent escrow as a state machine even if a real payment gateway is not connected.

States:
- pending
- funded
- held
- delivery_confirmed
- disputed
- released

## Delivery OTP
Buyer receives/has a delivery OTP.
Driver/agent enters the OTP during delivery confirmation.

## Payout
Payout is calculated per farmer allocation, not merely per buyer order.

## Prototype safety
Do not store real payment credentials or secrets in source code.
Use mock payment adapters during the demo unless a real gateway is intentionally configured.
