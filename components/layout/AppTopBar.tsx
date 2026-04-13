import Link from 'next/link';
import { IconUser } from '@/components/icons/NavIcons';

export function AppTopBar() {
  return (
    <header className="flex h-14 shrink-0 items-center justify-end border-b border-border bg-surface px-6">
      <div className="flex items-center gap-3 text-ink-secondary">
        <span className="hidden text-xs sm:inline">Experts Portal</span>
        <Link
          href="/settings"
          className="flex size-9 items-center justify-center rounded-md border border-border-subtle text-ink-muted transition-colors hover:border-border hover:bg-canvas-muted hover:text-accent"
          aria-label="Account and settings"
        >
          <IconUser className="text-ink-secondary" />
        </Link>
      </div>
    </header>
  );
}
