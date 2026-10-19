
const { getLLMClient, getModelName } = require("./client");
const { PROMPT_VERSION, systemPrompt } = require("./prompt");
const { triageOutputSchema } = require("./schema");
const { withRetry } = require("./retry");
const { logModelCall, logQuarantine } = require("./logger");

class InvalidModelOutputError extends Error {
    constructor(message, rawOutput = "") {
        super(message);
        this.name = "InvalidModelOutputError";
        this.rawOutput = rawOutput;
    }
}

function parseAndValidate(rawOutput) {
    if (typeof rawOutput !== "string" || !rawOutput.trim()) {
        throw new InvalidModelOutputError("Empty model response.");
    }

    let parsed;

    try {
        parsed = JSON.parse(rawOutput);
    } catch {
        throw new InvalidModelOutputError("Invalid JSON response.", rawOutput);
    }

    const result = triageOutputSchema.safeParse(parsed);

    if (!result.success) {
        throw new InvalidModelOutputError(
            "Response failed schema validation.",
            rawOutput
        );
    }

    return result.data;
}

async function requestModel({
    client,
    model,
    messages,
    deadline,
    repairCount,

}) {
    return withRetry(
        async () => {
            const startedAt = Date.now();
            const remainingMs = deadline - startedAt;

            if (remainingMs <= 0) {
                const error = new Error("LLM request deadline exceeded");
                error.name = "APIConnectionTimeoutError";
                throw error;
            }

            try {
                const response = await client.chat.completions.create(
                    {
                        model,
                        temperature: 0,
                        messages,
                    },
                    {
                        signal: AbortSignal.timeout(remainingMs),
                    }
                );

                logModelCall({
                    promptVersion: PROMPT_VERSION,
                    model,
                    inputTokens: response.usage?.prompt_tokens ?? null,
                    outputTokens: response.usage?.completion_tokens ?? null,
                    durationMs: Date.now() - startedAt,
                    repairCount,
                    status: "success",
                });

                return response;
            } catch (error) {
                logModelCall({
                    promptVersion: PROMPT_VERSION,
                    model,
                    durationMs: Date.now() - startedAt,
                    repairCount,
                    status: "failed",
                });

                throw error;
            }
        },
        {
            maxAttempts: 3,
            baseDelayMs: 500,
            maxDelayMs: 5000,
            deadline,
        }
    );
}

async function callTriageModel(text, dependencies = {}) {
    const getClient = dependencies.getLLMClient ?? getLLMClient;
    const getModel = dependencies.getModelName ?? getModelName;
    const request = dependencies.requestModel ?? requestModel;
    const logQuarantined = dependencies.logQuarantine ?? logQuarantine;

    const startedAt = Date.now();
    const deadline = startedAt + 55000;
    const client = getClient();
    const model = getModel();

    const initialMessages = [
        { role: "system", content: systemPrompt },
        { role: "user", content: text },
    ];

    const firstResponse = await request({
        client,
        model,
        messages: initialMessages,
        deadline,
        repairCount: 0,
    });

    const firstRaw = firstResponse.choices?.[0]?.message?.content;

    try {
        const data = parseAndValidate(firstRaw);

        return {
            data,
            metadata: {
                promptVersion: PROMPT_VERSION,
                model,
                inputTokens: firstResponse.usage?.prompt_tokens ?? null,
                outputTokens: firstResponse.usage?.completion_tokens ?? null,
                durationMs: Date.now() - startedAt,
                repairCount: 0,
            },
        };
    } catch (error) {
        if (!(error instanceof InvalidModelOutputError)) {
            throw error;
        }

        if (deadline - Date.now() <= 0) {
            logQuarantined({
                promptVersion: PROMPT_VERSION,
                model,
                reason: "Deadline exceeded before repair.",
                repairCount: 0,
            });

            throw error;
        }
    }

    const repairMessages = [
        ...initialMessages,
        {
            role: "assistant",
            content: firstRaw || "",
        },
        {
            role: "user",
            content:
                "Your previous response failed JSON/schema validation. " +
                "Return a corrected JSON object following the original instructions. " +
                "Do not add commentary.",
        },
    ];

    const repairedResponse = await request({
        client,
        model,
        messages: repairMessages,
        deadline,
        repairCount: 1,
    });

    const repairedRaw =
        repairedResponse.choices?.[0]?.message?.content;

    try {
        const data = parseAndValidate(repairedRaw);

        return {
            data,
            metadata: {
                promptVersion: PROMPT_VERSION,
                model,
                inputTokens:
                    (firstResponse.usage?.prompt_tokens ?? 0) +
                    (repairedResponse.usage?.prompt_tokens ?? 0),
                outputTokens:
                    (firstResponse.usage?.completion_tokens ?? 0) +
                    (repairedResponse.usage?.completion_tokens ?? 0),
                durationMs: Date.now() - startedAt,
                repairCount: 1,
            },
        };
    } catch (error) {
        if (!(error instanceof InvalidModelOutputError)) {
            throw error;
        }

        logQuarantined({
            promptVersion: PROMPT_VERSION,
            model,
            reason: "Output remained invalid after one repair.",
            repairCount: 1,
        });

        throw new InvalidModelOutputError(
            "Model output failed validation after one repair."
        );
    }
}

module.exports = {
    callTriageModel,
    InvalidModelOutputError,
    parseAndValidate,
};
