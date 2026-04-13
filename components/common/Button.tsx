import type { ButtonHTMLAttributes, PropsWithChildren } from 'react';
import { cn } from '@/lib/utils/cn';

type Variant = 'primary' | 'secondary' | 'danger' | 'ghost';

export function Button(
  props: PropsWithChildren<
    ButtonHTMLAttributes<HTMLButtonElement> & {
      variant?: Variant;
      fullWidth?: boolean;
    }
  >
) {
  const { className = '', variant = 'primary', fullWidth, ...rest } = props;
  const base =
    'inline-flex items-center justify-center rounded-md border px-3.5 py-2 text-sm font-medium transition-colors disabled:cursor-not-allowed disabled:border-border-subtle disabled:bg-canvas-muted disabled:text-ink-faint';
  const styles =
    variant === 'primary'
      ? 'border-accent bg-accent text-white shadow-card hover:border-accent-hover hover:bg-accent-hover focus-visible:ring-accent'
      : variant === 'danger'
        ? 'border-danger-border bg-danger-soft text-danger shadow-card hover:bg-rose-100'
        : variant === 'ghost'
          ? 'border-transparent bg-transparent text-ink-secondary hover:bg-canvas-muted hover:text-ink'
          : 'border-border bg-surface text-ink shadow-card hover:bg-canvas-muted';
  const width = fullWidth ? ' w-full' : '';
  return <button className={cn(base, styles, width, className)} {...rest} />;
}
