import Link from 'next/link';
import { Card } from '@/components/common/Card';
import { apiKeyStore, classifyApiKey } from '@/lib/storage/apiKeyStore';
import { useClient } from '@/lib/hooks/useClient';
import { Badge } from '@/components/common/Badge';
import { Alert } from '@/components/common/Alert';

export function ApiKeyStatusBanner(props: { requiresApiKey: boolean }) {
  const { requiresApiKey } = props;
  const client = useClient();

  if (!requiresApiKey) return null;

  if (!client) {
    return (
      <Card title="API access">
        <p className="text-sm text-ink-secondary">Checking API key status…</p>
      </Card>
    );
  }

  const status = apiKeyStore.status();
  const raw = apiKeyStore.get();
  const health = classifyApiKey(raw);

  return (
    <Card
      title="API access"
      subtitle="Tools use your personal API key for this session. Keys stay in your browser only."
    >
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0 space-y-2">
          {status.present ? (
            <>
              <div className="flex flex-wrap items-center gap-2">
                <Badge tone={health === 'ok' ? 'success' : health === 'expired' ? 'warning' : 'danger'}>
                  {health === 'ok'
                    ? 'Key on file'
                    : health === 'expired'
                      ? 'Key may be expired'
                      : health === 'invalid'
                        ? 'Key looks invalid'
                        : 'No key'}
                </Badge>
                <span className="font-mono text-sm text-ink">{status.masked}</span>
              </div>
              {health !== 'ok' ? (
                <Alert variant={health === 'expired' ? 'warning' : 'error'} role="alert" title="Key check">
                  {health === 'expired'
                    ? 'This key is flagged as expired or revoked in our mock check. Replace it in Settings before running tools.'
                    : 'This key is too short or matches a mock “invalid” pattern. Update it in Settings—real runs will still validate server-side.'}
                </Alert>
              ) : (
                <p className="text-sm text-ink-secondary">
                  You are cleared to run tools that require authentication. Execution never logs or stores the raw key.
                </p>
              )}
            </>
          ) : (
            <Alert variant="warning" title="API key required" role="alert">
              Add an API key in{' '}
              <Link className="font-medium text-ink underline" href="/settings">
                Settings
              </Link>{' '}
              before running this tool. Runs are blocked until a key is present.
            </Alert>
          )}
        </div>
        <Link
          className="inline-flex shrink-0 items-center justify-center rounded-md border border-border bg-surface px-3 py-2 text-sm font-medium text-ink hover:bg-canvas-muted"
          href="/settings"
        >
          Manage key
        </Link>
      </div>
    </Card>
  );
}
