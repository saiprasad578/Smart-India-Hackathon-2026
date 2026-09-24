from fastapi import APIRouter
from app.api.v1.endpoints import auth, listings, orders, ai, logistics, trust_payments

api_router = APIRouter()

api_router.include_router(auth.router, prefix="/auth", tags=["Authentication"])
api_router.include_router(listings.router, prefix="/listings", tags=["Listings"])
api_router.include_router(orders.router, prefix="/orders", tags=["Orders & Allocation"])
api_router.include_router(ai.router, prefix="/ai", tags=["AI Engine"])
api_router.include_router(logistics.router, prefix="/routes", tags=["Logistics & Routing"])
api_router.include_router(trust_payments.router, tags=["Trust & Escrow"])
