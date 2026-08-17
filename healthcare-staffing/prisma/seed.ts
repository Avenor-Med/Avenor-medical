import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database…");

  // Clean (idempotent reseed)
  await prisma.pipelineEvent.deleteMany();
  await prisma.application.deleteMany();
  await prisma.certification.deleteMany();
  await prisma.document.deleteMany();
  await prisma.job.deleteMany();
  await prisma.facilityUser.deleteMany();
  await prisma.practitioner.deleteMany();
  await prisma.facility.deleteMany();
  await prisma.user.deleteMany();

  const password = await bcrypt.hash("password", 10);

  // ────────── Users (one per role) ──────────
  const admin = await prisma.user.create({
    data: { email: "admin@staffing.com", name: "Alex Admin", role: "ADMIN", passwordHash: password, phone: "555-0100" },
  });
  const recruiter = await prisma.user.create({
    data: { email: "recruiter@staffing.com", name: "Riley Recruiter", role: "RECRUITER", passwordHash: password, phone: "555-0101" },
  });
  const cs = await prisma.user.create({
    data: { email: "cs@staffing.com", name: "Casey Customer-Success", role: "CS", passwordHash: password, phone: "555-0102" },
  });

  // Practitioner #1 — APPROVED, has applications
  const nurseUser = await prisma.user.create({
    data: { email: "nurse@example.com", name: "Nina Nurse", role: "PRACTITIONER", passwordHash: password, phone: "555-0201" },
  });
  const nina = await prisma.practitioner.create({
    data: {
      userId: nurseUser.id,
      profession: "RN",
      specialty: "ICU",
      yearsExperience: 7,
      licenseNumber: "RN-CA-481299",
      licenseState: "CA",
      city: "San Diego",
      state: "CA",
      availableHoursPerWk: 40,
      willingToTravel: true,
      rateExpectationUsd: 78,
      approvalStatus: "APPROVED",
      approvedAt: new Date(),
      bio: "ICU nurse with 7 years of experience across two Level-I trauma centers. Strong charge-nurse background.",
      aiSummary: "ICU-trained RN with charge-nurse experience, BLS/ACLS current, willing to travel. Strong fit for travel and per-diem ICU postings.",
    },
  });

  await prisma.certification.createMany({
    data: [
      { practitionerId: nina.id, name: "BLS", issuingBody: "AHA", expiresAt: new Date(Date.now() + 365 * 86400000) },
      { practitionerId: nina.id, name: "ACLS", issuingBody: "AHA", expiresAt: new Date(Date.now() + 200 * 86400000) },
      { practitionerId: nina.id, name: "CCRN", issuingBody: "AACN", expiresAt: new Date(Date.now() + 700 * 86400000) },
    ],
  });

  // Practitioner #2 — pending approval (for the recruiter queue demo)
  const drUser = await prisma.user.create({
    data: { email: "doc@example.com", name: "Dr. Dan Davis", role: "PRACTITIONER", passwordHash: password, phone: "555-0202" },
  });
  await prisma.practitioner.create({
    data: {
      userId: drUser.id,
      profession: "MD",
      specialty: "Hospitalist",
      yearsExperience: 12,
      licenseNumber: "MD-TX-99887",
      licenseState: "TX",
      city: "Austin",
      state: "TX",
      availableHoursPerWk: 36,
      rateExpectationUsd: 220,
      approvalStatus: "PENDING",
      bio: "Hospitalist looking for locum coverage in TX/OK.",
    },
  });

  // Practitioner #3 — APPROVED, fewer apps
  const npUser = await prisma.user.create({
    data: { email: "np@example.com", name: "Pat Provider", role: "PRACTITIONER", passwordHash: password },
  });
  const pat = await prisma.practitioner.create({
    data: {
      userId: npUser.id,
      profession: "NP",
      specialty: "Family Medicine",
      yearsExperience: 4,
      licenseNumber: "NP-AZ-44210",
      licenseState: "AZ",
      city: "Phoenix",
      state: "AZ",
      availableHoursPerWk: 32,
      rateExpectationUsd: 95,
      approvalStatus: "APPROVED",
      approvedAt: new Date(),
      bio: "Bilingual NP, family practice + urgent care.",
      aiSummary: "Family-medicine NP, bilingual, comfortable in clinic and urgent care. 4 years post-licensure.",
    },
  });

  // ────────── Facilities ──────────
  const memorial = await prisma.facility.create({
    data: { name: "Memorial Hospital — San Diego", type: "Hospital", city: "San Diego", state: "CA", contactName: "Dana Director", contactEmail: "facility@hospital.com", contactPhone: "619-555-0011" },
  });
  const stmary = await prisma.facility.create({
    data: { name: "St. Mary's Medical Center", type: "Hospital", city: "Phoenix", state: "AZ", contactName: "Jamie Operations", contactEmail: "ops@stmarys.example", contactPhone: "602-555-0100" },
  });
  const oakridge = await prisma.facility.create({
    data: { name: "Oakridge Surgery Center", type: "Surgery Center", city: "Austin", state: "TX", contactName: "Morgan Ops", contactEmail: "ops@oakridge.example" },
  });

  // Facility login user (lets you log in as the facility)
  const facUser = await prisma.user.create({
    data: { email: "facility@hospital.com", name: "Dana Director", role: "FACILITY", passwordHash: password },
  });
  await prisma.facilityUser.create({
    data: { userId: facUser.id, facilityId: memorial.id, title: "Director of Nursing" },
  });

  // ────────── Jobs ──────────
  const jobs = await Promise.all([
    prisma.job.create({
      data: {
        facilityId: memorial.id, createdById: cs.id,
        title: "ICU Travel Nurse — 13-week",
        profession: "RN", specialty: "ICU",
        city: "San Diego", state: "CA",
        shiftType: "Night", hoursPerWeek: 36, durationWeeks: 13,
        startDate: new Date(Date.now() + 14 * 86400000),
        rateUsd: 82,
        description: "13-week night-shift ICU contract at Memorial. Level I trauma center; high-acuity patients.",
        requirements: "• 2+ yrs ICU\n• BLS, ACLS\n• CA license required\n• Travel comp on top of hourly",
      },
    }),
    prisma.job.create({
      data: {
        facilityId: memorial.id, createdById: cs.id,
        title: "ER Nurse — Per Diem",
        profession: "RN", specialty: "ER",
        city: "San Diego", state: "CA",
        shiftType: "Rotating", hoursPerWeek: 24,
        rateUsd: 75,
        description: "Per-diem ER nurse coverage; flexible scheduling.",
        requirements: "• 3+ yrs ER\n• PALS preferred\n• CA license",
      },
    }),
    prisma.job.create({
      data: {
        facilityId: stmary.id, createdById: cs.id,
        title: "Family Medicine NP — 6-month",
        profession: "NP", specialty: "Family Medicine",
        city: "Phoenix", state: "AZ",
        shiftType: "Day", hoursPerWeek: 32, durationWeeks: 26,
        rateUsd: 98,
        description: "Outpatient family medicine clinic; strong patient panel; established support staff.",
        requirements: "• AZ NP license\n• Bilingual a plus",
      },
    }),
    prisma.job.create({
      data: {
        facilityId: oakridge.id, createdById: cs.id,
        title: "OR Nurse — Surgery Center",
        profession: "RN", specialty: "OR",
        city: "Austin", state: "TX",
        shiftType: "Day", hoursPerWeek: 40, durationWeeks: 8,
        rateUsd: 70,
        description: "Outpatient surgery center; orthopedic and general cases.",
        requirements: "• 1+ yr OR\n• TX license\n• CNOR preferred",
      },
    }),
    prisma.job.create({
      data: {
        facilityId: stmary.id, createdById: cs.id,
        title: "Hospitalist Locum — 4-week",
        profession: "MD", specialty: "Hospitalist",
        city: "Phoenix", state: "AZ",
        shiftType: "Day", hoursPerWeek: 36, durationWeeks: 4,
        rateUsd: 230,
        description: "4-week locum coverage on the hospitalist service.",
        requirements: "• AZ MD license\n• Active DEA",
      },
    }),
  ]);

  // ────────── Applications + pipeline events (so dashboards have content) ──────────
  // Nina applies to ICU (presented), ER (under review), and OR (applied).
  const a1 = await prisma.application.create({
    data: {
      jobId: jobs[0].id, practitionerId: nina.id, stage: "PRESENTED",
      presentedToFacilityAt: new Date(Date.now() - 2 * 86400000),
    },
  });
  await prisma.pipelineEvent.createMany({
    data: [
      { applicationId: a1.id, fromStage: null,            toStage: "APPLIED",      byUserId: nurseUser.id },
      { applicationId: a1.id, fromStage: "APPLIED",       toStage: "UNDER_REVIEW", byUserId: cs.id },
      { applicationId: a1.id, fromStage: "UNDER_REVIEW",  toStage: "PRESENTED",    byUserId: cs.id, note: "Strong ICU + travel-ready. Presenting." },
    ],
  });

  const a2 = await prisma.application.create({
    data: { jobId: jobs[1].id, practitionerId: nina.id, stage: "UNDER_REVIEW" },
  });
  await prisma.pipelineEvent.createMany({
    data: [
      { applicationId: a2.id, fromStage: null,           toStage: "APPLIED",      byUserId: nurseUser.id },
      { applicationId: a2.id, fromStage: "APPLIED",      toStage: "UNDER_REVIEW", byUserId: cs.id },
    ],
  });

  const a3 = await prisma.application.create({
    data: { jobId: jobs[3].id, practitionerId: nina.id, stage: "APPLIED" },
  });
  await prisma.pipelineEvent.create({
    data: { applicationId: a3.id, fromStage: null, toStage: "APPLIED", byUserId: nurseUser.id },
  });

  // Pat applies to NP role (interviewing — facility liked her)
  const a4 = await prisma.application.create({
    data: { jobId: jobs[2].id, practitionerId: pat.id, stage: "INTERVIEWING", presentedToFacilityAt: new Date(Date.now() - 5 * 86400000) },
  });
  await prisma.pipelineEvent.createMany({
    data: [
      { applicationId: a4.id, fromStage: null,           toStage: "APPLIED",       byUserId: npUser.id },
      { applicationId: a4.id, fromStage: "APPLIED",      toStage: "UNDER_REVIEW",  byUserId: cs.id },
      { applicationId: a4.id, fromStage: "UNDER_REVIEW", toStage: "PRESENTED",     byUserId: cs.id },
      { applicationId: a4.id, fromStage: "PRESENTED",    toStage: "INTERVIEWING",  byUserId: cs.id, note: "Facility scheduling 30-min phone screen." },
    ],
  });

  // One ACCEPTED placement so earnings dashboard has something
  const a5 = await prisma.application.create({
    data: {
      jobId: jobs[1].id, practitionerId: pat.id, stage: "ACCEPTED",
      presentedToFacilityAt: new Date(Date.now() - 30 * 86400000),
      startedAt: new Date(Date.now() - 14 * 86400000),
      hoursLogged: 80,
    },
  });
  await prisma.pipelineEvent.createMany({
    data: [
      { applicationId: a5.id, fromStage: null,            toStage: "APPLIED",      byUserId: npUser.id },
      { applicationId: a5.id, fromStage: "APPLIED",       toStage: "UNDER_REVIEW", byUserId: cs.id },
      { applicationId: a5.id, fromStage: "UNDER_REVIEW",  toStage: "PRESENTED",    byUserId: cs.id },
      { applicationId: a5.id, fromStage: "PRESENTED",     toStage: "INTERVIEWING", byUserId: cs.id },
      { applicationId: a5.id, fromStage: "INTERVIEWING",  toStage: "ACCEPTED",     byUserId: cs.id, note: "Offer accepted, start date confirmed." },
    ],
  });

  console.log("✅ Seed complete.");
  console.log("");
  console.log("  Login at /login with any of:");
  console.log("    admin@staffing.com / password         (Admin)");
  console.log("    recruiter@staffing.com / password     (Recruiter)");
  console.log("    cs@staffing.com / password            (Customer Success)");
  console.log("    nurse@example.com / password          (Practitioner — ICU RN, approved)");
  console.log("    doc@example.com / password            (Practitioner — pending approval)");
  console.log("    np@example.com / password             (Practitioner — NP, has accepted job)");
  console.log("    facility@hospital.com / password      (Facility user)");
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });
