import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The entry: one dad joke, at most 200 characters.
const JOKE =
  "I put a clock in the blender. Now my smoothies are ready in no time.";

// Gate: UTF-8 text of 1 to 200 characters, not only white space.
const chars = [...JOKE].length;
if (chars < 1 || chars > 200 || JOKE.trim().length === 0) {
  throw new Error(`joke must be 1-200 characters, got ${chars}`);
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, JOKE, "utf8");

// Read it back and confirm the file holds exactly the joke: a second
// gate so a partial or mangled write can never slip through silently.
const back = readFileSync(outPath, "utf8");
if (back !== JOKE) {
  throw new Error("entry.txt does not match the joke");
}
console.log(`wrote ${outPath} (${chars} code points)`);
