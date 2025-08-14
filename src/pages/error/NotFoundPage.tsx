import { motion } from "framer-motion";
import { Link } from "react-router-dom";

// export default function NotFoundPage() {
//   return (
//     <div className=" p-8 mx-auto h-full overflow-y-auto lg:h-auto min-h-screen flex flex-col justify-center items-center bg-base-100 text-base-content transition-colors duration-300 ">
//       {" "}
//       <motion.img
//         src="/images/404.svg"
//         alt="404 Not Found"
//         className="w-full max-w-xs md:max-w-lg h-auto object-contain mb-6"
//         initial={{ scale: 0.8, opacity: 0 }}
//         animate={{ scale: 1, opacity: 1 }}
//         transition={{ duration: 0.6 }}
//       />{" "}
//       <motion.h1
//         className="text-3xl md:text-5xl text-center font-bold mb-2"
//         initial={{ y: 20, opacity: 0 }}
//         animate={{ y: 0, opacity: 1 }}
//         transition={{ delay: 0.2 }}
//       >
//         {" "}
//         Halaman Tidak Ditemukan{" "}
//       </motion.h1>{" "}
//       <motion.p
//         className="text-center max-w-md mb-6 text-base-content/70"
//         initial={{ y: 20, opacity: 0 }}
//         animate={{ y: 0, opacity: 1 }}
//         transition={{ delay: 0.3 }}
//       >
//         {" "}
//         Maaf, halaman yang Anda tuju tidak tersedia.{" "}
//       </motion.p>{" "}
//       <motion.div
//         className="flex justify-center"
//         initial={{ scale: 0.9, opacity: 0 }}
//         animate={{ scale: 1, opacity: 1 }}
//         transition={{ delay: 0.4 }}
//       >
//         {" "}
//         <Link
//           to="/dashboard"
//           className=" px-6 py-3 bg-gradient-to-r from-primary to-secondary text-primary-content rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transform transition-all duration-300 "
//         >
//           {" "}
//           Kembali ke Beranda{" "}
//         </Link>{" "}
//       </motion.div>{" "}
//     </div>
//   );
// }

import { AlertTriangle } from "lucide-react";

export default function NotFoundPage() {
  return (
    <div
      className="
        p-8 mx-auto
        h-full overflow-y-auto
        lg:h-auto
        min-h-screen
        flex flex-col justify-center items-center
        bg-base-100 text-base-content
        transition-colors duration-300
      "
    >
      <motion.div
        className="w-24 h-24 md:w-32 md:h-32 mb-6 text-warning"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <AlertTriangle className="w-full h-full" />
      </motion.div>

      <motion.h1
        className="text-3xl md:text-5xl text-center font-bold mb-2"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        Halaman Tidak Ditemukan
      </motion.h1>

      <motion.p
        className="text-center max-w-md mb-6 text-base-content/70"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        Maaf, halaman yang Anda tuju tidak tersedia.
      </motion.p>

      <motion.div
        className="flex justify-center"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <Link
          to="/dashboard"
          className="
            px-6 py-3
            bg-gradient-to-r from-primary to-secondary
            text-primary-content
            rounded-xl shadow-lg
            hover:shadow-xl hover:scale-105
            transform transition-all duration-300
          "
        >
          Kembali ke Beranda
        </Link>
      </motion.div>
    </div>
  );
}
