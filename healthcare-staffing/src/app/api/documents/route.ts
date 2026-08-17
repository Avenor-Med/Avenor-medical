import { NextResponse } from "next/server";
import { requireUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { saveUploadedFile } from "@/lib/upload";

export async function POST(req: Request) {
  const user = await requireUser(["PRACTITIONER"]);
  if (!user.practitioner) return NextResponse.json({ error: "Practitioner profile not found" }, { status: 400 });

  const fd = await req.formData();
  const file = fd.get("file") as File | null;
  const type = String(fd.get("type") || "CV").toUpperCase();
  if (!file) return NextResponse.json({ error: "No file" }, { status: 400 });
  if (!["CV", "LICENSE", "CERTIFICATION"].includes(type)) {
    return NextResponse.json({ error: "Invalid type" }, { status: 400 });
  }
  if (file.size > 10 * 1024 * 1024) return NextResponse.json({ error: "File too large (max 10MB)" }, { status: 400 });

  const saved = await saveUploadedFile(file);

  // If CV is being re-uploaded, replace the previous one
  if (type === "CV") {
    await prisma.document.deleteMany({ where: { practitionerId: user.practitioner.id, type: "CV" } });
  }

  const doc = await prisma.document.create({
    data: {
      practitionerId: user.practitioner.id,
      type,
      fileName: saved.fileName,
      storagePath: saved.storagePath,
      size: saved.size,
      mimeType: saved.mimeType,
    },
  });
  return NextResponse.json({ document: doc });
}
