import unittest

try:
    from fastapi.testclient import TestClient
    from apps.api.main import app
    FASTAPI_AVAILABLE = True
except ImportError:
    FASTAPI_AVAILABLE = False

@unittest.skipUnless(FASTAPI_AVAILABLE, "FastAPI / TestClient not installed in global environment")
class TestAPIEndpoints(unittest.TestCase):
    def setUp(self):
        self.client = TestClient(app)

    def test_health_check(self):
        response = self.client.get("/")
        self.assertEqual(response.status_code, 200)

    def test_format_router_architecture_and_demo(self):
        payload = {
            "topic": "AI Receptionist Architecture",
            "angle": "How an AI agent books meetings without human intervention",
            "has_ui_demo": True,
            "has_architecture": True,
            "has_code_or_commit": False,
            "is_opinion_or_contrarian": False,
            "step_count": 5
        }
        response = self.client.post("/format-router/evaluate", json=payload)
        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertEqual(data["primary_format"], "VIDEO_DEMO")
        self.assertEqual(data["secondary_format"], "DIAGRAM")

    def test_qa_audit_rejects_ai_slop_and_secrets(self):
        payload = {
            "title": "Revolutionize your business with AI",
            "text_content": "This game changer will transform your business in today's fast-paced world. sk-1234567890123456789012345",
            "code_or_url_content": ""
        }
        response = self.client.post("/qa/audit", json=payload)
        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertFalse(data["passed"])

if __name__ == "__main__":
    unittest.main()
