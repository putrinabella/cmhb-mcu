import DashboardLayout from "@/layout/DashboardLayout";
import PhoneLayout from "@/layout/PhoneLayout";

export default function DashboardPage() {
  return (
    <>
      <div className="hidden lg:block">
        <DashboardLayout>
          {/* Isi konten untuk desktop */}
          <h1 className="text-2xl font-bold">Dashboard Content Desktop</h1>
          <p>Welcome to the desktop dashboard layout.</p>
        </DashboardLayout>
      </div>

      <div className="block lg:hidden">
        <PhoneLayout>
          <h1 className="text-2xl font-bold">Dashboard Content Mobile</h1>
          <p>Welcome to the mobile phone layout.</p>
        </PhoneLayout>
      </div>
    </>
  );
}
