import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { setSessionCookie } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const { name, email, password, phone } = await req.json();
    if (!name || !email || !password) return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    if (String(password).length < 6) return NextResponse.json({ error: "Password must be at least 6 characters" }, { status: 400 });

    const existing = await prisma.user.findUnique({ where: { email: String(email).toLowerCase() } });
    if (existing) return NextResponse.json({ error: "An account with that email already exists" }, { status: 409 });

    const user = await prisma.user.create({
      data: {
        email: String(email).toLowerCase(),
        passwordHash: await bcrypt.hash(String(password), 10),
        name: String(name),
        phone: phone ? String(phone) : null,
        role: "PRACTITIONER",
        practitioner: { create: { approvalStatus: "PENDING" } },
      },
    });

    setSessionCookie(user.id);
    return NextResponse.json({ redirect: "/practitioner/profile" });
  } catch (e: any) {
    return NextResponse.json({ error: e.message || "Signup failed" }, { status: 500 });
  }
}
