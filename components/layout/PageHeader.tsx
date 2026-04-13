import Link from 'next/link';
import type { ReactNode } from 'react';
/** Full-width header band — use inside pages that are not using AdminLayout title (e.g. nested layouts). */
export function PageHeader(props: { title: string; subtitle?: ReactNode; actions?: ReactNode }) {
  const { title, subtitle, actions } = props;
  return (
    <div className="border-b border-border bg-surface">
      <div className="mx-auto max-w-[1280px] px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="min-w-0">
            <div className="text-[11px] font-semibold uppercase tracking-wider text-ink-faint">
              <Link href="/" className="text-ink-muted hover:text-accent">
                Tooling Center
              </Link>
            </div>
            <h1 className="mt-1 text-xl font-semibold tracking-tight text-ink sm:text-2xl">{title}</h1>
            {subtitle ? <div className="mt-2 max-w-2xl text-sm leading-relaxed text-ink-secondary">{subtitle}</div> : null}
          </div>
          {actions ? <div className="flex shrink-0 flex-wrap items-center gap-2 sm:pt-1">{actions}</div> : null}
        </div>
      </div>
    </div>
  );
}
