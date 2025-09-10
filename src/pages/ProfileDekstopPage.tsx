// import EditPassword from "@/components/EditPassword";
import LogoutButton from "@/components/LogoutButton";
import ThemeToggle from "@/components/ThemeToggle";
import { User } from "lucide-react";
import { useAuth } from "@/routes/AuthContext";
import React from "react";
import { LoadingIndicator } from "@/components/LoadingIndicator";

export default function ProfileDekstopPage() {
  const { user } = useAuth();

  // jika user belum ada (misal saat loading)
  if (!user) {
    return <LoadingIndicator />;
  }
  const userFields = [
    { label: "Nama", value: user.name },
    { label: "Posisi", value: user.position },
    { label: "Departemen", value: user.department },
    { label: "Nomor Telepon", value: user.phone_number },
    { label: "Email", value: user.email },
    { label: "Perusahaan", value: user.company?.name },
  ];
  return (
    <div className="h-full overflow-y-auto lg:h-auto w-full p-4 bg-base-100 text-base-content">
      <div className="grid md:grid-cols-3 gap-4 p-6">
        {/* Left Card */}
        <div className="flex flex-col items-center text-center p-6 rounded-xl border-2 border-base-300 col-span-1">
          <h1 className="text-4xl font-semibold uppercase">
            {user.name || "Pengguna"}
          </h1>
          <h3 className="text-2xl text-base-content/70 mt-2 mb-8">
            {user.company?.name || "Tidak ada perusahaan"}
          </h3>
          <div className="aspect-square w-full rounded-full bg-gradient-to-tr from-primary to-secondary text-primary-content p-4 flex items-center justify-center order-4 border-8 border-base-100 shadow-md">
            <User className="w-full h-full" />
          </div>
        </div>

        {/* Right Card */}
        <div className="p-6 rounded-xl border-2 border-base-300 flex flex-col gap-4 col-span-2">
          <h3 className="font-semibold text-xl mb-3 text-base-content">
            Profil Pengguna
          </h3>
          <div className="grid grid-cols-2 gap-y-3 text-base">
            {userFields.map(
              (field, index) =>
                field.value && (
                  <React.Fragment key={index}>
                    <p className="text-base-content/60">{field.label}</p>
                    <p className="font-medium text-base-content">
                      {field.value}
                    </p>
                  </React.Fragment>
                )
            )}
            {/* <p className="text-base-content/60">Nama</p>
            <p className="font-medium text-base-content">{user.name}</p>

            <p className="text-base-content/60">Posisi</p>
            <p className="font-medium text-base-content">
              {user.position || "-"}
            </p>

            <p className="text-base-content/60">Departemen</p>
            <p className="font-medium text-base-content">
              {user.department || "-"}
            </p>

            <p className="text-base-content/60">Nomor Telepon</p>
            <p className="font-medium text-base-content">
              {user.phone_number || "-"}
            </p>

            <p className="text-base-content/60">Email</p>
            <p className="font-medium text-base-content">{user.email || "-"}</p>

            <p className="text-base-content/60">Perusahaan</p>
            <p className="font-medium text-base-content">
              {user.company?.name || "-"}
            </p> */}
          </div>

          <div className="divider"></div>

          <h3 className="font-semibold text-xl mb-3 text-base-content">Tema</h3>
          <ThemeToggle />

          <div className="divider"></div>

          {/* <EditPassword /> */}
          <LogoutButton />
        </div>
      </div>
    </div>
  );
}
