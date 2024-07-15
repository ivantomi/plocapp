"use client";
import { User, VerificationCode } from "@prisma/client";
import { useState, useEffect } from "react";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DialogComponent } from "@/app/components/createUser/CreateUserModal";
import { useDialog } from "@/hooks/useDialog";

const AdminUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [newUser, setNewUser] = useState("");
  const { onOpen } = useDialog();

  useEffect(() => {
    fetch("/api/users")
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => console.error("Error fetching users", error));
  }, [newUser]);

  // const createNewUser = async () => {
  //   const response = await fetch("/api/users", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({}),
  //   });

  //   const data = await response.json();
  //   setNewUser(data.user);
  // };

  return (
    <div className="w-full mx-8 mt-4 flex-col flex">
      <div className="flex flex-row justify-between">
        <p className="h1">Manage Users</p>
        <Button onClick={onOpen}>Create New User</Button>
        <DialogComponent />
      </div>

      <Table className="">
        <TableHeader>
          <TableRow className="text-left">
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Username</TableHead>
            <TableHead>RFID</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.role}</TableCell>
              <TableCell>{user.username}</TableCell>
              <TableCell>{user.rfid}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default AdminUsers;
