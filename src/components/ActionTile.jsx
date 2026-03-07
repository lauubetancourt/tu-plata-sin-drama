import { Link } from 'react-router-dom'

export function ActionTile({ to, title, subtitle }) {
  return (
    <Link
      to={to}
      className="block rounded-2xl border border-slate-200 bg-white p-3 transition hover:border-lime-300 hover:bg-lime-50"
    >
      <p className="text-sm font-bold text-slate-800">{title}</p>
      <p className="mt-1 text-xs text-slate-500">{subtitle}</p>
    </Link>
  )
}
