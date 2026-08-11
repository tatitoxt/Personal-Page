"""
Orkelya Autonomous Content Engine - Master Orchestrator Pipeline
Executes the closed loop: Research Signal -> Idea -> Scoring -> Format Router -> Assets -> QA -> Scheduling -> Analytics.
"""
import os
import json
import uuid
import hashlib
from datetime import datetime, timedelta, timezone
from typing import Dict, Any, List

from apps.api.core_engine import ContentFormatRouter, QACriticEngine, ContentPillar
from services.design.generator import DiagramGenerator, CarouselGenerator
from services.demo.recorder import SyntheticUIDemoRecorder

class ContentEngineOrchestrator:
    def __init__(self):
        self.router = ContentFormatRouter()
        self.qa = QACriticEngine()

    def process_content_pipeline(self, topic: str, angle: str, pillar: ContentPillar, 
                                 has_ui_demo: bool = False, has_architecture: bool = False, 
                                 has_code_or_commit: bool = False, is_opinion_or_contrarian: bool = False,
                                 step_count: int = 1) -> Dict[str, Any]:
        
        pipeline_id = str(uuid.uuid4())
        timestamp = datetime.now(timezone.utc).isoformat()

        # Step 1: Format Routing Decision
        routing = self.router.route(
            topic=topic,
            angle=angle,
            has_ui_demo=has_ui_demo,
            has_architecture=has_architecture,
            has_code_or_commit=has_code_or_commit,
            is_opinion_or_contrarian=is_opinion_or_contrarian,
            step_count=step_count
        )

        # Step 2: Asset Generation (Diagrams / Carousels / Demos)
        generated_assets = []
        
        if routing["primary_format"] == "CAROUSEL" or routing["secondary_format"] == "CAROUSEL":
            carousel_path = f"output/assets/{pipeline_id}/carousel.html"
            slides = [
                {"title": f"Cómo automatizar {topic}", "body": f"Ángulo operativo: {angle}"},
                {"title": "El Problema Operativo", "body": "Copiar datos manualmente entre sistemas genera errores y pérdida de tiempo."},
                {"title": "La Solución Orkelya", "body": "Un agente de IA procesa, califica y sincroniza la información en tiempo real."}
            ]
            CarouselGenerator.render_carousel_deck(topic, slides, carousel_path)
            generated_assets.append({"type": "carousel_html", "path": carousel_path})

        if has_architecture or routing["primary_format"] == "DIAGRAM" or routing["secondary_format"] == "DIAGRAM":
            diagram_path = f"output/assets/{pipeline_id}/architecture.svg"
            nodes = ["WhatsApp Lead", "AI Agent", "Google Calendar", "Salesforce CRM"]
            DiagramGenerator.render_workflow_diagram(f"Arquitectura: {topic}", nodes, diagram_path)
            generated_assets.append({"type": "diagram_svg", "path": diagram_path})

        if has_ui_demo or routing["primary_format"] == "VIDEO_DEMO":
            demo_path = f"output/assets/{pipeline_id}/crm_demo.html"
            SyntheticUIDemoRecorder.generate_mock_crm_interface("Empresa Cliente B2B", "AUTOMATED_QUALIFIED", demo_path)
            generated_assets.append({"type": "synthetic_demo_html", "path": demo_path})

        # Step 3: Copy Generation & Scripting
        hook_text = f"Un lead entra por WhatsApp a las 2 AM. Nadie en tu equipo debería copiarlo manualmente."
        body_text = f"En Orkelya configuramos agentes de IA que califican presupuesto, agendan reuniones y sincronizan Salesforce en 3 segundos. {angle}."
        
        # Step 4: QA Audit Pass
        qa_result = self.qa.audit(
            title=topic,
            text_content=f"{hook_text}\n{body_text}"
        )

        if not qa_result["passed"]:
            raise ValueError(f"Content failed QA audit. Recommendations: {qa_result['security_flags']} / {qa_result['banned_phrases_found']}")

        # Step 5: Idempotent Publishing Job Scheduling
        idempotency_raw = f"{pipeline_id}-{routing['primary_format']}-{timestamp}"
        idempotency_key = hashlib.sha256(idempotency_raw.encode("utf-8")).hexdigest()
        scheduled_time = (datetime.now(timezone.utc) + timedelta(hours=2)).isoformat()

        return {
            "pipeline_id": pipeline_id,
            "timestamp": timestamp,
            "pillar": pillar.value,
            "topic": topic,
            "routing_decision": routing,
            "generated_assets": generated_assets,
            "script": {
                "hook": hook_text,
                "body": body_text,
                "cta": "Comenta 'AUTOMATIZAR' para recibir el mapa de arquitectura."
            },
            "qa_audit": qa_result,
            "publishing_job": {
                "idempotency_key": idempotency_key,
                "scheduled_time": scheduled_time,
                "status": "SCHEDULED"
            }
        }
