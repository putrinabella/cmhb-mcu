import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar.js";
import { AppSidebar } from "@/components/AppSidebar.js";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <SidebarProvider>
            <AppSidebar />
            <main>
                <SidebarTrigger />
                {children}
            </main>
        </SidebarProvider>
    );
}
