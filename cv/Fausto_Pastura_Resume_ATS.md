# FAUSTO PASTURA
**Custom Business Software & Automation | Salesforce & CRM**  
Buenos Aires, Argentina | pasturafausto@gmail.com  
[LinkedIn](https://www.linkedin.com/in/fausto-pastura-582828369/) | [Website](https://www.orkelya.xyz) | [GitHub](https://github.com/tatitoxt)

---

## PROFESSIONAL SUMMARY
**Self-taught Salesforce Consultant, Forward Deployed AI Engineer (FDE), and Systems Integrator** focused on custom software and systems for businesses, plus workflow automation with or without AI. I learn by building and have over 3 years of hands-on work across enterprise CRM solutions, data migrations, integrations, web platforms, developer tools, and 19+ n8n workflows for business operations. I work from process discovery through implementation, testing, and documentation so teams can maintain the systems they use.

---

## SELF-TAUGHT LEARNING PHILOSOPHY & MINDSET
- **First-Principles Problem Solving:** Gained comprehensive software engineering skills through relentless self-study, reading official documentation, inspecting open-source codebases, and building production systems from scratch.
- **Forward Deployed Mindset:** Ability to bridge business strategy with deep technical execution, directly interfacing with clients to scope, build, and deploy production-grade software and AI integrations.
- **Rapid Technology Adoption:** Ability to learn and deploy new technology stacks (Next.js 16, FastAPI, n8n, Salesforce Apex/LWC, Docker, Redis, Rust, Go) in days to solve urgent operational challenges.

---

## TECHNICAL SKILLS & COMPETENCIES

### 💼 Salesforce & CRM Architecture
Salesforce Administration & Development (2023 - Present), Sales Cloud, Service Cloud, Apex Triggers & Controllers, Lightning Web Components (LWC), Custom Objects, Process Automation (Flows), REST/SOAP Integration APIs, Security Models (RLS, FLS, Profiles, Sharing Rules).

### 🤖 AI, Full-Stack & Automation Systems
- **AI & Agent Engineering:** AgentFlow, TermaAI, OpenAI & Claude LLM APIs, Autonomous AI Agents, RAG Pipelines, LangChain, WhatsApp Evolution API, Redis.
- **Full-Stack Web & Micro-SaaS:** Next.js (16/15), React 19/18, FastAPI, Flask, Node.js, Express, Tailwind CSS, PostgreSQL (incl. RLS), Supabase, NATS JetStream, Docker, Vercel, Render.
- **Desktop & Systems:** Tauri 2 (Rust + React), Playwright, WebDriver E2E, GitHub Actions CI/CD.
- **Programming Languages:** Python, TypeScript, JavaScript, Apex (Salesforce), SOQL/SOSL, SQL (PostgreSQL, SQLite), C, C++, Rust, Go, HTML5, CSS3 / Sass, Shell / Bash.

### ⚙️ Version Control, DevOps & Systems
Git Advanced Workflows (Interactive Rebase, Custom Commit Scripting, Filter-Repo), GitHub Actions CI/CD Pipelines, Docker container orchestration, FastVault (Rust CLI secrets manager), Gatekeeper-Proxy.

---

## PROFESSIONAL EXPERIENCE

### **Salesforce Consultant & CRM Developer** — *Enterprise CRM Consulting*  
*January 2023 – Present | Remote*
- **Engineered end-to-end Salesforce solutions** for enterprise clients across Sales Cloud and Service Cloud, translating complex business requirements into scalable Apex code, Lightning Web Components (LWC), and automated Flows.
- **Developed custom Apex triggers, batch classes, and REST integration endpoints** connecting Salesforce with external ERPs and payment systems, with field mapping, validation, and exception review.
- Built Salesforce Flow automations and ERP data synchronization for lead-to-opportunity and service workflows.
- Executed CRM data migration and cleanup projects using Data Loader and SOQL, with validation and record review for large datasets.

### **Orkelya** — *Founding Forward Deployed AI Engineer*  
*June 2025 – Present | Remote*
- Designed and deployed `Orkelya.xyz`, a multilingual platform for business software and automation using `Next.js`, `React`, `TypeScript`, and `FastAPI` on Vercel and Render.
- Built a lead-capture backend integrating Supabase PostgreSQL Row Level Security (RLS), Cloudflare Turnstile, persistent rate limiting, and origin checks.
- Integrated self-hosted n8n workflows to process incoming leads, support AI-assisted intent analysis, and route notifications to CRM, email, and WhatsApp.

### **Agency Solutions & Automation Consulting** — *Lead Automation Architect & Systems Integrator*  
*March 2024 – Present | Remote*
- Designed and deployed 19+ agency automation workflows using `n8n`, `Docker`, `Python`, `Redis`, and Google Workspace APIs for client delivery tracking, handoffs, onboarding, triage, reporting, and invoicing.
- Developed a WhatsApp B2B assistant using Evolution API, Redis, and OpenAI API to support initial lead qualification and appointment scheduling.
- Deployed self-hosted n8n instances in Docker for daily agency workflows.

---

## FEATURED PROJECTS & OPEN-SOURCE SYSTEMS
All public at [github.com/tatitoxt](https://github.com/tatitoxt); test and CI figures are verified in each repo's README and CI runs.

### **1. Aurora — Ambient Desktop Music Companion**
Cross-platform desktop app (Tauri 2, Rust core, React + TypeScript) that follows whatever you play: ambient edge lighting driven by album art, a liquid-glass mini player, synced karaoke-style lyrics, visualizer, listening stats and playlists, plus YouTube/SoundCloud streaming. Rust workspace tests, Vitest, Playwright and WebDriver E2E run on every PR; includes a public landing site.  
- **Tech:** Rust, Tauri 2, React 18, TypeScript, Vite, GitHub Actions.

### **2. Salesforce Integration Gateway — Apex + LWC**
Integration framework connecting Salesforce with payment webhooks and billing platforms: signed webhook verification, async reconciliation jobs, billing sync, an LWC admin console, and a full event simulator for sandbox testing. 70 Apex test methods in 9 classes plus Jest tests.  
- **Tech:** Apex, Lightning Web Components, Salesforce DX, Jest.

### **3. Pipeline Clinic — CI Failure Triage**
Imports GitHub Actions runs/logs, redacts secrets, fingerprints failures deterministically and groups recurring ones with explanations; triage via HTTP API, CLI and React UI, with GitHub tokens Fernet-encrypted at rest. 116 tests pass on SQLite and PostgreSQL + Playwright E2E; zero known vulnerabilities.  
- **Tech:** Python 3.12, FastAPI, PostgreSQL/SQLite, React, Docker Compose.

### **4. Compose Doctor — Offline Docker Compose Diagnostics**
Go CLI that loads a Compose project the way Docker Compose v2 does (interpolation, merge keys, profiles, multi-file overrides) and reports 17 classes of problems without running anything — no Docker, network or file writes. 156 tests including golden-file and fuzz coverage.  
- **Tech:** Go, yaml.v3, staticcheck, govulncheck.

### **5. CargoDesk — Logistics Operations Desk**
End-to-end transport workflow platform: request → quote → assignment → delivery state machine, SLA tracking, auditable event timeline, RBAC and multi-tenancy. Go API + Next.js UI; unit + integration + 7 Playwright E2E tests in CI.  
- **Tech:** Go, Next.js, TypeScript, PostgreSQL, Docker Compose.

### **6. Gatekeeper-Proxy — Reverse Proxy, WAF & Rate Limiter**
TypeScript/Node reverse proxy with a Web Application Firewall, sliding-window rate limiting, CIDR filtering and a security telemetry dashboard. Hardened end-to-end: fixed IP-spoofing via X-Forwarded-For, stored XSS in the dashboard, unauthenticated admin API, request smuggling and hot-reload corruption. 143 unit/integration + 17 E2E tests.  
- **Tech:** TypeScript, Node.js, Docker, Playwright, Jest.

### **7. NeuraDash — Real-Time Analytics Dashboard**
Multi-tenant real-time dashboard: services post events to an ingest API, Postgres RLS + explicit tenant filters enforce isolation, WebSockets push live KPIs with resume/backfill. 73 tests (30 unit, 31 integration, 12 Playwright) plus a compose smoke test in CI.  
- **Tech:** Next.js 16, React 19, TypeScript, WebSockets, PostgreSQL RLS.

### **8. ShipPulse — Release Safety Slice**
Go release pipeline: deploy request → transactional outbox → NATS JetStream → idempotent worker → health probes → automatic rollback to last stable, with signed webhooks, idempotency keys and an append-only audit log. 52 unit+integration tests + Playwright against the compose stack.  
- **Tech:** Go, NATS JetStream, PostgreSQL, Next.js, Docker Compose.

### **9. AgentFlow — AI & Agent Framework**
Typed Python 3.11+ framework for tool-calling agents: pluggable providers (OpenAI, Anthropic, Groq) with retry, vector memory (in-memory or Redis KNN), structured tracing, agent-to-agent handoff and a CLI. Runs fully offline by default. 65 tests; ruff + mypy --strict.  
- **Tech:** Python, Pydantic, httpx, Redis, GitHub Actions.

### **10. TermaAI — Terminal AI Assistant**
Interactive command-line AI assistant that generates, validates, and safely executes complex Bash scripts with real-time dry-run checks and an audit log. 222 tests.  
- **Tech:** Python, Rich CLI, OpenAI API, shell security sandbox.

### **Additional public tools**
- **Staff Suite Lite** — free MIT FiveM resource: staff reports, ticket queue, SHA-256 hash-chained audit log.
- **Import Preflight** — browser-only CSV checks for CRM imports (7 automated tests; the file never leaves the browser).
- **FastVault** — Rust CLI for encrypted local secrets (Argon2id + AES-256-GCM); in development, workspace tests pass, no independent security audit.
- **DockNuke** — Go CLI for reviewing and cleaning Docker resources, with a dry-run mode.

---
## EDUCATION & CONTINUOUS LEARNING

- **Self-Taught Continuous Learner** — *Hands-on software development, open-source code analysis, Git history architecture, and real-world system architecture* (2022 - Present)
- **Salesforce Systems & Platform Engineering** — *Hands-on Apex, LWC, SOQL & Flow Architecture* (2023 - Present)
- **Bartolomé Mitre Day School** — *High School Diploma* (Buenos Aires, Argentina)

---

## LANGUAGES
- **Spanish:** Native / Bilingual
- **English:** Upper-Intermediate (B2+)
