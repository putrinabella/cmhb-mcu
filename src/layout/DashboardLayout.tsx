import type { ReactNode } from "react";

interface Props {
    children: ReactNode;
}

export default function DashboardLayout({ children }: Props) {
    return (
        <div className="min-h-screen bg-gray-100 flex flex-col">
            {/* Navbar desktop */}
            <div className="navbar bg-white shadow-sm hidden lg:flex">
                <div className="navbar-start">
                    <img
                        src="/images/logo.png"
                        alt="Ciputra Mitra Hospital"
                        className="h-[40px] btn btn-ghost"
                    />
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        <li>
                            <a>Registrasi Karyawan</a>
                        </li>
                        <li>
                            <a>Hasil MCU</a>
                        </li>
                        {/* <li>
                            <details>
                                <summary>Parent</summary>
                                <ul className="p-2">
                                    <li>
                                        <a>Submenu 1</a>
                                    </li>
                                    <li>
                                        <a>Submenu 2</a>
                                    </li>
                                </ul>
                            </details>
                        </li> */}
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
                            <a>Logout</a>
                        </li>
                    </ul>
                </div>
            </div>

            {/* Content area */}
            <main className="flex-grow p-4">{children}</main>
        </div>
    );
}
