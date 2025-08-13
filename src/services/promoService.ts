import { apiRequest } from "./apiClient";

export interface PromoCategory {
  id: string;
  name: string;
}

export interface PromoCreator {
  id: string;
  email: string;
}

export interface PromoItem {
  id: string;
  title: string;
  picture: string;
  picture_web: string;
  mime_type: string;
  is_published: number;
  published_at: string;
  start_date_promo: string | null;
  end_date_promo: string | null;
  priority_promo: number;
  category: PromoCategory;
  created_by: PromoCreator;
  created_at: string;
  updated_at: string;
}

export interface PromoData {
  current_page: number;
  data: PromoItem[];
  first_page_url: string;
  last_page: number;
  last_page_url: string;
  next_page_url: string | null;
  prev_page_url: string | null;
  total: number;
  per_page: number;
  from: number;
  to: number;
}

export interface PromoResponse {
  meta: {
    code: number;
    status: string;
    message: string;
  };
  data: PromoData;
}

export const getPromotions = async (): Promise<PromoResponse> => {
  return apiRequest<PromoResponse>("get", "/v1/client/promotions");
};
