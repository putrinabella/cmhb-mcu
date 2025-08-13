// import { FileUser, HeartPulse, User } from "lucide-react";
// import { Outlet, Link, useLocation } from "react-router-dom";

// export default function PhoneLayout() {
//   const location = useLocation();

//   const isActive = (path: string) =>
//     location.pathname === path
//       ? "bg-blue-100 text-blue-600"
//       : "text-gray-600 hover:text-blue-500";

//   return (
//     <div className="min-h-screen bg-gray-100 flex flex-col">
//       {/* Render halaman */}
//       <div className="flex-grow p-4">
//         <Outlet />
//       </div>

//       {/* Mobile dock navigation */}
//       <div className="dock lg:hidden border-t bg-white shadow-md flex justify-around py-2">
//         <Link
//           to="/registrasi-karyawan"
//           className={`flex flex-col items-center ${isActive(
//             "/registrasi-karyawan"
//           )}`}
//         >
//           <FileUser className="size-[1.2em]" />
//           <span className="dock-label text-xs">Register</span>
//         </Link>

//         <Link
//           to="/hasil-mcu"
//           className={`flex flex-col items-center ${isActive("/hasil-mcu")}`}
//         >
//           <HeartPulse className="size-[1.2em]" />
//           <span className="dock-label text-xs">MCU</span>
//         </Link>

//         <Link
//           to="/profile"
//           className={`flex flex-col items-center ${isActive("/profile")}`}
//         >
//           <User className="size-[1.2em]" />
//           <span className="dock-label text-xs">Profile</span>
//         </Link>
//       </div>
//     </div>
//   );
// }
import { FileUser, HeartPulse, User } from "lucide-react";
import { Outlet, Link, useLocation } from "react-router-dom";

export default function PhoneLayout() {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Render halaman */}
      <div className="flex-grow p-4 pb-20">
        {" "}
        {/* pb-20 supaya konten gak ketutup navbar */}
        <Outlet />
      </div>

      {/* Mobile dock navigation - fixed */}
      <div className="dock lg:hidden border-t bg-white shadow-md flex justify-around py-2 fixed bottom-0 left-0 right-0 z-50">
        <Link
          to="/registrasi-karyawan"
          className="flex flex-col items-center relative"
        >
          <div
            className={`flex items-center justify-center ${
              isActive("/registrasi-karyawan")
                ? "w-12 h-12 bg-blue-500 text-white rounded-full shadow-lg -translate-y-3"
                : "text-gray-600 hover:text-blue-500"
            }`}
          >
            <FileUser className="size-[1.4em]" />
          </div>
          {!isActive("/registrasi-karyawan") && (
            <span className="dock-label text-xs mt-1">Register</span>
          )}
        </Link>

        <Link to="/hasil-mcu" className="flex flex-col items-center relative">
          <div
            className={`flex items-center justify-center ${
              isActive("/hasil-mcu")
                ? "w-12 h-12 bg-blue-500 text-white rounded-full shadow-lg -translate-y-3"
                : "text-gray-600 hover:text-blue-500"
            }`}
          >
            <HeartPulse className="size-[1.4em]" />
          </div>
          {!isActive("/hasil-mcu") && (
            <span className="dock-label text-xs mt-1">MCU</span>
          )}
        </Link>

        <Link to="/profile" className="flex flex-col items-center relative">
          <div
            className={`flex items-center justify-center ${
              isActive("/profile")
                ? "w-12 h-12 bg-blue-500 text-white rounded-full shadow-lg -translate-y-3"
                : "text-gray-600 hover:text-blue-500"
            }`}
          >
            <User className="size-[1.4em]" />
          </div>
          {!isActive("/profile") && (
            <span className="dock-label text-xs mt-1">Profile</span>
          )}
        </Link>
      </div>
    </div>
  );
}
