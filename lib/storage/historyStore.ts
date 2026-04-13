import { readJson, writeJson } from '@/lib/storage/localStorage';

export type ExecutionHistoryStatus = 'success' | 'partial_success' | 'failed';

export type ExecutionHistoryRecord = {
  id: string;
  toolId: string;
  toolName: string;
  timestamp: string;
  auth: {
    apiKeyUsed: boolean;
  };
  csvFilename?: string;
  rowCount?: number;
  inputSummary: Record<string, unknown>;
  status: ExecutionHistoryStatus;
  durationMs?: number;
  resultSummary: {
    total: number;
    success: number;
    failed: number;
    skipped: number;
  };
};

const HISTORY_KEY = 'tooling-center.history.v1';

function makeId() {
  return `hist_${Math.random().toString(16).slice(2)}_${Date.now()}`;
}

export function listHistory(): ExecutionHistoryRecord[] {
  const items = readJson<ExecutionHistoryRecord[]>(HISTORY_KEY, []);
  return items.sort((a, b) => b.timestamp.localeCompare(a.timestamp));
}

export function addHistoryRecord(record: Omit<ExecutionHistoryRecord, 'id'>): ExecutionHistoryRecord {
  const items = readJson<ExecutionHistoryRecord[]>(HISTORY_KEY, []);
  const withId: ExecutionHistoryRecord = { ...record, id: makeId() };
  items.unshift(withId);
  writeJson(HISTORY_KEY, items.slice(0, 200));
  return withId;
}

export function clearHistory() {
  writeJson(HISTORY_KEY, []);
}

export function getHistoryById(id: string): ExecutionHistoryRecord | null {
  const items = readJson<ExecutionHistoryRecord[]>(HISTORY_KEY, []);
  return items.find((i) => i.id === id) ?? null;
}

