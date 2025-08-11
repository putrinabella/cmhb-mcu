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
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <img
          src="https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.webp"
          className="max-w-sm rounded-lg shadow-2xl"
        />
        <div>
          <h1 className="text-5xl font-bold">Box Office News!</h1>
          <p className="py-6">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
            excepturi exercitationem quasi. In deleniti eaque aut repudiandae et
            a id nisi.
          </p>
          <button className="btn btn-primary">Get Started</button>
        </div>
      </div>
    </div>
    // <div className="p-5 bg-blue-500 text-white min-h-screen">
    //   <h2 className="text-3xl font-semibold mb-4">Dashboard</h2>
    //   <p>
    //     Selamat datang, <strong>{user?.name}</strong>!
    //   </p>
    //   <p>Email: {user?.email}</p>
    //   <LogoutButton />
    // </div>
  );
}
