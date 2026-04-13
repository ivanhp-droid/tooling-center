import type { ToolExecutionResult } from '@/lib/tools/types';
import { Badge } from '@/components/common/Badge';
import { formatDateTime, formatDurationMs } from '@/lib/format/datetime';

function statusTone(status: ToolExecutionResult['status']): 'success' | 'warning' | 'danger' {
  if (status === 'success') return 'success';
  if (status === 'partial_success') return 'warning';
  return 'danger';
}

function statusLabel(status: ToolExecutionResult['status']) {
  if (status === 'success') return 'All rows processed';
  if (status === 'partial_success') return 'Partial — review failures';
  return 'Run failed — no successful rows';
}

export function ExecutionSummary({ result }: { result: ToolExecutionResult }) {
  return (
    <div className="rounded-lg border border-border bg-surface p-5 shadow-card">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <div className="text-xs font-medium uppercase tracking-wide text-ink-muted">Last run</div>
          <div className="mt-1 text-sm text-ink-secondary">
            Started <span className="font-medium text-ink">{formatDateTime(result.startedAt)}</span>
            {typeof result.durationMs === 'number' ? (
              <>
                {' '}
                · Duration <span className="font-medium text-ink">{formatDurationMs(result.durationMs)}</span>
              </>
            ) : null}
          </div>
        </div>
        <Badge tone={statusTone(result.status)}>{statusLabel(result.status)}</Badge>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
        <div className="rounded-md border border-border-subtle bg-canvas-muted p-3">
          <div className="text-xs font-medium text-ink-secondary">Total rows</div>
          <div className="mt-1 text-lg font-semibold tabular-nums text-ink">{result.summary.total}</div>
        </div>
        <div className="rounded-md border border-success-border bg-success-soft p-3">
          <div className="text-xs font-medium text-success-text">Succeeded</div>
          <div className="mt-1 text-lg font-semibold tabular-nums text-success-text">{result.summary.success}</div>
        </div>
        <div className="rounded-md border border-danger-border bg-danger-soft p-3">
          <div className="text-xs font-medium text-danger">Failed</div>
          <div className="mt-1 text-lg font-semibold tabular-nums text-danger">{result.summary.failed}</div>
        </div>
        <div className="rounded-md border border-warning-border bg-warning-soft p-3">
          <div className="text-xs font-medium text-warning-text">Skipped</div>
          <div className="mt-1 text-lg font-semibold tabular-nums text-warning-text">{result.summary.skipped}</div>
        </div>
      </div>

      <p className="mt-4 text-xs leading-relaxed text-ink-muted">
        Use the row table below to filter by outcome and export a CSV for ticketing or follow-up with owners.
      </p>
    </div>
  );
}
