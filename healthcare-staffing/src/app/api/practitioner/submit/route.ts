import { NextResponse } from "next/server";
import { requireUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST() {
  const user = await requireUser(["PRACTITIONER"]);
  if (!user.practitioner) return NextResponse.json({ error: "Profile not found" }, { status: 400 });
  // Submitting just stamps the timestamp; status remains PENDING until a recruiter approves.
  await prisma.practitioner.update({
    where: { id: user.practitioner.id },
    data: { updatedAt: new Date() },
  });
  return NextResponse.json({ ok: true });
}
