// ==========================================================================
// FAUSTO PASTURA — VINTAGE LIGHT SWAG AESTHETIC ENGINE
// Theme: Vintage Light Paper Canvas with Animated Graph Paper Grid
// Features: Light Theme, Tactile Shadows, Camera OSD Header, EN/ES & ATS View
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
  const body = document.body;
  const btnViewPortfolio = document.getElementById('btnViewPortfolio');
  const btnViewATS = document.getElementById('btnViewATS');
  const btnLangEN = document.getElementById('btnLangEN');
  const btnLangES = document.getElementById('btnLangES');
  const btnCopyMD = document.getElementById('btnCopyMD');
  const btnPrintPDF = document.getElementById('btnPrintPDF');
  const toast = document.getElementById('toast');

  // ==========================================================================
  // ANIMATED VINTAGE LIGHT GRAPH PAPER CANVAS
  // ==========================================================================
  const canvas = document.getElementById('vintageCanvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let width, height;
    let time = 0;

    let mouse = { x: -1000, y: -1000 };
    window.addEventListener('mousemove', (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    });

    function resize() {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    }

    window.addEventListener('resize', resize);
    resize();

    // Floating Crosshairs
    const crosshairs = [];
    for (let i = 0; i < 12; i++) {
      crosshairs.push({
        x: Math.random(),
        y: Math.random(),
        size: 5 + Math.random() * 6,
        pulseSpeed: 0.02 + Math.random() * 0.03,
        phase: Math.random() * Math.PI * 2
      });
    }

    function renderVintageCanvas() {
      time += 0.012;
      ctx.clearRect(0, 0, width, height);

      const gridSize = 40;
      const cols = Math.ceil(width / gridSize) + 1;
      const rows = Math.ceil(height / gridSize) + 1;

      // Graph Paper Grid Lines (Warm Dark Subdued)
      ctx.strokeStyle = 'rgba(17, 17, 19, 0.05)';
      ctx.lineWidth = 1;

      ctx.beginPath();
      for (let c = 0; c < cols; c++) {
        const x = c * gridSize;
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
      }
      for (let r = 0; r < rows; r++) {
        const y = r * gridSize;
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
      }
      ctx.stroke();

      // Intersection points
      for (let c = 0; c < cols; c++) {
        for (let r = 0; r < rows; r++) {
          const gx = c * gridSize;
          const gy = r * gridSize;
          const dist = Math.hypot(gx - mouse.x, gy - mouse.y);
          const wave = Math.sin(time + (c + r) * 0.2);

          if (dist < 140) {
            ctx.fillStyle = 'rgba(2, 132, 199, 0.35)';
            ctx.fillRect(gx - 1.5, gy - 1.5, 3, 3);
          } else if ((c + r) % 4 === 0 && wave > 0.7) {
            ctx.fillStyle = 'rgba(17, 17, 19, 0.15)';
            ctx.fillRect(gx - 1, gy - 1, 2, 2);
          }
        }
      }

      // Floating Crosshairs (+)
      crosshairs.forEach(ch => {
        const cx = ch.x * width;
        const cy = ch.y * height;
        const opacity = 0.12 + Math.sin(time * ch.pulseSpeed + ch.phase) * 0.08;

        ctx.strokeStyle = `rgba(17, 17, 19, ${opacity})`;
        ctx.lineWidth = 1.2;

        ctx.beginPath();
        ctx.moveTo(cx - ch.size, cy);
        ctx.lineTo(cx + ch.size, cy);
        ctx.moveTo(cx, cy - ch.size);
        ctx.lineTo(cx, cy + ch.size);
        ctx.stroke();

        if (ch.phase > 3) {
          ctx.fillStyle = `rgba(17, 17, 19, ${opacity * 0.9})`;
          ctx.font = '9px JetBrains Mono, monospace';
          ctx.fillText(`+${Math.round(cx)},${Math.round(cy)}`, cx + 8, cy - 4);
        }
      });

      requestAnimationFrame(renderVintageCanvas);
    }

    requestAnimationFrame(renderVintageCanvas);
  }

  // VIEW SWITCHING
  btnViewPortfolio.addEventListener('click', () => {
    body.classList.remove('mode-ats');
    body.classList.add('mode-portfolio');
    btnViewPortfolio.classList.add('active');
    btnViewATS.classList.remove('active');
  });

  btnViewATS.addEventListener('click', () => {
    body.classList.remove('mode-portfolio');
    body.classList.add('mode-ats');
    btnViewATS.classList.add('active');
    btnViewPortfolio.classList.remove('active');
  });

  // LANGUAGE SWITCHING
  btnLangEN.addEventListener('click', () => setLanguage('en'));
  btnLangES.addEventListener('click', () => setLanguage('es'));

  function setLanguage(lang) {
    if (lang === 'en') {
      body.classList.remove('lang-es');
      body.classList.add('lang-en');
      btnLangEN.classList.add('active');
      btnLangES.classList.remove('active');
      updateTranslatableElements('en');
    } else {
      body.classList.remove('lang-en');
      body.classList.add('lang-es');
      btnLangES.classList.add('active');
      btnLangEN.classList.remove('active');
      updateTranslatableElements('es');
    }
  }

  function updateTranslatableElements(lang) {
    const translatable = document.querySelectorAll('[data-en][data-es]');
    translatable.forEach(el => {
      const text = el.getAttribute(`data-${lang}`);
      if (text) {
        el.textContent = text;
      }
    });
  }

  // PRINT / DOWNLOAD PDF
  btnPrintPDF.addEventListener('click', () => {
    window.print();
  });

  // COPY MARKDOWN TO CLIPBOARD
  btnCopyMD.addEventListener('click', async () => {
    const isSpanish = body.classList.contains('lang-es');

    const rawMarkdownEN = `# FAUSTO PASTURA
**Software & Systems Builder | Salesforce & CRM Consultant | Forward Deployed Engineer (FDE) | Automation**
Buenos Aires, Argentina | fausto@caldentech.llc
LinkedIn: https://www.linkedin.com/in/fausto-pastura-582828369/ | Website: https://www.orkelya.xyz | GitHub: https://github.com/tatitoxt

---

## PROFESSIONAL SUMMARY
Self-taught software and systems builder, Salesforce & CRM consultant, and Forward Deployed Engineer (FDE). I build custom business software, integrations, and workflow automations with or without AI, from process discovery through implementation and handoff. My 3+ years of hands-on work include CRM, web platforms, developer tools, and 19+ n8n workflows.

---

## TECHNICAL SKILLS & COMPETENCIES
- **Salesforce / CRM:** Salesforce Administration & Development (2023 - Present), Sales Cloud, Service Cloud, Apex Triggers & Controllers, Lightning Web Components (LWC), Flow Automation, REST/SOAP Integration APIs.
- **AI, Agent & Developer Tooling:** AgentFlow, TermaAI, FastVault (Rust), n8n Workflow Architecture, OpenAI/Claude LLM APIs, Autonomous AI Agents, RAG Pipelines, LangChain, Redis.
- **Full-Stack & Cloud Frameworks:** Next.js 16/15, React 19, FastAPI, Node.js, Express, Tailwind CSS, Supabase, PostgreSQL RLS, Docker, Vercel, Render.
- **Programming Languages:** Python, TypeScript, JavaScript, Apex (Salesforce), SOQL, SOSL, SQL, C, C++, Rust, Go, HTML5, CSS3/SASS, Shell / Bash.

---

## PROFESSIONAL EXPERIENCE

### Independent Consultant, CRM & Automation
*January 2023 – December 2025 | Buenos Aires, Argentina*

Client engagements overlapped as part of independent consulting.

- **Orkelya — Founder & Lead Engineer (March 2024 – Present):** Built a B2B software and automation platform with Next.js, React, FastAPI, and Supabase. Founder and engineering work continued in 2026.
- **CRM implementations and migrations (2023 – 2025):** Reduced manual CRM data-entry errors by 90% and saved 15+ team hours per week.
- **Automation and AI engagements (2024 – 2025):** Designed 19+ n8n workflows that cut partner operational overhead by 70%. WhatsApp lead-qualification agents automated 80% of initial qualification and improved response speed by 35%.
- **B2B services company, 12-person team — United States (May 2024 – December 2025; concurrent client engagement):** Set up the Salesforce org from scratch, then designed and built a custom system for the client.
- **B2C company, 23-person team — United States (2023):** Set up and administered Salesforce, including reports, Apex-based workflows, and page layouts. Later coordinated the migration of 56,000 records from Salesforce to another CRM, including data preparation and quality validation.
- Client names withheld where required by confidentiality.

---

## FEATURED OPEN-SOURCE & SYSTEMS PROJECTS
- **Import Preflight:** Browser-only CSV preflight for CRM imports. Maps contact fields, checks email presence and format, flags duplicate addresses, and exports ready and review rows. Includes 7 automated tests; no CRM API or server upload.
- **AgentFlow:** Multimodal AI agent framework with vector memory & autonomous tool-execution loops (Python, LangChain, OpenAI, Redis).
- **TermaAI:** Interactive command-line terminal AI assistant for safe Bash script generation (Python, Rich CLI, OpenAI).
- **FastVault:** Rust CLI for encrypted local secrets. In development; cargo test --workspace passes (5 tests); no independent security audit.
- **Gatekeeper-Proxy:** Dynamic reverse proxy with WAF security firewall & sliding-window rate limiting (TypeScript, Node.js, Docker).
- **NeuraDash:** Real-time WebSocket analytics dashboard (Next.js 16, React 19, WebSockets, PostgreSQL).`;

    const rawMarkdownES = `# FAUSTO PASTURA
**Desarrollo de software y sistemas | Consultoría Salesforce y CRM | Forward Deployed Engineer (FDE) | Automatización**
Buenos Aires, Argentina | fausto@caldentech.llc
LinkedIn: https://www.linkedin.com/in/fausto-pastura-582828369/ | Sitio Web: https://www.orkelya.xyz | GitHub: https://github.com/tatitoxt

---

## RESUMEN PROFESIONAL
Autodidacta, desarrollador de software y sistemas a medida, consultor de Salesforce y CRM, e ingeniero Forward Deployed (FDE). Construyo software empresarial, integraciones y automatizaciones con o sin IA, desde el relevamiento hasta la implementación y transferencia. Mi experiencia práctica incluye CRM, plataformas web, herramientas para desarrolladores y más de 19 flujos n8n.

---

## EXPERIENCIA PROFESIONAL

### Consultor independiente de CRM y automatización
*Enero 2023 – Diciembre 2025 | Buenos Aires, Argentina*

Los proyectos con clientes se realizaron en paralelo dentro de la consultoría independiente.

- **Orkelya — Fundador y líder técnico (marzo 2024 – presente):** Construí una plataforma B2B de software y automatización con Next.js, React, FastAPI y Supabase. El trabajo de fundador y desarrollo continuó en 2026.
- **Implementaciones y migraciones de CRM (2023 – 2025):** Reduje los errores manuales de datos en CRM un 90% y ahorré más de 15 horas semanales al equipo.
- **Proyectos de automatización e IA (2024 – 2025):** Diseñé más de 19 flujos n8n que redujeron un 70% la carga operativa de los partners. Agentes de calificación por WhatsApp automatizaron el 80% de la calificación inicial y mejoraron un 35% la velocidad de respuesta.
- **Empresa de servicios B2B, equipo de 12 personas — Estados Unidos (mayo 2024 – diciembre 2025; engagement en paralelo):** Configuré Salesforce desde cero y luego diseñé y construí un sistema a medida para la empresa.
- **Empresa B2C, equipo de 23 personas — Estados Unidos (2023):** Configuré y administré Salesforce, incluidos reportes, flujos con Apex y diseños de página. Luego coordiné la migración de 56.000 registros desde Salesforce a otro CRM, incluida la preparación y validación de calidad de los datos.
- Omito los nombres de clientes cuando lo requiere la confidencialidad.

---

## PROYECTOS Y SISTEMAS OPEN-SOURCE DESTACADOS
- **Import Preflight:** Preflight de CSV en el navegador para importaciones a CRM. Mapea campos, valida presencia y formato de email, marca duplicados y exporta filas listas y para revisar. Incluye 7 pruebas automatizadas; no usa API de CRM ni sube el archivo.
- **AgentFlow:** Framework de agentes de IA multimodales con memoria vectorial y ejecución autónoma (Python, LangChain, OpenAI, Redis).
- **TermaAI:** Asistente interactivo de terminal para generación segura de scripts en Bash (Python, Rich CLI, OpenAI).
- **FastVault:** CLI en Rust para secretos cifrados localmente. En desarrollo; cargo test --workspace pasa (5 pruebas); sin auditoría de seguridad independiente.
- **Gatekeeper-Proxy:** Reverse proxy dinámico con firewall WAF de seguridad y rate limiting de ventana deslizante (TypeScript, Node.js, Docker).
- **NeuraDash:** Dashboard analítico en tiempo real vía WebSockets (Next.js 16, React 19, WebSockets, PostgreSQL).`;

    const textToCopy = isSpanish ? rawMarkdownES : rawMarkdownEN;

    try {
      await navigator.clipboard.writeText(textToCopy);
      showToast(isSpanish ? '¡Markdown copiado al portapapeles!' : 'Markdown copied to clipboard!');
    } catch (err) {
      showToast('Copy failed. Please copy manually.');
    }
  });

  function showToast(msg) {
    toast.textContent = msg;
    toast.classList.remove('hidden');
    setTimeout(() => {
      toast.classList.add('hidden');
    }, 3000);
  }

  // ==========================================================================
  // REAL-TIME OSD CAMERA REC TIMER
  // ==========================================================================
  const recIndicator = document.getElementById('recIndicator');
  if (recIndicator) {
    let secondsElapsed = 0;
    
    function formatTime(totalSeconds) {
      const hrs = Math.floor(totalSeconds / 3600);
      const mins = Math.floor((totalSeconds % 3600) / 60);
      const secs = totalSeconds % 60;
      
      const pad = (num) => String(num).padStart(2, '0');
      return `● REC ${pad(hrs)}:${pad(mins)}:${pad(secs)}`;
    }

    setInterval(() => {
      secondsElapsed++;
      recIndicator.textContent = formatTime(secondsElapsed);
    }, 1000);
  }
});
