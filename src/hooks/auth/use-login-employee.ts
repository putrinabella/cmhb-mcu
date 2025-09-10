import { useNavigate } from "react-router-dom";
import { loginEmployee as loginEmployeeApi } from "@/services/authService";
import { useAuth } from "@/routes/AuthContext";
import { showSwal } from "@/lib/SwalHelper";

export function useLoginEmployee() {
  const navigate = useNavigate();
  const { login, setToken } = useAuth();

  const loginEmployee = async (
    nik: string,
    dob: string,
    company_code: string
  ) => {
    try {
      const result = await loginEmployeeApi(nik, dob, company_code);

      if (result?.token) {
        // Sesuaikan UserData untuk AuthContext
        const userData = {
          id: result.employee.id,
          email: "", // fallback karena employee tidak punya email
          token: result.token, // simpan token juga di userData
          name: result.employee.name,
          role: "Employee",
          position: "", // fallback
          department: "", // fallback
          phone_number: result.employee.phone_number ?? "",
          dob: result.employee.dob,
          gender: result.employee.gender,
          employee_number: result.employee.employee_number,
          company: result.employee.company_id
            ? {
                id: result.employee.company_id,
                name: result.employee.company_name,
              }
            : null,
        };

        // Simpan ke AuthContext & localStorage
        login(result.token, userData);
        setToken(result.token);

        // Simpan batches terpisah
        localStorage.setItem("batches", JSON.stringify(result.batches ?? []));

        showSwal({
          title: "Login Berhasil",
          text: `Selamat datang kembali, ${result.employee.name}!`,
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
          onClose: () => navigate("/"),
        });
      } else {
        throw new Error("Token tidak ditemukan dalam response");
      }
    } catch (error: any) {
      let message =
        error?.meta?.message || error?.message || "Terjadi kesalahan";

      showSwal({
        title: "Login Gagal",
        text: message,
        icon: "error",
      });
    }
  };

  return { loginEmployee };
}
