import { NextResponse } from "next/server";
import { requireUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  await requireUser(["CS", "ADMIN"]);
  const data = await req.json();
  if (!data.name || !data.city || !data.state) return NextResponse.json({ error: "Name, city, state are required" }, { status: 400 });
  const f = await prisma.facility.create({
    data: {
      name: data.name, type: data.type || null, city: data.city, state: data.state,
      contactName: data.contactName || null, contactEmail: data.contactEmail || null,
      contactPhone: data.contactPhone || null, notes: data.notes || null,
    },
  });
  return NextResponse.json({ facility: f });
}
