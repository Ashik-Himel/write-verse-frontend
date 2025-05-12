"use client";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useUserStore } from "@/lib/userStore";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { ReactNode } from "react";
import { Button } from "./ui/button";

export default function LogoutToggle({
  triggerElement,
}: {
  triggerElement: ReactNode;
}) {
  const router = useRouter();
  const setUser = useUserStore((state) => state.setUser);

  const handleLogout = async () => {
    Cookies.remove("token");
    setUser(null);
    router.push("/");
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{triggerElement}</DialogTrigger>
      <DialogContent className="w-[calc(100%-48px)] sm:max-w-[425px] rounded-lg">
        <DialogHeader className="text-left">
          <DialogTitle>Logout?</DialogTitle>
        </DialogHeader>
        <p>Are you sure to logout?</p>
        <DialogFooter className="flex-row-reverse">
          <DialogClose asChild>
            <Button onClick={handleLogout}>Logout</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
