import type { ReactNode } from 'react';
import { SidebarNav } from '@/components/layout/SidebarNav';

export function AdminLayout(props: { title?: string; subtitle?: ReactNode; children: ReactNode }) {
  const { title, subtitle, children } = props;
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <div className="mx-auto flex max-w-7xl gap-6 px-6 py-6">
        <aside className="w-64 shrink-0">
          <div className="rounded border bg-white p-4">
            <div className="mb-4">
              <div className="text-sm font-semibold">Tooling Center</div>
              <div className="text-xs text-slate-500">Internal admin tools hub</div>
            </div>
            <SidebarNav />
          </div>
        </aside>
        <main className="min-w-0 flex-1">
          <div className="mb-4">
            <div className="text-xl font-semibold">{title ?? 'Tooling Center'}</div>
            {subtitle ? <div className="mt-1 text-sm text-slate-600">{subtitle}</div> : null}
          </div>
          {children}
        </main>
      </div>
    </div>
  );
}

