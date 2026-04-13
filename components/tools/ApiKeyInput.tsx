import { useMemo, useState } from 'react';
import { apiKeyStore, classifyApiKey } from '@/lib/storage/apiKeyStore';
import { useClient } from '@/lib/hooks/useClient';
import { Button } from '@/components/common/Button';
import { Badge } from '@/components/common/Badge';
import { Alert } from '@/components/common/Alert';
import { cn } from '@/lib/utils/cn';
import { inputBaseClass } from '@/components/ui/formClasses';

export function ApiKeyInput(props: {
  present: boolean;
  onSave: (value: string) => void;
  onClear: () => void;
}) {
  const { present, onSave, onClear } = props;
  const client = useClient();
  const [value, setValue] = useState('');

  const masked = useMemo(() => (client && present ? apiKeyStore.status().masked : undefined), [client, present]);
  const health = useMemo(() => (client && present ? classifyApiKey(apiKeyStore.get()) : 'missing'), [client, present]);

  return (
    <div className="space-y-3">
      {present && masked ? (
        <div className="flex flex-wrap items-center gap-2 text-sm text-ink-secondary">
          <span className="text-ink-secondary">Saved key:</span>
          <span className="font-mono text-ink">{masked}</span>
          <Badge tone={health === 'ok' ? 'success' : health === 'expired' ? 'warning' : 'danger'}>
            {health === 'ok' ? 'Passes local check' : health === 'expired' ? 'Expired / revoked (mock)' : 'Invalid format'}
          </Badge>
        </div>
      ) : null}

      <div className="flex flex-col gap-2 sm:flex-row sm:items-stretch">
        <label htmlFor="settings-api-key" className="sr-only">
          API key
        </label>
        <input
          id="settings-api-key"
          className={cn('min-w-0 flex-1 font-mono', inputBaseClass)}
          type="password"
          placeholder="Paste API key (never shared or logged)"
          autoComplete="off"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <div className="flex gap-2">
          <Button
            type="button"
            variant="primary"
            onClick={() => {
              if (value.trim().length === 0) return;
              onSave(value);
              setValue('');
            }}
            disabled={value.trim().length === 0}
          >
            Save key
          </Button>
          <Button type="button" variant="secondary" onClick={onClear} disabled={!present}>
            Clear key
          </Button>
        </div>
      </div>

      <Alert variant="info" title="Security note">
        Keys stay in this browser only. Rotate keys from your identity provider if you suspect exposure. History never
        stores raw keys.
      </Alert>
    </div>
  );
}
