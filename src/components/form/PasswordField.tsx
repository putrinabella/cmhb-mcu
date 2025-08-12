import { useState } from "react";
import { FormInput } from "@/components/FormInput";
import { LockIcon, Eye, EyeOff } from "lucide-react";

export function PasswordField({ control }: { control: any }) {
  const [showPassword, setShowPassword] = useState(false);
  return (
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
  );
}
