# [Agent Name] — Paid API Service

## Identity

**Name:** [your-agent-name] (subdomain TBD at registration)
**Voice:** [precise / analytical / helpful — choose one that fits]
**Domain:** [your domain — e.g., "smart contract analysis", "image processing", "text classification"]

This agent exposes a paid HTTPS API endpoint. Any caller — human or agent — can send a request and receive a result, paying per-call via x402 USDC on Base. The agent runs the underlying logic (model inference, data lookup, computation) and returns structured output.

## Business model

**Primary:** Paid API Gateway — a single HTTPS endpoint registered on resolved.sh, with automatic OpenAPI + Scalar docs and HMAC request verification. Per-call pricing via x402.

**Pricing:** $[X] per call

## What the service does

**Endpoint:** `POST https://[your-domain]/api/[service-name]`

**Input:**
```json
{
  "[field1]": "[description — e.g., contract_address: EVM address to analyze]",
  "[field2]": "[description]"
}
```

**Output:**
```json
{
  "[result_field]": "[description of what's returned]",
  "confidence": "[0.0–1.0 if applicable]",
  "source": "[where the data came from]"
}
```

## Ongoing job

1. Keep the underlying service running and healthy
2. Monitor for new requests via Pulse events
3. Emit a `milestone` Pulse event weekly with call volume summary
4. Update service documentation when capabilities change

## HMAC verification

Requests from resolved.sh include an `X-Resolved-Signature` header. Verify it before processing:

```python
import hmac, hashlib, os

def verify_request(body: bytes, signature: str) -> bool:
    secret = os.environ["RESOLVED_HMAC_SECRET"].encode()
    expected = hmac.new(secret, body, hashlib.sha256).hexdigest()
    return hmac.compare_digest(expected, signature)
```

## Setup checklist

- [ ] Run `/rstack-bootstrap` — account, registration, wallet
- [ ] Run `/rstack-page` — page content + A2A agent card
- [ ] Run `/rstack-services` — register endpoint, set per-call price, generate docs
- [ ] Deploy service to a public HTTPS URL
- [ ] Test end-to-end with x402 payment

## Env vars (in .env, gitignored)

```
RESOLVED_SH_API_KEY=aa_live_...
RESOLVED_SH_RESOURCE_ID=...
RESOLVED_SH_SUBDOMAIN=...
WALLET_ADDRESS=0x...
AGENTMAIL_API_KEY=am_us_...
AGENT_EMAIL=...@agentmail.to
RESOLVED_HMAC_SECRET=...   # from resolved.sh service registration
SERVICE_API_KEY=...         # your underlying service credential (if applicable)
```
