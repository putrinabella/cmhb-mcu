import { useNavigate } from "react-router-dom";
import { login } from "@/services/authService";
import { useAuth } from "@/routes/AuthContext";
import { showSwal } from "@/components/SwalHelper";

export function useLogin() {
  const navigate = useNavigate();
  const { setToken } = useAuth();

  const loginUser = async (email: string, password: string) => {
    try {
      const result = await login(email, password);

      if (result.access_token) {
        localStorage.setItem("user", JSON.stringify(result));
        setToken(result.access_token);
      }

      showSwal({
        title: "Login Berhasil",
        text: "Selamat datang kembali!",
        icon: "success",
        timer: 1000,
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

  return { loginUser };
}
