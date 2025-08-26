import { apiRequest } from "./apiClient";
import {
  getPaginatedResource,
  type PaginatedParams,
  type ApiResponse,
  type PaginatedResponse,
} from "./genericApi";

// Nested types
export interface ExaminationBatch {
  id: string;
  company_id: string;
  batch_code: string;
  exam_date: string;
  location: string;
  notes: string;
  created_at: string;
}

export interface CompanyEmployee {
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

export interface McuPackage {
  id: string;
  code: string;
  name: string;
  description: string;
  price: string;
  publish_start: string;
  publish_end: string;
  is_active: number;
  created_at: string;
}

// Main item type
export interface ExaminationItem {
  id: string;
  examination_batch_id: ExaminationBatch;
  company_employee_id: CompanyEmployee;
  mcu_package: McuPackage;
  notes: string;
  created_at: string;
}

// Fetch paginated list
export const getExamination = async (
  params: PaginatedParams
): Promise<PaginatedResponse<ExaminationItem>> => {
  const res: ApiResponse<PaginatedResponse<ExaminationItem>> =
    await getPaginatedResource<ExaminationItem>("/examinations", params);

  return res.data;
};

// Fetch single detail
export const getExaminationDetail = (id: string) =>
  apiRequest<ApiResponse<ExaminationItem>>("get", `/examinations/${id}`);
