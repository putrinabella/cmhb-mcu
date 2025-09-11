import { apiRequest } from "./apiClient";
import {
  getPaginatedResource,
  type PaginatedParams,
  type ApiResponse,
  type PaginatedResponse,
} from "./genericApi";

export interface EmployeeItem {
  id: string;
  company_id: string;
  company_name: string;
  employee_number: string;
  nik: string;
  name: string;
  phone_number: string;
  dob: string;
  age_detail: string;
}

export const getEmployees = async (
  params: PaginatedParams
): Promise<PaginatedResponse<EmployeeItem>> => {
  const res: ApiResponse<PaginatedResponse<EmployeeItem>> =
    await getPaginatedResource<EmployeeItem>("/company-employees", params);

  return res.data;
};

export const getEmployeeDetail = (id: string) =>
  apiRequest<ApiResponse<EmployeeItem>>("get", `/company-employees/${id}`);

export const updateEmployee = (id: string, data: Partial<EmployeeItem>) =>
  apiRequest<ApiResponse<EmployeeItem>>(
    "put",
    `/company-employees/${id}`,
    data
  );

export const downloadEmployeeTemplate = () =>
  apiRequest<Blob>("get", "/examinations/download-format", undefined, {
    responseType: "blob",
  });

export const importEmployees = (file: File, examinationBatchId: string) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("examination_batch_id", examinationBatchId);

  return apiRequest<ApiResponse<any>>(
    "post",
    "/examinations/import",
    formData,
    {
      headers: { "Content-Type": "multipart/form-data" },
    }
  );
};

export const downloadExaminationResult = (id: string) =>
  apiRequest<Blob>("get", `/examination-results/${id}/download`, undefined, {
    responseType: "blob",
  });
