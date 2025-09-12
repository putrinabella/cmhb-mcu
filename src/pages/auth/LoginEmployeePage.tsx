import type { SubmitHandler } from "react-hook-form";
import AuthLayout from "@/layout/AuthLayout";
import { FormWrapper } from "@/components/FormWrapper";
import { Button } from "@/components/ui/button";
import { useLoginEmployee } from "@/hooks/auth/use-login-employee";
import { DobField } from "@/components/form/DobField";
import { TextField } from "@/components/form/TextField";
import { Fingerprint } from "lucide-react";
import { useCompanies } from "@/hooks/use-companies";
import { CompanyField } from "@/components/form/DropdownField";

interface LoginFormValues {
  nik: string;
  dob: string;
  company_code: string;
}

export default function LoginPage() {
  const { loginEmployee } = useLoginEmployee();
  const { loading } = useCompanies();

  const handleLoginSubmit: SubmitHandler<LoginFormValues> = (data) =>
    loginEmployee(data.nik, data.dob, data.company_code);

  return (
    <AuthLayout
      title="Login"
      subtitle="Masukkan NIK, Tanggal Lahir dan Perusahaan untuk masuk."
    >
      <FormWrapper<LoginFormValues>
        defaultValues={{
          nik: "3175098773",
          dob: "1995-06-25",
          company_code: "",
        }}
        onSubmit={handleLoginSubmit}
      >
        {({ control }) => (
          <div className="space-y-4">
            <TextField
              control={control}
              name="nik"
              label="NIK"
              placeholder="Masukkan NIK"
              rules={{ required: "NIK wajib diisi" }}
              leftIcon={<Fingerprint className="w-5 h-5" />}
            />

            <DobField control={control} />

            <CompanyField
              control={control}
              name="company_code"
              label="Perusahaan"
              rules={{ required: "Perusahaan wajib dipilih" }}
            />

            <Button
              type="submit"
              className="w-full bg-primary text-primary-content hover:bg-primary-focus"
              disabled={loading}
            >
              Masuk
            </Button>
          </div>
        )}
      </FormWrapper>
    </AuthLayout>
  );
}

// import type { SubmitHandler } from "react-hook-form";
// import AuthLayout from "@/layout/AuthLayout";
// import { FormWrapper } from "@/components/FormWrapper";
// import { Button } from "@/components/ui/button";
// import { useLoginEmployee } from "@/hooks/auth/use-login-employee";
// import { DobField } from "@/components/form/DobField";
// import { SelectField } from "@/components/form/DropdownField";
// import { TextField } from "@/components/form/TextField";
// import { Fingerprint } from "lucide-react";

// interface LoginFormValues {
//   phone: string;
//   password: string;
// }

// export default function LoginPage() {
//   const { loginEmployee } = useLoginEmployee();

//   const handleLoginSubmit: SubmitHandler<LoginFormValues> = (data) =>
//     loginEmployee(data.phone, data.password);

//   return (
//     <AuthLayout
//       title="Login"
//       subtitle="Masukkan NIK, Tanggal Lahir dan Perusahaan untuk masuk."
//     >
//       <FormWrapper<LoginFormValues>
//         defaultValues={{
//           phone: "",
//           password: "",
//         }}
//         onSubmit={handleLoginSubmit}
//       >
//         {({ control }) => (
//           <div className="space-y-4">
//             <TextField
//               control={control}
//               name="nik"
//               label="NIK"
//               placeholder="Masukkan NIK"
//               rules={{ required: "NIK wajib diisi" }}
//               leftIcon={<Fingerprint className="w-5 h-5" />}
//             />
//             <DobField control={control} />
//             <SelectField
//               control={control}
//               name="company_code"
//               label="Perusahaan"
//               placeholder="Pilih perusahaan"
//               rules={{ required: "Perusahaan wajib dipilih" }}
//               options={[
//                 { value: "ABC", label: "Perusahaan ABC" },
//                 { value: "XYZ", label: "Perusahaan XYZ" },
//               ]}
//             />
//             <Button
//               type="submit"
//               className="w-full bg-primary text-primary-content hover:bg-primary-focus"
//             >
//               Masuk
//             </Button>
//           </div>
//         )}
//       </FormWrapper>
//     </AuthLayout>
//   );
// }
