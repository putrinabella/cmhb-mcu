import axios, { type AxiosRequestConfig, type Method } from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:8000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor untuk menyisipkan token dari localStorage.user
api.interceptors.request.use(
  (config) => {
    const storedUser = localStorage.getItem("user");
    if (storedUser && config.headers) {
      const parsedUser = JSON.parse(storedUser);
      if (parsedUser?.token) {
        config.headers.Authorization = `Bearer ${parsedUser.token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Optional: interceptor response buat global error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // bisa tambahkan logout otomatis di sini
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
