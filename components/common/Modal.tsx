import { useEffect, useId, useRef, type ReactNode } from 'react';
import { Button } from '@/components/common/Button';
import { cn } from '@/lib/utils/cn';

export function Modal(props: {
  open: boolean;
  title: string;
  description?: string;
  confirmText?: string;
  confirmVariant?: 'primary' | 'secondary' | 'danger';
  onConfirm: () => void;
  onClose: () => void;
  children?: ReactNode;
  showFooter?: boolean;
}) {
  const {
    open,
    title,
    description,
    confirmText = 'Confirm',
    confirmVariant = 'primary',
    onConfirm,
    onClose,
    children,
    showFooter = true
  } = props;
  const titleId = useId();
  const descId = useId();
  const panelRef = useRef<HTMLDivElement>(null);
  const previouslyFocused = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!open) return;
    previouslyFocused.current = document.activeElement as HTMLElement | null;
    const t = window.setTimeout(() => {
      panelRef.current?.focus();
    }, 0);
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => {
      window.clearTimeout(t);
      window.removeEventListener('keydown', onKeyDown);
      previouslyFocused.current?.focus?.();
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50" role="presentation">
      <button
        type="button"
        className="absolute inset-0 bg-ink/20 backdrop-blur-[1px]"
        aria-label="Close dialog"
        onClick={onClose}
      />
      <div className="absolute inset-0 flex items-center justify-center p-4 sm:p-6">
        <div
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          aria-describedby={description ? descId : undefined}
          tabIndex={-1}
          className={cn(
            'w-full max-w-lg rounded-lg border border-border bg-surface shadow-card sm:max-w-2xl',
            'outline-none ring-1 ring-ink/5'
          )}
        >
          <div className="border-b border-border-subtle px-5 py-4">
            <h2 id={titleId} className="text-base font-semibold text-ink">
              {title}
            </h2>
            {description ? (
              <p id={descId} className="mt-1 text-sm leading-relaxed text-ink-secondary">
                {description}
              </p>
            ) : null}
          </div>
          <div className="max-h-[min(60vh,520px)] overflow-y-auto px-5 py-4 tc-scroll">{children}</div>
          {showFooter ? (
            <div className="flex items-center justify-end gap-2 border-t border-border-subtle bg-canvas-muted/50 px-5 py-3">
              <Button type="button" variant="secondary" onClick={onClose}>
                Cancel
              </Button>
              <Button type="button" variant={confirmVariant} onClick={onConfirm}>
                {confirmText}
              </Button>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
