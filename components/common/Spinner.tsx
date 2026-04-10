import { cn } from '@/lib/utils/cn';

export function Spinner(props: { className?: string; label?: string }) {
  const { className, label = 'Loading' } = props;
  return (
    <span className={cn('inline-flex items-center gap-2 text-sm text-slate-600', className)} role="status">
      <span
        className="inline-block size-4 shrink-0 animate-spin rounded-full border-2 border-slate-300 border-t-slate-700"
        aria-hidden
      />
      <span className="sr-only">{label}</span>
    </span>
  );
}
