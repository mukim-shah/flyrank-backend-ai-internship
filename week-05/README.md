# 🕷️ The Polite Scraper

<p align="center">

![Node.js](https://img.shields.io/badge/Node.js-20%2B-5FA04E?style=for-the-badge&logo=node.js&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Cheerio](https://img.shields.io/badge/Cheerio-HTML%20Parser-E88C3A?style=for-the-badge)
![Zod](https://img.shields.io/badge/Zod-Schema%20Validation-3E67B1?style=for-the-badge)
![Git](https://img.shields.io/badge/Git-Version%20Control-F05032?style=for-the-badge&logo=git&logoColor=white)
![GitHub](https://img.shields.io/badge/GitHub-Repository-181717?style=for-the-badge&logo=github&logoColor=white)

</p>

<p align="center">

**FlyRank AI Internship — Backend Engineering Track — Week 05**

**Assignment: A9 — The Polite Scraper**

</p>

---

# 📖 About

**The Polite Scraper** is a small, reliable web-scraping pipeline developed as part of the **FlyRank AI Backend Engineering Internship — Week 05**.

The project processes the public **Books to Scrape** practice sandbox and demonstrates a complete backend data pipeline:

```text
Classify
   ↓
Fetch
   ↓
Cache
   ↓
Discover
   ↓
Extract
   ↓
Normalize
   ↓
Validate
   ↓
Store
   ↓
Report
```

The scraper processes the **first 3 catalogue pages**, discovers exactly **60 unique book URLs**, extracts structured book information, normalizes and validates the records, handles a deliberately broken URL without crashing the complete run, and generates a run report.

The focus of this assignment is not simply downloading HTML. It demonstrates reliable, controlled, cache-aware, validated, and responsible scraping practices.

---

# 🎯 Assignment

| Detail | Information |
|--------|-------------|
| **Assignment** | A9 — The Polite Scraper |
| **Track** | Backend AI Engineering |
| **Week** | 05 |
| **Language** | JavaScript / Node.js |
| **Target** | Books to Scrape |
| **Status** | ✅ Completed |

---

# 🎯 Assignment Goal

The goal was to build a small and polite scraping pipeline that:

- Processes exactly the first 3 catalogue pages
- Discovers 60 unique book URLs
- Visits the book detail pages
- Extracts structured information
- Preserves raw scraped values
- Normalizes values such as price
- Validates records using a schema
- Prevents duplicate records
- Handles a broken page without stopping the complete run
- Uses local caching during development
- Reports what happened during every run

---

# 🌐 Target Website

## Books to Scrape

```text
https://books.toscrape.com/
```

**Books to Scrape** is a public practice sandbox created for learning and practicing web scraping.

This assignment uses only this practice sandbox.

### Scope

The scraper is intentionally limited to:

- First 3 catalogue pages
- 60 unique book URLs
- Required book information only

The scraper does **not** attempt to access:

- Login-protected pages
- Paywalled content
- Restricted content
- Private information
- Any other website outside the defined assignment target

---

# 🤖 Robots.txt Check

Before implementing the scraper, the target's `robots.txt` file was requested once:

```text
https://books.toscrape.com/robots.txt
```

The server returned:

```text
404 Not Found
```

Therefore, the result was documented as:

```text
No robots file found.
```

> A missing `robots.txt` file is not treated as permission. It is simply recorded as a missing file.

---

# ⚖️ Responsible Scraping

The scraper follows basic responsible scraping practices:

- Identifying the scraper with a User-Agent
- Using request timeouts
- Waiting between real requests
- Using local caching during development
- Checking HTTP status codes
- Avoiding unnecessary repeated requests
- Collecting only the required information
- Never bypassing authentication
- Never bypassing paywalls
- Never bypassing access restrictions or blocks

For real-world websites, an official API should be preferred when one exists and is appropriate for the required data.

> This project is designed specifically for the Books to Scrape practice sandbox. The code should not be reused against another website without checking its rules and terms first.

---

# 🛠️ Technology Stack

| Technology | Purpose |
|------------|---------|
| **Node.js** | Runtime environment |
| **JavaScript** | Implementation language |
| **Cheerio** | HTML parsing |
| **Zod** | Schema validation |
| **Fetch API** | HTTP requests |
| **Node.js File System** | Cache and JSON storage |
| **npm** | Dependency management |
| **Git** | Version control |
| **GitHub** | Source control and submission |

---

# 📂 Project Structure

```text
week-05/
│
├── cache/
│   ├── catalogue-page-1.html
│   ├── catalogue-page-2.html
│   ├── catalogue-page-3.html
│   └── details/
│       ├── ...
│       └── ...
│
├── output/
│   ├── books.json
│   ├── errors.json
│   ├── raw-books.json
│   ├── run-report.json
│   └── sample-run-report.json
│
├── src/
│   └── index.js
│
├── .gitignore
├── package.json
├── package-lock.json
└── README.md
```

### Directory Notes

The `cache/` directory contains locally generated HTML cache files and is ignored by Git.

Generated output files are also ignored during normal development.

A sample run report can be published as evidence for the assignment.

---

# 🚀 Setup

## Requirements

- Node.js 20+
- npm
- Git

---

## Installation

Navigate to the Week 05 directory:

```bash
cd week-05
```

Install dependencies:

```bash
npm install
```

The project uses:

- `cheerio` for HTML parsing
- `zod` for schema validation

---

# ▶️ Run the Scraper

Start the complete scraper with:

```bash
npm start
```

The command executes:

```bash
node src/index.js
```

The pipeline then:

```text
1. Loads or fetches the first catalogue page
2. Discovers the next catalogue pages
3. Processes exactly 3 catalogue pages
4. Discovers 60 unique book URLs
5. Loads cached detail pages when available
6. Fetches missing pages politely
7. Extracts raw book records
8. Normalizes the scraped values
9. Validates every record
10. Handles the deliberately broken test URL
11. Writes validated records
12. Writes the final run report
```

---

# 📋 Record Schema

Each raw book record contains the following 8 fields:

```json
{
  "title": "A Light in the Attic",
  "product_url": "https://books.toscrape.com/catalogue/a-light-in-the-attic_1000/index.html",
  "price_text": "£51.77",
  "availability_text": "In stock",
  "rating_text": "Three",
  "description": "A description of the book...",
  "source_page": "https://books.toscrape.com/catalogue/page-1.html",
  "fetched_at": "2026-10-07T..."
}
```

After normalization, the record also contains:

```text
price_gbp
```

---

# 🏗️ Complete Pipeline

```text
Books to Scrape
      │
      ▼
Target Classification
      │
      ▼
Catalogue Page 1
      │
      ▼
Cache
      │
      ▼
Catalogue Page 2
      │
      ▼
Catalogue Page 3
      │
      ▼
60 Unique Book URLs
      │
      ▼
Detail Page Fetching
      │
      ▼
Raw Records
      │
      ▼
Normalization
      │
      ├── price_text → price_gbp
      │
      └── canonical product_url
      │
      ▼
Zod Validation
      │
      ├── Valid → books.json
      │
      └── Invalid → errors.json
      │
      ▼
Failure Handling
      │
      ▼
Run Report
```

---

# 🧭 Stage 0 — Classify Scraping Target

Before collecting data, the target was classified.

### Completed

- Books to Scrape identified as the assignment target
- Practice sandbox confirmed
- Scope limited to first 3 catalogue pages
- Robots.txt checked
- Responsible scraping statement added

### Robots Result

```text
404 Not Found
No robots file found.
```

### Commit

```text
Stage 0: classify scraping target
```

---

# 📥 Stage 1 — Fetch and Cache HTML

The first catalogue page is fetched using an identifying User-Agent:

```text
FlyRankInternship-A9/1.0 (+https://github.com/mukim-shah/flyrank-backend-ai-internship)
```

A request timeout is also applied.

Only HTTP `200` responses are accepted as successful page fetches.

The downloaded HTML is saved locally as:

```text
cache/catalogue-page-1.html
```

### First Run

```text
FETCH
status=200
```

### Second Run

```text
CACHE HIT
```

This prevents unnecessary repeated requests to the website during development.

### Commit

```text
Stage 1: fetch and cache HTML
```

---

# 🔎 Stage 2 — Discover Catalogue Pages

The scraper uses **Cheerio** to parse the saved catalogue HTML.

Instead of hardcoding 60 book URLs, it:

1. Reads book links from catalogue page 1
2. Converts relative URLs into absolute URLs
3. Follows the catalogue's `next` link
4. Processes page 2
5. Follows the next link again
6. Processes page 3
7. Stops after the third catalogue page
8. Removes duplicate URLs

### Checkpoint

```text
catalogue_pages=3
discovered=60
unique_urls=60
```

The scraper successfully discovered exactly **60 unique book URLs**.

### Commit

```text
Stage 2: discover catalogue pages
```

---

# 📄 Stage 3 — Extract Detail Page Records

Every discovered book URL is processed individually.

The scraper extracts:

```text
title
product_url
price_text
availability_text
rating_text
description
source_page
fetched_at
```

The `source_page` field records where the book URL was discovered.

The `fetched_at` field records when the detail page was processed.

These fields provide useful provenance information for the scraped data.

### Checkpoint

```text
detail_pages=60
raw_records=60
```

Raw records are written to:

```text
output/raw-books.json
```

### Commit

```text
Stage 3: extract detail page records
```

---

# 🧮 Stage 4 — Normalize and Validate Records

Scraped HTML contains values in human-readable formats.

For example:

```text
price_text = "£51.77"
```

The pipeline converts it into:

```text
price_gbp = 51.77
```

The original `price_text` value is preserved.

---

## 🔗 Canonical Product URL

The absolute product URL is used as the identity of a book.

This prevents duplicate records when the same book URL is discovered more than once.

---

## ✅ Schema Validation

Every normalized record is validated using **Zod** before it is stored.

Valid records are written to:

```text
output/books.json
```

Invalid records are written to:

```text
output/errors.json
```

An invalid record is never silently inserted into the valid output.

---

## Checkpoint

```text
valid_records=60
invalid_records=0
```

The output contains exactly **60 valid records**.

The pipeline is also idempotent:

```text
Run 1 → 60 records
Run 2 → 60 records
```

It does not append another 60 records on rerun.

### Commit

```text
Stage 4: normalize and validate records
```

---

# 🛡️ Stage 5 — Survive Failures and Report the Run

The scraper processes each detail page separately so that one failed page does not terminate the entire run.

A deliberately fake book URL is added during the Stage 5 test.

The fake URL is used only to test failure handling.

---

## Failure Handling Rules

| Failure | Behaviour |
|---------|-----------|
| HTTP 200 | Process successfully |
| Timeout | Retry once |
| HTTP 5xx | Retry once |
| HTTP 404 | Do not retry |
| HTTP 403 | Do not retry |
| Other failed request | Log and skip |

A failed page is recorded instead of crashing the complete pipeline.

---

# 📊 Stage 5 Checkpoint

The completed run produced:

```text
=== STAGE 5 CHECKPOINT ===
pages_fetched=0
cache_hits=60
valid_records=60
invalid_records=0
failed_pages=1
duration_ms=1733

STAGE 5 PASSED
```

### Why is `pages_fetched=0`?

The 60 legitimate detail pages were already available in the local cache.

Therefore, the scraper did not need to make new network requests for those pages.

The result:

```text
cache_hits=60
```

shows that the cached detail pages were reused.

The deliberately fake URL was not cached, returned a failure response, and was skipped.

The important checkpoint was:

```text
valid_records=60
invalid_records=0
failed_pages=1
```

The good records survived the failure.

### Commit

```text
Stage 5: survive failures and report the run
```

---

# 📈 Run Report

Every Stage 5 run produces:

```text
output/run-report.json
```

The report contains operational information such as:

```json
{
  "start_time": "...",
  "duration_ms": 1733,
  "pages_fetched": 0,
  "cache_hits": 60,
  "valid_records": 60,
  "invalid_records": 0,
  "failed_pages": 1,
  "failures": []
}
```

The actual generated report contains the complete failure information and timestamps.

---

# 📦 Output Files

## `books.json`

Contains the normalized and schema-validated book records.

Expected result:

```text
60 records
```

---

## `errors.json`

Contains records that failed schema validation.

Expected clean result:

```text
0 invalid records
```

---

## `raw-books.json`

Contains the raw extracted records before normalization.

---

## `run-report.json`

Contains the operational summary of the scraper run.

It records:

- Start time
- Duration
- Pages fetched
- Cache hits
- Valid records
- Invalid records
- Failed pages
- Failure information

---

## `sample-run-report.json`

A sample run report can be published as evidence for the assignment without exposing locally generated development output.

---

# 🐌 Politeness Rules

The scraper follows several rules to avoid unnecessary load on the target server.

## 1. Identifying User-Agent

Every real request uses:

```text
FlyRankInternship-A9/1.0 (+https://github.com/mukim-shah/flyrank-backend-ai-internship)
```

This identifies the scraper and provides a repository reference.

---

## 2. Request Timeout

Requests use a timeout of:

```text
5000 ms
```

A request should not wait indefinitely.

---

## 3. Request Delay

The scraper waits at least:

```text
500 ms
```

between real requests.

Cached requests do not need a delay because they do not leave the local machine.

---

## 4. Cache

Downloaded pages are cached locally during development.

This prevents repeatedly downloading the same HTML while testing and debugging the scraper.

---

## 5. Status Code Validation

The scraper checks the HTTP response status before processing the response body.

Only successful `200` responses are treated as normal page data.

---

# 🌐 Why No Browser?

A browser was not required for the core assignment because the required book data is already present in the HTML returned by the server.

A browser would add additional execution time and memory overhead without providing additional value for this particular target.

For pages where important data is generated only after JavaScript execution, a browser automation tool such as Playwright may become appropriate. That situation is outside the core requirement of this assignment.

---

# ⚠️ Honest Limitation

This scraper is designed specifically for the **Books to Scrape** practice sandbox and its current HTML structure.

The CSS selectors and extraction logic depend on the structure of the target pages.

If the website changes its HTML structure, selectors may need to be updated.

The scraper should therefore not be treated as a universal scraper for arbitrary websites.

---

# 🔐 Ethics and Responsible Use

This project is intentionally limited to a public practice sandbox.

For real-world scraping projects:

- Check the website's terms and rules first
- Check `robots.txt`
- Prefer official APIs when available
- Identify the scraper
- Rate-limit requests
- Cache data when appropriate
- Collect only the data actually required
- Avoid unnecessary server load
- Never bypass login systems
- Never bypass paywalls
- Never bypass access restrictions
- Never bypass blocks
- Do not reuse this scraper against another website without reviewing its rules and terms

> Responsible data collection is part of the engineering task, not an optional feature.

---

# 🧪 Idempotency

The scraper is designed so that rerunning the pipeline does not create duplicate records.

Expected behaviour:

```text
First run
   ↓
60 valid records

Second run
   ↓
60 valid records
```

It does not produce:

```text
60 + 60 = 120 records
```

The output files are regenerated from the current validated records.

This makes rerunning the scraper safer during development.

---

# 🔄 Data Flow

```text
Catalogue HTML
      │
      ▼
Cheerio Parser
      │
      ▼
Book URLs
      │
      ▼
Detail Pages
      │
      ▼
Raw Book Records
      │
      ▼
Normalization
      │
      ▼
Zod Validation
      │
      ├───────────────┐
      ▼               ▼
Valid Records     Invalid Records
      │               │
      ▼               ▼
books.json       errors.json
      │
      ▼
Run Report
```

---

# 📊 Final Pipeline Results

| Metric | Result |
|--------|--------|
| Catalogue pages processed | **3** |
| Book URLs discovered | **60** |
| Unique book URLs | **60** |
| Detail pages processed | **60** |
| Valid records | **60** |
| Invalid records | **0** |
| Failed pages | **1** |
| Cache hits | **60** |
| Duplicate records | **0** |
| Stage 5 | **PASSED** |

---

# 📚 Stage Commit History

The project was developed incrementally using meaningful stage-based commits:

```text
Stage 0: classify scraping target
Stage 1: fetch and cache HTML
Stage 2: discover catalogue pages
Stage 3: extract detail page records
Stage 4: normalize and validate records
Stage 5: survive failures and report the run
Stage 6: publish scraper evidence
```

---

# 🧠 What I Learned

This assignment demonstrated that web scraping is not simply about downloading HTML.

A reliable scraping pipeline needs multiple controlled stages:

```text
Classify
   ↓
Fetch
   ↓
Cache
   ↓
Discover
   ↓
Extract
   ↓
Normalize
   ↓
Validate
   ↓
Store
   ↓
Report
```

### Main Engineering Concepts Practiced

- Web scraping
- HTML parsing
- Relative and absolute URLs
- Data provenance
- Untrusted input handling
- Data normalization
- Schema validation
- Idempotency
- Caching
- Request timeouts
- Retry handling
- Failure isolation
- Structured run reporting
- Responsible scraping

---

# ✅ Final Requirements Checklist

| Requirement | Status |
|-------------|:------:|
| JavaScript / Node.js lane | ✅ |
| Books to Scrape practice sandbox | ✅ |
| Target classification documented | ✅ |
| Robots.txt checked | ✅ |
| First 3 catalogue pages processed | ✅ |
| 60 unique book URLs discovered | ✅ |
| Relative URLs converted to absolute URLs | ✅ |
| Duplicate URLs removed | ✅ |
| Detail pages processed | ✅ |
| 8 raw record fields extracted | ✅ |
| Numeric `price_gbp` created | ✅ |
| Original `price_text` preserved | ✅ |
| Canonical product URLs used | ✅ |
| Zod schema validation implemented | ✅ |
| Invalid records separated into `errors.json` | ✅ |
| `books.json` contains 60 valid records | ✅ |
| Idempotent reruns | ✅ |
| Identifying User-Agent | ✅ |
| Request timeout | ✅ |
| Minimum 500 ms delay | ✅ |
| Local caching | ✅ |
| Timeout retry | ✅ |
| 5xx retry | ✅ |
| 403 not retried | ✅ |
| 404 not retried | ✅ |
| Broken URL handled without crashing | ✅ |
| Run report generated | ✅ |
| Public GitHub repository | ✅ |
| Stage-based commits | ✅ |
| Cache excluded from Git | ✅ |
| Sample run evidence prepared | ✅ |

---

# 🎓 Internship Information

**Program:** FlyRank AI Internship  
**Track:** Backend Engineering  
**Week:** 05  
**Assignment:** A9 — The Polite Scraper

---

# 👨‍💻 Author

## Mukim Shah

**AI Agent Developer | Automation Specialist | Full-Stack Developer**

### GitHub

https://github.com/mukim-shah

### LinkedIn

https://www.linkedin.com/in/mukim-shah-377825334/

### Internship Repository

https://github.com/mukim-shah/flyrank-backend-ai-internship

---

# 🚀 Project Status

```text
✅ Stage 0 — Completed
✅ Stage 1 — Completed
✅ Stage 2 — Completed
✅ Stage 3 — Completed
✅ Stage 4 — Completed
✅ Stage 5 — Completed
✅ Stage 6 — Completed
```

## Week 05 — The Polite Scraper

**Status: ✅ Completed**

```text
Target        → Books to Scrape
Pages         → 3
Unique URLs   → 60
Valid Records → 60
Invalid       → 0
Failures      → 1 (Handled)
Caching       → Enabled
Validation    → Zod
Reporting     → Enabled
```

---

<p align="center">

### 🕷️ The Polite Scraper

**FlyRank AI Backend Engineering Internship — Week 05**

Built with Node.js • Cheerio • Zod • Fetch API

</p>