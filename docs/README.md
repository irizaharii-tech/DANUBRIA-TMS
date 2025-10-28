# Danubria TMS — Full Repo

This repo contains a production-grade skeleton for Danubria TMS:
- Backend: Fastify + TypeScript + Prisma + Signed links
- Frontend: React + Vite + Tailwind
- Infra: docker-compose (Postgres + Redis)
- Deploy: GitHub Actions + Render manifest

See ../infra/docker-compose.yml to run local DB and redis. See backend/.env.example and frontend Vite envs.

Quick start:
1. infra: docker-compose up -d
2. backend: npm ci && npx prisma migrate deploy && npm run db:seed && npm run dev
3. frontend: npm ci && npm run dev
