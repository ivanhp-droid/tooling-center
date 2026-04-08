import Link from 'next/link';

export function PageHeader(props: { title: string; subtitle?: React.ReactNode; actions?: React.ReactNode }) {
  const { title, subtitle, actions } = props;
  return (
    <div className="border-b bg-white">
      <div className="mx-auto max-w-6xl px-6 py-4">
        <div className="flex items-start justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <Link href="/" className="hover:text-slate-700">
                Tooling Center
              </Link>
            </div>
            <h1 className="mt-1 text-xl font-semibold text-slate-900">{title}</h1>
            {subtitle ? <div className="mt-1 text-sm text-slate-600">{subtitle}</div> : null}
          </div>
          {actions ? <div className="pt-1">{actions}</div> : null}
        </div>
      </div>
    </div>
  );
}

