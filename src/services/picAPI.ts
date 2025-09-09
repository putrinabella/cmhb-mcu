import { apiRequest } from "./apiClient";
import type { ApiResponse } from "./genericApi";

export interface PicProfile {
  id: string;
  company_id: string;
  company_name: string;
  user_id: string;
  email: string;
  name: string;
  position: string;
  department: string;
  phone_number: string;
}

export const getPicDetail = (id: string) =>
  apiRequest<ApiResponse<PicProfile>>("get", `/company-pics/${id}`);

// services/employeeAPI.ts atau companyPicAPI.ts
export const updatePicPassword = (id: string, password: string) =>
  apiRequest<ApiResponse<null>>("put", `/company-pics/${id}/password`, {
    password,
  });
