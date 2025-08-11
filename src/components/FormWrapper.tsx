import React from "react";
import { Form } from "@/components/ui/form.js";
import { useForm } from "react-hook-form";
import type { FieldValues, UseFormProps } from "react-hook-form";

type FormWrapperProps<T extends FieldValues> = {
    defaultValues: UseFormProps<T>["defaultValues"];
    onSubmit: (values: T) => void;
    children: (props: {
        control: ReturnType<typeof useForm<T>>["control"];
        handleSubmit: ReturnType<typeof useForm<T>>["handleSubmit"];
        getValues: ReturnType<typeof useForm<T>>["getValues"];
    }) => React.ReactNode;
};

export function FormWrapper<T extends FieldValues>({
    defaultValues,
    onSubmit,
    children,
}: FormWrapperProps<T>) {
    const form = useForm<T>({ defaultValues });

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                {children({
                    control: form.control,
                    handleSubmit: form.handleSubmit,
                    getValues: form.getValues,
                })}
            </form>
        </Form>
    );
}

// import React from "react";
// import { Form } from "@/components/ui/form.js";
// import { useForm } from "react-hook-form";
// import type { UseFormProps } from "react-hook-form";

// type FormWrapperProps<T> = {
//     defaultValues: UseFormProps<T>["defaultValues"];
//     onSubmit: (values: T) => void;
//     children: (props: {
//         control: ReturnType<typeof useForm<T>>["control"];
//         handleSubmit: ReturnType<typeof useForm<T>>["handleSubmit"];
//         getValues: ReturnType<typeof useForm<T>>["getValues"];
//         setValue: ReturnType<typeof useForm<T>>["setValue"];
//         reset: ReturnType<typeof useForm<T>>["reset"];
//     }) => React.ReactNode;
//     formClassName?: string;
// };

// export function FormWrapper<T extends Record<string, any>>({
//     defaultValues,
//     onSubmit,
//     children,
//     formClassName = "",
// }: FormWrapperProps<T>) {
//     const form = useForm<T>({
//         defaultValues,
//         mode: "onChange",
//     });

//     return (
//         <Form {...form}>
//             <form
//                 onSubmit={form.handleSubmit(onSubmit)}
//                 className={formClassName}
//             >
//                 {children({
//                     control: form.control,
//                     handleSubmit: form.handleSubmit,
//                     getValues: form.getValues,
//                     setValue: form.setValue,
//                     reset: form.reset,
//                 })}
//             </form>
//         </Form>
//     );
// }
