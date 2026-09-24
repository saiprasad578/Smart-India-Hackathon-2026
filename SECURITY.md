# KisanConnect — Security and Reliability Notes

## Authentication
- OTP-based authentication for farmer/basic-phone access
- JWT for authenticated application sessions
- Role-based authorization

## Roles
- farmer
- fpo_agent
- buyer
- admin
- logistics_agent

## Data protection
- Never hard-code API keys
- Store secrets in environment variables
- Validate all API inputs
- Apply server-side authorization
- Avoid exposing unnecessary farmer personal information

## Audit
Record important changes to:
- Listings
- Allocations
- Verification
- Order status
- Escrow status
- Payout status

## AI safeguards
- AI outputs should be reviewable
- Risk detection should flag for human review
- Voice extraction should allow confirmation
- Price intelligence should be presented as a reference, not as an unconditional guarantee
