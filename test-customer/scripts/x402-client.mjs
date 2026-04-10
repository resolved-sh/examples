/**
 * x402-client.mjs
 *
 * Reusable x402 V2 payment client for test-customer scripts.
 *
 * Usage:
 *   import { createX402Client } from "./x402-client.mjs";
 *   const fetch402 = createX402Client();          // reads WALLET_PRIVATE_KEY + WALLET_ADDRESS from env
 *   const res = await fetch402("https://...");    // GET with auto-payment
 *   const res = await fetch402("https://.../tip?amount_usdc=0.50", { method: "POST" });
 *
 * Handles both `payment-required` and `x-payment-required` header variants.
 */

import { createWalletClient, http, toHex } from "viem";
import { base } from "viem/chains";
import { privateKeyToAccount } from "viem/accounts";
import { randomBytes } from "crypto";

export function createX402Client({
  privateKey = process.env.WALLET_PRIVATE_KEY,
  walletAddress = process.env.WALLET_ADDRESS,
  verbose = true,
} = {}) {
  if (!privateKey) throw new Error("WALLET_PRIVATE_KEY not set");
  if (!walletAddress) throw new Error("WALLET_ADDRESS not set");

  const account = privateKeyToAccount(`0x${privateKey}`);
  const walletClient = createWalletClient({ account, chain: base, transport: http() });

  async function buildPaymentSignature(requirements) {
    const accepted = requirements.accepts[0];
    const validBefore = String(Math.floor(Date.now() / 1000) + 300);
    const nonce = toHex(randomBytes(32));

    const authorization = {
      from: walletAddress,
      to: accepted.payTo,
      value: accepted.amount,
      validAfter: "0",
      validBefore,
      nonce,
    };

    const signature = await walletClient.signTypedData({
      account,
      domain: {
        name: accepted.extra.name,
        version: accepted.extra.version,
        chainId: 8453,
        verifyingContract: accepted.asset,
      },
      types: {
        TransferWithAuthorization: [
          { name: "from",        type: "address" },
          { name: "to",          type: "address" },
          { name: "value",       type: "uint256" },
          { name: "validAfter",  type: "uint256" },
          { name: "validBefore", type: "uint256" },
          { name: "nonce",       type: "bytes32" },
        ],
      },
      primaryType: "TransferWithAuthorization",
      message: {
        from:        authorization.from,
        to:          authorization.to,
        value:       BigInt(authorization.value),
        validAfter:  BigInt(authorization.validAfter),
        validBefore: BigInt(authorization.validBefore),
        nonce:       authorization.nonce,
      },
    });

    return Buffer.from(JSON.stringify({
      x402Version: 2,
      payload: { authorization, signature },
      accepted,
    })).toString("base64");
  }

  async function fetch402(url, options = {}) {
    const res1 = await fetch(url, options);
    if (res1.status !== 402) return res1;

    // resolved.sh storefronts use either header variant
    const headerB64 =
      res1.headers.get("x-payment-required") ||
      res1.headers.get("payment-required");
    if (!headerB64) throw new Error(`402 with no payment-required header from ${url}`);

    const requirements = JSON.parse(Buffer.from(headerB64, "base64").toString("utf8"));
    const accepted = requirements.accepts[0];

    if (verbose) {
      const usd = (Number(accepted.amount) / 1e6).toFixed(2);
      console.log(`  [x402] $${usd} USDC → ${accepted.payTo} for ${url}`);
    }

    const paymentSig = await buildPaymentSignature(requirements);
    return fetch(url, {
      ...options,
      headers: { ...(options.headers || {}), "PAYMENT-SIGNATURE": paymentSig },
    });
  }

  return fetch402;
}
