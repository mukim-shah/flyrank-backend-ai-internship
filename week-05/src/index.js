const fs = require("fs/promises");
const path = require("path");
const cheerio = require("cheerio");
const { z } = require("zod");

const START_URL = "https://books.toscrape.com/";

const CACHE_DIR = path.join(__dirname, "..", "cache");
const OUTPUT_DIR = path.join(__dirname, "..", "output");

const RAW_OUTPUT_FILE = path.join(
    OUTPUT_DIR,
    "raw-books.json"
);

const BOOKS_OUTPUT_FILE = path.join(
    OUTPUT_DIR,
    "books.json"
);

const ERRORS_OUTPUT_FILE = path.join(
    OUTPUT_DIR,
    "errors.json"
);

const RUN_REPORT_FILE = path.join(
    OUTPUT_DIR,
    "run-report.json"
);

const USER_AGENT =
    "FlyRankInternship-A9/1.0 (+https://github.com/mukim-shah/flyrank-backend-ai-internship)";

const TIMEOUT_MS = 5000;
const MIN_DELAY_MS = 500;
const RETRY_WAIT_MS = 1000;

// Deliberately broken URL for Stage 5 testing.
// This is a local test against the practice sandbox only.
const FAKE_TEST_URL =
    "https://books.toscrape.com/catalogue/this-book-does-not-exist-999999/index.html";

let lastRequestTime = 0;

/* =========================================================
   BASIC HELPERS
========================================================= */

function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

async function waitForPoliteRequest() {
    const now = Date.now();
    const elapsed = now - lastRequestTime;

    if (
        lastRequestTime > 0 &&
        elapsed < MIN_DELAY_MS
    ) {
        await sleep(
            MIN_DELAY_MS - elapsed
        );
    }
}

function getCatalogueCacheFile(pageNumber) {
    return path.join(
        CACHE_DIR,
        `catalogue-page-${pageNumber}.html`
    );
}

function getDetailCacheFile(index) {
    return path.join(
        CACHE_DIR,
        "details",
        `book-${index}.html`
    );
}

/* =========================================================
   STAGE 1-2
   FETCH + CACHE + CATALOGUE DISCOVERY
========================================================= */

async function fetchPage(
    url,
    cacheFile,
    label
) {
    try {
        const cachedHtml =
            await fs.readFile(
                cacheFile,
                "utf8"
            );

        console.log(
            `CACHE HIT: ${label}`
        );

        return {
            html: cachedHtml,
            fromCache: true,
        };
    } catch (error) {
        if (error.code !== "ENOENT") {
            throw error;
        }
    }

    await waitForPoliteRequest();

    console.log(
        `FETCH: ${label}`
    );

    console.log(
        `url=${url}`
    );

    const controller =
        new AbortController();

    const timeout = setTimeout(() => {
        controller.abort();
    }, TIMEOUT_MS);

    try {
        const response =
            await fetch(url, {
                headers: {
                    "User-Agent":
                        USER_AGENT,
                },
                signal: controller.signal,
            });

        lastRequestTime =
            Date.now();

        console.log(
            `status=${response.status}`
        );

        if (response.status !== 200) {
            throw new Error(
                `Fetch failed with HTTP status ${response.status}`
            );
        }

        const html =
            await response.text();

        await fs.mkdir(
            path.dirname(cacheFile),
            {
                recursive: true,
            }
        );

        await fs.writeFile(
            cacheFile,
            html,
            "utf8"
        );

        console.log(
            `response_size=${Buffer.byteLength(html)} bytes`
        );

        console.log(
            `cached=${cacheFile}`
        );

        return {
            html,
            fromCache: false,
        };
    } finally {
        clearTimeout(timeout);
    }
}

function extractBookLinks(
    html,
    pageUrl
) {
    const $ =
        cheerio.load(html);

    const links = [];

    $(
        "article.product_pod h3 a"
    ).each(
        (index, element) => {
            const href =
                $(element).attr(
                    "href"
                );

            if (!href) {
                return;
            }

            const absoluteUrl =
                new URL(
                    href,
                    pageUrl
                ).href;

            links.push(
                absoluteUrl
            );
        }
    );

    return links;
}

function extractNextUrl(
    html,
    pageUrl
) {
    const $ =
        cheerio.load(html);

    const nextHref =
        $("li.next a").attr(
            "href"
        );

    if (!nextHref) {
        return null;
    }

    return new URL(
        nextHref,
        pageUrl
    ).href;
}

async function discoverBookUrls() {
    const allBookUrls =
        new Map();

    let currentUrl =
        START_URL;

    let cataloguePages = 0;

    while (
        cataloguePages < 3
    ) {
        const pageNumber =
            cataloguePages + 1;

        const cacheFile =
            getCatalogueCacheFile(
                pageNumber
            );

        const { html } =
            await fetchPage(
                currentUrl,
                cacheFile,
                `catalogue page ${pageNumber}`
            );

        const bookLinks =
            extractBookLinks(
                html,
                currentUrl
            );

        console.log(
            `page_${pageNumber}_books=${bookLinks.length}`
        );

        for (
            const url of bookLinks
        ) {
            if (
                !allBookUrls.has(url)
            ) {
                allBookUrls.set(
                    url,
                    {
                        product_url:
                            url,
                        source_page:
                            currentUrl,
                    }
                );
            }
        }

        cataloguePages += 1;

        if (
            cataloguePages === 3
        ) {
            break;
        }

        const nextUrl =
            extractNextUrl(
                html,
                currentUrl
            );

        if (!nextUrl) {
            throw new Error(
                `Next catalogue page not found after page ${pageNumber}`
            );
        }

        currentUrl =
            nextUrl;
    }

    console.log("");

    console.log(
        `catalogue_pages=${cataloguePages}`
    );

    console.log(
        `discovered=${cataloguePages * 20}`
    );

    console.log(
        `unique_urls=${allBookUrls.size}`
    );

    return Array.from(
        allBookUrls.values()
    );
}

/* =========================================================
   STAGE 3
   DETAIL PAGE EXTRACTION
========================================================= */

function extractRating($) {
    const ratingClass =
        $(".product_main .star-rating")
            .attr("class");

    if (!ratingClass) {
        return null;
    }

    const ratingParts =
        ratingClass.split(
            /\s+/
        );

    return (
        ratingParts.find(
            (part) =>
                part !==
                "star-rating"
        ) || null
    );
}

function extractDescription($) {
    const descriptionHeading =
        $("#product_description");

    if (
        !descriptionHeading.length
    ) {
        return null;
    }

    const description =
        descriptionHeading
            .next("p")
            .text()
            .trim();

    return (
        description || null
    );
}

function extractBookRecord(
    html,
    productUrl,
    sourcePage,
    fetchedAt
) {
    const $ =
        cheerio.load(html);

    const title =
        $(".product_main h1")
            .text()
            .trim();

    const priceText =
        $(".product_main .price_color")
            .first()
            .text()
            .trim();

    const availabilityText =
        $(".product_main .availability")
            .text()
            .replace(
                /\s+/g,
                " "
            )
            .trim();

    const ratingText =
        extractRating($);

    const description =
        extractDescription($);

    return {
        title,
        product_url:
            productUrl,
        price_text:
            priceText,
        availability_text:
            availabilityText,
        rating_text:
            ratingText,
        description,
        source_page:
            sourcePage,
        fetched_at:
            fetchedAt,
    };
}

async function extractDetailRecords(
    bookEntries
) {
    const records = [];

    for (
        let index = 0;
        index <
        bookEntries.length;
        index++
    ) {
        const entry =
            bookEntries[index];

        const bookNumber =
            index + 1;

        const cacheFile =
            getDetailCacheFile(
                bookNumber
            );

        const fetchedAt =
            new Date().toISOString();

        const { html } =
            await fetchPage(
                entry.product_url,
                cacheFile,
                `detail page ${bookNumber}/60`
            );

        const record =
            extractBookRecord(
                html,
                entry.product_url,
                entry.source_page,
                fetchedAt
            );

        records.push(
            record
        );

        console.log(
            `extracted=${bookNumber}/60 | title=${record.title}`
        );
    }

    return records;
}

/* =========================================================
   STAGE 4
   NORMALIZATION
========================================================= */

function normalizePrice(
    priceText
) {
    if (
        typeof priceText !==
            "string" ||
        !priceText.trim()
    ) {
        return null;
    }

    const numericValue =
        Number(
            priceText
                .replace("£", "")
                .trim()
        );

    if (
        !Number.isFinite(
            numericValue
        )
    ) {
        return null;
    }

    return numericValue;
}

function normalizeProductUrl(
    productUrl
) {
    try {
        const url =
            new URL(
                productUrl
            );

        url.hash = "";

        return url.href;
    } catch {
        return productUrl;
    }
}

function normalizeBook(
    record
) {
    return {
        title:
            record.title,

        product_url:
            normalizeProductUrl(
                record.product_url
            ),

        price_text:
            record.price_text,

        price_gbp:
            normalizePrice(
                record.price_text
            ),

        availability_text:
            record.availability_text,

        rating_text:
            record.rating_text,

        description:
            record.description,

        source_page:
            record.source_page,

        fetched_at:
            record.fetched_at,
    };
}

/* =========================================================
   STAGE 4
   ZOD SCHEMA
========================================================= */

const bookSchema =
    z.object({
        title:
            z.string()
                .min(1),

        product_url:
            z.string()
                .url(),

        price_text:
            z.string()
                .min(1),

        price_gbp:
            z.number()
                .finite()
                .nonnegative(),

        availability_text:
            z.string()
                .min(1),

        rating_text:
            z.string()
                .nullable(),

        description:
            z.string()
                .nullable(),

        source_page:
            z.string()
                .url(),

        fetched_at:
            z.string()
                .datetime(),
    });

async function normalizeAndValidate(
    rawRecords
) {
    const validBooks = [];
    const errors = [];

    for (
        let index = 0;
        index <
        rawRecords.length;
        index++
    ) {
        const rawRecord =
            rawRecords[index];

        const normalized =
            normalizeBook(
                rawRecord
            );

        const result =
            bookSchema.safeParse(
                normalized
            );

        if (
            result.success
        ) {
            validBooks.push(
                result.data
            );
        } else {
            errors.push({
                index,
                product_url:
                    rawRecord.product_url,
                errors:
                    result.error.issues,
            });
        }
    }

    await fs.mkdir(
        OUTPUT_DIR,
        {
            recursive: true,
        }
    );

    await fs.writeFile(
        BOOKS_OUTPUT_FILE,
        JSON.stringify(
            validBooks,
            null,
            2
        ),
        "utf8"
    );

    await fs.writeFile(
        ERRORS_OUTPUT_FILE,
        JSON.stringify(
            errors,
            null,
            2
        ),
        "utf8"
    );

    return {
        validBooks,
        errors,
    };
}

/* =========================================================
   STAGE 5
   RESILIENT FETCH
========================================================= */

async function fetchDetailPageResilient(
    url,
    cacheFile,
    label,
    report
) {
    // First use local cache.
    try {
        const cachedHtml =
            await fs.readFile(
                cacheFile,
                "utf8"
            );

        report.cache_hits += 1;

        console.log(
            `CACHE HIT: ${label}`
        );

        return {
            success: true,
            html: cachedHtml,
            fromCache: true,
        };
    } catch (error) {
        if (
            error.code !==
            "ENOENT"
        ) {
            throw error;
        }
    }

    // Maximum two attempts:
    // initial request + one retry.
    for (
        let attempt = 1;
        attempt <= 2;
        attempt++
    ) {
        await waitForPoliteRequest();

        console.log(
            `FETCH: ${label} | attempt=${attempt}`
        );

        console.log(
            `url=${url}`
        );

        const controller =
            new AbortController();

        const timeout =
            setTimeout(() => {
                controller.abort();
            }, TIMEOUT_MS);

        try {
            const response =
                await fetch(
                    url,
                    {
                        headers: {
                            "User-Agent":
                                USER_AGENT,
                        },
                        signal:
                            controller.signal,
                    }
                );

            lastRequestTime =
                Date.now();

            console.log(
                `status=${response.status}`
            );

            // HTTP 200 = success
            if (
                response.status === 200
            ) {
                const html =
                    await response.text();

                await fs.mkdir(
                    path.dirname(
                        cacheFile
                    ),
                    {
                        recursive: true,
                    }
                );

                await fs.writeFile(
                    cacheFile,
                    html,
                    "utf8"
                );

                report.pages_fetched +=
                    1;

                return {
                    success: true,
                    html,
                    fromCache: false,
                };
            }

            // Do NOT retry 403.
            if (
                response.status === 403
            ) {
                return {
                    success: false,
                    status: 403,
                    reason:
                        "HTTP 403 - Forbidden",
                };
            }

            // Do NOT retry 404.
            if (
                response.status === 404
            ) {
                return {
                    success: false,
                    status: 404,
                    reason:
                        "HTTP 404 - Not Found",
                };
            }

            // Retry 5xx exactly once.
            if (
                response.status >=
                    500 &&
                response.status <=
                    599
            ) {
                if (
                    attempt === 1
                ) {
                    console.log(
                        `SERVER ERROR ${response.status} - retrying once after ${RETRY_WAIT_MS}ms...`
                    );

                    await sleep(
                        RETRY_WAIT_MS
                    );

                    continue;
                }

                return {
                    success: false,
                    status:
                        response.status,
                    reason:
                        `HTTP ${response.status} after retry`,
                };
            }

            // Other non-200 status:
            // fail without retry.
            return {
                success: false,
                status:
                    response.status,
                reason:
                    `HTTP ${response.status}`,
            };
        } catch (error) {
            // Timeout/network error:
            // retry exactly once.
            if (
                attempt === 1
            ) {
                console.log(
                    `REQUEST ERROR - retrying once after ${RETRY_WAIT_MS}ms: ${error.message}`
                );

                await sleep(
                    RETRY_WAIT_MS
                );

                continue;
            }

            return {
                success: false,
                status: null,
                reason:
                    error.message,
            };
        } finally {
            clearTimeout(
                timeout
            );
        }
    }

    return {
        success: false,
        status: null,
        reason:
            "Request failed after retry",
    };
}

/* =========================================================
   STAGE 5
   FULL RUN + REPORT
========================================================= */

async function runStage5() {
    const startTime =
        Date.now();

    const startTimestamp =
        new Date().toISOString();

    const report = {
        start_time:
            startTimestamp,

        duration_ms:
            0,

        pages_fetched:
            0,

        cache_hits:
            0,

        valid_records:
            0,

        invalid_records:
            0,

        failed_pages:
            0,

        failures: [],
    };

    console.log(
        "=== STAGE 5: FAILURE HANDLING + RUN REPORT ==="
    );

    console.log("");

    /*
     * Discover exactly the first
     * three catalogue pages.
     */
    const bookEntries =
        await discoverBookUrls();

    if (
        bookEntries.length !==
        60
    ) {
        throw new Error(
            `Expected 60 book URLs, found ${bookEntries.length}`
        );
    }

    /*
     * Add ONE deliberately fake
     * URL for Stage 5 failure testing.
     */
    const testEntries = [
        ...bookEntries,
        {
            product_url:
                FAKE_TEST_URL,

            source_page:
                "stage-5-failure-test",
        },
    ];

    const rawRecords = [];

    /*
     * Process every detail page
     * independently.
     */
    for (
        let index = 0;
        index <
        testEntries.length;
        index++
    ) {
        const entry =
            testEntries[index];

        const isFake =
            entry.product_url ===
            FAKE_TEST_URL;

        const label = isFake
            ? "fake failure test page"
            : `detail page ${index + 1}/60`;

        const cacheFile = isFake
            ? path.join(
                  CACHE_DIR,
                  "details",
                  "fake-test.html"
              )
            : getDetailCacheFile(
                  index + 1
              );

        const result =
            await fetchDetailPageResilient(
                entry.product_url,
                cacheFile,
                label,
                report
            );

        /*
         * One failed page should not
         * stop the whole scraper.
         */
        if (
            !result.success
        ) {
            report.failures.push({
                url:
                    entry.product_url,

                status:
                    result.status,

                reason:
                    result.reason,
            });

            console.log(
                `SKIPPED: ${entry.product_url}`
            );

            continue;
        }

        const fetchedAt =
            new Date().toISOString();

        const record =
            extractBookRecord(
                result.html,
                entry.product_url,
                entry.source_page,
                fetchedAt
            );

        rawRecords.push(
            record
        );

        console.log(
            `processed=${rawRecords.length}/60`
        );
    }

    /*
     * Save raw records.
     */
    await fs.mkdir(
        OUTPUT_DIR,
        {
            recursive: true,
        }
    );

    await fs.writeFile(
        RAW_OUTPUT_FILE,
        JSON.stringify(
            rawRecords,
            null,
            2
        ),
        "utf8"
    );

    /*
     * Normalize + validate
     * using Stage 4 logic.
     */
    const {
        validBooks,
        errors,
    } =
        await normalizeAndValidate(
            rawRecords
        );

    report.valid_records =
        validBooks.length;

    report.invalid_records =
        errors.length;

    report.failed_pages =
        report.failures.length;

    report.duration_ms =
        Date.now() -
        startTime;

    /*
     * Write final run report.
     */
    await fs.writeFile(
        RUN_REPORT_FILE,
        JSON.stringify(
            report,
            null,
            2
        ),
        "utf8"
    );

    console.log("");

    console.log(
        "=== STAGE 5 CHECKPOINT ==="
    );

    console.log(
        `pages_fetched=${report.pages_fetched}`
    );

    console.log(
        `cache_hits=${report.cache_hits}`
    );

    console.log(
        `valid_records=${report.valid_records}`
    );

    console.log(
        `invalid_records=${report.invalid_records}`
    );

    console.log(
        `failed_pages=${report.failed_pages}`
    );

    console.log(
        `duration_ms=${report.duration_ms}`
    );

    console.log(
        `report=${RUN_REPORT_FILE}`
    );

    console.log("");

    /*
     * Required Stage 5 checks.
     */
    if (
        report.valid_records !==
        60
    ) {
        throw new Error(
            `Expected 60 valid records, found ${report.valid_records}`
        );
    }

    if (
        report.invalid_records !==
        0
    ) {
        throw new Error(
            `Expected 0 invalid records, found ${report.invalid_records}`
        );
    }

    if (
        report.failed_pages !==
        1
    ) {
        throw new Error(
            `Expected 1 failed page, found ${report.failed_pages}`
        );
    }

    /*
     * Final success message.
     */
    console.log(
        "STAGE 5 PASSED"
    );
}

/* =========================================================
   MAIN
========================================================= */

async function main() {
    try {
        await runStage5();
    } catch (error) {
        if (
            error.name ===
            "AbortError"
        ) {
            console.error(
                `ERROR: Request timed out after ${TIMEOUT_MS}ms`
            );
        } else {
            console.error(
                `ERROR: ${error.message}`
            );
        }

        process.exitCode = 1;
    }
}

main();