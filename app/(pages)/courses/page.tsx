"use client";

import React, { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { DialogComponent } from "@/app/components/createUser/CreateUserModal";
import { useDialog } from "@/hooks/useDialog";
import CourseCard from "@/app/components/courses/CourseCard";
import { SubjectWithInstructor } from "@/src/interfaces/interfaces";

const page = () => {
  const { onOpen } = useDialog();

  const [courses, setCourses] = useState<SubjectWithInstructor[]>([]);
  const [newCourse, setNewCourse] = useState("");

  useEffect(() => {
    fetch("/api/courses")
      .then((response) => response.json())
      .then((data) => setCourses(data))
      .catch((error) => console.error("Error fetching courses", error));
  }, [newCourse]);

  return (
    <div className="w-full ml-8 mt-4 flex-col flex">
      <div className="flex flex-row justify-between">
        <p className="h1">Manage Courses</p>
        <Button onClick={onOpen}>Create New Course</Button>
        <DialogComponent />
      </div>
      <div className="flex flex-row flex-wrap gap-2">
        {courses.map((course) => (
          <CourseCard key={course.id} {...course} />
        ))}
      </div>
    </div>
  );
};

export default page;
