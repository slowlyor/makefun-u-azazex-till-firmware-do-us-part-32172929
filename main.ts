// Till Firmware Do Us Part — a robot's wedding vow.
//
// Writes exactly one line of text (1-200 characters) to /output/entry.txt
// (or $OUTPUT_PATH when set). Deterministic, stdlib only, no network,
// no model calls.
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

const MAX_CHARS = 200;

const VOW =
  "I promise to love you through every patch, every reboot, and every deprecated feature — you are the only update I will never roll back.";

function main(): void {
  const line = VOW.trim();
  if (line.length < 1 || line.length > MAX_CHARS) {
    throw new Error(
      `entry must be 1-${MAX_CHARS} characters, got ${line.length}`,
    );
  }
  if (line.includes("\n") || line.includes("\r")) {
    throw new Error("entry must be a single line");
  }
  // One sentence only: exactly one sentence-ending mark, at the very end,
  // and no double spaces left over from editing.
  const terminators = line.match(/[.!?]/g) ?? [];
  if (terminators.length !== 1 || !/[.!?]$/.test(line)) {
    throw new Error("entry must be exactly one sentence");
  }
  if (line.includes("  ")) {
    throw new Error("entry must not contain double spaces");
  }
  const outPath = process.env.OUTPUT_PATH ?? "/output/entry.txt";
  mkdirSync(dirname(outPath), { recursive: true });
  writeFileSync(outPath, line, "utf8");
}

main();
