import { Controller } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useCompanies } from "@/hooks/use-companies";

interface CompanyFieldProps {
  control: any;
  name: string;
  label: string;
  placeholder?: string;
  rules?: any;
}

interface CompanyFieldProps {
  control: any;
  name: string;
  label: string;
  placeholder?: string;
  rules?: any;
}

export function CompanyField({
  control,
  name,
  label,
  placeholder = "Ketik nama perusahaan...",
  rules,
}: CompanyFieldProps) {
  const [search, setSearch] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const { companies, loading } = useCompanies(search);

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field }) => (
        <div className="space-y-1 relative">
          <Label>{label}</Label>
          <Input
            value={search}
            placeholder={placeholder}
            onChange={(e) => {
              setSearch(e.target.value);
              setShowDropdown(true);
              field.onChange(""); // reset kode dulu
            }}
            onFocus={() => search && setShowDropdown(true)}
          />
          {showDropdown && search && (
            <div className="absolute z-10 mt-1 w-full bg-white border rounded shadow max-h-40 overflow-auto">
              {loading && (
                <div className="p-2 text-sm text-gray-500">Memuat...</div>
              )}
              {!loading && companies && companies.length === 0 && (
                <div className="p-2 text-sm text-gray-500">Tidak ada hasil</div>
              )}
              {companies &&
                companies.map((c) => (
                  <div
                    key={c.code}
                    className="p-2 text-sm hover:bg-gray-100 cursor-pointer"
                    onClick={() => {
                      field.onChange(c.code); // simpan code ke form
                      setSearch(c.name); // tampilkan nama di input
                      setShowDropdown(false); // tutup dropdown
                    }}
                  >
                    {c.name}
                  </div>
                ))}
            </div>
          )}
        </div>
      )}
    />
  );
}
// export function CompanyField({
//   control,
//   name,
//   label,
//   placeholder = "Ketik nama perusahaan...",
//   rules,
// }: CompanyFieldProps) {
//   const [search, setSearch] = useState("");
//   const { companies, loading } = useCompanies(search);

//   return (
//     <Controller
//       name={name}
//       control={control}
//       rules={rules}
//       render={({ field }) => (
//         <div className="space-y-1 relative">
//           <Label>{label}</Label>
//           <Input
//             value={search}
//             placeholder={placeholder}
//             onChange={(e) => {
//               setSearch(e.target.value);
//               field.onChange(""); // reset kode dulu
//             }}
//           />
//           {search && (
//             <div className="absolute z-10 mt-1 w-full bg-white border rounded shadow max-h-40 overflow-auto">
//               {loading && (
//                 <div className="p-2 text-sm text-gray-500">Memuat...</div>
//               )}
//               {!loading && companies && companies.length === 0 && (
//                 <div className="p-2 text-sm text-gray-500">Tidak ada hasil</div>
//               )}
//               {companies &&
//                 companies.map((c) => (
//                   <div
//                     key={c.code}
//                     className="p-2 text-sm hover:bg-gray-100 cursor-pointer"
//                     onClick={() => {
//                       field.onChange(c.code);
//                       setSearch(c.name);
//                     }}
//                   >
//                     {c.name}
//                   </div>
//                 ))}
//             </div>
//           )}
//         </div>
//       )}
//     />
//   );
// }
