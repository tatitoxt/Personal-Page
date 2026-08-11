import unittest
import os
from services.design.generator import DiagramGenerator, CarouselGenerator

class TestDesignGenerator(unittest.TestCase):
    def test_svg_diagram_generation(self):
        output_path = "output/test_diagram.svg"
        nodes = ["WhatsApp Lead", "AI Qualification", "Google Calendar", "Salesforce CRM"]
        result = DiagramGenerator.render_workflow_diagram(
            title="AI Lead Routing Pipeline",
            nodes=nodes,
            output_path=output_path
        )
        self.assertTrue(os.path.exists(output_path))
        with open(output_path, "r", encoding="utf-8") as f:
            content = f.read()
            self.assertIn("AI Lead Routing Pipeline", content)
            self.assertIn("WhatsApp Lead", content)
            self.assertIn("Salesforce CRM", content)

    def test_carousel_deck_generation(self):
        output_path = "output/test_carousel.html"
        slides = [
            {"title": "7 Procesos que deberías automatizar hoy", "body": "Si tu equipo pierde más de 5 horas a la semana copiando datos entre sistemas, estás frenando el crecimiento de tu empresa."},
            {"title": "1. Entrada de Leads desde WhatsApp", "body": "Ningún empleado debería copiar manualmente nombres, teléfonos ni emails desde chats hacia un CRM."},
            {"title": "2. Confirmaciones y Recordatorios de Citas", "body": "Un agente de IA puede verificar disponibilidad y agendar la reunión en tiempo real."}
        ]
        result = CarouselGenerator.render_carousel_deck(
            topic="Automatización Operativa B2B",
            slides=slides,
            output_path=output_path
        )
        self.assertTrue(os.path.exists(output_path))
        with open(output_path, "r", encoding="utf-8") as f:
            content = f.read()
            self.assertIn("ORKELYA", content)
            self.assertIn("1. Entrada de Leads desde WhatsApp", content)

if __name__ == "__main__":
    unittest.main()
