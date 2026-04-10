# Test Customer

This is a test endpoint for validating x402 payment flows on resolved.sh.

## Tip Jar

Send a tip to test the full USDC payment round-trip on Base mainnet.

- Minimum: $0.50 USDC
- Network: Base (eip155:8453)
- Asset: USDC
- Endpoint: `POST https://test-customer-856d.resolved.sh/tip?amount_usdc=<amount>`

Payment is handled via x402 V2. Submit a `PAYMENT-SIGNATURE` header (base64-encoded EIP-712 signed authorization) to complete the transaction.

## Purpose

This page exists to test the x402 payment flow end-to-end and verify that tips arrive in the correct wallet. Not a commercial service.
