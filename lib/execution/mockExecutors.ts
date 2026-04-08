import type { ToolExecutionInput, ToolExecutionResult, ToolExecutionRowResult } from '@/lib/tools/types';

function nowIso() {
  return new Date().toISOString();
}

function pickOutcome(i: number): ToolExecutionRowResult['outcome'] {
  // Deterministic-ish outcomes for demo purposes.
  if (i % 13 === 0) return 'failed';
  if (i % 7 === 0) return 'skipped';
  return 'success';
}

function buildResult(args: { total: number; rows: ToolExecutionRowResult[] }): ToolExecutionResult {
  const { total, rows } = args;
  const success = rows.filter((r) => r.outcome === 'success').length;
  const failed = rows.filter((r) => r.outcome === 'failed').length;
  const skipped = rows.filter((r) => r.outcome === 'skipped').length;
  const status: ToolExecutionResult['status'] =
    failed === 0 ? 'success' : success > 0 ? 'partial_success' : 'failed';

  const startedAt = nowIso();
  const finishedAt = nowIso();
  return {
    status,
    startedAt,
    finishedAt,
    summary: { total, success, failed, skipped },
    rows
  };
}

async function simulateLatency(ms: number) {
  await new Promise((r) => setTimeout(r, ms));
}

export async function executeAddUserTags(input: ToolExecutionInput): Promise<ToolExecutionResult> {
  await simulateLatency(500);
  const rows = (input.csv?.rows ?? []).map((row, i) => {
    const outcome = pickOutcome(i + 1);
    const tags = String(row.tags ?? '')
      .split('|')
      .map((t) => t.trim())
      .filter(Boolean);
    return {
      rowIndex: i,
      outcome,
      message:
        outcome === 'success'
          ? `Added ${tags.length} tag(s) to user ${row.userId}`
          : outcome === 'skipped'
            ? `No-op for user ${row.userId} (already tagged)`
            : `Failed to add tags for user ${row.userId}`,
      data: { userId: row.userId, tagsAdded: tags.join('|'), message: '' }
    } satisfies ToolExecutionRowResult;
  });
  return buildResult({ total: rows.length, rows });
}

export async function executeAssignUserToProject(input: ToolExecutionInput): Promise<ToolExecutionResult> {
  await simulateLatency(650);
  const rows = (input.csv?.rows ?? []).map((row, i) => {
    const outcome = pickOutcome(i + 1);
    const role = String(row.role ?? 'member') || 'member';
    return {
      rowIndex: i,
      outcome,
      message:
        outcome === 'success'
          ? `Assigned user ${row.userId} to project ${row.projectId} as ${role}`
          : outcome === 'skipped'
            ? `User ${row.userId} already in project ${row.projectId}`
            : `Failed to assign user ${row.userId} to project ${row.projectId}`,
      data: { userId: row.userId, projectId: row.projectId, role }
    } satisfies ToolExecutionRowResult;
  });
  return buildResult({ total: rows.length, rows });
}

export async function executeRemoveUserFromProject(input: ToolExecutionInput): Promise<ToolExecutionResult> {
  await simulateLatency(650);
  const rows = (input.csv?.rows ?? []).map((row, i) => {
    const outcome = pickOutcome(i + 1);
    return {
      rowIndex: i,
      outcome,
      message:
        outcome === 'success'
          ? `Removed user ${row.userId} from project ${row.projectId}`
          : outcome === 'skipped'
            ? `User ${row.userId} was not in project ${row.projectId}`
            : `Failed to remove user ${row.userId} from project ${row.projectId}`,
      data: { userId: row.userId, projectId: row.projectId }
    } satisfies ToolExecutionRowResult;
  });
  return buildResult({ total: rows.length, rows });
}

export async function executeTaskPriorityTagging(input: ToolExecutionInput): Promise<ToolExecutionResult> {
  await simulateLatency(700);
  const mode = String(input.fields.mode ?? 'set');
  const rows = (input.csv?.rows ?? []).map((row, i) => {
    const outcome = pickOutcome(i + 1);
    const priority = String(row.priority ?? '');
    return {
      rowIndex: i,
      outcome,
      message:
        outcome === 'success'
          ? mode === 'tag'
            ? `Added priority tag ${priority} to task ${row.taskId}`
            : `Set task ${row.taskId} priority to ${priority}`
          : outcome === 'skipped'
            ? `Task ${row.taskId} already had priority ${priority}`
            : `Failed to tag task ${row.taskId}`,
      data: { taskId: row.taskId, priority }
    } satisfies ToolExecutionRowResult;
  });
  return buildResult({ total: rows.length, rows });
}

export async function executeUpdateTaskState(input: ToolExecutionInput): Promise<ToolExecutionResult> {
  await simulateLatency(800);
  const rows = (input.csv?.rows ?? []).map((row, i) => {
    const outcome = pickOutcome(i + 1);
    const newState = String(row.state ?? '');
    return {
      rowIndex: i,
      outcome,
      message:
        outcome === 'success'
          ? `Updated task ${row.taskId} to state ${newState}`
          : outcome === 'skipped'
            ? `Task ${row.taskId} already in state ${newState}`
            : `Failed to update task ${row.taskId}`,
      data: { taskId: row.taskId, newState }
    } satisfies ToolExecutionRowResult;
  });
  return buildResult({ total: rows.length, rows });
}

export async function runMockExecution(args: { toolId: string; input: ToolExecutionInput }): Promise<ToolExecutionResult> {
  const { toolId, input } = args;
  switch (toolId) {
    case 'add-user-tags':
      return executeAddUserTags(input);
    case 'assign-user-to-project':
      return executeAssignUserToProject(input);
    case 'remove-user-from-project':
      return executeRemoveUserFromProject(input);
    case 'task-priority-tagging':
      return executeTaskPriorityTagging(input);
    case 'update-task-state':
      return executeUpdateTaskState(input);
    default:
      await simulateLatency(300);
      return buildResult({
        total: input.csv?.rows.length ?? 0,
        rows: (input.csv?.rows ?? []).map((_, i) => ({
          rowIndex: i,
          outcome: 'failed',
          message: `Unknown tool id '${toolId}'.`
        }))
      });
  }
}

