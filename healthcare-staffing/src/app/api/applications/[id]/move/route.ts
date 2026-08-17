import { NextResponse } from "next/server";
import { requireUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { Stage, STAGES, nextStages } from "@/lib/stages";

export async function POST(req: Request, { params }: { params: { id: string } }) {
  const user = await requireUser(["CS", "ADMIN"]);
  const { toStage, note } = await req.json();
  if (!STAGES.includes(toStage)) return NextResponse.json({ error: "Invalid stage" }, { status: 400 });

  const app = await prisma.application.findUnique({ where: { id: params.id } });
  if (!app) return NextResponse.json({ error: "Application not found" }, { status: 404 });

  const allowed = nextStages(app.stage as Stage);
  if (!allowed.includes(toStage)) {
    return NextResponse.json({ error: `Cannot move from ${app.stage} to ${toStage}` }, { status: 400 });
  }

  const updates: any = { stage: toStage };
  if (toStage === "PRESENTED") updates.presentedToFacilityAt = new Date();
  if (toStage === "ACCEPTED")  updates.startedAt = updates.startedAt ?? new Date();
  if (toStage === "REJECTED")  updates.rejectionReason = note || null;
  if (note) updates.decisionNote = note;

  const fromStage = app.stage;
  await prisma.$transaction([
    prisma.application.update({ where: { id: app.id }, data: updates }),
    prisma.pipelineEvent.create({
      data: { applicationId: app.id, fromStage, toStage, byUserId: user.id, note: note || null },
    }),
  ]);

  return NextResponse.json({ ok: true });
}
