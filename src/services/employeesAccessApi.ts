import { apiRequest } from "./apiClient";
import type { ApiResponse } from "./genericApi";
export interface Employee {
  id: string;
  company_id: string;
  company_name: string;
  employee_number: string;
  nik: string;
  name: string;
  gender: string;
  phone_number: string;
  dob: string;
  age_detail: string;
}

export interface Examination {
  id: string;
  mcu_package: string;
  notes: string;
  result: string;
}

export interface Batch {
  id: string;
  batch_code: string;
  exam_date: string;
  location: string;
  notes: string;
  status: string;
  examination: Examination | string;
}

export interface MyEmployeeResponse {
  employee: Employee;
  batches: Batch[];
}

export const getMyEmployee = () =>
  apiRequest<ApiResponse<MyEmployeeResponse>>("get", "/company-employees/me");
