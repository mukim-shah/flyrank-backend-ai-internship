const fs = require("fs/promises");
const path = require("path");
const cheerio = require("cheerio");

const START_URL = "https://books.toscrape.com/";

const CACHE_DIR = path.join(__dirname, "..", "cache");
const OUTPUT_DIR = path.join(__dirname, "..", "output");

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
        const cachedHtml = await fs.readFile(cacheFile, "utf8");

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

        await fs.mkdir(path.dirname(cacheFile), {
            recursive: true,
        });

        await fs.writeFile(cacheFile, html, "utf8");

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

    $("article.product_pod h3 a").each((index, element) => {
        const href = $(element).attr("href");

        if (!href) {
            return;
        }

        const absoluteUrl = new URL(href, pageUrl).href;

        links.push(absoluteUrl);
    });

    return links;
}

function extractNextUrl(html, pageUrl) {
    const $ = cheerio.load(html);

    const nextHref = $("li.next a").attr("href");

    if (!nextHref) {
        return null;
    }

    return new URL(nextHref, pageUrl).href;
}

async function discoverBookUrls() {
    const allBookUrls = new Map();

    let currentUrl = START_URL;
    let cataloguePages = 0;

    while (cataloguePages < 3) {
        const pageNumber = cataloguePages + 1;

        const cacheFile = getCatalogueCacheFile(pageNumber);

        const { html } = await fetchPage(
            currentUrl,
            cacheFile,
            `catalogue page ${pageNumber}`
        );

        const bookLinks = extractBookLinks(
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

        const nextUrl = extractNextUrl(
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
    console.log(`catalogue_pages=${cataloguePages}`);
    console.log(`discovered=${cataloguePages * 20}`);
    console.log(`unique_urls=${allBookUrls.size}`);

    return Array.from(allBookUrls.values());
}

function extractRating($) {
    const ratingClass = $(".product_main .star-rating")
        .attr("class");

    if (!ratingClass) {
        return null;
    }

    const ratingParts = ratingClass.split(/\s+/);

    return (
        ratingParts.find(
            (part) => part !== "star-rating"
        ) || null
    );
}

function extractDescription($) {
    const descriptionHeading = $("#product_description");

    if (!descriptionHeading.length) {
        return null;
    }

    const description = descriptionHeading
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

    const title = $(".product_main h1")
        .text()
        .trim();

    const priceText = $(".product_main .price_color")
        .first()
        .text()
        .trim();

    const availabilityText = $(".product_main .availability")
        .text()
        .replace(/\s+/g, " ")
        .trim();

    const ratingText = extractRating($);

    const description = extractDescription($);

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

async function extractDetailRecords(bookEntries) {
    const records = [];

    for (let index = 0; index < bookEntries.length; index++) {
        const entry = bookEntries[index];

        const bookNumber = index + 1;

        const cacheFile = getDetailCacheFile(bookNumber);

        const fetchedAt = new Date().toISOString();

        const { html } = await fetchPage(
            entry.product_url,
            cacheFile,
            `detail page ${bookNumber}/60`
        );

        const record = extractBookRecord(
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

async function main() {
    try {
        console.log("=== STAGE 3: DETAIL PAGE EXTRACTION ===");
        console.log("");

        const bookEntries = await discoverBookUrls();

        if (bookEntries.length !== 60) {
            throw new Error(
                `Expected 60 unique book URLs, found ${bookEntries.length}`
            );
        }

        console.log("");
        console.log("Starting detail page extraction...");
        console.log("");

        const records = await extractDetailRecords(
            bookEntries
        );

        await fs.mkdir(OUTPUT_DIR, {
            recursive: true,
        });

        const rawOutputFile = path.join(
            OUTPUT_DIR,
            "raw-books.json"
        );

        await fs.writeFile(
            rawOutputFile,
            JSON.stringify(records, null, 2),
            "utf8"
        );

        console.log("");
        console.log("=== STAGE 3 CHECKPOINT ===");
        console.log(`detail_pages=${records.length}`);
        console.log(`raw_records=${records.length}`);
        console.log(`output=${rawOutputFile}`);
        console.log("");

        if (records.length > 0) {
            console.log("First raw record:");
            console.log(
                JSON.stringify(records[0], null, 2)
            );
        }
    } catch (error) {
        if (error.name === "AbortError") {
            console.error(
                `ERROR: Request timed out after ${TIMEOUT_MS}ms`
            );
        } else {
            console.error(`ERROR: ${error.message}`);
        }

        process.exitCode = 1;
    }
}

main();