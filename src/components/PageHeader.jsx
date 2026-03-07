import { Link } from 'react-router-dom'

export function PageHeader({ title, backTo, rightSlot }) {
  return (
    <header className="mb-5 flex items-center justify-between">
      <div className="w-20">
        {backTo ? (
          <Link
            to={backTo}
            className="inline-flex items-center gap-1 text-sm font-semibold text-slate-700"
          >
            <span aria-hidden="true">&lt;</span>
            Volver
          </Link>
        ) : null}
      </div>
      <h1 className="text-base font-bold text-slate-900">{title}</h1>
      <div className="w-20 text-right text-xs font-semibold text-slate-500">
        {rightSlot}
      </div>
    </header>
  )
}
