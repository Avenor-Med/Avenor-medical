import type { ReactNode } from 'react';

// Every badge tone ships a light and dark pairing. Callers pick the surface;
// the component guarantees readable contrast on it.
export type BadgeTone =
  | 'neutral'
  | 'success'
  | 'info'
  | 'warning'
  | 'danger'
  | 'accent';

const LIGHT: Record<BadgeTone, string> = {
  neutral: 'bg-slate-100 text-slate-700 border-slate-200',
  success: 'bg-emerald-50 text-emerald-800 border-emerald-200',
  info: 'bg-blue-50 text-blue-800 border-blue-200',
  warning: 'bg-amber-50 text-amber-800 border-amber-200',
  danger: 'bg-rose-50 text-rose-800 border-rose-200',
  accent: 'bg-cream-soft text-brass-dark border-brass/40',
};

const DARK: Record<BadgeTone, string> = {
  neutral: 'bg-navy-mid/40 text-cream/90 border-brass/30',
  success: 'bg-emerald-950 text-emerald-300 border-emerald-700/50',
  info: 'bg-blue-950 text-blue-300 border-blue-700/50',
  warning: 'bg-amber-950 text-amber-300 border-amber-700/50',
  danger: 'bg-rose-950 text-rose-300 border-rose-700/50',
  accent: 'bg-brass/15 text-brass-bright border-brass/40',
};

export default function Badge({
  children,
  tone = 'neutral',
  surface = 'light',
}: {
  children: ReactNode;
  tone?: BadgeTone;
  surface?: 'light' | 'dark';
}) {
  const palette = surface === 'dark' ? DARK : LIGHT;
  return (
    <span
      className={`inline-flex items-center border px-2.5 py-0.5 text-[11px] font-semibold ${palette[tone]}`}
    >
      {children}
    </span>
  );
}
