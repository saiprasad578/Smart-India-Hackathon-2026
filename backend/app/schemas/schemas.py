from pydantic import BaseModel, Field
from typing import List, Optional, Dict, Any
from datetime import datetime

# --- Auth ---
class OTPRequest(BaseModel):
    phone: str
    role: str = "farmer" # farmer, fpo_agent, buyer, admin
    language: str = "te"
    name: Optional[str] = None
    village: Optional[str] = None
    crop: Optional[str] = None
    land_size: Optional[str] = None

class OTPVerify(BaseModel):
    phone: str
    otp: str
    role: Optional[str] = None
    name: Optional[str] = None
    village: Optional[str] = None
    crop: Optional[str] = None
    land_size: Optional[str] = None

class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user_id: str
    role: str
    name: str
    language: str

# --- AI ---
class VoiceParseRequest(BaseModel):
    language: str = "te"
    transcript: str

class VoiceParseResponse(BaseModel):
    crop: str
    quantity: float
    unit: str = "kg"
    availability: Optional[str] = "Tomorrow"
    language: str
    confidence: float
    detected_intent: str = "create_listing"
    estimated_price_per_kg: float = 26.0

class DemandForecastItem(BaseModel):
    crop: str
    region: str
    projected_demand_kg: float
    trend: str # increasing, stable, decreasing
    confidence: float
    recommended_action: str

class DemandForecastResponse(BaseModel):
    region: str
    forecast_horizon_days: int = 7
    forecasts: List[DemandForecastItem]

class PriceReferenceResponse(BaseModel):
    crop: str
    region: str
    modal_price: float
    min_price: float
    max_price: float
    trend_percentage: float
    updated_at: str

class RiskCheckRequest(BaseModel):
    crop: str
    quantity: float
    price_per_kg: float
    farmer_id: Optional[str] = None

class RiskCheckResponse(BaseModel):
    risk_level: str # normal, review_required, anomaly_flagged
    flags: List[str]
    is_approved: bool

# --- Listings ---
class LocationCoord(BaseModel):
    lat: float
    lng: float
    name: Optional[str] = "Hyderabad Agri Zone"

class ListingCreate(BaseModel):
    farmer_id: str
    crop: str
    quantity: float
    unit: str = "kg"
    price_per_kg: Optional[float] = 25.0
    available_from: str
    location: LocationCoord
    source_channel: str = "voice" # voice, ivr, app, fpo_agent

class ListingResponse(BaseModel):
    id: str
    farmer_id: str
    farmer_name: Optional[str] = None
    crop: str
    quantity: float
    unit: str
    price_per_kg: float
    available_from: str
    lat: float
    lng: float
    location_name: str
    status: str
    source_channel: str
    quality_grade: str
    created_at: datetime

# --- Orders & Allocation ---
class OrderItem(BaseModel):
    crop: str
    quantity: float
    unit: str = "kg"

class OrderCreate(BaseModel):
    buyer_id: str
    items: List[OrderItem]
    delivery_address: str = "Kothapet Fruit & Vegetable Market, Hyderabad"
    delivery_lat: float = 17.3688
    delivery_lng: float = 78.5398

class AllocationItem(BaseModel):
    farmer_id: str
    farmer_name: str
    village: str
    listing_id: str
    allocated_quantity: float
    agreed_price: float
    payout_amount: float
    status: str

class AllocationResponse(BaseModel):
    order_id: str
    crop: str
    requested_quantity: float
    allocations: List[AllocationItem]
    remaining_quantity: float
    escrow_status: str

class OrderResponse(BaseModel):
    id: str
    buyer_id: str
    buyer_name: Optional[str] = None
    status: str
    total_quantity: float
    total_amount: float
    delivery_address: str
    delivery_otp: str
    allocations: List[AllocationItem] = []
    created_at: datetime

# --- Logistics ---
class StopInfo(BaseModel):
    stop_number: int
    type: str # pickup, collection_point, delivery
    location_name: str
    lat: float
    lng: float
    quantity_kg: float
    estimated_arrival: str
    status: str

class RouteOptimizeRequest(BaseModel):
    vehicle_capacity: float = 1500.0
    collection_points: Optional[List[Dict[str, Any]]] = None
    buyers: Optional[List[Dict[str, Any]]] = None

class RouteOptimizeResponse(BaseModel):
    route_id: str
    vehicle_id: str = "KA-04-TRUCK-889"
    vehicle_capacity: float = 1500.0
    loaded_weight_kg: float = 1000.0
    utilization_percent: float = 66.7
    stops: List[StopInfo]
    total_distance_km: float
    total_duration_minutes: float
    co2_saved_kg: float = 24.5

# --- Verification & Trust ---
class VerificationCreate(BaseModel):
    allocation_id: Optional[str] = None
    listing_id: Optional[str] = None
    collection_point_id: str = "CP-SHAMSHABAD-01"
    measured_weight: float
    quality_grade: str = "Grade A"
    verified_by: str = "Agent Ramesh (FPO Officer)"
    notes: Optional[str] = "Batch moisture within limits, ripe firm tomatoes"

class DeliveryConfirmRequest(BaseModel):
    otp: str

class PayoutReleaseResponse(BaseModel):
    order_id: str
    status: str
    transaction_ref: str
    total_released: float
    payouts: List[Dict[str, Any]]
