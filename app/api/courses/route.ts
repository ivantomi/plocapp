import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  const prisma = new PrismaClient();
  const subjects = await prisma.subject.findMany({
    include: { instructor: true },
  });

  return NextResponse.json(subjects);

  return subjects;
};
