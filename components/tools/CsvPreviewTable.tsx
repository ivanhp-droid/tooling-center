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
      <div className="overflow-x-auto rounded-md border border-slate-200">
        <table className="min-w-full text-xs sm:text-sm">
          <thead className="bg-slate-50 text-left text-xs font-semibold uppercase tracking-wide text-slate-600">
            <tr>
              {headers.map((h) => (
                <th key={h} scope="col" className="whitespace-nowrap px-2 py-2 sm:px-3">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {shown.map((row, idx) => (
              <tr key={idx} className="hover:bg-slate-50/80">
                {headers.map((h) => (
                  <td key={h} className="max-w-[12rem] truncate px-2 py-2 align-top font-mono text-xs text-slate-800 sm:px-3 sm:text-sm" title={row[h] ?? ''}>
                    {row[h] ?? ''}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {hidden > 0 ? (
        <p className="mt-2 text-xs text-slate-500">
          {hidden} more row{hidden === 1 ? '' : 's'} not shown in preview — validation still covers the full file.
        </p>
      ) : null}
    </Card>
  );
}
