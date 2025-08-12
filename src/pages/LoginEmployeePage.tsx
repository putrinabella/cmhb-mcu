import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import AuthLayout from "@/layout/AuthLayout";
import { FormWrapper } from "@/components/FormWrapper";
import { FormInput } from "@/components/FormInput";
import { LockIcon, Eye, EyeOff, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { login } from "@/services/authService";
import { showSwal } from "@/components/SwalHelper";
interface LoginFormValues {
  phone: string;
  password: string;
}

export default function LoginEmployeePage() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  // Initialize react-hook-form here
  const { control, handleSubmit } = useForm<LoginFormValues>({
    defaultValues: {
      phone: "",
      password: "",
    },
  });

  // Handle form submit
  const handleLoginSubmit = async (data: LoginFormValues) => {
    try {
      const result = await login(data.phone, data.password);
      console.log("Login API result:", result);

      // Simpan ke localStorage dengan key 'user' dalam bentuk object
      if (result.access_token) {
        localStorage.setItem("user", JSON.stringify(result));
      }

      showSwal({
        title: "Login Berhasil",
        text: "Selamat datang kembali!",
        icon: "success",
        timer: 1500,
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
      subtitle="Masukkan nomor telpon dan kata sandi untuk masuk."
    >
      <FormWrapper<LoginFormValues> onSubmit={handleSubmit(handleLoginSubmit)}>
        {() => (
          <div className="space-y-4">
            <FormInput
              control={control}
              name="phone"
              label="Nomor telpon"
              placeholder="Masukkan nomor telpon"
              type="tel"
              rules={{ required: "Nomor telpon wajib diisi" }}
              leftIcon={<Phone className="w-5 h-5" />}
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
    </AuthLayout>
  );
}
