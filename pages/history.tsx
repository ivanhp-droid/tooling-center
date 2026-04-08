import { useState } from 'react';
import { AdminLayout } from '@/components/layout/AdminLayout';
import { PageHeader } from '@/components/layout/PageHeader';
import { listHistory, clearHistory, type ExecutionHistoryRecord } from '@/lib/storage/historyStore';
import { HistoryTable } from '@/components/tools/HistoryTable';

export default function HistoryPage() {
  const [items, setItems] = useState<ExecutionHistoryRecord[]>(() => listHistory());

  return (
    <AdminLayout>
      <PageHeader
        title="Execution History"
        subtitle="Local history of tool runs in this browser."
        actions={
          <button
            className="rounded border px-3 py-2 text-sm hover:bg-slate-50"
            onClick={() => {
              clearHistory();
              setItems(listHistory());
            }}
          >
            Clear
          </button>
        }
      />

      <HistoryTable items={items} />
    </AdminLayout>
  );
}

