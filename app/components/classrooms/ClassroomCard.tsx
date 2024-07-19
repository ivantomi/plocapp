import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ClassroomWithSubjectsAndTimeslots } from "@/src/interfaces/interfaces";
import Image from "next/image";

import React from "react";

export const ClassroomCard: React.FC<ClassroomWithSubjectsAndTimeslots> = ({
  id,
  roomNumber,
  scanner,
  timeslots,
  subjects,
}: ClassroomWithSubjectsAndTimeslots) => {
  return (
    <div>
      <Card className="lg:w-[44vw]">
        <CardHeader></CardHeader>
        <CardContent>
          <div className="flex flex-row justify-between">
            <div className="flex flex-col">
              <CardTitle>Classroom number {roomNumber}</CardTitle>
              <CardDescription>Scanner number {scanner.id}</CardDescription>
              {subjects.map((subject) => (
                <CardDescription key={subject.id}>
                  Subject: {subject.name}
                  {timeslots.map((timeslot) => {
                    if (timeslot.subjectId === subject.id) {
                      return (
                        <div key={timeslot.id}>
                          <p>Start: {timeslot.startTime.toString()}</p>
                          <p>End: {timeslot.endTime.toString()}</p>
                        </div>
                      );
                    }
                  })}
                </CardDescription>
              ))}
            </div>
            <div className="flex flex-col"></div>
          </div>
        </CardContent>
        <CardFooter></CardFooter>
      </Card>
    </div>
  );
};

export default ClassroomCard;
