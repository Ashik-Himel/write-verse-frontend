import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { serverDomain } from "./lib/variables";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("token")?.value || "";
  const loginRoutes = ["/login", "/join", "/reset-password"];

  let result = null;
  if (token) {
    const res = await fetch(`${serverDomain}/api/auth/user`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    result = await res.json();

    if (
      result?.message === "User not found" ||
      result?.message === "Invalid token"
    ) {
      const res = NextResponse.next();
      res.headers.append(
        "Set-Cookie",
        "token=; Path=/; Max-Age=0; Secure; SameSite=Strict"
      );
    }
  }

  if (!result?.ok) {
    if (
      pathname.startsWith("/user/dashboard/") ||
      pathname.startsWith("/admin/dashboard/")
    ) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  } else {
    if (loginRoutes.includes(pathname)) {
      if (result?.user?.role === "user") {
        return NextResponse.redirect(new URL("/user/dashboard", request.url));
      } else if (result?.user?.role === "admin") {
        return NextResponse.redirect(new URL("/admin/dashboard", request.url));
      }
    }

    if (
      result?.user?.role === "user" &&
      pathname.startsWith("/admin/dashboard/")
    ) {
      return NextResponse.redirect(new URL("/user/dashboard", request.url));
    }
    if (
      result?.user?.role === "admin" &&
      pathname.startsWith("/user/dashboard/")
    ) {
      return NextResponse.redirect(new URL("/admin/dashboard", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/login",
    "/join",
    "/reset-password",
    "/user/dashboard/:path*",
    "/admin/dashboard/:path*",
  ],
};
