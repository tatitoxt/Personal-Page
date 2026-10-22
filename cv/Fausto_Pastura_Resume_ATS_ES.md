# FAUSTO PASTURA
**Sistemas a medida y automatización empresarial | Salesforce & CRM**  
Buenos Aires, Argentina | fausto@caldentech.llc  
[LinkedIn](https://www.linkedin.com/in/fausto-pastura-582828369/) | [Sitio Web](https://www.orkelya.xyz) | [GitHub](https://github.com/tatitoxt)

---

## RESUMEN PROFESIONAL
**Consultor Salesforce, Ingeniero Forward Deployed de IA (FDE) e Integrador de Sistemas** enfocado en desarrollar sistemas y software a medida para empresas, además de automatizaciones con o sin IA. Más de 3 años de trabajo práctico en CRM empresarial, migraciones de datos, integraciones, plataformas web, herramientas para desarrolladores y 19+ flujos n8n para operaciones de negocio. Trabajo desde el relevamiento del proceso hasta la implementación, las pruebas y la documentación para que los equipos puedan mantener sus sistemas.

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
- **Full-Stack Web & Micro-SaaS:** Next.js (16/15), React 19, FastAPI, Flask, Node.js, Express, Tailwind CSS, PostgreSQL, Supabase RLS, Docker, Vercel, Render.
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

### **1. Import Preflight — Validación local de CSV para CRM**
Herramienta web para mapear campos de contactos, detectar emails ausentes o mal formados, marcar direcciones duplicadas y exportar filas listas y para revisar. El CSV permanece en el navegador y la app no se conecta a una API de CRM. Incluye 7 pruebas automatizadas (módulos ES de JavaScript, test runner de Node y GitHub Actions).

### **2. AgentFlow — Framework de IA y Agentes**
Framework ligero en Python diseñado para orquestar agentes de IA multimodales con memoria vectorial persistente, tuberías de ejecución de herramientas y bucles de razonamiento autónomo.  
- **Impacto & Stack:** Python, LangChain, APIs de OpenAI/Claude, Redis, Vector Embeddings.

### **3. TermaAI — Asistente Inteligente de Terminal**
Asistente interactivo de línea de comandos que genera, valida y ejecuta scripts complejos en Bash y Shell de forma segura directamente en la terminal con comprobaciones previas.  
- **Impacto & Stack:** Python, Rich CLI, API de OpenAI, Sandbox de Seguridad Shell.

### **4. FastVault — Gestor Encriptado de Secretos en CLI**
CLI en Rust para guardar secretos cifrados localmente y entregarlos a procesos sin escribirlos en un archivo .env. Usa Argon2id para derivar claves y AES-256-GCM para cifrar.
- **Estado:** En desarrollo; cargo test --workspace pasa (5 pruebas); sin auditoría de seguridad independiente.

### **5. Gatekeeper-Proxy — Reverse Proxy Dinámico, WAF & Rate Limiter**
Reverse Proxy dinámico y motor Firewall WAF construido en TypeScript & Node.js con rate limiting de ventana deslizante, recarga de configuración en caliente, filtrado por IP/CIDR y dashboard de telemetría de seguridad en tiempo real.  
- **Impacto & Stack:** TypeScript, Node.js (v22+), WAF Engine, Sliding-Window Rate Limiter, Docker.

### **6. DockNuke — Utilidad de Limpieza Inteligente y Optimización de Docker en Go**
Utilidad de línea de comandos en Go de alto rendimiento para escaneo inteligente, previsualización en modo dry-run, filtrado de retención y optimización de espacio en disco en contenedores, imágenes, volúmenes y cachés de Docker.  
- **Impacto & Stack:** Go (1.22+), SDK Engine Docker, Cobra CLI, Concurrencia, Motor Dry-Run.

### **7. NeuraDash — Dashboard Analítico en Tiempo Real**
Dashboard analítico full-stack con telemetría en vivo vía WebSockets, visualizaciones de datos reactivas y control de acceso multitenant.  
- **Impacto & Stack:** Next.js 16, React 19, TypeScript, WebSockets, TailwindCSS, PostgreSQL.

### **8. Suite Operativa de Automatización para Agencias (n8n & Docker)**
Diseño y despliegue de una suite de 19 flujos de automatización en n8n alojados en contenedores Docker self-hosted con persistencia SQLite/PostgreSQL. Automatización del seguimiento del estado de entregas a clientes, traspasos de proyectos, onboarding, triaje y facturación.  
- **Alcance del proyecto:** 19 flujos n8n para seguimiento de entregas, traspasos, onboarding, triaje y facturación, con Docker y persistencia SQLite/PostgreSQL.

### **9. Plataforma B2B de Agentes de IA & Custom Service (`orkelya.xyz`)**
Plataforma B2B y landing profesional para presentar agentes de IA y automatizaciones de Custom Service. Incluye catálogo de soluciones B2B, páginas detalladas, soporte para demos Loom, asistente interactivo de ayuda, formulario conectado a FastAPI y diseño responsive.  
- **Stack tecnológico:** Sitio web: `orkelya.xyz`. Next.js, React, TypeScript, FastAPI, Supabase PostgreSQL con RLS y Cloudflare Turnstile.

### **10. Pasarela de Integración Empresarial para Salesforce**
Desarrollo de un framework personalizado de integración en Apex y Lightning Web Components (LWC) que conecta Salesforce CRM con webhooks de pago y plataformas de facturación automatizada.  
- **Alcance del proyecto:** Integración de Salesforce Apex y LWC con webhooks de pago y plataformas de facturación para sincronizar registros y reducir conciliaciones manuales.

---
## EDUCACIÓN Y APRENDIZAJE CONTINUO

- **Desarrollador Autodidacta Continuo** — *Desarrollo de software en producción, análisis de código open-source, arquitectura de historial Git y arquitectura de sistemas reales* (2022 - Presente)
- **Desarrollo e Ingeniería de Sistemas Salesforce** — *Práctica directa en Apex, LWC, SOQL & Arquitectura de Flows* (2023 - Presente)
- **Colegio Bartolomé Mitre** — *Título Secundario* (Buenos Aires, Argentina)

---

## IDIOMAS
- **Español:** Nativo / Bilingüe
- **Inglés:** Intermedio Avanzado (B2+)
