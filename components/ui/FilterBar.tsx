import type { ReactNode } from 'react';
import { cn } from '@/lib/utils/cn';

export function FilterBar(props: { children: ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        'flex flex-col gap-3 rounded-lg border border-border bg-surface p-4 shadow-card sm:flex-row sm:flex-wrap sm:items-end',
        props.className
      )}
    >
      {props.children}
    </div>
  );
}
