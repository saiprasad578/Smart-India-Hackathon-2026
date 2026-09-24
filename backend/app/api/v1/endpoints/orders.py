from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
import uuid
from app.db.session import get_db
from app.models.all_models import Order, OrderLine, Allocation, EscrowPayment, Buyer, User, Farmer
from app.schemas.schemas import OrderCreate, OrderResponse, AllocationResponse, AllocationItem
from app.services.allocation_service import allocation_service

router = APIRouter()

@router.get("", response_model=List[OrderResponse])
def list_orders(db: Session = Depends(get_db)):
    orders = db.query(Order).order_by(Order.created_at.desc()).all()
    results = []
    for o in orders:
        buyer = db.query(Buyer).filter(Buyer.id == o.buyer_id).first()
        user = db.query(User).filter(User.id == buyer.user_id).first() if buyer else None
        
        alloc_items = []
        for line in o.order_lines:
            for a in line.allocations:
                farmer = db.query(Farmer).filter(Farmer.id == a.farmer_id).first()
                f_user = db.query(User).filter(User.id == farmer.user_id).first() if farmer else None
                alloc_items.append(AllocationItem(
                    farmer_id=a.farmer_id,
                    farmer_name=f_user.name if f_user else a.farmer_id,
                    village=farmer.village if farmer else "Village",
                    listing_id=a.listing_id,
                    allocated_quantity=a.allocated_quantity,
                    agreed_price=a.agreed_price,
                    payout_amount=a.payout_amount,
                    status=a.status
                ))

        results.append(OrderResponse(
            id=o.id,
            buyer_id=o.buyer_id,
            buyer_name=buyer.organization_name if buyer else (user.name if user else o.buyer_id),
            status=o.status,
            total_quantity=o.total_quantity,
            total_amount=o.total_amount,
            delivery_address=o.delivery_address,
            delivery_otp=o.delivery_otp,
            allocations=alloc_items,
            created_at=o.created_at
        ))
    return results

@router.post("", response_model=OrderResponse)
def create_order(payload: OrderCreate, db: Session = Depends(get_db)):
    """
    POST /api/v1/orders
    Creates a new bulk order. Sets up escrow lock and order lines.
    """
    total_qty = sum(item.quantity for item in payload.items)
    estimated_amount = total_qty * 25.0 # baseline estimate

    order_id = f"order-{uuid.uuid4().hex[:6]}"
    order = Order(
        id=order_id,
        buyer_id=payload.buyer_id,
        status="created",
        total_quantity=total_qty,
        total_amount=estimated_amount,
        delivery_address=payload.delivery_address,
        delivery_lat=payload.delivery_lat,
        delivery_lng=payload.delivery_lng,
        delivery_otp="482910"
    )
    db.add(order)

    # Add lines
    for item in payload.items:
        line_id = f"line-{uuid.uuid4().hex[:6]}"
        db.add(OrderLine(
            id=line_id,
            order_id=order_id,
            crop=item.crop.lower(),
            requested_quantity=item.quantity,
            unit_price=25.0
        ))

    # Add initial Escrow record
    db.add(EscrowPayment(
        id=f"escrow-{uuid.uuid4().hex[:6]}",
        order_id=order_id,
        total_escrow_amount=estimated_amount,
        status="funded",
        transaction_ref=f"TXN-ESCROW-{uuid.uuid4().hex[:8].upper()}"
    ))

    db.commit()
    db.refresh(order)

    buyer = db.query(Buyer).filter(Buyer.id == order.buyer_id).first()
    return OrderResponse(
        id=order.id,
        buyer_id=order.buyer_id,
        buyer_name=buyer.organization_name if buyer else order.buyer_id,
        status=order.status,
        total_quantity=order.total_quantity,
        total_amount=order.total_amount,
        delivery_address=order.delivery_address,
        delivery_otp=order.delivery_otp,
        allocations=[],
        created_at=order.created_at
    )

@router.post("/{order_id}/allocate", response_model=AllocationResponse)
def allocate_order(order_id: str, db: Session = Depends(get_db)):
    """
    POST /api/v1/orders/{order_id}/allocate
    Splits one buyer order across multiple nearby farmer listings.
    """
    return allocation_service.allocate_order(db=db, order_id=order_id)
