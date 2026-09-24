# KisanConnect — Prototype API Contracts

## POST /api/v1/ai/voice/parse

Request:
```json
{
  "language": "te",
  "transcript": "నా దగ్గర 500 కిలోల టమాటాలు ఉన్నాయి."
}
```

Response:
```json
{
  "crop": "tomato",
  "quantity": 500,
  "unit": "kg",
  "availability": null,
  "language": "te",
  "confidence": 0.95
}
```

## POST /api/v1/listings

Request:
```json
{
  "farmer_id": "farmer-001",
  "crop": "tomato",
  "quantity": 500,
  "unit": "kg",
  "available_from": "2026-09-23",
  "location": {
    "lat": 17.385,
    "lng": 78.486
  },
  "source_channel": "voice"
}
```

## POST /api/v1/orders

Request:
```json
{
  "buyer_id": "buyer-001",
  "items": [
    {
      "crop": "tomato",
      "quantity": 1000,
      "unit": "kg"
    }
  ]
}
```

## POST /api/v1/orders/{order_id}/allocate

Response:
```json
{
  "order_id": "order-001",
  "allocations": [
    {
      "farmer_id": "farmer-001",
      "quantity": 300
    },
    {
      "farmer_id": "farmer-002",
      "quantity": 400
    },
    {
      "farmer_id": "farmer-003",
      "quantity": 300
    }
  ],
  "remaining_quantity": 0
}
```

## POST /api/v1/routes/optimize

Request:
```json
{
  "vehicle_capacity": 1500,
  "collection_points": [],
  "buyers": []
}
```

Response:
```json
{
  "route_id": "route-001",
  "stops": [],
  "total_distance_km": 0,
  "total_duration_minutes": 0
}
```

## POST /api/v1/deliveries/{delivery_id}/confirm

Request:
```json
{
  "otp": "123456"
}
```

## POST /api/v1/payments/{order_id}/release

Response:
```json
{
  "order_id": "order-001",
  "status": "released",
  "payouts": [
    {
      "farmer_id": "farmer-001",
      "status": "ready"
    }
  ]
}
```

These contracts are prototype-oriented and can be extended without changing the architecture boundaries.
