import type { DynamicFieldDefinition } from '@/lib/tools/types';
import { Card } from '@/components/common/Card';
import { cn } from '@/lib/utils/cn';

const control =
  'w-full rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-900 shadow-sm placeholder:text-slate-400 focus:border-slate-900 focus:outline-none focus:ring-1 focus:ring-slate-900 disabled:bg-slate-50 disabled:text-slate-500';

export function DynamicFieldRenderer(props: {
  fields: DynamicFieldDefinition[];
  values: Record<string, unknown>;
  onChange: (next: Record<string, unknown>) => void;
  /** When false, render fields only (parent supplies Card/section). */
  withCard?: boolean;
}) {
  const { fields, values, onChange, withCard = true } = props;
  if (!fields || fields.length === 0) return null;

  const set = (key: string, value: unknown) => {
    onChange({ ...values, [key]: value });
  };

  const inner = (
    <div className="space-y-5">
        {fields.map((f) => {
          const val = values[f.key] ?? f.defaultValue ?? (f.type === 'checkbox' ? false : '');
          const inputId = `field-${f.key}`;

          if (f.type === 'checkbox') {
            return (
              <div key={f.key} className="flex items-start gap-3">
                <input
                  id={inputId}
                  type="checkbox"
                  checked={Boolean(val)}
                  onChange={(e) => set(f.key, e.target.checked)}
                  className="mt-1 size-4 rounded border-slate-300 text-slate-900 focus:ring-slate-900"
                />
                <div className="min-w-0">
                  <label htmlFor={inputId} className="text-sm font-medium text-slate-900">
                    {f.label}
                    {f.required ? <span className="text-rose-600"> *</span> : null}
                  </label>
                  {f.helpText ? <p className="mt-1 text-sm text-slate-600">{f.helpText}</p> : null}
                </div>
              </div>
            );
          }

          if (f.type === 'select') {
            return (
              <div key={f.key} className="space-y-1.5">
                <label htmlFor={inputId} className="text-sm font-medium text-slate-900">
                  {f.label}
                  {f.required ? <span className="text-rose-600"> *</span> : null}
                </label>
                {f.helpText ? <p className="text-xs text-slate-600">{f.helpText}</p> : null}
                <select id={inputId} className={cn(control, 'bg-white')} value={String(val)} onChange={(e) => set(f.key, e.target.value)}>
                  {(f.options ?? []).map((o) => (
                    <option key={o.value} value={o.value}>
                      {o.label}
                    </option>
                  ))}
                </select>
              </div>
            );
          }

          return (
            <div key={f.key} className="space-y-1.5">
              <label htmlFor={inputId} className="text-sm font-medium text-slate-900">
                {f.label}
                {f.required ? <span className="text-rose-600"> *</span> : null}
              </label>
              {f.helpText ? <p className="text-xs text-slate-600">{f.helpText}</p> : null}
              {f.type === 'textarea' ? (
                <textarea
                  id={inputId}
                  className={control}
                  rows={3}
                  placeholder={f.placeholder}
                  value={String(val)}
                  onChange={(e) => set(f.key, e.target.value)}
                />
              ) : (
                <input
                  id={inputId}
                  className={control}
                  type={f.type === 'number' ? 'number' : 'text'}
                  placeholder={f.placeholder}
                  value={String(val)}
                  onChange={(e) => set(f.key, f.type === 'number' ? Number(e.target.value) : e.target.value)}
                />
              )}
            </div>
          );
        })}
    </div>
  );

  if (!withCard) return inner;

  return (
    <Card
      title="Tool options"
      subtitle="Values below apply to this run for every CSV row unless the column overrides them."
    >
      {inner}
    </Card>
  );
}
