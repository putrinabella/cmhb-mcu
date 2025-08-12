import { FileUser, HeartPulse, User } from "lucide-react";
import { Outlet, Link, useLocation } from "react-router-dom";

export default function PhoneLayout() {
  const location = useLocation();

  const isActive = (path: string) =>
    location.pathname === path
      ? "bg-blue-100 text-blue-600"
      : "text-gray-600 hover:text-blue-500";

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Render halaman */}
      <div className="flex-grow p-4">
        <Outlet />
      </div>

      {/* Mobile dock navigation */}
      <div className="dock lg:hidden border-t bg-white shadow-md flex justify-around py-2">
        <Link
          to="/registrasi-karyawan"
          className={`flex flex-col items-center ${isActive(
            "/registrasi-karyawan"
          )}`}
        >
          <FileUser className="size-[1.2em]" />
          <span className="dock-label text-xs">Register</span>
        </Link>

        <Link
          to="/hasil-mcu"
          className={`flex flex-col items-center ${isActive("/hasil-mcu")}`}
        >
          <HeartPulse className="size-[1.2em]" />
          <span className="dock-label text-xs">MCU</span>
        </Link>

        <Link
          to="/profile"
          className={`flex flex-col items-center ${isActive("/profile")}`}
        >
          <User className="size-[1.2em]" />
          <span className="dock-label text-xs">Profile</span>
        </Link>
      </div>
    </div>
  );
}
