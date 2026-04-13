import { Modal } from '@/components/common/Modal';
import type { RiskLevel } from '@/lib/tools/types';
import { useMemo, useState, type ReactNode } from 'react';
import { Button } from '@/components/common/Button';
import { Badge } from '@/components/common/Badge';
import { riskBadgeTone, riskLabel } from '@/lib/tools/risk';

export function ConfirmationModal(props: {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  riskLevel: RiskLevel;
  title: string;
  body: ReactNode;
  confirmLabel?: string;
  mode?: 'standard' | 'strong';
  warningText?: string;
  requireCheckbox?: boolean;
  typedConfirmText?: string;
}) {
  const {
    open,
    onClose,
    onConfirm,
    riskLevel,
    title,
    body,
    confirmLabel = 'Confirm and run',
    mode = 'standard',
    warningText,
    requireCheckbox,
    typedConfirmText
  } = props;

  const [ack, setAck] = useState(false);
  const [typed, setTyped] = useState('');

  const typedOk = useMemo(() => {
    if (!typedConfirmText) return true;
    return typed.trim().toUpperCase() === typedConfirmText.trim().toUpperCase();
  }, [typed, typedConfirmText]);

  const canConfirm = mode !== 'strong' || ((requireCheckbox ? ack : true) && typedOk);

  const riskBanner =
    riskLevel === 'high'
      ? 'border-danger-border bg-danger-soft text-danger'
      : riskLevel === 'medium'
        ? 'border-warning-border bg-warning-soft text-warning-text'
        : 'border-border bg-canvas-muted text-ink';

  const footerConfirm = () => {
    if (!canConfirm) return;
    onConfirm();
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      onConfirm={mode === 'strong' ? onClose : footerConfirm}
      confirmText={mode === 'strong' ? 'Close' : confirmLabel}
      confirmVariant={mode === 'strong' ? 'secondary' : riskLevel === 'high' ? 'danger' : 'primary'}
      title={title}
      description={
        mode === 'strong'
          ? 'Review the scope below. High-risk bulk actions need explicit acknowledgement.'
          : 'You are about to run a bulk operation. Confirm the file and parameters match what you intend.'
      }
      showFooter={mode !== 'strong'}
    >
      <div className="space-y-4">
        <div className="flex flex-wrap items-center gap-2">
          <Badge tone={riskBadgeTone(riskLevel)}>{riskLabel(riskLevel)}</Badge>
          {mode === 'strong' ? (
            <Badge tone="danger">Extra confirmation required</Badge>
          ) : (
            <Badge tone="neutral">Standard confirmation</Badge>
          )}
        </div>

        <div className={`rounded-lg border p-3 text-sm leading-relaxed ${riskBanner}`}>
          <div className="font-semibold text-ink">Before you continue</div>
          <p className="mt-1 text-ink">
            {warningText ??
              'Bulk tools can affect many records at once. Mistakes are costly to unwind—double-check your CSV and inputs.'}
          </p>
        </div>

        <div className="rounded-lg border border-border bg-surface p-3 text-sm text-ink">{body}</div>

        {mode === 'strong' ? (
          <div className="space-y-3 rounded-lg border border-border bg-canvas-muted p-4 text-sm">
            {requireCheckbox ? (
              <label className="flex cursor-pointer items-start gap-3">
                <input
                  className="mt-1 size-4 rounded border-border text-accent focus:ring-accent"
                  type="checkbox"
                  checked={ack}
                  onChange={(e) => setAck(e.target.checked)}
                />
                <span className="text-ink">
                  I understand this run may change production data for every row in the CSV, and that some effects may
                  be hard to reverse.
                </span>
              </label>
            ) : null}
            {typedConfirmText ? (
              <div className="space-y-2">
                <label htmlFor="tc-typed-confirm" className="text-xs font-medium text-ink-secondary">
                  Type <span className="font-mono font-semibold">{typedConfirmText}</span> to confirm you intend to run
                  this tool.
                </label>
                <input
                  id="tc-typed-confirm"
                  className="w-full rounded-md border border-border px-3 py-2 font-mono text-sm shadow-card focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                  value={typed}
                  onChange={(e) => setTyped(e.target.value)}
                  placeholder={typedConfirmText}
                  autoComplete="off"
                />
                {!typedOk ? (
                  <p className="text-xs text-danger" role="alert">
                    Confirmation text must match exactly (case-insensitive).
                  </p>
                ) : null}
              </div>
            ) : null}

            <div className="flex flex-wrap items-center justify-end gap-2 border-t border-border pt-3">
              <Button type="button" variant="secondary" onClick={onClose}>
                Cancel
              </Button>
              <Button type="button" variant={riskLevel === 'high' ? 'danger' : 'primary'} disabled={!canConfirm} onClick={footerConfirm}>
                {confirmLabel}
              </Button>
            </div>
          </div>
        ) : null}
      </div>
    </Modal>
  );
}
