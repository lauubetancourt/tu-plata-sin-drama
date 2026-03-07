import { Card, CardContent } from '@/components/ui/card'
import { Button } from '../../components/Button'
import { FormField } from '../../components/FormField'
import { PageHeader } from '../../components/PageHeader'
import { PhoneFrame } from '../../components/PhoneFrame'

export function EditMovementPage() {
  return (
    <PhoneFrame>
      <PageHeader title="Editar movimiento" backTo="/movimientos" />

      <Card className="rounded-3xl py-0">
        <CardContent className="space-y-4 p-4">
          <FormField label="Tipo *" value="Gasto" />
          <FormField label="Monto *" value="$110.000" />
          <FormField label="Categoria *" value="Personal" />
          <FormField label="Fecha de inicio *" value="02/03/26" />
        </CardContent>
      </Card>

      <div className="mt-6">
        <Button to="/movimientos">Guardar cambios</Button>
      </div>
    </PhoneFrame>
  )
}
