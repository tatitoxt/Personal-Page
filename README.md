# Personal Page

Repositorio de trabajo para un portfolio y herramientas de CV. Contiene una aplicación web para presentar experiencia y proyectos, una API en FastAPI y una suite de pruebas para el backend.

```bash
git clone https://github.com/tatitoxt/Personal-Page.git && cd Personal-Page
python3 -m venv .venv && source .venv/bin/activate
pip install -e ./apps/api && uvicorn apps.api.main:app --reload
```

## Requisitos

- Python 3.11+
- Node.js (para los recursos de la aplicación web)
- Docker Compose, si querés levantar los servicios auxiliares

## API local

La API queda disponible en `http://127.0.0.1:8000`. Para ejecutar las pruebas del backend:

```bash
pytest
```

Los valores de ejemplo están en [.env.example](.env.example). Copialos a un archivo local y reemplazá los placeholders; nunca subas claves reales.

## Estructura

- `apps/api/`: API FastAPI.
- `resume-app/`: interfaz web del CV.
- `tests/`: pruebas de API, motor y orquestación.
