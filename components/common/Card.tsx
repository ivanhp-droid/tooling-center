import type { ReactNode } from 'react';

export function Card(props: { title?: string; subtitle?: ReactNode; children: ReactNode; className?: string }) {
  const { title, subtitle, children, className } = props;
  return (
    <div className={['rounded border border-slate-200 bg-white', className ?? ''].join(' ')}>
      {title ? (
        <div className="border-b border-slate-200 px-4 py-3">
          <div className="text-sm font-semibold text-slate-900">{title}</div>
          {subtitle ? <div className="mt-1 text-xs text-slate-600">{subtitle}</div> : null}
        </div>
      ) : null}
      <div className="px-4 py-3">{children}</div>
    </div>
  );
}

