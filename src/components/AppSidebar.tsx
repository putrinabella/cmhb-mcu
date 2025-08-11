import {
    Calendar,
    ChevronDown,
    ChevronUp,
    Home,
    Inbox,
    Search,
    Settings,
    User2,
} from "lucide-react";

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
} from "@/components/ui/sidebar.js";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "./ui/dropdown-menu.js";
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "./ui/collapsible.js";

// Menu items.
const menuItems = [
    {
        title: "Home",
        url: "#",
        icon: Home,
    },
    {
        title: "Inbox",
        url: "#",
        icon: Inbox,
    },
    {
        title: "Calendar",
        url: "#",
        icon: Calendar,
    },
    {
        title: "Search",
        url: "#",
        icon: Search,
    },
    {
        title: "Settings",
        icon: Settings,
        children: [
            { title: "Profile Settings", url: "#profile" },
            { title: "Notification Settings", url: "#notifications" },
            { title: "Security", url: "#security" },
        ],
    },
];

export function AppSidebar() {
    return (
        <Sidebar>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Application</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {menuItems.map((item) => {
                                const hasChildren =
                                    item.children && item.children.length > 0;
                                if (hasChildren) {
                                    return (
                                        <Collapsible
                                            key={item.title}
                                            defaultOpen
                                            className="group/collapsible"
                                        >
                                            <SidebarMenuItem>
                                                <CollapsibleTrigger asChild>
                                                    <SidebarMenuButton>
                                                        <item.icon />
                                                        <span>
                                                            {item.title}
                                                        </span>
                                                        <ChevronUp className="ml-auto group-data-[state=closed]/collapsible:block hidden" />
                                                        <ChevronDown className="ml-auto group-data-[state=open]/collapsible:block hidden" />
                                                    </SidebarMenuButton>
                                                </CollapsibleTrigger>
                                                <CollapsibleContent>
                                                    <SidebarMenuSub>
                                                        {item.children.map(
                                                            (child) => (
                                                                <SidebarMenuSubItem
                                                                    key={
                                                                        child.title
                                                                    }
                                                                >
                                                                    <SidebarMenuSubButton
                                                                        asChild
                                                                    >
                                                                        <a
                                                                            href={
                                                                                child.url
                                                                            }
                                                                        >
                                                                            {
                                                                                child.title
                                                                            }
                                                                        </a>
                                                                    </SidebarMenuSubButton>
                                                                </SidebarMenuSubItem>
                                                            )
                                                        )}
                                                    </SidebarMenuSub>
                                                </CollapsibleContent>
                                            </SidebarMenuItem>
                                        </Collapsible>
                                    );
                                }

                                return (
                                    <SidebarMenuItem key={item.title}>
                                        <SidebarMenuButton asChild>
                                            <a href={item.url}>
                                                <item.icon />
                                                <span>{item.title}</span>
                                            </a>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                );
                            })}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <SidebarMenuButton>
                                    <User2 /> Username
                                    <ChevronUp className="ml-auto" />
                                </SidebarMenuButton>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent
                                side="top"
                                className="w-[--radix-popper-anchor-width]"
                            >
                                <DropdownMenuItem>
                                    <span>Account</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <span>Billing</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <span>Sign out</span>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
        </Sidebar>
    );
}
