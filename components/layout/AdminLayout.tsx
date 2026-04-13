import type { ReactNode } from 'react';
import Link from 'next/link';
import { SidebarNav } from '@/components/layout/SidebarNav';
import { AppTopBar } from '@/components/layout/AppTopBar';
import { cn } from '@/lib/utils/cn';

export function AdminLayout(props: {
  /** Page title shown below the top bar (Snorkel-style in-content header). Omit for bare pages. */
  title?: string;
  subtitle?: ReactNode;
  /** Optional actions next to the in-page title */
  titleActions?: ReactNode;
  children: ReactNode;
}) {
  const { title, subtitle, titleActions, children } = props;
  return (
    <div className="flex min-h-screen flex-col bg-canvas text-ink">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-md focus:bg-ink focus:px-3 focus:py-2 focus:text-sm focus:text-surface"
      >
        Skip to main content
      </a>

      <div className="flex min-h-0 flex-1">
        {/* Desktop sidebar — Snorkel: white rail, subtle border */}
        <aside
          className="hidden w-[240px] shrink-0 border-r border-border bg-surface lg:flex lg:flex-col"
          aria-label="Application"
        >
          <div className="flex h-14 items-center border-b border-border px-4">
            <Link href="/" className="block leading-tight">
              <div className="text-sm font-semibold tracking-tight text-ink">Tooling Center</div>
              <div className="text-[11px] font-medium text-ink-muted">Snorkel · Internal</div>
            </Link>
          </div>
          <div className="flex-1 overflow-y-auto tc-scroll">
            <SidebarNav />
          </div>
        </aside>

        <div className="flex min-w-0 flex-1 flex-col">
          <AppTopBar />

          <main id="main-content" className="flex-1 overflow-y-auto tc-scroll">
            <div className="mx-auto w-full max-w-[1280px] px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
              {/* Mobile nav */}
              <div className="mb-6 rounded-lg border border-border bg-surface p-3 shadow-card lg:hidden">
                <div className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-ink-faint">Navigation</div>
                <SidebarNav />
              </div>

              {title || subtitle || titleActions ? (
                <header className="mb-8">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                    <div className="min-w-0">
                      {title ? (
                        <h1 className="text-2xl font-semibold tracking-tight text-ink sm:text-[1.65rem]">{title}</h1>
                      ) : null}
                      {subtitle ? (
                        <div className="mt-2 max-w-3xl text-sm leading-relaxed text-ink-secondary">{subtitle}</div>
                      ) : null}
                    </div>
                    {titleActions ? <div className="flex shrink-0 flex-wrap items-center gap-2">{titleActions}</div> : null}
                  </div>
                </header>
              ) : null}

              <div className="space-y-6">{children}</div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
