import type { ExecutionHistoryRecord } from '@/lib/storage/historyStore';
import Link from 'next/link';
import { Badge } from '@/components/common/Badge';
import { EmptyState } from '@/components/common/EmptyState';
import { formatDateTime, formatDurationMs } from '@/lib/format/datetime';

function statusTone(s: ExecutionHistoryRecord['status']): 'success' | 'warning' | 'danger' {
  if (s === 'success') return 'success';
  if (s === 'partial_success') return 'warning';
  return 'danger';
}

function statusLabel(s: ExecutionHistoryRecord['status']) {
  if (s === 'success') return 'OK';
  if (s === 'partial_success') return 'Partial';
  return 'Failed';
}

export function HistoryTable({ items }: { items: ExecutionHistoryRecord[] }) {
  if (items.length === 0) {
    return (
      <EmptyState
        title="No matching runs"
        description="Try a different search or status filter. Clearing filters shows the full list again."
      />
    );
  }

  return (
    <div className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm ring-1 ring-slate-900/5">
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="bg-slate-50 text-left text-xs font-semibold uppercase tracking-wide text-slate-600">
            <tr>
              <th scope="col" className="whitespace-nowrap px-4 py-3">
                When
              </th>
              <th scope="col" className="px-4 py-3">
                Tool
              </th>
              <th scope="col" className="px-4 py-3">
                CSV
              </th>
              <th scope="col" className="whitespace-nowrap px-4 py-3">
                Rows
              </th>
              <th scope="col" className="whitespace-nowrap px-4 py-3">
                Status
              </th>
              <th scope="col" className="whitespace-nowrap px-4 py-3">
                Outcome
              </th>
              <th scope="col" className="whitespace-nowrap px-4 py-3">
                Duration
              </th>
              <th scope="col" className="whitespace-nowrap px-4 py-3">
                Auth
              </th>
              <th scope="col" className="whitespace-nowrap px-4 py-3">
                Details
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {items.map((h) => (
              <tr key={h.id} className="hover:bg-slate-50/80">
                <td className="whitespace-nowrap px-4 py-3 text-slate-700">{formatDateTime(h.timestamp)}</td>
                <td className="px-4 py-3">
                  <Link className="font-medium text-sky-800 hover:text-sky-950 hover:underline" href={`/tools/${h.toolId}`}>
                    {h.toolName}
                  </Link>
                  <div className="font-mono text-xs text-slate-500">{h.toolId}</div>
                </td>
                <td className="max-w-[10rem] truncate px-4 py-3 font-mono text-xs text-slate-700" title={h.csvFilename ?? ''}>
                  {h.csvFilename ?? '—'}
                </td>
                <td className="whitespace-nowrap px-4 py-3 tabular-nums text-slate-800">{h.rowCount ?? '—'}</td>
                <td className="whitespace-nowrap px-4 py-3">
                  <Badge tone={statusTone(h.status)}>{statusLabel(h.status)}</Badge>
                </td>
                <td className="whitespace-nowrap px-4 py-3 text-xs text-slate-700">
                  <span className="font-medium text-emerald-800">{h.resultSummary.success}</span>
                  <span className="text-slate-400"> / </span>
                  <span>{h.resultSummary.total}</span>
                  <span className="text-slate-400"> ok · </span>
                  <span className="font-medium text-rose-800">{h.resultSummary.failed}</span>
                  <span className="text-slate-400"> fail · </span>
                  <span className="font-medium text-amber-900">{h.resultSummary.skipped}</span>
                  <span className="text-slate-400"> skip</span>
                </td>
                <td className="whitespace-nowrap px-4 py-3 text-xs text-slate-600">{formatDurationMs(h.durationMs)}</td>
                <td className="whitespace-nowrap px-4 py-3 text-xs text-slate-700">{h.auth.apiKeyUsed ? 'Yes' : 'No'}</td>
                <td className="whitespace-nowrap px-4 py-3">
                  <Link
                    className="font-medium text-sky-800 hover:text-sky-950 hover:underline"
                    href={`/history/${h.id}`}
                  >
                    View
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
