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
    <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm ring-1 ring-slate-900/5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <div className="text-xs font-medium uppercase tracking-wide text-slate-500">Last run</div>
          <div className="mt-1 text-sm text-slate-700">
            Started <span className="font-medium text-slate-900">{formatDateTime(result.startedAt)}</span>
            {typeof result.durationMs === 'number' ? (
              <>
                {' '}
                · Duration <span className="font-medium text-slate-900">{formatDurationMs(result.durationMs)}</span>
              </>
            ) : null}
          </div>
        </div>
        <Badge tone={statusTone(result.status)}>{statusLabel(result.status)}</Badge>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
        <div className="rounded-md border border-slate-100 bg-slate-50 p-3">
          <div className="text-xs font-medium text-slate-600">Total rows</div>
          <div className="mt-1 text-lg font-semibold tabular-nums text-slate-900">{result.summary.total}</div>
        </div>
        <div className="rounded-md border border-emerald-100 bg-emerald-50/60 p-3">
          <div className="text-xs font-medium text-emerald-800">Succeeded</div>
          <div className="mt-1 text-lg font-semibold tabular-nums text-emerald-900">{result.summary.success}</div>
        </div>
        <div className="rounded-md border border-rose-100 bg-rose-50/60 p-3">
          <div className="text-xs font-medium text-rose-800">Failed</div>
          <div className="mt-1 text-lg font-semibold tabular-nums text-rose-900">{result.summary.failed}</div>
        </div>
        <div className="rounded-md border border-amber-100 bg-amber-50/60 p-3">
          <div className="text-xs font-medium text-amber-900">Skipped</div>
          <div className="mt-1 text-lg font-semibold tabular-nums text-amber-950">{result.summary.skipped}</div>
        </div>
      </div>

      <p className="mt-4 text-xs leading-relaxed text-slate-500">
        Use the row table below to filter by outcome and export a CSV for ticketing or follow-up with owners.
      </p>
    </div>
  );
}
