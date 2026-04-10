import type { ToolExecutionInput, ToolExecutionResult } from '@/lib/tools/types';
import { runMockExecution } from '@/lib/execution/mockExecutors';
import { classifyApiKey } from '@/lib/storage/apiKeyStore';

async function ensureCsv(input: ToolExecutionInput) {
  if (!input.csv) throw new Error('Add a CSV file before running. The tool needs rows to process.');
}

async function ensureApiKey(input: ToolExecutionInput) {
  if (!input.apiKey || input.apiKey.trim().length === 0) {
    throw new Error('No API key on file. Open Settings, paste your key, and save — then return here.');
  }
  const h = classifyApiKey(input.apiKey);
  if (h === 'invalid') {
    throw new Error(
      'This key fails the local format check (too short or marked invalid in mock mode). Update it in Settings and try again.'
    );
  }
  if (h === 'expired') {
    throw new Error(
      'This key is treated as expired or revoked in mock mode. Generate a new key in your admin console, update Settings, and retry.'
    );
  }
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
