import type { ReactNode } from 'react';
import { cn } from '@/lib/utils/cn';

export type BadgeTone = 'neutral' | 'success' | 'warning' | 'danger' | 'info';

const tones: Record<BadgeTone, string> = {
  neutral: 'border-border bg-canvas-muted text-ink-secondary',
  success: 'border-success-border bg-success-soft text-success-text',
  warning: 'border-warning-border bg-warning-soft text-warning-text',
  danger: 'border-danger-border bg-danger-soft text-danger',
  info: 'border-accent-border bg-accent-soft text-accent'
};

export function Badge(props: { children: ReactNode; tone?: BadgeTone; className?: string }) {
  const { children, tone = 'neutral', className } = props;
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium tabular-nums',
        tones[tone],
        className
      )}
    >
      {children}
    </span>
  );
}
