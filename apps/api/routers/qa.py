from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, Field
from typing import List, Optional
import re
from apps.api.config import settings

router = APIRouter(prefix="/qa", tags=["Quality Control"])

class ContentQARequest(BaseModel):
    title: str
    text_content: str
    code_or_url_content: Optional[str] = ""

class QAResult(BaseModel):
    passed: bool
    total_score: float
    content_score: float
    security_score: float
    brand_score: float
    banned_phrases_found: List[str]
    security_flags: List[str]
    improvement_recommendations: List[str]

SECRET_PATTERNS = [
    r"sk-[a-zA-Z0-9]{20,}",           # OpenAI / Stripe secrets
    r"ghp_[a-zA-Z0-9]{20,}",          # GitHub tokens
    r"whsec_[a-zA-Z0-9]{20,}",        # Webhook secrets
    r"postgres://[^:]+:[^@]+@",      # DB connection strings
    r"[a-zA-Z0-9._%+-]+@(?!example\.com)[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}" # Real emails (allowing @example.com)
]

@router.post("/audit", response_model=QAResult)
def audit_content_quality_and_security(request: ContentQARequest):
    """
    Multi-critic QA pass for Anti-AI-Slop, Brand Voice, and Security PII/Secret checks.
    Minimum threshold for passing is 85/100.
    """
    full_text = f"{request.title}\n{request.text_content}".lower()
    
    # 1. Anti-AI Slop & Banned Phrase Audit
    banned_found = []
    for phrase in settings.BANNED_PHRASES:
        if phrase.lower() in full_text:
            banned_found.append(phrase)
            
    content_score = max(100.0 - (len(banned_found) * 20.0), 0.0)
    
    # 2. Security & Secret Scanning Audit
    security_flags = []
    combined_code_text = f"{request.text_content}\n{request.code_or_url_content or ''}"
    
    for pattern in SECRET_PATTERNS:
        matches = re.findall(pattern, combined_code_text)
        if matches:
            security_flags.append(f"Detected potential secret or real email matching pattern: {pattern}")
            
    security_score = 0.0 if security_flags else 100.0
    
    # 3. Brand Voice Audit (Direct, Concrete, B2B)
    recommendations = []
    if len(request.text_content.strip()) < 50:
        recommendations.append("Content is too brief; elaborate with concrete operational examples.")
        brand_score = 60.0
    else:
        brand_score = 90.0

    if banned_found:
        recommendations.append(f"Remove banned AI slop phrases: {', '.join(banned_found)}")
    if security_flags:
        recommendations.append("SECURITY CRITICAL: Mask or remove detected API secrets / real emails before publishing.")

    total_score = (content_score * 0.4) + (security_score * 0.4) + (brand_score * 0.2)
    passed = total_score >= settings.QA_MINIMUM_SCORE_THRESHOLD and len(security_flags) == 0

    return QAResult(
        passed=passed,
        total_score=total_score,
        content_score=content_score,
        security_score=security_score,
        brand_score=brand_score,
        banned_phrases_found=banned_found,
        security_flags=security_flags,
        improvement_recommendations=recommendations
    )
