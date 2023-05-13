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

async function fetchBackendJson<T>(
  url: string,
  requestInit?: RequestInit
): Promise<T> {
  const response = await fetch(url, requestInit);
  const data = await response.json();
  if (response.ok) {
    return data;
  } else {
    throw Error(data?.error || data || response.statusText);
  }
}

export { SERVICE_URL, createFetchOptions, fetchBackendJson };
