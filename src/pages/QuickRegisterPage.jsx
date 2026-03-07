import { Button } from '../components/Button'
import { FormField } from '../components/FormField'
import { PageHeader } from '../components/PageHeader'
import { PhoneFrame } from '../components/PhoneFrame'

export function QuickRegisterPage() {
  return (
    <PhoneFrame>
      <PageHeader
        backTo="/dashboard"
        rightSlot={
          <span className="inline-flex items-center gap-3">
            <span>Cancelar</span>
            <span className="text-lime-700">Guardar</span>
          </span>
        }
        title="Registro express"
      />

      <section className="space-y-4 rounded-3xl border border-slate-200 bg-white p-4">
        <FormField label="Tipo *" value="Gasto" />
        <FormField label="Monto *" placeholder="Ingresa el monto" />
        <FormField label="Categoria *" value="Comida" />
        <FormField label="Fecha *" value="06/03/26" />
      </section>

      <div className="mt-6">
        <Button to="/dashboard">Guardar movimiento</Button>
      </div>
    </PhoneFrame>
  )
}
