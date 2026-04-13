import Link from 'next/link';
import { useRouter } from 'next/router';
import { useMemo } from 'react';
import { AdminLayout } from '@/components/layout/AdminLayout';
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
      <AdminLayout
        title="History entry not found"
        titleActions={
          <Link
            href="/history"
            className="rounded-md border border-border bg-surface px-3 py-2 text-sm font-medium text-ink-secondary shadow-card hover:bg-canvas-muted hover:text-ink"
          >
            ← Back to history
          </Link>
        }
      >
        <Card>
          <p className="text-sm text-ink-secondary">
            No saved run matches <span className="font-mono">{id || '(missing id)'}</span>. It may have been cleared or
            never existed on this browser.
          </p>
        </Card>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout
      title={record.toolName}
      subtitle={`${formatDateTime(record.timestamp)} · ${formatDurationMs(record.durationMs)}`}
      titleActions={
        <Link
          href="/history"
          className="rounded-md border border-border bg-surface px-3 py-2 text-sm font-medium text-ink-secondary shadow-card hover:bg-canvas-muted hover:text-ink"
        >
          ← Back to history
        </Link>
      }
    >
      <div className="space-y-6">
        <Card title="Run summary" subtitle="Sanitized snapshot for audit — no raw API keys.">
          <dl className="grid gap-4 sm:grid-cols-2">
            <div>
              <dt className="text-xs font-medium uppercase tracking-wide text-ink-faint">Status</dt>
              <dd className="mt-1">
                <Badge tone={record.status === 'success' ? 'success' : record.status === 'partial_success' ? 'warning' : 'danger'}>
                  {record.status}
                </Badge>
              </dd>
            </div>
            <div>
              <dt className="text-xs font-medium uppercase tracking-wide text-ink-faint">Rows</dt>
              <dd className="mt-1 text-sm font-medium text-ink">{record.rowCount ?? '—'}</dd>
            </div>
            <div>
              <dt className="text-xs font-medium uppercase tracking-wide text-ink-faint">CSV file</dt>
              <dd className="mt-1 font-mono text-sm text-ink">{record.csvFilename ?? '—'}</dd>
            </div>
            <div>
              <dt className="text-xs font-medium uppercase tracking-wide text-ink-faint">API key used</dt>
              <dd className="mt-1 text-sm text-ink">{record.auth.apiKeyUsed ? 'Yes (redacted in summary)' : 'No'}</dd>
            </div>
            <div className="sm:col-span-2">
              <dt className="text-xs font-medium uppercase tracking-wide text-ink-faint">Outcome</dt>
              <dd className="mt-1 text-sm text-ink">
                <span className="font-semibold text-success-text">{record.resultSummary.success}</span> succeeded ·{' '}
                <span className="font-semibold text-danger">{record.resultSummary.failed}</span> failed ·{' '}
                <span className="font-semibold text-warning-text">{record.resultSummary.skipped}</span> skipped ·{' '}
                <span className="text-ink-secondary">{record.resultSummary.total} total</span>
              </dd>
            </div>
            <div className="sm:col-span-2">
              <dt className="text-xs font-medium uppercase tracking-wide text-ink-faint">Tool</dt>
              <dd className="mt-1">
                <Link className="font-medium text-accent hover:text-accent-hover hover:underline" href={`/tools/${record.toolId}`}>
                  Open tool →
                </Link>
              </dd>
            </div>
          </dl>
        </Card>

        <Card title="Inputs (sanitized JSON)" subtitle="Share this block in Slack or a ticket — it contains no secrets.">
          <pre className="max-h-96 overflow-auto rounded-md border border-border bg-canvas-muted p-4 text-xs leading-relaxed text-ink tc-scroll">
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
