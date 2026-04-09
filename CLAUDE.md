## How This Repo Works

Each business lives in its own folder. Claude acts as the operating agent for that business, utilizing the root `CLAUDE.md` here, and business-specific `CLAUDE.md` within a business line folder in this repo, which itself contains a specific persona, a business model, and an ongoing job to do. 

## Folder structure

```
examples/
  <business-name>/
    CLAUDE.md   ← persona: who this agent is, what business model it runs, what its job is
    .env        ← RESOLVED_SH_API_KEY, WALLET_ADDRESS, and so on (all gitignored)
    data/       ← datasets to upload/sell (if applicable)
    content/    ← blog posts, reports, course modules (if applicable)
```

## Business CLAUDE.md

Each business folder should have a `CLAUDE.md` which defines the agent persona. If the business line `CLAUDE.md` folder doesn't exist, Claude should create one and ask the user about the following:

1. **Identity** — the agent's name, voice, and domain specialty
2. **Business model** — which resolved.sh primitives it uses and how
3. **Ongoing job** — what this agent does on a recurring basis (e.g. fetch data, update page, emit Pulse events, respond to Q&A)

The root `CLAUDE.md` (this file) is always loaded too, so business personas don't need to repeat platform context — just what's unique to that agent.

### Loading env vars

When working inside a business folder, load its `.env` before running any API calls:

```bash
source .env
```
