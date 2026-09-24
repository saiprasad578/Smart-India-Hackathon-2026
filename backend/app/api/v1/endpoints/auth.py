from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.models.all_models import User, Farmer, Buyer
from app.schemas.schemas import OTPRequest, OTPVerify, TokenResponse
from app.core.security import create_access_token

router = APIRouter()

MOCK_USERS = {
    "9876543210": {"name": "Farmer Venkataiah", "role": "farmer", "language": "te", "id": "farmer-001"},
    "9876543211": {"name": "Farmer Ramulu", "role": "farmer", "language": "te", "id": "farmer-002"},
    "9876543212": {"name": "Farmer Lakshmi", "role": "farmer", "language": "te", "id": "farmer-003"},
    "9876543220": {"name": "Agent Ramesh (FPO Officer)", "role": "fpo_agent", "language": "te", "id": "agent-001"},
    "9876543230": {"name": "Siddharth (FreshBasket Procurements)", "role": "buyer", "language": "en", "id": "buyer-001"},
    "9876543240": {"name": "Admin / Reviewer", "role": "admin", "language": "en", "id": "admin-001"}
}

@router.post("/request-otp")
def request_otp(payload: OTPRequest):
    # Generates deterministic demo OTP 123456 for seamless testing
    return {
        "message": f"OTP sent to {payload.phone}",
        "otp": "123456",
        "demo_hint": "Use code 123456 to login"
    }

@router.post("/verify-otp", response_model=TokenResponse)
def verify_otp(payload: OTPVerify, db: Session = Depends(get_db)):
    if payload.otp != "123456":
        raise HTTPException(status_code=400, detail="Invalid OTP code. Please enter 123456.")

    user_meta = MOCK_USERS.get(payload.phone, {
        "name": payload.name or f"Farmer {payload.phone[-4:]}",
        "role": "farmer",
        "language": "te",
        "id": f"farmer-{payload.phone[-4:]}"
    })

    # If user provided a specific custom name, respect it
    chosen_name = payload.name if payload.name and payload.name.strip() else user_meta["name"]
    chosen_role = payload.role if payload.role and payload.role.strip() else user_meta.get("role", "farmer")
    chosen_village = payload.village if payload.village and payload.village.strip() else "Shamshabad Village, Telangana"

    # Ensure in DB
    db_user = db.query(User).filter(User.phone == payload.phone).first()
    if not db_user:
        db_user = User(
            id=f"user-{payload.phone[-4:]}",
            phone=payload.phone,
            name=chosen_name,
            role=chosen_role,
            language=user_meta["language"]
        )
        db.add(db_user)
        db.commit()
    else:
        if payload.name and payload.name.strip():
            db_user.name = payload.name.strip()
        if payload.role and payload.role.strip():
            db_user.role = chosen_role
            db.commit()

    # Also update or create Farmer profile
    farmer = db.query(Farmer).filter(Farmer.user_id == db_user.id).first()
    if not farmer and db_user.role == "farmer":
        farmer = Farmer(
            id=f"farmer-{payload.phone[-4:]}",
            user_id=db_user.id,
            village=chosen_village,
            lat=17.2510,
            lng=78.4320,
            fpo_id="FPO-SHAMSHABAD-01"
        )
        db.add(farmer)
        db.commit()
    elif farmer and payload.village and payload.village.strip():
        farmer.village = chosen_village
        db.commit()

    token = create_access_token(subject=db_user.id, role=db_user.role)

    return TokenResponse(
        access_token=token,
        token_type="bearer",
        user_id=db_user.id,
        role=db_user.role,
        name=db_user.name,
        language=db_user.language
    )
