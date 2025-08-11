import React from "react";
import axios from "axios";
import { FormInput } from "@/components/FormInput.js";
import { FormWrapper } from "@/components/FormWrapper.js";
import { Button } from "@/components/ui/button.js";
import {
  Head,
  useForm as useInertiaForm,
  Link,
  router,
} from "@inertiajs/react";
import { Eye, EyeOff, LockIcon, MailIcon } from "lucide-react";
import AuthLayout from "@/layouts/AuthLayout.js";
import { showSwal } from "@/components/SwalHelper.js";
import { login } from "@/services/authService.js";
type LoginFormValues = {
  email: string;
  password: string;
};

async function handleLoginSubmit(data: LoginFormValues) {
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
    let message = error?.meta?.message || error?.message || "Terjadi kesalahan";

    message = message.replace(/^Login Gagal\s*/, "");
    showSwal({
      title: "Login Gagal",
      text: message,
      icon: "error",
    });
  }
}

export default function Login() {
  const inertiaForm = useInertiaForm<LoginFormValues>({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = React.useState(false);

  return (
    <>
      <Head title="Login" />
      <AuthLayout
        title="Login"
        subtitle="Masukkan email dan kata sandi untuk masuk."
      >
        <FormWrapper<LoginFormValues>
          defaultValues={inertiaForm.data}
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
                rules={{
                  required: "Email wajib diisi",
                }}
                leftIcon={<MailIcon className="w-5 h-5" />}
              />

              <FormInput
                control={control}
                name="password"
                label="Password"
                placeholder="Masukkan password"
                type="password"
                rules={{
                  required: "Password wajib diisi",
                }}
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
            href="/register"
            className="text-blue-600 hover:underline hover:text-blue-700 transition-colors"
          >
            Daftar di sini
          </Link>
        </p>
      </AuthLayout>
    </>
  );
}
