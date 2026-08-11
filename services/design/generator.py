"""
Orkelya Programmatic Visual & Diagram Generator
Renders vector SVG diagrams, multi-slide carousels, and code cards adhering to brand tokens.
"""
import os
import json
from typing import List, Dict, Any

BRAND_TOKENS = {
    "bg": "#0B0F19",
    "surface": "#111827",
    "border": "#1F2937",
    "text": "#F9FAFB",
    "text_muted": "#9CA3AF",
    "accent_cyan": "#00F0FF",
    "accent_purple": "#7C3AED",
    "accent_green": "#10B981"
}

class DiagramGenerator:
    """Generates clean, scalable SVG architecture diagrams for Orkelya workflows."""
    @staticmethod
    def render_workflow_diagram(title: str, nodes: List[str], output_path: str) -> str:
        width = 1200
        height = 630
        node_width = 180
        node_height = 80
        spacing = 40
        start_x = (width - (len(nodes) * node_width + (len(nodes) - 1) * spacing)) // 2
        start_y = (height - node_height) // 2

        svg_content = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {width} {height}" width="{width}" height="{height}" style="background-color: {BRAND_TOKENS['bg']}; font-family: Inter, system-ui, sans-serif;">
            <defs>
                <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stop-color="{BRAND_TOKENS['accent_cyan']}" stop-opacity="0.2"/>
                    <stop offset="100%" stop-color="{BRAND_TOKENS['accent_purple']}" stop-opacity="0.2"/>
                </linearGradient>
                <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                    <path d="M 0 0 L 10 5 L 0 10 z" fill="{BRAND_TOKENS['accent_cyan']}"/>
                </marker>
            </defs>

            <!-- Header -->
            <text x="60" y="70" fill="{BRAND_TOKENS['text']}" font-size="28" font-weight="700">{title}</text>
            <text x="60" y="105" fill="{BRAND_TOKENS['text_muted']}" font-size="16">Orkelya Autonomous Workflow Architecture</text>
            <line x1="60" y1="130" x2="{width - 60}" y2="130" stroke="{BRAND_TOKENS['border']}" stroke-width="2"/>
        '''

        # Render Nodes and Arrows
        for i, node_text in enumerate(nodes):
            x = start_x + i * (node_width + spacing)
            y = start_y

            # Node Box
            svg_content += f'''
            <rect x="{x}" y="{y}" width="{node_width}" height="{node_height}" rx="12" fill="url(#grad)" stroke="{BRAND_TOKENS['accent_cyan']}" stroke-width="2"/>
            <text x="{x + node_width/2}" y="{y + node_height/2 + 5}" fill="{BRAND_TOKENS['text']}" font-size="16" font-weight="600" text-anchor="middle">{node_text}</text>
            '''

            # Connecting Arrow (if not last)
            if i < len(nodes) - 1:
                arrow_x1 = x + node_width
                arrow_x2 = x + node_width + spacing - 8
                arrow_y = y + node_height / 2
                svg_content += f'''
                <line x1="{arrow_x1}" y1="{arrow_y}" x2="{arrow_x2}" y2="{arrow_y}" stroke="{BRAND_TOKENS['accent_cyan']}" stroke-width="2" marker-end="url(#arrow)"/>
                '''

        svg_content += '\n</svg>'

        os.makedirs(os.path.dirname(output_path), exist_ok=True)
        with open(output_path, "w", encoding="utf-8") as f:
            f.write(svg_content)

        return output_path

class CarouselGenerator:
    """Generates HTML multi-slide carousels ready for PDF conversion."""
    @staticmethod
    def render_carousel_deck(topic: str, slides: List[Dict[str, str]], output_path: str) -> str:
        html_content = f'''<!DOCTYPE html>
        <html>
        <head>
            <meta charset="utf-8">
            <style>
                body {{
                    margin: 0;
                    padding: 0;
                    background-color: {BRAND_TOKENS['bg']};
                    font-family: 'Inter', system-ui, -apple-system, sans-serif;
                    color: {BRAND_TOKENS['text']};
                }}
                .slide {{
                    width: 1080px;
                    height: 1350px;
                    box-sizing: border-box;
                    padding: 100px 80px;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                    background: radial-gradient(circle at top right, rgba(0, 240, 255, 0.08), transparent 40%),
                                radial-gradient(circle at bottom left, rgba(124, 58, 237, 0.08), transparent 40%),
                                {BRAND_TOKENS['bg']};
                    border-bottom: 4px solid {BRAND_TOKENS['border']};
                    page-break-after: always;
                }}
                .header {{
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    border-bottom: 2px solid {BRAND_TOKENS['border']};
                    padding-bottom: 24px;
                }}
                .brand {{
                    font-size: 24px;
                    font-weight: 800;
                    color: {BRAND_TOKENS['accent_cyan']};
                    letter-spacing: 2px;
                }}
                .slide-num {{
                    font-size: 20px;
                    color: {BRAND_TOKENS['text_muted']};
                }}
                .content {{
                    margin: auto 0;
                }}
                .slide-title {{
                    font-size: 56px;
                    font-weight: 800;
                    line-height: 1.15;
                    margin-bottom: 32px;
                    color: {BRAND_TOKENS['text']};
                }}
                .slide-body {{
                    font-size: 32px;
                    line-height: 1.5;
                    color: {BRAND_TOKENS['text_muted']};
                }}
                .footer {{
                    display: flex;
                    justify-content: space-between;
                    color: {BRAND_TOKENS['text_muted']};
                    font-size: 20px;
                }}
            </style>
        </head>
        <body>
        '''

        for idx, slide in enumerate(slides, start=1):
            html_content += f'''
            <div class="slide">
                <div class="header">
                    <div class="brand">ORKELYA</div>
                    <div class="slide-num">{idx} / {len(slides)}</div>
                </div>
                <div class="content">
                    <div class="slide-title">{slide.get('title', '')}</div>
                    <div class="slide-body">{slide.get('body', '')}</div>
                </div>
                <div class="footer">
                    <div>{topic}</div>
                    <div>Swipe ➔</div>
                </div>
            </div>
            '''

        html_content += '</body></html>'

        os.makedirs(os.path.dirname(output_path), exist_ok=True)
        with open(output_path, "w", encoding="utf-8") as f:
            f.write(html_content)

        return output_path
