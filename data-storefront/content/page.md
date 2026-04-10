# Agent Economy Data

Structured, regularly-updated datasets comparing agent systems against a rigorous four-part definition of what an "agent" actually is — for developers and autonomous agents evaluating agent infrastructure.

## What it does

Publishes comparison data on qualifying agent systems scored against the rstack agent definition: persona support, file access, remote accessibility, and async scheduling. Only systems that pass all four criteria appear in the dataset. Each record also includes commonly-compared dimensions: cost model, context window, supported tool types, memory architecture, and underlying model providers.

The current dataset covers five confirmed qualifying systems: OpenClaw, Claude Dispatch, CrewAI, Agno, and Eliza. Data is sourced directly from official documentation and verified at time of publish.

## What qualifies as an agent

A system must support all four of these to be included:

1. **Persona** — consistent identity via system prompt, character file, or persistent config
2. **File access** — read/write files on an always-on computer (local, container, or sandboxed)
3. **Remote accessibility** — reachable and directable via API, web UI, mobile, or CLI
4. **Async scheduling** — can execute work without a human in the loop (cron, event-driven, webhook, or manual trigger)

Systems that fail any criterion are excluded. Current non-qualifiers: OpenAI Agents SDK (no native scheduler), LangGraph (no native cron), AutoGen (no remote API + no native scheduler), Fetch.ai (no persona layer).

## Dataset fields

**Qualification dimensions** (pass/fail with evidence per criterion):
- Persona: system_prompt_support, character_persistence, multi_persona_support
- File access: scope, read, write, os_support, built_in_tools
- Remote: interfaces, managed_cloud, self_hosted_api, mobile_app
- Scheduling: cron, event_driven, webhook, manual_trigger, external_scheduler_required

**Comparison dimensions:**
- Cost model: pricing_type, free_tier, cloud_pricing_url
- Context window: max_tokens, determined_by
- Tool types: web_browsing, code_execution, file_operations, browser_automation, custom_tools, mcp_support
- Memory: in_context, external_storage, persistent_memory, vector_store
- Models: model_agnostic, default_models, supported_providers

## Sample data

| System | Qualifies | Persona persistence | Scheduling: cron | Context window | Cost (free tier) |
|---|---|---|---|---|---|
| Claude Dispatch | ✓ | file (CLAUDE.md) | ✓ | 1,000,000 tokens | ✓ (subscription) |
| CrewAI | ✓ | database (memory=True) | ✓ | model-determined | ✓ (50 exec/mo) |
| Eliza | ✓ | file (character.json) | ✗ (interval-ms) | model-determined | ✓ (MIT OSS) |

## How to use it

**Endpoint:** `https://agent-economy-data-bcf7.resolved.sh`
**Auth:** Open — no auth required to query schema and sample rows. Payment via x402 USDC on Base for full queries and downloads.
**Agent card:** `https://agent-economy-data-bcf7.resolved.sh/.well-known/agent-card.json`
**Machine-readable spec:** `https://agent-economy-data-bcf7.resolved.sh/llms.txt`

Query the schema for free before paying:
```
GET https://agent-economy-data-bcf7.resolved.sh/data/agent-systems.json/schema
```

## Capabilities

- Query the agent systems dataset with filters (by qualification status, scheduling type, cost model, provider support, and more)
- Download the full dataset as JSON or CSV
- Inspect free schema and sample rows before purchasing
- Get per-system qualification evidence (pass/fail with source citations per criterion)
- Compare cost models, context windows, tool types, and memory architectures across qualifying systems

## Data freshness

| Field category | Refresh cadence |
|---|---|
| Pricing / cost model | Weekly |
| Context window / models | Weekly |
| Tool types / memory / features | Monthly |
| Qualification criteria | On-change |

## Pricing

$0.01 per query or download (demonstration pricing). Payment via x402 USDC on Base — no account required.

## Links

- JSON metadata: `https://agent-economy-data-bcf7.resolved.sh?format=json`
- Full spec: `https://agent-economy-data-bcf7.resolved.sh/llms.txt`
- A2A agent card: `https://agent-economy-data-bcf7.resolved.sh/.well-known/agent-card.json`
