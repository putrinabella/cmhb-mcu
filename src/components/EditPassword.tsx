"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useForm, FormProvider } from "react-hook-form";
import { PasswordField } from "./form/PasswordField";
import { Lock } from "lucide-react";

export default function EditPassword() {
  const [open, setOpen] = useState(false);

  const methods = useForm({
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const { handleSubmit, setError, clearErrors } = methods;

  //   const newPassword = watch("newPassword");
  //   const confirmPassword = watch("confirmPassword");

  const validatePassword = (pwd: string) => {
    if (pwd.length < 8) return "Minimal 8 karakter";
    if (!/[0-9]/.test(pwd)) return "Harus ada angka";
    if (!/[a-z]/.test(pwd)) return "Harus ada huruf kecil";
    if (!/[A-Z]/.test(pwd)) return "Harus ada huruf besar";
    if (!/[!@#$%^&*(),.?\":{}|<>]/.test(pwd))
      return "Harus ada karakter spesial (!@#$%)";
    return "";
  };

  const onSubmit = (data: any) => {
    const err = validatePassword(data.newPassword);
    if (err) {
      setError("newPassword", { type: "manual", message: err });
      return;
    }
    if (data.newPassword !== data.confirmPassword) {
      setError("confirmPassword", {
        type: "manual",
        message: "Konfirmasi password tidak sama",
      });
      return;
    }

    clearErrors();
    console.log("Password berhasil diganti:", data);
    setOpen(false);
  };

  return (
    <div>
      {/* Tombol */}
      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
        <Button
          onClick={() => setOpen(true)}
          className="relative mt-4 w-full px-6 py-3 font-semibold tracking-wide rounded-lg
               bg-gradient-to-r from-primary to-primary/80 text-white shadow-md
               hover:from-primary/90 hover:to-primary/70 hover:shadow-lg
               transition-all duration-200 focus:outline-none focus:ring-4
               focus:ring-primary/30 flex items-center justify-center"
        >
          <Lock className="w-5 h-5 absolute left-4" strokeWidth={3} />
          Edit password
        </Button>
      </motion.div>

      {open && (
        <dialog className="modal modal-open">
          <div className="modal-box rounded-xl">
            <h3 className="font-bold text-lg">Edit Password</h3>

            <FormProvider {...methods}>
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="mt-4 space-y-3"
              >
                <PasswordField
                  name="currentPassword"
                  label="Password Lama"
                  placeholder="Masukkan password lama"
                  control={undefined}
                />
                <PasswordField
                  name="newPassword"
                  label="Password Baru"
                  placeholder="Masukkan password baru"
                  control={undefined}
                />
                <PasswordField
                  name="confirmPassword"
                  label="Konfirmasi Password Baru"
                  placeholder="Ulangi password baru"
                  control={undefined}
                />

                <div className="modal-action">
                  <Button
                    type="button"
                    onClick={() => setOpen(false)}
                    className="btn btn-ghost"
                  >
                    Cancel
                  </Button>
                  <Button type="submit" className="btn btn-primary">
                    Save
                  </Button>
                </div>
              </form>
            </FormProvider>
          </div>
          <form method="dialog" className="modal-backdrop">
            <button onClick={() => setOpen(false)}>close</button>
          </form>
        </dialog>
      )}
    </div>
  );
}
