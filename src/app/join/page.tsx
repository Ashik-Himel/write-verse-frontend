"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useUserStore } from "@/lib/userStore";
import { serverDomain } from "@/lib/variables";
import Cookies from "js-cookie";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export default function JoinPage() {
  const router = useRouter();
  const setUser = useUserStore((state) => state.setUser);
  const [submitDisabled, setSubmitDisabled] = useState(false);

  const handleJoin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitDisabled(true);

    const form = e.currentTarget;
    const firstName = (
      form.elements.namedItem("firstName") as HTMLInputElement
    ).value.trim();
    const lastName = (
      form.elements.namedItem("lastName") as HTMLInputElement
    ).value.trim();
    const email = (
      form.elements.namedItem("email") as HTMLInputElement
    ).value.trim();
    const password = (form.elements.namedItem("password") as HTMLInputElement)
      .value;
    const reTypedPassword = (
      form.elements.namedItem("confirmPassword") as HTMLInputElement
    ).value;

    if (password.length < 8) {
      setSubmitDisabled(false);
      return toast("Password must be at least 8 characters!");
    } else if (!/[A-Z]/.test(password)) {
      setSubmitDisabled(false);
      return toast("At least one uppercase character required!");
    } else if (!/[0-9]/.test(password)) {
      setSubmitDisabled(false);
      return toast("At least one number required!");
    } else if (!/[^A-Za-z0-9]/.test(password)) {
      setSubmitDisabled(false);
      return toast("At least one special character required!");
    }
    if (password !== reTypedPassword) {
      setSubmitDisabled(false);
      return toast("Passwords do not match!");
    }

    const newUser = { firstName, lastName, email, password };
    const res = await fetch(`${serverDomain}/api/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUser),
    });
    const result = await res.json();

    if (result.ok) {
      Cookies.set("token", result?.token, {
        secure: true,
        sameSite: "Strict",
        expires: 7,
      });
      setUser({ available: true, role: result?.userRole });
      toast("Congratulations! You are now a user of WriteVerse!");
      if (result?.userRole === "admin") {
        router.replace("/admin/dashboard");
      } else if (result?.userRole === "user") {
        router.replace("/user/dashboard");
      }
    } else {
      if (result.message === "User already exists") {
        setSubmitDisabled(false);
        return toast("User already exists with this email address.");
      }
      setSubmitDisabled(false);
      toast("An error occurred.");
    }
  };

  return (
    <div className="flex h-full min-h-[calc(100vh-64.8px)] items-center justify-center bg-muted/40 p-4">
      <Card className="mx-auto w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-semibold tracking-tight">
            Create an account
          </CardTitle>
          <CardDescription>
            Enter your details below to create your account
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <form onSubmit={handleJoin} className="space-y-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input id="firstName" placeholder="John" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input id="lastName" placeholder="Doe" required />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="name@example.com"
                required
              />
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input id="confirmPassword" type="password" required />
              </div>
            </div>
            <Button type="submit" className="w-full" disabled={submitDisabled}>
              Create account
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col">
          <div className="text-center text-sm">
            Already have an account?{" "}
            <Link
              href="/login"
              className="underline underline-offset-4 hover:text-primary"
            >
              Sign in
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
