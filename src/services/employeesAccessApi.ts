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

export interface ExaminationResult {
  id: string;
  created_at: string;
}

export interface ExaminationFromBatch {
  id: string;
  mcu_package: string;
  notes: string;
  result: string;
}

export interface ExaminationDetail {
  id: string;
  examination_batch_id: string;
  company_employee: Employee;
  mcu_package: string | McuPackage;
  notes: string;
  created_at: string;
  isVisibleToEmployee: number;
  result: ExaminationResult | string;
}

export interface Batch {
  id: string;
  batch_code: string;
  exam_date: string;
  location: string;
  notes: string;
  status: string;
  examination: ExaminationFromBatch;
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
export interface MyEmployeeResponse {
  employee: Employee;
  batches: Batch[];
}

// Type guard untuk /examinations/:id
export function isExaminationResultObject(
  result: ExaminationResult | string | null | undefined
): result is ExaminationResult {
  return typeof result === "object" && result !== null && "id" in result;
}

// Type guard untuk /company-employees/me
export function isValidResultId(
  result: string | ExaminationResult | null | undefined
): result is string {
  return (
    typeof result === "string" &&
    !!result &&
    result !== "Hasil Belum Bisa Diakses"
  );
}

export const getMyEmployee = () =>
  apiRequest<ApiResponse<MyEmployeeResponse>>("get", "/company-employees/me");

export const getExaminationDetail = (examId: string) =>
  apiRequest<ApiResponse<ExaminationDetail>>("get", `/examinations/${examId}`);

export const getExaminationResultUrl = (resultId: string) => {
  return `/examination-results/${resultId}/download`;
};

export const downloadExaminationResult = (id: string) =>
  apiRequest<Blob>("get", `/examination-results/${id}/download`, undefined, {
    responseType: "blob",
  });

// import { apiRequest } from "./apiClient";
// import type { ApiResponse } from "./genericApi";
// export interface Employee {
//   id: string;
//   company_id: string;
//   company_name: string;
//   employee_number: string;
//   nik: string;
//   name: string;
//   gender: string;
//   phone_number: string;
//   dob: string;
//   age_detail: string;
// }

// export interface ExaminationResult {
//   id: string;
//   created_at: string;
// }

// export interface ExaminationDetail {
//   id: string;
//   examination_batch_id: string;
//   company_employee: Employee;
//   mcu_package: string;
//   notes: string;
//   created_at: string;
//   isVisibleToEmployee: number;
//   result?: ExaminationResult | null;
// }

// export interface Batch {
//   id: string;
//   batch_code: string;
//   exam_date: string;
//   location: string;
//   notes: string;
//   status: string;
//   examination: ExaminationDetail | string;
// }

// export interface MyEmployeeResponse {
//   employee: Employee;
//   batches: Batch[];
// }

// export const getMyEmployee = () =>
//   apiRequest<ApiResponse<MyEmployeeResponse>>("get", "/company-employees/me");

// export const getExaminationDetail = (examId: string) =>
//   apiRequest<ApiResponse<ExaminationDetail>>("get", `/examinations/${examId}`);

// export const getExaminationResultUrl = (resultId: string) => {
//   return `/examination-results/${resultId}/download`;
// };
