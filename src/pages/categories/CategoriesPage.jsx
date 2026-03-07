import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { BottomNav } from '../../components/BottomNav'
import { Button } from '../../components/Button'
import { PageHeader } from '../../components/PageHeader'
import { PhoneFrame } from '../../components/PhoneFrame'

const CATEGORIES = ['Comida', 'Hogar', 'Estudio', 'Transporte', 'Personal']

export function CategoriesPage() {
  return (
    <PhoneFrame>
      <PageHeader title="Categorias" backTo="/dashboard" />

      <Card className="rounded-3xl py-0">
        <CardContent className="space-y-2 p-4">
          {CATEGORIES.map((category) => (
            <Badge
              className="flex h-10 justify-start rounded-xl border-border/70 px-3 text-sm font-semibold"
              key={category}
              variant="outline"
            >
              {category}
            </Badge>
          ))}
        </CardContent>
      </Card>

      <div className="mt-5">
        <Button to="/movimientos/nuevo">Agregar movimiento</Button>
      </div>

      <BottomNav />
    </PhoneFrame>
  )
}
