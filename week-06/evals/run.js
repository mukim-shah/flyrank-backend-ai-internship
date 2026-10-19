
const fs = require("node:fs");
const path = require("node:path");

require("dotenv").config({
  path: path.join(__dirname, "../.env"),
});

const cases = JSON.parse(
  fs.readFileSync(path.join(__dirname, "cases.json"), "utf8")
);

const baseUrl = process.env.EVAL_BASE_URL || "http://localhost:3006";
const results = [];

async function evaluateCase(testCase, index) {
  console.log(`[${index + 1}/${cases.length}] Running ${testCase.id}...`);

  try {
    const response = await fetch(`${baseUrl}/triage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: testCase.text }),
      signal: AbortSignal.timeout(60000),
    });

    if (!response.ok) {
      const body = await response.text();

      return {
        id: testCase.id,
        matched: false,
        error: `HTTP ${response.status}`,
        responseBody: body.slice(0, 300),
      };
    }

    const output = await response.json();

    const categoryMatch =
      output.category === testCase.expected.category;

    const urgencyMatch =
      output.urgency === testCase.expected.urgency;

    const unsureConfidencePass = testCase.unsure
      ? output.category === "other" && output.confidence < 0.5
      : null;

    const matched =
      categoryMatch &&
      urgencyMatch &&
      (unsureConfidencePass !== false);

    return {
      id: testCase.id,
      matched,
      expected: testCase.expected,
      actual: {
        category: output.category,
        urgency: output.urgency,
        confidence: output.confidence,
      },
      ...(testCase.unsure ? { unsureConfidencePass } : {}),
    };
  } catch (error) {
    return {
      id: testCase.id,
      matched: false,
      error: error.name === "TimeoutError"
        ? "Evaluation request timed out"
        : error.message,
    };
  }
}

async function runEvaluation() {
  for (let index = 0; index < cases.length; index += 1) {
    const result = await evaluateCase(cases[index], index);
    results.push(result);

    console.log(
      `  ${result.matched ? "PASS" : "FAIL"} ${result.id}` +
      (result.error ? ` — ${result.error}` : "")
    );
  }

  const matched = results.filter((item) => item.matched).length;
  const percentage = Math.round((matched / cases.length) * 10000) / 100;

  const report = {
    evaluatedAt: new Date().toISOString(),
    promptVersion: "triage-v1",
    total: cases.length,
    matched,
    percentage,
    failures: results.filter((item) => !item.matched),
    results,
  };

  const outputPath = path.join(__dirname, "latest-report.json");

  fs.writeFileSync(
    outputPath,
    `${JSON.stringify(report, null, 2)}\n`,
    "utf8"
  );

  console.log("\n===== EVALUATION SUMMARY =====");
  console.log(`Score: ${matched}/${cases.length} (${percentage}%)`);
  console.log(`Failures: ${report.failures.length}`);
  console.log(`Report saved: ${outputPath}`);
}

runEvaluation().catch((error) => {
  console.error("Evaluation runner failed:", error.message);
  process.exitCode = 1;
});
