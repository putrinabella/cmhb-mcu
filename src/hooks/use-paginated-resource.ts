import { useSearchParams } from "react-router-dom";
import { usePaginatedQuery } from "./use-paginated-query";
import type {
  RequiredPaginatedParams,
  PaginatedResponse,
} from "@/services/genericApi";

type UsePaginatedResourceProps<TParams> = {
  queryFn: (params: TParams) => Promise<PaginatedResponse<any>>;
  defaultParams: Omit<TParams, "page">;
};

export function usePaginatedResource<
  TItem,
  TParams extends RequiredPaginatedParams = RequiredPaginatedParams
>({ queryFn, defaultParams }: UsePaginatedResourceProps<TParams>) {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams.get("page") || 1);
  const search = searchParams.get("search") || "";

  const {
    data: response,
    loading,
    error,
    refetch,
    invalidateCache,
  } = usePaginatedQuery<PaginatedResponse<TItem>, TParams>({
    queryFn,
    params: { ...defaultParams, page, search } as TParams,
  });

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= (response?.last_page ?? 1)) {
      setSearchParams((prev) => {
        const params = new URLSearchParams(prev);
        params.set("page", String(newPage));
        return params;
      });
    }
  };

  const handleSearch = (keyword: string) => {
    setSearchParams((prev) => {
      const params = new URLSearchParams(prev);
      params.set("page", "1");
      params.set("search", keyword);
      return params;
    });
  };

  return {
    data: response?.data ?? [],
    total: response?.total ?? 0,
    loading,
    error,
    lastPage: response?.last_page ?? 1,
    page,
    search,
    handlePageChange,
    handleSearch,
    refetch,
    invalidateCache,
  };
}

// export function usePaginatedResource<
//   TItem,
//   TParams extends RequiredPaginatedParams = RequiredPaginatedParams
// >({ queryFn, defaultParams }: UsePaginatedResourceProps<TParams>) {
//   const [searchParams, setSearchParams] = useSearchParams();
//   const page = Number(searchParams.get("page") || 1);
//   const search = searchParams.get("search") || "";

//   const {
//     data: response,
//     loading,
//     error,
//     refetch,
//     invalidateCache,
//   } = usePaginatedQuery<PaginatedResponse<TItem>, TParams>({
//     queryFn,
//     params: { ...defaultParams, page, search } as TParams, // ⬅ search ikut dikirim
//   });

//   const handlePageChange = (newPage: number) => {
//     if (newPage >= 1 && newPage <= (response?.last_page ?? 1)) {
//       setSearchParams((prev) => {
//         const params = new URLSearchParams(prev);
//         params.set("page", String(newPage));
//         return params;
//       });
//     }
//   };

//   const handleSearch = (keyword: string) => {
//     setSearchParams((prev) => {
//       const params = new URLSearchParams(prev);
//       params.set("page", "1");
//       params.set("search", keyword);
//       return params;
//     });
//   };

//   return {
//     data: response?.data ?? [],
//     total: response?.total ?? 0,
//     loading,
//     error,
//     lastPage: response?.last_page ?? 1,
//     page,
//     search,
//     handlePageChange,
//     handleSearch, // ⬅ expose handler untuk search
//     refetch,
//     invalidateCache,
//   };
// }
