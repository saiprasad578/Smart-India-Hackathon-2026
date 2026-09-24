from sqlalchemy.orm import Session
from app.db.session import SessionLocal, Base, engine
from app.models.all_models import User, Farmer, Buyer, Crop, Listing, Order, OrderLine, Allocation, EscrowPayment, AuditLog
import uuid

def init_db(db: Session):
    Base.metadata.create_all(bind=engine)

    # Check if already seeded
    if db.query(User).first():
        return

    print("Seeding initial demo data for KisanConnect...")

    # 1. Crops
    crops_data = [
        {"id": "crop-tomato", "name": "tomato", "local_names": {"te": "టమాట", "hi": "टमाटर"}, "benchmark_price_per_kg": 26.0},
        {"id": "crop-onion", "name": "onion", "local_names": {"te": "ఉల్లిపాయ", "hi": "प्याज़"}, "benchmark_price_per_kg": 34.0},
        {"id": "crop-potato", "name": "potato", "local_names": {"te": "బంగాళాదుంప", "hi": "आलू"}, "benchmark_price_per_kg": 20.0},
        {"id": "crop-chilli", "name": "chilli", "local_names": {"te": "మిర్చి", "hi": "मिर्च"}, "benchmark_price_per_kg": 65.0}
    ]
    for c in crops_data:
        db.add(Crop(**c))

    # 2. Users & Farmers
    farmers_info = [
        {
            "user_id": "user-farmer-001",
            "farmer_id": "farmer-001",
            "name": "Farmer Venkataiah",
            "phone": "9876543210",
            "village": "Shamshabad Village",
            "lat": 17.2510,
            "lng": 78.4320,
            "crop": "tomato",
            "quantity": 300.0,
            "price_per_kg": 26.0,
            "channel": "voice"
        },
        {
            "user_id": "user-farmer-002",
            "farmer_id": "farmer-002",
            "name": "Farmer Ramulu",
            "phone": "9876543211",
            "village": "Chevella Hamlet",
            "lat": 17.3120,
            "lng": 78.1340,
            "crop": "tomato",
            "quantity": 400.0,
            "price_per_kg": 25.0,
            "channel": "ivr"
        },
        {
            "user_id": "user-farmer-003",
            "farmer_id": "farmer-003",
            "name": "Farmer Lakshmi",
            "phone": "9876543212",
            "village": "Maheshwaram Farm",
            "lat": 17.1350,
            "lng": 78.4300,
            "crop": "tomato",
            "quantity": 300.0,
            "price_per_kg": 26.0,
            "channel": "fpo_agent"
        }
    ]

    for f in farmers_info:
        user = User(
            id=f["user_id"],
            role="farmer",
            phone=f["phone"],
            name=f["name"],
            language="te"
        )
        db.add(user)
        farmer = Farmer(
            id=f["farmer_id"],
            user_id=f["user_id"],
            village=f["village"],
            lat=f["lat"],
            lng=f["lng"],
            fpo_id="FPO-SHAMSHABAD-01"
        )
        db.add(farmer)
        listing = Listing(
            id=f"listing-{f['farmer_id']}",
            farmer_id=f["farmer_id"],
            crop=f["crop"],
            quantity=f["quantity"],
            unit="kg",
            price_per_kg=f["price_per_kg"],
            available_from="Tomorrow",
            lat=f["lat"],
            lng=f["lng"],
            location_name=f["village"],
            status="active",
            source_channel=f["channel"],
            quality_grade="Grade A"
        )
        db.add(listing)

    # 3. FPO Officer
    fpo_user = User(
        id="user-fpo-001",
        role="fpo_agent",
        phone="9876543220",
        name="Agent Ramesh (FPO Officer)",
        language="te"
    )
    db.add(fpo_user)

    # 4. Buyer
    buyer_user = User(
        id="user-buyer-001",
        role="buyer",
        phone="9876543230",
        name="Siddharth (Procurements)",
        language="en"
    )
    db.add(buyer_user)
    buyer = Buyer(
        id="buyer-001",
        user_id="user-buyer-001",
        buyer_type="bulk",
        organization_name="FreshBasket Wholesale & Retail Ltd"
    )
    db.add(buyer)

    # 5. Pre-create Demo Order #order-001 with 1,000 kg tomato demand to illustrate the allocation immediately
    order_id = "order-001"
    demo_order = Order(
        id=order_id,
        buyer_id="buyer-001",
        status="in_transit",
        total_quantity=1000.0,
        total_amount=25600.0,
        delivery_address="Kothapet Fruit & Vegetable Wholesale Market, Hyderabad",
        delivery_lat=17.3688,
        delivery_lng=78.5398,
        delivery_otp="482910"
    )
    db.add(demo_order)

    order_line = OrderLine(
        id="line-001",
        order_id=order_id,
        crop="tomato",
        requested_quantity=1000.0,
        unit_price=25.6
    )
    db.add(order_line)

    # Multi-farmer allocations: Farmer A (300kg), Farmer B (400kg), Farmer C (300kg)
    alloc_configs = [
        {"id": "alloc-001", "farmer_id": "farmer-001", "listing_id": "listing-farmer-001", "qty": 300.0, "rate": 26.0, "payout": 7800.0},
        {"id": "alloc-002", "farmer_id": "farmer-002", "listing_id": "listing-farmer-002", "qty": 400.0, "rate": 25.0, "payout": 10000.0},
        {"id": "alloc-003", "farmer_id": "farmer-003", "listing_id": "listing-farmer-003", "qty": 300.0, "rate": 26.0, "payout": 7800.0}
    ]
    for ac in alloc_configs:
        db.add(Allocation(
            id=ac["id"],
            order_line_id="line-001",
            farmer_id=ac["farmer_id"],
            listing_id=ac["listing_id"],
            allocated_quantity=ac["qty"],
            agreed_price=ac["rate"],
            payout_amount=ac["payout"],
            status="in_transit"
        ))

    # Escrow payment locked
    db.add(EscrowPayment(
        id="escrow-001",
        order_id=order_id,
        total_escrow_amount=25600.0,
        status="held",
        transaction_ref="TXN-ESCROW-HYD8841"
    ))

    db.commit()
    print("Demo data seeded successfully!")

if __name__ == "__main__":
    db = SessionLocal()
    init_db(db)
    db.close()
