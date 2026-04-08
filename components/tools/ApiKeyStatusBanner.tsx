import Link from 'next/link';
import { Card } from '@/components/common/Card';
import { apiKeyStore } from '@/lib/storage/apiKeyStore';

export function ApiKeyStatusBanner(props: { requiresApiKey: boolean }) {
  const { requiresApiKey } = props;
  const status = apiKeyStore.status();

  if (!requiresApiKey) return null;

  return (
    <Card>
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="text-sm font-medium">API Key</div>
          {status.present ? (
            <div className="mt-1 text-sm text-slate-700">
              Saved: <span className="font-mono">{status.masked}</span>
            </div>
          ) : (
            <div className="mt-1 text-sm text-slate-700">No API key saved.</div>
          )}
          <div className="mt-2 text-xs text-slate-500">
            Keys are stored locally in your browser. This is mock persistence for now.
          </div>
        </div>
        <Link className="text-sm font-medium text-blue-700 hover:underline" href="/settings">
          Manage
        </Link>
      </div>
    </Card>
  );
}

