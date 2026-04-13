import type { ReactNode } from 'react';
import { cn } from '@/lib/utils/cn';

export function Card(props: { title?: string; subtitle?: ReactNode; children: ReactNode; className?: string }) {
  const { title, subtitle, children, className } = props;
  return (
    <div className={cn('overflow-hidden rounded-lg border border-border bg-surface shadow-card', className)}>
      {title ? (
        <div className="border-b border-border-subtle bg-surface-raised px-4 py-3">
          <div className="text-sm font-semibold tracking-tight text-ink">{title}</div>
          {subtitle ? <div className="mt-1 text-xs leading-relaxed text-ink-secondary">{subtitle}</div> : null}
        </div>
      ) : null}
      <div className="px-4 py-4">{children}</div>
    </div>
  );
}
