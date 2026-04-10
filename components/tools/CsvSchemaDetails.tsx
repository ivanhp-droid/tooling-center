import type { CsvSchema } from '@/lib/tools/types';
import { downloadTextFile } from '@/lib/utils/download';
import { Button } from '@/components/common/Button';

export function CsvSchemaDetails(props: { schema: CsvSchema }) {
  const { schema } = props;
  const required = schema.columns.filter((c) => c.required);
  const optional = schema.columns.filter((c) => !c.required);

  return (
    <div className="rounded-lg border border-slate-200 bg-slate-50/50 p-4">
      <div className="flex flex-wrap items-start justify-between gap-3 border-b border-slate-200 pb-3">
        <div>
          <h3 className="text-sm font-semibold text-slate-900">Expected CSV shape</h3>
          <p className="mt-0.5 text-xs text-slate-600">Match these columns before running. Optional columns can be blank.</p>
        </div>
        {schema.templateCsv ? (
          <Button
            type="button"
            variant="secondary"
            onClick={() => downloadTextFile(schema.templateCsv!.filename, schema.templateCsv!.content, 'text/csv;charset=utf-8')}
          >
            Download template
          </Button>
        ) : null}
      </div>

      <div className="mt-4 space-y-4 text-sm">
        {schema.notes && schema.notes.length > 0 ? (
          <div>
            <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">Notes</div>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-slate-700">
              {schema.notes.map((n, i) => (
                <li key={i}>{n}</li>
              ))}
            </ul>
          </div>
        ) : null}

        <div className="grid gap-3 md:grid-cols-2">
          <div className="rounded-md border border-slate-200 bg-white p-3">
            <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">Required</div>
            {required.length === 0 ? (
              <p className="mt-2 text-slate-600">None</p>
            ) : (
              <ul className="mt-2 space-y-2">
                {required.map((c) => (
                  <li key={c.key}>
                    <div className="font-mono text-sm font-medium text-slate-900">{c.key}</div>
                    {c.description ? <p className="text-xs text-slate-600">{c.description}</p> : null}
                    {c.allowedValues && c.allowedValues.length > 0 ? (
                      <p className="mt-1 text-xs text-slate-600">Allowed: {c.allowedValues.join(', ')}</p>
                    ) : null}
                    {c.example ? <p className="mt-1 text-xs text-slate-500">Example: {c.example}</p> : null}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className="rounded-md border border-slate-200 bg-white p-3">
            <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">Optional</div>
            {optional.length === 0 ? (
              <p className="mt-2 text-slate-600">None</p>
            ) : (
              <ul className="mt-2 space-y-2">
                {optional.map((c) => (
                  <li key={c.key}>
                    <div className="font-mono text-sm font-medium text-slate-900">{c.key}</div>
                    {c.description ? <p className="text-xs text-slate-600">{c.description}</p> : null}
                    {c.allowedValues && c.allowedValues.length > 0 ? (
                      <p className="mt-1 text-xs text-slate-600">Allowed: {c.allowedValues.join(', ')}</p>
                    ) : null}
                    {c.example ? <p className="mt-1 text-xs text-slate-500">Example: {c.example}</p> : null}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
