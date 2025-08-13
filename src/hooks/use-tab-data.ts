import { useState, useEffect } from "react";
import axios, { AxiosError } from "axios";

interface UseTabDataResult<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
}

// Cache global untuk setiap URL
const cache: Record<string, any> = {};

export default function useTabData<T = any>(
  apiUrl: string | null
): UseTabDataResult<T> {
  const [data, setData] = useState<T | null>(
    apiUrl && cache[apiUrl] ? cache[apiUrl] : null
  );
  const [loading, setLoading] = useState<boolean>(
    !apiUrl ? false : !cache[apiUrl]
  );
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!apiUrl) return;

    // Pakai data cached jika ada
    if (cache[apiUrl]) {
      setData(cache[apiUrl]);
      setLoading(false);
      return;
    }

    let isMounted = true;
    setLoading(true);

    axios
      .get<T>(apiUrl)
      .then((res) => {
        if (!isMounted) return;
        cache[apiUrl] = res.data; // simpan ke cache
        setData(res.data);
        setLoading(false);
      })
      .catch((err: AxiosError) => {
        if (!isMounted) return;
        setError(err);
        setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [apiUrl]);

  return { data, loading, error };
}
