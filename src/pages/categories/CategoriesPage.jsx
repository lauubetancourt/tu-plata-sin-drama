import { BottomNav } from '../../components/BottomNav'
import { Button } from '../../components/Button'
import { PageHeader } from '../../components/PageHeader'
import { PhoneFrame } from '../../components/PhoneFrame'

const CATEGORIES = ['Comida', 'Hogar', 'Estudio', 'Transporte', 'Personal']

export function CategoriesPage() {
  return (
    <PhoneFrame>
      <PageHeader title="Categorias" backTo="/dashboard" />

      <section className="space-y-2 rounded-3xl border border-slate-200 bg-white p-4">
        {CATEGORIES.map((category) => (
          <div
            key={category}
            className="rounded-xl border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-700"
          >
            {category}
          </div>
        ))}
      </section>

      <div className="mt-5">
        <Button to="/movimientos/nuevo">Agregar movimiento</Button>
      </div>

      <BottomNav />
    </PhoneFrame>
  )
}
