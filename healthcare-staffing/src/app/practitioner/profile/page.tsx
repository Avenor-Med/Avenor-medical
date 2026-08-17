import { requireUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import ProfileEditor from "./ProfileEditor";

export default async function ProfilePage() {
  const user = await requireUser(["PRACTITIONER"]);
  const practitioner = await prisma.practitioner.findUnique({
    where: { userId: user.id },
    include: { documents: true, certifications: true },
  });
  if (!practitioner) return null;

  return <ProfileEditor practitioner={JSON.parse(JSON.stringify(practitioner))} userName={user.name} />;
}
