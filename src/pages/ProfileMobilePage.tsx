import EditPassword from "@/components/EditPassword";
import { InfoItem } from "@/components/InfoItem";
import LogoutButton from "@/components/LogoutButton";
import Tabs from "@/components/Tabs";
import ThemeToggle from "@/components/ThemeToggle";
import { CalendarDays, Home, Mail, Phone, User } from "lucide-react";

export default function ProfileMobilePage() {
  const tabData = [
    {
      label: "Profil",
      content: (
        <div className="space-y-4">
          <div className="divider"></div>

          <InfoItem
            icon={<CalendarDays size={18} className="text-primary" />}
            label="Tanggal Lahir"
            value="01 Januari 2000"
          />
          <InfoItem
            icon={<User size={18} className="text-primary" />}
            label="Jenis Kelamin"
            value="Perempuan"
          />
          <InfoItem
            icon={<Home size={18} className="text-primary" />}
            label="Alamat"
            value="Banjarmasin"
          />

          <div className="divider"></div>

          <InfoItem
            icon={<Phone size={18} className="text-primary" />}
            label="Nomor Telepon"
            value="+62 812-3456-7890"
          />
          <InfoItem
            icon={<Mail size={18} className="text-primary" />}
            label="Email"
            value="testing@example.com"
          />

          <div className="divider"></div>
          <EditPassword />
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
        <h1 className="text-xl font-semibold">Putri Nabella</h1>
        <p className="text-sm text-base-content/70 mt-2 mb-4">
          Ciputra Mitra Hospital Banjarmasin
        </p>
      </div>
      <Tabs tabs={tabData} />
    </div>
  );
}
