import type { ToolExecutionResult } from '@/lib/tools/types';

export function ExecutionSummary({ result }: { result: ToolExecutionResult }) {
  return (
    <div className="rounded border bg-white p-4">
      <div className="flex items-center justify-between">
        <div className="text-sm text-slate-600">Execution status</div>
        <div
          className={[
            'rounded px-2 py-1 text-xs font-semibold',
            result.status === 'success'
              ? 'bg-emerald-50 text-emerald-700'
              : result.status === 'partial_success'
                ? 'bg-amber-50 text-amber-700'
                : 'bg-rose-50 text-rose-700'
          ].join(' ')}
        >
          {result.status}
        </div>
      </div>

      <div className="mt-3 grid grid-cols-4 gap-2 text-sm">
        <div className="rounded bg-slate-50 p-2">
          <div className="text-xs text-slate-600">Total</div>
          <div className="font-semibold">{result.summary.total}</div>
        </div>
        <div className="rounded bg-slate-50 p-2">
          <div className="text-xs text-slate-600">Success</div>
          <div className="font-semibold">{result.summary.success}</div>
        </div>
        <div className="rounded bg-slate-50 p-2">
          <div className="text-xs text-slate-600">Failed</div>
          <div className="font-semibold">{result.summary.failed}</div>
        </div>
        <div className="rounded bg-slate-50 p-2">
          <div className="text-xs text-slate-600">Skipped</div>
          <div className="font-semibold">{result.summary.skipped}</div>
        </div>
      </div>

      <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-600">
        <div>
          {new Date(result.startedAt).toLocaleString()} → {new Date(result.finishedAt).toLocaleString()}
        </div>
        <div>{typeof result.durationMs === 'number' ? `${result.durationMs}ms` : null}</div>
      </div>
    </div>
  );
}

