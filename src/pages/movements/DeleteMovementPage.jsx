import { Button } from '../../components/Button'
import { PageHeader } from '../../components/PageHeader'
import { PhoneFrame } from '../../components/PhoneFrame'

export function DeleteMovementPage() {
  return (
    <PhoneFrame>
      <PageHeader title="Movimientos" backTo="/movimientos" />

      <section className="rounded-2xl border border-slate-200 bg-white p-4">
        <p className="text-xs font-semibold text-slate-500">03 MAR 2026</p>
        <div className="mt-2 flex items-center justify-between">
          <p className="text-sm font-bold text-slate-800">Almuerzo</p>
          <p className="text-sm font-extrabold text-red-500">-$20.000</p>
        </div>
      </section>

      <section className="mt-5 rounded-3xl border border-red-200 bg-white p-5 text-center">
        <p className="text-sm font-semibold text-slate-700">
          ¿Estas seguro de que quieres eliminar este movimiento?
        </p>
        <div className="mt-4 grid grid-cols-2 gap-3">
          <Button to="/movimientos" variant="ghost">
            No
          </Button>
          <Button to="/movimientos" variant="danger">
            Si, eliminar
          </Button>
        </div>
      </section>
    </PhoneFrame>
  )
}
