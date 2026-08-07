# Implementation Plan - High-Impact ATS Resume & Portfolio for Fausto Pastura

Creation of a high-converting, ATS-compliant, recruiter-grade Resume for **Fausto Pastura** based on data extracted from his Obsidian vaults, project records (Orkelya, n8n/CubeZoo, Calden Tech), old resume, and LinkedIn profile.

## Resume Design Strategy & Effectiveness Benchmark
According to data from tech recruiters and top engineering firms (Silicon Valley / Harvard Business School Resume standards):
- **ATS Compliance (Top 5% Conversion)**: Single/clean column, standard fonts, explicit keyword matching for AI, Automation, n8n, Next.js, and Salesforce.
- **X-Y-Z Bullet Point Formula**: "Accomplished [X] as measured by [Y] by doing [Z]" (e.g. *Architected 19+ automated agency workflows reducing operational friction by 70% using n8n, Docker, and REST APIs*).
- **Target Roles**: AI Solutions Architect, AI Automation Engineer, Full-Stack Developer, Salesforce & Automation Specialist.

---

## Deliverables

### 1. ATS-Optimized Master Markdown Resume (`Fausto_Pastura_Resume_ATS.md`)
- Ready in both **English** (primary for international & tech roles) and **Spanish**.
- Formatted specifically for seamless conversion to PDF via Pandoc/Typst/Chrome Print.

### 2. High-Quality Web Resume & Digital Portfolio Application (`/Users/fausto/.gemini/antigravity/scratch/resume-app`)
- Built with HTML, Vanilla CSS, and JavaScript for maximum speed and portability.
- **Key Features**:
  - **Live ATS Preview & PDF Export**: Instant 1-click PDF download with crisp CSS `@media print` rules formatted for standard Letter/A4 paper.
  - **Bilingual Toggle**: Seamless switch between English and Spanish.
  - **Two View Modes**:
    1. **Executive ATS View**: Clean, high-readability Harvard/Silicon Valley black & white resume layout.
    2. **Modern Portfolio View**: Sleek dark mode, interactive skill tags, project highlights, live links (`orkelya.xyz`).
  - **Data Export**: One-click "Copy Markdown" for pasting directly into job portals or email outreach.

---

## Verification Plan

### Automated & System Verification
- Serve the resume web application locally using `npx serve` or `python3 -m http.server`.
- Validate responsive layout, print styles, and bilingual toggles.

### Manual Verification
- Verify readability, print margins, and single/two-page page-breaks.
