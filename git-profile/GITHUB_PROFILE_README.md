# Salesforce & CRM consulting · Custom business software · Automation · FDE

I work as a **Salesforce and CRM consultant**, building custom software and systems for businesses and automating workflows with or without AI. I work from understanding the process through implementation, integration, and documentation. Everything below is public and verifiable — real code, test suites, and CI.

Trabajo como **consultor de Salesforce y CRM**. Desarrollo software y sistemas a medida para empresas, además de automatizaciones con o sin IA. Trabajo desde el relevamiento del proceso hasta la implementación, integración y documentación. Todo lo de abajo es público y verificable: código real, tests y CI.

## Flagship | Proyecto principal

- [Aurora](https://github.com/tatitoxt/aurora) — cross-platform desktop music companion (Tauri 2 · Rust core · React/TypeScript): ambient edge lighting, a glass mini player, synced karaoke-style lyrics, listening stats and playlists. Rust workspace tests + Vitest + Playwright + WebDriver E2E run on every PR.

## Selected projects | Proyectos seleccionados

- [Pipeline Clinic](https://github.com/tatitoxt/pipeline-clinic) — CI failure triage for GitHub Actions: deterministic fingerprinting and grouping of recurring failures, secret redaction, HTTP API + CLI + React UI. 116 tests pass on SQLite and PostgreSQL + Playwright E2E.
- [Compose Doctor](https://github.com/tatitoxt/compose-doctor) — Go CLI that diagnoses Docker Compose projects fully offline: Compose v2 parsing (interpolation, merge keys, profiles), 17 diagnostic rules, human/JSON output. 156 tests including golden and fuzz.
- [CargoDesk](https://github.com/tatitoxt/cargodesk) — logistics operations desk (Go API + Next.js): request → quote → assignment → delivery state machine, SLA tracking, auditable timeline, RBAC, multi-tenancy. Unit + integration + 7 Chromium E2E tests.
- [Gatekeeper Proxy](https://github.com/tatitoxt/gatekeeper-proxy) — TypeScript/Node reverse proxy with WAF, sliding-window rate limiting and a security dashboard. Hardened end-to-end (fixed IP-spoofing, stored XSS and request-smuggling bugs); 143 unit/integration + 17 E2E tests.
- [NeuraDash](https://github.com/tatitoxt/neuradash) — multi-tenant real-time analytics dashboard (Next.js 16, React 19, WebSockets, Postgres RLS). 73 tests (30 unit, 31 integration, 12 Playwright) + compose smoke CI.
- [ShipPulse](https://github.com/tatitoxt/shippulse) — release-safety slice in Go: deploy → transactional outbox → NATS JetStream → idempotent worker → health probes → automatic rollback, signed webhooks, append-only audit log. 52 unit+integration tests + Playwright.
- [AgentFlow](https://github.com/tatitoxt/agentflow) — typed Python 3.11+ framework for tool-calling agents: pluggable providers (OpenAI/Anthropic/Groq), vector memory (in-memory or Redis), tracing, agent handoff. 65 tests; mypy --strict.
- [TermaAI](https://github.com/tatitoxt/termaai) — terminal AI assistant that generates, validates and safely executes Bash scripts with dry-run checks and an audit log. 222 tests.
- [Salesforce Integration Gateway](https://github.com/tatitoxt/salesforce-integration-gateway) — Apex + LWC integration framework: signed webhooks, async reconciliation, billing sync, admin console and a full simulator. 70 Apex test methods in 9 classes.
- [Salesforce Operations Orchestrator](https://github.com/tatitoxt/salesforce-operations-orchestrator) — Salesforce DX practice project for operational task flows: Apex, Custom Metadata, LWC. Apex and Jest tests; Apex tests require a Salesforce org.
- [Staff Suite Lite](https://github.com/tatitoxt/staff-suite-lite) — free MIT FiveM resource: staff reports, ticket queue and a SHA-256 hash-chained audit log.
- [Import Preflight](https://github.com/tatitoxt/crm-import-preflight) — browser-only CSV checks for CRM imports; the file never leaves the browser. 7 automated tests.
- [FastVault](https://github.com/tatitoxt/fastvault) — Rust CLI for encrypted local secrets (Argon2id + AES-256-GCM). In development; workspace tests pass; no independent security audit.
- [DockNuke](https://github.com/tatitoxt/docknuke) — Go CLI for reviewing and cleaning Docker resources, with a dry-run mode.

## How I work | Cómo trabajo

I build integrations and internal tools around the team's actual process. Some workflows use explicit rules; AI is an option when it adds value, not a requirement. Every repo above documents setup, tests and honest limitations in its README.

Diseño integraciones y herramientas internas según el proceso real del equipo. Algunas automatizaciones usan reglas explícitas; incorporo IA cuando aporta valor, no como requisito. Cada repo documenta setup, tests y limitaciones honestas en su README.

## Contact

[LinkedIn](https://www.linkedin.com/in/fausto-pastura-582828369/) · [Orkelya](https://www.orkelya.xyz)
