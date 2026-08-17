import { NextResponse } from "next/server";
import { readFile } from "fs/promises";
import path from "path";
import { requireUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { parseCv } from "@/lib/ai";

export async function POST(req: Request) {
  const user = await requireUser(["PRACTITIONER"]);
  if (!user.practitioner) return NextResponse.json({ error: "Profile not found" }, { status: 400 });
  const { documentId } = await req.json();

  const doc = await prisma.document.findFirst({
    where: { id: documentId, practitionerId: user.practitioner.id, type: "CV" },
  });
  if (!doc) return NextResponse.json({ error: "CV document not found" }, { status: 404 });

  const filePath = path.join(process.cwd(), "public", doc.storagePath);
  let text = "";
  try {
    const buf = await readFile(filePath);
    // Simple text-only extraction. PDFs uploaded as text-extractable PDFs work; for binary PDFs
    // (image-based) you'd want pdf-parse here — kept minimal for the prototype.
    text = buf.toString("utf-8");
  } catch (e: any) {
    return NextResponse.json({ error: "Could not read CV file: " + e.message }, { status: 500 });
  }

  const parsed = await parseCv(text || "Healthcare practitioner CV (no readable text)");
  return NextResponse.json(parsed);
}
