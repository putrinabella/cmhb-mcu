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
  apiRequest<Blob>("get", "/company-employees/download", undefined, {
    responseType: "blob",
  });

export const importEmployees = (file: File, companyId: string) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("company_id", companyId);

  return apiRequest<ApiResponse<any>>(
    "post",
    "/company-employees/import",
    formData,
    {
      headers: { "Content-Type": "multipart/form-data" },
    }
  );
};
