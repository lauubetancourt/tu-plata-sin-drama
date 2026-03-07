import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { BottomNav } from '../../components/BottomNav'
import { Button } from '../../components/Button'
import { PageHeader } from '../../components/PageHeader'
import { PhoneFrame } from '../../components/PhoneFrame'
import { ProgressBar } from '../../components/ProgressBar'

export function GoalsPage() {
  return (
    <PhoneFrame>
      <PageHeader title="Metas" backTo="/dashboard" />

      <Card className="rounded-3xl py-0">
        <CardContent className="space-y-3 p-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-foreground">Viaje</h2>
            <Badge className="font-bold" variant="secondary">
              78.6%
            </Badge>
          </div>
          <p className="text-xs text-muted-foreground">$2.358.000 / $3.000.000</p>
          <p className="text-xs text-muted-foreground">Fecha limite: 28/03/26</p>
          <ProgressBar value={78.6} />
        </CardContent>
      </Card>

      <div className="mt-5 grid grid-cols-2 gap-3">
        <Button to="/metas/nueva" variant="ghost">
          Nueva meta
        </Button>
        <Button to="/metas/nueva">Editar</Button>
      </div>

      <BottomNav />
    </PhoneFrame>
  )
}
