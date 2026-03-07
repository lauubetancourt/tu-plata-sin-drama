import { BottomNav } from '../../components/BottomNav'
import { Button } from '../../components/Button'
import { PageHeader } from '../../components/PageHeader'
import { PhoneFrame } from '../../components/PhoneFrame'
import { ProgressBar } from '../../components/ProgressBar'

export function GoalsPage() {
  return (
    <PhoneFrame>
      <PageHeader title="Metas" backTo="/dashboard" />

      <section className="rounded-3xl border border-slate-200 bg-white p-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-slate-800">Viaje</h2>
          <p className="text-sm font-bold text-lime-700">78.6%</p>
        </div>
        <p className="mt-1 text-xs text-slate-500">$2.358.000 / $3.000.000</p>
        <p className="mt-1 text-xs text-slate-500">Fecha limite: 28/03/26</p>
        <div className="mt-3">
          <ProgressBar value={78.6} />
        </div>
      </section>

      <div className="mt-5 grid grid-cols-2 gap-3">
        <Button to="/metas/nueva" variant="ghost">
          Nueva meta
        </Button>
        <Button to="/metas/nueva">Editar</Button>
      </div>

      <BottomNav />
    </PhoneFrame>
  )
}
