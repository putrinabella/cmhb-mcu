import React from "react";
import { Head, useForm as useInertiaForm, Link } from "@inertiajs/react";
import { Eye, EyeOff, LockIcon, MailIcon, User } from "lucide-react";
import { FormInput } from "@/components/FormInput.js";
import { Button } from "@/components/ui/button.js";
import { FormWrapper } from "@/components/FormWrapper.js";
import AuthLayout from "@/layout/AuthLayout";

type RegisterFormValues = {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
};

export default function RegisterPage() {
  const inertiaForm = useInertiaForm<RegisterFormValues>({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });

  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);

  return (
    <>
      <Head title="Register" />
      <AuthLayout title="Daftar Akun">
        <FormWrapper<RegisterFormValues>
          defaultValues={inertiaForm.data}
          onSubmit={() =>
            inertiaForm.post("/register", {
              preserveScroll: true,
            })
          }
        >
          {({ control, getValues }) => (
            <div className="space-y-4">
              {/* Nama */}
              <FormInput
                control={control}
                name="name"
                label="Nama"
                placeholder="Masukkan nama lengkap"
                rules={{ required: "Nama wajib diisi" }}
                leftIcon={<User className="w-5 h-5" />}
              />

              {/* Email */}
              <FormInput
                control={control}
                name="email"
                label="Email"
                placeholder="Masukkan email"
                type="email"
                rules={{ required: "Email wajib diisi" }}
                leftIcon={<MailIcon className="w-5 h-5" />}
              />

              {/* Password */}
              <FormInput
                control={control}
                name="password"
                label="Password"
                placeholder="Masukkan password"
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
                rules={{ required: "Password wajib diisi" }}
                leftIcon={<LockIcon className="w-5 h-5" />}
              />

              {/* Konfirmasi Password */}
              <FormInput
                control={control}
                name="password_confirmation"
                label="Konfirmasi Password"
                placeholder="Ulangi password"
                showToggle
                showValue={showConfirmPassword}
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
              />

              {/* Tombol daftar */}
              <Button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 transition-colors text-white py-2 px-4 rounded"
              >
                Daftar
              </Button>
            </div>
          )}
        </FormWrapper>
        <p className="text-sm text-center mt-4 text-gray-600">
          Sudah punya akun?{" "}
          <Link
            href="/login"
            className="text-blue-600 hover:underline hover:text-blue-700 transition-colors"
          >
            Masuk di sini
          </Link>
        </p>
      </AuthLayout>
    </>
  );
}
