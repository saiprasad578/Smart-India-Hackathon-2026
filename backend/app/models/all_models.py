from sqlalchemy import Column, Integer, String, Float, DateTime, ForeignKey, Text, JSON, Boolean
from sqlalchemy.orm import relationship
from datetime import datetime
from app.db.session import Base

class User(Base):
    __tablename__ = "users"

    id = Column(String, primary_key=True, index=True)
    role = Column(String, nullable=False) # farmer, fpo_agent, buyer, admin
    phone = Column(String, unique=True, index=True, nullable=False)
    name = Column(String, nullable=False)
    language = Column(String, default="te") # te, hi, en
    created_at = Column(DateTime, default=datetime.utcnow)

    farmer_profile = relationship("Farmer", back_populates="user", uselist=False)
    buyer_profile = relationship("Buyer", back_populates="user", uselist=False)

class Farmer(Base):
    __tablename__ = "farmers"

    id = Column(String, primary_key=True, index=True)
    user_id = Column(String, ForeignKey("users.id"), nullable=False)
    village = Column(String, nullable=False)
    lat = Column(Float, nullable=False)
    lng = Column(Float, nullable=False)
    fpo_id = Column(String, nullable=True)

    user = relationship("User", back_populates="farmer_profile")
    listings = relationship("Listing", back_populates="farmer")
    allocations = relationship("Allocation", back_populates="farmer")

class Buyer(Base):
    __tablename__ = "buyers"

    id = Column(String, primary_key=True, index=True)
    user_id = Column(String, ForeignKey("users.id"), nullable=False)
    buyer_type = Column(String, default="bulk") # bulk, consumer, processor
    organization_name = Column(String, nullable=False)

    user = relationship("User", back_populates="buyer_profile")
    orders = relationship("Order", back_populates="buyer")

class Crop(Base):
    __tablename__ = "crops"

    id = Column(String, primary_key=True, index=True)
    name = Column(String, unique=True, nullable=False)
    local_names = Column(JSON, default={}) # {"te": "టమాట", "hi": "टमाटर"}
    category = Column(String, default="vegetable")
    benchmark_price_per_kg = Column(Float, default=25.0)

class Listing(Base):
    __tablename__ = "listings"

    id = Column(String, primary_key=True, index=True)
    farmer_id = Column(String, ForeignKey("farmers.id"), nullable=False)
    crop = Column(String, nullable=False) # e.g. tomato
    quantity = Column(Float, nullable=False)
    unit = Column(String, default="kg")
    price_per_kg = Column(Float, nullable=False)
    available_from = Column(String, nullable=False)
    lat = Column(Float, nullable=False)
    lng = Column(Float, nullable=False)
    location_name = Column(String, nullable=False)
    status = Column(String, default="active") # active, allocated, fulfilled, cancelled
    source_channel = Column(String, default="voice") # voice, ivr, app, fpo_agent
    quality_grade = Column(String, default="Grade A")
    created_at = Column(DateTime, default=datetime.utcnow)

    farmer = relationship("Farmer", back_populates="listings")
    allocations = relationship("Allocation", back_populates="listing")

class Order(Base):
    __tablename__ = "orders"

    id = Column(String, primary_key=True, index=True)
    buyer_id = Column(String, ForeignKey("buyers.id"), nullable=False)
    status = Column(String, default="created") # created, escrow_funded, verified, picked_up, in_transit, delivered, completed, disputed
    total_quantity = Column(Float, nullable=False)
    total_amount = Column(Float, nullable=False)
    delivery_address = Column(String, nullable=False)
    delivery_lat = Column(Float, nullable=False)
    delivery_lng = Column(Float, nullable=False)
    delivery_otp = Column(String, default="482910")
    created_at = Column(DateTime, default=datetime.utcnow)

    buyer = relationship("Buyer", back_populates="orders")
    order_lines = relationship("OrderLine", back_populates="order", cascade="all, delete-orphan")
    delivery_record = relationship("DeliveryRecord", back_populates="order", uselist=False)

class OrderLine(Base):
    __tablename__ = "order_lines"

    id = Column(String, primary_key=True, index=True)
    order_id = Column(String, ForeignKey("orders.id"), nullable=False)
    crop = Column(String, nullable=False)
    requested_quantity = Column(Float, nullable=False)
    unit_price = Column(Float, nullable=False)

    order = relationship("Order", back_populates="order_lines")
    allocations = relationship("Allocation", back_populates="order_line", cascade="all, delete-orphan")

class Allocation(Base):
    __tablename__ = "allocations"

    id = Column(String, primary_key=True, index=True)
    order_line_id = Column(String, ForeignKey("order_lines.id"), nullable=False)
    farmer_id = Column(String, ForeignKey("farmers.id"), nullable=False)
    listing_id = Column(String, ForeignKey("listings.id"), nullable=False)
    allocated_quantity = Column(Float, nullable=False)
    agreed_price = Column(Float, nullable=False)
    payout_amount = Column(Float, nullable=False)
    status = Column(String, default="allocated") # allocated, verified, in_transit, delivered, paid, disputed

    order_line = relationship("OrderLine", back_populates="allocations")
    farmer = relationship("Farmer", back_populates="allocations")
    listing = relationship("Listing", back_populates="allocations")
    verification = relationship("VerificationRecord", back_populates="allocation", uselist=False)

class VerificationRecord(Base):
    __tablename__ = "verifications"

    id = Column(String, primary_key=True, index=True)
    allocation_id = Column(String, ForeignKey("allocations.id"), nullable=True)
    listing_id = Column(String, ForeignKey("listings.id"), nullable=True)
    collection_point_id = Column(String, nullable=False)
    measured_weight = Column(Float, nullable=False)
    quality_grade = Column(String, default="Grade A") # Grade A, Grade B, Grade C
    verified_by = Column(String, nullable=False) # Agent name
    notes = Column(String, nullable=True)
    verified_at = Column(DateTime, default=datetime.utcnow)

    allocation = relationship("Allocation", back_populates="verification")

class DeliveryRecord(Base):
    __tablename__ = "deliveries"

    id = Column(String, primary_key=True, index=True)
    order_id = Column(String, ForeignKey("orders.id"), nullable=False)
    vehicle_id = Column(String, nullable=False)
    route_id = Column(String, nullable=False)
    pickup_status = Column(String, default="pending") # pending, picked_up
    delivery_status = Column(String, default="pending") # pending, in_transit, delivered
    delivery_otp = Column(String, nullable=False)
    delivered_at = Column(DateTime, nullable=True)

    order = relationship("Order", back_populates="delivery_record")

class EscrowPayment(Base):
    __tablename__ = "escrow_payments"

    id = Column(String, primary_key=True, index=True)
    order_id = Column(String, ForeignKey("orders.id"), nullable=False)
    total_escrow_amount = Column(Float, nullable=False)
    status = Column(String, default="funded") # pending, funded, held, delivery_confirmed, released, disputed
    transaction_ref = Column(String, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)
    released_at = Column(DateTime, nullable=True)

class AuditLog(Base):
    __tablename__ = "audit_logs"

    id = Column(String, primary_key=True, index=True)
    actor = Column(String, nullable=False)
    action = Column(String, nullable=False)
    previous_status = Column(String, nullable=True)
    new_status = Column(String, nullable=True)
    reference_id = Column(String, nullable=False)
    timestamp = Column(DateTime, default=datetime.utcnow)
