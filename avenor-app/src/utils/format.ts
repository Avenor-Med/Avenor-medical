// Presentation helpers. Pure functions — no side effects, trivially testable.

export function formatCurrency(value: number | null | undefined): string {
  if (value == null) return '—';
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(value);
}

export function formatRate(
  rateUsd: number | null,
  jobType: string | null,
): string {
  if (rateUsd == null) return '—';
  if (jobType === 'Permanent' && rateUsd > 150) {
    return `${formatCurrency(Math.round(rateUsd * 2.08))}/yr`;
  }
  return `${formatCurrency(rateUsd)}/hr`;
}

export function formatDate(value: string | Date | null | undefined): string {
  if (!value) return '—';
  const d = typeof value === 'string' ? new Date(value) : value;
  if (Number.isNaN(d.getTime())) return '—';
  return d.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

export function relativeDays(value: string | Date | null): number | null {
  if (!value) return null;
  const d = typeof value === 'string' ? new Date(value) : value;
  if (Number.isNaN(d.getTime())) return null;
  return Math.ceil((d.getTime() - Date.now()) / 86_400_000);
}

export function formatLocation(
  city: string | null,
  state: string | null,
): string {
  return [city, state].filter(Boolean).join(', ') || '—';
}

export function professionLabel(code: string | null): string {
  const map: Record<string, string> = {
    MD: 'Physician',
    DO: 'Physician',
    NP: 'Nurse Practitioner',
    PA: 'Physician Assistant',
    CRNA: 'Nurse Anesthetist',
    RN: 'Registered Nurse',
    LPN: 'Licensed Practical Nurse',
  };
  return code ? (map[code] ?? code) : '—';
}

export function truncate(text: string, max = 160): string {
  return text.length <= max ? text : `${text.slice(0, max - 1)}…`;
}
