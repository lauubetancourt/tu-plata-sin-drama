import { Card, CardContent } from '@/components/ui/card'
import { Button } from '../../components/Button'
import { FormField } from '../../components/FormField'
import { PageHeader } from '../../components/PageHeader'
import { PhoneFrame } from '../../components/PhoneFrame'

export function NewReminderPage() {
  return (
    <PhoneFrame>
      <PageHeader title="Nuevo recordatorio" backTo="/recordatorios/vacio" />

      <Card className="rounded-3xl py-0">
        <CardContent className="space-y-4 p-4">
          <FormField label="Descripcion *" placeholder="Ingresa la descripcion" />
          <FormField label="Fecha vencimiento *" value="dd/mm/aa" />
        </CardContent>
      </Card>

      <div className="mt-6">
        <Button to="/recordatorios">Guardar</Button>
      </div>
    </PhoneFrame>
  )
}
