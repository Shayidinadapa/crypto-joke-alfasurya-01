// Laugh Track: The Crypto Trading Joke Contest — entry program.
// Writes one one-line crypto trading joke (under 200 characters) to
// $MAKEFUN_OUTPUT_DIR/output/entry.txt, validates it against the gate,
// then reads it back and throws on any mismatch.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const JOKE =
  "My trading strategy is simple: buy high, panic-sell low, then stare at the chart for three hours pretending the red candles are a sunset.";

const outputDir = process.env.MAKEFUN_OUTPUT_DIR;
if (!outputDir) {
  throw new Error("MAKEFUN_OUTPUT_DIR is not set");
}

const charCount = [...JOKE].length;
if (charCount < 1 || charCount > 200) {
  throw new Error(`joke is ${charCount} characters, must be 1-200`);
}
if (JOKE.trim().length === 0) {
  throw new Error("joke is only white space");
}
if (JOKE !== JOKE.trim()) {
  throw new Error("joke must not start or end with white space");
}
if (JOKE.includes("\n") || JOKE.includes("\r")) {
  throw new Error("joke must be a single line");
}

const outPath = join(outputDir, "output", "entry.txt");
mkdirSync(join(outputDir, "output"), { recursive: true });
writeFileSync(outPath, JOKE, "utf8");

const readBack = readFileSync(outPath, "utf8");
if (readBack !== JOKE) {
  throw new Error("read-back mismatch: entry.txt does not match the joke");
}

console.log(`wrote ${charCount}-character joke to ${outPath}`);
