import { NextResponse } from "next/server";
import { requireUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  const user = await requireUser(["CS", "ADMIN"]);
  const data = await req.json();
  if (!data.facilityId || !data.title || !data.city || !data.state || !data.rateUsd) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }
  const job = await prisma.job.create({
    data: {
      facilityId: data.facilityId, createdById: user.id,
      title: data.title, profession: data.profession || "RN",
      specialty: data.specialty || null, city: data.city, state: data.state,
      shiftType: data.shiftType || null, hoursPerWeek: data.hoursPerWeek || null,
      durationWeeks: data.durationWeeks || null,
      rateUsd: Number(data.rateUsd),
      description: data.description || "",
      requirements: data.requirements || null,
      status: "OPEN",
    },
  });
  return NextResponse.json({ job });
}
