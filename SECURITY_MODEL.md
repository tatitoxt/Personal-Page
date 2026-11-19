# Security model — Personal-Page

Written with the user on 2026-11-19 for Devin security scans; edit it as the system changes.

## Components

| Component | Repository | Code it covers |
|---|---|---|
| Content Engine API | Personal-Page | `apps/api` (FastAPI, CORS `*`), `services/` (orchestrator, design generator, demo recorder), `infra/init.sql`, `docker-compose.yml` (pgvector/pgvector:pg16, Redis 7, MinIO) |
| Resume Site | Personal-Page | `resume-app/`, `vercel.json` — static site on Vercel |

## Trust boundaries and entry points

- **Resume Site** is the only public surface: a static site on Vercel (`vercel.json` rewrites to `resume-app/`).
- **Content Engine API** (`apps/api`, FastAPI with CORS `*`, plus PostgreSQL/pgvector, Redis and MinIO from `docker-compose.yml`) runs **locally only and is never exposed**. Only the operator's own machine can reach it.

## Assets

- Content pipeline data in PostgreSQL and MinIO (local).
- Public resume content (low sensitivity).

## Attackers that matter

- Visitors to the static site (no server-side code on Vercel).
- Remote/network attackers against the Content Engine API and its datastores are ruled out: it is local only.

## Out of scope / accepted risk

- Denial of service (crashes, resource exhaustion) is accepted risk.
- No infrastructure repository exists.
