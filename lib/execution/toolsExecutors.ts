import type { ToolExecutionInput, ToolExecutionResult } from '@/lib/tools/types';
import { runMockExecution } from '@/lib/execution/mockExecutors';

async function ensureCsv(input: ToolExecutionInput) {
  if (!input.csv) throw new Error('CSV is required.');
}

async function ensureApiKey(input: ToolExecutionInput) {
  if (!input.apiKey || input.apiKey.trim().length === 0) throw new Error('API key is required.');
}

export const toolsExecutors: Record<
  'addUserTags' | 'assignUserToProject' | 'removeUserFromProject' | 'taskPriorityTagging' | 'updateTaskState',
  (input: ToolExecutionInput) => Promise<ToolExecutionResult>
> = {
  async addUserTags(input) {
    await ensureApiKey(input);
    await ensureCsv(input);
    return runMockExecution({ toolId: 'add-user-tags', input });
  },
  async assignUserToProject(input) {
    await ensureApiKey(input);
    await ensureCsv(input);
    return runMockExecution({ toolId: 'assign-user-to-project', input });
  },
  async removeUserFromProject(input) {
    await ensureApiKey(input);
    await ensureCsv(input);
    return runMockExecution({ toolId: 'remove-user-from-project', input });
  },
  async taskPriorityTagging(input) {
    await ensureApiKey(input);
    await ensureCsv(input);
    return runMockExecution({ toolId: 'task-priority-tagging', input });
  },
  async updateTaskState(input) {
    await ensureApiKey(input);
    await ensureCsv(input);
    return runMockExecution({ toolId: 'update-task-state', input });
  }
};

