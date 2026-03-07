import { BottomNav } from '../../components/BottomNav'
import { Button } from '../../components/Button'
import { PageHeader } from '../../components/PageHeader'
import { PhoneFrame } from '../../components/PhoneFrame'

export function RemindersPage() {
  return (
    <PhoneFrame>
      <PageHeader title="Recordatorios" backTo="/dashboard" />

      <section className="rounded-3xl border border-slate-200 bg-white p-4">
        <p className="text-sm font-bold text-slate-800">Pago de tarjeta</p>
        <p className="mt-1 text-xs text-slate-500">28/03/26</p>
      </section>

      <div className="mt-5 grid grid-cols-2 gap-3">
        <Button to="/recordatorios/editar" variant="ghost">
          Editar
        </Button>
        <Button to="/recordatorios/vacio" variant="danger">
          Eliminar
        </Button>
      </div>

      <div className="mt-3">
        <Button to="/recordatorios/nuevo">Nuevo recordatorio</Button>
      </div>

      <BottomNav />
    </PhoneFrame>
  )
}
