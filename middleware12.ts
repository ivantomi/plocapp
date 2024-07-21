import { NextRequest, NextResponse } from "next/server";
import { JwtPayload, verify } from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
import { TokenPayload } from "src/interfaces/interfaces";

const prisma = new PrismaClient();

export async function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();
  url.pathname = "/login";
  const tokenCookie = req.cookies.get("token");
  console.log(tokenCookie);
  if (!tokenCookie) return NextResponse.rewrite(url);

  const token = tokenCookie.value;
  const jwtSecret = process.env.JWT_SECRET;

  if (!jwtSecret) {
    return NextResponse.json({ Error });
  }

  try {
    const decoded = verify(token, jwtSecret) as TokenPayload & JwtPayload;
    const session = await prisma.session.findUnique({ where: { token } });

    if (!session || session.expiresAt < new Date()) {
      return NextResponse.rewrite(url);
    }

    req.nextauth = { userId: decoded.userId };
    return NextResponse.next();
  } catch (error) {
    return NextResponse.rewrite(url);
  }
}
