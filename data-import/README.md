# Data import

Fill these in with real data and send them back. Each is a plain CSV —
open in Excel or Google Sheets, edit, save as CSV.

## Files

| File | What it holds | Fill this first? |
|---|---|---|
| `facilities-template.csv` | Hospitals and clinics you place into | **Yes — first** |
| `jobs-template.csv` | Open positions to display | Yes — after facilities |
| `providers-template.csv` | Clinicians already in your network | Optional |

Facilities must come first because each job references a facility by name.

## Column notes

**facilities-template.csv**
- `type` — Hospital · Clinic · Surgery Center · SNF · Home Health · Hospice · Urgent Care
- `state` — two letters, e.g. `TX`
- Contact fields can be left blank

**jobs-template.csv**
- `facility_name` — must match a `name` in the facilities file exactly
- `profession` — MD · DO · NP · PA · CRNA · RN · LPN
- `shift_type` — Day · Night · Rotating · Weekend
- `duration_weeks` — leave blank for permanent roles
- `job_type` — Travel · Locums · Permanent · Per Diem
- `visa_support` — yes / no
- `requirements` — one item per line inside the cell (Alt+Enter in Excel)
- No pay or bill rate here. Rates are internal and entered separately in the
  admin portal, never shown on public listings.

**providers-template.csv**
- `license_expiration` — YYYY-MM-DD
- `certifications` — comma-separated inside one cell

## What happens next

Send the filled CSVs back and I convert them to SQL, load them into Supabase,
and verify the counts. Existing demo data is removed in the same pass so
nothing fictional survives into production.

Résumé PDFs are separate — upload those through the site itself so the parser
extracts and matches them properly.
