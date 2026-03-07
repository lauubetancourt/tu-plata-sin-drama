import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Link } from 'react-router-dom'
import { BottomNav } from '../../components/BottomNav'
import { Button } from '../../components/Button'
import { PageHeader } from '../../components/PageHeader'
import { PhoneFrame } from '../../components/PhoneFrame'

const MOVEMENTS = [
  { id: 1, date: '03 MAR 2026', name: 'Almuerzo', amount: '-$20.000' },
  { id: 2, date: '03 MAR 2026', name: 'Transporte', amount: '-$5.000' },
  { id: 3, date: '02 MAR 2026', name: 'Mercado', amount: '-$110.000' },
]

export function MovementsPage() {
  return (
    <PhoneFrame>
      <PageHeader title="Movimientos" backTo="/dashboard" />

      <section className="space-y-3">
        {MOVEMENTS.map((movement) => (
          <Card key={movement.id} className="rounded-2xl py-0">
            <CardContent className="space-y-3 p-4">
              <Badge variant="secondary">{movement.date}</Badge>
              <div className="flex items-center justify-between">
                <p className="text-sm font-bold text-foreground">{movement.name}</p>
                <p className="text-sm font-extrabold text-destructive">{movement.amount}</p>
              </div>
              <Separator />
              <div className="flex gap-2">
                <Button
                  className="h-8 w-auto px-3 text-xs"
                  size="sm"
                  to="/movimientos/editar"
                  variant="ghost"
                >
                  Editar
                </Button>
                <Link
                  className="inline-flex h-8 items-center justify-center rounded-lg border border-destructive/40 px-3 text-xs font-semibold text-destructive transition hover:bg-destructive/10"
                  to="/movimientos/eliminar"
                >
                  Eliminar
                </Link>
              </div>
            </CardContent>
          </Card>
        ))}
      </section>

      <div className="mt-5">
        <Button to="/movimientos/nuevo">Agregar movimiento</Button>
      </div>

      <BottomNav />
    </PhoneFrame>
  )
}
