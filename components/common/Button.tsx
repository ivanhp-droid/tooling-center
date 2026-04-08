import type { ButtonHTMLAttributes, PropsWithChildren } from 'react';

type Variant = 'primary' | 'secondary' | 'danger';

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
    'inline-flex items-center justify-center rounded border px-3 py-2 text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed';
  const styles =
    variant === 'primary'
      ? 'border-slate-900 bg-slate-900 text-white hover:bg-slate-800'
      : variant === 'danger'
        ? 'border-red-600 bg-red-600 text-white hover:bg-red-500'
        : 'border-slate-300 bg-white text-slate-900 hover:bg-slate-50';
  const width = fullWidth ? ' w-full' : '';
  return <button className={`${base} ${styles}${width} ${className}`} {...rest} />;
}

