import { apiRequest } from "./apiClient";

export interface CompanyItem {
  id: string;
  name: string;
  code: string;
  address: string;
  phone: string;
  email: string;
}

export interface CompanyData {
  current_page: number;
  data: CompanyItem[];
  first_page_url: string;
  last_page: number;
  last_page_url: string;
  next_page_url: string | null;
  prev_page_url: string | null;
  total: number;
  per_page: number;
  from: number;
  to: number;
}

export interface CompanyResponse {
  meta: {
    success: boolean;
    message: string;
    code: number;
  };
  data: CompanyData;
}

// Parameter untuk query string
export interface CompanyQueryParams {
  page?: number; // nomor halaman
  per_page?: number; // jumlah per halaman
  search?: string; // kata kunci pencarian
  sort_by?: string; // kolom yang diurutkan
  sort_order?: "asc" | "desc"; // arah urut
  filters?: Record<string, any>; // filter dinamis (misal { status: "active" })
}

export const getCompanies = async (
  params: CompanyQueryParams = {}
): Promise<CompanyResponse> => {
  // Ubah filters ke query string
  const filtersQuery = params.filters
    ? Object.entries(params.filters)
        .map(
          ([key, value]) =>
            `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
        )
        .join("&")
    : "";

  // Gabung semua params ke query string
  const query = new URLSearchParams();

  if (params.page) query.append("page", String(params.page));
  if (params.per_page) query.append("per_page", String(params.per_page));
  if (params.search) query.append("search", params.search);
  if (params.sort_by) query.append("sort_by", params.sort_by);
  if (params.sort_order) query.append("sort_order", params.sort_order);
  if (filtersQuery) query.append("filters", filtersQuery);

  return apiRequest<CompanyResponse>("get", `/companies?${query.toString()}`);
};
