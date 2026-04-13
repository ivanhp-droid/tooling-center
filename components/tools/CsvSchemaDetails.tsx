import type { CsvSchema } from '@/lib/tools/types';
import { downloadTextFile } from '@/lib/utils/download';
import { Button } from '@/components/common/Button';

export function CsvSchemaDetails(props: { schema: CsvSchema }) {
  const { schema } = props;
  const required = schema.columns.filter((c) => c.required);
  const optional = schema.columns.filter((c) => !c.required);

  return (
    <div className="rounded-lg border border-border bg-canvas-muted/50 p-4">
      <div className="flex flex-wrap items-start justify-between gap-3 border-b border-border pb-3">
        <div>
          <h3 className="text-sm font-semibold text-ink">Expected CSV shape</h3>
          <p className="mt-0.5 text-xs text-ink-secondary">Match these columns before running. Optional columns can be blank.</p>
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
            <div className="text-xs font-semibold uppercase tracking-wide text-ink-muted">Notes</div>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-ink-secondary">
              {schema.notes.map((n, i) => (
                <li key={i}>{n}</li>
              ))}
            </ul>
          </div>
        ) : null}

        <div className="grid gap-3 md:grid-cols-2">
          <div className="rounded-md border border-border bg-surface p-3">
            <div className="text-xs font-semibold uppercase tracking-wide text-ink-muted">Required</div>
            {required.length === 0 ? (
              <p className="mt-2 text-ink-secondary">None</p>
            ) : (
              <ul className="mt-2 space-y-2">
                {required.map((c) => (
                  <li key={c.key}>
                    <div className="font-mono text-sm font-medium text-ink">{c.key}</div>
                    {c.description ? <p className="text-xs text-ink-secondary">{c.description}</p> : null}
                    {c.allowedValues && c.allowedValues.length > 0 ? (
                      <p className="mt-1 text-xs text-ink-secondary">Allowed: {c.allowedValues.join(', ')}</p>
                    ) : null}
                    {c.example ? <p className="mt-1 text-xs text-ink-muted">Example: {c.example}</p> : null}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className="rounded-md border border-border bg-surface p-3">
            <div className="text-xs font-semibold uppercase tracking-wide text-ink-muted">Optional</div>
            {optional.length === 0 ? (
              <p className="mt-2 text-ink-secondary">None</p>
            ) : (
              <ul className="mt-2 space-y-2">
                {optional.map((c) => (
                  <li key={c.key}>
                    <div className="font-mono text-sm font-medium text-ink">{c.key}</div>
                    {c.description ? <p className="text-xs text-ink-secondary">{c.description}</p> : null}
                    {c.allowedValues && c.allowedValues.length > 0 ? (
                      <p className="mt-1 text-xs text-ink-secondary">Allowed: {c.allowedValues.join(', ')}</p>
                    ) : null}
                    {c.example ? <p className="mt-1 text-xs text-ink-muted">Example: {c.example}</p> : null}
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
