import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const prisma = new PrismaClient();
  const body = await req.json();
  const { name, username, email, password, role, rfid, verificationCode } =
    body;

  console.log(body);

  if (
    name === "" ||
    username === "" ||
    email === "" ||
    password === "" ||
    role === "" ||
    rfid === "" ||
    verificationCode === ""
  ) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  // const hashedPassword = bcrypt.hash(password, 10);

  try {
    const checkVerificationCode =
      await prisma.verificationCode.findFirstOrThrow({
        where: {
          code: verificationCode,
        },
      });
    console.log(checkVerificationCode.code, verificationCode);
    if (checkVerificationCode?.code !== verificationCode) {
      alert("Invalid verification code");
      return NextResponse.json({ error: "Invalid verification code" });
    } else {
      const user = await prisma.user.create({
        data: {
          name,
          username,
          email,
          password,
          role,
          rfid,
        },
      });

      if (!user) {
        return NextResponse.json({ error: "Error creating user" });
      }

      await prisma.verificationCode.update({
        where: {
          code: verificationCode,
        },
        data: {
          used: true,
        },
      });
      return NextResponse.json(user);
    }
  } catch (error) {
    return NextResponse.json({ error: "Error Creating User" }, { status: 400 });
  }
};
