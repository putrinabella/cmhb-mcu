import { apiRequest } from "./apiClient";
import {
  getPaginatedResource,
  type PaginatedParams,
  type ApiResponse,
  type PaginatedResponse,
} from "./genericApi";

export interface CompanyItem {
  id: string;
  name: string;
  code: string;
  address: string;
  phone: string;
  email: string;
}

// Ambil daftar perusahaan (pakai helper generic)
export const getCompanies = async (
  params: PaginatedParams
): Promise<PaginatedResponse<CompanyItem>> => {
  const res: ApiResponse<PaginatedResponse<CompanyItem>> =
    await getPaginatedResource<CompanyItem>("/companies", params);

  return res.data; //
};

// Ambil detail perusahaan tertentu (endpoint unik)
export const getCompanyDetail = (id: string) =>
  apiRequest<ApiResponse<CompanyItem>>("get", `/companies/${id}`);

// Update data perusahaan (endpoint unik)
export const updateCompany = (id: string, data: Partial<CompanyItem>) =>
  apiRequest<ApiResponse<CompanyItem>>("put", `/companies/${id}`, data);
