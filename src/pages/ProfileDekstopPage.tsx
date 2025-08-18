import EditPassword from "@/components/EditPassword";
import LogoutButton from "@/components/LogoutButton";
import ThemeToggle from "@/components/ThemeToggle";
import { User } from "lucide-react";

export default function ProfileDekstopPage() {
  return (
    <div className="h-full overflow-y-auto lg:h-auto w-full p-4 bg-base-100 text-base-content">
      <div className="grid md:grid-cols-3 gap-4 p-6">
        {/* Left Card */}
        <div className="flex flex-col items-center text-center p-6 rounded-xl border-2 border-base-300 col-span-1">
          <h1 className="text-4xl font-semibold uppercase">Putri Nabella</h1>
          <p className="text-sm text-base-content/70 mt-2 mb-8">
            Ciputra Mitra Hospital Banjarmasin
          </p>
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
            <p className="text-base-content/60">Tanggal Lahir</p>
            <p className="font-medium text-base-content">01 Januari 2000</p>

            <p className="text-base-content/60">Jenis Kelamin</p>
            <p className="font-medium text-base-content">Perempuan</p>

            <p className="text-base-content/60">Alamat</p>
            <p className="font-medium text-base-content">Banjarmasin</p>

            <p className="text-base-content/60">Nomor Telpon</p>
            <p className="font-medium text-base-content">+62 812-3456-7890</p>

            <p className="text-base-content/60">Email</p>
            <p className="font-medium text-base-content">testing@example.com</p>
          </div>
          <div className="divider"></div>
          <h3 className="font-semibold text-xl mb-3 text-base-content">Tema</h3>
          <ThemeToggle></ThemeToggle>
          <div className="divider"></div>
          <EditPassword />
          <LogoutButton />
        </div>
      </div>
    </div>
  );
}
