from pydantic_settings import BaseSettings
from typing import List

class Settings(BaseSettings):
    PROJECT_NAME: str = "Orkelya Autonomous Content Engine API"
    VERSION: str = "0.1.0"
    
    # Database
    DATABASE_URL: str = "postgresql://orkelya_admin:orkelya_secret_password@localhost:5432/orkelya_content_db"
    
    # Redis
    REDIS_URL: str = "redis://localhost:6379/0"
    
    # QA & Control
    HUMAN_OVERRIDE_PAUSE_ALL: bool = False
    QA_MINIMUM_SCORE_THRESHOLD: float = 85.0
    
    # Banned Phrases (Anti-AI Slop)
    BANNED_PHRASES: List[str] = [
        "revolutionize",
        "game changer",
        "in today's fast-paced world",
        "unlock the power of AI",
        "transform your business",
        "seamless integration",
        "delve",
        "testament to",
        "supercharge"
    ]

    class Config:
        env_file = ".env"
        extra = "ignore"

settings = Settings()
