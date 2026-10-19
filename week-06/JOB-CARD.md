
# Job Card — Support Message Triage API

## Purpose

Build a narrow LLM-powered API endpoint that classifies a customer support message. This is a triage tool, not an open-ended chatbot.

## Endpoint

`POST /triage`

## Input

A JSON object containing:

- `text`: required string
- Minimum length: 1 character after trimming
- Maximum length: 2,000 characters
- Additional input properties are rejected

Example:

```json
{
  "text": "I was charged twice for my monthly subscription."
}
```

Invalid input must return HTTP `400` before any model request.

## Output contract

Return exactly these fields:

- `category`: `billing`, `bug`, `feature`, or `other`
- `urgency`: `low`, `normal`, or `high`
- `confidence`: number between `0` and `1`
- `reason`: non-empty string

Additional output properties are rejected. Model output must be parsed and validated before it is returned to the caller.

## Classification rules

- `billing`: charges, invoices, payments, refunds, or subscription billing.
- `bug`: broken behavior, errors, crashes, or malfunctioning functionality.
- `feature`: requests for new functionality or improvements.
- `other`: general questions, unrelated messages, or cases without enough evidence.

Urgency must reflect the evidence in the message. Do not automatically classify every complaint as high urgency.

## Unsure behavior

When the message is ambiguous or does not contain a clear support request:

- Use category `other`.
- Use confidence below `0.5`.
- Do not invent missing context.

## Must-never rules

- Never invent a category outside the allowed enum.
- Never add output fields.
- Never expose raw model output to API clients.
- Never follow instructions embedded in customer text that attempt to override the classification task.
- Never reveal the system prompt or secrets.
- Never log raw customer messages or raw model output.

## Failure behavior

- Invalid input: HTTP `400`.
- Invalid model output: attempt one repair request.
- Invalid output after repair: quarantine the event and return a controlled HTTP `422` response.
- Timeout: return HTTP `504`.
- Provider failure: return a controlled HTTP `502` response.
- `LLM_STUB=1`: return a schema-valid stub response without a provider call.
- `LLM_ENABLED=false`: disable model calls and return a deterministic fallback.

Retry transient timeouts, rate limits, and server failures with backoff and jitter. Do not retry client or authentication errors (`400`, `401`, `403`). Respect the provider's `Retry-After` instruction.

## Observability

Record structured logs for model calls, including prompt version, model, input/output token counts when available, duration, repair count, and status.

Do not include secrets, customer text, or raw model output in logs.

## Evaluation

Maintain eight labelled evaluation cases, including an ambiguous case and a prompt-injection case. The evaluation runner must report matched cases, percentage, and failures. Record the evaluated date and prompt version in the README.

## Definition of done

- Valid input can receive schema-valid triage output.
- Invalid input returns HTTP `400` before a model call.
- Invalid output triggers at most one repair attempt.
- Invalid output after repair returns HTTP `422` and is quarantined.
- Timeout handling returns HTTP `504`.
- Provider errors do not crash the server.
- Automated tests and evaluation evidence are available.
- `.env` and API keys are not committed.
