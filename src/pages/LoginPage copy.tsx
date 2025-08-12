import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { type SubmitHandler } from "react-hook-form";
import AuthLayout from "@/layout/AuthLayout";
import { useAuth } from "@/routes/AuthContext";
import { FormWrapper } from "@/components/FormWrapper";
import { FormInput } from "@/components/FormInput";
import { MailIcon, LockIcon, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { login } from "@/services/authService";
import { showSwal } from "@/components/SwalHelper";
interface LoginFormValues {
  email: string;
  password: string;
}

export default function LoginPage() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const { setToken } = useAuth();

  const handleLoginSubmit: SubmitHandler<LoginFormValues> = async (data) => {
    try {
      const result = await login(data.email, data.password);

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

  return (
    <AuthLayout
      title="Login"
      subtitle="Masukkan email dan kata sandi untuk masuk."
    >
      <FormWrapper<LoginFormValues>
        defaultValues={{
          email: "putrinabellaaa@gmail.com",
          password: "Putri@12",
        }}
        onSubmit={handleLoginSubmit}
      >
        {({ control }) => (
          <div className="space-y-4">
            <FormInput
              control={control}
              name="email"
              label="Email"
              placeholder="Masukkan email"
              type="email"
              rules={{ required: "Email wajib diisi" }}
              leftIcon={<MailIcon className="w-5 h-5" />}
            />

            <FormInput
              control={control}
              name="password"
              label="Password"
              placeholder="Masukkan password"
              type={showPassword ? "text" : "password"}
              rules={{ required: "Password wajib diisi" }}
              showToggle
              showValue={showPassword}
              onToggle={() => setShowPassword((prev) => !prev)}
              icon={
                showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )
              }
              leftIcon={<LockIcon className="w-5 h-5" />}
            />

            <Button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white"
            >
              Masuk
            </Button>
          </div>
        )}
      </FormWrapper>

      <p className="text-sm text-center mt-4 text-gray-600">
        Belum punya akun?{" "}
        <Link to="/register" className="text-blue-600 hover:underline">
          Daftar di sini
        </Link>
      </p>
    </AuthLayout>
  );
}
