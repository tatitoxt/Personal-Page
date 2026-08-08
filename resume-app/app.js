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
**Salesforce Consultant & Forward Deployed AI Engineer**
Buenos Aires, Argentina | fausto@caldentech.llc
LinkedIn: https://www.linkedin.com/in/fausto-pastura-582828369/ | Website: https://www.orkelya.xyz | GitHub: https://github.com/tatitoxt

---

## PROFESSIONAL SUMMARY
Results-driven Salesforce Consultant and Forward Deployed AI Engineer (FDE) with a strong engineering philosophy rooted in learning by doing (self-taught the hard way). Over 3 years of hands-on expertise building enterprise CRM solutions, autonomous AI agents, multi-tenant cloud platforms, developer CLI systems, and large-scale workflow automations.

---

## TECHNICAL SKILLS & COMPETENCIES
- **Salesforce / CRM:** Salesforce Administration & Development (2023 - Present), Sales Cloud, Service Cloud, Apex Triggers & Controllers, Lightning Web Components (LWC), Flow Automation, REST/SOAP Integration APIs.
- **AI, Agent & Developer Tooling:** AgentFlow, TermaAI, FastVault (Rust), n8n Workflow Architecture, OpenAI/Claude LLM APIs, Autonomous AI Agents, RAG Pipelines, LangChain, Redis.
- **Full-Stack & Cloud Frameworks:** Next.js 16/15, React 19, FastAPI, Node.js, Express, Tailwind CSS, Supabase, PostgreSQL RLS, Docker, Vercel, Render.
- **Programming Languages:** Python, TypeScript, JavaScript, Apex (Salesforce), SOQL, SOSL, SQL, C, C++, Rust, Go, HTML5, CSS3/SASS, Shell / Bash.

---

## PROFESSIONAL EXPERIENCE

### Salesforce Consultant & CRM Developer — Enterprise CRM Consulting
*January 2023 – Present | Remote*
- Engineered end-to-end Salesforce solutions across Sales Cloud and Service Cloud with custom Apex code, LWC, and Flows, reducing manual CRM data errors by 90%+ and saving 15+ team hours weekly.

### Orkelya — Founding Forward Deployed AI Engineer
*June 2025 – Present | Remote*
- Architected and deployed Orkelya.xyz, an enterprise multi-language AI Agent & Automation platform utilizing Next.js 16, React 19, TypeScript, and FastAPI hosted on Vercel and Render (<800ms load speeds).

### Agency Solutions & Automation Consulting — Lead Automation Architect
*March 2024 – Present | Remote*
- Engineered 19+ production-ready end-to-end agency automation workflows using n8n and self-hosted Docker containers, cutting agency operational overhead by 70%+.

---

## FEATURED OPEN-SOURCE & SYSTEMS PROJECTS
- **AgentFlow:** Multimodal AI agent framework with vector memory & autonomous tool-execution loops (Python, LangChain, OpenAI, Redis).
- **TermaAI:** Interactive command-line terminal AI assistant for safe Bash script generation (Python, Rich CLI, OpenAI).
- **FastVault (tatitoxt/fastvault):** Production-grade local-first secrets manager in Rust with AES-256-GCM AEAD, Argon2id KDF, DEK/KEK key wrapping, Tokio IPC daemon, process environment injection (`fastvault run`), and Ratatui TUI.
- **Gatekeeper-Proxy:** Dynamic reverse proxy with WAF security firewall & sliding-window rate limiting (TypeScript, Node.js, Docker).
- **NeuraDash:** Real-time WebSocket analytics dashboard (Next.js 16, React 19, WebSockets, PostgreSQL).`;

    const rawMarkdownES = `# FAUSTO PASTURA
**Consultor Salesforce & Ingeniero Forward Deployed de IA**
Buenos Aires, Argentina | fausto@caldentech.llc
LinkedIn: https://www.linkedin.com/in/fausto-pastura-582828369/ | Sitio Web: https://www.orkelya.xyz | GitHub: https://github.com/tatitoxt

---

## RESUMEN PROFESIONAL
Consultor Salesforce e Ingeniero Forward Deployed de IA (FDE) con una sólida filosofía de ingeniería fundamentada en el aprendizaje autodidacta a través de la práctica directa (self-taught the hard way). Más de 3 años de experiencia construyendo soluciones CRM empresariales, agentes autónomos de IA, plataformas cloud multitenant, herramientas CLI para desarrolladores y automatizaciones de flujos de trabajo a gran escala.

---

## PROYECTOS Y SISTEMAS OPEN-SOURCE DESTACADOS
- **AgentFlow:** Framework de agentes de IA multimodales con memoria vectorial y ejecución autónoma (Python, LangChain, OpenAI, Redis).
- **TermaAI:** Asistente interactivo de terminal para generación segura de scripts en Bash (Python, Rich CLI, OpenAI).
- **FastVault (tatitoxt/fastvault):** Gestor local-first de secretos de nivel producción en Rust con AES-256-GCM AEAD, Argon2id KDF, envoltura de claves DEK/KEK, daemon IPC en Tokio, inyección de entorno (`fastvault run`) y TUI en Ratatui.
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
