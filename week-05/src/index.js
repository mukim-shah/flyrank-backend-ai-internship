const fs = require("fs/promises");
const path = require("path");

const TARGET_URL = "https://books.toscrape.com/";
const CACHE_FILE = path.join(
    __dirname,
    "..",
    "cache",
    "catalogue-page-1.html"
);

const USER_AGENT =
    "FlyRankInternship-A9/1.0 (+https://github.com/mukim-shah/flyrank-backend-ai-internship)";

const TIMEOUT_MS = 5000;

async function fetchWithTimeout(url) {
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

        return response;
    } finally {
        clearTimeout(timeout);
    }
}

async function main() {
    try {
        // Check whether cached HTML already exists
        try {
            const cachedHtml = await fs.readFile(CACHE_FILE, "utf8");

            console.log("CACHE HIT");
            console.log(`response_size=${Buffer.byteLength(cachedHtml)} bytes`);

            return;
        } catch (error) {
            if (error.code !== "ENOENT") {
                throw error;
            }
        }

        // No cache found, so make the real request
        console.log("FETCH");

        const response = await fetchWithTimeout(TARGET_URL);

        console.log(`status=${response.status}`);

        if (response.status !== 200) {
            throw new Error(
                `Fetch failed with HTTP status ${response.status}`
            );
        }

        const html = await response.text();

        await fs.mkdir(path.dirname(CACHE_FILE), {
            recursive: true,
        });

        await fs.writeFile(CACHE_FILE, html, "utf8");

        console.log(
            `response_size=${Buffer.byteLength(html)} bytes`
        );

        console.log(`cached=${CACHE_FILE}`);
    } catch (error) {
        if (error.name === "AbortError") {
            console.error(`ERROR: Request timed out after ${TIMEOUT_MS}ms`);
        } else {
            console.error(`ERROR: ${error.message}`);
        }

        process.exitCode = 1;
    }
}

main();