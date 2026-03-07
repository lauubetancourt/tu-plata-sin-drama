import { Card, CardContent } from '@/components/ui/card'
import { Button } from '../../components/Button'
import { FormField } from '../../components/FormField'
import { PageHeader } from '../../components/PageHeader'
import { PhoneFrame } from '../../components/PhoneFrame'

export function NewGoalPage() {
  return (
    <PhoneFrame>
      <PageHeader title="Crea tu meta" backTo="/metas/intro" />

      <Card className="rounded-3xl py-0">
        <CardContent className="space-y-4 p-4">
          <FormField label="Nombre de meta *" placeholder="Ingresa el nombre" />
          <FormField label="Valor de meta *" placeholder="Ingresa el monto" />
          <FormField label="Fecha limite *" value="dd/mm/aa" />
        </CardContent>
      </Card>

      <div className="mt-6">
        <Button to="/metas">Guardar</Button>
      </div>
    </PhoneFrame>
  )
}
