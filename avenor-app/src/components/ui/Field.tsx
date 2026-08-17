import type { ReactNode } from 'react';

export function Label({
  htmlFor,
  children,
}: {
  htmlFor?: string;
  children: ReactNode;
}) {
  return (
    <label
      htmlFor={htmlFor}
      className="block text-xs font-semibold uppercase tracking-wide text-slate-600"
    >
      {children}
    </label>
  );
}

export function TextInput({
  id,
  type = 'text',
  required,
  value,
  onChange,
  placeholder,
  autoComplete,
  minLength,
}: {
  id: string;
  type?: string;
  required?: boolean;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  autoComplete?: string;
  minLength?: number;
}) {
  return (
    <input
      id={id}
      type={type}
      required={required}
      value={value}
      minLength={minLength}
      autoComplete={autoComplete}
      placeholder={placeholder}
      onChange={(e) => onChange(e.target.value)}
      className="mt-1 w-full border border-slate-300 bg-white px-3 py-2.5 text-sm text-navy placeholder:text-slate-400 focus:border-brass focus:outline-none"
    />
  );
}

export function Select({
  id,
  value,
  onChange,
  options,
  placeholder,
}: {
  id: string;
  value: string;
  onChange: (v: string) => void;
  options: readonly string[];
  placeholder?: string;
}) {
  return (
    <select
      id={id}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="mt-1 w-full border border-slate-300 bg-white px-3 py-2.5 text-sm text-navy focus:border-brass focus:outline-none"
    >
      {placeholder && <option value="">{placeholder}</option>}
      {options.map((o) => (
        <option key={o} value={o}>
          {o}
        </option>
      ))}
    </select>
  );
}

export function FormError({ message }: { message: string | null }) {
  if (!message) return null;
  return <p className="text-sm text-rose-600">{message}</p>;
}
