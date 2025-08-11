import React from "react";
import { FormInput } from "@/components/FormInput.js";
import { FormWrapper } from "@/components/FormWrapper.js";
import { Button } from "@/components/ui/button.js";
import { Head, useForm as useInertiaForm, Link } from "@inertiajs/react";
import { Eye, EyeOff, LockIcon, Phone } from "lucide-react";
import AuthLayout from "@/layouts/AuthLayout.js";

type LoginEmployeeFormValues = {
    phone: string;
    password: string;
};

export default function LoginEmployee() {
    const inertiaForm = useInertiaForm<LoginEmployeeFormValues>({
        phone: "",
        password: "",
    });

    const [showPassword, setShowPassword] = React.useState(false);

    return (
        <>
            <Head title="Login Karyawan" />
            <AuthLayout
                title="Login"
                subtitle="Masukkan nomor HP dan kata sandi untuk masuk."
            >
                <FormWrapper<LoginEmployeeFormValues>
                    defaultValues={inertiaForm.data}
                    onSubmit={() =>
                        inertiaForm.post("/LoginEmployee", {
                            preserveScroll: true,
                        })
                    }
                >
                    {({ control }) => (
                        <div className="space-y-4">
                            <FormInput
                                control={control}
                                name="phone"
                                label="Nomor Telpon"
                                placeholder="Masukkan Nomor Telpon"
                                type="tel"
                                rules={{
                                    required: "Nomor telpon wajib diisi",
                                }}
                                leftIcon={<Phone className="w-5 h-5" />}
                            />

                            <FormInput
                                control={control}
                                name="password"
                                label="Password"
                                placeholder="Masukkan password"
                                type="password"
                                rules={{
                                    required: "Password wajib diisi",
                                }}
                                showToggle
                                showValue={showPassword}
                                onToggle={() =>
                                    setShowPassword((prev) => !prev)
                                }
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
        </>
    );
}
