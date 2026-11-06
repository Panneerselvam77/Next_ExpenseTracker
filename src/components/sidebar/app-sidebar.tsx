"use client";

import {
  Home,
  Settings,
  Split,
  UserRound,
  LogOut,
  CalendarDays,
  Sun,
  Moon,
  ChartPie,
  FileChartColumn,
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
  SidebarTrigger,
} from "@/components/ui/sidebar";
import Link from "next/link";
import app_logo from "../../../public/app_logo.png";
import Image from "next/image";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

// Menu items.
const items = [
  { title: "Dashboard", url: "/dashboard", icon: Home },
  { title: "Transactions", url: "/transactions", icon: CalendarDays },
  { title: "Split", url: "/split", icon: Split },
  { title: "Budget", url: "#", icon: ChartPie },
  { title: "Report", url: "#", icon: FileChartColumn },
  { title: "Settings", url: "#", icon: Settings },
];
// transaction, analytics, budget,
const items_bottom = [
  { title: "Profile", url: "/profile", icon: UserRound },
  { title: "Logout", url: "/logout", icon: LogOut },
];

export function AppSidebar() {
  const { setTheme, resolvedTheme, theme } = useTheme();
  const [defaultTheme, setDefaultTheme] = useState("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = (resolvedTheme || theme) === "dark";
  const toggleTheme = () => {
    setTheme(isDark ? "light" : "dark");
  };
  return (
    <Sidebar collapsible="icon">
      <SidebarContent>
        <SidebarGroup>
          <div className="flex items-center justify-between px-5 py-5 group-data-[collapsible=icon]:justify-center">
            <SidebarGroupLabel className="group-data-[collapsible=icon]:hidden">
              {/* Expense Tracker */}
              <Image src={app_logo} alt="Company Logo" className="h-20 w-20" />
            </SidebarGroupLabel>
            <SidebarTrigger className="h-7 w-7" />
          </div>
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
            <SidebarMenuButton
              onClick={toggleTheme}
              tooltip="Toggle Theme"
              className="h-10 cursor-pointer"
            >
              {mounted ? (
                isDark ? (
                  <Moon className="size-4 text-primary" />
                ) : (
                  <Sun className="size-4 text-primary" />
                )
              ) : (
                <Sun className="size-4" />
              )}
              <span>{mounted && isDark ? "Dark Mode" : "Light Mode"}</span>{" "}
            </SidebarMenuButton>
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
