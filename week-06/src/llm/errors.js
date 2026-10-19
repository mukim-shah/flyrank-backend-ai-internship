
function isTimeoutError(error) {
  return (
    error?.name === "APIConnectionTimeoutError" ||
    error?.name === "TimeoutError" ||
    error?.name === "AbortError" ||
    error?.code === "ETIMEDOUT" ||
    error?.code === "UND_ERR_CONNECT_TIMEOUT"
  );
}

module.exports = { isTimeoutError };
