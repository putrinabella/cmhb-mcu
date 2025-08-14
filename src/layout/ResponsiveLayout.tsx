// import DashboardLayout from "@/layout/DashboardLayout";
// import PhoneLayout from "@/layout/PhoneLayout";
// export default function ResponsiveLayout() {
//   return (
//     <>
//       <div className="hidden lg:block">
//         <DashboardLayout />
//       </div>
//       <div className="block lg:hidden">
//         <PhoneLayout />
//       </div>
//     </>
//   );
// }
import { useState, useEffect } from "react";
import DashboardLayout from "@/layout/DashboardLayout";
import PhoneLayout from "@/layout/PhoneLayout";

export default function ResponsiveLayout() {
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1024);

  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 1024);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return isDesktop ? <DashboardLayout /> : <PhoneLayout />;
}
