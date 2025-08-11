import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form"; // import useForm
import AuthLayout from "@/layout/AuthLayout";
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

export default function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  // Initialize react-hook-form here
  const { control, handleSubmit } = useForm<LoginFormValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // Handle form submit
  const handleLoginSubmit = async (data: LoginFormValues) => {
    try {
      const result = await login(data.email, data.password);

      // Simpan token kalau pakai API token
      if (result.access_token) {
        localStorage.setItem("token", result.access_token);
      }

      showSwal({
        title: "Login Berhasil",
        text: "Selamat datang kembali!",
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
      });
      router.visit("/dashboard");
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
      <FormWrapper<LoginFormValues> onSubmit={handleSubmit(handleLoginSubmit)}>
        {() => (
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
              className="w-full bg-blue-600 hover:bg-blue-700 transition-colors text-white py-2 px-4 rounded"
            >
              Masuk
            </Button>
          </div>
        )}
      </FormWrapper>

      <p className="text-sm text-center mt-4 text-gray-600">
        Belum punya akun?{" "}
        <Link
          to="/register"
          className="text-blue-600 hover:underline hover:text-blue-700 transition-colors"
        >
          Daftar di sini
        </Link>
      </p>
    </AuthLayout>
  );
}
