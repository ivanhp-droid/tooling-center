import type { ToolExecutionInput } from '@/lib/tools/types';

const REDACTED = '[REDACTED]';

export function buildHistoryInputSummary(input: ToolExecutionInput) {
  return {
    apiKey: input.apiKey ? REDACTED : null,
    csvFilename: input.csv?.filename ?? null,
    rowCount: input.csv?.rowCount ?? null,
    fields: input.fields ?? {}
  } as const;
}

export function buildSafeInputSummary(args: {
  tool: { requiresApiKey: boolean; requiresCsv: boolean };
  csv: { filename: string; rowCount: number } | null;
  fields: Record<string, unknown>;
}) {
  const { tool, csv, fields } = args;
  return {
    apiKey: tool.requiresApiKey ? REDACTED : null,
    csvFilename: tool.requiresCsv ? (csv?.filename ?? null) : null,
    rowCount: tool.requiresCsv ? (csv?.rowCount ?? null) : null,
    fields
  } as const;
}

