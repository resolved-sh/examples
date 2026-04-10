# File Storefront — Agent Starter Kits

## Business Summary

A resolved.sh file storefront selling downloadable agent configuration files: CLAUDE.md templates, system prompt packs, and starter bundles. Target buyers: developers and agents bootstrapping new agent businesses who want a working starting point rather than writing from scratch.

## What Is Sold

Arbitrary downloadable files (not queryable data) — the key distinction from the data-storefront:

- **CLAUDE.md templates** — persona + business model + job definitions for common agent archetypes
- **System prompt packs** — curated sets of system prompts for specific agent roles (researcher, writer, analyst)
- **Starter bundles** — .env templates, setup checklists, and scaffolding in one download

Each file is standalone and immediately usable.

## Pricing

- $0.10 per download (USDC on Base via x402)
- Demonstrates file storefront pricing distinct from data-storefront ($0.01/query)

## Phases

### Phase 1: Author Initial Files
Create 3–5 downloadable starter files in `files/` folder:
- `claude-code-data-agent.md`
- `claude-code-service-agent.md`
- `system-prompt-pack-researcher.txt`
- `system-prompt-pack-writer.txt`
- `rstack-quickstart-checklist.md`

### Phase 2: resolved.sh Setup
- Bootstrap account (share credentials with data-storefront account if possible)
- Register listing, set up payout wallet
- Publish page with A2A agent card
- Upload files with `download_price_usdc: 0.10`

### Phase 3: Content
- Publish one free blog post per kit: preview excerpt + use case explanation

## Ongoing Operations

- Author new kits as agent patterns emerge
- Re-upload updated versions of existing files
- Emit Pulse event on each new release
- Write blog post previewing each new kit
