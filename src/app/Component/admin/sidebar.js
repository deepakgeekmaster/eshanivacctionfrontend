import { Calendar, Home, Inbox, Search, Settings } from "lucide-react";
import Link from 'next/link'; // Import Link component

import {
  Sidebar as SidebarUI,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from "@/components/ui/sidebar";

// Menu items.
const items = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: Home,
  },
  {
    title: "Property Listing",
    url: "/admin/property",
    icon: Inbox,
  },

];

const AppSidebar = () => {
  return (
    <SidebarProvider>
      <SidebarUI>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Airbnb</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <Link href={item.url}> 
                          <item.icon />
                          <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </SidebarUI>
    </SidebarProvider>
  );
};

export default AppSidebar;
