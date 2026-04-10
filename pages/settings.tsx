import { useMemo, useState } from 'react';
import { useClient } from '@/lib/hooks/useClient';
import { AdminLayout } from '@/components/layout/AdminLayout';
import { PageHeader } from '@/components/layout/PageHeader';
import { apiKeyStore, classifyApiKey } from '@/lib/storage/apiKeyStore';
import { ApiKeyInput } from '@/components/tools/ApiKeyInput';
import { Card } from '@/components/common/Card';
import { Badge } from '@/components/common/Badge';
import { Alert } from '@/components/common/Alert';

export default function SettingsPage() {
  const client = useClient();
  const [bump, setBump] = useState(0);
  const present = Boolean(client && apiKeyStore.status().present);
  const health = useMemo(() => {
    void bump;
    return present ? classifyApiKey(apiKeyStore.get()) : 'missing';
  }, [present, bump]);

  const [savedMsg, setSavedMsg] = useState<string | null>(null);

  function onSave(value: string) {
    apiKeyStore.set(value);
    setBump((b) => b + 1);
    setSavedMsg('Key saved in this browser. Return to a tool to run with the new credential.');
    setTimeout(() => setSavedMsg(null), 4000);
  }

  function onClear() {
    apiKeyStore.clear();
    setBump((b) => b + 1);
    setSavedMsg('Key removed from this browser.');
    setTimeout(() => setSavedMsg(null), 4000);
  }

  return (
    <AdminLayout>
      <PageHeader
        title="Settings"
        subtitle="Session configuration for Tooling Center. Nothing here leaves your machine except real API calls when you wire them up."
      />

      <div className="max-w-2xl space-y-6">
        <Card title="API key" subtitle="Required for tools that call authenticated endpoints.">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
            <div>
              <div className="text-sm font-medium text-slate-900">Status</div>
              <div className="mt-1 text-xs text-slate-600">Local check only — production still validates server-side.</div>
            </div>
            <Badge
              tone={!present ? 'warning' : health === 'ok' ? 'success' : health === 'expired' ? 'warning' : 'danger'}
            >
              {!present ? 'Missing' : health === 'ok' ? 'Ready' : health === 'expired' ? 'Review key' : 'Invalid format'}
            </Badge>
          </div>

          <div className="pt-4">
            <ApiKeyInput onSave={onSave} onClear={onClear} present={present} />
            {savedMsg ? (
              <p className="mt-3 text-sm text-emerald-800" role="status">
                {savedMsg}
              </p>
            ) : null}
          </div>
        </Card>

        <Alert variant="info" title="About mock mode">
          This build uses mock execution and local history. When you connect a real backend, keys should be exchanged
          through your SSO or secret store — not pasted long-term in localStorage.
        </Alert>
      </div>
    </AdminLayout>
  );
}
