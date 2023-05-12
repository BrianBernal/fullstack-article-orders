import { useEffect, useState } from "react";

const INITIAL_ERROR = { error: "" };

type response<T> = {
  ok: boolean;
  data: T | null;
};

type TUseFetchServiceOptions<T> = {
  payload?: T;
  initialData?: T | null;
};

function useFetchService<T>(
  service: (body: T) => Promise<T>,
  { payload = null as T, initialData = null }: TUseFetchServiceOptions<T>
) {
  const INITIAL_RESPONSE: response<T> = { ok: false, data: initialData };

  const [error, setError] = useState(INITIAL_ERROR);
  const [response, setResponse] = useState(INITIAL_RESPONSE);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    service(payload)
      .then((data) => {
        setResponse({ ok: true, data });
        setError(INITIAL_ERROR);
      })
      .catch((error) => {
        setResponse(INITIAL_RESPONSE);
        setError({ error: error.message || "Service error" });
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return { response, error, loading };
}

export default useFetchService;
