import Link from 'next/link';
import { useRouter } from 'next/router';
import { useMemo } from 'react';
import { AdminLayout } from '@/components/layout/AdminLayout';
import { PageHeader } from '@/components/layout/PageHeader';
import { getHistoryById } from '@/lib/storage/historyStore';
import { Card } from '@/components/common/Card';
import { Button } from '@/components/common/Button';
import { Badge } from '@/components/common/Badge';
import { formatDateTime, formatDurationMs } from '@/lib/format/datetime';

export default function HistoryDetailPage() {
  const router = useRouter();
  const id = typeof router.query.id === 'string' ? router.query.id : '';

  const record = useMemo(() => (id ? getHistoryById(id) : null), [id]);

  if (!record) {
    return (
      <AdminLayout>
        <PageHeader
          title="History entry not found"
          actions={
            <Link href="/history" className="rounded-md border border-slate-300 bg-white px-3 py-2 text-sm font-medium hover:bg-slate-50">
              ← Back to history
            </Link>
          }
        />
        <Card>
          <p className="text-sm text-slate-700">
            No saved run matches <span className="font-mono">{id || '(missing id)'}</span>. It may have been cleared or
            never existed on this browser.
          </p>
        </Card>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <PageHeader
        title={record.toolName}
        subtitle={`${formatDateTime(record.timestamp)} · ${formatDurationMs(record.durationMs)}`}
        actions={
          <Link href="/history" className="rounded-md border border-slate-300 bg-white px-3 py-2 text-sm font-medium hover:bg-slate-50">
            ← Back to history
          </Link>
        }
      />

      <div className="space-y-6">
        <Card title="Run summary" subtitle="Sanitized snapshot for audit — no raw API keys.">
          <dl className="grid gap-4 sm:grid-cols-2">
            <div>
              <dt className="text-xs font-medium uppercase tracking-wide text-slate-500">Status</dt>
              <dd className="mt-1">
                <Badge tone={record.status === 'success' ? 'success' : record.status === 'partial_success' ? 'warning' : 'danger'}>
                  {record.status}
                </Badge>
              </dd>
            </div>
            <div>
              <dt className="text-xs font-medium uppercase tracking-wide text-slate-500">Rows</dt>
              <dd className="mt-1 text-sm font-medium text-slate-900">{record.rowCount ?? '—'}</dd>
            </div>
            <div>
              <dt className="text-xs font-medium uppercase tracking-wide text-slate-500">CSV file</dt>
              <dd className="mt-1 font-mono text-sm text-slate-800">{record.csvFilename ?? '—'}</dd>
            </div>
            <div>
              <dt className="text-xs font-medium uppercase tracking-wide text-slate-500">API key used</dt>
              <dd className="mt-1 text-sm text-slate-800">{record.auth.apiKeyUsed ? 'Yes (redacted in summary)' : 'No'}</dd>
            </div>
            <div className="sm:col-span-2">
              <dt className="text-xs font-medium uppercase tracking-wide text-slate-500">Outcome</dt>
              <dd className="mt-1 text-sm text-slate-800">
                <span className="font-semibold text-emerald-800">{record.resultSummary.success}</span> succeeded ·{' '}
                <span className="font-semibold text-rose-800">{record.resultSummary.failed}</span> failed ·{' '}
                <span className="font-semibold text-amber-900">{record.resultSummary.skipped}</span> skipped ·{' '}
                <span className="text-slate-600">{record.resultSummary.total} total</span>
              </dd>
            </div>
            <div className="sm:col-span-2">
              <dt className="text-xs font-medium uppercase tracking-wide text-slate-500">Tool</dt>
              <dd className="mt-1">
                <Link className="font-medium text-sky-800 hover:underline" href={`/tools/${record.toolId}`}>
                  Open tool →
                </Link>
              </dd>
            </div>
          </dl>
        </Card>

        <Card title="Inputs (sanitized JSON)" subtitle="Share this block in Slack or a ticket — it contains no secrets.">
          <pre className="max-h-96 overflow-auto rounded-md border border-slate-200 bg-slate-50 p-4 text-xs leading-relaxed text-slate-800">
            {JSON.stringify(record.inputSummary, null, 2)}
          </pre>
          <div className="mt-4">
            <Button
              variant="secondary"
              type="button"
              onClick={() => {
                void navigator.clipboard.writeText(JSON.stringify(record.inputSummary, null, 2));
              }}
            >
              Copy JSON
            </Button>
          </div>
        </Card>
      </div>
    </AdminLayout>
  );
}
