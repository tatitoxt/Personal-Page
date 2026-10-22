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
**Salesforce Consultant | Custom Business Software & Automation**
Buenos Aires, Argentina | fausto@caldentech.llc
[LinkedIn](https://www.linkedin.com/in/fausto-pastura-582828369/) | [Website](https://www.orkelya.xyz) | [GitHub](https://github.com/tatitoxt)

## PROFESSIONAL SUMMARY
I build custom software and systems for businesses, and automate workflows with or without AI. My work spans CRM processes, integrations, and operations: I map the workflow, implement a solution, and document how to maintain it. Hands-on experience with Salesforce, APIs, workflow automation, and web applications.

## CORE SKILLS
- **CRM:** Salesforce, Sales Cloud, Service Cloud, Apex, LWC, Flows, SOQL, Attio.
- **Integration and automation:** REST APIs, n8n, Docker, webhooks, and rule-based or AI-assisted workflows.
- **Development:** Python, FastAPI, JavaScript, TypeScript, Go, Rust, HTML, CSS, and SQL.
- **Quality and tools:** Git, GitHub Actions, automated testing, technical documentation.

## EXPERIENCE

### Salesforce and CRM Consultant — Independent Consulting
*January 2023 – Present | Remote*
- Implement CRM solutions with Apex, LWC, Flows, and SOQL for sales and service processes.
- Work on integrations and data migrations, including field mapping, validation, and record review.

### Orkelya — Custom Software and Automation
*June 2025 – Present | Remote*
- Design and build custom business software and integrations.
- Implement workflows with explicit rules or AI depending on the problem, with human review where judgment is required.

### Automation Consultant
*March 2024 – Present | Remote*
- Design n8n and API workflows that connect tools and reduce manual work.
- Document each automation's steps, inputs, expected errors, and limits.

## SELECTED PROJECTS

### Import Preflight — Local CRM CSV checks
Browser-based tool for mapping columns, finding missing or malformed emails, and flagging duplicates before an import. It exports ready and review rows; the source file is not sent to a server. Includes 7 Node.js tests and a passing GitHub Actions workflow.
[Source](https://github.com/tatitoxt/crm-import-preflight)

### Orkelya Content Engine — Routing and QA prototype
Python/FastAPI prototype with deterministic format routing, nine computed signals, basic copy checks, and sample HTML/SVG generation. Its publishing output is simulated: no social integrations, job queue, vector database, or analytics feedback loop is connected. 11 tests passed locally with sample environment variables.
[Source and current scope](https://github.com/tatitoxt/Personal-Page)

### FastVault — Local encrypted secrets CLI
Rust tool for storing local secrets and passing them to processes. In development; 5 workspace tests pass. It has not received an independent security audit.
[Source](https://github.com/tatitoxt/fastvault)

### DockNuke — Docker resource cleanup
Go CLI for reviewing and cleaning Docker resources, with a preview before applying changes. \`go test ./...\` passed during this review.
[Source](https://github.com/tatitoxt/docknuke)

## EDUCATION
- Bartolomé Mitre Day School — High School Diploma, Buenos Aires, Argentina.

## LANGUAGES
- Spanish: Native.
- English: Upper-intermediate (B2+).`;

    const rawMarkdownES = `# FAUSTO PASTURA
**Consultor Salesforce | Sistemas a medida y automatización empresarial**
Buenos Aires, Argentina | fausto@caldentech.llc
[LinkedIn](https://www.linkedin.com/in/fausto-pastura-582828369/) | [Sitio web](https://www.orkelya.xyz) | [GitHub](https://github.com/tatitoxt)

## RESUMEN PROFESIONAL
Desarrollo sistemas y software a medida para empresas y automatizaciones con o sin IA. Trabajo con procesos de CRM, integraciones y operaciones: relevo el flujo, diseño una solución, la implemento y documento cómo mantenerla. Experiencia práctica con Salesforce, APIs, automatización de procesos y aplicaciones web.

## COMPETENCIAS
- **CRM:** Salesforce, Sales Cloud, Service Cloud, Apex, LWC, Flows, SOQL, Attio.
- **Integración y automatización:** APIs REST, n8n, Docker, webhooks y automatización basada en reglas o IA.
- **Desarrollo:** Python, FastAPI, JavaScript, TypeScript, Go, Rust, HTML, CSS y SQL.
- **Calidad y herramientas:** Git, GitHub Actions, pruebas automatizadas, documentación técnica.

## EXPERIENCIA

### Consultor Salesforce y CRM — Consultoría independiente
*Enero 2023 – Presente | Remoto*
- Implemento soluciones de CRM con Apex, LWC, Flows y SOQL para adaptar procesos comerciales y de servicio.
- Trabajo en integraciones y migraciones de datos, incluyendo mapeo de campos, validación y revisión de registros.

### Orkelya — Sistemas a medida y automatización
*Junio 2025 – Presente | Remoto*
- Diseño y desarrollo software a medida e integraciones para procesos de negocio.
- Implemento automatizaciones con reglas explícitas o IA según el problema, con revisión humana cuando la tarea requiere criterio.

### Consultor de automatización
*Marzo 2024 – Presente | Remoto*
- Diseño flujos con n8n y APIs para conectar herramientas y reducir trabajo manual.
- Documento los pasos, entradas, errores esperados y límites de cada automatización.

## PROYECTOS DESTACADOS

### Import Preflight — Validación local de CSV para CRM
Herramienta en navegador para mapear columnas, detectar emails faltantes o inválidos y señalar duplicados antes de una importación. Exporta filas listas y filas para revisar; el archivo no se envía a un servidor. Incluye 7 pruebas de Node.js y un workflow de GitHub Actions aprobado.
[Código](https://github.com/tatitoxt/crm-import-preflight)

### Orkelya Content Engine — Prototipo de ruteo y QA de contenido
Prototipo en Python/FastAPI con ruteo determinístico, nueve señales calculadas, validaciones básicas de copy y generación de muestras HTML/SVG. La salida de publicación es simulada: no hay conexión a redes, cola de trabajos, base vectorial ni ciclo de analítica. 11 pruebas pasaron localmente con variables de entorno de ejemplo.
[Código y alcance actual](https://github.com/tatitoxt/Personal-Page)

### FastVault — CLI local de secretos cifrados
Herramienta en Rust para guardar secretos localmente y entregarlos a procesos. En desarrollo; 5 pruebas del workspace pasan. No cuenta con auditoría de seguridad independiente.
[Código](https://github.com/tatitoxt/fastvault)

### DockNuke — Limpieza de recursos Docker
CLI en Go para revisar y limpiar recursos de Docker con una vista previa antes de aplicar cambios. \`go test ./...\` pasó durante esta revisión.
[Código](https://github.com/tatitoxt/docknuke)

## EDUCACIÓN
- Colegio Bartolomé Mitre — Título secundario, Buenos Aires, Argentina.

## IDIOMAS
- Español: nativo.
- Inglés: intermedio alto (B2+).`;

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
