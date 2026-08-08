"""
Demo Pipeline Execution Script
Runs the Orkelya Autonomous Content Engine for 3 real B2B pillars and outputs generated assets and pipeline JSON logs.
"""
import json
from services.orchestrator import ContentEngineOrchestrator
from apps.api.core_engine import ContentPillar

def main():
    orchestrator = ContentEngineOrchestrator()
    results = []

    print("🚀 Running Orkelya Autonomous Content Engine Demo Pipeline...\n")

    # Campaign 1: Automation Demo (Video Demo + Diagram)
    res1 = orchestrator.process_content_pipeline(
        topic="Automatización de Leads de WhatsApp a Salesforce",
        angle="Respuesta instantánea 24/7 y calificación automática de presupuesto",
        pillar=ContentPillar.AUTOMATION_DEMOS,
        has_ui_demo=True,
        has_architecture=True,
        step_count=4
    )
    results.append(res1)
    print(f"✅ [Campaign 1] Topic: '{res1['topic']}'")
    print(f"   Primary Format: {res1['routing_decision']['primary_format']} | QA Score: {res1['qa_audit']['total_score']}/100")
    print(f"   Generated Assets: {[a['type'] for a in res1['generated_assets']]}")
    print(f"   Idempotency Key: {res1['publishing_job']['idempotency_key'][:16]}...\n")

    # Campaign 2: Educational Carousel
    res2 = orchestrator.process_content_pipeline(
        topic="7 Procesos Administrativos B2B a Automatizar",
        angle="Ahorrar +20 horas semanales de carga manual de datos",
        pillar=ContentPillar.WHAT_I_WOULD_AUTOMATE,
        has_ui_demo=False,
        has_architecture=True,
        step_count=7
    )
    results.append(res2)
    print(f"✅ [Campaign 2] Topic: '{res2['topic']}'")
    print(f"   Primary Format: {res2['routing_decision']['primary_format']} | QA Score: {res2['qa_audit']['total_score']}/100")
    print(f"   Generated Assets: {[a['type'] for a in res2['generated_assets']]}\n")

    # Campaign 3: Contrarian Opinion Text Post
    res3 = orchestrator.process_content_pipeline(
        topic="Automatizar todo sin estrategia es un error costoso",
        angle="Enfocarse en resolver el cuello de botella principal de conversión antes de sumar más herramientas",
        pillar=ContentPillar.OPINION_CONTRARIAN,
        has_ui_demo=False,
        has_architecture=False,
        is_opinion_or_contrarian=True,
        step_count=1
    )
    results.append(res3)
    print(f"✅ [Campaign 3] Topic: '{res3['topic']}'")
    print(f"   Primary Format: {res3['routing_decision']['primary_format']} | QA Score: {res3['qa_audit']['total_score']}/100\n")

    output_file = "output/demo_pipeline_run.json"
    with open(output_file, "w", encoding="utf-8") as f:
        json.dump(results, f, indent=2, ensure_ascii=False)

    print(f"🎉 Pipeline execution complete. Full trace log saved to '{output_file}'.")

if __name__ == "__main__":
    main()
