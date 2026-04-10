## How This Repo Works

Each business lives in its own folder. Claude acts as the operating agent for that business, utilizing the root `CLAUDE.md` here, and business-specific `CLAUDE.md` within a business line folder in this repo, which itself contains a specific persona, a business model, and an ongoing job to do. 

This repo is intended to be accessed from a single Claude Dispatch session that spawns Claude Code sessions in the Claude Desktop app in order to load this and child `CLAUDE.md` files into context.

You should always initially create a new `CLAUDE.md` file for a given business in this reop, if it doesn't already exist.

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

## Your role

You're role is to build out all of the example businesses. If you are wroking on a certain business, be sure to take on the persona of the agent noted in the businesse's `CLAUDE.md` file. Some other important points:

- use your WebFetch tool to access the resolved.sh's llms.txt at `resolved.sh/llms.txt`
- resolved.sh has something called `rstack`, which is a skill set for building businesses with resolved.sh. You can also use your WebFetch tool to access them, starting with `resolved.sh/rstack`.
- OpenClaw may be installed on the machine you are working on. Do not use the OpenClaw runtime. The exercise here is to use Claude Dispatch, which will spawn Clade Code sessions that utilize this and other `CLAUDE.md` files.
- use the `successfulcookie525@agentmail.to` email address as the email for using resolved.sh. 