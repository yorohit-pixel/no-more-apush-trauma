# No More APUSH Trauma

An AI-powered AP US History tutor chat app featuring Hamilton_Bot — a streaming AI assistant backed by the full APUSH exam corpus including McGraw-Hill and Henretta textbooks.

## Run & Operate

- `pnpm --filter @workspace/api-server run dev` — run the API server (port 8080)
- `pnpm --filter @workspace/no-more-apush-trauma run dev` — run the frontend (port 18160)
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from the OpenAPI spec

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- Frontend: React + Vite + Tailwind CSS + Framer Motion
- API: Express 5 with streaming (chunked transfer encoding)
- AI: OpenAI Assistants API v2 (`client.beta.assistants`, `client.beta.threads`) with file_search tool
- Vector Store: pre-loaded APUSH corpus (do not rebuild)
- Build: esbuild (CJS bundle)

## Where things live

- `artifacts/no-more-apush-trauma/` — React/Vite frontend
- `artifacts/api-server/` — Express API server
- `artifacts/api-server/config.json` — assistant config (name, model, vector_store_id)
- `artifacts/api-server/src/lib/openai.ts` — OpenAI client + assistant initialization
- `artifacts/api-server/src/lib/trivia.ts` — APUSH trivia bank (20 questions)
- `artifacts/api-server/src/routes/chat.ts` — all chat routes
- `lib/api-spec/openapi.yaml` — OpenAPI contract (source of truth)

## Architecture decisions

- OpenAI assistant is created once at server startup in a background async call so health checks pass immediately
- Streaming responses use chunked transfer encoding (not SSE) — frontend reads via ReadableStream/fetch
- Vector store `vs_6a2b784c272c819193b1637f1c9c05cd` holds the full APUSH corpus and is attached to the assistant — never rebuild it
- File uploads use `purpose="assistants"` and are attached to the message with `attachments`, so the corpus is always searched alongside user uploads
- `client.vector_stores` is TOP-LEVEL in OpenAI SDK v2 (not `client.beta.vector_stores`)

## Product

- Hamilton_Bot AI tutor with streaming responses and citation rendering
- 9 APUSH Historical Periods sidebar (clickable → auto-fills chat)
- 4 suggested starter prompts for DBQs, LEQs, CCOT analysis
- File upload support (PDF, txt, docx) for personal document analysis
- Random APUSH trivia mode (20-question bank)
- Dark mode (candlelight navy/amber theme)
- Patriotic Retro / Independence Hall visual style

## User preferences

_Populate as you build — explicit user instructions worth remembering across sessions._

## Gotchas

- The model in `config.json` must be available on the user's OpenAI API key — `gpt-3.5-turbo` works; `gpt-4o` requires a paid plan with model access
- `client.vector_stores` is top-level in OpenAI SDK v2 — not under `client.beta`
- Assistants and threads are still under `client.beta` in SDK v2
- After any OpenAPI spec change, run `pnpm --filter @workspace/api-spec run codegen`

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
