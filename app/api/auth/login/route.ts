import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

const secret = process.env.JWT_SECRET;

export const POST = async (req: NextRequest) => {
  if (!secret) {
    throw new Error("No JWT_SECRET found");
  }

  const prisma = new PrismaClient();

  const body = await req.json();
  const { email, password } = body;

  if (!email || !password) {
    return NextResponse.json(
      { error: "Missing email and/or password" },
      { status: 400 }
    );
  }

  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return NextResponse.json(
        { error: "Missing email and/or password" },
        { status: 400 }
      );
    }

    // const isPasswordValid = await bcrypt.compare(password, user.password);
    // if (!isPasswordValid) {
    //   return NextResponse.json(
    //     { error: "Missing email and/or password" },
    //     { status: 401 }
    //   );
    // }

    const token = jwt.sign({ userId: user.id, role: user.role }, secret, {
      expiresIn: "1h",
    });

    await prisma.session.create({
      data: {
        token,
        expiresAt: new Date(Date.now() + 1000 * 60 * 60),
        user: { connect: { id: user.id } },
      },
    });

    const response = NextResponse.json({
      message: "Login successful",
      user,
      token,
    });
    response.cookies.set("token", token, {
      httpOnly: true,
      maxAge: 60 * 60,
      path: "/",
    });

    return response;
  } catch (error) {
    NextResponse.json({ error: "Login failed", details: error });
  }
};
