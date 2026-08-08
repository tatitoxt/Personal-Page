import unittest
import os
from services.orchestrator import ContentEngineOrchestrator
from apps.api.core_engine import ContentPillar

class TestE2EOrchestratorFailsafe(unittest.TestCase):
    def setUp(self):
        self.orchestrator = ContentEngineOrchestrator()

    def test_full_pipeline_execution_for_automation_demo(self):
        result = self.orchestrator.process_content_pipeline(
            topic="Automatización de Leads de WhatsApp a CRM",
            angle="Eliminar la carga manual de contactos en empresas B2B",
            pillar=ContentPillar.AUTOMATION_DEMOS,
            has_ui_demo=True,
            has_architecture=True,
            step_count=4
        )

        self.assertIsNotNone(result["pipeline_id"])
        self.assertEqual(result["pillar"], "AUTOMATION_DEMOS")
        self.assertTrue(result["qa_audit"]["passed"])
        self.assertGreaterEqual(result["qa_audit"]["total_score"], 85.0)

    def test_failsafe_blocks_publishing_when_secret_or_slop_detected(self):
        # Attempting to process pipeline with a secret key in angle
        with self.assertRaises(ValueError) as context:
            self.orchestrator.process_content_pipeline(
                topic="Revolutionize your sales with AI game changer",
                angle="Secret API key exposed in text: sk-1234567890123456789012345",
                pillar=ContentPillar.AUTOMATION_DEMOS,
                has_ui_demo=False,
                has_architecture=False
            )
        self.assertIn("Content failed QA audit", str(context.exception))

if __name__ == "__main__":
    unittest.main()
