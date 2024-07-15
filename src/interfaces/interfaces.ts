import { Subject, User } from "@prisma/client";

export interface SubjectWithInstructor extends Subject {
  instructor: User;
}
