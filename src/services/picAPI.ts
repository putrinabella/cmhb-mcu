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

// Ambil detail profile berdasarkan ID
export const getPicDetail = (id: string) =>
  apiRequest<ApiResponse<PicProfile>>("get", `/company-pics/${id}`);
