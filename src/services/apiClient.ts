import axios, { type AxiosRequestConfig, type Method } from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:8000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor untuk menyisipkan token jika ada
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Optional: interceptor response buat global error handling atau refresh token
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Contoh: handle 401 unauthorized, bisa trigger logout atau refresh token
    if (error.response?.status === 401) {
      // misal: localStorage.removeItem("token");
      // redirect ke login page, dll
    }
    return Promise.reject(error);
  }
);

export const apiRequest = async <T = any>(
  method: Method,
  url: string,
  data?: any,
  config?: AxiosRequestConfig
): Promise<T> => {
  try {
    const response = await api.request<T>({
      method,
      url,
      data,
      ...config,
    });
    return response.data;
  } catch (error: any) {
    const errData = error?.response?.data ?? { message: error.message };
    throw errData;
  }
};

export default api;
