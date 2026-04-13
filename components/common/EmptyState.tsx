import type { ReactNode } from 'react';
import { cn } from '@/lib/utils/cn';

export function EmptyState(props: {
  title: string;
  description?: string;
  action?: ReactNode;
  className?: string;
}) {
  const { title, description, action, className } = props;
  return (
    <div
      className={cn(
        'rounded-lg border border-dashed border-border bg-surface px-8 py-12 text-center shadow-card',
        className
      )}
    >
      <div className="text-sm font-semibold text-ink">{title}</div>
      {description ? <div className="mx-auto mt-2 max-w-md text-sm text-ink-secondary">{description}</div> : null}
      {action ? <div className="mt-5 flex justify-center">{action}</div> : null}
    </div>
  );
}
