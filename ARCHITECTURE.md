# KisanConnect — System Architecture

## 1. Access layer

### Farmers
Channels:
- App / PWA
- IVR
- FPO / field agent

### FPOs and field agents
Used for:
- Collection points
- Farmer assistance
- Verification
- Produce intake

### Buyers
Channels:
- Consumer web
- Bulk buyer workflows

## 2. API gateway
Responsibilities:
- Authentication
- Role-based access
- Language routing
- Request routing
- Shared API entry point

## 3. Core engines

### Marketplace
Handles:
- Produce listings
- Orders
- Prices
- Buyer matching inputs

### AI engine
Handles:
- Demand forecasting
- Price intelligence
- Supply-demand matching
- Route optimization
- Voice NLP
- Risk detection

### Logistics
Handles:
- Collection points
- Pooled vehicles
- Route planning
- Pickup and delivery tracking

## 4. Trust and payments
Flow:
1. Farmer listing
2. FPO / collection verification
3. Weight and quality check
4. Buyer order
5. Escrow
6. Pickup confirmation
7. Delivery OTP
8. Buyer confirmation / dispute
9. Farmer payout

## 5. Data and analytics
Primary data:
- PostgreSQL transactional data
- Market history
- Weather data
- Order history
- Listings
- Allocation records
- Payment/payout records

Optional:
- Redis for caching/session or queue-supporting workloads

## 6. External services
- Mandi / government market data
- Maps
- OpenStreetMap
- OSRM
- Weather API
- SMS / IVR
- Bhashini or other voice service
- Payment gateway

## Architecture rule
Everything below the gateway is shared infrastructure. Do not create separate marketplace logic for each access channel.
