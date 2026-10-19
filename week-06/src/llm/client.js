
const OpenAI = require("openai");

function getLLMClient() {
  const apiKey = process.env.OPENROUTER_API_KEY;
  const timeout = Number(process.env.LLM_TIMEOUT_MS) || 30000;

  if (!apiKey) {
    throw new Error("OPENROUTER_API_KEY is not configured");
  }

  return new OpenAI({
    apiKey,
    baseURL: "https://openrouter.ai/api/v1",
    timeout,
    maxRetries: 0,
  });
}

function getModelName() {
  const model = process.env.LLM_MODEL?.trim();

  if (!model) {
    throw new Error("LLM_MODEL is not configured");
  }

  return model;
}

module.exports = {
  getLLMClient,
  getModelName,
};
