import { Button } from '../../components/Button'
import { FormField } from '../../components/FormField'
import { PageHeader } from '../../components/PageHeader'
import { PhoneFrame } from '../../components/PhoneFrame'

export function NewReminderPage() {
  return (
    <PhoneFrame>
      <PageHeader title="Nuevo recordatorio" backTo="/recordatorios/vacio" />

      <section className="space-y-4 rounded-3xl border border-slate-200 bg-white p-4">
        <FormField label="Descripcion *" placeholder="Ingresa la descripcion" />
        <FormField label="Fecha vencimiento *" value="dd/mm/aa" />
      </section>

      <div className="mt-6">
        <Button to="/recordatorios">Guardar</Button>
      </div>
    </PhoneFrame>
  )
}
