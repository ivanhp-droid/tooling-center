import type { ReactNode } from 'react';
import { cn } from '@/lib/utils/cn';

type AlertVariant = 'info' | 'success' | 'warning' | 'error';

const variants: Record<AlertVariant, string> = {
  info: 'border-sky-200 bg-sky-50 text-sky-950',
  success: 'border-emerald-200 bg-emerald-50 text-emerald-950',
  warning: 'border-amber-200 bg-amber-50 text-amber-950',
  error: 'border-rose-200 bg-rose-50 text-rose-950'
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
    <div
      role={role}
      className={cn('rounded-lg border p-3 text-sm', variants[variant], className)}
    >
      {title ? <div className="font-semibold text-slate-900">{title}</div> : null}
      <div className={title ? 'mt-1 text-slate-800' : 'text-slate-800'}>{children}</div>
    </div>
  );
}
