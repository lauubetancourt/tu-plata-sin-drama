import { Button } from '../../components/Button'
import { FormField } from '../../components/FormField'
import { PageHeader } from '../../components/PageHeader'
import { PhoneFrame } from '../../components/PhoneFrame'

export function EditReminderPage() {
  return (
    <PhoneFrame>
      <PageHeader title="Editar tu recordatorio" backTo="/recordatorios" />

      <section className="space-y-4 rounded-3xl border border-slate-200 bg-white p-4">
        <FormField label="Descripcion *" value="Pago de tarjeta" />
        <FormField label="Fecha limite *" value="28/03/26" />
      </section>

      <div className="mt-6">
        <Button to="/recordatorios">Guardar</Button>
      </div>
    </PhoneFrame>
  )
}
