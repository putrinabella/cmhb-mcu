// NotFoundPage.tsx
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 px-4">
      <motion.img
        src="/images/404.svg"
        alt="404 Not Found"
        className="w-full max-w-xs md:max-w-lg h-auto object-contain mb-6"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6 }}
      />

      <motion.h1
        className="text-3xl md:text-5xl text-center font-bold text-gray-800 mb-2"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        Halaman Tidak Ditemukan
      </motion.h1>

      <motion.p
        className="text-gray-500 text-center max-w-md mb-6"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        Ups... Halaman yang kamu cari tidak tersedia. Mungkin sudah dipindahkan
        atau dihapus.
      </motion.p>

      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <Link
          to="/dashboard"
          className="px-6 py-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transform transition-all duration-300"
        >
          Kembali ke Beranda
        </Link>
      </motion.div>
    </div>
  );
}
