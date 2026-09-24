import os
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    PROJECT_NAME: str = "KisanConnect"
    API_V1_STR: str = "/api/v1"
    SECRET_KEY: str = os.getenv("SECRET_KEY", "kisanconnect-super-secret-key-sih-2026")
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24 * 7  # 7 days
    DATABASE_URL: str = os.getenv("DATABASE_URL", "sqlite:///./kisanconnect.db")

    class Config:
        case_sensitive = True

settings = Settings()
