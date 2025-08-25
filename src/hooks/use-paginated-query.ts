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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const cacheRef = useRef<Record<string, TItem>>({});

  const fetchData = async (force = false, overrideParams?: TParams) => {
    setLoading(true);
    setError(null);

    const finalParams = overrideParams ?? params;
    const key = JSON.stringify(finalParams);

    if (!force && cacheRef.current[key]) {
      setData(cacheRef.current[key]);
      setLoading(false);
      return;
    }

    try {
      const res = await queryFn(finalParams);
      cacheRef.current[key] = res;
      setData(res);
    } catch (e: any) {
      setError(e.message ?? "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  // fetch sekali saat mount
  useEffect(() => {
    fetchData();
  }, []);

  return {
    data,
    loading,
    error,
    refetch: fetchData,
    invalidateCache: () => {
      cacheRef.current = {};
      setData(null);
    },
    invalidateCacheFor: (partial: Partial<TParams>) => {
      const partialKey = JSON.stringify(partial);
      Object.keys(cacheRef.current).forEach((k) => {
        if (k.includes(partialKey)) delete cacheRef.current[k];
      });
    },
  };
}
