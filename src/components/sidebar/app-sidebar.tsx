"use client";

import {
  Home,
  Settings,
  Split,
  IndianRupee,
  UserRound,
  LogOut,
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
} from "@/components/ui/sidebar";
import Link from "next/link";

// Menu items.
const items = [
  { title: "Dashboard", url: "/dashboard", icon: Home },
  { title: "Transactions", url: "/transactions", icon: IndianRupee },
  { title: "Split", url: "/split", icon: Split },
  { title: "Settings", url: "#", icon: Settings },
];
// transaction, analytics, budget,
const items_bottom = [
  { title: "Profile", url: "/profile", icon: UserRound },
  { title: "Logout", url: "/logout", icon: LogOut },
];

export function AppSidebar() {
  return (
    <Sidebar collapsible="icon">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Expense Tracker</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuButton
                  key={item.title}
                  render={<Link href={item.url} />}
                  tooltip={item.title}
                  className="h-10"
                >
                  <item.icon className="size-4" />
                  <span>{item.title}</span>
                </SidebarMenuButton>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarGroupContent>
          <SidebarMenu>
            {items_bottom.map((item) => (
              <SidebarMenuButton
                key={item.title}
                render={<Link href={item.url} />}
                tooltip={item.title}
                className="h-10"
              >
                <item.icon className="size-4" />
                <span>{item.title}</span>
              </SidebarMenuButton>
            ))}
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarFooter>
    </Sidebar>
  );
}
