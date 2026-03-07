import { Card, CardContent } from '@/components/ui/card'
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
            <span className="text-primary">Guardar</span>
          </span>
        }
        title="Registro express"
      />

      <Card className="rounded-3xl py-0">
        <CardContent className="space-y-4 p-4">
          <FormField label="Tipo *" value="Gasto" />
          <FormField label="Monto *" placeholder="Ingresa el monto" />
          <FormField label="Categoria *" value="Comida" />
          <FormField label="Fecha *" value="06/03/26" />
        </CardContent>
      </Card>

      <div className="mt-6">
        <Button to="/dashboard">Guardar movimiento</Button>
      </div>
    </PhoneFrame>
  )
}
