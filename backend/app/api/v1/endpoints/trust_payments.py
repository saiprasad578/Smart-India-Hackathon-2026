from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
import uuid
from app.db.session import get_db
from app.models.all_models import VerificationRecord, Order, Allocation
from app.schemas.schemas import VerificationCreate, DeliveryConfirmRequest, PayoutReleaseResponse
from app.services.escrow_service import escrow_service

router = APIRouter()

@router.post("/verifications")
def record_verification(payload: VerificationCreate, db: Session = Depends(get_db)):
    """
    POST /api/v1/verifications
    FPO Field Agent verifies physical produce, digital scale weight and quality grade.
    """
    v_id = f"verif-{uuid.uuid4().hex[:6]}"
    record = VerificationRecord(
        id=v_id,
        allocation_id=payload.allocation_id,
        listing_id=payload.listing_id,
        collection_point_id=payload.collection_point_id,
        measured_weight=payload.measured_weight,
        quality_grade=payload.quality_grade,
        verified_by=payload.verified_by,
        notes=payload.notes
    )
    db.add(record)
    
    if payload.allocation_id:
        alloc = db.query(Allocation).filter(Allocation.id == payload.allocation_id).first()
        if alloc:
            alloc.status = "verified"

    db.commit()
    return {
        "status": "success",
        "verification_id": v_id,
        "message": f"Produce verified at {payload.collection_point_id}: {payload.measured_weight} kg, Grade: {payload.quality_grade}"
    }

@router.post("/deliveries/{order_id}/confirm")
def confirm_delivery(order_id: str, payload: DeliveryConfirmRequest, db: Session = Depends(get_db)):
    """
    POST /api/v1/deliveries/{order_id}/confirm
    Driver/Buyer enters Delivery OTP to confirm receipt.
    """
    try:
        escrow_service.confirm_delivery_otp(db=db, order_id=order_id, otp=payload.otp)
        return {"status": "confirmed", "order_id": order_id, "message": "Delivery successfully verified via OTP"}
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.post("/payments/{order_id}/release", response_model=PayoutReleaseResponse)
def release_payment(order_id: str, db: Session = Depends(get_db)):
    """
    POST /api/v1/payments/{order_id}/release
    Releases escrow funds directly into individual contributing farmers' accounts.
    """
    try:
        return escrow_service.release_escrow_payout(db=db, order_id=order_id)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.get("/trust/timeline/{order_id}")
def get_timeline(order_id: str, db: Session = Depends(get_db)):
    return escrow_service.get_order_timeline(db=db, order_id=order_id)
