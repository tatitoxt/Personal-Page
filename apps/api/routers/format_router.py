from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, Field
from typing import List, Dict, Optional
from enum import Enum

router = APIRouter(prefix="/format-router", tags=["Format Router"])

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

class IdeaInput(BaseModel):
    topic: str
    angle: str
    has_ui_demo: bool = False
    has_architecture: bool = False
    has_code_or_commit: bool = False
    is_opinion_or_contrarian: bool = False
    step_count: int = Field(default=1, ge=1)

class IdeaEvaluationScore(BaseModel):
    visual_potential: float = Field(..., ge=0, le=100)
    demonstration_potential: float = Field(..., ge=0, le=100)
    depth_required: float = Field(..., ge=0, le=100)
    educational_value: float = Field(..., ge=0, le=100)
    emotional_impact: float = Field(..., ge=0, le=100)
    shareability: float = Field(..., ge=0, le=100)
    save_potential: float = Field(..., ge=0, le=100)
    conversion_potential: float = Field(..., ge=0, le=100)
    novelty: float = Field(..., ge=0, le=100)

class FormatRoutingDecision(BaseModel):
    primary_format: ContentFormat
    secondary_format: Optional[ContentFormat] = None
    target_platforms: List[str]
    scores: IdeaEvaluationScore
    rationale: str

@router.post("/evaluate", response_model=FormatRoutingDecision)
def evaluate_and_route_format(idea: IdeaInput):
    """
    Evaluates an idea across 11 dimensions and selects the optimal format(s)
    without default bias towards short video.
    """
    # Algorithmic scoring heuristic based on idea attributes
    demo_score = 90.0 if idea.has_ui_demo else 20.0
    visual_score = 95.0 if idea.has_architecture else (80.0 if idea.step_count > 3 else 40.0)
    depth_score = min(idea.step_count * 15.0 + (30.0 if idea.has_architecture else 0.0), 100.0)
    save_score = 90.0 if (idea.step_count >= 5 or idea.has_architecture) else 45.0
    share_score = 85.0 if (idea.is_opinion_or_contrarian or idea.has_architecture) else 50.0
    conversion_score = 85.0 if (idea.has_ui_demo or idea.has_code_or_commit) else 60.0
    
    scores = IdeaEvaluationScore(
        visual_potential=visual_score,
        demonstration_potential=demo_score,
        depth_required=depth_score,
        educational_value=75.0,
        emotional_impact=70.0 if idea.is_opinion_or_contrarian else 40.0,
        shareability=share_score,
        save_potential=save_score,
        conversion_potential=conversion_score,
        novelty=70.0
    )

    # Decision Matrix Routing Logic
    if idea.has_ui_demo and demo_score >= 80:
        if idea.has_architecture:
            return FormatRoutingDecision(
                primary_format=ContentFormat.VIDEO_DEMO,
                secondary_format=ContentFormat.DIAGRAM,
                target_platforms=["linkedin", "youtube", "instagram"],
                scores=scores,
                rationale="Idea requires live UI demonstration combined with architectural system breakdown."
            )
        return FormatRoutingDecision(
            primary_format=ContentFormat.VIDEO_DEMO,
            target_platforms=["instagram", "tiktok", "youtube", "linkedin"],
            scores=scores,
            rationale="Idea features UI workflow demonstration suitable for short-form video demo."
        )
    
    if idea.has_architecture or (idea.step_count >= 4 and visual_score >= 70):
        return FormatRoutingDecision(
            primary_format=ContentFormat.CAROUSEL,
            secondary_format=ContentFormat.DIAGRAM,
            target_platforms=["linkedin", "instagram"],
            scores=scores,
            rationale="High educational depth and save potential best communicated via multi-slide carousel and architecture diagram."
        )

    if idea.has_code_or_commit:
        return FormatRoutingDecision(
            primary_format=ContentFormat.BUILD_IN_PUBLIC_POST,
            secondary_format=ContentFormat.STATIC_VISUAL,
            target_platforms=["x", "linkedin"],
            scores=scores,
            rationale="Development update best suited for technical Build-in-Public post with code/terminal card."
        )

    if idea.is_opinion_or_contrarian:
        return FormatRoutingDecision(
            primary_format=ContentFormat.TEXT_POST,
            secondary_format=ContentFormat.STATIC_VISUAL,
            target_platforms=["linkedin", "x"],
            scores=scores,
            rationale="Contrarian B2B perspective best articulated via strong text argument with quote/opinion visual."
        )

    # Default balanced multi-format fallback
    return FormatRoutingDecision(
        primary_format=ContentFormat.CAROUSEL,
        secondary_format=ContentFormat.TEXT_POST,
        target_platforms=["linkedin", "x", "instagram"],
        scores=scores,
        rationale="Structured educational concept routed to carousel and accompanying text post."
    )
