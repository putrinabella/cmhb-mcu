// import { LogOut } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { motion } from "framer-motion";

// interface LogoutButtonProps {
//   handleLogout: () => void;
// }

// export default function LogoutButton({ handleLogout }: LogoutButtonProps) {
//   return (
//     <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
//       <Button
//         onClick={handleLogout}
//         size="lg"
//         className="
//           mt-4 w-full
//           px-6 py-3
//           font-semibold tracking-wide
//           rounded-lg
//           bg-gradient-to-r from-primary to-primary/80
//           text-white
//           shadow-md
//           hover:from-primary/90 hover:to-primary/70
//           hover:shadow-lg
//           transition-all duration-200
//           focus:outline-none focus:ring-4 focus:ring-primary/30
//           flex items-center justify-center gap-2
//         "
//       >
//         <LogOut className="w-5 h-5" />
//         Logout
//       </Button>
//     </motion.div>
//   );
// }

import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useLogout } from "@/hooks/use-logout";

interface LogoutButtonProps {
  handleLogout?: () => void; // opsional
}

export default function LogoutButton({ handleLogout }: LogoutButtonProps) {
  const { handleLogout: defaultLogout } = useLogout();

  return (
    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
      <Button
        onClick={handleLogout ?? defaultLogout}
        size="lg"
        className="
          relative
          mt-4 w-full
          px-6 py-3
          font-semibold tracking-wide
          rounded-lg
          bg-gradient-to-r from-primary to-primary/80
          text-white
          shadow-md
          hover:from-primary/90 hover:to-primary/70
          hover:shadow-lg
          transition-all duration-200
          focus:outline-none focus:ring-4 focus:ring-primary/30
          flex items-center justify-center
        "
      >
        {/* Icon di pojok kiri */}
        <LogOut className="w-5 h-5 absolute left-4" strokeWidth={3} />
        {/* Teks tetap center */}
        Logout
      </Button>
    </motion.div>
  );
}
