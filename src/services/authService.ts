// import { apiRequest } from "./apiClient.js";

// export const login = async (email: string, password: string) => {
//   const res = await apiRequest("post", "/login", {
//     email,
//     password,
//   });
//   return {
//     token: res.data.token,
//     user: {
//       id: res.data.id,
//       email: res.data.email,
//     },
//     company: {
//       id: res.data.company.id,
//     },
//   };
// };

// export const logout = () => apiRequest("post", "/logout");

// export const register = (data: {
//   name: string;
//   email: string;
//   password: string;
//   password_confirmation: string;
// }) => apiRequest("post", "/register", data);
import { apiRequest } from "./apiClient.js";

export const login = async (email: string, password: string) => {
  const res = await apiRequest("post", "/login", { email, password });

  return {
    token: res.data.token,
    user: {
      id: res.data.id,
      email: res.data.email,
      name: res.data.name,
      position: res.data.position,
      department: res.data.department,
      phone_number: res.data.phone_number,
      company_id: res.data.company_id,
      company_name: res.data.company_name,
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
