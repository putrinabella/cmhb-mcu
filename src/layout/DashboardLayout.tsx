import { Outlet, Link } from "react-router-dom";
import { useLogout } from "@/hooks/use-logout";

export default function DashboardLayout() {
  const { handleLogout } = useLogout();
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Navbar desktop */}
      <div className="navbar bg-white shadow-sm hidden lg:flex">
        <div className="navbar-start">
          <Link to="/dashboard" className="btn btn-ghost p-0">
            <img
              src="/images/logo.png"
              alt="Ciputra Mitra Hospital"
              className="h-[40px]"
            />
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li>
              <Link to="/registrasi-karyawan">Registrasi Karyawan</Link>
            </li>
            <li>
              <Link to="/hasil-mcu">Hasil MCU</Link>
            </li>
          </ul>
        </div>
        <div className="navbar-end"></div>
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full">
              <img alt="User avatar" src="/images/user.png" />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-10 mt-3 w-52 p-2 shadow"
          >
            <li>
              <a className="justify-between">
                Profile<span className="badge">New</span>
              </a>
            </li>
            <li>
              <a>Settings</a>
            </li>
            <li>
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 hover:bg-gray-100 rounded"
              >
                Logout
              </button>
            </li>
          </ul>
        </div>
      </div>

      {/* Content area */}
      <main className="flex-grow p-4">
        <Outlet />
      </main>
    </div>
  );
}
