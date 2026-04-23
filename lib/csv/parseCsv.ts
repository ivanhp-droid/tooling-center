import type { CsvSchema } from '@/lib/tools/types';
import type { CsvParseResult, CsvValidationIssue } from '@/lib/csv/types';

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

function matchesPattern(value: string, pattern: string) {
  try {
    const re = new RegExp(pattern);
    return re.test(value);
  } catch {
    return true; // ignore bad patterns in placeholder schemas
  }
}

function normalizeForEnum(value: string) {
  return value.trim().toLowerCase();
}

function isDynamicColumn(args: { header: string; prefixes: string[] }) {
  const normalized = args.header.trim().toLowerCase();
  return args.prefixes.some((prefix) => normalized.startsWith(prefix.trim().toLowerCase()));
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
      issues: [{ severity: 'error', scope: 'file', message: 'CSV is empty.' }],
      requiredColumnsMissing: schema.columns.filter((c) => c.required).map((c) => c.key)
    };
  }

  const rawHeaders = splitCsvLine(lines[0]);
  const headers = rawHeaders.map(normalizeHeader);
  const headerSet = new Set(headers);
  const dynamicPrefixes = schema.dynamicColumnPrefixes ?? [];
  const dynamicHeaders = headers.filter((header) => isDynamicColumn({ header, prefixes: dynamicPrefixes }));
  const requiredMissing = schema.columns.filter((c) => c.required && !headerSet.has(c.key)).map((c) => c.key);

  const rows: Record<string, string>[] = [];
  const issues: CsvValidationIssue[] = [];

  for (let idx = 1; idx < lines.length; idx++) {
    const parts = splitCsvLine(lines[idx]);
    const row: Record<string, string> = {};
    for (let c = 0; c < headers.length; c++) {
      row[headers[c]] = parts[c] ?? '';
    }
    rows.push(row);
  }

  const duplicates: { header: string; indexes: number[] }[] = [];
  const headerIndexByName = new Map<string, number[]>();
  headers.forEach((h, i) => {
    const list = headerIndexByName.get(h) ?? [];
    list.push(i);
    headerIndexByName.set(h, list);
  });
  for (const [h, indexes] of headerIndexByName.entries()) {
    if (h.length > 0 && indexes.length > 1) duplicates.push({ header: h, indexes });
  }
  duplicates.forEach((d) => {
    issues.push({
      severity: 'warning',
      scope: 'schema',
      message: `Duplicate column header '${d.header}' detected. The last value per row will be used.`
    });
  });

  // Per-row validation (only for schema columns).
  rows.forEach((row, i) => {
    schema.columns.forEach((col) => {
      const raw = row[col.key] ?? '';
      const trimmed = raw.trim();
      if (col.required && trimmed.length === 0) {
        issues.push({
          severity: 'error',
          scope: 'row',
          rowIndex: i,
          columnKey: col.key,
          message: `Missing required value for '${col.key}'.`
        });
        return;
      }
      if (trimmed.length === 0) return;
      const coerced = coerceValue(trimmed, col.type);
      if (coerced === null) {
        issues.push({
          severity: 'error',
          scope: 'row',
          rowIndex: i,
          columnKey: col.key,
          message: `Invalid ${col.type} value in '${col.key}'.`
        });
        return;
      }

      if (col.allowedValues && col.allowedValues.length > 0) {
        const allowed = new Set(col.allowedValues.map((v) => normalizeForEnum(v)));
        if (!allowed.has(normalizeForEnum(trimmed))) {
          issues.push({
            severity: 'error',
            scope: 'row',
            rowIndex: i,
            columnKey: col.key,
            message: `Invalid value for '${col.key}'. Allowed: ${col.allowedValues.join(', ')}.`
          });
        }
      }

      if (col.pattern) {
        if (!matchesPattern(trimmed, col.pattern)) {
          issues.push({
            severity: 'error',
            scope: 'row',
            rowIndex: i,
            columnKey: col.key,
            message: `Value for '${col.key}' has an invalid format.`
          });
        }
      }
    });

    if (schema.requireAtLeastOneValueInDynamicColumnsPerRow) {
      const hasDynamicValue = dynamicHeaders.some((header) => String(row[header] ?? '').trim().length > 0);
      if (!hasDynamicValue) {
        issues.push({
          severity: 'error',
          scope: 'row',
          rowIndex: i,
          message: `At least one value is required in columns starting with: ${dynamicPrefixes.join(', ')}.`
        });
      }
    }
  });

  if (requiredMissing.length > 0) {
    issues.unshift({
      severity: 'error',
      scope: 'schema',
      message: `Missing required columns: ${requiredMissing.join(', ')}.`
    });
  }

  if (schema.requireAtLeastOneDynamicColumn && dynamicHeaders.length === 0) {
    issues.push({
      severity: 'error',
      scope: 'schema',
      message: `Missing at least one required dynamic column. Add a column that starts with: ${dynamicPrefixes.join(', ')}.`
    });
  }

  if (schema.allowUnknownColumns === false) {
    const known = new Set(schema.columns.map((c) => c.key));
    const unknown = headers.filter(
      (h) => h.length > 0 && !known.has(h) && !isDynamicColumn({ header: h, prefixes: dynamicPrefixes })
    );
    if (unknown.length > 0) {
      issues.push({
        severity: schema.unknownColumnsSeverity ?? 'warning',
        scope: 'schema',
        message: `Unknown columns present: ${unknown.join(', ')}.`
      });
    }
  }

  if (schema.keyColumns && schema.keyColumns.length > 0) {
    const seen = new Map<string, number>();
    rows.forEach((row, i) => {
      const keyParts = schema.keyColumns!.map((k) => (row[k] ?? '').trim());
      if (schema.keyColumnsIncludeDynamicPrefixes) {
        const dynamicValues = dynamicHeaders
          .map((header) => String(row[header] ?? '').trim())
          .filter((value) => value.length > 0)
          .sort((a, b) => a.localeCompare(b));
        keyParts.push(dynamicValues.join('|'));
      }
      const key = keyParts.join('::');
      if (key.trim().length === 0) return;
      const prev = seen.get(key);
      if (prev !== undefined) {
        issues.push({
          severity: 'warning',
          scope: 'row',
          rowIndex: i,
          message: `Duplicate row detected (matches row ${prev + 1}) for key: ${schema.keyColumns!.join(', ')}.`
        });
      } else {
        seen.set(key, i);
      }
    });
  }

  return {
    filename,
    headers,
    rowCount: rows.length,
    rows,
    previewRows: rows.slice(0, previewRowLimit),
    issues,
    requiredColumnsMissing: requiredMissing
  };
}

