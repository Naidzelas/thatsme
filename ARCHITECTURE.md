# Architecture & Technical Reference

## Overview

This project is a local **HTTP bridge** that sits between Obsidian Copilot and Ollama. Obsidian Copilot is configured to talk to this bridge as if it were an OpenAI-compatible model provider. The bridge receives chat messages, forwards them to Ollama for planning, executes vault actions via the Obsidian Local REST API, and returns results back to Copilot.

```
Obsidian Copilot chat
        │  POST /v1/chat/completions
        ▼
  Bridge (this project)
        │  POST /api/chat (JSON mode)
        ▼
     Ollama
        │  returns { "tool": "...", "args": {...} }
        ▼
  ToolRegistry
        │  reads / proposes writes
        ▼
  Obsidian Local REST API
        │  reads / writes vault notes
        ▼
   Obsidian vault
```

All note mutations are **preview-first**: the model proposes a change, the user sees the content, and must reply `apply` before anything is written to disk.

---

## Entry Point

**`src/server.ts`** — The only executable file.

- Loads config via `loadConfig()`.
- Builds a Fastify server with `buildServer()`.
- Exposes three HTTP routes:
  - `GET /health` — liveness check, no auth required.
  - `GET /v1/models` — returns the configured model name in OpenAI list format.
  - `POST /v1/chat/completions` — the main endpoint; handles both streaming and non-streaming.
- Streaming: when `stream: true` is received, the bridge computes the full response synchronously and then emits it as SSE chunks (`data: {...}\n\n ... data: [DONE]\n\n`). This is done with `reply.hijack()` so CORS headers are written manually.
- Auth: a `preHandler` hook checks `Authorization: Bearer <BRIDGE_API_KEY>` on all routes except `/health`. Auth is skipped entirely when `BRIDGE_API_KEY` is the default value `change-me`.

**To expand the HTTP surface** (e.g. add a `GET /v1/proposals` endpoint to list pending proposals): add a new `fastify.get(...)` call in `buildServer()`.

---

## Configuration

**`src/config.ts`** — Loads and validates all environment variables with Zod at startup.

| Env var | Default | Purpose |
|---|---|---|
| `PORT` | `3333` | Bridge listen port |
| `HOST` | `127.0.0.1` | Bridge listen host |
| `BRIDGE_API_KEY` | `change-me` | Bearer token Copilot sends to the bridge |
| `BRIDGE_MODEL_NAME` | `ollama-obsidian-bridge` | Model name advertised to Copilot |
| `OLLAMA_BASE_URL` | `http://127.0.0.1:11434` | Ollama server URL |
| `OLLAMA_MODEL` | `qwen2.5:7b` | Ollama model to use for planning |
| `OBSIDIAN_REST_BASE_URL` | `https://127.0.0.1:27124` | Obsidian Local REST API base URL |
| `OBSIDIAN_API_KEY` | _(none)_ | Bearer token for Obsidian REST API |
| `OBSIDIAN_ALLOW_SELF_SIGNED` | `true` | Accept self-signed TLS cert from Obsidian |
| `REQUIRE_CONFIRMATION` | `true` | Reserved flag for future confirmation gating |
| `LOG_LEVEL` | `info` | Fastify/pino log level |

**To add a new config value**: add a field to the `configSchema` Zod object and a corresponding `env.MY_VAR` mapping in the `safeParse` call.

---

## Request Flow (step by step)

1. Copilot sends `POST /v1/chat/completions` with `{ model, messages, stream }`.
2. `parseChatCompletionRequest()` in `src/providers/openaiCompat.ts` validates the body with Zod. The `content` field accepts `string`, `null`, or an **array of content parts** (Copilot's multi-modal format); arrays are normalized to a plain string by joining `text` parts.
3. `BridgeAgent.respond(messages)` in `src/agent.ts` is called.
4. The agent first checks if the last user message is a direct `apply` or `reject` confirmation (regex match). If so, it immediately calls `proposal.apply` or `proposal.reject` without invoking Ollama.
5. Otherwise the **agentic loop** runs (up to 3 iterations):
   a. `OllamaClient.plan(messages)` sends the message history plus the system prompt to Ollama in strict JSON mode.
   b. Ollama returns a JSON object `{ tool, args }`.
   c. `ToolRegistry.execute(action)` runs the tool.
   d. If the tool is **read-only**, its result is appended to `loopMessages` as an assistant message and the loop continues (the model plans again with the new context).
   e. If the tool is a **propose or apply action**, the loop stops and its preview/result string is returned to the caller.
6. The response string is either returned as a plain JSON chat completion or emitted as SSE chunks.

---

## Module Reference

### `src/types.ts`
Shared type definitions only. No logic. All other modules import from here.

Key types:
- `ChatMessage` — `{ role, content: string | null, name? }`
- `ToolAction` — `{ tool: string, args: Record<string, unknown> }`
- `ToolResult` — `{ ok: boolean, content: string, data?: unknown }`
- `Proposal` — a pending note change with `id`, `kind`, `path`, `beforeContent`, `afterContent`, optional `target`.
- `PatchTarget` — `{ operation, targetType, target }` — describes where in a note a patch should land.

---

### `src/config.ts`
Zod schema + `loadConfig()`. Called once at server startup. Exports the `AppConfig` type.

---

### `src/prompts/system.ts`
Exports a single constant `bridgeSystemPrompt` — the instruction string injected as the `system` message into every Ollama request.

**This is the primary control surface for model behaviour.**

- Lists every available tool with its argument shape.
- Contains the `IMPORTANT RULES` block that governs when each tool should be used, what order to call them, and what to refuse.
- To teach the model a new behaviour (e.g. "when asked to summarise, call X then Y"), add a rule here.
- To expose a new tool to the model, add a bullet point here alongside the matching implementation in `ToolRegistry`.

---

### `src/providers/openaiCompat.ts`
OpenAI format serialisation/deserialisation.

- `parseChatCompletionRequest(body)` — Zod parse of the incoming request. Normalises content arrays.
- `createChatCompletionResponse(model, content)` — builds a non-streaming response object.
- `createStreamChunks(model, content)` — generator that yields three JSON strings: role delta, content delta, stop delta. Used by the server route for SSE.
- `createModelsResponse(config)` — builds the `/v1/models` list response.
- `getLastUserMessage(messages)` — scans backwards and returns the last `user` role message content.

---

### `src/providers/ollama.ts`
Communicates with Ollama.

- `OllamaClient.plan(messages)` — sends `POST /api/chat` with `stream: false` and `format: "json"`. Prepends the system prompt. Maps `tool` role messages to `user` (Ollama does not have a tool role). Returns `OllamaPlanResult { content, action }`.
- Action extraction order:
  1. Native `tool_calls[0].function` if present.
  2. `parseJsonAction(content)` — extracts a fenced ` ```json ``` ` block or raw `{...}`, then validates `tool` (string) and `args` (object).

**To switch models**: change `OLLAMA_MODEL` in `.env`. The model must support JSON output mode (`format: "json"`). Models known to work well: `qwen2.5:7b`, `mistral-nemo`, `llama3.1`.

**To add support for a different LLM backend** (e.g. LM Studio, OpenAI directly): create a new file alongside `ollama.ts` implementing the same `plan(messages): Promise<OllamaPlanResult>` interface, and wire it up in `server.ts`.

---

### `src/tools/obsidianRest.ts`
Typed HTTP client for the Obsidian Local REST API plugin.

Uses `undici`'s `fetch` (not the global `fetch`) so it can attach a custom `Agent` that disables TLS cert verification for the self-signed cert Obsidian generates.

| Method | HTTP call | Notes |
|---|---|---|
| `status()` | `GET /` | Checks connectivity |
| `list(path?)` | `GET /vault/{path}/` | Lists folder contents |
| `read(path)` | `GET /vault/{path}` | Returns note as raw text |
| `readActive()` | `GET /active/` | Returns currently open note |
| `write(path, content)` | `PUT /vault/{path}` | Creates or fully replaces a note |
| `searchSimple(query)` | `POST /search/simple/?query=...` | Full-text search |
| `tags()` | `GET /tags/` | Returns all vault tags |
| `patch(path, target, content)` | `PATCH /vault/{path}` | Targeted section edit |
| `patchActive(target, content)` | `PATCH /active/` | Targeted edit on the open note |

`encodeVaultPath(path)` — splits the path on `/`, `encodeURIComponent`s each segment, and re-joins. Handles spaces and special characters in filenames correctly.

**To add a new Obsidian REST API endpoint**: add a method here, expose it as a tool in `ToolRegistry`, and document it in `system.ts`.

---

### `src/tools/registry.ts`
The tool dispatch layer. `ToolRegistry.execute(action)` is a `switch` on `action.tool`.

**Read-only tools** (return content directly):
- `obsidian.status`, `vault.list`, `note.read`, `note.active.read`, `search.simple`, `tags.list`

**Propose tools** (create a `Proposal`, return a formatted preview):
- `note.create.propose` — no read needed; `beforeContent` is `null`.
- `note.replace.propose` — reads current note first to capture `beforeContent` for the stale-check.
- `note.patch.propose` — same as replace, but stores `PatchTarget`.
- `note.active.patch.propose` — reads active note first.

**Confirmation tools**:
- `proposal.apply` — re-reads the note, compares to `beforeContent`, refuses if it changed (stale-check), then writes.
- `proposal.reject` — removes the proposal from the store.

All Zod schemas for tool args are local to this file. **To add a new tool**: add its arg schema, add a `case` in the switch, and register it in `system.ts`.

---

### `src/proposals/store.ts`
In-memory store for pending proposals. One instance per server process — proposals do not survive a restart.

- `ProposalStore.create(input)` — generates a UUID, stores the proposal, sets `latestId`.
- `ProposalStore.get(id?)` — returns by ID, or returns the most-recent proposal if no ID given.
- `ProposalStore.remove(id)` — deletes and clears `latestId` if it matched.
- `formatProposalPreview(proposal)` — builds the markdown message shown in Copilot chat: a heading with operation + path, optional patch target info, and the proposed content in a `markdown` code fence. This is what the user reads before typing `apply`.

**To change the preview format**: edit `formatProposalPreview`. It returns a plain string; any valid markdown is fine.

---

### `src/agent.ts`
Orchestration layer. Contains `BridgeAgent.respond(messages)`.

Key logic:
- Direct confirmation bypass (regex on last user message) runs before Ollama is called — keeps latency low for `apply`/`reject`.
- `READ_ONLY_TOOLS` set defines which tool results are fed back into the loop vs. which terminate it.
- `MAX_LOOP_STEPS = 3` caps the loop to prevent runaway Ollama calls.

**To increase multi-step depth** (e.g. read two notes then compare): raise `MAX_LOOP_STEPS` and ensure the system prompt instructs the model to produce a terminal action within that many steps.

---

## Tests

Located in `tests/`. Run with `npm test` (Vitest).

| File | What it covers |
|---|---|
| `ollama.test.ts` | `parseJsonAction` — fenced JSON block, raw JSON, plain text (null case) |
| `obsidianRest.test.ts` | `encodeVaultPath` — spaces and special chars |
| `proposalStore.test.ts` | `ProposalStore.create()`, `formatProposalPreview()` |

Config in `vitest.config.ts` restricts discovery to `tests/**/*.test.ts` to prevent Vitest from picking up compiled files in `dist/`.

---

## Development Scripts

| Command | What it does |
|---|---|
| `npm run dev` | Runs `src/server.ts` directly via `tsx` in watch mode. Restarts on file save. |
| `npm run build` | Compiles TypeScript to `dist/` via `tsc`. |
| `npm run start` | Runs the compiled output at `dist/src/server.js`. |
| `npm test` | Runs all unit tests. |
| `npm run typecheck` | Type-checks without emitting files. |

---

## How to Add a New Tool (checklist)

1. **`src/tools/obsidianRest.ts`** — add a method if the tool needs a new API call.
2. **`src/tools/registry.ts`** — add a Zod arg schema and a `case` in `ToolRegistry.execute`.
3. **`src/prompts/system.ts`** — add the tool to the `Available tools:` list with its arg shape.
4. If the tool is read-only, add its name to the `READ_ONLY_TOOLS` set in **`src/agent.ts`** so the loop feeds its result back instead of terminating.
5. Add a unit test in `tests/`.
