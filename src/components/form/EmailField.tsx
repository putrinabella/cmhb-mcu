import { FormInput } from "@/components/FormInput";
import { MailIcon } from "lucide-react";

export function EmailField({ control }: { control: any }) {
  return (
    <FormInput
      control={control}
      name="email"
      label="Email"
      placeholder="Masukkan email"
      type="email"
      rules={{ required: "Email wajib diisi" }}
      leftIcon={<MailIcon className="w-5 h-5" />}
    />
  );
}
