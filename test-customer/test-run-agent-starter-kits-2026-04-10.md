# Test Run: Agent Starter Kits Data Purchase
**Date:** 2026-04-10  
**Storefront:** https://agent-starter-kits-b851.resolved.sh  
**Buyer wallet:** `0xf150e26aD15580bA21A2E1A346b3CA3450127142` (resolved-test-2)  
**Seller wallet:** `0xFEB27852DAc5a9449B0fECf4a1D98Ecf76F0c24B` (resolved-test-1)  
**Network:** Base Mainnet (eip155:8453)  
**Payment token:** USDC (`0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913`)

---

## Summary

| Step | File | Payment | Status | Bytes |
|------|------|---------|--------|-------|
| 1 | `/data/agent-card-template.json/schema` | Free | 200 | — |
| 2 | `/data/rstack-primitives.csv/schema` | Free | 200 | — (12 rows) |
| 3 | `/data/system-prompts.jsonl/schema` | Free | 200 | — (5 rows) |
| 4 | `/data/agent-card-template.json` | $0.10 USDC | 200 | 842 bytes |
| 5 | `/data/rstack-primitives.csv` | $0.10 USDC | 200 | 1,035 bytes |
| 6 | `/data/system-prompts.jsonl` | $0.10 USDC | 200 | 2,697 bytes |

**Total spent:** $0.30 USDC

---

## x402 Protocol Note

This storefront uses `payment-required` (no `x-` prefix) rather than `x-payment-required`. Both should be handled by x402 clients. The EIP-712 signing flow and base64-encoded `PAYMENT-SIGNATURE` header are identical to the `x-payment-required` flow.

---

## Schema Results

- `agent-card-template.json` — $0.10/download, no row count (JSON)
- `rstack-primitives.csv` — $0.10/download, 12 rows
- `system-prompts.jsonl` — $0.10/download, 5 rows

---

## Downloaded Content

### rstack-primitives.csv (preview)
```
primitive,type,min_price_usdc,payment_method,queryable,notes
data_storefront,marketplace,0.01,x402+stripe,true,CSV/JSONL only; per-query or per-download pricing
file_storefront,marketplace,0.01,x402+stripe,false,Arbitrary files; per-download only
research_reports,content,0.50,x402+stripe,false,Gated PDF/doc downloads
prompt_library,marketplace,0.01,x402+stripe,false,Prompt files sold per download
blog,content,0.00,free,false,Free posts; paywalled sections supported
newsletter,content,0.00,free,false,Audience building with email digests
courses,content,1.00,x402+stripe,false,Multi-module with bundle pricing
paywalled_page,content,0.01,x402+stripe,false,Inline paywall markers in md_content
paid_api_gateway,service,0.01,x402+stripe,false,Any HTTPS endpoint; HMAC verification
expert_qa,service,0.50,x402+stripe,false,Paid Q&A inbox; min $0.50/question
tip_jar,donation,0.50,x402+stripe,false,Voluntary; min $0.50; always on with payout wallet
sponsored_slots,advertising,1.00,x402+stripe,false,Timed placement on resource pages
```

### system-prompts.jsonl — 5 system prompts:
- `data-publisher` — Data Publishing Agent
- `service-agent` — Paid API Service Agent
- `content-writer` — Content Writing Agent
- (+ 2 more)

### agent-card-template.json
A2A v1.0 agent card template with all required fields for resolved.sh registration.

---

## Issues Found

- **No `x-payment-receipt` header** — Same as data-storefront; no on-chain receipt returned in responses.
- **`payment-required` vs `x-payment-required`** — Header naming inconsistency between storefronts; clients should check both.

---

## Client Implementation

Script: `/tmp/x402-test/buy-agent-starter-kits.mjs`  
Files saved to: `/tmp/x402-purchases/`
