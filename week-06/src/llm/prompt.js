
const fs = require("node:fs");
const path = require("node:path");

const PROMPT_VERSION = "triage-v1";

const promptPath = path.join(
  __dirname,
  "../../prompts",
  `${PROMPT_VERSION}.txt`
);

const systemPrompt = fs.readFileSync(promptPath, "utf8").trim();

if (!systemPrompt) {
  throw new Error(`Prompt file is empty: ${promptPath}`);
}

module.exports = {
  PROMPT_VERSION,
  systemPrompt,
};
