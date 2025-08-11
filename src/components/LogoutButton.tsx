import { useNavigate } from "react-router-dom";
import api from "../api";

export default function LogoutButton() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
      return;
    }

    try {
      await api.post(
        "/logout",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
    } catch (error) {
      console.error("Logout API error:", error);
      // tetap lanjut logout lokal meski error
    } finally {
      localStorage.removeItem("token");
      navigate("/");
    }
  };

  return <button onClick={handleLogout}>Logout</button>;
}
