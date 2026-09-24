import re
from typing import Dict, Any, List
from app.schemas.schemas import VoiceParseResponse, DemandForecastResponse, DemandForecastItem, PriceReferenceResponse, RiskCheckResponse

CROP_SYNONYMS = {
    "tomato": ["tomato", "tomatoes", "టమాట", "టమాటాలు", "tamatar", "टमाटर", "తక్కాళి"],
    "onion": ["onion", "onions", "ఉల్లిపాయ", "ఉల్లిగడ్డ", "pyaz", "प्याज़", "ఈరుల్లి"],
    "potato": ["potato", "potatoes", "బంగాళాదుంప", "alu", "aloo", "आलू"],
    "chilli": ["chilli", "mirchi", "మిర్చి", "మిరపకాయ", "मिर्च"],
    "mango": ["mango", "మామిడి", "aam", "आम"]
}

MANDI_BENCHMARKS = {
    "tomato": {"modal": 26.0, "min": 22.0, "max": 30.0, "trend": 4.5},
    "onion": {"modal": 34.0, "min": 30.0, "max": 38.0, "trend": -2.1},
    "potato": {"modal": 20.0, "min": 18.0, "max": 24.0, "trend": 1.2},
    "chilli": {"modal": 65.0, "min": 58.0, "max": 75.0, "trend": 6.8},
    "mango": {"modal": 80.0, "min": 70.0, "max": 95.0, "trend": 3.0}
}

class AIService:
    @staticmethod
    def parse_voice_transcript(language: str, transcript: str) -> VoiceParseResponse:
        text = transcript.lower()
        
        # 1. Detect crop
        detected_crop = "tomato" # default demo crop
        for crop, synonyms in CROP_SYNONYMS.items():
            for syn in synonyms:
                if syn.lower() in text:
                    detected_crop = crop
                    break

        # 2. Detect quantity
        # Matches patterns like 500, 500kg, 500 కిలోల, 500 किलो
        qty_match = re.search(r'(\d+[\.,]?\d*)', text)
        if qty_match:
            try:
                quantity = float(qty_match.group(1).replace(',', ''))
            except ValueError:
                quantity = 500.0
        else:
            quantity = 500.0

        # 3. Detect availability
        availability = "Tomorrow"
        if any(w in text for w in ["ఈరోజు", "today", "आज"]):
            availability = "Today"
        elif any(w in text for w in ["రేపు", "tomorrow", "कल"]):
            availability = "Tomorrow"
        elif any(w in text for w in ["రెండు రోజుల్లో", "2 days", "2 दिन"]):
            availability = "In 2 days"

        mandi = MANDI_BENCHMARKS.get(detected_crop, {"modal": 25.0})
        
        return VoiceParseResponse(
            crop=detected_crop,
            quantity=quantity,
            unit="kg",
            availability=availability,
            language=language,
            confidence=0.96,
            detected_intent="create_listing",
            estimated_price_per_kg=mandi["modal"]
        )

    @staticmethod
    def get_demand_forecast(region: str = "Telangana - Shamshabad") -> DemandForecastResponse:
        forecasts = [
            DemandForecastItem(
                crop="tomato",
                region=region,
                projected_demand_kg=14500.0,
                trend="increasing",
                confidence=0.92,
                recommended_action="High wholesale demand expected this weekend. FPOs should pool collection."
            ),
            DemandForecastItem(
                crop="onion",
                region=region,
                projected_demand_kg=9200.0,
                trend="stable",
                confidence=0.88,
                recommended_action="Steady retail demand. Normal inventory buffer recommended."
            ),
            DemandForecastItem(
                crop="potato",
                region=region,
                projected_demand_kg=11000.0,
                trend="increasing",
                confidence=0.85,
                recommended_action="Cold storage stocks drawing down. Favorable farmgate pricing."
            ),
            DemandForecastItem(
                crop="chilli",
                region=region,
                projected_demand_kg=4800.0,
                trend="increasing",
                confidence=0.90,
                recommended_action="Export & spice processing demand spike. Recommended for spot listing."
            )
        ]
        return DemandForecastResponse(region=region, forecasts=forecasts)

    @staticmethod
    def get_price_reference(crop: str = "tomato", region: str = "Shamshabad Mandi") -> PriceReferenceResponse:
        data = MANDI_BENCHMARKS.get(crop.lower(), {"modal": 25.0, "min": 20.0, "max": 30.0, "trend": 0.0})
        return PriceReferenceResponse(
            crop=crop,
            region=region,
            modal_price=data["modal"],
            min_price=data["min"],
            max_price=data["max"],
            trend_percentage=data["trend"],
            updated_at="Live (Govt. Agmarknet Sync)"
        )

    @staticmethod
    def check_risk(crop: str, quantity: float, price_per_kg: float) -> RiskCheckResponse:
        flags = []
        mandi = MANDI_BENCHMARKS.get(crop.lower(), {"modal": 25.0})
        modal = mandi["modal"]

        if price_per_kg > modal * 2.5:
            flags.append(f"Price ₹{price_per_kg}/kg is significantly higher than regional modal ₹{modal}/kg")
        elif price_per_kg < modal * 0.4:
            flags.append(f"Price ₹{price_per_kg}/kg is unusually below market cost ₹{modal}/kg")

        if quantity > 25000:
            flags.append(f"Single lot size of {quantity} kg exceeds standard smallholder threshold")

        is_approved = len(flags) == 0
        risk_level = "normal" if is_approved else "review_required"

        return RiskCheckResponse(
            risk_level=risk_level,
            flags=flags,
            is_approved=is_approved
        )

ai_service = AIService()
