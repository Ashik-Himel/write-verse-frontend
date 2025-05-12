"use client";

import { serverDomain } from "@/lib/variables";
import Cookies from "js-cookie";
import { useEffect } from "react";
import { useUserStore } from "../lib/userStore";

export default function FetchUserState() {
  const token = Cookies.get("token");
  const setUser = useUserStore((state) => state.setUser);
  const setUserLoaded = useUserStore((state) => state.setUserLoaded);

  useEffect(() => {
    if (token) {
      fetch(`${serverDomain}/api/auth/user`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((result) => {
          if (
            result?.message === "User not found" ||
            result?.message === "Invalid token"
          )
            Cookies.remove("token");
          if (result?.ok) {
            setUser({ available: true, role: result?.user?.role });
          } else setUserLoaded(true);
        });
    } else setUserLoaded(true);
  }, [token, setUser, setUserLoaded]);

  return null;
}
