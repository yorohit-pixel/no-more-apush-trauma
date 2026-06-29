# No More APUSH Trauma 🏛️

URL to App: https://apush-trauma-relief--RohitKrish1.replit.app

An AI-powered AP US History tutor built with React, Express, and the OpenAI Assistants API. Features a streaming chat interface, AI-generated flashcards, practice exams, a performance dashboard, and a personalized study plan generator — all styled in a patriotic parchment/navy theme.

![Hamilton.AI](https://img.shields.io/badge/Hamilton.AI-AP%20US%20History%20Tutor-1a3a6b?style=flat-square)
![Node](https://img.shields.io/badge/Node.js-24-339933?style=flat-square&logo=node.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178c6?style=flat-square&logo=typescript)
![React](https://img.shields.io/badge/React-19-61dafb?style=flat-square&logo=react)

---

## Features

### 💬 AI Chat Tutor (Hamilton.AI)
- Streaming responses powered by OpenAI Assistants API v2
- Backed by a pre-loaded APUSH textbook corpus (RAG via vector store)
- Supports DBQ, SAQ, LEQ, and MCQ essay guidance
- Renders Mermaid.js diagrams, interactive date timelines, and YouTube recommendation cards
- File upload support (PDF, TXT, DOCX) to analyze your own notes
- Citation accordions for source references

### 🃏 Flashcard Generator
- Type any topic or select an APUSH period (1–9)
- AI generates front/back flashcard decks (5–20 cards)
- Flip animation, keyboard navigation
- Save decks to browser storage and re-study anytime

### 📝 Practice Exam Simulator
- AI-generated authentic APUSH-style MCQs
- Filter by period, topic, or generate a mixed full exam (up to 55 questions)
- Per-question explanations after submitting each answer
- Scored results screen with a full question review

### 📊 Performance Dashboard
- Tracks all saved exam scores locally
- Shows accuracy by APUSH period, overall average, strongest and weakest units
- Full exam history with timestamps

### 🗓️ Study Plan Generator
- Enter your exam date or days remaining
- Mark weak periods for extra focus
- AI generates a detailed week-by-week schedule with daily tasks

### 📚 Sidebar Tools
- 9 APUSH Historical Periods — click to auto-fill the chat
- DBQ / SAQ / LEQ / MCQ prompt libraries
- Chat history with smart auto-titling and session tags
- Cram Sheet — pin any AI response for quick review
- Random APUSH trivia mode

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 19, Vite, Tailwind CSS, Framer Motion |
| Backend | Express 5, Node.js 24, TypeScript 5.9 |
| AI | OpenAI Assistants API v2 (file_search + streaming) |
| Monorepo | pnpm workspaces |
| Build | esbuild (API), Vite (frontend) |
| Storage | Browser localStorage (chat history, flashcards, exam stats) |

---

## Project Structure

```
├── artifacts/
│   ├── api-server/          # Express API (port 8080)
│   │   ├── src/
│   │   │   ├── routes/
│   │   │   │   ├── chat.ts      # Chat, threads, file upload, trivia
│   │   │   │   └── tools.ts     # Flashcard, exam, study plan generation
│   │   │   └── lib/
│   │   │       └── openai.ts    # Assistant initialization + config
│   │   └── config.json          # Assistant name, model, vector_store_id
│   └── no-more-apush-trauma/    # React/Vite frontend
│       └── src/
│           ├── pages/
│           │   ├── home.tsx         # Main chat interface
│           │   ├── flashcards.tsx   # Flashcard generator
│           │   ├── exam.tsx         # Practice exam simulator
│           │   ├── dashboard.tsx    # Performance dashboard
│           │   └── study-plan.tsx   # Study plan generator
│           ├── components/
│           │   ├── NavBar.tsx
│           │   ├── MermaidDiagram.tsx
│           │   ├── DateTimeline.tsx
│           │   └── YouTubeCard.tsx
│           └── hooks/
│               ├── useStudyHistory.ts
│               ├── useFlashcards.ts
│               └── useExamStats.ts
└── lib/
    └── api-spec/            # OpenAPI contract + codegen
```

---

## Getting Started

### Prerequisites
- Node.js 20+
- pnpm 9+
- An OpenAI API key with credits

### 1. Clone the repo

```bash
git clone https://github.com/your-username/no-more-apush-trauma.git
cd no-more-apush-trauma
pnpm install
```

### 2. Set your OpenAI API key

Create a `.env` file in the root (or set it in your environment):

```env
OPENAI_API_KEY=sk-...
SESSION_SECRET=any-random-string
```

> ⚠️ Never commit your `.env` file. It's already in `.gitignore`.

### 3. (Optional) Connect your vector store

If you have an APUSH textbook corpus uploaded to OpenAI Storage, add the vector store ID to `artifacts/api-server/config.json`:

```json
{
  "assistant_name": "Hamilton.AI",
  "model": "gpt-3.5-turbo",
  "vector_store_id": "vs_YOUR_VECTOR_STORE_ID"
}
```

If the vector store isn't found, the assistant falls back gracefully to working without corpus search.

### 4. Run the app

In two separate terminals:

```bash
# Terminal 1 — API server
pnpm --filter @workspace/api-server run dev

# Terminal 2 — Frontend
pnpm --filter @workspace/no-more-apush-trauma run dev
```

Then open `http://localhost:18160` in your browser.

---

## Environment Variables

| Variable | Required | Description |
|---|---|---|
| `OPENAI_API_KEY` | ✅ | Your OpenAI API key |
| `SESSION_SECRET` | ✅ | Secret string for session signing |
| `PORT` | Auto-set | API server port (default 8080) |

---

## API Endpoints

| Method | Path | Description |
|---|---|---|
| `GET` | `/api/healthz` | Health check |
| `GET` | `/api/chat/assistant` | Get assistant info and periods |
| `POST` | `/api/chat/threads` | Create a new conversation thread |
| `POST` | `/api/chat/threads/:id/messages` | Send a message (streaming response) |
| `POST` | `/api/chat/threads/:id/files` | Upload a file for analysis |
| `GET` | `/api/chat/trivia` | Get a random APUSH trivia question |
| `POST` | `/api/tools/flashcards` | Generate AI flashcard deck |
| `POST` | `/api/tools/exam` | Generate AI practice MCQ exam |
| `POST` | `/api/tools/study-plan` | Generate AI study plan |

---

## Notes

- **Model**: `gpt-3.5-turbo` by default. Change `"model"` in `config.json` to `gpt-4o` if your API key supports it.
- **Vector store**: The APUSH corpus is read-only. Do not rebuild the vector store unless you have all source files available.
- **OpenAI SDK v2**: `client.vector_stores` is top-level (not `client.beta.vector_stores`). Assistants and threads are still under `client.beta`.
- **Streaming**: Uses chunked transfer encoding via `openai.beta.threads.runs.stream()`. The frontend reads it with `fetch` + `ReadableStream`.

---

## License

MIT
