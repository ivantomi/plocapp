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

export default function RegisterForm() {
  return (
    <div className="w-full max-w-md">
      <form>
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
              />
            </div>
            <div className="space-y-2">
              <Label className="text-primary" htmlFor="username">
                Username
              </Label>
              <Input
                id="username"
                name="username"
                type="text"
                placeholder="Username"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-primary" htmlFor="email">
                Email
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="name@example.com"
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
              />
            </div>
            <div className="space-y-2">
              <Label className="text-primary" htmlFor="password">
                Repeat Password
              </Label>
              <Input
                id="repeatPassword"
                name="repeatPassword"
                type="password"
                placeholder="Repeat Password"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-primary">Verification Code</Label>
              <Input
                id="verificationCode"
                name="verificationCode"
                type="text"
                placeholder="Verification Code"
              />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col">
            <Button className="w-full">Register</Button>
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
