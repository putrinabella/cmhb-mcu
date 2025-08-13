import { FileUser, HeartPulse, User } from "lucide-react";
import { Outlet, Link, useLocation } from "react-router-dom";

export default function PhoneLayout() {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  const navItems = [
    { path: "/registrasi-karyawan", icon: FileUser, label: "Register" },
    { path: "/hasil-mcu", icon: HeartPulse, label: "MCU" },
    { path: "/profile", icon: User, label: "Profile" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Halaman */}
      <div className="flex-grow p-4 pb-20">
        <Outlet />
      </div>

      {/* Dock Navigation */}
      <div className="lg:hidden fixed bottom-4 left-1/2 -translate-x-1/2 z-50 w-[90%]">
        <div className="backdrop-blur-xl bg-white/80 border border-white/40 shadow-lg rounded-2xl px-4 py-2 flex justify-around items-center">
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
                      ? "w-12 h-12 bg-gradient-to-tr from-blue-500 to-indigo-500 text-white rounded-full shadow-xl scale-110"
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
                  {item.label}
                </span>

                {/* Indicator */}
                {active && (
                  <span className="absolute -bottom-2 w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
                )}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
