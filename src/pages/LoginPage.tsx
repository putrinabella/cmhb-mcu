import type { SubmitHandler } from "react-hook-form";
import AuthLayout from "@/layout/AuthLayout";
import { FormWrapper } from "@/components/FormWrapper";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useLogin } from "@/hooks/use-login";
import { EmailField } from "@/components/form/EmailField";
import { PasswordField } from "@/components/form/PasswordField";

interface LoginFormValues {
  email: string;
  password: string;
}

export default function LoginPage() {
  const { loginUser } = useLogin();

  const handleLoginSubmit: SubmitHandler<LoginFormValues> = (data) =>
    loginUser(data.email, data.password);

  return (
    <AuthLayout
      title="Login"
      subtitle="Masukkan email dan kata sandi untuk masuk."
    >
      <FormWrapper<LoginFormValues>
        defaultValues={{
          email: "na@gmail.com",
          password: "Putri@12",
        }}
        onSubmit={handleLoginSubmit}
      >
        {({ control }) => (
          <div className="space-y-4">
            <EmailField control={control} />
            <PasswordField control={control} />
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
