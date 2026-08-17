import type { ReactNode } from 'react';

// Surface component. `tone` decides the contrast pairing so no caller can
// accidentally put light text on a light background.
type Tone = 'light' | 'dark';

export default function Card({
  children,
  tone = 'light',
  className = '',
}: {
  children: ReactNode;
  tone?: Tone;
  className?: string;
}) {
  const toneClasses =
    tone === 'dark'
      ? 'bg-navy border-brass/25 text-cream'
      : 'bg-white border-slate-200 text-navy';

  return (
    <div className={`border p-6 ${toneClasses} ${className}`}>{children}</div>
  );
}

export function CardTitle({
  children,
  tone = 'light',
}: {
  children: ReactNode;
  tone?: Tone;
}) {
  return (
    <h3
      className={`font-serif text-lg ${tone === 'dark' ? 'text-cream' : 'text-navy'}`}
    >
      {children}
    </h3>
  );
}

export function StatCard({
  label,
  value,
  tone = 'light',
}: {
  label: string;
  value: string | number;
  tone?: Tone;
}) {
  return (
    <Card tone={tone}>
      <p
        className={`font-serif text-3xl ${tone === 'dark' ? 'text-brass-bright' : 'text-navy'}`}
      >
        {value}
      </p>
      <p
        className={`mt-1 text-xs font-semibold uppercase tracking-wide ${
          tone === 'dark' ? 'text-cream/60' : 'text-slate-500'
        }`}
      >
        {label}
      </p>
    </Card>
  );
}
