"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function LoginPage() {
  const [isSignup, setIsSignup] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const email = formData.get("email");
    const password = formData.get("password");

    // SIGNUP FLOW
    if (isSignup) {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        alert("User already exists or signup failed");
        return;
      }

      // After signup → auto login
    alert("Account created successfully. Please log in.");
    setIsSignup(false);


      return;
    }

    // LOGIN FLOW
    await signIn("credentials", {
      email,
      password,
      callbackUrl: "/logs",
    });
  }

  return (
    <div className="flex min-h-screen items-center justify-center">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>
            {isSignup ? "Create your account" : "Login to LogSnap"}
          </CardTitle>
          <CardDescription>
            {isSignup
              ? "Create an account to start using LogSnap"
              : "Enter your credentials to continue"}
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label>Email</Label>
              <Input name="email" type="email" required />
            </div>

            <div className="grid gap-2">
              <Label>Password</Label>
              <Input name="password" type="password" required />
            </div>

            <Button type="submit" className="w-full">
              {isSignup ? "Create Account" : "Login"}
            </Button>
          </form>

          {/* TOGGLE LINK */}
          <p className="mt-4 text-center text-sm text-gray-600">
            {isSignup ? (
              <>
                Already have an account?{" "}
                <button
                  className="font-medium text-black underline"
                  onClick={() => setIsSignup(false)}
                >
                  Login
                </button>
              </>
            ) : (
              <>
                Don’t have an account?{" "}
                <button
                  className="font-medium text-black underline"
                  onClick={() => setIsSignup(true)}
                >
                  Sign up
                </button>
              </>
            )}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
