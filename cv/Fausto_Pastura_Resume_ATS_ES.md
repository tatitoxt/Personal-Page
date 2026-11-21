# FAUSTO PASTURA
**Sistemas a medida y automatización empresarial | Salesforce & CRM**  
Buenos Aires, Argentina | pasturafausto@gmail.com  
[LinkedIn](https://www.linkedin.com/in/fausto-pastura-582828369/) | [Sitio Web](https://www.orkelya.xyz) | [GitHub](https://github.com/tatitoxt)

---

## RESUMEN PROFESIONAL
**Autodidacta, consultor Salesforce, Ingeniero Forward Deployed de IA (FDE) e Integrador de Sistemas** enfocado en desarrollar sistemas y software a medida para empresas, además de automatizaciones con o sin IA. Aprendo construyendo y tengo más de 3 años de trabajo práctico en CRM empresarial, migraciones de datos, integraciones, plataformas web, herramientas para desarrolladores y 19+ flujos n8n para operaciones de negocio. Trabajo desde el relevamiento del proceso hasta la implementación, las pruebas y la documentación para que los equipos puedan mantener sus sistemas.

---

## FILOSOFÍA Y METODOLOGÍA AUTODIDACTA (*SELF-TAUGHT*)
- **Resolución desde Primeros Principios:** Desarrollo de habilidades avanzadas de ingeniería mediante el estudio riguroso e independiente, lectura de documentación oficial, análisis de código abierto y construcción de software en producción desde cero.
- **Mentalidad Forward Deployed (FDE):** Capacidad para unir la estrategia de negocio con la ejecución técnica profunda, trabajando directamente con clientes para diseñar, integrar y desplegar soluciones de software e IA.
- **Adopción Rápida Tecnológica:** Capacidad comprobada para aprender y desplegar nuevos stacks tecnológicos (Next.js 16, FastAPI, n8n, Salesforce Apex/LWC, Docker, Redis, Rust, Go) en cuestión de días para resolver desafíos operativos reales.

---

## HABILIDADES TÉCNICAS Y COMPETENCIAS

### 💼 Arquitectura Salesforce & CRM
Administración y Desarrollo en Salesforce (2023 - Presente), Sales Cloud, Service Cloud, Triggers y Controladores Apex, Componentes Web Lightning (LWC), Objetos Personalizados, Automatización de Procesos (Flows), APIs de Integración REST/SOAP, Modelos de Seguridad (RLS, FLS, Perfiles, Reglas de Compartición).

### 🤖 IA, Full-Stack & Sistemas de Automatización
- **Ingeniería de IA & Agentes:** AgentFlow, TermaAI, APIs de OpenAI y Claude LLM, Agentes de IA Autónomos, Tuberías RAG, LangChain, Bots de WhatsApp (Evolution API & Redis).
- **Full-Stack Web & Micro-SaaS:** Next.js (16/15), React 19/18, FastAPI, Flask, Node.js, Express, Tailwind CSS, PostgreSQL (incl. RLS), Supabase, NATS JetStream, Docker, Vercel, Render.
- **Desktop & Sistemas:** Tauri 2 (Rust + React), Playwright, E2E con WebDriver, CI/CD en GitHub Actions.
- **Lenguajes de Programación:** Python, TypeScript, JavaScript, Apex (Salesforce), SOQL/SOSL, SQL (PostgreSQL, SQLite), C, C++, Rust, Go, HTML5, CSS3 / Sass, Shell / Bash.

### ⚙️ Control de Versiones, DevOps & Sistemas
Flujos Avanzados en Git (Rebase Interactivo, Scripting de Commits, Filter-Repo), Pipelines CI/CD en GitHub Actions, Orquestación de contenedores Docker, FastVault (Gestor CLI de secretos en Rust), Gatekeeper-Proxy.

---

## EXPERIENCIA PROFESIONAL

### **Consultor Salesforce & Desarrollador CRM** — *Consultoría CRM Empresarial*  
*Enero 2023 – Presente | Remoto*
- **Lideré e implementé soluciones Salesforce de punta a punta** para clientes corporativos en Sales Cloud y Service Cloud, traduciendo requerimientos de negocio complejos en código Apex escalable, componentes LWC y automatizaciones avanzadas.
- **Desarrollé triggers Apex, clases batch y endpoints REST de integración** para conectar Salesforce con sistemas ERP, con mapeo de campos, validación y revisión de excepciones.
- Construí automatizaciones con Salesforce Flows y sincronización ERP para procesos de leads, oportunidades y servicio.
- Ejecuté migraciones y limpieza de datos CRM con Data Loader y SOQL, incluyendo validación y revisión de registros para conjuntos grandes.

### **Orkelya** — *Ingeniero Forward Deployed de IA & Fundador*  
*Junio 2025 – Presente | Remoto*
- Diseñé y desplegué `Orkelya.xyz`, una plataforma multilingüe de software y automatización con `Next.js`, `React`, `TypeScript` y `FastAPI` en Vercel y Render.
- Construí un backend para captura de leads con Supabase PostgreSQL y RLS, Cloudflare Turnstile, limitación de peticiones y verificación de origen.
- Integré flujos n8n self-hosted para procesar leads, apoyar el análisis de intención con IA y enviar notificaciones a CRM, email y WhatsApp.

### **Soluciones de Automatización para Agencias** — *Arquitecto de Automatizaciones & Integrador de Sistemas*  
*Marzo 2024 – Presente | Remoto*
- Diseñé e implementé 19+ flujos de automatización para operaciones de agencia con `n8n`, `Docker`, `Python`, `Redis` y APIs de Google Workspace: seguimiento de entregas, traspasos, onboarding, triaje, reportes y facturación.
- Desarrollé un asistente de WhatsApp B2B con Evolution API, Redis y OpenAI API para apoyar la calificación inicial de leads y el agendamiento.
- Desplegué instancias n8n self-hosted en contenedores Docker para flujos operativos diarios.

---

## PROYECTOS DESTACADOS Y SISTEMAS OPEN-SOURCE
Todo público en [github.com/tatitoxt](https://github.com/tatitoxt); las cifras de tests y CI están verificadas en el README y en los runs de CI de cada repo.

### **1. Aurora — Compañero de Música Ambiental para Escritorio**
App de escritorio multiplataforma (Tauri 2, núcleo en Rust, React + TypeScript) que sigue lo que suena: iluminación ambiental de bordes según la carátula, mini reproductor estilo liquid-glass, letras sincronizadas tipo karaoke, visualizador, estadísticas de escucha y playlists, más streaming de YouTube/SoundCloud. Tests de workspace en Rust, Vitest, Playwright y E2E con WebDriver en cada PR; incluye landing pública.  
- **Stack:** Rust, Tauri 2, React 18, TypeScript, Vite, GitHub Actions.

### **2. Salesforce Integration Gateway — Apex + LWC**
Framework de integración que conecta Salesforce con webhooks de pago y plataformas de facturación: verificación de firmas en webhooks, jobs asíncronos de conciliación, sincronización de facturación, consola de administración en LWC y un simulador completo de eventos para pruebas en sandbox. 70 métodos de test en Apex en 9 clases, más tests Jest.  
- **Stack:** Apex, Lightning Web Components, Salesforce DX, Jest.

### **3. Pipeline Clinic — Triaje de Fallos de CI**
Importa runs y logs de GitHub Actions, enmascara secretos, genera fingerprints determinísticos y agrupa fallos recurrentes con su explicación; triaje vía API HTTP, CLI y UI en React, con tokens de GitHub cifrados con Fernet en reposo. 116 tests pasan en SQLite y PostgreSQL + E2E con Playwright; cero vulnerabilidades conocidas.  
- **Stack:** Python 3.12, FastAPI, PostgreSQL/SQLite, React, Docker Compose.

### **4. Compose Doctor — Diagnóstico Offline de Docker Compose**
CLI en Go que carga un proyecto Compose igual que Docker Compose v2 (interpolación, merge keys, profiles, overrides multi-archivo) y reporta 17 clases de problemas sin ejecutar nada — sin Docker, red ni escritura de archivos. 156 tests incluyendo cobertura golden y fuzz.  
- **Stack:** Go, yaml.v3, staticcheck, govulncheck.

### **5. CargoDesk — Mesa de Operaciones Logísticas**
Plataforma de transporte de punta a punta: máquina de estados pedido → cotización → asignación → entrega, seguimiento de SLA, línea de tiempo auditable, RBAC y multi-tenancy. API en Go + UI en Next.js; tests unitarios + integración + 7 E2E con Playwright en CI.  
- **Stack:** Go, Next.js, TypeScript, PostgreSQL, Docker Compose.

### **6. Gatekeeper-Proxy — Reverse Proxy, WAF & Rate Limiter**
Reverse proxy en TypeScript/Node con firewall WAF, rate limiting de ventana deslizante, filtrado por CIDR y dashboard de telemetría de seguridad. Endurecido de punta a punta: corregidos spoofing de IP vía X-Forwarded-For, XSS persistente en el dashboard, API de administración sin autenticación, request smuggling y corrupción en recarga en caliente. 143 tests unitarios/de integración + 17 E2E.  
- **Stack:** TypeScript, Node.js, Docker, Playwright, Jest.

### **7. NeuraDash — Dashboard Analítico en Tiempo Real**
Dashboard multi-tenant en tiempo real: los servicios envían eventos a una API de ingesta, Postgres RLS + filtros explícitos por tenant aplican el aislamiento, y WebSockets empujan KPIs en vivo con resume/backfill. 73 tests (30 unitarios, 31 de integración, 12 Playwright) más un smoke test de compose en CI.  
- **Stack:** Next.js 16, React 19, TypeScript, WebSockets, PostgreSQL RLS.

### **8. ShipPulse — Pipeline de Releases Seguro**
Pipeline de releases en Go: solicitud de deploy → outbox transaccional → NATS JetStream → worker idempotente → sondas de salud → rollback automático a la última versión estable, con webhooks firmados, claves de idempotencia y log de auditoría de solo-escritura. 52 tests unitarios/de integración + Playwright sobre el stack en compose.  
- **Stack:** Go, NATS JetStream, PostgreSQL, Next.js, Docker Compose.

### **9. AgentFlow — Framework de IA y Agentes**
Framework tipado en Python 3.11+ para agentes con tool-calling: proveedores intercambiables (OpenAI, Anthropic, Groq) con reintentos, memoria vectorial (en memoria o KNN en Redis), trazado estructurado, delegación entre agentes y CLI. Corre completamente offline por defecto. 65 tests; ruff + mypy --strict.  
- **Stack:** Python, Pydantic, httpx, Redis, GitHub Actions.

### **10. TermaAI — Asistente Inteligente de Terminal**
Asistente interactivo de línea de comandos que genera, valida y ejecuta scripts Bash complejos de forma segura con comprobaciones dry-run en tiempo real y log de auditoría. 222 tests.  
- **Stack:** Python, Rich CLI, API de OpenAI, sandbox de seguridad shell.

### **Herramientas públicas adicionales**
- **Staff Suite Lite** — recurso MIT gratuito para FiveM: reportes de staff, cola de tickets y log de auditoría encadenado con SHA-256.
- **Import Preflight** — validación de CSV para CRM íntegramente en el navegador (7 tests automatizados; el archivo nunca sale del navegador).
- **FastVault** — CLI en Rust para secretos cifrados localmente (Argon2id + AES-256-GCM); en desarrollo, los tests del workspace pasan, sin auditoría de seguridad independiente.
- **DockNuke** — CLI en Go para revisar y limpiar recursos Docker, con modo dry-run.

---
## EDUCACIÓN Y APRENDIZAJE CONTINUO

- **Desarrollador Autodidacta Continuo** — *Desarrollo de software en producción, análisis de código open-source, arquitectura de historial Git y arquitectura de sistemas reales* (2022 - Presente)
- **Desarrollo e Ingeniería de Sistemas Salesforce** — *Práctica directa en Apex, LWC, SOQL & Arquitectura de Flows* (2023 - Presente)
- **Colegio Bartolomé Mitre** — *Título Secundario* (Buenos Aires, Argentina)

---

## IDIOMAS
- **Español:** Nativo / Bilingüe
- **Inglés:** Intermedio Avanzado (B2+)
