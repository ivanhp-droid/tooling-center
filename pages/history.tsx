import { useMemo, useState } from 'react';
import Link from 'next/link';
import { AdminLayout } from '@/components/layout/AdminLayout';
import { listHistory, clearHistory, type ExecutionHistoryRecord } from '@/lib/storage/historyStore';
import { HistoryTable } from '@/components/tools/HistoryTable';
import { Button } from '@/components/common/Button';
import { EmptyState } from '@/components/common/EmptyState';
import { Badge } from '@/components/common/Badge';
import { FilterBar } from '@/components/ui/FilterBar';
import { inputBaseClass } from '@/components/ui/formClasses';
import { cn } from '@/lib/utils/cn';

type StatusFilter = 'all' | ExecutionHistoryRecord['status'];

export default function HistoryPage() {
  const [items, setItems] = useState<ExecutionHistoryRecord[]>(() => listHistory());
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState<StatusFilter>('all');

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return items.filter((h) => {
      if (status !== 'all' && h.status !== status) return false;
      if (!q) return true;
      return (
        h.toolName.toLowerCase().includes(q) ||
        h.toolId.toLowerCase().includes(q) ||
        (h.csvFilename ?? '').toLowerCase().includes(q)
      );
    });
  }, [items, query, status]);

  return (
    <AdminLayout
      title="Execution history"
      subtitle="Runs from this browser only. Filter the table, then open a row for a sanitized input snapshot."
      titleActions={
        <Button
          type="button"
          variant="secondary"
          onClick={() => {
            if (typeof window !== 'undefined' && !window.confirm('Clear all history on this device?')) return;
            clearHistory();
            setItems(listHistory());
          }}
        >
          Clear history
        </Button>
      }
    >
      {items.length === 0 ? (
        <EmptyState
          title="No runs yet"
          description="After you run a tool, a row appears here with counts, status, and a link to details. Nothing is synced to the server in mock mode."
          action={
            <Link
              href="/"
              className="inline-flex rounded-md border border-border bg-surface px-3 py-2 text-sm font-medium text-ink-secondary shadow-card hover:bg-canvas-muted hover:text-ink"
            >
              Go to dashboard
            </Link>
          }
        />
      ) : (
        <div className="space-y-4">
          <FilterBar>
            <div className="min-w-0 flex-1">
              <label htmlFor="hist-search" className="text-xs font-medium uppercase tracking-wide text-ink-faint">
                Search
              </label>
              <input
                id="hist-search"
                type="search"
                placeholder="Tool name, id, or CSV file…"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className={cn('mt-1', inputBaseClass)}
              />
            </div>
            <div className="w-full sm:w-48">
              <label htmlFor="hist-status" className="text-xs font-medium uppercase tracking-wide text-ink-faint">
                Status
              </label>
              <select
                id="hist-status"
                value={status}
                onChange={(e) => setStatus(e.target.value as StatusFilter)}
                className={cn('mt-1', inputBaseClass, 'bg-surface')}
              >
                <option value="all">All statuses</option>
                <option value="success">Success</option>
                <option value="partial_success">Partial</option>
                <option value="failed">Failed</option>
              </select>
            </div>
          </FilterBar>

          <div className="flex flex-wrap items-center gap-2 text-xs text-ink-secondary">
            <span>Showing</span>
            <Badge tone="neutral">
              {filtered.length} / {items.length}
            </Badge>
            <span>runs</span>
          </div>

          <HistoryTable items={filtered} />
        </div>
      )}
    </AdminLayout>
  );
}
