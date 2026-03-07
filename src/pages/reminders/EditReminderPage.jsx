import { Card, CardContent } from '@/components/ui/card'
import { Button } from '../../components/Button'
import { FormField } from '../../components/FormField'
import { PageHeader } from '../../components/PageHeader'
import { PhoneFrame } from '../../components/PhoneFrame'

export function EditReminderPage() {
  return (
    <PhoneFrame>
      <PageHeader title="Editar tu recordatorio" backTo="/recordatorios" />

      <Card className="rounded-3xl py-0">
        <CardContent className="space-y-4 p-4">
          <FormField label="Descripcion *" value="Pago de tarjeta" />
          <FormField label="Fecha limite *" value="28/03/26" />
        </CardContent>
      </Card>

      <div className="mt-6">
        <Button to="/recordatorios">Guardar</Button>
      </div>
    </PhoneFrame>
  )
}
