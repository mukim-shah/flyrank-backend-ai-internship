const { isTimeoutError } = require("./llm/errors");
require("dotenv").config();

const express = require("express");
const {
  triageInputSchema,
  triageOutputSchema,
} = require("./llm/schema");
const {
  callTriageModel,
  InvalidModelOutputError,
} = require("./llm/service");

const app = express();
const PORT = Number(process.env.PORT) || 3006;

app.use(express.json({ limit: "16kb" }));

const isLLMEnabled = () => process.env.LLM_ENABLED !== "false";
const isStubEnabled = () => process.env.LLM_STUB === "1";

function sendValidatedResponse(res, data) {
  const result = triageOutputSchema.safeParse(data);

  if (!result.success) {
    console.error("Response schema validation failed:", {
      issues: result.error.issues.map((issue) => ({
        path: issue.path.join("."),
        code: issue.code,
      })),
    });

    return res.status(500).json({
      error: "Internal server error",
    });
  }

  return res.status(200).json(result.data);
}


function logProviderError(error) {
  // Do not log API keys, request headers, customer messages,
  // or raw model output.
  console.error("LLM request failed:", {
    status: error?.status ?? error?.statusCode ?? null,
    name: error?.name ?? "Error",
    code: error?.code ?? null,
    message: String(error?.message ?? "Unknown provider error")
      .slice(0, 300),
  });
}

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Week 06 LLM Triage API is running",
  });
});

app.get("/health", (req, res) => {
  res.status(200).json({
    status: "ok",
    mode: isStubEnabled() ? "stub" : "llm",
    llmEnabled: isLLMEnabled(),
  });
});

app.post("/triage", async (req, res) => {
  // Validate input before any model call.
  const inputResult = triageInputSchema.safeParse(req.body ?? {});

  if (!inputResult.success) {
    const issue = inputResult.error.issues[0];

    return res.status(400).json({
      error: "Validation failed",
      field: issue.path[0] || "body",
      message: issue.message,
    });
  }

  // Kill switch: never call the model.
  if (!isLLMEnabled()) {
    return sendValidatedResponse(res, {
      category: "other",
      urgency: "normal",
      confidence: 0,
      reason: "AI triage is disabled; manual review is required.",
    });
  }

  // Stub mode: no provider call or API credits.
  if (isStubEnabled()) {
    return sendValidatedResponse(res, {
      category: "billing",
      urgency: "high",
      confidence: 0.9,
      reason: "Stub response for local endpoint testing.",
    });
  }

  try {
    const result = await callTriageModel(inputResult.data.text);

    return sendValidatedResponse(res, result.data);
  } catch (error) {
    if (error instanceof InvalidModelOutputError) {
      // The service owns quarantine logging to avoid duplicate entries.
      return res.status(422).json({
        error: "Model output could not be validated",
      });
    }

    logProviderError(error);

    if (isTimeoutError(error)) {
      return res.status(504).json({
        error: "LLM request timed out",
      });
    }

    // Keep internal provider details out of the public response.
    return res.status(502).json({
      error: "LLM provider request failed",
    });
  }
});

// Malformed JSON and oversized request handling.
app.use((err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }

  if (err instanceof SyntaxError && "body" in err) {
    return res.status(400).json({
      error: "Invalid JSON body",
    });
  }

  if (err?.type === "entity.too.large" || err?.status === 413) {
    return res.status(413).json({
      error: "Request body is too large",
    });
  }

  console.error("Unhandled request error:", {
    name: err?.name ?? "Error",
    message: String(err?.message ?? "Unknown error").slice(0, 300),
  });

  return res.status(500).json({
    error: "Internal server error",
  });
});

app.listen(PORT, () => {
  console.log(`Week 06 API listening on http://localhost:${PORT}`);
});
