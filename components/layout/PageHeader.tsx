import Link from 'next/link';
import type { ReactNode } from 'react';
import { cn } from '@/lib/utils/cn';

export function PageHeader(props: { title: string; subtitle?: ReactNode; actions?: ReactNode }) {
  const { title, subtitle, actions } = props;
  return (
    <div className="border-b border-slate-200/80 bg-white shadow-sm">
      <div className="mx-auto max-w-6xl px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="min-w-0">
            <div className="text-xs font-medium uppercase tracking-wide text-slate-500">
              <Link href="/" className="text-slate-500 hover:text-slate-800">
                Tooling Center
              </Link>
            </div>
            <h1 className="mt-1 text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl">{title}</h1>
            {subtitle ? <div className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-600">{subtitle}</div> : null}
          </div>
          {actions ? <div className="flex shrink-0 flex-wrap items-center gap-2 sm:pt-1">{actions}</div> : null}
        </div>
      </div>
    </div>
  );
}
