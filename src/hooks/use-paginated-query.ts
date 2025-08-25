import { useEffect, useState, useRef } from "react";
export type UsePaginatedQueryOptions<TItem, TParams> = {
  queryFn: (params: TParams) => Promise<TItem>;
  params: TParams;
};

export function usePaginatedQuery<TItem, TParams>({
  queryFn,
  params,
}: UsePaginatedQueryOptions<TItem, TParams>) {
  const [data, setData] = useState<TItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const cacheRef = useRef<Record<string, TItem>>({});
  const key = JSON.stringify(params);
  const fetchData = async (force = false) => {
    setLoading(true);
    setError(null);

    // gunakan cache bila ada, kecuali force = true
    if (!force && cacheRef.current[key]) {
      console.log("📦 Using cache:", key);
      setData(cacheRef.current[key]);
      setLoading(false);
      return;
    }

    try {
      console.log("🌐 Fetching data:", params);
      const res = await queryFn(params);
      cacheRef.current[key] = res;
      setData(res);
    } catch (e: any) {
      setError(e.message ?? "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [key]);

  const invalidateCache = () => {
    cacheRef.current = {};
    setData(null);
    console.log("🗑️ Cache cleared");
  };

  const invalidateCacheFor = (partial: Partial<TParams>) => {
    const partialKey = JSON.stringify(partial);
    Object.keys(cacheRef.current).forEach((k) => {
      if (k.includes(partialKey)) {
        console.log("🗑️ Cache invalidated for:", k);
        delete cacheRef.current[k];
      }
    });
  };

  return {
    data,
    loading,
    error,
    refetch: (force = false) => fetchData(force),
    invalidateCache,
    invalidateCacheFor,
  };
}
