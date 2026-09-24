from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings
from app.api.v1.router import api_router
from app.db.session import SessionLocal, Base, engine
from app.initial_data import init_db

app = FastAPI(
    title="KisanConnect API",
    description="Smart Agri-Marketplace connecting Smallholders, FPOs, and Bulk Buyers with multi-channel voice access, multi-farmer pooling, and trusted escrow rails.",
    version="1.0.0"
)

# Enable CORS for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
def on_startup():
    db = SessionLocal()
    try:
        init_db(db)
    finally:
        db.close()

app.include_router(api_router, prefix=settings.API_V1_STR)

@app.get("/")
def root():
    return {
        "app": "KisanConnect API",
        "status": "online",
        "docs_url": "/docs",
        "api_v1": settings.API_V1_STR
    }
