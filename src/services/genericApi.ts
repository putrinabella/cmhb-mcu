import { apiRequest } from "./apiClient";

export interface PaginatedParams {
  page?: number;
  per_page?: number;
  search?: string;
  sort_by?: string;
  sort_order?: "asc" | "desc";
  filters?: Record<string, any>;
}
export interface RequiredPaginatedParams extends PaginatedParams {
  page: number;
}

export interface PaginatedResponse<T> {
  current_page: number;
  data: T[];
  last_page: number;
  total: number;
  per_page: number;
  from: number;
  to: number;
}

export interface ApiResponse<T> {
  errors: boolean;
  meta: {
    success: boolean;
    message: string;
    code: number;
  };
  data: T;
}

export const getPaginatedResource = async <T>(
  endpoint: string,
  params: PaginatedParams = {}
): Promise<ApiResponse<PaginatedResponse<T>>> => {
  const filtersQuery = params.filters
    ? Object.entries(params.filters)
        .map(
          ([key, value]) =>
            `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
        )
        .join("&")
    : "";

  const query = new URLSearchParams();
  if (params.page) query.append("page", String(params.page));
  if (params.per_page) query.append("per_page", String(params.per_page));
  if (params.search) query.append("search", params.search);
  if (params.sort_by) query.append("sort_by", params.sort_by);
  if (params.sort_order) query.append("sort_order", params.sort_order);
  if (filtersQuery) query.append("filters", filtersQuery);

  return apiRequest<ApiResponse<PaginatedResponse<T>>>(
    "get",
    `${endpoint}?${query.toString()}`
  );
};
