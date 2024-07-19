import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req: NextRequest, res: NextResponse) {
  const body = await req.json();
  const { roomNumber, scanner } = body;

  try {
    const classroom = await prisma.classroom.create({
      data: {
        roomNumber,
        scanner,
      },
    });

    return NextResponse.json(classroom);
  } catch (error) {
    console.error("Error creating classroom:", error);
    return NextResponse.error();
  }
}
