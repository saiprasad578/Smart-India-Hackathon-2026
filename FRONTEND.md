# KisanConnect — Frontend Specification

## Stack
- React
- TypeScript
- Vite
- Tailwind CSS
- PWA
- i18next
- Leaflet

## Required roles
- Farmer
- FPO / Field Agent
- Buyer
- Admin / reviewer

## Farmer experience

### Smartphone
The farmer can:
1. Select language
2. Speak or enter produce details
3. Review extracted crop, quantity, availability and location
4. Confirm listing
5. View listing status
6. View order / payout status

### Basic phone
Use IVR/SMS-style flow:
1. Language selection
2. Crop input
3. Quantity input
4. Availability
5. Confirmation

### No phone
FPO / field agent enters the listing on behalf of the farmer.

## UI principle
Avoid long forms for farmer-facing workflows.

## Buyer experience
Buyer should be able to:
- Search/filter produce
- View quantity and availability
- Create an order
- See a consolidated order even when multiple farmers fulfill it
- Track delivery
- Confirm delivery using OTP

## FPO experience
FPO/agent should be able to:
- Create assisted farmer listings
- Verify physical produce
- Record weight
- Record quality
- Manage collection points
- Confirm pickup

## Localization
Use i18next. UI strings must not be hard-coded in components.

Initial locales:
- en
- te
- hi

Future locales:
- ta
- kn
- mr

## Maps
Use Leaflet with OpenStreetMap-compatible map data for:
- Farmer/collection location
- Buyer location
- Collection points
- Route visualization
