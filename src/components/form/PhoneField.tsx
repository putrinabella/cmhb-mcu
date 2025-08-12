import { FormInput } from "@/components/FormInput";
import { Phone } from "lucide-react";

export function PhoneField({ control }: { control: any }) {
  return (
    <FormInput
      control={control}
      name="phone"
      label="Nomor Telpon"
      placeholder="Masukkan nomor telpon"
      type="tel"
      rules={{ required: "Nomor telpon wajib diisi" }}
      leftIcon={<Phone className="w-5 h-5" />}
    />
  );
}
