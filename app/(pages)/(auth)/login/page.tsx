"use client";

import Link from "next/link";

import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  CardFooter,
  Card,
} from "@/components/ui/card";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(email, password);
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (response.ok) {
      // document.cookie = `token=${data.token}; path=/`;
      // router.push("/dashboard");
      // const { token } = data;
      // localStorage.setItem("token", token);
      router.push("/dashboard");
    } else {
      alert("Login unsuccessful");
    }
  };

  return (
    <div className="w-full max-w-md">
      <form onSubmit={handleLogin}>
        <Card className="">
          <CardHeader className="flex flex-col items-center justify-center gap-4">
            <CardTitle className="text-3xl font-bold">Login</CardTitle>
            <CardDescription className="text-center">
              Enter your information below to access Roby
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label className="text-primary" htmlFor="email">
                Email
              </Label>
              <Input
                id="email"
                name="email"
                type="text"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label className="text-primary" htmlFor="password">
                Password
              </Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col">
            <Button type="submit" className="w-full">
              Login
            </Button>
            <div className="mt-4 text-center text-sm flex flex-col text-white">
              Don't have an account?
              <Link className="underline ml-2 text-primary" href="register">
                Go to Register
              </Link>
            </div>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
}
