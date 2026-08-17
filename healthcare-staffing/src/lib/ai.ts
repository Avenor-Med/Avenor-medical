// CV parsing — uses Claude when ANTHROPIC_API_KEY is set, falls back to mock otherwise.
// Same return shape either way so the UI doesn't care which path ran.
import Anthropic from "@anthropic-ai/sdk";

export interface ParsedCv {
  fullName: string | null;
  profession: string | null;       // RN / NP / MD / PA / LPN / Tech
  specialty: string | null;        // ICU / ER / Family Medicine / etc.
  yearsExperience: number | null;
  certifications: string[];        // e.g. ["BLS", "ACLS"]
  licenses: { number: string | null; state: string | null }[];
  priorEmployers: string[];
  summary: string;                 // 2-3 sentence narrative summary
  source: "claude" | "mock";       // which path produced this
}

const SYSTEM_PROMPT = `You are an expert healthcare recruiter assistant. The user will paste the text of a healthcare practitioner's CV / résumé. Extract structured fields and return ONLY valid JSON, no prose, matching this exact shape:
{
  "fullName": string | null,
  "profession": "RN" | "NP" | "MD" | "PA" | "LPN" | "Tech" | string | null,
  "specialty": string | null,
  "yearsExperience": number | null,
  "certifications": string[],
  "licenses": [{ "number": string | null, "state": string | null }],
  "priorEmployers": string[],
  "summary": string
}
Rules:
- "summary" is 2-3 sentences, plain prose, suitable for a recruiter to read at a glance.
- Years of experience should be the integer total years post-licensure across roles.
- If a field is unknown, use null (or empty array). Never invent.
- Return JSON only.`;

export async function parseCv(cvText: string): Promise<ParsedCv> {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) return mockParse(cvText);

  try {
    const client = new Anthropic({ apiKey });
    const resp = await client.messages.create({
      model: "claude-3-5-sonnet-20241022",
      max_tokens: 1024,
      system: SYSTEM_PROMPT,
      messages: [{ role: "user", content: cvText.slice(0, 20000) }],
    });
    const text = resp.content
      .filter((b) => b.type === "text")
      .map((b: any) => b.text)
      .join("");
    const json = extractJson(text);
    const parsed = JSON.parse(json);
    return { ...parsed, source: "claude" } as ParsedCv;
  } catch (e) {
    console.error("Claude parse failed, falling back to mock:", e);
    return mockParse(cvText);
  }
}

function extractJson(text: string): string {
  // Tolerate models that wrap JSON in ```json fences
  const fence = text.match(/```(?:json)?\s*([\s\S]+?)```/);
  if (fence) return fence[1];
  // Find first { ... last }
  const start = text.indexOf("{");
  const end = text.lastIndexOf("}");
  if (start !== -1 && end !== -1) return text.slice(start, end + 1);
  return text;
}

// ─── Realistic mock so the demo works without an API key ─────────────
function mockParse(cvText: string): ParsedCv {
  const lower = cvText.toLowerCase();

  let profession: string | null = null;
  if (/\b(rn|registered nurse)\b/.test(lower)) profession = "RN";
  else if (/\b(nurse practitioner|np)\b/.test(lower)) profession = "NP";
  else if (/\b(physician assistant|pa-c|pa)\b/.test(lower)) profession = "PA";
  else if (/\b(md|m\.d|physician|hospitalist)\b/.test(lower)) profession = "MD";
  else if (/\blpn\b/.test(lower)) profession = "LPN";

  let specialty: string | null = null;
  for (const s of ["ICU", "ER", "Emergency", "OR", "Operating Room", "Pediatrics", "Family Medicine", "Hospitalist", "Med-Surg", "Cardiology", "Oncology"]) {
    if (lower.includes(s.toLowerCase())) {
      specialty = s.replace("Operating Room", "OR").replace("Emergency", "ER");
      break;
    }
  }

  // Pull a year span like "2018 – present" or "2017-2022"
  const yearMatches = cvText.match(/\b(19|20)\d{2}\b/g) ?? [];
  const years = yearMatches.map((y) => parseInt(y));
  const minYear = years.length ? Math.min(...years) : null;
  const yearsExp = minYear ? Math.max(0, new Date().getFullYear() - minYear) : null;

  const certs: string[] = [];
  for (const c of ["BLS", "ACLS", "PALS", "CCRN", "CNOR", "TNCC", "NRP", "DEA"]) {
    if (cvText.toUpperCase().includes(c)) certs.push(c);
  }

  const licMatches = Array.from(cvText.matchAll(/license[^\n]*?([A-Z]{2})[^\n]*?([A-Z0-9-]{5,})/gi));
  const licenses = licMatches.length
    ? licMatches.slice(0, 2).map((m) => ({ state: m[1], number: m[2] }))
    : [{ state: null, number: null }];

  const employers: string[] = [];
  const empMatches = cvText.match(/(?:at|@)\s+([A-Z][A-Za-z .&'-]{3,60}(?:Hospital|Medical Center|Clinic|Health|Centre))/g) ?? [];
  for (const e of empMatches.slice(0, 4)) {
    employers.push(e.replace(/^(at|@)\s+/i, ""));
  }
  if (employers.length === 0) employers.push("Memorial Hospital", "St. Mary's Medical Center");

  const summaryBits: string[] = [];
  if (profession && specialty && yearsExp) summaryBits.push(`${profession} with ${yearsExp} years of ${specialty} experience.`);
  else if (profession && yearsExp) summaryBits.push(`${profession} with ${yearsExp} years of clinical experience.`);
  else if (profession) summaryBits.push(`${profession} with strong clinical background.`);
  else summaryBits.push("Healthcare practitioner with a clinical background.");
  if (certs.length) summaryBits.push(`Currently certified in ${certs.slice(0, 3).join(", ")}.`);
  summaryBits.push("Has worked across multiple acute-care environments.");

  return {
    fullName: null,
    profession,
    specialty,
    yearsExperience: yearsExp,
    certifications: certs,
    licenses,
    priorEmployers: employers,
    summary: summaryBits.join(" "),
    source: "mock",
  };
}
