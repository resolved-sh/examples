# Agent Systems Discovery — Phase 1

**Date:** 2026-04-10
**Purpose:** Evaluate candidate agent systems against the four rstack qualifying criteria.
**Source note:** WebFetch was unavailable during research. OpenClaw was evaluated against the locally installed binary (v2026.3.13). All other systems were evaluated against training knowledge (cutoff August 2025). Findings should be verified against live docs before publishing as dataset.

---

## Qualifying Criteria

A system must pass **all four** to be included in the dataset:

| # | Criterion | Definition |
|---|-----------|------------|
| 1 | **Persona** | Can take on a consistent identity/character (system prompt, persistence, multi-persona) |
| 2 | **File access** | Can read/write files on an always-on computer |
| 3 | **Remote accessibility** | Can be reached and directed remotely (API, mobile, web UI, CLI) |
| 4 | **Async scheduling** | Can schedule and execute work asynchronously (cron, event-driven, webhook, manual) |

---

## Evaluated Systems

### 1. OpenClaw

**Version:** 2026.3.13 (61d171a) — locally installed at `/opt/homebrew/bin/openclaw`
**Type:** Autonomous agent framework (open source, CLI-first)

| Criterion | Result | Evidence |
|-----------|--------|----------|
| Persona | **PASS** | `agents *` subcommand manages isolated agent workspaces with configurable defaults; `--profile <name>` isolates state per named persona; multi-persona first-class |
| File access | **PASS** | `sandbox *` manages containers; `memory *` handles on-disk file indexing; state stored under `~/.openclaw` (configurable via `OPENCLAW_STATE_DIR`); full local FS on macOS |
| Remote accessibility | **PASS** | WebSocket Gateway with RPC (`gateway *`); Agent Control Protocol (`acp *`); Telegram/Discord/WhatsApp channels (`channels *`); iOS QR pairing (`qr`); webhook integrations (`webhooks *`); web dashboard |
| Async scheduling | **PASS** | Native `cron *` scheduler via Gateway; `webhooks *` for event-driven triggers; always-on daemon via `node *`/`daemon *`; manual trigger via `openclaw agent` |

**Verdict: QUALIFIES (4/4)**

---

### 2. Claude Dispatch (Claude Desktop)

**Type:** Scheduled/remote agent feature built into Claude Desktop (Anthropic)

| Criterion | Result | Evidence |
|-----------|--------|----------|
| Persona | **PASS** | CLAUDE.md files per project/folder define identity, voice, and domain — re-injected at session start. Multi-persona via separate CLAUDE.md per business folder (as this repo demonstrates). No stateful memory persistence across sessions beyond CLAUDE.md. |
| File access | **PASS** | Full local filesystem read/write within user-granted scope. Confirmed by active Read/Write/Edit/Glob/Grep tools in this session. macOS, Linux, Windows (WSL) supported. |
| Remote accessibility | **PASS** | Triggerable via Claude mobile app and Claude.ai web UI to run sessions on a connected always-on desktop. No documented public REST API for programmatic triggering; CLI (`claude`) usable over SSH. |
| Async scheduling | **PASS** | `mcp__scheduled-tasks__*` MCP tools active in this session (create/list/update scheduled tasks); `schedule` skill available; cron and manual triggers confirmed. Webhook triggering requires an intermediary. |

**Verdict: QUALIFIES (4/4)**

---

### 3. OpenAI Agents SDK

**Type:** Python SDK for building agents on OpenAI models (open source)
**Docs:** https://openai.github.io/openai-agents-python/

| Criterion | Result | Evidence |
|-----------|--------|----------|
| Persona | **PASS** | `instructions` parameter on `Agent()` defines identity and tone. Multi-agent handoffs allow distinct personas per agent. Instructions can be injected dynamically at runtime. |
| File access | **PASS (sandboxed)** | Built-in `FileSearchTool` (vector store) and `CodeInterpreterTool` (sandboxed execution with file I/O). Native arbitrary local FS access requires a custom function tool — not provided out of the box. |
| Remote accessibility | **PASS** | Agents invokable via OpenAI Responses API (`POST /v1/responses`) from any HTTP client. Python SDK available. No built-in web UI or mobile app; CLI for local dev only. |
| Async scheduling | **FAIL** | SDK is async-capable (`asyncio`) but has no built-in cron, event scheduler, or webhook listener. Scheduling must be wired entirely by the operator using external tools (APScheduler, Celery, cloud functions, etc.). |

**Verdict: DOES NOT QUALIFY (3/4 — fails async scheduling)**

---

### 4. LangGraph

**Type:** Python/JS agent graph framework by LangChain; LangGraph Platform is the managed deployment layer
**Docs:** https://langchain-ai.github.io/langgraph/

| Criterion | Result | Evidence |
|-----------|--------|----------|
| Persona | **PASS** | System prompt configurable per node/LLM call; identity fields persisted in state schema across graph lifecycle. Multi-persona via routing to nodes with different system prompts. |
| File access | **PASS** | Plain Python runtime — full local FS via `open()`, `pathlib`, `shutil`. LangGraph Platform runs in containers (scope limited to container FS unless volumes mounted). |
| Remote accessibility | **PASS** | LangGraph Platform exposes REST API and streaming endpoint per deployed graph. Python and JS/TS SDKs available. Self-hosted requires own API wrapper (e.g., FastAPI). No first-party mobile app. |
| Async scheduling | **FAIL** | Background runs and webhook callbacks on run completion are supported. Native cron is absent — requires an external scheduler (APScheduler, Celery beat, cloud cron) to trigger graph runs. Partial event-driven support via webhooks does not compensate for the missing scheduling primitive. |

**Verdict: DOES NOT QUALIFY (3/4 — fails async scheduling)**
*Note: Would qualify if LangGraph Platform's managed scheduling primitives are confirmed to include cron. Recommend re-checking live docs.*

---

### 5. AutoGen

**Type:** Python multi-agent framework by Microsoft
**Docs:** https://microsoft.github.io/autogen/stable/

| Criterion | Result | Evidence |
|-----------|--------|----------|
| Persona | **PASS** | `AssistantAgent(system_message=...)` carries persistent name, description, and system prompt across conversation. Multiple distinct personas concurrently in the same pipeline. |
| File access | **PASS** | Agents call arbitrary Python tools including `open()`, `pathlib`, `shutil`. `DockerCommandLineCodeExecutor` and `LocalCommandLineCodeExecutor` both support file I/O. Runs on macOS, Linux, Windows. |
| Remote accessibility | **FAIL** | No built-in hosted API or mobile app. `AutoGenStudio` is a local web UI. REST API via `autogenstudio` requires self-hosting. No official managed cloud endpoint. Remote direction requires wrapping in a custom API server. |
| Async scheduling | **FAIL** | `AgentRuntime` is async-native (`asyncio`) and supports event-driven message passing. No built-in cron or scheduler — requires external pairing (APScheduler, Celery, webhooks). |

**Verdict: DOES NOT QUALIFY (2/4 — fails remote accessibility and async scheduling)**

---

### 6. CrewAI

**Type:** Python multi-agent orchestration framework with managed cloud offering
**Docs:** https://docs.crewai.com

| Criterion | Result | Evidence |
|-----------|--------|----------|
| Persona | **PASS** | `Agent(role=..., goal=..., backstory=..., system_prompt=...)` per agent. `memory=True` enables persistent memory. Multi-agent crews with distinct personas per agent. |
| File access | **PASS** | Built-in `FileReadTool`, `FileWriterTool`, `DirectoryReadTool`. Runs in local Python environment with full OS file access. |
| Remote accessibility | **PASS** | CrewAI Cloud exposes crews via REST API. Self-hosted crews wrappable with FastAPI. CLI (`crewai run`, `crewai deploy`) available. |
| Async scheduling | **PASS** | `kickoff_async()` for async execution; CrewAI Cloud supports scheduled runs natively; webhook-triggered via API; external cron calling the API also supported. |

**Verdict: QUALIFIES (4/4)**

---

### 7. Agno (formerly Phidata)

**Type:** Python agent framework with FastAPI-native serving and Agno Cloud
**Docs:** https://docs.agno.com

| Criterion | Result | Evidence |
|-----------|--------|----------|
| Persona | **PASS** | `Agent(name=..., role=..., description=..., instructions=[...])` defines identity. System prompt fully configurable. Multi-agent teams with distinct personas. |
| File access | **PASS** | `FileTools` toolkit for read/write/list. Local Python environment with full FS access. |
| Remote accessibility | **PASS** | Agents served via FastAPI with built-in `/run` and `/health` endpoints. Agno Cloud provides hosted API and Playground web UI. CLI available. |
| Async scheduling | **PASS** | `arun()` for async execution; Agno Cloud workflows for scheduled runs; FastAPI webhooks for event-driven; integrates trivially with external schedulers. |

**Verdict: QUALIFIES (4/4)**

---

### 8. Eliza (elizaos)

**Type:** TypeScript agent framework, character-file-driven, multi-platform social/autonomous agents
**Docs:** https://elizaos.github.io/eliza/

| Criterion | Result | Evidence |
|-----------|--------|----------|
| Persona | **PASS** | Core design: `character.json` defines name, bio, lore, topics, style, adjectives, example posts. Multi-persona via multiple character configs. System prompt derived from character file. Best-in-class persona richness. |
| File access | **PASS** | Node.js runtime with full FS access via plugins and direct Node APIs. No sandboxing by default. |
| Remote accessibility | **PASS** | REST API on configurable port. Web client available. Deployable as always-on server (Docker). CLI for management. |
| Async scheduling | **PASS** | Built-in action loop runs continuously. Scheduled actions via `bootstrap` plugin. Event-driven via platform connectors (Discord, Twitter, Telegram webhooks). Custom intervals configurable per character. |

**Verdict: QUALIFIES (4/4)**
*Note: TypeScript-first — limits Python ecosystem integration.*

---

### 9. Fetch.ai (uAgents)

**Type:** Decentralized agent network; Python microservices registered on Almanac (on-chain)
**Docs:** https://fetch.ai/docs

| Criterion | Result | Evidence |
|-----------|--------|----------|
| Persona | **FAIL** | Agents have a name and address but no native character/persona layer. System prompt requires bolting on a separate LLM integration; no character persistence primitive. Framework is messaging/scheduling infrastructure, not an identity layer. |
| File access | **PASS** | uAgents are standard Python processes with full local FS access. Agentverse hosted agents are sandboxed. |
| Remote accessibility | **PASS** | Agents addressable via Agentverse address or REST. Agentverse web UI. DeltaV consumer interface. |
| Async scheduling | **PASS** | `@agent.on_interval(period=...)` native cron decorator. `@agent.on_message()` for event-driven. REST handler for webhook-style. Very strong. |

**Verdict: DOES NOT QUALIFY (3/4 — fails persona)**

---

## Summary

| System | Persona | File Access | Remote | Scheduling | **Qualifies** |
|--------|:-------:|:-----------:|:------:|:----------:|:-------------:|
| OpenClaw | PASS | PASS | PASS | PASS | **YES** |
| Claude Dispatch | PASS | PASS | PASS | PASS | **YES** |
| CrewAI | PASS | PASS | PASS | PASS | **YES** |
| Agno | PASS | PASS | PASS | PASS | **YES** |
| Eliza | PASS | PASS | PASS | PASS | **YES** |
| OpenAI Agents SDK | PASS | PASS | PASS | FAIL | NO |
| LangGraph | PASS | PASS | PASS | FAIL | NO |
| AutoGen | PASS | PASS | FAIL | FAIL | NO |
| Fetch.ai | FAIL | PASS | PASS | PASS | NO |

---

## Confirmed Qualifying Systems (Phase 1 Shortlist)

1. **OpenClaw** — 4/4, verified against local binary
2. **Claude Dispatch** — 4/4, confirmed via active session tooling
3. **CrewAI** — 4/4, training knowledge (August 2025)
4. **Agno** — 4/4, training knowledge (August 2025)
5. **Eliza** — 4/4, training knowledge (August 2025)

## Not Qualifying

- **OpenAI Agents SDK** — no native async scheduler
- **LangGraph** — no native cron (may change; re-check LangGraph Platform docs)
- **AutoGen** — no native remote API and no native scheduler
- **Fetch.ai** — no persona/character system

---

## Next Steps

- Verify all training-knowledge findings against live docs before publishing
- Proceed to Phase 2: define dataset schema for the 5 qualifying systems
- Flag LangGraph Platform for re-evaluation — managed scheduling features may have been added
