import { NavLink } from 'react-router-dom'

const NAV_ITEMS = [
  { to: '/dashboard', label: 'Inicio' },
  { to: '/movimientos', label: 'Movimientos' },
  { to: '/categorias', label: 'Categorias' },
  { to: '/metas', label: 'Metas' },
  { to: '/recordatorios/vacio', label: 'Recordatorios' },
]

export function BottomNav() {
  return (
    <nav className="sticky bottom-0 mt-6 rounded-2xl border border-slate-200 bg-white/95 p-2 backdrop-blur">
      <ul className="grid grid-cols-5 gap-1">
        {NAV_ITEMS.map((item) => (
          <li key={item.to}>
            <NavLink
              to={item.to}
              className={({ isActive }) =>
                [
                  'block rounded-xl px-1 py-2 text-center text-[10px] font-semibold transition',
                  isActive
                    ? 'bg-lime-500 text-slate-900'
                    : 'text-slate-500 hover:bg-slate-100',
                ].join(' ')
              }
            >
              {item.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  )
}
