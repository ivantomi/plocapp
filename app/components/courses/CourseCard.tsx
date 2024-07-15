import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SubjectWithInstructor } from "@/src/interfaces/interfaces";
import Image from "next/image";

import React from "react";

export const CourseCard: React.FC<SubjectWithInstructor> = ({
  id,
  name,
  description,
  instructor,
}: SubjectWithInstructor) => {
  return (
    <div>
      <Card className="lg:w-[44vw]">
        <CardHeader></CardHeader>
        <CardContent>
          <div className="flex flex-row justify-between">
            <div className="flex flex-col">
              <CardTitle>{name}</CardTitle>
              <CardDescription>{description}</CardDescription>
            </div>
            <div className="flex flex-col">
              <Image
                src={
                  "https://images.unsplash.com/photo-1604355714851-c1d5990e1696?q=80&w=1936&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                }
                width={400}
                height={200}
                alt="Alternative"
              />
            </div>
          </div>
        </CardContent>
        <CardFooter>{instructor.name}</CardFooter>
      </Card>
    </div>
  );
};

export default CourseCard;
