# ADR-001: Hybrid Monorepo Architecture for Orkelya Autonomous Content Engine

## Status
Accepted

## Context
Orkelya requires a fully autonomous B2B organic marketing infrastructure capable of researching, scoring, formatting, producing, publishing, analyzing, and learning from faceless content across video, carousels, diagrams, static visuals, and text posts.

Building the entire engine in a single framework (e.g. pure n8n or pure Python) introduces major trade-offs:
- Pure n8n lacks fine-grained programmatic video composition (Remotion), Playwright browser automation, and complex ML vector scoring.
- Pure code lacks visual workflow debugging, native webhook listeners, scheduling UI, and easy API integration connectors.

## Decision
We adopt a **Hybrid Architecture**:
1. **n8n:** Orchestration, cron triggers, platform adapters, publishing retries, and social analytics webhooks.
2. **Python (FastAPI + Pydantic):** Content intelligence, research agents, vector deduplication (`pgvector`), idea scoring, ContentFormatRouter, and Anti-AI-Slop QA critics.
3. **Remotion (TypeScript/React):** Programmatic 1080x1920 video composition rendering.
4. **Playwright (Chromium):** Synthetic UI demo recordings (WhatsApp, CRM, Calendar).
5. **Satori / HTML / SVG:** Programmatic carousels, diagrams, and static graphics.
6. **PostgreSQL + Redis:** Relational content state database + asynchronous queue system.

## Consequences
- Clean separation of concerns between orchestration, business logic, rendering, and publishing.
- High reliability, testability, and zero reliance on single vendor lock-in.
