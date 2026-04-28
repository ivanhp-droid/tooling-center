import type { ToolExecutionResult, ToolExecutionRowResult } from '@/lib/tools/types';

function countRows(rows: ToolExecutionRowResult[]) {
  const success = rows.filter((row) => row.outcome === 'success').length;
  const failed = rows.filter((row) => row.outcome === 'failed').length;
  const skipped = rows.filter((row) => row.outcome === 'skipped').length;
  return { success, failed, skipped };
}

export function buildToolExecutionResult(args: {
  rows: ToolExecutionRowResult[];
  startedAt: string;
  finishedAt: string;
}): ToolExecutionResult {
  const { rows, startedAt, finishedAt } = args;
  const { success, failed, skipped } = countRows(rows);
  const status: ToolExecutionResult['status'] =
    failed === 0 ? 'success' : success > 0 ? 'partial_success' : 'failed';

  return {
    status,
    startedAt,
    finishedAt,
    durationMs: Math.max(0, new Date(finishedAt).getTime() - new Date(startedAt).getTime()),
    summary: {
      total: rows.length,
      success,
      failed,
      skipped
    },
    rows
  };
}

