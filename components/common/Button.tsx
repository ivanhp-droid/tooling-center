import type { ButtonHTMLAttributes, PropsWithChildren } from 'react';

type Variant = 'primary' | 'secondary' | 'danger' | 'ghost';

export function Button(
  props: PropsWithChildren<
    ButtonHTMLAttributes<HTMLButtonElement> & {
      variant?: Variant;
      fullWidth?: boolean;
    }
  >
) {
  const { className = '', variant = 'primary', fullWidth, ...rest } = props;
  const base =
    'inline-flex items-center justify-center rounded-md border px-3 py-2 text-sm font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-50';
  const styles =
    variant === 'primary'
      ? 'border-slate-900 bg-slate-900 text-white hover:bg-slate-800'
      : variant === 'danger'
        ? 'border-rose-700 bg-rose-700 text-white hover:bg-rose-600'
        : variant === 'ghost'
          ? 'border-transparent bg-transparent text-slate-700 hover:bg-slate-100'
          : 'border-slate-300 bg-white text-slate-900 hover:bg-slate-50';
  const width = fullWidth ? ' w-full' : '';
  return <button className={`${base} ${styles}${width} ${className}`} {...rest} />;
}

