const BACKEND_PORT = import.meta.env.BACKEND_URL || 4000;
const BACKEND_HOST_URL = import.meta.env.BACKEND_HOST_URL || "http://localhost";
const BACKEND_HOSTNAME =
  import.meta.env.BACKEND_URL || `${BACKEND_HOST_URL}:${BACKEND_PORT}`;

const SERVICE_URL = Object.freeze({
  articles: `${BACKEND_HOSTNAME}/articles`,
  orders: `${BACKEND_HOSTNAME}/orders`,
});

type TMmethod = "POST" | "PATCH"; // only methods that should have body
function createFetchOptions(method: TMmethod, body = {}, headers = {}) {
  const fetchOptions = {
    method: method,
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
  };
  return fetchOptions;
}

async function fetchJsonFromBackend<T>(
  url: string,
  requestInit?: RequestInit
): Promise<T> {
  let response;

  // case: network error
  try {
    response = await fetch(url, requestInit);
  } catch (error) {
    throw Error("Network error.");
  }

  if (response.ok) {
    // case: successful with data
    try {
      return await response.json();
    } catch (error) {
      // case: successful with NO data
      return undefined as T;
    }
  }

  // case: error code with data response
  let responseErrorData;
  try {
    responseErrorData = await response.json();
  } catch (error) {
    responseErrorData = false;
  }

  if (typeof responseErrorData === "string") throw Error(responseErrorData);

  // case: error code without data
  throw Error(responseErrorData?.error || "Resource not found.");
}

export { SERVICE_URL, createFetchOptions, fetchJsonFromBackend };
