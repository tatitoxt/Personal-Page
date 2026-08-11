from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from apps.api.config import settings
from apps.api.routers import format_router, qa

app = FastAPI(
    title=settings.PROJECT_NAME,
    version=settings.VERSION,
    description="Orkelya Autonomous Content Engine - Core Intelligence & QA API"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(format_router.router)
app.include_router(qa.router)

@app.get("/")
def health_check():
    return {
        "status": "healthy",
        "project": settings.PROJECT_NAME,
        "version": settings.VERSION,
        "human_override_pause": settings.HUMAN_OVERRIDE_PAUSE_ALL
    }
