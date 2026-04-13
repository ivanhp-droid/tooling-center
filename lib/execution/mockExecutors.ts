import type { ToolExecutionInput, ToolExecutionResult, ToolExecutionRowResult } from '@/lib/tools/types';
import { classifyApiKey } from '@/lib/storage/apiKeyStore';

function nowIso() {
  return new Date().toISOString();
}

function buildResult(args: { total: number; rows: ToolExecutionRowResult[]; startedAt: string; finishedAt: string }): ToolExecutionResult {
  const { total, rows } = args;
  const success = rows.filter((r) => r.outcome === 'success').length;
  const failed = rows.filter((r) => r.outcome === 'failed').length;
  const skipped = rows.filter((r) => r.outcome === 'skipped').length;
  const status: ToolExecutionResult['status'] =
    failed === 0 ? 'success' : success > 0 ? 'partial_success' : 'failed';

  const { startedAt, finishedAt } = args;
  const durationMs = Math.max(0, new Date(finishedAt).getTime() - new Date(startedAt).getTime());
  return {
    status,
    startedAt,
    finishedAt,
    durationMs,
    summary: { total, success, failed, skipped },
    rows
  };
}

async function simulateLatency(ms: number) {
  await new Promise((r) => setTimeout(r, ms));
}

function isAuthBad(apiKey?: string) {
  return classifyApiKey(apiKey) !== 'ok';
}

function makeAuthFailure(total: number): ToolExecutionResult {
  const startedAt = nowIso();
  const finishedAt = nowIso();
  const rows: ToolExecutionRowResult[] = Array.from({ length: total }).map((_, i) => ({
    rowIndex: i,
    outcome: 'failed',
    message: 'Authentication failed (mock): API key rejected.'
  }));
  return buildResult({ total, rows, startedAt, finishedAt });
}

function keyOf(row: Record<string, string>, keys: string[]) {
  return keys.map((k) => (row[k] ?? '').trim()).join('::');
}

export async function executeAddUserTags(input: ToolExecutionInput): Promise<ToolExecutionResult> {
  const startedAt = nowIso();
  await simulateLatency(450);
  const csvRows = input.csv?.rows ?? [];
  if (isAuthBad(input.apiKey)) return makeAuthFailure(csvRows.length);

  const seen = new Set<string>();
  const mode = String(input.fields.mode ?? 'merge');

  const rows = csvRows.map((row, i) => {
    const userId = String(row.user_id ?? '').trim();
    const tag = String(row.tag ?? '').trim();
    const k = `${userId}::${tag}`;
    if (seen.has(k)) {
      return {
        rowIndex: i,
        outcome: 'skipped',
        message: 'Duplicate row in CSV; skipping.',
        data: { user_id: userId, tag, action: 'skipped_duplicate', message: 'Duplicate row in CSV' }
      } satisfies ToolExecutionRowResult;
    }
    seen.add(k);

    if (userId.endsWith('000')) {
      return {
        rowIndex: i,
        outcome: 'failed',
        message: 'User not found (mock).',
        data: { user_id: userId, tag, action: 'failed', message: 'User not found' }
      } satisfies ToolExecutionRowResult;
    }

    if (tag === 'vip' && userId.endsWith('999')) {
      return {
        rowIndex: i,
        outcome: 'failed',
        message: 'Policy prevents tagging this user as vip (mock).',
        data: { user_id: userId, tag, action: 'failed_policy', message: 'Policy restriction' }
      } satisfies ToolExecutionRowResult;
    }

    if (mode === 'merge' && userId.endsWith('7')) {
      return {
        rowIndex: i,
        outcome: 'skipped',
        message: 'Tag already present (mock).',
        data: { user_id: userId, tag, action: 'skipped_already_present', message: 'Already tagged' }
      } satisfies ToolExecutionRowResult;
    }

    return {
      rowIndex: i,
      outcome: 'success',
      message: mode === 'overwrite' ? 'Overwrote tags (mock).' : 'Added tag (mock).',
      data: { user_id: userId, tag, action: mode === 'overwrite' ? 'overwrite' : 'added', message: '' }
    } satisfies ToolExecutionRowResult;
  });

  const finishedAt = nowIso();
  return buildResult({ total: rows.length, rows, startedAt, finishedAt });
}

export async function executeAssignUserToProject(input: ToolExecutionInput): Promise<ToolExecutionResult> {
  const startedAt = nowIso();
  await simulateLatency(600);
  const csvRows = input.csv?.rows ?? [];
  if (isAuthBad(input.apiKey)) return makeAuthFailure(csvRows.length);

  const defaultRole = String(input.fields.default_role ?? 'viewer');
  const notify = Boolean(input.fields.notify_user ?? false);
  const seen = new Set<string>();

  const rows = csvRows.map((row, i) => {
    const userId = String(row.user_id ?? '').trim();
    const projectId = String(row.project_id ?? '').trim();
    const role = String(row.role ?? '').trim() || defaultRole;
    const k = `${userId}::${projectId}`;
    if (seen.has(k)) {
      return {
        rowIndex: i,
        outcome: 'skipped',
        message: 'Duplicate assignment in CSV; skipping.',
        data: { user_id: userId, project_id: projectId, role, action: 'skipped_duplicate', message: '' }
      } satisfies ToolExecutionRowResult;
    }
    seen.add(k);

    if (projectId.endsWith('000')) {
      return {
        rowIndex: i,
        outcome: 'failed',
        message: 'Project not found (mock).',
        data: { user_id: userId, project_id: projectId, role, action: 'failed', message: 'Project not found' }
      } satisfies ToolExecutionRowResult;
    }

    if (userId.endsWith('7')) {
      return {
        rowIndex: i,
        outcome: 'skipped',
        message: 'User already assigned to project (mock).',
        data: { user_id: userId, project_id: projectId, role, action: 'no_op', message: 'Already assigned' }
      } satisfies ToolExecutionRowResult;
    }

    return {
      rowIndex: i,
      outcome: 'success',
      message: notify ? 'Assigned and notified user (mock).' : 'Assigned user (mock).',
      data: { user_id: userId, project_id: projectId, role, action: 'assigned', message: '' }
    } satisfies ToolExecutionRowResult;
  });

  const finishedAt = nowIso();
  return buildResult({ total: rows.length, rows, startedAt, finishedAt });
}

export async function executeRemoveUserFromProject(input: ToolExecutionInput): Promise<ToolExecutionResult> {
  const startedAt = nowIso();
  await simulateLatency(650);
  const csvRows = input.csv?.rows ?? [];
  if (isAuthBad(input.apiKey)) return makeAuthFailure(csvRows.length);

  const dryRun = Boolean(input.fields.dry_run ?? false);
  const seen = new Set<string>();

  const rows = csvRows.map((row, i) => {
    const userId = String(row.user_id ?? '').trim();
    const projectId = String(row.project_id ?? '').trim();
    const k = `${userId}::${projectId}`;
    if (seen.has(k)) {
      return {
        rowIndex: i,
        outcome: 'skipped',
        message: 'Duplicate removal in CSV; skipping.',
        data: { user_id: userId, project_id: projectId, action: 'skipped_duplicate', message: '' }
      } satisfies ToolExecutionRowResult;
    }
    seen.add(k);

    if (userId.endsWith('000')) {
      return {
        rowIndex: i,
        outcome: 'failed',
        message: 'User not found (mock).',
        data: { user_id: userId, project_id: projectId, action: 'failed', message: 'User not found' }
      } satisfies ToolExecutionRowResult;
    }

    if (projectId.endsWith('9')) {
      return {
        rowIndex: i,
        outcome: 'failed',
        message: 'Cannot remove user from protected project (mock).',
        data: { user_id: userId, project_id: projectId, action: 'failed_policy', message: 'Protected project' }
      } satisfies ToolExecutionRowResult;
    }

    if (userId.endsWith('7')) {
      return {
        rowIndex: i,
        outcome: 'skipped',
        message: 'User was not assigned to project (mock).',
        data: { user_id: userId, project_id: projectId, action: 'no_op', message: 'Not a member' }
      } satisfies ToolExecutionRowResult;
    }

    return {
      rowIndex: i,
      outcome: 'success',
      message: dryRun ? 'Would remove (dry run, mock).' : 'Removed user (mock).',
      data: { user_id: userId, project_id: projectId, action: dryRun ? 'dry_run' : 'removed', message: '' }
    } satisfies ToolExecutionRowResult;
  });

  const finishedAt = nowIso();
  return buildResult({ total: rows.length, rows, startedAt, finishedAt });
}

export async function executeTaskPriorityTagging(input: ToolExecutionInput): Promise<ToolExecutionResult> {
  const startedAt = nowIso();
  await simulateLatency(700);
  const csvRows = input.csv?.rows ?? [];
  if (isAuthBad(input.apiKey)) return makeAuthFailure(csvRows.length);

  const applyMode = String(input.fields.apply_mode ?? 'add'); // add | replace
  const seen = new Set<string>();

  const rows = csvRows.map((row, i) => {
    const taskId = String(row.task_id ?? '').trim();
    const priorityTag = String(row.priority_tag ?? '').trim();
    if (seen.has(taskId)) {
      return {
        rowIndex: i,
        outcome: 'skipped',
        message: 'Duplicate task_id in CSV; skipping.',
        data: { task_id: taskId, priority_tag: priorityTag, action: 'skipped_duplicate', message: '' }
      } satisfies ToolExecutionRowResult;
    }
    seen.add(taskId);

    if (taskId.endsWith('000')) {
      return {
        rowIndex: i,
        outcome: 'failed',
        message: 'Task not found (mock).',
        data: { task_id: taskId, priority_tag: priorityTag, action: 'failed', message: 'Task not found' }
      } satisfies ToolExecutionRowResult;
    }

    if (applyMode === 'add' && taskId.endsWith('7')) {
      return {
        rowIndex: i,
        outcome: 'skipped',
        message: 'Priority already set (mock).',
        data: { task_id: taskId, priority_tag: priorityTag, action: 'no_op', message: 'Already has priority' }
      } satisfies ToolExecutionRowResult;
    }

    return {
      rowIndex: i,
      outcome: 'success',
      message: applyMode === 'replace' ? 'Replaced priority tag (mock).' : 'Added priority tag (mock).',
      data: { task_id: taskId, priority_tag: priorityTag, action: applyMode === 'replace' ? 'replaced' : 'added', message: '' }
    } satisfies ToolExecutionRowResult;
  });

  const finishedAt = nowIso();
  return buildResult({ total: rows.length, rows, startedAt, finishedAt });
}

export async function executeUpdateTaskState(input: ToolExecutionInput): Promise<ToolExecutionResult> {
  const startedAt = nowIso();
  await simulateLatency(820);
  const csvRows = input.csv?.rows ?? [];
  if (isAuthBad(input.apiKey)) return makeAuthFailure(csvRows.length);

  const dryRun = Boolean(input.fields.dry_run ?? false);
  const seen = new Set<string>();

  const rows = csvRows.map((row, i) => {
    const taskId = String(row.task_id ?? '').trim();
    const newState = String(row.new_state ?? '').trim();
    const prevState = String(row.previous_state ?? '').trim();

    if (seen.has(taskId)) {
      return {
        rowIndex: i,
        outcome: 'skipped',
        message: 'Duplicate task_id in CSV; skipping.',
        data: { task_id: taskId, new_state: newState, action: 'skipped_duplicate', message: '' }
      } satisfies ToolExecutionRowResult;
    }
    seen.add(taskId);

    if (taskId.endsWith('000')) {
      return {
        rowIndex: i,
        outcome: 'failed',
        message: 'Task not found (mock).',
        data: { task_id: taskId, new_state: newState, action: 'failed', message: 'Task not found' }
      } satisfies ToolExecutionRowResult;
    }

    // If previous_state provided, simulate mismatch on some rows.
    if (prevState && taskId.endsWith('3')) {
      return {
        rowIndex: i,
        outcome: 'skipped',
        message: `Previous state mismatch (mock). Expected ${prevState}.`,
        data: { task_id: taskId, new_state: newState, action: 'skipped_precondition', message: 'Precondition failed' }
      } satisfies ToolExecutionRowResult;
    }

    if (newState === 'done' && taskId.endsWith('9')) {
      return {
        rowIndex: i,
        outcome: 'failed',
        message: 'Cannot transition to done due to failing checks (mock).',
        data: { task_id: taskId, new_state: newState, action: 'failed_checks', message: 'Checks failing' }
      } satisfies ToolExecutionRowResult;
    }

    if (taskId.endsWith('7')) {
      return {
        rowIndex: i,
        outcome: 'skipped',
        message: 'Task already in requested state (mock).',
        data: { task_id: taskId, new_state: newState, action: 'no_op', message: 'Already in state' }
      } satisfies ToolExecutionRowResult;
    }

    return {
      rowIndex: i,
      outcome: 'success',
      message: dryRun ? 'Would transition (dry run, mock).' : 'Transitioned task (mock).',
      data: { task_id: taskId, new_state: newState, action: dryRun ? 'dry_run' : 'transitioned', message: '' }
    } satisfies ToolExecutionRowResult;
  });

  const finishedAt = nowIso();
  return buildResult({ total: rows.length, rows, startedAt, finishedAt });
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
      const startedAt = nowIso();
      const finishedAt = nowIso();
      return buildResult({
        total: input.csv?.rows.length ?? 0,
        rows: (input.csv?.rows ?? []).map((_, i) => ({
          rowIndex: i,
          outcome: 'failed',
          message: `Unknown tool id '${toolId}'.`
        })),
        startedAt,
        finishedAt
      });
  }
}

