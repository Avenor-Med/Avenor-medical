import { NextResponse } from "next/server";
import { requireUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  const user = await requireUser(["PRACTITIONER"]);
  if (!user.practitioner) return NextResponse.json({ error: "Profile not found" }, { status: 400 });
  const data = await req.json();
  await prisma.practitioner.update({
    where: { id: user.practitioner.id },
    data: {
      profession:          data.profession || null,
      specialty:           data.specialty || null,
      yearsExperience:     data.yearsExperience ?? null,
      licenseNumber:       data.licenseNumber || null,
      licenseState:        data.licenseState || null,
      city:                data.city || null,
      state:               data.state || null,
      bio:                 data.bio || null,
      rateExpectationUsd:  data.rateExpectationUsd ?? null,
      availableHoursPerWk: data.availableHoursPerWk ?? null,
      willingToTravel:     !!data.willingToTravel,
      aiSummary:           data.aiSummary || null,
    },
  });
  return NextResponse.json({ ok: true });
}
