/**
 * buy-agent-starter-kits.mjs
 * Purchases all data files from agent-starter-kits-b851.resolved.sh.
 *
 * Usage:
 *   cd test-customer/scripts
 *   source ../.env
 *   node buy-agent-starter-kits.mjs
 */

import { createX402Client } from "./x402-client.mjs";
import { writeFileSync, mkdirSync } from "fs";

const fetch402 = createX402Client();
const BASE = "https://agent-starter-kits-b851.resolved.sh";
const OUT = "/tmp/x402-purchases";
mkdirSync(OUT, { recursive: true });

const files = [
  "agent-card-template.json",
  "rstack-primitives.csv",
  "system-prompts.jsonl",
];

console.log("=== Schema checks (free) ===");
for (const file of files) {
  const res = await fetch402(`${BASE}/data/${file}/schema`);
  const data = await res.json();
  console.log(`  ${file}: $${data.price_usdc} rows=${data.row_count ?? "n/a"}`);
}

console.log("\n=== Downloads ===");
for (const file of files) {
  console.log(`\n  ${file}`);
  const res = await fetch402(`${BASE}/data/${file}`);
  const body = await res.text();
  writeFileSync(`${OUT}/${file}`, body);
  console.log(`  → ${res.status} | ${body.length} bytes | saved to ${OUT}/${file}`);
}
