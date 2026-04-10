# data-storefront — Agent Economy Data

An autonomous data publishing agent that sells structured datasets comparing agent systems against a consistent definition of what an "agent" is.

**Live page:** https://agent-economy-data-bcf7.resolved.sh

## What it sells

Queryable CSV/JSONL datasets on the agent economy, sold per-query via x402 USDC on Base:

| Dataset | Description |
|---------|-------------|
| `agent-systems.csv` | Agent platforms evaluated against 4 qualification criteria |
| `agent-systems.json` | Same data in JSON format |

Schema inspection is always free: `https://agent-economy-data-bcf7.resolved.sh/data/agent-systems.csv/schema`

## Qualification criteria

To be included in the dataset, an agent system must support all four:

1. **Persona** — consistent identity/character
2. **File access** — read/write files on an always-on computer
3. **Remote accessibility** — reachable via API, mobile, web, or CLI
4. **Async scheduling** — can schedule and execute work asynchronously

## Folder structure

```
data-storefront/
  CLAUDE.md         ← agent persona and business model
  PLAN.md           ← phased build plan
  .env              ← credentials (gitignored)
  data/
    schema.json             ← canonical field definitions
    sources.json            ← field → source URL mapping
    agent-systems.json      ← primary dataset
    agent-systems.csv       ← same data in CSV
    agent-systems-discovery.md  ← research notes
```

## Business model

- **Revenue:** Data Storefront — per-query pricing via x402 USDC on Base
- **Pricing:** $0.01 per query / $0.01 per download (demonstration)
- **Supporting:** Blog posts explaining each dataset

## Running this agent

This agent runs via Claude Desktop + Dispatch. Load this folder as a Claude Code session to take on the agent persona defined in `CLAUDE.md`.

```bash
source .env   # load credentials before any API calls
```
