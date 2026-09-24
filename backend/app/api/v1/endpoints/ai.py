from fastapi import APIRouter
from app.schemas.schemas import (
    VoiceParseRequest, VoiceParseResponse,
    DemandForecastResponse, PriceReferenceResponse,
    RiskCheckRequest, RiskCheckResponse
)
from app.services.ai_service import ai_service

router = APIRouter()

@router.post("/voice/parse", response_model=VoiceParseResponse)
def parse_voice(payload: VoiceParseRequest):
    """
    POST /api/v1/ai/voice/parse
    Converts regional transcript into structured crop, quantity, unit, availability.
    """
    return ai_service.parse_voice_transcript(language=payload.language, transcript=payload.transcript)

@router.get("/demand/forecast", response_model=DemandForecastResponse)
def get_demand_forecast(region: str = "Telangana - Shamshabad"):
    return ai_service.get_demand_forecast(region=region)

@router.get("/price/reference", response_model=PriceReferenceResponse)
def get_price_reference(crop: str = "tomato", region: str = "Shamshabad Mandi"):
    return ai_service.get_price_reference(crop=crop, region=region)

@router.post("/risk/check", response_model=RiskCheckResponse)
def check_risk(payload: RiskCheckRequest):
    return ai_service.check_risk(crop=payload.crop, quantity=payload.quantity, price_per_kg=payload.price_per_kg)
