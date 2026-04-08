import type { CsvParseResult } from '@/lib/csv';
import type { CsvSchema } from '@/lib/tools/types';

export function CsvValidationSummary(props: { parse: CsvParseResult | null; schema?: CsvSchema }) {
  const { parse, schema } = props;
  if (!parse) return null;
  const hasErrors = parse.errors.length > 0;
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
            {parse.errors.slice(0, 8).map((e, idx) => (
              <li key={idx}>
                {e.type === 'cell' ? `Row ${Number(e.rowIndex ?? 0) + 1}, ${e.columnKey}: ` : ''}
                {e.message}
              </li>
            ))}
          </ul>
          {parse.errors.length > 8 ? (
            <div className="mt-1 text-xs text-gray-600">Showing first 8 issues.</div>
          ) : null}
        </div>
      ) : (
        <div className="mt-2 text-sm text-green-700">No validation errors detected.</div>
      )}
    </div>
  );
}

