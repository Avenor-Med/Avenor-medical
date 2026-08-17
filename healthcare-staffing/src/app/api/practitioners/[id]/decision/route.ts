import { NextResponse } from "next/server";
import { requireUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request, { params }: { params: { id: string } }) {
  await requireUser(["RECRUITER", "ADMIN"]);
  const { approve, note } = await req.json();
  const updated = await prisma.practitioner.update({
    where: { id: params.id },
    data: {
      approvalStatus: approve ? "APPROVED" : "REJECTED",
      approvedAt: approve ? new Date() : null,
      approvalNote: note || null,
    },
  });
  return NextResponse.json({ practitioner: updated });
}
