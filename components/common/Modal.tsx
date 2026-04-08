import { useEffect } from 'react';
import { Button } from '@/components/common/Button';

export function Modal(props: {
  open: boolean;
  title: string;
  description?: string;
  confirmText?: string;
  confirmVariant?: 'primary' | 'danger';
  onConfirm: () => void;
  onClose: () => void;
  children?: React.ReactNode;
}) {
  const { open, title, description, confirmText = 'Confirm', confirmVariant = 'primary', onConfirm, onClose, children } =
    props;

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/30" onClick={onClose} />
      <div className="absolute inset-0 flex items-center justify-center p-6">
        <div className="w-full max-w-2xl rounded border bg-white shadow">
          <div className="border-b px-4 py-3">
            <div className="text-sm font-semibold">{title}</div>
            {description ? <div className="mt-1 text-sm text-neutral-600">{description}</div> : null}
          </div>
          <div className="px-4 py-4">{children}</div>
          <div className="flex items-center justify-end gap-2 border-t px-4 py-3">
            <Button variant="secondary" onClick={onClose}>
              Cancel
            </Button>
            <Button variant={confirmVariant} onClick={onConfirm}>
              {confirmText}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

