# Week 05 — The Polite Scraper

## Assignment

**FlyRank AI Internship — Backend Track**  
**Week 05 — Assignment A9: The Polite Scraper**

This project builds a small, polite web-scraping pipeline using Node.js.

The pipeline will:

1. Fetch the first three catalogue pages from Books to Scrape.
2. Discover all book links from those pages.
3. Visit the 60 unique book detail pages.
4. Extract raw book information.
5. Normalize and validate the collected data.
6. Store valid records as JSON.
7. Handle failures without crashing the complete run.
8. Generate a run report.

---

## Target Classification

### Target

**Books to Scrape**

URL:

https://books.toscrape.com/

### Why this target?

Books to Scrape is a public practice sandbox designed for learning and practising web scraping.

This makes it the designated target for this assignment instead of scraping an unrelated production website.

### Scope

The scraper will process **only the first three catalogue pages**.

Expected scope:

- Catalogue page 1
- Catalogue page 2
- Catalogue page 3
- 60 unique book URLs in total

The scraper will not crawl beyond the first three catalogue pages.

### Data to collect

For each book, the scraper will collect:

- `title`
- `product_url`
- `price_text`
- `availability_text`
- `rating_text`
- `description`
- `source_page`
- `fetched_at`

A normalized numeric `price_gbp` value will be added during the normalization stage.

### Why this scope is appropriate

The assignment specifically uses Books to Scrape as a practice sandbox and limits the collection to the first three catalogue pages. The scope is intentionally small and controlled so the scraper can demonstrate responsible fetching, extraction, validation, caching, and failure handling.

---

## Robots.txt Check

Requested:

https://books.toscrape.com/robots.txt

Result:

**HTTP 404 Not Found**

No `robots.txt` file was found at the requested location.

A missing `robots.txt` file is treated as a missing file, not as permission to scrape other websites.

---

## Polite Scraping Rules

This project follows the assignment's responsible scraping requirements:

- Identify the scraper with an honest `User-Agent`.
- Use a request timeout.
- Check the HTTP status code before processing a response.
- Wait at least 500 ms between real requests.
- Use cached responses during development whenever possible.
- Avoid unnecessary repeated requests.
- Process failures without crashing the entire run.
- Do not bypass authentication, paywalls, access controls, or blocks.
- Collect only the data required by the assignment.

---

## Important Scope Rule

> I will not reuse this code on another site without checking its rules and terms first.

---

## Technology

This project uses the JavaScript lane:

- Node.js 20+
- Built-in `fetch`
- Cheerio
- Zod
- Node.js built-in file system APIs
- JSON output
- Git / GitHub

---

## Planned Pipeline

```text
Target Classification
        ↓
Fetch
        ↓
Cache
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