import { useState } from "react";
import { FormInput } from "@/components/FormInput";
import { LockIcon, Eye, EyeOff } from "lucide-react";
import type { Control, UseFormGetValues } from "react-hook-form";

interface ConfirmPasswordFieldProps {
  control: Control<any>;
  getValues: UseFormGetValues<any>;
}

export function ConfirmPasswordField({
  control,
  getValues,
}: ConfirmPasswordFieldProps) {
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <FormInput
      control={control}
      name="password_confirmation"
      label="Konfirmasi Password"
      placeholder="Ulangi password"
      type={showConfirmPassword ? "text" : "password"}
      rules={{
        required: "Konfirmasi password wajib diisi",
        validate: (value: string) =>
          value === getValues("password") || "Password tidak cocok",
      }}
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
      leftIcon={<LockIcon className="w-5 h-5" />}
    />
  );
}
