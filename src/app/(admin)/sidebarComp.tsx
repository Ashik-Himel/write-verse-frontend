"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import {
  Bell,
  Edit,
  FileText,
  Flag,
  Home,
  LogOut,
  MessageSquare,
  PenSquare,
  User,
  Users,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

export default function SidebarComp({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  const navItems = [
    {
      title: "Dashboard",
      href: "/admin/dashboard",
      icon: Home,
    },
    {
      title: "Users",
      href: "/admin/users",
      icon: Users,
    },
    {
      title: "Announcements",
      href: "/admin/announcements",
      icon: Bell,
    },
    {
      title: "Publish Announcement",
      href: "/admin/publish-announcement",
      icon: PenSquare,
    },
    {
      title: "Posts",
      href: "/admin/posts",
      icon: FileText,
    },
    {
      title: "Comments",
      href: "/admin/comments",
      icon: MessageSquare,
    },
    {
      title: "Reports",
      href: "/admin/reports",
      icon: Flag,
    },
    {
      title: "Profile",
      href: "/admin/profile",
      icon: User,
    },
  ];

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <Sidebar>
          <SidebarHeader>
            <div className="flex h-14 items-center px-4">
              <Link
                href="/admin/dashboard"
                className="flex items-center gap-2 font-semibold"
              >
                <Edit />
                <span className="text-xl font-bold">WriteVerse</span>
              </Link>
            </div>
          </SidebarHeader>
          <SidebarContent className="px-4">
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname === item.href}
                    tooltip={item.title}
                  >
                    <Link href={item.href}>
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarContent>
          <SidebarFooter>
            <div className="p-4">
              <Link
                href="/"
                className="flex w-full items-center justify-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
              >
                <LogOut className="h-4 w-4" />
                Back to Site
              </Link>
            </div>
          </SidebarFooter>
        </Sidebar>
        <div className="flex-1 overflow-auto">
          <div className="flex h-14 items-center border-b px-4">
            <SidebarTrigger />
            <div className="ml-4 text-lg font-semibold">Admin Dashboard</div>
          </div>
          <div className="p-6">{children}</div>
        </div>
      </div>
    </SidebarProvider>
  );
}
