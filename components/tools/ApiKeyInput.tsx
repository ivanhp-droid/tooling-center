import { useMemo, useState } from 'react';
import { apiKeyStore } from '@/lib/storage/apiKeyStore';
import { Button } from '@/components/common/Button';

export function ApiKeyInput(props: {
  present: boolean;
  onSave: (value: string) => void;
  onClear: () => void;
}) {
  const { present, onSave, onClear } = props;
  const status = useMemo(() => apiKeyStore.status(), []);
  const [value, setValue] = useState('');
  const savedMasked = status.masked;

  return (
    <div className="flex gap-2">
      <input
        className="w-full rounded border px-3 py-2 text-sm"
        type="password"
        placeholder="Paste API key"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <Button
        variant="primary"
        onClick={() => {
          if (value.trim().length === 0) return;
          onSave(value);
          setValue('');
        }}
        disabled={value.trim().length === 0}
      >
        Save
      </Button>
      <Button
        variant="secondary"
        onClick={() => {
          onClear();
          setValue('');
        }}
        disabled={!present}
      >
        Clear
      </Button>

      <div className="hidden" aria-hidden>
        {savedMasked}
      </div>
    </div>
  );
}

