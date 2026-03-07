import { Link } from 'react-router-dom'

function getVariant(variant) {
  if (variant === 'ghost') {
    return 'border border-slate-300 bg-white text-slate-700 hover:bg-slate-100'
  }

  if (variant === 'danger') {
    return 'bg-red-500 text-white hover:bg-red-600'
  }

  return 'bg-lime-500 text-slate-900 hover:bg-lime-400'
}

export function Button({
  to,
  children,
  variant = 'primary',
  className = '',
  type = 'button',
}) {
  const baseClass =
    'inline-flex w-full items-center justify-center rounded-2xl px-4 py-3 text-sm font-semibold transition'
  const classNames = `${baseClass} ${getVariant(variant)} ${className}`.trim()

  if (to) {
    return (
      <Link className={classNames} to={to}>
        {children}
      </Link>
    )
  }

  return (
    <button className={classNames} type={type}>
      {children}
    </button>
  )
}
