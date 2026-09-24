# KisanConnect — AI Specification

The architecture defines six AI modules.

## 1. Demand forecasting
### Input
- Historical orders
- Crop
- Region
- Seasonality
- Available market history

### Output
Forecasted demand by crop and region.

For the prototype, use a simple explainable forecasting approach rather than an unnecessarily complex model.

## 2. Price intelligence
### Input
- Mandi/government market data
- Crop
- Region
- Recent observations

### Output
Reference price range.

Purpose:
Give farmers a reference instead of requiring them to negotiate without market context.

## 3. Supply-demand matching
### Input
- Farmer listings
- Buyer requirements
- Quantity
- Crop
- Location
- Availability

### Output
Ranked feasible allocations.

One buyer order may be split across multiple farmers.

## 4. Route optimization
### Input
- Collection points
- Pickup quantities
- Vehicle capacity
- Delivery locations
- Pickup/delivery windows

### Technology
OR-Tools plus map/routing data such as OSRM.

### Output
A pooled route with ordered stops.

## 5. Voice NLP
### Input
Regional-language speech.

### Pipeline
Speech → speech-to-text → intent extraction → structured fields → confirmation.

Example:
Telugu:
"నా దగ్గర 500 కిలోల టమాటాలు ఉన్నాయి."

Structured result:
- crop: tomato
- quantity: 500 kg
- availability: inferred/confirmed by workflow
- language: Telugu

Always require confirmation before creating a final listing when extracted values are uncertain.

## 6. Risk detection
Flags unusual:
- Price patterns
- Quantity patterns
- Listing/order combinations

Output:
- normal
- review_required

Risk detection should assist human review, not automatically accuse a user of wrongdoing.

## Prototype strategy
Implement deterministic/mock models first, then replace individual modules with trained or external models without changing the API contract.
