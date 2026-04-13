import { cn } from '@/lib/utils/cn';

export function Skeleton(props: { className?: string }) {
  return <div className={cn('animate-pulse rounded-md bg-canvas-muted', props.className)} aria-hidden />;
}

export function TableSkeletonRows(props: { cols?: number; rows?: number }) {
  const cols = props.cols ?? 6;
  const rows = props.rows ?? 5;
  return (
    <div className="divide-y divide-border border border-border rounded-lg overflow-hidden bg-surface">
      <div className="grid gap-2 bg-canvas-muted px-4 py-3" style={{ gridTemplateColumns: `repeat(${cols}, minmax(0,1fr))` }}>
        {Array.from({ length: cols }).map((_, i) => (
          <Skeleton key={i} className="h-3" />
        ))}
      </div>
      {Array.from({ length: rows }).map((_, r) => (
        <div key={r} className="grid gap-2 px-4 py-3" style={{ gridTemplateColumns: `repeat(${cols}, minmax(0,1fr))` }}>
          {Array.from({ length: cols }).map((_, c) => (
            <Skeleton key={c} className="h-4" />
          ))}
        </div>
      ))}
    </div>
  );
}
