"use client";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useUserStore } from "@/lib/userStore";
import { cn } from "@/lib/utils";
import { Edit, Menu } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const mainNavItems = [
  { title: "Home", href: "/" },
  { title: "Announcements", href: "/announcements" },
  { title: "Posts", href: "/posts" },
];

export default function Header() {
  const pathname = usePathname();
  const user = useUserStore((state) => state.user);
  const userLoaded = useUserStore((state) => state.userLoaded);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="flex w-full items-center justify-between">
          <div className="flex justify-start items-center gap-2">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="py-4">
                <SheetTitle className="sr-only">Menu</SheetTitle>
                <div className="px-7">
                  <Link
                    href="/"
                    className="flex items-center gap-2"
                    onClick={() => {
                      const sheet = document.querySelector(
                        '[data-state="open"]'
                      );
                      if (sheet) {
                        const closeButton = sheet.querySelector(
                          'button[aria-label="Close"]'
                        );
                        if (closeButton instanceof HTMLElement) {
                          closeButton.click();
                        }
                      }
                    }}
                  >
                    <Edit />
                    <span className="text-xl font-bold">WriteVerse</span>
                  </Link>
                </div>
                <nav className="mt-8 flex flex-col gap-4 px-7">
                  {mainNavItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={cn(
                        "text-muted-foreground hover:text-foreground",
                        pathname === item.href && "text-foreground font-medium"
                      )}
                      onClick={() => {
                        const sheet = document.querySelector(
                          '[data-state="open"]'
                        );
                        if (sheet) {
                          const closeButton = sheet.querySelector(
                            'button[aria-label="Close"]'
                          );
                          if (closeButton instanceof HTMLElement) {
                            closeButton.click();
                          }
                        }
                      }}
                    >
                      {item.title}
                    </Link>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>

            <div className="flex md:w-1/4">
              <Link href="/" className="flex items-center space-x-2">
                <Edit />
                <span className="font-bold sm:inline-block">WriteVerse</span>
              </Link>
            </div>
          </div>

          <nav className="hidden md:flex md:w-2/4 justify-center gap-6">
            {mainNavItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-foreground/80",
                  pathname === item.href
                    ? "text-foreground"
                    : "text-foreground/60"
                )}
              >
                {item.title}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            {userLoaded ? (
              user ? (
                <Button size="sm" asChild>
                  <Link
                    href={
                      user?.role === "admin"
                        ? "/admin/dashboard"
                        : "/user/dashboard"
                    }
                  >
                    Dashboard
                  </Link>
                </Button>
              ) : (
                <>
                  <Button variant="outline" size="sm" asChild>
                    <Link href="/login">Sign in</Link>
                  </Button>
                  <Button size="sm" asChild>
                    <Link href="/join">Join</Link>
                  </Button>
                </>
              )
            ) : (
              <Button variant="outline" size="sm">
                Loading
              </Button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
