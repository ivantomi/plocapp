import { PrismaClient, Prisma } from "@prisma/client";
import { randomInt } from "crypto";
import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const users = await prisma.user.findMany();
    return NextResponse.json(users);
  } catch (error) {
    return NextResponse.error();
  }
}

export async function POST(res: NextResponse) {
  const code = randomInt(1000, 9999).toString();
  const expiryDate = new Date();
  expiryDate.setDate(expiryDate.getDate() + 3);

  try {
    await prisma.verificationCode.create({
      data: {
        code,
        expiresAt: expiryDate,
      },
    });

    return NextResponse.json({ code });
  } catch (error) {
    return NextResponse.error();
  }
}
