
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function createDeadlineError() {
  const error = new Error("LLM request deadline exceeded");
  error.name = "APIConnectionTimeoutError";
  error.code = "ETIMEDOUT";
  return error;
}

function getStatusCode(error) {
  return error?.status ?? error?.statusCode ?? null;
}

function isRetryable(error) {
  const status = getStatusCode(error);

  if ([400, 401, 403].includes(status)) {
    return false;
  }

  if (status === 429 || (status >= 500 && status <= 599)) {
    return true;
  }

  return (
    error?.name === "APIConnectionTimeoutError" ||
    error?.name === "APIConnectionError" ||
    error?.name === "TimeoutError" ||
    error?.name === "AbortError" ||
    error?.code === "ETIMEDOUT" ||
    error?.code === "ECONNRESET"
  );
}

function getRetryAfterMs(error) {
  const value =
    error?.headers?.get?.("retry-after") ??
    error?.headers?.["retry-after"];

  if (value === undefined || value === null) {
    return null;
  }

  const seconds = Number(value);

  if (Number.isFinite(seconds) && seconds >= 0) {
    return seconds * 1000;
  }

  const dateMs = Date.parse(value);

  if (Number.isFinite(dateMs)) {
    return Math.max(0, dateMs - Date.now());
  }

  return null;
}

async function withRetry(operation, options = {}) {
  const maxAttempts = options.maxAttempts ?? 3;
  const baseDelayMs = options.baseDelayMs ?? 500;
  const maxDelayMs = options.maxDelayMs ?? 8000;
  const deadline = options.deadline ?? Infinity;

  for (let attempt = 1; attempt <= maxAttempts; attempt += 1) {
    if (Date.now() >= deadline) {
      throw createDeadlineError();
    }

    try {
      return await operation({ attempt, deadline });
    } catch (error) {
      if (
        attempt >= maxAttempts ||
        !isRetryable(error) ||
        Date.now() >= deadline
      ) {
        throw error;
      }

      const retryAfterMs = getRetryAfterMs(error);
      const exponentialDelay = Math.min(
        baseDelayMs * 2 ** (attempt - 1),
        maxDelayMs
      );
      const jitter = Math.floor(Math.random() * 251);

      const delayMs =
        retryAfterMs === null
          ? exponentialDelay + jitter
          : retryAfterMs + jitter;

      const remainingMs = deadline - Date.now();

      // Do not retry earlier than Retry-After, and do not
      // sleep past the shared deadline.
      if (delayMs >= remainingMs) {
        throw createDeadlineError();
      }

      await sleep(delayMs);
    }
  }

  throw new Error("Retry attempts exhausted");
}

module.exports = {
  withRetry,
  isRetryable,
  getStatusCode,
  getRetryAfterMs,
};
