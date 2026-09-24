# KisanConnect — Backend Specification

## Stack
- Python
- FastAPI
- REST APIs
- PostgreSQL
- Optional Redis
- JWT / OTP authentication

## Service boundaries

### Auth service
Responsibilities:
- OTP login
- JWT creation
- Role-based authorization
- Session management

### Farmer/listing service
Entities:
- Farmer
- Listing
- Crop
- Quantity
- Availability
- Location

### Marketplace service
Responsibilities:
- Buyer orders
- Listing search
- Order creation
- Order status
- Multi-farmer allocation

### AI service
Responsibilities:
- Forecast demand
- Price reference
- Match supply and demand
- Parse voice intent
- Detect unusual patterns

### Logistics service
Responsibilities:
- Collection points
- Pickup planning
- Vehicle pooling
- Route optimization
- Delivery tracking

### Trust/payment service
Responsibilities:
- Verification
- Weight/quality checks
- Escrow state
- Delivery OTP
- Payout state
- Disputes

## Suggested REST endpoints

### Authentication
- POST /auth/request-otp
- POST /auth/verify-otp

### Farmer listings
- POST /listings
- GET /listings/{id}
- GET /farmers/{id}/listings

### Marketplace
- GET /marketplace/listings
- POST /orders
- GET /orders/{id}
- POST /orders/{id}/allocate

### Verification
- POST /verifications
- POST /verifications/{id}/weight
- POST /verifications/{id}/quality

### Logistics
- POST /routes/optimize
- POST /pickups/{id}/confirm
- POST /deliveries/{id}/confirm

### Payments
- POST /payments/escrow
- POST /payments/delivery-otp
- POST /payments/{order_id}/release

### AI
- POST /ai/voice/parse
- POST /ai/demand/forecast
- POST /ai/price/reference
- POST /ai/match
- POST /ai/risk/check

## API rule
All channels must use the same backend business logic after entering through the API gateway.
