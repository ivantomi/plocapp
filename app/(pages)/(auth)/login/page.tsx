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

export default function LoginForm() {
  return (
    <div className="w-full max-w-md">
      <form>
        <Card className="">
          <CardHeader className="flex flex-col items-center justify-center gap-4">
            <CardTitle className="text-3xl font-bold">Login</CardTitle>
            <CardDescription className="text-center">
              Enter your information below to access Roby
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
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
          </CardContent>
          <CardFooter className="flex flex-col">
            <Button className="w-full">Login</Button>
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
