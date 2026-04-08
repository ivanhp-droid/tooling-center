import type { CsvSchema } from '@/lib/tools/types';
import type { CsvParseResult, CsvValidationError } from '@/lib/csv/types';

function normalizeHeader(header: string) {
  return header.trim();
}

function splitCsvLine(line: string): string[] {
  // Minimal CSV splitting with quote handling.
  // Good enough for internal tooling foundation; replace later if needed.
  const out: string[] = [];
  let cur = '';
  let inQuotes = false;
  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (ch === '"') {
      const next = line[i + 1];
      if (inQuotes && next === '"') {
        cur += '"';
        i++;
        continue;
      }
      inQuotes = !inQuotes;
      continue;
    }
    if (ch === ',' && !inQuotes) {
      out.push(cur);
      cur = '';
      continue;
    }
    cur += ch;
  }
  out.push(cur);
  return out.map((s) => s.trim());
}

function coerceValue(raw: string, type: 'string' | 'number' | 'boolean') {
  const v = raw.trim();
  if (type === 'string') return v;
  if (type === 'number') {
    const n = Number(v);
    return Number.isFinite(n) ? n : null;
  }
  // boolean
  if (v === '') return null;
  const lowered = v.toLowerCase();
  if (['true', 't', 'yes', 'y', '1'].includes(lowered)) return true;
  if (['false', 'f', 'no', 'n', '0'].includes(lowered)) return false;
  return null;
}

export function parseAndValidateCsv(args: {
  text: string;
  filename: string;
  schema: CsvSchema;
  previewRowLimit?: number;
}): CsvParseResult {
  const { text, filename, schema, previewRowLimit = 25 } = args;
  const lines = text
    .replace(/\r\n/g, '\n')
    .replace(/\r/g, '\n')
    .split('\n')
    .filter((l) => l.trim().length > 0);

  if (lines.length === 0) {
    return {
      filename,
      headers: [],
      rowCount: 0,
      rows: [],
      previewRows: [],
      errors: [{ type: 'file', message: 'CSV is empty.' }],
      requiredColumnsMissing: schema.columns.filter((c) => c.required).map((c) => c.key)
    };
  }

  const headers = splitCsvLine(lines[0]).map(normalizeHeader);
  const headerSet = new Set(headers);
  const requiredMissing = schema.columns.filter((c) => c.required && !headerSet.has(c.key)).map((c) => c.key);

  const rows: Record<string, string>[] = [];
  const errors: CsvValidationError[] = [];

  for (let idx = 1; idx < lines.length; idx++) {
    const parts = splitCsvLine(lines[idx]);
    const row: Record<string, string> = {};
    for (let c = 0; c < headers.length; c++) {
      row[headers[c]] = parts[c] ?? '';
    }
    rows.push(row);
  }

  // Per-row validation (only for schema columns).
  rows.forEach((row, i) => {
    schema.columns.forEach((col) => {
      const raw = row[col.key] ?? '';
      const trimmed = raw.trim();
      if (col.required && trimmed.length === 0) {
        errors.push({
          type: 'cell',
          rowIndex: i,
          columnKey: col.key,
          message: `Missing required value for '${col.key}'.`
        });
        return;
      }
      if (trimmed.length === 0) return;
      const coerced = coerceValue(trimmed, col.type);
      if (coerced === null) {
        errors.push({
          type: 'cell',
          rowIndex: i,
          columnKey: col.key,
          message: `Invalid ${col.type} value in '${col.key}'.`
        });
      }
    });
  });

  if (requiredMissing.length > 0) {
    errors.unshift({
      type: 'schema',
      message: `Missing required columns: ${requiredMissing.join(', ')}.`
    });
  }

  return {
    filename,
    headers,
    rowCount: rows.length,
    rows,
    previewRows: rows.slice(0, previewRowLimit),
    errors,
    requiredColumnsMissing: requiredMissing
  };
}

