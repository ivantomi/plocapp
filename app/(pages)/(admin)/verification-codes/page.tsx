"use client";
import { VerificationCode } from "@prisma/client";
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

const AdminVerificationCodes = () => {
  const [codes, setCodes] = useState<VerificationCode[]>([]);
  const [newCode, setNewCode] = useState("");

  useEffect(() => {
    fetch("/api/verification-codes")
      .then((response) => response.json())
      .then((data) => setCodes(data))
      .catch((error) => console.error("Error fetching codes", error));
  }, [newCode]);

  const generateCode = async () => {
    const response = await fetch("/api/verification-codes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({}),
    });

    const data = await response.json();
    setNewCode(data.code);
  };

  return (
    <div className="w-full m-8 flex-col flex">
      <div className="flex flex-row justify-between">
        <p className="h1">Manage Verification Codes</p>
        <Button onClick={generateCode}>Generate New Code</Button>
      </div>
      <Table className="">
        <TableHeader>
          <TableRow className="text-left">
            <TableHead>Code</TableHead>
            <TableHead>Expires At</TableHead>
            <TableHead>Used</TableHead>
            <TableHead>Created At</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {codes.map((code) => (
            <TableRow key={code.id}>
              <TableCell>{code.code}</TableCell>
              <TableCell>{code.expiresAt.toString()}</TableCell>
              <TableCell>{code.used.toString()}</TableCell>
              <TableCell>{code.createdAt.toString()}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default AdminVerificationCodes;
