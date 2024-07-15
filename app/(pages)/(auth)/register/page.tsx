"use client";

import Link from "next/link";
import bcrypt from "bcryptjs";

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

import { PrismaClient, Prisma } from "@prisma/client";
import { useState } from "react";

export default function RegisterForm() {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [verificationCode, setVerificationCode] = useState("");

  const registerUser = async (event: React.FormEvent) => {
    event.preventDefault();

    if (password !== repeatPassword) {
      alert("Passwords do not match");
      return;
    }

    // create a way to assign a specific rfid to a user
    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          username,
          email,
          password,
          role: "ADMIN",
          rfid: "0123",
          verificationCode,
        }),
      });
      const data = await response.json();
      if (!response.ok) {
        alert(data.error);
        return;
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full max-w-md">
      <form onSubmit={registerUser}>
        <Card className="">
          <CardHeader className="flex flex-col items-center justify-center gap-4">
            <CardTitle className="text-3xl font-bold">Sign Up</CardTitle>
            <CardDescription className="text-center">
              Enter your information and verification code to create an account
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label className="text-primary" htmlFor="name">
                Full Name
              </Label>
              <Input
                id="name"
                name="name"
                type="text"
                placeholder="John Smith"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label className="text-primary" htmlFor="username">
                Username
              </Label>
              <Input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label className="text-primary" htmlFor="email">
                Email
              </Label>
              <Input
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label className="text-primary" htmlFor="password">
                Password
              </Label>
              <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label className="text-primary" htmlFor="repeatPassword">
                Repeat Password
              </Label>
              <Input
                type="password"
                placeholder="Repeat Password"
                value={repeatPassword}
                onChange={(e) => setRepeatPassword(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label className="text-primary">Verification Code</Label>
              <Input
                type="text"
                placeholder="Verification Code"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
              />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col">
            <Button className="w-full" type="submit">
              Register
            </Button>
            <div className="mt-4 text-center text-sm flex flex-col text-white">
              Already have an account?
              <Link className="underline ml-2 text-primary" href="login">
                Go to Login
              </Link>
            </div>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
}
