"use client";

import React, { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { DialogComponent } from "@/app/components/createUser/CreateUserModal";
import { useDialog } from "@/hooks/useDialog";
import CourseCard from "@/app/components/courses/CourseCard";
import { ClassroomWithSubjectsAndTimeslots } from "@/src/interfaces/interfaces";
import ClassroomCard from "@/app/components/classrooms/ClassroomCard";
import { CreateClassroomComponent } from "@/app/components/classrooms/CreateNewClassroom";

const page = () => {
  const { onOpen } = useDialog();

  const [classrooms, setClassrooms] = useState<
    ClassroomWithSubjectsAndTimeslots[]
  >([]);
  const [newClassroom, setNewClassroom] = useState("");

  useEffect(() => {
    fetch("/api/classrooms")
      .then((response) => response.json())
      .then((data) => setClassrooms(data))
      .catch((error) => console.error("Error fetching classrooms", error));
  }, [newClassroom]);

  return (
    <div className="w-full ml-8 mt-4 flex-col flex">
      <div className="flex flex-row justify-between">
        <p className="h1">Manage Classrooms</p>
        <Button onClick={onOpen}>Create New Classroom</Button>
        <CreateClassroomComponent />
      </div>
      <div className="flex flex-row flex-wrap gap-2">
        {classrooms.map((classroom) => (
          <ClassroomCard key={classroom.id} {...classroom} />
        ))}
      </div>
    </div>
  );
};

export default page;
