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

export const loginEmployee = async (
  nik: string,
  dob: string,
  company_code: string
) => {
  const res = await apiRequest("post", "/company-employees/login", {
    nik,
    dob,
    company_code,
  });

  const data = res.data;

  return {
    token: data.token,
    employee: {
      id: data.employee.id,
      company_id: data.employee.company_id,
      company_name: data.employee.company_name,
      employee_number: data.employee.employee_number,
      nik: data.employee.nik,
      name: data.employee.name,
      gender: data.employee.gender,
      phone_number: data.employee.phone_number,
      dob: data.employee.dob,
      age_detail: data.employee.age_detail,
    },
    batches: data.batches ?? [],
  };
};
export const logout = () => apiRequest("post", "/logout");

export const register = (data: {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}) => apiRequest("post", "/register", data);
