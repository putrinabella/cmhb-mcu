// import React from "react";
// import {
//   FormItem,
//   FormLabel,
//   FormControl,
//   FormMessage,
// } from "@/components/ui/form.js";
// import { Input } from "@/components/ui/input.js";
// import { Controller } from "react-hook-form";
// import clsx from "clsx";

// type FormInputProps = {
//   name: string;
//   label: string;
//   type?: string;
//   control: any;
//   rules?: any;
//   placeholder?: string;
//   showToggle?: boolean;
//   showValue?: boolean;
//   onToggle?: () => void;
//   icon?: React.ReactNode; // right icon
//   leftIcon?: React.ReactNode; // left icon
// };

// export const FormInput = ({
//   name,
//   label,
//   type = "text",
//   control,
//   rules,
//   placeholder,
//   showToggle,
//   showValue,
//   onToggle,
//   icon,
//   leftIcon, // NEW
// }: FormInputProps) => {
//   const inputId = `form-${name}`;

//   return (
//     <Controller
//       name={name}
//       control={control}
//       rules={rules}
//       render={({ field, fieldState }) => (
//         <FormItem>
//           <FormLabel
//             htmlFor={inputId}
//             className="text-sm font-medium text-base-content dark:text-base-content"
//           >
//             {label}
//           </FormLabel>

//           <div className="relative">
//             {leftIcon && (
//               <div className="absolute left-3 top-1/2 -translate-y-1/2 text-base-content pointer-events-none">
//                 {leftIcon}
//               </div>
//             )}

//             <FormControl>
//               <Input
//                 id={inputId}
//                 {...field}
//                 type={showToggle ? (showValue ? "text" : "password") : type}
//                 placeholder={placeholder}
//                 className={clsx(
//                   {
//                     "pl-10": leftIcon, // add left padding if leftIcon
//                     "pr-10": icon, // add right padding if right icon
//                   },
//                   fieldState.error
//                     ? "border-red-500 focus:ring-red-500 focus:border-red-500"
//                     : "border-gray-300 focus:ring-blue-500 focus:border-blue-500",
//                   "transition duration-200"
//                 )}
//               />
//             </FormControl>

//             {icon && (
//               <button
//                 type="button"
//                 onClick={onToggle}
//                 className="absolute right-3 top-1/2 -translate-y-1/2 text-base-content"
//               >
//                 {icon}
//               </button>
//             )}
//           </div>

//           <FormMessage>
//             {fieldState.error && (
//               <span className="text-sm text-red-600">
//                 {fieldState.error.message}
//               </span>
//             )}
//           </FormMessage>
//         </FormItem>
//       )}
//     />
//   );
// };
import React from "react";
import {
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form.js";
import { Input } from "@/components/ui/input.js";
import { Controller } from "react-hook-form";
import clsx from "clsx";

type FormInputProps = {
  name: string;
  label: string;
  type?: string;
  control: any;
  rules?: any;
  placeholder?: string;
  showToggle?: boolean;
  showValue?: boolean;
  onToggle?: () => void;
  icon?: React.ReactNode; // right icon
  leftIcon?: React.ReactNode; // left icon
};

export const FormInput = ({
  name,
  label,
  type = "text",
  control,
  rules,
  placeholder,
  showToggle,
  showValue,
  onToggle,
  icon,
  leftIcon,
}: FormInputProps) => {
  const inputId = `form-${name}`;

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field, fieldState }) => (
        <FormItem>
          <FormLabel htmlFor={inputId} className="text-sm font-medium">
            {label}
          </FormLabel>

          <div className="relative">
            {leftIcon && (
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-base-content/50 pointer-events-none">
                {leftIcon}
              </div>
            )}

            <FormControl>
              <Input
                id={inputId}
                {...field}
                type={showToggle ? (showValue ? "text" : "password") : type}
                placeholder={placeholder}
                className={clsx(
                  "input input-bordered w-full transition",
                  leftIcon && "pl-10",
                  icon && "pr-10",
                  fieldState.error && "input-error"
                )}
              />
            </FormControl>

            {icon && (
              <button
                type="button"
                onClick={onToggle}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-base-content/50"
              >
                {icon}
              </button>
            )}
          </div>

          <FormMessage>
            {fieldState.error && (
              <span className="text-sm text-error">
                {fieldState.error.message}
              </span>
            )}
          </FormMessage>
        </FormItem>
      )}
    />
  );
};
