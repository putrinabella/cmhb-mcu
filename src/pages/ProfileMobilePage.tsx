// import EditPassword from "@/components/EditPassword";
import { InfoItem } from "@/components/InfoItem";
import LogoutButton from "@/components/LogoutButton";
import Tabs from "@/components/Tabs";
import ThemeToggle from "@/components/ThemeToggle";
import { useAuth } from "@/routes/AuthContext";
import {
  Briefcase,
  Building2,
  Component,
  Mail,
  Phone,
  User,
} from "lucide-react";

export default function ProfileMobilePage() {
  const { user } = useAuth();

  // Tampilkan loading jika user belum siap
  if (!user) {
    return (
      <div className="h-full flex items-center justify-center text-base-content">
        <p className="text-lg">Memuat profil...</p>
      </div>
    );
  }

  const tabData = [
    {
      label: "Profil",
      content: (
        <div className="space-y-4">
          <div className="divider"></div>

          <InfoItem
            icon={<User size={18} className="text-primary" />}
            label="Nama"
            value={user.name || "-"}
          />
          <InfoItem
            icon={<Building2 size={18} className="text-primary" />}
            label="Perusahaan"
            value={user.company?.name || "-"}
          />

          <InfoItem
            icon={<Component size={18} className="text-primary" />}
            label="Posisi"
            value={user.position || "-"}
          />
          <InfoItem
            icon={<Briefcase size={18} className="text-primary" />}
            label="Departemen"
            value={user.department || "-"}
          />
          <div className="divider"></div>

          <InfoItem
            icon={<Phone size={18} className="text-primary" />}
            label="Nomor Telepon"
            value={user.phone_number || "-"}
          />
          <InfoItem
            icon={<Mail size={18} className="text-primary" />}
            label="Email"
            value={user.email || "-"}
          />

          <div className="divider"></div>
          {/* <EditPassword /> */}
          <LogoutButton />
        </div>
      ),
    },
    {
      label: "Tema",
      content: <ThemeToggle />,
    },
    // {
    //   label: "Riwayat MCU",
    //   apiUrl: "https://www.ciputramitrahospital.id/api/v1/client/promotions",
    // },
  ];

  return (
    <div className="h-full overflow-y-auto lg:h-auto w-full p-4 bg-base-100 text-base-content">
      <div className="bg-gradient-to-r from-primary/30 to-secondary/30 mt-18 mb-4 p-6 rounded-3xl text-center">
        <div className="flex justify-center -mt-20 mb-4">
          <div className="w-28 h-28 rounded-full bg-gradient-to-tr from-primary to-secondary text-primary-content p-4 flex items-center justify-center">
            <User className="w-full h-full" />
          </div>
        </div>
        <h1 className="text-xl font-semibold">{user.name || "Pengguna"}</h1>
        <p className="text-sm text-base-content/70 mt-2 mb-4">
          {user.company?.name || "Tidak ada perusahaan"}
        </p>
      </div>
      <Tabs tabs={tabData} />
    </div>
  );
}
