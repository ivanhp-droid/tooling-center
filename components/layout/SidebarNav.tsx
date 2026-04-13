import type { ReactNode } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { cn } from '@/lib/utils/cn';
import { IconHistory, IconLayoutGrid, IconSettings } from '@/components/icons/NavIcons';

type NavItem = {
  href: string;
  label: string;
  description: string;
  icon: ReactNode;
};

const navItems: NavItem[] = [
  { href: '/', label: 'Dashboard', description: 'Tool catalog', icon: <IconLayoutGrid /> },
  { href: '/history', label: 'History', description: 'Past runs', icon: <IconHistory /> },
  { href: '/settings', label: 'Settings', description: 'API key', icon: <IconSettings /> }
];

function isActivePath(currentPath: string, href: string) {
  if (href === '/') return currentPath === '/';
  return currentPath === href || currentPath.startsWith(`${href}/`);
}

export function SidebarNav() {
  const router = useRouter();
  const pathname = router.pathname;

  return (
    <nav className="space-y-0.5 px-2 pb-4" aria-label="Primary">
      <div className="px-2 pb-3 pt-2 text-[11px] font-semibold uppercase tracking-wider text-ink-faint">Workspace</div>
      {navItems.map((item) => {
        const active = isActivePath(pathname, item.href);
        return (
          <Link
            key={item.href}
            href={item.href}
            aria-current={active ? 'page' : undefined}
            className={cn(
              'flex items-start gap-3 rounded-md px-2.5 py-2 text-sm transition-colors',
              active
                ? 'bg-canvas-muted text-ink'
                : 'text-ink-secondary hover:bg-canvas-muted/70 hover:text-ink'
            )}
          >
            <span className={cn('mt-0.5 shrink-0', active ? 'text-accent' : 'text-ink-muted')}>{item.icon}</span>
            <span className="min-w-0">
              <span className="block font-medium leading-tight">{item.label}</span>
              <span className="mt-0.5 block text-xs font-normal text-ink-muted">{item.description}</span>
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
