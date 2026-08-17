import Link from "next/link";
import { requireUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import NewJobForm from "./NewJobForm";

export default async function NewJobPage() {
  await requireUser(["CS"]);
  const facilities = await prisma.facility.findMany({ orderBy: { name: "asc" } });
  return (
    <div className="max-w-3xl space-y-6">
      <Link href="/cs/jobs" className="text-sm text-brand-600 hover:underline">← All jobs</Link>
      <h1 className="text-3xl font-bold text-slate-900">New job posting</h1>
      <NewJobForm facilities={JSON.parse(JSON.stringify(facilities))} />
    </div>
  );
}
