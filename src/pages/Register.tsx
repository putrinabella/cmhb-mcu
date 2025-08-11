import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api";

interface RegisterData {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState<RegisterData>({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });

  const [error, setError] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (form.password !== form.password_confirmation) {
      setError("Password confirmation tidak cocok");
      return;
    }

    try {
      await api.post("/register", form);
      alert("Registrasi berhasil! Silakan login.");
      navigate("/");
    } catch (err: any) {
      setError(err.response?.data?.message || "Registrasi gagal");
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nama: </label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Email: </label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Password: </label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Konfirmasi Password: </label>
          <input
            type="password"
            name="password_confirmation"
            value={form.password_confirmation}
            onChange={handleChange}
            required
          />
        </div>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <button type="submit">Register</button>
      </form>
      <p>
        Sudah punya akun? <Link to="/">Login di sini</Link>
      </p>
    </div>
  );
}
