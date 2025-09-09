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
  is_visible_to_employee: 0 | 1;
  examination_batch_id: ExaminationBatch;
  company_employee: CompanyEmployee;
  mcu_package: McuPackage;
  notes: string;
  created_at: string;
  result?: { id: string; created_at: string } | string;
}

// Fetch paginated list
export const getExamination = async (
  params: PaginatedParams
): Promise<PaginatedResponse<ExaminationItem>> => {
  const res: ApiResponse<PaginatedResponse<ExaminationItem>> =
    await getPaginatedResource<ExaminationItem>("/examination-batches", params);

  return res.data;
};

// Fetch single detail
export const getExaminationDetail = (id: string) =>
  apiRequest<ApiResponse<ExaminationItem>>("get", `/examination-batches/${id}`);

// new
export const getExaminationsByBatch = async (
  batchId: string,
  params: PaginatedParams
): Promise<PaginatedResponse<ExaminationItem>> => {
  const res = await getPaginatedResource<ExaminationItem>(
    `/examination-batches/${batchId}`,
    params
  );
  return res.data;
};

export const updateExaminationAccess = async (updates: {
  examinations: { id: string; is_visible_to_employee: 0 | 1 }[];
}) => {
  return apiRequest("post", "/examinations/access", updates);
};

export const toggleExaminationAccess = (id: string, isVisible: 0 | 1) =>
  apiRequest("post", `/examinations/access`, {
    examinations: [{ id, is_visible_to_employee: isVisible }],
  });
// export const toggleExaminationAccess = (id: string, isVisible: 0 | 1) => {
//   const user = JSON.parse(localStorage.getItem("user") || "{}");
//   const companyId = user.company?.id;

//   return apiRequest("post", `/examinations/access`, {
//     company_id: companyId, // <-- tambahkan ini
//     examinations: [{ id, is_visible_to_employee: isVisible }],
//   });
// };
