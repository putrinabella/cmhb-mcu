import DashboardLayout from "@/layout/DashboardLayout";
import PhoneLayout from "@/layout/PhoneLayout";

export default function ResponsiveLayout() {
  return (
    <>
      <div className="hidden lg:block">
        <DashboardLayout />
      </div>
      <div className="block lg:hidden">
        <PhoneLayout />
      </div>
    </>
  );
}
