from typing import List, Tuple
from sqlalchemy.orm import Session
import uuid
from app.models.all_models import Order, OrderLine, Listing, Allocation, Farmer, User
from app.schemas.schemas import AllocationItem, AllocationResponse

class AllocationService:
    @staticmethod
    def allocate_order(db: Session, order_id: str) -> AllocationResponse:
        order = db.query(Order).filter(Order.id == order_id).first()
        if not order:
            raise ValueError(f"Order {order_id} not found")

        order_line = db.query(OrderLine).filter(OrderLine.order_id == order_id).first()
        if not order_line:
            raise ValueError(f"Order line for {order_id} not found")

        target_crop = order_line.crop.lower()
        needed_quantity = order_line.requested_quantity

        # Find active listings of this crop ordered by proximity or creation
        available_listings = (
            db.query(Listing)
            .filter(Listing.crop.ilike(target_crop), Listing.status == "active", Listing.quantity > 0)
            .order_by(Listing.price_per_kg.asc(), Listing.quantity.desc())
            .all()
        )

        allocations: List[AllocationItem] = []
        remaining = needed_quantity
        total_allocated_amount = 0.0

        for listing in available_listings:
            if remaining <= 0:
                break

            farmer = db.query(Farmer).filter(Farmer.id == listing.farmer_id).first()
            user = db.query(User).filter(User.id == farmer.user_id).first() if farmer else None
            farmer_name = user.name if user else f"Farmer {listing.farmer_id}"
            village = farmer.village if farmer else listing.location_name

            take_qty = min(remaining, listing.quantity)
            payout = take_qty * listing.price_per_kg

            # Create DB allocation
            alloc_id = f"alloc-{uuid.uuid4().hex[:8]}"
            db_alloc = Allocation(
                id=alloc_id,
                order_line_id=order_line.id,
                farmer_id=listing.farmer_id,
                listing_id=listing.id,
                allocated_quantity=take_qty,
                agreed_price=listing.price_per_kg,
                payout_amount=payout,
                status="allocated"
            )
            db.add(db_alloc)

            # Update listing quantity
            listing.quantity -= take_qty
            if listing.quantity == 0:
                listing.status = "allocated"

            remaining -= take_qty
            total_allocated_amount += payout

            allocations.append(
                AllocationItem(
                    farmer_id=listing.farmer_id,
                    farmer_name=farmer_name,
                    village=village,
                    listing_id=listing.id,
                    allocated_quantity=take_qty,
                    agreed_price=listing.price_per_kg,
                    payout_amount=payout,
                    status="allocated"
                )
            )

        # Update order status
        order.status = "allocated" if remaining == 0 else "partially_allocated"
        order.total_amount = total_allocated_amount
        db.commit()

        return AllocationResponse(
            order_id=order.id,
            crop=target_crop,
            requested_quantity=needed_quantity,
            allocations=allocations,
            remaining_quantity=max(0.0, remaining),
            escrow_status="held"
        )

allocation_service = AllocationService()
