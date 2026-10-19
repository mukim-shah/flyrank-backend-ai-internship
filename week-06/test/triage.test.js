const test = require("node:test");
const assert = require("node:assert/strict");
const { isTimeoutError } = require("../src/llm/errors");

const {
  triageInputSchema,
  triageOutputSchema,
} = require("../src/llm/schema");

const { PROMPT_VERSION, systemPrompt } = require("../src/llm/prompt");
const { isRetryable } = require("../src/llm/retry");
const {
  callTriageModel,
  InvalidModelOutputError,
} = require("../src/llm/service");

test("accepts a valid support message", () => {
  const result = triageInputSchema.safeParse({
    text: "I was charged twice for my subscription.",
  });

  assert.equal(result.success, true);
});

test("rejects an empty support message", () => {
  const result = triageInputSchema.safeParse({ text: "" });

  assert.equal(result.success, false);
});

test("rejects a message longer than 2000 characters", () => {
  const result = triageInputSchema.safeParse({
    text: "a".repeat(2001),
  });

  assert.equal(result.success, false);
});

test("accepts a valid triage response", () => {
  const result = triageOutputSchema.safeParse({
    category: "billing",
    urgency: "high",
    confidence: 0.9,
    reason: "The customer reports a duplicate charge.",
  });

  assert.equal(result.success, true);
});

test("rejects unknown categories", () => {
  const result = triageOutputSchema.safeParse({
    category: "unknown",
    urgency: "high",
    confidence: 0.9,
    reason: "Test message.",
  });

  assert.equal(result.success, false);
});

test("rejects extra output fields", () => {
  const result = triageOutputSchema.safeParse({
    category: "billing",
    urgency: "high",
    confidence: 0.9,
    reason: "The customer reports a duplicate charge.",
    source: "stub",
  });

  assert.equal(result.success, false);
});

test("loads the versioned prompt with examples", () => {
  assert.equal(PROMPT_VERSION, "triage-v1");
  assert.match(systemPrompt, /EXAMPLE 1/);
  assert.match(systemPrompt, /EXAMPLE 2/);
});

test("retries rate limits and server failures", () => {
  assert.equal(isRetryable({ status: 429 }), true);
  assert.equal(isRetryable({ status: 503 }), true);
});

test("does not retry authentication or client errors", () => {
  assert.equal(isRetryable({ status: 400 }), false);
  assert.equal(isRetryable({ status: 401 }), false);
  assert.equal(isRetryable({ status: 403 }), false);
});

const validModelResponse = {
  choices: [
    {
      message: {
        content: JSON.stringify({
          category: "billing",
          urgency: "high",
          confidence: 0.95,
          reason: "The customer reports a duplicate charge.",
        }),
      },
    },
  ],
  usage: {
    prompt_tokens: 100,
    completion_tokens: 30,
  },
};

function fakeDependencies(responder, extra = {}) {
  return {
    getLLMClient: () => ({}),
    getModelName: () => "fake-model",
    requestModel: responder,
    logQuarantine: () => {},
    ...extra,
  };
}

test("repairs invalid model output exactly once", async () => {
  const responses = [
    {
      choices: [{ message: { content: "not valid JSON" } }],
      usage: { prompt_tokens: 10, completion_tokens: 5 },
    },
    validModelResponse,
  ];

  let calls = 0;

  const result = await callTriageModel(
    "I was charged twice.",
    fakeDependencies(async () => {
      calls += 1;
      return responses.shift();
    })
  );

  assert.equal(calls, 2);
  assert.equal(result.data.category, "billing");
  assert.equal(result.metadata.repairCount, 1);
});

test("quarantines output when the single repair is also invalid", async () => {
  let calls = 0;
  const quarantineEvents = [];

  await assert.rejects(
    callTriageModel(
      "I was charged twice.",
      fakeDependencies(
        async () => {
          calls += 1;
          return {
            choices: [{ message: { content: "still not JSON" } }],
            usage: { prompt_tokens: 10, completion_tokens: 5 },
          };
        },
        {
          logQuarantine: (event) => quarantineEvents.push(event),
        }
      )
    ),
    InvalidModelOutputError
  );

  assert.equal(calls, 2);
  assert.equal(quarantineEvents.length, 1);
  assert.equal(quarantineEvents[0].repairCount, 1);
});

test("returns valid output without a repair when the first response is valid", async () => {
  let calls = 0;

  const result = await callTriageModel(
    "I was charged twice.",
    fakeDependencies(async () => {
      calls += 1;
      return validModelResponse;
    })
  );

  assert.equal(calls, 1);
  assert.equal(result.metadata.repairCount, 0);
  assert.equal(result.data.category, "billing");
});

test("recognizes provider timeout errors", () => {
  assert.equal(
    isTimeoutError({ name: "APIConnectionTimeoutError" }),
    true
  );
  assert.equal(isTimeoutError({ name: "TimeoutError" }), true);
  assert.equal(isTimeoutError({ code: "ETIMEDOUT" }), true);
  assert.equal(isTimeoutError({ status: 502 }), false);
});