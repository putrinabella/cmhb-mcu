// // services/companyAPI.ts
// import { apiRequest } from "./apiClient";

// export interface CompanyItem {
//   name: string;
//   code: string;
// }

// export const getCompanyList = async (
//   search?: string
// ): Promise<CompanyItem[]> => {
//   // langsung rakit URL query string
//   const url = search
//     ? `/company-list?search=${encodeURIComponent(search)}`
//     : "/company-list";
//   const res = await apiRequest("get", url);

//   return Array.isArray(res.data?.data) ? res.data.data : [];
// };
// services/companyAPI.ts
import { apiRequest } from "./apiClient";

export interface CompanyItem {
  name: string;
  code: string;
}

export const getCompanyList = async (
  search?: string
): Promise<CompanyItem[]> => {
  const url = search
    ? `/company-list?search=${encodeURIComponent(search)}`
    : "/company-list";

  const res = await apiRequest("get", url);

  // Pastikan ini sesuai dengan bentuk response asli
  // Kalau res = { meta: {...}, data: [...] }
  return Array.isArray(res.data) ? res.data : [];
};
