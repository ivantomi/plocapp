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

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useDialog } from "@/hooks/useDialog";
import { Scanner } from "@prisma/client";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@radix-ui/react-select";
import { useEffect, useState } from "react";
import { ErrorAlertDialog } from "../navigation/ErrorDialog";

export function CreateClassroomComponent() {
  const [error, setError] = useState(false);
  const [showErrorDialog, setShowErrorDialog] = useState(false);
  const [newClassroom, setNewClassroom] = useState("");
  const [scannerMenu, setScannerMenu] = useState<Scanner[]>([]);
  const [roomNumber, setRoomNumber] = useState("");
  const [scanner, setScanner] = useState("");

  useEffect(() => {
    fetch("/api/scanners")
      .then((response) => response.json())
      .then((data) => setScannerMenu(data))
      .catch((error) => console.error("Error fetching scanners", error));
  }, []);

  const createClassroom = async () => {
    const response = await fetch("/api/classrooms/create-new", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        roomNumber,
        scanner,
      }),
    });

    const data = await response.json();
    console.log(data);
    setNewClassroom(data.classroom);
    if (!response.ok) {
      setError(data.error);
      setShowErrorDialog(true);
      return;
    }
  };

  const { isOpen, onClose } = useDialog();
  return (
    <Dialog onOpenChange={onClose} open={isOpen} modal defaultOpen={isOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogTitle>Add New Classroom</DialogTitle>

        <DialogDescription>
          Enter the information below to create a new classroom.
        </DialogDescription>
        <div className="flex flex-col pt-2">
          <div className="flex flex-col items-start gap-2">
            <Label htmlFor="name" className="text-right">
              Room Number
            </Label>
            <Input
              required
              id="roomNumber"
              placeholder="A101"
              className=""
              onChange={(e) => setRoomNumber(e.target.value)}
            />
          </div>

          <div className="flex flex-col items-start gap-2 mt-4">
            <Label htmlFor="scanner" className="text-right">
              Scanner
            </Label>
            <Select
              value={scanner}
              onValueChange={(value) => {
                setScanner(value);
              }}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Choose" />
              </SelectTrigger>
              <SelectContent>
                {scannerMenu.map((scanner) => (
                  <SelectItem value={scanner.id.toString()} key={scanner.id}>
                    {scanner.id}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <DropdownMenu>
              <DropdownMenuTrigger>Choose...</DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>ADMIN</DropdownMenuLabel>
                <DropdownMenuItem>REGULAR</DropdownMenuItem>
                <DropdownMenuItem>INSTRUCTOR</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <DialogFooter className="mt-8">
          <Button type="submit" className="w-full" onClick={createClassroom}>
            Create Classroom
          </Button>
        </DialogFooter>
        <ErrorAlertDialog
          error={error}
          open={showErrorDialog}
          onClose={() => setShowErrorDialog(false)}
        />
      </DialogContent>
    </Dialog>
  );
}
