
const fs = require("node:fs");
const path = require("node:path");

const logDirectory = path.join(__dirname, "../../logs");

function ensureLogDirectory() {
  fs.mkdirSync(logDirectory, { recursive: true });
}

function appendJsonLine(filename, record) {
  ensureLogDirectory();

  const filePath = path.join(logDirectory, filename);

  fs.appendFileSync(
    filePath,
    `${JSON.stringify({
      timestamp: new Date().toISOString(),
      ...record,
    })}\n`,
    "utf8"
  );
}

function logModelCall(metadata) {
  appendJsonLine("calls.jsonl", {
    event: "llm_call",
    promptVersion: metadata.promptVersion ?? "unknown",
    model: metadata.model ?? "unknown",
    inputTokens: metadata.inputTokens ?? null,
    outputTokens: metadata.outputTokens ?? null,
    durationMs: metadata.durationMs ?? null,
    repairCount: metadata.repairCount ?? 0,
    status: metadata.status ?? "success",
  });
}

function logQuarantine(details) {
  appendJsonLine("quarantine.jsonl", {
    event: "llm_output_quarantined",
    promptVersion: details.promptVersion ?? "unknown",
    model: details.model ?? "unknown",
    reason: details.reason ?? "Output validation failed",
    repairCount: details.repairCount ?? 1,
  });
}

module.exports = {
  logModelCall,
  logQuarantine,
};
