import { apiRequest } from "./apiClient";
import {
  getPaginatedResource,
  type PaginatedParams,
  type ApiResponse,
  type PaginatedResponse,
} from "./genericApi";

export interface BatchItem {
  examinations: never[];
  id: string;
  company_id: string;
  batch_code: string;
  exam_date: string;
  location: string;
  notes: string;
}

export const getBatch = async (
  params: PaginatedParams
): Promise<PaginatedResponse<BatchItem>> => {
  const res: ApiResponse<PaginatedResponse<BatchItem>> =
    await getPaginatedResource<BatchItem>("/examination-batches", params);

  return res.data;
};

export const getBatchDetail = (id: string) =>
  apiRequest<ApiResponse<BatchItem>>("get", `/examination-batches/${id}`);
