import { Card, CardContent } from '@/components/ui/card'
import { Button } from '../../components/Button'
import { FormField } from '../../components/FormField'
import { PageHeader } from '../../components/PageHeader'
import { PhoneFrame } from '../../components/PhoneFrame'

export function NewMovementPage() {
  return (
    <PhoneFrame>
      <PageHeader title="Agregar movimiento" backTo="/movimientos" />

      <Card className="rounded-3xl py-0">
        <CardContent className="space-y-4 p-4">
          <FormField label="Tipo *" value="Selecciona el tipo" />
          <FormField label="Monto *" placeholder="Ingresa el monto" />
          <FormField label="Categoria *" value="Selecciona la categoria" />
          <FormField label="Fecha de inicio *" value="dd/mm/aa" />
        </CardContent>
      </Card>

      <div className="mt-6">
        <Button to="/movimientos">Guardar</Button>
      </div>
    </PhoneFrame>
  )
}
