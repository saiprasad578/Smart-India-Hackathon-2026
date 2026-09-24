from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List, Optional
import uuid
from app.db.session import get_db
from app.models.all_models import Listing, Farmer, User
from app.schemas.schemas import ListingCreate, ListingResponse

router = APIRouter()

@router.get("", response_model=List[ListingResponse])
def get_listings(
    crop: Optional[str] = None,
    status: Optional[str] = "active",
    db: Session = Depends(get_db)
):
    query = db.query(Listing)
    if status:
        query = query.filter(Listing.status == status)
    if crop:
        query = query.filter(Listing.crop.ilike(f"%{crop}%"))

    listings = query.order_by(Listing.created_at.desc()).all()
    results = []
    for l in listings:
        farmer = db.query(Farmer).filter(Farmer.id == l.farmer_id).first()
        user = db.query(User).filter(User.id == farmer.user_id).first() if farmer else None
        results.append(ListingResponse(
            id=l.id,
            farmer_id=l.farmer_id,
            farmer_name=user.name if user else f"Farmer {l.farmer_id}",
            crop=l.crop,
            quantity=l.quantity,
            unit=l.unit,
            price_per_kg=l.price_per_kg,
            available_from=l.available_from,
            lat=l.lat,
            lng=l.lng,
            location_name=l.location_name,
            status=l.status,
            source_channel=l.source_channel,
            quality_grade=l.quality_grade,
            created_at=l.created_at
        ))
    return results

@router.post("", response_model=ListingResponse)
def create_listing(payload: ListingCreate, db: Session = Depends(get_db)):
    """
    POST /api/v1/listings
    Creates produce listing from voice, ivr, or assisted entry.
    """
    listing_id = f"listing-{uuid.uuid4().hex[:6]}"
    new_listing = Listing(
        id=listing_id,
        farmer_id=payload.farmer_id,
        crop=payload.crop.lower(),
        quantity=payload.quantity,
        unit=payload.unit,
        price_per_kg=payload.price_per_kg or 25.0,
        available_from=payload.available_from,
        lat=payload.location.lat,
        lng=payload.location.lng,
        location_name=payload.location.name or "Shamshabad Cluster",
        status="active",
        source_channel=payload.source_channel,
        quality_grade="Grade A"
    )
    db.add(new_listing)
    db.commit()
    db.refresh(new_listing)

    farmer = db.query(Farmer).filter(Farmer.id == new_listing.farmer_id).first()
    user = db.query(User).filter(User.id == farmer.user_id).first() if farmer else None

    return ListingResponse(
        id=new_listing.id,
        farmer_id=new_listing.farmer_id,
        farmer_name=user.name if user else f"Farmer {new_listing.farmer_id}",
        crop=new_listing.crop,
        quantity=new_listing.quantity,
        unit=new_listing.unit,
        price_per_kg=new_listing.price_per_kg,
        available_from=new_listing.available_from,
        lat=new_listing.lat,
        lng=new_listing.lng,
        location_name=new_listing.location_name,
        status=new_listing.status,
        source_channel=new_listing.source_channel,
        quality_grade=new_listing.quality_grade,
        created_at=new_listing.created_at
    )

@router.get("/{listing_id}", response_model=ListingResponse)
def get_listing(listing_id: str, db: Session = Depends(get_db)):
    l = db.query(Listing).filter(Listing.id == listing_id).first()
    if not l:
        raise HTTPException(status_code=404, detail="Listing not found")
    farmer = db.query(Farmer).filter(Farmer.id == l.farmer_id).first()
    user = db.query(User).filter(User.id == farmer.user_id).first() if farmer else None
    return ListingResponse(
        id=l.id,
        farmer_id=l.farmer_id,
        farmer_name=user.name if user else f"Farmer {l.farmer_id}",
        crop=l.crop,
        quantity=l.quantity,
        unit=l.unit,
        price_per_kg=l.price_per_kg,
        available_from=l.available_from,
        lat=l.lat,
        lng=l.lng,
        location_name=l.location_name,
        status=l.status,
        source_channel=l.source_channel,
        quality_grade=l.quality_grade,
        created_at=l.created_at
    )
