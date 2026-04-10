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
        'rounded-lg border border-dashed border-slate-300 bg-slate-50/80 px-6 py-10 text-center',
        className
      )}
    >
      <div className="text-sm font-semibold text-slate-900">{title}</div>
      {description ? <div className="mx-auto mt-2 max-w-md text-sm text-slate-600">{description}</div> : null}
      {action ? <div className="mt-4 flex justify-center">{action}</div> : null}
    </div>
  );
}
