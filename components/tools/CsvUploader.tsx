import { useRef, useState } from 'react';
import { Button } from '@/components/common/Button';

export function CsvUploader(props: {
  onLoaded: (args: { filename: string; text: string }) => void;
  disabled?: boolean;
}) {
  const { onLoaded, disabled } = props;
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [filename, setFilename] = useState<string | null>(null);

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <input
          ref={inputRef}
          type="file"
          accept=".csv,text/csv"
          disabled={disabled}
          onChange={async (e) => {
            const file = e.target.files?.[0];
            if (!file) return;
            const text = await file.text();
            setFilename(file.name);
            onLoaded({ filename: file.name, text });
          }}
        />
        <Button
          type="button"
          variant="secondary"
          disabled={disabled}
          onClick={() => inputRef.current?.click()}
        >
          Choose CSV
        </Button>
      </div>
      {filename ? <div className="text-sm text-slate-600">Selected: {filename}</div> : null}
    </div>
  );
}

