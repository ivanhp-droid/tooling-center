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
    <div className="overflow-hidden rounded-lg border border-border bg-surface shadow-card">
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="bg-canvas-muted text-left text-xs font-semibold uppercase tracking-wide text-ink-secondary">
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
          <tbody className="divide-y divide-border-subtle">
            {items.map((h) => (
              <tr key={h.id} className="hover:bg-canvas-muted/80">
                <td className="whitespace-nowrap px-4 py-3 text-ink-secondary">{formatDateTime(h.timestamp)}</td>
                <td className="px-4 py-3">
                  <Link className="font-medium text-accent hover:text-accent-hover hover:underline" href={`/tools/${h.toolId}`}>
                    {h.toolName}
                  </Link>
                  <div className="font-mono text-xs text-ink-muted">{h.toolId}</div>
                </td>
                <td className="max-w-[10rem] truncate px-4 py-3 font-mono text-xs text-ink-secondary" title={h.csvFilename ?? ''}>
                  {h.csvFilename ?? '—'}
                </td>
                <td className="whitespace-nowrap px-4 py-3 tabular-nums text-ink">{h.rowCount ?? '—'}</td>
                <td className="whitespace-nowrap px-4 py-3">
                  <Badge tone={statusTone(h.status)}>{statusLabel(h.status)}</Badge>
                </td>
                <td className="whitespace-nowrap px-4 py-3 text-xs text-ink-secondary">
                  <span className="font-medium text-success-text">{h.resultSummary.success}</span>
                  <span className="text-ink-faint"> / </span>
                  <span>{h.resultSummary.total}</span>
                  <span className="text-ink-faint"> ok · </span>
                  <span className="font-medium text-danger">{h.resultSummary.failed}</span>
                  <span className="text-ink-faint"> fail · </span>
                  <span className="font-medium text-warning-text">{h.resultSummary.skipped}</span>
                  <span className="text-ink-faint"> skip</span>
                </td>
                <td className="whitespace-nowrap px-4 py-3 text-xs text-ink-secondary">{formatDurationMs(h.durationMs)}</td>
                <td className="whitespace-nowrap px-4 py-3 text-xs text-ink-secondary">{h.auth.apiKeyUsed ? 'Yes' : 'No'}</td>
                <td className="whitespace-nowrap px-4 py-3">
                  <Link
                    className="font-medium text-accent hover:text-accent-hover hover:underline"
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
