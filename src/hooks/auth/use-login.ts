// import { useNavigate } from "react-router-dom";
// import { login as loginService } from "@/services/authService";
// import { useAuth } from "@/routes/AuthContext";
// import { showSwal } from "@/lib/SwalHelper";

// export function useLogin() {
//   const navigate = useNavigate();
//   const { login, setToken } = useAuth();

//   const loginUser = async (email: string, password: string) => {
//     try {
//       const result = await loginService(email, password);

//       if (result.token) {
//         login(result.token, result.user); // simpan localStorage
//         setToken(result.token); // update state token
//       } else {
//         console.warn("Token tidak ditemukan");
//       }

//       showSwal({
//         title: "Login Berhasil",
//         text: "Selamat datang kembali!",
//         icon: "success",
//         timer: 1000,
//         showConfirmButton: false,
//         onClose: () => navigate("/"),
//       });
//     } catch (error: any) {
//       let message =
//         error?.meta?.message || error?.message || "Terjadi kesalahan";
//       message = message.replace(/^Login Gagal\s*/, "");
//       showSwal({
//         title: "Login Gagal",
//         text: message,
//         icon: "error",
//       });
//     }
//   };

//   return { loginUser };
// }
import { useNavigate } from "react-router-dom";
import { login as loginService } from "@/services/authService";
import { useAuth } from "@/routes/AuthContext";
import { showSwal } from "@/lib/SwalHelper";

export function useLogin() {
  const navigate = useNavigate();
  const { login, setToken } = useAuth();

  const loginUser = async (email: string, password: string) => {
    try {
      const result = await loginService(email, password);

      if (result.token) {
        const userData = {
          ...result.user,
          company: result.company || null,
          token: result.token, // ✅ tambahkan token
        };

        login(result.token, userData);
        setToken(result.token);

        showSwal({
          title: "Login Berhasil",
          text: "Selamat datang kembali!",
          icon: "success",
          timer: 1000,
          showConfirmButton: false,
          onClose: () => navigate("/"),
        });
      } else {
        console.warn("Token tidak ditemukan");
      }
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
