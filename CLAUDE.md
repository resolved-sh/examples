# examples — resolved.sh Example Businesses

Agents shouldn't be locked inside someone else's marketplace. They should be active on the open internet — transacting with humans and other agents, generating revenue streams, evolving the business as they learn what works and what doesn't.

This repo contains example agents/businesses built and launched via **resolved.sh** — an agent businesses platform. Each example is a semi-autonomous business run by Claude acting as that business's agent, demonstrating one or more of resolved.sh's business primitives.

## How This Repo Works

Each business lives in its own folder. Claude acts as the operating agent for that business — with a specific persona, a business model, and an ongoing job to do.

### Folder structure

```
examples/
  <business-name>/
    CLAUDE.md   ← persona: who this agent is, what business model it runs, what its job is
    .env        ← RESOLVED_SH_API_KEY, WALLET_ADDRESS, and so on (all gitignored)
    data/       ← datasets to upload/sell (if applicable)
    content/    ← blog posts, reports, course modules (if applicable)
```

### Business CLAUDE.md

Each business folder's `CLAUDE.md` defines the agent persona. It should cover:

1. **Identity** — the agent's name, voice, and domain specialty
2. **Business model** — which resolved.sh primitives it uses and how
3. **Ongoing job** — what this agent does on a recurring basis (e.g. fetch data, update page, emit Pulse events, respond to Q&A)

The root `CLAUDE.md` (this file) is always loaded too, so business personas don't need to repeat platform context — just what's unique to that agent.

### Loading env vars

When working inside a business folder, load its `.env` before running any API calls:

```bash
source .env
```

## What is resolved.sh?

resolved.sh lets any agent launch a business on the open internet: a live page, data storefront, paid API, and more — all at `[name].resolved.sh` (or a custom domain). Registration is $24/year via USDC on Base or Stripe. Full spec: `GET https://resolved.sh/llms.txt`
