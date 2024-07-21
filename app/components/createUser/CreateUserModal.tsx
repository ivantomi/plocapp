import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useDialog } from "@/hooks/useDialog";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { ErrorAlertDialog } from "../navigation/ErrorDialog";
import { User } from "@prisma/client";

export function DialogComponent() {
  const [newUser, setNewUser] = useState<User>();
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rfid, setRfid] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [error, setError] = useState(false);
  const [showErrorDialog, setShowErrorDialog] = useState(false);

  const createUser = async () => {
    const response = await fetch("/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        username: username,
        email: email,
        password: password,
        role: role,
        rfid: rfid,
        verificationCode: verificationCode,
      }),
    });

    const data = await response.json();
    setNewUser(data);
    console.log(newUser);
    if (!response.ok) {
      setError(data.error);
      setShowErrorDialog(true);
      return;
    }

    const userInfo = `
    Name: ${data.name}
    Username: ${data.username}
    Email: ${data.email}
    Role: ${data.role}
    RFID: ${data.rfid}
  `;
    const blob = new Blob([userInfo], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${data.username}_info.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const { isOpen, onClose } = useDialog();
  return (
    <Dialog onOpenChange={onClose} open={isOpen} modal defaultOpen={isOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogTitle>Add New User</DialogTitle>

        <Tabs>
          <TabsList>
            <TabsTrigger value="manual">Manual</TabsTrigger>
            <TabsTrigger value="user-activated">User-Activated</TabsTrigger>
          </TabsList>
          <TabsContent value="manual">
            <DialogDescription>
              Enter the information below to create a new user.
            </DialogDescription>
            <div className="flex flex-col pt-2">
              <div className="flex flex-col items-start gap-2">
                <Label htmlFor="name" className="text-right">
                  Full Name
                </Label>
                <Input
                  required
                  id="name"
                  placeholder="John Smith"
                  className=""
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="flex flex-col items-start gap-2 mt-4">
                <Label htmlFor="role" className="text-right">
                  Role
                </Label>
                <Select
                  value={role}
                  onValueChange={(value) => {
                    setRole(value);
                  }}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Choose" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ADMIN">Admin</SelectItem>
                    <SelectItem value="REGULAR">Regular</SelectItem>
                    <SelectItem value="INSTRUCTOR">Instructor</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col items-start gap-2 mt-4">
                <Label htmlFor="name" className="text-right">
                  Username
                </Label>
                <Input
                  id="username"
                  placeholder="John_Smith23"
                  className=""
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="flex flex-col items-start gap-2 mt-4">
                <Label className="text-right">RFID</Label>
                <Input
                  id="rfid"
                  placeholder="0123"
                  className=""
                  onChange={(e) => setRfid(e.target.value)}
                />
              </div>
              <div className="flex flex-col items-start gap-2 mt-4">
                <Label className="text-right">Email</Label>
                <Input
                  id="email"
                  placeholder="example@example.com"
                  className=""
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="flex flex-col items-start gap-2 mt-4">
                <Label className="text-right">Password</Label>
                <Input
                  id="password"
                  placeholder="Abc123."
                  className=""
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="flex flex-col items-start gap-2 mt-4">
                <Label className="text-right">Verification Code</Label>
                <Input
                  id="verificationCode"
                  placeholder="0123"
                  className=""
                  onChange={(e) => setVerificationCode(e.target.value)}
                />
              </div>
            </div>
            <DialogFooter className="mt-8">
              <Button type="submit" className="w-full" onClick={createUser}>
                Create User
              </Button>
            </DialogFooter>
            <ErrorAlertDialog
              error={error}
              open={showErrorDialog}
              onClose={() => setShowErrorDialog(false)}
            />
          </TabsContent>
          <TabsContent value="user-activated">
            <DialogDescription>
              Enter the information below to create a new user. Send the
              generated code to the user so that they can activate their
              account.
            </DialogDescription>
            <div className="flex flex-col pt-2">
              <div className="flex flex-col items-start gap-2">
                <Label htmlFor="name" className="text-right">
                  Full Name
                </Label>
                <Input
                  required
                  id="name"
                  placeholder="John Smith"
                  className=""
                />
              </div>
              <div className="flex flex-col items-start gap-2 mt-4">
                <Label htmlFor="role" className="text-right">
                  Role
                </Label>
                <DropdownMenu>
                  <DropdownMenuTrigger>Choose...</DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuLabel>ADMIN</DropdownMenuLabel>
                    <DropdownMenuItem>REGULAR</DropdownMenuItem>
                    <DropdownMenuItem>INSTRUCTOR</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <div className="flex flex-col items-start gap-2 mt-4">
                <Label className="text-right">RFID</Label>
                <Input id="name" className="" />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" className="w-full">
                Save changes
              </Button>
            </DialogFooter>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
