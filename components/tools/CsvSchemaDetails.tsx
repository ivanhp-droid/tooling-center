import { Card } from '@/components/common/Card';
import type { CsvSchema } from '@/lib/tools/types';
import { downloadTextFile } from '@/lib/utils/download';

export function CsvSchemaDetails(props: { schema: CsvSchema }) {
  const { schema } = props;
  const required = schema.columns.filter((c) => c.required);
  const optional = schema.columns.filter((c) => !c.required);

  return (
    <Card title="CSV Format" subtitle="Required columns, optional columns, and template.">
      <div className="space-y-4 text-sm">
        {schema.notes && schema.notes.length > 0 ? (
          <div className="rounded border border-slate-200 bg-slate-50 p-3">
            <div className="font-medium text-slate-900">Notes</div>
            <ul className="mt-1 list-disc pl-5 text-slate-700">
              {schema.notes.map((n, i) => (
                <li key={i}>{n}</li>
              ))}
            </ul>
          </div>
        ) : null}

        <div className="grid gap-3 md:grid-cols-2">
          <div className="rounded border border-slate-200 p-3">
            <div className="font-medium">Required</div>
            {required.length === 0 ? (
              <div className="mt-1 text-slate-600">None</div>
            ) : (
              <ul className="mt-1 space-y-2">
                {required.map((c) => (
                  <li key={c.key}>
                    <div className="font-mono text-slate-900">{c.key}</div>
                    {c.description ? <div className="text-xs text-slate-600">{c.description}</div> : null}
                    {c.allowedValues && c.allowedValues.length > 0 ? (
                      <div className="mt-1 text-xs text-slate-600">Allowed: {c.allowedValues.join(', ')}</div>
                    ) : null}
                    {c.example ? <div className="mt-1 text-xs text-slate-500">Example: {c.example}</div> : null}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className="rounded border border-slate-200 p-3">
            <div className="font-medium">Optional</div>
            {optional.length === 0 ? (
              <div className="mt-1 text-slate-600">None</div>
            ) : (
              <ul className="mt-1 space-y-2">
                {optional.map((c) => (
                  <li key={c.key}>
                    <div className="font-mono text-slate-900">{c.key}</div>
                    {c.description ? <div className="text-xs text-slate-600">{c.description}</div> : null}
                    {c.allowedValues && c.allowedValues.length > 0 ? (
                      <div className="mt-1 text-xs text-slate-600">Allowed: {c.allowedValues.join(', ')}</div>
                    ) : null}
                    {c.example ? <div className="mt-1 text-xs text-slate-500">Example: {c.example}</div> : null}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {schema.templateCsv ? (
          <div className="flex flex-wrap items-center justify-between gap-2 rounded border border-slate-200 p-3">
            <div>
              <div className="font-medium">Template</div>
              <div className="text-xs text-slate-600">{schema.templateCsv.filename}</div>
            </div>
            <button
              className="rounded border px-3 py-2 text-sm hover:bg-slate-50"
              onClick={() => downloadTextFile(schema.templateCsv!.filename, schema.templateCsv!.content)}
              type="button"
            >
              Download template CSV
            </button>
          </div>
        ) : null}
      </div>
    </Card>
  );
}

