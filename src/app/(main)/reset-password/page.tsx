"use client";

import type React from "react";

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
import { serverDomain } from "@/lib/variables";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export default function ResetPasswordPage() {
  const router = useRouter();
  const token = useSearchParams().get("token");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleResetPassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const form = e.currentTarget;
    const newPassword = (
      form.elements.namedItem("password") as HTMLInputElement
    ).value;
    const reTypedPassword = (
      form.elements.namedItem("confirmPassword") as HTMLInputElement
    ).value;

    if (newPassword.length < 8) {
      setIsLoading(false);
      return setError("Password must be at least 8 characters!");
    } else if (!/[A-Z]/.test(newPassword)) {
      setIsLoading(false);
      return setError("At least one uppercase character required!");
    } else if (!/[0-9]/.test(newPassword)) {
      setIsLoading(false);
      return setError("At least one number required!");
    } else if (!/[^A-Za-z0-9]/.test(newPassword)) {
      setIsLoading(false);
      return setError("At least one special character required!");
    }
    if (newPassword !== reTypedPassword) {
      setIsLoading(false);
      return setError("Passwords do not match!");
    }

    const res = await fetch(
      `${serverDomain}/api/auth/reset-password?token=${token}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ newPassword, reTypedPassword }),
      }
    );
    const result = await res.json();

    if (result.ok) {
      setIsLoading(false);
      toast("Password reset successful", {
        description:
          "Your password has been reset successfully. You can now log in with your new password.",
      });

      setTimeout(() => {
        router.push("/login");
      }, 1500);
    } else {
      setIsLoading(false);
      toast(result?.message);
    }
  };

  return (
    <div className="flex h-full min-h-[calc(100vh-64.8px)] items-center justify-center bg-muted/40 p-4">
      <Card className="mx-auto w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-semibold tracking-tight">
            Reset your password
          </CardTitle>
          <CardDescription>Enter your new password below</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <form onSubmit={handleResetPassword} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="password">New Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <p className="text-xs text-muted-foreground">
                Password must be at least 8 characters long
              </p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm New Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
            {error && <p className="text-sm text-destructive">{error}</p>}
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Resetting password..." : "Reset password"}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col">
          <div className="text-center text-sm">
            Remember your password?{" "}
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
