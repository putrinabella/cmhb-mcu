import { Outlet, NavLink, Link } from "react-router-dom";
import { useLogout } from "@/hooks/auth/use-logout";
import { LogOut, User } from "lucide-react";

export default function DashboardLayout() {
  const { handleLogout } = useLogout();

  return (
    <div className="min-h-screen flex flex-col text-base">
      {/* Navbar desktop */}
      <div className="navbar hidden lg:flex sticky top-0 z-50 px-6 py-2 justify-between bg-base-100">
        {/* Logo di kiri */}
        <div className="navbar-start">
          <Link to="/dashboard" className="btn btn-ghost p-0">
            <img src="/images/logo.png" alt="Logo" className="h-[40px]" />
          </Link>
        </div>

        {/* Menu navigasi + user dropdown di kanan */}
        <div className="flex items-center gap-4 navbar-end">
          {/* Menu navigasi dengan bg */}
          <div className="flex gap-6 bg-base-100 px-2 py-2 rounded-full shadow-md items-center">
            {[
              { to: "/dashboard", label: "Dashboard" },
              { to: "/company-profile", label: "Perusahaan" },
              { to: "/registrasi-karyawan", label: "Pegawai" },
              { to: "/hasil-mcu", label: "Hasil MCU" },
            ].map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `px-4 py-2 rounded-full transition-colors duration-200 ${
                    isActive
                      ? "bg-gradient-to-tr from-primary to-secondary text-primary-content font-medium"
                      : "hover:bg-base-300"
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </div>

          {/* User Dropdown */}
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle p-0"
            >
              {/* Avatar dengan bg mirip navbar menu, sekarang ada px-4 py-2 */}
              <div className="flex items-center justify-center p-4 rounded-full bg-base-100 shadow-md">
                <User className="w-6 h-6 text-base" />
              </div>
            </div>

            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-xl shadow-md mt-3 w-52 p-2 border border-base-300"
            >
              <li>
                <NavLink
                  to="/profile"
                  className={({ isActive }) =>
                    `text-sm flex items-center gap-2 rounded-lg px-2 py-1 ${
                      isActive
                        ? "bg-primary text-primary-content font-medium"
                        : "hover:bg-primary/20"
                    }`
                  }
                >
                  <User className="w-4 h-4" />
                  Profile
                </NavLink>
              </li>

              <li>
                <button
                  onClick={handleLogout}
                  className="w-full text-left flex items-center gap-2 hover:bg-primary/20 rounded-lg text-sm px-2 py-1"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Content area */}
      <main className="flex-grow p-6">
        <Outlet />
      </main>
    </div>
  );
}

// import { Outlet, NavLink, Link } from "react-router-dom";
// import { useLogout } from "@/hooks/use-logout";
// import { LogOut, User } from "lucide-react";

// export default function DashboardLayout() {
//   const { handleLogout } = useLogout();

//   return (
//     <div className="min-h-screen flex flex-col bg-base-100 text-base-content">
//       {/* Navbar desktop */}
//       <div className="navbar bg-base-100 border-b border-base-300 shadow-sm hidden lg:flex sticky top-0 z-50">
//         <div className="navbar-start">
//           <Link to="/dashboard" className="btn btn-ghost p-0">
//             <img
//               src="/images/logo.png"
//               alt="Ciputra Mitra Hospital"
//               className="h-[40px]"
//             />
//           </Link>
//         </div>

//         <div className="navbar-center hidden lg:flex">
//           <div className="flex gap-4">
//             <NavLink
//               to="/company-profile"
//               className={({ isActive }) =>
//                 `px-3 py-2 ${
//                   isActive
//                     ? "border-b-2 border-primary text-primary font-medium"
//                     : "hover:text-primary"
//                 }`
//               }
//             >
//               Perusahaan
//             </NavLink>
//             <NavLink
//               to="/dashboard"
//               className={({ isActive }) =>
//                 `px-3 py-2 ${
//                   isActive
//                     ? "border-b-2 border-primary text-primary font-medium"
//                     : "hover:text-primary"
//                 }`
//               }
//             >
//               Dashboard
//             </NavLink>
//             <NavLink
//               to="/registrasi-karyawan"
//               className={({ isActive }) =>
//                 `px-3 py-2 ${
//                   isActive
//                     ? "border-b-2 border-primary text-primary font-medium"
//                     : "hover:text-primary"
//                 }`
//               }
//             >
//               Registrasi Karyawan
//             </NavLink>
//             <NavLink
//               to="/hasil-mcu"
//               className={({ isActive }) =>
//                 `px-3 py-2 ${
//                   isActive
//                     ? "border-b-2 border-primary text-primary font-medium"
//                     : "hover:text-primary"
//                 }`
//               }
//             >
//               Hasil MCU
//             </NavLink>
//           </div>
//         </div>

//         <div className="navbar-end" />

//         {/* Dropdown User */}
//         <div className="dropdown dropdown-end">
//           <div
//             tabIndex={0}
//             role="button"
//             className="btn btn-ghost btn-circle p-0"
//           >
//             <div className="w-10 h-10 flex items-center justify-center rounded-full bg-base-200">
//               <User className="w-5 h-5 text-base-content" />
//             </div>
//           </div>

//           <ul
//             tabIndex={0}
//             className="menu menu-sm dropdown-content bg-base-100 text-base-content rounded-box z-10 mt-3 w-52 p-2 shadow border border-base-300"
//           >
//             <li>
//               <NavLink
//                 to="/profile"
//                 className={({ isActive }) =>
//                   `text-sm flex items-center gap-2 rounded px-2 py-1 ${
//                     isActive
//                       ? "bg-primary text-base-content font-medium"
//                       : "hover:bg-base-200"
//                   }`
//                 }
//               >
//                 <User className="w-4 h-4" />
//                 Profile
//               </NavLink>
//             </li>

//             <li>
//               <button
//                 onClick={handleLogout}
//                 className="w-full text-left flex items-center gap-2 hover:bg-base-200 rounded text-sm px-2 py-1"
//               >
//                 <LogOut className="w-4 h-4" />
//                 Logout
//               </button>
//             </li>
//           </ul>
//         </div>
//       </div>

//       {/* Content area */}
//       <main className="flex-grow p-4">
//         <Outlet />
//       </main>
//     </div>
//   );
// }
