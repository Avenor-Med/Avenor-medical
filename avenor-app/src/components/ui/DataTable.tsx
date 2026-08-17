import type { ReactNode } from 'react';

// Dashboard table. Wrapper and rows share one dark palette — the light-wrapper
// / light-text mismatch that caused invisible text is structurally impossible
// here because both come from this component.

export type Column<T> = {
  key: string;
  header: string;
  render: (row: T) => ReactNode;
  align?: 'left' | 'right';
};

export default function DataTable<T>({
  columns,
  rows,
  empty = 'Nothing here yet.',
  onRowClick,
}: {
  columns: Column<T>[];
  rows: T[];
  empty?: string;
  onRowClick?: (row: T) => void;
}) {
  if (rows.length === 0) {
    return (
      <div className="border border-brass/20 bg-navy p-8 text-center text-sm text-cream/60">
        {empty}
      </div>
    );
  }

  return (
    <div className="overflow-x-auto border border-brass/20 bg-navy">
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr>
            {columns.map((c) => (
              <th
                key={c.key}
                className={`bg-navy-mid/50 px-4 py-3 text-[11px] font-semibold uppercase tracking-wider text-brass-bright ${
                  c.align === 'right' ? 'text-right' : 'text-left'
                }`}
              >
                {c.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr
              key={i}
              onClick={onRowClick ? () => onRowClick(row) : undefined}
              className={`border-t border-brass/10 text-cream/90 ${
                onRowClick ? 'cursor-pointer hover:bg-brass/10' : ''
              }`}
            >
              {columns.map((c) => (
                <td
                  key={c.key}
                  className={`px-4 py-3 ${c.align === 'right' ? 'text-right' : ''}`}
                >
                  {c.render(row)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
