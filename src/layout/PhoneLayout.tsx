import { HeartPulse, Hospital, House, User } from "lucide-react";
import { Outlet, Link, useLocation } from "react-router-dom";
import { useViewportHeight } from "@/hooks/use-viewport-height";
import { useAuth } from "@/routes/AuthContext";

export default function PhoneLayout() {
  useViewportHeight();
  const location = useLocation();
  const { user } = useAuth();
  // const isActive = (path: string) => location.pathname === path;
  const isActive = (path: string) => {
    return (
      location.pathname === path || location.pathname.startsWith(`${path}/`)
    );
  };
  const navItems = [];

  if (user?.role === "Company PIC") {
    navItems.push(
      { path: "/ciputramitrahospital", icon: HeartPulse, label: "Web Profile" },
      { path: "/dashboard", icon: House, label: "Dashboard" },
      { path: "/profile", icon: User, label: "Profile" }
    );
  }
  if (user?.role === "Employee") {
    navItems.push(
      { path: "/ciputramitrahospital", icon: Hospital, label: "Web Profile" },
      { path: "/dashboard", icon: House, label: "Dashboard" },
      { path: "/profile", icon: User, label: "Profile" }
    );
  }

  return (
    <div className="h-screen flex flex-col bg-base-100 text-base-content">
      {/* Konten scrollable */}
      <div className="flex-1 overflow-y-auto">
        <Outlet />
      </div>

      {/* Dock Navigation */}
      <div className="lg:hidden w-full pb-4">
        <div className="mx-auto w-[90%] backdrop-blur-xl bg-base-200/80  shadow-lg rounded-2xl p-2 flex justify-around items-center">
          {/* <div className="mx-auto w-[90%] backdrop-blur-xl bg-base-200/80 border border-base-300 shadow-lg rounded-2xl p-2 flex justify-around items-center"> */}
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
                      ? "w-12 h-12 bg-gradient-to-tr from-primary to-secondary text-primary-content rounded-full scale-110 ring-4 ring-base-100 -mt-6 "
                      : "text-base-content/60 hover:text-primary"
                  }`}
                >
                  <Icon className="size-[1.4em]" />
                </div>
                {!active && (
                  <span className="text-[0.7rem] mt-1 text-base-content/70 group-hover:text-primary transition-colors">
                    {item.label}
                  </span>
                )}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
