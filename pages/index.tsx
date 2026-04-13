import Link from 'next/link';
import { useMemo, useState } from 'react';
import { AdminLayout } from '@/components/layout/AdminLayout';
import { ToolCatalog } from '@/components/tools/ToolCatalog';
import { toolCatalog } from '@/lib/tools';
import { Alert } from '@/components/common/Alert';
import { FilterBar } from '@/components/ui/FilterBar';
import { inputBaseClass } from '@/components/ui/formClasses';
import { cn } from '@/lib/utils/cn';

export default function DashboardPage() {
  const [q, setQ] = useState('');

  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return toolCatalog;
    return toolCatalog.filter(
      (t) =>
        t.name.toLowerCase().includes(s) ||
        t.id.toLowerCase().includes(s) ||
        t.category.toLowerCase().includes(s) ||
        t.description.toLowerCase().includes(s)
    );
  }, [q]);

  return (
    <AdminLayout
      title="Dashboard"
      subtitle={
        <>
          Browse bulk tools, then open one to upload a CSV, validate, and run. Set your API key in{' '}
          <Link
            className="font-medium text-accent underline decoration-border underline-offset-2 hover:text-accent-hover hover:decoration-accent-hover"
            href="/settings"
          >
            Settings
          </Link>{' '}
          before running authenticated tools.
        </>
      }
    >
      <FilterBar>
        <div className="min-w-0 flex-1">
          <label htmlFor="catalog-search" className="text-xs font-medium uppercase tracking-wide text-ink-faint">
            Search tools
          </label>
          <input
            id="catalog-search"
            type="search"
            placeholder="Search by name, id, category…"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            className={cn('mt-1', inputBaseClass)}
          />
        </div>
        <div className="text-xs text-ink-muted sm:self-end">
          <span className="font-medium text-ink-secondary">{filtered.length}</span> of {toolCatalog.length} tools
        </div>
      </FilterBar>

      <Alert variant="info" title="Local session">
        History and API keys stay in this browser only. Clear site data on shared machines when you are done.
      </Alert>

      <ToolCatalog tools={filtered} />
    </AdminLayout>
  );
}
