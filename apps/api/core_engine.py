"""
Orkelya Autonomous Content Engine - Core Intelligence Module
Provides zero-dependency, pure Python execution for ContentFormatRouter, QA Audit, and Brand System.
"""
from enum import Enum
from typing import List, Dict, Any, Optional
import re
import json

class ContentPillar(str, Enum):
    AUTOMATION_DEMOS = "AUTOMATION_DEMOS"
    BEFORE_VS_AFTER = "BEFORE_VS_AFTER"
    WHAT_I_WOULD_AUTOMATE = "WHAT_I_WOULD_AUTOMATE"
    BUILDING_ORKELYA = "BUILDING_ORKELYA"
    BUSINESS_OPERATIONS = "BUSINESS_OPERATIONS"
    AI_EDUCATION = "AI_EDUCATION"
    OPINION_CONTRARIAN = "OPINION_CONTRARIAN"
    SALES_BUSINESS = "SALES_BUSINESS"
    AI_SOFTWARE_DISCOVERY = "AI_SOFTWARE_DISCOVERY"
    ARCHITECTURE_VISUALS = "ARCHITECTURE_VISUALS"
    MINI_CASE_STUDY = "MINI_CASE_STUDY"
    CONTENT_ABOUT_CONTENT = "CONTENT_ABOUT_CONTENT"

class ContentFormat(str, Enum):
    VIDEO_SHORT = "VIDEO_SHORT"
    VIDEO_DEMO = "VIDEO_DEMO"
    CAROUSEL = "CAROUSEL"
    STATIC_VISUAL = "STATIC_VISUAL"
    DIAGRAM = "DIAGRAM"
    INFOGRAPHIC = "INFOGRAPHIC"
    TEXT_POST = "TEXT_POST"
    THREAD = "THREAD"
    BUILD_IN_PUBLIC_POST = "BUILD_IN_PUBLIC_POST"
    CASE_STUDY = "CASE_STUDY"
    MULTI_FORMAT = "MULTI_FORMAT"

BANNED_PHRASES = [
    "revolutionize",
    "game changer",
    "in today's fast-paced world",
    "unlock the power of ai",
    "transform your business",
    "seamless integration",
    "delve",
    "testament to",
    "supercharge"
]

SECRET_PATTERNS = [
    r"sk-[a-zA-Z0-9]{20,}",
    r"ghp_[a-zA-Z0-9]{20,}",
    r"whsec_[a-zA-Z0-9]{20,}",
    r"postgres://[^:]+:[^@]+@",
]

class ContentFormatRouter:
    """
    Evaluates ideas across 11 dimensions to determine optimal format(s)
    without default bias toward short video.
    """
    def route(self, topic: str, angle: str, has_ui_demo: bool = False, 
              has_architecture: bool = False, has_code_or_commit: bool = False, 
              is_opinion_or_contrarian: bool = False, step_count: int = 1) -> Dict[str, Any]:
        
        demo_score = 90.0 if has_ui_demo else 20.0
        visual_score = 95.0 if has_architecture else (80.0 if step_count > 3 else 40.0)
        depth_score = min(step_count * 15.0 + (30.0 if has_architecture else 0.0), 100.0)
        save_score = 90.0 if (step_count >= 5 or has_architecture) else 45.0
        share_score = 85.0 if (is_opinion_or_contrarian or has_architecture) else 50.0
        conversion_score = 85.0 if (has_ui_demo or has_code_or_commit) else 60.0

        scores = {
            "visual_potential": visual_score,
            "demonstration_potential": demo_score,
            "depth_required": depth_score,
            "educational_value": 75.0,
            "emotional_impact": 70.0 if is_opinion_or_contrarian else 40.0,
            "shareability": share_score,
            "save_potential": save_score,
            "conversion_potential": conversion_score,
            "novelty": 70.0
        }

        if has_ui_demo and demo_score >= 80:
            primary = ContentFormat.VIDEO_DEMO.value
            secondary = ContentFormat.DIAGRAM.value if has_architecture else None
            platforms = ["instagram", "tiktok", "youtube", "linkedin"]
            rationale = "UI workflow demonstration best communicated via short-form video demo."
        elif has_architecture or (step_count >= 4 and visual_score >= 70):
            primary = ContentFormat.CAROUSEL.value
            secondary = ContentFormat.DIAGRAM.value
            platforms = ["linkedin", "instagram"]
            rationale = "High educational depth and save potential routed to multi-slide carousel and architecture diagram."
        elif has_code_or_commit:
            primary = ContentFormat.BUILD_IN_PUBLIC_POST.value
            secondary = ContentFormat.STATIC_VISUAL.value
            platforms = ["x", "linkedin"]
            rationale = "Technical build-in-public update with code card."
        elif is_opinion_or_contrarian:
            primary = ContentFormat.TEXT_POST.value
            secondary = ContentFormat.STATIC_VISUAL.value
            platforms = ["linkedin", "x"]
            rationale = "Contrarian B2B perspective best articulated via strong text post."
        else:
            primary = ContentFormat.CAROUSEL.value
            secondary = ContentFormat.TEXT_POST.value
            platforms = ["linkedin", "x", "instagram"]
            rationale = "Educational concept routed to carousel deck."

        return {
            "topic": topic,
            "primary_format": primary,
            "secondary_format": secondary,
            "target_platforms": platforms,
            "scores": scores,
            "rationale": rationale
        }

class QACriticEngine:
    """
    Multi-critic audit scanner enforcing Anti-AI Slop, Security, and Brand rules.
    Minimum threshold for passing is 85.0/100.
    """
    def audit(self, title: str, text_content: str, code_or_url_content: str = "") -> Dict[str, Any]:
        full_text = f"{title}\n{text_content}".lower()
        
        # 1. Anti-AI Slop
        banned_found = [p for p in BANNED_PHRASES if p in full_text]
        content_score = max(100.0 - (len(banned_found) * 20.0), 0.0)

        # 2. Security & Secret Audit
        combined = f"{text_content}\n{code_or_url_content}"
        security_flags = []
        for pattern in SECRET_PATTERNS:
            if re.search(pattern, combined):
                security_flags.append(f"Detected potential secret matching pattern: {pattern}")
        security_score = 0.0 if security_flags else 100.0

        # 3. Brand Voice Audit
        brand_score = 90.0 if len(text_content.strip()) >= 40 else 60.0

        total_score = (content_score * 0.4) + (security_score * 0.4) + (brand_score * 0.2)
        passed = total_score >= 85.0 and len(security_flags) == 0

        return {
            "passed": passed,
            "total_score": round(total_score, 2),
            "content_score": content_score,
            "security_score": security_score,
            "brand_score": brand_score,
            "banned_phrases_found": banned_found,
            "security_flags": security_flags
        }
