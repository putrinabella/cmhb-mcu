import { useNavigate } from "react-router-dom";
import { register } from "@/services/authService";
import { showSwal } from "@/lib/SwalHelper";

type RegisterFormValues = {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
};

export function useRegister() {
  const navigate = useNavigate();

  const registerUser = async (data: RegisterFormValues) => {
    try {
      await register(data);

      showSwal({
        title: "Pendaftaran Berhasil",
        text: "Akun Anda telah dibuat. Silakan login.",
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
        onClose: () => navigate("/login"),
      });
    } catch (error: any) {
      let message =
        error?.meta?.message || error?.message || "Terjadi kesalahan";
      message = message.replace(/^Register Gagal\s*/, "");
      showSwal({
        title: "Pendaftaran Gagal",
        text: message,
        icon: "error",
      });
    }
  };

  return { registerUser };
}
