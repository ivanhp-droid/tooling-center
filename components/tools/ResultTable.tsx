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
        <div className="flex flex-wrap items-center gap-2 text-xs text-ink-secondary">
          <span className="font-medium text-ink">Showing</span>
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
            className="rounded-md border border-border bg-surface px-2 py-1.5 text-xs font-medium text-ink shadow-card focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
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
            className="rounded-md border border-border bg-surface px-3 py-1.5 text-xs font-medium text-ink hover:bg-canvas-muted"
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

      <div className="overflow-x-auto rounded-md border border-border">
        <table className="min-w-full text-sm">
          <thead className="bg-canvas-muted text-left text-xs font-semibold uppercase tracking-wide text-ink-secondary">
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
          <tbody className="divide-y divide-border-subtle">
            {filteredRows.length === 0 ? (
              <tr>
                <td className="px-3 py-6 text-center text-sm text-ink-muted" colSpan={columns.length + 3}>
                  No rows match this filter. Choose “All outcomes” or pick another outcome.
                </td>
              </tr>
            ) : null}
            {filteredRows.map((r, idx) => (
              <tr key={`${r.rowIndex}-${idx}`} className="hover:bg-canvas-muted/80">
                <td className="whitespace-nowrap px-3 py-2 tabular-nums text-ink-muted">{r.rowIndex + 1}</td>
                <td className="whitespace-nowrap px-3 py-2">
                  <span
                    className={cn(
                      'inline-flex rounded-md px-2 py-0.5 text-xs font-semibold',
                      r.outcome === 'success' && 'bg-success-soft text-success-text',
                      r.outcome === 'failed' && 'bg-danger-soft text-danger',
                      r.outcome === 'skipped' && 'bg-warning-soft text-warning-text'
                    )}
                  >
                    {r.outcome}
                  </span>
                </td>
                {columns.map((c) => (
                  <td key={c.key} className="max-w-[14rem] truncate px-3 py-2 font-mono text-xs text-ink" title={String((r.data as Record<string, unknown> | undefined)?.[c.key] ?? '')}>
                    {String((r.data as Record<string, unknown> | undefined)?.[c.key] ?? '')}
                  </td>
                ))}
                <td className="px-3 py-2 text-ink-secondary">{r.message ?? '—'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
