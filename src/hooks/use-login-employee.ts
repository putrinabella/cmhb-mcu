import { useNavigate } from "react-router-dom";
import { login } from "@/services/authService";
import { showSwal } from "@/lib/SwalHelper";

export function useLoginEmployee() {
  const navigate = useNavigate();

  const loginEmployee = async (phone: string, password: string) => {
    try {
      const result = await login(phone, password);

      if (result.token) {
        localStorage.setItem("user", JSON.stringify(result));
      }

      showSwal({
        title: "Login Berhasil",
        text: "Selamat datang kembali!",
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
        onClose: () => navigate("/"),
      });
    } catch (error: any) {
      let message =
        error?.meta?.message || error?.message || "Terjadi kesalahan";
      message = message.replace(/^Login Gagal\s*/, "");
      showSwal({
        title: "Login Gagal",
        text: message,
        icon: "error",
      });
    }
  };

  return { loginEmployee };
}
