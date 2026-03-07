import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '../../components/Button'
import { PageHeader } from '../../components/PageHeader'
import { PhoneFrame } from '../../components/PhoneFrame'

export function DeleteMovementPage() {
  return (
    <PhoneFrame>
      <PageHeader title="Movimientos" backTo="/movimientos" />

      <Card className="rounded-2xl py-0">
        <CardContent className="space-y-2 p-4">
          <Badge variant="secondary">03 MAR 2026</Badge>
          <div className="flex items-center justify-between">
            <p className="text-sm font-bold text-foreground">Almuerzo</p>
            <p className="text-sm font-extrabold text-destructive">-$20.000</p>
          </div>
        </CardContent>
      </Card>

      <Dialog defaultOpen>
        <DialogContent className="rounded-3xl" showCloseButton={false}>
          <DialogHeader>
            <DialogTitle>Eliminar movimiento</DialogTitle>
            <DialogDescription>
              ¿Estas seguro de que quieres eliminar este movimiento?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="grid grid-cols-2 gap-3 border-0 bg-transparent p-0 sm:grid-cols-2">
            <Button to="/movimientos" variant="ghost">
              No
            </Button>
            <Button to="/movimientos" variant="danger">
              Si, eliminar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </PhoneFrame>
  )
}
