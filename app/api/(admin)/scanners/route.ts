import { PrismaClient, Prisma } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const scanners = await prisma.scanner.findMany();
    console.log(scanners);
    return NextResponse.json(scanners);
  } catch (error) {
    return NextResponse.error();
  }
}
