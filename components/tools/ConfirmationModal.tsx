import { Modal } from '@/components/common/Modal';
import type { RiskLevel } from '@/lib/tools/types';
import { useMemo, useState } from 'react';
import { Button } from '@/components/common/Button';

export function ConfirmationModal(props: {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  riskLevel: RiskLevel;
  title: string;
  body: React.ReactNode;
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
    confirmLabel = 'Confirm & Run',
    mode = 'standard',
    warningText,
    requireCheckbox,
    typedConfirmText
  } = props;

  const riskTone =
    riskLevel === 'high' ? 'border-red-300 bg-red-50' : riskLevel === 'medium' ? 'border-yellow-300 bg-yellow-50' : '';

  const confirmVariant = riskLevel === 'high' ? 'danger' : 'primary';

  const [ack, setAck] = useState(false);
  const [typed, setTyped] = useState('');
  const typedOk = useMemo(() => {
    if (!typedConfirmText) return true;
    return typed.trim().toUpperCase() === typedConfirmText.trim().toUpperCase();
  }, [typed, typedConfirmText]);

  const canConfirm = mode !== 'strong' || ((requireCheckbox ? ack : true) && typedOk);

  return (
    <Modal
      open={open}
      onClose={onClose}
      onConfirm={() => {
        if (!canConfirm) return;
        onConfirm();
      }}
      confirmText={confirmLabel}
      confirmVariant={confirmVariant}
      title={title}
    >
      <div className="space-y-4">
        <div className={`rounded border p-3 text-sm ${riskTone}`}>
          <div className="font-medium">Risk level: {riskLevel.toUpperCase()}</div>
          <div className="text-gray-700">{warningText ?? 'Review your inputs carefully. Bulk operations may be difficult to undo.'}</div>
        </div>
        <div className="text-sm text-gray-900">{body}</div>
        {mode === 'strong' ? (
          <div className="space-y-3 rounded border border-slate-200 bg-slate-50 p-3 text-sm">
            {requireCheckbox ? (
              <label className="flex items-start gap-2">
                <input className="mt-1" type="checkbox" checked={ack} onChange={(e) => setAck(e.target.checked)} />
                <span>I understand this action can revoke access / change workflow in bulk and may be disruptive.</span>
              </label>
            ) : null}
            {typedConfirmText ? (
              <div className="space-y-1">
                <div className="text-xs text-slate-700">
                  Type <span className="font-mono">{typedConfirmText}</span> to confirm.
                </div>
                <input
                  className="w-full rounded border border-slate-300 px-3 py-2 font-mono text-sm"
                  value={typed}
                  onChange={(e) => setTyped(e.target.value)}
                  placeholder={typedConfirmText}
                />
                {!typedOk ? <div className="text-xs text-rose-700">Typed confirmation does not match.</div> : null}
              </div>
            ) : null}

            <div className="flex items-center justify-end">
              <Button
                variant={confirmVariant}
                disabled={!canConfirm}
                onClick={() => {
                  if (!canConfirm) return;
                  onConfirm();
                }}
              >
                {confirmLabel}
              </Button>
            </div>
          </div>
        ) : null}
      </div>
    </Modal>
  );
}

