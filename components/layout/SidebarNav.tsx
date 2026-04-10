import Link from 'next/link';
import { useRouter } from 'next/router';
import { cn } from '@/lib/utils/cn';

type NavItem = {
  href: string;
  label: string;
  description: string;
};

const navItems: NavItem[] = [
  { href: '/', label: 'Dashboard', description: 'Tool catalog' },
  { href: '/history', label: 'History', description: 'Past runs' },
  { href: '/settings', label: 'Settings', description: 'API key' }
];

function isActivePath(currentPath: string, href: string) {
  if (href === '/') return currentPath === '/';
  return currentPath === href || currentPath.startsWith(`${href}/`);
}

export function SidebarNav() {
  const router = useRouter();
  const pathname = router.pathname;

  return (
    <nav className="space-y-1" aria-label="Primary">
      {navItems.map((item) => {
        const active = isActivePath(pathname, item.href);
        return (
          <Link
            key={item.href}
            href={item.href}
            aria-current={active ? 'page' : undefined}
            className={cn(
              'block rounded-md px-3 py-2 text-sm transition-colors',
              active
                ? 'bg-slate-900 text-white shadow-sm'
                : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'
            )}
          >
            <span className="font-medium">{item.label}</span>
            <span className={cn('mt-0.5 block text-xs', active ? 'text-slate-200' : 'text-slate-500')}>
              {item.description}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
