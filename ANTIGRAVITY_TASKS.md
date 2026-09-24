# Anti-Gravity Agent Tasks — KisanConnect

Use this file as the implementation checklist for an AI coding agent.

## Phase 1 — Project setup
- [x] Create React + TypeScript + Vite frontend
- [x] Create Python + FastAPI backend
- [x] Add PostgreSQL configuration
- [x] Add environment variable handling
- [x] Add shared API client
- [x] Add base error handling
- [x] Add README setup instructions

## Phase 2 — Authentication and roles
- [x] Implement mock OTP login
- [x] Implement JWT session
- [x] Implement roles: farmer, fpo_agent, buyer, admin
- [x] Protect role-specific routes

## Phase 3 — Farmer access
- [x] Build farmer dashboard
- [x] Build voice listing simulation
- [x] Build Telugu/English/Hindi language switch
- [x] Parse sample voice transcript into structured fields
- [x] Add confirmation screen
- [x] Create listing through API

## Phase 4 — Marketplace
- [x] Create listing CRUD
- [x] Build buyer marketplace
- [x] Add crop/quantity/location filters
- [x] Build buyer order creation

## Phase 5 — Multi-farmer allocation
- [x] Create order lines
- [x] Implement allocation algorithm
- [x] Support one order fulfilled by multiple farmers
- [x] Display allocation breakdown
- [x] Track remaining quantity

## Phase 6 — AI
- [x] Implement mock demand forecast endpoint
- [x] Implement reference price endpoint
- [x] Implement matching endpoint
- [x] Implement risk-check endpoint
- [x] Keep model interfaces replaceable

## Phase 7 — Logistics
- [x] Create collection points
- [x] Add vehicle capacity
- [x] Implement sample OR-Tools route optimization
- [x] Add Leaflet route map
- [x] Implement pickup and delivery status

## Phase 8 — Trust and payments
- [x] Add verification workflow
- [x] Add weight/quality capture
- [x] Implement mock escrow state machine
- [x] Implement delivery OTP
- [x] Implement payout calculation
- [x] Add dispute state

## Phase 9 — Demo polish
- [x] Add loading/error/empty states
- [x] Add sample data seed
- [x] Add responsive layout
- [x] Verify full demo flow from farmer to payout
- [x] Ensure no screen requires real external credentials

## Acceptance criterion
A judge should be able to start with a farmer saying:

"I have 500 kilos of tomatoes"

and follow the system through listing, matching, multi-farmer fulfillment, route planning, delivery confirmation, and payout.
