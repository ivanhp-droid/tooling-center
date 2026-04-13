import { useCallback, useRef, useState } from 'react';
import { Button } from '@/components/common/Button';
import { cn } from '@/lib/utils/cn';

export function CsvUploader(props: {
  onLoaded: (args: { filename: string; text: string }) => void | Promise<void>;
  disabled?: boolean;
}) {
  const { onLoaded, disabled } = props;
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [filename, setFilename] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const loadFile = useCallback(
    async (file: File) => {
      if (!file.name.toLowerCase().endsWith('.csv') && file.type && file.type !== 'text/csv' && file.type !== 'application/vnd.ms-excel') {
        // Still try — some browsers omit MIME; rely on parse later
      }
      const text = await file.text();
      setFilename(file.name);
      await onLoaded({ filename: file.name, text });
    },
    [onLoaded]
  );

  return (
    <div className="space-y-2">
      <label className="sr-only" htmlFor="tc-csv-input">
        Upload CSV file
      </label>
      <input
        id="tc-csv-input"
        ref={inputRef}
        type="file"
        accept=".csv,text/csv"
        disabled={disabled}
        className="sr-only"
        onChange={async (e) => {
          const file = e.target.files?.[0];
          if (!file) return;
          await loadFile(file);
          e.target.value = '';
        }}
      />

      <div
        role="button"
        tabIndex={0}
        aria-disabled={disabled}
        onKeyDown={(e) => {
          if (disabled) return;
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            inputRef.current?.click();
          }
        }}
        onDragEnter={(e) => {
          e.preventDefault();
          if (!disabled) setIsDragging(true);
        }}
        onDragOver={(e) => {
          e.preventDefault();
          if (!disabled) setIsDragging(true);
        }}
        onDragLeave={(e) => {
          e.preventDefault();
          setIsDragging(false);
        }}
        onDrop={async (e) => {
          e.preventDefault();
          setIsDragging(false);
          if (disabled) return;
          const file = e.dataTransfer.files?.[0];
          if (!file) return;
          await loadFile(file);
        }}
        className={cn(
          'rounded-lg border-2 border-dashed px-4 py-8 text-center transition-colors',
          disabled ? 'cursor-not-allowed border-border bg-canvas-muted text-ink-faint' : 'cursor-pointer',
          !disabled && isDragging && 'border-accent bg-accent-soft',
          !disabled && !isDragging && 'border-border bg-surface hover:border-border hover:bg-canvas-muted/80'
        )}
        onClick={() => {
          if (!disabled) inputRef.current?.click();
        }}
      >
        <div className="text-sm font-medium text-ink">
          {isDragging ? 'Drop CSV here' : 'Drag and drop a CSV here'}
        </div>
        <div className="mt-1 text-xs text-ink-secondary">or use the button below — UTF-8 `.csv` exports work best</div>
        <div className="mt-4 flex justify-center">
          <Button
            type="button"
            variant="secondary"
            disabled={disabled}
            onClick={(e) => {
              e.stopPropagation();
              inputRef.current?.click();
            }}
          >
            Choose file…
          </Button>
        </div>
      </div>

      {filename ? (
        <p className="text-sm text-ink-secondary">
          Loaded file: <span className="font-mono font-medium text-ink">{filename}</span>
        </p>
      ) : (
        <p className="text-xs text-ink-muted">Maximum practical size in-browser: keep files under a few MB for smooth preview.</p>
      )}
    </div>
  );
}
