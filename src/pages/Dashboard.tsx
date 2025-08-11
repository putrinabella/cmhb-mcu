import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import LogoutButton from "../components/LogoutButton";

interface User {
  id: number;
  name: string;
  email: string;
  email_verified_at: string | null;
  created_at: string;
  updated_at: string;
}

export default function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/"); // redirect ke login kalau token gak ada
      return;
    }

    const fetchUser = async () => {
      try {
        const res = await api.get<User>("/user", {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        });
        setUser(res.data);
      } catch (err: any) {
        setError("Gagal mengambil data user, silakan login ulang.");
        localStorage.removeItem("token");
        setTimeout(() => navigate("/"), 2000);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [navigate]);

 

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div style={{ padding: 20 }}>
      <h2>Dashboard</h2>
      <p>Selamat datang, <strong>{user?.name}</strong>!</p>
      <p>Email: {user?.email}</p>
      <LogoutButton />
    </div>
  );
}
