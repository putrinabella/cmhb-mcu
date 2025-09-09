import { Calendar } from "lucide-react";
import { FormInput } from "@/components/FormInput";

export function DobField({ control }: { control: any }) {
  return (
    <FormInput
      control={control}
      name="dob"
      label="Tanggal Lahir"
      placeholder="Pilih tanggal lahir"
      type="date"
      rules={{ required: "Tanggal lahir wajib diisi" }}
      leftIcon={<Calendar className="w-5 h-5" />}
    />
  );
}
