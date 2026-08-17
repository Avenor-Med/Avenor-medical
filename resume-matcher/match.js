#!/usr/bin/env node
/**
 * Avenor Medical — Bulk Resume Matcher
 *
 * WHAT THIS DOES
 *   Reads every PDF/DOCX/TXT resume in ./sample-resumes/
 *   For each resume:
 *     1. Extracts raw text
 *     2. Calls Claude API to parse into structured JSON
 *     3. Scores every job in jobs-seed.json against the profile
 *     4. Computes top N matches with reasoning
 *   Writes three files to ./output/:
 *     - results.csv          (spreadsheet-friendly summary)
 *     - results.json         (full parsed data + all matches)
 *     - <candidate>-report.md (per-doctor markdown report)
 *
 * REQUIREMENTS
 *   Node 18+
 *   npm install (installs @anthropic-ai/sdk, pdf-parse, mammoth, dotenv)
 *   ANTHROPIC_API_KEY in .env
 *
 * USAGE
 *   1. Drop 50 doctor PDFs into ./sample-resumes/
 *   2. Run: npm start
 *   3. Check ./output/
 */
"use strict";

require("dotenv").config();
const fs = require("fs");
const path = require("path");
const Anthropic = require("@anthropic-ai/sdk");

const ROOT = __dirname;
const RESUME_DIR = path.join(ROOT, "sample-resumes");
const OUTPUT_DIR = path.join(ROOT, "output");
const JOBS_FILE = path.join(ROOT, "jobs-seed.json");

const MODEL = process.env.CLAUDE_MODEL || "claude-3-5-haiku-20241022";
const GEO_FOCUS = (process.env.GEO_FOCUS || "US").toUpperCase();
const TOP_MATCHES = parseInt(process.env.TOP_MATCHES || "10", 10);

// ------------------------------------------------------------
// SETUP
// ------------------------------------------------------------

if (!process.env.ANTHROPIC_API_KEY) {
  console.error("\n✗ ANTHROPIC_API_KEY missing.");
  console.error("  Copy .env.example → .env and add your key.");
  console.error("  Get one at https://console.anthropic.com\n");
  process.exit(1);
}

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR, { recursive: true });
if (!fs.existsSync(RESUME_DIR)) {
  console.error(`\n✗ Missing folder: ${RESUME_DIR}`);
  console.error("  Create it and drop your resume PDFs inside.\n");
  process.exit(1);
}

const { facilities, jobs } = JSON.parse(fs.readFileSync(JOBS_FILE, "utf8"));
const facById = Object.fromEntries(facilities.map(f => [f.id, f]));

// ------------------------------------------------------------
// FILE EXTRACTION
// ------------------------------------------------------------

async function extractText(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  const buffer = fs.readFileSync(filePath);
  if (ext === ".txt") return buffer.toString("utf8");
  if (ext === ".pdf") {
    const pdfParse = require("pdf-parse");
    const data = await pdfParse(buffer);
    return data.text;
  }
  if (ext === ".docx" || ext === ".doc") {
    const mammoth = require("mammoth");
    const result = await mammoth.extractRawText({ buffer });
    return result.value;
  }
  throw new Error(`Unsupported file extension: ${ext}`);
}

// ------------------------------------------------------------
// CLAUDE PARSING — Agent Persona: Resume Parser
// ------------------------------------------------------------

const PARSER_SYSTEM_PROMPT = `You are an expert healthcare recruiting analyst.

Given raw résumé text, extract structured fields and return ONLY valid JSON. No prose, no markdown fences. The exact shape:
{
  "fullName": string | null,
  "email": string | null,
  "phone": string | null,
  "profession": "MD"|"DO"|"RN"|"NP"|"PA"|"CRNA"|"LPN"|"Tech"|null,
  "specialty": string | null,
  "subSpecialties": string[],
  "yearsExperience": number | null,
  "certifications": string[],
  "licenses": [{"state": string, "number": string, "profession": string}],
  "education": [{"degree": string, "institution": string, "year": number | null}],
  "employmentHistory": [{"title": string, "employer": string, "startYear": number, "endYear": number | "present"}],
  "spokenLanguages": string[],
  "willingToTravel": boolean | null,
  "visaStatus": string | null,
  "preferredLocations": string[],
  "summary": string
}

Rules:
- Use null for unknown fields; empty array [] for unknown lists.
- Years of experience = sum of clinical years post-licensure.
- Certifications examples: BLS, ACLS, PALS, CCRN, CNOR, TNCC, NRP, DEA, board certifications.
- "summary" = 2 sentences a recruiter can scan at a glance.
- Return only JSON, nothing else.`;

async function parseResumeWithClaude(rawText, fileName) {
  const truncated = rawText.slice(0, 20000);
  const resp = await anthropic.messages.create({
    model: MODEL,
    max_tokens: 2048,
    system: PARSER_SYSTEM_PROMPT,
    messages: [{
      role: "user",
      content: `Résumé filename: ${fileName}\n\n----- BEGIN RÉSUMÉ -----\n${truncated}\n----- END RÉSUMÉ -----`
    }]
  });
  const text = resp.content.filter(b => b.type === "text").map(b => b.text).join("");
  // Strip any accidental code fences
  const cleaned = text.replace(/^```(?:json)?\s*|\s*```$/gm, "").trim();
  try {
    return JSON.parse(cleaned);
  } catch (err) {
    console.error(`  ⚠ Claude returned unparseable JSON for ${fileName} — raw text:\n${text.slice(0, 500)}`);
    return null;
  }
}

// ------------------------------------------------------------
// JOB MATCHING — deterministic scoring
// ------------------------------------------------------------

const RELATED_SPECS = {
  "ICU":               ["Critical Care Medicine", "Cath Lab", "Telemetry", "ER"],
  "ER":                ["ICU", "Critical Care Medicine", "Emergency Medicine", "Urgent Care"],
  "Emergency Medicine":["ER", "ICU", "Critical Care Medicine"],
  "OR":                ["Anesthesiology", "Surgery-Trauma", "Plastic Surgery"],
  "Cath Lab":          ["ICU", "Cardiology", "Cardiology-Interventional"],
  "Telemetry":         ["ICU", "Cardiology", "Med-Surg"],
  "Med-Surg":          ["Telemetry", "Geriatrics", "Home Health"],
  "NICU":              ["Pediatrics", "Pediatric Critical Care", "PICU"],
  "Labor & Delivery":  ["NICU", "Pediatrics", "OB/GYN"],
  "Family Medicine":   ["Internal Medicine", "Pediatrics", "Urgent Care", "Geriatrics"],
  "Internal Medicine": ["Family Medicine", "Hospitalist", "Geriatrics"],
  "Hospitalist":       ["Internal Medicine", "Critical Care Medicine"],
  "Pediatric Hospitalist":["Pediatrics", "NICU", "PICU"],
  "Anesthesiology":    ["OR", "Critical Care Medicine"],
  "Cardiology":        ["Cardiology-Interventional", "Cath Lab", "Hospitalist"],
  "Cardiology-Interventional": ["Cardiology", "Cath Lab"],
  "Home Health":       ["Geriatrics", "SNF / Long-Term Care"],
  "SNF / Long-Term Care":["Home Health", "Geriatrics"]
};

// US state compact license groups (approximate) — a compact-state RN can work in another compact state
const NURSE_COMPACT = new Set([
  "TX","OK","AR","LA","MS","AL","GA","FL","SC","NC","VA","WV","KY","TN","MO","IA","KS","NE","SD","ND","MT","WY","CO","NM","AZ","UT","ID","WA","VT","NH","ME","NJ","IN","OH"
]);

function scoreJob(profile, job) {
  let score = 0;
  const reasons = [];
  const flags = [];

  // Profession match (40)
  if (profile.profession && job.profession === profile.profession) {
    score += 40;
    reasons.push(`${profile.profession} profession match`);
  } else if (profile.profession && job.profession) {
    flags.push(`Different profession (needs ${job.profession})`);
  }

  // Specialty exact (30) or related (12)
  if (profile.specialty && job.specialty === profile.specialty) {
    score += 30;
    reasons.push(`${profile.specialty} specialty exact match`);
  } else if (profile.specialty && RELATED_SPECS[profile.specialty]?.includes(job.specialty)) {
    score += 12;
    reasons.push(`Related specialty: ${job.specialty}`);
  } else if (profile.subSpecialties?.length && profile.subSpecialties.includes(job.specialty)) {
    score += 20;
    reasons.push(`Sub-specialty match: ${job.specialty}`);
  }

  // License state
  const jobState = job.state;
  const candidateStates = (profile.licenses || []).map(l => l.state);
  if (candidateStates.includes(jobState)) {
    score += 20;
    reasons.push(`${jobState} license active`);
  } else if (["RN", "LPN"].includes(job.profession) && NURSE_COMPACT.has(jobState) && candidateStates.some(s => NURSE_COMPACT.has(s))) {
    score += 15;
    reasons.push(`Compact-state RN license (works in ${jobState})`);
  } else if (candidateStates.length) {
    flags.push(`Needs ${jobState} license (has ${candidateStates.join("/")})`);
  }

  // Years experience
  if (profile.yearsExperience !== null && profile.yearsExperience !== undefined) {
    if (profile.yearsExperience >= 5) { score += 12; reasons.push(`${profile.yearsExperience}+ yrs experience`); }
    else if (profile.yearsExperience >= 2) { score += 8; reasons.push(`${profile.yearsExperience}+ yrs experience`); }
    else if (profile.yearsExperience === 0) { flags.push("New grad — may not meet minimum"); }
  }

  // Certifications matching job requirements
  const jobReqUp = (job.requirements || "").toUpperCase();
  const matchedCerts = (profile.certifications || []).filter(c => jobReqUp.includes(c.toUpperCase()));
  if (matchedCerts.length) {
    score += Math.min(15, matchedCerts.length * 5);
    reasons.push(`Certified: ${matchedCerts.join(", ")}`);
  }

  // Visa match
  if (profile.visaStatus && /visa|H-1B|J-1/i.test(profile.visaStatus) && job.visaSupport) {
    score += 10;
    reasons.push("Visa support available");
  }

  // Signing bonus (small boost)
  if (job.signingBonusUsd > 0) {
    score += 2;
    reasons.push(`$${job.signingBonusUsd.toLocaleString()} signing bonus`);
  }

  // Preferred location match
  const jobCity = job.city.toLowerCase();
  const jobStateLower = job.state.toLowerCase();
  const prefs = (profile.preferredLocations || []).map(p => p.toLowerCase());
  if (prefs.some(p => p.includes(jobCity) || p.includes(jobStateLower))) {
    score += 8;
    reasons.push(`Location preference match`);
  }

  return {
    jobId: job.id,
    score,
    matchPct: Math.min(100, Math.round(score)),
    reasons,
    flags,
    job: {
      title: job.title,
      facility: facById[job.facilityId]?.name || "?",
      city: job.city,
      state: job.state,
      rateUsd: job.rateUsd,
      jobType: job.jobType,
      signingBonusUsd: job.signingBonusUsd || 0,
      visaSupport: job.visaSupport || false
    }
  };
}

function filterJobsByGeo(profile) {
  if (GEO_FOCUS === "TX") {
    return jobs.filter(j => j.state === "TX");
  }
  return jobs; // US = all
}

function rankMatches(profile) {
  const jobPool = filterJobsByGeo(profile);
  return jobPool
    .map(job => scoreJob(profile, job))
    .filter(m => m.score >= 10) // ignore very weak matches
    .sort((a, b) => b.score - a.score)
    .slice(0, TOP_MATCHES);
}

// ------------------------------------------------------------
// OUTPUT WRITERS
// ------------------------------------------------------------

function writeCsv(rows) {
  const headers = [
    "Candidate", "Profession", "Specialty", "YearsExp", "LicenseStates",
    "Certs", "Top1_Job", "Top1_Facility", "Top1_City", "Top1_Rate", "Top1_MatchPct",
    "Top2_Job", "Top2_City", "Top2_MatchPct",
    "Top3_Job", "Top3_City", "Top3_MatchPct",
    "TotalMatches"
  ];
  const esc = v => {
    if (v === null || v === undefined) return "";
    const s = String(v).replace(/"/g, '""');
    return /[",\n]/.test(s) ? `"${s}"` : s;
  };
  const lines = [headers.join(",")];
  for (const r of rows) {
    const p = r.profile;
    const m = r.matches;
    const licStates = (p.licenses || []).map(l => l.state).join("/");
    const line = [
      p.fullName || r.fileName,
      p.profession,
      p.specialty,
      p.yearsExperience,
      licStates,
      (p.certifications || []).join("/"),
      m[0]?.job.title || "",
      m[0]?.job.facility || "",
      m[0]?.job.city || "",
      m[0]?.job.rateUsd || "",
      m[0]?.matchPct || "",
      m[1]?.job.title || "",
      m[1]?.job.city || "",
      m[1]?.matchPct || "",
      m[2]?.job.title || "",
      m[2]?.job.city || "",
      m[2]?.matchPct || "",
      m.length
    ].map(esc).join(",");
    lines.push(line);
  }
  fs.writeFileSync(path.join(OUTPUT_DIR, "results.csv"), lines.join("\n"));
}

function writeMarkdownReport(row) {
  const p = row.profile;
  const m = row.matches;
  const slug = (p.fullName || row.fileName).replace(/[^a-z0-9]+/gi, "-").toLowerCase().slice(0, 60);
  let md = `# Match Report — ${p.fullName || row.fileName}\n\n`;
  md += `**File:** \`${row.fileName}\`\n\n`;
  md += `## Profile\n\n`;
  md += `- **Profession:** ${p.profession || "unknown"}\n`;
  md += `- **Specialty:** ${p.specialty || "unknown"}\n`;
  md += `- **Sub-specialties:** ${(p.subSpecialties || []).join(", ") || "—"}\n`;
  md += `- **Years experience:** ${p.yearsExperience ?? "unknown"}\n`;
  md += `- **Licenses:** ${(p.licenses || []).map(l => `${l.profession} ${l.state} ${l.number || ""}`).join("; ") || "—"}\n`;
  md += `- **Certifications:** ${(p.certifications || []).join(", ") || "—"}\n`;
  md += `- **Languages:** ${(p.spokenLanguages || []).join(", ") || "—"}\n`;
  md += `- **Visa status:** ${p.visaStatus || "—"}\n`;
  md += `- **Willing to travel:** ${p.willingToTravel === null ? "unknown" : p.willingToTravel ? "yes" : "no"}\n`;
  md += `- **Preferred locations:** ${(p.preferredLocations || []).join(", ") || "—"}\n`;
  md += `- **Contact:** ${p.email || "—"} · ${p.phone || "—"}\n\n`;
  md += `**Summary:** ${p.summary || "—"}\n\n`;

  md += `## Top ${m.length} matched positions\n\n`;
  m.forEach((match, i) => {
    md += `### ${i + 1}. ${match.matchPct}% — ${match.job.title}\n`;
    md += `- **Facility:** ${match.job.facility}\n`;
    md += `- **Location:** ${match.job.city}, ${match.job.state}\n`;
    md += `- **Rate:** $${match.job.rateUsd}/hr · ${match.job.jobType}`;
    if (match.job.signingBonusUsd > 0) md += ` · $${match.job.signingBonusUsd.toLocaleString()} signing bonus`;
    if (match.job.visaSupport) md += ` · Visa support`;
    md += `\n- **Why this matches:** ${match.reasons.join("; ") || "—"}\n`;
    if (match.flags.length) md += `- **Caveats:** ${match.flags.join("; ")}\n`;
    md += `\n`;
  });

  fs.writeFileSync(path.join(OUTPUT_DIR, `${slug}-report.md`), md);
}

// ------------------------------------------------------------
// MAIN
// ------------------------------------------------------------

async function main() {
  console.log("\n╔══════════════════════════════════════════════════════════════════╗");
  console.log("║      Avenor Medical — Bulk Résumé Matcher              ║");
  console.log("╚══════════════════════════════════════════════════════════════════╝\n");
  console.log(`Model:     ${MODEL}`);
  console.log(`Geo:       ${GEO_FOCUS} (${filterJobsByGeo({}).length} jobs in pool)`);
  console.log(`Top-N:     ${TOP_MATCHES} per candidate`);
  console.log(`Input:     ${RESUME_DIR}`);
  console.log(`Output:    ${OUTPUT_DIR}\n`);

  const files = fs.readdirSync(RESUME_DIR)
    .filter(f => /\.(pdf|docx?|txt)$/i.test(f))
    .map(f => path.join(RESUME_DIR, f));

  if (files.length === 0) {
    console.error("✗ No resume files found in sample-resumes/");
    console.error("  Drop PDFs, DOCX files, or TXT resumes into that folder and re-run.\n");
    process.exit(1);
  }

  console.log(`Processing ${files.length} résumé${files.length === 1 ? "" : "s"}...\n`);

  const results = [];
  let successCount = 0, failCount = 0;
  const startedAt = Date.now();

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const fileName = path.basename(file);
    process.stdout.write(`  [${i + 1}/${files.length}] ${fileName}  `);
    try {
      const text = await extractText(file);
      if (text.length < 100) throw new Error("Extracted text too short — likely image-based PDF");

      const profile = await parseResumeWithClaude(text, fileName);
      if (!profile) throw new Error("Claude parsing returned null");

      const matches = rankMatches(profile);
      results.push({ fileName, profile, matches });
      writeMarkdownReport(results[results.length - 1]);
      successCount++;
      const top = matches[0];
      console.log(`✓ ${profile.profession || "?"}/${profile.specialty || "?"} · ${matches.length} matches · top: ${top ? `${top.matchPct}%` : "—"}`);
    } catch (err) {
      failCount++;
      console.log(`✗ ${err.message}`);
      results.push({ fileName, profile: null, matches: [], error: err.message });
    }
  }

  const elapsed = ((Date.now() - startedAt) / 1000).toFixed(1);

  fs.writeFileSync(path.join(OUTPUT_DIR, "results.json"), JSON.stringify(results, null, 2));
  writeCsv(results.filter(r => r.profile));

  console.log("\n╔══════════════════════════════════════════════════════════════════╗");
  console.log("║                          Complete                               ║");
  console.log("╚══════════════════════════════════════════════════════════════════╝");
  console.log(`  Parsed:   ${successCount}/${files.length} résumés`);
  console.log(`  Failed:   ${failCount}`);
  console.log(`  Time:     ${elapsed}s (${(elapsed / files.length).toFixed(1)}s/résumé avg)`);
  console.log(`  Est cost: ~$${(files.length * 0.001).toFixed(3)} at Haiku pricing\n`);
  console.log(`  Results:  ${path.join(OUTPUT_DIR, "results.csv")}`);
  console.log(`            ${path.join(OUTPUT_DIR, "results.json")}`);
  console.log(`            ${OUTPUT_DIR}/*-report.md\n`);
}

main().catch(err => {
  console.error("\n✗ FATAL:", err.message);
  console.error(err.stack);
  process.exit(1);
});
