import { Modal } from '@/components/common/Modal';
import type { RiskLevel } from '@/lib/tools/types';

export function ConfirmationModal(props: {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  riskLevel: RiskLevel;
  title: string;
  body: React.ReactNode;
  confirmLabel?: string;
}) {
  const { open, onClose, onConfirm, riskLevel, title, body, confirmLabel = 'Confirm & Run' } = props;

  const riskTone =
    riskLevel === 'high' ? 'border-red-300 bg-red-50' : riskLevel === 'medium' ? 'border-yellow-300 bg-yellow-50' : '';

  const confirmVariant = riskLevel === 'high' ? 'danger' : 'primary';

  return (
    <Modal
      open={open}
      onClose={onClose}
      onConfirm={onConfirm}
      confirmText={confirmLabel}
      confirmVariant={confirmVariant}
      title={title}
    >
      <div className="space-y-4">
        <div className={`rounded border p-3 text-sm ${riskTone}`}>
          <div className="font-medium">Risk level: {riskLevel.toUpperCase()}</div>
          <div className="text-gray-700">
            Review your inputs carefully. This tool performs bulk operations and may be difficult to undo.
          </div>
        </div>
        <div className="text-sm text-gray-900">{body}</div>
      </div>
    </Modal>
  );
}

