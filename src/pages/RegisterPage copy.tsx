import type { SubmitHandler } from "react-hook-form";
import AuthLayout from "@/layout/AuthLayout";
import React from "react";
import { Link } from "react-router-dom";
import { Eye, EyeOff, LockIcon, MailIcon, User } from "lucide-react";
import { FormInput } from "@/components/FormInput";
import { Button } from "@/components/ui/button";
import { FormWrapper } from "@/components/FormWrapper";
import { useRegister } from "@/hooks/use-register";

type RegisterFormValues = {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
};

export default function RegisterPage() {
  const { registerUser } = useRegister();

  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);

  const handleRegisterSubmit: SubmitHandler<RegisterFormValues> = (data) => {
    registerUser(data); // bisa langsung kirim objek
  };

  return (
    <AuthLayout
      title="Daftar Akun"
      subtitle="Buat akun baru untuk mulai menggunakan aplikasi."
    >
      <FormWrapper<RegisterFormValues>
        defaultValues={{
          name: "",
          email: "",
          password: "",
          password_confirmation: "",
        }}
        onSubmit={handleRegisterSubmit}
      >
        {({ control, getValues }) => (
          <div className="space-y-4">
            <FormInput
              control={control}
              name="name"
              label="Nama"
              placeholder="Masukkan nama lengkap"
              rules={{ required: "Nama wajib diisi" }}
              leftIcon={<User className="w-5 h-5" />}
            />

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
              onToggle={() => setShowPassword((prev) => !prev)}
              icon={
                showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )
              }
              rules={{ required: "Password wajib diisi" }}
              leftIcon={<LockIcon className="w-5 h-5" />}
              showToggle
              showValue={showPassword}
            />

            <FormInput
              control={control}
              name="password_confirmation"
              label="Konfirmasi Password"
              placeholder="Ulangi password"
              type={showConfirmPassword ? "text" : "password"}
              onToggle={() => setShowConfirmPassword((prev) => !prev)}
              icon={
                showConfirmPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )
              }
              rules={{
                required: "Konfirmasi password wajib diisi",
                validate: (value: string) =>
                  value === getValues("password") || "Password tidak cocok",
              }}
              leftIcon={<LockIcon className="w-5 h-5" />}
              showToggle
              showValue={showConfirmPassword}
            />

            <Button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white"
            >
              Daftar
            </Button>
          </div>
        )}
      </FormWrapper>

      <p className="text-sm text-center mt-4 text-gray-600">
        Sudah punya akun?{" "}
        <Link to="/login" className="text-blue-600 hover:underline">
          Masuk di sini
        </Link>
      </p>
    </AuthLayout>
  );
}
