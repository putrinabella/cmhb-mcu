// import { useEffect, useState } from "react";

// export type UsePaginatedQueryOptions<TItem, TParams> = {
//   queryFn: (params: TParams) => Promise<TItem>;
//   params: TParams;
// };
// export function usePaginatedQuery<TItem, TParams>({
//   queryFn,
//   params,
// }: UsePaginatedQueryOptions<TItem, TParams>) {
//   const [data, setData] = useState<TItem | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const fetchData = async () => {
//     setLoading(true);
//     setError(null);
//     try {
//       const res = await queryFn(params);
//       setData(res);
//     } catch (e: any) {
//       setError(e.message ?? "Unknown error");
//     } finally {
//       setLoading(false);
//     }
//   };
//   useEffect(() => {
//     fetchData();
//   }, [JSON.stringify(params)]);
//   return {
//     data,
//     loading,
//     error,
//     refetch: fetchData,
//     invalidateCache: () => setData(null),
//   };
// }
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

  // Cache per page
  const cacheRef = useRef<Record<string, TItem>>({});

  const pageKey = (params as any).page ?? 1; // asumsi page selalu ada

  const fetchData = async (force = false) => {
    setLoading(true);
    setError(null);

    if (!force && cacheRef.current[pageKey]) {
      setData(cacheRef.current[pageKey]);
      setLoading(false);
      return;
    }

    try {
      const res = await queryFn(params);
      cacheRef.current[pageKey] = res; // simpan ke cache
      setData(res);
    } catch (e: any) {
      setError(e.message ?? "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [pageKey, JSON.stringify({ ...params, page: undefined })]);

  return {
    data,
    loading,
    error,
    refetch: fetchData, // refetch(true) untuk force reload
    invalidateCache: () => {
      cacheRef.current = {};
      setData(null);
    },
  };
}
