import { useMemo, useState } from 'react';
import { AdminLayout } from '@/components/layout/AdminLayout';
import { PageHeader } from '@/components/layout/PageHeader';
import { apiKeyStore } from '@/lib/storage/apiKeyStore';
import { ApiKeyInput } from '@/components/tools/ApiKeyInput';

export default function SettingsPage() {
  const initialStatus = useMemo(() => apiKeyStore.status(), []);
  const [masked, setMasked] = useState<string | undefined>(initialStatus.masked);
  const [present, setPresent] = useState<boolean>(initialStatus.present);
  const [savedMsg, setSavedMsg] = useState<string | null>(null);

  function onSave(value: string) {
    apiKeyStore.set(value);
    const st = apiKeyStore.status();
    setMasked(st.masked);
    setPresent(st.present);
    setSavedMsg('API key saved locally.');
    setTimeout(() => setSavedMsg(null), 2500);
  }

  function onClear() {
    apiKeyStore.clear();
    setMasked(undefined);
    setPresent(false);
    setSavedMsg('API key cleared.');
    setTimeout(() => setSavedMsg(null), 2500);
  }

  return (
    <AdminLayout>
      <PageHeader title="Settings" subtitle="Local settings for Tooling Center." />

      <div className="max-w-2xl space-y-4">
        <div className="rounded border bg-white p-4">
          <div className="flex items-center justify-between gap-4">
            <div>
              <div className="text-sm font-medium">API Key</div>
              <div className="text-xs text-slate-600">
                Stored locally in your browser. It’s required for most tools.
              </div>
            </div>
            <div className="text-sm">
              {present ? (
                <span className="rounded bg-emerald-50 px-2 py-1 text-emerald-700">Present</span>
              ) : (
                <span className="rounded bg-amber-50 px-2 py-1 text-amber-700">Missing</span>
              )}
            </div>
          </div>

          <div className="mt-4 space-y-3">
            {present && masked ? (
              <div className="text-sm text-slate-700">
                Current key: <span className="font-mono">{masked}</span>
              </div>
            ) : (
              <div className="text-sm text-slate-700">No API key saved.</div>
            )}

            <ApiKeyInput onSave={onSave} onClear={onClear} present={present} />

            {savedMsg ? <div className="text-xs text-slate-600">{savedMsg}</div> : null}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}

