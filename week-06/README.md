# 🤖 Week 06 — LLM Triage API

**FlyRank AI Internship · Backend AI Engineering Track · Assignment A9**

A schema-validated LLM API that classifies customer support messages into predefined categories and urgency levels using controlled model calls, structured validation, failure handling, and automated evaluation.

<p align="center">
  <img src="https://img.shields.io/badge/Node.js-22%2B-5FA04E?style=for-the-badge&logo=node.js&logoColor=white" alt="Node.js 22+">
  <img src="https://img.shields.io/badge/Express.js-API-000000?style=for-the-badge&logo=express&logoColor=white" alt="Express.js">
  <img src="https://img.shields.io/badge/LLM-Integration-7C3AED?style=for-the-badge" alt="LLM Integration">
  <img src="https://img.shields.io/badge/Zod-Schema%20Validation-3E67B1?style=for-the-badge" alt="Zod">
  <img src="https://img.shields.io/badge/OpenRouter-Compatible-6366F1?style=for-the-badge" alt="OpenRouter Compatible">
  <img src="https://img.shields.io/badge/Tests-8%2F8%20Recorded-2EA44F?style=for-the-badge" alt="Recorded Evaluation">
</p>

---

## 📖 Overview

The **LLM Triage API** demonstrates how to integrate a Large Language Model (LLM) into a backend service while maintaining control over input validation, output structure, retries, logging, and evaluation.

Instead of exposing an unrestricted conversational interface, the API processes a customer support message and returns a structured classification containing:

- **Category:** `billing`, `bug`, `feature`, or `other`
- **Urgency:** `low`, `normal`, or `high`
- **Confidence:** A numeric value between `0` and `1`
- **Reason:** A concise explanation of the classification

The application uses Express.js, Zod schemas, a versioned prompt, an OpenRouter-compatible OpenAI SDK client, and an automated evaluation suite.

The objective is to make LLM-backed functionality more predictable, testable, and suitable for integration into backend workflows.

## 🎯 Assignment Details

| Detail | Information |
|---|---|
| Assignment | LLM Triage API |
| Track | Backend AI Engineering |
| Week | 06 |
| Language | JavaScript |
| Runtime | Node.js 22+ |
| Framework | Express.js |
| Validation | Zod |
| LLM Integration | OpenRouter-compatible OpenAI SDK client |
| Prompt Version | `triage-v1` |
| Automated Tests | Node.js test runner |
| Recorded Evaluation | 8/8 cases passed |
| Status | Completed |

---

## ✨ Key Features

- REST API endpoint using `POST /triage`
- Input and output validation using Zod
- Fixed category and urgency enums
- Version-controlled prompt stored in `prompts/triage-v1.txt`
- OpenRouter-compatible model integration
- Stub mode for testing without provider calls
- Deterministic fallback when LLM functionality is disabled
- Controlled retries for rate limits, server errors, and transient connection failures
- One repair attempt for invalid model output
- Quarantine logging when repaired output remains invalid
- Structured JSONL operational logs
- No raw customer messages or raw model output in application logs
- Eight labelled evaluation cases
- Automated tests using the Node.js built-in test runner
- Configurable request timeout and provider settings

---

## 🏗️ System Architecture

The API separates HTTP handling, LLM integration, prompt management, schema validation, retries, and operational logging.

```text
                 Client
                   │
                   ▼
           POST /triage
                   │
                   ▼
          Input Schema Validation
                   │
                   ▼
            Triage Service
                   │
          ┌────────┴────────┐
          │                 │
          ▼                 ▼
    Stub / Fallback     LLM Client
                            │
                            ▼
                      Versioned Prompt
                            │
                            ▼
                     Model Provider
                            │
                            ▼
                    Parse Model Output
                            │
                            ▼
                    Zod Output Validation
                            │
                  ┌─────────┴─────────┐
                  │                   │
                  ▼                   ▼
             Valid Output       Invalid Output
                  │                   │
                  │             One Repair Attempt
                  │                   │
                  │             ┌─────┴─────┐
                  │             │           │
                  │             ▼           ▼
                  │           Valid      Still Invalid
                  │             │           │
                  ▼             ▼           ▼
                 Structured API Response
                              or
                       Controlled Error

          Structured Logs + Evaluation Suite
```

The diagram represents the intended processing flow. Actual provider behavior and error mappings should be verified through the implementation and integration tests.

---

## 🔄 Request Processing Flow

1. The client submits a customer support message.
2. The API validates the incoming request.
3. The triage service selects the configured execution mode.
4. If model calls are enabled, the service prepares the versioned prompt and requests a classification.
5. Transient provider failures are handled using controlled retry logic.
6. The returned model output is parsed and validated against the expected schema.
7. If the output is invalid, the service attempts one repair.
8. If validation still fails, a quarantine event is recorded and a controlled error is raised.
9. Valid output is returned in the expected JSON structure.
10. Operational metadata is logged without storing raw customer messages or raw model output.

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| Node.js 22+ | JavaScript runtime |
| Express.js | HTTP API and routing |
| JavaScript | Application implementation |
| Zod | Input and output schema validation |
| OpenAI SDK | OpenRouter-compatible LLM client |
| OpenRouter | Model-provider integration |
| JSON | Structured request and response format |
| JSONL | Operational event logging |
| Node.js Test Runner | Automated tests |
| npm | Dependency and script management |
| Git & GitHub | Version control and project documentation |

---

## 📁 Project Structure

```text
week-06/
├── JOB-CARD.md
├── README.md
├── package.json
├── package-lock.json
├── .env.example
│
├── evals/
│   ├── cases.json
│   ├── run.js
│   ├── latest-report.json
│   └── sample-report.json
│
├── prompts/
│   └── triage-v1.txt
│
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
│
└── test/
    └── triage.test.js
```

**Note:** The structure above documents the supplied project layout. Runtime-generated logs and local environment files should remain excluded from version control.

---

## 🚀 Getting Started

### Prerequisites

Install the following before running the project:

- Node.js 22 or a compatible recent Node.js release
- npm
- An OpenRouter API key for live model requests

Verify your installed versions:

```powershell
node --version
npm --version
```

### 1. Navigate to the project

Run these commands from the repository root:

```powershell
cd .\week-06
npm install
```

### 2. Configure environment variables

Create a local `.env` file:

```powershell
Copy-Item .env.example .env
```

Configure the following values in `.env`:

```env
PORT=3006
LLM_STUB=1
LLM_ENABLED=true
OPENROUTER_API_KEY=
LLM_MODEL=openrouter/free
LLM_TIMEOUT_MS=30000
```

For initial development, `LLM_STUB=1` allows testing without making a provider request.

For live model requests, add your own API key and configure:

```env
LLM_STUB=0
LLM_ENABLED=true
OPENROUTER_API_KEY=your_openrouter_api_key
LLM_MODEL=openrouter/free
LLM_TIMEOUT_MS=30000
```

Use the actual model identifier supported by your provider configuration if it differs from the example.

**Security:** Never commit `.env`, API keys, access tokens, or other secrets to GitHub.

### 3. Start the API

```powershell
npm run dev
```

The configured default port is `3006`.

---

## ❤️ Health Check

Once the server is running, verify that the health endpoint responds:

```powershell
Invoke-RestMethod -Uri "http://localhost:3006/health"
```

The exact health response depends on the implementation in `src/index.js`.

---

## 🌐 API Reference

### `POST /triage`

Classifies a customer support message into a fixed category and urgency level.

**Endpoint**

```http
POST /triage
Content-Type: application/json
```

### Request Body

```json
{
  "text": "I was charged twice for my monthly subscription."
}
```

### Example Response

```json
{
  "category": "billing",
  "urgency": "high",
  "confidence": 0.95,
  "reason": "The customer reports a duplicate charge."
}
```

This response illustrates the expected schema. It is an example, not a guarantee that every model run will return the same classification or wording.

### Response Fields

| Field | Type | Description |
|---|---|---|
| `category` | String enum | Classification of the support message |
| `urgency` | String enum | Priority level assigned to the message |
| `confidence` | Number | Value between `0` and `1` |
| `reason` | String | Concise explanation of the classification |

### Allowed Categories

| Category | Meaning |
|---|---|
| `billing` | Payment, invoice, subscription, or charging issues |
| `bug` | Unexpected behavior or technical problems |
| `feature` | Feature requests or product improvements |
| `other` | Messages outside the defined categories |

### Allowed Urgency Levels

| Urgency | Meaning |
|---|---|
| `low` | Lower-priority support request |
| `normal` | Standard support request |
| `high` | Higher-priority issue requiring attention |

The schema restricts categories and urgency to the supported values. Confidence must remain between `0` and `1`, and additional output fields are rejected.

---

## 🧪 Test the Endpoint

With the API running, execute the following in PowerShell:

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

### Input Validation

The supplied project specification defines these behaviors:

| Scenario | Expected HTTP Status |
|---|---:|
| Invalid input | `400` |
| Malformed JSON | `400` |
| Oversized request body | `413` |

These cases should be included in automated or integration tests to verify the actual running implementation.

---

## ⚙️ Configuration Reference

| Variable | Purpose |
|---|---|
| `PORT` | API port; defaults to `3006` |
| `LLM_STUB` | Set to `1` to return a schema-valid stub response without a provider call |
| `LLM_ENABLED` | Set to `false` to disable model calls and use deterministic fallback behavior |
| `OPENROUTER_API_KEY` | API key for live provider requests |
| `LLM_MODEL` | Model identifier used for requests |
| `LLM_TIMEOUT_MS` | Provider request timeout in milliseconds |

### Execution Modes

**Stub mode**

```env
LLM_STUB=1
LLM_ENABLED=true
```

Uses a stub response without making a provider call.

**Deterministic fallback mode**

```env
LLM_STUB=0
LLM_ENABLED=false
```

Disables model calls and uses the configured deterministic fallback.

**Live provider mode**

```env
LLM_STUB=0
LLM_ENABLED=true
OPENROUTER_API_KEY=your_openrouter_api_key
LLM_MODEL=openrouter/free
```

Makes live provider requests when the required credentials and model configuration are valid.

---

## 🔁 Retry and Failure Handling

Provider calls can fail because of rate limits, server-side errors, timeouts, or temporary network problems. The application includes controlled retry handling for rate limits, server errors, and transient connection failures.

### Output Validation and Repair

The application does not simply trust the model response.

```text
Model Response
      │
      ▼
Parse Output
      │
      ▼
Validate with Zod
      │
      ├── Valid ─────────────► Return Structured Result
      │
      ▼
Invalid Output
      │
      ▼
One Repair Attempt
      │
      ▼
Validate Again
      │
      ├── Valid ─────────────► Continue Processing
      │
      ▼
Still Invalid
      │
      ▼
Quarantine Event + Controlled Error
```

This approach helps prevent malformed or unexpected model output from being returned as a successful triage result.

### Error Mapping

The project specification describes these API error mappings:

| Failure | Intended HTTP Status |
|---|---:|
| Provider timeout | `504` |
| Provider failure | `502` |

**Verification note:** These mappings should be confirmed against the implementation and automated or integration tests before being treated as verified runtime behavior.

---

## 📊 Evaluation Suite

The project includes eight labelled evaluation cases and a runner that evaluates the triage API.

### Run Automated Tests

```powershell
npm test
```

The test suite uses the built-in Node.js test runner.

### Run Evaluations

Start the API in a separate terminal, then run:

```powershell
npm run eval
```

The evaluation runner writes:

```text
evals/latest-report.json
```

The recorded sample result is preserved in:

```text
evals/sample-report.json
```

### Recorded Evaluation Results

| Metric | Recorded Result |
|---|---|
| Prompt version | `triage-v1` |
| Recorded run date | October 19, 2026 |
| Evaluation cases passed | `8/8` |
| Recorded pass rate | `100%` |

**Important:** The 100% result applies only to the recorded eight-case evaluation run. It does not guarantee future accuracy. Model responses may vary depending on the model, provider, prompt, and input.

---

## 📝 Prompt Versioning

The triage prompt is maintained separately from the application logic:

```text
prompts/triage-v1.txt
```

The version identifier `triage-v1` makes it possible to identify which prompt was used for a recorded run.

Keeping prompts separate from application code also makes prompt review, updates, and evaluation comparisons easier to manage.

---

## 📋 Structured Logging

The application records operational metadata in JSONL logs.

Depending on availability, recorded fields include:

- Prompt version
- Model identifier
- Token usage
- Request duration
- Repair count
- Execution status

### Logging Principles

- Do not log raw customer messages.
- Do not log raw model output.
- Do not commit logs containing sensitive operational data.
- Do not commit local environment files or API keys.

These practices reduce unnecessary exposure of customer content and credentials while preserving useful operational information.

---

## 🔐 Security and Reliability

The project applies several safeguards to an LLM-backed API.

- **Input validation:** Incoming requests are checked against an explicit schema.
- **Output validation:** Model responses must match the expected schema.
- **Fixed enums:** Category and urgency values are restricted to supported options.
- **Bounded repair:** Invalid output receives one repair attempt.
- **Controlled retries:** Transient provider failures are handled through retry logic.
- **Request timeout:** Provider requests use a configurable timeout.
- **Failure isolation:** Invalid output does not automatically become a successful API response.
- **Privacy-aware logging:** Raw customer messages and raw model output are not written to structured logs.
- **Secret management:** API keys belong in local environment configuration, never in committed source files.
- **Synthetic evaluations:** Use synthetic messages for testing and evaluation.

Schema validation improves output consistency, but it does not guarantee that a classification is factually correct. Sensitive or high-impact support decisions may still require human review.

---

## 🎓 Week 06 Learning Outcomes

By completing this assignment, I practiced:

- Integrating an LLM into a backend API
- Building a structured classification endpoint
- Validating request and response schemas with Zod
- Restricting model outputs using fixed enums
- Managing prompts through explicit versioning
- Configuring an OpenRouter-compatible model client
- Implementing stub and deterministic fallback modes
- Handling transient provider failures with controlled retries
- Repairing invalid model output with a bounded retry
- Recording structured operational metadata
- Designing labelled evaluation cases
- Running automated tests with Node.js
- Understanding the limitations of small evaluation datasets
- Applying privacy-aware logging and secret management
- Designing more reliable LLM-powered backend services

---

## 🚀 Repository Highlights

This assignment extends the internship repository with:

- LLM API integration
- Structured AI output
- Schema-based validation
- Prompt versioning
- Controlled retry logic
- Output repair
- Quarantine logging
- Stub and fallback modes
- Automated testing
- Labelled evaluation cases
- JSONL operational logs
- Configurable provider settings
- Security-conscious data handling

---

## 🗺️ Week 06 Completion Checklist

| Requirement | Status |
|---|---|
| Express `POST /triage` endpoint | Documented |
| Zod input and output validation | Implemented per assignment |
| Fixed category and urgency enums | Implemented per assignment |
| Versioned triage prompt | Included |
| Provider client integration | Included |
| Stub mode | Included |
| Deterministic fallback | Included |
| Controlled retry handling | Included |
| Single output-repair attempt | Included |
| Quarantine logging | Included |
| Structured JSONL logs | Included |
| Automated test suite | Included |
| Labelled evaluation suite | Included |
| Recorded evaluation result | 8/8 passed |

---

## 👨‍💻 Author

**Mukim Shah**

Backend AI Developer · Automation Specialist · Full-Stack Developer

- **GitHub:** https://github.com/mukim-shah
- **LinkedIn:** https://www.linkedin.com/in/mukim-shah-377825334/

---

<p align="center">
  <strong>FlyRank AI — Backend AI Engineering Internship</strong>
  <br>
  Week 06 · LLM Triage API
  <br>
  Built with Node.js, Express.js, Zod, and LLM integration
</p>
