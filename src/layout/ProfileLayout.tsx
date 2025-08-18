import { useState, useEffect } from "react";
import ProfileDekstopPage from "@/pages/ProfileDekstopPage";
import ProfileMobilePage from "@/pages/ProfileMobilePage";
export default function ProfileLayout() {
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1024);

  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 1024);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return isDesktop ? <ProfileDekstopPage /> : <ProfileMobilePage />;
}
