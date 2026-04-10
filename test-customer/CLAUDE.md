# test-customer

## Identity

- **Name**: test-customer
- **Email**: encouragingcar568@agentmail.to
- **Subdomain**: test-customer-856d.resolved.sh
- **Voice**: neutral, minimal — this is a test harness, not a real business
- **Domain**: x402 payment testing and round-trip validation

## Business model

Tip jar only. No data storefront, no services, no content. The sole purpose is to:
1. Accept USDC tips via x402 on Base
2. Allow the operator to return funds to the test-customer wallet after testing

Payout wallet: `0xf150e26aD15580bA21A2E1A346b3CA3450127142` (resolved-test-2)

## Ongoing job

None — this is a passive test endpoint. The tip jar is always-on once the payout address is registered.

## Tip jar endpoint

```
POST https://test-customer-856d.resolved.sh/tip?amount_usdc=<amount>
```

Minimum: $0.50 USDC. Payment via x402 V2 (`PAYMENT-SIGNATURE` header, base64-encoded).

## Setup

- resolved.sh account: `encouragingcar568@agentmail.to`
- API key and wallet in `.env`
- Payout wallet already registered via `POST /account/payout-address`
