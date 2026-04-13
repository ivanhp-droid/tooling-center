import { cn } from '@/lib/utils/cn';

export type TabItem = { id: string; label: string };

export function Tabs(props: {
  items: TabItem[];
  value: string;
  onChange: (id: string) => void;
  className?: string;
}) {
  const { items, value, onChange, className } = props;
  return (
    <div className={cn('border-b border-border', className)} role="tablist" aria-label="Sections">
      <div className="-mb-px flex gap-6">
        {items.map((t) => {
          const active = t.id === value;
          return (
            <button
              key={t.id}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => onChange(t.id)}
              className={cn(
                'border-b-2 pb-2.5 text-sm font-medium transition-colors',
                active
                  ? 'border-accent text-accent'
                  : 'border-transparent text-ink-muted hover:text-ink-secondary'
              )}
            >
              {t.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
