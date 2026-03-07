import { Link } from 'react-router-dom'
import { BottomNav } from '../../components/BottomNav'
import { Button } from '../../components/Button'
import { PageHeader } from '../../components/PageHeader'
import { PhoneFrame } from '../../components/PhoneFrame'

const MOVEMENTS = [
  { id: 1, date: '03 MAR 2026', name: 'Almuerzo', amount: '-$20.000' },
  { id: 2, date: '03 MAR 2026', name: 'Transporte', amount: '-$5.000' },
  { id: 3, date: '02 MAR 2026', name: 'Mercado', amount: '-$110.000' },
]

export function MovementsPage() {
  return (
    <PhoneFrame>
      <PageHeader title="Movimientos" backTo="/dashboard" />

      <section className="space-y-3">
        {MOVEMENTS.map((movement) => (
          <article
            key={movement.id}
            className="rounded-2xl border border-slate-200 bg-white p-4"
          >
            <p className="text-xs font-semibold text-slate-500">{movement.date}</p>
            <div className="mt-2 flex items-center justify-between">
              <p className="text-sm font-bold text-slate-800">{movement.name}</p>
              <p className="text-sm font-extrabold text-red-500">{movement.amount}</p>
            </div>
            <div className="mt-3 flex gap-2">
              <Link
                className="rounded-lg bg-slate-100 px-2 py-1 text-xs font-semibold text-slate-600"
                to="/movimientos/editar"
              >
                Editar
              </Link>
              <Link
                className="rounded-lg bg-red-100 px-2 py-1 text-xs font-semibold text-red-600"
                to="/movimientos/eliminar"
              >
                Eliminar
              </Link>
            </div>
          </article>
        ))}
      </section>

      <div className="mt-5">
        <Button to="/movimientos/nuevo">Agregar movimiento</Button>
      </div>

      <BottomNav />
    </PhoneFrame>
  )
}
