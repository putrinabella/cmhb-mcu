import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { AlertTriangle } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function NotFoundPage() {
  return (
    <Card className="max-w-2xl mx-auto p-6 rounded-2xl shadow-lg bg-white">
      {/* Header */}
      <div className="flex items-center gap-6 border-b pb-4 mb-4">
        <img
          src="/avatar.jpg"
          alt="User Avatar"
          className="w-24 h-24 rounded-full object-cover border"
        />
        <div>
          <h2 className="text-2xl font-bold">John Doe</h2>
          <p className="text-sm text-gray-500">PT OpenAI Indonesia</p>
        </div>
      </div>

      {/* Info Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700">
        <div>
          <p className="text-sm text-gray-400">Email</p>
          <p className="font-medium">johndoe@mail.com</p>
        </div>
        <div>
          <p className="text-sm text-gray-400">Nomor Telepon</p>
          <p className="font-medium">+62 812-3456-7890</p>
        </div>
        <div>
          <p className="text-sm text-gray-400">Alamat</p>
          <p className="font-medium">Jl. Merdeka No. 10, Jakarta</p>
        </div>
        <div>
          <p className="text-sm text-gray-400">Jenis Kelamin</p>
          <p className="font-medium">Laki-laki</p>
        </div>
        <div>
          <p className="text-sm text-gray-400">Tanggal Lahir</p>
          <p className="font-medium">01 Januari 1990</p>
        </div>
      </div>

      {/* Action */}
      <div className="mt-6 flex justify-end gap-3">
        <Button variant="outline">Edit Profile</Button>
        <Button className="bg-primary text-white">Ganti Password</Button>
      </div>
    </Card>
    // <div
    //   className="
    //     p-8 mx-auto
    //     h-full overflow-y-auto
    //     lg:h-auto
    //     min-h-screen
    //     flex flex-col justify-center items-center
    //     bg-base-100 text-base-content
    //     transition-colors duration-300
    //   "
    // >
    //   <motion.div
    //     className="w-24 h-24 md:w-32 md:h-32 mb-6 text-warning"
    //     initial={{ scale: 0.8, opacity: 0 }}
    //     animate={{ scale: 1, opacity: 1 }}
    //     transition={{ duration: 0.6 }}
    //   >
    //     <AlertTriangle className="w-full h-full" />
    //   </motion.div>

    //   <motion.h1
    //     className="text-3xl md:text-5xl text-center font-bold mb-2"
    //     initial={{ y: 20, opacity: 0 }}
    //     animate={{ y: 0, opacity: 1 }}
    //     transition={{ delay: 0.2 }}
    //   >
    //     Halaman Tidak Ditemukan
    //   </motion.h1>

    //   <motion.p
    //     className="text-center max-w-md mb-6 text-base-content/70"
    //     initial={{ y: 20, opacity: 0 }}
    //     animate={{ y: 0, opacity: 1 }}
    //     transition={{ delay: 0.3 }}
    //   >
    //     Maaf, halaman yang Anda tuju tidak tersedia.
    //   </motion.p>

    //   <motion.div
    //     className="flex justify-center"
    //     initial={{ scale: 0.9, opacity: 0 }}
    //     animate={{ scale: 1, opacity: 1 }}
    //     transition={{ delay: 0.4 }}
    //   >
    //     <Link
    //       to="/dashboard"
    //       className="
    //         px-6 py-3
    //         bg-gradient-to-r from-primary to-secondary
    //         text-primary-content
    //         rounded-xl shadow-lg
    //         hover:shadow-xl hover:scale-105
    //         transform transition-all duration-300
    //       "
    //     >
    //       Kembali ke Beranda
    //     </Link>
    //   </motion.div>
    // </div>
  );
}
