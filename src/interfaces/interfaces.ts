import { Classroom, Scanner, Subject, Timeslot, User } from "@prisma/client";

export interface SubjectWithInstructor extends Subject {
  instructor: User;
}

export interface ClassroomWithSubjectsAndTimeslots extends Classroom {
  subjects: Subject[];
  timeslots: Timeslot[];
  scanner: Scanner;
}

export interface TokenPayload {
  userId: string;
}
