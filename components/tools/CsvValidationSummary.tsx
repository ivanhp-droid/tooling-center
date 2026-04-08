import type { CsvParseResult } from '@/lib/csv';
import type { CsvSchema } from '@/lib/tools/types';

export function CsvValidationSummary(props: { parse: CsvParseResult | null; schema?: CsvSchema }) {
  const { parse, schema } = props;
  if (!parse) return null;
  const errors = parse.issues.filter((i) => i.severity === 'error');
  const warnings = parse.issues.filter((i) => i.severity === 'warning');
  const hasErrors = errors.length > 0;
  return (
    <div className="rounded border bg-white p-3">
      <div className="flex items-center justify-between">
        <div className="font-medium">Validation</div>
        <div className="text-sm text-gray-600">{parse.rowCount} rows</div>
      </div>
      {schema ? (
        <div className="mt-1 text-xs text-slate-600">
          Required columns:{' '}
          {schema.columns
            .filter((c) => c.required)
            .map((c) => c.key)
            .join(', ') || '(none)'}
        </div>
      ) : null}
      {hasErrors ? (
        <div className="mt-2 text-sm text-red-700">
          <div className="font-medium">Issues found</div>
          <ul className="mt-1 list-disc pl-5">
            {errors.slice(0, 8).map((e, idx) => (
              <li key={idx}>
                {e.scope === 'row' ? `Row ${Number(e.rowIndex ?? 0) + 1}${e.columnKey ? `, ${e.columnKey}` : ''}: ` : ''}
                {e.message}
              </li>
            ))}
          </ul>
          {errors.length > 8 ? (
            <div className="mt-1 text-xs text-gray-600">Showing first 8 issues.</div>
          ) : null}
        </div>
      ) : (
        <div className="mt-2 text-sm text-green-700">No blocking validation errors detected.</div>
      )}
      {warnings.length > 0 ? (
        <div className="mt-2 text-sm text-amber-800">
          <div className="font-medium">Warnings</div>
          <ul className="mt-1 list-disc pl-5">
            {warnings.slice(0, 5).map((w, idx) => (
              <li key={idx}>{w.message}</li>
            ))}
          </ul>
          {warnings.length > 5 ? <div className="mt-1 text-xs text-slate-600">Showing first 5 warnings.</div> : null}
        </div>
      ) : null}
    </div>
  );
}

