import React from 'react';
import type { DynamicFieldDefinition } from '@/lib/tools/types';
import { Card } from '@/components/common/Card';

export function DynamicFieldRenderer(props: {
  fields: DynamicFieldDefinition[];
  values: Record<string, unknown>;
  onChange: (next: Record<string, unknown>) => void;
}) {
  const { fields, values, onChange } = props;
  if (!fields || fields.length === 0) return null;

  const set = (key: string, value: unknown) => {
    onChange({ ...values, [key]: value });
  };

  return (
    <Card title="Additional Inputs">
      <div className="space-y-4">
        {fields.map((f) => {
          const val = values[f.key] ?? f.defaultValue ?? (f.type === 'checkbox' ? false : '');

          if (f.type === 'checkbox') {
            return (
              <label key={f.key} className="flex items-start gap-2">
                <input
                  type="checkbox"
                  checked={Boolean(val)}
                  onChange={(e) => set(f.key, e.target.checked)}
                  className="mt-1"
                />
                <span>
                  <div className="font-medium">{f.label}</div>
                  {f.helpText ? <div className="text-sm text-slate-600">{f.helpText}</div> : null}
                </span>
              </label>
            );
          }

          if (f.type === 'select') {
            return (
              <div key={f.key} className="space-y-1">
                <div className="text-sm font-medium">{f.label}</div>
                {f.helpText ? <div className="text-xs text-slate-600">{f.helpText}</div> : null}
                <select
                  className="w-full rounded border border-slate-300 px-3 py-2 text-sm"
                  value={String(val)}
                  onChange={(e) => set(f.key, e.target.value)}
                >
                  {(f.options ?? []).map((o) => (
                    <option key={o.value} value={o.value}>
                      {o.label}
                    </option>
                  ))}
                </select>
              </div>
            );
          }

          const common = (
            <div key={f.key} className="space-y-1">
              <div className="text-sm font-medium">{f.label}</div>
              {f.helpText ? <div className="text-xs text-slate-600">{f.helpText}</div> : null}
              {f.type === 'textarea' ? (
                <textarea
                  className="w-full rounded border border-slate-300 px-3 py-2 text-sm"
                  rows={3}
                  placeholder={f.placeholder}
                  value={String(val)}
                  onChange={(e) => set(f.key, e.target.value)}
                />
              ) : (
                <input
                  className="w-full rounded border border-slate-300 px-3 py-2 text-sm"
                  type={f.type === 'number' ? 'number' : 'text'}
                  placeholder={f.placeholder}
                  value={String(val)}
                  onChange={(e) => set(f.key, f.type === 'number' ? Number(e.target.value) : e.target.value)}
                />
              )}
            </div>
          );

          return common;
        })}
      </div>
    </Card>
  );
}

