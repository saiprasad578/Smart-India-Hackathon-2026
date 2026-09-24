import uuid
from datetime import datetime
from sqlalchemy.orm import Session
from app.models.all_models import Order, Allocation, EscrowPayment, AuditLog, Farmer, User
from app.schemas.schemas import PayoutReleaseResponse

class EscrowService:
    @staticmethod
    def get_order_timeline(db: Session, order_id: str):
        order = db.query(Order).filter(Order.id == order_id).first()
        if not order:
            return []

        allocations = db.query(Allocation).join(Order).filter(Order.id == order_id).all()
        is_verified = any(a.verification is not None for a in allocations) or order.status in ["verified", "in_transit", "delivered", "completed"]
        is_picked_up = order.status in ["picked_up", "in_transit", "delivered", "completed"]
        is_delivered = order.status in ["delivered", "completed"]
        is_payout_done = order.status == "completed"

        timeline = [
            {"step": 1, "title": "Farmer listing", "status": "completed", "time": "06:00 AM", "desc": "Produce listed via Telugu voice / FPO assisted entry"},
            {"step": 2, "title": "FPO Verification", "status": "completed" if is_verified else "active", "time": "07:30 AM", "desc": "Collection point confirmed physical produce existence"},
            {"step": 3, "title": "Weight & Quality Check", "status": "completed" if is_verified else "pending", "time": "08:15 AM", "desc": "Digital scale tare verified, Grade A assigned"},
            {"step": 4, "title": "Buyer Order Created", "status": "completed", "time": "08:30 AM", "desc": f"Order #{order_id} placed for {order.total_quantity} kg"},
            {"step": 5, "title": "Escrow Funded", "status": "completed", "time": "08:35 AM", "desc": f"₹{order.total_amount:,.2f} locked in RBI-compliant escrow account"},
            {"step": 6, "title": "Pooled Pickup Confirmed", "status": "completed" if is_picked_up else "pending", "time": "09:00 AM", "desc": "Vehicle loaded and sealed with geo-tagging"},
            {"step": 7, "title": "Delivery OTP Verification", "status": "completed" if is_delivered else "pending", "time": "10:15 AM", "desc": f"OTP verification code: {order.delivery_otp}"},
            {"step": 8, "title": "Buyer Inspection & Confirmation", "status": "completed" if is_delivered else "pending", "time": "10:20 AM", "desc": "Buyer inspected lot upon arrival, no disputes raised"},
            {"step": 9, "title": "Per-Farmer Payout Released", "status": "completed" if is_payout_done else "pending", "time": "10:25 AM", "desc": "Direct instant bank credit/UPI to each contributing farmer"}
        ]
        return timeline

    @staticmethod
    def confirm_delivery_otp(db: Session, order_id: str, otp: str) -> bool:
        order = db.query(Order).filter(Order.id == order_id).first()
        if not order:
            raise ValueError("Order not found")
        if order.delivery_otp != otp and otp != "123456": # allow demo otp 123456 as per API_CONTRACTS.md
            raise ValueError("Invalid Delivery OTP")

        order.status = "delivered"
        db.add(AuditLog(
            id=f"audit-{uuid.uuid4().hex[:6]}",
            actor="buyer",
            action="confirm_delivery_otp",
            previous_status="in_transit",
            new_status="delivered",
            reference_id=order_id
        ))
        db.commit()
        return True

    @staticmethod
    def release_escrow_payout(db: Session, order_id: str) -> PayoutReleaseResponse:
        order = db.query(Order).filter(Order.id == order_id).first()
        if not order:
            raise ValueError("Order not found")

        # Fetch allocations for this order
        allocations = (
            db.query(Allocation)
            .filter(Allocation.order_line.has(order_id=order_id))
            .all()
        )

        payout_details = []
        total_payout = 0.0

        for alloc in allocations:
            alloc.status = "paid"
            farmer = db.query(Farmer).filter(Farmer.id == alloc.farmer_id).first()
            user = db.query(User).filter(User.id == farmer.user_id).first() if farmer else None
            farmer_name = user.name if user else f"Farmer {alloc.farmer_id}"

            payout_details.append({
                "farmer_id": alloc.farmer_id,
                "farmer_name": farmer_name,
                "village": farmer.village if farmer else "Shamshabad",
                "allocated_quantity_kg": alloc.allocated_quantity,
                "rate_per_kg": alloc.agreed_price,
                "amount": alloc.payout_amount,
                "status": "credited",
                "payout_channel": "UPI / Direct Bank Transfer",
                "utr_ref": f"UTR-SBIN{uuid.uuid4().hex[:10].upper()}"
            })
            total_payout += alloc.payout_amount

        order.status = "completed"
        db.add(AuditLog(
            id=f"audit-{uuid.uuid4().hex[:6]}",
            actor="escrow_system",
            action="release_payout",
            previous_status="delivered",
            new_status="completed",
            reference_id=order_id
        ))
        db.commit()

        return PayoutReleaseResponse(
            order_id=order_id,
            status="released",
            transaction_ref=f"TXN-ESCROW-{uuid.uuid4().hex[:8].upper()}",
            total_released=total_payout,
            payouts=payout_details
        )

escrow_service = EscrowService()
