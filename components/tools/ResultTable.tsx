import type { ToolDefinition, ToolExecutionResult } from '@/lib/tools/types';
import { Card } from '@/components/common/Card';
import { useMemo, useState } from 'react';
import { Badge } from '@/components/common/Badge';
import { cn } from '@/lib/utils/cn';

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

type OutcomeFilter = 'all' | 'success' | 'failed' | 'skipped';

export function ResultTable(props: { tool: ToolDefinition; result: ToolExecutionResult }) {
  const { tool, result } = props;
  const columns = tool.output.columns;
  const [filter, setFilter] = useState<OutcomeFilter>('all');

  const filteredRows = useMemo(() => {
    if (filter === 'all') return result.rows;
    return result.rows.filter((r) => r.outcome === filter);
  }, [filter, result.rows]);

  return (
    <Card
      title="Row-level results"
      subtitle="Filter by outcome and download a CSV to attach to an incident or handoff."
    >
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap items-center gap-2 text-xs text-slate-600">
          <span className="font-medium text-slate-800">Showing</span>
          <Badge tone="neutral">
            {filteredRows.length} / {result.rows.length} rows
          </Badge>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <label htmlFor="result-outcome-filter" className="sr-only">
            Filter by outcome
          </label>
          <select
            id="result-outcome-filter"
            className="rounded-md border border-slate-300 bg-white px-2 py-1.5 text-xs font-medium text-slate-900 shadow-sm focus:border-slate-900 focus:outline-none focus:ring-1 focus:ring-slate-900"
            value={filter}
            onChange={(e) => setFilter(e.target.value as OutcomeFilter)}
          >
            <option value="all">All outcomes</option>
            <option value="success">Succeeded</option>
            <option value="failed">Failed</option>
            <option value="skipped">Skipped</option>
          </select>
          <button
            type="button"
            className="rounded-md border border-slate-300 bg-white px-3 py-1.5 text-xs font-medium text-slate-900 hover:bg-slate-50"
            onClick={() => {
              const header = ['row_number', 'outcome', ...columns.map((c) => c.key), 'message'];
              const lines = [header.join(',')];
              for (const r of result.rows) {
                const values = [
                  r.rowIndex + 1,
                  r.outcome,
                  ...columns.map((c) => (r.data as Record<string, unknown> | undefined)?.[c.key] ?? ''),
                  r.message ?? ''
                ].map(toCsvValue);
                lines.push(values.join(','));
              }
              downloadTextFile({
                filename: `${tool.id}-results.csv`,
                content: lines.join('\n'),
                contentType: 'text/csv;charset=utf-8'
              });
            }}
          >
            Download CSV
          </button>
        </div>
      </div>

      <div className="overflow-x-auto rounded-md border border-slate-200">
        <table className="min-w-full text-sm">
          <thead className="bg-slate-50 text-left text-xs font-semibold uppercase tracking-wide text-slate-600">
            <tr>
              <th scope="col" className="whitespace-nowrap px-3 py-2.5">
                #
              </th>
              <th scope="col" className="whitespace-nowrap px-3 py-2.5">
                Outcome
              </th>
              {columns.map((c) => (
                <th key={c.key} scope="col" className="whitespace-nowrap px-3 py-2.5">
                  {c.label}
                </th>
              ))}
              <th scope="col" className="min-w-[12rem] px-3 py-2.5">
                Message
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filteredRows.length === 0 ? (
              <tr>
                <td className="px-3 py-6 text-center text-sm text-slate-500" colSpan={columns.length + 3}>
                  No rows match this filter. Choose “All outcomes” or pick another outcome.
                </td>
              </tr>
            ) : null}
            {filteredRows.map((r) => (
              <tr key={r.rowIndex} className="hover:bg-slate-50/80">
                <td className="whitespace-nowrap px-3 py-2 tabular-nums text-slate-500">{r.rowIndex + 1}</td>
                <td className="whitespace-nowrap px-3 py-2">
                  <span
                    className={cn(
                      'inline-flex rounded-md px-2 py-0.5 text-xs font-semibold',
                      r.outcome === 'success' && 'bg-emerald-50 text-emerald-800',
                      r.outcome === 'failed' && 'bg-rose-50 text-rose-800',
                      r.outcome === 'skipped' && 'bg-amber-50 text-amber-900'
                    )}
                  >
                    {r.outcome}
                  </span>
                </td>
                {columns.map((c) => (
                  <td key={c.key} className="max-w-[14rem] truncate px-3 py-2 font-mono text-xs text-slate-800" title={String((r.data as Record<string, unknown> | undefined)?.[c.key] ?? '')}>
                    {String((r.data as Record<string, unknown> | undefined)?.[c.key] ?? '')}
                  </td>
                ))}
                <td className="px-3 py-2 text-slate-700">{r.message ?? '—'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
