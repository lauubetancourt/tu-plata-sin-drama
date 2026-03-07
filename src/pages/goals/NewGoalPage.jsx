import { Button } from '../../components/Button'
import { FormField } from '../../components/FormField'
import { PageHeader } from '../../components/PageHeader'
import { PhoneFrame } from '../../components/PhoneFrame'

export function NewGoalPage() {
  return (
    <PhoneFrame>
      <PageHeader title="Crea tu meta" backTo="/metas/intro" />

      <section className="space-y-4 rounded-3xl border border-slate-200 bg-white p-4">
        <FormField label="Nombre de meta *" placeholder="Ingresa el nombre" />
        <FormField label="Valor de meta *" placeholder="Ingresa el monto" />
        <FormField label="Fecha limite *" value="dd/mm/aa" />
      </section>

      <div className="mt-6">
        <Button to="/metas">Guardar</Button>
      </div>
    </PhoneFrame>
  )
}
