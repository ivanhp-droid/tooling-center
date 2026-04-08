import Link from 'next/link';
import { useRouter } from 'next/router';
import { useMemo } from 'react';
import { AdminLayout } from '@/components/layout/AdminLayout';
import { PageHeader } from '@/components/layout/PageHeader';
import { getHistoryById } from '@/lib/storage/historyStore';
import { Card } from '@/components/common/Card';
import { Button } from '@/components/common/Button';

export default function HistoryDetailPage() {
  const router = useRouter();
  const id = typeof router.query.id === 'string' ? router.query.id : '';

  const record = useMemo(() => (id ? getHistoryById(id) : null), [id]);

  if (!record) {
    return (
      <AdminLayout>
        <PageHeader
          title="History item not found"
          actions={
            <Link href="/history" className="text-sm text-slate-700 hover:underline">
              ← Back to history
            </Link>
          }
        />
        <Card>
          <div className="text-sm text-slate-700">No history item with id: {id || '(missing)'}</div>
        </Card>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <PageHeader
        title={record.toolName}
        subtitle={new Date(record.timestamp).toLocaleString()}
        actions={
          <Link href="/history" className="text-sm text-slate-700 hover:underline">
            ← Back to history
          </Link>
        }
      />

      <div className="space-y-4">
        <Card
          title="Summary"
          subtitle={`${record.status} · ${record.resultSummary.success}/${record.resultSummary.total} ok`}
        >
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div>
              <div className="text-xs text-slate-600">CSV filename</div>
              <div className="font-mono">{record.csvFilename ?? '—'}</div>
            </div>
            <div>
              <div className="text-xs text-slate-600">Row count</div>
              <div>{record.rowCount ?? '—'}</div>
            </div>
            <div>
              <div className="text-xs text-slate-600">API key used</div>
              <div>{record.auth.apiKeyUsed ? 'yes (stored as redacted)' : 'no'}</div>
            </div>
            <div>
              <div className="text-xs text-slate-600">Tool</div>
              <div>
                <Link className="text-blue-700 hover:underline" href={`/tools/${record.toolId}`}>
                  Open tool →
                </Link>
              </div>
            </div>
          </div>
        </Card>

        <Card title="Inputs (sanitized)">
          <pre className="overflow-auto rounded bg-slate-50 p-3 text-xs">
            {JSON.stringify(record.inputSummary, null, 2)}
          </pre>
          <div className="mt-3">
            <Button
              variant="secondary"
              onClick={() => {
                navigator.clipboard.writeText(JSON.stringify(record.inputSummary, null, 2)).catch(() => {});
              }}
            >
              Copy to clipboard
            </Button>
          </div>
        </Card>
      </div>
    </AdminLayout>
  );
}

