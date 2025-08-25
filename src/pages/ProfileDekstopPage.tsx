import EditPassword from "@/components/EditPassword";
import LogoutButton from "@/components/LogoutButton";
import ThemeToggle from "@/components/ThemeToggle";
import { User } from "lucide-react";
import { useAuth } from "@/routes/AuthContext";

export default function ProfileDekstopPage() {
  const { user } = useAuth();

  // jika user belum ada (misal saat loading)
  if (!user) {
    return (
      <div className="h-full flex items-center justify-center text-base-content">
        <p className="text-lg">Memuat profil...</p>
      </div>
    );
  }

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
            <p className="text-base-content/60">Nama</p>
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
            <p className="font-medium text-base-content">{user.email}</p>

            <p className="text-base-content/60">Perusahaan</p>
            <p className="font-medium text-base-content">
              {user.company?.name || "-"}
            </p>
          </div>

          <div className="divider"></div>

          <h3 className="font-semibold text-xl mb-3 text-base-content">Tema</h3>
          <ThemeToggle />

          <div className="divider"></div>

          <EditPassword />
          <LogoutButton />
        </div>
      </div>
    </div>
  );
}

// import { useEffect, useState } from "react";
// import EditPassword from "@/components/EditPassword";
// import LogoutButton from "@/components/LogoutButton";
// import ThemeToggle from "@/components/ThemeToggle";
// import { User } from "lucide-react";
// import { getPicDetail, type PicProfile } from "@/services/picAPI";

// export default function ProfileDekstopPage() {
//   const [profile, setProfile] = useState<PicProfile | null>(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchProfile = async () => {
//       try {
//         // TODO: Ganti ID dengan dynamic dari localStorage/user login
//         const storedUser = localStorage.getItem("user");
//         const userId = storedUser ? JSON.parse(storedUser)?.id : null;

//         if (!userId) throw new Error("User ID tidak ditemukan");

//         const res = await getPicDetail(userId);
//         setProfile(res.data);
//       } catch (error) {
//         console.error("Gagal mengambil data profil", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProfile();
//   }, []);

//   if (loading) {
//     return <p className="p-6">Memuat data profil...</p>;
//   }

//   if (!profile) {
//     return <p className="p-6 text-error">Profil tidak tersedia.</p>;
//   }

//   return (
//     <div className="h-full overflow-y-auto lg:h-auto w-full p-4 bg-base-100 text-base-content">
//       <div className="grid md:grid-cols-3 gap-4 p-6">
//         {/* Left Card */}
//         <div className="flex flex-col items-center text-center p-6 rounded-xl border-2 border-base-300 col-span-1">
//           <h1 className="text-4xl font-semibold uppercase">{profile.name}</h1>
//           <p className="text-sm text-base-content/70 mt-2 mb-8">
//             {profile.company_name}
//           </p>
//           <div className="aspect-square w-full rounded-full bg-gradient-to-tr from-primary to-secondary text-primary-content p-4 flex items-center justify-center order-4 border-8 border-base-100 shadow-md">
//             <User className="w-full h-full" />
//           </div>
//         </div>

//         {/* Right Card */}
//         <div className="p-6 rounded-xl border-2 border-base-300 flex flex-col gap-4 col-span-2">
//           <h3 className="font-semibold text-xl mb-3 text-base-content">
//             Profil Pengguna
//           </h3>
//           <div className="grid grid-cols-2 gap-y-3 text-base">
//             <p className="text-base-content/60">Posisi</p>
//             <p className="font-medium text-base-content">{profile.position}</p>

//             <p className="text-base-content/60">Departemen</p>
//             <p className="font-medium text-base-content">
//               {profile.department}
//             </p>

//             <p className="text-base-content/60">Nomor Telpon</p>
//             <p className="font-medium text-base-content">
//               {profile.phone_number}
//             </p>

//             <p className="text-base-content/60">Email</p>
//             <p className="font-medium text-base-content">{profile.email}</p>
//           </div>
//           <div className="divider"></div>
//           <h3 className="font-semibold text-xl mb-3 text-base-content">Tema</h3>
//           <ThemeToggle />
//           <div className="divider"></div>
//           <EditPassword />
//           <LogoutButton />
//         </div>
//       </div>
//     </div>
//   );
// }
