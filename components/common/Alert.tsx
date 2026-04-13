import type { ReactNode } from 'react';
import { cn } from '@/lib/utils/cn';

type AlertVariant = 'info' | 'success' | 'warning' | 'error';

const variants: Record<AlertVariant, string> = {
  info: 'border-accent-border bg-accent-soft text-ink',
  success: 'border-success-border bg-success-soft text-success-text',
  warning: 'border-warning-border bg-warning-soft text-warning-text',
  error: 'border-danger-border bg-danger-soft text-danger'
};

export function Alert(props: {
  variant?: AlertVariant;
  title?: string;
  children: ReactNode;
  className?: string;
  role?: 'status' | 'alert';
}) {
  const { variant = 'info', title, children, className, role = 'status' } = props;
  return (
    <div role={role} className={cn('flex gap-3 rounded-lg border p-3.5 text-sm', variants[variant], className)}>
      <div
        className={cn(
          'mt-0.5 size-5 shrink-0 rounded border text-center text-[10px] font-bold leading-5',
          variant === 'info' && 'border-accent-border bg-surface text-accent',
          variant === 'success' && 'border-success-border bg-surface text-success-text',
          variant === 'warning' && 'border-warning-border bg-surface text-warning-text',
          variant === 'error' && 'border-danger-border bg-surface text-danger'
        )}
        aria-hidden
      >
        i
      </div>
      <div className="min-w-0">
        {title ? <div className="font-semibold text-ink">{title}</div> : null}
        <div className={cn('text-ink-secondary', title && 'mt-1')}>{children}</div>
      </div>
    </div>
  );
}
