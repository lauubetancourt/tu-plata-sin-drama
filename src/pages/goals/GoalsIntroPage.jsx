import { Button } from '../../components/Button'
import { PageHeader } from '../../components/PageHeader'
import { PhoneFrame } from '../../components/PhoneFrame'

export function GoalsIntroPage() {
  return (
    <PhoneFrame>
      <PageHeader title="Metas de ahorro" backTo="/dashboard" />

      <section className="rounded-3xl border border-slate-200 bg-white p-5">
        <h2 className="text-xl font-black text-slate-900">Alcanza tus Metas de Ahorro</h2>
        <p className="mt-3 text-sm text-slate-600">
          Define un objetivo y ahorra paso a paso. Mantente enfocada con una
          visualizacion clara de tu avance.
        </p>
      </section>

      <div className="mt-6">
        <Button to="/metas/nueva">Nueva meta</Button>
      </div>
    </PhoneFrame>
  )
}
