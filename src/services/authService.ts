import { apiRequest } from "./apiClient.js";

export const login = (email: string, password: string) =>
    apiRequest<{ access_token: string }>("post", "/login", { email, password });

export const logout = () => apiRequest("post", "/logout");

export const register = (data: {
    name: string;
    email: string;
    password: string;
}) => apiRequest("post", "/register", data);
