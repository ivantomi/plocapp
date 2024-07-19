import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  const prisma = new PrismaClient();
  const classrooms = await prisma.classroom.findMany({
    include: { scanner: true, subjects: true, timeslots: true },
  });

  return NextResponse.json(classrooms);
};
