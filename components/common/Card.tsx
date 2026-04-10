import type { ReactNode } from 'react';
import { cn } from '@/lib/utils/cn';

export function Card(props: { title?: string; subtitle?: ReactNode; children: ReactNode; className?: string }) {
  const { title, subtitle, children, className } = props;
  return (
    <div
      className={cn(
        'overflow-hidden rounded-lg border border-slate-200/90 bg-white shadow-sm ring-1 ring-slate-900/5',
        className
      )}
    >
      {title ? (
        <div className="border-b border-slate-100 bg-slate-50/80 px-4 py-3">
          <div className="text-sm font-semibold tracking-tight text-slate-900">{title}</div>
          {subtitle ? <div className="mt-1 text-xs leading-relaxed text-slate-600">{subtitle}</div> : null}
        </div>
      ) : null}
      <div className="px-4 py-4">{children}</div>
    </div>
  );
}

