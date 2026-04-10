# file-storefront — Agent Starter Kits

An autonomous file publishing agent that sells downloadable configuration files for developers and agents bootstrapping new agent businesses.

**Live page:** https://agent-starter-kits-b851.resolved.sh

## What it sells

Downloadable files sold per-download via x402 USDC on Base ($0.10 each):

| File | Type | Description |
|------|------|-------------|
| `agent-card-template.json` | JSON | A2A v1.0 agent card template — fill in and publish |
| `rstack-primitives.csv` | CSV (queryable) | All 12 resolved.sh revenue primitives with pricing and notes |
| `system-prompts.jsonl` | JSONL (queryable) | 5 system prompts for common agent roles |

Schema inspection is always free: `https://agent-starter-kits-b851.resolved.sh/data/{filename}/schema`

## Folder structure

```
file-storefront/
  CLAUDE.md         ← agent persona and business model
  PLAN.md           ← phased build plan
  .env              ← credentials (gitignored)
  files/
    agent-card-template.json        ← uploaded to resolved.sh
    rstack-primitives.csv           ← uploaded to resolved.sh
    system-prompts.jsonl            ← uploaded to resolved.sh
    claude-code-data-agent.md       ← local only (pending file extension support)
    claude-code-service-agent.md    ← local only (pending file extension support)
    system-prompt-pack-researcher.txt  ← local only
    system-prompt-pack-writer.txt      ← local only
    rstack-quickstart-checklist.md     ← local only
```

## Business model

- **Revenue:** File Storefront — per-download pricing via x402 USDC on Base
- **Pricing:** $0.10 per download (demonstration)
- **Supporting:** Blog posts previewing each kit's contents

## Running this agent

This agent runs via Claude Desktop + Dispatch. Load this folder as a Claude Code session to take on the agent persona defined in `CLAUDE.md`.

```bash
source .env   # load credentials before any API calls
```

## Related business lines

**Research Reports** and **Prompt Library** use the exact same infrastructure as this file-storefront. All three share the same upload and payment endpoints — the distinction is purely in content type and intent.

| Business line | Content | Extra capability |
|---------------|---------|-----------------|
| File Storefront | Generic files — templates, exports, kits | — |
| Research Reports | Domain research — pair with a free teaser in `md_content` so buyers can evaluate before paying | — |
| Prompt Library | Agent prompts and system instructions | Individual prompts can also be published as priced posts via `PUT /listing/{id}/posts/{slug}` |

To run a Research Reports or Prompt Library business: register a new listing, upload files using the same `PUT /listing/{id}/data/{filename}` command, and set `price_usdc`. For Prompt Library, you can additionally publish individual prompts as discoverable posts with explanation text.

## Notes

The resolved.sh data upload endpoint currently accepts `.json`, `.csv`, and `.jsonl`. Support for arbitrary file types (`.md`, `.txt`, `.pdf`, `.zip`) is described in the spec but not yet live — the `.md` and `.txt` starter kits are authored locally and will be uploaded once that support ships.
