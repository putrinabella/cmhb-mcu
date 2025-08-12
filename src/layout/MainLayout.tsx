import { Outlet } from "react-router-dom";

export default function MainLayout() {
  return (
    <div className="main-layout min-h-screen flex flex-col bg-amber-400">
      <Outlet />
    </div>
  );
}
