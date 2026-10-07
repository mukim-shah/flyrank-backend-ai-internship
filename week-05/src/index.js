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

const USER_AGENT =
    "FlyRankInternship-A9/1.0 (+https://github.com/mukim-shah/flyrank-backend-ai-internship)";

const TIMEOUT_MS = 5000;
const MIN_DELAY_MS = 500;

let lastRequestTime = 0;

function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

async function waitForPoliteRequest() {
    const now = Date.now();
    const elapsed = now - lastRequestTime;

    if (lastRequestTime > 0 && elapsed < MIN_DELAY_MS) {
        await sleep(MIN_DELAY_MS - elapsed);
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

async function fetchPage(url, cacheFile, label) {
    try {
        const cachedHtml = await fs.readFile(
            cacheFile,
            "utf8"
        );

        console.log(`CACHE HIT: ${label}`);

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

    console.log(`FETCH: ${label}`);
    console.log(`url=${url}`);

    const controller = new AbortController();

    const timeout = setTimeout(() => {
        controller.abort();
    }, TIMEOUT_MS);

    try {
        const response = await fetch(url, {
            headers: {
                "User-Agent": USER_AGENT,
            },
            signal: controller.signal,
        });

        lastRequestTime = Date.now();

        console.log(`status=${response.status}`);

        if (response.status !== 200) {
            throw new Error(
                `Fetch failed with HTTP status ${response.status}`
            );
        }

        const html = await response.text();

        await fs.mkdir(
            path.dirname(cacheFile),
            { recursive: true }
        );

        await fs.writeFile(
            cacheFile,
            html,
            "utf8"
        );

        console.log(
            `response_size=${Buffer.byteLength(html)} bytes`
        );

        return {
            html,
            fromCache: false,
        };
    } finally {
        clearTimeout(timeout);
    }
}

function extractBookLinks(html, pageUrl) {
    const $ = cheerio.load(html);

    const links = [];

    $("article.product_pod h3 a").each(
        (index, element) => {
            const href = $(element).attr("href");

            if (!href) {
                return;
            }

            const absoluteUrl =
                new URL(href, pageUrl).href;

            links.push(absoluteUrl);
        }
    );

    return links;
}

function extractNextUrl(html, pageUrl) {
    const $ = cheerio.load(html);

    const nextHref = $("li.next a").attr("href");

    if (!nextHref) {
        return null;
    }

    return new URL(
        nextHref,
        pageUrl
    ).href;
}

async function discoverBookUrls() {
    const allBookUrls = new Map();

    let currentUrl = START_URL;
    let cataloguePages = 0;

    while (cataloguePages < 3) {
        const pageNumber =
            cataloguePages + 1;

        const cacheFile =
            getCatalogueCacheFile(pageNumber);

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

        for (const url of bookLinks) {
            if (!allBookUrls.has(url)) {
                allBookUrls.set(url, {
                    product_url: url,
                    source_page: currentUrl,
                });
            }
        }

        cataloguePages += 1;

        if (cataloguePages === 3) {
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

        currentUrl = nextUrl;
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

function extractRating($) {
    const ratingClass =
        $(".product_main .star-rating")
            .attr("class");

    if (!ratingClass) {
        return null;
    }

    const ratingParts =
        ratingClass.split(/\s+/);

    return (
        ratingParts.find(
            (part) =>
                part !== "star-rating"
        ) || null
    );
}

function extractDescription($) {
    const descriptionHeading =
        $("#product_description");

    if (!descriptionHeading.length) {
        return null;
    }

    const description =
        descriptionHeading
            .next("p")
            .text()
            .trim();

    return description || null;
}

function extractBookRecord(
    html,
    productUrl,
    sourcePage,
    fetchedAt
) {
    const $ = cheerio.load(html);

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
            .replace(/\s+/g, " ")
            .trim();

    const ratingText =
        extractRating($);

    const description =
        extractDescription($);

    return {
        title,
        product_url: productUrl,
        price_text: priceText,
        availability_text: availabilityText,
        rating_text: ratingText,
        description,
        source_page: sourcePage,
        fetched_at: fetchedAt,
    };
}

async function extractDetailRecords(
    bookEntries
) {
    const records = [];

    for (
        let index = 0;
        index < bookEntries.length;
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

        records.push(record);

        console.log(
            `extracted=${bookNumber}/60 | title=${record.title}`
        );
    }

    return records;
}

/* -----------------------------
   STAGE 4: NORMALIZATION
----------------------------- */

function normalizePrice(priceText) {
    if (
        typeof priceText !== "string" ||
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

    if (!Number.isFinite(numericValue)) {
        return null;
    }

    return numericValue;
}

function normalizeProductUrl(productUrl) {
    try {
        const url = new URL(productUrl);

        url.hash = "";

        return url.href;
    } catch {
        return productUrl;
    }
}

function normalizeBook(record) {
    return {
        title: record.title,
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

/* -----------------------------
   STAGE 4: ZOD SCHEMA
----------------------------- */

const bookSchema = z.object({
    title: z.string().min(1),

    product_url: z
        .string()
        .url(),

    price_text: z
        .string()
        .min(1),

    price_gbp: z
        .number()
        .finite()
        .nonnegative(),

    availability_text: z
        .string()
        .min(1),

    rating_text: z
        .string()
        .nullable(),

    description: z
        .string()
        .nullable(),

    source_page: z
        .string()
        .url(),

    fetched_at: z
        .string()
        .datetime(),
});

async function normalizeAndValidate(
    rawRecords
) {
    const validBooks = [];
    const errors = [];

    for (
        let index = 0;
        index < rawRecords.length;
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

        if (result.success) {
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
        { recursive: true }
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

async function main() {
    try {
        console.log(
            "=== STAGE 4: NORMALIZE + VALIDATE ==="
        );

        console.log("");

        const bookEntries =
            await discoverBookUrls();

        if (bookEntries.length !== 60) {
            throw new Error(
                `Expected 60 unique book URLs, found ${bookEntries.length}`
            );
        }

        console.log("");
        console.log(
            "Loading raw detail records..."
        );

        let rawRecords;

        try {
            const rawJson =
                await fs.readFile(
                    RAW_OUTPUT_FILE,
                    "utf8"
                );

            rawRecords =
                JSON.parse(rawJson);
        } catch {
            console.log(
                "raw-books.json not found. Extracting detail pages..."
            );

            rawRecords =
                await extractDetailRecords(
                    bookEntries
                );

            await fs.mkdir(
                OUTPUT_DIR,
                { recursive: true }
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
        }

        console.log(
            `raw_records=${rawRecords.length}`
        );

        const {
            validBooks,
            errors,
        } =
            await normalizeAndValidate(
                rawRecords
            );

        console.log("");
        console.log(
            "=== STAGE 4 CHECKPOINT ==="
        );

        console.log(
            `valid=${validBooks.length}`
        );

        console.log(
            `invalid=${errors.length}`
        );

        console.log(
            `books_file=${BOOKS_OUTPUT_FILE}`
        );

        console.log(
            `errors_file=${ERRORS_OUTPUT_FILE}`
        );

        if (validBooks.length > 0) {
            console.log("");
            console.log(
                "First normalized record:"
            );

            console.log(
                JSON.stringify(
                    validBooks[0],
                    null,
                    2
                )
            );
        }

        if (validBooks.length !== 60) {
            throw new Error(
                `Expected exactly 60 valid books, found ${validBooks.length}`
            );
        }

        if (errors.length !== 0) {
            throw new Error(
                `Expected 0 validation errors, found ${errors.length}`
            );
        }

        console.log("");
        console.log(
            "STAGE 4 PASSED"
        );
    } catch (error) {
        if (error.name === "AbortError") {
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