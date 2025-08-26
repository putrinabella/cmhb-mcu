import { useState } from "react";
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
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  const params: TParams = { ...defaultParams, page, search } as TParams;

  const {
    data: response,
    loading,
    error,
    refetch: refetchQuery,
    invalidateCache,
  } = usePaginatedQuery<PaginatedResponse<TItem>, TParams>({
    queryFn,
    params,
  });

  // const handlePageChange = (newPage: number) => {
  //   if (newPage >= 1 && newPage <= (response?.last_page ?? 1)) {
  //     setPage(newPage);
  //     // refetch dengan page baru
  //     refetchQuery(true);
  //   }
  // };
  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= (response?.last_page ?? 1)) {
      setPage(newPage);
      refetchQuery(true, {
        ...defaultParams,
        page: newPage,
        search,
      } as TParams);
    }
  };

  const handleSearch = (keyword: string) => {
    setPage(1);
    setSearch(keyword);
    // gunakan params baru langsung agar refetch memakai keyword baru
    refetchQuery(true, {
      ...defaultParams,
      page: 1,
      search: keyword,
    } as TParams);
  };

  const resetSearch = () => {
    setPage(1);
    setSearch("");
    refetchQuery(true, { ...defaultParams, page: 1, search: "" } as TParams);
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
    resetSearch,
    refetch: refetchQuery,
    invalidateCache,
  };
}
