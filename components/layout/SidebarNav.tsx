import Link from 'next/link';
import { useRouter } from 'next/router';

type NavItem = {
  href: string;
  label: string;
};

const navItems: NavItem[] = [
  { href: '/', label: 'Dashboard' },
  { href: '/history', label: 'Execution History' },
  { href: '/settings', label: 'Settings' }
];

function isActivePath(currentPath: string, href: string) {
  if (href === '/') return currentPath === '/';
  return currentPath === href || currentPath.startsWith(`${href}/`);
}

export function SidebarNav() {
  const router = useRouter();
  const pathname = router.pathname;

  return (
    <nav className="space-y-1">
      {navItems.map((item) => {
        const active = isActivePath(pathname, item.href);
        return (
          <Link
            key={item.href}
            href={item.href}
            className={[
              'block rounded px-3 py-2 text-sm',
              active ? 'bg-slate-200 font-medium text-slate-900' : 'text-slate-700 hover:bg-slate-100'
            ].join(' ')}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}

