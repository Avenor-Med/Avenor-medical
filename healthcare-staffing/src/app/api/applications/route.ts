import { NextResponse } from "next/server";
import { requireUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  const user = await requireUser(["PRACTITIONER"]);
  if (!user.practitioner) return NextResponse.json({ error: "Profile not found" }, { status: 400 });
  if (user.practitioner.approvalStatus !== "APPROVED") {
    return NextResponse.json({ error: "Your profile must be approved before applying" }, { status: 403 });
  }
  const { jobId } = await req.json();
  const job = await prisma.job.findUnique({ where: { id: jobId } });
  if (!job || job.status !== "OPEN") return NextResponse.json({ error: "Job not available" }, { status: 400 });

  const existing = await prisma.application.findUnique({
    where: { jobId_practitionerId: { jobId, practitionerId: user.practitioner.id } },
  });
  if (existing) return NextResponse.json({ error: "Already applied" }, { status: 409 });

  const app = await prisma.application.create({
    data: { jobId, practitionerId: user.practitioner.id, stage: "APPLIED" },
  });
  await prisma.pipelineEvent.create({
    data: { applicationId: app.id, fromStage: null, toStage: "APPLIED", byUserId: user.id },
  });
  return NextResponse.json({ application: app });
}
