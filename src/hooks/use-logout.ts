import { useNavigate } from "react-router-dom";
import { useAuth } from "@/routes/AuthContext";
import { showSwal } from "@/components/SwalHelper";

export function useLogout() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = async () => {
    const result = await showSwal({
      title: "Apakah Anda yakin ingin logout?",
      text: "Anda akan keluar dari aplikasi dan perlu login kembali untuk mengaksesnya.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Logout",
      cancelButtonText: "Batal",
      confirmButtonColor: "#dc3545",
      onClose: () => {},
    });

    if (result.isConfirmed) {
      logout();
      navigate("/login");
      return true;
    }
    return false;
  };

  return { handleLogout };
}
