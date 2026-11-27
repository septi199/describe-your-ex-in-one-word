import { createHash } from "node:crypto";
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";

// One word that sums up an ex: cancelled, like a subscription.
// Written to /output/entry.txt with no trailing newline, exactly as judged.

const ENTRY = "Unsubscribed";
const OUTPUT_DIR = "/output";
const OUTPUT_FILE = "entry.txt";
const MIN_LENGTH = 1;
const MAX_LENGTH = 111;
const EXPECTED_SHA256 =
  "ecd78e0a5d762daeb4a542b3e546fa52a489e24549b2400becb6cd8585dc05df";

function buildLine(): string {
  return ENTRY;
}

function checkLength(line: string): void {
  if (line.length < MIN_LENGTH || line.length > MAX_LENGTH) {
    throw new Error(
      `Entry must be ${MIN_LENGTH}-${MAX_LENGTH} characters, got ${line.length}`,
    );
  }
  if (line.trim().length === 0) {
    throw new Error("Entry must not be only whitespace");
  }
  if (line.trim().split(/\s+/).length !== 1) {
    throw new Error("Entry must be exactly one word");
  }
}

function resolveOutputPath(): string {
  return join(OUTPUT_DIR, OUTPUT_FILE);
}

function writeEntry(line: string, outputPath: string): void {
  mkdirSync(dirname(outputPath), { recursive: true });
  writeFileSync(outputPath, line, "utf8");
}

function hashEntry(line: string): string {
  return createHash("sha256").update(line, "utf8").digest("hex");
}

function verifyEntry(outputPath: string, expectedHash: string): void {
  const written = readFileSync(outputPath, "utf8");
  if (hashEntry(written) !== expectedHash) {
    throw new Error(
      `Output hash mismatch: expected ${expectedHash}, ` +
        `got ${hashEntry(written)}`,
    );
  }
}

function main(): void {
  const line = buildLine();
  checkLength(line);
  const outputPath = resolveOutputPath();
  writeEntry(line, outputPath);
  verifyEntry(outputPath, EXPECTED_SHA256);
}

main();
