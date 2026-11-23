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

## FEATURED SYSTEMS PROJECTS

Salesforce Integration Gateway (Salesforce DX, Apex, LWC, Jest): Signed webhooks, async reconciliation, billing sync and admin console; 70 Apex test methods across 9 classes.
AgentFlow (Python 3.11+, pytest): Framework for tool-calling agents with pluggable providers, vector memory, tracing and handoff; 65 tests; mypy strict.
CargoDesk (Go, Next.js): Logistics operations desk with request-to-quote-to-assignment-to-delivery state machine, SLA, auditable timeline, RBAC and multi-tenancy; unit, integration and 7 Chromium E2E tests.
Gatekeeper Proxy (TypeScript): Reverse proxy with WAF, rate limiting and security dashboard; 143 unit/integration tests + 17 E2E tests.
Pipeline Clinic (Python, FastAPI, React, SQLite, PostgreSQL): GitHub Actions failure triage with fingerprinting and secret redaction through API, CLI and UI; 116 tests across SQLite and PostgreSQL, plus Playwright.
NeuraDash (Next.js, React, WebSockets, PostgreSQL RLS): Real-time multi-tenant analytics dashboard; 73 tests.`;

    const rawMarkdownES = `# FAUSTO PASTURA

## PROYECTOS DESTACADOS

Salesforce Integration Gateway (Salesforce DX, Apex, LWC, Jest): Webhooks firmados, conciliación asíncrona, sincronización de facturación y consola administrativa; 70 métodos de prueba Apex en 9 clases.
AgentFlow (Python 3.11+, pytest): Framework de agentes con tool calling, providers intercambiables, memoria vectorial, tracing y handoff; 65 tests; mypy strict.
CargoDesk (Go, Next.js): Mesa de operaciones logísticas con máquina de estados solicitud-a-cotización-a-asignación-a-entrega, SLA, timeline auditable, RBAC y multitenancy; unit, integration and 7 Chromium E2E tests.
Gatekeeper Proxy (TypeScript): Reverse proxy con WAF, rate limiting y dashboard de seguridad; 143 pruebas unitarias/de integración + 17 E2E.
Pipeline Clinic (Python, FastAPI, React, SQLite, PostgreSQL): Triage de fallas de GitHub Actions con fingerprinting y redacción de secretos, mediante API, CLI y UI; 116 tests en SQLite y PostgreSQL, más Playwright.
NeuraDash (Next.js, React, WebSockets, PostgreSQL RLS): Dashboard de analítica multitenant en tiempo real; 73 tests.`;

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
