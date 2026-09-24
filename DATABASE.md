# KisanConnect — Database Specification

## Database
PostgreSQL

## Core entities

### users
- id
- role
- phone
- name
- language
- created_at

### farmers
- id
- user_id
- village
- location
- FPO_id

### crops
- id
- name
- local_names

### listings
- id
- farmer_id
- crop_id
- quantity
- unit
- available_from
- location
- status
- source_channel
- created_at

### buyers
- id
- user_id
- buyer_type
- organization_name

### orders
- id
- buyer_id
- status
- total_quantity
- total_amount
- delivery_location
- created_at

### order_lines
- id
- order_id
- crop_id
- requested_quantity
- unit_price

### allocations
- id
- order_line_id
- farmer_id
- listing_id
- allocated_quantity
- agreed_price
- status

### verification
- id
- allocation_id / listing_id
- collection_point_id
- measured_weight
- quality_grade
- verified_by
- verified_at

### payments
- id
- order_id
- allocation_id
- escrow_amount
- payout_amount
- status
- transaction_reference

### delivery
- id
- order_id
- vehicle_id
- route_id
- pickup_status
- delivery_status
- delivery_otp
- delivered_at

## Critical modeling rule
An order does NOT belong to one farmer.

Example:
A buyer requests 1,000 kg of tomatoes:
- Farmer A → 300 kg
- Farmer B → 400 kg
- Farmer C → 300 kg

The buyer sees one order. Each farmer has a separate allocation and payout.

## Auditability
Important state changes should store:
- actor
- timestamp
- previous status
- new status
- relevant reference ID
