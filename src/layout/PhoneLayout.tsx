import { CloudAlert, HeartPulse, User, UserPlus } from "lucide-react";
import { Outlet, Link, useLocation } from "react-router-dom";
import { useViewportHeight } from "@/hooks/use-viewport-height";

export default function PhoneLayout() {
  useViewportHeight();
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  const navItems = [
    { path: "/registrasi-karyawan", icon: UserPlus, label: "Register" },
    { path: "/hasil-mcu", icon: HeartPulse, label: "MCU" },
    { path: "/profile", icon: User, label: "Profile" },
    { path: "/404", icon: CloudAlert, label: "404" },
  ];

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* Konten scrollable */}
      <div className="flex-1 overflow-y-auto ">
        <Outlet />
      </div>

      {/* Dock Navigation (tidak fixed, tapi tetap ada jarak dari bawah) */}
      <div className="lg:hidden w-full pb-4">
        <div className="mx-auto w-[90%] backdrop-blur-xl bg-white/80 border border-white/40 shadow-lg rounded-2xl p-2  flex justify-around items-center">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);

            return (
              <Link
                key={item.path}
                to={item.path}
                className="flex flex-col items-center relative group"
              >
                <div
                  className={`flex items-center justify-center transition-all duration-300 ${
                    active
                      ? "w-12 h-12 bg-gradient-to-tr from-blue-500 to-indigo-500 text-white rounded-full  scale-120 ring-4 ring-gray-50 -mt-4"
                      : "text-gray-500 hover:text-blue-500"
                  }`}
                >
                  <Icon className="size-[1.4em]" />
                </div>
                <span
                  className={`text-[0.7rem] mt-1 transition-colors ${
                    active ? "text-blue-600 font-medium" : "text-gray-600"
                  }`}
                >
                  {!active && (
                    <span className="text-[0.7rem] mt-1 text-gray-600 transition-colors">
                      {item.label}
                    </span>
                  )}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
