import type { SubmitHandler } from "react-hook-form";
import AuthLayout from "@/layout/AuthLayout";
import { FormWrapper } from "@/components/FormWrapper";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useRegister } from "@/hooks/use-register";
import { EmailField } from "@/components/form/EmailField";
import { PasswordField } from "@/components/form/PasswordField";
import { ConfirmPasswordField } from "@/components/form/ConfirmPasswordField";
import { TextField } from "@/components/form/TextField";
import { User } from "lucide-react";

type RegisterFormValues = {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
};

export default function RegisterPage() {
  const { registerUser } = useRegister();

  const handleRegisterSubmit: SubmitHandler<RegisterFormValues> = (data) => {
    registerUser(data);
  };

  return (
    <AuthLayout
      title="Daftar Akun"
      subtitle="Buat akun baru untuk mulai menggunakan layanan kami."
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
            <TextField
              control={control}
              name="name"
              label="Nama"
              placeholder="Masukkan nama lengkap"
              rules={{ required: "Nama wajib diisi" }}
              leftIcon={<User className="w-5 h-5" />}
            />

            <EmailField control={control} />

            <PasswordField control={control} />

            <ConfirmPasswordField control={control} getValues={getValues} />

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
