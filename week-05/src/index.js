const fs = require("fs/promises");
const path = require("path");
const cheerio = require("cheerio");

const START_URL = "https://books.toscrape.com/";

const CACHE_DIR = path.join(__dirname, "..", "cache");

const USER_AGENT =
    "FlyRankInternship-A9/1.0 (+https://github.com/mukim-shah/flyrank-backend-ai-internship)";

const TIMEOUT_MS = 5000;
const MIN_DELAY_MS = 500;

let lastRequestTime = 0;

function getCacheFile(pageNumber) {
    return path.join(
        CACHE_DIR,
        `catalogue-page-${pageNumber}.html`
    );
}

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

async function fetchPage(url, pageNumber) {
    const cacheFile = getCacheFile(pageNumber);

    // Use cache if this page was already downloaded.
    try {
        const cachedHtml = await fs.readFile(cacheFile, "utf8");

        console.log(`CACHE HIT: page ${pageNumber}`);

        return {
            html: cachedHtml,
            fromCache: true,
        };
    } catch (error) {
        if (error.code !== "ENOENT") {
            throw error;
        }
    }

    // Wait before a real request if needed.
    await waitForPoliteRequest();

    console.log(`FETCH: page ${pageNumber}`);
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

        await fs.mkdir(CACHE_DIR, {
            recursive: true,
        });

        await fs.writeFile(cacheFile, html, "utf8");

        console.log(
            `response_size=${Buffer.byteLength(html)} bytes`
        );

        console.log(`cached=${cacheFile}`);

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

async function main() {
    try {
        const allBookUrls = new Set();

        let currentUrl = START_URL;
        let cataloguePages = 0;

        while (cataloguePages < 3) {
            const pageNumber = cataloguePages + 1;

            const { html } = await fetchPage(
                currentUrl,
                pageNumber
            );

            const bookLinks = extractBookLinks(
                html,
                currentUrl
            );

            console.log(
                `page_${pageNumber}_books=${bookLinks.length}`
            );

            for (const url of bookLinks) {
                allBookUrls.add(url);
            }

            cataloguePages += 1;

            // Stop after exactly 3 catalogue pages.
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