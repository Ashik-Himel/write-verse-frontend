import FetchUserState from "@/components/fetchUserState";
import { Toaster } from "@/components/ui/sonner";
import { Metadata } from "next";
import { Inter } from "next/font/google";
import type { ReactNode } from "react";
import "../globals.css";
import SidebarComp from "./sidebarComp";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Dashboard - WriteVerse",
  description:
    "A place to share ideas, discuss topics, and connect with others",
};

export default function AdminDashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SidebarComp>{children}</SidebarComp>
        <FetchUserState />
        <Toaster />
      </body>
    </html>
  );
}
