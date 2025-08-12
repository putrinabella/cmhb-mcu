import { apiRequest } from "./apiClient.js";

export const login = async (email: string, password: string) => {
  const res = await apiRequest("post", "/login", {
    email,
    password,
  });
  return {
    token: res.data.token,
    user: {
      id: res.data.id,
      email: res.data.email,
    },
  };
};

export const logout = () => apiRequest("post", "/logout");

export const register = (data: {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}) => apiRequest("post", "/register", data);
