import type { CsvParseResult } from '@/lib/csv';
import type { CsvSchema } from '@/lib/tools/types';
import { Alert } from '@/components/common/Alert';
import { Badge } from '@/components/common/Badge';

export function CsvValidationSummary(props: { parse: CsvParseResult | null; schema?: CsvSchema }) {
  const { parse, schema } = props;
  if (!parse) return null;
  const errors = parse.issues.filter((i) => i.severity === 'error');
  const warnings = parse.issues.filter((i) => i.severity === 'warning');
  const hasErrors = errors.length > 0;
  const hasWarnings = warnings.length > 0;

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="text-sm font-semibold text-slate-900">Validation</div>
        <div className="flex flex-wrap items-center gap-2">
          <Badge tone={hasErrors ? 'danger' : hasWarnings ? 'warning' : 'success'}>
            {hasErrors ? 'Blocking issues' : hasWarnings ? 'OK with warnings' : 'Ready'}
          </Badge>
          <Badge tone="neutral">{parse.rowCount} data rows</Badge>
        </div>
      </div>

      {schema ? (
        <p className="text-xs text-slate-600">
          <span className="font-medium text-slate-800">Required columns: </span>
          <span className="font-mono">
            {schema.columns.filter((c) => c.required).map((c) => c.key).join(', ') || '—'}
          </span>
        </p>
      ) : null}

      {hasErrors ? (
        <Alert variant="error" title="Fix these before you can run" role="alert">
          <ul className="mt-2 list-disc space-y-1 pl-5 text-sm">
            {errors.slice(0, 12).map((e, idx) => (
              <li key={idx}>
                {e.scope === 'row'
                  ? `Row ${Number(e.rowIndex ?? 0) + 1}${e.columnKey ? `, column “${e.columnKey}”` : ''}: `
                  : null}
                {e.message}
              </li>
            ))}
          </ul>
          {errors.length > 12 ? (
            <p className="mt-2 text-xs text-slate-700">Showing first 12 errors — fix them, re-upload, and validate again.</p>
          ) : null}
        </Alert>
      ) : (
        <Alert variant="success" title="No blocking issues">
          {parse.rowCount === 0
            ? 'The file parsed, but there are no data rows under the header. Add rows or pick another export.'
            : 'Required columns and row checks passed. Warnings (if any) will not block a run.'}
        </Alert>
      )}

      {hasWarnings ? (
        <Alert variant="warning" title="Warnings (run may still be allowed)">
          <ul className="mt-2 list-disc space-y-1 pl-5 text-sm">
            {warnings.slice(0, 8).map((w, idx) => (
              <li key={idx}>{w.message}</li>
            ))}
          </ul>
          {warnings.length > 8 ? <p className="mt-2 text-xs text-slate-800">Showing first 8 warnings.</p> : null}
        </Alert>
      ) : null}
    </div>
  );
}
