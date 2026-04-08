import type { ToolDefinition, ToolExecutionResult } from '@/lib/tools/types';
import { Card } from '@/components/common/Card';
import { useMemo, useState } from 'react';

function toCsvValue(v: unknown) {
  const s = v === null || v === undefined ? '' : String(v);
  if (s.includes('"') || s.includes(',') || s.includes('\n')) return `"${s.replaceAll('"', '""')}"`;
  return s;
}

function downloadTextFile(args: { filename: string; content: string; contentType?: string }) {
  const blob = new Blob([args.content], { type: args.contentType ?? 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = args.filename;
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 2500);
}

export function ResultTable(props: { tool: ToolDefinition; result: ToolExecutionResult }) {
  const { tool, result } = props;
  const columns = tool.output.columns;
  const [filter, setFilter] = useState<'all' | 'success' | 'failed' | 'skipped'>('all');

  const filteredRows = useMemo(() => {
    if (filter === 'all') return result.rows;
    return result.rows.filter((r) => r.outcome === filter);
  }, [filter, result.rows]);

  return (
    <Card
      title="Row Results"
      subtitle={
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="text-xs text-slate-600">
            Showing {filteredRows.length} / {result.rows.length}
          </div>
          <div className="flex items-center gap-2">
            <label className="text-xs text-slate-600">
              Filter:{' '}
              <select
                className="rounded border border-slate-300 bg-white px-2 py-1 text-xs"
                value={filter}
                onChange={(e) => setFilter(e.target.value as any)}
              >
                <option value="all">All</option>
                <option value="success">Success</option>
                <option value="failed">Failed</option>
                <option value="skipped">Skipped</option>
              </select>
            </label>
            <button
              className="rounded border border-slate-300 bg-white px-2 py-1 text-xs hover:bg-slate-50"
              onClick={() => {
                const header = ['row_number', 'outcome', ...columns.map((c) => c.key), 'message'];
                const lines = [header.join(',')];
                for (const r of result.rows) {
                  const values = [
                    r.rowIndex + 1,
                    r.outcome,
                    ...columns.map((c) => (r.data as any)?.[c.key] ?? ''),
                    r.message ?? ''
                  ].map(toCsvValue);
                  lines.push(values.join(','));
                }
                downloadTextFile({
                  filename: `${tool.id}.results.csv`,
                  content: lines.join('\n'),
                  contentType: 'text/csv;charset=utf-8'
                });
              }}
            >
              Download results CSV
            </button>
          </div>
        </div>
      }
    >
      <div className="overflow-auto">
        <table className="min-w-full text-sm">
          <thead className="text-left text-gray-600">
            <tr>
              <th className="py-2 pr-4">#</th>
              <th className="py-2 pr-4">Outcome</th>
              {columns.map((c) => (
                <th key={c.key} className="py-2 pr-4">
                  {c.label}
                </th>
              ))}
              <th className="py-2 pr-4">Message</th>
            </tr>
          </thead>
          <tbody>
            {filteredRows.length === 0 ? (
              <tr className="border-t">
                <td className="py-3 pr-4 text-gray-500" colSpan={columns.length + 3}>
                  No rows match this filter.
                </td>
              </tr>
            ) : null}
            {filteredRows.map((r) => (
              <tr key={r.rowIndex} className="border-t">
                <td className="py-2 pr-4 text-gray-500">{r.rowIndex + 1}</td>
                <td className="py-2 pr-4">
                  <span
                    className={
                      r.outcome === 'success'
                        ? 'text-green-700'
                        : r.outcome === 'failed'
                          ? 'text-red-700'
                          : 'text-amber-700'
                    }
                  >
                    {r.outcome}
                  </span>
                </td>
                {columns.map((c) => (
                  <td key={c.key} className="py-2 pr-4">
                    {String((r.data as any)?.[c.key] ?? '')}
                  </td>
                ))}
                <td className="py-2 pr-4">{r.message ?? ''}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}

