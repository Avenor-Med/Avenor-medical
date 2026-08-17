// Local-disk file upload. Swap for S3/GCS by replacing this one function.
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import { randomBytes } from "crypto";

const UPLOAD_DIR = path.join(process.cwd(), "public", "uploads");

export interface SavedFile {
  storagePath: string; // e.g. "uploads/abc123-cv.pdf"  (relative to /public)
  size: number;
  mimeType: string;
  fileName: string;
}

export async function saveUploadedFile(file: File): Promise<SavedFile> {
  await mkdir(UPLOAD_DIR, { recursive: true });
  const ext = path.extname(file.name) || ".bin";
  const slug = randomBytes(8).toString("hex");
  const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "_").slice(0, 60);
  const fileName = `${slug}-${safeName}`;
  const fullPath = path.join(UPLOAD_DIR, fileName);
  const arrayBuf = await file.arrayBuffer();
  await writeFile(fullPath, Buffer.from(arrayBuf));
  return {
    storagePath: path.posix.join("uploads", fileName),
    size: file.size,
    mimeType: file.type || "application/octet-stream",
    fileName: file.name,
  };
}
