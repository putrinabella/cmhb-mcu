import { apiRequest } from "./apiClient.js";

export const login = async (email: string, password: string) => {
  const res = await apiRequest<{ token: string; user: any }>("post", "/login", {
    email,
    password,
  });
  return { access_token: res.token, user: res.user };
};

export const logout = () => apiRequest("post", "/logout");

export const register = (data: {
  name: string;
  email: string;
  password: string;
}) => apiRequest("post", "/register", data);
