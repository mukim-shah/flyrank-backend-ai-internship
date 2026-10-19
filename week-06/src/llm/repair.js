
const { getLLMClient, getModelName } = require("./client");
const { PROMPT_VERSION, systemPrompt } = require("./prompt");
const { triageOutputSchema } = require("./schema");
const { InvalidModelOutputError } = require("./service");

async function callWithOneRepair(text) {
  try {
    const { callTriageModel } = require("./service");
    const result = await callTriageModel(text);

    return {
      ...result,
      metadata: {
        ...result.metadata,
        repairCount: 0,
      },
    };
  } catch (error) {
    if (!(error instanceof InvalidModelOutputError)) {
      throw error;
    }

    const client = getLLMClient();
    const model = getModelName();
    const startedAt = Date.now();

    const repairResponse = await client.chat.completions.create({
      model,
      temperature: 0,
      messages: [
        {
          role: "system",
          content: systemPrompt,
        },
        {
          role: "user",
          content: text,
        },
        {
          role: "assistant",
          content: error.rawOutput || "",
        },
        {
          role: "user",
          content:
            "Your previous response did not satisfy the required JSON schema. " +
            "Return one corrected JSON object matching the original instructions. " +
            "Do not add commentary.",
        },
      ],
    });

    const durationMs = Date.now() - startedAt;
    const rawOutput =
      repairResponse.choices?.[0]?.message?.content;

    let parsed;

    try {
      parsed = JSON.parse(rawOutput);
    } catch {
      throw new InvalidModelOutputError(
        "Model output remained invalid after one repair.",
        rawOutput || ""
      );
    }

    const validation = triageOutputSchema.safeParse(parsed);

    if (!validation.success) {
      throw new InvalidModelOutputError(
        "Model output failed schema validation after one repair.",
        rawOutput
      );
    }

    return {
      data: validation.data,
      metadata: {
        promptVersion: PROMPT_VERSION,
        model,
        inputTokens: repairResponse.usage?.prompt_tokens ?? null,
        outputTokens: repairResponse.usage?.completion_tokens ?? null,
        durationMs,
        repairCount: 1,
      },
    };
  }
}

module.exports = { callWithOneRepair };
