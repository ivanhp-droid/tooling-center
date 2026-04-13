import { Card } from '@/components/common/Card';

export function CsvPreviewTable(props: { headers: string[]; rows: Record<string, string>[]; maxRows?: number }) {
  const { headers, rows, maxRows = 50 } = props;
  if (headers.length === 0) return null;

  const shown = rows.slice(0, maxRows);
  const hidden = Math.max(0, rows.length - shown.length);

  return (
    <Card
      title="Preview"
      subtitle={`First ${shown.length} row(s) for a quick sanity check. Full file is still used at run time.`}
    >
      <div className="overflow-x-auto rounded-md border border-border">
        <table className="min-w-full text-xs sm:text-sm">
          <thead className="bg-canvas-muted text-left text-xs font-semibold uppercase tracking-wide text-ink-secondary">
            <tr>
              {headers.map((h) => (
                <th key={h} scope="col" className="whitespace-nowrap px-2 py-2 sm:px-3">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-border-subtle">
            {shown.map((row, idx) => (
              <tr key={idx} className="hover:bg-canvas-muted/80">
                {headers.map((h) => (
                  <td key={h} className="max-w-[12rem] truncate px-2 py-2 align-top font-mono text-xs text-ink sm:px-3 sm:text-sm" title={row[h] ?? ''}>
                    {row[h] ?? ''}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {hidden > 0 ? (
        <p className="mt-2 text-xs text-ink-muted">
          {hidden} more row{hidden === 1 ? '' : 's'} not shown in preview — validation still covers the full file.
        </p>
      ) : null}
    </Card>
  );
}
