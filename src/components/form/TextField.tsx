import { FormInput } from "@/components/FormInput";
import type { Control } from "react-hook-form";
import type { ReactNode } from "react";

interface TextFieldProps {
  control: Control<any>;
  name: string;
  label: string;
  placeholder?: string;
  rules?: object;
  leftIcon?: ReactNode;
  type?: string;
}

export function TextField({
  control,
  name,
  label,
  placeholder,
  rules,
  leftIcon,
  type = "text",
}: TextFieldProps) {
  return (
    <FormInput
      control={control}
      name={name}
      label={label}
      placeholder={placeholder}
      rules={rules}
      leftIcon={leftIcon}
      type={type}
    />
  );
}
