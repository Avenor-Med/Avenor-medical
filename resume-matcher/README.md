# Avenor Medical — Bulk Résumé Matcher

Drop **50 doctor résumés** in `./sample-resumes/`, run one command, get a spreadsheet + per-doctor markdown reports of matched positions across Texas and nationwide. Powered by the Claude API.

**Total run time for 50 résumés:** ~5–8 minutes.
**Estimated cost:** ~$0.05 (five cents) at Haiku pricing. Runs on the free-tier Claude credit.

---

## Setup (one-time, ~10 minutes)

### 1. Install Node.js
If you don't have it, get Node 18+ from **https://nodejs.org** (LTS version).

Verify in a terminal:
```
node --version
```
Should print `v18.x.x` or higher.

### 2. Get an Anthropic API key
1. Go to **https://console.anthropic.com**
2. Sign up (new accounts get $5 free credit — more than enough for this)
3. Go to **Settings → API Keys → Create Key**
4. Copy the key (starts with `sk-ant-api03-…`)

### 3. Configure this folder
Open a terminal in this folder and run:

```
npm install
```

Then copy the environment template:
```
cp .env.example .env
```
(On Windows PowerShell: `copy .env.example .env`)

Open `.env` in any text editor and paste your key:
```
ANTHROPIC_API_KEY=sk-ant-api03-YOUR-KEY-HERE
```
Save the file.

### 4. Drop résumés in
Copy your 50 doctor résumés (any mix of `.pdf`, `.docx`, `.txt`) into:
```
./sample-resumes/
```

## Run

```
npm start
```

Or equivalently:
```
node match.js
```

You'll see live progress:
```
Processing 50 résumés...

  [1/50] dr_sanchez_cv.pdf  ✓ MD/Cardiology · 10 matches · top: 87%
  [2/50] rn_williams.pdf    ✓ RN/ICU · 10 matches · top: 92%
  [3/50] np_johnson.docx    ✓ NP/Family Medicine · 8 matches · top: 78%
  ...
```

## Output

Three things land in `./output/`:

### `results.csv`
Spreadsheet with one row per doctor: profession, specialty, years, licenses, certs, top 3 job matches with match %.
Open in Excel or Google Sheets. This is what you show your team.

### `results.json`
Full structured data — every parsed profile + every scored match with reasoning. For programmatic use.

### `<candidate-name>-report.md`
Per-doctor markdown report:
- Full extracted profile
- Top 10 matched positions with match %, facility, rate, location
- Explanation for each match ("Cardiology board match; TX license; 12 yrs experience; visa support available")
- Any caveats ("Needs NY license", "New grad — may not meet 3-yr minimum")

You get one report file per doctor — perfect to email to your recruiter team.

## Configuration

Edit `.env` to change behavior:

| Variable | Default | Description |
|---|---|---|
| `CLAUDE_MODEL` | `claude-3-5-haiku-20241022` | Use `claude-3-5-sonnet-20241022` for more accurate parsing (~5× cost) |
| `GEO_FOCUS` | `US` | Set to `TX` to only match Texas positions |
| `TOP_MATCHES` | `10` | How many top matches to report per candidate |

## Adding your own jobs

`jobs-seed.json` has 40 sample positions (Texas + nationwide). To add your real facility openings:

1. Open `jobs-seed.json`
2. Add facilities to the `"facilities"` array (id, name, city, state, type)
3. Add jobs to the `"jobs"` array — see any existing entry for the exact fields
4. Save and re-run

The scoring algorithm handles any specialty in the standard healthcare taxonomy.

## In production, this data comes from…

- **Indeed Publisher API** (~10k healthcare postings updated hourly)
- **ZipRecruiter Partner API** (broad nationwide coverage)
- **Facility ATS feeds** — Workday, iCIMS, Greenhouse, Lever, SmartRecruiters
- **Inbound submissions** — the "Fill a Position" form on the Avenor site

For Friday's demo the seed JSON is sufficient. For real production, we integrate the above (see `OPTION_B_ROADMAP.md`).

## Troubleshooting

**"Cannot find module '@anthropic-ai/sdk'"**
→ You didn't run `npm install`. Do that in this folder.

**"ANTHROPIC_API_KEY missing"**
→ Copy `.env.example` to `.env` and paste your key.

**"Extracted text too short — likely image-based PDF"**
→ The PDF is a scanned image, not text-based. You'd need OCR (Tesseract, or Claude's vision API in production). For Friday, either (a) get a text-based version, or (b) upgrade to `claude-3-5-sonnet` with vision — I can add that if you send me an image-only sample.

**Claude returned unparseable JSON**
→ Rare, but happens on very unusual résumé formats. The script logs and continues; the candidate appears in `results.json` with `"error"` set.

**Rate limits**
→ Free tier gets you ~60 requests/minute. 50 résumés in one run stays well under the limit. If you process hundreds, add `await sleep(1000)` between calls.

## What's next after Friday

See `../OPTION_B_ROADMAP.md` for the real production build:
- Web app with 50-doctor upload dashboard
- Real-time credentialing verification (state boards, HHS registries, NPDB)
- Multi-agent workflow (parser + credentialing + skills + location + matcher + recommender)
- Supabase-backed permanent database
- Weekly digest emails to your recruiter team

Timeline: 5–7 focused build days after you say go.
