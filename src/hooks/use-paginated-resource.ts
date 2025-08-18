// import { useSearchParams } from "react-router-dom";
// import { usePaginatedQuery } from "./use-paginated-query";
// import type {
//   RequiredPaginatedParams,
//   PaginatedResponse,
// } from "@/services/genericApi";
// type UsePaginatedResourceProps<TParams> = {
//   queryFn: (params: TParams) => Promise<PaginatedResponse<any>>;
//   defaultParams: Omit<TParams, "page">;
// };
// export function usePaginatedResource<
//   TItem,
//   TParams extends RequiredPaginatedParams = RequiredPaginatedParams
// >({ queryFn, defaultParams }: UsePaginatedResourceProps<TParams>) {
//   const [searchParams, setSearchParams] = useSearchParams();
//   const page = Number(searchParams.get("page") || 1);
//   const {
//     data: response,
//     loading,
//     error,
//     refetch,
//     invalidateCache,
//   } = usePaginatedQuery<PaginatedResponse<TItem>, TParams>({
//     queryFn,
//     params: { ...defaultParams, page } as TParams,
//   });
//   const handlePageChange = (newPage: number) => {
//     if (newPage >= 1 && newPage <= (response?.last_page ?? 1)) {
//       setSearchParams({ page: String(newPage) });
//     }
//   };
//   return {
//     data: response?.data ?? [],
//     total: response?.total ?? 0,
//     loading,
//     error,
//     lastPage: response?.last_page ?? 1,
//     page,
//     handlePageChange,
//     refetch,
//     invalidateCache,
//   };
// }
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

  const {
    data: response,
    loading,
    error,
    refetch,
    invalidateCache,
  } = usePaginatedQuery<PaginatedResponse<TItem>, TParams>({
    queryFn,
    params: { ...defaultParams, page } as TParams,
  });

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= (response?.last_page ?? 1)) {
      setSearchParams({ page: String(newPage) });
    }
  };

  return {
    data: response?.data ?? [],
    total: response?.total ?? 0,
    loading,
    error,
    lastPage: response?.last_page ?? 1,
    page,
    handlePageChange,
    refetch,
    invalidateCache,
  };
}
