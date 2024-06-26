import { prisma } from "@/app/client";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";
import { cookies } from "next/headers"

const UserSchema = z.object({
  email: z.string().email(),
  name: z.string().optional(),
  password: z.string().min(8),
})

type User = z.infer<typeof UserSchema>

//signup
export async function POST(req: NextRequest) {
  const body = await req.json();
  const cookiesStore = cookies();
  //zod validation
  const { success, data } = UserSchema.safeParse(body) as { success: boolean, data: User };
  if (!success) {
    return NextResponse.json({ error: 'Invalid input' }, { status: 400 })
  }

  //password hashing
  const password = bcrypt.hashSync(data.password, 10);

  const user = await prisma.user.create({
    data: {
      name: data.name,
      email: data.email,
      password: password
    }
  })
  //jwt Token
  const JWT_SECRET = process.env.JWT_SECRET;
  if (!JWT_SECRET) {
    return NextResponse.json({ error: "jWT_SECRET is undefined" });
  }
  const jwtToken = "Bearer " + jwt.sign({ userId: user.id }, JWT_SECRET);

  cookiesStore.set("Authorization", jwtToken);
  return NextResponse.json({ response: "account successfully created" });
}
