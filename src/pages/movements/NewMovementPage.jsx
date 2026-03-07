import { Button } from '../../components/Button'
import { FormField } from '../../components/FormField'
import { PageHeader } from '../../components/PageHeader'
import { PhoneFrame } from '../../components/PhoneFrame'

export function NewMovementPage() {
  return (
    <PhoneFrame>
      <PageHeader title="Agregar movimiento" backTo="/movimientos" />

      <section className="space-y-4 rounded-3xl border border-slate-200 bg-white p-4">
        <FormField label="Tipo *" value="Selecciona el tipo" />
        <FormField label="Monto *" placeholder="Ingresa el monto" />
        <FormField label="Categoria *" value="Selecciona la categoria" />
        <FormField label="Fecha de inicio *" value="dd/mm/aa" />
      </section>

      <div className="mt-6">
        <Button to="/movimientos">Guardar</Button>
      </div>
    </PhoneFrame>
  )
}
