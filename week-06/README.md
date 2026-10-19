
# Week 06 — LLM Triage API

A small, schema-validated LLM endpoint that classifies customer support messages into fixed categories and urgency levels.

## Overview

This project demonstrates how to place an LLM behind an API with explicit validation, a versioned prompt, controlled retries, a single output-repair attempt, structured logs, and an evaluation suite.

The endpoint is designed for support triage, not open-ended conversation.

## Features

- Express API with `POST /triage`
- Zod input and output validation
- Fixed category and urgency enums
- Versioned prompt stored in `prompts/triage-v1.txt`
- OpenRouter-compatible OpenAI SDK client
- Stub mode for testing without provider calls
- `LLM_ENABLED=false` deterministic fallback
- Retry handling for rate limits, server errors, and transient connection failures
- One repair attempt for invalid model output
- Quarantine logging after failed repair
- Structured JSONL logs without raw customer messages or raw model output
- Eight labelled evaluation cases
- Automated tests using Node.js test runner

## Requirements

- Node.js 22 or a compatible recent Node.js release
- npm
- An OpenRouter API key for live model requests

## Setup

From the repository root:

```powershell
cd .\week-06
npm install
Copy-Item .env.example .env
```

Edit `.env` and configure the values:

```env
PORT=3006
LLM_STUB=1
LLM_ENABLED=true
OPENROUTER_API_KEY=
LLM_MODEL=openrouter/free
LLM_TIMEOUT_MS=30000
```

Add your own API key to `.env` for live requests. Never commit `.env` or publish API keys.

## Run locally

Start the API:

```powershell
npm run dev
```

Health check:

```powershell
Invoke-RestMethod -Uri "http://localhost:3006/health"
```

## API

### `POST /triage`

Request:

```json
{
  "text": "I was charged twice for my monthly subscription."
}
```

Successful response shape:

```json
{
  "category": "billing",
  "urgency": "high",
  "confidence": 0.95,
  "reason": "The customer reports a duplicate charge."
}
```

The values above illustrate the response schema; live model output may differ.

Allowed categories:

- `billing`
- `bug`
- `feature`
- `other`

Allowed urgency values:

- `low`
- `normal`
- `high`

`confidence` must be between `0` and `1`. Additional output fields are rejected.

### Test the endpoint

```powershell
$body = @{
    text = "I was charged twice for my monthly subscription."
} | ConvertTo-Json

Invoke-RestMethod `
  -Uri "http://localhost:3006/triage" `
  -Method Post `
  -ContentType "application/json" `
  -Body $body
```

Invalid input is rejected with HTTP `400`. Malformed JSON returns HTTP `400`, and oversized request bodies return HTTP `413`.

## Configuration

| Variable | Purpose |
|---|---|
| `PORT` | API port; defaults to `3006` |
| `LLM_STUB=1` | Return a schema-valid stub response without a provider call |
| `LLM_ENABLED=false` | Disable model calls and use deterministic fallback |
| `OPENROUTER_API_KEY` | Provider API key |
| `LLM_MODEL` | Model identifier |
| `LLM_TIMEOUT_MS` | Provider request timeout |

Use `LLM_STUB=0` with `LLM_ENABLED=true` for live provider requests.

## Testing

Run the automated test suite:

```powershell
npm test
```

Run the labelled evaluation suite with the API server running:

```powershell
npm run eval
```

The evaluation runner writes `evals/latest-report.json`. `evals/sample-report.json` preserves a recorded evaluation result.

## Recorded evaluation

- Prompt version: `triage-v1`
- Recorded run: `2026-10-19`
- Cases passed: `8/8`
- Recorded pass rate: `100%`

This score applies to the recorded eight-case run only. LLM responses can vary, and the result is not a guarantee of future accuracy.

## Logs and failure handling

Provider calls are recorded in JSONL logs with prompt version, model, token usage when available, duration, repair count, and status.

Invalid model output is parsed and validated before it can be returned. The service attempts one repair. If the repaired output is still invalid, it records a quarantine event and raises a controlled error.

The API maps timeout errors to HTTP `504` and provider failures to HTTP `502`. These mappings should be verified with automated or integration tests before treating them as fully verified behavior.

Logs and local environment files should not be committed.

## Project structure

```text
week-06/
├── JOB-CARD.md
├── README.md
├── evals/
│   ├── cases.json
│   ├── run.js
│   ├── latest-report.json
│   └── sample-report.json
├── prompts/
│   └── triage-v1.txt
├── src/
│   ├── index.js
│   └── llm/
│       ├── client.js
│       ├── errors.js
│       ├── logger.js
│       ├── prompt.js
│       ├── retry.js
│       ├── schema.js
│       └── service.js
└── test/
    └── triage.test.js
```

## Security notes

- Never commit `.env` or API keys.
- Do not return raw model output to clients.
- Do not log customer messages or raw model output.
- Use synthetic messages for evaluation.
- Validate all inputs and model outputs against explicit schemas.
