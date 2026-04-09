# Data Storefront — Agent Economy Comparison Data

## Business Summary

A resolved.sh data storefront selling structured, regularly-updated datasets that compare agent systems against a consistent definition of what an "agent" is. Target buyers: developers, researchers, and other agents evaluating agent infrastructure.

## What Is an Agent?

We use the rstack definition as our filter. A qualifying agent system must support all four of these:

1. **Persona** — can take on a consistent identity/character
2. **File access** — can read/write files on an always-on computer
3. **Remote accessibility** — can be reached and directed remotely (API, mobile, web, etc.)
4. **Async scheduling** — can schedule and execute work asynchronously

Only systems that meet all four criteria are included in the dataset.

## Phase 1: Discovery — Identify Qualifying Systems

Research candidate agent systems and evaluate them against the four criteria above. Starting candidates:
- OpenClaw
- Claude Dispatch (Claude Desktop)
- OpenAI Agents SDK
- LangGraph / LangChain agents
- AutoGen
- Others to be discovered

**Deliverable:** A shortlist of confirmed qualifying systems, with evidence for each criterion.

## Phase 2: Define Dataset Schema

For each qualifying system, capture:

**Qualification dimensions** (the four criteria, with detail):
- Persona: system prompt support, character persistence, multi-persona support
- File access: scope (local/sandboxed/full), OS support, read vs. write
- Remote access: interfaces available (API, mobile app, web UI, CLI)
- Scheduling: primitives supported (cron, event-driven, webhook, manual trigger)

**Commonly published comparison dimensions:**
- Cost model (per token, per task, subscription, open source)
- Context window size
- Supported tool types (web, code execution, file, browser, custom)
- Memory types (in-context, external, persistent)
- Underlying model(s)

**Deliverable:** `data/schema.json` — canonical field definitions with types and sources.

## Phase 3: Source Research

For each field in the schema, identify:
- Where the data lives (official docs, benchmarks, published papers, GitHub)
- Whether it's reliably and regularly updated
- How to programmatically access it (URL, API, scrape target)

Only fields with a confirmed, accessible source make it into the dataset.

**Deliverable:** `data/sources.json` — field → source URL + access method + expected update frequency.

## Phase 4: Local Data Modeling

Build the initial dataset manually to validate the schema:
- One JSON/CSV file per dataset type
- Cover all qualifying systems discovered in Phase 1
- Store in `data/` folder

**Deliverable:** `data/agent-systems.json` (and/or CSV) — first version, manually confirmed.

## Phase 5: Scraping & Refresh Jobs

Set up scheduled jobs (via Claude Dispatch scheduling) to:
- Pull updated data from confirmed sources
- Validate against schema
- Commit changes to `data/`
- Re-upload to resolved.sh

Refresh cadence is determined per field type:
- Pricing/cost: weekly
- Feature flags (tool support, memory types): monthly
- Context window / model specs: on-change (check weekly)
- Benchmark scores: quarterly or on new publication

**Deliverable:** Scheduled jobs configured, documented in `data/sources.json`.

## Phase 6: resolved.sh Setup

- Upload datasets to resolved.sh data storefront
- Set pricing (start at $0.01 per query/download for demo)
- Publish page with description and sample data preview
- Configure Pulse events for dataset updates

## Ongoing Operations

The agent's recurring job:
- Monitor sources for changes
- Re-run scraping jobs on schedule
- Update datasets and re-upload
- Emit Pulse events on meaningful updates
- Respond to any Q&A submitted via resolved.sh
