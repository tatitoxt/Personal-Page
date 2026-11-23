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

Aurora (Tauri 2, Rust, React 18, TypeScript): Floating music HUD with synced lyrics and native playback; test counts documented in its README.
Salesforce Integration Gateway (Salesforce DX, Apex, LWC, Jest): Signed payment webhooks, asynchronous reconciliation, billing sync and admin console; 15 LWC Jest + 28 simulator unit/integration + 1 simulator E2E passing; 75 Apex test methods in 10 classes, not executed in a Salesforce org.
AgentFlow (Python 3.11+, pytest, Redis, pgvector): Tool-calling agents with pluggable providers, vector memory, tracing and handoffs; 148 automated tests passing in CI; 6 live provider smoke tests opt-in; mypy strict.
CargoDesk (Go, Next.js, TypeScript, PostgreSQL, Playwright): Logistics operations desk with SLA tracking, auditable timeline, RBAC and multi-tenancy; 185 Go unit/integration tests passing and 13 Chromium E2E tests passing.
Gatekeeper Proxy (TypeScript, Node.js, Jest, Playwright, Redis): Reverse proxy with WAF, rate limiting and security dashboard; 183 Jest unit/integration + 20 process E2E + 1 dashboard Playwright test passing; 4 Redis integration tests require Redis.
Pipeline Clinic (Python, FastAPI, React, TypeScript, SQLite, PostgreSQL, Playwright): GitHub Actions failure triage with fingerprinting and secret redaction through API, CLI and UI; README documents SQLite/PostgreSQL and Playwright suites without a total test count.
NeuraDash (Next.js, React, TypeScript, WebSockets, PostgreSQL RLS, Playwright): Real-time multi-tenant analytics dashboard; 39 unit + 78 PostgreSQL integration + 12 Chromium E2E tests passing.`;

    const rawMarkdownES = `# FAUSTO PASTURA

## PROYECTOS DESTACADOS

Aurora (Tauri 2, Rust, React 18, TypeScript): HUD musical flotante con letras sincronizadas y reproducción nativa; conteos de pruebas documentados en su README.
Salesforce Integration Gateway (Salesforce DX, Apex, LWC, Jest): Webhooks de pago firmados, conciliación asíncrona, sincronización de facturación y consola administrativa; 15 pruebas LWC Jest + 28 unitarias/de integración del simulador + 1 E2E del simulador pasando; 75 métodos Apex en 10 clases, no ejecutados en una org Salesforce.
AgentFlow (Python 3.11+, pytest, Redis, pgvector): Agentes con tool calling, providers intercambiables, memoria vectorial, trazas y handoffs; 148 pruebas automatizadas pasando en CI; 6 pruebas live de providers opt-in; mypy estricto.
CargoDesk (Go, Next.js, TypeScript, PostgreSQL, Playwright): Mesa logística con SLA, timeline auditable, RBAC y multitenancy; 185 pruebas Go unitarias/de integración y 13 E2E Chromium pasando.
Gatekeeper Proxy (TypeScript, Node.js, Jest, Playwright, Redis): Reverse proxy con WAF, rate limiting y dashboard de seguridad; 183 Jest unitarias/de integración + 20 E2E de procesos + 1 prueba Playwright del dashboard pasando; 4 pruebas Redis requieren Redis.
Pipeline Clinic (Python, FastAPI, React, TypeScript, SQLite, PostgreSQL, Playwright): Triage de fallas de GitHub Actions con fingerprinting y redacción de secretos, mediante API, CLI y UI; README documenta suites SQLite/PostgreSQL y Playwright, sin indicar un total.
NeuraDash (Next.js, React, TypeScript, WebSockets, PostgreSQL RLS, Playwright): Dashboard de analítica multitenant en tiempo real; 39 pruebas unitarias + 78 de integración con PostgreSQL + 12 E2E Chromium pasando.`;

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
