import type { SubmitHandler } from "react-hook-form";
import AuthLayout from "@/layout/AuthLayout";
import { FormWrapper } from "@/components/FormWrapper";
import { Button } from "@/components/ui/button";
import { PhoneField } from "@/components/form/PhoneField";
import { PasswordField } from "@/components/form/PasswordField";
import { useLoginEmployee } from "@/hooks/use-login-employee";

interface LoginFormValues {
  phone: string;
  password: string;
}

export default function LoginPage() {
  const { loginEmployee } = useLoginEmployee();

  const handleLoginSubmit: SubmitHandler<LoginFormValues> = (data) =>
    loginEmployee(data.phone, data.password);

  return (
    <AuthLayout
      title="Login"
      subtitle="Masukkan nomor telpon dan kata sandi untuk masuk."
    >
      <FormWrapper<LoginFormValues>
        defaultValues={{
          phone: "",
          password: "",
        }}
        onSubmit={handleLoginSubmit}
      >
        {({ control }) => (
          <div className="space-y-4">
            <PhoneField control={control} />
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
    </AuthLayout>
  );
}
