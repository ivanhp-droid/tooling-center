import type { ReactNode } from 'react';
import { SidebarNav } from '@/components/layout/SidebarNav';
import { cn } from '@/lib/utils/cn';

export function AdminLayout(props: { title?: string; subtitle?: ReactNode; children: ReactNode }) {
  const { title, subtitle, children } = props;
  return (
    <div className="min-h-screen text-slate-900">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-md focus:bg-slate-900 focus:px-3 focus:py-2 focus:text-sm focus:text-white"
      >
        Skip to main content
      </a>
      <div className="mx-auto flex max-w-7xl gap-6 px-4 py-6 sm:px-6 lg:px-8">
        <aside className="hidden w-56 shrink-0 lg:block xl:w-64" aria-label="Application">
          <div className="sticky top-6 rounded-lg border border-slate-200/90 bg-white p-4 shadow-sm ring-1 ring-slate-900/5">
            <div className="mb-4 border-b border-slate-100 pb-3">
              <div className="text-sm font-semibold tracking-tight text-slate-900">Tooling Center</div>
              <div className="mt-0.5 text-xs leading-snug text-slate-500">Internal bulk operations console</div>
            </div>
            <SidebarNav />
          </div>
        </aside>

        <main id="main-content" className="min-w-0 flex-1 pb-10">
          <div className="mb-6 lg:hidden">
            <div className="rounded-lg border border-slate-200/90 bg-white p-3 shadow-sm ring-1 ring-slate-900/5">
              <div className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">Navigation</div>
              <SidebarNav />
            </div>
          </div>

          <header className="mb-6">
            <h1 className={cn('text-2xl font-semibold tracking-tight text-slate-900', !title && 'sr-only')}>
              {title ?? 'Tooling Center'}
            </h1>
            {subtitle ? <div className="mt-2 max-w-3xl text-sm leading-relaxed text-slate-600">{subtitle}</div> : null}
          </header>

          <div className="space-y-6">{children}</div>
        </main>
      </div>
    </div>
  );
}
