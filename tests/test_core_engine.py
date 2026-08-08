import unittest
from apps.api.core_engine import ContentFormatRouter, QACriticEngine, ContentFormat

class TestCoreEngine(unittest.TestCase):
    def setUp(self):
        self.router = ContentFormatRouter()
        self.qa = QACriticEngine()

    def test_router_demo_and_architecture(self):
        result = self.router.route(
            topic="AI Receptionist",
            angle="How an AI agent books appointments automatically",
            has_ui_demo=True,
            has_architecture=True,
            step_count=5
        )
        self.assertEqual(result["primary_format"], ContentFormat.VIDEO_DEMO.value)
        self.assertEqual(result["secondary_format"], ContentFormat.DIAGRAM.value)
        self.assertIn("linkedin", result["target_platforms"])

    def test_router_contrarian_text(self):
        result = self.router.route(
            topic="Automating everything is a mistake",
            angle="Focus on high-ROI bottlenecks first",
            is_opinion_or_contrarian=True
        )
        self.assertEqual(result["primary_format"], ContentFormat.TEXT_POST.value)
        self.assertEqual(result["secondary_format"], ContentFormat.STATIC_VISUAL.value)

    def test_qa_rejects_ai_slop_and_secrets(self):
        audit = self.qa.audit(
            title="Revolutionize your business with AI",
            text_content="This game changer will transform your business in today's fast-paced world. sk-12345678901234567890"
        )
        self.assertFalse(audit["passed"])
        self.assertGreaterEqual(len(audit["banned_phrases_found"]), 3)
        self.assertGreaterEqual(len(audit["security_flags"]), 1)

    def test_qa_passes_concrete_b2b_content(self):
        audit = self.qa.audit(
            title="Lead de WhatsApp a CRM en 3 segundos",
            text_content="Un lead entra por WhatsApp a las 2 AM. El agente de IA de Orkelya responde de inmediato, verifica presupuesto e ingresa la oportunidad en Salesforce."
        )
        self.assertTrue(audit["passed"])
        self.assertGreaterEqual(audit["total_score"], 85.0)

if __name__ == "__main__":
    unittest.main()
