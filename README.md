# Personal Page and Content Engine Prototype

This repository contains a bilingual resume site and an early Python/FastAPI prototype for routing B2B content ideas, checking copy, and rendering sample HTML/SVG assets. It does not publish content to social platforms.

```bash
git clone https://github.com/tatitoxt/Personal-Page.git && cd Personal-Page
python3 -m venv .venv && source .venv/bin/activate
pip install -e ./apps/api
```

## English

### Run the resume site

```bash
python3 -m http.server 4173 --directory resume-app
```

Open `http://127.0.0.1:4173`.

### Run the prototype API

The API exposes `POST /evaluate` for deterministic format routing and `POST /audit` for rule-based copy checks. It can generate HTML carousel drafts, SVG workflow diagrams, and a synthetic CRM screen. Its publishing result is a sample payload; no social account or scheduler is connected.

Create a local `.env` from `.env.example`, then run:

```bash
uvicorn apps.api.main:app --reload
```

The router currently returns nine computed scores. The QA checks use a banned-phrase list and regular expressions for selected secret/email patterns; they are not a general PII or security audit.

### Tests

The repository contains 11 Python tests. From the repository root, run:

```bash
DATABASE_URL='postgresql://local:local@127.0.0.1:5432/local' \
REDIS_URL='redis://127.0.0.1:6379/0' \
PYTHONPATH=. pytest -q
```

These values satisfy local settings validation. The current API test suite does not connect to PostgreSQL or Redis.

### Implementation status

- Implemented: FastAPI routes, deterministic routing rules, basic copy checks, HTML carousel and SVG diagram generation, synthetic UI output, and tests.
- Prototype: the orchestration flow returns an in-memory schedule payload; it does not enqueue or publish a job.
- Planned infrastructure only: PostgreSQL/pgvector, Redis, and MinIO appear in dependency, schema, or Compose files but are not wired into the content flow.
- Not present in this repository: n8n workflows, Remotion, Playwright, ElevenLabs integration, and an analytics feedback loop.

Use synthetic examples in public demos. Do not commit `.env` files, credentials, or client material.

## Español

Este repositorio contiene un sitio de CV bilingüe y un prototipo inicial en Python/FastAPI para clasificar ideas de contenido B2B, revisar copy y generar muestras HTML/SVG. No publica contenido en redes.

### Levantar el sitio y el API

Para el sitio, ejecutá `python3 -m http.server 4173 --directory resume-app` y abrí `http://127.0.0.1:4173`.

Para el API, creá un `.env` local a partir de `.env.example` y ejecutá `uvicorn apps.api.main:app --reload`. `POST /evaluate` aplica reglas determinísticas; `POST /audit` ejecuta controles básicos de copy.

El router calcula nueve puntajes. El control de copy usa una lista de frases y patrones regulares para algunos secretos/emails; no es una auditoría general de PII ni de seguridad. El orquestador genera un payload de publicación de muestra, sin agenda ni conexión a cuentas sociales.

### Pruebas

Hay 11 pruebas Python. Desde la raíz del repo:

```bash
DATABASE_URL='postgresql://local:local@127.0.0.1:5432/local' \
REDIS_URL='redis://127.0.0.1:6379/0' \
PYTHONPATH=. pytest -q
```

La suite pasó con estos valores locales. Las pruebas actuales no se conectan a PostgreSQL ni a Redis.

PostgreSQL/pgvector, Redis y MinIO aparecen como infraestructura preparada, pero no están conectados al flujo del prototipo. Usá datos sintéticos en demos públicas y no subas `.env`, credenciales ni material de clientes.

## License

MIT. See [LICENSE](LICENSE).
