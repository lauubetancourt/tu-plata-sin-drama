import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { BottomNav } from '../../components/BottomNav'
import { Button } from '../../components/Button'
import { PageHeader } from '../../components/PageHeader'
import { PhoneFrame } from '../../components/PhoneFrame'

export function RemindersPage() {
  return (
    <PhoneFrame>
      <PageHeader title="Recordatorios" backTo="/dashboard" />

      <Card className="rounded-3xl py-0">
        <CardContent className="space-y-2 p-4">
          <Badge className="w-fit" variant="secondary">
            Recordatorio activo
          </Badge>
          <p className="text-sm font-bold text-foreground">Pago de tarjeta</p>
          <p className="text-xs text-muted-foreground">28/03/26</p>
        </CardContent>
      </Card>

      <div className="mt-5 grid grid-cols-2 gap-3">
        <Button to="/recordatorios/editar" variant="ghost">
          Editar
        </Button>
        <Button to="/recordatorios/vacio" variant="danger">
          Eliminar
        </Button>
      </div>

      <div className="mt-3">
        <Button to="/recordatorios/nuevo">Nuevo recordatorio</Button>
      </div>

      <BottomNav />
    </PhoneFrame>
  )
}
